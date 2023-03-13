import Order from '../Models/OrderModels'
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from '../ApiCalls/apiRequests'

export default class OrderService {
  // ********** Order request **********
  // order request
  async postOrder(data) {
    return await postRequest('/orders', data)
  }

  // get request

  async getAllOrders() {
    const req = await getRequest('/orders')
    const res = req.data
    return res.map((data) => new Order(data))
  }
  async getOrdersByUser(id) {
    const req = await getRequest('/orders/' + id)
    const res = req.data
    return res.map((data) => new Order(data))
  }

  // put request
  async putOrder(id, data) {
    return await putRequest('/orders/' + id, data)
  }

  // delete request
  async deleteOrder(id) {
    return await deleteRequest('/orders/' + id)
  }
}
