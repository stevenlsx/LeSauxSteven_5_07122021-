//Isole et recupère le bon de commande dans l'URL puis l'injecte dnas le html prévu à cet effet.
let orderId = document.getElementById("orderId");

let params = new URL(window.location.href).searchParams;
let orderCom = params.get("orderId");

orderId.innerHTML = `<span id="orderId">${orderCom}</span>`;
