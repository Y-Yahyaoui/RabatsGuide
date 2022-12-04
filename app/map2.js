var map = L.map('map').setView([33.977711, -6.865126], 12); 

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
  
