'use client'

import * as ToggleGroup from '@radix-ui/react-toggle-group'
import Image from 'next/image'

import { ProductImage } from '@/store/product-images-store'

interface GalleryImageProps {
  productImages: ProductImage[]
  selectedImage: ProductImage | null
  onChangeSelectedImage: (img: ProductImage) => void
}

export function GalleryImage({
  productImages,
  selectedImage,
  onChangeSelectedImage,
}: GalleryImageProps) {
  function handleChangeSelectedImage(imgId: string) {
    const imageIndex = productImages.findIndex((img) => img.id === imgId)

    if (imageIndex >= 0) {
      onChangeSelectedImage(productImages[imageIndex])
    }
  }

  return (
    <ToggleGroup.Root
      type="single"
      defaultValue={selectedImage?.id}
      onValueChange={handleChangeSelectedImage}
      className="mt-5 flex items-center gap-4"
    >
      {productImages.map((img) => (
        <ToggleGroup.Item
          key={img.id}
          value={img.id}
          className="h-12 w-12 overflow-hidden rounded-lg border-2 hover:brightness-90 data-[state=off]:border-transparent data-[state=on]:border-orange-500 transition-colors"
        >
          <Image
            src={img.url}
            alt={img.productName}
            width={144}
            height={144}
            className="h-full w-full object-cover"
          />
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  )
}
