import Storage from "./Storage.js";

// ! Select HTML Tags

const productTitle = document.querySelector("#product-title");
const productQuantity = document.querySelector("#product-quantity");
const selectedCategory = document.querySelector("#product-category");
const addNewProductBtn = document.querySelector("#add-new-product");
const searchInput = document.querySelector("#search-input");
const selectedSort = document.querySelector("#sort-products");

class ProductView {
  constructor() {
    addNewProductBtn.addEventListener("click", (e) => this.addNewProduct(e));
    searchInput.addEventListener("input", (e) => this.searchProducts(e));
    selectedSort.addEventListener("change", (e) => this.sortProducts(e));
    this.products = [];
    this.searchProductResult = [];
  }

  addNewProduct(e) {
    e.preventDefault();
    const title = productTitle.value;
    const quantity = productQuantity.value;
    const category = selectedCategory.value;

    if (!title || !quantity || !category) return;

    Storage.saveProducts({ title, quantity, category });

    this.products = Storage.getAllProducts();
    this.createProductList(this.products);
    productTitle.value = "";
    productQuantity.value = "";
    selectedCategory.value = "";
  }

  createProductList(products) {
    let result = "";

    products.forEach((item) => {
      const findSelectedCategory = Storage.getAllCategories().find(
        (c) => c.id == item.category
      );
      result += `<div class="flex items-center justify-between mb-8">
        <span class="text-slate-300">${item.title}</span>
        <div class="flex items-center gap-x-3">
          <span class="text-slate-400">
          ${new Date(item.createdAt).toLocaleDateString("fa-IR")}
          </span>
          <span class="block px-3 py-0.5 border border-slate-500 text-slate-300 rounded-2xl">
          ${findSelectedCategory.title}
          </span>
          <span class="flex item-center justify-center w-7 h-7 rounded-full bg-slate-500 text-slate-100 border-2 border-slate-300">
            ${item.quantity}
          </span>
          <button class="px-2 py-0.5 rounded-2xl border border-red-400 text-red-400" data-id=${
            item.id
          }>
          delete
          </button>
        </div>
        </div>`;
    });

    const productsList = document.getElementById("product-list");
    productsList.innerHTML = result;
  }

  searchProducts(e) {
    const value = e.target.value.trim().toLowerCase();
    const filteredProducts = this.products.filter((p) => {
      return p.title.toLowerCase().includes(value);
    });
    this.searchProductResult = filteredProducts;
    this.createProductList(this.searchProductResult);
  }

  sortProducts(e) {
    const selectedValue = e.target.value;
    this.products = Storage.getAllProducts(selectedValue);
    this.createProductList(this.products);
  }

  setApp() {
    this.products = Storage.getAllProducts();
  }
}

export default new ProductView();
