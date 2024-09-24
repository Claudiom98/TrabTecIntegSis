//Google sheets api deve estar habilitado no Console do Google Cloud
// Dependencias
const fs = require("fs");
const { google } = require("googleapis");

const service = google.sheets("v4");
const login = require("./login.json"); //arquivo importado das chaves do google cloud, solicitar no privado

const autorizacao = new google.auth.JWT(
    login.client_email,
    null,
    login.private_key.replace(/\\n/g, "\n"),
    ["https://www.googleapis.com/auth/spreadsheets"]
);

(async function(){
  try {
    const token = await autorizacao.authorize();

    autorizacao.setCredentials(token);

    const res = await service.spreadsheets.values.get({
        auth: autorizacao,
        spreadsheetId: "1MjKNr_PRpFFp6OSN0zojj2sFACjZ_MEw1YaFxUEih2g", //ID da planilha
        range: "B:C", // Colunas a serem trabalhadas
    });

    const planilha = [];

    const rows = res.data.values;

    if (rows.length) {

        // Remover os headers
        rows.shift()


        for (const row of rows) {
            planilha.push({ "Questao 1": row[0], "Questao 2": row[1] }); // inserção das linhas
        }

    } else {
        console.log("No data found.");
    }

    fs.writeFileSync("planilha.json", JSON.stringify(planilha), function (err, file) {
        if (err) throw err;
        console.log("Planilha Salva");
    });

  } catch (e) {

    console.log(e);


    process.exit(1);
  }
}
)();
module.exports = {autorizacao}
