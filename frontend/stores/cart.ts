import { defineStore } from 'pinia'

export interface CartItem {
    name: string
    price: number
    image: string
    category: string
    quantity: number
}

export const useCartStore = defineStore('cart', {
    state: () => ({
        cart: [] as CartItem[]
    }),
    getters: {
        cartCount(state): number {
            return state.cart.reduce((total, item) => total + item.quantity, 0)
        },
        subtotal(state): number {
            return state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
        }
    },
    actions: {
        loadFromLocalStorage() {
            const data = localStorage.getItem('cart')
            this.cart = data ? JSON.parse(data) as CartItem[] : []
        },
        saveToLocalStorage() {
            localStorage.setItem('cart', JSON.stringify(this.cart))
        },
        addToCart(item: Omit<CartItem, 'quantity'>) {
            const existing = this.cart.find(p => p.name === item.name)
            if (existing) {
                existing.quantity++
            } else {
                this.cart.push({ ...item, quantity: 1 })
            }
            this.saveToLocalStorage()
        },
        removeItem(index: number) {
            this.cart.splice(index, 1)
            this.saveToLocalStorage()
        },
        changeQuantity(index: number, delta: number) {
            const item = this.cart[index]
            if (!item) return
            item.quantity += delta
            if (item.quantity <= 0) {
                this.cart.splice(index, 1)
            }
            this.saveToLocalStorage()
        },
        clearCart() {
            this.cart = []
            this.saveToLocalStorage()
        }
    }
})

