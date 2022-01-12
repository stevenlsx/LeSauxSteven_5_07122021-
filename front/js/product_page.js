const itemImg = document.querySelector(".item__img");
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const colors = document.getElementById("colors");

const id = new URLSearchParams(document.location.search).get("id");

const buttonAdd = document.getElementById("addToCart");
const inputQuantity = document.getElementById("quantity");
let cart = [];

let oneProduct = "";

const fetchProduct = async () => {
  await fetch(`http://localhost:3000/api/products/${id}`)
    .then((res) => res.json())
    .then((data) => {
      oneProduct = data;
      console.log(oneProduct);
      displayProduct();
    });
};
fetchProduct();
console.log(itemImg);
function displayProduct() {
  itemImg.innerHTML = `
    <img src="${oneProduct.imageUrl}" alt="${oneProduct.altTxt}">
    `;
  title.innerHTML = `
    <h1 id="title">${oneProduct.name}</h1>
    `;
  price.innerHTML = `
    <span id="price">${oneProduct.price}</span>
    `;
  description.innerHTML = `
    <p id="description">${oneProduct.description}</p>
    `;
  colors.innerHTML = `
    <select name="color-select" id="colors">
    <option value="">--SVP, choisissez une couleur --</option>
    ${oneProduct.colors
      .map((color) => {
        return `<option value="${color}">--${color}--</option>`;
      })
      .join()}
    </select>
    `;
}

buttonAdd.addEventListener("click", (e) => {
  addToCart();
});
function addToCart() {
  console.log(inputQuantity.value);
  console.log(colors.value);
  const productCart = {
    product: oneProduct,
    quantity: parseInt(inputQuantity.value),
    color: colors.value,
  };
  console.log(productCart);
  console.log(cart);
  if (cart.length > 0) {
    let productExisted = false;
    for (let i = 0; i < cart.length; i++) {
      if (
        productCart.product._id === cart[i].product._id &&
        productCart.color === cart[i].color
      ) {
        cart[i].quantity += productCart.quantity;
        productExisted = true;
        break;
      }
    }
    console.log(cart);
    if (productExisted === false) {
      cart.push(productCart);
    }
  } else {
    cart.push(productCart);
  }
}
