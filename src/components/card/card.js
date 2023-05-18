import data from './data.js';

const cardRoot = document.getElementById("card-root")

function createCards(){
    const list = document.createElement("div");
    list.classList.add("products");
    data.products.map((product)=> (
        createCard(product,list)
    ))
    cardRoot.appendChild(list)
}

function createCard(product,list){
    const item = document.createElement("div");
    item.classList.add("product");
    item.innerHTML = `
    <div key=${product.slug}>
        <p class="card-name">${product.name}</p>
        <img src=${product.images} alt=${product.name} />
        <div class="card-info">            
            <p>$${product.price}</p>
            <button>Buy</button>
        </div>
    </div>
    `;
   list.append(item)
}

createCards()

