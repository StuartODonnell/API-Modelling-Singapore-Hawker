const MapWrapper = function(element, coords, zoom) {
  const osmLayer = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
  this.map = L.map(element)
    .addLayer(osmLayer)
    .setView(coords, zoom);
  this.map.on("click", function(event) {
    this.addMarker(event.latlng);
  }.bind(this))

}

MapWrapper.prototype.addMarker = function (coords) {
  L.marker(coords).addTo(this.map);
};

MapWrapper.prototype.moveMap = function (coords) {
  this.map.flyTo(coords);
};

MapWrapper.prototype.addInfoWindow = function () {
  const myMarker = new L.marker([1.290270, 103.851959], {
    title: "Heart Of Singapore"
  }).bindPopup(`<a href="http://codeclan.com">Singapore</a>`).openPopup();
  myMarker.addTo(this.map);
};
