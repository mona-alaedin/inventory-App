import Storage from "./Storage.js";

// ! SELECT HTML TAGS

const categoryTitle = document.querySelector("#category-title");
const categoryDescription = document.querySelector("#category-description");
const addNewCategoryBtn = document.querySelector("#add-new-category");
const cancelBtn = document.querySelector("#cancel-category-btn");

class CategoryView {
  constructor() {
    addNewCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
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
  }

  createCategoriesList() {
    let result = `<option class="bg-slate-500 text-slate-200" value="" >Select a category</option>`;

    this.categories.forEach((c) => {
      result += `<option class="bg-slate-500 text-slate-200" value=${c.id}>
      ${c.title}</option>`;
    });

    const selectOption = document.querySelector("#product-category");
    selectOption.innerHTML = result;
  }

  setApp() {
    this.categories = Storage.getAllCategories();
  }
}

export default new CategoryView();
