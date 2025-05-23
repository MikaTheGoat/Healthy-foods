const foodData = [
  {
    unhealthy: "Potato Chips",
    healthy: "Air-popped Popcorn",
    image: "https://images.unsplash.com/photo-1585238341989-002e25f8314f",
    nutrition: {
      Calories: "93 per 3 cups",
      Fat: "1.1g",
      Fiber: "3.6g",
      Protein: "3g"
    }
  },
  {
    unhealthy: "Soda",
    healthy: "Infused Sparkling Water",
    image: "https://images.unsplash.com/photo-1612198196792-6c60a2f69335",
    nutrition: {
      Calories: "0",
      Sugar: "0g",
      Sodium: "0mg",
      VitaminC: "5% DV"
    }
  },
  {
    unhealthy: "Ice Cream",
    healthy: "Frozen Greek Yogurt",
    image: "https://images.unsplash.com/photo-1615193981175-43bb40b33808",
    nutrition: {
      Calories: "100 per 1/2 cup",
      Fat: "2g",
      Protein: "6g",
      Sugar: "8g"
    }
  }
  // Add more as needed
];

const grid = document.getElementById('food-grid');
const search = document.getElementById('search');
const toggle = document.getElementById('toggle-theme');
const popup = document.getElementById('popup');
const popupTitle = document.getElementById('popup-title');
const popupUnhealthy = document.getElementById('popup-unhealthy');
const popupNutrition = document.getElementById('popup-nutrition');
const closePopup = document.getElementById('close-popup');

function renderCards(filter = "") {
  grid.innerHTML = "";
  foodData
    .filter(item => item.healthy.toLowerCase().includes(filter.toLowerCase()))
    .forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${item.image}" alt="${item.healthy}">
        <div class="card-content">
          <h3>${item.healthy}</h3>
          <p>Swap for <strong>${item.unhealthy}</strong></p>
        </div>
      `;
      card.onclick = () => showPopup(item);
      grid.appendChild(card);
    });
}

function showPopup(item) {
  popupTitle.textContent = item.healthy;
  popupUnhealthy.textContent = `Instead of: ${item.unhealthy}`;
  popupNutrition.innerHTML = "";
  Object.entries(item.nutrition).forEach(([key, value]) => {
    const li = document.createElement('li');
    li.textContent = `${key}: ${value}`;
    popupNutrition.appendChild(li);
  });
  popup.classList.remove('hidden');
}

search.addEventListener('input', e => {
  renderCards(e.target.value);
});

toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  toggle.textContent = document.body.classList.contains('dark') ? '☀️ Light Mode' : '🌙 Dark Mode';
});

closePopup.addEventListener('click', () => {
  popup.classList.add('hidden');
});

renderCards();
