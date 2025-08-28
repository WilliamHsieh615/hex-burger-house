<template>

    <section id="feature" class="feature">
        <h2>
            People Always Ask<br />
            What's the Secret Behind the Flavor?
        </h2>
        <ul class="card-container">
            <li v-for="(item, i) in features" :key="i" class="card">
                <div class="window">
                    <img :src="item.img" :alt="item.title" />
                </div>
                <h3>{{ item.title }}</h3>
                <p>{{ item.description }}</p>
            </li>
        </ul>
    </section>

</template>

<script setup lang="ts">

const features = [
    {
        img: './image/feature1.png',
        title: 'Fresh Local Veggies',
        description: 'We partner with local farms to bring you crisp, seasonal greens that pack a punch of freshness in every bite.'
    },
    {
        img: './image/feature2.png',
        title: 'Award-Winning Chefs',
        description: 'Our grill masters have cooked in top-rated kitchens across the U.S., now bringing their craft to your plate.'
    },
    {
        img: './image/feature3.png',
        title: 'Uncompromising Craft',
        description: 'From sourcing to searing, every detail is obsessively handled. We don’t cut corners—only prime cuts.'
    }
]

</script>

<style scoped lang="scss" src="@/assets/scss/sections/index/_feature.scss"></style>