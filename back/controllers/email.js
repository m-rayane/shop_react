const nodemailer = require('nodemailer')
const ejs = require('ejs')
const path = require('path')
const fs = require('fs')

exports.sendEmail = async (req, res) => {
  console.log(req.body)
  const transporter = nodemailer.createTransport({
    service: 'smtp',
    host: 'mrayane.com',
    port: 465,
    auth: {
      user: 'jovivefr@mrayane.com',
      pass: 'jovivefr38!',
    },
  })
  const mailOptions = {
    from: req.body.from,
    to: req.body.to,
    subject: req.body.subject,
    html: await ejs.renderFile(
      path.join(__dirname, `views/email-${req.body.orderStatus}.ejs`),
      {
        title: req.body.title,
        text: req.body.text,
        orderDetails: req.body.orderDetails,
      }
    ),
  }
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err)
      res.status(500).send("Erreur lors de l'envoi de l'email")
    } else {
      res.status(200).send('Email envoyé avec succès')
    }
  })
}
