import User from '../Models/UserModels'
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from '../ApiCalls/apiRequests'

export default class UserService {
  // ********** User request **********

  // get request
  async getUsers() {
    const req = await getRequest('/users')
    const res = req.data
    return res.map((data) => new User(data))
  }

  async getEmails() {
    const req = await getRequest('/users/emails')
    const res = req.data
    return res.map((data) => data)
  }

  async getUser(id) {
    const req = await getRequest('/users/' + id)
    const res = req.data
    return res
  }

  async logoutUser() {
    return await getRequest('/logout')
  }

  // post request
  async createUser(data) {
    return await postRequest('/signup', data)
  }

  async logInUser(data) {
    return await postRequest('/login', data)
  }

  // put request
  async editUser(id, data) {
    return await putRequest('/users/' + id, data)
  }

  // delete request
  async deleteUser(id) {
    return await deleteRequest('/users/' + id)
  }

  // ********** Shipping Address request **********

  async addShippingAddress(id, data) {
    return await postRequest('/shipping_address/' + id, data)
  }

  async getAllAddress() {
    const req = await getRequest('/shipping_address')
    const res = req.data
    return res
  }

  async getShippingAddress(id) {
    const req = await getRequest('/shipping_address/' + id)
    const res = req.data
    return res
  }
}
