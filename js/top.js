$(function () {
	/*
	*メニューボタン
	*/
	$('#menubtn').click(function(){
		$('#menu').slideToggle(
		200,
		'easeOutQuart');
	});
	/*
	 *Header anime
	 */
	var duration = 150;
	$('#menu li a')
		.on('mouseenter',function(){
			$(this).find('> span').stop(true).animate({
				height: '0%'
			}, duration, 'easeOutQuad');
		})
		.on('mouseleave', function(){
			$(this).find('> span').stop(true).animate({
				height: '100%'
			}, duration, 'easeOutQuad');
		});
	/*
	 * フェードスライドショー
	 */
	 $('.slider').slick({
	dots: true,
  infinite: true,
  speed: 500,
  fade: true,
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
	 /*
		* The fade of Smooth Scroll
		*/
			/*変数の準備*/
			var topBtn = $('.sticky-back-to-top'),
				$main = $('#main-contents'),
				mainOffsetTop = $main.offset().top;
				/*変数の準備終了*/
		topBtn.removeClass('visible');

		$(window).on('scroll',function () {
			if ($(this).scrollTop() > mainOffsetTop) {
				topBtn.addClass('visible');
			} else {
				topBtn.removeClass('visible') ;
			}
		});

		topBtn.click(function () {
			$('body,html').animate( {
				scrollTop: 0
			}, 500);
			return false;
		});
});
