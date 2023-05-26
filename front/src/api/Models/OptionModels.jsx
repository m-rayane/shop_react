export default class Option {
  constructor(data) {
    this._id = data.id
    this._productId = data.productId
    this._name = data.name
    this._description = data.description
    this._price = data.price
  }
  get id() {
    return this._id
  }
  get productId() {
    return this._productId
  }
  get name() {
    return this._name
  }
  get description() {
    return this._description
  }
  get price() {
    return this._price
  }
}
