export default function Summary({
  className,
  totalPrice,
  isValidated,
  handleCartSubmit,
  handleOrderSubmit,
  origin,
}) {
  return (
    <div className={className}>
      <h2>Récapitulatif</h2>
      <div className={`${className}__content`}>
        <h3>Prix total : {(totalPrice / 100).toFixed(2).replace('.', ',')}€</h3>
        {origin === 'cart' && !isValidated && (
          <button onClick={handleCartSubmit}>Choisir la livraison</button>
        )}
        {origin === 'cart' && isValidated && (
          <button onClick={handleOrderSubmit}>Commander</button>
        )}
      </div>
    </div>
  )
}
