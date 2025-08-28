<template>

  <form class="checkout-form" @submit.prevent="submitOrder" novalidate>
    <!-- CUSTOMER INFO -->
    <div class="customerInfo">
      <h2>CUSTOMER INFO</h2>
      <div class="name">
        <label for="name">Name</label>
        <div class="nameInput">
          <input type="text" id="name" placeholder="Enter your name" v-model="name" />
          <i class="bi bi-person-fill nameIcon"></i>
        </div>
      </div>

      <div class="phone">
        <label for="phone">Phone Number</label>
        <div class="phoneInput">
          <input type="tel" id="phone" placeholder="Enter your phone number" v-model="phone" />
          <i class="bi bi-telephone-fill phoneIcon"></i>
        </div>
      </div>

      <div class="email">
        <label for="email">Email Address</label>
        <div class="emailInput">
          <input type="email" id="email" placeholder="Enter your email" v-model="email" />
          <i class="bi bi-envelope emailIcon"></i>
        </div>
      </div>
    </div>

    <!-- PICKUP METHOD -->
    <div class="pickupMethod">
      <h2>PICKUP METHOD</h2>
      <ul class="pickUp">
        <li>
          <input type="radio" name="pickup_method" id="pickup" value="pickup" v-model="pickupMethod" />
          <label for="pickup">Pick-up</label>
        </li>
        <li class="pickUpTime" v-if="pickupMethod === 'pickup'">
          <label for="pickup-time">Date & Time</label>
          <input id="pickup-time" type="text" class="pickup-time" placeholder="Select a date & time"
            v-model="pickupTime" />
        </li>
      </ul>

      <ul class="delivery">
        <li>
          <input type="radio" name="pickup_method" id="delivery" value="delivery" v-model="pickupMethod" />
          <label for="delivery">Delivery</label>
        </li>
        <li class="deliveryTime" v-if="pickupMethod === 'delivery'">
          <label for="delivery-time">Date & Time</label>
          <input id="delivery-time" type="text" class="delivery-time" placeholder="Select a date & time"
            v-model="deliveryTime" />
        </li>

        <li id="tw-selector" class="address" v-if="pickupMethod === 'delivery'">
          <label for="address">Address</label>
          <div class="address_select">
            <input id="zipcode" type="text" class="zipcode" placeholder="Postal Code" readonly v-model="zipcode" />
            <select id="county" class="county" v-model="county"></select>
            <select id="district" class="district" v-model="district"></select>
          </div>
          <input id="address" type="text" class="address_detail" placeholder="Enter full address" required
            v-model="addressDetail" />
        </li>
      </ul>
    </div>

    <!-- INVOICE SETTINGS -->
    <div class="invoiceSettings">
      <h2>INVOICE SETTINGS</h2>
      <ul class="eInvoice">
        <li>
          <input type="radio" name="invoice" id="e-invoice" value="electronic" v-model="invoiceType" />
          <label for="e-invoice">Electronic Invoice</label>
        </li>
        <li class="carrier" v-if="invoiceType === 'electronic'">
          <label for="carrier">Carrier Number</label>
          <input type="text" id="carrier" pattern="^\\/[A-Z0-9]{7}$" placeholder="Enter carrier number, starts with /"
            v-model="carrierNumber" />
        </li>
      </ul>

      <div class="paperInvoice">
        <input type="radio" name="invoice" id="paper-invoice" value="paper" v-model="invoiceType" />
        <label for="paper-invoice">Paper Invoice</label>
      </div>

      <ul class="businessInvoice">
        <li>
          <input type="radio" name="invoice" id="business-invoice" value="business" v-model="invoiceType" />
          <label for="business-invoice">Unified Business Number</label>
        </li>
        <li class="tax-id" v-if="invoiceType === 'business'">
          <input type="text" id="tax-id" pattern="^\\d{8}$" placeholder="Enter 8-digit business number"
            v-model="businessNumber" />
        </li>
      </ul>
    </div>

    <!-- PAYMENT -->
    <div class="paymentMethod">
      <h2>PAYMENT METHOD</h2>

      <ul class="cash">
        <li><input type="radio" name="payment" id="cash" value="cash" v-model="paymentMethod" /><label for="cash">Cash
            (Pay upon
            pickup)</label></li>
      </ul>

      <ul class="credit-card">
        <li><input type="radio" name="payment" id="credit-card" value="credit-card" v-model="paymentMethod" /><label
            for="credit-card">Credit
            Card</label></li>
        <li class="icon">
          <img src="/image/icon/visa_icon.png" alt="visa" />
          <img src="/image/icon/mastercard_icon.png" alt="mastercard" />
          <img src="/image/icon/jcb_icon.png" alt="jcb" />
          <img src="/image/icon/AmericanExpress_icon.png" alt="american express" />
          <img src="/image/icon/UnionPay_icon.png" alt="union pay" />
        </li>
      </ul>

      <ul class="googlePay">
        <li><input type="radio" name="payment" id="googlePay" value="googlePay" v-model="paymentMethod" /><label
            for="googlePay">Google
            Pay</label></li>
        <li class="icon"><img src="/image/icon/google_pay_icon.png" alt="googlePay" /></li>
      </ul>

      <ul class="applePay">
        <li><input type="radio" name="payment" id="applePay" value="applePay" v-model="paymentMethod" /><label
            for="applePay">Apple Pay</label>
        </li>
        <li class="icon"><img src="/image/icon/apple_pay_icon.png" alt="applePay" /></li>
      </ul>

      <ul class="linepay">
        <li><input type="radio" name="payment" id="linepay" value="linepay" v-model="paymentMethod" /><label
            for="linepay">LINE Pay</label></li>
        <li class="icon"><img src="/image/icon/linepay.svg" alt="linepay" /></li>
      </ul>

      <ul class="jkpay">
        <li><input type="radio" name="payment" id="jkpay" value="jkpay" v-model="paymentMethod" /><label
            for="jkpay">JKOPay</label></li>
        <li class="icon"><img src="/image/icon/jko_icon.png" alt="jko" /></li>
      </ul>

      <ul class="paypal">
        <li><input type="radio" name="payment" id="paypal" value="paypal" v-model="paymentMethod" /><label
            for="paypal">PayPal</label></li>
        <li class="icon"><img src="/image/icon/paypal_icon.png" alt="paypal" /></li>
      </ul>
    </div>

    <button type="submit" class="payment_button">Proceed to Payment</button>
  </form>

