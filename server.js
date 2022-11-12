const express = require("express");
const { google } = require("googleapis");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "/dist")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/", async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
  //create client instance for auth
  const client = await auth.getClient();

  //instance of google sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });
  const spreadsheetId = "1nS_Eh1tcxNrSIXgMc3ilHo3K5jhqyEtIvJs0G9WFDJc";

  //get metadata about spreadsheet
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  //read rows from spreadsheet
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "daily",
  });

  app.post("/", async (req, res) => {
    const { request, name } = req.body;
  });

  //write rows to spreadsheet
  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "daily!A:B",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[request], [name]],
    },
  });

  res.send("success!");
});

app.listen(8080, (req, res) => console.log("running!"));
