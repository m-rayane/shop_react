import React, { useState } from 'react'

export const Carousel = ({ className, slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleNext = () => {
    setCurrentSlide((currentSlide + 1) % numSlides)
  }

  const handlePrev = () => {
    setCurrentSlide((currentSlide - 1 + numSlides) % numSlides)
  }

  const numSlides = slides.length

  return (
    <div className={`${className}__carousel`}>
      <div
        className={`${className}__carousel__slides`}
        style={{ transform: `translateX(-${currentSlide * 25}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`${className}__carousel__slides--${index}`}
          >
            <h3>{slide.text}</h3>
            <img src={slide.image} alt={slide.alt} />
          </div>
        ))}
      </div>
      <button
        onClick={handlePrev}
        className={`${className}__carousel__prevBtn`}
      >
        Prev
      </button>
      <button
        onClick={handleNext}
        className={`${className}__carousel__nextBtn`}
      >
        Next
      </button>
    </div>
  )
}
