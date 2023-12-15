let label = document.getElementById("label")

let ShopingCart = document.getElementById("shoping-cart")




let basket = JSON.parse(localStorage.getItem("data")) || [];

console.log(basket);




let generateCartItem = () => {
    if (basket.length !== 0) {
        // console.log("not empty");
        return ShopingCart.innerHTML = basket.map((x) => {
            let { id, item } = x;
            let search = data.find((y) => y.id === id) || [];
            return ` 
            <div class="cart-item">
              <img src=${search.img} width="100px" alt="">
              <div class="ditails">
                <div class="title-price-x">
                  <h4>
                    <p>${search.heading}</p>
                    <p>₹${search.price}</p>
                 </h4>
                 <i class="ri-close-line" onclick="removeItem(${id})"></i>
                </div>
                <div class="quntity">
                <p id="remove" onclick="decrement(${id})">-</p>
                <p id="cart-quantity">${item}</p>
                <p id="add" onclick="increment(${id})">+</p>
            </div>
                  <h3>₹${item * search.price}</h3>
              </div>
            </div>
            `
        })
    }
    else {
        // console.log("empty");
        ShopingCart.innerHTML = ``;
        label.innerHTML = `
               <div id="label" class="text-center"></div>
                  <h2>Cart is Empty</h2>
                 <a href="/index.html">
                    <button class="homebtn">Back To Home</button>
                </a>
    `
    }

}
generateCartItem()





const increment = (id) => {

    let selectedItem = id;

    let search = basket.find((x) => x.id === selectedItem);


    if (search === undefined) {
        // console.log(selectedItem);
        basket.push({
            id: selectedItem,
            item: 1
        })

    }
    else {
        search.item += 1;

    }
    // console.log(basket);
    generateCartItem()
    update(selectedItem)
    localStorage.setItem("data", JSON.stringify(basket))

}
const decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem);


    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1
    }
    // console.log(basket);
    update(selectedItem)
    basket = basket.filter((x) => x.item != 0)
    
    localStorage.setItem("data", JSON.stringify(basket))
    generateCartItem()
}

const update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.querySelector("#cart-quantity").innerHTML = search.item;
    Calulation();
    generateCartItem()
    TotalAmount()
}

let Calulation = () => {
    let basket_quantity = document.getElementById("basket-quantity")
    basket_quantity.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0)
}
Calulation();


 let removeItem = (id)=>{
    let selectedItem = id;
   basket =  basket.filter((x)=>x.id !== selectedItem)
    console.log(selectedItem);
    localStorage.setItem("data", JSON.stringify(basket))
    generateCartItem()
    Calulation();
    TotalAmount()
 }


 let TotalAmount = ()=>{
    if(basket.length !==0){
        let amount =basket.map((x)=>{
            let {item,id} = x
            let search =data.find((y)=>y.id === id) || []
            return item * search.price; 
        }).reduce((x,y)=> x + y, 0 )
        label.innerHTML=`
        <h2>Total Bill Amount ${amount}</h2>
        <button class="Checkout">Checkout</button>
        <button class="removeall" onclick="clearCart()">Remove All</button>
        `
    }
   
 }
 TotalAmount()


 let clearCart = ()=>{
basket = []
generateCartItem()
Calulation();
localStorage.setItem("data", JSON.stringify(basket))
 }