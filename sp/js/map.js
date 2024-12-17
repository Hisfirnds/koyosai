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
	$(function(){
    	$("#menuButton").click(function(){
			$(this).toggleClass("active"); //メニューボタンの切り替え
        	return false;
    	});
		});
		/*
		*ステージ情報のメニューボタン
		*/
		$('#mapnavbtn').click(function(){
			$('#mapnav').fadeToggle(
			200,
			'easeOutQuart');
		});
		$('#mapnav li').click(function(){
			$('#mapnav').fadeToggle(
			200,
			'easeOutQuart');
		});
		$('.inner').skOuterClick(function(){
			if($('#mapnav').css("display")=="block"){
				$('#mapnav').fadeToggle(
				200,
				'easeOutQuart');
			}
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
});
