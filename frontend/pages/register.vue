<template>

    <div class="wrap">

        <Header />

        <main class="register-main">

            <Title />

            <RegisterForm />

        </main>

        <Footer />

    </div>

</template>

<script setup lang="ts">

import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import Title from '~/components/base/Title.vue'
import RegisterForm from '~/components/forms/RegisterForm.vue'

useSeoMeta({
    title: 'REGISTER｜Hex Burger House',
})

</script>

<style scoped lang="scss" src="@/assets/scss/pages/_register.scss"></style>