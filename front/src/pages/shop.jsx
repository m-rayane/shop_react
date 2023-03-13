import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import '../utils/styles/shop.scss'

import { Context } from '../utils/Context'

import { Button } from '../components/atoms/form/button'
import { ModifyButtons } from '../components/molecules/modifyButtons'
import { ConfirmButtons } from '../components/molecules/confirmButtons'
import AddProduct from '../components/organisms/product/addProduct'
import ProductCard from '../components/organisms/product/productCard'

import { Filter } from '../components/organisms/filter'

export default function Shop({ id, name, addToCart }) {
  const { userData, productsData, getProducts } = useContext(Context)
  const [showAddProductForm, setShowAddProductForm] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState(productsData)
  const [targetProduct, setTargetProduct] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const navigate = useNavigate()

  const linkStyle = {
    color: 'inherit',
    textDecoration: 'inherit',
  }

  return (
    <>
      <div className="shop">
        <div className="shop__header">
          <h1>NOS PRODUITS</h1>
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
          {showAddProductForm && <AddProduct />}
          {!showAddProductForm && (
            <>
              {/* <div className="shop__content__filter">
                <Filter
                  productsData={productsData}
                  setFilteredProducts={setFilteredProducts}
                />
              </div> */}
              <ul className="shop__content__product">
                {filteredProducts.map((product) => {
                  const handleAddToCart = () => {
                    addToCart({ id, name, quantity: 1 })
                  }

                  const handleEdit = (id) => {
                    setIsEditing(true)
                    setTargetProduct(id)
                  }

                  const handleDelete = (id) => {
                    setConfirmDelete(true)
                    setTargetProduct(id)
                  }

                  const handleCancel = (e) => {
                    e.preventDefault()
                    setConfirmDelete(false)
                    navigate(`/shop`, { replace: true })
                  }

                  const handleConfirm = async (e) => {
                    e.preventDefault()
                    try {
                      console.log('produit supprimé')
                      console.log(product._id)
                      // await productServices.deleteProduct(product._id)
                      setConfirmDelete('')
                      getProducts()
                    } catch (error) {
                      console.log(error)
                    }
                  }

                  return (
                    <>
                      <li
                        key={product._id}
                        className="shop__content__products__product"
                      >
                        {userData.role === 'admin' && (
                          <div className="shop__content__products__product__buttons">
                            {!confirmDelete && (
                              <ModifyButtons
                                className={
                                  'shop__content__products__product__buttons__modifyBtn'
                                }
                                role={userData.role}
                                handleDelete={() => {
                                  handleDelete(product._id)
                                }}
                                handleEdit={() => {
                                  handleEdit(product._id)
                                }}
                              />
                            )}

                            {confirmDelete && targetProduct === product._id && (
                              <ConfirmButtons
                                message="Êtes-vous sûr de vouloir supprimer ?"
                                name={name}
                                className={
                                  'shop__content__products__product__buttons__confirmBtn'
                                }
                                handleCancel={handleCancel}
                                handleConfirm={handleConfirm}
                              />
                            )}
                          </div>
                        )}
                        <Link to={`/shop/${product._id}`} style={linkStyle}>
                          <ProductCard
                            product={product}
                            handleAddToCart={handleAddToCart}
                            descLength="200"
                          />
                        </Link>
                      </li>
                    </>
                  )
                })}
              </ul>
            </>
          )}
        </div>
      </div>
    </>
  )
}
