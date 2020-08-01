/* https://github.com/stillChris/lissajous */

var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

/*
    Lissaious Patterns

    of the form:

    x = scaleX * cos(t * freqX + phaseX) + offsetX
    y = scaleY * sin(t * freqY + phaseY) + offsetY

    where:

    scaleX, scaleY
       will be statically set to fill available display
    offsetX, offsetY
       will be statically set to position origin at center of
       display
    phaseX - phaseY
       represents the phase relationship between 2 signals
    freqX / freqY
       is frequency ratio between 2 signals

Manually adjust phaseX and phaseY to show effect of phase misalignment.

Manually adjust freqX and freqY to show effect of harmonic distortion. 

Default setting phaseX = phaseY = 0, freqX = 5 & freqY = 4.

Try setting phaseX = 0 phaseY = 90 and freqX=freqY=1 to draft a perfect circle 
 
Chris Isabelle, Khan Academy, circa 2015 
*/


var x = 0;
var y = 0;

var scaleX = 75;
var scaleY = 100;
var offsetX = scaleX+50;
var offsetY = scaleY+50;
var phaseX = 0;
var phaseY = 0;
var freqX = 4;
var freqY = 3;
var scaleD = .056;

// traceArray holds x and y points for one complete cycle
var traceArray = [0];
var traceDepthMax = 720;
var iDegrees;

function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

var twoPi = (Math.PI * 2);

function animateLissaious()
{
	phaseY+=.1;
	wait(50);
	requestAnimationFrame(animateLissaious);
	{
		c.clearRect(0, 0, offsetX*2, offsetY*2);

		//populate traceArray
		for(iDegrees = 0; iDegrees < traceDepthMax; iDegrees+=2)
		{	
			//define current point
			traceArray[iDegrees] = scaleX * Math.cos(((scaleD * iDegrees * freqX) + phaseX)/twoPi) + (offsetX);
			traceArray[iDegrees+1] = scaleY * Math.sin(((scaleD * iDegrees * freqY) + phaseY)/twoPi) + (offsetY);
		}

		//plot traceArray
		c.beginPath();
		for(iDegrees=0; iDegrees<traceDepthMax; iDegrees+=2)
		{
			if(iDegrees<360)
				c.arc(traceArray[iDegrees], traceArray[iDegrees+1], .1, 0, twoPi, false);
			else
				c.arc(traceArray[iDegrees], traceArray[iDegrees+1], .1, 0, twoPi, false);
		}
		c.strokeStyle= "#000000"
		c.stroke();
	}
}

animateLissaious();
