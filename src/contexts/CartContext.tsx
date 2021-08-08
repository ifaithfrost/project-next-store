import { NextPage } from 'next'
import { createContext, ReactNode, useEffect, useState } from 'react'

import Cookies from 'js-cookie'

export interface CartData {
  id: number
}

export interface CartContextData {
  cartData: CartData[]
  removeAllFromCart: () => void
  removeFromCart: (target: CartData) => void
  addToCart: (item: CartData) => void
}

interface CartProviderProps {
  children: ReactNode
  cartData: CartData[]
}

export const CartContext = createContext({} as CartContextData)

export const CartProvider: NextPage<CartProviderProps> = function ({ children, cartData }) {
  const [cartDataState, setCartDataState] = useState<CartData[]>(cartData)

  useEffect(() => {
    Cookies.set('cartData', JSON.stringify(cartDataState))
  }, [cartDataState])

  function removeAllFromCart(): void {
    setCartDataState([])
  }

  function removeFromCart(target: CartData): void {
    setCartDataState(
      cartDataState.filter((item) => {
        return item.id != target.id
      })
    )
  }

  function addToCart(item: CartData): void {
    const newCartData = cartDataState

    setCartDataState([...newCartData, item])
  }

  return (
    <CartContext.Provider
      value={{
        cartData: cartDataState,
        removeAllFromCart: removeAllFromCart,
        removeFromCart: removeFromCart,
        addToCart: addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
