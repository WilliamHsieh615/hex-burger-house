<template>
  <form @submit.prevent="handleChangePassword" class="changePassword-form" novalidate>
    <h2>CHANGE PASSWORD</h2>

    <div class="email">
      <label for="email">Email Address</label>
      <div class="emailInput">
        <input type="email" id="email" v-model="email" required readonly />
        <i class="bi bi-envelope emailIcon"></i>
      </div>
    </div>

    <div class="password">
      <label for="password">New Password</label>
      <div class="passwordInput">
        <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password"
          placeholder="Enter new password" title="6–12 characters with letters and numbers"
          autocomplete="new-password" />
        <i class="bi bi-lock-fill passwordIcon"></i>
        <a href="#" @click.prevent="togglePasswordVisibility"
          :class="showPassword ? 'bi bi-eye eyeIcon' : 'bi bi-eye-slash eyeIcon'"></a>
      </div>

      <div class="passwordConfirmInput">
        <input :type="showConfirmPassword ? 'text' : 'password'" id="confirmPassword" v-model="confirmPassword"
          placeholder="Confirm new password" title="6–12 characters with letters and numbers"
          autocomplete="new-password" />
        <i class="bi bi-lock-fill passwordIcon"></i>
        <a href="#" @click.prevent="toggleConfirmPasswordVisibility"
          :class="showConfirmPassword ? 'bi bi-eye eyeIcon' : 'bi bi-eye-slash eyeIcon'"></a>
      </div>

      <ul class="tips">
        <li class="length-tip">
          <i
            :class="passwordValidations.length ? 'bi bi-check-circle-fill check-circle green' : 'bi bi-exclamation-circle-fill exclamation-circle'"></i>
          Password length must be 6–12 characters
        </li>
        <li class="letter-tip">
          <i
            :class="passwordValidations.letter ? 'bi bi-check-circle-fill check-circle green' : 'bi bi-exclamation-circle-fill exclamation-circle'"></i>
          At least 1 letter
        </li>
        <li class="digit-tip">
          <i
            :class="passwordValidations.digit ? 'bi bi-check-circle-fill check-circle green' : 'bi bi-exclamation-circle-fill exclamation-circle'"></i>
          At least 1 digit
        </li>
        <li class="match-tip">
          <i
            :class="passwordsMatch === true ? 'bi bi-check-circle-fill check-circle green' : passwordsMatch === false ? 'bi bi-x-circle-fill x-circle' : 'bi bi-exclamation-circle-fill exclamation-circle'"></i>
          {{ matchTipText }}
        </li>
      </ul>
    </div>

    <button type="button" class="sentVerify_button" :disabled="sentCodeDisabled" @click="sendVerificationCode">
      {{ sentCodeDisabled ? `Resend in ${countdown}s` : 'Send Verification Code' }}
    </button>

    <div class="verify" v-if="showVerifySection">
      <label>Enter 4-digit verification code</label>
      <div class="code">
        <input v-for="(digit, index) in verificationCode" :key="index" type="text" maxlength="1" class="codeInput"
          v-model="verificationCode[index]" @input="handleCodeInput(index, $event)" />
      </div>
    </div>

    <button v-if="showVerifySection" type="submit" class="changePassword_button">Change Password</button>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useValidation } from '@/composables/useValidation'
const {
  isRequired,
  isValidPassword,
  isPasswordMatch,
  isFullCode,
  showErrors,
  showSuccess
} = useValidation()

const email = ref('test@mail.com')

const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const verificationCode = ref(['', '', '', ''])

const sentCodeDisabled = ref(false)
const countdown = ref(0)
let timer = null

const showVerifySection = ref(false)

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value
}

const passwordValidations = computed(() => ({
  length: password.value.length >= 6 && password.value.length <= 12,
  letter: /[A-Za-z]/.test(password.value),
  digit: /\d/.test(password.value),
}))

const passwordsMatch = computed(() => {
  if (!confirmPassword.value) return null
  return password.value === confirmPassword.value
})

const matchTipText = computed(() => {
  if (passwordsMatch.value === true) return 'Passwords match'
  if (passwordsMatch.value === false) return 'Passwords do not match'
  return 'Please confirm your password'
})

const sendVerificationCode = () => {
  if (sentCodeDisabled.value) return

  const errors = []

  if (!isRequired(password.value)) errors.push('Please enter your new password.')
  if (!isRequired(confirmPassword.value)) errors.push('Please confirm your new password.')
  if (!isValidPassword(password.value)) errors.push('Password must be 6–12 characters, including at least 1 letter and 1 number.')
  if (!isPasswordMatch(password.value, confirmPassword.value)) errors.push('Passwords do not match.')

  if (!showErrors(errors)) return

  showSuccess('Verification code sent', `A verification code has been sent to ${email.value}.`)

  sentCodeDisabled.value = true
  countdown.value = 60
  showVerifySection.value = true

  timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
      sentCodeDisabled.value = false
      countdown.value = 0
    }
  }, 1000)
}

const handleCodeInput = (index, event) => {
  const input = event.target
  input.value = input.value.replace(/[^0-9]/g, '').slice(0, 1)
  verificationCode.value[index] = input.value

  if (input.value && index < verificationCode.value.length - 1) {
    const nextInput = input.nextElementSibling
    nextInput && nextInput.focus()
  }
}

const handleChangePassword = () => {
  const errors = []

  if (!isValidPassword(password.value)) errors.push('Password must be 6–12 characters, including at least 1 letter and 1 number.')
  if (!isPasswordMatch(password.value, confirmPassword.value)) errors.push('Passwords do not match.')
  if (!isFullCode(verificationCode.value)) errors.push('Please enter the complete 4-digit verification code.')

  if (!showErrors(errors)) return

  showSuccess('Password Changed', 'Your password has been changed successfully.').then(() => {
    clearInterval(timer)
    countdown.value = 0
    sentCodeDisabled.value = false

    showVerifySection.value = false
    password.value = ''
    confirmPassword.value = ''
    verificationCode.value = ['', '', '', '']
    showPassword.value = false
    showConfirmPassword.value = false
  })
}
</script>

<style scoped lang="scss" src="@/assets/scss/sections/member/_change-password-form.scss"></style>