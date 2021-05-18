// 小球的边界检测：碰到边界后 ，方向为反向；并且 返回 小球的位置 与 颜色值的索引；
function getPosition(x,y,cnv,speed,angle,ball_r,colors)
{
	//参数的含义 依次为：球的圆心、cnv、速度、速度角度、球体半径、颜色、加速度、加速度角度、速度水平/垂直分速度、颜色索引。
	// 垂直弹性系数、水平弹性系数、水平摩擦系数、垂直摩擦系数；
	// 速度代表数值、速度角度代表方向：方向按照W3C标准，可以轻松获取在水平/垂直方向上的分速度，这样分速度本身就带有正负；
	//加速度代表数值、加速度角度代表方向：方向按照W3C标准，可以轻松获取在水平/垂直方向上的分加速度，这样分加速度本身就带有正负；
	// 用 分速度 累加 分加速度的增量 ，可以确定 分速度的数值
	// 用 坐标 累加 分速度的增量，可以确定 坐标的数值。
	this.x = x;
	this.y = y;
	this.cnv = cnv;
	this.speed = speed;
	this.angle = angle;
	this.ball_r = ball_r;
	this.colors = colors || "orange";
	this.acceleration = 0;
	this.angle_acc = 0;
	this.speed_x = this.speed * Math.cos(this.angle);
	this.speed_y = this.speed * Math.sin(this.angle);
	this.i = 0;
	this.bounce_y = 1;
	this.bounce_x = 1;
	this.friction_x = 1;
	this.friction_y = 1;
}

getPosition.prototype = {
	// 获取 匀速运动的小球 的 位置；可以接受加速度、碰撞导致的速度损耗
	get_position:function()
	{
		this.x += this.speed_x;    //确定 x 的位置
		this.y += this.speed_y;    //确定 y 的位置
		
		// 水平分速度 在 水平加速度上的递增；
		this.speed_x += this.acceleration * Math.cos(this.angle_acc); 
		// 垂直分速度 在 垂直加速度上的递增；
		this.speed_y += this.acceleration * Math.sin(this.angle_acc);
		
		if((this.x >= this.cnv.width - this.ball_r) || (this.x <= this.ball_r))
		{
			// 碰到边界就反弹，并且有 速度损耗
			this.speed_x *= - this.bounce_x;
			// 若 速度与加速度反向，且 速度绝对值 小于 加速度，则 让其速度变为0；位置固定在边界处，不让动了；否则会出边界。
			if((this.speed_x * this.acceleration * Math.cos(this.angle_acc)) < 0 
			&& Math.abs(this.speed_x) < Math.abs(this.acceleration * Math.cos(this.angle_acc)))
			{
				this.speed_x = 0;
				this.x = this.cnv.width - this.ball_r;
			}
			else
			{
				this.i +=1;
				this.i %= this.colors.length;
			}
		}
		
		if((this.y >= this.cnv.height - this.ball_r) || (this.y <= this.ball_r))
		{
			this.speed_y *= - this.bounce_y;
			if((this.speed_y * this.acceleration * Math.sin(this.angle_acc)) < 0
			&& Math.abs(this.speed_y) < Math.abs(this.acceleration * Math.sin(this.angle_acc)))
			{
				this.speed_y = 0;
				this.y = this.cnv.height - this.ball_r;
			}
			else
			{
				this.i +=1;
				this.i %= this.colors.length;
			}
			this.speed_x *= this.friction_x;
		}
	},
	// 获取 重力环境下的 小球的位置，可以接受 重力加速度、碰撞导致的速度损耗；
	get_gravity_position:function()
	{
		this.x += this.speed_x;
		
		this.y += this.speed_y;
		
		// 对于需要不断改变的变量，一般在动画循环之前先定义；
		// 在动画循环中图形绘制之后 再 递增 或 递减
		// 且 对于动画的变量的源头，应该放在最后，即本源放在最后，由本源触发的变量依次放在前面。 
		// 即 先把关键架构写出来，再拆分架构中的变量。
		// 水平方向 与 垂直方向的分速度 分别为 自身 与 在各自加速度方向上 的 增量 之和；
		this.speed_x += this.acceleration * Math.cos(this.angle_acc);
		this.speed_y += this.acceleration * Math.sin(this.angle_acc);
		// 边界检测，碰到就反向，并且有速度损耗。
		if(this.y >= this.cnv.height - this.ball_r)
		{
			// 对于垂直方向的运动轨迹，由夹角算出来的分速度本身就带着方向的标记(即正负)；
			// 由夹角算出来的加速度本身也带着方向的标记(即正负)，所以只考虑触底反弹这一种情况就可以了
			// 触底反弹，速度的方向肯定为相反的，有损耗的反弹：-0.8 。
			this.speed_y *= - this.bounce_y;
			if((this.speed_y * this.acceleration * Math.sin(this.angle_acc)) < 0
			&& Math.abs(this.speed_y) < Math.abs(this.acceleration * Math.sin(this.angle_acc)))
			{
				this.speed_y = 0;
				this.y = this.cnv.height - this.ball_r;
			}
			else
			{
				this.i +=1;
				this.i %= this.colors.length;
			}
			// 水平方向上 的 摩擦系数，可以让速度持续减小，但是不能令其反向，最终会停止。每次触底的时候才会与地面发生摩擦。
			this.speed_x *= this.friction_x;
			this.speed_y *= this.friction_y;
		}
		else if(this.y <= this.ball_r)
		{
			this.speed_y *= - this.bounce_y;
		}
		if((this.x >= this.cnv.width - this.ball_r) || (this.x <= this.ball_r))
		{
			// 碰到边界就反弹，并且有 速度损耗
			this.speed_x *= - this.bounce_x;
			if((this.speed_x * this.acceleration * Math.cos(this.angle_acc)) < 0 
			&& Math.abs(this.speed_x) < Math.abs(this.acceleration * Math.cos(this.angle_acc)))
			{
				this.speed_x = 0;
				this.x = this.cnv.width - this.ball_r;
			}
			else
			{
				this.i +=1;
				this.i %= this.colors.length;
			}
		}
	}
}