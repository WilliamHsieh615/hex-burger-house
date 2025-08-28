import { useAuth } from './useAuth'
import { navigateTo } from '#app'
import Swal from 'sweetalert2'

export const useLogin = () => {
    const { username, token } = useAuth()

    const login = async (email: string, password: string) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!email || !password) {
            await Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Please enter both email and password.',
                confirmButtonColor: '#d33'
            })
            return
        }

        if (!emailPattern.test(email)) {
            await Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Invalid email format.',
                confirmButtonColor: '#d33'
            })
            return
        }

        // 模擬登入成功
        username.value = 'William'
        token.value = 'mocked-token-abc123'

        await Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: `${username.value}, welcome back!`,
            timer: 2000,
            showConfirmButton: false,
            timerProgressBar: true,
            didOpen: () => Swal.showLoading(),
            willClose: () => {
                navigateTo('/member')
            }
        })
    }

    return { login }
}
