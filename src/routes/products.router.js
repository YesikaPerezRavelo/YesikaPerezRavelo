import { Router } from "express";
import { uploader } from "../utils.js";

const router = Router();

const products = [];

router.get("/", (req, res) => {
  res.send(products);
});

router.post("/", uploader.single("thumbnail"), (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .send({ error: "Se necesita cargar una imagen para crear producto!" });
  }

  const { title, description, price, code, stock } = req.body;

  if (!title || !description || !price || !code || !stock)
    return res
      .status(400)
      .send({ error: "Faltan datos para crear el producto!" });

  const thumbnail = req.file.path;

  products.push({ title, description, price, thumbnail, code, stock });

  res.status(201).send({ message: "Usuario creado correctamente!" });
});

export default router;
