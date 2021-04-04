import { NextPage } from 'next'
import { useState, createContext, ReactNode } from 'react'

export interface ProductData {
  id: number
  name: string
  price: number
  discount: number
  amount: number
  title: string
  description: string
  images: Array<ImageData>
  categories: Array<CategoryData>
}

export interface ImageData {
  id: number
  url: string
}

export interface CategoryData {
  id: string
  category: string
}

export interface ProductsProviderProps {
  children: ReactNode
  productsData: ProductData[]
}

export interface ProductsContextData {
  productList: ProductData[]
  setProductsList: (products: Array<ProductData>) => void
}

export const ProductsContext = createContext({} as ProductsContextData)

export const ProductsProvider: NextPage<ProductsProviderProps> = function ({
  children,
  productsData,
}) {
  const setProductsList = (productsData: ProductData[]): void => {
    setProductListState({ ...productListState, productList: productsData })
  }

  const [productListState, setProductListState] = useState({
    productList: productsData,
    setProductsList: setProductsList,
  })

  return <ProductsContext.Provider value={productListState}>{children}</ProductsContext.Provider>
}
