const pdf_to_excel = require("pdf-to-excel");
const readXlsxFile = require("read-excel-file/node");
let countries = require("../countries/countries.json");

let cycleService = async (file) => {
  const date = Date.now();

  await pdf_to_excel.genXlsx(file, "./temp/" + date + ".xlsx");

  let xlsxfile = "./temp/" + date + ".xlsx";
  let arr = [];

  let jsonObj = await readXlsxFile(xlsxfile).then((rows) => {
    let start;

    for (let i = 0; i < rows.length; i++) {
      if (rows[i][0] == "Varebeskrivelse") {
        start = true;
      }

      if (rows[i + 1][0] === null && start) {
        start = false;
      }

      if (
        rows[i + 1][0] ==
        "The exporter of the products covered by this document declares that except where clearly"
      ) {
        break;
      }

      if (start) {
        arr.push({
          tarif: parseInt(rows[i + 1][0].substring(0, 8)),
          country: countries[rows[i + 2][0]],
          name: rows[i + 3][0],
          quantity: parseInt(rows[i + 3][1]),
          amount: parseFloat(rows[i + 3][2]),
        });
        i += 2;
      }
    }
    let jsonObj = JSON.stringify(arr);
    return jsonObj;
  });
  return await jsonObj;
};

module.exports = { cycleService };
