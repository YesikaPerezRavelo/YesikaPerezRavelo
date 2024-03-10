import express from "express";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import ProductManager from "./productManager.js";

const app = express();
const productManager = new ProductManager("../data/products.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use(express.static("public"));

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor activo http://localhost:${PORT}`);
});

app.post("/api/products", async (req, res) => {
  const productData = req.body;

  if (!productManager.validateProductData(productData)) {
    return res.status(400).send({ error: "Invalid product data." });
  }

  try {
    await productManager.addProductddProduct(productData);
    res.status(201).send({ message: "Producto creado correctamente." });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error interno del servidor." });
  }
});

app.put("/api/products/:pid", async (req, res) => {
  const pid = req.params.pid;
  res.send(await productManager.updateProductpdateProduct(pid, req.body));
});

app.delete("/api/products/:pid", async (req, res) => {
  const pid = req.params.pid;
  res.send(await productManager.deleteProduct(pid));
});
