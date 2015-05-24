/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

window.onload =  function () {
    var socket = io();
   
    document.getElementById('title').addEventListener("click", function() {
    	var data = {
    		x : getRandomArbitrary(0, 11),
	    	y : getRandomArbitrary(0, 11)
    	}

    	socket.emit('move', data);
    });
}