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
        priceCalcul();
        quantityCalcul();
        recupIds();
        //console.log(productsData);
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
  console.log(e);
  console.log(productsData);
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

const orderForm = document.querySelector(".cart__order__form");
console.log(orderForm);
const firstName = document.getElementById("firstName");
console.log(firstName);
const lastName = document.getElementById("lastName");
const adress = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email"); //Recupère message erreur

const regexPrim = /^[a-z ,.'-]+$/i; //Regex pour prenom, nom, ville
const regexMail =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

let contactObj = {
  firstName: "",
  lastName: "",
  adress: "",
  city: "",
  email: "",
  arrayOfIfd: [],
};
//Cet ensemble de fonction vérifié la validité des champs du formulaire de la page panier.
firstName.addEventListener("change", (e) => {
  const textError = document.getElementById("firstNameErrorMsg");

  if (firstName.value.match(regexPrim)) {
    contactObj.firstName = e.target.value;
  } else {
    textError.innerHTML = "Le champs est invalide";
    textError.style.color = "red";
    e.preventDefault;
    console.log(textError);
  }
});

lastName.addEventListener("change", (e) => {
  const textError = document.getElementById("lastNameErrorMsg");

  if (lastName.value.match(regexPrim)) {
    contactObj.lastName = e.target.value;
  } else {
    textError.innerHTML = "Le champs est invalide";
    textError.style.color = "red";
    e.preventDefault;
    console.log(textError);
  }
});
adress.addEventListener("change", (e) => {
  const textError = document.getElementById("addressErrorMsg");

  if (adress.value.match(regexPrim)) {
    contactObj.adress = e.target.value;
  } else {
    textError.innerHTML = "Le champs est invalide";
    textError.style.color = "red";
    e.preventDefault;
    console.log(textError);
  }
});
city.addEventListener("change", (e) => {
  const textError = document.getElementById("cityErrorMsg");

  if (city.value.match(regexPrim)) {
    contactObj.city = e.target.value;
  } else {
    textError.innerHTML = "Le champs est invalide";
    textError.style.color = "red";
    e.preventDefault;
    console.log(textError);
  }
});
email.addEventListener("change", (e) => {
  const textError = document.getElementById("emailErrorMsg");
  if (email.value.match(regexMail)) {
    contactObj.email = e.target.value;
  } else {
    textError.innerHTML = "Le champs est invalide";
    textError.style.color = "red";
    e.preventDefault;
    console.log(textError);
  }
});

orderForm.addEventListener("submit", (e) => {
  console.log(e.target.value);

  if (e.target.value.match(regexPrim) && email.value.match(regexMail)) {
    post();
  } else {
    e.preventDefault;
    alert("Veuillez remplir correctement les champs");
  }
});

let tableOfIds;
function recupIds() {
  for (let i = 0; i < productsData.length; i++) {
    tableOfIds = [];
    tableOfIds.push(productsData[i].id);
    console.log(tableOfIds);
  }
}

function post() {
  fetch("http://localhost:3000/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contact: contactObj,
      products: tableOfIds,
    }),
  })
    .then((res) => {
      res.json;
    })
    .then(
      (data) =>
        (window.location.href = `main/front/html/confirmation.html/${data}`)
    );
}
