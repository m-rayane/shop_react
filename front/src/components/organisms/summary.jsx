export default function Summary({
  className,
  totalPrice,
  isValidated,
  handleCartSubmit,
  handleOrderSubmit,
}) {
  return (
    <div className={className}>
      <h2>Récapitulatif</h2>
      <div className={`${className}__content`}>
        <h3>Prix total : {totalPrice}€</h3>
        {!isValidated && (
          <button onClick={handleCartSubmit}>Choisir la livraison</button>
        )}
        {isValidated && <button onClick={handleOrderSubmit}>Commander</button>}
      </div>
    </div>
  )
}
