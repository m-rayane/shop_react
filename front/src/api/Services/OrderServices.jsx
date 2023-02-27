import Order from '../Models/OrderModels'
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from '../ApiCalls/apiRequests'

export default class OrderServices {
  // ********** Order request **********
  // order request
  async postOrder(data) {
    console.log(data)
    return await postRequest('/orders', data)
  }

  // get request
  async getOrder() {
    const req = await getRequest('/orders')
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
