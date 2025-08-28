// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    'vue/html-self-closing': ['error', {
      html: {
        void: 'always', // <img> <input> 要自閉合
        normal: 'never', // <div> <a> <span> 不要自閉合
        component: 'always'
      },
      svg: 'always',
      math: 'always'
    }]
  }
})

module.exports = {
  rules: {
    'vue/multi-word-component-names': 'off' // 關閉 Vue 的「多字元元件命名規則」
  }
}

