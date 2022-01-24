//Const qui récupère l'html de cart.html
const cartItems = document.getElementById("cart__items");

//Variable de stockage pour la fonction init
let getStorageCart = "";
let parseStorageCart = "";
let productsData = [];

/* Cette fonction récupère d'abord les données du localStorage. Puis pour chaque produit récupéré, elle récupère les données manquantes (price) depuis l'API.
 On créé un nouvel objet qui combine les données récupérés du localstorage et de l'API, qui va être stocké dans un nouveau tableau. */
async function init() {
  getStorageCart = localStorage.panier;
  parseStorageCart = JSON.parse(getStorageCart);
  parseStorageCart.forEach((product) =>
    fetch(`http://localhost:3000/api/products/${product.id}`)
      .then((res) => res.json())
      .then((data) => {
        productsData.push({
          id: product.id,
          color: product.color,
          quantity: product.quantity,
          name: data.name,
          alt: data.altTxt,
          img: data.imageUrl,
          price: data.price,
        });
        displayCartItems();
        console.log(productsData);
      })
  );
}
init();

//Cette fonction accède aux propriétés de nos nouveaux objets stocké dans notre nouveau tableau et les injectent dans le HTML.
function displayCartItems() {
  let html = "";
  productsData.forEach((productData) => {
    html += `
    <article class="cart__item" data-id="${productData.id}" data-color="${productData.color}">
                <div class="cart__item__img">
                  <img src="${productData.img}" alt="${productData.alt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${productData.name}</h2>
                    <p>${productData.color}</p>
                    <p>${productData.price}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" onchange="changeQuantity(event)" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productData.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem" onclick="deleteProduct(event)">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
    `;
  });
  cartItems.innerHTML = html;
}
let htmlItem = document.getElementsByClassName(".itemQuantity");
function changeQuantity(e) {
  for (let i = 0; i < productsData.length; i++) {
    if (
      productsData[i].id === e.target.id &&
      productsData[i].color === e.target.color
    ) {
      productsData[i].quantity = e.target.value;
      localStorage.panier.quantity = JSON.stringify(productsData);
      htmlItem.innerHTML += `<input type="number" onchange="changeQuantity(event)" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productsData.quantity}">`;
      console.log(productsData);
      break;
    }
    console.log(e);
  }
}

function deleteProduct(e) {
  console.log(e);
}
