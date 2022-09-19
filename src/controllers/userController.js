const globalServices = require("../services/index")
// *************************************************************************
module.exports = {
  signUp: async (req, res) => {
    let records = req.body;
    let emailVerification = await globalServices.user.findUserByObjects({ email: records.email });
    if (emailVerification && emailVerification._id && emailVerification.email == records.email) {
      return globalServices.global.returnResponse(res, 403, false, "Account already exit with this email", {});
    }
    records.otp = await globalServices.global.createOtp()
    let result = await globalServices.user.signUp(records);
    if (result && result._id) {
      let emailResult = await globalServices.email.verifyAccount(result);
      if (emailResult) {
        return globalServices.global.returnResponse(res, 201, false, "Account created successfully.Please check your email to verify your account.", result)
      } else {
        return globalServices.global.returnResponse(res, 401, true, "Email sending error.Please try after later.", result)
      }
    } else {
      return globalServices.global.returnResponse(res, 500, true, "Server error while creating account.Please try again after some time..", result)
    }
  },
  // **********************************************************************
  login: async (req, res) => {
    let records = req.body;
    let accountResult = await globalServices.user.findUserByObjects({ email: records.email });
    if (accountResult && accountResult._id) {
      let verifyPassword = await globalServices.global.verifyPassword(accountResult.password, records.password);
      if (verifyPassword && accountResult.login_try < 8) {
        if (accountResult.verified) {
          let JwtToken = await globalServices.global.JwtToken({ _id: accountResult._id });
          let updatedResult = await globalServices.user.updateUserAccountById(accountResult._id, { token: JwtToken, login_try: 0 });
          return globalServices.global.returnResponse(res, 200, false, "Login successful.redirecting you to dashboard.", updatedResult)
        } else {
          return globalServices.global.returnResponse(res, 401, true, "Your account is not verified.Please reset your account password or see your old email", {})
        }
      } else {
        if (accountResult.login_try >= 8) {
          let updatedResult = await globalServices.user.updateUserAccountById(accountResult._id, { verified: false });
          let loginTryResult = await globalServices.user.updateLoginHits(accountResult._id);
          return globalServices.global.returnResponse(res, 401, true, "You have try too many time to login to account.Your account has been blocked.", {})
        } else {
          let updatedResult = await globalServices.user.updateLoginHits(accountResult._id);
          return globalServices.global.returnResponse(res, 401, true, "Email or password is wrong.", {})
        }
      }
    } else {
      return globalServices.global.returnResponse(res, 401, true, "Email or password is wrong.", {})
    }
  },
  // **********************************************************************
  updatePasswordByLink: async (req, res) => {
    let { email, otp, password } = req.body;
    let result = await globalServices.user.findUserByObjects({ email });
    if (result && result._id) {
      if (result && result.otp !== "" && result.otp == otp) {
        let encryptedPassword = await globalServices.global.encryptedPassword(password)
        let token = await globalServices.global.JwtToken({ _id: result._id })
        let updateResult = await globalServices.user.updateUserAccountById(result._id, { password: encryptedPassword, otp: "", token, verified: true, login_try: 0 });
        globalServices.global.returnResponse(res, 200, false, 'Password updating successfully.Redirecting you to dashboard.', updateResult);
      } else {
        globalServices.global.returnResponse(res, 406, true, 'Otp verification failed.', {});
      }
    } else {
      globalServices.global.returnResponse(res, 404, true, 'No record found with this email.', {});
    }
  },
  // **********************************************************************
  verifyAccount: async (req, res) => {
    let { email, otp } = req.body;
    let result = await globalServices.user.findUserByObjects({ email });
    if (result && result._id) {
      if (result.otp == otp) {
        let token = await globalServices.global.JwtToken({ _id: result._id });
        let updateResult = await globalServices.user.updateUserAccountById(result._id, { otp: "", token, verified: true, login_try: 0 });
        globalServices.global.returnResponse(res, 200, false, 'Account verified successfully.Redirecting you to dashboard.', updateResult);
      } else {
        globalServices.global.returnResponse(res, 406, true, 'Otp verification failed.', { otp_verification: false });
      }
    } else {
      globalServices.global.returnResponse(res, 409, true, 'No records found with this email.', {});
    }
  },
  // **********************************************************************
  verifyOpt: async (req, res) => {
    let { email, otp } = req.body;
    let result = await globalServices.user.findUserByObjects({ email });
    if (result && result._id) {
      if (result.otp == otp) {
        globalServices.global.returnResponse(res, 200, false, 'Otp verification successful.', { otp_verification: true });
      } else {
        globalServices.global.returnResponse(res, 406, true, 'Otp verification failed.', { otp_verification: false });
      }
    } else {
      globalServices.global.returnResponse(res, 409, true, 'No records found with this email.', {});
    }
  },
  // **********************************************************************
  resetPassword: async (req, res) => {
    let email = req.body.email;
    let otp = await globalServices.global.createOtp();
    console.log(otp)
    if (otp) {
      let result = await globalServices.user.updateUserAccountByObjects({ email }, { otp });
      if (result && result._id) {
        let emailResult = await globalServices.email.resetPassword(email, { otp });
        if (emailResult) {
          globalServices.global.returnResponse(res, 200, false, 'Email sent successfully.Please look you email to reset your password.', {})
        } else {
          globalServices.global.returnResponse(res, 401, true, 'Server email sending error.', {});
        }
      } else {
        globalServices.global.returnResponse(res, 404, true, 'No record found with this email.', {});
      }
    } else {
      globalServices.global.returnResponse(res, 500, true, 'Server otp error.', {})
    }
  },
}