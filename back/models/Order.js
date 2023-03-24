class Order {
  constructor(order) {
    this.id = order.id
    this.userId = order.userId
    this.status = order.status
    this.totalPrice = order.totalPrice
    this.preparationDate = order.updatedDate
    this.deliveringDate = order.updatedDate
    this.cancelingDate = order.updatedDate
    this.shippingName = order.shippingName
    this.shippingPhone = order.shippingPhone
    this.shippingAddress = order.shippingAddress
    this.shippingNumber = order.shippingNumber
    this.shippingDate = order.shippingDate
  }
}

module.exports = Order
