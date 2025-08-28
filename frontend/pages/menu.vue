<template>

    <div class="wrap">

        <Header />

        <main class="product-main">
            <div class="aside">
                <h2><i class="bi bi-leaf-fill leaf"></i> Order Your Favorite Meal</h2>
                <ul class="list">
                    <li><a href="#" @click.prevent="filterByCategory('all')">All ({{ allLength }})</a></li>
                    <li><a href="#" @click.prevent="filterByCategory('hamburger')">Burgers ({{ allHamburgerLength
                    }})</a></li>
                    <li><a href="#" @click.prevent="filterByCategory('fries')">Fries ({{ allFriesLength }})</a></li>
                    <li><a href="#" @click.prevent="filterByCategory('combo')">Combo Meals ({{ allComboLength }})</a>
                    </li>
                    <li><a href="#" @click.prevent="filterByCategory('drink')">Drinks ({{ allDrinkLength }})</a></li>
                    <li><a href="#" @click.prevent="filterByCategory('dessert')">Desserts ({{ allDessertLength }})</a>
                    </li>
                </ul>
            </div>
            <div class="product-container">
                <div class="operate">
                    <div class="search">
                        <input type="text" name="search" id="search" placeholder="Search your craving..."
                            v-model="searchKeyword" />
                        <a class="bi bi-search searchIcon"></a>
                    </div>
                    <NuxtLink to="/cart" class="checkoutBtn"><span>Checkout</span><i class="bi bi-cart4 cartIcon">
                            <span v-if="cartCount > 0" class="cart-count">{{ cartCount }}</span>
                        </i></NuxtLink>
                </div>
                <ul class="meals">
                    <li v-for="item in paginatedItems" :key="item.name">
                        <div class="window">
                            <img :src="`${base}image/products/${resolveCategory(item.name)}/${item.image}`" :alt="item.name" />
                        </div>
                        <h3>{{ item.name }}</h3>
                        <p class="description">{{ item.description }}</p>
                        <div class="line"></div>
                        <p class="price">NT$ {{ item.price }}</p>
                        <button type="button" @click="addToCart(item)">
                            <i class="bi bi-cart4"></i> Add to Cart
                        </button>
                    </li>
                </ul>
                <div class="pagenation">
                    <a href="#" class="bi bi-caret-left-fill eft_arrow" @click.prevent="goToPage(currentPage - 1)"></a>
                    <a v-for="page in totalPages" :key="page" href="#" :class="{ active: page === currentPage }"
                        @click.prevent="goToPage(page)">{{ page }}</a>
                    <a href="#" class="bi bi-caret-right-fill right_arrow"
                        @click.prevent="goToPage(currentPage + 1)"></a>
                </div>
            </div>
        </main>

        <Footer />

    </div>


</template>


<script setup lang="ts">

import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import { useCartStore } from '~/stores/cart'
import { useRuntimeConfig } from '#app'

useSeoMeta({
    title: 'MENU｜Hex Burger House'
})

const cartStore = useCartStore()

const cartCount = computed(() => cartStore.cartCount)

const config = useRuntimeConfig()
const base = config.app.baseURL || '/'

interface Meal {
  name: string
  price: number
  image: string
  description: string
}

const allHamburger = ref<Meal[]>([])
const allFries = ref<Meal[]>([])
const allCombo = ref<Meal[]>([])
const allDrink = ref<Meal[]>([])
const allDessert = ref<Meal[]>([])
const allMeals = ref<Meal[]>([])
const activeItems = ref<Meal[]>([])
const searchKeyword = ref('')
const currentPage = ref(1)
const itemsPerPage = 6

type Category = 'all' | 'hamburger' | 'fries' | 'combo' | 'drink' | 'dessert'

const filterByCategory = (category: Category) => {
    switch (category) {
        case 'hamburger':
            activeItems.value = allHamburger.value
            break
        case 'fries':
            activeItems.value = allFries.value
            break
        case 'combo':
            activeItems.value = allCombo.value
            break
        case 'drink':
            activeItems.value = allDrink.value
            break
        case 'dessert':
            activeItems.value = allDessert.value
            break
        default:
            allMeals.value = [
                ...allHamburger.value,
                ...allFries.value,
                ...allCombo.value,
                ...allDrink.value,
                ...allDessert.value
            ]
            activeItems.value = allMeals.value
            break
    }
}

const allLength = computed(() => allMeals.value.length)
const allHamburgerLength = computed(() => allHamburger.value.length)
const allFriesLength = computed(() => allFries.value.length)
const allComboLength = computed(() => allCombo.value.length)
const allDrinkLength = computed(() => allDrink.value.length)
const allDessertLength = computed(() => allDessert.value.length)

const resolveCategory = (name: string) => {
    if (allHamburger.value.find(item => item.name === name)) return 'hamburger'
    if (allFries.value.find(item => item.name === name)) return 'fries'
    if (allCombo.value.find(item => item.name === name)) return 'combo'
    if (allDrink.value.find(item => item.name === name)) return 'drink'
    if (allDessert.value.find(item => item.name === name)) return 'dessert'
    return 'unknown'
}

const filteredItems = computed(() => {
    const keyword = searchKeyword.value.toLowerCase()
    const result = !keyword
        ? activeItems.value
        : activeItems.value.filter(item =>
            item.name.toLowerCase().includes(keyword)
        )
    currentPage.value = 1
    return result
})

const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return filteredItems.value.slice(start, end)
})

const totalPages = computed(() =>
    Math.ceil(filteredItems.value.length / itemsPerPage)
)

function goToPage(page: number) {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
}

function addToCart(item: Meal) {
    const product = {
        name: item.name,
        price: item.price,
        image: item.image,
        category: resolveCategory(item.name)
    }
    cartStore.addToCart(product)
    Swal.fire({
        title: 'Added to Cart!',
        html: `<p class="message"><span>${item.name}</span><br />has been added to your cart.</p>`,
        icon: 'success',
        timer: 3000,
        timerProgressBar: true,
        confirmButtonText: 'Great!',
    })
}

onMounted(async () => {
    try {
        const res = await axios.get(`${base}/data/products.json`)
        allHamburger.value = res.data.hamburger
        allFries.value = res.data.fries
        allCombo.value = res.data.combo
        allDrink.value = res.data.drink
        allDessert.value = res.data.dessert

        filterByCategory('all')
    } catch (error) {
        console.error('資料讀取失敗', error)
    }
})

</script>


<style scoped lang="scss" src="@/assets/scss/pages/_menu.scss"></style>