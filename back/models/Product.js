class Product {
  constructor(product) {
    this.id = product.id
    this.name = product.name
    this.shortDescription = product.shortDescription
    this.description = product.description
    this.price = product.price
    this.weight = product.weight
    this.brand = product.brand
    this.model = product.model
    this.category = product.category
    this.image = product.image
    this.stock = product.stock
  }
}

module.exports = Product
