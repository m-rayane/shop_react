export const getCart = () => {
  let cartProducts = []
  if (localStorage.getItem('cart')) {
    cartProducts = JSON.parse(localStorage.getItem('cart'))
  }
  return cartProducts
}

export const saveCartLS = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart))
}

export const addToCart = (productId, quantity, option) => {
  let cart = getCart()
  const productInCart = cart.find(
    (item) => item.productId === productId && item.option === option
  )
  if (!productInCart) {
    let product = { productId, quantity, option }
    cart.push(product)
  } else {
    productInCart.quantity += parseInt(quantity)
  }
  saveCartLS(cart)
  return cart
}

export const updateCart = (productId, newQuantity) => {
  let cart = getCart()
  if (cart) {
    const productInCart = cart.find((item) => item.productId === productId)
    if (productInCart) {
      productInCart.quantity = parseInt(newQuantity)
    }
  }
  saveCartLS(cart)
  return cart
}

export const deleteProduct = (productId) => {
  let cart = getCart()
  const newCart = cart.filter((item) => item.productId !== productId)
  saveCartLS(newCart)
  return newCart
}
