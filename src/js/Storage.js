export default class Storage {
  static getAllCategories() {
    const savedCategories = JSON.parse(localStorage.getItem("category")) || [];

    // ? desending sort categories
    const sortCategories = savedCategories.sort((a, b) => {
      return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
    });

    return sortCategories;
  }

  static saveCategory(categoryToSave) {
    const savedCategories = Storage.getAllCategories();

    const existedItem = savedCategories.find((c) => {
      return c.id === categoryToSave.id;
    });

    if (existedItem) {
      // ? Edite Category
      existedItem.title = categoryToSave.title;
      existedItem.description = categoryToSave.description;
    } else {
      // ? Create New Category
      categoryToSave.id = new Date().getTime();
      categoryToSave.createdAt = new Date().toISOString();

      //? push category to categories
      savedCategories.push(categoryToSave);
    }
    localStorage.setItem("category", JSON.stringify(savedCategories));
  }

  static getAllProducts(sort = "newest") {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];

    const sortedProducts = savedProducts.sort((a, b) => {
      if (sort === "newest") {
        // ! DESCENDING SORT PRODUCTS
        return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
      } else if (sort === "oldest") {
        // ! ASCENDING SORT PRODUCTS
        return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
      }
    });

    return sortedProducts;
  }

  static saveProducts(productToSave) {
    const savedProducts = Storage.getAllProducts();

    const existedProduct = savedProducts.find((p) => p.id === productToSave.id);

    if (existedProduct) {
      // ? Edite product
      existedProduct.title = productToSave.title;
      existedProduct.quantity = productToSave.quantity;
      existedProduct.category = productToSave.category;
    } else {
      // ? create New Product
      productToSave.id = new Date().getTime();
      productToSave.createdAt = new Date().toISOString();
      savedProducts.push(productToSave);
    }

    localStorage.setItem("products", JSON.stringify(savedProducts));
  }
}
