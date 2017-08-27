import React, { Component } from 'react';
import '../../client/main.html';
var mapboxgl = require('mapbox-gl');
var MapboxDraw = require('mapbox-gl-draw');

var coordenadasMap = 0;
var coordenadasMou = 0;
var infoDraw;
var coordenadasMapArray = new Array();
var coordenadasMouArray = new Array();
var colectPoint;

export default class AppSinApi extends Component {
	render() {
		mapboxgl.accessToken = 'pk.eyJ1IjoiamNhcm1vbmEiLCJhIjoiY2oxanJld3pwMDI1azMzb2E2aXBkM3NodiJ9.FpYqGz5lfjBv8KLA7DsjJQ';

		var map = new mapboxgl.Map({
		    container: 'map',
		    style: 'mapbox://styles/mapbox/satellite-v9',
		    center: [-91.874, 42.760],
		    zoom: 12
		});

		var draw = new MapboxDraw({
		    displayControlsDefault: false,
		    controls: {
		        polygon: true,
		        trash: true
		    }
		});

		map.addControl(draw); //add draw control
		/*map.addControl(new MapboxGeocoder({
    		accessToken: mapboxgl.accessToken
		}));*/

	$(".mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_polygon").click(function(){
		console.log("boton de dibujo presionado");
	});

	//calculo de coordenadas
map.on('mousedown', function (e) {
	//FIX---------------------
	isDraw = $('.mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_polygon').hasClass('active');
	//if(isDraw == true){
	coordenadasMap = e.lngLat;
	coordenadasMou = e.point;
	coordenadasMapArray.unshift(coordenadasMap);
	coordenadasMouArray.unshift(coordenadasMou);
	console.log(e.lngLat,coordenadasMou);
	colectPoint=true;
	//}else{
	console.log("el boton de dibujo no esta activo: ",isDraw);
	//}
});

//guardando los puntos dibujados y su etiqueta
map.on('dblclick', function (e) {
	//if(colectPoint){
	colectPoint=false;
	var label = prompt("Enter a label for you draw:", "fly zone 1");
	var label2 = prompt("Enter a Description:", "This is a good zone for fly");
	if (label == null || label == "") {
		infoDraw = "Cancelled";
	} else {

	infoDraw = {label:label, Desc:label2, coorMap: coordenadasMapArray};

	//creando 2 tablas
	ZonesNames.insert({name:infoDraw.label, desc: infoDraw.Desc});
	for(var i=0; i < coordenadasMapArray.length; i++){
		Zones.insert({name:infoDraw.label,
		lng:infoDraw.coorMap[i].lat,
		lat:infoDraw.coorMap[i].lng});
	}
	console.log("stored: ",infoDraw);
	alert("We just stored a new Fly zone:\n  Name: "+infoDraw.label+"\n  Description: "+infoDraw.Desc+"\n\nYou can access this new zone through zones in the menu.");
	}
	//}
});

//Cambiando la visualizacion del mapa
$('#mapsViews li a').on('click', function(){
	var typeView = $(this).text().toString();
	console.log("opcion: ",typeView);
	if(typeView != "3d")
		map.setStyle('mapbox://styles/mapbox/'+typeView+'-v9');
	else
		alert("funcion aun no disponible.");
});

//consultando las zonas para colocarlas en el menu
$('#zoneMenuFa').on('click', function(){
	var t = ZonesNames.find().forEach(function(item){
		$('#zoneMenu').append("<li><span class='glyphicon glyphicon-eye-open' style='    padding-left: 10px;'></span><span class='glyphicon glyphicon-share' style='padding-left: 3px;'></span><span class='glyphicon glyphicon-trash' style='padding-left: 3px;'></span><span style='padding-left: 10px;'>"+item.name+"</span></li>");
		$('#zoneMenu').append("<li role='separator' class='divider'></li>");
	});
});

//need fix
//calendar Modal is close
$('#myModal2').on('hidden.bs.modal', function () {
	console.log("modal cerrado");
});

//vaciar dropdown menu cuando se oculta
$('#zoneMenuFa').on('hidden.bs.dropdown', function(){
	$('#zoneMenu').children().remove();
});

//seleccionar zona guardada
$('#zoneMenu').on('click', function(){ $(this).attr('id');
	var labelzone = $(this).text().toString();
	console.log("zona seleccionada--: ",$('#zoneMenu ').text());
});
	return ({map});
}
}
