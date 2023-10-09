import Storage from "./Storage.js";

// ! Select HTML Tags

const productTitle = document.querySelector("#product-title");
const productQuantity = document.querySelector("#product-quantity");
const selectedCategory = document.querySelector("#product-category");
const addNewProductBtn = document.querySelector("#add-new-product");
const searchInput = document.querySelector("#search-input");
const selectedSort = document.querySelector("#sort-products");
const productLength = document.querySelector("#product-length");
const backdrop = document.querySelector("#backdrop");
const modal = document.querySelector("#modal-content");
const cancelEditBtn = document.querySelector("#cancel-edit-product");
const editProductBtn = document.querySelector("#edit-product-btn");
const editProductTitle = document.querySelector("#edit-product-title");
const editProductQuantity = document.querySelector("#edit-product-quantity");
const editProductCategory = document.querySelector("#edit-product-category");
class ProductView {
  constructor() {
    addNewProductBtn.addEventListener("click", (e) => this.addNewProduct(e));
    searchInput.addEventListener("input", (e) => this.searchProducts(e));
    selectedSort.addEventListener("change", (e) => this.sortProducts(e));
    backdrop.addEventListener("click", (e) => this.hideModal(e));
    cancelEditBtn.addEventListener("click", (e) => this.hideModal(e));
    editProductBtn.addEventListener("click", (e) => this.editProduct(e));
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
    productLength.innerHTML = this.products.length;
  }

  createProductList(products) {
    let result = "";

    products.forEach((item) => {
      const findSelectedCategory = Storage.getAllCategories().find(
        (c) => c.id == item.category
      );
      result += `<div class="flex flex-wrap items-center justify-between mb-8 border border-1 border-slate-400 p-6 rounded-xl mx-2 sm:mx-0">
        <span class="text-slate-100">${item.title}</span>
        <div class="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
          <span class="text-slate-400">
          ${new Date(item.createdAt).toLocaleDateString("fa-IR")}
          </span>
          <span class="block w-36 py-1 px-2 border border-indigo-400 text-white rounded-xl text-center">
          ${findSelectedCategory.title}
          </span>
          <span class="flex item-center justify-center w-8 h-8 rounded-full bg-cyan-700 text-sky-50 text-lg border-2 border-sky-50">
            ${item.quantity}
          </span>
          <button class="px-2 py-0.5 rounded-xl border border-rose-300 text-rose-700 bg-rose-100" id="delete-product" data-id=${
            item.id
          }>delete
          </button>
          <button class="px-4 py-0.5 rounded-xl border border-sky-50 bg-cyan-700 text-white" id="edit-product" data-id=${
            item.id
          }>Edit
          </button>
        </div>
        </div>`;
    });

    const productsList = document.getElementById("product-list");
    productsList.innerHTML = result;

    const deleteProductBtns = [...document.querySelectorAll("#delete-product")];

    deleteProductBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => this.deleteProduct(e));
    });

    const editProductBtns = [...document.querySelectorAll("#edit-product")];

    editProductBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => this.editProductModal(e));
    });
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

  deleteProduct(e) {
    const dataID = e.target.dataset.id;

    Storage.deleteProduct(parseInt(dataID));
    this.setApp();
    this.createProductList(this.products);
  }

  editProductModal(e) {
    this.showModal();
    let dataID = e.target.dataset.id;
    editProductBtn.setAttribute("data-id", dataID);
  }

  editProduct(e) {
    e.preventDefault();

    const title = editProductTitle.value;
    const quantity = editProductQuantity.value;
    const category = editProductCategory.value;

    if ((!title, !quantity, !category)) {
      alert("please enter all of the values !!!");
      return;
    }

    let dataID = e.target.dataset.id;
    const savedProducts = Storage.getAllProducts();
    const findedProduct = savedProducts.find((p) => p.id == dataID);

    findedProduct.title = title;
    findedProduct.quantity = quantity;
    findedProduct.category = category;

    Storage.saveProducts(findedProduct);
    this.products = Storage.getAllProducts();
    this.createProductList(this.products);

    editProductTitle.value = "";
    editProductQuantity.value = "";
    editProductCategory.value = "";
    this.hideModal(e);
  }

  showModal() {
    backdrop.classList.remove("hidden");
    modal.classList.remove("hidden");
  }
  hideModal(e) {
    e.preventDefault();
    backdrop.classList.add("hidden");
    modal.classList.add("hidden");
  }

  setApp() {
    this.products = Storage.getAllProducts();
    productLength.innerHTML = this.products.length;
  }
}

export default new ProductView();
