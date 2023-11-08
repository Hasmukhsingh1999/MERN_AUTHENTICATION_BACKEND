 const mongoose = require('mongoose')
exports.Connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
    });
    console.log(`Database connected!`);
  } catch (error) {
    console.log(error.message);
  }
};
