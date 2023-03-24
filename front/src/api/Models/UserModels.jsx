export default class User {
  constructor(data) {
    this._id = data.id
    this._createdDate = data.createdDate
    this._firstName = data.firstName
    this._lastName = data.lastName
    this._email = data.email
    this._role = data.role
    this._phoneNumber = data.phoneNumber
    this._address = data.address
    this._zipCode = data.zipCode
    this._city = data.city
  }

  get id() {
    return this._id
  }
  get firstName() {
    return this._firstName
  }
  get lastName() {
    return this._lastName
  }
  get email() {
    return this._email
  }
  get role() {
    return this._role
  }
  get phoneNumber() {
    return this._phoneNumber
  }
  get address() {
    return this._address
  }
  get zipCode() {
    return this._zipCode
  }
  get country() {
    return this._country
  }
}
