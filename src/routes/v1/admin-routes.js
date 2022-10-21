const globalPackages = require('../../global-package');
const router = globalPackages.express.Router();
const adminValidationController = require("../../validators/adminValidationController");
const adminController = require('../../controllers/adminController')


router.post('/seed-admin', adminController.seedAdmin);
router.post('/login', adminController.login);
router.post('/createAthlete', adminController.createAthlete);
router.post('/createToken', adminController.createToken);
router.post('/reset-password', adminValidationController.resetPassword, adminController.resetPassword);
router.post('/verify-otp', adminValidationController.verifyOpt, adminController.verifyOpt);
router.post('/update-password-otp', adminValidationController.updatePasswordByLink, adminController.updatePasswordByLink);
router.post('/verify-account', adminValidationController.verifyOpt, adminController.verifyAccount);

module.exports = router;