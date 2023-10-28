'use client'

import { useProductImagesStore } from '@/store/product-images-store'
import { fetchGQL } from '@/utils/fetch-gql'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import Image from 'next/image'

type Option = {
  id: string
  name: string
  image: {
    url: string
  }
}

interface ColorToggleGroupProps {
  productId: string
  options: Option[]
}

type ProductImagesVariant = {
  product: {
    name: string
    images: {
      id: string
      url: string
    }[]
  }
}

export function ColorToggleGroup({
  productId,
  options,
}: ColorToggleGroupProps) {
  const [setSelectedImage, setImages] = useProductImagesStore((state) => [
    state.setSelectedImage,
    state.setImages,
  ])

  async function GetProductVariant(color: string) {
    if (!color) return

    const query = `
      query GetProductProductImages {
        product(where: {id: "${productId}"}) {
          name
          images(where: {color: "${color}"}) {
            id
            url
          }
        }
      }
    `

    const { product } = await fetchGQL<ProductImagesVariant>(query)

    const productImages = product.images.map((img) => {
      return {
        id: img.id,
        url: img.url,
        productName: product.name,
      }
    })

    setSelectedImage(productImages[0])
    setImages(productImages)
  }

  return (
    <ToggleGroup.Root
      type="single"
      onValueChange={(color) => GetProductVariant(color)}
      className="mt-4 flex items-center gap-4"
    >
      {options?.map((opt) => (
        <ToggleGroup.Item
          key={opt.id}
          value={opt.name}
          className="h-11 w-11 overflow-hidden rounded-lg border-2 hover:brightness-90 data-[state=off]:border-transparent data-[state=on]:border-orange-500 transition-colors"
        >
          <Image
            src={opt.image.url}
            alt=""
            width={84}
            height={84}
            className="h-full w-full object-cover"
          />
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  )
}
