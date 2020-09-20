require("dotenv").config();
const apiKey = process.env.API_KEY;

const express = require("express");
const app = express();

app.use(express.static("public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

const axios = require("axios");

// ROUTES

app.get("/", (req, res) => {
  res.render("../src/pages/index");
});

app.get("/movie", async (req, res) => {
  const {
    query: { search },
  } = req;
  const apiURL = `https://www.omdbapi.com/?t=${search}&apikey=${apiKey}`;
  console.log("apiURL ", apiURL);

  const apiData = await axios.get(apiURL);
  console.log("apiData ", apiData);
  return apiData;
});

const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
