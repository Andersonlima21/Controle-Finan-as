const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

// Função para verificar e criar diretório para armazenar dados
const verificarDiretorio = () => {
  const dir = path.join(__dirname, 'dados');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

// Salvar dados do mês
app.post('/salvarMes', (req, res) => {
  verificarDiretorio();
  const mesData = req.body;
  const filePath = path.join(__dirname, 'dados', `${mesData.mes}.json`);

  fs.writeFile(filePath, JSON.stringify(mesData, null, 2), (err) => {
    if (err) {
      return res.status(500).send('Erro ao salvar o mês.');
    }
    res.sendStatus(200);
  });
});

// Carregar dados do mês
app.get('/carregarMes/:mes', (req, res) => {
  const mes = req.params.mes;
  const filePath = path.join(__dirname, 'dados', `${mes}.json`);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Erro ao carregar os dados do mês.');
    }
    res.json(JSON.parse(data));
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
