// Connect to socket
var conn = new WebSocket('ws://davidvanerkelens.nl:8080');

// return data
conn.onmessage = function(e) {
  console.log('answer from socket')

    output = JSON.parse(e.data);
    drawmap(output);
<<<<<<< HEAD
    var yearGraph = drawTime("#timegraph", lineData);
  
=======

>>>>>>> 21fc6d0af680d5f2509934a5a90c36aee7822d04
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
