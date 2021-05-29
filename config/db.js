const mongoose = require('mongoose')
const config = require('config')

// DB Configuration
let db

// db = "mongodb+srv://<username>:<password>@cluster0.rsp6p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

if(process.env.NODE_ENV === 'production') {
  db = "mongodb+srv://"+process.env.mongodb_username+":"+process.env.mongodb_password+"@cluster0.rsp6p.mongodb.net/"+process.env.mongodb_dbname+"?retryWrites=true&w=majority"
} else {
  db = config.get('mongoURI')
}


const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })

    console.log('MongoDB Connected...');
  } catch (err) {
    console.log(err.message);
    process.exit(1)
  }
}

module.exports = connectDB
