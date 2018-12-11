function sc1() {
	let curnumber = 0;
	let orderarr = ['.first', '.second', '.third', '.fourth'];



	$(".next_btn").click(function () {
		let lefts = $(".card_row").css('left');

		lefts = parseInt(lefts);

		if (curnumber < 3) {
			$(".card_row").animate({
				left: "-=100%"
			});
			$('.yellowblob').animate({
				left: "-=100%"
			});
			curnumber += 1;
			$('.nav-dot').removeClass('active');
			$('.wrap_nav-dot').find(orderarr[curnumber]).addClass('active');
			if (curnumber == 3) {
				$('.deactive').css('display', 'block');
				setTimeout(function () {
					$('.deactive').css('opacity', '1');
				}, 100);
			}
		}
	});


	$(".prev_btn").click(function () {
		let lefts = $(".card_row").css('left');
		lefts = parseInt(lefts);

		if (curnumber > 0) {
			$(".card_row").animate({
				left: "+=100%"
			});
			$('.yellowblob').animate({
				left: "+=100%"
			});
			curnumber -= 1;
			$('.nav-dot').removeClass('active');
			$('.wrap_nav-dot').find(orderarr[curnumber]).addClass('active');

			if (curnumber == 3) {
				$('.deactive').css('opacity', '0')
				setTimeout(function () {
					$('.deactive').css('display', 'none')
				}, 3000);
			}
		}


	});

}



function sc2() {
	let animals = ['bkspmonkey.svg', 'polarbear.svg', 'red panda.svg', 'fin-whale.svg','emperor-penguin.svg','narwhal.svg'];
	let curanimal = Math.floor(Math.random() * 6);
	$('.titleimg img').attr('src', 'images/' + animals[curanimal]);

}

function timer() {
	let $container = $('.settimer');
	let $slider = $('#holder');
	let $degrees = $('#timevalue');

	let sliderWidth = 30;
	let sliderHeight = 30;
	let radius = 15;
	let deg = 0;


	X = Math.round(radius * Math.sin(deg * Math.PI / 180));
	Y = Math.round(radius * -Math.cos(deg * Math.PI / 180));
	$slider.css({
		left: X + radius - sliderWidth / 2,
		top: Y + radius - sliderHeight / 2
	});

	let mdown = false;
	$container
		.mousedown(function (e) {
			mdown = true;
			e.originalEvent.preventDefault();
		})
		.mouseup(function (e) {
			mdown = false;
		})
		.mousemove(function (e) {
			if (mdown) { // firefox compatibility
				if (typeof e.offsetX === "undefined" || typeof e.offsetY === "undefined") {
					var targetOffset = $(e.target).offset();
					e.offsetX = e.pageX - targetOffset.left;
					e.offsetY = e.pageY - targetOffset.top;
				}

				if ($(e.target).is('#rotationSliderContainer'))
					var mPos = {
						x: e.offsetX,
						y: e.offsetY
					};
				else
					var mPos = {
						x: e.target.offsetLeft + e.offsetX,
						y: e.target.offsetTop + e.offsetY
					};

				var atan = Math.atan2(mPos.x - radius, mPos.y - radius);
				deg = -atan / (Math.PI / 180) + 180; // final (0-360 positive) degrees from mouse position 


				// for attraction to multiple of 90 degrees
				var distance = Math.abs(deg - (Math.round(deg / 90) * 90));

				if (distance <= 5)
					deg = Math.round(deg / 90) * 90;

				if (deg == 360)
					deg = 0;

				X = Math.round(radius * Math.sin(deg * Math.PI / 180));
				Y = Math.round(radius * -Math.cos(deg * Math.PI / 180));

				$slider.css({
					left: X + radius - sliderWidth / 2,
					top: Y + radius - sliderHeight / 2
				});

				var roundDeg = Math.abs(Math.round(deg));
				console.log("work?");
				$degrees.html(roundDeg + '&deg;');
				$('#timevalue').val(roundDeg);

			}
		});
}

function sc3() {



	
	/*let original_position=$('#knob').position();
	let original_top=original_position.top;
	let original_left=original_position.left;

	let circle_position=$('.time_control').position();
	let circle_top=circle_position.top + 128;
	let circle_left=circle_position.left + 128;
*/
		
	let win=($(document).width())/2;
	let blkmargin=win-137.5;
	let screentop=$('.screenwrapper').position();
	screentop=screentop.top;
	let r=128;
	
	let angle=0;
	
	
	$('#knob').mousedown(function(){
		$('.phone').mousemove(function(){
		
		let curdeg=$('.time_control').css('transform');
		var posX = window.event.clientX;
    	var posY = window.event.clientY;
		let x=posX;
		let y=posY-screentop;

			let new_left=0;
			let new_top=0;
			
		let time=0;
			
		if(y>128){
			y -=128;
			
			if(x>win){
				x=posX-r-blkmargin-59.5;
				/*new_left=(128 * x)/ Math.sqrt(x*x + y*y);
				new_top=(y*new_left)/x;	
				new_left +=128;*/
				angle = Math.atan2(y - 128, x - 128) * 180 / Math.PI;
				angle=Math.round(angle/40) * 40;

				angle *=(-1);
				time=Math.round(angle/40) * 10;
				
			}
			else{
				x=win-posX;
				
//				new_left=(128 * x)/ Math.sqrt(x*x + y*y);
//				new_top=(y*new_left)/x;	
//				
//				new_left=128-new_left;
				angle = Math.atan2(y - 128, x - 128) * 180 / Math.PI;
				
				time=Math.round((360+angle)/40) * 10;
			}
			new_top += 128;
		}
			else{
				y=screentop+128-posY;
				if(x>win){
					x=posX-r-blkmargin-49.5;
					
//					new_left=(128 * x)/ Math.sqrt(x*x + y*y);
//					new_top=128-((y*new_left)/x);	
//					new_left +=128;
					angle = Math.atan2(y - 128, x - 128) * 180 / Math.PI;
					angle=Math.abs(Math.round(angle/40) * 40);
					angle=180-angle;
					time=Math.round(angle/40) * 10;
					
				}
				else{
					x=win-posX;
//					new_left=(128 * x)/ Math.sqrt(x*x + y*y);
//					new_top=128-((y*new_left)/x)-15;	
//				
//				new_left=128-new_left;
					angle = Math.atan2(y - 128, x - 128) * 180 / Math.PI;
					angle = 180-angle;
					time=Math.round(angle/40) * 10;
				}
				
			}
			
			
		//$('#knob').css('left',new_left);
		//	$('#knob').css('top',new_top);
			$('#settime').text(time+":00");
			$('.time_control').css('transform','rotate('+angle+'deg)');
	});
	});
		$(document).mouseup(function(){
		$('.phone').off("mousemove");
				
	});

	
	
	

}

