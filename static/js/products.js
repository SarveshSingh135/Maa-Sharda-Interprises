let cart = [];


// ================= CATEGORY FILTER =================

function filterCategory(category, button) {

    const products =
        document.querySelectorAll(".product-card");

    const buttons =
        document.querySelectorAll(".filter-btn");


    buttons.forEach(function(btn) {
        btn.classList.remove("active");
    });

    button.classList.add("active");


    products.forEach(function(product) {

        if (
            category === "all" ||
            product.dataset.category === category
        ) {

            product.classList.remove("hidden");

        } else {

            product.classList.add("hidden");

        }

    });

}


// ================= SEARCH =================

function filterProducts() {

    const search =
        document
            .getElementById("productSearch")
            .value
            .toLowerCase()
            .trim();


    const products =
        document.querySelectorAll(".product-card");


    products.forEach(function(product) {

        const name =
            product.dataset.name.toLowerCase();

        if (name.includes(search)) {

            product.classList.remove("hidden");

        } else {

            product.classList.add("hidden");

        }

    });

}



// ================= ADD TO CART =================

function addToCart(name, price, productId) {

    fetch("/cart/add/" + productId, {
        method: "POST"
    })
    .then(function(response) {

        if (response.ok) {

            cart.push({
                name: name,
                price: Number(price),
                id: productId
            });

            const cartCount =
                document.getElementById("cartCount");

            if (cartCount) {
                cartCount.innerText = cart.length;
            }

            alert(name + " added to cart 🛒");

        } else {

            alert("Product cart me add nahi ho paya.");

        }

    })
    .catch(function(error) {

        console.error(error);
        alert("Something went wrong.");

    });
}


// ================= SHOW CART =================

function showCart() {

    const overlay =
        document.getElementById("cartOverlay");

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");


    cartItems.innerHTML = "";

    let total = 0;


    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

    }


    cart.forEach(function(item, index) {

        total += item.price;


        cartItems.innerHTML += `

            <div class="cart-item">

                <div>

                    <strong>${item.name}</strong>

                    <p>₹${item.price}</p>

                </div>

                <button
                    class="remove-btn"
                    onclick="removeFromCart(${index})">
                    Remove
                </button>

            </div>

        `;

    });


    cartTotal.innerText =
        "₹" + total.toLocaleString("en-IN");


    overlay.classList.add("show");

}


// ================= REMOVE FROM CART =================

function removeFromCart(index) {

    cart.splice(index, 1);


    const cartCount =
        document.getElementById("cartCount");

    if (cartCount) {

        cartCount.innerText =
            cart.length;

    }


    showCart();

}


// ================= CLOSE CART =================

function closeCart() {

    document
        .getElementById("cartOverlay")
        .classList.remove("show");

}


// ================= CHECKOUT =================

function checkout() {

    window.location.href = "/checkout";

}


// ================= ADD BUTTON EVENTS =================

document
    .querySelectorAll(".add-btn")
    .forEach(function(button) {

        button.addEventListener("click", function() {

            const productId =
                this.dataset.productId;

            const productName =
                this.dataset.productName;

            const productPrice =
                this.dataset.productPrice;


            addToCart(
                productName,
                productPrice,
                productId
            );

        });

    });
    // ================= LOAD CART COUNT =================

fetch("/cart")
    .then(function(response) {
        return response.text();
    })
    .then(function(html) {

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        const cartItems =
            doc.querySelectorAll(".cart-item");

        const cartCount =
            document.getElementById("cartCount");

        if (cartCount) {
            cartCount.innerText = cartItems.length;
        }

    })
    .catch(function(error) {
        console.error("Cart count error:", error);
    });