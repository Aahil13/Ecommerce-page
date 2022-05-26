"use strict";

const numberOfItems = document.querySelector(".numberOfItems");
const decreaseItems = document.querySelector(".minus");
const increaseItems = document.querySelector(".plus");
const rightNav = document.querySelector(".right-nav");
const cart = document.querySelector(".cart");
const addToCartBtn = document.querySelector(".addToCartBtn");
const numberOfItemsAdded = document.querySelector(".numberOfItemsAdded");

const cartItem = `
  <div class="cartItems">
          <div class="cartItemImg">
            <img src="images/image-product-1-thumbnail.jpg" alt="img-thumbnails">
          </div>
          <div class="cartItemPrice">
            <div class="cartItemTag">
              <p>Fall Limited Edition Sneakers</p>
              <p>$125.00 × 3<strong style="margin-: .5rem;"> $375.00</strong></p>
            </div>
          </div>
          <div class="trashIcon">
            <img src="images/icon-delete.svg" alt="trashIcon">
          </div>
        </div>
`;

//state Values
let initialNumber = 0;

//for increasing and decreasing the price counter
increaseItems.addEventListener("click", () => {
  if (initialNumber < 10) initialNumber++;
  numberOfItems.innerHTML = initialNumber;
});

decreaseItems.addEventListener("click", () => {
  initialNumber--;
  if (initialNumber <= 0) initialNumber = 0;
  numberOfItems.innerHTML = initialNumber;
});

//toggling the cart
const showCart = function () {
  rightNav.addEventListener("click", (e) => {
    if (e.target.tagName !== "IMG") return;
    cart.classList.toggle("display");
  });
};
showCart();

//functionalities for the add to cart button
addToCartBtn.addEventListener("click", () => {
  //takes the current number of items and adds it to the cart icon
  numberOfItemsAdded.style.display = "block";
  numberOfItemsAdded.style.color = "#fff";
  numberOfItemsAdded.innerHTML = numberOfItems.innerHTML;

  //adds Items to the cart and adds button
  if (numberOfItems.innerHTML !== 0) {
    cart.classList.toggle("display");
  }
});
