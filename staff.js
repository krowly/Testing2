var mymap = L.map('mapid',{drawControl: true}).setView([43.000869,41.01136 ], 16);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoic2NhcnMiLCJhIjoiY2tqdHN6bDJjOGNkeDJ6bGdudWhzZ3RweCJ9.VQnPLd6-0ZwToBHHYjMr8Q'
}).addTo(mymap);

////Building Management Strategy Trains Survival 



var batteryIcon = L.icon({
	iconUrl : 'bat.png',
	iconSize: [25,33]}
);	

mymap.on('click',function(e){
/* var marker = L.marker(e.latlng,{icon:batteryIcon}).on('click', function(e){
	var string = "<h6>PlaceName</h6><p>PlaceAdress like street and number</p><p>Phone Number</p>";
	marker.bindPopup(string).openPopup();
}
);
 batmarkers.addLayer(marker); */
var batAdd = {
    "type": "Feature",
    "properties": {
        "Name": "",
        "Adress": "",
        "Comment": ""
    },
    "geometry": {
        "type": "Point",
        "coordinates": [e.latlng.lng,e.latlng.lat]
    }

 };
 
batdumps.push(batAdd);
refr(); 
})

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:json;charset=utf-8,' +encodeURIComponent('var batdumps='+text));
  element.setAttribute('download',filename+'.json');
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function saveJ()
{
	download('batdumps',JSON.stringify(batdumps));
}

function onEachFeature(feature, layer) {

		var ccc = document.createElement('form');
		$.ajax({url: "/Testing2/Pages/elements/LPopElement.html", success: function(result){
			$(ccc).html(result);
			$(".nfield",ccc).val(feature.properties.Name);
			$(".afield",ccc).val(feature.properties.Adress);
			$(".cfield",ccc).val(feature.properties.Comment);
			$(".cbrewrite",ccc).click(function(){
				feature.properties.Name= $(".nfield",ccc).val();
				feature.properties.Adress= $(".afield",ccc).val();
				feature.properties.Comment= $(".cfield",ccc).val();
			});
			$(".cbremove",ccc).click(function(){
				batdumps = batdumps.filter((bd) =>
					bd != feature
				);
				refr();
			});

		}});	
		layer.bindPopup(ccc);
}
function pointToLayer(geoJsonPoint, latlng){
	var options = {
		icon:batteryIcon
	}
	return L.marker(latlng,options);
}


var batGLAYER = L.geoJson(batdumps,{onEachFeature: onEachFeature, pointToLayer: pointToLayer});

function refr(){
	batGLAYER.clearLayers();
	batGLAYER = L.geoJson(batdumps,{onEachFeature: onEachFeature, pointToLayer: pointToLayer});
	batGLAYER.addTo(mymap);
}
refr();
