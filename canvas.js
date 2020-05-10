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
	var u=1,k=1,v=3,z=0,dx=0;
	var colors = ["yellow","steelblue"];
	var velocities = [0.42,0.68,1,1.3];
	var rockbottom = height/2 +200;
	var stAngle = 0;
	var eAngle = 1*Math.PI;
	var crash,upper = false;
	var direction,condition = false;
	var hitbottom = false;
	var above,lower = false;
	var next,over =false;
	var index = 0;	
// Creating Arcs of different colors
var ring = [];
function createArc () 
{
	for(var j=0;j<6;j++)
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
    if(crash || hitbottom)
    {
      console.log(ball,rockbottom);
      return 1;
    }
    else
    {
    	requestAnimationFrame(animate);
		ctx.clearRect(0, 0, width, height);
	    for(var i=0;i<10;i++)
	    {
	    	ring[i].update();
	    }
	    for(var j=0;j<6;j++)
		{
			for(var i=z;i<z+2;i++)
		{
			
			if(above)
	    	{
	    		if(ring[i].y<=height/2 - 100)
	    		{
	    			ring[i].y += velocities[0];
	    			if(ball.y<=height/2+50)
	    			{
	    				ball.y+= 0.2;
	    				ball.draw();
						ball.paint();
	    			}
	    		}
	    	}
	    	if(over && (z<=12 && dx<=6))
	    	{
	    		ring[3+dx].y = height - 200*(j);
	    		ring[2+dx].y = height - 200*(j);
	    		if(ring[z-2].y< height - 35)
	    		{
	    			ring[z-2].y += 0.65;
	    			ring[z-1].y += 0.65;
	    		}
	    	}
	    	if(z>6 && dx<=8)
	    	{
	    		ring[z-2].y += 0.65;
	    		ring[z-1].y += 0.65;
	    	}
		}
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
	    if (this.y > rockbottom) 
	    {
	      this.y = rockbottom;
	      this.gravitySpeed = 0;
	      ball.speedY = 0;
	      if(condition)
	      {
	      	hitbottom = true;
	      }
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
	   	 	result = true;
	    }
	    if(((getDistance(this.y,(othertop + 15)) < this.radius) || (getDistance(this.y,(othertop - 15)) < this.radius)) && upper)
	    {
	   		result = true;
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
					// console.log(startangle1,startangle2);
					if(ball.crashWith(ring[index+1]))
				{
					stop();
					console.log(startangle2,startangle1,index);
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
				z = z +2;
				dx = dx + 2;
				rockbottom = height/2+70;
				condition = true;
				console.log(z,index,hitbottom);
			}
			if(ring[index].y >= height && index<=10)
			{
				above = false;
			}
			if(ring[index].y <=height/2 - 100 && distance<0)
			{
				over = true;
			}
			actualAngle = Math.PI + 1.5*Math.PI/180 - 1.5*Math.PI/(180*k);
			sn = 0.5*Math.PI + 1.5*Math.PI/180 - 1.5*Math.PI/(180*k);
			if(index>=ring.index-2)
			{
				stop();
			}
			k++;
			

}

animate();
  
 }