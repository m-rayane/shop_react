import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import ProductCard from './productCard'
import ProductMiniCard from './ProductMiniCard'
import { ModifyButtons } from '../../molecules/modifyButtons'
import { ConfirmButtons } from '../../molecules/confirmButtons'

import { Context } from '../../../utils/Context'
import { addToCart } from '../../atoms/Services/cartServices'

export const ProductGrid = ({
  products,
  className,
  category,
  showMiniCard,
  productId,
  setProductMessage,
  setProductName,
  setShowContent,
}) => {
  const { userData, productsData, getProducts } = useContext(Context)

  const navigate = useNavigate()

  const linkStyle = {
    color: 'inherit',
    textDecoration: 'inherit',
  }

  const productByCategory = products.filter(
    (product) => product._category === category && product._id !== productId
  )

  return (
    <>
      <div className={`${className}`}>
        {productByCategory.map((product, index) => {
          const handleAddToCart = () => {
            addToCart(product._id, 1)
          }

          const handleOut = () => {
            console.log('Mouse out')
            setProductMessage('')
            setProductName('')
            setShowContent('')
          }

          const handleHover = () => {
            setProductMessage(product._shortDescription)
            setProductName(product._name)
            setShowContent('showContent')
          }

          return (
            <ul key={index}>
              {!showMiniCard && (
                <li
                  className={`${className}__product`}
                  onMouseOver={handleHover}
                  onMouseLeave={handleOut}
                >
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
                      descLength="100"
                    />
                  </Link>
                </li>
              )}
              {showMiniCard && (
                <li
                  className={`${className}__miniCard`}
                  onMouseOver={handleHover}
                  onMouseLeave={handleOut}
                >
                  <Link
                    to={`/boutique/${category
                      .toLowerCase()
                      .replace(/\s+/g, '-')}/${product._id}`}
                    style={linkStyle}
                  >
                    <ProductMiniCard
                      className={`${className}__miniCard`}
                      product={product}
                    />
                  </Link>
                </li>
              )}
            </ul>
          )
        })}
      </div>
    </>
  )
}
