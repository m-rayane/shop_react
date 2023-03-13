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

export const addToCart = (productId, quantity) => {
  console.log(productId, quantity)
  let cart = getCart()
  const productInCart = cart.find((item) => item.productId === productId)
  if (!productInCart) {
    let product = { productId, quantity }
    cart.push(product)
  } else {
    productInCart.quantity += parseInt(quantity)
  }
  saveCartLS(cart)
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
  window.location.reload()
}

export const deleteProduct = (productId) => {
  const cart = getCart()
  const newCart = cart.filter((item) => item.productId !== productId)
  saveCartLS(newCart)
  window.location.reload()
}
