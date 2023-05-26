export default class Product {
  constructor(data) {
    this._id = data.id
    this._name = data.name
    this._shortDescription = data.shortDescription
    this._description = data.description
    this._technical = data.technical
    this._price = data.price
    this._weight = data.weight
    this._brand = data.brand
    this._model = data.model
    this._category = data.category
    this._stock = data.stock
    this._image = data.image
  }
  get productId() {
    return this._id
  }
  get name() {
    return this._name
  }
  get shortDescription() {
    return this._shortDescription
  }
  get description() {
    return this._description
  }
  get technical() {
    return this._technical
  }
  get price() {
    return this._price
  }
  get weight() {
    return this._weight
  }
  get brand() {
    return this._brand
  }
  get model() {
    return this._model
  }
  get category() {
    return this._category
  }
  get stock() {
    return this._stock
  }
  get image() {
    return this._image
  }
}
