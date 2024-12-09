// Set today's date as the minimum date
document.addEventListener('DOMContentLoaded', function () {
  const dateInput = document.getElementById('date');
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
});

// Form submission
document.getElementById('reservationForm').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Thank you for your reservation! We will confirm your booking shortly.');
  this.reset();
});

// Fade-in animation for menu items
function fadeInElements() {
  const elements = document.querySelectorAll('.fade-in');
  elements.forEach((element, index) => {
      setTimeout(() => {
          element.style.opacity = '1';
      }, index * 200);
  });
}

// Call fadeInElements when the page loads and when scrolling
window.addEventListener('load', fadeInElements);
window.addEventListener('scroll', fadeInElements);
