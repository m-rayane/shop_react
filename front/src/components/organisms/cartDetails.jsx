import '../../utils/styles/cart.scss'
import React, { useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Context } from '../../utils/Context'
import { updateCart, deleteProduct } from '../atoms/Services/cartSerivces'

const CartDetails = ({ className, cartData, setTotalPrice, totalQuantity }) => {
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

  const linkStyle = {
    color: 'inherit',
    textDecoration: 'inherit',
  }

  return (
    <>
      <h2>
        Détail de votre panier{' '}
        <span>{`(${totalQuantity} article${
          totalQuantity > 1 ? `s` : ``
        })`}</span>
      </h2>
      <ul className={className}>
        {cartData &&
          cartData.map((item) => {
            const productData = productsData.find(
              (p) => p._id === item.productId
            )
            let model = {}
            if (productData) {
              model = productData._model.toLowerCase()
            }
            const handleChangeQuantity = (e) => {
              updateCart(item.productId, e.target.value)
            }
            return (
              <li className={`${className}__product`} key={item.productId}>
                {productData && (
                  <>
                    <Link to={`/boutique/${productData._id}`} style={linkStyle}>
                      <div className={`${className}__product__image`}>
                        <img
                          src={require(`../../api/Datas/images/products/${model}/technical/thumbnail/${model}-tech-00.jpg`)}
                          alt="Nom du produit"
                        />
                      </div>
                    </Link>
                    <div className={`${className}__product__content`}>
                      <div className={`${className}__product__content__header`}>
                        <Link
                          to={`/boutique/${productData._id}`}
                          style={linkStyle}
                        >
                          <div
                            className={`${className}__product__content__header__name`}
                          >
                            <h4>{productData._name}</h4>
                            <p className="">En stock</p>
                          </div>
                        </Link>
                        <div
                          className={`${className}__product__content__header__price`}
                        >
                          <p>Prix unitaire : {productData._price},00€</p>
                          <p>{productData._price * item.quantity},00€</p>
                        </div>
                      </div>
                      <div className={`${className}__product__content__footer`}>
                        <div
                          className={`${className}__product__content__footer__delete`}
                          onClick={() => deleteProduct(item.productId)}
                        >
                          Supprimer
                        </div>
                        <div
                          className={`${className}__product__content__footer__quantity`}
                        >
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={handleChangeQuantity}
                            min="1"
                            max="100"
                          />
                        </div>
                      </div>
                    </div>
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
