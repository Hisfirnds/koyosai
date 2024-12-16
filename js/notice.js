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
     * Back-toTop button (Smooth scroll)
     */
    $('.back-to-top').on('click', function () {

        // Smooth Scroll プラグインを実行
        $.smoothScroll({
            easing: 'easeOutExpo', // イージングの種類
            speed: 500             // 所要時間
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
