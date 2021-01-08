// about section tabs
(() =>{

      const aboutSection = document.querySelector(".about-section"),
       tabsContainer = document.querySelector(".about-tabs");

       tabsContainer.addEventListener("click",(event) =>{
        //  if target contains tab-item
         if(event.target.classList.contains("tab-item") &&
         !event.target.classList.contains("active")){
           const target = event.target.getAttribute("data-target");
          //
         tabsContainer.querySelector(".active").classList.remove("outer-shadow","active");  
          //
          event.target.classList.add("active","outer-shadow");
          //
          aboutSection.querySelector(".tab-content.active").classList.remove("active");
          //
          aboutSection.querySelector(target).classList.add("active");
         }
       })

})();

function bodyScrollingToggle(){
  document.body.classList.toggle("stop-scrolling")
};

// portfolio filter and popup
(() =>{

 
const filterContainer = document.querySelector(".portfolio-filter"),
portfolioItemsContainer = document.querySelector(".portfolio-items"),
portfolioItems = document.querySelectorAll(".portfolio-item"),
popup = document.querySelector(".portfolio-popup"),
prevBtn = popup.querySelector(".pp-prev"),
nextBtn = popup.querySelector(".pp-next"),
closeBtn = popup.querySelector(".pp-close"),
projectDetailsContainer = popup.querySelector(".pp-project-details-btn");  
let itemIndex, slideIndex, screenshots;

// filterportfolionitems
filterContainer.addEventListener("click", (event) => {

  if(event.target.classList.contains("filter-item") && 
  !event.target.classList.contains("active"))
  {// deactivate existing active filter item
    filterContainer.querySelector(".active").classList.remove("outer-shadow","active");
    //activate new 'filter';
    event.target.classList.add("active","outer-shadow");
    const target = event.target.getAttribute("data-target");
    portfolioItems.forEach((item)=>{
     
      if(target === item.getAttribute("data-category") || target === 'all'){
        item.classList.remove("hide");
        item.classList.add("show");
      }
      else{
        item.classList.remove("show");
        item.classList.add("hide");

      }
    })
  }
  

})

portfolioItemsContainer.addEventListener("click", (event) =>{
  if(event.target.closest(".portfolio-item-inner")){
    const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
    // get the portfolio item index
    itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
   screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
   //convert screenshots to an array
    screenshots = screenshots.split(",");
    if (screenshots.length === 1){
      prevBtn.style.display = "none";
      nextBtn.style.display = "none";
    }
    else{
      prevBtn.style.display = "block";
      nextBtn.style.display = "block";
    }
    slideIndex = 0;
    popupToggle();
    popupSlideshow();
  }
})
   
    closeBtn.addEventListener("click", () =>{
      popupToggle();

    })
   

   function popupToggle(){
     popup.classList.toggle("open");
     bodyScrollingToggle();
   }


   function popupSlideshow(){
    const imgSrc = screenshots[slideIndex];
    const popupImg = popup.querySelector(".pp-img");
     // activate loader unti popupimg loaded
    popupImg.src=imgSrc;
    popupImg.onload = () =>{
    // deactivate loader after popup image loaded
     popup.querySelector(".pp-loader").classList.remove("active");
    }
    popup.querySelector(".pp-counter").innerHTML = (slideIndex+1) + "of" + screenshots.length;
   }
 
   //next slide
   nextBtn.addEventListener("click", () =>{
    if(slideIndex === screenshots.length-1)
      {
        slideIndex = 0;
      }
      else{
        slideIndex++;
      }
      popupSlideshow();

   })

})();