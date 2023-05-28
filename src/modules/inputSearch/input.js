
function searchName(){
    let inputSearch = document.querySelectorAll('.search');
    inputSearch.forEach(searcher => {
        searcher.oninput = function() {
            let value = this.value.trim();
            let list = document.querySelectorAll('.product')
            if(value){
                list.forEach(element => {
                    if(element.getAttribute("name",element).search(value) == -1) {
                        element.classList.add('hideCard')
                    }
                })
            }else{
                list.forEach(element => {
                    element.classList.remove('hideCard')
                })
            }
        }
    })
}
searchName()