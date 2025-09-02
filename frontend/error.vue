<template>

    <div class="wrap">

        <Header />

        <main class="error-main">

            <Title />

            <div class="content">
                <h2 v-if="error.statusCode === 404">
                    This page does not exist, redirecting to the homepage...
                </h2>
                <h2 v-else>
                    Error occurred：{{ error.statusCode }}
                </h2>
            </div>

        </main>

        <Footer />

    </div>

</template>

<script setup lang="ts">
const props = defineProps({
    error: Object
})

import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import Title from '~/components/base/Title.vue'
const router = useRouter()

onMounted(() => {
    if (props.error.statusCode === 404) {
        setTimeout(() => {
            router.push('/')
        }, 3000)
    }
})
</script>

<style scoped lang="scss" src="@/assets/scss/pages/_error.scss"></style>
