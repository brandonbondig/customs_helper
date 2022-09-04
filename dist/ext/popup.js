document.getElementById("fill").addEventListener("click", async () => {
  // function for sending post requests to excel2json API
  // Response for Ib Laursen

  async function getJsonObj() {
    const uploadElement = document.getElementById("upload");

    let file = uploadElement.files[0];

    const payload = new FormData();
    payload.append("excel", file);

    return fetch("http://localhost:3000/upload_excel", {
      method: "POST",
      body: payload,
    }).then((res) => res.json());
  }

  const obj = await getJsonObj();

  // for sending messages to content.js

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      {
        success: obj,
        varekode:
          document.getElementById("varekode").value == ""
            ? "null"
            : document.getElementById("varekode").value,

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
