var Global = {

	Nav : {

		scrollHide : (function(){
		
			var delta, lastScrollTop;
			
			return {

				init : function(){

					lastScrollTop = 0;
					delta = 50;

					$navbar = $(".navbar.scroll-hide");

					$navbar.mouseover(function() {

						$navbar.removeClass("closed");

					});

					return function(event){

						var st = $(this).scrollTop();

						if (Math.abs(lastScrollTop - st) <= delta) {

							return;

						}
						if (st > lastScrollTop) {

							$navbar.addClass("closed");

						} else {

							$navbar.removeClass("closed");

						}

						lastScrollTop = st;

					}

				}

			}
		
		}()),

		barToggel : function(event){

			$('body, html').toggleClass("nav-open");

		}

	}

};
$(function(){

	//涓婁紶鎻掍欢
	$('.fileupload').fileupload();

	//鏃堕棿閫夊彇鎻掍欢
	for( var i = 0 ; i < $('.datepicker').length ; i ++ ){

		var start_date = $('.datepicker').eq(i).attr('data-start-date');

		if (start_date) {

			$('.datepicker').datepicker({
				startDate : start_date
			});

		}else{

			$('.datepicker').datepicker();

		};

	};

	//鏃堕棿鍖洪棿閫夊彇
	$('.reservation').daterangepicker();

	//鎺у埗瀵艰埅浼哥缉
	$(window).scroll(Global.Nav.scrollHide.init());
	
	//灏忓睆瀵艰埅鎸夐挳
	$('.navbar-toggle').click(Global.Nav.barToggel);


	$(window).on('resize load',function(){

        if(document.body.scrollHeight >= document.body.clientHeight && document.body.clientWidth>640){
            var header_height =  $('.navbar')[0].clientHeight;
            // var body_height = document.body.clientHeight;
            var body_height = $(document).height();
            var content_height = body_height - header_height - 50;
            $(".fluid-height").css('min-height',content_height);
        }

    });

});