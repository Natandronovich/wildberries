const openPopUpBtn = document.getElementById('open-modal-btn');
const popUp = document.getElementById('cart-modal');
const closePopUpBtn = document.getElementById('close-modal-btn');


// открыть модальное окно
openPopUpBtn.addEventListener('click', function(e){
    e.preventDefault();
    popUp.classList.add('open')
})

// закрыть модальное окно
closePopUpBtn.addEventListener('click', function(){
    popUp.classList.remove('open')
})

// закрыть модальное окно при нажатии на esc
window.addEventListener('keydown', (e) =>{
    if(e.key === 'Escape'){
        popUp.classList.remove('open')
    }
});

// закрыть модальное окно при клике вне него
document.querySelector('#cart-modal .cart-modal__box').addEventListener('click', event => {
    event._isClickWithInModal = true;
});
popUp.addEventListener('click', event => {
    if(event._isClickWithInModal) return
    event.currentTarget.classList.remove('open');
})


//корзина
let cart = {
    's1': {
        'name' : 'watch',
        'count' : 3,
    }, // уникальный номер товара id ? артикул??
    'a2': {
        'name' : 'airpods',
        'count' : 1,
    }, // уникальный номер товара id ? артикул??
    'b3': {
        'name' : 'watch',
        'count' : 2,
    },
}



document.onclick = (event) => {
    // console.log(event.target);
    if(event.target.classList.contains('cart-btn-plus')){
        // console.log(event.target.dataset.id);
        plusFunction(event.target.dataset.id);
    }else if(event.target.classList.contains('cart-btn-minus')){
        minusFunction(event.target.dataset.id);
    }
}

//увеличение количества товара
const plusFunction = (id) =>{
    cart[id]['count']++;
    renderCart();
}

//уменьшение количества товара
const minusFunction = (id) =>{
    if(cart[id]['count'] - 1 === 0){
        deleteFunction(id);
        return true;
    }
    cart[id]['count']--;
    renderCart();
}

// удаление товара (todo сдедать отдельно еще для кнопки delete)
const deleteFunction = (id) =>{
    delete cart[id]['count'];
    renderCart();
}

//отрисовка корзины надо придумать
const renderCart = (img, title, price, id) =>{
        return `
        <li class="cart-modal__item" data-id="${id}">
            <div class="cart-modal__item-img">
                <img src="${img}" alt=""></div>
            <div class="cart-modal__item-descr">
                <h3>${title}</h3>
            </div>
            <div class="cart-modal__item-control">
            <button class="cart-btn-plus" data-id="s1">+</button>
            <input class="cart-couter-input" value="1">
            <button class="cart-btn-minus" data-id="s1">-</button>
        </div>
        <div class="cart-modal__item-price">
            <p>${price} $</p>
            <button class="cart-btn-delete">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M15.4624 7.625H18.5249V9.375H17.1365L16.37 17.8063C16.3085 18.4824 15.7417 19 15.0629 19H8.86193C8.1831 19 7.61628 18.4824 7.55482 17.8063L6.78834 9.375H5.3999V7.625H8.4624V6.3125C8.4624 5.58763 9.05003 5 9.7749 5H14.1499C14.8748 5 15.4624 5.58763 15.4624 6.3125V7.625ZM10.2124 6.75V7.625H13.7124V6.75H10.2124ZM8.54556 9.375L9.26147 17.25H14.6633L15.3792 9.375H8.54556Z" fill="currentColor"></path></svg>
            </button>
        </div>
    </li>
    `;
    console.log(cart)
}
renderCart()


// const cartQuantity = cart.querySelector('.cart__quantity');
const fullPrice = document.querySelector('.cart-modal__full-price');
let price = 0;
