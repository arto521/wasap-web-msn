const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = express.Router();

app.use(bodyParser.json());

const whatsapp = require("./controller");

app.post("/whatsapp/connect", whatsapp.conectApi);
app.post("/whatsapp/sendmessage", whatsapp.sendMessage);
app.post("/whatsapp/sendmessagecurso", whatsapp.sendMessageCurso);

//whatsapp.sendMessage("59169996201", "hola desde index");


app.listen(3001, () => {
    console.log("conectado");
});