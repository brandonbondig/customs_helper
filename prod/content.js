chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  try {
    console.log(request.success);

    document.getElementById("dkev_331").value = request.success[0][
      "tariff"
    ].substring(0, 8); // varekode

    document.getElementById("dkev_42").value = request.success[0]["amount"]; // varens pris

    document.getElementById("dkev_35").value = request.success[0]["weight"]; // brutto vægt

    document.getElementById("dkev_38").value =
      request.success[0]["weight"] == 1
        ? request.success[0]["weight"]
        : request.success[0]["weight"] - 1;
    // netto vægt

    document.getElementById("dkev_311").value = "ADR"; // kolli mærke
    document.getElementById("dkev_313").value = 1; // kolli antal
    document.getElementById("dkev_314").value = "PX"; // kolli art
    document.getElementById("dkev_315").value = "møbler"; // varebeskrivelse

    document.getElementById("dkev_412").value =
      request.success[0]["isAmountReq"] == true
        ? request.success[0]["isAmountReq"]
        : null; // supplerende enheder

    document.getElementById("dkev_34a").value = request.success[0]["country"]; // opr. land
    document.getElementById("dkev_403a").value = request.success[0]["invoice"]; // id
    document.getElementById("dkev_4421").value =
      request.success[0]["isCertificateReq"] == true ? "999" : "-vælg-"; // Certifikatkod

    sendResponse({ status: "Success!" });
  } catch (error) {
    console.log(error);
    sendResponse({ status: "Exception occurred!" });
  }
});
