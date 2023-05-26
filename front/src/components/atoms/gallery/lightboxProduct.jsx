import { useEffect, useState } from 'react'
import 'lightbox.js-react/dist/index.css'
// import { ImageSlider } from 'lightbox.js-react'
// import { initLightboxJS } from 'lightbox.js-react'

import { imagesUrl } from '../../../api/Datas/photos'
import { technicalUrl } from '../../../api/Datas/photos'
import videos from '../../../api/Datas/videos.json'

import { ImageSlider, initLightboxJS } from 'lightbox.js-components'
import 'lightbox.js-components/dist/index.css'

export const LightboxProduct = ({ model, type }) => {
  useEffect(() => {
    initLightboxJS('288F-0339-D747-BAA6', 'team')
  }, [])

  const slideShow = {
    width: '75vw',
    height: '60vh',
    thumbnailHeight: '9vw',
  }

  return (
    <>
      {type === 'images' && model === 'adventure' && (
        <ImageSlider
          className="container grid grid-cols-3 gap-2 mx-auto"
          images={technicalUrl['adventure']}
          lightboxIdentifier="l2"
          showDots={false}
          height={slideShow.height}
          width={slideShow.width}
          thumbnailHeight={slideShow.thumbnailHeight}
        ></ImageSlider>
      )}
      {type === 'images' && model === 'chest' && (
        <ImageSlider
          className="container grid grid-cols-3 gap-2 mx-auto"
          images={technicalUrl['chest']}
          lightboxIdentifier="l2"
          showDots={false}
          height={slideShow.height}
          width={slideShow.width}
          thumbnailHeight={slideShow.thumbnailHeight}
        ></ImageSlider>
      )}
      {type === 'images' && model === 'classic' && (
        <ImageSlider
          className="container grid grid-cols-3 gap-2 mx-auto"
          images={technicalUrl['classic']}
          lightboxIdentifier="l2"
          showDots={false}
          height={slideShow.height}
          width={slideShow.width}
          thumbnailHeight={slideShow.thumbnailHeight}
        ></ImageSlider>
      )}
      {type === 'images' && model === 'star' && (
        <ImageSlider
          className="container grid grid-cols-3 gap-2 mx-auto"
          images={technicalUrl['star']}
          lightboxIdentifier="l2"
          showDots={false}
          height={slideShow.height}
          width={slideShow.width}
          thumbnailHeight={slideShow.thumbnailHeight}
        ></ImageSlider>
      )}
      {type === 'images' && model === 'slim' && (
        <ImageSlider
          className="container grid grid-cols-3 gap-2 mx-auto"
          images={technicalUrl['slim']}
          lightboxIdentifier="l2"
          showDots={false}
          height={slideShow.height}
          width={slideShow.width}
          thumbnailHeight={slideShow.thumbnailHeight}
        ></ImageSlider>
      )}

      {videos && type === 'videos' && (
        <ImageSlider
          className="container grid grid-cols-3 gap-2 mx-auto"
          showVideoInLightbox={false}
          images={videos[model]}
          lightboxIdentifier="l1"
          showDots={false}
          height="40vw"
          width="70vw"
          thumbnailHeight="6.7vw"
        ></ImageSlider>
      )}
    </>
  )
}
