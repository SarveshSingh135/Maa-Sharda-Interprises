export const addToCart = (product) => {
  const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({
    ...product,
    quantity: 1,
  });

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );
};