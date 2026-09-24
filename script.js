const products = [

    {
        id: 1,
        name: "HyperX Cloud III Gaming Headset",
        category: "Headsets",
        price: 89.99,
        oldPrice: 119.99,
        rating: 4.9,
        reviews: 428,
        image: "https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=900&q=90"
    },

    {
        id: 2,
        name: "Wireless Pro Gaming Mouse",
        category: "Mice",
        price: 59.99,
        oldPrice: 79.99,
        rating: 4.8,
        reviews: 312,
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=90"
    },

    {
        id: 3,
        name: "Mechanical RGB Gaming Keyboard",
        category: "Keyboards",
        price: 99.99,
        oldPrice: 129.99,
        rating: 4.9,
        reviews: 517,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=90"
    },

    {
        id: 4,
        name: "27-inch 240Hz Gaming Monitor",
        category: "Monitors",
        price: 349.99,
        oldPrice: 449.99,
        rating: 4.8,
        reviews: 219,
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=90"
    },

    {
        id: 5,
        name: "RTX Gaming Graphics Card",
        category: "GPU",
        price: 699.99,
        oldPrice: 799.99,
        rating: 4.9,
        reviews: 182,
        image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=900&q=90"
    },

    {
        id: 6,
        name: "Ultra Lightweight Gaming Mouse",
        category: "Mice",
        price: 69.99,
        oldPrice: 89.99,
        rating: 4.7,
        reviews: 144,
        image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=900&q=90"
    },

    {
        id: 7,
        name: "Premium Wireless Gaming Headset",
        category: "Headsets",
        price: 129.99,
        oldPrice: 159.99,
        rating: 4.9,
        reviews: 376,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=90"
    },

    {
        id: 8,
        name: "Performance Mechanical Keyboard",
        category: "Keyboards",
        price: 119.99,
        oldPrice: 149.99,
        rating: 4.8,
        reviews: 268,
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=900&q=90"
    },

    {
        id: 9,
        name: "Curved 32-inch Gaming Monitor",
        category: "Monitors",
        price: 499.99,
        oldPrice: 599.99,
        rating: 4.9,
        reviews: 154,
        image: "https://images.unsplash.com/photo-1616763355548-1b606f439f86?auto=format&fit=crop&w=900&q=90"
    },

    {
        id: 10,
        name: "Pro Wireless Gaming Controller",
        category: "Mice",
        price: 74.99,
        oldPrice: 99.99,
        rating: 4.7,
        reviews: 198,
        image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=900&q=90"
    },

    {
        id: 11,
        name: "High Performance Gaming Headset",
        category: "Headsets",
        price: 109.99,
        oldPrice: 139.99,
        rating: 4.8,
        reviews: 245,
        image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=900&q=90"
    },

    {
        id: 12,
        name: "RGB Tournament Gaming Keyboard",
        category: "Keyboards",
        price: 139.99,
        oldPrice: 179.99,
        rating: 4.9,
        reviews: 334,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=90"
    }

];


let cart = JSON.parse(localStorage.getItem("nexoraCart")) || [];

let currentFilter = "All";


/* ================= ELEMENTS ================= */

const productsGrid = document.getElementById("productsGrid");

const cartBtn = document.getElementById("cartBtn");
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

const toast = document.getElementById("toast");

const searchBtn = document.getElementById("searchBtn");
const searchOverlay = document.getElementById("searchOverlay");
const closeSearch = document.getElementById("closeSearch");
const searchInput = document.getElementById("searchInput");

const filters = document.querySelectorAll(".filter");

const newsletterForm =
    document.getElementById("newsletterForm");


/* ================= PRODUCTS ================= */

