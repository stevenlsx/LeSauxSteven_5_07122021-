const itemImg = document.getElementById("item__img");
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const colors = document.getElementById("colors");

let productDetails = [];
const fetchProducts = async () => {
  await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => {
      productDetails = data;
      displayProducts();
      
    });
};
function displayProducts() {
  let html = "";
  productDetails.forEach((product) => {
    itemImg.innerHTML = `
      <img src="${data.imageUrl}" alt="${data.altTxt}">
      `;
      title.innerHTML = `
      <h1 id="title">${data.name}</h1>
      `;
      price.innerHTML = `
      <span id="price">${data.price}</span>
      `;
      description.innerHTML = `
      <p id="description">${data.description}</p>
      `;
      colors.innerHTML =`
      <select name="color-select" id="colors">
      <option value="">--SVP, choisissez une couleur --</option>
      <option value="vert">${data.colors.green}</option>
      <option value="blanc">${data.colors.white}</option> -->
      </select>
      `
  });
  htmlProducts.innerHTML = html;