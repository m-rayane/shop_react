export default class Technical {
  constructor(data) {
    this._id = data.id
    this._productId = data.productId
    this._technicalRank = data.technicalRank
    this._title = data.title
    this._content = data.content
    this._category = data.category
  }
  get id() {
    return this._id
  }
  get productId() {
    return this._productId
  }
  get technicalRank() {
    return this._technicalRank
  }
  get title() {
    return this._title
  }
  get content() {
    return this._content
  }
  get category() {
    return this._category
  }
}
