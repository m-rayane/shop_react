const adventureOriginal = require.context(
  './images/products/adventure/original',
  false,
  /\.(png|jpe?g|svg)$/
)

const adventureOriginalUrl = adventureOriginal
  .keys()
  .map((image) => ({ original: adventureOriginal(image) }))

const adventureThumbnail = require.context(
  './images/products/adventure/thumbnail',
  false,
  /\.(png|jpe?g|svg)$/
)

const adventureThumbnailUrl = adventureThumbnail
  .keys()
  .map((image) => ({ thumbnail: adventureThumbnail(image) }))

export const adventureImageUrls = adventureOriginalUrl.map((image, index) => {
  return { ...image, ...adventureThumbnailUrl[index] }
})

////////////////////////////////////////////////////////

const chestOriginal = require.context(
  './images/products/chest/original',
  false,
  /\.(png|jpe?g|svg)$/
)

const chestOriginalUrl = chestOriginal
  .keys()
  .map((image) => ({ original: chestOriginal(image) }))

const chestThumbnail = require.context(
  './images/products/chest/thumbnail',
  false,
  /\.(png|jpe?g|svg)$/
)

const chestThumbnailUrl = chestThumbnail
  .keys()
  .map((image) => ({ thumbnail: chestThumbnail(image) }))

export const chestImageUrls = chestOriginalUrl.map((image, index) => {
  return { ...image, ...chestThumbnailUrl[index] }
})

////////////////////////////////////////////////////////

const classicOriginal = require.context(
  './images/products/classic/original',
  false,
  /\.(png|jpe?g|svg)$/
)

const classicOriginalUrl = classicOriginal
  .keys()
  .map((image) => ({ original: classicOriginal(image) }))

const classicThumbnail = require.context(
  './images/products/classic/thumbnail',
  false,
  /\.(png|jpe?g|svg)$/
)

const classicThumbnailUrl = classicThumbnail
  .keys()
  .map((image) => ({ thumbnail: classicThumbnail(image) }))

export const classicImageUrls = classicOriginalUrl.map((image, index) => {
  return { ...image, ...classicThumbnailUrl[index] }
})

////////////////////////////////////////////////////////

const starOriginal = require.context(
  './images/products/star/original',
  false,
  /\.(png|jpe?g|svg)$/
)

const starOriginalUrl = starOriginal
  .keys()
  .map((image) => ({ original: starOriginal(image) }))

const starThumbnail = require.context(
  './images/products/classic/thumbnail',
  false,
  /\.(png|jpe?g|svg)$/
)

const starThumbnailUrl = starThumbnail
  .keys()
  .map((image) => ({ thumbnail: starThumbnail(image) }))

export const starImageUrls = starOriginalUrl.map((image, index) => {
  return { ...image, ...starThumbnailUrl[index] }
})

////////////////////////////////////////////////////////

const selection = require.context(
  './images/selection',
  false,
  /\.(png|jpe?g|svg)$/
)

const selectionImagesUrls = selection
  .keys()
  .map((image) => ({ original: selection(image), thumbnail: selection(image) }))

////////////////////////////////////////////////////////

export const imagesUrl = {
  selection: selectionImagesUrls,
  adventure: adventureImageUrls,
  chest: chestImageUrls,
  classic: classicImageUrls,
  star: starImageUrls,
}
