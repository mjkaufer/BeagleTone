var socket = io('http://localhost')
// socket.emit('potentiometer',{pot1: p1Val, pot2: p2Val})
socket.on('connect', function(){
	console.log("ay")
})

var latestData = {pot1: 0, pot2: 0}
var playing = false

socket.on('potentiometerReceived', function (data) {
	console.log(data);
	latestData = data
	if(!playing){
		playing = true
		channel.play()
	}
});

var webaudio = window.webaudio;
var baseFreq = 440;
tau = Math.PI * 2

function majorChord(time, i){
	return (sound(time, i, 0) + sound(time, i, 4/12) + sound(time, i, 7/12)) / 3
}

function sound(time, i, shift){
	// var semitone = Math.round((latestData.pot1 - 0.5) * 12) / 12//for chromatic steps
	var semitone = (latestData.pot1 - 0.5) * 2
	var freq = baseFreq*Math.pow(2,semitone+shift)

	var fuzz = latestData.pot2

	var sineWave = Math.sin(time * tau * freq)

	return sineWave * (1-fuzz) + sineWave / Math.abs(sineWave) * fuzz
}

// var channel = webaudio(sound);
var channel = webaudio(majorChord);


