const globalPackages = require('../../global-package');
const router = globalPackages.express.Router();
const userValidateController = require("../../validators/userValidationController");
const athleteController = require("../../controllers/athleteController")

// ******************************************** 
router.post('/createNFT', athleteController.createNFT);


module.exports = router;