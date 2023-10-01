import Storage from "./Storage.js";

// ! SELECT HTML TAGS

const categoryTitle = document.querySelector("#category-title");
const categoryDescription = document.querySelector("#category-description");
const addNewCategoryBtn = document.querySelector("#add-new-category");
const toggleAddCategoryBtn = document.querySelector("#toggle-add-category");
const categoryWrapper = document.querySelector("#category-wrapper");
const cancelAddCategoryBtn = document.querySelector("#cancel-add-btn");

class CategoryView {
  constructor() {
    addNewCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
    toggleAddCategoryBtn.addEventListener("click", (e) =>
      this.toggleAddCategory(e)
    );
    cancelAddCategoryBtn.addEventListener("click", (e) =>
      this.cancelAddCategory(e)
    );
    this.categories = [];
  }

  addNewCategory(e) {
    e.preventDefault();

    const title = categoryTitle.value;
    const description = categoryDescription.value;
    if (!title || !description) return;

    Storage.saveCategory({ title, description });

    this.categories = Storage.getAllCategories();

    this.createCategoriesList();

    categoryTitle.value = "";
    categoryDescription.value = "";
    categoryWrapper.classList.add("hidden");
    toggleAddCategoryBtn.classList.remove("hidden");
  }

  createCategoriesList() {
    let result = `<option class="bg-slate-500 text-slate-200" value="" >Select a category</option>`;

    this.categories.forEach((c) => {
      result += `<option class="bg-slate-500 text-slate-200" value=${c.id}>
      ${c.title}</option>`;
    });

    const selectOption = document.querySelector("#product-category");
    const EditSelectOption = document.querySelector("#edit-product-category");
    selectOption.innerHTML = result;
    EditSelectOption.innerHTML = result;
  }

  toggleAddCategory(e) {
    e.preventDefault();
    categoryWrapper.classList.remove("hidden");
    toggleAddCategoryBtn.classList.add("hidden");
  }

  cancelAddCategory(e) {
    e.preventDefault();
    categoryWrapper.classList.add("hidden");
    toggleAddCategoryBtn.classList.remove("hidden");
  }

  setApp() {
    this.categories = Storage.getAllCategories();
  }
}

export default new CategoryView();
