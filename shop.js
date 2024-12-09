// Ripple Effect for Buttons
const elements = document.querySelectorAll('.ripple-effect');

for (let i = 0; i < elements.length; i++) {
  elements[i].addEventListener('click', function (e) {
    e.preventDefault(); // Correct usage of preventDefault
    const elm = document.querySelector('.wrapper');

    if (!elm.classList.contains('marked')) {
      elm.classList.add('marked');
    }

    elm.classList.remove('active');
    void elm.offsetWidth; // Trigger reflow to reapply animation
    elm.classList.add('active');
  });
}

// Cart Functionality
const cartItems = []; // Cart items array

// Function to render cart items in the sidebar
function renderCartItems() {
  const cartItemsList = document.getElementById('cart-items-list');
  const emptyCartMessage = document.getElementById('empty-cart-message');

  cartItemsList.innerHTML = '';

  if (cartItems.length === 0) {
    emptyCartMessage.style.display = 'block';
  } else {
    emptyCartMessage.style.display = 'none';

    cartItems.forEach((item, index) => {
      const listItem = document.createElement('li');
      listItem.className = 'cart-item';
      listItem.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <div class="cart-item-details">
          <p class="cart-item-title">${item.title}</p>
          <p class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
          <div class="quantity-control">
            <button onclick="updateQuantity(${index}, -1)">-</button>
            <input type="text" value="${item.quantity}" readonly>
            <button onclick="updateQuantity(${index}, 1)">+</button>
          </div>
        </div>
      `;
      cartItemsList.appendChild(listItem);
    });
  }

  updateCartCount();
  calculateTotal();
}

// Update cart count displayed on the wrapper
function updateCartCount() {
  const cartCountElement = document.querySelector('.cart-count');
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  if (totalItems > 0) {
    cartCountElement.textContent = totalItems;
    cartCountElement.style.display = 'flex';
  } else {
    cartCountElement.style.display = 'none';
  }
}

// Calculate the total amount
function calculateTotal() {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  document.querySelector('.total-amount strong').innerText = `$${total.toFixed(2)}`;
}

// Add product to cart
function addToCart(product) {
  const existingItemIndex = cartItems.findIndex(
    (item) => item.title === product.title
  );

  if (existingItemIndex >= 0) {
    cartItems[existingItemIndex].quantity += 1;
  } else {
    cartItems.push({ ...product, quantity: 1 });
  }

  renderCartItems();
  saveCartToLocalStorage();
}

// Update product quantity
function updateQuantity(index, change) {
  const item = cartItems[index];
  item.quantity += change;

  if (item.quantity < 1) {
    cartItems.splice(index, 1);
  }

  renderCartItems();
  saveCartToLocalStorage();
}

// Sidebar toggle functionality
document.querySelector('.shop').addEventListener('click', function () {
  document.querySelector('.cart-sidebar').classList.toggle('open');
});
document.querySelector('.close-cart').addEventListener('click', function () {
  document.querySelector('.cart-sidebar').classList.remove('open');
});
document.querySelector('.close-cart-footer').addEventListener('click', function () {
  document.querySelector('.cart-sidebar').classList.remove('open');
});

// Event listeners for "Add to Cart" buttons
document.querySelectorAll('.card .btn').forEach((button) => {
  button.addEventListener('click', function () {
    const product = {
      image: button.closest('.card').querySelector('img').src,
      title: button.closest('.card').querySelector('.card-title').innerText,
      price: parseFloat(
        button
          .closest('.card')
          .querySelector('.card-text')
          .innerText.replace('$', '')
      ),
    };

    addToCart(product);
  });
});

// Save cart to localStorage
function saveCartToLocalStorage() {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Load cart from localStorage
function loadCartFromLocalStorage() {
  const savedCart = localStorage.getItem('cartItems');
  if (savedCart) {
    const parsedCart = JSON.parse(savedCart);
    cartItems.push(...parsedCart);
    renderCartItems();
  }
}

// Load cart on page load
window.onload = loadCartFromLocalStorage;

 // Add SweetAlert functionality
 document.querySelector('.checkout-btn').addEventListener('click', () => {
  Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to proceed to checkout?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, proceed!',
      cancelButtonText: 'Cancel'
  }).then((result) => {
      if (result.isConfirmed) {
          Swal.fire(
              'Success!',
              'Your Product Has Been Placed.',
              'success'
          );
          // Redirect logic can go here
          // window.location.href = "checkout.html";
      }
  });
});