function renderProducts(list = products) {

    productsGrid.innerHTML = "";

    if (list.length === 0) {

        productsGrid.innerHTML = `
            <div style="
                grid-column:1/-1;
                padding:80px;
                text-align:center;
                color:#777;
            ">
                <h2>No products found</h2>
                <p>Try another search.</p>
            </div>
        `;

        return;
    }


    list.forEach(product => {

        const card = document.createElement("article");

        card.className = "product";

        card.innerHTML = `

            <div class="product-image">

                ${
                    product.oldPrice
                    ?
                    `<span class="sale-badge">SALE</span>`
                    :
                    ""
                }

                <button
                    class="wishlist-btn"
                    onclick="addWishlist(${product.id})"
                >
                    ♡
                </button>

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >

            </div>


            <div class="product-info">

                <div class="product-category">
                    ${product.category}
                </div>

                <h3>
                    ${product.name}
                </h3>

                <div class="rating">

                    <span class="stars">
                        ${getStars(product.rating)}
                    </span>

                    <span>
                        (${product.reviews})
                    </span>

                </div>

                <div class="price-row">

                    <strong class="price">
                        €${product.price.toFixed(2)}
                    </strong>

                    <span class="old-price">
                        €${product.oldPrice.toFixed(2)}
                    </span>

                </div>

                <button
                    class="add-cart"
                    onclick="addToCart(${product.id})"
                >
                    ADD TO CART →
                </button>

            </div>
        `;

        productsGrid.appendChild(card);

    });
}


/* ================= STARS ================= */

function getStars(rating) {

    const fullStars = Math.floor(rating);

    let stars = "";

    for (let i = 0; i < fullStars; i++) {
        stars += "★";
    }

    return stars;
}


/* ================= CART ================= */

function addToCart(id) {

    const product = products.find(
        product => product.id === id
    );

    if (!product) return;


    const existing = cart.find(
        item => item.id === id
    );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }


    saveCart();

    renderCart();

    showToast(
        `${product.name} added to cart`
    );
}


function removeFromCart(id) {

    cart = cart.filter(
        item => item.id !== id
    );

    saveCart();

    renderCart();
}


function changeQuantity(id, change) {

    const item = cart.find(
        item => item.id === id
    );

    if (!item) return;


    item.quantity += change;


    if (item.quantity <= 0) {

        removeFromCart(id);

        return;
    }


    saveCart();

    renderCart();
}


function saveCart() {

    localStorage.setItem(
        "nexoraCart",
        JSON.stringify(cart)
    );

}


/* ================= RENDER CART ================= */

