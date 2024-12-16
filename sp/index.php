<?php
/**************************************************

	GETメソッドのリクエスト [ベアラートークン]

	* URLとオプションを変えて色々と試してみて下さい

**************************************************/

	// 設定
	$bearer_token = 'AAAAAAAAAAAAAAAAAAAAAKKuvgAAAAAANoq89g9k0jgypwvojBeNA1GAZJI%3DbCcDKUYIpdSlKyKWFsV12ZqrujzpCjZgSO820KYn5qoNw4Z7hD' ;	// ベアラートークン
	$request_url = 'https://api.twitter.com/1.1/statuses/user_timeline.json' ;		// エンドポイント

	// パラメータ
	$params = array(
		'screen_name' => '@hokuyo_koyosai' ,
		'count' => 5 ,
	) ;

	// パラメータがある場合
	if( $params )
	{
		$request_url .= '?' . http_build_query( $params ) ;
	}

	// リクエスト用のコンテキスト
	$context = array(
		'http' => array(
			'method' => 'GET' , // リクエストメソッド
			'header' => array(			  // ヘッダー
				'Authorization: Bearer ' . $bearer_token ,
			) ,
		) ,
	) ;

	// cURLを使ってリクエスト
	$curl = curl_init() ;
	curl_setopt( $curl , CURLOPT_URL , $request_url ) ;
	curl_setopt( $curl , CURLOPT_HEADER, 1 ) ;
	curl_setopt( $curl , CURLOPT_CUSTOMREQUEST , $context['http']['method'] ) ;			// メソッド
	curl_setopt( $curl , CURLOPT_SSL_VERIFYPEER , false ) ;								// 証明書の検証を行わない
	curl_setopt( $curl , CURLOPT_RETURNTRANSFER , true ) ;								// curl_execの結果を文字列で返す
	curl_setopt( $curl , CURLOPT_HTTPHEADER , $context['http']['header'] ) ;			// ヘッダー
	curl_setopt( $curl , CURLOPT_TIMEOUT , 5 ) ;										// タイムアウトの秒数
	$res1 = curl_exec( $curl ) ;
	$res2 = curl_getinfo( $curl ) ;
	curl_close( $curl ) ;

	// 取得したデータ
	$json = substr( $res1, $res2['header_size'] ) ;
				// 取得したデータ(JSONなど)
	$header = substr( $res1, 0, $res2['header_size'] ) ;		// レスポンスヘッダー (検証に利用したい場合にどうぞ)

	// [cURL]ではなく、[file_get_contents()]を使うには下記の通りです…
	// $json = @file_get_contents( $request_url , false , stream_context_create( $context ) ) ;

	// JSONをオブジェクトに変換
	$obj = json_decode( $json , true) ;
	// HTML用
	$html = '' ;

	// エラー判定
	if( !$json || !$obj )
	{
		$html .= '<li>ツイートを読み込むことができませんでした。もう一度、アクセスしてください。</li>' ;
	}

	// 検証用にレスポンスヘッダーを出力 [本番環境では不要]
	foreach ($obj as $result){
		$name = $result['user']['name'];
		$link = $result['user']['profile_image_url'];
		$content = $result['text'];
		$updated = $result['created_at'];
		$tweet_url = $result['id_str'];
		$time_db = strtotime($updated);
		$unix   = $time_db;
		$now    = time();
		$diff_sec   = $now - $unix;
		if($diff_sec < 60){
				$then   = $diff_sec;
				$unit   = "秒前";
		}
    elseif($diff_sec < 3600){
        $then   = $diff_sec/60;
        $unit   = "分前";
    }
    elseif($diff_sec < 86400){
        $then   = $diff_sec/3600;
        $unit   = "時間前";
    }
    elseif($diff_sec < 2764800){
        $then   = $diff_sec/86400;
        $unit   = "日前";
    }
		$html .=
		"<li>".
		'<a href="https://twitter.com/hokuyo_koyosai/status/'.$tweet_url.'">'.
		$content.
		'<span>'.(int)$then.$unit."</span></a></li>";
}

