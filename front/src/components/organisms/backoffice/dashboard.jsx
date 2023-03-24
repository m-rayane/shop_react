import AllOrders from './allOrders'

export default function DashBoardAdmin({ className, userData, orders }) {
  let lastOrder = []

  if (orders && orders.length > 0) {
    // Trouver l'article le plus récent
    lastOrder = orders.reduce((article1, article2) => {
      return article1.date > article2.date ? article2 : article1
    })
  }
  return (
    <div className={className}>
      <h2>{`TABLEAU DE BORD`}</h2>
      <AllOrders className={`${className}__allOrders`} />
    </div>
  )
}
