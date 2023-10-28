import { AppHeader } from '@/components/app-header'
import { fetchGQL } from '@/utils/fetch-gql'
import { formatPrice } from '@/utils/format-price'
import { AddToCartButton } from './components/add-to-cart-button'
import { ColorToggleGroup } from './components/color-toggle-group'
import { GalleryBox } from './components/gallery-box'
import { SizeToggleGroup } from './components/size-toggle-group'

interface ProductProps {
  params: {
    id: string
  }
}

type ProductDetails = {
  product: {
    name: string
    description: string
    price: number
    productColors: {
      id: string
      name: string
      image: {
        url: string
      }
    }[]
    productSizes: {
      id: string
      value: string
    }[]
    images: {
      id: string
      url: string
    }[]
  }
}

async function GetProductById(id: string) {
  const query = `
    query GetProductById {
      product(where: {id: "${id}"}) {
        name
        description
        price
        productColors {
          id
          name
          image {
            url
          }
        }
        productSizes {
          id
          value
        }
        images(where: {color: "black"}) {
          id
          url
        }
      }
    }
  `

  const { product } = await fetchGQL<ProductDetails>(query, 15)

  return product
}

export default async function Product({ params }: ProductProps) {
  const product = await GetProductById(params.id)

  const productImages = product?.images.map((img) => {
    return {
      id: img.id,
      url: img.url,
      productName: product.name,
    }
  })

  return (
    <main>
      <AppHeader />

      <section className="max-w-[1080px] w-full px-4 pb-8 lg:pb-0 mx-auto mt-8 flex flex-col lg:flex-row items-start gap-7">
        <GalleryBox productImages={productImages} />

        <div className="max-w-[590px] w-full h-[526px] flex flex-col justify-between">
          <div>
            <h1 className="text-3xl lg:text-5xl text-zinc-950 font-medium">
              {product?.name}
            </h1>
            <p className="mt-5 text-zinc-400">{product?.description}</p>

            <strong className="block mt-5 text-2xl text-orange-500 font-medium">
              {formatPrice(product?.price)}
            </strong>

            <div className="mt-5 flex flex-col gap-4 lg:gap-0 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h3>Selecione um tamanho</h3>

                <SizeToggleGroup options={product?.productSizes} />
              </div>

              <div>
                <h3>Selecione uma cor</h3>

                <ColorToggleGroup
                  productId={params.id}
                  options={product?.productColors}
                />
              </div>
            </div>
          </div>

          <AddToCartButton
            product={{
              id: params.id,
              name: product.name,
              price: product.price,
              images: product.images,
            }}
          />
        </div>
      </section>
    </main>
  )
}
