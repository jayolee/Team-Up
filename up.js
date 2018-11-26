function sc1() {
	let curnumber = 0;
	let orderarr = ['.first', '.second', '.third']
	$(".next_btn").click(function () {
		let lefts = $(".card_row").css('left');

		lefts = parseInt(lefts);

		if (curnumber<2) {
			$(".card_row").animate({
				left: "-=100%"
			});
			curnumber += 1;
			$('.nav-dot').removeClass('active');
			$('.wrap_nav-dot').find(orderarr[curnumber]).addClass('active');
			if (curnumber == 2) {
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

			if (curnumber == 1) {
				$('.deactive').css('opacity', '0')
				setTimeout(function () {
					$('.deactive').css('display', 'none')
				}, 3000);
			}
		}


	});

}



function sc2() {
	let animals = ['bkspmonkey.svg', 'polarbear.svg'];
	let curanimal = Math.floor(Math.random() * 2);
	$('.titleimg img').attr('src', 'images/' + animals[curanimal]);

}

function sc3() {
	let curpos = 0;
	let seclist = $('#sec').find('li');

	$('#sec li').click(function () {
		let list = $(this).text();
		list = parseInt(list);
		if(list<6){
		if (list > curpos) {
			let toppx = 30 * (list - curpos);
			for (i = curpos; i < list; i++) {
				$('#sec').animate({
					'top': '-=30'
				});
				$('#sec li').removeClass('active');
				$(seclist[i+1]).addClass('active');
			}
			curpos = list;
		} else if (list < curpos) {
			let toppx = 30 * (curpos - list);
			
			for (i = curpos; i > list; i--) {
				$('#sec').animate({
					'top': '+=30'
				});
				$('#sec li').removeClass('active');
				$(seclist[i-1]).addClass('active');
			}

			curpos = list;
		}
		localStorage.setItem("curpos",curpos);
		}
		
	});
}

function sc4(){
	curpose=localStorage.getItem("curpos");

}
