(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window.webaudio = require('webaudio')
},{"webaudio":2}],2:[function(require,module,exports){
module.exports = function (context, fn) {
	
    if (typeof context === 'function') {
      var Context = window.AudioContext || window.webkitAudioContext;
      if (!Context) throw new Error('AudioContext not supported');
      fn = context;
      context = new Context();
    }

    var self = context.createScriptProcessor(2048, 1, 1);

	  self.fn = fn
	
	  self.i = self.t = 0
	
  	window._SAMPLERATE = self.sampleRate = self.rate = context.sampleRate;

		self.duration = Infinity;
		
		self.recording = false;

	  self.onaudioprocess = function(e){
	    var output = e.outputBuffer.getChannelData(0)
			,   input = e.inputBuffer.getChannelData(0);
			self.tick(output, input);
	  };
	
		self.tick = function (output, input) { // a fill-a-buffer function

		    output = output || self._buffer;
		
		    input = input || []

		    for (var i = 0; i < output.length; i += 1) {

		        self.t = self.i / self.rate;
		
		        self.i += 1;

						output[i] = self.fn(self.t, self.i, input[i]);
						
		        if(self.i >= self.duration) {
			    		self.stop()
			    		break;
		        }

		    }

		    return output
		};
		
		self.stop = function(){
			self.disconnect();
			
		  self.playing = false;
		
		  if(self.recording) {
  		}
		};

		self.play = function(opts){

		  if (self.playing) return;

		  self.connect(self.context.destination);
		
		  self.playing = true;

		// this timeout seems to be the thing that keeps the audio from clipping #WTFALEART

		  setTimeout(function(){this.node.disconnect()}, 100000000000)

		  return
		};

		self.record = function(){

		};
		
		self.reset = function(){
			self.i = self.t = 0
		};
		
		self.createSample = function(duration){
			self.reset();
	    var buffer = self.context.createBuffer(1, duration, self.context.sampleRate)
			var blob = buffer.getChannelData(0);
	    self.tick(blob);
			return buffer
		};

    return self;
};

function mergeArgs (opts, args) {
    Object.keys(opts || {}).forEach(function (key) {
        args[key] = opts[key];
    });
    
    return Object.keys(args).reduce(function (acc, key) {
        var dash = key.length === 1 ? '-' : '--';
        return acc.concat(dash + key, args[key]);
    }, []);
}

function signed (n) {
    if (isNaN(n)) return 0;
    var b = Math.pow(2, 15);
    return n > 0
        ? Math.min(b - 1, Math.floor((b * n) - 1))
        : Math.max(-b, Math.ceil((b * n) - 1))
    ;
}

},{}]},{},[1]);
