window.onload = function()
{
	var ctx;
	var canvas = document.querySelector("canvas");
	var width = window.innerWidth - 40;
	var height = window.innerHeight - 40;
	var interval;
	function init()
	{
		canvas.width = window.innerWidth - 40;
		canvas.height = window.innerHeight - 40;
		ctx = canvas.getContext('2d');
	}
	var colors = ["yellow","steelblue"];
	var stAngle = [0,1*Math.PI];
	var eAngle = [1*Math.PI,2*Math.PI];
	var crash = false;	
	// Creating Arcs of different colors
    var ring = [];
    for(var i=0;i<2;i++)
    {
	ring.push(new circle(width/2,height/2,colors[i],100,stAngle[i],eAngle[i]));
    }
	
// Stop function
function stop () 
{
	crash = true;
}
// Animate function
function animate()
{
    if(crash)
    {
      return;
    }
    else
    {
    	requestAnimationFrame(animate);
		ctx.clearRect(0, 0, width, height);
	    ring.forEach(function (element) 
	    {
	    	element.update();
	    });
	    ball.draw();
		ball.paint();
		ball.objUpdate();
	    end();
    }
    	
}

init();
var coord = {
	x: undefined,
	y: undefined
}
// Creating object 
var ball = new circle(width/2,height/2 + 200, "yellow", 5,0,2*Math.PI);
// getDistance function
function getDistance (x1,y1,x2,y2) 
{
	var xDistance = x2 - x1;
	var yDistance = y2 - y1;
	return Math.sqrt(Math.pow(xDistance,2) + Math.pow(yDistance,2)); 
}


// Circle object
function circle(x,y,color,radius,startAngle,endAngle)
{
		this.x = x;
		this.y = y;
		this.color = color;
		this.radius = radius;
		this.width = 15;
		this.startAngle = startAngle;
		this.dx = 1.5*Math.PI/180;
		this.endAngle = endAngle;
		this.speedY = 0;
		this.gravity = 0.05;
		this.gravitySpeed = 0;
		
		this.draw = function()
		{
		ctx.beginPath();
	    ctx.arc(this.x,this.y,this.radius,this.startAngle,this.endAngle,true);
	    ctx.strokeStyle = this.color;
	    ctx.stroke();
		}

		this.update = function () 
		{
		ctx = canvas.getContext('2d');
		ctx.lineWidth = this.width;
		this.startAngle+=this.dx;
		this.endAngle+=this.dx;
		this.draw();
		}
		this.paint = function()
		{
			ctx.fillStyle = this.color;
			ctx.fill();
		}
		this.newPos = function() 
		{
			this.gravitySpeed += this.gravity;
			this.y += this.speedY + this.gravitySpeed; 
			this.hitBottom();
		}
		this.objUpdate = function()
		{
			this.newPos();
			this.draw();
		}
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

     	this.crashWith = function(otherobj) 
  		{
	    var mytop = this.y - this.radius;
	    var mybottom = this.y + (this.radius);
	    var othertop = otherobj.y - otherobj.radius;
	    var otherbottom = otherobj.y + (otherobj.radius);
	    var result = false;
	    if((getDistance(this.x,this.y,otherobj.x,otherbottom)) < this.radius)
	    {
	   	 if((mybottom<=otherbottom) || (mytop>=othertop))
	    {
	    	result = true;
	    }
	    }
	    if((getDistance(this.x,this.y,otherobj.x,(othertop + 15)) < this.radius))
	    {
	   	 if((mybottom<=otherbottom) || (mytop>=othertop))
	    {
	    	result = true;
	    }
	    }
	    
	    return result;
	    
}
	    
}
// Moveup function for object
function moveUp()
{
	ball.speedY -= 0.8;
}
// acceleration function for object
function accelerate(n)
{
	ball.gravity = n;
}
canvas.onclick = function()
{
   	moveUp();
}
canvas.onmouseup = function () 
{
   	accelerate(0.035);
}
var k=1,x=7;
var endangle1,actualAngle,ratio1,preciseE,startangle1,ratio2,sn,preciseS;
var endangle2,ratio_1,precise_E,startangle2,ratio_2,precise_S;
// Endgame function
function end () 
{
			endangle1 = ring[0].endAngle;
			endangle2 = ring[1].endAngle;
			startangle1 = ring[0].startAngle;
			startangle2 = ring[1].startAngle;
			actualAngle = Math.PI + 1.5*Math.PI/180;
			sn = 0.5*Math.PI + 1.5*Math.PI/180;
			ratio2 = startangle1/sn;
			ratio_2 = startangle2/sn;
			ratio1 = endangle1/actualAngle;
			ratio_1 = endangle2/actualAngle;
			preciseS = parseFloat(ratio2.toPrecision(3), 10);
			precise_S = parseFloat(ratio_2.toPrecision(3), 10);
			preciseE = parseFloat(ratio1.toPrecision(3), 10);
			precise_E = parseFloat(ratio_1.toPrecision(3), 10);
			var condition = (Number.isInteger(preciseE) || preciseS>3);
			if(condition)
			{
				if(ball.y>=ring[0].y)
				{
					if((preciseS || (preciseE>1)) && ((precise_S>5) || (precise_E%2 == 0)))
				{
					if(ball.crashWith(ring[0]))
					{
						stop();
						console.log('a');
					}
					else
					{
						ball.draw();
						ball.paint();
						ball.objUpdate();
					}
	
				}
				else 
				{
				 	return;
				} 
				}
			    else
				{
					if((preciseS || (preciseE>1)) && ((precise_S>x) && precise_S<x+2))
					{
						if(ball.crashWith(ring[0]))
					{
						console.log(ball.y,ring[0].y);
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

			actualAngle = Math.PI + 1.5*Math.PI/180 - 1.5*Math.PI/(180*k);
			sn = 0.5*Math.PI + 1.5*Math.PI/180 - 1.5*Math.PI/(180*k);
			
			k++;
			

}

animate();
  
 }