function eBall(x,y,radiusX,radiusY,color)
{
	this.x = x || 0;
	this.y = y || 0;
	this.radiusX = radiusX || 4;
	this.radiusY = radiusY || 2;
	this.color = color;
	this.rotate = 0;
	this.scaleX = 1;
	this.scaleY = 1;
	this.vx = 0;
	this.vy = 0;
	this.lineWidth = 2;
}

eBall.prototype = {
	stroke:function(cxt)
	{
		cxt.save();
		
		cxt.translate(this.x,this.y);
		cxt.scale(this.scaleX,this.scaleY);
		cxt.rotate(this.rotate);
		
		cxt.beginPath();
		cxt.strokeStyle = this.color;
		cxt.lineWidth = this.lineWidth;
		cxt.ellipse(0,0,this.radiusX,this.radiusY,0,0,360*Math.PI/180);
		cxt.closePath();
		cxt.stroke();
		
		cxt.restore();
	}
}