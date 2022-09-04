document.getElementById("fill").addEventListener("click", async () => {
  // function for sending post requests to excel2json API

  let getTariffReq = async (varekode) => {
    return await fetch(
      `https://gw.systema.no:8446/espedsgskat/searchTaricVarukod_SkatExport.do?applicationUser=A25BB&taricVarukod=${varekode}&ajax=true`
    ).then((res) => res.json());
  };

  // Response for Ib Laursen

  let getJsonObj = async () => {
    const uploadElement = document.getElementById("upload");

    let file = uploadElement.files[0];

    const payload = new FormData();
    payload.append("excel", file);

    return fetch("http://localhost:3000/upload_excel", {
      method: "POST",
      body: payload,
    }).then((res) => res.json());
  };

  // Running FUNCTIONS
  let jsonObj = await getJsonObj();

  for (i = 0; i < 12; i++) {
    let isReq = await getTariffReq(jsonObj[i]["tariff"]);

    if (isReq[0]["dktara63"] != "") {
      jsonObj[i]["isAmountReq"] = true;
    } else {
      jsonObj[i]["isAmountReq"] = false;
    }

    if (isReq[0]["dktara58"] == "U") {
      jsonObj[i]["isCertificateReq"] = true;
    } else {
      jsonObj[i]["isCertificateReq"] = false;
    }
  }

  // for sending messages to content.js

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      {
        success: jsonObj,

        varebeskrivelse:
          document.getElementById("varebeskrivelse").value == ""
            ? "null"
            : document.getElementById("varebeskrivelse").value,

        kolli:
          document.getElementById("kolli").value == ""
            ? "null"
            : document.getElementById("kolli").value,
      },
      () => {
        console.log("response");
      }
    );
  });
});
