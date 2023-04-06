let allProductsSelected = [];

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

