import 'lightbox.js-react/dist/index.css'
import { ImageSlider } from 'lightbox.js-react'
import { SlideshowLightbox, initLightboxJS } from 'lightbox.js-react'

import videos from '../../../api/Datas/videos.json'

import { useEffect } from 'react'

import { imagesUrl } from '../../../api/Datas/photos'

export const LightboxProduct = ({ model, type }) => {
  useEffect(() => {
    initLightboxJS('288F-0339-D747-BAA6', 'team')
  }, [])

  console.log(videos[model])
  console.log(imagesUrl[model])

  return (
    <>
      {imagesUrl[model] && type === 'images' && (
        <ImageSlider
          className="container grid grid-cols-3 gap-2 mx-auto"
          images={imagesUrl[model]}
          lightboxIdentifier="lightbox1"
          showDots={false}
          height="30vw"
          width="45vw"
          thumbnailHeight="9vw"
        ></ImageSlider>
      )}

      {videos && type === 'videos' && (
        <ImageSlider
          className="container grid grid-cols-3 gap-2 mx-auto"
          showVideoInLightbox={false}
          images={videos[model]}
          lightboxIdentifier="l2"
          showDots={false}
          height="56.25vw"
          width="100vw"
          thumbnailHeight="14vw"
        ></ImageSlider>
      )}
    </>
  )
}
