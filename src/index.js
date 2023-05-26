import shoppingCart from "./modules/shoppingCart/export-shoppingCart.js";
import $ from 'jquery';
import 'slick-carousel';
import card from './components/card/exportCards.js'

$('.slider').slick({
    arrows:true,
    dots:true,
    // adaptiveHeight:true,
    slidesToShow:1,
    // infinite:false, /*чтобы слайдер не был бесконечным + класс у кнопки disabled*/
    autoplay:true,
    draggable:false,
    // centerMode:true,
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
