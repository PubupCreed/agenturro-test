const bestSellers = document.querySelectorAll('.best-sellers');

if (bestSellers.length) {

    // update cart count
    const updateCount = async () => {
        const cart = document.querySelector('.header__icon--cart');

        const res = await fetch('/cart');
        const html = await res.text();

        const newDom = new DOMParser().parseFromString(html, "text/html");

        cart.innerHTML = newDom.querySelector('.header__icon--cart').innerHTML;
    }

    // Add form
        document.querySelectorAll('form.best-item__form')?.forEach(form => {
            form.addEventListener('submit', event => {
                event.preventDefault();
                const target = event.target;

                let formData = new FormData(target);

                fetch(window.Shopify.routes.root + 'cart/add.js', {
                    method: 'POST',
                    body: formData
                })
                .then(response => {
                    if (response.ok) {
                        updateCount();


                        const btn = form.querySelector('[type="submit"]');
                        const addToCartTxt = btn.value;
                        const addedBtnTxt = btn.dataset.addedProduct;
                        btn.value = addedBtnTxt;

                        setTimeout(() => btn.value = addToCartTxt, 2000);
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