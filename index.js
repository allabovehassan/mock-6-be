const express = require("express");
const app = express();
const { connection } = require("./config/db");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("./model/user_Model");
const { flightRouter } = require("./routes/flightRoutes");
const { bookingRouter } = require('./routes/bookingRoutes');
const { bookingModel } = require("./model/booking_Model");

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Api Wroking Fine`);
});

app.use("/api/flights", flightRouter);
app.use("/api/booking", bookingRouter);




app.post("/api/register", async (req, res) => {
  let payload = req.body;
  try {
    bcrypt.hash(payload.password, 3, async (err, hash) => {
      if (err) {
        console.log(`Error`);
      } else {
        let user = new userModel({
          name: payload.name,
          email: payload.email,
          password: hash,
        });
        await user.save();
        res.status(201).send(`Registerred Sucessfully`);
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(404).send(error.message);
  }
});



app.post("/api/login", async (req, res) => {
  let { email, password } = req.body;
  try {
    let data = await userModel.findOne({ email });
    // console.log(data)

    if (data) {
      let token = jwt.sign({ userID: data._id }, "hassan");
      // console.log(token);

      res.status(201).send({ message: "LOgin Sucessfull", Token: token });
    } else {
      console.log(`Something Went Wrong`);
    }
  } catch (error) {
    console.log(error.message);
    res.status(404).send(`Please Try Again`);
  }
});



app.get("/api/dashboard", async (req, res) => {
  try {
    let Data = await bookingModel.find();
    res.status(200).send(Data);
  } catch (error) {
    res.status(404).send({message:error.message});
    
  }
})



app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log(`Connected To DB`);
  } catch (error) {
    console.log(error.message);
  }
  console.log(`Server runnning at ${process.env.port}`);
});
