const itemImg = document.querySelector(".item__img");
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const colors = document.getElementById("colors");

const id = new URLSearchParams(document.location.search).get("id"); //Permet de recuperer l'ID dans l'URL

const buttonAdd = document.getElementById("addToCart");
const inputQuantity = document.getElementById("quantity");

let cart =
  localStorage.panier !== undefined ? JSON.parse(localStorage.panier) : [];

let oneProduct = "";

//Cette fonction asynchrone cible les id de l'API afin de récuperer les données du produit qui nous interesse.
const fetchProduct = async () => {
  await fetch(`http://localhost:3000/api/products/${id}`) //On insère à la fin
    .then((res) => res.json())
    .then((data) => {
      oneProduct = data;
      displayProduct();
    });
};
fetchProduct();

/*Cette fonction a pour role d'afficher sur la page du produit séléctionné ses caractéristiques, 
prealablement récuperer depuis l'API.
 */
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

/*cette fonction est executé lors du click sur le bouton d'ajout au panier. On créé un objet qui récupère
les donées du produit, sa quantité et sa couleur.
Si le panier n'est pas vide: on vérifie si l'id du produit ajouté existe déja dans le panier ET
si il a la même couleur. Si c'est validé, alors on ajouté la nouvelle quantité à la quantité du produit existant. Si les 2 conditions ne sont pas valide,
 on ajoute le produit au panier. Si le panier est vide au depart, alors idem, on ajoute le produit au panier.*/
function addToCart() {
  const productCart = {
    id: oneProduct._id,
    quantity: parseInt(inputQuantity.value),
    color: colors.value,
  };

  if (cart.length > 0) {
    let productExisted = false;
    for (let i = 0; i < cart.length; i++) {
      if (
        productCart.id === cart[i].id &&
        productCart.color === cart[i].color
      ) {
        cart[i].quantity += productCart.quantity;
        productExisted = true;
        localStorage.panier = JSON.stringify(cart);
        break;
      }
    }
    if (productExisted === false) {
      cart.push(productCart);
      localStorage.panier = JSON.stringify(cart);
    }
  } else {
    cart.push(productCart);
    localStorage.panier = JSON.stringify(cart);
  }
}
