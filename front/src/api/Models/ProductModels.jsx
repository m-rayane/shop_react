export default class Product {
  constructor(data) {
    this._id = data.id
    this._name = data.name
    this._description = data.description
    this._price = data.price
    this._weight = data.weight
    this._brand = data.brand
    this._model = data.model
    this._category = data.category
    this._image = data.image
  }
  get productId() {
    return this._id
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
  get image() {
    return this._image
  }
}
