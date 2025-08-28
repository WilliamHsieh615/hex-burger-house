import { computed } from 'vue'
import { useCookie } from '#app'

export const useAuth = () => {
    const username = useCookie<string | null>('username', {
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 // 1 天
    })

    const token = useCookie<string | null>('token', {
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 // 1 天
    })

    const isLoggedIn = computed(() => !!token.value)

    return { username, token, isLoggedIn }
}


