const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');

navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = e.target.getAttribute('href').slice(1);
    
    pages.forEach((page) => {
      page.style.display = 'none';
    });
    
    document.getElementById(targetId).style.display = 'grid';
  });
});
