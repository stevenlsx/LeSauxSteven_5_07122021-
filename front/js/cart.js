const cartItems = document.getElementById("cart__items");
let getStorageCart = "";
let parseStorageCart = "";
let productData = [];

async function init() {
  getStorageCart = localStorage.panier;
  parseStorageCart = JSON.parse(getStorageCart);
  console.log(parseStorageCart);
  parseStorageCart.forEach(
    (product) =>
      await fetch(`http://localhost:3000/api/products/${product.id}`)
        .then((res) => res.json())
        .then((data) => {
          productData = {
            id: parseStorageCart.id,
            color: parseStorageCart.color,
            quantity: parseStorageCart.quantity,
            name: data.name,
            alt: data.altTxt,
            img: data.imageUrl,
            price: data.price,
          };
          console.log(data);
          displayCartItems();
        })
  );
}
init();

function displayCartItems() {
  cartItems.innerHTML += `
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
                      <p>${productData.quantity}</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productData.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
    `;
}
