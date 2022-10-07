// Initializers
const express = require("express");
const router = express.Router();
const fs = require("fs");
// Imports
const { ibLaursen } = require("../scripts/excel2json.js");

// Requests

router.get("/", () => {
  res.send(201);
});

router.post("/ib-laursen", async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded",
      });
    } else {
      const date = Date.now();

      const excel = req.files.excel;

      await excel.mv("./temp/" + date + ".xlsx");

      let jsonObj = await ibLaursen("./temp/" + date + ".xlsx");

      console.log("post request succeded");

      res.send(jsonObj);

      try {
        fs.unlinkSync("./temp/" + date + ".xlsx");
      } catch (err) {
        console.error(err);
      }

    }
  } catch (err) {

    res.status(500).send({ message: err });
  }
});
module.exports = router;
