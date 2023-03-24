import EmailServices from '../../../api/Services/EmailServices'
const emailServices = new EmailServices()

export const sendEmail = async () => {
  const emailData = {
    from: 'from',
    to: 'to',
    subject: 'subject',
    text: 'text',
  }
  try {
    console.log(emailData)
    await emailServices.sendEmail(emailData)
  } catch (error) {
    console.log(error)
  }
}