function renderCart() {

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <div>
                    <div style="font-size:40px;margin-bottom:15px;">
                        🛒
                    </div>

                    <h3>Your cart is empty</h3>

                    <p style="color:#666;margin-top:8px;">
                        Add something awesome.
                    </p>
                </div>
            </div>
        `;

        cartTotal.textContent = "€0.00";

        updateCartCount();

        return;
    }


    let total = 0;


    cart.forEach(item => {

        total += item.price * item.quantity;


        const element = document.createElement("div");

        element.className = "cart-item";


        element.innerHTML = `

            <div class="cart-item-image">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

            </div>


            <div class="cart-item-info">

                <h4>
                    ${item.name}
                </h4>

                <div class="cart-item-price">
                    €${item.price.toFixed(2)}
                </div>


                <div class="quantity-controls">

                    <button
                        onclick="changeQuantity(${item.id}, -1)"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(${item.id}, 1)"
                    >
                        +
                    </button>

                </div>


                <button
                    class="remove-item"
                    onclick="removeFromCart(${item.id})"
                >
                    REMOVE
                </button>

            </div>

        `;


        cartItems.appendChild(element);

    });


    cartTotal.textContent =
        `€${total.toFixed(2)}`;


    updateCartCount();
}


/* ================= CART COUNT ================= */

function updateCartCount() {

    const count = cart.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );


    document.querySelector(
        ".cart-count"
    ).textContent = count;
}


/* ================= CART OPEN ================= */

function openCart() {

    cartSidebar.classList.add("active");

    cartOverlay.classList.add("active");

    document.body.style.overflow = "hidden";
}


function closeCartMenu() {

    cartSidebar.classList.remove("active");

    cartOverlay.classList.remove("active");

    document.body.style.overflow = "";
}


cartBtn.addEventListener(
    "click",
    openCart
);

closeCart.addEventListener(
    "click",
    closeCartMenu
);

cartOverlay.addEventListener(
    "click",
    closeCartMenu
);


/* ================= FILTER ================= */

filters.forEach(filter => {

    filter.addEventListener(
        "click",
        () => {

            filters.forEach(
                item =>
                    item.classList.remove("active")
            );

            filter.classList.add("active");


            currentFilter =
                filter.dataset.filter;


            if (currentFilter === "All") {

                renderProducts(products);

            } else {

                const filtered =
                    products.filter(
                        product =>
                            product.category ===
                            currentFilter
                    );

                renderProducts(filtered);
            }

        }
    );

});


/* ================= CATEGORY CLICK ================= */

document.querySelectorAll(
    ".category-card"
).forEach(card => {

    card.addEventListener(
        "click",
        () => {

            const category =
                card.dataset.category;


            filters.forEach(
                filter =>
                    filter.classList.remove("active")
            );


            const matching =
                [...filters].find(
                    filter =>
                        filter.dataset.filter ===
                        category
                );


            if (matching) {

                matching.classList.add("active");

                currentFilter = category;

                renderProducts(
                    products.filter(
                        product =>
                            product.category ===
                            category
                    )
                );

            }


            document.getElementById(
                "shop"
            ).scrollIntoView({
                behavior: "smooth"
            });

        }
    );

});


/* ================= SEARCH ================= */

searchBtn.addEventListener(
    "click",
    () => {

        searchOverlay.classList.add("active");

        searchInput.focus();

        document.body.style.overflow = "hidden";

    }
);


closeSearch.addEventListener(
    "click",
    closeSearchMenu
);


function closeSearchMenu() {

    searchOverlay.classList.remove("active");

    document.body.style.overflow = "";

    searchInput.value = "";

    renderProducts(products);
}


searchInput.addEventListener(
    "input",
    () => {

        const value =
            searchInput.value
                .toLowerCase()
                .trim();


        if (!value) {

            renderProducts(products);

            return;
        }


        const results =
            products.filter(
                product =>
                    product.name
                        .toLowerCase()
                        .includes(value)
                    ||
                    product.category
                        .toLowerCase()
                        .includes(value)
            );


        renderProducts(results);

    }
);


/* ================= WISHLIST ================= */

function addWishlist(id) {

    const product =
        products.find(
            product =>
                product.id === id
        );


    if (!product) return;


    showToast(
        `${product.name} added to wishlist`
    );
}


/* ================= TOAST ================= */

let toastTimeout;


function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");


    clearTimeout(toastTimeout);


    toastTimeout =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2500
        );
}


/* ================= CHECKOUT ================= */

document.getElementById(
    "checkoutBtn"
).addEventListener(
    "click",
    () => {

        if (cart.length === 0) {

            showToast(
                "Your cart is empty."
            );

            return;
        }


        showToast(
            "Checkout system coming soon."
        );

    }
);


/* ================= DEAL ================= */

document.getElementById(
    "dealBtn"
).addEventListener(
    "click",
    () => {

        document.getElementById(
            "shop"
        ).scrollIntoView({
            behavior: "smooth"
        });

        showToast(
            "Showing today's deals."
        );

    }
);


/* ================= COUNTDOWN ================= */

const countdownEnd =
    new Date().getTime()
    +
    (
        2 *
        24 *
        60 *
        60 *
        1000
    );


function updateCountdown() {

    const now =
        new Date().getTime();


    const difference =
        countdownEnd - now;


    if (difference <= 0) {

        return;
    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (
                difference %
                (1000 * 60 * 60 * 24)
            )
            /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (
                difference %
                (1000 * 60 * 60)
            )
            /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (
                difference %
                (1000 * 60)
            )
            /
            1000
        );


    document.getElementById(
        "days"
    ).textContent =
        String(days).padStart(2, "0");


    document.getElementById(
        "hours"
    ).textContent =
        String(hours).padStart(2, "0");


    document.getElementById(
        "minutes"
    ).textContent =
        String(minutes).padStart(2, "0");


    document.getElementById(
        "seconds"
    ).textContent =
        String(seconds).padStart(2, "0");

}


setInterval(
    updateCountdown,
    1000
);

updateCountdown();


/* ================= NEWSLETTER ================= */

newsletterForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        showToast(
            "You're on the list 🔥"
        );

        newsletterForm.reset();

    }
);


/* ================= VIEW ALL ================= */

document.getElementById(
    "viewAll"
).addEventListener(
    "click",
    () => {

        filters.forEach(
            filter =>
                filter.classList.remove("active")
        );

        filters[0].classList.add("active");

        currentFilter = "All";

        renderProducts(products);

        document.getElementById(
            "shop"
        ).scrollIntoView({
            behavior: "smooth"
        });

    }
);


/* ================= INITIALIZE ================= */

renderProducts();

renderCart();