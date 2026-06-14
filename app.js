const PRODUCTS = [
  {
    id: "1",
    name: "抹茶ラテ",
    nameEn: "Matcha Latte",
    price: 28000,
    category: "drink",
    desc: "Premium Japanese matcha with fresh milk",
    img: "assets/images/matcha.jpg"
  },
  {
    id: "2",
    name: "カフェラテ",
    nameEn: "Cafe Latte",
    price: 25000,
    category: "drink",
    desc: "Espresso and steamed milk",
    img: "assets/images/latte.jpg"
  },
  {
    id: "3",
    name: "クロワッサン",
    nameEn: "Croissant",
    price: 22000,
    category: "food",
    desc: "Buttery French croissant",
    img: "assets/images/croissant.jpg"
  }
];

const GC = {

  getProducts() {
    return PRODUCTS;
  },

  fmt(num) {
    return "Rp " + num.toLocaleString("id-ID");
  },

  getCart() {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  },

  saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    this.updateBadge();
  },

  addToCart(product, qty = 1) {
    let cart = this.getCart();

    const item = cart.find(i => i.id === product.id);

    if (item) {
      item.qty += qty;
    } else {
      cart.push({
        ...product,
        qty
      });
    }

    this.saveCart(cart);
    alert(product.nameEn + " ditambahkan ke keranjang");
  },

  removeFromCart(id) {
    let cart = this.getCart().filter(i => i.id !== id);
    this.saveCart(cart);
  },

  updateQty(id, qty) {
    let cart = this.getCart();

    if (qty <= 0) {
      cart = cart.filter(i => i.id !== id);
    } else {
      const item = cart.find(i => i.id === id);
      if (item) item.qty = qty;
    }

    this.saveCart(cart);
  },

  cartTotal() {
    return this.getCart().reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
  },

  updateBadge() {
    const badge = document.querySelector(".cart-badge");

    if (!badge) return;

    const total = this.getCart().reduce(
      (sum, item) => sum + item.qty,
      0
    );

    badge.textContent = total;
  },

  getUser() {
    return JSON.parse(localStorage.getItem("customer") || "null");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  GC.updateBadge();
});

function goToDetail(id) {
  const p = GC.getProducts().find(x => x.id === id);
  if (!p) return;

  if (p.detailPage) {
    window.location.href = p.detailPage;
  } else {
    openDetail(id); // fallback modal lama
  }
}