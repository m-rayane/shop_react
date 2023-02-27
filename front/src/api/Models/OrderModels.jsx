export default class Order {
  constructor(data) {
    this._id = data.id
    this._userId = data.userId
    this._statut = data.statut
    this._totalPrice = data.totalPrice
    this._createdDate = data.createdDate
    this._updatedDate = data.updatedDate
    this._shippingAddress = data.shippingAddress
    this._shippingDate = data.shippingDate
  }
  get id() {
    return this._id
  }
  get userId() {
    return this._userId
  }
  get statut() {
    return this._statut
  }
  get totalPrice() {
    return this._totalPrice
  }
  get createdDate() {
    return this._createdDate
  }
  get updatedDate() {
    return this._updatedDate
  }
  get shippingAddress() {
    return this._shippingAddress
  }
  get shippingDate() {
    return this._shippingDate
  }
}
