const cardRoot = document.getElementById("card-root")
function getCards(pagesCards){
    const url = new URL(`https://64675bd9ba7110b663b6500e.mockapi.io/products?page=${pagesCards}&limit=10`);
    fetch(url) 
    .then((response) => {
        if(response.status === 200) {
            return response.json();
        }else{
            throw Error(response);
        }
    })
    .then((json) =>{  
        console.log(json)
        const btnNext = document.querySelector('.pageSwapnext')
        if(json.length === 0){
            pagesCards = pagesCards - 1
            numberOfPage(pagesCards)
            btnNext.classList.add('pageSwapnext--hide')
            btnNext.removeEventListener("click", function(){
                pagesCards = pagesCards + 1;
                getCards(pagesCards)
            });
        }else{
            btnNext.classList.remove('pageSwapnext--hide')
            numberOfPage(pagesCards) 
            createCards(json)
        }
    })
    .catch((error) => {
        alert(error)
    })

}

function createCards(elements){
    const list = document.createElement("div");
    list.classList.add("products");
    for(let product of Object.entries(elements)){
        var element = product[1]
        createCard(element,list)
    }
    cardRoot.prepend(list)
}

function createCard(product,list){
    const deletePages = document.querySelector('.products');
    if(deletePages){
        deletePages.remove()
    }

    const item = document.createElement("div");
    item.classList.add("product");
    const viewButton = createButtonElement("btnhide", "Быстрый просмотр");
    const buyButton = createButtonElement("btnBuy", "Buy");
    item.innerHTML = `
    <div class="card-wrapper">
        <p class="card-name">${product.name}</p>
        <div class="card-view">
            <img src=${product.images} alt=${product.name} />
        </div>
        <div class="card-info">            
            <p class="product-price">$${product.price}</p>
        </div>
    </div>
    `;
    item.setAttribute('data-id',`${product.id}`)
    list.insertBefore(item,list.children[1])
    const buyDivBTN = item.querySelector(".card-info")
    buyDivBTN.appendChild(buyButton)
    const viewDivBTN = item.querySelector(".card-view")
    viewDivBTN.appendChild(viewButton)
    item.setAttribute("name",product.name)

    item.addEventListener("mouseenter", () => showinfo(viewButton));
    item.addEventListener("mouseleave", () => hideinfo(viewButton));
    viewButton.addEventListener("click",() => modalView(product,list))


   
}
function createButtonElement (className, children) {
    const button = document.createElement("button")
    className && button.classList.add(className)
    button.setAttribute("type","button")
    button.setAttribute("id","btn-view-card")
    if(typeof children === 'string'){
        button.innerHTML = children
    }else{
        button.append(children)
    }
    
    return button
}

function showinfo(event){
    event.classList.remove("btnhide")
    event.classList.add("btnshow")
    
}
function hideinfo(event){
    event.classList.remove("btnshow")
    event.classList.add("btnhide")
}

function modalView(product,list){
    const item = document.createElement("div");
    item.classList.add("chil");
    const buyButton = createButtonElement("btnBuy", "Buy");
    item.innerHTML = `
    <div class="modal">
        <div class="modal_overlay">
            <div class="modal_card">
                <div class="modal_close">
                    <div class="modal_close-wrapper">
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <h2 class="modal_card-name">${product.name}</h2>
                <div class="modal_info">
                    <div class="modal_img">
                        <img src="${product.images}">
                    </div>                    
                    <div class="modal_main-info">
                        <div class="modal_description">
                            <h5>Описание: </h5>
                            <p>${product.description}</p>
                        </div>
                        <div class="modal_addinfo">
                            <div class="modal_price">
                                <h5>Цена: </h5>
                            <p>${product.price} $</p>
                            </div>
                            <div class="modal_price"> 
                                <h5>В наличии:</h5> 
                                <p>${product.countInStock} штук</p>
                            </div>        
                            <div class="modal_brand"> 
                                <h5>Брэнд: </h5>
                                <p>${product.brand}</p> 
                            </div>
                            <div class="modal_brand">
                                <h5>Рейтинг:</h5> 
                                <p>${product.rating} баллов</p>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;


    list.lastChild.className != "chil" ? list.append(item) : console.log("Элемент уже создан") 
    const modals = document.querySelector('.chil');
    const modalOverlay = document.querySelector('.modal_overlay');
    const modalCard = document.querySelector('.modal_card');

    const buyDivBTN = item.querySelector(".modal_card")
    buyDivBTN.appendChild(buyButton)

    modalVisible(modalOverlay,modalCard,modals)
    
}
function modalVisible(value1,value2,value3){
    value1.style.opacity = '1';
    value1.style.visibility = 'visible';
    value2.style.display = 'block';
    const modalWindowClose = value3.parentNode

    const btnClose = document.querySelector('.modal_close-wrapper')
    btnClose.addEventListener('click',(event)=> {
        modalWindowClose.removeChild(value3)
    })

    value1.addEventListener('click',(event)=> {
        if(event.target == value1){
            modalWindowClose.removeChild(value3)
        }
    })
}

function nextPage(){
    let pagesCards = 1
    const pageSwap = document.createElement('div')
    pageSwap.classList.add('pageSwap')
    cardRoot.append(pageSwap)

    const previousBtnSpan = document.createElement('span')
    const nextBtnSpan = document.createElement('span')

    const previousPageCard = createButtonElement("pageSwapprevious", previousBtnSpan);
    pageSwap.append(previousPageCard)
    //previousPageCard.append(document.createElement('span'))

    const nextCard = createButtonElement("pageSwapnext", nextBtnSpan);
    pageSwap.append(nextCard)
   // nextCard.append(document.createElement('span'))

    nextCard.addEventListener("click", function(){
        pagesCards = pagesCards + 1;
        getCards(pagesCards)
    })


    previousPageCard.addEventListener("click", function(){
        pagesCards > 1 ? pagesCards = pagesCards - 1 : alert("Вы на первой странице")
        console.log(pagesCards)
        getCards(pagesCards)
    })
}

function numberOfPage(numberPage){
    const previousNumberPageDelete = document.querySelector('.pageNumber')
    
    if(previousNumberPageDelete){
        previousNumberPageDelete.remove()
    }
    const numberPageDiv = document.createElement('div')
    numberPageDiv.classList.add('pageNumber')

    cardRoot.prepend(numberPageDiv)

    numberPageDiv.innerHTML = `
    <p>Страница ${numberPage}</p>    
    `

}

document.addEventListener("DOMContentLoaded", getCards(1));
nextPage()


