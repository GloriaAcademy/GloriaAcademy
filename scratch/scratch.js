const btn = document.querySelector('.btn');
const btn2 = document.querySelector('.btn2');
const btn3 = document.querySelector('.btn3');
const btn4 = document.querySelector('.btn4');

btn.addEventListener('click',() => {
    btn.style.backgroundColor = '#fff911';
    btn2.style.backgroundColor = '#8a2be2';
    btn3.style.backgroundColor = '#8a2be2';
    btn4.style.backgroundColor = '#8a2be2';

})
btn2.addEventListener('click',() => {
    btn2.style.backgroundColor = '#fff911';
    btn.style.backgroundColor = '#8a2be2';
    btn3.style.backgroundColor = '#8a2be2';
    btn4.style.backgroundColor = '#8a2be2';

})
btn3.addEventListener('click',() => {
    btn3.style.backgroundColor = '#fff911';
    btn2.style.backgroundColor = '#8a2be2';
    btn.style.backgroundColor = '#8a2be2';
    btn4.style.backgroundColor = '#8a2be2';

});
btn4.addEventListener('click',() => {
    btn4.style.backgroundColor = '#fff911';
    btn2.style.backgroundColor = '#8a2be2';
    btn3.style.backgroundColor = '#8a2be2';
    btn.style.backgroundColor = '#8a2be2';

});