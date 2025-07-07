let providerCards = document.querySelectorAll(".provider-card");

    providerCards.forEach(element => {
      element.addEventListener("click", () => {
        const providerID = element.dataset.id;
        window.location.href = `/ServiceProviderDetails?id=${providerID}`;
      });
    });

  function createStarRating(rating) {
    var stars = "";
    for (var i = 0; i < rating; i++) {
      stars += "★";
    }
    for (var i = rating; i < 5; i++) {
      stars += "☆";
    }
    return stars;
  }

  // function renderProviders(providers) {
  //   var container = document.getElementById("providers-container");
  //   var html = "";

  //   for (var i = 0; i < providers.length; i++) {
  //     var provider = providers[i];
  //     html += "<div class='provider-card'>";
  //     html +="<div class ='provider-info'>";
  //     html += "<div class='provider-name'>" + provider.name + "</div>";
  //     html +=
  //       "<div class='provider-details'>" + provider.details + "</div>";
  //     html +=
  //       "<div class='rating'>" +
  //       createStarRating(provider.rating) +
  //       "</div>";
  //     html +=
  //       "<div class='charges'>Charges: " +
  //       provider.minCharge +
  //       "/- to " +
  //       provider.maxCharge +
  //       "/-</div>";
  //       html += "</div>";
  //       html += "<div class = 'image-card'>";
  //       // html += "<img src =' " + provider.img + "'" + ">";
  //       html += "</div>";
  //     html += "</div>";
  //   }

  //   container.innerHTML = html;
  // }




  let sidebarOpener = document.querySelector(".sidebarOpener");
  let sidebar = document.querySelector(".sidebarVisible");
  let dropdown = document.querySelector(".dropdown");
  let bars = document.querySelector(".fas");
  
  
  let dropdownToggle = false;
  
  let sidebarToggleCounter = 0;
  sidebarOpener.addEventListener("click", () => {
  
     if(sidebarToggleCounter == 0){
         sidebarToggleCounter = 1;
  
         sidebarOpener.style.transform = `translateX(70vw)`;
         sidebar.style.transform = `translateX(0vw)`;
         sidebarOpener.textContent = "<";
     }
     else{
         sidebarToggleCounter = 0;
  
         sidebarOpener.style.transform = `translateX(0vw)`;
         sidebar.style.transform = `translateX(-70vw)`;
         sidebarOpener.textContent = ">";
  
     }
     
  })



  document.addEventListener("DOMContentLoaded", function () {


    // document
    //   .getElementById("sort-select")
    //   .addEventListener("change", function (e) {
    //     var sortType = e.target.value;
    //     var sortedProviders = serviceProviders.slice();

    //     if (sortType === "price") {
    //       sortedProviders.sort(function (a, b) {
    //         return a.minCharge - b.minCharge;
    //       });
    //     } else if (sortType === "rating") {
    //       sortedProviders.sort(function (a, b) {
    //         return b.rating - a.rating;
    //       });
    //     }

    //     renderProviders(sortedProviders);
    //   });

    // var priceInputs = document.querySelectorAll(".price-input");
    // priceInputs.forEach(function (input) {
    //   input.addEventListener("input", function () {
    //     var min = Number(priceInputs[0].value) || 0;
    //     var max = Number(priceInputs[1].value) || 1000;

    //     var filteredProviders = serviceProviders.filter(function (
    //       provider
    //     ) {
    //       return provider.minCharge >= min && provider.maxCharge <= max;
    //     });

    //     renderProviders(filteredProviders);
    //   });
    // });
    
  });


  
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



  

  // function openNav() {
  //   document.getElementById("mySidenav").style.display = "block";
  //   document.getElementById("mySidenav").style.width = "30%";
  // }
  
  // function closeNav() {
  //   document.getElementById("mySidenav").style.display = "none";
  //   document.getElementById("mySidenav").style.width = "0%";
  // }