const cartList = document.getElementById('cart__items');
const indicTotalQuantity = document.getElementById('totalQuantity');
const indicTotalPrice = document.getElementById('totalPrice');
let allProductsSelected = [];

let productSrc;
let productAlt;
let productName;
let productCol;
let productNb;
let productPrice;
let totalQuantity = 0;
let priceCurrentProduct = 0;
let totalPrice = 0;


function checkProducts() {
    
    for (let i=0; i<localStorage.length; i++) {
        
        let canapStr = localStorage.getItem(localStorage.key(i));
        let canapJson = JSON.parse(canapStr);
        
        let productId = canapJson.id;
        let productColor = canapJson.color;
        let productQuantity = canapJson.quantity;
        let productCheck = [];
        let productColorCheck = [];
        
        productCheck.push(productId);
        productColorCheck.push(productColor);
        productColorCheck.push(productQuantity);
        productCheck.push(productColorCheck);
        allProductsSelected.push(productCheck);
    }
    console.log(allProductsSelected);
}

function displayProducts() {
    fetch('http://localhost:3000/api/products')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let canaps = data;
        console.log(canaps);
        
        for (let i=0; i<allProductsSelected.length; i++) {
            // Crée fiche article
            let newArticle = document.createElement('article');
            newArticle.classList.add('cart__item');
            newArticle.setAttribute('data-id', allProductsSelected[i][0]);
            newArticle.setAttribute('data-color', allProductsSelected[i][1][0]);
            cartList.appendChild(newArticle);
            
            const fichesProduit = Array.from(document.querySelectorAll('.cart__item'));
            
            // Crée img item
            let newDivImg = document.createElement('div');
            newDivImg.classList.add('cart__item__img');
            fichesProduit[i].appendChild(newDivImg);
            const divImg = Array.from(document.querySelectorAll('.cart__item__img'));
            let newImgItem = document.createElement('img');
            
            // stocke variables
            for (let j=0; j<canaps.length; j++) {
                if (canaps[j]._id == allProductsSelected[i][0]) {
                    productSrc = canaps[j].imageUrl;
                    productAlt = canaps[j].altTxt;
                    productName = canaps[j].name;
                    productCol = allProductsSelected[i][1][0];
                    productPrice = canaps[j].price;
                    productNb = allProductsSelected[i][1][1];
                }
            }
            
            newImgItem.src = productSrc;
            newImgItem.alt = productAlt;
            divImg[i].appendChild(newImgItem);
            
            // Crée container content
            let newContainerContent = document.createElement('div');
            newContainerContent.classList.add('cart__item__content');
            fichesProduit[i].appendChild(newContainerContent);
            const containerContent = Array.from(document.querySelectorAll('.cart__item__content'));
            
            // Crée container description
            let newContainerDesc = document.createElement('div');
            newContainerDesc.classList.add('cart__item__content__description');
            containerContent[i].appendChild(newContainerDesc);
            const containerDesc = Array.from(document.querySelectorAll('.cart__item__content__description'));
            
            // Crée description
            let newNameProduct = document.createElement('h2');
            newNameProduct.textContent = productName;
            containerDesc[i].appendChild(newNameProduct);

            let newColorProduct = document.createElement('p');
            newColorProduct.textContent = productCol;
            containerDesc[i].appendChild(newColorProduct);

            let newPriceProduct = document.createElement('p');
            newPriceProduct.textContent = productPrice + " €";
            containerDesc[i].appendChild(newPriceProduct);
            allProductsSelected[i].push(productPrice);
            console.log(allProductsSelected);
            
            // Crée container settings
            let newContainerSettings = document.createElement('div');
            newContainerSettings.classList.add('cart__item__content__settings');
            containerContent[i].appendChild(newContainerSettings);
            const containerSettings = Array.from(document.querySelectorAll('.cart__item__content__settings'));

            // Crée container quantité
            let newContainerQuantity = document.createElement('div');
            newContainerQuantity.classList.add('cart__item__content__settings__quantity');
            containerSettings[i].appendChild(newContainerQuantity);
            const containerQuantity = Array.from(document.querySelectorAll('.cart__item__content__settings__quantity'));

            // Crée content quantity
            let newQuantityContent = document.createElement('p');
            newQuantityContent.textContent = "Qté : " + productNb;
            containerQuantity[i].appendChild(newQuantityContent);

            let newInputQuantity = document.createElement('input');
            newInputQuantity.type = "number";
            newInputQuantity.classList.add('itemQuantity');
            newInputQuantity.name = "itemQuantity";
            newInputQuantity.min = "1";
            newInputQuantity.max = "100";
            newInputQuantity.value = productNb;
            containerQuantity[i].appendChild(newInputQuantity);


            // Crée container delete
            let newContainerDelete = document.createElement('div');
            newContainerDelete.classList.add('cart__item__content__settings__delete');
            containerSettings[i].appendChild(newContainerDelete);
            const containerDelete = Array.from(document.querySelectorAll('.cart__item__content__settings__delete'));
        
            // Crée delete
            let newDelete = document.createElement('p');
            newDelete.classList.add('deleteItem');
            newDelete.textContent = "Supprimer";
            containerDelete[i].appendChild(newDelete);
        }

        calculateQuantity();
        calculatePrice();
    });
}

function calculateQuantity() {
    const inputQuantity = Array.from(document.querySelectorAll('.itemQuantity'));
    console.log(inputQuantity);
    inputQuantity.forEach((item) => {
        console.log(item.value);
        totalQuantity = Math.floor(totalQuantity) + Math.floor(item.value);
    })
    console.log(totalQuantity);
    indicTotalQuantity.textContent = totalQuantity;
}

function calculatePrice() {
    const inputQuantity = Array.from(document.querySelectorAll('.itemQuantity'));

    for (let i=0; i<inputQuantity.length; i++) {
        priceCurrentProduct =  Math.floor(inputQuantity[i].value) * Math.floor(allProductsSelected[i][2]);
        totalPrice = Math.floor(totalPrice) + Math.floor(priceCurrentProduct);
    }
    indicTotalPrice.textContent = totalPrice;
    
}


window.addEventListener("DOMContentLoaded", (e) => {
    checkProducts();
    displayProducts();
});