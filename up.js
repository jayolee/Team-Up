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

function sc3() {

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
	let curpos = localStorage.getItem("curpos");
	let timer = curpos;
	let isPaused=false;
	
	$('#quit').click(function () {
		$('.greybox').css('display', 'block');
		setTimeout(function () {
			$('.greybox').css('opacity', 1);
		}, 100)
		isPaused=true;
		$('#bar').css('animation-play-state', 'paused');

	})
	$('#goback').click(function(){
		$('.greybox').css('opacity', 0);
	
		setTimeout(function () {
				$('.greybox').css('display', 'none');
		}, 300)
		isPaused=false;
		$('#bar').css('animation-play-state', 'running');
	})
	$('#bar').css('animation-duration', timer + 's');
	$('.settime').text('00:0' + timer);

	var ticking =
		setInterval(function () {
			if(!isPaused){
			timer = --timer < 0 ? curpos : timer;
			$('.settime').text('00:0' + timer);
			
			if(timer==0){
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
				$('#btns').css({
					'display': 'block',
					'opacity': '1'
				});
			}, 300);

		}

}

function sc6() {
	let countnum = 0;

	let blnpos = 129;
	let runactivity = setInterval(function () {

		let blnwidth = $('#balloon').css('width');
		let blnpos = $('.blnwrapper').css('top');
		blnpos = parseInt(blnpos);
		blnpos -= 20;
		blnwidth = parseInt(blnwidth);
		$('.sectitle').text('Inhale');
		setTimeout(function () {
			$('.sectitle').text('Hold')
		}, 3500);
		setTimeout(function () {
			$('.sectitle').text('Exhale');
			$('#balloon').css('width', blnwidth + 25 + 'px')
			$('.blnwrapper').css('top', blnpos + 'px');
		}, 5500);
		countnum += 1;
		if (countnum == 3) {
			clearInterval(runactivity);
			balloondone();
		}
	}, 9000);



	function balloondone() {
		$('.dots').css('display','none');
		$('.timer').css({
			'border': '0px',
			'box-shadow':'none'
		});
		$('.sectitle').text('Oh?');
		setTimeout(function () {
			$('.blnwrapper').css('animation', 'floating linear 3s forwards');
			$('.saveanimal').css('animation', 'floating linear 3s forwards');
		}, 300);
	};

}
