const modals = require('../models/index');
const globalServices = require('./global.services')


// *************************************************************************
let userServices = module.exports = {
  findUserByObjects: (payLoad) => modals.admin.findOne(payLoad).then(data => data).catch(error => { console.log("error => findUserBYObjects:", error); return "" }),
  findAdminById: (id) => modals.admin.findById({ _id: id }).select("organization_name").then(data => data).catch(error => { console.log("error => findUserBYObjects:", error); return "" }),
  updateUserAccountByObjects: (findPayload, updatePayLoad) => modals.admin.findOneAndUpdate(findPayload, { $set: updatePayLoad }, { new: true }).then(data => data).catch(error => { console.log("error => findUserBYObjects:", error); return "" }),
  updateUserAccountById: (id, updatePayLoad) => modals.admin.findOneAndUpdate({ _id: id }, { $set: updatePayLoad }, { new: true }).populate("connect_account").then(data => data).catch(error => { console.log("error => findUserBYObjects:", error); return "" }),
  updateLoginHits: (id) => modals.admin.findOneAndUpdate({ _id: id }, { $inc: { login_try: 1 } }, { new: true }).then(data => data).catch(error => { console.log("error => findUserBYObjects:", error); return "" }),
  // **********************************************************************
  signUp: (payLoad) => new Promise(async (resolve, reject) => {
    payLoad.otp = await globalServices.createOtp();
    let savingObjects = modals.admin(payLoad);
    let result = await savingObjects.save();
    if (result && result._id) { resolve(result); } else { console.log("error => signUp :", result); reject(""); }
  }),
  // **********************************************************************


}