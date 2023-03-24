import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import ProductCard from './productCard'
import ProductMiniCard from './ProductMiniCard'
import { ModifyButtons } from '../../molecules/modifyButtons'
import { ConfirmButtons } from '../../molecules/confirmButtons'

import { Context } from '../../../utils/Context'
import { addToCart } from '../../atoms/Services/cartSerivces'

export const ProductGrid = ({ products, className, category, origin }) => {
  const { userData, productsData, getProducts } = useContext(Context)
  const [targetProduct, setTargetProduct] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const navigate = useNavigate()

  const linkStyle = {
    color: 'inherit',
    textDecoration: 'inherit',
  }

  const productByCategory = products.filter(
    (product) => product._category === category
  )

  return (
    <>
      <ul className={`${className}`}>
        {productByCategory.map((product, index) => {
          const handleAddToCart = () => {
            addToCart(product._id, 1)
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
            navigate(`/boutique`, { replace: true })
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
              {origin === 'shop' && (
                <li key={index} className={`${className}__product`}>
                  {/* {userData.role === 'admin' && (
                    <div className={`${className}__product__buttons`}>
                      {!confirmDelete && (
                        <ModifyButtons
                          className={`${className}__product__buttons__modifyBtn`}
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
                          className={`${className}__product__buttons__confirmBtn`}
                          handleCancel={handleCancel}
                          handleConfirm={handleConfirm}
                        />
                      )}
                    </div>
                  )} */}
                  <Link
                    to={`/boutique/${product._category
                      .replace(/\s+/g, '-')
                      .toLowerCase()}/${product._id}`}
                    style={linkStyle}
                  >
                    <ProductCard
                      className={`${className}__product__productCard`}
                      product={product}
                      handleAddToCart={handleAddToCart}
                      descLength="200"
                    />
                  </Link>
                </li>
              )}
              {origin === 'home' && (
                <li key={index} className={`${className}__miniCard`}>
                  <Link to={`/boutique/${product._id}`} style={linkStyle}>
                    <ProductMiniCard
                      className={`${className}__miniCard`}
                      product={product}
                    />
                  </Link>
                </li>
              )}
            </>
          )
        })}
      </ul>
    </>
  )
}
