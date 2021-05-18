//每个函数就是一个对象（Function），对象中的参数 赋值给其自身的相应属性，相当于类的属性私有化；
//这样就可以在该对象内部共享该属性,其值也随之更新；
function Arrow(x,y,color,angle)
{
	this.x = x || 0;
	this.y = y || 0;
	this.color = color || "orange";
	this.angle = angle || 0;
	//上面的 赋值意义为：将相应的参数有先后顺序的 赋值于其自身的私有属性；若没有该参数，则相应属性值 默认为 0 
}
//函数对象都有一个子对象prototype对象，类是以函数的形式来定义的。
//prototype表示该函数的原型，也表示一个类的成员的集合。
//在通过new创建一个类的实例对象的时候，prototype对象的成员都成为实例化对象的成员
//每个JavaScript对象都有一个内置的属性，名为prototype。
//prototype属性保存着对另一个JavaScript对象的引用，这个对象作为当前对象的父对象,这就是 链接机制来支持继承 的原理
// 当通过点记法引用对象的一个函数或属性时，倘若对象上没有这个函数或属性，此时就会使用对象的prototype属性，
//当出现这种情况时，将检查对象prototype属性所引用的对象，查看是否有所请求的属性或函数。
//如果prototype属性引用的对象也没有所需的函数或属性，则会进一步检查这个对象（prototype属性引用的对象）的prototype属性，
//依次沿着链向上查找，直到找到所请求的函数或属性，或者到达链尾，如果已经到达链尾还没有找到，则返回undefined。
//但是在实际的编程过程中不知道有没有感觉到现有方法的不足？prototype 方法应运而生；
//其实就是一个继承机制，我们要在这个从上到下继承的集合中 增加我们的自定义 方法：增加键值对，键为属性；值为函数，带参数；
Arrow.prototype = {
	stroke:function(cxt)
	{
		cxt.save();
		//这个方法很好，先把原始图参考原点的坐标 画出来，然后再 平移至画布中心，省去了计算坐标的麻烦。
		// 先 保存好状态；然后变形；变形之后 开始画；画完恢复状态。
		cxt.translate(this.x,this.y);
		cxt.strokeStyle = this.color;
		cxt.rotate(this.angle);
		cxt.beginPath();
		cxt.moveTo(-20,-10);
		cxt.lineTo(0,-10);
		cxt.lineTo(0,-20);
		cxt.lineTo(20,0);
		cxt.lineTo(0,20);
		cxt.lineTo(0,10);
		cxt.lineTo(-20,10);
		cxt.closePath();
		cxt.stroke();
		cxt.restore();
	},
	fill:function(cxt)
	{
		cxt.save();
		cxt.translate(this.x,this.y);
		cxt.fillStyle = this.color;
		cxt.rotate(this.angle);
		cxt.beginPath();
		cxt.moveTo(-20,-10);
		cxt.lineTo(0,-10);
		cxt.lineTo(0,-20);
		cxt.lineTo(20,0);
		cxt.lineTo(0,20);
		cxt.lineTo(0,10);
		cxt.lineTo(-20,10);
		cxt.closePath();
		cxt.fill();
		cxt.restore();
	}
	
}

