const Modals = require('../models/index');
const Packages = require('../global-package');

// ÷*******************************************************
const adminProtectRoute = (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      let token = req.headers.authorization.split(' ')[1];
      if (token) {
        Packages.jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
          if (err) {
            return res.status(401).json({
              success: false,
              msg: "Token not valid.",
              token: false
            })
          }
          Modals.Admin.findById({ _id: data._id }).then(data => {
            if (data && data.token == token) {
              req.jwt_account = data;
              // req.user_folder_path = `${req.user._id}/${moment(new Date()).format("Y/MMM")}`;
              next()
            } else {
              return res.status(401).json({
                success: false,
                msg: "admin account not found.",
                token: false
              })
            }
          })

        })
      } else {
        return res.status(401).json({
          Error: true,
          msg: "Not authorized, no token"
        })
      }
    } catch (error) {
      return res.status(401).json({
        Error: true,
        msg: "Not authorized, token failed"
      })
    }
  } else {
    return res.status(401).json({
      Error: true,
      msg: "Not authorized, token failed"
    })
  }

}



module.exports = { adminProtectRoute };
