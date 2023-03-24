export default class OrderDetail {
  constructor(data) {
    this._id = data.id
    this._orderId = data.orderId
    this._productId = data.productId
    this._quantity = data.quantity
    this._priceUnit = data.priceUnit
    this._discount = data.discount
  }
  get id() {
    return this._id
  }
  get orderId() {
    return this._orderId
  }
  get productId() {
    return this._productId
  }
  get quantity() {
    return this._quantity
  }
  get pripriceUnitce() {
    return this._priceUnit
  }
  get discount() {
    return this._discount
  }
}
