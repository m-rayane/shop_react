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

  // delete request
  async addShippingAddress(id) {
    return await putRequest('/users/' + id + '/shippingAddress')
  }
}