</template>

<script setup>

import { ref, watch, nextTick } from 'vue'
import flatpickr from 'flatpickr'
import { useValidation } from '@/composables/useValidation'

const { isRequired, isValidPhone, isValidEmail, showErrors, showSuccess } = useValidation()

const emit = defineEmits(['orderSubmitted'])

defineProps({
  cart: {
    type: Array,
    default: () => []
  }
})

const name = ref('')
const phone = ref('')
const email = ref('')

const pickupTime = ref('')
const deliveryTime = ref('')

const zipcode = ref('')
const county = ref('')
const district = ref('')
const addressDetail = ref('')

const pickupMethod = ref('')
const invoiceType = ref('')
const carrierNumber = ref('')
const businessNumber = ref('')
const paymentMethod = ref('')

watch(pickupMethod, async (val) => {
  await nextTick()

  if (val === 'pickup') {
    flatpickr('#pickup-time', {
      enableTime: true,
      dateFormat: 'Y/m/d h:i K',
      minDate: 'today',
      maxDate: new Date(Date.now() + 7 * 86400000),
      minuteIncrement: 30,
      time_24hr: false,
      disableMobile: true,
      minTime: '11:30',
      maxTime: '22:00',
      onChange: (selectedDates, dateStr) => {
        pickupTime.value = dateStr
      }
    })
  }

  if (val === 'delivery') {
    flatpickr('#delivery-time', {
      enableTime: true,
      dateFormat: 'Y/m/d h:i K',
      minDate: 'today',
      maxDate: new Date(Date.now() + 7 * 86400000),
      minuteIncrement: 30,
      time_24hr: false,
      disableMobile: true,
      minTime: '11:30',
      maxTime: '22:00',
      onChange: (selectedDates, dateStr) => {
        deliveryTime.value = dateStr
      }
    })
    import('tw-city-selector').then(({ default: TwCitySelector }) => {
      new TwCitySelector({
        el: '#tw-selector',
        elCounty: '.county',
        elDistrict: '.district',
        elZipcode: '.zipcode',
        onCountySelect: (selectedCounty) => {
          county.value = selectedCounty
        },
        onDistrictSelect: (selectedDistrict) => {
          district.value = selectedDistrict
        },
        onZipcodeChange: (newZipcode) => {
          zipcode.value = newZipcode
        }
      })
    })
  }
})

const validateForm = () => {
  const errors = []

  if (!isRequired(name.value)) errors.push('Please enter your name.')
  if (!isRequired(phone.value)) errors.push('Please enter your phone number.')
  else if (!isValidPhone(phone.value)) errors.push('Invalid phone number format.')

  if (!isRequired(email.value)) errors.push('Please enter your email address.')
  else if (!isValidEmail(email.value)) errors.push('Invalid email address format.')

  if (!isRequired(pickupMethod.value)) errors.push('Please select a pickup method.')

  if (pickupMethod.value === 'delivery') {
    if (!zipcode.value || !county.value || !district.value || !addressDetail.value.trim()) {
      errors.push('Please complete your delivery address.')
    }
  }

  if (!isRequired(invoiceType.value)) errors.push('Please select an invoice type.')

  if (invoiceType.value === 'electronic') {
    if (!carrierNumber.value.trim() || !/^\/[A-Z0-9]{7}$/.test(carrierNumber.value.trim())) {
      errors.push('Carrier Number must start with / followed by 7 letters or digits.')
    }
  }

  if (invoiceType.value === 'business') {
    if (!businessNumber.value.trim() || !/^\d{8}$/.test(businessNumber.value.trim())) {
      errors.push('Business Number must be exactly 8 digits.')
    }
  }

  if (!isRequired(paymentMethod.value)) errors.push('Please select a payment method.')

  return showErrors(errors)
}

const submitOrder = () => {
  if (!validateForm()) return

  showSuccess('Order Submitted!', 'Your order has been sent successfully.').then(() => {
    emit('orderSubmitted')
  })
}

</script>

<style scoped lang="scss" src="@/assets/scss/sections/checkout/_checkout-form.scss"></style>