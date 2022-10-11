// Convert excel sheet to json
export let excel2Json = async () => {

    const uploadElement = document.getElementById("upload");

    let file = uploadElement.files[0];

    const payload = new FormData();
    payload.append("excel", file);

    return fetch("http://52.57.48.155/excel-to-json/ib-laursen", {
        method: "POST",
        body: payload,
    }).then((res) => res.json());
};
