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

// Base64-codierte Liste verbotener Begriffe
const verboteneWoerterEncoded = [
    "bmlnZ2Vy",  // nigger
    "bmlnZ2E=",  // nigga
    "bmVnZXI=",  // neger
    "c2NoZWlzc2U=",  // scheisse
    "YXJzY2g=",      // arsch
    "aHVyZQ==",      // hure
    "aHVyZW5zb2hu",  // hurensohn
    "c2NoZWlzc2U=",  // scheisse
    "d2ljaHNlcg==",  // wichser
    "c2NobGFtcGU=",  // schlampe
    "bWlzdGtlcmw=",  // mistkerl
    "dnZpY2hzZXI=",  // wichser (Variante)
    "YXNzaG9sZQ==",  // asshole
    "YnVsbHNoaXQ=",  // bullshit
    "Y3VudA==",      // cunt
    "ZGlja2hlYWQ=",  // dickhead
    "ZnVjaw==",      // fuck
    "c2hpdA==",      // shit
    "d2hvcmU=",      // whore
    "YmFzdGFyZA==",  // bastard
    "ZG91Y2hl",      // douche
    "YXNz",          // ass
    "c2ltZXg=",      // simex
    "a2lrZQ==",      // kike
    "Y2hpbms=",      // chink
    "c3BpYw==",      // spic
    "ZmFn",          // fag
    "ZmFnZ290",      // faggot
    "c2NodyB1Y2h0ZWw=", // schwuchtel
    "a3JwcGVs",      // krüppel
    "cmV0YXJk",      // retard
    "c3Bh"           // spa
];

const verboteneWörter = verboteneWoerterEncoded.map(w => atob(w));

const formular = document.getElementById("kontaktformular");
const textAnliegen = document.getElementById("anliegen");

const warnung = document.createElement("p");
warnung.style.color = "red";
warnung.style.fontWeight = "bold";
textAnliegen.parentNode.insertBefore(warnung, textAnliegen.nextSibling);

formular.addEventListener("submit", function (e) {
const eingabe = textAnliegen.value.toLowerCase();

for (const wort of verboteneWörter) {
    if (eingabe.includes(wort)) {
    e.preventDefault();
    warnung.textContent = `Please do not use offensive or discriminatory language.`;
    return;
    }
}

warnung.textContent = "";
});