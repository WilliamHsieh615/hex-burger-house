// import tsconfigPaths from 'vite-tsconfig-paths'

// export default defineNuxtConfig({
//   compatibilityDate: '2025-07-15',
//   devtools: { enabled: true },
//   srcDir: '.',
//   css: ['@/assets/scss/main.scss'],

//   // 輸出靜態網站時使用
//   app: {
//     baseURL: '/HexBurgerHouse/',
//   },

//   nitro: {
//     preset: 'static'
//   },

//   modules: [
//     '@nuxt/eslint',
//     '@nuxt/fonts',
//     '@nuxt/icon',
//     '@nuxt/image',
//     '@pinia/nuxt'
//   ],

//   vite: {
//     plugins: [tsconfigPaths()]
//   }
// })

import tsconfigPaths from 'vite-tsconfig-paths'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  srcDir: '.',
  css: ['@/assets/scss/main.scss'],

  app: {
    baseURL: '/HexBurgerHouse/',
  },

  nitro: {
    preset: 'static'
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@pinia/nuxt'
  ],

  vite: {
    base: '/HexBurgerHouse/',
    plugins: [tsconfigPaths()]
  }

})

