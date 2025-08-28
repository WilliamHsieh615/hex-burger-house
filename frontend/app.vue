<script setup lang="ts">
useHead({
  meta: [
    { charset: 'UTF-8' },
    { 'http-equiv': 'Content-language', content: 'en' },
    { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no'
    },
    { name: 'author', content: 'William Hsieh' },
    { name: 'copyright', content: 'Hex Burger House' },
    {
      name: 'description',
      content: 'Bite into the unforgettable flavor of Hex Burger. Customers keep asking: what’s the secret to such a delicious burger?'
    },
    {
      name: 'keywords',
      content: 'Hex Western Restaurant, Hex Burger, Western Cuisine, Gourmet Burgers'
    },
    { property: 'og:title', content: 'Hex Burger House' },
    { property: 'og:description', content: 'Bite into the unforgettable flavor of Hex Burger.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://github.com/WilliamHsieh615' },
    { property: 'og:image', content: '/image/demo_photo.png' },
    { property: 'og:site_name', content: 'Hex Burger House' },
    { property: 'og:locale', content: 'en_US' },
    { property: 'og:image:width', content: '600' },
    { property: 'og:image:height', content: '420' },
    { property: 'og:image:alt', content: 'Hex Burger House' }
  ],
  link: [
    { rel: 'icon', href: './image/logo.ico', type: 'image/x-icon' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Staatliches&family=Anton&family=Bebas+Neue&family=Russo+One&family=Noto+Sans+TC&family=Oswald&family=Roboto&display=swap'
    }
  ]
})
</script>

<template>
  <NuxtLayout>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </NuxtLayout>
</template>
