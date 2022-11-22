import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL

  let params= new URLSearchParams(search)
  let adventure=params.get("adventure");
  console.log(adventure)
  return adventure;
  // Place holder for functionality to work in the Stubs
  
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{  
    let response = await fetch(config.backendEndpoint+`/adventures/detail?adventure=${adventureId}`);
let data= await response.json();
console.log(data);
return data;
}catch(error){
return null
}

  // Place holder for functionality to work in the Stubs
 
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
 let title =document.getElementById("adventure-name");
  title.innerHTML=adventure['name'];
  let subtitle =document.getElementById("adventure-subtitle");
  subtitle.innerHTML=adventure['subtitle'];

 const advImgDiv=document.getElementById('photo-gallery');
 adventure.images.forEach((img)=>{
   const newImageEl=document.createElement('img');
   newImageEl.setAttribute('class','activity-card-image');
   newImageEl.src=img;
   advImgDiv.appendChild(newImageEl) })
  let content =document.getElementById("adventure-content");
  content.innerHTML=adventure['content'];
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  const photoGallery = document.getElementById("photo-gallery");
  photoGallery.innerHTML = "";

  const mainDiv = document.createElement("div");
  mainDiv.setAttribute("id", "carouselExampleIndicators")
  mainDiv.setAttribute("class", "carousel slide");
  mainDiv.setAttribute("data-bs-ride", "carousel");

  const carouselIndicators = document.createElement("div");
  carouselIndicators.setAttribute("class", "carousel-indicators");

  const carouselInner = document.createElement("div");
  carouselInner.setAttribute("class", "carousel-inner");

  let counter = 0;

  images.forEach(image => {

    const indicatorButton = document.createElement("button");
    indicatorButton.setAttribute("type", "button");
    indicatorButton.setAttribute("data-bs-target", "#carouselExampleIndicators");
    indicatorButton.setAttribute("data-bs-slide-to", `${counter}`);
    indicatorButton.setAttribute("aria-label", `Slide ${counter + 1}`);
    if (counter == 0) {
      indicatorButton.setAttribute("class", "active");
      indicatorButton.setAttribute("aria-current", "true");
    }

    carouselIndicators.appendChild(indicatorButton);

    const carouselItem = document.createElement("div");
    carouselItem.setAttribute("class", "carousel-item");
    carouselItem.innerHTML = `<img src="${image}" class="activity-card-image d-block w-100" alt="...">`;
    if (counter == 0) {
      carouselItem.setAttribute("class", "carousel-item active");
    }

    carouselInner.appendChild(carouselItem);
    counter++;

  });

  const buttonPrev = document.createElement('button');
  buttonPrev.setAttribute("class", "carousel-control-prev");

  buttonPrev.setAttribute("type", "button")
  buttonPrev.setAttribute("data-bs-target", "#carouselExampleIndicators")
  buttonPrev.setAttribute("data-bs-slide", "prev");
  buttonPrev.innerHTML =
    `
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  `;

  const buttonNext = document.createElement('button');
  buttonNext.setAttribute("class", "carousel-control-next");
  buttonNext.setAttribute("type", "button");
  buttonNext.setAttribute("data-bs-target", "#carouselExampleIndicators");
  buttonNext.setAttribute("data-bs-slide", "next");
  buttonNext.innerHTML =
    `
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  `;

  mainDiv.appendChild(carouselIndicators);
  mainDiv.appendChild(carouselInner);
  mainDiv.appendChild(buttonPrev);
  mainDiv.appendChild(buttonNext);

  // ('#photo-gallery').replaceWith("mainDiv");
  photoGallery.append(mainDiv);
}


//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
let soldout=document.getElementById("reservation-panel-sold-out")
let reservation=document.getElementById("reservation-panel-available")
const cost=document.getElementById("reservation-person-cost")
if(adventure.available){
  soldout.style.display="none";
  reservation.style.display="block"
  cost.innerHTML=adventure.costPerHead;
}else{
  soldout.style.display="block";
  reservation.style.display="none"
}
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
let cost =document.getElementById("reservation-cost");
let totalCost=adventure.costPerHead*persons;
cost.innerHTML=totalCost;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
 // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let myForm = document.getElementById("myForm");
  myForm.addEventListener("submit", async(e) => {
    e.preventDefault();
    let data = {
      name: myForm.elements["name"].value,
      date:new Date(myForm.elements["date"].value),
      person: myForm.elements["person"].value,
      adventure: adventure["id"]
    }
    console.log(data);
    try{
      const url = `${config.backendEndpoint}/reservations/new`;
      const res = await fetch(url,{
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      });
      alert('Success!');
      window.location.reload();
    }
    catch(error){
      console.log(error);
      alert('Failed!');
    }
  });

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure["reserved"]){
    document.getElementById("reserved-banner").style.display = 'block';
  } 
  else{
    document.getElementById("reserved-banner").style.display = 'none';
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
