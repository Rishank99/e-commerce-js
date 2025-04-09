import products from "./api/products.json";
import { fetchQuantityFromCartLS } from "./fetchQuantityFromCartLS";
import { getCartProductFromLS } from "./getCartProducts";
import { incrementDecrement } from "./incrementDecrement";
import { removeProdFromCart } from "./removeProdFromCart";
import { updateCartProductTotal } from "./updateCartProductTotal";

let cartProducts = getCartProductFromLS();

let filterProducts = products.filter((curProd) => {
  return cartProducts.some((curElem) => curElem.id === curProd.id);
});

const cartElement = document.querySelector("#productCartContainer");
const templateContainer = document.querySelector("#productCartTemplate");

const showCartProduct = () => {
  filterProducts.map((curProd) => {
    const { category, id, image, name, stock, price } = curProd;

    let productClone = document.importNode(templateContainer.content, true);

    const lSActualData = fetchQuantityFromCartLS(id, price);

    productClone.querySelector("#cardValue").setAttribute("id", `card${id}`);
    productClone.querySelector(".category").innerText = category;
    productClone.querySelector(".productImage").src = image;
    productClone.querySelector(".productName").innerText = name;

    productClone.querySelector(".productPrice").innerText = lSActualData.price;
    productClone.querySelector(".productQuantity").innerText =
      lSActualData.quantity;

    productClone
      .querySelector(".remove-to-cart-button")
      .addEventListener("click", () => removeProdFromCart(id));

    productClone
      .querySelector(".stockElement")
      .addEventListener("click", (event) => {
        incrementDecrement(event, id, stock, price);
      });

    cartElement.append(productClone);
  });
};

showCartProduct();

updateCartProductTotal();
