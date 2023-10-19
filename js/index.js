let items = [];
document.addEventListener("DOMContentLoaded", async function(){
   const response = await getItems()
   displayItems(response)
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
        <div class="p-2 m-1 col-3">
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
                <form class="w-100">
                    <label>QTY</label>
                    <input type="number" min="1" value="1"/>
                    <button class="mx-auto w-100 btn btn-primary m-2">Add to cart</button>
                </form>
                </div>
            </div>
        </div>
        `
    }
}


// document.querySelector("#frm").addEventListener("submit", function(event){
//     event.preventDefault();
//     const frm = new FormData(this)


//     console.log(frm.get("email"), frm.get("password"))
// })