// Connect to socket
var conn = new WebSocket('ws://davidvanerkelens.nl:8080');

// return data
conn.onmessage = function(e) {
  console.log('answer from socket')

    parsed = JSON.parse(e.data);

    type = parsed.type;
    output = parsed.data;

    if (type == 'main'){
    	drawmap(output);	
    }
    else if (type == "time"){
    	drawTime("#timegraph", lineData);
    }
    
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
  conn.send(JSON.stringify(timeDict));
  console.log('lekker pik')

}
