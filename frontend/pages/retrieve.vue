<template>

    <div class="wrap">

        <Header />

        <main class="retrieve-main">

            <Title />

            <RetrieveForm />

        </main>

        <Footer />

    </div>

</template>

<script setup lang="ts">

import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import Title from '~/components/base/Title.vue'
import RetrieveForm from '~/components/forms/RetrieveForm.vue'

useSeoMeta({
    title: 'RETRIEVE｜Hex Burger House',
})

</script>

<style scoped lang="scss" src="@/assets/scss/pages/_retrieve.scss"></style>