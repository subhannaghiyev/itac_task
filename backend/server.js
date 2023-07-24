const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
const contact_router = require("./routes/contact.routes");

const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL, { useNewUrlParser: true });

const { Schema } = mongoose;

const Portfolio = new Schema({
  image: {
    type: String,
  },
  category: {
    type: String,
  },
});
app.use(`/api/contact`, contact_router);

const PortfolioSite = mongoose.model("portfolio", Portfolio);

app.get("/portfolio", async (req, res) => {
  try {
    const drimo = await PortfolioSite.find({});
    res.send(drimo);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});
app.post("/portfolio", async (req, res) => {
  try {
    const drimo = req.body;
    const drimoSave = new PortfolioSite(drimo);
    drimoSave.save();
    res.send(drimoSave);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});
app.get("/portfolio/:id", async (req, res) => {
  try {
    const drimoId = req.params.id;
    const drimo = await PortfolioSite.findById(drimoId);
    res.send(drimo);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});
app.delete("/portfolio/:id", async (req, res) => {
  try {
    const drimoId = req.params.id;
    const drimo = await PortfolioSite.findByIdAndDelete(drimoId);
    res.send(drimo);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});
app.put("/portfolio/:id", async (req, res) => {
  const id = req.params.id;
  const { image, category } = req.body;
  const putPortfolio = {
    image: image,
    category: category,
  };
  await PortfolioSite.findByIdAndUpdate(id, putPortfolio);
  res.status(200).send(putPortfolio);
});

PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is uo pn PORT : ${PORT}`);
});
