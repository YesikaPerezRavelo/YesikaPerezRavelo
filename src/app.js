import express from "express";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use(express.static("public"));

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor activo http://localhost:${PORT}`);
});
