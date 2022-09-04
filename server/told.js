import fetch from "node-fetch";

let searchTaric = async (tariff) => {
  try {
    const res = await fetch(
      `https://gw.systema.no:8446/espedsgskat/searchTaricVarukod_SkatExport.do?applicationUser=A25BB&taricVarukod=${tariff}&ajax=true`
    );
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

searchTaric("44152020");
