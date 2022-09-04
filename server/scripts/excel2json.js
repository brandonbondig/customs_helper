const readXlsxFile = require("read-excel-file/node");

let excel2json = async (file) => {
  let jsonObj = await readXlsxFile(file).then((rows) => {
    let arr = [];

    for (let i = 1; i < rows.length; i++) {
      if (rows[i][0] === null) {
        break;
      }
      arr.push({
        invoice: rows[i][0],
        tariff: rows[i][1],
        country: rows[i][2],
        quantity: rows[i][3],
        weight: Math.round(rows[i][4]),
        amount: rows[i][5],
      });
    }

    let jsonObj = JSON.stringify(arr);
    return jsonObj;
  });
  return jsonObj;
};

module.exports = { excel2json };
