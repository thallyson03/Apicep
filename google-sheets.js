const { google } = require('googleapis');
const sheets = google.sheets('v4');

// Lê o conteúdo da variável de ambiente
const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
});

// Função para ler os CEPs da planilha
async function obterCeps(sheetId, range) {
  const client = await auth.getClient();
  const response = await sheets.spreadsheets.values.get({
    auth: client,
    spreadsheetId: sheetId,
    range: range
  });

  const rows = response.data.values;
  if (!rows || rows.length === 0) return [];

  // Remove cabeçalho
  return rows.slice(1).map(row => row[0]);
}

module.exports = { obterCeps };
