export default class Review {
  constructor(data) {
    this._id = data.id
    this._postId = data.postId
    this._userId = data.userId
    this._content = data.content
    this._comFirstName = data.firstName
    this._comLastName = data.lastName
    this._comPicture = data.picture
    this._comRole = data.role
  }

  get id() {
    return this._id
  }
  get postId() {
    return this._postId
  }
  get userId() {
    return this._userId
  }
  get content() {
    return this._content
  }
  get comFirstName() {
    return this._comFirstName
  }
  get comLastName() {
    return this._comLastName
  }
  get comPicture() {
    return this._comPicture
  }
  get comRole() {
    return this._comRole
  }
}
