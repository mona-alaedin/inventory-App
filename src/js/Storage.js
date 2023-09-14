const category = [
  {
    id: 1,
    title: "beauty product",
    description: "this category is beauty product",
    createdAt: "2023-09-11T03:03:06.421Z",
  },
  {
    id: 2,
    title: "electronic devices",
    description: "this category is electronic devices",
    createdAt: "2023-01-11T03:03:06.421Z",
  },
  {
    id: 3,
    title: "sport equipment",
    description: "this category is sport equipment",
    createdAt: "2023-04-11T03:05:06.421Z",
  },
];

const products = [
  {
    id: 1,
    title: "product-1",
    quantity: 2,
    category: "beauty product",
    createdAt: "2023-09-11T03:03:06.421Z",
  },
  {
    id: 2,
    title: "product-2",
    quantity: 1,
    category: "beauty product",
    createdAt: "2022-09-11T03:03:06.421Z",
  },
  {
    id: 3,
    title: "product-3",
    quantity: 4,
    category: "beauty product",
    createdAt: "2023-04-11T03:03:06.421Z",
  },
];

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

  static getAllProducts() {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];

    const sortedProducts = savedProducts.sort((a, b) => {
      return new Date(a.createdAt) < new Date(b.createdAt) ? -1 : 1;
    });

    return sortedProducts;
  }

  static saveProducts(productToSave) {
    const savedProducts = Storage.getAllProducts();

    const existedProduct = savedProducts.find((p) => {
      return p.id === productToSave.id;
    });

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

    localStorage.setItem("product", JSON.stringify(savedProducts));
  }
}
