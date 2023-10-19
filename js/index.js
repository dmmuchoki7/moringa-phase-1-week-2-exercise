let items = [];
document.addEventListener("DOMContentLoaded", function(){
    getItems()
})

function getItems(){
    fetch("http://localhost:3000/items")
    .then(response => response.json())
    .then(data => {
        items = [...data]
        displayItems(data)
    })
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
                <form>
                    <label>QTY</label>
                    <input type="number" min="1" value="1"/>
                    <button class="btn btn-primary btn-block m-2 btn-lg">Add to cart</button>
                </form>
                </div>
            </div>
        </div>
        `
    }
}