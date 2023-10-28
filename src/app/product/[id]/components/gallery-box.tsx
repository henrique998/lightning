/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import {
  ProductImage,
  useProductImagesStore,
} from '@/store/product-images-store'
import Image from 'next/image'
import { useEffect } from 'react'
import { GalleryImage } from '../gallery-image'

interface GalleryBoxProps {
  productImages: ProductImage[]
}

export function GalleryBox({ productImages }: GalleryBoxProps) {
  const [images, selectedImage, setSelectedImage, setImages] =
    useProductImagesStore((state) => [
      state.images,
      state.selectedImage,
      state.setSelectedImage,
      state.setImages,
    ])

  useEffect(() => {
    setImages(productImages)
    setSelectedImage(productImages[0])
  }, [])

  return (
    <div className="max-w-md w-full">
      {selectedImage && (
        <div className="w-full h-[450px]">
          <Image
            src={selectedImage?.url}
            alt={selectedImage?.productName}
            width={900}
            height={1350}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
      )}

      <GalleryImage
        productImages={images}
        selectedImage={selectedImage}
        onChangeSelectedImage={setSelectedImage}
      />
    </div>
  )
}
