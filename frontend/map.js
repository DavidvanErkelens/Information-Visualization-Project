// append svg to body
var svg = d3.select("body").append("svg")

// Projection for map overview
var projection = d3.geoMercator()
  .translate([960, 500])

// create path based on projection
var path = d3.geoPath()
  .projection(projection);

//
var url = "http://enjalot.github.io/wwsd/data/world/world-110m.geojson";
d3.json(url, function(err, geojson) {

  // TODO clean geojson

  svg.append("path")
    .attr("d", path(geojson))
})
