<template>
    <div class="wrap">

        <Header />

        <FeatureSection />

        <ChefSection />
        
        <BookingSection />

        <Footer />

    </div>
</template>

<script setup lang="ts">

import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import FeatureSection from '~/components/pages/index/FeatureSection.vue'
import ChefSection from '~/components/pages/index/ChefSection.vue'
import BookingSection from '~/components/pages/index/BookingSection.vue'

useSeoMeta({
  title: 'INDEX｜Hex Burger House'
})

</script>
