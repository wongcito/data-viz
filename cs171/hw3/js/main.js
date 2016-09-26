
var w = 500;
var h = 500;
var l = -195;

var dataset = d3.csv("data/buildings.csv",dataLoaded);
var svg = d3.select("#columna1")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

function dataLoaded(data){

	data.sort(function(a,b){ return b.height_px - a.height_px; });

	var svgs = svg.selectAll("rect")
   .data(data)
   .enter()
   .append("rect");

	svgs.attr("x", 240)
	  .attr("y", function(d,i){
			return i * h / data.length;
		})
		.style("fill", "#9C27B0")
		.attr("width", function(d){
			return d.height_px;
		})
		.attr("height", 15)
		.on("click", function(d){
			document.getElementById("title_city").innerHTML = d.building;
	 	 document.getElementById("cityTitle").innerHTML =  "City";
	 	 document.getElementById("countryTitle").innerHTML =  "Country";
	 	 document.getElementById("heightTitle").innerHTML =  "Height";
	 	 document.getElementById("floorTitle").innerHTML =  "Floors";
	 	 document.getElementById("yearTitle").innerHTML =  "Year";
		 document.getElementById("cityDet").innerHTML =  d.city;
	 	 document.getElementById("countryDet").innerHTML =  d.country;
	 	 document.getElementById("heightDet").innerHTML =  d.height_m + " m.";
	 	 document.getElementById("floorDet").innerHTML =  d.floors;
	 	 document.getElementById("yearDet").innerHTML =  d.completed;
	 document.getElementById("myImg").src = "data/img/" + d.image;
		});



		var texts = svg.selectAll("text")
		                .data(data)
		                .enter();

		texts.append("text")
		.attr("class", "names")
		.text(function(d) {
				 return d.building;
		})
		.attr("x", 220)
		.attr("y", function(d,i) {
				 return 10 + i * h / data.length;
		})
		.attr("text-anchor", "end")
		.on("click", function(d){
			document.getElementById("title_city").innerHTML = d.building;
	 	 document.getElementById("cityTitle").innerHTML =  "City";
	 	 document.getElementById("countryTitle").innerHTML =  "Country";
	 	 document.getElementById("heightTitle").innerHTML =  "Height";
	 	 document.getElementById("floorTitle").innerHTML =  "Floors";
	 	 document.getElementById("yearTitle").innerHTML =  "Year";
		 document.getElementById("cityDet").innerHTML =  d.city;
	 	 document.getElementById("countryDet").innerHTML =  d.country;
	 	 document.getElementById("heightDet").innerHTML =  d.height_m;
	 	 document.getElementById("floorDet").innerHTML =  d.floors;
	 	 document.getElementById("yearDet").innerHTML =  d.completed;
	 document.getElementById("myImg").src = "data/img/" + d.image;
		});
		     // set position etc.

		texts.append("text")
		.attr("class", "meters")
		.text(function(d) {
					return d.height_m;
		 })
		.attr("x", function(d){
			return d.height_px - l;
		})
		 .attr("y", function(d,i) {
					return 12 + i * h / data.length;
		 })
		 .attr("text-anchor", "end");



}
