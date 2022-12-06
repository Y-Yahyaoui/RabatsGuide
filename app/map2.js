var map = L.map('map').setView([34.0255, -6.833], 16); 

new L.basemapsSwitcher([
    {
      layer: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map), //DEFAULT MAP
      icon: 'SwitchBasemap/example/assets/images/img1.PNG',
      name: 'Open street'
    },
    {
      layer: L.tileLayer('https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}'),
      icon: 'SwitchBasemap/example/assets/images/img2.PNG',
      name: 'Maps'
    },
    {
      layer: L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'),
      icon: 'SwitchBasemap/example/assets/images/sat.PNG',
      name: 'Satellite'
    },
    
  ], { position: 'topright' }).addTo(map);

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
  
var imageUrl = 'app/images/carte1/planmedina.png';
var errorOverlayUrl = 'https://cdn-icons-png.flaticon.com/512/110/110686.png';
var altText = 'Image of Newark, N.J. in 1922. Source: The University of Texas at Austin, UT Libraries Map Collection.';
var latLngBounds = L.latLngBounds([[34.0215, -6.84218], [34.03032, -6.82628]]);

var imageOverlay = L.imageOverlay(imageUrl, latLngBounds, {
    opacity: 0.8,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true
}).addTo(map);

function style(feature) {
  return {
      fillColor: 'white',
      weight: 2,
      opacity: 1,
      color: 'blue',
      dashArray: '3',
      fillOpacity: 0
  };
}

var medina = L.geoJson(medina, {style: style,
  onEachFeature: function (feature, layer) {layer.bindPopup(
      "</b><br> <center> <img src='app/images/carte1/"+ feature.properties.name + ".png" + "' style='width:200px;height:300x;'></center>" +
      "<b>Name : </b> " + feature.properties.name );
      layer.on('mouseover', function() { layer.openPopup(); });
      layer.on('mouseout', function() { layer.closePopup(); });   
  }})

medina.addTo(map)