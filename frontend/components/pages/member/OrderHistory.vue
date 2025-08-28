<template>
  <div class="orderHistory">
    <h2>ORDER HISTORY</h2>

    <div v-if="orders.length === 0" class="no-orders">
      No orders found.
    </div>

    <div class="order-container" v-else>
      <table v-for="(order, index) in orders" :key="order.orderNumber" class="order-table">
        <tbody>
          <tr>
            <th>Order Date</th>
            <td>{{ order.orderDate }}</td>
          </tr>
          <tr>
            <th>Order Number</th>
            <td>{{ order.orderNumber }}</td>
          </tr>
          <tr>
            <th>Customer Name</th>
            <td>{{ order.customerName }}</td>
          </tr>
          <tr>
            <th>Phone</th>
            <td>{{ order.phone }}</td>
          </tr>
          <tr>
            <th>Address</th>
            <td>{{ order.address }}</td>
          </tr>
          <tr>
            <th>Pickup Method</th>
            <td>{{ order.pickupMethod }}</td>
          </tr>
          <tr>
            <th>Pickup Time</th>
            <td>{{ order.pickupTime }}</td>
          </tr>
          <tr>
            <th>Details</th>
            <td class="order_container">
              <div class="orderSummary">
                <h4>Order Summary</h4>
                <ul>
                  <li>Subtotal: NT$ {{ order.subtotal }}</li>
                  <li>Delivery Fee: NT$ {{ order.deliveryFee }}</li>
                  <li>Total: NT$ {{ order.total }}</li>
                </ul>
              </div>
              <div class="shoppingList">
                <h4>Shopping List</h4>
                <ul>
                  <li v-for="(item, idx) in order.shoppingList" :key="idx">
                    {{ item.name }} x{{ item.quantity }}｜NT$ {{ item.price }}
                  </li>
                </ul>
              </div>
            </td>
          </tr>
          <tr class="orderStatus">
            <th>Order Status</th>
            <td>{{ order.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 靜態假資料，之後換成API串接
const orders = ref([
  {
    orderDate: '2025/07/01 18:00:00',
    orderNumber: 'ST20250701180000',
    customerName: 'John Doe',
    phone: '0912345678',
    address: 'No. 520, Xingxing Rd., Xinxing Dist., Kaohsiung City',
    pickupMethod: 'Pickup',
    pickupTime: '2025/07/01 20:00:00',
    subtotal: 120,
    deliveryFee: 60,
    total: 180,
    shoppingList: [
      { name: 'Classic Combo', quantity: 1, price: 120 },
      { name: 'Shoestring Fries', quantity: 1, price: 120 }
    ],
    status: 'Completed'
  },
  {
    orderDate: '2025/07/01 18:00:00',
    orderNumber: 'ST20250701180001',
    customerName: 'John Doe',
    phone: '0912345678',
    address: 'No. 520, Xingxing Rd., Xinxing Dist., Kaohsiung City',
    pickupMethod: 'Delivery',
    pickupTime: '2025/07/01 20:00:00',
    subtotal: 120,
    deliveryFee: 60,
    total: 180,
    shoppingList: [
      { name: 'Classic Combo', quantity: 1, price: 120 },
      { name: 'Shoestring Fries', quantity: 1, price: 120 }
    ],
    status: 'Completed'
  }
])
</script>

<style scoped lang="scss" src="@/assets/scss/sections/member/_order-history.scss"></style>