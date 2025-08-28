import { defineNuxtRouteMiddleware, navigateTo } from '#app'

export default defineNuxtRouteMiddleware(() => {
    const token = useCookie('username') // SSR-safe cookie 讀取
    const isLoggedIn = !!token.value

    if (!isLoggedIn) {
        return navigateTo('/login')
    }
})

