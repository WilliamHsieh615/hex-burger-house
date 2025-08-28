<template>
  <form class="register-form" @submit.prevent="handleRegister" novalidate>
    <h2>REGISTER</h2>

    <!-- Email -->
    <div class="email">
      <label for="email">Email Address<span>*</span></label>
      <div class="emailInput">
        <input type="email" id="email" v-model="email" placeholder="Enter your email" />
        <i class="bi bi-envelope emailIcon"></i>
      </div>
    </div>

    <!-- Password -->
    <div class="password">
      <label for="password">Password<span>*</span></label>
      <div class="passwordInput">
        <input :type="passwordVisible.password ? 'text' : 'password'" id="password" v-model="password"
          placeholder="Enter your password" @input="validatePassword" title="6–12 characters with letters and numbers" autocomplete="new-password" />
        <i class="bi bi-lock-fill passwordIcon"></i>
        <a href="#" class="eyeIcon" @click.prevent="togglePassword('password')"
          :class="passwordVisible.password ? 'bi bi-eye' : 'bi bi-eye-slash'"></a>
      </div>

      <!-- Confirm Password -->
      <div class="passwordConfirmInput">
        <input :type="passwordVisible.confirmPassword ? 'text' : 'password'" id="confirmPassword"
          v-model="confirmPassword" placeholder="Confirm your password" @input="validatePasswordMatch" title="6–12 characters with letters and numbers" autocomplete="new-password" />
        <i class="bi bi-lock-fill passwordIcon"></i>
        <a href="#" class="eyeIcon" @click.prevent="togglePassword('confirmPassword')"
          :class="passwordVisible.confirmPassword ? 'bi bi-eye' : 'bi bi-eye-slash'"></a>
      </div>

      <!-- Tips -->
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

    <!-- Name -->
    <div class="name">
      <label for="name">Name<span>*</span></label>
      <div class="nameInput">
        <input type="text" id="name" v-model="name" placeholder="Enter your name" />
        <i class="bi bi-person-fill nameIcon"></i>
      </div>
    </div>

    <!-- Phone -->
    <div class="phone">
      <label for="phone">Phone Number<span>*</span></label>
      <div class="phoneInput">
        <input type="tel" id="phone" v-model="phone" placeholder="Enter your phone number" />
        <i class="bi bi-telephone-fill phoneIcon"></i>
      </div>
    </div>

    <!-- Birthday -->
    <div class="birthday">
      <label for="birthday">Birthday<span>*</span></label>
      <div class="birthdayInput">
        <input type="text" id="birthday" v-model="birthday" placeholder="Select your birthday" />
        <i class="bi bi-cake2-fill birthdayIcon"></i>
      </div>
    </div>

    <!-- Terms -->
    <div class="terms">
      <div class="privacyTerms">
        <input type="checkbox" id="privacyTerms" :disabled="!privacyEnabled" v-model="agreePrivacy" />
        <label for="privacyTerms">
          I agree to the <a href="/assets/privacy_terms.pdf" target="_blank" @click="enablePrivacy">Privacy
            Policy</a><span>*</span>
        </label>
      </div>

      <div class="mamberTerms">
        <input type="checkbox" id="mamberTerms" :disabled="!termsEnabled" v-model="agreeTerms" />
        <label for="mamberTerms">
          I agree to the <a href="/assets/mamber_terms.pdf" target="_blank" @click="enableTerms">Terms of
            Service</a><span>*</span>
        </label>
      </div>

      <div class="promotionalInfo">
        <input type="checkbox" id="promotionalInfo" v-model="subscribe" />
        <label for="promotionalInfo">I would like to receive promotional messages</label>
      </div>
    </div>

    <!-- Link to Login -->
    <NuxtLink to="/login" class="goToLogin">Already have an account?</NuxtLink>

    <!-- Verification -->
    <button type="button" class="sentVerify_button" :disabled="sentCodeDisabled" @click="sendVerificationCode">
      {{ sentCodeDisabled ? `Resend in ${countdown}s` : 'Send Verification Code' }}
    </button>

    <div v-if="showVerify" class="verify">
      <label>Enter 4-digit verification code</label>
      <div class="code">
        <input type="text" class="codeInput" maxlength="1" v-for="(c, i) in 4" :key="i" v-model="code[i]"
          @input="handleCodeInput(i, $event)" inputmode="numeric" pattern="[0-9]*" />
      </div>
    </div>

    <button v-if="showVerify" type="submit" class="register_button">Register</button>
  </form>
</template>

