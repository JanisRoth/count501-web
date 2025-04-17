function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("active");
}

const slidingLogosContainer = document.querySelector('.sliding-logos-container');
let isScrollingDown = true;

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Berechne die Scrollposition als Prozentsatz
    const scrollPercentage = scrollPosition / (documentHeight - windowHeight);

    // Bestimme die Verschiebung basierend auf Scroll-Richtung
    const displacement = isScrollingDown 
        ? -scrollPercentage * window.innerWidth 
        : (1 - scrollPercentage) * window.innerWidth;

    // Bewege die Logos
    slidingLogosContainer.style.transform = `translateX(${displacement}px)`;

    // Richtungswechsel beim Scroll
    if (scrollPosition === 0) {
        isScrollingDown = true;
    } else if (scrollPosition + windowHeight >= documentHeight) {
        isScrollingDown = false;
    }
});