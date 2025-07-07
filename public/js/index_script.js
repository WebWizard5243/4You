let slideshow = document.querySelector(".slideshow");
 let element = document.querySelectorAll(".SSimage");
 let prev = document.getElementById("prev");
 let next = document.getElementById("next");
 let dropdown = document.querySelector(".dropdown");
let bars = document.querySelector(".fas");
let cards = document.querySelectorAll(".item");
//let signUpPic = document.querySelector(".signUpPic"); //X
//let signUp = document.querySelector(".signUp");  //X
//let x = document.querySelectorAll(".x");  //X
//let loginBtn = document.querySelector("#loginBtn");  //X
//let login = document.querySelector(".login");  //X
//let signUpBtn = document.querySelector("#signUpBtn");  //X

let counter = 0;
let maxSlides = 4;
let intervalID;

let dropdownToggle = false;



let sidebarOpener = document.querySelector(".sidebarOpener");
let sidebar = document.querySelector("#theSidebar");

initiateSlideshow();

function initiateSlideshow(){

    intervalID = setInterval(() => {
        goNext();
    }, 5000);
}

 next.addEventListener("click", () => {intervalID = clearInterval(intervalID); goNext();})

 prev.addEventListener("click", goPrev)


 function goNext(){

    if(counter == maxSlides-1){
        counter = 0;
    }
    else
    counter ++;
    slideshow.style.transform = `translateX(-${counter*25}%)`
    
 }

 function goPrev(){

    intervalID = clearInterval(intervalID);


    if(counter == 0){
        counter = maxSlides-1;
    }
    else
    counter --;
    slideshow.style.transform = `translateX(-${counter*25}%)`

 }
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
 


//  signUpPic.addEventListener("click", () => {

//     signUp.style.display = "block";
//  })

//  x.forEach(element => element.addEventListener("click", () => {

//     signUp.style.display = "none";
//     login.style.display = "none";

//  }));

//  loginBtn.addEventListener("click", () => {

//     signUp.style.display = "none";
//     login.style.display = "block";
//  })

//  signUpBtn.addEventListener("click", () => {

//     signUp.style.display = "block";
//     login.style.display = "none";
//  })


 
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
});

cards.forEach(element => {
    element.addEventListener("click", () => {
        const serviceName = element.dataset.name;
        window.location.href = `/list?service=${encodeURIComponent(serviceName)}`;
    })
});