//Cette fonction va récuperer les données de l'API, les convertir au format JSON, on affiche le contenu de allProduct dans data
//et on apelle la fonction displayProduct pour integrer les valeurs récuperer dans notre site web.
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

//Cette fonction va permettre d'afficher les produits dans notre site. Pour chaque produit stocker dans allProduct, on
//on injecte du html qui contient les données récupérées depuis l'API. Puis on l'injecte dans notre ID Items du fichier HTML.
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
