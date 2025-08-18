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

app.listen(serverPort, () => {
  console.log(`O Servidor funcionando na porta http://localhost:${serverPort}`);
});
