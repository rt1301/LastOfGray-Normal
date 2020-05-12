	var ctx;
	var scoreDisplay = document.getElementById("score");
	var playBtn = document.getElementById("playBtn");
	var canvas = document.querySelector("canvas");
	var width = window.innerWidth-21;
	var height = window.innerHeight - 80;
	var interval;
	var bestScore = document.getElementById('bScore');
	function init()
	{
		canvas.width = window.innerWidth-21;
		canvas.height = window.innerHeight - 80;
		ctx = canvas.getContext('2d');
	}
	var endangle1,actualAngle,ratio1,preciseE,startangle1,ratio2,sn,preciseS;
	var endangle2,ratio_1,precise_E,startangle2,ratio_2,precise_S;
	var distance = 0;
	var score=0;
	var keys = [];
	var final = false;
	var u=1,k=1,v=3,z=0,dx=0;
	var colors = ["#5EC8F2","#ff33cc","yellow","#F20505","#8B29A6"];
	var velocity = 0.56;
	var rockbottom = height/2 + 160;
	var stAngle = 0;
	var eAngle = 1*Math.PI;
	var crash,upper = false;
	var direction,condition = false;
	var hitbottom = false;
	var above,lower = false;
	var next,over =false;
	var index = 0;	
	var ls_array = [];
	var gameNum = 0;
	var ball;
//    To randomise array elements - Fisher-Yates shuffle
function shuffle(array) 
{
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}
shuffle(colors);
// Creating Arcs of different colors
var ring = [];
function createArc () 
{
	for(var j=0;j<6;j++)
	{
		for(var i=0;i<2;i++)
	{
	ring.push(new circle(width/2,(height/2 - 360*j),colors[i],100,stAngle,eAngle,direction));
	direction = !direction;
	}
	}

}
createArc();
window.addEventListener('resize', () => 
{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 80;

  init();
});
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
	    var length = ls_array.length;
		scoreDisplay.textContent = score.toString();
		bestScore.textContent = ls_array[length-1];
		distance = 0;
	    playBtn.textContent = "Restart";
	    canvas.classList.add('selected');
	    if(final)
	    {
	    	ctx.clearRect(0, 0, width, height);
	    	ctx.fillStyle = "white";
	    	ctx.font = "700 50px Muli";
	    	ctx.fillText("Game Over, Your Final Score is: " +ls_array[length-1], width/2,height/2);
	    }
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
	    		if(ring[i].y<=height/2 - 60)
	    		{
	    			ring[i].y += velocity;
	    			if(ball.y<=height/2+10)
	    			{
	    				ball.y+= 0.2;
	    				ball.draw();
						ball.paint();
	    			}
	    		}
	    	}
	    	if(over && (z<=12 && dx<=6))
	    	{
	    		ring[3+dx].y = height - 160*(j);
	    		ring[2+dx].y = height - 160*(j);
	    		if(ring[z-2].y< height - 35)
	    		{
	    			ring[z-2].y += 0.56;
	    			ring[z-1].y += 0.56;
	    		}
	    	}
	    	if(z>6 && dx<=8)
	    	{
	    		ring[z-2].y += 0.56;
	    		ring[z-1].y += 0.56;
	    	}
		}
		}
	    
	    ball.draw();
		ball.paint();
		ball.objUpdate();
	    end();
    }
    	
}
ball = new circle(width/2,height/2 + 160, colors[0], 5,0,2*Math.PI);
init();
animate();
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
	  	else if(this.y <= rockbottom) 
	  	{
	  		hitbottom = false;	
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

function end() 
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
					if(ball.crashWith(ring[index+1]))
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
			else
			{
				lower = false;
				upper = true;
				if(startangle1> parseFloat(((v*0.5)*Math.PI).toPrecision(3),10) && startangle2>  parseFloat(((v*0.5)*Math.PI).toPrecision(3),10))
				{
					if(ball.crashWith(ring[index+1]))
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
			
			if(startangle2 > (u+2)*0.5*Math.PI && startangle1 < (u+4)*0.5*Math.PI)
			{
				u = u+4;
			}
			if(startangle2 > (v+2)*0.5*Math.PI && startangle1 < (v+4)*0.5*Math.PI)
			{
				v = v + 4;
			}
			distance = (ball.y+ball.radius) - (ring[index].y - ring[index].radius);
			if(distance<0)
			{
				above = true;
				index = index + 2;
				z = z +2;
				dx = dx + 2;
				rockbottom = height/2+160;
				condition = true;
				score++;
				lsItems();
				getLsItems();
			}
			if(ring[index].y >= height && index<=10)
			{
				above = false;
			}
			if(ring[index].y <=height/2 - 60 && distance<0)
			{
				over = true;
			}
			actualAngle = Math.PI + 1.5*Math.PI/180 - 1.5*Math.PI/(180*k);
			sn = 0.5*Math.PI + 1.5*Math.PI/180 - 1.5*Math.PI/(180*k);
			if(index>=ring.index-2)
			{
				stop();
				final = true;
			}
			k++;
			

}
// Reset Conditions
function resetCondition()
{
	crash = false,upper = false, direction = false, above = false, lower = false, next = false, over = false;
	index = 0;
	hitbottom = false;
	condition = false;
	final = false;
	u=1,k=1,v=3,z=0,dx=0;
	score = 0;
	distance = 0;
	scoreDisplay.textContent = '0';
}
function lsItems()
{
	var game = "Score " + gameNum.toString();
	var lsScore = score.toString();
	keys.push(game);
	localStorage.setItem(game, lsScore);
}
function getLsItems()
{
	if(localStorage.length>0)
	{
		for(var i=0; i<keys.length;i++)
	{
		ls_array.push(localStorage.getItem(keys[i]));
	}
		ls_array.sort();
	}
}

playBtn.addEventListener("click",function()
{
	if(this.textContent === "Restart")
	{
		gameNum++;
		resetCondition();
		init();
		shuffle(colors);
		ring = [];
		createArc();
		ball = new circle(width/2,height/2 + 160, colors[0], 5,0,2*Math.PI);
		animate();
		canvas.classList.toggle("selected");
	}
});
