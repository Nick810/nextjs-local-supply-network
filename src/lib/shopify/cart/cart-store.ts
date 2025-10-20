import { create } from 'zustand';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';
import { CartApiLine, CartState } from './types';
import { createCart } from './api';

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set, get) => ({
        cartId: undefined,
        items: [],
        checkoutUrl: undefined,

        addItem: (item) =>
          set((state) => {
            const existing = state.items.find(i => i.variantId === item.variantId)
            const qty = item.quantity ?? 1

            if (existing) {
              return {
                items: state.items.map(i =>
                  i.variantId === item.variantId
                    ? { ...i, quantity: i.quantity + qty }
                    : i
                )
              }
            }

            return {
              items: [...state.items, { ...item, quantity: qty }]
            }
          }),

        removeItem: (variantId) =>
          set((state) => ({
            items: state.items.filter(i => i.variantId !== variantId)
          })),

        updateQuantity: (variantId, quantity) => {
          if (quantity <= 0) {
            get().removeItem(variantId)
            return
          }
          set((state) => ({
            items: state.items.map(i =>
              i.variantId === variantId ? { ...i, quantity } : i
            )
          }))
        },

        clearCart: () =>
          set({ items: [], checkoutUrl: undefined }),

        _toApiLines: () => get().items.map(i => ({
          merchandiseId: i.variantId,
          quantity: i.quantity,
        })) as CartApiLine[],

        checkout: async () => {
          const { _toApiLines, setCheckoutUrl, setCartId } = get()
          const lines = _toApiLines()

          if (!lines.length) return
        
          
          const { cartId: newId, checkoutUrl } = await createCart(lines)
          setCartId(newId)
          setCheckoutUrl(checkoutUrl)
          return checkoutUrl
        },

        setCartId: (id: string) => set({ cartId: id }),
        setCheckoutUrl: (url: string) => set({ checkoutUrl: url }),
      }),
      {
        name: 'shopify-cart',         // key in localStorage
        storage: createJSONStorage(() => localStorage)  // ← replace getStorage
      }
    )
  )
)