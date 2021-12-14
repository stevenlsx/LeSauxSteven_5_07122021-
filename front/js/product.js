let allProducts = [];
const htmlProducts = document.getElementById("items");

const fetchProducts = async () => {
  await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => {
      allProducts = data;
      displayProducts();
    });
};
fetchProducts();

function displayProducts() {
  let html = "";
  allProducts.forEach((product) => {
    html += `
    <a href="./product.html?id=${product.id}">
              <article>
                <img src="${product.imageUrl}" alt="${product.altTxt}">
                <h3 class="productName">${product.name}</h3>
                <p class="productDescription">${product.description}</p>
              </article>
            </a>  
    `;
  });
  htmlProducts.innerHTML = html;
}
//
