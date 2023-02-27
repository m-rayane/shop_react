class User {
  constructor(user) {
    this.email = user.email
    this.password = user.password
    this.lastName = user.lastName
    this.firstName = user.firstName
    this.role = user.role
    this.phoneNumber = user.phoneNumber
    this.address = user.address
    this.zipCode = user.zipCode
    this.city = user.city
  }
}

module.exports = User
