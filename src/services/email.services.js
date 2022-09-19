const transporter = require("../utils/send-email");
const emailTemp = require("../emailTemplates/EmailTemplate");

// *************************************************************************
let emailServices = module.exports = {
  resetPassword: async (email, payLoad, type = "user") => {
    payLoad.email = email
    let emailFile = "Email Server Error.Contact to support to report this error."
    if (type == "admin") {
      emailFile = await emailTemp.resetPasswordAdmin(payLoad);
    } else {
      emailFile = await emailTemp.resetPasswordUser(payLoad);
    }
    let result = await emailServices.submitEmail(email, emailFile, "Email Reset link.");
    return result
  },
  verifyAccount: async (payLoad, type = "user") => {
    let emailFile = "Server Error.Please inform to support about this error."
    if (type == 'admin') {
      emailFile = await emailTemp.verifyAccountAdmin(payLoad);
    } else {
      emailFile = await emailTemp.verifyAccountUser(payLoad);
    }
    let result = await emailServices.submitEmail(payLoad.email, emailFile, "Email Reset link.");
    return result
  },
  // **********************************************************************
  submitEmail: async (email, emailFile, subject = "Payment Information") => {
    return true
    let emailResult = await transporter.sendMail({
      from: 'NFTespaña <hola@nftes.es>', // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      text: "NFT-es", // plain text body
      html: emailFile, // html body
    }).then(data => {
      if (data.messageId) {
        console.log("Email sent to:", email, "subject", subject);
        return true
      } else {
        console.log("email sending error.", data);
        return false
      }
    }).catch(error => {
      console.log("email sending error", error.message);
      return false
    });
    return emailResult
  },
  // **********************************************************************
}