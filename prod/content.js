//import { currencyConverter } from './scripts/currencyConverter.js'

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  // Get from storage
  // console.log(currencyConverter());

  try {
    if (request.event) {
      chrome.storage.local.get(["converted_excel"], (result) => {

        let converted_excel = result.converted_excel;
        console.log(converted_excel);
        document.getElementById("dkev_331").value = converted_excel[request.index]["tariff"]; // varekode
        document.getElementById("dkev_42").value = converted_excel[request.index]["amount"]; // varens pris
        document.getElementById("dkev_35").value = converted_excel[request.index]["brutto_weight"]; // brutto vægt
        document.getElementById("dkev_38").value = converted_excel[request.index]["netto_weight"]; // netto vægt
        document.getElementById("dkev_311").value = "ADR"; // kolli mærke
        document.getElementById("dkev_313").value = request.kolli; // kolli antal
        document.getElementById("dkev_314").value = "PX"; // kolli art
        document.getElementById("dkev_315").value = request.varebeskrivelse; // varebeskrivelse
        document.getElementById("dkev_411").value = converted_excel[request.index]["isAmountReq"]; // varebeskrivelse

        // supplerende enheder
        document.getElementById("dkev_412").value =
          converted_excel[request.index]["isAmountReq"] != false
            ? converted_excel[request.index]["quantity"]
            : null;

        document.getElementById("dkev_34a").value = converted_excel[request.index]["country"]; // opr. land
        document.getElementById("dkev_46").value = converted_excel[request.index]["statistical_amount"]; // Statistisk værdi
        document.getElementById("dkev_403a").value = converted_excel[request.index]["invoice"]; // id

        // Certifikatkod
        document.getElementById("dkev_4421").value =
          converted_excel[request.index]["isCertificateReq"] == true
            ? 9999
            : "-vælg-";
      });
    }

    if (request.spare) {
      document.getElementById("submit").click();
    }

    sendResponse({ status: "Success!" });
  } catch (error) {
    console.log(error);
    sendResponse({ status: "Exception occurred!" });
  }
});
