"use strict";

const numberOfItems = document.querySelector(".numberOfItems");
const decreaseItems = document.querySelector(".minus");
const increaseItems = document.querySelector(".plus");
const rightNav = document.querySelector(".right-nav");
const cart = document.querySelector(".cart");
const addToCartBtn = document.querySelector(".addToCartBtn");
const numberOfItemsAdded = document.querySelector(".numberOfItemsAdded");
const cartText = document.querySelector(".cartText");

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
                    $125.00 × ${initialNumber} <strong style="margin-: 0.5rem"> $${125.00 * initialNumber}.00</strong>
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

//functionalities for the add to cart button
addToCartBtn.addEventListener("click", () => {
  //takes the current number of items and adds it to the cart icon
  numberOfItemsAdded.style.display = "block";
  numberOfItemsAdded.style.color = "#fff";
  numberOfItemsAdded.innerHTML = initialNumber;

  if (initialNumber === 0) {
    cartText.innerHTML = "";
    cartText.insertAdjacentHTML("afterbegin", defaultText);
  } else {
    cartText.innerHTML = "";
    cartText.insertAdjacentHTML("afterbegin", cartItem(initialNumber));
  }

  const trashIcon = document.querySelector(".trashIcon");
  trashIcon.addEventListener('click', ()=>{
   numberOfItemsAdded.style.display = 'none'
   cartText.innerHTML = "";
   cartText.insertAdjacentHTML("afterbegin", defaultText);
  })
});
