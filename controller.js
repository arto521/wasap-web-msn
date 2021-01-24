const WhatsAppWeb = require("baileys");
const fs = require("fs");
const readline = require("readline");
const client = new WhatsAppWeb();

module.exports.conectApi = async(req, res) => {
    client
        .connect()
        .then(([user, chats, contacts, unread]) => {
            res.jsonp({ mensaje: "Autenticación exitosa" });
        })
        .catch((err) => console.log(err));
};

module.exports.sendMessage = async(req, res) => {
    const num = "59169996201";
    const men = "mensaje estatico";
    const num2 = "59173254440";
    const men2 = "mensaje estatico2";
    options = {
        quoted: null,
        timestamp: new Date(),
    };

    /*  client
                  .sendTextMessage(`${req.body.phone}@s.whatsapp.net`, req.body.body, options)*/
    //.then(res.jsonp({ mensaje: "Notificación enviada" }));

    client.sendTextMessage(`${num}@s.whatsapp.net`, men, options);
    //.then(res.jsonp({ mensaje: "Notificación enviada" }));

    client.sendTextMessage(`${num2}@s.whatsapp.net`, men2, options);
    // .then(res.jsonp({ mensaje: "Notificación enviada" }));
};

/*
k1,k2
p11,p12,p21,p22,p31,p32,p41,p42,p51,p52,p61,p62
s11,s12,s21,s22,s31,s32,s41,s42,s51,s52,s61,s62
*/

module.exports.sendMessageCurso = async(req, res) => {
    const cursos = new Array(
        "k11",
        "k12",
        "k21",
        "k22",
        "p11",
        "p12",
        "p21",
        "p22",
        "p31",
        "p32",
        "p41",
        "p42",
        "p51",
        "p52",
        "p61",
        "p62",
        "s11",
        "s12",
        "s21",
        "s22",
        "s31",
        "s32",
        "s41",
        "s42",
        "s51",
        "s52",
        "s61",
        "s62"
    );
    const curso = req.body.curso;
    options = {
        quoted: null,
        timestamp: new Date(),
    };
    // for (let i = 0; i < cursos.length; i++) {

    if (cursos.includes(curso)) {
        try {
            /*  fs.readFile(`${curso}.txt`, "utf8", (error, datos) => {
                        if (error) throw error;
                        //console.log("El contenido es: ", datos);
                    });*/

            let lector = readline.createInterface({
                input: fs.createReadStream(`${curso}.txt`),
            });

            lector.on("line", (linea) => {
                //console.log("Tenemos una línea:", linea);
                var array = linea.split("|");
                var numero = 123;
                var mensaje = "";
                var i = 0;
                for (var valor of array) {
                    //console.log("Valor: " + valor);
                    if (i === 0) numero = valor.trim();
                    else mensaje = mensaje + valor.trim() + "\n";
                    i++;
                }
                //console.log("---------------");
                console.log(numero + "___" + mensaje);

                client.sendTextMessage(`${numero}@s.whatsapp.net`, mensaje, options);
            });

            res.json({
                ok: true,
                msg: "Se envio mensajes para el curso " + curso,
            });
        } catch (error) {
            res.json({
                ok: true,
                msg: "Accion falida, comuniquese con el administrador",
            });
        }
    } else {
        res.status(500).json({
            ok: false,
            msg: "Accion falida, comuniquese con el administrador",
        });
    }
    //  }
};