$(function () {
	/*
	*スティッキーヘッダーのアニメ
	*/
	$('body').each(function () {
	 var $win = $(window),
			 $connect = $('#nav'),
			 $toggleList = $('#nav li'),
			 position = $(this).offset().top,
			 current = 0,
			 scroll;
	 $win.on('scroll', function () {
		 scroll = $win.scrollTop();
		 current = 1-(scroll - position)/600;
		 if (current >=1) {
			 $connect.css('background-color','rgba(255,220,0,1)');
			 $toggleList.css('background-color','rgba(255,255,255,1)');
		 }
		 if (1 > current && current > 0.7) {
			 $connect.css('background-color' , 'rgba(255,220,0,' + current + ')');
			 $toggleList.css('background-color','rgba(255,255,255,' + current + ')');
		 }
		 if (0.7 >= current) {
			 $connect.css('background-color','rgba(255,220,0,0.7)');
			 $toggleList.css('background-color','rgba(255,255,255,0.7)');
		 }
	 });
 	});
	/*
	*メニューボタン
	*/
	$('#menuButton').click(function(){
		$('#menu').slideToggle(
		200,
		'easeOutQuart');
	});
	$('.togglebtn').skOuterClick(function(){
		if($('#menu').css("display")=="block"){
			$('#menu').slideToggle(
			200,
			'easeOutQuart');
			$("#menuButton").toggleClass("active");
		}
	});
	/*
	*トグルボタンのアニメーション
	*/
  $("#menuButton").click(function(){
	$(this).toggleClass("active"); //メニューボタンの切り替え
    	return false;
  });
    /*
     * Back-toTop button (Smooth scroll)
     */
    $('.back-to-top').on('click', function () {

        // Smooth Scroll プラグインを実行
        $.smoothScroll({
            easing: 'easeOutExpo', // イージングの種類
            speed: 700             // 所要時間
        });
    });
	/*スライドショー
	 *
	 */
		$('.slider').slick({
		arrows: false,
		fade: true,
		infinite: true,
	  speed: 500,
		autoplay:true,
	  cssEase: 'linear'
		});
		/*
		 *ティッカースライダー
		 */
		 $('.ticker-slider').slick({
	  infinite: true,
		autoplaySpeed: 5000,
	  speed: 800,
		autoplay:true,
	  cssEase: 'ease-in-out'
		});
		/*
		 *ニュースティッカー
		 */
		/*表示秒数などはよゆうを持たせる*/
		var effectSpeed = 1000;
		var slideSpeed = 10000;
		var tickerDelay = 2000;
		var switchDelay = 16000;
		var easing = 'swing';
		var slideEasing = 'linear';
		var $targetObj = $('.ticker');
		var $targetUl = $targetObj.children('ul');
		var $targetList = $targetObj.find('li');
		var $setList = $targetObj.find('li:first');

		var ulWidth = $targetUl.width();
		var setListWidth = $setList.outerWidth(true);
		var setSlideSpeed = setListWidth * 20;
		$targetList.css({top:'0',left:'0',position:'absolute'});

		var liCont = $targetList.length;

		$setList.css({
			left:(ulWidth),display:'block',opacity:'0',zIndex:'98'
		})
		.stop()
		.animate({
				left:'0',opacity:'1'},
				effectSpeed,easing
		)
		.delay(tickerDelay)
		.animate({
			left: 0 - setListWidth
		},
		setSlideSpeed,slideEasing)
		.addClass('showlist');

			if(liCont > 1) {
				setInterval(
					function(){
						var $activeShow = $targetObj.find('.showlist');
						var $activeShowNext = $activeShow.next();
						var showListNextWidth = $activeShowNext.outerWidth(true);
						$activeShow.animate({opacity:'0'},
						effectSpeed,easing).next()
						.css({
							left:(ulWidth),
							display:'block',
							opacity:'0',
							zIndex:'99'
						})
						.animate({
							left:'0',opacity:'1'
							},
							effectSpeed,easing)
						.delay(tickerDelay)
						.animate({
							left: 0 - showListNextWidth
							},
							slideSpeed,slideEasing)
						.addClass('showlist')
						.end()
						.appendTo($targetUl)
						.css({zIndex:'98'})
						.removeClass(
							'showlist'
						);
				},switchDelay);
			}

});
