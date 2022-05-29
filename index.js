// require('dotenv').config()
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/db');
const preference = require('./routes/preference');
const user = require('./routes/user');
const cors = require('cors');

const  corsOptions = {
  origin:'http://localhost:3000/', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

const app = express();

app.use(cors());
app.use(cors({ origin: 'https://glee-cinema.herokuapp.com', credentials: true }))

//Body-parsing
app.use(express.json({}));
app.use(express.json({
    extented: true
}));

dotenv.config({
  path:'./config/config.env'
});

connectDB();

app.use("/user" , user);
app.use("/home" , preference);



const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log(`Server on port ${process.env.PORT}`);
})