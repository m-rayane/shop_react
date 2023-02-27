import React, { useState } from 'react'

export const ProductImage = ({ className, images }) => {
  const [activeImage, setActiveImage] = useState(0)

  const handleImageClick = (index) => {
    setActiveImage(index)
  }

  const handleZoom = (e) => {
    const zoomBox = e.target.nextElementSibling
    const image = e.target
    const { left, top, width, height } = image.getBoundingClientRect()
    const x = e.clientX - left
    const y = e.clientY - top
    const backgroundPositionX = -x + 100
    const backgroundPositionY = -y + 100
    zoomBox.style.display = 'block'
    zoomBox.style.left = `${left + width}px`
    zoomBox.style.top = `${top}px`
    zoomBox.style.backgroundPosition = `${backgroundPositionX}px ${backgroundPositionY}px`
  }

  const handleMouseLeave = (e) => {
    const zoomBox = e.target.nextElementSibling
    zoomBox.style.display = 'none'
  }

  return (
    <div className={className}>
      <div className={`${className}__main`}>
        <img
          src={activeImage}
          alt={activeImage.alt}
          onMouseMove={handleZoom}
          onMouseLeave={handleMouseLeave}
        />
        <div className={`${className}__main__zoom`}></div>
      </div>
      <div className={`${className}__thumbnail`}>
        {images.map((index) => (
          <div
            key={index}
            className={`thumbnail ${index === activeImage ? 'active' : ''}`}
            onClick={() => handleImageClick(index)}
          >
            <img src={images.url} alt={images.alt} />
          </div>
        ))}
      </div>
    </div>
  )
}
