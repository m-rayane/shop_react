import '../utils/styles/home.scss'

import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import useScrollSnap from 'react-use-scroll-snap'
import ImageGallery from 'react-image-gallery'

import { ProductGrid } from '../components/organisms/product/productGrid'

import { imagesUrl } from '../api/Datas/photos'
import { photos } from '../api/Datas/photos'

import { Context } from '../utils/Context'

export default function Home() {
  const { productsData } = useContext(Context)
  const [productMessage, setProductMessage] = useState()
  const [productName, setProductName] = useState()
  const [showContent, setShowContent] = useState()

  // window.scrollTo({
  //   top: 0,
  //   left: 0,
  //   behavior: 'smooth',
  // })

  const linkStyle = {
    color: 'inherit',
    textDecoration: 'inherit',
  }

  return (
    <div className="home">
      <section className="home__section">
        {/* <h1 className="home__section__title">TENTE DE TOIT DE VOITURE</h1> */}
        <Link to={`/boutique`} style={linkStyle}>
          <button className="home__section__button">
            DECOUVREZ NOS TENTES
          </button>
        </Link>
        <div className="home__section__gallery">
          <ImageGallery
            items={imagesUrl.selection}
            showThumbnails={false}
            infinite={true}
            autoPlay={true}
            showFullscreenButton={false}
            showPlayButton={false}
            showBullets={true}
            slideInterval="5000"
          />
        </div>
      </section>
      <section className="home__section background--clear">
        <ProductGrid
          products={productsData}
          className="home__section__products"
          category="Tentes de toit"
          showMiniCard={true}
          setProductMessage={setProductMessage}
          setProductName={setProductName}
          setShowContent={setShowContent}
        />
        <div className={`home__section__content ${showContent}`}>
          <h3 className="home__section__content__name">{productName}</h3>
          <h4 className="home__section__content__message">{productMessage}</h4>
        </div>
      </section>
      <section className="home__section background--dark">
        <h2>Section 3</h2>
        <p>This is the third section.</p>
      </section>
    </div>
  )
}
