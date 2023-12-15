const bestSellers = document.querySelectorAll('.best-sellers');

if (bestSellers.length) {

    // update cart count
    const updateCount = async () => {
        const cart = document.querySelector('.header__icon--cart');
        console.log('cart', cart)

        const res = await fetch('/cart');
        const html = await res.text();

        const newDom = new DOMParser().parseFromString(html, "text/html");

        cart.innerHTML = newDom.querySelector('.header__icon--cart').innerHTML;
    }

    // Add form
        document.querySelectorAll('form.best-item__form')?.forEach(form => {
            form.addEventListener('submit', event => {
                event.preventDefault();

                let formData = new FormData(event.target);

                fetch(window.Shopify.routes.root + 'cart/add.js', {
                    method: 'POST',
                    body: formData
                })
                .then(response => {
                    if (response.ok) {
                        updateCount();
                    }
                    return response.json();
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

            });
        });

    // Change variant
    document.querySelectorAll('form.best-item__form .select-variants')?.forEach(select => {
        select.addEventListener('change', event => {
            const selectedOption = event.target.options[event.target.selectedIndex];
            const price = selectedOption.dataset.price;
            const compareAtPrice = selectedOption.dataset.compareAtPrice;
            const productId = selectedOption.dataset.productId;
    
            const card = document.querySelector(`[data-product-id="${productId}"]`);

            if (card) {
                card.querySelector('.compare-at-price').textContent = compareAtPrice;
                card.querySelector('.price').textContent = price;
            }
        });
    });    
}