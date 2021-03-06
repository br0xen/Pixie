function Pixie(options) {
	var animation = {};
	var animation_timer = null;

	this.init = function(options) {
		var do_start = false;
		var speed = (1000/30);
		if(options.start && typeof options.start === 'boolean') do_start = options.start;
		if(options.speed && typeof options.speed === 'number') speed = options.speed;
		if(options.animation && typeof options.animation === 'object') options = options.animation;
		animation = this.createAnimation(options);
		if(do_start) this.start(speed);
	}

	this.createAnimation = function(a) {
		var x_frames = Math.ceil(a.sprite_sheet.width / a.frame_size.width);
		var y_frames = Math.ceil(a.sprite_sheet.height / a.frame_size.height);
		a.start_point = a.start_point || 0;
		a.end_point = a.end_point || 100;
		a.current_frame = a.current_frame || 0;
		a.loop = a.loop || true;
		a.sprite_sheet.num_frames = x_frames * y_frames;
		a.animate = function(speed){
			// Animation defaults to 30 fps (1000/30)
			speed = speed || (1000/30);
			if(this.step()) {
				var anim_obj = this;
				animation_timer = setTimeout(function(){anim_obj.animate(speed);},speed);
			} else {
				if(this.loop) {
					this.gotoFrame(0);
					this.animate(speed);
				}
			}
		};
		a.step = function(){
			var goto_frame = ++this.current_frame;
			return this.gotoFrame(goto_frame);
		}
		a.gotoFrame = function(frame_num){
			var ret_val = true;
			if(frame_num > this.sprite_sheet.num_frames-1) { 
				frame_num--;
				ret_val = false;
			} else if(frame_num < 0) {
				frame_num = 0;
				ret_val = false;
			}
			var frame_pos_x = ((frame_num * this.frame_size.width) % this.sprite_sheet.width)*-1;
			var frame_pos_y = (Math.floor((frame_num * this.frame_size.width) / this.sprite_sheet.width) * this.frame_size.height)*-1;
			document.getElementById(this.container).style.backgroundPosition=frame_pos_x+"px "+frame_pos_y+"px";
			this.current_frame = frame_num;
			return ret_val;
		}
		a.gotoFrame(a.current_frame);
		document.getElementById(a.container).style.backgroundImage="url("+a.sprite_sheet.url+")";
		document.getElementById(a.container).style.height=a.frame_size.height+"px";
		document.getElementById(a.container).style.width=a.frame_size.width+"px";
		return a;
	}

	this.position = function(options) {
		animation.gotoFrame(options);
	}

	this.start = function(options) {
		speed = options || (1000/30);
		animation.animate(speed);
	}

	this.stop = function() {
		clearTimeout(animation_timer);
	}

	this.construct = function(options) {
		// Method calling logic
		if(options && typeof options === 'function') {
			return options.apply(this, Array.prototype.slice.call(arguments, 1));
		} else if(typeof options === 'object' || ! options) {
			return this.init.apply(this, arguments);
		}
	}

	this.construct(options);
}
