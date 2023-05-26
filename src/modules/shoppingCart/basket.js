
// function setStore(value) {
//     // ["", ""]
//     localStorage.setItem('product', JSON.stringify(value));
// }

// function getStore() {
//     let store = JSON.parse(localStorage.getItem('product'));

//     if (store) {
//         return store;
//     } else {
//         return null;
//     }
// }

// function removeStoreElement(id) {
//     const store = getStore('product');

//     if (!store) return;

//     const newStore = store.filter((item) => item !== id);

//     if (newStore.length === 0) {
//         return localStorage.removeItem('product');
//     }

//     setStore(newStore);
// }

// function addStoreElement(id) {
//     const store = getStore('product');

//     if (!store) {
//         return setStore([id]);
//     }
//     if (store.indexOf(id) === -1) setStore([...store, id]);
// }


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
        <p class="product-price">$${product.price}</p>
        </div>
    </div>
    `;

    const productsBtn = document.createElement("button");
    productsBtn.classList.add("product-btn");

    productsBtn.addEventListener("click", () => console.log(product.id));

    item.querySelector(".card-info").append(productsBtn);


    
   list.append(item)
   
}