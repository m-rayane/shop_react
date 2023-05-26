import '../../../utils/styles/App.scss'

export default function ProductCard({ product, descLength, className }) {
  return (
    <div className={className}>
      <div className={`${className}__image`}>
        <img src={product.image} alt={product.name} />
      </div>
      <div className={`${className}__content`}>
        <div className={`${className}__content__header`}>
          <h3>{product.name}</h3>
          <p className={`${className}__content__header__price`}>
            à partir de <span>{product.price / 100}</span> €
          </p>
        </div>
        <p className={`${className}__content__description`}>
          {product.shortDescription}
        </p>
      </div>
    </div>
  )
}
