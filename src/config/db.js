const mongoose = require("mongoose"); 
mongoose.connect(process.env.MONGO_URL, {
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
  })
  .then((e) => {
     console.log(`MongoDB Connected`); 
  })
  .catch((e) => {
    console.log("MongoDB Connection error.",e.message);
  });
