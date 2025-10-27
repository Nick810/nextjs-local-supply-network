export interface CartItem {
  variantId: string
  varaintTitle: string
  title: string
  price: number
  image: string | undefined
  quantity: number
}

export interface CartState {
  cartId?: string
  items: CartItem[]
  checkoutUrl?: string
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void
  removeItem: (variantId: string) => void
  updateQuantity: (variantId: string, quantity: number) => void
  clearCart: () => void
  _toApiLines: () => CartApiLine[]
  checkout: () => Promise<string | undefined>
  setCartId: (id: string) => void
  setCheckoutUrl: (url: string) => void
}

export interface CartCreateResponse {
  cartCreate: {
    cart: {
      id: string
      checkoutUrl: string
    }
    userErrors: { message: string }[]
  }
}

export interface CartLinesAddResponse {
  cartLinesAdd: {
    cart: {
      checkoutUrl: string
    }
    userErrors: { message: string }[]
  }
}

export type CartApiLine = { 
  merchandiseId: string;
  quantity: number 
};