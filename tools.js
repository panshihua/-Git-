//相当于先定义一个 空对象，然后在空对象中添加键值对，只不过对应的值为函数，并且返回的是对象；
//将tools定义为window对象的属性；该属性的值是一个对象
window.tools = {};
//获取鼠标位置，定义getMouse 为tools属性 的 一个key，对应的值是一个 函数；
window.tools.getMouse = function(element)
{
	//定义一个 mouse 的 对象
	var mouse = { x:0 , y:0 };
	//为传入的参数添加 mousemove 事件，意在 当鼠标在其上移动时， 获取鼠标位置；
	element.addEventListener("mousemove",getMousePosition,false);
	function getMousePosition(e)
	{
		var x,y;
		//在 IE中，event 对象是作为window对象的一个属性存在
		var e = e || window.event;
		//获取鼠标当前位置，并作兼容处理
		//兼容Firefox、chrome、IE9及以上
		if(e.pageX || e.pageY)     //当 鼠标在浏览器中的坐标 不在原点时；pageX、pageY代表鼠标在浏览器窗口的坐标。
		{
			x = e.pageX;
			y = e.pageY;
		}
		// 兼容 IE8 以下，以及混杂模式下的chrome 和 Safari；原因 前面的浏览器 对 e.pageX、e.pageY 不兼容。
		else
		{
			x = e.clientX + document.body.scrollLeft || document.body.scrollLeft;
			y = e.clientY + document.body.scrollTop || document.body.scrollTop;
		}
		//将当前的坐标值减去canvas元素的偏移位置，则x、y 为鼠标在canvas中的相对坐标。
		x -= element.offsetLeft;
		y -= element.offsetTop;
		// 将 相对坐标 赋值给 mouse对象，并返回 mouse对象
		mouse.x = x;
		mouse.y = y;
	}
	return mouse;
}

//获取 键盘的对应值，定义getKey 为tools属性 的 一个key，对应的值是一个 函数；
window.tools.getKey = function()
{
	//定义一个 key的 对象
	var key = {};
	//为window对象添加一个 keydown 事件，通过传入的参数 e， 用于获取按键对应的值
	window.addEventListener("keydown",function(e){
		if(e.keyCode == 38 || e.keyCode == 87)
		{
			//添加一个键值对，定义 方向的属性值 为 "up"
			key.direction = "up";
		}
		else if(e.keyCode == 39 || e.keyCode == 68)
		{
			key.direction = "right";
		}
		else if(e.keyCode == 40 || e.keyCode == 83)
		{
			key.direction = "down";
		}
		else if(e.keyCode == 37 || e.keyCode == 65)
		{
			key.direction = "left";
		}
		else
		{
			key.direction = "";   //其他按键，方向为空。
		}
	},false);
	return key;    //返回 对象 key
}
//对各种浏览器进行 兼容处理，请求动画帧，会自动根据浏览器绘制的帧率进行调整。
window.requestAnimationFrame = (
    window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame    ||
	window.msRequestAnimationFrame     ||
	window.oRequestAnimationFrame      ||
	function (callback) {
		return window.setTimeout(callback,1000/60);
	}
);

// 获取 一个随机颜色的函数，封装在 tools 中
window.tools.getRandomColor = function()
{
	return "#" + 
	(function(color)
	{
		return (color += '0123456789abcdef'[Math.floor(Math.random() * 16)]) && (color.length == 6)
		? color : arguments.callee(color);
	})('');
	// color 字符串 由 目标字符串中的任意字符 构成；且 color 的长度为 6；若为真，返回color；若为假，则闭包调用自身
	// 直到 满足为止； 格式固定，要记住！！！！
}

//检测 两个矩形是否发生碰撞，发生碰撞返回 true；没有发生碰撞返回 false。
window.tools.checkRect = function(rectA,rectB)
{
	return !(rectA.x + rectA.width < rectB.x ||
	         rectB.x + rectB.width < rectA.x ||
	         rectA.y + rectA.height < rectB.y ||
			 rectB.y + rectB.height < rectA.y);
}

//检测 两个小球 是否发生碰撞，发生碰撞返回 true；没有发生碰撞返回 false。
window.tools.checkCircle = function(circleA,circleB)
{
	var dx = circleA.x - circleB.x;
	var dy = circleA.y - circleB.y;
	var distance = Math.sqrt(dx * dx + dy * dy);
	if (distance < (circleA.r + circleB.r))
	{ return true; }
	else
	{ return false;}
}