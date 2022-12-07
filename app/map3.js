var map = L.map('map').setView([34.015, -6.83], 13); 

new L.basemapsSwitcher([
  {
    layer: L.tileLayer('https://api.mapbox.com/styles/v1/nafissa1809/clbcvdaxm002914o0nj4d8kc0/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibmFmaXNzYTE4MDkiLCJhIjoiY2xiYTFtZDJkMTBlZjNxcWh1aHdwbnp0aCJ9.OBCk9K8H_5L_JfgvBgT8jQ', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map), //DEFAULT MAP
    icon: 'SwitchBasemap/example/assets/images/img1.PNG',
    name: 'Map box'
  },
  {
    layer: L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'),
    icon: 'SwitchBasemap/example/assets/images/img2.PNG',
    name: 'Maps'
  },
  {
    layer: L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}'),
    icon: 'SwitchBasemap/example/assets/images/sat.PNG',
    name: 'Satellite'
  }], { position: 'topright' }).addTo(map);

  		// create fullscreen control
          var fsControl = L.control.fullscreen();
          // add fullscreen control to the map
          map.addControl(fsControl);
  
          // detect fullscreen toggling
          map.on('enterFullscreen', function(){
              if(window.console) window.console.log('enterFullscreen');
          });
          map.on('exitFullscreen', function(){
              if(window.console) window.console.log('exitFullscreen');
          });
  
function getColor(d) {
    return d == 1 ? '#d64798' :
           d == 2 ? '#9a51f5' :
           d == 3 ? '#6d19d4' :
                  '#FFEDA0';
}

function style1(feature) {
  return {
      color: getColor(feature.properties.Ligne),
      weight: 4,
      opacity: 1,
  };
}

L.geoJson(reseau, {style: style1}).addTo(map);

var IconTram = L.icon({
  iconUrl: 'app/images/tram.png',
  iconSize:     [20, 20], // size of the icon
  shadowSize:   [15, 15], // size of the shadow
  iconAnchor:   [10, 10], // point of the icon which will correspond to marker's location
  shadowAnchor: [15, 15],  // the same for the shadow
  popupAnchor:  [0, -20] // point from which the popup should open relative to the iconAnchor
});

L.geoJson(station, {
  pointToLayer: function(feature,latlng){
      return L.marker(latlng,{icon: IconTram})                   
  }, 
  onEachFeature: function (feature, layer) {layer.bindPopup(
      "<b>Station : </b> " + feature.properties.Nom_Statio
      );
  }
}).addTo(map);


// légende 

L.control.Legend({
  position: "bottomleft",
  collapsed: false,
  symbolWidth: 24,
  opacity: 1,
  column: 1,
  legends: [{ 
      label: "  Ligne 1",
      type: "polyline",
      color: '#d64798',
      weight: 1,
  }, {
    label: "  Ligne 2",
    type: "polyline",
    color: '#9a51f5',
    weight: 1,
  }, {
    label: "  Tronc commun",
    type: "polyline",
    color: '#6d19d4',
    weight: 1,
  },{
      label: "  Station",
      type: "image",
      url: "app/images/tram.png"
  }]
})
.addTo(map);
