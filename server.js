import express from "express";
import bruxos from "./src/data/bruxos.js";

const app = express();
const serverPort = 3000;

app.get("", (req, res) => {
  res.send(`<h1 style="color: red">Minha API de Harry Potter está ativa!</h1>`);
});

app.get("/bruxos", (req, res) => {
  res.json(bruxos);
});

app.get("/bruxos/:id", (req, res) => {
  let id = parseInt(req.params.id);
  console.log(typeof id);
  const bruxo = bruxos.find((b) => b.id === id);
  console.log(bruxo);

  if (bruxo) {
    res.status(200).json(bruxo);
  } else {
    res.status(404).json({
      mensagem: "bruxo não encontrado!",
    });
  }
});

app.get("/bruxos/nome/:nome", (req, res) => {
    let nome = req.params.nome.toLowerCase();

    const bruxosEncontrados = bruxos.filter(b => b.nome.toLowerCase().includes(nome));

    if(bruxosEncontrados.length > 0) {
        res.status(200).json(bruxosEncontrados);
    } else {
        res.status(404).json({
            mensagem: "Bruxo(s) não encontrado(s) com este nome!"
        });
    }
})
app.get("/bruxos/casa/:casa", (req, res) => {
    let casa = req.params.casa.toLowerCase();

    const casaEncontrada = bruxos.filter(b => b.casa.toLowerCase().includes(casa));

    if(casaEncontrada.length > 0) {
        res.status(200).json(casaEncontrada);
    } else {
        res.status(404).json({
            mensagem: "Casa não encontrado(s) com este nome!"
        });
    }
})

app.get("/bruxos/vivos/:nao", (req, res) => {
  const resultado = bruxos.filter((b) => !b.status);

  if (resultado) {
    res.status(200).json(resultado);
  } else {
    res.status(404).json({erro: "Nem um bruxo morto encontrado!"})
  }
})

app.listen(serverPort, () => {
  console.log(`O Servidor funcionando na porta http://localhost:${serverPort}`);
});
