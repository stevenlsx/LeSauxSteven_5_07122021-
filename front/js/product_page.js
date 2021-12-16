const itemImg = document.getElementById("item__img");
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const colors = document.getElementById("colors");

const fetchProducts = async () => {
  await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => {
      let productDetails = [];
      productDetails = data;
      console.log(productDetails);
      displayProducts();
    });
};
fetchProducts();

function displayDetails() {
  let html = "";
  productDetails.forEach((detail) => {
    html += `${detail.imageUrl} " " ${detail.altTxt}`;
  });
  itemImg.innerHTML = html;
}
