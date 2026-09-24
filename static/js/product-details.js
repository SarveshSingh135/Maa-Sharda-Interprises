let quantity = 1;


// ==============================
// INCREASE QUANTITY
// ==============================

function increaseQuantity() {

    const quantityElement =
        document.getElementById("quantity");

    if (!quantityElement) {
        return;
    }

    const maxStock =
        Number(
            document.querySelector(".stock")
                ?.innerText
                .match(/\d+/)?.[0] || 999999
        );

    if (quantity < maxStock) {

        quantity++;

        quantityElement.innerText = quantity;

    } else {

        alert(
            "Maximum available stock is " +
            maxStock
        );

    }
}


// ==============================
// DECREASE QUANTITY
// ==============================

function decreaseQuantity() {

    const quantityElement =
        document.getElementById("quantity");

    if (!quantityElement) {
        return;
    }

    if (quantity > 1) {

        quantity--;

        quantityElement.innerText = quantity;

    }
}


// ==============================
// ADD TO CART
// ==============================

function addProductToCart() {

    const productName =
        document.querySelector(".product-information h1")
            ?.innerText;

    const quantityElement =
        document.getElementById("quantity");

    const productQuantity =
        quantityElement
            ? Number(quantityElement.innerText)
            : 1;

    if (!productName) {
        alert("Product not found.");
        return;
    }

    alert(
        productQuantity +
        " x " +
        productName +
        " cart me add ho gaya 🛒"
    );
}


// ==============================
// BUY NOW
// ==============================

function buyProduct() {

    const productName =
        document.querySelector(".product-information h1")
            ?.innerText;

    if (!productName) {
        alert("Product not found.");
        return;
    }

    alert(
        "Buy Now: " +
        productName +
        " 🛒"
    );
}