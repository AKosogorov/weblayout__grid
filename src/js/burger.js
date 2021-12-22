document.addEventListener('DOMContentLoaded', function () {
  const burger = document.querySelector('.burger__btn');
  const nav = document.querySelector('.nav');
  const btnClose = document.querySelector('.nav__btn-close');

  burger.addEventListener('click', menuActive);

  btnClose.addEventListener('click', menuActive);

  function menuActive () {
    nav.classList.toggle('nav_active');
  };
});
