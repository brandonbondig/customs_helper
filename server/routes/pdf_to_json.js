// Initializers
const express = require("express");
const router = express.Router();
const fs = require("fs");

// Imports
let { cycleService } = require("../scripts/pdf2json.js");

// Requests

router.get("/", () => {
  res.json({ message: "No destination endpoint chosen" });
});

router.post("/cycle-service", async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded",
      });
    } else {
      const dateNow = Date.now();

      let pdf = req.files.pdf;

      await pdf.mv("./temp/" + dateNow + pdf.name);

      let jsonObj = await cycleService("./temp/" + dateNow + pdf.name);

      try {
        fs.unlinkSync("./temp/" + dateNow + pdf.name);
        console.log("File removed:", "./temp/" + dateNow + pdf.name);
      } catch (err) {
        console.error(err);
      }

      console.log("post request: " + pdf.name);

      res.send(jsonObj);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});
module.exports = router;
