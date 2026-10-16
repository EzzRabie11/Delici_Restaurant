function changingActiveSideBarAnchor(a,span){
let lastActiveSpan = document.querySelector(".sideBar li a span.rotatingSquare");
lastActiveSpan.classList.remove("rotatingSquare", "me-2"),
OldActiveAnchor=document.querySelector(".sideBar li a.active");
OldActiveAnchor.classList.remove("active");
a.classList.add("active");
span.classList.add("rotatingSquare", "me-2");
return a.getAttribute("href");
}
function updateNavLinks(sectionId) {
  let section = document.querySelector(`#${sectionId}`),
    sectionTop = section.offsetTop,
    sectionHeight = section.clientHeight,
    sectionBottom = sectionTop+sectionHeight;
  if (window.scrollY>sectionTop && window.scrollY<sectionBottom) {
    let navLinkOfSection = document.querySelector(`a[href="#${sectionId}"]`),
        navlinkSpan=navLinkOfSection.querySelector("span"),
      currentNavLink = sideBar.querySelector("a.active"),
      currentRotatingSpan=currentNavLink.querySelector("span");
      currentRotatingSpan.classList.remove("rotatingSquare", "me-2");
    currentNavLink.classList.remove("active");
    navLinkOfSection.classList.add("active");
    navlinkSpan.classList.add("rotatingSquare", "me-2")
  }
}
 function toggleActiveBetweenLi(id) {
  let oldActive = document.querySelector("#Menu .menuBar ul li.active"),
    newActive = document.querySelector(`#Menu .menuBar ul li#${id}`);
  oldActive.classList.remove("active");
  newActive.classList.add("active");
}
function scrollNavbar() {
  if (window.scrollY > 10) {
    navbar.classList.add("active");
  } else {
    navbar.classList.remove("active");
  }
}
function prepareDish(dish) {
  return `
    <div class="dish d-flex column-gap-3 column-gap-lg-0 justify-content-center align-items-center mb-5">
<div class="col-lg-3 col-4 ">
    <div class=" firstDishPart d-flex justify-content-center align-items-center  rounded-4">
        <div class="imageDish  m-0 m-auto" style="background-image: url('./images/${dish.images}');">
        <div class="layout">
          <i class="fa-regular fa-square-plus" onclick='openPopup(2,${dish.id})'></i>
        </div>
        </div>
    </div>
</div>
<div class="col-8 px-2 col-lg-9">
    <div class="detailsRow  align-items-start flex-column flex-sm-row ali mb-2 d-flex justify-content-center align-items-sm-center">
    <h5 class="dishName m-0">${dish.name}</h5>
    <span class="twoLines mx-3 d-none d-sm-block"></span>
    <p class="price m-0">$${dish.price}</p>
</div>
<div class="description">
    <p class="description mb-0">${dish.miniDescription}</p>
</div>
</div>
</div>
`;

}
function menuRow(menuType) {
    menuItemsPart1.innerHTML="";
    menuItemsPart2.innerHTML="";
  menuType.forEach(function (dish, index) {
    if (index < 3) {
      menuItemsPart1.innerHTML += prepareDish(dish);
    } else {
      menuItemsPart2.innerHTML += prepareDish(dish);
    }
  });
appearDishes();
}
function appearDishes() {
  let dishes = document.querySelectorAll("#Menu .dish");
  dishes.forEach(function (dish, index) {
    dish.classList.add("active");
    setTimeout(function () {
      dish.classList.add("show");
    }, 100); 
  });
}
function fillPopupContent(dish){
popupBox = document.querySelector(".popup .box");
popupBox.innerHTML='';
popupBox.innerHTML=`
<i class="fa-regular fa-circle-xmark exitIcon" onclick='closePopup()'></i>
  <div class="title mb-4">
      <h6 class="mb-0">SPECIAL SELECTION</h6>
      <div class="titleImage m-auto">
      <img src="./images/separator.svg" class="img-fluid " alt="">
      </div>
  </div>
  <h2 class="display-6 mb-4 text-light text-center">${dish.name}</h2>
  <div class="imageContainer rounded-3 mb-3" style="background-image: url('./images/${dish.images}')">
      <div class="dishPrice rounded-start">
          <h5 class="fw-bold m-0">$${dish.price}</h5>
      </div>
      <button class="next" onclick=nextDish('${dish.type}',${dish.id})><i class="fa-solid fa-chevron-right"></i></button>
      <button class="prev" onclick=prevDish('${dish.type}',${dish.id})><i class="fa-solid fa-chevron-left"></i></button>

  </div>
  <div class="paragraphCont">
      <p>${dish.description}</p>
  </div>`
}
function openPopup(popupId,DishId=null) {
  if (popupId==1){
let popup = document.querySelector(".popup[id='1']");
    popup.classList.add("active");
    setTimeout(function () {
        popup.classList.add("show");
    }, 100);
        let sideBar=popup.querySelector(".sideBar");
      sideBar.addEventListener("click", function(e){
        e.stopPropagation();
}) 
  }
   else if (popupId==2){
      let popup = document.querySelector(".popup[id='2']");
    popup.classList.add("active");
    setTimeout(function () {
        popup.classList.add("show");
    }, 100);
      let box=popup.querySelector(".box");
      box.addEventListener("click", function(e){
        e.stopPropagation();
})     
    let dish = allMenu.find(function (item) {
        return item.id === DishId;
    });
    fillPopupContent(dish);
  }

}
function closePopup(){
  let activePopup=document.querySelector(".popup.active");
    activePopup.classList.remove("show");
    setTimeout(function(){
      activePopup.classList.remove("active")
    },1000)
}
function nextDish(type,dishId){
 let currentCategory=getDishesByType(type),
      currentIndex=currentCategory.findIndex(function(dish){
  return dish.id==dishId;
 }),
 nextIndex=(currentIndex+1) % currentCategory.length,
   nextDishItem=currentCategory[nextIndex];
 fillPopupContent(nextDishItem);
}
function prevDish(type,dishId){
 let currentCategory=getDishesByType(type),
      currentIndex=currentCategory.findIndex(function(dish){
  return dish.id==dishId;
 }),
 prevIndex=(currentIndex-1 + currentCategory.length)% currentCategory.length,
   prevDishItem=currentCategory[prevIndex];
 fillPopupContent(prevDishItem);
}
function getDishesByType(type) {
    if (type === "BreakFast") {
        return BreakFast;
    } else if (type === "Lunch") {
        return Lunch;
    } else if (type === "Dinner") {
        return Dinner;
    } else if (type === "Drinks") {
        return Drinks;
    }
}
 let searchInput = document.querySelector("#Menu .search input");
searchInput.addEventListener("input", function () {
  let categoryName = document.querySelector("#Menu .menuBar ul li.active"),
    activeCategory = getDishesByType(categoryName.id),
    enteredText = searchInput.value;
  let searchedDishes = activeCategory.filter(function (item) {
    return item.name.toLowerCase().includes(enteredText.toLowerCase());
  });
  if (searchedDishes.length!=0){
      menuItemsPart1.innerHTML="";
      menuItemsPart2.innerHTML="";
  for(let i=0;i<searchedDishes.length;i++){
    if (i%2==0){
      let part1Dish=searchedDishes[i];
      menuItemsPart1.innerHTML += prepareDish(part1Dish);
    }
    else {
      let part2Dish=searchedDishes[i];
      menuItemsPart2.innerHTML += prepareDish(part2Dish);
    }
  }
  appearDishes();
}
else {
  let noDishesPopup=document.querySelector(".noMatchedPopup"),
  separator=document.querySelector(".separatingLine");
  separator.classList.remove("d-lg-block");
      menuItemsPart1.innerHTML = "";
      menuItemsPart2.innerHTML = "";
    noDishesPopup.classList.add("active");
}
});


