const cartItems = document.getElementById("cart__items");
let getStorageCart = "";
let parseStorageCart = "";
let productData = "";

function init() {
  getStorageCart = localStorage.panier;
  parseStorageCart = JSON.parse(getStorageCart);
  parseStorageCart.forEach((product) => {
    fetch(`http://localhost:3000/api/products/`)
      .then((res) => res.json())
      .then((data) => {
        productData = data;
        console.log(productData);
        displayCartItems();
      });
  });
}
init();

function displayCartItems() {
  parseStorageCart.forEach((item) => {
    cartItems.innerHTML += `
    <article class="cart__item" data-id="${item.productData._id}" data-color="${item.color}">
                <div class="cart__item__img">
                  <img src="${item.productData.imageUrl}" alt="${item.id.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${item.id.name}</h2>
                    <p>${item.color}</p>
                    <p>${item.id.price}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>${item.quantity}</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
    `;
  });
}
