chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  try {
    console.log(request.success);
    //console.log(request.varekode);
    //console.log(request.kolli);
    //console.log(request.varebeskrivelse);
    //document.getElementById("dkev_331").value = request.varekode; // varekode
    //document.getElementById("dkev_42").value = request.varebeskrivelse; // varens pris
    //document.getElementById("dkev_35").value = request.kolli; // brutto vægt
    //document.getElementById("dkev_38").value = request.name; // netto vægt
    //document.getElementById("dkev_311").value = request.name; // kolli mærke
    //document.getElementById("dkev_313").value = request.kolli; // kolli antal
    //document.getElementById("dkev_314").value = request.name; // kolli art
    //document.getElementById("dkev_315").value = request.varebeskrivelse; // varebeskrivelse
    //document.getElementById("dkev_412").value = request.name; // supplerende enheder
    //document.getElementById("dkev_34a").value = request.name; // opr. land
    //document.getElementById("dkev_403a").value = request.name; // id
    //document.getElementById("dkev_4421").value = request.name; // Certifikatkode

    sendResponse({ status: "Success!" });
  } catch (error) {
    console.log(error);
    sendResponse({ status: "Exception occurred!" });
  }
});
