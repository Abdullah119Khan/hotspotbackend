const mongoose = require('mongoose')

const MONGOURL = process.env.MONGOURL;

mongoose.connect(MONGOURL).then(() => {
  console.log(`MongoDB is connected Successfully`)
})
.catch((err) => {
  console.log(`Error On DB Connection ${err}`)
})