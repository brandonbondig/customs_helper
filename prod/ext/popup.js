let excel2Json = async () => {
  const uploadElement = document.getElementById("upload");

  let file = uploadElement.files[0];

  const payload = new FormData();
  payload.append("excel", file);

  return fetch("http://localhost:3000/excel-to-json/ib-laursen", {
    method: "POST",
    body: payload,
  }).then((res) => res.json());
};

// Event Listener for fill button

document.getElementById("fill").addEventListener("click", async () => {
  // for sending messages to content.js

  await chrome.tabs.query(
    { active: true, currentWindow: true },
    function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          event: true,
          index: document.getElementById("index").value - 1,
          varebeskrivelse: document.getElementById("varebeskrivelse").value,
          kolli:
            document.getElementById("kolli").value == ""
              ? 0
              : document.getElementById("kolli").value,
        },
        (err) => {
          console.log(err);
        }
      );
    }
  );
});

document.getElementById("spare").addEventListener("click", async () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      {
        spare: true,
      },
      (err) => {
        console.log(err);
      }
    );
    document.getElementById("kolli").value = 0;
    let kolli = document.getElementById("kolli").value;

    chrome.storage.local.set({ kolli: kolli }, () => {
      console.log("Stored: " + kolli);
    });
  });
});

// Event Listener for upload
document.getElementById("upload").addEventListener("change", async () => {
  // function for sending post requests to excel2json API
  let user = document.getElementById("user").value;

  let getTariffRequirements = async (user, varekode) => {
    return await fetch(
      `https://gw.systema.no:8446/espedsgskat/searchTaricVarukod_SkatExport.do?applicationUser=${user}&taricVarukod=${varekode}&ajax=true`
    ).then((res) => res.json());
  };

  // Running FUNCTIONS

  let converted_excel_file = await excel2Json();

  for (i = 0; i < converted_excel_file.length; i++) {
    let isReq = await getTariffRequirements(
      user,
      converted_excel_file[i]["tariff"]
    );

    if (isReq[0]["dktara63"] != "") {
      converted_excel_file[i]["isAmountReq"] = isReq[0]["dktara63"];
    } else {
      converted_excel_file[i]["isAmountReq"] = false;
    }

    if (isReq[0]["dktara58"] == "U") {
      converted_excel_file[i]["isCertificateReq"] = true;
    } else {
      converted_excel_file[i]["isCertificateReq"] = false;
    }
  }

  // Sets converted_excel
  await chrome.storage.local.set(
    { converted_excel: converted_excel_file },
    () => {
      console.log(converted_excel_file);

      document.getElementById("max-index").innerText =
        "vareposter: " + converted_excel_file.length;
    }
  );
});

// Sets username
document.getElementById("user").addEventListener("change", async () => {
  let user = document.getElementById("user").value;

  user == "not-chosen"
    ? (document.getElementById("upload").disabled = true)
    : (document.getElementById("upload").disabled = false);

  chrome.storage.local.set({ bruger: user }, () => {
    console.log("Stored: " + user);
  });
});

document.getElementById("kolli").addEventListener("change", () => {
  chrome.storage.local.set({ kolli: kolli }, () => {
    console.log("Stored: " + kolli);
  });
});

// Sets valuta
document.getElementById("valuta").addEventListener("change", () => {
  let valuta = document.getElementById("valuta").value;

  chrome.storage.local.set({ valuta: valuta }, () => {
    console.log("Stored: " + valuta);
  });
});

// Sets varebeskrivelse
document.getElementById("varebeskrivelse").addEventListener("change", () => {
  let varebeskrivelse = document.getElementById("varebeskrivelse").value;

  chrome.storage.local.set({ varebeskrivelse: varebeskrivelse }, () => {
    console.log("Stored: " + varebeskrivelse);
  });
});

// Initialize stored data on load
window.onload = () => {
  chrome.storage.local.get(
    [
      "bruger",
      "valuta",
      "varebeskrivelse",
      "file",
      "filename",
      "kolli",
      "converted_excel",
    ],
    (result) => {
      document.getElementById("user").value = result.bruger;
      document.getElementById("valuta").value = result.valuta;
      document.getElementById("varebeskrivelse").value = result.varebeskrivelse;
      document.getElementById("kolli").value = result.kolli;
      document.getElementById("max-index").innerText =
        "vareposter: " + result.converted_excel.length;
      result.bruger == "not-chosen"
        ? (document.getElementById("upload").disabled = true)
        : (document.getElementById("upload").disabled = false);

      // Get a reference to our file input
      let fileInput = document.getElementById("upload");

      // Create a new File object
      let myFile = new File([result.file], result.filename);

      // Now let's create a DataTransfer to get a FileList
      let dataTransfer = new DataTransfer();
      dataTransfer.items.add(myFile);
      fileInput.files = dataTransfer.files;
    }
  );
};
