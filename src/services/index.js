const globalServices = {}

globalServices.global = require('./global.services');
globalServices.stripe = require('./stripe.services');
globalServices.email = require('./email.services');
globalServices.user = require('./user.services');
globalServices.admin = require('./admin.services');


module.exports = globalServices;