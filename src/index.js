import shoppingCart from "./modules/shoppingCart/export-shoppingCart.js";
import $ from 'jquery';
import 'slick-carousel';
import card from './components/card/exportCards.js'
import search from './modules/inputSearch/exportSearch.js'

$('.slider').slick({
    arrows:true,
    dots:true,
    slidesToShow:1,
    autoplay:true,
    draggable:false,
    fade:true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                arrows:false,
            }
        }
    ]
});