<script setup>

import { useValidation } from '@/composables/useValidation'
import { ref, computed, onMounted } from 'vue'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'
import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.css'

const {
  isRequired,
  isValidEmail,
  isValidPhone,
  isValidPassword,
  isPasswordMatch,
  isFullCode,
  showErrors,
  showSuccess
} = useValidation()

// 表單資料
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const name = ref('')
const phone = ref('')
const birthday = ref('')
const subscribe = ref(false)
const agreePrivacy = ref(false)
const agreeTerms = ref(false)
const code = ref(['', '', '', ''])

// 狀態控制
const passwordsMatch = ref(null)
const showVerify = ref(false)
const sentCodeDisabled = ref(false)
const countdown = ref(0)
const passwordVisible = ref({
  password: false,
  confirmPassword: false
})

// 條款解鎖
const privacyEnabled = ref(false)
const termsEnabled = ref(false)

// 密碼格式驗證狀態
const passwordValidations = ref({
  length: false,
  letter: false,
  digit: false
})

// 密碼一致性文字提示
const matchTipText = computed(() => {
  if (passwordsMatch.value === null) return 'Please confirm your password'
  if (passwordsMatch.value) return 'Passwords match'
  return 'Passwords do not match'
})

// 開啟密碼可見
const togglePassword = (field) => {
  passwordVisible.value[field] = !passwordVisible.value[field]
}

// 即時驗證密碼格式
const validatePassword = () => {
  const val = password.value
  passwordValidations.value.length = val.length >= 6 && val.length <= 12
  passwordValidations.value.letter = /[A-Za-z]/.test(val)
  passwordValidations.value.digit = /\d/.test(val)
  validatePasswordMatch()
}

const validatePasswordMatch = () => {
  if (!confirmPassword.value) passwordsMatch.value = null
  else passwordsMatch.value = confirmPassword.value === password.value
}

// 啟用條款勾選
const enablePrivacy = () => {
  privacyEnabled.value = true
  agreePrivacy.value = true
}

const enableTerms = () => {
  termsEnabled.value = true
  agreeTerms.value = true
}

// 驗證碼輸入跳欄
const handleCodeInput = (index, e) => {
  const val = e.target.value.replace(/[^0-9]/g, '')
  code.value[index] = val
  if (val && index < 3) document.querySelectorAll('.codeInput')[index + 1].focus()
}

// 表單驗證
const validateForm = () => {
  const errors = []

  // 驗證欄位
  if (!isRequired(email.value)) errors.push('Please enter your email address.')
  else if (!isValidEmail(email.value)) errors.push('Invalid email format.')

  if (!isRequired(password.value)) errors.push('Please enter your password.')
  else if (!isValidPassword(password.value)) errors.push('Password must be 6–12 characters, including at least 1 letter and 1 number.')

  if (!isRequired(confirmPassword.value)) errors.push('Please confirm your password.')
  else if (!isPasswordMatch(password.value, confirmPassword.value)) errors.push('Passwords do not match.')

  if (!isRequired(name.value)) errors.push('Please enter your name.')
  if (!isRequired(phone.value)) errors.push('Please enter your phone number.')
  else if (!isValidPhone(phone.value)) errors.push('Invalid phone format.')

  if (!isRequired(birthday.value)) errors.push('Please select your birthday.')

  if (!agreePrivacy.value) errors.push('Please agree to the Privacy Policy.')
  if (!agreeTerms.value) errors.push('Please agree to the Terms of Service.')

  if (showVerify.value && !isFullCode(code.value)) {
    errors.push('Please enter the full 4-digit verification code.')
  }

  return showErrors(errors)
}

// 發送驗證碼
const sendVerificationCode = () => {
  if (!validateForm()) return

  sentCodeDisabled.value = true
  showVerify.value = true
  countdown.value = 60

  showSuccess('Verification code sent', `A verification code has been sent to ${email.value}.`)

  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
      sentCodeDisabled.value = false
    }
  }, 1000)
}

// 註冊送出
const router = useRouter()
const handleRegister = () => {
  if (!validateForm()) return

  showSuccess('Registration Successful', 'Welcome to Hex Burger House!')
    .then(() => router.push('/login'))
}

// 限制生日選未來
onMounted(() => {
  flatpickr('#birthday', {
    dateFormat: 'Y/m/d',
    maxDate: 'today',
    allowInput: true,
    disableMobile: true
  })
})
</script>

<style scoped lang="scss" src="@/assets/scss/forms/_register-form.scss"></style>
