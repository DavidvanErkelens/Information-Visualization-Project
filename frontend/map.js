// append svg to body
var svg = d3.select("body").append("svg")

// Projection for map overview
var projection = d3.geoMercator()
.translate([960, 500])

// create path based on projection
var path = d3.geoPath()
.projection(projection);

// open geojson
var url = "http://enjalot.github.io/wwsd/data/world/world-110m.geojson";
d3.json(url, function(err, geojson) {

  // clean geojson
  var new_geojson = {type: "FeatureCollection", features : []}

  // get attack attack json now uses fake data
  var attack_json = [{country_txt : "Afghanistan", region_txt: 01, iyear : 2018, imonth : 01, "iday" :
  01, attacktypeN : 01, attacktypeN_txt : "bombing", targtypeN : 01,
  tartypeN_txt : "president", gname : "isis", nkill : 01, nwound :01}, {country_txt : "Afghanistan", region_txt: 01, iyear : 2018, imonth : 01, "iday" :
  01, attacktypeN : 01, attacktypeN_txt : "bombing", targtypeN : 01,
  tartypeN_txt : "president", gname : "isis", nkill : 01, nwound :01}, {country_txt : "Angola", region_txt: 01, iyear : 2018, imonth : 01, "iday" :
  01, attacktypeN : 01, attacktypeN_txt : "bombing", targtypeN : 01,
  tartypeN_txt : "president", gname : "isis", nkill : 01, nwound :01}];

  //  loop through geojson per country
  for(var i = 0; i< geojson.features.length;i++){

    // remove Antarctica
    if (geojson.features[i].properties.name != "Antarctica"){

      //  get the country features
      country_features = geojson.features[i]

      // select attacks for current country and add them to the geojson
      country_features.properties.attack = attack_json.filter(function( obj ) {
        return obj.country_txt == geojson.features[i].properties.name;
      });

      // add country to new geojson
      new_geojson.features.push(geojson.features[i])
    }
  }

  console.log(new_geojson);
  // append cleaned geojson to svg
  svg.append("path")
  .attr("d", path(new_geojson))
})
