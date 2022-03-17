const nodemailer = require('nodemailer')


// sendgrid mailer setting
var smtpTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'sangkhla2go@gmail.com',
    pass: 'sangkhla2go.com'
  },
})

// const handlebarsOptions = {
//   viewEngine: {
//     extName: '.html',
//     partialsDir: `${appDir}/server/mailer/`,
//     layoutsDir: `${appDir}/server/mailer/`,
//     defaultLayout: 'email-layout.html',
//   },
//   viewPath: `${appDir}/server/mailer/`,
//   extName: '.html',
// }

// smtpTransport.use('compile', hbs(handlebarsOptions))

module.exports = {
  smtpTransport,
}
