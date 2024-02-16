import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Bill } from "./models/billModel.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "https://mern-client-whfs.onrender.com/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome");
});

app.post("/bills", async (request, response) => {
  try {
    if (!request.body.name || !request.body.item || !request.body.price) {
      return response.status(400).send({
        message: "Please send all req-fields: name, item, price",
      });
    }
    const newBill = {
      name: request.body.name,
      item: request.body.item,
      price: Number(request.body.price),
    };
    const bill = await Bill.create(newBill);
    return response.status(201).send(bill);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

app.get("/bills", async (request, response) => {
  try {
    const bills = await Bill.find({});

    return response.status(200).json({
      count: bills.length,
      data: bills,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

app.get("/bills/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const bill = await Bill.findById(id);

    return response.status(200).json(bill);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


app.delete("/bills/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Bill.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({ message: "Bill not found" });
    }

    return response.status(200).send({ message: "The Bill is deleted" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log(`App Connected To Database`);
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
