<template>
    <div class="wrap">
        <Header />

        <main class="login-main">

            <Title />

            <LoginForm />
            
        </main>

        <Footer />
    </div>
</template>

<script setup lang="ts">

import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import Title from '~/components/base/Title.vue'
import LoginForm from '~/components/forms/LoginForm.vue'

useSeoMeta({
    title: 'LOGIN｜Hex Burger House',
})

</script>

<style scoped lang="scss" src="@/assets/scss/pages/_login.scss"></style>