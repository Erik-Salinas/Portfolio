let nav =  document.querySelector("#nav");
let open = document.querySelector("#open");
let close = document.querySelector("#close");
let navLinks = document.querySelectorAll("#nav__link");
let body = document.body;

open.addEventListener("click", ()=>{
    nav.classList.add("nav-visible");
    body.classList.add("no-scroll");    
})

close.addEventListener("click", ()=>{
    nav.classList.remove("nav-visible")
    body.classList.remove("no-scroll");
})

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("nav-visible");
        body.classList.remove("no-scroll");
    });
});
