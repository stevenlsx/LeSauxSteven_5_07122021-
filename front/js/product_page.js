const itemImg = document.querySelector(".item__img");
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const colors = document.getElementById("colors");

const id = new URLSearchParams(document.location.search).get("id"); //Permet de recuperer l'ID dans l'URL

const buttonAdd = document.getElementById("addToCart");
const inputQuantity = document.getElementById("quantity");

let cart = [];

let oneProduct = "";

/*On déclare fetchProduct comme une fonction asynchrone pour récuperer les données de l'API en premier, puis on les convertis en JSON,
 avant de les stocker dans une variable oneProduct. Enfin elle execute la fonction displayProduct.
 Et après la déclaration, on apelle la fonction fetchProduct pour qu'elle s'execute. */
const fetchProduct = async () => {
  await fetch(`http://localhost:3000/api/products/${id}`) //On insère à la fin la valeur de l'id récuperer pour récuperer les données du produit qui nous interesse.
    .then((res) => res.json())
    .then((data) => {
      oneProduct = data;
      displayProduct();
    });
};
fetchProduct();

/*Cette fonction a pour role d'afficher sur la page du produit séléctionné ses caractéristiques, 
prealablement récuperer depuis l'API et stocker dans oneProduct. Après avoir récuperer les id du fichier html,
on remplace leur contenu par du html qui récupère les valeurs voulus pour chaque caractéristique de l'objet.
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
les donées du produit, sa quantité et sa couleur, le tout stocké dans une constante.
On créé ensuite nos conditions: Si le panier n'est pas vide: on parcourt les index de notre tableau avec
la boucle for. Pour chaque index, elle vérifie si l'id du produit ajouté existe déja dans le panier ET
si il a la même couleur. Si ces 2 conditions sont remplis alors on ajouté la nouvelle quantité 
a la quantité du produit existant du panier. Si les 2 conditions ne sont pas remplis, on ajoute le produit au panier.
Et si le panier est vide au depart, alors idem, on ajoute le produit au panier. On s'assure a chaque etape des conditions
que le panier est poussé sur le local storage. 
 */
function addToCart() {
  console.log(inputQuantity.value);
  console.log(colors.value);
  const productCart = {
    id: oneProduct._id,
    quantity: parseInt(inputQuantity.value), //On récupère une string que l'on convertit en chiffre avec parseInt.
    color: colors.value,
  };
  console.log(productCart);
  console.log(cart);
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

    console.log(cart);
    if (productExisted === false) {
      cart.push(productCart);
      localStorage.panier = JSON.stringify(cart);
    }
  } else {
    cart.push(productCart);
    localStorage.panier = JSON.stringify(cart);
  }
}
