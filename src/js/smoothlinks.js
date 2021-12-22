document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('a[href^="#"');

  links.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const ID = link.getAttribute('href');
      document.querySelector(ID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });
});
