const Modals = {}

Modals.admin = require('./admin.Modal');
Modals.athlete = require('./athlete.Modal');
Modals.user = require('./user.Modal');
Modals.nft = require('./nft.Modal');
Modals.error = require('./error.Modal');
Modals.token = require('./token.Modal');

module.exports = Modals;