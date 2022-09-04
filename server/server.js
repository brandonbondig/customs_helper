const express = require("express");
const { excel2json } = require("./scripts/excel2json");
const fileUpload = require("express-fileupload");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.get("/", (req, res) => {
  excel2json("python/ibL.xlsx");
  res.sendStatus(200);
});

app.post("/upload_excel", async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded",
      });
    } else {
      const dateNow = Date.now();

      const excel = req.files.excel;

      await excel.mv("./temp/" + dateNow + excel.name);

      let jsonObj = await excel2json("./temp/" + dateNow + excel.name);

      fs.unlinkSync("./temp/" + dateNow + excel.name);

      console.log("post request succeded");

      res.send(jsonObj);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
