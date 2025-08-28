<template>
  <div class="wrap">
    <Header />

    <main class="member-main">
      <section class="aside">
        <h2><i class="bi bi-leaf-fill leaf"></i> Member Center</h2>
        <ul class="list">
          <li><a href="#" @click.prevent="currentTab = 'profile'">Profile</a></li>
          <li><a href="#" @click.prevent="currentTab = 'password'">Change Password</a></li>
          <li><a href="#" @click.prevent="currentTab = 'order'">Order History</a></li>
          <li><a href="#" @click.prevent="handleLogout">Logout</a></li>
        </ul>
      </section>

      <section class="member-container">
        <ProfileForm v-if="currentTab === 'profile'" />
        <ChangePasswordForm v-if="currentTab === 'password'" />
        <OrderHistory v-if="currentTab === 'order'" />
      </section>
    </main>

    <Footer />
  </div>

</template>

<script setup lang="ts">

definePageMeta({
  middleware: 'auth'
})

import { ref } from 'vue'
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import ProfileForm from '~/components/pages/member/ProfileForm.vue'
import ChangePasswordForm from '~/components/pages/member/ChangePasswordForm.vue'
import OrderHistory from '~/components/pages/member/OrderHistory.vue'
import { useLogout } from '~/composables/useLogout'

useSeoMeta({
  title: 'MEMBER｜Hex Burger House'
})

const { logout } = useLogout()
const handleLogout = logout

const currentTab = ref('profile')

</script>

<style scoped lang="scss" src="@/assets/scss/pages/_member.scss"></style>