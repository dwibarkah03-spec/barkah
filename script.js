// Daftar produk dengan gambar
const products = [
    { id: 1, name: 'beng beng', price: 2000, img: 'img/beng beng.jpg' },
    { id: 2, name: 'boncabe', price: 1000, img: 'img/boncabe.jpg' },
    { id: 3, name: 'chocopie', price: 2000, img: 'img/chocopie.jpg' },
    { id: 4, name: 'maxicorn', price: 2000, img: 'img/maxicorn.jpg' },
    { id: 5, name: 'qtella', price: 2000, img: 'img/qtella.jpg' },
];

// Keranjang belanja
let cart = [];

// Fungsi untuk menampilkan daftar produk
function displayProducts() {
    const productsContainer = document.getElementById('products');

    // Kosongkan container dulu agar tidak dobel
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}" width="100">
            <h3>${product.name}</h3>
            <p>Rp ${product.price}</p>
            <button onclick="addToCart(${product.id})">
                Tambah ke Keranjang
            </button>
        `;

        productsContainer.appendChild(productDiv);
    });
}

// Fungsi untuk menambah produk ke keranjang belanja
function addToCart(productId) {

    // Cari produk berdasarkan ID
    const product = products.find(p => p.id === productId);

    // Jika produk tidak ditemukan
    if (!product) {
        alert('Produk tidak ditemukan');
        return;
    }

    // Cek apakah produk sudah ada di keranjang
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
}

// Fungsi untuk menampilkan isi keranjang belanja
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');

    // Kosongkan isi keranjang
    cartItemsContainer.innerHTML = '';

    let totalPrice = 0;

    cart.forEach(item => {
        const listItem = document.createElement('li');

        listItem.textContent =
            `${item.name} x ${item.quantity} - Rp ${item.price * item.quantity}`;

        cartItemsContainer.appendChild(listItem);

        totalPrice += item.price * item.quantity;
    });

    document.getElementById('total-price').textContent = totalPrice;
}

// Fungsi checkout
function checkout() {

    // Jika keranjang kosong
    if (cart.length === 0) {
        alert('Keranjang Anda kosong.');
        return;
    }

    // Hitung total belanja
    const total = cart.reduce(
        (sum, item) => sum + (item.price * item.quantity),
        0
    );

    // Input pembayaran
    const payment = parseInt(
        prompt(`Total belanja Anda: Rp ${total}\nMasukkan jumlah pembayaran:`)
    );

    // Validasi input
    if (isNaN(payment)) {
        alert('Masukkan angka yang valid.');
        return;
    }

    // Cek pembayaran
    if (payment >= total) {

        const change = payment - total;

        alert(`Pembayaran berhasil!\nKembalian Anda: Rp ${change}`);

        // Kosongkan keranjang
        cart = [];

        updateCart();

    } else {

        alert('Uang Anda tidak mencukupi.');

    }
}

// Event listener tombol checkout
document
    .getElementById('checkout-btn')
    .addEventListener('click', checkout);

// Tampilkan produk saat halaman dimuat
displayProducts();