?>
<!DOCTYPE html>
<html lang="ja">
	<head>
		<title>久喜北陽高校「第28回光陽祭」公式サイト</title>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes">
		<link rel="stylesheet" type="text/css" href="./CommonCss/normalize.css"/>
		<link rel="stylesheet" type="text/css" href="./CommonCss/common.css"/>
		<link rel="stylesheet" type="text/css" href="./CommonCss/fonts.css"/>
		<link rel="stylesheet" type="text/css" href="./css/top.css"/>
		<link rel="stylesheet" href="./css/top-jquery.yycountdown.css">
		<link rel="stylesheet" href="./CommonCss/slick.css"/>
		<link rel="stylesheet" href="./CommonCss/slick-theme.css"/>
		<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
		<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
		<script src="./CommonJs/vendor/modernizr.custom.min.js"></script>
		<script src="./CommonJs/vendor/jquery-3.1.0.min.js"></script>
		<script src="./CommonJs/vendor/jquery-ui-1.10.3.custom.min.js"></script>
		<script src="./CommonJs/vendor/jquery.smooth-scroll.min.js"></script>
		<script src="./CommonJs/vendor/imagesloaded.pkgd.min.js"></script>
		<script src="./CommonJs/vendor/jquery.skOuterClick.js"></script>
		<script src="./CommonJs/vendor/slick.min.js"></script>
		<script src="./js/top.js"></script>
	</head>
	<body>
		<h2 id="title">第28回光陽祭</h2>
		<div id="nav">
			<div class="togglebtn">
				<button type="button" id="menubtn">
					<a id="menuButton" href="#">
						<span></span>
						<span></span>
    				<span></span>
					</a>
				</button>
				<div id="menu">
					<ul>
						<li><a id="about" href="http://koyosai.main.jp/sp/about/">光陽祭について</a></li>
						<li><a id="floormap" href="http://koyosai.main.jp/sp/map/">会場マップ</a></li>
						<li><a id="exhibition" href="http://koyosai.main.jp/sp/exhibition/">出展企画</a></li>
						<li><a id="stage" href="http://koyosai.main.jp/sp/stage/">体育館ステージ</a></li>
						<li id="right"><a id="attention" href="http://koyosai.main.jp/sp/notice/">注意事項</a></li>
					</ul>
				</div>
			</div>
		</div>
		<div id="containear">
		<ul class="slider">
  			<li>
					<a href="http://koyosai.main.jp/sp/about/">
						<img src="./img/slide-1.jpg">
						<span class="slide-1-detail">
							<p>光陽祭について</p>
							<p>開催概要・挨拶</p>
						</span>
					</a>
				</li>
				<li>
					<a href="http://koyosai.main.jp/sp/about/">
						<img src="./img/slide-2.jpg">
						<span class="slide-2-detail">
							<p>体育館ステージ</p>
							<p>総勢 40名を超えるパフォーマーたちが<br>華麗にステージを彩る</p>
						</span>
					</a>
				</li>
				<!--
  			<li>
					<img src="./img/pic3.jpg">
				</li>
			-->
		</ul>
		<div id="main-contents">
			<h2 id="timer-close">第28回光陽祭 は終了しました。<br>たくさんのご来場ありがとうございました。</h2>
			<div class="ticker-slider-box">
				<h2 class="ticker-slider-title">
					<i class="fa fa-twitter" aria-hidden="true"></i>
					Twitter
					<a href="https://twitter.com/hokuyo_koyosai">
						<span>
							@hokuyo_koyosai
						</span>
					</a>
				</h2>
				<ul class="ticker-slider">
						<?php echo $html ?>
					</ul>
				</div>
				<h2 id="news-title">お知らせ</h2>
				<div id="main-scr-contents">
					<div class="one-news">
						<div class="news-time">2016.09.04</div>
						<div class="news-contents">来場アンケートは終了しました。<br>アンケートへのご協力ありがとうございました。</div>
					</div>
					<div class="one-news">
						<div class="news-time">2016.09.02</div>
						<div class="news-contents">注意事項を公開しました。ご来場を予定している方は必ずご覧ください。</div>
					</div>
					<div class="one-news">
						<div class="news-time">2016.08.25</div>
						<div class="news-contents">会場マップページ 追加！</div>
					</div>
					<div class="one-news">
						<div class="news-time">2016.08.21</div>
						<div class="news-contents">光陽祭についてページ「光陽祭に向けて」、出展企画、体育館ステージページ 追加！</div>
					</div>
					<div class="one-news">
						<div class="news-time">2016.07.24</div>
						<div class="news-contents">第28回光陽祭公式サイト オープン！</div>
					</div>
				</div>
			</div>
			<footer>
				<div id="pagetop">
					<span class="btn back-to-top">
						<i class="material-icons">keyboard_arrow_up</i>
					</span>
				</div>
				<p class="copylight-attention">このサイトに掲載されている一切の文書・図版・写真等を、</p>
				<p class="copylight-attention">手段や形態を問わず複製・転載することを禁じます。</p>
				<p class="copylight">&copy; 2016 Kuki Hokuyo High School</p>
				<p class="copylight">Koyo Festival Executive Committee</p>
			</footer>
	</div>
	</body>
	</html>
