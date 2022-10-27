const globalPackages = require('../../global-package');
const router = globalPackages.express.Router();
const adminValidationController = require("../../validators/adminValidationController");
const adminController = require('../../controllers/adminController')


router.post('/seed-admin', adminController.seedAdmin);
router.post('/login', adminController.login);
router.post('/createAthlete', adminController.createAthlete);
router.get('/viewAthlete', adminController.viewAthlete);
router.post('/createToken', adminController.createToken);
router.get('/viewToken', adminController.viewToken);
router.delete('/deleteToken/:id', adminController.deleteToken);
router.delete('/deleteAthlete/:id', adminController.DeleteAthlete);
router.patch('/updateAthlete', adminController.UpdateAthlete);
router.patch('/change-password', adminController.changePassword);
router.post('/reset-password', adminValidationController.resetPassword, adminController.resetPassword);
router.post('/verify-otp', adminValidationController.verifyOpt, adminController.verifyOpt);
router.post('/update-password-otp', adminValidationController.updatePasswordByLink, adminController.updatePasswordByLink);
router.post('/verify-account', adminValidationController.verifyOpt, adminController.verifyAccount);

module.exports = router;