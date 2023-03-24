import React, { useState, useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'

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
  const { category, id } = useParams()
  const [productData, setProductData] = useState()
  const [quantity, setQuantity] = useState(1)
  const [model, setModel] = useState()

  useEffect(() => {
    if (productsData) {
      const data = productsData.find((p) => p._id === id)
      if (data) {
        setProductData(data)
        setModel(data._model.toLowerCase())
      }
    }
  }, [id, productsData])

  const handleAddToCart = () => {
    addToCart(productData._id, quantity)
  }

  const categoryText = `${category
    .replace(/-/g, ' ')
    .charAt(0)
    .toUpperCase()}${category.replace(/-/g, ' ').slice(1)}`

  return (
    <>
      {!productData && <div> Chargement...</div>}
      {productData && (
        <div className="product">
          <div className="product__card">
            <section className="product__card__nav">
              <nav className="product__card__nav__link">
                <Link
                  to="/boutique"
                  // style={{ textDecoration: 'none', color: 'black' }}
                >
                  Boutique
                </Link>{' '}
                /{' '}
                <Link
                  to={`/boutique/${category}`}
                  // style={{ textDecoration: 'none', color: 'black' }}
                >
                  {categoryText}
                </Link>{' '}
                /{' '}
                <p className="product__card__nav__link__productName">
                  {productData.name}
                </p>
              </nav>
            </section>
            <section className="product__card__main">
              <div className="product__card__main__gallery">
                <LightboxProduct model={model} type="images" />
              </div>
              <div className="product__card__main__content">
                <div className="product__card__main__content__header">
                  <h1 className="product__card__main__content__header--title">
                    {productData.name}
                  </h1>
                  <p className="product__card__main__content__header--brand">
                    Marque: {productData.brand}
                  </p>
                </div>
                {/* <Rating className={'product__card__content__rating'} count="32 avis" /> */}
                <div className="product__card__main__content__order">
                  <div className="product__card__main__content__order__price">
                    <span>€ {productData.price}</span> TTC
                  </div>
                  <div className="product__card__main__content__order__addToCart">
                    <div className="product__card__main__content__order__addToCart__quantity">
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        min="1"
                        max="10"
                      />
                    </div>
                    <button
                      className="product__card__main__content__order__addToCart__button"
                      onClick={handleAddToCart}
                    >
                      Ajouter au panier
                    </button>
                  </div>
                </div>
                <div className="product__card__main__content__description">
                  <p className="product__card__main__content__description--title">
                    Description
                  </p>
                  <p
                    className="product__card__main__content__description--content"
                    dangerouslySetInnerHTML={{
                      __html: productData.description,
                    }}
                  ></p>
                </div>
              </div>
            </section>
            <section className="product__card__technical">
              <div className="product__card__technical__content">
                <h3>Caractéristiques techniques</h3>
                <div
                  className="product__card__technical__content__text"
                  dangerouslySetInnerHTML={{ __html: productData.technical }}
                ></div>
              </div>
            </section>
            <section className="product__card__videos">
              <LightboxProduct model={model} type="videos" />
            </section>
          </div>
        </div>
      )}
    </>
  )
}

export default Product
