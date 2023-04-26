let items = [];
let billTotal = 0;

// adding item to cart feature
const addItem = document.querySelectorAll(".item-add");
addItem.forEach((item) =>
  item.addEventListener("click", (e) => {
    // item name and price
    if (!items.length) {
      document.querySelector(".payment").innerHTML = `
      <hr />
      <div class="bill-total">
        <h2 class="bill-total-title">Total price:</h2>
        <h3 class="bill-total-price">$0</h3>
      </div>
      <button class="complete-order">Complete Order</button>
      `;
    }
    const elemParent = e.target.parentNode;
    const itemName = elemParent.querySelector(".item-name").textContent;
    const itemPrice = Number(
      elemParent.querySelector(".item-price").textContent.split("$")[1]
    );

    // checking if the item already exists
    const existingItemIndex = items.findIndex((item) => item.name === itemName);

    // updating the item and the bill
    if (existingItemIndex < 0) {
      // case1: no item in the list:
      // add-item to the list, update total, insert the html

      items.push({
        name: itemName,
        price: itemPrice,
        qty: 1,
      });

      const item = items.find((item) => item.name == itemName);

      const billItemElem = `
        <div class="bill-items" id=${itemName}>
          <h2 class="bill-item-name">${itemName}</h2>
          <span class="bill-item-quantity">${item.qty}</span>
          <button class="bill-item-remove">remove</button>
          <h3 class="bill-item-price">$${item.price}</h3>
        </div>
      `;

      document
        .querySelector(".payment")
        .insertAdjacentHTML("afterbegin", billItemElem);

      billTotal += itemPrice;

      document.querySelector(".bill-total-price").textContent = "$" + billTotal;
    } else {
      // case2: item exists:
      // update the item qty & price, update total price

      const item = items[existingItemIndex];
      item.price += itemPrice;
      item.qty += 1;

      const billItem = document.querySelector(`#${itemName}`);
      billItem.querySelector(".bill-item-quantity").textContent = item.qty;
      billItem.querySelector(".bill-item-price").textContent = "$" + item.price;

      billTotal += itemPrice;
      document.querySelector(".bill-total-price").textContent = "$" + billTotal;
    }
  })
);

// removing item from the cart
// select the parent element that contains the bill items
const paymentElem = document.querySelector(".payment");
// add click event listener to paymentElem to listen to remove button clicks
paymentElem.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("bill-item-remove")) {
    // get the name and price of the item that was clicked for removal
    const itemName =
      e.target.parentNode.querySelector(".bill-item-name").textContent;

    const item = items.find((item) => item.name === itemName);

    // find the item in the items array and remove it
    const itemIndex = items.findIndex((item) => item.name === itemName);
    items.splice(itemIndex, 1);

    // update the bill total
    billTotal -= item.price;
    document.querySelector(".bill-total-price").textContent = "$" + billTotal;

    // remove the item from the DOM
    e.target.parentNode.remove();
  }
});

// completing the payment
document.body.addEventListener("click", (e) => {
  // e.preventDefault();
  if (e.target.classList.contains("complete-order")) {
    document.querySelector(".payment-page").classList.toggle("hidden");
  }
});
document.body.addEventListener("click", (e) => {
  if (e.target.classList.contains("payment-form-pay")) {
    document.querySelector(".payment").innerHTML = `
      <h2 class="order-placed">Awesome! your order is on the way 🛵</h2>
    `;
    document.querySelector(".payment-page").classList.toggle("hidden");
    items = [];
    billTotal = 0;
  }
});
