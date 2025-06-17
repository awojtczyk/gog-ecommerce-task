document.addEventListener('DOMContentLoaded', () => {
  const cartButton = document.querySelector('.page-header__cart-button');
  const cartDropdown = document.querySelector('.cart-dropdown');
  const clearCartButton = document.querySelector('.cart-dropdown__clear-button');
  const removeButtons = document.querySelectorAll('.cart-dropdown__remove-button');

  cartDropdown.style.display = 'none';

  cartButton.addEventListener('click', (e) => {
    e.stopPropagation();
    cartDropdown.style.display = cartDropdown.style.display === 'none' ? 'block' : 'none';
  });

  document.addEventListener('click', (e) => {
    if (!cartDropdown.contains(e.target) && !cartButton.contains(e.target)) {
      cartDropdown.style.display = 'none';
    }
  });

  clearCartButton.addEventListener('click', () => {
    console.log('Clear cart clicked');
  });

  removeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const product = e.target.closest('.cart-dropdown__product');
      console.log('Remove product clicked', product);
    });
  });
});
