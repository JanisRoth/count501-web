function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("active");
}

document.addEventListener('click', function(event) {
    const navLinks = document.getElementById("navLinks");
    const burgerMenu = document.querySelector(".burger-menu");
    
    if (navLinks.classList.contains("active") && 
        !navLinks.contains(event.target) && 
        !burgerMenu.contains(event.target)) {
        navLinks.classList.remove("active");
    }
});

document.getElementById("navLinks").addEventListener('click', function(event) {
    event.stopPropagation();
});