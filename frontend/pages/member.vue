<template>
  <div class="wrap">
    <Header />

    <main class="member-main">
      <section class="aside">
        <h2><i class="bi bi-leaf-fill leaf"></i> Member Center</h2>
        <ul class="list">
          <li><NuxtLink to="/member/profile">Profile</NuxtLink></li>
          <li><NuxtLink to="/member/password">Change Password</NuxtLink></li>
          <li><NuxtLink to="/member/order">Order History</NuxtLink></li>
          <li><a href="#" @click.prevent="handleLogout">Logout</a></li>
        </ul>
      </section>

      <section class="member-container">

        <NuxtPage />

      </section>
    </main>

    <Footer />
  </div>

</template>

<script setup lang="ts">

definePageMeta({
  middleware: 'auth',
  redirect: '/member/profile'
})

import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import { useLogout } from '~/composables/useLogout'

useSeoMeta({
  title: 'MEMBER｜Hex Burger House'
})

const { logout } = useLogout()
const handleLogout = logout

</script>

<style scoped lang="scss" src="@/assets/scss/pages/_member.scss"></style>