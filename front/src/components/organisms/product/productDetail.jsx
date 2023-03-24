import '../../../utils/styles/App.scss'

import { Rating } from '../../atoms/rating'

export default function ProductDetail({
  product,
  handleAddToCart,
  descLength,
}) {
  let shortDescription = ''
  if (product.description.length > descLength) {
    shortDescription = product.description.substring(0, descLength) + '...'
  }

  return (
    <div className="shop__content__products__product__card">
      <div className="shop__content__products__product__card__image">
        <img src={product._image} alt="Nom du produit" />
      </div>
      <div className="shop__content__products__product__card__info">
        <h2 className="shop__content__products__product__card__info__title">
          {product.name}
        </h2>
        <p className="shop__content__products__product__card__info__description">
          {shortDescription}
        </p>
        <Rating
          className={'shop__content__products__product__card__info__rating'}
          count="32 avis"
        />
        <div className="shop__content__products__product__card__info__footer">
          <div className="shop__content__products__product__card__info__footer__left">
            <p className="shop__content__products__product__card__info__footer__left__brand">
              Marque : {product.brand}
            </p>
            <p className="shop__content__products__product__card__info__footer__left__model">
              Modèle : {product.model}
            </p>
            <p className="shop__content__products__product__card__info__footer__category">
              Catégorie : {product.category}
            </p>
          </div>
          <div className="shop__content__products__product__card__info__footer__right">
            <p className="shop__content__products__product__card__info__footer__right__price">
              {product.price} €
            </p>
            <button
              className="shop__content__products__product__card__info__footer__right__btn"
              onClick={handleAddToCart}
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
