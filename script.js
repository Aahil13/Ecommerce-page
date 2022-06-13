"use strict";

const counter = document.querySelector(".counter");
const decreseCounter = document.querySelector(".minus");
const increaseCounter = document.querySelector(".plus");
const rightNav = document.querySelector(".right-nav");
const cart = document.querySelector(".cart");
const addToCartBtn = document.querySelector(".addToCartBtn");
const itemsAdded = document.querySelector(".items-added");
const cartText = document.querySelector(".cartText");
const imgThumbnails = document.querySelector(".img-thumbnails");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModalBtn = document.querySelector(".closeModalBtn");
const sliderEl = document.querySelector(".slider");
const sliderBtnRight = document.querySelector(".slider__btn--right");
const sliderBtnleft = document.querySelector(".slider__btn--left");
const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");
const navCloseBtn = document.querySelector(".nav--close__btn");

//state Values
let initialNumber = 0;

//for increasing and decreasing the price counter
increaseCounter.addEventListener("click", () => {
  if (initialNumber < 10) initialNumber++;
  counter.innerHTML = initialNumber;
});

decreseCounter.addEventListener("click", () => {
  initialNumber--;
  if (initialNumber <= 0) initialNumber = 0;
  counter.innerHTML = initialNumber;
});

const cartItem = function (initialNumber) {
  return `
           <div class="txt">
            <div class="cartItems">
              <div class="cartItemImg">
                <img
                  src="images/image-product-1-thumbnail.jpg"
                  alt="img-thumbnails"
                />
              </div>
              <div class="cartItemPrice">
                <div class="cartItemTag">
                  <p>Fall Limited Edition Sneakers</p>
                  <p>
                    $125.00 × ${initialNumber} <strong style="margin-: 0.5rem"> $${
    125.0 * initialNumber
  }.00</strong>
                  </p>
                </div>
              </div>
              <div class="trashIcon">
                <img src="images/icon-delete.svg" alt="trashIcon" />
              </div>
            </div>
          </div>
          <div class="btn">
            <div class="buttons cartBtn">
              <img src="images/icon-cart-white.svg" alt="cart" />
              <p>checkout</p>
            </div>
          </div>
`;
};

const defaultText = `<p>Your page is empty</p>`;

//toggling the cart
const showCart = function () {
  rightNav.addEventListener("click", (e) => {
    if (e.target.tagName !== "IMG") return;
    cart.classList.toggle("display");

    if (initialNumber === 0) {
      cartText.innerHTML = "";
      cartText.insertAdjacentHTML("afterbegin", defaultText);
    }
  });
};
showCart();

//functionalities for the carousel
const changeCloseButtonColor = function (event, imgSrc) {
  closeModalBtn.addEventListener(event, () => {
    document.querySelector(".closeModalBtn img").src = imgSrc;
  });
};

imgThumbnails.addEventListener("click", (e) => {
  if (e.target.tagName !== "IMG") return;
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  document.body.style.overflow = "hidden";
});

changeCloseButtonColor("mouseover", "images/icon-close-orange.svg");
changeCloseButtonColor("mouseout", "images/icon-close.svg");

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  navLinks.classList.remove("toggleNav");
  navLinks.classList.remove("mobileNav");
  document.body.style.overflow = "scroll";
};

overlay.addEventListener("click", closeModal);
closeModalBtn.addEventListener("click", closeModal);
navCloseBtn.addEventListener("click", closeModal);

//functionalities for the add to cart button
addToCartBtn.addEventListener("click", () => {
  //takes the current number of items and adds it to the cart icon
  cart.classList.remove("display");
  itemsAdded.style.display = "block";
  itemsAdded.style.color = "#fff";
  itemsAdded.innerHTML = initialNumber;

  if (initialNumber === 0) {
    cartText.innerHTML = "";
    cartText.insertAdjacentHTML("afterbegin", defaultText);
  } else {
    cartText.innerHTML = "";
    cartText.insertAdjacentHTML("afterbegin", cartItem(initialNumber));
  }

  const trashIcon = document.querySelector(".trashIcon");
  trashIcon.addEventListener("click", () => {
    itemsAdded.style.display = "none";
    cartText.innerHTML = "";
    cartText.insertAdjacentHTML("afterbegin", defaultText);
  });
});

///////////////////////////////////////
// Slider
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

///////////////////////////////////////

//functionalities for the menu

burger.addEventListener("click", () => {
  navLinks.style.transition = "all 2s";
  navLinks.classList.add("mobileNav");
  overlay.classList.remove("hidden");
  navLinks.classList.toggle("toggleNav");
  document.body.style.overflow = "hidden";
});
