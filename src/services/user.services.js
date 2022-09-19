const modals = require('../models/index');
const globalServices = require('./global.services')


// *************************************************************************
let userServices = module.exports = {
  findUserByObjects: (payLoad) => new Promise((resolve, reject) => modals.user.findOne(payLoad).then(data => resolve(data)).catch(error => { console.log("error => findUserBYObjects:", error); reject("") })),
  updateUserAccountByObjects: (findPayload, updatePayLoad) => new Promise((resolve, reject) => modals.user.findOneAndUpdate(findPayload, { $set: updatePayLoad }, { new: true }).then(data => resolve(data)).catch(error => { console.log("error => findUserBYObjects:", error); reject("") })),
  updateUserAccountById: (id, updatePayLoad) => new Promise((resolve, reject) => modals.user.findOneAndUpdate({ _id: id }, { $set: updatePayLoad }, { new: true }).then(data => resolve(data)).catch(error => { console.log("error => findUserBYObjects:", error); reject("") })),
  updateLoginHits: (id) => new Promise((resolve, reject) => modals.user.findOneAndUpdate({ _id: id }, { $inc: { login_try: 1 } }, { new: true }).then(data => resolve(data)).catch(error => { console.log("error => findUserBYObjects:", error); reject("") })),
  // **********************************************************************
  signUp: (payLoad) => new Promise(async (resolve, reject) => {
    payLoad.otp = await globalServices.createOtp();
    let savingObjects = modals.user(payLoad);
    let result = await savingObjects.save();
    if (result && result._id) { resolve(result); } else { console.log("error => signUp :", result); reject(""); }
  }),
  // **********************************************************************


}