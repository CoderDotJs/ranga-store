  // fetching the data in a function 
const loadProducts = () => {
  const url = `https://raw.githubusercontent.com/ProgrammingHero1/ranga-store-api/main/ranga-api.json?fbclid=IwAR0w-S4ROqiHtdqT4AQ3ySA1y8lPfqV0mboFe6I20vjfDQTciXKVmc1Ad1k`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};

loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product", "single-product", "col");
    div.innerHTML = `

          <!--Card-->

      <div class="card h-100 align-items-center pt-3 shadow-lg">
      <img class="product-image card-img-top " src=${image}></img>
      
      <div class="card-body w-100 d-flex flex-column justify-content-evenly align-items-start">
        <h1 class="fs-2 fw-bold">${product.title}</h1>
        <p>Category: ${product.category}</p>
        <p class="text-secondary">Rating: <b><span class="text-success">${product.rating.rate}</span> (${product.rating.count} reviews)</b></p>
        <h6>Price:<span class="fs-3 text-danger"> $ ${product.price}</span></h6>
        <div class="card-footer w-75 px-0 d-flex justify-content-between bg-transparent border-top-0">
        <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn border-0 btn-success rounded-1">Add to cart</button>
        <button id="details-btn" data-bs-toggle="modal" data-bs-target="#a${product.id}" class="btn btn-danger border-0 rounded-1">Details</button>
        </div>
      </div>
      </div>

      <!-- Modal -->

  <div class="modal fade" id="a${product.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">${product.title}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <img class="product-image card-img-top my-3 mx-auto d-block" src=${image}></img>
          <p>${product.description}</p>
          <p>Category: ${product.category}</p>
          <p>Rating: ${product.rating.rate}(${product.rating.count})</p>
          <h4>Price: <span class="fs-2">$ ${product.price}</span></h4>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" onclick="addToCart(${product.id},${product.price})">Add To Cart</button>
        </div>
      </div>
    </div>
  </div>
      `;
    document.getElementById("all-products").appendChild(div);
    console.log(product)
  }
};

// add to card funtion 

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

    // get input value 

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function

const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = parseFloat(total).toFixed(2);
};

// set innerText function

const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value).toFixed(2);
};

// update delivery charge and total Tax

const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price").toFixed(2);
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function

const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = parseFloat(grandTotal).toFixed(2);
};
updateTotal();