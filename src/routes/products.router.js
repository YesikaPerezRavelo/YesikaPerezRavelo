import { Router } from "express";
import { uploader } from "../utils.js";
import ProductManager from "../productManager.js";

const PM = new ProductManager();
const router = Router();

router.get("/", (req, res) => {
  res.send(PM.getProducts());
});

router.post("/", uploader.single("thumbnail"), async (req, res) => {
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

  try {
    const productData = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status: true,
    };

    const result = await PM.addProduct(productData);

    const responseMessage = {
      message: `${result}`,
      ...productData,
    };

    res.status(201).send(responseMessage);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).send({ error: "Error al agregar el producto." });
  }
});

export default router;