function sc4() {
	//let curpos = localStorage.getItem("curpos");
	let curpos=9;
	let timer = curpos;
	let isPaused = false;

	$('#quit').click(function () {
		$('.greybox').css('display', 'block');
		setTimeout(function () {
			$('.greybox').css('opacity', 1);
		}, 100);
		isPaused = true;
		$('.ocean circle').css('animation-play-state', 'paused');

	});
	$('#goback').click(function () {
		$('.greybox').css('opacity', 0);

		setTimeout(function () {
			$('.greybox').css('display', 'none');
		}, 300);
		isPaused = false;
		$('.ocean circle').css('animation-play-state', 'running');
	});
	$('.ocean circle').css('animation-duration', timer + 's');
	$('.settime').text('00:0' + timer);

	var ticking =
		setInterval(function () {

			if (!isPaused) {
				timer = --timer < 0 ? curpos : timer;
				$('.settime').text('00:0' + timer);
				if (timer == 0) {
					done();
				}

			}

		}, 1000);



	function done() {

		clearInterval(ticking);
		$('.rndbtn_wrapper').css('opacity', '0');



		setTimeout(function () {
			$('.rndbtn_wrapper').css('display', 'none');
			$('.timersc').css('opacity', 1);
			$('#btns').css('display', 'block');
			setTimeout(function(){
				$('#btns').css('opacity', '1');
			},100);
		}, 300);

	}

}

function sc6() {
	let countnum = 0;


	var blnwidth = 54;
	let blnpos = $('.blnwrapper').css('top');
		blnpos = parseInt(blnpos);
		blnpos -= 20;
		blnwidth = parseInt(blnwidth);
		
		function timerrun(){
		$('.sectitle').text('Inhale');
		setTimeout(function () {
			$('.sectitle').text('Hold')
		}, 3500);
		setTimeout(function () {
			blnwidth +=50;
			$('.sectitle').text('Exhale');
			$('#balloon').css('width', blnwidth + 'px');
			$('.blnwrapper').css('top', blnpos + 'px');
		}, 5500);
		
			}
	timerrun();
	let runactivity = setInterval(function () {
		timerrun();
		countnum += 1;
		if (countnum == 3) {
			clearInterval(runactivity);
			balloondone();
		}
	},9000);



	function balloondone() {
		$('#balloon').attr('src',('images/balloon2.svg'));
		$('.dots').css('display', 'none');
		$('.bln_circle').css('display', 'none');
		$('.timer').css({
			'border': '0px',
			'box-shadow': 'none'
		});
		$('.sectitle').text('Oh?');
		$('.sectitle').css('transform','translateY(-50px)');
		setTimeout(function () {
			$('.sectitle').css('opacity','0')
			$('.screenwrapper').css('animation', 'floating linear 3s forwards');
			
		}, 1000);
		setTimeout(function(){
					   $('#flash').css('opacity','1');
			$('#balloon').css('transition','.2s');
				$('#balloon').css('opacity','0');
					   },4300);
			setTimeout(function(){
					   $('.endangercard').css('opacity','1')
					   },4900);
	};

}
var cursize=0;
//report
function report(){
	$('.phone').click(function(){
	if($('.island').hasClass('bigger')){
			$('.island').removeClass('bigger');
			$('.title').css('opacity','1');
		$('#graph').css('opacity','1');
		$('.backbutton').css('opacity','1');
	}
	});
	
	$('.expand').click(function(){
		setTimeout(function(){
			
			$('.island').addClass('bigger');
		$('.title').css('opacity','0');
		$('#graph').css('opacity','0');
		$('.backbutton').css('opacity','0');
		
		
	},100);
	});
					   
	$('.datepicker').click(function(){
		let timeinformation={
			"Week":"11.5",
			"Month":"24",
			"Year":"704",
		}
		let timeid= $(this).attr('id');
		$('.datepicker').removeClass('active');
		$(this).addClass('active');
		$('#reporttype').attr('src','images/report_'+timeid+'.svg');
		if(timeid=='day'){
			$('.week').text('Today');
			$('.timeinfo').css('opacity',0);
		}
		else{
		$('.week').text('This '+timeid)
			$('.timeinfo').css('opacity',1);
			$('.bold').text(timeinformation[timeid]);
		}
		
	})
					   
	
	
		}
	

