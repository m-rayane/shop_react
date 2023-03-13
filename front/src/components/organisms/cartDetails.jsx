import '../../utils/styles/cart.scss'
import React, { useEffect, useContext } from 'react'

import { Context } from '../../utils/Context'
import { updateCart, deleteProduct } from '../atoms/Services/cartSerivces'

const CartDetails = ({ cartData, setTotalPrice }) => {
  const { productsData } = useContext(Context)

  useEffect(() => {
    let totalPrice = 0
    if (cartData) {
      cartData.forEach((item) => {
        const productData = productsData.find((p) => p._id === item.productId)
        if (productData) {
          totalPrice += productData._price * item.quantity
        }
      })
    }
    setTotalPrice(totalPrice)
  }, [cartData, productsData, setTotalPrice])

  return (
    <>
      <h2>Détail de votre commande</h2>
      <ul>
        {cartData &&
          cartData.map((item) => {
            const productData = productsData.find(
              (p) => p._id === item.productId
            )
            const handleChangeQuantity = (e) => {
              updateCart(item.productId, e.target.value)
            }
            return (
              <li key={item.productId}>
                {productData && (
                  <>
                    <p className="">
                      <img src={productData._image} alt="Nom du produit" />
                      {productData._name} - Quantité :{' '}
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={handleChangeQuantity}
                      />{' '}
                    </p>
                    <p>Prix unitaire : {productData._price}€</p>
                    <p>Prix total : {productData._price * item.quantity}€</p>
                    <button onClick={() => deleteProduct(item.productId)}>
                      Supprimer
                    </button>
                  </>
                )}
              </li>
            )
          })}
      </ul>
    </>
  )
}

export default CartDetails
