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
	var endangle1,actualAngle,ratio1,preciseE,startangle1,ratio2,sn,preciseS;
	var endangle2,ratio_1,precise_E,startangle2,ratio_2,precise_S;
	var u=1,k=1,v = 3;
	var colors = ["yellow","steelblue"];
	var stAngle = 0;
	var eAngle = 1*Math.PI;
	var crash,upper = false;
	var direction = false;
	var hitbottom = false;
	var above,lower = false;
	var next =false;
	var index = 0;	
// Creating Arcs of different colors
var ring = [];
function createArc () 
{
	for(var j=0;j<5;j++)
	{
		for(var i=0;i<2;i++)
	{
	ring.push(new circle(width/2,(height/2 - 400*j),colors[i],100,stAngle,eAngle,direction));
	direction = !direction;
	}
	}

}
createArc();
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
      return 1;
    }
    else
    {
    	requestAnimationFrame(animate);
		ctx.clearRect(0, 0, width, height);
	    for(var i=0;i<10;i++)
	    {
	    	
	    	if(above)
	    	{
	    		ring[i].y += 1;
	    	}
	    	
	    	ring[i].update();
	    }
	    
	    
	    ball.draw();
		ball.paint();
		ball.objUpdate();
	    end();
    }
    	
}

init();
var ball = new circle(width/2,height/2 + 200, "yellow", 5,0,2*Math.PI);
// getDistance function
function getDistance (y1,y2) 
{
	return Math.abs(y1 - y2);
}


// Circle object
function circle(x,y,color,radius,startAngle,endAngle,direction)
{
		this.x = x;
		this.y = y;
		this.color = color;
		this.radius = radius;
		this.width = 15;
		this.direction = direction
		this.startAngle = startAngle;
		this.dx = 1.5*Math.PI/180;
		this.endAngle = endAngle;
		this.speedY = 0;
		this.gravity = 0.05;
		this.gravitySpeed = 0;
		
		this.draw = function()
		{
		ctx.beginPath();
	    ctx.arc(this.x,this.y,this.radius,this.startAngle,this.endAngle,direction);
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
	      hitbottom = true;
	  	}
	  	else 
	  	{
	  		hitbottom = false;	
	  	}	
     	}

     	this.crashWith = function(otherobj) 
  		{
	    var mytop = this.y - this.radius;
	    var mybottom = this.y + (this.radius);
	    var othertop = otherobj.y - otherobj.radius;
	    var otherbottom = otherobj.y + (otherobj.radius);
	    var result = false;
	    if((getDistance(this.y,otherbottom)<this.radius) && lower )
	    {
	   	/* if((mybottom<=otherbottom) || (mytop>=othertop))
	    {
	    	result = true;
	    }  */ result = true;
	    }
	    if(((getDistance(this.y,(othertop + 15)) < this.radius) || (getDistance(this.y,(othertop - 15)) < this.radius)) && upper)
	    {
	   	 if((mybottom<=otherbottom) || (mytop>=othertop))
	    {
	    	result = true;
	    }
	    }
	    return result;
	    
}
	    
}
function moveUp()
{
		ball.speedY -= 0.8;
}

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
   	accelerate(0.030);
}

function end () 
{
			endangle1 = ring[index].endAngle;
			endangle2 = ring[index+1].endAngle;
			startangle1 = ring[index].startAngle;
			startangle2 = ring[index+1].startAngle;
			actualAngle = Math.PI + 1.5*Math.PI/180;
			sn = 0.5*Math.PI + 1.5*Math.PI/180;
			if(ball.y>=ring[index].y)
			{
				upper = false;
				lower = true;
				if(startangle1 > parseFloat(((u*0.5)*Math.PI).toPrecision(3),10) && startangle2 >  parseFloat(((u*0.5)*Math.PI).toPrecision(3),10))
				{ 	
					console.log(startangle1,startangle2);
					if(ball.crashWith(ring[index+1]))
				{
					stop();
					console.log(startangle2,startangle1,u);
				}
				else
				{
						ball.draw();
						ball.paint();
						ball.objUpdate();
				}
				}
			}
			else
			{
				lower = false;
				upper = true;
				if(startangle1> parseFloat(((v*0.5)*Math.PI).toPrecision(3),10) && startangle2>  parseFloat(((v*0.5)*Math.PI).toPrecision(3),10))
				{
					if(ball.crashWith(ring[index+1]))
				{
					stop();
					console.log('else');
				}
				else
				{
						ball.draw();
						ball.paint();
						ball.objUpdate();
				}
				}
			}
			
			if(startangle2 > (u+2)*0.5*Math.PI && startangle1 < (u+4)*0.5*Math.PI)
			{
				u = u+4;
			}
			if(startangle2 > (v+2)*0.5*Math.PI && startangle1 < (v+4)*0.5*Math.PI)
			{
				v = v + 4;
			}
			var distance = (ball.y+ball.radius) - (ring[index].y - ring[index].radius);
			if(distance<0)
			{
				above = true;
				index = index + 2;
				console.log(index);
			}
			if(ring[index].y > width)
			{
				above = false;
			}
			actualAngle = Math.PI + 1.5*Math.PI/180 - 1.5*Math.PI/(180*k);
			sn = 0.5*Math.PI + 1.5*Math.PI/180 - 1.5*Math.PI/(180*k);
			
			k++;
			

}

animate();
  
 }