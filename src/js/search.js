document.addEventListener('DOMContentLoaded', function () {
  const search = document.querySelector('.search');
  const searchBtn = document.querySelector('.search__btn');
  const searchInput = document.querySelector('.search__input');
  const searchBtnClose = document.querySelector('.search__btn-close');
  const header = document.querySelector('.header__container');

  search.addEventListener('submit', event => {
    event.preventDefault()
    searchInput.value = ''
  });

  searchBtn.addEventListener('click', () => {
    if (window.innerWidth < 500) {
      header.classList.toggle('header__container_search-active');
    };

    search.classList.toggle('search_active');
  });

  searchBtnClose.addEventListener('click', () => {
    search.classList.remove('search_active');
    searchInput.value = ''

    if (window.innerWidth < 500) {
      header.classList.toggle('header__container_search-active');
    };
  });
});
