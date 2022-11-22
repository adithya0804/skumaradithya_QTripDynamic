
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let params= new URLSearchParams(search)
  let city=params.get("city");
  console.log(city)
  return city;

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{  
    let response = await fetch(config.backendEndpoint+`/adventures?city=${city}`);
let data= await response.json();
return data;
}catch(error){
return null
}
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
adventures.forEach((item)=>{
createAdventure(item)
})
function createAdventure(data){
  let div=document.getElementById("data");
  div.innerHTML+=` <div class="col-6 col-lg-3 mb-3 position-relative">
  <a href="detail/?adventure=${data.id}" id="${data.id}">
  <div class="category-banner">${data.category}</div>
    <div class="card activity-card ">
 
      <img src="${data.image}" class="card-img-top activity-card img" alt="${data.name}"/> 
     
      <div class="card-body ">
      <div class="  d-md-flex justify-content-between">
            <div class="card-title ">${data.name}</div>
        <p class="card-text">₹${data.costPerHead}</p>
        </div>
        <div class=" d-md-flex justify-content-between">
        <div class="card-title">Duration</div>
    <p class="card-text">${data.duration} Hours</p>
    </div>
      </div>
    </div>
  </a>
</div>`
}
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
 return list.filter((item)=>{
  if(item.duration>=low && item.duration<=high){
    return item;
  }
 })
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
return  list.filter((item)=>{ for(let x of categoryList){
    if(item.category===x){
      return item;
    }
}})

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
 // filterByCategory(list,categoryList)


  // Place holder for functionality to work in the Stubs
  if(filters["category"].length===0 &&  filters["duration"].length === 0){
  return list;}
  else if(filters["duration"].length === 0 && filters["category"].length!=0 ){
    return filterByCategory(list,filters["category"])
  }
  else if(filters["duration"].length != 0 && filters["category"].length===0 ){
    const duration=filters["duration"].split("-")
    return filterByDuration(list,parseInt(duration[0]),parseInt(duration[1]));
  }
  else if(filters["duration"].length != 0 && filters["category"].length!=0){
    const duration=filters["duration"].split("-")
    return filterByDuration(filterByCategory(list,filters["category"]),parseInt(duration[0]),parseInt(duration[1]));
  //return filterByCategory(filterByDuration(list,filters["category"].low,filters["duration"].high),filters["category"])
  }
  
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
localStorage.setItem('filters',JSON.stringify(filters))
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object


  // Place holder for functionality to work in the Stubs
  return JSON.parse(localStorage.getItem("filters"));
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let div= document.getElementById("category-list");
 filters["category"].forEach(item=>{div.innerHTML+=`<div class="category-filter">${item}</div>`});

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
