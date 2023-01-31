//iss api url using leathlet.js
const iss_api_url = "https://api.wheretheiss.at/v1/satellites/25544";

//making a map and tiles
const myMap = L.map("issMap").setView([0, 0], 1.5);
const attribution =
  '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> ';

const tileUrl = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(myMap);

//making a marker with a custom icon
const issIcon = L.icon({
  iconUrl: "./International_Space_Station.svg.png",
  iconSize: [50, 32],
  iconAnchor: [25, 16],
  popupAnchor: [-3, -76],
});
const marker = L.marker([0, 0], { icon: issIcon }).addTo(myMap);

let firstTime = true;
async function getISS() {
  const response = await fetch(iss_api_url);
  const data = await response.json();
  const { latitude, longitude, altitude } = data;

  marker.setLatLng([latitude, longitude]).addTo(myMap);
  if (firstTime) {
    myMap.setView([latitude, longitude], 4);
    firstTime = false;
  }
  document.getElementById("lat").innerHTML = latitude.toFixed(2);
  document.getElementById("lon").innerHTML = longitude.toFixed(2);
  document.getElementById("alt").innerHTML = altitude.toFixed(2);
}

getISS();
setInterval(getISS, 2000);
