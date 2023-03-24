import '../../../utils/styles/App.scss'

export default function ProductMiniCard({ product, className }) {
  return (
    <>
      <img src={product._image} alt="Nom du produit" />
      <div className={`${className}__title miniCardTitle`}>
        <h3>{product.name}</h3>
      </div>
    </>
  )
}
