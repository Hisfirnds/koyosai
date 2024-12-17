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
		 *Tabs anime
		 */

		$('ul.tabs-nav li a').addClass('paint');
		$('ul.tabs-nav li:first-of-type a').addClass('border').removeClass('paint');
		$('ul.tabs-nav li a.paint .paint-tab').fadeIn(400, 'linear');
		$('ul.tabs-nav li a.border .border-tab').fadeIn(400, 'linear');

		$('ul.tabs-nav li a')
		 	.on('click', function(){
				$('ul.tabs-nav li a.border .border-tab').stop(true).fadeOut(400,'linear');
				$('ul.tabs-nav li a').removeClass('border');
				$('ul.tabs-nav li a').addClass('paint');
				$('ul.tabs-nav li a.paint .paint-tab').stop(true).fadeIn(400,'linear');
		 		$(this).addClass('border').removeClass('paint');
				$('ul.tabs-nav li a.border .border-tab').stop(true).fadeIn(400,'linear');
		 });
    /*
     * Tabs
     */
    $('.work-section').each(function () {

        var $container = $(this),                            // a
            $navItems = $container.find('.tabs-nav li'),     // b
            $highlight = $container.find('.tabs-highlight'); // c
        // タブの各要素を jQuery オブジェクト化
        // a タブとパネルを含む全体のコンテナー
        // b タブのリスト
        // c 選択中タブのハイライト

        // jQuery UI Tabs を実行
        $container.tabs({

            // 非表示にする際のアニメーション
            hide: { duration: 250 },

            // 表示する際のアニメーション
            show: { duration: 250 },

            // 読み込み時とタブ選択時にハイライトの位置を調整
            create: moveHighlight,
            activate: moveHighlight
        });
        // ハイライトの位置を調整する関数
        function moveHighlight (event, ui) {
            var $newTab = ui.newTab || ui.tab,  // 新しく選択されたタブの jQuery オブジェクト
                left = $newTab.position().left; // 新しく選択されたタブの左位置

            // ハイライトの位置をアニメーション
            $highlight.animate({ left: left }, 500, 'easeOutExpo');
        }
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
