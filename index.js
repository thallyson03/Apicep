const express = require('express');
const { obterCeps } = require('./google-sheets');

const app = express();
const port = 3000;

// Substitua pelo ID da sua planilha (está na URL)
const SHEET_ID = '1cuNxVR51KNAYwNT9e_x3A5aqhTxT6RtDrCdgxtq31sk';
const RANGE = 'consulta_cep!A:A'; // Supondo que os CEPs estão na coluna A

app.get('/validar-cep/:cep', async (req, res) => {
  const cep = req.params.cep;

  try {
    const ceps = await obterCeps(SHEET_ID, RANGE);

    const atendido = ceps.includes(cep);
    res.json({ cep, atendido });
  } catch (error) {
    console.error('Erro ao consultar planilha:', error);
    res.status(500).json({ erro: 'Erro ao acessar planilha' });
  }
});

app.listen(port, () => {
  console.log(`✅ API rodando em http://localhost:${port}`);
});
