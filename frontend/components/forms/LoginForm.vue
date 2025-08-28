<template>
    <form class="login-form" @submit.prevent="handleSubmit" novalidate>
        <h2>LOGIN</h2>

        <div class="email">
            <label for="email">Email Address<span>*</span></label>
            <div class="emailInput">
                <input type="email" id="email" v-model.trim="email" placeholder="Enter your email" />
                <i class="bi bi-envelope emailIcon"></i>
            </div>
        </div>

        <div class="password">
            <label for="password">Password<span>*</span></label>
            <div class="passwordInput">
                <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password"
                    placeholder="Enter your password" />
                <i class="bi bi-lock-fill passwordIcon"></i>
                <a href="#" @click.prevent="togglePassword"
                    :class="showPassword ? 'bi bi-eye eyeIcon' : 'bi bi-eye-slash eyeIcon'"></a>
            </div>
            <NuxtLink to="/retrieve">Forgot password?</NuxtLink>
        </div>

        <div class="button">
            <NuxtLink to="/register">Register</NuxtLink>
            <button type="submit">Login</button>
        </div>
    </form>
</template>

<script setup>

import { ref } from 'vue'
import { useLogin } from '~/composables/useLogin'

const email = ref('')
const password = ref('')
const showPassword = ref(false)

const { login } = useLogin()

const togglePassword = () => {
    showPassword.value = !showPassword.value
}

const handleSubmit = () => {
    login(email.value, password.value)
}

</script>

<style scoped lang="scss" src="@/assets/scss/forms/_login-form.scss"></style>
