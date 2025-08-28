<template>

  <div class="wrap">

    <Header />

    <main class="cart-main">

      <Title />

      <div class="cart">
        <h2>YOUR CART</h2>

        <ul class="item-container" v-if="cart.length > 0">
          <li class="item" :class="{ 'show-trash': trashStates[index] }" v-for="(item, index) in cart" :key="item.name"
            @touchstart="handleTouchStart($event, index)" @touchend="handleTouchEnd($event, index)">
            <div class="window">
              <img :src="`${base}image/products/${item.category}/${item.image}`" :alt="item.name" />
            </div>
            <div class="info">
              <div class="name">
                <h3>{{ item.name }}</h3>
                <p class="price">NT$ {{ item.price }}</p>
              </div>
              <div class="amount">
                <a href="#" class="minus" @click.prevent="changeQuantity(index, -1)">-</a>
                <p class="number">{{ item.quantity }}</p>
                <a href="#" class="plus" @click.prevent="changeQuantity(index, 1)">+</a>
              </div>
            </div>
            <p class="sum">NT$ {{ item.price * item.quantity }}</p>
            <a href="#" class="bi bi-trash3-fill trashIcon" @click.prevent="removeItem(index)"></a>
          </li>
        </ul>

        <p v-else class="cart_is_empty">Your cart is empty.</p>

        <NuxtLink v-if="cart.length > 0" to="/checkout" class="checkout_button">Proceed to Checkout</NuxtLink>
      </div>

    </main>

    <Footer />

  </div>

</template>

<script setup lang="ts">

definePageMeta({
  middleware: 'auth'
})

import { ref, onMounted, computed, watch } from 'vue'
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import Title from '~/components/base/Title.vue'
import { useCartStore } from '~/stores/cart'
import { useRuntimeConfig } from '#app'

useSeoMeta({
  title: 'CART｜Hex Burger House'
})

const config = useRuntimeConfig()
const base = config.app.baseURL || '/'

const cartStore = useCartStore()

const cart = computed(() => cartStore.cart)

const trashStates = ref<boolean[]>([])
const touchStartX = ref<number[]>([])

const updateTouchTracking = () => {
  trashStates.value = cart.value.map(() => false)
  touchStartX.value = cart.value.map(() => 0)
}

const changeQuantity = (index: number, delta: number) => {
  cartStore.changeQuantity(index, delta)
  updateTouchTracking()
}

const removeItem = (index: number) => {
  cartStore.removeItem(index)
  updateTouchTracking()
}

const handleTouchStart = (e: TouchEvent, index: number) => {
  if (e.changedTouches && e.changedTouches[0]) {
    touchStartX.value[index] = e.changedTouches[0].clientX
  }
}

const handleTouchEnd = (e: TouchEvent, index: number) => {
  if (e.changedTouches && e.changedTouches[0]) {
    const endX = e.changedTouches[0].clientX
    const startX = touchStartX.value[index] ?? 0
    const deltaX = endX - startX

    if (deltaX < -50) {
      trashStates.value = cart.value.map((_, i) => i === index)
    } else if (deltaX > 50) {
      trashStates.value[index] = false
    }
  }
}

onMounted(() => {
  cartStore.loadFromLocalStorage()
  updateTouchTracking()
})

watch(cart, () => {
  updateTouchTracking()
})


</script>

<style scoped lang="scss" src="@/assets/scss/pages/_cart.scss"></style>
