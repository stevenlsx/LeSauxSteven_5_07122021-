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
        priceCalcul();
        quantityCalcul();
        recupIds();
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
                      <input type="number" onchange="changeQuantity(event, '${productData.id}', '${productData.color}')" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productData.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem" onclick="deleteProduct('${productData.id}', '${productData.color}')">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
    `;
  });
  cartItems.innerHTML = html;
}
//La fonction qui permet de changer la quantité des produits dans le panier.
function changeQuantity(e, id, color) {
  for (let i = 0; i < productsData.length; i++) {
    if (productsData[i].id === id && productsData[i].color === color) {
      productsData[i].quantity = parseInt(e.target.value);
    }
    if (parseStorageCart[i].id === id && parseStorageCart[i].color === color) {
      parseStorageCart[i].quantity = parseInt(e.target.value);
    }
  }
  localStorage.panier = JSON.stringify(parseStorageCart);
  priceCalcul();
  quantityCalcul();
  recupIds();
}
//Cette fonction supprime le/les produits voulu du localstorage et de la page panier les articles
function deleteProduct(id, color) {
  productsData = productsData.filter((product) => {
    return product.id !== id || product.color !== color;
  });
  parseStorageCart = parseStorageCart.filter((product) => {
    return product.id !== id || product.color !== color;
  });
  localStorage.panier = JSON.stringify(parseStorageCart);
  displayCartItems();
  priceCalcul();
  quantityCalcul();
  recupIds();
}

let totalQuantity = document.getElementById("totalQuantity");
let totalPrice = document.getElementById("totalPrice");

//Cette fonction calcul le prix total du panier
function priceCalcul() {
  let priceByQuantity = 0;
  let total = 0;
  for (let i = 0; i < productsData.length; i++) {
    priceByQuantity = productsData[i].quantity * productsData[i].price;
    total += priceByQuantity;
  }
  totalPrice.innerHTML = `${total}`;
}
//cette fonction calcul la quantité totale des articles du panier
function quantityCalcul() {
  let allQuantity = 0;
  for (let i = 0; i < productsData.length; i++) {
    allQuantity += productsData[i].quantity;
  }
  totalQuantity.innerHTML = allQuantity;
}
//Ces variables récupèrent notre formulaire et ses champs
const orderForm = document.querySelector(".cart__order__form");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");

//Variables quis tockent les Regex
const regexPrim = /^[a-z ,.'-]+$/i; //Regex pour prenom, nom, ville
const regexAddress = /^[a-zA-Z0-9\s\''\-]*$/;
const regexMail =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//Notre object contact qui sera envoyé dans la requête POST
let contactObj = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  email: "",
};
//Ces booléans vont permettre une vérification finale des champs lors du submit du formulaire
let firstIsValid = false;
let lastIsValid = false;
let addressIsValid = false;
let cityIsValid = false;
let emailIsValid = false;

//Cette série de 5 fonctions vérifie la validité des champs du formulaire.
firstName.addEventListener("change", (e) => {
  const textError = document.getElementById("firstNameErrorMsg");

  if (firstName.value.match(regexPrim)) {
    contactObj.firstName = e.target.value;
    textError.innerHTML = "";
    firstIsValid = true;
  } else {
    textError.innerHTML = "Le champs est invalide";
    textError.style.color = "red";
    e.preventDefault;
  }
});

lastName.addEventListener("change", (e) => {
  const textError = document.getElementById("lastNameErrorMsg");

  if (lastName.value.match(regexPrim)) {
    contactObj.lastName = e.target.value;
    textError.innerHTML = "";
    lastIsValid = true;
  } else {
    textError.innerHTML = "Le champs est invalide";
    textError.style.color = "red";
    e.preventDefault;
  }
});
address.addEventListener("change", (e) => {
  const textError = document.getElementById("addressErrorMsg");

  if (address.value.match(regexAddress)) {
    contactObj.address = e.target.value;
    textError.innerHTML = "";
    addressIsValid = true;
  } else {
    textError.innerHTML = "Le champs est invalide";
    textError.style.color = "red";
    e.preventDefault;
  }
});
city.addEventListener("change", (e) => {
  const textError = document.getElementById("cityErrorMsg");

  if (city.value.match(regexPrim)) {
    contactObj.city = e.target.value;
    textError.innerHTML = "";
    cityIsValid = true;
  } else {
    textError.innerHTML = "Le champs est invalide";
    textError.style.color = "red";
    e.preventDefault;
  }
});
email.addEventListener("change", (e) => {
  const textError = document.getElementById("emailErrorMsg");

  if (email.value.match(regexMail)) {
    contactObj.email = e.target.value;
    textError.innerHTML = "";
    emailIsValid = true;
  } else {
    textError.innerHTML = "Le champs est invalide";
    textError.style.color = "red";
    e.preventDefault;
  }
});

//Cette fonction déclenche une vérification finale lors de la soumission du formulaire.
orderForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    firstIsValid == true &&
    lastIsValid == true &&
    addressIsValid == true &&
    cityIsValid == true &&
    emailIsValid == true
  ) {
    post();
  } else {
    e.preventDefault();
    alert("Veuillez remplir correctement les champs");
  }
});
//Cette fonction récupère les ID des produits du panier et les ajoutes au tableau d'ID qui sera envoyé dans notre requête.
let tableOfIds;
function recupIds() {
  for (let i = 0; i < productsData.length; i++) {
    tableOfIds = [];
    tableOfIds.push(productsData[i].id);
  }
}
//La fonction POST qui va envoyer à l'API l'objet contact et le tableau d'ID afin de récupérer
// notre bon de commande et nous redirige vers la page confirmation.
function post() {
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    redirect: "manual",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contact: contactObj,
      products: tableOfIds,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Erreur survenue");
      }
    })
    .then((data) => {
      window.location.href = `./confirmation.html?orderId=${data.orderId}`;
    })
    .catch((error) => {
      console.log(error);
    });
}
