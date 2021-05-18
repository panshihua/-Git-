//相当于对象的属性定义 
function Ball(r,color,x,y)
{
	this.x = x || 0;
	this.y = y || 0;
	this.r = r || 1;
	this.color = color || "orange";
	this.scaleX = 1;
	this.scaleY = 1;
	this.rotate = 0;
}

//相当于对象的方法定义
// 画图的正确模式为：保存状态、变形、画图、恢复状态; 其中变形包括 平移、缩放、旋转，这些都要设置好，属性中提供默认值
// 画图 只画纯粹的图，位置默认为 以原点作为参考，不要在画图中自己定义位置，那个交给平移 来办；结构清晰，功能专一。
Ball.prototype = {
	stroke:function(cxt)
	{
		cxt.save();
		
		cxt.translate(this.x,this.y);
		cxt.scale(this.scaleX,this.scaleY);
		cxt.rotate(this.rotate);
		
		cxt.beginPath();
		cxt.strokeStyle = this.color;
		cxt.arc(0,0,this.r,0,360*Math.PI/180);
		cxt.stroke();
		
		cxt.restore();
	},
	fill:function(cxt)
	{
		cxt.save();
		
		cxt.translate(this.x,this.y);
		cxt.scale(this.scaleX,this.scaleY);
		cxt.rotate(this.rotate);
		
		cxt.beginPath();
		cxt.fillStyle = this.color;
		cxt.arc(0,0,this.r,0,360*Math.PI/180);
		cxt.fill();
		
		cxt.restore();
	},
	// 检测 鼠标是否在 球的范围内，在 返回true，不在 返回false。
	checkMouse:function(mouse)
	{
		var dx = mouse.x - this.x;
		var dy = mouse.y - this.y;
		var distance = Math.sqrt(dx*dx + dy*dy);
		if(distance < this.r)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
}