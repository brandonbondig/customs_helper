// Imports
const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require('cors')
// Initializers
const app = express();
const port = 3000;
app.use(cors())

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
app.get("/", (req, res) => {
  res.json({ message: "Lavet af: Brandon Bondig" });
});

//Extern endpoints
app.use("/excel-to-json", excel_to_json);
app.use("/pdf-to-json", pdf_to_json);

// Start server
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
