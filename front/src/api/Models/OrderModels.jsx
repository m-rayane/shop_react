export default class Order {
  constructor(data) {
    this._id = data.id
    this._userId = data.userId
    this._status = data.status
    this._totalPrice = data.totalPrice
    this._createdDate = data.createdDate
    this._preparationDate = data.preparationDate
    this._deliveringDate = data.deliveringDate
    this._cancelingDate = data.cancelingDate
    this._shippingName = data.shippingName
    this._shippingPhone = data.shippingPhone
    this._shippingAddress = data.shippingAddress
    this._shippingNumber = data.shippingNumber
    this._shippingDate = data.shippingDate
  }
  get id() {
    return this._id
  }
  get userId() {
    return this._userId
  }
  get status() {
    return this._status
  }
  get totalPrice() {
    return this._totalPrice
  }
  get createdDate() {
    return this._createdDate
  }
  get preparationDate() {
    return this._preparationDate
  }
  get cancelingDate() {
    return this._cancelingDate
  }
  get deliveringDate() {
    return this._deliveringDate
  }
  get shippingName() {
    return this._shippingName
  }
  get shippingPhone() {
    return this._shippingPhone
  }
  get shippingAddress() {
    return this._shippingAddress
  }
  get shippingNumber() {
    return this._shippingNumber
  }
  get shippingDate() {
    return this._shippingDate
  }
}
