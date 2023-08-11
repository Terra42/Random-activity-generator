import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  let type = req.body.type;
  let participants = req.body.participants;
  let url = `https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`;
  try {
    const response = await axios.get(url);
    const result = response.data;
    let randomIndex = Math.floor(Math.random() * (result.length + 1));
    res.render("index.ejs", { data: result[randomIndex] });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: "No activities were found to match your criteria",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
