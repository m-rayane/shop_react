import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'

import '../utils/styles/product.scss'

import { Context } from '../utils/Context'
import { addToCart } from '../components/atoms/cartSerivces'

import { StarSvg } from '../components/atoms/svg/star'

const Product = () => {
  const { productsData } = useContext(Context)
  const { id } = useParams()
  const [productData, setProductData] = useState()
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (productsData) {
      const data = productsData.find((p) => p._id === id)
      if (data) {
        setProductData(data)
      }
    }
  }, [id, productsData])

  const handleAddToCart = () => {
    addToCart(productData._id, quantity)
  }

  if (!productData) {
    return <div>Chargement...</div>
  }

  return (
    <div>
      <div className="shop__content__products__card">
        <div className="shop__content__products__card__image">
          <img src={productData._image} alt="Nom du produit" />
        </div>
        <div className="shop__content__products__card__info">
          <h2 className="shop__content__products__card__info__title">
            {productData.name}
          </h2>
          <p className="shop__content__products__card__info__description">
            {productData.description}
          </p>
          <div className="shop__content__products__card__info__rating">
            <span className="shop__content__products__card__info__rating__icon">
              <StarSvg />
            </span>
            <span className="shop__content__products__card__info__rating__icon">
              <StarSvg />
            </span>
            <span className="shop__content__products__card__info__rating__icon">
              <StarSvg />
            </span>
            <span className="shop__content__products__card__info__rating__icon">
              <StarSvg />
            </span>
            <span className="shop__content__products__card__info__rating__icon">
              <StarSvg />
            </span>
            <span className="shop__content__products__card__info__rating__count">
              (32 avis)
            </span>
          </div>
          <div className="shop__content__products__card__info__footer">
            <div className="shop__content__products__card__info__footer__left">
              <p className="shop__content__products__card__info__footer__left__brand">
                Marque : {productData.brand}
              </p>
              <p className="shop__content__products__card__info__footer__left__model">
                Modèle : {productData.model}
              </p>
              <p className="shop__content__products__card__info__footer__category">
                Catégorie : {productData.category}
              </p>
            </div>
            <div className="shop__content__products__card__info__footer__right">
              <p className="shop__content__products__card__info__footer__right__price">
                {productData.price} €
              </p>
              <button
                className="shop__content__products__card__info__footer__right__btn"
                onClick={handleAddToCart}
              >
                Ajouter au panier
              </button>
            </div>
          </div>
        </div>
      </div>
      <p>
        Quantité :{' '}
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
          max="10"
        />
      </p>
      <button
        onClick={() => {
          localStorage.removeItem('cart')
        }}
      >
        Vider le panier
      </button>
    </div>
  )
}

export default Product
