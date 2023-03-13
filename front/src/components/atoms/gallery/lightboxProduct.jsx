import 'lightbox.js-react/dist/index.css'
import { ImageSlider } from 'lightbox.js-react'
import { SlideshowLightbox, initLightboxJS } from 'lightbox.js-react'

import { useState, useEffect } from 'react'

import { imagesUrl } from '../../../api/Datas/photos'

export const LightboxProduct = ({ model }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const numSlides = imagesUrl[model] ? imagesUrl[model].length : ''

  useEffect(() => {
    initLightboxJS('288F-0339-D747-BAA6', 'team')
  }, [])

  const handleNext = () => {
    setCurrentSlide((currentSlide + 1) % numSlides)
  }

  const handlePrev = () => {
    setCurrentSlide((currentSlide - 1 + numSlides) % numSlides)
  }

  console.log(model)
  console.log(imagesUrl[model])

  return (
    <>
      <ImageSlider
        className="container grid grid-cols-3 gap-2 mx-auto"
        images={imagesUrl[model]}
        lightboxIdentifier="lightbox1"
        showDots={false}
        height="30vw"
        width="40vw"
        thumbnailHeight="9vw"
      >
        <div className="container__mainImage"></div>
        <div
          className="container__thumbnail"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {imagesUrl[model] &&
            imagesUrl[model].map((image, index) => {
              return (
                <div
                  className={`container__thumbnail__image container__thumbnail--${index}`}
                >
                  <img
                    className="w-full rounded"
                    data-lightboxjs="lightbox1"
                    src={image.thumbnail}
                    alt=""
                  />
                </div>
              )
            })}
          <button
            onClick={handlePrev}
            className="container__thumbnail__prevBtn"
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            className="container__thumbnail__nextBtn"
          >
            Next
          </button>
        </div>
      </ImageSlider>
    </>
  )
}
