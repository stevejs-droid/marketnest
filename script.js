const products = [
  {
    name: "Handmade Candle",
    category: "Beauty",
    price: 299,
    stock: 14,
    image: "assets/product-listing.svg"
  },
  {
    name: "Organic Pickle Jar",
    category: "Food",
    price: 180,
    stock: 8,
    image: "assets/order-management.svg"
  },
  {
    name: "Cotton Tote Bag",
    category: "Fashion",
    price: 399,
    stock: 20,
    image: "assets/hero-warehouse.svg"
  },
  {
    name: "Wooden Craft Box",
    category: "Crafts",
    price: 550,
    stock: 5,
    image: "assets/inventory-tracking.svg"
  }
];

let orders = {
  pending: 6,
  packed: 12,
  delivered: 25
};

const productGrid = document.getElementById("productGrid");
const inventoryList = document.getElementById("inventoryList");
const productForm = document.getElementById("productForm");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

function renderProducts(list) {
  productGrid.innerHTML = "";

  list.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="product-content">
        <span class="badge">${product.category}</span>
        <h3>${product.name}</h3>
        <div class="product-meta">
          <span>₹${product.price}</span>
          <span>Stock: ${product.stock}</span>
        </div>
        <button class="btn primary full">View Product</button>
      </div>
    `;
    productGrid.appendChild(card);
  });

  updateCounts();
}

function renderInventory() {
  inventoryList.innerHTML = "";
  products.forEach((product) => {
    const item = document.createElement("li");
    item.innerHTML = `
      <span>${product.name}</span>
      <strong>${product.stock} units</strong>
    `;
    inventoryList.appendChild(item);
  });
}

function updateCounts() {
  document.getElementById("vendorsCount").textContent = 18;
  document.getElementById("productsCount").textContent = products.length;
  document.getElementById("ordersCount").textContent =
    orders.pending + orders.packed + orders.delivered;

  document.getElementById("pendingOrders").textContent = orders.pending;
  document.getElementById("packedOrders").textContent = orders.packed;
  document.getElementById("deliveredOrders").textContent = orders.delivered;
}

function filterProducts() {
  const search = searchInput.value.toLowerCase();
  const category = categoryFilter.value;

  const filtered = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search);
    const matchesCategory = category === "all" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  renderProducts(filtered);
}

productForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newProduct = {
    name: document.getElementById("name").value,
    category: document.getElementById("category").value,
    price: Number(document.getElementById("price").value),
    stock: Number(document.getElementById("stock").value),
    image: "assets/product-listing.svg"
  };

  products.push(newProduct);
  renderProducts(products);
  renderInventory();
  productForm.reset();
});

document.getElementById("simulateOrder").addEventListener("click", () => {
  orders.pending += 1;
  updateCounts();
});

searchInput.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);

const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, { threshold: 0.15 });

reveals.forEach((el) => observer.observe(el));

renderProducts(products);
renderInventory();
updateCounts();
