let basket = JSON.parse(localStorage.getItem("data")) || [];

let cart_container = document.getElementById("container");
// let quantiy = 0;

let generateCart = data.map((e) => {
  let { id, productType, heading, img, price, mrp } = e;
  let search = basket.find((x) => x.id === id) || [];

  return (cart_container.innerHTML += `
<div class="cart" id="${id}">

            <div>
                <img src="${img}"
                    width="260px" height="300px" alt="loadding" class="mainimg">
            </div>
            <div class="cart-content">
            <div>
                <h2>${heading}</h2>
                <div class="prices">
                <div class="price">${price}</div>
                <div class="mrp">${mrp}</div>
                </div>
                <div class="quntity">
                    <p id="remove" onclick="decrement(${id})">-</p>
                    <p id="cart-quantity">${
                      search.item === undefined ? 0 : search.item
                    }</p>
                    <p id="add" onclick="increment(${id})">+</p>
                </div>
            </div>
</div>
        </div>
`);
});

const increment = (id) => {
  let selectedItem = id;

  let search = basket.find((x) => x.id === selectedItem);

  if (search === undefined) {
    // console.log(selectedItem);
    basket.push({
      id: selectedItem,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  // console.log(basket);
  update(selectedItem);
  localStorage.setItem("data", JSON.stringify(basket));
};
const decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  // console.log(basket);
  update(selectedItem);
  basket = basket.filter((x) => x.item != 0);

  localStorage.setItem("data", JSON.stringify(basket));
};

const update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).querySelector("#cart-quantity").innerHTML =
    search.item;
  Calulation();
};

let Calulation = () => {
  let basket_quantity = document.getElementById("basket-quantity");
  basket_quantity.innerHTML = basket
    .map((x) => x.item)
    .reduce((x, y) => x + y, 0);
};
Calulation();
