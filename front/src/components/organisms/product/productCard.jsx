import '../../../utils/styles/App.scss'

export default function ProductCard({ product, descLength, className }) {
  let shortDescription = ''
  if (product.description.length > descLength) {
    shortDescription = product.description.substring(0, descLength) + '...'
  }

  return (
    <div className={className}>
      <div className={`${className}__image`}>
        <img src={product.image} alt={product.name} />
      </div>
      <h3>{product.name}</h3>
      <p>
        à partir de <span>{product.price}</span> €
      </p>
      <button>Ajouter au panier</button>
    </div>
  )
}
