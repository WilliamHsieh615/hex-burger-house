<template>

    <section class="checkoutSummary">
        <div class="order">
            <h3>Order Summary</h3>
            <div class="order_container">
                <div class="subtotal">
                    <h5>Subtotal</h5>
                    <p><span class="currency">NT$</span><span class="amount">{{ subtotal }}</span></p>
                </div>
                <div class="shipping">
                    <h5>Shipping</h5>
                    <p><span class="prefix">+</span><span class="currency">NT$</span><span class="amount">{{
                        shipping }}</span></p>
                </div>
                <div class="discount">
                    <h5>Discount</h5>
                    <p><span class="prefix">–</span><span class="currency">NT$</span><span class="amount">{{
                        discount }}</span></p>
                </div>
                <div class="total">
                    <h4>Total</h4>
                    <p><span class="currency">NT$</span><span class="amount">{{ total }}</span></p>
                </div>
            </div>
        </div>

        <div class="list">
            <h3>Shopping List</h3>
            <ul class="item_container">
                <li class="item" v-for="item in cart" :key="item.name">
                    <img :src="`${base}image/products/${item.category}/${item.image}`" :alt="item.name" />
                    <div class="info">
                        <h4>{{ item.name }}</h4>
                        <p class="price">NT$ {{ item.price }}</p>
                        <p class="amount">{{ item.quantity }} order</p>
                        <p class="sum">NT$ {{ item.price * item.quantity }}</p>
                    </div>
                </li>
            </ul>
        </div>
    </section>

</template>

<script setup>

import { computed } from 'vue'
import { useRuntimeConfig } from '#app'

const props = defineProps({
  cart: {
    type: Array,
    default: () => []
  }
})

const config = useRuntimeConfig()
const rawBase = config.app.baseURL || '/'
const base = rawBase.endsWith('/') ? rawBase : rawBase + '/'

const subtotal = computed(() =>
  props.cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
)
const shipping = computed(() => 0)
const discount = computed(() => 0)
const total = computed(() => subtotal.value + shipping.value - discount.value)

</script>

<style scoped lang="scss" src="@/assets/scss/sections/checkout/_checkout-summary.scss"></style>