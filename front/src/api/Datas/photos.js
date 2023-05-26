// SLIM

const slimOriginal = require.context(
  './images/products/slim/original',
  false,
  /\.(png|jpe?g|svg)$/
)

const slimTechnical = require.context(
  './images/products/adventure/technical/original',
  false,
  /\.(png|jpe?g|svg)$/
)

const slimTechnicalUrl = slimTechnical
  .keys()
  .map((image) => ({ src: slimTechnical(image) }))

// ADVENTURE

const adventureOriginal = require.context(
  './images/products/adventure/original',
  false,
  /\.(png|jpe?g|svg)$/
)

const adventureTechnical = require.context(
  './images/products/adventure/technical/original',
  false,
  /\.(png|jpe?g|svg)$/
)

const adventureOriginalUrl = adventureOriginal
  .keys()
  .map((image) => ({ original: adventureOriginal(image) }))

const adventureTechnicalUrl = adventureTechnical
  .keys()
  .map((image) => ({ src: adventureTechnical(image) }))

const adventureOriginalSrc = adventureOriginal
  .keys()
  .map((image) => ({ src: adventureOriginal(image) }))

const adventureThumbnail = require.context(
  './images/products/adventure/thumbnail',
  false,
  /\.(png|jpe?g|svg)$/
)

const adventureThumbnailUrl = adventureThumbnail
  .keys()
  .map((image) => ({ thumbnail: adventureThumbnail(image) }))

export const adventureImageUrls = adventureOriginalUrl.map((image, index) => {
  return {
    ...image,
    ...adventureThumbnailUrl[index],
    ...adventureOriginalSrc[index],
  }
})

// CHEST

const chestOriginal = require.context(
  './images/products/chest/original',
  false,
  /\.(png|jpe?g|svg)$/
)

const chestTechnical = require.context(
  './images/products/chest/technical/original',
  false,
  /\.(png|jpe?g|svg)$/
)

const chestOriginalUrl = chestOriginal
  .keys()
  .map((image) => ({ original: chestOriginal(image) }))

const chestTechnicallUrl = chestTechnical
  .keys()
  .map((image) => ({ src: chestTechnical(image) }))

const chestOriginalSrc = chestOriginal
  .keys()
  .map((image) => ({ src: chestOriginal(image) }))

const chestThumbnail = require.context(
  './images/products/chest/thumbnail',
  false,
  /\.(png|jpe?g|svg)$/
)

const chestThumbnailUrl = chestThumbnail
  .keys()
  .map((image) => ({ thumbnail: chestThumbnail(image) }))

export const chestImageUrls = chestOriginalUrl.map((image, index) => {
  return { ...image, ...chestThumbnailUrl[index], ...chestOriginalSrc[index] }
})

// CLASSIC

const classicOriginal = require.context(
  './images/products/classic/original',
  false,
  /\.(png|jpe?g|svg)$/
)

const classicTechnical = require.context(
  './images/products/classic/technical/original',
  false,
  /\.(png|jpe?g|svg)$/
)

const classicOriginalUrl = classicOriginal
  .keys()
  .map((image) => ({ original: classicOriginal(image) }))

const classicTechnicalUrl = classicTechnical
  .keys()
  .map((image) => ({ src: classicTechnical(image) }))

const classicOriginalSrc = classicOriginal
  .keys()
  .map((image) => ({ src: classicOriginal(image) }))

const classicThumbnail = require.context(
  './images/products/classic/thumbnail',
  false,
  /\.(png|jpe?g|svg)$/
)

const classicThumbnailUrl = classicThumbnail
  .keys()
  .map((image) => ({ thumbnail: classicThumbnail(image) }))

export const classicImageUrls = classicOriginalUrl.map((image, index) => {
  return {
    ...image,
    ...classicThumbnailUrl[index],
    ...classicOriginalSrc[index],
  }
})

// ORIGINAL

const starOriginal = require.context(
  './images/products/star/original',
  false,
  /\.(png|jpe?g|svg)$/
)

const starTechnical = require.context(
  './images/products/star/technical/original',
  false,
  /\.(png|jpe?g|svg)$/
)

const starOriginalUrl = starOriginal
  .keys()
  .map((image) => ({ original: starOriginal(image) }))

const starTechnicalUrl = starTechnical
  .keys()
  .map((image) => ({ src: starTechnical(image) }))

const starOriginalSrc = starOriginal
  .keys()
  .map((image) => ({ src: starOriginal(image) }))

const starThumbnail = require.context(
  './images/products/classic/thumbnail',
  false,
  /\.(png|jpe?g|svg)$/
)

const starThumbnailUrl = starThumbnail
  .keys()
  .map((image) => ({ thumbnail: starThumbnail(image) }))

export const starImageUrls = starOriginalUrl.map((image, index) => {
  return { ...image, ...starThumbnailUrl[index], ...starOriginalSrc[index] }
})

////////////////////////////////////////////////////////

const selection = require.context(
  './images/selection',
  false,
  /\.(png|jpe?g|svg)$/
)

const selectionImagesUrls = selection.keys().map((image) => ({
  original: selection(image),
  thumbnail: selection(image),
  src: selection(image),
}))

////////////////////////////////////////////////////////

export const imagesUrl = {
  selection: selectionImagesUrls,
  adventure: adventureImageUrls,
  chest: chestImageUrls,
  classic: classicImageUrls,
  star: starImageUrls,
}

export const technicalUrl = {
  adventure: adventureTechnicalUrl,
  chest: chestTechnicallUrl,
  classic: classicTechnicalUrl,
  star: starTechnicalUrl,
  slim: slimTechnicalUrl,
}
