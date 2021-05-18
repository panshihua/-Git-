// 新建 盒子类 ，参数分别为：左上角坐标、宽、高、颜色；
function Box(x,y,width,height,color)
{
	this.x = x || 0;
	this.y = y || 0;
	this.width = width || 40;
	this.height = height || 40;
	this.color = color || "red";
	this.scaleX = 1;
	this.scaleY = 1;
	this.rotate = 0;
	this.vx = 0;
	this.vy = 0;
}

Box.prototype = {
	stroke : function(cxt)
	{
		cxt.save();
		
		cxt.translate(this.x,this.y);
		cxt.scale(this.scaleX,this.scaleY);
		cxt.rotate(this.rotate);
		
		cxt.beginPath();
		cxt.strokeStyle = this.color;
		cxt.rect(0,0,this.width,this.height);
		cxt.closePath();
		cxt.stroke();
		cxt.restore();
	},
	fill : function(cxt)
	{
		cxt.save();
		
		cxt.translate(this.x,this.y);
		cxt.scale(this.scaleX,this.scaleY);
		cxt.rotate(this.rotate);
		
		cxt.beginPath();
		cxt.fillStyle = this.color;
		cxt.rect(0,0,this.width,this.height);
		cxt.closePath();
		cxt.fill();
		cxt.restore();
	}
}
