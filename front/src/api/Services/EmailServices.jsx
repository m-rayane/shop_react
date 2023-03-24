import { postRequest } from '../ApiCalls/apiRequests'

export default class EmailService {
  // ********** Email request **********
  //  post request
  async sendEmail(data) {
    return await postRequest('/emails', data)
  }
}
