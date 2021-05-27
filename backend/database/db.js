const mongoose = require("mongoose");
const option = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};
const mongoURI = process.env.MONGODB_URI;

exports.connectDb = () => {
  mongoose.connect(mongoURI, option).then(
    function () {
      console.log("Database Connected");
    },
    function (err) {
      console.log("Database Connection Failed");
    }
  );
};
