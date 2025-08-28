<template>
    <header id="up">
        <div class="bar">
            <h1>
                <NuxtLink to="/">Hex Burger House</NuxtLink>
            </h1>
            <ul :class="['menu', { showmenu: showMenu }]">
                <li>
                    <NuxtLink to="/#book" @click="closeMenu">Reserve</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/menu" @click="closeMenu">Menu</NuxtLink>
                </li>
                <li v-if="isLoggedIn">
                    <NuxtLink to="/member" @click="closeMenu">Member</NuxtLink>
                </li>
                <li v-if="!isLoggedIn">
                    <NuxtLink to="/login" @click="closeMenu">Login</NuxtLink>
                </li>
                <li v-if="isLoggedIn"><a href="#" @click.prevent="handleLogout">Logout</a></li>
            </ul>
            <a href="#" class="bi bi-list hamburgerMenu" @click.prevent="toggleMenu"></a>
        </div>
        <div class="header-title">
            <h2>Bite the Legend<br />Taste the Hex</h2>
            <p>Bite into the Legend</p>
        </div>

        <p class="greeting" v-if="isLoggedIn">Welcome back, <span>{{ username }}</span> !<br />Let’s get your burger
            fix.</p>
        <p class="greeting" v-else>Welcome, Guest!<br />Sign in to unlock full access.</p>

    </header>
</template>

<script setup lang="ts">

import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useLogout } from '~/composables/useLogout'

const { isLoggedIn, username } = useAuth()
const { logout } = useLogout()


const handleLogout = () => {
    logout()
}

const showMenu = ref(false)

function toggleMenu() {
    showMenu.value = !showMenu.value
}

function closeMenu() {
    if (window.innerWidth <= 600) {
        showMenu.value = false
    }
}

</script>

<style scoped lang="scss" src="@/assets/scss/layout/_header.scss"></style>