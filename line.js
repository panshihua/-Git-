function Line(x,y,length,color)
{
	this.x = x;
	this.y = y;
	this.length = length;
	this.color = color;
	this.vy = 0;
	this.max_height = 0;
}
Line.prototype = {
	stroke:function(cxt)
	{
		cxt.save();
		
		cxt.beginPath();
		cxt.strokeStyle = this.color;
		cxt.moveTo(this.x,this.y);
		cxt.lineTo(this.x,this.y + this.length);
		cxt.stroke();
		
		cxt.restore();
	}
}