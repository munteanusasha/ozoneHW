'use strict';

//checkbox

const checkbox = document.querySelectorAll('.filter-check_checkbox');

checkbox.forEach(function(element){
    element.addEventListener('change', function(){
        if(this.checked){
            this.nextElementSibling.classList.add('checked');
        }
        else{
            this.nextElementSibling.classList.remove('checked');
        }
    });
});


//end checkbox

//cart
const btnCart = document.getElementById('cart');
const modalCart = document.querySelector('.cart');
const closeBtn = document.querySelector('.cart-close');

btnCart.addEventListener('click', () => {
    modalCart.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    // modalCart.style.cssText = 'display: flex; font-size:30px;';
});
closeBtn.addEventListener('click', () => {
    modalCart.style.display = 'none';
    document.body.style.overflow = '';
});

//end cart

//add and remove to/from cart
const cards = document.querySelectorAll('.goods .card'),
      cartWrapper = document.querySelector('.cart-wrapper'),
      cartEmpty = document.getElementById('cart-empty'),
      countGoods = document.querySelector('.counter');

cards.forEach((card) => {
    const btn = card.querySelector('button');
    
    btn.addEventListener('click', () => {
        const cardClone = card.cloneNode(true);
        cartWrapper.appendChild(cardClone);
        cartEmpty.remove();
        showData();
    });

});

function showData(){
    const cardsCart = cartWrapper.querySelectorAll('.card');
    countGoods.textContent = cardsCart.length;
    // console.log(cardsCart.length);
}
//end and remove to/from cart