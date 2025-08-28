import Swal from 'sweetalert2'
import { navigateTo } from '#app'
import { useAuth } from './useAuth'

export const useLogout = () => {
    const { username, token } = useAuth()

    const logout = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will be logged out.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, logout',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#d33'
        })

        if (result.isConfirmed) {
            username.value = null
            token.value = null

            await Swal.fire({
                icon: 'success',
                title: 'Logged Out',
                text: 'You have successfully logged out. Redirecting to homepage...',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
                didOpen: () => Swal.showLoading(),
                willClose: () => {
                    navigateTo('/')
                }
            })
        }
    }

    return { logout }
}
