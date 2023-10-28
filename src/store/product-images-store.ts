import { create } from 'zustand'

export type ProductImage = {
  id: string
  url: string
  productName: string
}

interface ProductImagesStore {
  images: ProductImage[]
  setImages: (productImages: ProductImage[]) => void
  selectedImage: ProductImage | null
  setSelectedImage: (selectedImage: ProductImage) => void
}

export const useProductImagesStore = create<ProductImagesStore>()((set) => ({
  images: [],
  setImages(productImages: ProductImage[]) {
    set(() => ({ images: productImages }))
  },
  selectedImage: null,
  setSelectedImage: (selectedImage: ProductImage) => set({ selectedImage }),
}))
