<template>
  <form class="profile-form" @submit.prevent="handleSave" novalidate>
    <h2>PROFILE</h2>

    <div class="info">
      <div class="email">
        <label for="email">Email Address</label>
        <div class="emailInput">
          <input type="email" id="email" v-model="email" disabled />
          <i class="bi bi-envelope emailIcon"></i>
        </div>
        <p class="field-note">To update your email address, please contact us.</p>
      </div>

      <div class="name">
        <label for="name">Name</label>
        <div class="nameInput">
          <input type="text" id="name" v-model="name" required :readonly="!isEditing" />
          <i class="bi bi-person-fill nameIcon"></i>
        </div>
      </div>

      <div class="phone">
        <label for="phone">Phone Number</label>
        <div class="phoneInput">
          <input type="tel" id="phone" v-model="phone" pattern="^(09\d{8}|0\d{8,9})$" required :readonly="!isEditing" />
          <i class="bi bi-telephone-fill phoneIcon"></i>
        </div>
      </div>

      <div class="birthday">
        <label for="birthday">Birthday</label>
        <div class="birthdayInput">
          <input type="text" id="birthday" v-model="birthday" disabled />
          <i class="bi bi-cake2-fill birthdayIcon"></i>
        </div>
        <p class="field-note">To update your birthday, please contact us.</p>
      </div>

      <div class="promotionalInfo">
        <input type="checkbox" id="promotionalInfo" v-model="promo" :disabled="!isEditing" />
        <label for="promotionalInfo">Subscribe to promotional offers</label>
      </div>
    </div>

    <button v-if="!isEditing" type="button" class="editBtn" @click="isEditing = true">Edit</button>
    <button v-else type="submit" class="saveBtn">Save</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useValidation } from '@/composables/useValidation'

const {
  isRequired,
  isValidPhone,
  showErrors,
  showSuccess
} = useValidation()

// 模擬初始資料
const email = ref('test@mail.com')
const name = ref('William Hsieh')
const phone = ref('0912345678')
const birthday = ref('2025/07/15')
const promo = ref(true)

// 控制編輯狀態
const isEditing = ref(false)

const handleSave = () => {
  const errors = []

  if (!isRequired(name.value) || !isRequired(phone.value)) {
    errors.push('Please fill out all required fields.')
  }

  if (!isValidPhone(phone.value)) {
    errors.push('Invalid phone number format.')
  }

  if (!showErrors(errors)) return

  showSuccess('Saved!', 'Your profile has been updated.')

  isEditing.value = false
}

</script>

<style scoped lang="scss" src="@/assets/scss/sections/member/_profile-form.scss"></style>
