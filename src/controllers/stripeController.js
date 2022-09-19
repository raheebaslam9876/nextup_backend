const globalServices = require("../services/index")
// *************************************************************************
module.exports = {
  createConnectAccountLink: async (req, res) => {
    let connect_account_id = req.jwt_account.connect_account.connect_id
    let connectAccountLinkResult = await globalServices.stripe.createConnectAccountLink({connect_account_id})
    return globalServices.global.returnResponse(res, 200, true, 'Connect account link to connect your bank account.', { link: connectAccountLinkResult });

  },
  // ************************************************


}