document.querySelector('.hamburger').addEventListener('click', function() {
    var menu = document.querySelector('.menu');
    if (menu.style.display === 'none') {
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
});
