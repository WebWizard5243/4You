// let slideshow = document.querySelector(".slideshow");
// let element = document.querySelectorAll(".SSimage");
// let prev = document.getElementById("prev");
// let next = document.getElementById("next");
// let counter = 0;
// let maxSlides = 4;
// let intervalID;


let sidebarOpener = document.querySelector(".sidebarOpener");
let sidebar = document.querySelector("#theSidebar");
let dropdown = document.querySelector(".dropdown");
let bars = document.querySelector(".fas");
let dropdownToggle = false;

let sidebarToggleCounter = 0;
sidebarOpener.addEventListener("click", () => {

   if(sidebarToggleCounter == 0){
       sidebarToggleCounter = 1;

       sidebarOpener.style.transform = `translateX(60vw)`;
       sidebar.style.transform = `translateX(0vw)`;
       sidebarOpener.textContent = "<";
   }
   else{
       sidebarToggleCounter = 0;

       sidebarOpener.style.transform = `translateX(0vw)`;
       sidebar.style.transform = `translateX(-60vw)`;
       sidebarOpener.textContent = ">";

   }
   
})

bars.addEventListener("click", () => {

    if(!dropdownToggle){
    // dropdown.style.display = "block";
    dropdownToggle = true;

    dropdown.style.transform = "scale(1)"
    }

    else{
        dropdownToggle = false;

        dropdown.style.transform = "scale(0)"
    }
})
