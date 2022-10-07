const readXlsxFile = require("read-excel-file/node");

let ibLaursen = async (file) => {
  try {
    let jsonObj = await readXlsxFile(file).then((rows) => {
      let arr = [];

      for (let i = 1; i < rows.length; i++) {
        if (rows[i][0] === null) {
          break;
        }

        arr.push({
          invoice: rows[i][0],
          tariff: parseInt(rows[i][1].substring(0, 8)),
          country: rows[i][2],
          quantity: rows[i][3],
          brutto_weight: Math.ceil(rows[i][4]),
          netto_weight:
            Math.ceil(rows[i][4]) == 1 ? 1 : Math.ceil(rows[i][4]) - 1,
          amount: parseFloat(rows[i][5]),
        });
      }

      let jsonObj = JSON.stringify(arr);
      return jsonObj;
    });
    return jsonObj;
  } catch (err) {
    return err
  }

};

module.exports = { ibLaursen };
