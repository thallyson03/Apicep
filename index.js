const express = require('express');
const { obterCeps } = require('./google-sheets');

const app = express();
const port = 3000;

// ID da sua planilha e intervalo de leitura
const SHEET_ID = '1cuNxVR51KNAYwNT9e_x3A5aqhTxT6RtDrCdgxtq31sk';
const RANGE = 'consulta_cep!A:A';

app.get('/validar-cep/:cep', async (req, res) => {
  const cep = req.params.cep;

  try {
    const ceps = await obterCeps(SHEET_ID, RANGE);
    const atendido = ceps.includes(cep);

    if (atendido) {
      return res.status(200).json({
        success: true,
        message: 'CEP localizado e é atendido.',
        data: {
          cep,
          atendido: true
        }
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'CEP informado não está na lista de atendidos.',
        data: {
          cep,
          atendido: false
        }
      });
    }
  } catch (error) {
    console.error('Erro ao consultar planilha:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao acessar a planilha do Google Sheets.',
      error: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`✅ API rodando em http://localhost:${port}`);
});
