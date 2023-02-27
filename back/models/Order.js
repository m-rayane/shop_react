class Order {
  constructor(order) {
    this.id = order.id
    this.userId = order.userId
    this.statut = order.statut
    this.totalPrice = order.totalPrice
    this.createdDate = order.createdDate
    this.updatedDate = order.updatedDate
    this.shippingAddress = order.shippingAddress
    this.shippingDate = order.shippingDate
  }
}

module.exports = Order
