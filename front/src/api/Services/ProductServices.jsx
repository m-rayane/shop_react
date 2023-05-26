import Product from '../Models/ProductModels'
import Technical from '../Models/TechnicalModels'
import Option from '../Models/OptionModels'
import Review from '../Models/ReviewModels'
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from '../ApiCalls/apiRequests'

export default class ProductServices {
  // ********** Product request **********
  // product request
  async postProduct(data) {
    return await postRequest('/products', data)
  }

  async postTechnical(data) {
    return await postRequest('/technicals', data)
  }

  async postOption(data) {
    return await postRequest('/options', data)
  }

  // get request
  async getProduct() {
    const req = await getRequest('/products')
    const res = req.data
    return res.map((data) => new Product(data))
  }

  async getTechnical(id) {
    const req = await getRequest(`/technicals/${id}`)
    const res = req.data
    return res.map((data) => new Technical(data))
  }

  async getOption(id) {
    const req = await getRequest(`/options/${id}`)
    const res = req.data
    return res.map((data) => new Option(data))
  }

  async getAllOptions() {
    const req = await getRequest(`/options`)
    const res = req.data
    return res.map((data) => new Option(data))
  }

  // put request
  async putProduct(id, data) {
    console.log(id, data)
    return await putRequest(`/products/${id}`, data)
  }

  async putTechnical(id, data) {
    console.log(id, data)
    return await putRequest(`/technicals/${id}`, data)
  }

  async putOption(id, data) {
    console.log(id, data)
    return await putRequest(`/options/${id}`, data)
  }

  // delete request
  async deleteProduct(id) {
    return await deleteRequest(`/products/${id}`)
  }

  async deleteTechnical(id) {
    return await deleteRequest(`/technicals/${id}`)
  }

  async deleteOption(id) {
    return await deleteRequest(`/options/${id}`)
  }

  // ********** Review request **********

  // product request
  async postReview(id, data) {
    return await postRequest(`/products/${id}/review`, data)
  }

  async getReview(id) {
    const req = await getRequest(`/products/${id}/review`)
    const res = req.data
    console.log(req.data)
    return res.map((data) => new Review(data))
  }

  async deleteReview(id) {
    return await deleteRequest(`/products/${id}/review`)
  }

  // put request
  async putReview(id, data) {
    return await putRequest(`/products/${id}/review`, data)
  }

  // ********** Like request **********

  // product request
  async productRating(id, data) {
    return await postRequest(`/products/${id}/rating`, data)
  }
}
