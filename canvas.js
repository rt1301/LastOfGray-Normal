window.onload = function()
{
	var requestAnimFrame = (function () 
	{
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 60, new Date().getTime());
    }})();
    
	var  ctx, toggle;
	var canvas = document.querySelector("canvas");
	var width = window.innerWidth - 40;
	var height = window.innerHeight - 40;
	var direction = false;
	var interval;
	// function to initialize the program
	function init()
	{
		canvas.width = window.innerWidth - 40;
		canvas.height = window.innerHeight - 40;
		ctx = canvas.getContext('2d');
		interval = setInterval(animate,1);
	}
	// Colors of the arc
	var colors = ["steelblue","yellow"];
	// Creating Arcs of different colors
	var ring = [];
	for(var i=0;i<2;i++)
	{
		ring.push(new circle(width/2,height/2,colors[i],100,direction,1));
		direction = !direction;
	}
	
	// Stop function
	function stop () 
	{
		clearInterval(interval); 
	}
// Animate function
	 function animate()
	{
		 // requestAnimationFrame(animate);
		ctx.clearRect(0, 0, width, height);
    	ring.forEach(function (element) 
    	{
    		element.update();
    		element.angle += 0.5*Math.PI/180;
    	});
    	end();
    	
	}

   init();


	window.addEventListener("mousemove",function(event)
	{
				mouse.x = event.x;
				mouse.y = event.y;
	});
// Creating the bouncing ball
var ball = new circle(width/2,height/2 + 200, "yellow", 5, direction,2);

// Circle object
	function circle(x,y,color,radius,direction,radian)
	{
		this.x = x;
		this.y = y;
		this.color = color;
		this.radius = radius;
		this.angle = 0;
		this.direction = direction;
		this.radian = radian;
		this.speedY = 0;
		this.gravity = 0.05;
		this.gravitySpeed = 0;
		
		this.draw = function()
		{
		ctx.beginPath();
	    ctx.arc(this.x,this.y,this.radius,0,this.radian*Math.PI,this.direction);
	    ctx.strokeStyle = this.color;
	    ctx.stroke();
		}
		this.update = function()
		{
			ctx.lineWidth = 20;
			ctx = canvas.getContext('2d');
			ctx.save();
			ctx.translate(this.x,this.y);
			ctx.rotate(this.angle);
			ctx.translate(-this.x,-this.y);
			this.draw();
			ctx.restore();

		}
		this.paint = function()
		{
			ctx.fillStyle = this.color;
			ctx.fill();
		}
		// New position of the ball when clicked
		this.newPos = function() 
		{
			this.gravitySpeed += this.gravity;
			this.y += this.speedY + this.gravitySpeed; 
			this.hitBottom();
		}
		// Updated position of the ball
		this.objUpdate = function()
		{
			this.newPos();
			this.draw();
		}
		// Function to make the ball go down when not clicked
		 this.hitBottom = function() 
		 {
	    var rockbottom = height/2 + 200;
	    if (this.y > rockbottom) 
	    {
	      this.y = rockbottom;
	      this.gravitySpeed = 0;
	      ball.speedY = 0;
	  	}	
     	}
     	// Function when ball crashes with the arc
     	this.crashWith = function(otherobj) 
  		{
     	var mycol =this.color;
     	var othercol = otherobj.color;
	    var mytop = this.y - this.radius;
	    var mybottom = this.y + (this.radius);
	    var othertop = otherobj.y - otherobj.radius;
	    var otherbottom = otherobj.y + (otherobj.radius);
	    var dir = otherobj.direction;
	    var crash = false;
	    if(mycol !== othercol)
	    {
	    	if((mybottom <= otherbottom) || (mytop <= othertop))
	    	{
	    		crash = true;
	    	}
	    }
	    else
	    {
	    	crash = false;
	    }
	    return crash;

  }
	    
}
// To move the ball up
	function moveUp()
	{
		ball.speedY -= 0.5;
	}
// To move the ball down
	function accelerate(n){
		ball.gravity = n;
	}
   canvas.onclick = function()
   {
   	moveUp();
   }
// function corresponding to accelerate function
   canvas.onmouseup = function () {
   	accelerate(0.005);
   }
// Stop game function
function end () 
{
	for (var i = 0; i < ring.length; i++) 
	{
		if(ball.crashWith(ring[i]))
		{
			stop();
		}
		else
		{
			ball.draw();
			ball.paint();
			ball.objUpdate();
		}
	}

}

  

}