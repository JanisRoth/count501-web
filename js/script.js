// Function to toggle the menu
function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("active");
}

// Add an event listener to close the menu when clicking outside
document.addEventListener('click', function(event) {
    const navLinks = document.getElementById("navLinks");
    const burgerMenu = document.querySelector(".burger-menu");
    
    // Check if the menu is active and the click was outside the menu and not on the burger button
    if (navLinks.classList.contains("active") && 
        !navLinks.contains(event.target) && 
        !burgerMenu.contains(event.target)) {
        navLinks.classList.remove("active");
    }
});

// Prevent clicks on the menu itself from closing it
document.getElementById("navLinks").addEventListener('click', function(event) {
    event.stopPropagation();
});