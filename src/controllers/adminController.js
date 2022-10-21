const globalServices = require("../services/index")
const adminModal = require("../models/admin.Modal")
const athlete = require("../models/athlete.Modal")
const token = require("../models/token.Modal")
const StatusCodes = require("http-status-codes")
const GlobalPackages = require('../global-package');
const bcrypt = require("bcryptjs")
// *************************************************************************
module.exports = {
  seedAdmin: async (req, res) => {
    try {
      let adminData = {
        name: "raheeb",
        password: "Money_00",
        email: "raheeb99@gmail.com",
        tokens: []

      }
      const salt = await GlobalPackages.bcrypt.genSalt(10);
      let newPassword = await GlobalPackages.bcrypt.hash(adminData.password, salt);
      adminData = {
        ...adminData,
        password: newPassword,
      }

      let admin = await adminModal.findOne({ email: 'raheeb99@gmail.com' });
      if (!admin) {
        let result = await adminModal.findOneAndUpdate({ name: "raheeb" }, adminData, {
          new: true,
          upsert: true // Make this update into an upsert
        });
        console.log("result", result)
        return res.send("admin SuccussFullyCreated")
      }
      return res.send("admin alreadyExists")
    } catch (error) {
      console.log(error)
    }
  },
  login: async (req, res) => {
    try {
      const _id = req.body._id;
      const email = req.body.email;
      const password = req.body.password;
      const adminEmail = await adminModal.findOne({ email: email });
      const passwordMatch = await bcrypt.compare(password, adminEmail.password);
      console.log("passwordMatch", passwordMatch);

      if (passwordMatch) {
        const token = await adminEmail.createJWTToken();
        res.cookie("jwt", token, {
          expires: new Date(date.now() + 300000),
          httpOnly: true
        });
        console.log(token)
        res.status(201).send("index")
      }
      else {
        res.send("Invalid Login Details....")
      }
    } catch (error) {
      console.log(error)
      res.status(400).send("Invalid Credentials..");
    }
  },
  // *************************************************************************
  createAthlete: async (req, res) => {
    console.log("start")
    const { name, email, password, DOB, tokenName, college, sport, nationality, about } = req.body;
    if (!name || !email || !password || !DOB || !tokenName || !college || !sport || !nationality || !about) {
      throw new Error("Please provide values")
    }
    const athleteAlreadyExists = await athlete.findOne({ email });
    if (athleteAlreadyExists) {
      throw new Error("Email Already in use");
    }
    const Athlete = await athlete.create({ name, email, password, DOB, tokenName, college, sport, nationality, about });
    res.sendStatus(StatusCodes.CREATED).json(
      {
        Athlete:

        {
          email: athlete.email,
          name: athlete.name,
          DOB: athlete.DOB,
          tokenName: athlete.tokenName,
          college: athlete.college,
          sport: athlete.sport,
          nationality: athlete.nationality,
          about: athlete.about
        }
      })

  },
  // *************************************************************************
  createToken: async (req, res) => {
    const { name, price, description } = req.body;
    if (!name || !price || !description) {
      throw new Error("Please provide values")
    }
    else {
      const saveToken = await token.create({ name, price, description });
      res.sendStatus(StatusCodes.CREATED);

    }
  },
  // **********************************************************************
  UpdateAthlete: async (req, res) => {
    try {

    } catch (error) {
      res.send(error)
    }
  },
  // **********************************************************************
  updatePasswordByLink: async (req, res) => {
    let { email, otp, password } = req.body;
    let result = await globalServices.admin.findUserByObjects({ email });
    if (result && result._id) {
      if (result && result.otp !== "" && result.otp == otp) {
        let encryptedPassword = await globalServices.global.encryptedPassword(password)
        let token = await globalServices.global.JwtToken({ _id: result._id })
        let updateResult = await globalServices.admin.updateUserAccountById(result._id, { password: encryptedPassword, otp: "", token, verified: true, login_try: 0 });
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
    let result = await globalServices.admin.findUserByObjects({ email });
    if (result && result._id) {
      if (result.otp == otp) {
        let connectAccountId = await globalServices.stripe.createConnectAccount({ admin_id: result._id });
        let token = await globalServices.global.JwtToken({ _id: result._id });
        let updateResult = await globalServices.admin.updateUserAccountById(result._id, { otp: "", token, verified: true, login_try: 0, connect_account: connectAccountId });
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
    let result = await globalServices.admin.findUserByObjects({ email });
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
      let result = await globalServices.admin.updateUserAccountByObjects({ email }, { otp });
      if (result && result._id) {
        let emailResult = await globalServices.email.resetPassword(email, { otp }, "admin");
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
  // **********************************************************************
}