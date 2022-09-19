const globalPackages = require('../../global-package');
const router = globalPackages.express.Router();
const adminValidationController = require("../../validators/adminValidationController");
const adminController = require('../../controllers/adminController')
const stripeController = require('../../controllers/stripeController')
const { adminProtectRoute } = require('../../middleware/admin-auth-middleware');


// ******************************************** 
//auth api
router.post('/signUp', adminValidationController.create_account, adminController.signUp);
router.post('/login', adminValidationController.login, adminController.login);
router.post('/reset-password', adminValidationController.resetPassword, adminController.resetPassword);
router.post('/verify-otp', adminValidationController.verifyOpt, adminController.verifyOpt);
router.post('/update-password-otp', adminValidationController.updatePasswordByLink, adminController.updatePasswordByLink);
router.post('/verify-account', adminValidationController.verifyOpt, adminController.verifyAccount);
// ****************Donation api**************************** 




module.exports = router;