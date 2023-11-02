// const express =  require("express");
// const cors =   require("cors"); 
// const morgan =  require("morgan");
// const dotenv  = require("dotenv");
// const colors = require('colors');    
// const connectDb = require("./Config/connectDB");

// dotenv.config();

// // calling database
// connectDb();

// // rest object
// const app =  express();

// // middleware
// app.use(cors());
// app.use(morgan('dev'));
// app.use(express.json());


// // routes
// app.get("/api/v1/users",require('./Routes/userRoute'))


// // port declaration
// const PORT = 8080;

// app.listen(PORT,()=>{

//     console.log('Server Started at 8080')
// })


const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDb = require("./Config/connectDb");
// config dot env file
dotenv.config();

//databse call
connectDb();

//rest object
const app = express();

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//routes
app.use("/api/v1/users", require("./Routes/userRoute"));

//transections routes
app.use("/api/v1/transections", require("./Routes/transactioRoute"));

//port
const PORT = 8080 || process.env.PORT;

//listen server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});