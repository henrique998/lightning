export function formatPrice(price: number) {
  return new Intl.NumberFormat('pt-Br', {
    style: 'currency',
    currency: 'BRL',
  }).format(price / 100)
}
