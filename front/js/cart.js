const cartList = document.getElementById('cart__items');
let allProductsSelected = [];
let isTwice = false;


function displayProducts() {
    
    for (let i=0; i<localStorage.length; i++) {
        
        let canapStr = localStorage.getItem(localStorage.key(i));
        let canapJson = JSON.parse(canapStr);
        
        let productId = canapJson.id;
        let productColor = canapJson.color;
        let productQuantity = canapJson.quantity;
        let productCheck = [];
        let productColorCheck = [];
        
        for (let j=0; j<allProductsSelected.length; j++) {
            if (allProductsSelected[j][0] == productId) {
                isTwice = true;
                console.log('déja présent');
            } else {
                console.log("pas présent");
            }
        }
        if (isTwice == false) {
            productCheck.push(productId);
            productColorCheck.push(productColor);
            productColorCheck.push(productQuantity);
            productCheck.push(productColorCheck);
            allProductsSelected.push(productCheck);
        } else {
            for (let j=0; j<allProductsSelected.length; j++) {
                if (allProductsSelected[j][0] == productId) {
                    
                    productColorCheck.push(productColor);
                    productColorCheck.push(productQuantity);
                    allProductsSelected[j].push(productColorCheck);
                }
            }
        }
        isTwice = false;
    }
    
    console.log(allProductsSelected);
    
    // for (let i=0; i<allProductsSelected.length; i++) {
    //     const fichesProduit = Array.from(document.querySelectorAll('.cart__item'));   
    //     console.log(fichesProduit);
    
    //     allProductsSelected.forEach((e) => {
    //         fichesProduit.forEach((this) => {
    
    //         })
    //         let newArticle = document.createElement('article');
    //         newArticle.classList.add('cart__item');
    //         newArticle.setAttribute('data-id', allProductsSelected[i][0]);
    //         newArticle.setAttribute('data-color', allProductsSelected[i][1][0]);
    //         cartList.appendChild(newArticle);
    //         console.log('2eme condition');
    //     })
    
    
    // fichesProduit.forEach((e) => {
    //     console.log(e.getAttribute('data-id'));
    //     if (e.getAttribute('data-id') == allProductsSelected[i][0]) {
    //         console.log('1ere condition');
    //     } else {
    //         let newArticle = document.createElement('article');
    //         newArticle.classList.add('cart__item');
    //         newArticle.setAttribute('data-id', allProductsSelected[i][0]);
    //         newArticle.setAttribute('data-color', allProductsSelected[i][1][0]);
    //         cartList.appendChild(newArticle);
    //         console.log('2eme condition');
    //     }
    // })
    
    // for (let j=0; j<fichesProduit.length; j++) {
    //     if (this.getAttribute('data-id') == allProductsSelected[i][0]) {
    //         console.log('1ere condition');
    //     } else {
    //         let newArticle = document.createElement('article');
    //         newArticle.classList.add('cart__item');
    //         newArticle.setAttribute('data-id', allProductsSelected[i][0]);
    //         newArticle.setAttribute('data-color', allProductsSelected[i][1][0]);
    //         cartList.appendChild(newArticle);
    //         console.log('2eme condition')
    //     }
    // }
    // }
}

function checkData() {
    
}



window.addEventListener("DOMContentLoaded", (e) => {
    displayProducts();
});