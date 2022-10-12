// Imports
const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require('cors')
const currencyConverter = require("./scripts/currencyConverter")
const bodyParser = require("body-parser")
// Initializers
const app = express();
const port = 3000;
app.use(cors())
app.use(bodyParser.json())

// Routes
const excel_to_json = require("./routes/excel_to_json");
const pdf_to_json = require("./routes/pdf_to_json");

// Middleware
app.use(
  fileUpload({
    createParentPath: true,
  })
);

// Local endpoints
app.get("/", async (req, res) => {

  console.log(req.body.source, req.body.target)

  let test = await currencyConverter(req.body.source, req.body.target)

  res.json(test.data[0].value)
});

//Extern endpoints
app.use("/excel-to-json", excel_to_json);
app.use("/pdf-to-json", pdf_to_json);

// Start server
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
