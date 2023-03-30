let str = document.location.href;
let url = new URL(str);
let idProduct = url.searchParams.get("id");

let imgProduct = document.querySelector('.item__img');
let productTitle = document.querySelector('#title');
let priceProduct = document.querySelector('#price');
let descProduct = document.querySelector('#description');
let colorOptions = document.querySelector('#colors');

console.log(str);
console.log(idProduct);

fetch('http://localhost:3000/api/products')
.then((response) => {
    return response.json();
})
.then((data) => {
    let canaps = data;
    console.log(canaps);
    for (let i=0; i<canaps.length; i++) {
        if (canaps[i]._id === idProduct) {

            // Crée l'image du produit
            let newImg = document.createElement('img');
            newImg.src = canaps[i].imageUrl;
            newImg.alt = canaps[i].altTxt;
            imgProduct.appendChild(newImg);

            // Crée le nom du produit
            productTitle.textContent = canaps[i].name;

            // Crée le prix du produit
            priceProduct.textContent = canaps[i].price;

            // Crée la description du produit
            descProduct.textContent = canaps[i].description;

            // Crée les options de couleur
            for (let j=0; j<canaps[i].colors.length; j++) {
                let newColor = document.createElement('option');
                newColor.value = canaps[i].colors[j];
                newColor.textContent = canaps[i].colors[j];
                colorOptions.appendChild(newColor);
            }
        }
    }
    
})