var map = L.map('map', ).setView([33.977711, -6.865126], 12); 

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
  

function getColor(d) {
    return d == 5 ? '#800026' :
           d == 4 ? '#BD0026' :
           d == 3 ? '#E31A1C' :
           d == 2 ? '#FC4E2A' :
           d == 1 ? '#FD8D3C' :
                 '#FFEDA0';
}

function style1(feature) {
    return {
        fillColor: getColor(feature.properties.Matin),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}
function style2(feature) {
    return {
        fillColor: getColor(feature.properties.mid),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}
function style3(feature) {
    return {
        fillColor: getColor(feature.properties.Soiree),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

var att1 = L.geoJson(att, {style: style1,
    onEachFeature: function (feature, layer) {layer.bindPopup(
        "<b>Name : </b> " + feature.properties.nomcommune );
        layer.on('mouseover', function() { layer.openPopup(); });
        layer.on('mouseout', function() { layer.closePopup(); });   
    }})
var att2 = L.geoJson(att, {style: style2,
    onEachFeature: function (feature, layer) {layer.bindPopup(
        "<b>Name : </b> " + feature.properties.nomcommune );
        layer.on('mouseover', function() { layer.openPopup(); });
        layer.on('mouseout', function() { layer.closePopup(); });   
    }})
var att3 = L.geoJson(att, {style: style3,
    onEachFeature: function (feature, layer) {layer.bindPopup(
        "<b>Name : </b> " + feature.properties.nomcommune );
        layer.on('mouseover', function() { layer.openPopup(); });
        layer.on('mouseout', function() { layer.closePopup(); });   
    }})

function changeMapFunction({value}) {
    if (value == 1) {
        att2.remove();
        att3.remove();
        att1.addTo(map)
    } else if (value == 2) {
        att1.remove();
        att3.remove();
        att2.addTo(map)
    } else if (value == 3) {
        att2.remove();
        att1.remove();
        att3.addTo(map)
    }
}

L.control.timelineSlider({
    timelineItems: ["Matin", "Après-midi", "Soirée"],
    changeMap: ({value})=>changeMapFunction({value}) })
.addTo(map);

// légende 

L.control.Legend({
            position: "bottomleft",
            collapsed: false,
            symbolWidth: 24,
            opacity: 1,
            column: 1,
            legends: [{
                label: "Super busy",
                type: "polygon",
                sides: 4,
                color: "black",
                fillColor: '#800026',
                weight: 0.5,
            }, {
                label: " Busy",
                type: "polygon",
                sides: 4,
                color: "black",
                fillColor: '#BD0026',
                weight: 0.5
            }, {
                label: " Moderate",
                type: "polygon",
                sides: 4,
                color: "black",
                fillColor: '#E31A1C',
                weight: 0.5
            },{
                label: " Calm",
                type: "polygon",
                sides: 4,
                color: "black",
                fillColor: '#FC4E2A',
                weight: 0.5
            },{
                label: " Empty",
                type: "polygon",
                sides: 4,
                color: "black",
                fillColor: '#FD8D3C',
                weight: 0.5
             }]
        })
        .addTo(map);

