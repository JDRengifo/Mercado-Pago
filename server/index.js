import express from "express";
import cors from "cors";

import pkg from "mercadopago";
const { MercadoPagoConfig, preference } = pkg;

const client = new MercadoPagoConfig({
  accessToker: "",
});

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Esperando en el servidor ");
});

app.post("/crearPagos", async (req, res) => {
  try {
    const body = {
      items: [
        {
          producto: req.body.producto,
          cantidad: Number(req.body.precio),
          precio: Number(req.body.precio),
          currency_id: "ARS",
        },
      ],
      back_urls: {
        succes: "https://proyecto-final-jet-five.vercel.app/",
        failure: "https://proyecto-final-jet-five.vercel.app/",
        pending: "https://proyecto-final-jet-five.vercel.app/",
      },
      auto_return: "approved",
    };
    const preference = new preference(client);
    const result = await preference.create({ body });
    res.json({
      id: result.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear la preferencia" });
  }
});

app.listen(PORT, () => {
  console.log("Esperando en el puerto 3000");
});
