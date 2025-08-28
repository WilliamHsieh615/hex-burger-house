import tsconfigPaths from 'vite-tsconfig-paths'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  srcDir: '.',
  css: ['@/assets/scss/main.scss'],

  app: {
    baseURL: '/hex-burger-house/',
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
    base: '/hex-burger-house/',
    plugins: [tsconfigPaths()]
  }

})

