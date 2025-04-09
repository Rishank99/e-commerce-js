import { addToCart } from "./addToCart";
import { homeQuantityToggle } from "./homeQuantityToggle";

const productContainer = document.getElementById("productContainer");
const productTemplate = document.getElementById("productTemplate");

export const showProductContainer = (products) => {
  if (!products) {
    return false;
  }

  products.forEach((curElem) => {
    const { id, name, category, brand, price, stock, description, image } =
      curElem;

    const productClone = document.importNode(productTemplate.content, true);

    productClone.querySelector(".category").textContent = category;

    productClone.querySelector(".productName").innerText = name;
    productClone.querySelector(".productImage").src = image;
    productClone.querySelector(".productImage").alt = name;
    productClone.querySelector(".productDescription").innerText = description;
    productClone.querySelector(".productPrice").innerText = `₹${price}`;
    productClone.querySelector(".productActualPrice").innerText = `₹${
      4 * price
    }`;
    productClone.querySelector(".productStock").innerText = stock;

    productClone.querySelector("#cardValue").setAttribute("id", `card${id}`);

    productClone
      .querySelector(".stockElement")
      .addEventListener("click", (event) => {
        homeQuantityToggle(event, id, stock);
      });

    productClone
      .querySelector(".add-to-cart-button")
      .addEventListener("click", (event) => {
        addToCart(event, id, stock);
      });

    productContainer.append(productClone);
  });
};
