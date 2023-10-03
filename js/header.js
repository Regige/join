function userNavbar() {
    let navbar = document.getElementById('navbar');
    if (navbar.classList.contains('d-none')) {
        navbar.classList.remove('d-none');
    } else {
        navbar.classList.add('d-none');
    }
}