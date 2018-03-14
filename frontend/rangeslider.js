// var svg = d3.select("svg")

var svg2 = d3.select("body").append("svg")
.attr("class", "svg2");

// add slider object
svg2.append("foreignObject")
.attr("x", "0")
.attr("y", "0")
.attr("width" , "100%")
.append("xhtml:div")
  .attr("id", "slider-container")
  .style("border", "solid black 1px")
  .style("background-color", "rgba(192, 192, 192, 0.4)")
  .style("display", "block")
  .style("overflow", "hidden")
  .style("overflow-y","scroll")
  .style("height", "50px")

// Create slider spanning the range from 0 to 10
var slider = createD3RangeSlider(0, 10, "#slider-container");

// Range changes to 3-6
slider.range(1,2);

// Slider listener
slider.onChange(function(newRange){
   console.log(newRange);
});

// Range changes to 7-10
// Warning is printed that you attempted to set a range (8-11) outside the limits (0-10)
// "{begin: 7, end: 10}" is printed in the console because of the listener
slider.range(2);

// Access currently set range
var curRange = slider.range();

// "7-10" is written to the current position in the document
document.write(curRange.begin + "-" + curRange.end);
