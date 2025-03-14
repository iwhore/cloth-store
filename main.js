document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.querySelector(".cart-items");
    const subtotalEl = document.getElementById("subtotal");
    const discountEl = document.getElementById("discount");
    const deliveryEl = document.getElementById("delivery");
    const totalEl = document.getElementById("total");
    const deliveryFee = 15;
    const discountRate = 0.2;
  
    let cart = JSON.parse(localStorage.getItem("cart")) || []; // Завантажуємо товари з localStorage
  
    // Функція для створення елемента товару
    function createCartItem(item, index) {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.dataset.price = item.price;
  
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="item-img" />
        <div class="item-details">
          <h3>${item.name}</h3>
          <p>Розмір: ${item.size}</p>
          <p>Колір: ${item.color}</p>
          <p class="item-price">${item.price}₴</p>
        </div>
        <div class="quantity-controls">
          <button class="decrease-btn">-</button>
          <span class="quantity">${item.quantity}</span>
          <button class="increase-btn">+</button>
        </div>
        <button class="delete-btn" data-index="${index}">🗑</button>
      `;
  
      // Додаємо функціонал кнопок
      const decreaseBtn = cartItem.querySelector(".decrease-btn");
      const increaseBtn = cartItem.querySelector(".increase-btn");
      const deleteBtn = cartItem.querySelector(".delete-btn");
      const quantityEl = cartItem.querySelector(".quantity");
  
      decreaseBtn.addEventListener("click", () => {
        let quantity = parseInt(quantityEl.textContent);
        if (quantity > 1) {
          quantityEl.textContent = --quantity;
          item.quantity = quantity; // Оновлюємо кількість у масиві
          updateLocalStorage();
          updateCart();
        }
      });

      
  
      increaseBtn.addEventListener("click", () => {
        let quantity = parseInt(quantityEl.textContent);
        quantityEl.textContent = ++quantity;
        item.quantity = quantity; // Оновлюємо кількість у масиві
        updateLocalStorage();
        updateCart();
      });
  
      deleteBtn.addEventListener("click", () => {
        cart.splice(index, 1); // Видаляємо товар із масиву
        updateLocalStorage();
        cartItem.remove();
        updateCart();
      });
  
      return cartItem;
    }
  
    // Функція оновлення localStorage
    function updateLocalStorage() {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  
    // Функція для оновлення кошика
    function updateCart() {
      let subtotal = 0;
      cartContainer.innerHTML = ""; // Очищаємо контейнер
  
      cart.forEach((item, index) => {
        subtotal += item.price * item.quantity;
        const cartItem = createCartItem(item, index);
        cartContainer.appendChild(cartItem);
      });
  
      const discount = subtotal * discountRate;
      const total = subtotal - discount + deliveryFee;
  
      // Оновлюємо значення у HTML
      subtotalEl.textContent = `${subtotal}₴`;
      discountEl.textContent = `- ${discount.toFixed(2)}₴`;
      deliveryEl.textContent = `${deliveryFee}₴`;
      totalEl.textContent = `${total.toFixed(2)}₴`;
    }
  
    updateCart(); // Ініціалізація кошика при завантаженні сторінки
  });