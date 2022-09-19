const Modals = require('../models/index');
const packages = require('../global-package');
const stripe = require('../utils/stripe');


// *************************************************************************
let stripeServices = module.exports = {
  createConnectAccount: async (payLoad) => {
    try {
      let connectAccount = await stripe.accounts.create({ type: 'express' }).then(data => data);
      if (connectAccount && connectAccount.id) {
        let ConectAccountObject = new Modals.connect({ admin_id: payLoad.admin_id, connect_id: connectAccount.id })
        let result = ConectAccountObject.save();
        return result
      } else {
        return ""
      }
    } catch (error) {
      return error.message
    }
  },
  // **********************************************************************
  createConnectAccountLink: async (payLoad) => {
    try {
      let connectAccount = await stripe.accountLinks.create({
        account: payLoad.connect_account_id,
        refresh_url: 'http://localhost:3000/stripe-success',
        return_url: 'http://localhost:3000/stripe-fail',
        type: 'account_onboarding',
      });
      return connectAccount
      if (connectAccount && connectAccount.id) {
        let ConectAccountObject = new Modals.connect({ admin_id: payLoad.admin_id, connect_id: connectAccount.id })
        let result = ConectAccountObject.save();
        return result;
      } else {
        return ""
      }
    } catch (error) {
      return error.message
    }
  },
  // **********************************************************************


}