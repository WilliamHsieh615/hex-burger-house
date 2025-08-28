<template>
    <form class="retrieve-form" @submit.prevent="handleSubmit" novalidate>
        <h2>RETRIEVE</h2>

        <!-- Email -->
        <div class="email" v-show="currentStep === 1">
            <label for="email">Email Address<span>*</span></label>
            <div class="emailInput">
                <input type="email" id="email" v-model="email" placeholder="Enter your email" required />
                <i class="bi bi-envelope emailIcon"></i>
            </div>
        </div>

        <!-- 送出驗證碼按鈕 -->
        <button type="button" class="sentVerify_button" v-show="currentStep <= 2" @click="sendVerificationCode"
            :disabled="sentCodeDisabled">
            {{ sentCodeDisabled ? `Resend in ${countdown}s` : 'Send Verification Code' }}
        </button>

        <!-- 驗證碼輸入 -->
        <div class="verify" v-show="currentStep === 2">
            <label>Enter 4-digit verification code</label>
            <div class="code">
                <input v-for="(digit, index) in codeDigits" :key="index" type="text" class="codeInput" maxlength="1"
                    v-model="codeDigits[index]" @input="handleCodeInput(index, $event)" />
            </div>
        </div>

        <!-- 驗證按鈕 -->
        <button type="button" class="verify_button" v-if="currentStep === 2" @click="verifyCode">
            Verification
        </button>

        <!-- 密碼輸入 -->
        <div class="password" v-show="currentStep === 3">
            <label for="password">New Password<span>*</span></label>
            <div class="passwordInput">
                <input :type="showPassword ? 'text' : 'password'" id="password" class="setPassword" v-model="password"
                    placeholder="Enter new password" title="6–12 characters with letters and numbers"
                    autocomplete="new-password" />
                <i class="bi bi-lock-fill passwordIcon"></i>
                <a href="#" @click.prevent="togglePasswordVisibility"
                    :class="showPassword ? 'bi bi-eye eyeIcon' : 'bi bi-eye-slash eyeIcon'"></a>
            </div>

            <div class="passwordConfirmInput">
                <input :type="showConfirmPassword ? 'text' : 'password'" id="confirmPassword" class="confirmPassword"
                    v-model="confirmPassword" placeholder="Confirm new password"
                    title="6–12 characters with letters and numbers" autocomplete="new-password" />
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

        <!-- 送出重設密碼 -->
        <button type="submit" class="retrieve_button" v-if="currentStep === 3">
            Reset Password
        </button>
    </form>
</template>

<script setup>
import { ref, computed, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { useValidation } from '@/composables/useValidation'

const {
    isRequired,
    isValidEmail,
    isValidPassword,
    isPasswordMatch,
    isFullCode,
    showErrors,
    showSuccess
} = useValidation()

const router = useRouter()

const email = ref('')
const codeDigits = ref(['', '', '', ''])
const password = ref('')
const confirmPassword = ref('')
const currentStep = ref(1)

const countdown = ref(0)
const timer = ref(null)
const sentCodeDisabled = ref(false)

const showPassword = ref(false)
const showConfirmPassword = ref(false)

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value
}
const toggleConfirmPasswordVisibility = () => {
    showConfirmPassword.value = !showConfirmPassword.value
}

const validateEmail = (email) => /^[^@]+@[^@]+\.[^@]+$/.test(email)

const sendVerificationCode = () => {
    const errors = []

    if (!isRequired(email.value)) errors.push('Please enter your email address.')
    else if (!isValidEmail(email.value)) errors.push('Invalid email format.')

    if (!showErrors(errors)) return

    showSuccess('Verification code sent', `A verification code has been sent to ${email.value}.`)

    currentStep.value = 2
    sentCodeDisabled.value = true
    countdown.value = 60

    timer.value = setInterval(() => {
        countdown.value--
        if (countdown.value <= 0) {
            clearInterval(timer.value)
            sentCodeDisabled.value = false
            countdown.value = 0
        }
    }, 1000)
}

const handleCodeInput = (index, event) => {
    const value = event.target.value.replace(/[^0-9]/g, '').slice(0, 1)
    codeDigits.value[index] = value
    if (value && index < 3) {
        document.querySelectorAll('.codeInput')[index + 1].focus()
    }
}

const verifyCode = () => {
    if (!isFullCode(codeDigits.value)) {
        showErrors(['Please enter the complete 4-digit verification code.'])
        return
    }

    showSuccess('Verified!', 'Verification successful.')
    currentStep.value = 3
}

const passwordValidations = computed(() => ({
    length: password.value.length >= 6 && password.value.length <= 12,
    letter: /[a-zA-Z]/.test(password.value),
    digit: /[0-9]/.test(password.value),
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

const handleSubmit = () => {
    const errors = []

    if (!isRequired(password.value)) errors.push('Please enter your password.')
    else if (!isValidPassword(password.value)) errors.push('Password must be 6–12 characters, including at least 1 letter and 1 number.')

    if (!isRequired(confirmPassword.value)) errors.push('Please confirm your password.')
    else if (!isPasswordMatch(password.value, confirmPassword.value)) errors.push('Passwords do not match.')

    if (!showErrors(errors)) return

    showSuccess('Success', 'Password has been reset successfully.')
        .then(() => {
            router.push('/login')
        })
}

// 頁面卸載時清除計時器，避免記憶體洩漏
onBeforeUnmount(() => {
    if (timer.value) clearInterval(timer.value)
})
</script>

<style scoped lang="scss" src="@/assets/scss/forms/_retrieve-form.scss"></style>
