
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


