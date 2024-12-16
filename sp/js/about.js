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
		 current = 1-(scroll - position)/300;
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
