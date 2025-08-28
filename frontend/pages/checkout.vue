<template>

    <div class="wrap">

        <Header />

        <main class="checkout-main">

            <CheckoutSummary :cart="cart" />

            <CheckoutForm :cart="cart" @orderSubmitted="goToSuccessPage" />

        </main>


        <Footer />

    </div>


</template>

<script setup lang="ts">

definePageMeta({
    middleware: 'auth'
})

import { onMounted, computed } from 'vue'
import { navigateTo } from '#app'
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import CheckoutSummary from '~/components/pages/checkout/CheckoutSummary.vue'
import CheckoutForm from '~/components/pages/checkout/CheckoutForm.vue'
import { useCartStore } from '~/stores/cart'

useSeoMeta({
    title: 'CHECKOUT｜Hex Burger House',
    description: 'Complete your order with Hex Burger House.'
})

const cartStore = useCartStore()
const cart = computed(() => cartStore.cart)

onMounted(() => {
    cartStore.loadFromLocalStorage()
})

const goToSuccessPage = () => {
    cartStore.clearCart()
    navigateTo('/checkout-complete')
}

</script>


<style scoped lang="scss" src="@/assets/scss/pages/_checkout.scss"></style>