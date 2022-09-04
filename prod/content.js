chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  // Get from storage

  try {
    if (request.event) {
      chrome.storage.local.get(["converted_excel"], (result) => {
        let converted_excel = result.converted_excel;

        console.log(converted_excel[request.index]);

        console.log(converted_excel[request.index]);
        document.getElementById("dkev_331").value =
          converted_excel[request.index]["tariff"]; // varekode

        document.getElementById("dkev_42").value =
          converted_excel[request.index]["amount"]; // varens pris

        document.getElementById("dkev_35").value =
          converted_excel[request.index]["weight"]; // brutto vægt

        document.getElementById("dkev_38").value =
          converted_excel[request.index]["weight"] == 1
            ? converted_excel[request.index]["weight"]
            : converted_excel[request.index]["weight"] - 1;
        // netto vægt

        document.getElementById("dkev_311").value = "ADR"; // kolli mærke
        document.getElementById("dkev_313").value = request.kolli; // kolli antal
        document.getElementById("dkev_314").value = "PX"; // kolli art
        document.getElementById("dkev_315").value = request.varebeskrivelse; // varebeskrivelse

        document.getElementById("dkev_411").value =
          converted_excel[request.index]["isAmountReq"]; // varebeskrivelse

        document.getElementById("dkev_412").value =
          converted_excel[request.index]["isAmountReq"] != false
            ? converted_excel[request.index]["quantity"]
            : null; // supplerende enheder

        document.getElementById("dkev_34a").value =
          converted_excel[request.index]["country"]; // opr. land
        document.getElementById("dkev_46").value = "1"; //Statistisk værdi
        document.getElementById("dkev_403a").value =
          converted_excel[request.index]["invoice"]; // id
        document.getElementById("dkev_4421").value =
          converted_excel[request.index]["isCertificateReq"] == true
            ? 9999
            : "-vælg-"; // Certifikatkod
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
