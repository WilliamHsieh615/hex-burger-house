import Swal from 'sweetalert2'

export const useValidation = () => {
    // 驗證規則
    const phoneRegex = /^(09\d{8}|0\d{8,9})$/
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/
    const carrierRegex = /^\/[A-Z0-9]{7}$/
    const taxIdRegex = /^\d{8}$/

    // 驗證函式（單一欄位）
    const isRequired = (value: string) => value.trim().length > 0
    const isValidPhone = (value: string) => phoneRegex.test(value.trim())
    const isValidEmail = (value: string) => emailRegex.test(value.trim())
    const isValidPassword = (value: string) => passwordRegex.test(value)
    const isPasswordMatch = (pw: string, confirm: string) => pw === confirm
    const isValidCarrier = (value: string) => carrierRegex.test(value)
    const isValidTaxId = (value: string) => taxIdRegex.test(value)
    const isValidDate = (value: string) => value.trim().length > 0
    const isPositiveInteger = (value: string) => {
        const n = Number(value)
        return Number.isInteger(n) && n > 0
    }
    const isFullCode = (code: string[]) => code.every((digit) => digit.trim() !== '')

    // 顯示錯誤提示
    const showErrors = (errors: string[]) => {
        if (errors.length > 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                html: errors.map((e) => `<p>${e}</p>`).join(''),
                confirmButtonColor: '#d33'
            })
            return false
        }
        return true
    }

    // 顯示成功提示
    const showSuccess = (title = 'Success!', text = '') => {
        return Swal.fire({
            icon: 'success',
            title,
            text
        })
    }

    return {
        isRequired,
        isValidPhone,
        isValidEmail,
        isValidPassword,
        isPasswordMatch,
        isValidCarrier,
        isValidTaxId,
        isValidDate,
        isPositiveInteger,
        isFullCode,
        showErrors,
        showSuccess
    }
}
