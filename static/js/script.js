// ================= SEARCH =================

function openSearch() {

    document
        .getElementById("searchOverlay")
        .classList.add("show");

    document
        .getElementById("searchInput")
        .focus();
}


function closeSearch() {

    document
        .getElementById("searchOverlay")
        .classList.remove("show");
}


function searchProducts() {

    const input =
        document.getElementById("searchInput").value.trim();

    if (input === "") {

        alert("Please enter a product name.");

        return;
    }

    alert("Searching for: " + input);
}


// ================= CART =================

function addToCart(productName) {

    alert(productName + " added to cart! 🛒");
}


// ================= MOBILE MENU =================

function toggleMenu() {

    const nav =
        document.querySelector(".nav-links");

    if (nav.style.display === "flex") {

        nav.style.display = "none";

    } else {

        nav.style.display = "flex";

        nav.style.flexDirection = "column";

        nav.style.position = "absolute";

        nav.style.top = "78px";

        nav.style.left = "0";

        nav.style.width = "100%";

        nav.style.padding = "25px";

        nav.style.background = "white";

        nav.style.boxShadow =
            "0 10px 20px rgba(0,0,0,0.08)";
    }
}


// ================= CLOSE SEARCH =================

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeSearch();

    }

});