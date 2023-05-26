import React, { useState, useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'

import '../utils/styles/product.scss'
import '../utils/styles/imageGallery.scss'

import { Context } from '../utils/Context'
import { addToCart } from '../components/atoms/Services/cartServices'

import { ProductGrid } from '../components/organisms/product/productGrid'
import OptionButton from '../components/molecules/optionButton'
import { CartSvg } from '../components/atoms/svg/cart'

import { LightboxProduct } from '../components/atoms/gallery/lightboxProduct'

export default function Product() {
  const {
    productsData,
    setCartData,
    technicalData,
    setTargetProduct,
    optionData,
  } = useContext(Context)
  const { category, id } = useParams()
  const [categoryText, setCategoryText] = useState('')
  const [productData, setProductData] = useState()
  const [quantity, setQuantity] = useState(1)
  const [totalPrice, setTotalPrice] = useState('')
  const [model, setModel] = useState()
  const [selectedOption, setSelectedOption] = useState('')
  const [technicalCategory, setTechnicalCategory] = useState('presentation')
  const [technicalByCategory, setTechnicalByCategory] = useState('')
  const [technicalAdvantage, setTechnicalAdvantage] = useState('')

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [])

  useEffect(() => {
    if (technicalData) {
      const data = technicalData.filter(
        (t) => t._category === technicalCategory
      )
      setTechnicalByCategory(data)
    }
  }, [technicalCategory, technicalData])

  useEffect(() => {
    if (technicalData) {
      const data = technicalData.filter((t) => t._category === 'advantage')
      setTechnicalAdvantage(data)
    }
  }, [technicalData])

  useEffect(() => {
    setTargetProduct(id)
    setSelectedOption(optionData ? optionData[0] : '')
  }, [id, optionData, setTargetProduct])

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

  useEffect(() => {
    if (productsData) {
      const data = productsData.find((p) => p._id === id)
      if (data) {
        setProductData(data)
        setModel(data._model.toLowerCase())
      }
    }
  }, [id, productsData])

  useEffect(() => {
    console.log(optionData)
    if (optionData && optionData.length > 0) {
      setTotalPrice(
        ((selectedOption._price * quantity) / 100).toFixed(2).replace('.', ',')
      )
    } else if (productData) {
      setTotalPrice(
        ((productData._price * quantity) / 100).toFixed(2).replace('.', ',')
      )
    }
  }, [quantity, optionData, productData, selectedOption])

  const handleAddToCart = () => {
    console.log(selectedOption)
    const cart = addToCart(productData._id, quantity, selectedOption._name)
    setCartData(cart)
  }

  const handleOptionChange = (e) => {
    const selectedValue = e.target.value
    const selectedOption = optionData.find(
      (option) => option._id === parseInt(selectedValue)
    )
    setSelectedOption(selectedOption)
  }

  const handleSelectOption = (id) => {
    const selectedOption = optionData.find((option) => option._id === id)
    setSelectedOption(selectedOption)
  }

  const handleTechnicalChose = async (category) => {
    setTechnicalCategory(category)
  }

  return (
    <>
      {!productData && <div> Chargement...</div>}
      {productData && (
        <div className="product">
          <section className="product__nav">
            <nav className="product__nav__link">
              <Link to="/boutique">Boutique</Link> /{' '}
              <Link to={`/boutique/${category}`}>{categoryText}</Link> /{' '}
              <p className="product__nav__link__productName">
                {productData._name}
              </p>
            </nav>
          </section>
          <main className="product__main">
            <div className="product__main__leftCol">
              <section className="product__main__leftCol__gallery">
                {model && <LightboxProduct model={model} type="images" />}
              </section>
              <section className="product__main__leftCol__technical">
                <nav className="product__main__leftCol__technical__nav">
                  <li
                    onClick={() => handleTechnicalChose('presentation')}
                    style={
                      technicalCategory === 'presentation'
                        ? { borderBottom: '4px solid #fed137' }
                        : {}
                    }
                  >
                    Présentation
                  </li>
                  <li
                    onClick={() => handleTechnicalChose('description')}
                    style={
                      technicalCategory === 'description'
                        ? { borderBottom: '4px solid #fed137' }
                        : {}
                    }
                  >
                    Descriptions
                  </li>
                  <li
                    onClick={() => handleTechnicalChose('dimension')}
                    style={
                      technicalCategory === 'dimension'
                        ? { borderBottom: '4px solid #fed137' }
                        : {}
                    }
                  >
                    Dimensions
                  </li>
                  <li
                    onClick={() => handleTechnicalChose('technical')}
                    style={
                      technicalCategory === 'technical'
                        ? { borderBottom: '4px solid #fed137' }
                        : {}
                    }
                  >
                    Caractéristiques et matériaux
                  </li>
                  <li
                    onClick={() => handleTechnicalChose('assembly')}
                    style={
                      technicalCategory === 'assembly'
                        ? { borderBottom: '4px solid #fed137' }
                        : {}
                    }
                  >
                    Montage
                  </li>
                  <li
                    onClick={() => handleTechnicalChose('guarantee')}
                    style={
                      technicalCategory === 'guarantee'
                        ? { borderBottom: '4px solid #fed137' }
                        : {}
                    }
                  >
                    Garantie
                  </li>
                </nav>
                <div className="product__main__leftCol__technical__content">
                  <ul className="product__main__leftCol__technical__content__list">
                    {technicalByCategory &&
                      technicalByCategory.map((technicalItem) => {
                        return (
                          <>
                            <li key={technicalItem._id}>
                              {technicalItem._title && (
                                <p>
                                  <b>{technicalItem._title}</b> :{' '}
                                  {technicalItem._content}
                                </p>
                              )}
                              {!technicalItem._title && (
                                <p>{technicalItem._content}</p>
                              )}
                            </li>
                          </>
                        )
                      })}
                  </ul>
                  {technicalCategory === 'assembly' && (
                    <div className="product__main__leftCol__videos">
                      {model && <LightboxProduct model={model} type="videos" />}
                    </div>
                  )}
                </div>
              </section>
              <section className="product__main__leftCol__similar">
                <div className="product__main__leftCol__similar__content">
                  <h3>Produits similaires</h3>
                  <ProductGrid
                    products={productsData}
                    className="product__main__leftCol__similar__content__productGrid"
                    category={categoryText}
                    origin="shop"
                    productId={productData._id}
                  />
                </div>
              </section>
              <section className="product__main__leftCol__additional">
                <div className="product__main__leftCol__additional__content">
                  <h3>Produits complémentaires</h3>
                  <ProductGrid
                    products={productsData}
                    className="product__main__leftCol__additional__content__productGrid"
                    category={
                      categoryText === 'Tentes de toit'
                        ? 'Accéssoires'
                        : 'Tentes de toit'
                    }
                    origin="shop"
                  />
                </div>
              </section>
            </div>
            <aside className="product__main__rightCol">
              <div className="product__main__rightCol__content">
                <div className="product__main__rightCol__content__header">
                  <h1 className="product__main__rightCol__content__header__title">
                    {productData.name.toUpperCase()}
                  </h1>
                  <div className="product__main__rightCol__content__header__info">
                    <p>
                      <b>Code article:</b> {productData._id}
                    </p>
                    <p>
                      <b>Condition:</b> Neuf
                    </p>
                    <p>
                      <b>Marque:</b> {productData._brand}
                    </p>
                  </div>
                  <div className="product__main__rightCol__content__header__price">
                    à partir de <b>{productData._price / 100} €</b> TTC
                  </div>
                </div>
                {optionData.length > 0 && (
                  <div className="product__main__rightCol__content__option">
                    <div className="product__main__rightCol__content__option__menu">
                      {optionData &&
                        optionData.map((option, index) => (
                          <div onClick={() => handleSelectOption(option._id)}>
                            <OptionButton
                              optionName={option._name}
                              index={index}
                              buttonStyle={
                                selectedOption._id === option._id
                                  ? {
                                      filter: 'brightness(1.1)',
                                      boxShadow:
                                        'inset 0px 0px 5px 1px rgba(0, 0, 0, 0.3)',
                                    }
                                  : {}
                              }
                            />
                          </div>
                        ))}

                      {/* <label htmlFor="optionList">Options :</label>
                      <select
                        id="optionList"
                        value={selectedOption ? selectedOption._id : ''}
                        onChange={handleOptionChange}
                      >
                        <option value="">-- Sélectionner --</option>
                        {optionData &&
                          optionData.map((option) => (
                            <option key={option._id} value={option._id}>
                              {option._name} - {option._description} -{' '}
                              {option._price.toFixed(2).replace('.', ',')} € TTC
                            </option>
                          ))}
                      </select> */}
                    </div>
                    {selectedOption && (
                      <div className="product__main__rightCol__content__option__selectedOption">
                        <div className="product__main__rightCol__content__option__selectedOption">
                          <div className="product__main__rightCol__content__option__selectedOption__desc">
                            Dimensions : {selectedOption._description}
                          </div>
                          <div className="product__main__rightCol__content__option__selectedOption__price">
                            Prix unitaire : {selectedOption._price / 100} €
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <div className="product__main__rightCol__content__order">
                  <div className="product__main__rightCol__content__order__header">
                    <div className="product__main__rightCol__content__order__header__quantity">
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        min="1"
                        max="10"
                      />
                    </div>
                    <div className="product__main__rightCol__content__order__header__price">
                      <span>€{totalPrice}</span> TTC
                    </div>
                  </div>
                </div>
                <div
                  className="product__main__rightCol__content__addToCart"
                  onClick={handleAddToCart}
                >
                  <CartSvg /> AJOUTER AU PANIER
                </div>
                <div className="product__main__rightCol__content__advantage">
                  <h3 className="product__main__rightCol__content__advantage__title">
                    LES PLUS
                  </h3>
                  <p className="product__main__rightCol__content__advantage__name">
                    {technicalAdvantage &&
                      technicalAdvantage.map((advantage) => (
                        <div>+ {advantage._content}</div>
                      ))}
                  </p>
                </div>
                <div className="product__main__rightCol__content__contact">
                  <p className="product__main__rightCol__content__contact__title">
                    POUR DES COMMANDES PAR TÉLÉPHONE OU UNE DEMANDE
                    D'INFORMATION
                  </p>
                  <p>☎ +33 600000000</p>
                  <p>
                    @{' '}
                    <a
                      href="mailto"
                      style={{ textDecoration: 'underline', color: 'black' }}
                    >
                      contact@jovive.fr
                    </a>
                  </p>
                  <Link
                    to="/contact"
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    ✉ CONTACT
                  </Link>
                </div>
              </div>
            </aside>
          </main>
        </div>
      )}
    </>
  )
}
