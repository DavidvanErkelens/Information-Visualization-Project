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
    }
    else if (type == "kills"){
      // update graphs
      show_line(output)
    }
    else if (type == "group"){
      show_piechart(output)
    }

    // output = JSON.parse(e.data);


};

// send data to server
conn.onopen = function(e) {
    console.log("Connection established!");

    // TODO remove this
    // delete dictionary["time"]

    conn.send(JSON.stringify(dictionary));
    conn.send(JSON.stringify(timeDict));
};

//  get the new data from the server based on the defined filters
function updatedata(){

  conn.send(JSON.stringify(dictionary));
  conn.send(JSON.stringify(timeDict));

}
