import React, { useContext, useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import '../utils/styles/shop.scss'

import { Context } from '../utils/Context'

import { Button } from '../components/atoms/form/button'
import AddProduct from '../components/organisms/product/addProduct'
import { ProductGrid } from '../components/organisms/product/productGrid'

export default function Shop({ id, name, addToCart }) {
  const { userData, productsData } = useContext(Context)
  const [showAddProductForm, setShowAddProductForm] = useState(false)
  const [categoryText, setCategoryText] = useState('')
  const { category } = useParams()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [])

  useEffect(() => {
    setCategoryText('')
    if (category) {
      const categoryText = `${category
        .replace(/-/g, ' ')
        .charAt(0)
        .toUpperCase()}${category.replace(/-/g, ' ').slice(1)}`
      setCategoryText(categoryText)
    }
  }, [category])

  return (
    <>
      <div className="shop">
        <div className="shop__header">
          <h1>NOS TENTES DE TOIT ET ACCESSOIRES JOVIVE</h1>
          {!showAddProductForm && userData.role === 'admin' && (
            <Button
              name="addProduct"
              className="shop__header__addProductBtn"
              onClick={() => setShowAddProductForm(true)}
              children="Ajouter un produit"
            />
          )}
          {showAddProductForm && userData.role === 'admin' && (
            <Button
              name="cancelAddProduct"
              className="shop__header__addProductBtn"
              onClick={() => setShowAddProductForm(false)}
              children="Annuler"
            />
          )}
        </div>
        <div className="shop__content">
          {showAddProductForm && <AddProduct props={{}} />}
          {!showAddProductForm && (
            <>
              {/* <div className="shop__content__filter">
                <Filter
                  productsData={productsData}
                  setFilteredProducts={setFilteredProducts}
                />
              </div> */}
              <div className="shop__content__nav">
                <nav className="shop__content__nav__link">
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
                  </Link>
                </nav>
              </div>
              <div className="shop__content__products">
                {(category === 'tentes-de-toit' || !category) && (
                  <>
                    <div className="shop__content__products__tent">
                      <Link to={`/boutique/tentes-de-toit`}>
                        <h2 className="shop__content__products__tent__title">
                          les tentes de toit
                        </h2>
                      </Link>
                      <ProductGrid
                        products={productsData}
                        className="shop__content__products__tent__productGrid"
                        category="Tentes de toit"
                      />
                    </div>
                  </>
                )}

                {(category === 'accéssoires' || !category) && (
                  <div className="shop__content__products__accessory">
                    <Link to={`/boutique/accéssoires`}>
                      <h2 className="shop__content__products__accessory__title">
                        les accessoires
                      </h2>
                    </Link>
                    <ProductGrid
                      products={productsData}
                      className="shop__content__products__accessory__productGrid"
                      category="Accéssoires"
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
