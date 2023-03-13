import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'

import '../utils/styles/product.scss'
import '../utils/styles/imageGallery.scss'

import { Context } from '../utils/Context'
import { addToCart } from '../components/atoms/Services/cartSerivces'

import { StarSvg } from '../components/atoms/svg/star'
import { Rating } from '../components/atoms/rating'

import { LightboxProduct } from '../components/atoms/gallery/lightboxProduct'
import { imagesUrl } from '../api/Datas/photos'

const Product = () => {
  const { productsData } = useContext(Context)
  const { id } = useParams()
  const [productData, setProductData] = useState()
  const [quantity, setQuantity] = useState(1)
  const [descContent, setDescContent] = useState()
  const [techContent, setTechContent] = useState()
  const [model, setModel] = useState()

  useEffect(() => {
    if (productsData) {
      const data = productsData.find((p) => p._id === id)
      if (data) {
        console.log(data)
        setProductData(data)
        setModel(data._model.toLowerCase())
      }
    }
  }, [id, productsData])

  const handleAddToCart = () => {
    addToCart(productData._id, quantity)
  }

  useEffect(() => {
    const descContent = document.querySelector(
      '.product__card__info__description'
    )
    setDescContent(descContent)
  })
  useEffect(() => {
    const techContent = document.querySelector(
      '.product__card__technical__content'
    )
    setTechContent(techContent)
  })

  return (
    <>
      {!productData && <div> Chargement...</div>}
      {productData && (
        <div className="product">
          <div className="product__card">
            <div className="product__card__gallery">
              <LightboxProduct model={model} />
            </div>
            <div className="product__card__info">
              <h2 className="product__card__info__title">{productData.name}</h2>
              <p className="product__card__info__price">
                à partir de <strong>{productData.price}</strong> € TTC.
              </p>
              <p className="product__card__info__description">
                {`${
                  descContent &&
                  (descContent.innerHTML = `${productData.description}`)
                }`}
              </p>
              <div className="product__card__info__category">
                {productData.category} {productData.brand} {productData.model}
              </div>

              {/* <Rating className={'product__card__info__rating'} count="32 avis" /> */}
              <div className="product__card__info__order">
                <div className="product__card__info__order__quantity">
                  Quantité :{' '}
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min="1"
                    max="10"
                  />
                </div>
                <button
                  className="product__card__info__order__addToCartBtn"
                  onClick={handleAddToCart}
                >
                  Ajouter au panier
                </button>
              </div>
            </div>
          </div>
          <div className="product__card__technical">
            <h3>Caractéristiques techniques</h3>
            <div className="product__card__technical__content">
              {`${
                techContent &&
                (techContent.innerHTML = `${productData.technical}`)
              }`}
            </div>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('cart')
            }}
          >
            Vider le panier
          </button>
        </div>
      )}
    </>
  )
}

export default Product
