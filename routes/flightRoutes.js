const express = require("express");

const flightRouter = express.Router();
const { flightModel } = require("../model/flight_Model");

flightRouter.get("/", async (req, res) => {
  try {
    let data = await flightModel.find();
    res.status(200).send(data);
  } catch (error) {
    console.log(error.message);
    res.status(404).send({message:error.message});
  }
});

flightRouter.post("/", async (req, res) => {
  //   let payload = req.body;
  try {
    let Data = new flightModel(req.body);
    await Data.save();
    res.status(201).send("Flight Sucessfully Created");
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

flightRouter.patch("/:id", async (req, res) => {
  let ID = req.params.id;
  let payload = req.body;
  try {
    await flightModel.findByIdAndUpdate({ _id: ID }, payload);

    res.status(204).send("Done");
  } catch (error) {
    console.log(error.message);
    res.status(404).send({ message: error.message });
  }
});

flightRouter.delete("/:id", async (req, res) => {
  let ID = req.params.id;

  try {
    await flightModel.findByIdAndDelete({ _id: ID });
    res.status(202).send("Deleted");
  } catch (error) {
    console.log(error.message);
    res.status(404).send({ message: error.message });
  }
});

module.exports = { flightRouter };
