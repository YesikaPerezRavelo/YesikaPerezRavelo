import { promises as fs } from "fs";

export default class CartManager {
  constructor(filePath) {
    this.path = filePath;
    this.carts = [];
    this.loadCarts();
  }

  async loadCarts() {
    try {
      const data = await fs.readFile(this.path, "utf8");
      this.carts = JSON.parse(data);
    } catch (error) {
      console.error("Error loading carts:", error);
    }
  }

  async saveCarts() {
    try {
      await fs.writeFile(
        this.path,
        JSON.stringify(this.carts, null, 2),
        "utf-8"
      );
    } catch (error) {
      console.error("Error saving carts:", error);
    }
  }

  async createCart(initialProducts = []) {
    const newCart = {
      id: this.generateUniqueId(),
      products: initialProducts,
    };
    this.carts.push(newCart);
    await this.saveCarts();
    return newCart;
  }

  async getCartProducts(cartId) {
    const cart = this.carts.find((cart) => cart.id === cartId);
    return cart ? cart.products : null;
  }

  async addProductToCart(cartId, productId) {
    const cart = this.carts.find((cart) => cart.id === cartId);
    if (cart) {
      const existingProduct = cart.products.find(
        (product) => product.id === productId
      );
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        cart.products.push({ id: productId, quantity: 1 });
      }
      await this.saveCarts();
      return cart;
    } else {
      console.error(`Cart not found.`);
      return null;
    }
  }

  generateUniqueId() {
    return this.carts.length + 1;
  }
}
