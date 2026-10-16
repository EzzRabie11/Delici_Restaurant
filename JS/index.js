let carouselButtons=document.querySelectorAll("#Home .carouselInner .carousel_buttons span"),
    carouselItems=document.querySelectorAll("#Home .carouselInner .carouselItem"),
    sideBar=document.querySelector("#Home .sideBar"),
    sideBarButton=document.querySelector("#Home .sideBar .sideBarExit"),
    navPopup=document.querySelector("#Home .popupNav"),
    sideBarLiA=document.querySelectorAll(".sideBar li a"),
    rotatingSquareSpan=document.querySelectorAll(".sideBar li a span"),
    navbar=document.querySelector("#Nav"),
    navbarAnchor=document.querySelectorAll("#Nav ul li a"),
    menubarBreakfastButton=document.querySelector("#Menu .menuBar ul #BreakFast"),
    menubarLunchButton=document.querySelector("#Menu .menuBar ul #Lunch"),
    menubarDinnerButton=document.querySelector("#Menu .menuBar ul #Dinner"),
    menubarDrinksButton=document.querySelector("#Menu .menuBar ul #Drinks"),
    menuItemsPart1 = document.querySelector("#Menu .part1 .part1Item"),
    menuItemsPart2 = document.querySelector("#Menu .part2 .part2Item"),
    sections=document.querySelectorAll("section,header");

toggleActiveBetweenLi("BreakFast");
menuRow(BreakFast);
sideBarLiA.forEach(function(a){
    let span=a.querySelector("span");
    a.addEventListener("click",function(e){
        e.preventDefault();
        closePopup();
        let currentSectionId=changingActiveSideBarAnchor(a,span),
        currentSection=document.querySelector(currentSectionId),
        topOfSection=currentSection.offsetTop;
       setTimeout(function(){
        window.scrollTo(0,(topOfSection));
       },500)
        
    })
})
window.addEventListener("scroll",function(){
sections.forEach(function(section){
updateNavLinks(section.id);
})
});
scrollNavbar();

carouselButtons.forEach(function(button){
    button.addEventListener("click",function(){
     let  currentId=button.id,
          currentSlider=document.querySelector(`#Home .carouselItem[id="${currentId}"]`),
          previousActive=document.querySelector(".carouselItem.active");
          previousActive.classList.add("hide");
          setTimeout(function(){
            previousActive.classList.remove("active");
          },100)
          setTimeout(function(){
            currentSlider.classList.add("active");
          },100)
          
    let lastButtonActive=document.querySelector(".carousel_buttons span.active"),
    currentButtonActive=document.querySelector(`.carousel_buttons span[id="${currentId}"]`);
    lastButtonActive.classList.remove("active");
    currentButtonActive.classList.add("active");
    })
})
window.addEventListener("scroll", function () {
  navbar.classList.add("active");
  scrollNavbar();
});
let lastScrollY = window.scrollY;
window.addEventListener("scroll", function () {
    if (window.scrollY > lastScrollY) {
        navbar.classList.add("scrollUp");
        navbar.classList.remove("scrollDown")
    } 
    else if (window.scrollY < lastScrollY) {
        navbar.classList.add("scrollDown");
        navbar.classList.remove("scrollUp");
    }
    lastScrollY = window.scrollY;
});
menubarBreakfastButton.addEventListener("click", function(){
    toggleActiveBetweenLi('BreakFast');
    menuRow(BreakFast);
});
menubarLunchButton.addEventListener("click", function(){
    toggleActiveBetweenLi('Lunch')
    menuRow(Lunch);
});
menubarDinnerButton.addEventListener("click", function(){
    toggleActiveBetweenLi('Dinner')
    menuRow(Dinner);
});
menubarDrinksButton.addEventListener("click", function(){
    toggleActiveBetweenLi('Drinks')
    menuRow(Drinks);
});
