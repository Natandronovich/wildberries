import data from './data.js';

const cardRoot = document.getElementById("card-root")

var cardsStore = []

fetch("https://64675bd9ba7110b663b6500e.mockapi.io/products")
    .then((response) => {
        if(response.status === 200) {
            return response.json();
        }else{
            throw Error(response);
        }
    })
    .then((json) =>{  
        cardsStore = json
        createCards(cardsStore)
    })
    .catch((error) => {
        alert(error)
    })


function createCards(elements){
    const list = document.createElement("div");
    list.classList.add("products");
    for(let product of Object.entries(elements)){
        var element = product[1]
        createCard(element,list)
    }
    cardRoot.appendChild(list)
}

function createCard(product,list){
    const item = document.createElement("div");
    item.classList.add("product");
    item.innerHTML = `
    <div class="cards-wrapper" key=${product.id}>
        <p class="card-name">${product.name}</p>
        <div class="card-view">
            <img src=${product.images} alt=${product.name} />
            <button id="btn-view-card" class="btnhide">Быстрый просмотр</button>
        </div>
        <div class="card-info">            
            <p>$${product.price}</p>
            <button>Buy</button>
        </div>
    </div>
    `;

    
   list.append(item)
   
}

function fastView(){ 
    let btnViewFast = document.querySelectorAll('div.cards-wrapper')
    for(var i = 0; i < btnViewFast.length; i++) {
        btnViewFast[i].addEventListener("mouseenter",showinfo)
        btnViewFast[i].addEventListener("mouseleave",hideinfo)
      }

}

function showinfo(event){
    const value = event.target
    const btnView = value.querySelector('#btn-view-card')
    btnView.classList.remove("btnhide")
    btnView.classList.add("btnshow")
    btnView.addEventListener("click",modalView)
    console.log("hi")
    
}
function hideinfo(event){
    const value = event.target
    const btnView = value.querySelector('#btn-view-card')
    btnView.classList.remove("btnshow")
    btnView.classList.add("btnhide")
}

function modalView(event){
    const value = event.target
    const product =  value.parentNode.parentNode.parentNode.parentNode;
    const productId = value.parentNode.parentNode;
    const item = document.createElement("div");
    item.classList.add("chil");
    const key = productId.getAttribute('key')
    item.innerHTML = `
    <div class="modals">
        <div class="modal-overlay">
            <div class="modal-card">
            <div class="modal-close">
                <div class="modal-close-wrapper">
                    <span></span>
                    <span></span>
                </div>
            </div>
            <p class="card-name">${data.products.map((product)=> ( sortObj(product,key) ))}</p>
            </div>
        </div>
    </div>
    `;
    
    console.log(key)
    product.lastChild.className != "chil" ? product.append(item) : console.log("Элемент уже создан") 

    const modals = document.querySelector('.chil');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalCard = document.querySelector('.modal-card');
    // modalOverlay.classList.add('.modal-overlay--hidden');
    // modalCard.classList.add('.modal-card--hidden')

    modalVisible(modalOverlay,modalCard,modals)
    
}
function modalVisible(value1,value2,value3){
    value1.style.opacity = '1'
    value1.style.visibility = 'visible'
    value2.style.display = 'block'

    // value1.classList.remove('modal-overlay--hidden')
    // value1.classList.add('modal-overlay--visible')
    // value2.classList.remove('modal-card--hidden')
    // value2.classList.add('modal-card--visible')
    const modalWindowClose = value3.parentNode

    const btnClose = document.querySelector('.modal-close-wrapper')
    btnClose.addEventListener('click',(event)=> {
        modalWindowClose.removeChild(value3)
    })

    value1.addEventListener('click',(event)=> {
        if(event.target == value1){
            modalWindowClose.removeChild(value3)
        }
    })
}

function sortObj(product,key){
    if(key === product.id){
        return product.name
    }else{
        return console.log("Не та карточка")
    }
}

//document.addEventListener("DOMContentLoaded", getCards);
//document.addEventListener("DOMContentLoaded", fastView);
setTimeout(fastView, 1000);



