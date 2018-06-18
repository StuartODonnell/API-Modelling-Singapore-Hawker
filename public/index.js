
const app = function(){

  const url = "https://api.jael.ee/datasets/hawker";
  makeRequest(url, requestComplete);


}

const drawMap = function () {
  const mapDiv = document.getElementById("main-map");
  const singapore = [1.290270, 103.851959];
  const zoomLevel = 15;
  const mainMap = new MapWrapper(mapDiv, singapore, zoomLevel);

  makeButton(mainMap);

  const locationButton = document.querySelector("#location");
  locationButton.addEventListener("click", function() {
    mainMap.currentLocation();
  });
}

const makeButton = function(map) {
  const button = document.getElementById("stall-button");
  button.addEventListener("click", function() {
    map.moveMap([1.290270, 103.851959]);
  });
}

const makeRequest = function (url, callback){
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
}

const requestComplete = function (){
  if(this.status !== 200) return;
  const stalls = JSON.parse(this.response);
  populateDropDown(stalls);
  // populateList(stalls);
}

const populateList = function(stalls){

  const div = document.querySelector("#stall-data")
  stalls.forEach(function(stall){
    const li = document.createElement("li");
    li.textContent = stall.name;
    div.appendChild(li);
  })

}

const populateDropDown = function(stalls){

  const select = document.querySelector("#stall-select");
  stalls.forEach(function(stall){
    const option = document.createElement("option");
    option.textContent = stall.name;
    option.value = stall.name;
    select.appendChild(option);
  })

  select.addEventListener("change", function(){
    populateStallData(stalls);
  })

}

const populateStallData = function(stalls){
  const select = document.querySelector("#stall-select");
  const div = document.querySelector("#stall-data")
  div.innerHTML = "";
  const p = document.createElement("h1");
  const p2 = document.createElement("h2");
  const a1 = document.createElement('img');
  const p3 = document.createElement("p");
  const p4 = document.createElement("p");
  const p5 = document.createElement("p");
  const p6 = document.createElement("p");


  selectedStall = select.value;
  result = null;
  stalls.forEach(function(stall){
    if(stall.name === selectedStall){
      result = stall;
    }
  })

  p.textContent = result.name;
  p2.textContent = result.address;
  p3.textContent = result.lat;
  p4.textContent = result.lng;
  p5.textContent = `Cooked food stalls: ${result.cookedfoodstalls}`;
  p6.textContent = `Market produce stalls: ${result.mktproducestalls}`;

// insert map integration element
  // a1.src = result.map_url;
  // a1.width = 500;




  div.appendChild(p);
  div.appendChild(p2);
  // div.appendChild(a1);
  div.appendChild(p3);
  div.appendChild(p4);
  div.appendChild(p5);
  div.appendChild(p6);



}

window.addEventListener('load', app);
window.addEventListener("load", drawMap);
