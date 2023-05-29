const openPopUpBtn = document.getElementById('open-modal-btn');
const popUp = document.getElementById('cart-modal');
const closePopUpBtn = document.getElementById('close-modal-btn');

// открыть модальное окно
openPopUpBtn.addEventListener('click', openPopUp)
function openPopUp(e){
    e.preventDefault();
    popUp.classList.add('open')
}

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


//функции корзины
const cartList = document.querySelector('.cart-modal__list');
const cart = document.querySelector('.cart-modal');
const cartCounter = document.querySelector('.cart__counter');
const deleteAllBtn = document.querySelector('.btn-clear-all');
const fullPrice = document.querySelector('.cart-modal__full-price');
let price = 0;


// //переводить число в строку удаляя пробелы и знаки валюты
const priceWithoutSpaces = (str) => {
	return str.replace(/\D/g,'');
};

//отрисовка корзины
const renderCart = (img, title, price, id) =>{
    return `
    <li class="cart-modal__item" data-id="${id}">
        <div class="cart-modal__item-img">
            <img src="${img}" alt=""></div>
        <div class="cart-modal__item-descr">
            <h3>${title}</h3>
        </div>
        <div class="cart-modal__item-counters">
            <button class="cart-btn-plus" data-id="${id}">+</button>
            <input class="cart-counter-input" type=""text" value="1" disabled>
            <button class="cart-btn-minus" data-id="${id}">-</button>
        </div>
        <div class="cart-modal__item-price">
            <p >${price} $</p>
            <button class="cart-btn-delete">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M15.4624 7.625H18.5249V9.375H17.1365L16.37 17.8063C16.3085 18.4824 15.7417 19 15.0629 19H8.86193C8.1831 19 7.61628 18.4824 7.55482 17.8063L6.78834 9.375H5.3999V7.625H8.4624V6.3125C8.4624 5.58763 9.05003 5 9.7749 5H14.1499C14.8748 5 15.4624 5.58763 15.4624 6.3125V7.625ZM10.2124 6.75V7.625H13.7124V6.75H10.2124ZM8.54556 9.375L9.26147 17.25H14.6633L15.3792 9.375H8.54556Z" fill="currentColor"></path></svg>
            </button>
        </div>
    </li>`;
}


//нажимая на card-кнопку передаем нужные для добавления в корзину и ее отрисовки
function init(){
    const productsBtn = document.querySelectorAll('.btnBuy');

    productsBtn.forEach(el => {
        el.addEventListener('click', (e) => {
            let self = e.currentTarget;
            let parent = self.closest('.product');
            let id = parent.dataset.id;
            console.log(id)
            let img = parent.querySelector('img').getAttribute('src');
            let title = parent.querySelector('.card-name').textContent;
            let priceNumber = +priceWithoutSpaces(parent.querySelector('.product-price').textContent);
    
            plusFullPrice(priceNumber);
            printFullPrice();
            //копипуем данные с card в cart
            cartList.insertAdjacentHTML('afterbegin', renderCart(img, title, priceNumber, id));
            printCounter();
    
            // addStoreElement(id)
            updateStorage();
    
            self.disabled = true;
        });
    });
    
}

setTimeout(init, 2000);

//суммировать общую цену
function plusFullPrice(currentPrice){
    return price +=currentPrice;
}

//вычитать из общей суммы
function minusFullPrice(currentPrice){
    return price -=currentPrice;
}

//функция выводящая общ сумму на страницу
function printFullPrice(){
    fullPrice.textContent = `Итого: ${price} $`
}

// счетчик сверху у кнопки корзины
function printCounter(){
    let productsListLength = cartList.children.length;
    cartCounter.textContent = productsListLength;
}

//удаление
cartList.addEventListener('click', (e) => {
    let deleteBtn = e.target.parentNode;
    if(deleteBtn.classList.contains('cart-btn-delete')){
        deleteProduct(deleteBtn.closest('.cart-modal__item'));
    }
});

function deleteProduct(productParent) {

    let id = productParent.dataset.id;
    // console.log(id)
    document.querySelector(`.product[data-id="${id}"]`).querySelector('.btnBuy').disabled = false;

    let currentPrice = +priceWithoutSpaces(productParent.querySelector('.cart-modal__item-price').textContent);
	minusFullPrice(currentPrice);
    printFullPrice();
	productParent.remove();

	printCounter();

    updateStorage();
}


//localStorage
function initState(){
    if(localStorage.getItem('products') !== null){
        // console.log(localStorage.getItem('products'));
        cartList.innerHTML = localStorage.getItem('products');
        printCounter();
        countSum();
        printFullPrice();

        // оставляем кнопки товаров из корзины неактивными после обновления
        document.querySelectorAll('.cart-modal__item').forEach(el => {
            let id = el.dataset.id;
            console.log(id);
            // document.querySelector(`.product[data-id="${id}"]`).querySelector('.btnBuy').disabled = true;
        });
    }
}
initState()

//добавить или удалить из localStorage
function updateStorage(){
    let parent = cartList;
    let html = parent.innerHTML;
    html = html.trim();  // чтобы удалить пробелы
    // console.log(html);
    // console.log(html.length);
    if(html.length){
        localStorage.setItem('products', html);
    }else{
        localStorage.removeItem('products');
    }
}

//считает сумму после localStorage
function countSum() {
    document.querySelectorAll('.cart-modal__item-price').forEach(el => {
        price += +priceWithoutSpaces(el.textContent);
    });
};


// удалить всё
deleteAllBtn.addEventListener('click', ()=> {
    while (cartList.firstChild) {
        cartList.removeChild(cartList.firstChild);
    }
    localStorage.clear()
    console.log('hi');
    fullPrice.textContent = `Итого: 0 $`
    printCounter();

    document.querySelector('.btnBuy').disabled = false;
});


