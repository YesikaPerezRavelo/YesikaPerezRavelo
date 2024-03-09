import { Router } from "express";

const router = Router();

const products = [];

router.get("/", (req, res) => {
  res.send(products);
});

router.post("/", (req, res) => {
  const { title, description, price, thumbnail, code, stock } = req.body;

  if (!title || !description || !price || !thumbnail || !code || !stock)
    return res
      .status(400)
      .send({ error: "Faltan datos para crear el producto!" });

  products.push({ title, description, price, thumbnail, code, stock });

  res.status(201).send({ message: "Usuario creado correctamente!" });
});

export default router;
