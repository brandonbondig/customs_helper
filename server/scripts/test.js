const axios = require("axios")

let currencyConverter = async (currency) => {
    let test = await axios.get(`https://wise.com/rates/history+live?source=${currency}&target=DKK&length=1`)
    return test.data[0].value
}


console.log(currencyConverter('EUR'));