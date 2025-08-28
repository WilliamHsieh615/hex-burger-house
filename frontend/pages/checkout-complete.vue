<template>
  <div class="wrap">

    <Header />

    <main class="checkout-complete-main">

      <Title />

      <div class="gratitude">
        <h2>Thank You for Your Order!</h2>
        <p>Your order has been placed successfully.</p>
      </div>

      <NuxtLink to="/menu">Continue Shopping</NuxtLink>

    </main>

    <Footer />

  </div>
</template>

<script setup lang="ts">

definePageMeta({
  middleware: 'auth'
})

import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import Title from '~/components/base/Title.vue'

useSeoMeta({
  title: 'CHECKOUT COMPLETE｜Hex Burger House'
})
</script>

<style scoped lang="scss" src="@/assets/scss/pages/_checkout-complete.scss"></style>
