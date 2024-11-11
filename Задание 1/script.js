const btn = document.querySelector('.j-btn-test');
const currentIcon = document.querySelector('.btn_icon_1');

btn.addEventListener('click', () => {
    document.querySelector('.btn_icon_2').style.display = 'flex';
    currentIcon.classList.toggle('btn_icon_2');
    document.querySelector('.btn_icon_2').style.display = 'none';
});