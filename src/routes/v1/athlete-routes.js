const globalPackages = require('../../global-package');
const router = globalPackages.express.Router();
const userValidateController = require("../../validators/userValidationController");
const athleteController = require("../../controllers/athleteController")

// ******************************************** 
router.post('/createNFT', athleteController.createNFT);
router.post('/login', athleteController.login);
router.get('/viewToken', athleteController.viewToken);
router.get('/viewNFT', athleteController.viewNFT);
router.patch('/updateProfile', athleteController.UpdateProfile);
router.patch('/change-password', athleteController.changePassword);
module.exports = router;