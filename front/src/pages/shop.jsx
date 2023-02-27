import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import '../utils/styles/shop.scss'

import { Context } from '../utils/Context'

import { Button } from '../components/atoms/form/button'
import AddProduct from '../components/organisms/addProduct'
import { Filter } from '../components/organisms/filter'
import { StarSvg } from '../components/atoms/svg/star'

import { addToCart } from '../components/atoms/cartSerivces'

export default function Shop({ id, name, addToCart }) {
  const { userData, productsData } = useContext(Context)
  const [showAddProductForm, setShowAddProductForm] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState(productsData)

  return (
    <>
      <div className="shop">
        <div className="shop__header">
          <h1>NOS PRODUITS</h1>
          {userData.role === 'admin' && (
            <Button
              name="addProduct"
              className="shop__header__addProductBtn"
              onClick={() => setShowAddProductForm(true)}
              children="Ajouter un produit"
            />
          )}
        </div>
        <div className="shop__content">
          {showAddProductForm && <AddProduct />}
          <div className="shop__content__filter">
            <Filter
              productsData={productsData}
              setFilteredProducts={setFilteredProducts}
            />
          </div>
          <div className="shop__content__products">
            <ul>
              {filteredProducts.map((product) => {
                const handleAddToCart = () => {
                  addToCart({ id, name, quantity: 1 })
                }
                return (
                  <Link to={`/shop/${product._id}`}>
                    <li key={product._id}>
                      <div className="shop__content__products__card">
                        <div className="shop__content__products__card__image">
                          <img src={product._image} alt="Nom du produit" />
                        </div>
                        <div className="shop__content__products__card__info">
                          <h2 className="shop__content__products__card__info__title">
                            {product.name}
                          </h2>
                          <p className="shop__content__products__card__info__description">
                            {product.description}
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
                                Marque : {product.brand}
                              </p>
                              <p className="shop__content__products__card__info__footer__left__model">
                                Modèle : {product.model}
                              </p>
                              <p className="shop__content__products__card__info__footer__category">
                                Catégorie : {product.category}
                              </p>
                            </div>
                            <div className="shop__content__products__card__info__footer__right">
                              <p className="shop__content__products__card__info__footer__right__price">
                                {product.price} €
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
                    </li>
                  </Link>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
