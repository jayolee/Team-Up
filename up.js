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
	let animals = ['bkspmonkey.svg', 'polarbear.svg', 'red panda.svg', 'fin-whale.svg'];
	let curanimal = Math.floor(Math.random() * 4);
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

				var roundDeg = Math.round(deg);

				$degrees.html(roundDeg + '&deg;');
				$('#timevalue').val(roundDeg);

			}
		});
}

function sc3() {



setTimeout(function(){
		$('#settime').text("00:10");
	},400);
	
	setTimeout(function(){
	$('#settime').text("00:20");
	},1300);
	let curpos = 0;
	let seclist = $('#sec').find('li');

	$('#sec li').click(function () {
		let list = $(this).text();
		list = parseInt(list);

		let btnlist = $(".rndbtn_wrapper a");
		if (list != 0) {
			$(btnlist[1]).attr('href', 'sc4.html');
		} else {
			$(btnlist[1]).attr('href', '#');
		}

		if (list < 6) {
			if (list > curpos) {
				let difference = .4;
				for (i = curpos; i < list; i++) {
					$('#sec').animate({
						'top': '-=30'
					});
					var timedFn = (function (x) {
						return function () {
							$('#sec li').removeClass('active');
							$(seclist[x + 1]).addClass('active');
						}
					})(i);

					setTimeout(timedFn, difference * 400);
					difference += 1;
					/*
					setTimeout(function(){
						console.log(i);
						$('#sec li').removeClass('active');
						$(seclist[i+1]).addClass('active');
					},i*1000);
					*/
				}
				curpos = list;
			} else if (list < curpos) {
				let toppx = 30 * (curpos - list);

				for (i = curpos; i > list; i--) {
					$('#sec').animate({
						'top': '+=30'
					});
					$('#sec li').removeClass('active');
					$(seclist[i - 1]).addClass('active');
				}

				curpos = list;
			}
			localStorage.setItem("curpos", curpos);
		}

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
	}
					   )
	
	
		}
	

