const globalPackages = require('../../global-package');
const router = globalPackages.express.Router();
const userValidateController = require("../../validators/userValidationController");
const userController = require('../../controllers/userController')
const { userProtectRoute } = require('../../middleware/user-auth-middleware');





// ******************************************** 
router.post('/signUp', userValidateController.create_account, userController.signUp);
router.post('/login', userValidateController.login, userController.login);
router.post('/reset-password', userValidateController.resetPassword, userController.resetPassword);
router.post('/verify-otp', userValidateController.verifyOpt, userController.verifyOpt);
router.post('/update-password-otp', userValidateController.updatePasswordByLink, userController.updatePasswordByLink);
router.post('/verify-account', userValidateController.verifyOpt, userController.verifyAccount);
// ****************donation apis****************************  





module.exports = router;