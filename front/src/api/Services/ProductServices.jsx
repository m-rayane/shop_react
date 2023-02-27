import Product from '../Models/ProductModels'
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
    console.log(data)
    return await postRequest('/products', data)
  }

  // get request
  async getProduct() {
    const req = await getRequest('/products')
    const res = req.data
    return res.map((data) => new Product(data))
  }

  // put request
  async putProduct(id, data) {
    return await putRequest('/products/' + id, data)
  }

  // delete request
  async deleteProduct(id) {
    return await deleteRequest('/products/' + id)
  }

  // ********** Review request **********

  // product request
  async postReview(id, data) {
    return await postRequest('/products/' + id + '/review', data)
  }

  async getReview(id) {
    const req = await getRequest('/products/' + id + '/review')
    const res = req.data
    console.log(req.data)
    return res.map((data) => new Review(data))
  }

  async deleteReview(id) {
    return await deleteRequest('/products/' + id + '/review')
  }

  // put request
  async putReview(id, data) {
    return await putRequest('/products/' + id + '/review', data)
  }

  // ********** Like request **********

  // product request
  async productRating(id, data) {
    return await postRequest('/products/' + id + '/rating', data)
  }
}
