const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, `.env.${process.env.NODE_ENV}`),
});
// require('dotenv').config();//{ path: '../.env' }
const Packages = require('./src/global-package')
require('./src/config/db');
// ********************************************************************* 
var server = Packages.app.listen(process.env.PORT || 8070);
// **************************** **********************************************
// var io = require('socket.io')(server, {
//   cors: {
//     origin: '*',
//   }
// });
// app.set('socketio', io);
// io.on('connection', (socket) => {
//   console.log("New user connected to node server ")
//   // socket.on('event', (payLoad) => {

//   // });
//   socket.on('disconnect', () => {
//     console.log("some of user is disconnected form node server")
//   });
// });
// **************************************************************************
// origin: {["http://localhost:3001", "http://localhost:3000"], credentials: true, methods: "GET,HEAD,PUT,PATCH,POST,DELETE", })

Packages.app.use(Packages.cors({ credentials: true }));
Packages.app.use(Packages.express.json({ limit: '500mb', type: 'application/json' }));
Packages.app.use(Packages.express.urlencoded({ limit: '500mb', extended: true, }));
Packages.app.use(Packages.express.static(Packages.path.join(__dirname, 'public')));
// const fileUpload = require('express-fileupload')
// Packages.app.use(fileUpload())

// *********************************************************************
// crone jobs
// require('./src/jobs/unmited-nftes');

// *********************************************************************  
// api routers
Packages.app.use('/api/v1/user/', require('./src/routes/v1/user-routes'));
Packages.app.use('/api/v1/admin/', require('./src/routes/v1/admin-routes'));
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
