//Set up map
mapboxgl.accessToken =
  "pk.eyJ1IjoiZWx1YmtlcnQiLCJhIjoiY2t3bnRrZGE5MnBiMDJ3bm83ajJzNmdsbSJ9.gNlGSNgdPprLjyplfkm7kQ";

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-71.104081, 42.365554],
  zoom: 12,
});
//Get bus data from MBTA and route from user input
async function getBusLocations() {
  const userInput = document.getElementById('busRouteInput').value;

  const url = "https://api-v3.mbta.com/vehicles";
  const response = await fetch(url);
  const json = await response.json();
  //console.log(json.data);
  let filteredRoute = json.data.filter(bus => bus.relationships.route.data.id === userInput);
  return filteredRoute;
}

//create marker and popup for each location
async function addLocations(){
  const locations = await getBusLocations();
  console.log(locations);
  
  locations.forEach((bus) => {
    const popup = new mapboxgl.Popup({closeButton: true})
      .setLngLat([bus.attributes.longitude, bus.attributes.latitude])
      .setHTML(`Route ${bus.relationships.route.data.id}, Bus ${bus.attributes.label}`);
    
      const marker = new mapboxgl.Marker()
      .setLngLat([bus.attributes.longitude, bus.attributes.latitude])
      .setPopup(popup)
      .addTo(map);
    setTimeout(() => {marker.remove()}, 4999);
  });
}

//move markers to updated location
function move(){
    setTimeout(() => {
      addLocations();
      move();
    }, 5000)};