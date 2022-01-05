const PRODUCT_CART = "productsCart";

export const getProductsCart = () => {
  const response = localStorage.getItem(PRODUCT_CART);
  return JSON.parse(response || "[]");
};

export const addProductToCart = (id) => {
  const products = getProductsCart();
  products.push(id);
  localStorage.setItem(PRODUCT_CART, JSON.stringify(products));
};

export const removeProductsCart = (index) => {
  const products = getProductsCart();
  console.log(products);
  products.splice(index, 1);
  localStorage.setItem(PRODUCT_CART, JSON.stringify(products));
};

export const cleanProductsCart = () => {
  localStorage.removeItem(PRODUCT_CART);
};
