$(function() {
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
	 *絞り込み
	 */
		 // To keep our code clean and modular, all custom functionality will be contained inside a single object literal called "checkboxFilter".

		 var checkboxFilter = {

		   // Declare any variables we will need as properties of the object

		   $filters: null,
		   $reset: null,
		   groups: [],
		   outputArray: [],
		   outputString: '',

		   // The "init" method will run on document ready and cache any jQuery objects we will need.

		   init: function(){
		     var self = this; // As a best practice, in each method we will asign "this" to the variable "self" so that it remains scope-agnostic. We will use it to refer to the parent "checkboxFilter" object so that we can share methods and properties between all parts of the object.

		     self.$filters = $('#Filters');
		     self.$reset = $('#Reset');
		     self.$container = $('#Container');

		     self.$filters.find('fieldset').each(function(){
		       self.groups.push({
		         $inputs: $(this).find('input'),
		         active: [],
		 		    tracker: false
		       });
		     });

		     self.bindHandlers();
		   },

		   // The "bindHandlers" method will listen for whenever a form value changes.

		   bindHandlers: function(){
		     var self = this;

		     self.$filters.on('change', function(){
		       self.parseFilters();
		     });

		     self.$reset.on('click', function(e){
		       e.preventDefault();
		       self.$filters[0].reset();
		       self.parseFilters();
		     });
		   },

		   // The parseFilters method checks which filters are active in each group:

		   parseFilters: function(){
		     var self = this;

		     // loop through each filter group and add active filters to arrays

		     for(var i = 0, group; group = self.groups[i]; i++){
		       group.active = []; // reset arrays
		       group.$inputs.each(function(){
		         $(this).is(':checked') && group.active.push(this.value);
		       });
		 	    group.active.length && (group.tracker = 0);
		     }

		     self.concatenate();
		   },

		   // The "concatenate" method will crawl through each group, concatenating filters as desired:

		   concatenate: function(){
		     var self = this,
		 		  cache = '',
		 		  crawled = false,
		 		  checkTrackers = function(){
		         var done = 0;

		         for(var i = 0, group; group = self.groups[i]; i++){
		           (group.tracker === false) && done++;
		         }

		         return (done < self.groups.length);
		       },
		       crawl = function(){
		         for(var i = 0, group; group = self.groups[i]; i++){
		           group.active[group.tracker] && (cache += group.active[group.tracker]);

		           if(i === self.groups.length - 1){
		             self.outputArray.push(cache);
		             cache = '';
		             updateTrackers();
		           }
		         }
		       },
		       updateTrackers = function(){
		         for(var i = self.groups.length - 1; i > -1; i--){
		           var group = self.groups[i];

		           if(group.active[group.tracker + 1]){
		             group.tracker++;
		             break;
		           } else if(i > 0){
		             group.tracker && (group.tracker = 0);
		           } else {
		             crawled = true;
		           }
		         }
		       };

		     self.outputArray = []; // reset output array

		 	  do{
		 		  crawl();
		 	  }
		 	  while(!crawled && checkTrackers());

		     self.outputString = self.outputArray.join();

		     // If the output string is empty, show all rather than none:

		     !self.outputString.length && (self.outputString = 'all');

		     //console.log(self.outputString);

		     // ^ we can check the console here to take a look at the filter string that is produced

		     // Send the output string to MixItUp via the 'filter' method:

		 	  if(self.$container.mixItUp('isLoaded')){
		     	self.$container.mixItUp('filter', self.outputString);
		 	  }
		   }
		 };

		 // On document ready, initialise our code.

		 $(function(){

		   // Initialize checkboxFilter code

		   checkboxFilter.init();

		   // Instantiate MixItUp

		   $('#Container').mixItUp({
		     controls: {
		       enable: false // we won't be needing these
		     },
		     animation: {
					 easing: 'ease',
		       duration: 400,
					 effects: 'fade'
		     }
		   });
		 });
	/*
   * Back-toTop button (Smooth scroll)
   */
    $('.back-to-top')
		.on('click',  function () {

        // Smooth Scroll プラグインを実行
        $.smoothScroll({
            easing: 'easeOutExpo', // イージングの種類
            speed: 500             // 所要時間
        });
    });
});
