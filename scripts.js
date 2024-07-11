document.addEventListener('DOMContentLoaded', function() {
    const productContainer = document.getElementById('productContainer');
    const sortSelect = document.getElementById('sort');
    const filterCheckboxes = document.querySelectorAll('.filter-checkbox');

    sortSelect.addEventListener('change', function() {
        const sortValue = this.value;
        sortProducts(sortValue);
    });

    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            filterProducts();
        });
    });

    function sortProducts(sortValue) {
        let products = Array.from(productContainer.children);
        products.sort((a, b) => {
            if (sortValue === 'price-asc') {
                return parseFloat(a.querySelector('.price').innerText.slice(1)) - parseFloat(b.querySelector('.price').innerText.slice(1));
            } else if (sortValue === 'price-desc') {
                return parseFloat(b.querySelector('.price').innerText.slice(1)) - parseFloat(a.querySelector('.price').innerText.slice(1));
            } else if (sortValue === 'name-asc') {
                return a.querySelector('h3').innerText.localeCompare(b.querySelector('h3').innerText);
            } else if (sortValue === 'name-desc') {
                return b.querySelector('h3').innerText.localeCompare(a.querySelector('h3').innerText);
            }
        });
        products.forEach(product => productContainer.appendChild(product));
    }

    function filterProducts() {
        const selectedCategories = Array.from(filterCheckboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
        let products = Array.from(productContainer.children);
        products.forEach(product => {
            if (selectedCategories.length === 0 || selectedCategories.includes(product.getAttribute('data-category'))) {
                product.style.display = '';
            } else {
                product.style.display = 'none';
            }
        });
    }
});
