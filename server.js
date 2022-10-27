const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config({
  path: path.join(__dirname, `.env.${process.env.NODE_ENV}`),
});
require('dotenv').config();//{ path: '../.env' }
const Packages = require('./src/global-package')
require('./src/config/db');
// ********************************************************************* 
var server = Packages.app.listen(process.env.PORT || 8070);
Packages.app.use(cookieParser());
Packages.app.use(Packages.cors({ credentials: true }));
Packages.app.use(Packages.express.json({ limit: '500mb', type: 'application/json' }));
Packages.app.use(Packages.express.urlencoded({ limit: '500mb', extended: true, }));
Packages.app.use(Packages.express.static(Packages.path.join(__dirname, 'public')));
// *********************************************************************  
// api routers
Packages.app.use('/api/v1/user/', require('./src/routes/v1/user-routes'));
Packages.app.use('/api/v1/admin/', require('./src/routes/v1/admin-routes'));
Packages.app.use('/api/v1/athlete/', require('./src/routes/v1/athlete-routes'));
// Packages.app.use('/api/v1/stripe', require('./src/routes/v1/stripe-routes'));

// **********************************************************************
// url not found 

Packages.app.get('/health', (req, res) => {
  res.status(200).json({
    Error: false,
    msg: 'Site health is fine.',
  })
})

Packages.app.get('*', (req, res) => {
  res.status(404).json({
    Error: true,
    msg: 'Url not valid.',
  })
})
