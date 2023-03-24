import '../utils/styles/home.scss'

import React, { useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import useScrollSnap from 'react-use-scroll-snap'
import ImageGallery from 'react-image-gallery'

import { ProductGrid } from '../components/organisms/product/productGrid'

import { imagesUrl } from '../api/Datas/photos'
import { photos } from '../api/Datas/photos'

import { Context } from '../utils/Context'

export default function Home() {
  const { productsData } = useContext(Context)

  // const scrollRef = useRef(null)
  // useScrollSnap({ ref: scrollRef, duration: 1, delay: 1 })

  const linkStyle = {
    color: 'inherit',
    textDecoration: 'inherit',
  }

  return (
    // <div className="home" ref={scrollRef}>
    <div className="home">
      <section className="home__section background--dark">
        <h1 className="home__section__title">TENTE DE TOIT DE VOITURE</h1>
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
          />
        </div>
      </section>
      <section className="home__section background--clear">
        <ProductGrid
          products={productsData}
          className="home__section__products"
          category="Tente de toit"
          origin="home"
        />
      </section>
      <section className="home__section background--dark">
        <h2>Section 3</h2>
        <p>This is the third section.</p>
      </section>
    </div>
  )
}
