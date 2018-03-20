// Connect to socket
var conn = new WebSocket('ws://davidvanerkelens.nl:8080');

first = true

// return data
conn.onmessage = function(e) {
  console.log('answer from socket')

    output = JSON.parse(e.data);

    if(first){
      drawmap(output);
      first = false
    }

    else if(!first){
      update_map_color(output)
    }

    var yearGraph = drawTime("#timegraph", lineData);
};

// send data to server
conn.onopen = function(e) {
    console.log("Connection established!");

    // TODO remove this
    // delete dictionary["time"]

    conn.send(JSON.stringify(dictionary));
};

//  get the new data from the server based on the defined filters
function updatedata(){

  conn.send(JSON.stringify(dictionary));
  console.log('lekker pik')

}
