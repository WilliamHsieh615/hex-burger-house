<template>
  <section id="book" class="book">
    <h2>We're Always Packed<br />Better Book Your Spot Now!</h2>
    <div class="form-container">
      <div id="map" class="map"></div>

      <form @submit.prevent="handleSubmit" novalidate>
        <label for="name">Name<span>*</span></label>
        <input id="name" type="text" v-model="name" placeholder="Enter your name" />

        <label for="phone">Phone<span>*</span></label>
        <input id="phone" type="tel" v-model="phone" placeholder="Enter your phone number" />

        <label for="email">Email<span>*</span></label>
        <input id="email" type="email" v-model="email" placeholder="Enter your email" />

        <label for="date">Date<span>*</span></label>
        <input id="date" type="text" v-model="date" placeholder="Select a date & time" />

        <label for="number">Guests<span>*</span></label>
        <input id="number" type="number" v-model="number" placeholder="Enter number of guests" min="1" />

        <label>Vegetarian Option?</label>
        <div class="radio">
          <label for="yes">Yes
            <input id="yes" type="radio" name="vege" value="yes" v-model="vege" />
          </label>
          <label for="no">No
            <input id="no" type="radio" name="vege" value="no" v-model="vege" />
          </label>
        </div>

        <div class="button">
          <input type="reset" value="Clear" class="resetBtn" @click="resetForm" />
          <input type="submit" value="Book Now" class="submitBtn" />
        </div>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from 'vue'
import { useValidation } from '@/composables/useValidation'
// import type * as Leaflet from 'leaflet'
// import L from 'leaflet'
// import 'leaflet/dist/leaflet.css'

const {
  isRequired,
  isValidPhone,
  isValidEmail,
  isPositiveInteger,
  showErrors,
  showSuccess
} = useValidation()

const name = ref('')
const phone = ref('')
const email = ref('')
const date = ref('')
const number = ref<string | number>('')

const vege = ref('no')

const resetForm = () => {
  name.value = ''
  phone.value = ''
  email.value = ''
  date.value = ''
  number.value = ''
  vege.value = 'no'
}

const validateForm = () => {
  const errors: string[] = []

  if (!isRequired(name.value)) errors.push('Please enter your name.')
  if (!isRequired(phone.value)) errors.push('Please enter your phone number.')
  else if (!isValidPhone(phone.value)) errors.push('Invalid phone number format.')

  if (!isRequired(email.value)) errors.push('Please enter your email address.')
  else if (!isValidEmail(email.value)) errors.push('Invalid email address format.')

  if (!isRequired(date.value)) errors.push('Please select a reservation date and time.')

  if (!isRequired(String(number.value))) errors.push('Please enter number of guests.')
  else if (!isPositiveInteger(String(number.value))) errors.push('Number of guests must be a positive integer.')

  return showErrors(errors)
}

const handleSubmit = () => {
  if (!validateForm()) return

  showSuccess('Booking submitted!', 'Thank you for your reservation.').then(() => {
    resetForm()
  })
}

onMounted(async () => {
  if (!import.meta.env.SSR) {
    const flatpickr = (await import('flatpickr')).default
    await import('flatpickr/dist/flatpickr.min.css')

    flatpickr('#date', {
      enableTime: true,
      dateFormat: 'Y/m/d h:i K',
      minDate: 'today',
      maxDate: new Date(Date.now() + 90 * 86400000),
      minuteIncrement: 30,
      time_24hr: false,
      disableMobile: true,
      minTime: '11:30',
      maxTime: '22:00'
    })

    const L: typeof import('leaflet') = await import('leaflet')
    await import('leaflet/dist/leaflet.css')

    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
      iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
      shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
    })

    const map = L.map('map').setView([23.8714, 120.6918], 17)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map)

    L.marker([23.8714, 120.6918])
      .addTo(map)
      .bindPopup(`
        <div style="font-weight:bold; font-size:16px;">
          Hex Burger House
        </div>
        <div style="font-size:14px;">
          No. 361-147, Zhangnan Rd.,<br />
          Mingjian Township,<br />
          Nantou County 551, Taiwan (R.O.C.)
        </div>
      `)
      .openPopup()
  }
})

</script>

<style scoped lang="scss" src="@/assets/scss/sections/index/_booking.scss"></style>
