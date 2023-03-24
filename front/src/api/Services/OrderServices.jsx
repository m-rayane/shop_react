import Order from '../Models/OrderModels'
import OrderDetail from '../Models/OrderDetailModel'

import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from '../ApiCalls/apiRequests'

export default class OrderService {
  // ********** Order request **********
  // post request
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

  async getOrderDetailByUser(userId) {
    const req = await getRequest('/orders/' + userId + '/detailsByUser')
    const res = req.data
    return res.map((data) => new OrderDetail(data))
  }

  async getOrderDetailByOrder(orderId) {
    const req = await getRequest('/orders/' + orderId + '/detailsByOrder')
    const res = req.data
    return res.map((data) => new OrderDetail(data))
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
