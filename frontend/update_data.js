// Connect to socket
var conn = new WebSocket('ws://davidvanerkelens.nl:8080');


first = true
// return data
conn.onmessage = function(e) {
	console.log('answer from socket')
	parsed = JSON.parse(e.data);

		// show new year timeframe
		show_years()

    type = parsed.type;
    output = parsed.data;


    if (type == 'main'){

      svg_load_text.style("visibility", "hidden");
      stillLoading = false;

      if(first){
        drawmap(output);
        first = false
      }

      else if(!first){
        update_map_color(output)
      }
    }
    else if (type == "time"){
    	drawTime("#timegraph", output);
    	console.log(output)
    }
    else if (type == "kills"){
      // update graphs
      show_line(output)
    }
    else if (type == "group"){
      show_piechart(output)
    }


};

// send data to server
conn.onopen = function(e) {
    console.log("Connection established!");

    svg_load_text.style("visibility", "visible");

    stillLoading = true;

    conn.send(JSON.stringify(dictionary));
    conn.send(JSON.stringify(timeDict));
};

//  get the new data from the server based on the defined filters
function updatedata(){
	console.log('updatedata',dictionary.type)

  svg_load_text.style("visibility", "visible");

  stillLoading = true;

  conn.send(JSON.stringify(dictionary));
  conn.send(JSON.stringify(timeDict));

}
