let items = [];
let cart = [];
document.addEventListener("DOMContentLoaded", async function(){
   const response = await getItems()
   items = [...response]
   displayItems(items)
})

 function getItems(){
    return fetch("http://localhost:3000/items")
    .then(response => response.json())
    .then(data => data)
}

function displayItems(items){
    const itemContainer = document.querySelector("#items");
    for(item of items){
        itemContainer.innerHTML += `
        <div class="ml-1 my-2 col-4">
            <div class="card" >
                <img src="${item.image}" height="250px" class="card-img-top image" alt="...">
                <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <span class="card-text">
                <ul>
                 <li>Color: ${item.color}</li>
                 <li>QTY Available: ${item.qty}</li>
                 <li>Price: ${item.price}</li>
                </ul>
                </span>
                <form onsubmit="addToCart(event, ${item.id})"  class="frm_cart w-75">
                    <label>QTY</label>
                    <input name="qty" type="number" min="1" value="1"/>
                    <button  class="btn btn-primary btn-sm btn-block m-4 w-100" type="submit" class="mx-auto w-100 btn btn-primary m-2">Add to cart</button>
                </form>
                </div>
            </div>
        </div>
        `
    }

}

function addToCart(event, id){
    event.preventDefault();
    const frm = new FormData(event.target);
    const selectedItem = items.find(item => item.id === parseInt(id))
    const data =  {
        qty_in_order: frm.get('qty'),
        total_price: parseFloat(frm.get('qty')) * parseFloat(selectedItem.price),
        ...selectedItem
    };
    cart.push(data)
    displayItemsToCart(cart)
}

function displayItemsToCart(items){
    document.querySelector("#cart_body").innerHTML = ""
    cart.forEach((item)=> {
        //plus(+) below is used to add all array elements fetched into the table hence prevent the iteration from displaying only the last element
        document.querySelector("#cart_body").innerHTML +=`
        <tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.qty_in_order}</td>
            <td>Ksh${item.total_price}</td>
            <td>
                <button class="btn btn-sm btn-danger" onclick="removeItemFromCart(event, ${item.id})">X</button>
            </td>
        </tr>
        `
    })
}


function removeItemFromCart(event, id){
   event.target.closest('tr').remove();
    const newCart = cart.filter((item => item.id !== parseInt(id)))
    cart = newCart

}







// document.querySelector("#frm").addEventListener("submit", function(event){
//     event.preventDefault();
//     const frm = new FormData(this)


//     console.log(frm.get("email"), frm.get("password"))
// })