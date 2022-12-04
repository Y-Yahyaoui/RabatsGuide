// var map = L.map('map').setView([34.015, -6.83], 13); 

// new L.basemapsSwitcher([
//     {
//       layer: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       }).addTo(map), //DEFAULT MAP
//       icon: 'SwitchBasemap/example/assets/images/img1.PNG',
//       name: 'Open street'
//     },
//     {
//       layer: L.tileLayer('https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}'),
//       icon: 'SwitchBasemap/example/assets/images/img2.PNG',
//       name: 'Maps'
//     },
//     {
//       layer: L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'),
//       icon: 'SwitchBasemap/example/assets/images/sat.PNG',
//       name: 'Satellite'
//     },
    
//   ], { position: 'topright' }).addTo(map);

//   		// create fullscreen control
//           var fsControl = L.control.fullscreen();
//           // add fullscreen control to the map
//           map.addControl(fsControl);
  
//           // detect fullscreen toggling
//           map.on('enterFullscreen', function(){
//               if(window.console) window.console.log('enterFullscreen');
//           });
//           map.on('exitFullscreen', function(){
//               if(window.console) window.console.log('exitFullscreen');
//           });


// initalize leaflet map
var map = L.map('map').setView([34.015, -6.83], 13);

// add OpenStreetMap basemap
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var url_to_geotiff_file = "img/rabat/Rabat42_modified.tif";

fetch(url_to_geotiff_file)
  .then(response => response.arrayBuffer())
  .then(arrayBuffer => {
    parseGeoraster(arrayBuffer).then(georaster => {
      console.log("georaster:", georaster);

      /*
          GeoRasterLayer is an extension of GridLayer,
          which means can use GridLayer options like opacity.

          Just make sure to include the georaster option!

          Optionally set the pixelValuesToColorFn function option to customize
          how values for a pixel are translated to a color.

          http://leafletjs.com/reference-1.2.0.html#gridlayer
      */
      var layer = new GeoRasterLayer({
          georaster: georaster,
          opacity: 0.7,
          // pixelValuesToColorFn: values => values[0] === 42 ? '#ffffff' : '#000000',
          // resolution: 64 // optional parameter for adjusting display resolution
      });
      layer.addTo(map);

      map.fitBounds(layer.getBounds());

  });
});