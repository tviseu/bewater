// Cart functionality
let cart = [];
const cartCount = document.querySelector('.cart-count');
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartToggle = document.getElementById('cart-toggle');
const closeCart = document.getElementById('close-cart');
const checkoutBtn = document.getElementById('checkout-btn');
const paymentModal = document.getElementById('payment-modal');
const closePayment = document.getElementById('close-payment');
const creditCardBtn = document.getElementById('credit-card-btn');
const mbwayBtn = document.getElementById('mbway-btn');

// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    const product = getProductById(productId);
    addToCart(product);
    updateCartDisplay();
    showCartNotification();
  });
});

// Get product by ID
function getProductById(id) {
  const products = {
    1: { id: 1, name: 'BE WATER Training Gloves', price: 49.99 },
    2: { id: 2, name: 'BE WATER Performance Shirt', price: 29.99 },
    3: { id: 3, name: 'BE WATER Gym Bag', price: 39.99 }
  };
  return products[id];
}

// Add item to cart
function addToCart(product) {
  const existingItem = cart.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCartCount();
}

// Update cart count
function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
}

// Update cart display
function updateCartDisplay() {
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    cartItems.innerHTML += `
      <div class="cart-item">
        <div class="cart-item__details">
          <h4>${item.name}</h4>
          <div class="cart-item__price">€${item.price.toFixed(2)}</div>
        </div>
        <div class="cart-item__quantity">
          <button class="quantity-btn" data-id="${item.id}" data-action="decrease">-</button>
          <span>${item.quantity}</span>
          <button class="quantity-btn" data-id="${item.id}" data-action="increase">+</button>
        </div>
      </div>
    `;
  });

  cartTotal.textContent = `€${total.toFixed(2)}`;
}

// Show cart notification
function showCartNotification() {
  cartCount.classList.add('cart-count--active');
  setTimeout(() => {
    cartCount.classList.remove('cart-count--active');
  }, 1000);
}

// Cart modal functionality
cartToggle.addEventListener('click', (e) => {
  e.preventDefault();
  cartModal.classList.add('modal--active');
});

closeCart.addEventListener('click', () => {
  cartModal.classList.remove('modal--active');
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === cartModal) {
    cartModal.classList.remove('modal--active');
  }
  if (e.target === paymentModal) {
    paymentModal.classList.remove('modal--active');
  }
});

// Quantity buttons
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('quantity-btn')) {
    const id = parseInt(e.target.dataset.id);
    const action = e.target.dataset.action;
    updateQuantity(id, action);
  }
});

// Update quantity
function updateQuantity(id, action) {
  const item = cart.find(item => item.id === id);
  if (item) {
    if (action === 'increase') {
      item.quantity += 1;
    } else if (action === 'decrease' && item.quantity > 1) {
      item.quantity -= 1;
    }
    updateCartCount();
    updateCartDisplay();
  }
}

// Checkout functionality
checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('O teu carrinho está vazio!');
    return;
  }
  cartModal.classList.remove('modal--active');
  paymentModal.classList.add('modal--active');
});

// Payment modal functionality
closePayment.addEventListener('click', () => {
  paymentModal.classList.remove('modal--active');
});

// Payment method selection
creditCardBtn.addEventListener('click', () => {
  const creditCardSection = document.getElementById('credit-card-section');
  const mbwaySection = document.getElementById('mbway-section');
  
  creditCardSection.style.display = 'block';
  mbwaySection.style.display = 'none';
  
  creditCardBtn.classList.add('payment-btn--active');
  mbwayBtn.classList.remove('payment-btn--active');
});

mbwayBtn.addEventListener('click', () => {
  const creditCardSection = document.getElementById('credit-card-section');
  const mbwaySection = document.getElementById('mbway-section');
  
  creditCardSection.style.display = 'none';
  mbwaySection.style.display = 'block';
  
  mbwayBtn.classList.add('payment-btn--active');
  creditCardBtn.classList.remove('payment-btn--active');
}); 