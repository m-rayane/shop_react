import '../../utils/styles/cart.scss'
import React, { useEffect, useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import { Context } from '../../utils/Context'
import { updateCart, deleteProduct } from '../atoms/Services/cartServices'

export default function CartDetails({
  className,
  cartData,
  setTotalPrice,
  origin,
  showTotalQuantity,
  showModifyButton,
}) {
  const {
    productsData,
    totalQuantity,
    setCartData,
    allOptionData,
    getAllOptions,
  } = useContext(Context)

  useEffect(() => {
    if (origin === 'cart') {
      let totalPrice = 0
      if (cartData && allOptionData) {
        cartData.forEach((item) => {
          const productWithoutOption = productsData.find(
            (p) => p._id === item.productId && !item.option
          )
          if (productWithoutOption) {
            totalPrice += productWithoutOption._price * item.quantity
          }
          const option = allOptionData.find(
            (o) => o._productId === item.productId && o._name === item.option
          )
          if (option) {
            totalPrice += option._price * item.quantity
          }
        })
      }
      setTotalPrice(totalPrice)
    }
  }, [origin, cartData, productsData, setTotalPrice, allOptionData])

  const linkStyle = {
    color: 'inherit',
    textDecoration: 'inherit',
  }

  return (
    <div className={className}>
      <h3>
        Détail de votre panier{' '}
        {totalQuantity && showTotalQuantity && (
          <span>{`(${totalQuantity} article${
            totalQuantity > 1 ? `s` : ``
          })`}</span>
        )}
      </h3>
      <ul className={`${className}__list`}>
        {allOptionData &&
          cartData &&
          cartData.map((item, index) => {
            const productData = productsData.find(
              (p) => p._id === item.productId
            )
            let model = {}
            if (productData) {
              model = productData._model.toLowerCase()
            }
            let category = {}
            if (productData) {
              category = productData.category.toLowerCase().replace(/\s+/g, '-')
            }
            const handleChangeQuantity = (e) => {
              const newQuantity = updateCart(item.productId, e.target.value)
              setCartData(newQuantity)
            }

            const handleDeleteProduct = (id) => {
              const newQuantity = deleteProduct(id)
              setCartData(newQuantity)
            }

            const option = allOptionData.find((o) => o._name === item.option)

            const price =
              option && item.option ? option._price : productData._price

            return (
              <li className={`${className}__product`} key={index}>
                {productData && (
                  <>
                    <Link
                      to={`/boutique/${category}/${productData._id}`}
                      style={linkStyle}
                    >
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
                          to={`/boutique/${category}/${productData._id}`}
                          style={linkStyle}
                        >
                          <div
                            className={`${className}__product__content__header__name`}
                          >
                            <h4>{`${productData._name}${
                              item.option ? ' - ' + item.option : ''
                            }`}</h4>
                            <p className="">En stock</p>
                          </div>
                        </Link>
                        <div
                          className={`${className}__product__content__header__price`}
                        >
                          <p>
                            Prix unitaire :{' '}
                            {(price / 100).toFixed(2).replace('.', ',')}€
                          </p>
                          <p>
                            {((price * item.quantity) / 100)
                              .toFixed(2)
                              .replace('.', ',')}
                            €
                          </p>
                        </div>
                      </div>
                      {showModifyButton ? (
                        <div
                          className={`${className}__product__content__footer`}
                        >
                          <div
                            className={`${className}__product__content__footer__delete`}
                            onClick={() => handleDeleteProduct(item.productId)}
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
                      ) : (
                        <div
                          className={`${className}__product__content__quantity`}
                        >
                          Quantité : {item.quantity}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </li>
            )
          })}
      </ul>
    </div>
  )
}
