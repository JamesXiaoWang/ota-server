var Prompt = (function() {

	var extend = function(def, pram) {

		for(var k in pram) {

			def[k] = pram[k];

		}

		return def;

	};

	var _Prompt = {

		confirm: function() {

			var dom = null;

			var close = function() {

				dom.remove();
				dom = null;

			};

			var def = {
				title: '弹窗标题',
				title_bg: 'title_bg_blue',
				info: '自定义弹窗内容，居左对齐显示，告知需要确认的信息等',
				enter_text: Message.ok,
				exit_text: Message.cancle,
				enter_fn: close,
				exit_fn: close
			};

			var layout = function(pram) {

				return [
					'<div class="modal fade" style="display: block;">',
					'<div class="modal-dialog dialog_pad">',
					'<div class="modal-content">',
					'<div class="modal-header title_bg_blue color-white">',
					'<button type="button" class="close ComfirmExit x-color">×</button>',
					'<h4 class="modal-title fw9">', '<span class="fl inline-block mr5 sprite sprite-ota_07_box_icon_ts"></span>',
					pram.title,
					'</h4>',
					'</div>',
					'<div class="modal-body">',
					'<p class="txt_center fs18">' + pram.info + '</p>',
					'</div>',
					'<div class="modal-footer txt_center confirm_button mt3">',
					'<button type="button" class="btn btn-primary ComfirmEnter">' + pram.enter_text + '</button>',
					'<button type="button" class="btn btn-default-outline ComfirmExit">' + pram.exit_text + '</button>',
					'</div>',
					'</div>',
					'</div>',
					'</div>',
					'<div class="modal-backdrop fade"></div>'
				].join('');

			};

			return function(pram) {

				var options = extend(def, pram);

				dom = $(layout(options));

				$('body').append(dom);

				setTimeout(function() {
					$('.fade').addClass('in');
				}, 0);

				$('.ComfirmEnter').one('click', def.enter_fn);
				$('.ComfirmExit').one('click', def.exit_fn);

				$('.ComfirmEnter').focus();

				return close;

			};

		},

		alert: function(pram) {

			var dom = null;

			var close = function() {

				dom.remove();
				dom = null;

			};

			var def = {
				title: Message.waring,
				info: '',
				btn_text: Message.ok,
				btn_fn: close
			};

			var layout = function(pram) {

				return [
					'<div class="modal fade" style="display: block;">',
					'<div class="modal-dialog dialog_pad">',
					'<div class="modal-content">',
					'<div class="modal-header title_bg_blue color-white">',
					'<h4 class="modal-title">', '<span class="fl inline-block mr5 sprite sprite-ota_08_box_icon_jg"></span>',
					pram.title,
					'</h4>',
					'</div>',
					'<div class="modal-body">',
					'<p class="txt_center fs18">' + pram.info + '</p>',
					'</div>',
					'<div class="modal-footer txt_center confirm_button mt3" style="text-align:center;">',
					'<button type="button" style="width: 150px;margin: 0" class="btn btn-lg btn-primary AlertBtn">' + pram.btn_text + '</button>',
					'</div>',
					'</div>',
					'</div>',
					'</div>',
					'<div class="modal-backdrop fade"></div>'
				].join('');

			};

			return function(pram) {

				var options = extend(def, pram);

				dom = $(layout(options));

				$('body').append(dom);

				setTimeout(function() {
					$('.fade').addClass('in');
				}, 0);

				$('.AlertBtn').one('click', def.btn_fn);

				$('.AlertBtn').focus();

				return close;

			};

		},

		insert_html: function() {

			var dom = null;

			var close = function() {

				dom.remove();
				dom = null;

			};

			var def = {
				title: '弹窗标题',
				title_bg: 'title_bg_blue',
				info: '自定义弹窗内容，居左对齐显示，告知需要确认的信息等',
				enter_text: Message.ok,
				exit_text: Message.cancle,
				enter_fn: close,
				exit_fn: close
			};

			var layout = function(pram) {

				return [
					'<div class="modal fade" style="display: block;">',
					'<div class="modal-dialog dialog_pad">',
					'<div class="modal-content">',
					'<div class="modal-header title_bg_blue color-white">',
					'<button type="button" class="close ComfirmExit x-color">×</button>',
					'<h4 class="modal-title fw9">', '<span class="fl inline-block mr5 sprite sprite-ota_07_box_icon_ts"></span>',
					pram.title,
					'</h4>',
					'</div>',
					'<div class="modal-body txt_center">',
					'<textarea class="textarea_insert" style="width:90%;height:80px;resize:none;padding:10px;font-size:15px;border-radius:5px;" maxlength="100"></textarea>',
					'</div>',
					'<div class="modal-footer txt_center confirm_button mt3">',
					'<button type="button" class="btn btn-primary ComfirmEnter">' + pram.enter_text + '</button>',
					'<button type="button" class="btn btn-default-outline ComfirmExit">' + pram.exit_text + '</button>',
					'</div>',
					'</div>',
					'</div>',
					'</div>',
					'<div class="modal-backdrop fade"></div>'
				].join('');

			};

			return function(pram) {

				var options = extend(def, pram);

				dom = $(layout(options));

				$('body').append(dom);

				setTimeout(function() {
					$('.fade').addClass('in');
				}, 0);

				$('.ComfirmEnter').on('click', def.enter_fn);
				$('.ComfirmExit').one('click', def.exit_fn);

				$('.ComfirmEnter').focus();

				return close;

			};

		}

	};

	return {

		confirm: _Prompt.confirm(),
		alert: _Prompt.alert(),
		insert_html: _Prompt.insert_html()

	};

}());

//提示框   引入jquery.poshytip.js文件
var Poshytip = (function() {

	var init = function(hover, title) {

		var obj = $("." + hover)

		obj.attr("title", title);

		obj.poshytip({

			className: 'style_title',
			bgImageFrameSize: 11,
			offsetX: -15,
			showTimeout:0

		});

	};
	return {
		init: init
	}
}());

var Common = {
	//获取类型数据
	get_type:function(obj){

		$('#type').change(function(){
			if ($(this).val()=='') {
				$('.select2-chosen').html($("#values option[value='']").text());
			};
	
		$('#values option:gt(0)').remove();

		if (obj=='active') {

			var chart='active';

		}else{

             var chart='new';
		}

        var type = $(this).val();
        var product = $('#product_id').val();
    	$.ajax({
    		// url:"/Home/Statistics/get_type",
			url:"#",
    		type: 'post',
    		data: {type: type,chart:chart,product_id:product},
    		success:function(data){

    			if (data.keys!=null) {
    				var	html="";
    				var values = data.values;
    				var keys = data.keys;

    				for(var i=0;i<values.length;i++){

    					html +="<option  value='" + keys[i] + "' arr='" + values[i] + "'>" + values[i] + "</option>";
    					$('.select2-chosen').html($("#values option[value='']").text());
    					　　
    				}

    				$('#values').find('option').after(html);
    			};

    		},error:function(e) {

    			console.log(e);

    		}
    	})
        	
    })
	},

	get_select:function(obj){
		var product = $('#product_id').val();
		var select = $('.select');
		
		for (var i = 0;i<select.length;i++) {
			var option = $(select[i]).children('option');
			var data = $(select[i]).data('default');
	
			for (var k = option.length - 1; k >= 0; k--) {
				if($(option[k]).val() == data){
					$(option[k]).attr("selected",true)
				}
			};


			
            if (i==0) {
               
                var type = $('#type').val();
                if (obj=='active') {

					var chart='active';

				}else{

		             var chart='new';
				}
		    	$.ajax({
		    		// url:"/Home/Statistics/get_type",
					url:"#",
		    		type: 'post',
		    		data: {type: type,chart:chart,product_id:product},
		    		success:function(data){

		    			if (data.keys!=null) {
		    				
		    				var	html="";
		    				var values = data.values;
		    				var keys = data.keys;

		    				for(var i=0;i<values.length;i++){

		    					html +="<option  value='" + keys[i] + "' arr='" + values[i] + "'>" + values[i] + "</option>";
		    					　　
		    				}

		    				$('#values').find('option').after(html);

		    				var option = $(select[1]).children('option');
		    				var data = $(select[1]).data('default');

		    				for (var p = option.length - 1; p >= 0; p--) {
		    					if($(option[p]).val() == data){
		    						$(option[p]).attr("selected",true)
		    					}
		    				};

		    				var default1=$('#hidden_val').data('default')
		    				$('.select2-chosen').html($("#values option[value='"+default1+"']").text());
		    				$('#values').val(default1);
		    			};

		    		},error:function() {

		    			console.log("ajax错误");
		    		}
		    	})

            }else if(i == 1){
            	continue;
            }
		};
	},
	
	// 系统通知
    get_envelope:function(){

        $.ajax({

            type: 'post',

            url: '/Home/Notice/getNoticeState',

            success: function(data){


                    if(data.info>0){
                          
                           $('p').remove('#counter');

                            var p='<p class="counter" id="counter">'+data.info+'</p>'
                            
                            $('#mymessage').append(p);
                       
                    }else{


                        $('p').remove('#counter');
                        console.log(111)

                     
       
                    }

            }


        });

    },


	// 权限
	disabled: function() {
		window.onload = function() {

			$(".disabled").addClass("edit-disabled");
			$(".disabled").removeAttr('href');
			$(".disabled").unbind("click");

		}

	},
	delajax: function(page) {

		$.ajax({

			url: page,
			datatype: "json",
			success: function(data) {

				if(data.status == "1") {

					if (Common.GetQueryString(['redirect', page])){
						// 对URL解码，然后跳转
						window.location.href = decodeURIComponent(Common.GetQueryString(['redirect', page]));

					}

					else if(data.url) {

						window.location.href = data.url;

					} else {

						history.back(-1);

					}

				} else {

					var close = Prompt.alert({
						title: Message.modal_title,
						info: data.info,
						btn_text: Message.ok,
						btn_fn: function() {

							close();

						}

					});

				}

				// 删除前一个模态的 内容 和 背景
				$('.modal-backdrop').eq(0).remove();

				$('.modal').eq(0).remove();

			}
		})
	},
	delapply: function() {
                     
		$('.TagsDel').click(function() {
            
			var href = $(this).data('href');

			var close = Prompt.confirm({
				title: Message.modal_title,
				info: Message.confirm_delete,
				enter_text: Message.ok,
				exit_text: Message.cancle,
				enter_fn: function() {

					Common.delajax(href);
	
				},
				exit_fn: function() {

					close();

				}
			});

			$(".modal-header").removeClass('title_bg_blue').addClass('title_bg_red');

			return false;

		});
	},
	FormAjax: function(page) {

		var form = $(".FormAjax");

		var index = 0;

		if(form.hasClass("ajaxoff")) {
			return false;
		}

		if(page == 1 || page == 2 || page == 3) {

			index = page - 1;

		}

		$.ajax({

			url: $(form[index]).attr("action"),
			type: $(form[index]).attr("method"),
			data: $(form[index]).serialize(),
			datatype: "json",
			beforeSend: function() {

				form.addClass("ajaxoff");

				$(form[index]).find("button[type=submit]").removeClass('btn-primary').addClass('btn-default').html(Message.handling);
				$(form[index]).find("input[type=submit]").removeClass('btn-primary').addClass('btn-default').val(Message.handling);

			},
			success: function(data) {

				if(page && page == "login") {

					if(data.status == "1") {

						window.location.href = data.url;

					} else {

						$(form[index]).find("input[type=submit]").val(Message.sign);

						$(form[index]).find("label[for=code]").html(data.info).css("display", "block");

					}

				} else {

					if(data.status == "1") {

						if (Common.GetQueryString(['redirect'])){
							// 对URL解码，然后跳转
							window.location.href = decodeURIComponent(Common.GetQueryString(['redirect']));

						}

						else if(data.url) {

							window.location.href = data.url;

						} else {

							history.back(-1);

						}

					} else {

						var close = Prompt.alert({
							title: Message.modal_title,
							info: data.info,
							btn_text: Message.ok,
							btn_fn: function() {

								if(data.url) {

									window.location.href = data.url;

								} else {

									close();

								}

							}
						});

						$(form[index]).find("button[type=submit]").removeClass('btn-default').addClass('btn-primary').html(Message.submit);
						$(form[index]).find("input[type=submit]").removeClass('btn-default').addClass('btn-primary').html(Message.submit);
						form.removeClass("ajaxoff");

						$(".modal-header").removeClass('title_bg_blue').addClass('title_bg_red');

					}

					$(".AlertBtn").focus();

					// 删除前一个模态的 内容 和 背景
					if($('.modal-backdrop').length == 2) {

						$('.modal-backdrop').eq(0).remove();

						$('.modal').eq(0).remove();

					}

				}

			},
			complete: function() {

				if(page && page == "login") {

					$(form[index]).find("button[type=submit]").removeClass('btn-default').addClass('btn-primary').html(Message.submit);
					$(form[index]).find("input[type=submit]").removeClass('btn-default').addClass('btn-primary').html(Message.submit);
					form.removeClass("ajaxoff");
				
				}
				
			},
			error: function() {
				var close = Prompt.alert({
					title: Message.modal_title,
					info: Message.fail,
					btn_text: Message.ok,
					btn_fn: function() {

						close();

					}
				});

				$(".modal-header").removeClass('title_bg_blue').addClass('title_bg_red');

				// 删除前一个模态的 内容 和 背景
				if($('.modal-backdrop').length == 2) {

					$('.modal-backdrop').eq(0).remove();

					$('.modal').eq(0).remove();

				}
				
				$(form[index]).find("button[type=submit]").removeClass('btn-default').addClass('btn-primary').html(Message.submit);
				$(form[index]).find("input[type=submit]").removeClass('btn-default').addClass('btn-primary').html(Message.submit);
						
				form.removeClass("ajaxoff");
			}

		});

		return false;

	},

	CascadeAjax: function() {

		return function(data, url, tf) {

			var cd = $(".CascadeAjaxCd");

			var div = cd.closest(".form-group").find("label.error");

			$("form").addClass("ajaxoff");

			$.ajax({

				url: url,
				data: data,
				type: "post",
				success: function(data) {

					if(data == "false") {

						$(div).html(Message.already_exists).css({
							"color": "red",
							"display": "block"
						});

						$("form").addClass("ajaxoff");

						return false;

					} else if(data == "true") {

						$(div).html("");

						$("form").removeClass("ajaxoff");

						if(tf == "sub") {

							$("form").submit();

						}

					}

				},
				complete: function() {

				}

			});

		}

	}(),

	// 权限控制checkbox 全选，全不选

	PermissionCheckbox: (function() {

		var init = function() {

			var Fa = $(".PermissonFa");

			var Cd = $(".PermissonCd");

			//若子元素默认选中 父元素 选中

			for(var i = 0; i < Cd.length; i++) {

				if($(Cd[i]).is(':checked')) {

					var permis = $(Cd[i]).attr("data-permission");

					for(var k = 0; k < Fa.length; k++) {

						if($(Fa[k]).attr("data-permission") == permis) {

							$(Fa[k]).prop("checked", true);

						}

					}

				}

			}

			//全选 全不选

			$(Fa).on("click", function() {

				var permis = $(this).attr("data-permission");

				for(var i = 0; i < Cd.length; i++) {

					if($(Cd[i]).attr("data-permission") == permis) {

						if($(this).is(":checked")) {

							$(Cd[i]).prop("checked", true);

						} else {

							$(Cd[i]).prop("checked", false);

						}

					}

				}

			});

			//子元素选中 父元素选中 ； 子元素 全不选中 父元素 不选中

			$(Cd).on("click", function() {

				var permis = $(this).attr("data-permission");

				var flage = 0;

				for(var i = 0; i < Cd.length; i++) {

					if($(Cd[i]).attr("data-permission") == permis && $(Cd[i]).is(":checked")) {

						flage = 1;

					}

				}

				for(var k = 0; k < Fa.length; k++) {

					if($(Fa[k]).attr("data-permission") == permis) {

						if(flage == 0) {

							$(Fa[k]).prop("checked", false);

						} else
						if(flage == 1) {

							$(Fa[k]).prop("checked", true);

						}

					}

				}

			});

		}

		return {

			init: init

		}

	}()),
	//日期的起始时间选择

	date_select: function() {

		//开始时间：
		$('.data_start').datepicker({
			autoclose: true,
			todayHighlight: true,
			endDate: new Date()
		}).on('changeDate', function(e) {
			var startTime = e.date;
			$('.data_end').datepicker('setStartDate', startTime);
		});
		//结束时间：
		$('.data_end').datepicker({
			autoclose: true,
			todayHighlight: true,
			endDate: new Date()
		}).on('changeDate', function(e) {
			var endTime = e.date;
			$('.data_start').datepicker('setEndDate', endTime);
		});

		var start_time = $("input[name=start_time]").val();
		var end_time = $("input[name=end_time]").val();
		if(start_time != "" && end_time== ""){

		    $('.data_end').datepicker('setStartDate',start_time);

		} else if(start_time=="" && end_time!=""){

		    $('.data_start').datepicker('setEndDate',end_time);

		}
	},
	/**
	 * 获取URL中的参数
	 * @param {str} name URL中参数key
	 * @return str URL的参数值
	 */
	GetQueryString: function(array) {
		var name = array[0]
		if (array[1]) {
			href = '?' + array[1].split('?')
		} else {
			href = window.location.search;
		}
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = href.substr(1).match(reg);
		if (r != null) return (r[2]);
		return null;
	}

};

var CascadeCheck = {

	do_version: function() {

		var ajax_url = "/Home/Proving/check_version";

		var ajaxcheck = function(tf) {

			if($("#name").val() === "" && $("#name").val() == $("#name").attr("data-value") || !$("#model_id").val()) {
				$(".CascadeAjaxCd").closest(".form-group").find("label.error").html("");
				return false;
			}

			var data = {
				product_id: $("#name").attr("data-url"),
				model_id: $("#model_id").val(),
				name: $("#name").val()
			};

			if($("form").hasClass("edit")) {
				data['_id'] = $("form").attr("data-id");
			}

			Common.CascadeAjax(data, ajax_url, tf);

		};

		$("#name").on("blur", ajaxcheck);
		$("#model_id").on("change", ajaxcheck);

	},

	do_debug: function() {

		var ajax_url = "/Home/Proving/check_debug_imei";

		var ajaxcheck = function(tf) {

			if($("#imei").val() == "" && $("#imei").val() == $("#imei").attr("data-value") || !$("#model_id").val()) {
				$(".CascadeAjaxCd").closest(".form-group").find("label.error").html("");
				return false;
			}

			var data = {
				product_id: $("#imei").attr("data-url"),
				model_id: $("#model_id").val(),
				imei: $("#imei").val()
			};

			Common.CascadeAjax(data, ajax_url, tf);

		};

		$("#imei").on("blur", ajaxcheck);

		$("#model_id").on("change", ajaxcheck);

	},

	do_device: function() {

		var ajax_url = "/Home/Proving/check_tags_imei";

		var ajaxcheck = function(tf) {

			if($("#imei").val() == "" && $("#imei").val() == $("#imei").attr("data-value") || !$("#model_id").val()) {
				$(".CascadeAjaxCd").closest(".form-group").find("label.error").html("");
				return false;
			}

			var data = {
				product_id: $("#imei").attr("data-url"),
				tags_id: $("#imei").attr("data-tags-url"),
				model_id: $("#model_id").val(),
				imei: $("#imei").val()
			};

			Common.CascadeAjax(data, ajax_url, tf);

		};

		$("#imei").on("blur", function() {

			ajaxcheck();

		});

		$("#model_id").on("change", ajaxcheck);

	}

};

var RS_Uploader = function() {

	var extend = function(def, pram) {

		for(var k in pram) {

			def[k] = pram[k];

		}

		return def;

	};

	return function(obj, $list) {
		var def = {
			chunked: true,
			chunkSize: 5242880, //5M
			swf: '/Public/Home/js/webuploader/Uploader.swf',
			pick: '#picker',
			auto: false,
            compress:false,
            fileSizeLimit: 3221225472, //3G

            timeout:900 * 2000,
            accept:{
            	title: 'Files',
                extensions: 'bin,apk,rar,zip,img,xlsx,csv,xls',
                mimeTypes:'.bin,.apk,.rar,.zip,.img,.xlsx,.csv,.xls'
            }
		};

		var msg = {
			wait: Message.wait,
			uploading: Message.uploading,
			success: Message.success,
			error: Message.error,
			name: Message.name,
			size: Message.size,
			state: Message.state,
			file_info: Message.file_info,
			md5_not_match: Message.md5_not_match,
			size_not_match: Message.size_not_match,
			file_name_rule1:Message.file_name_rule,
			file_name_rule2:Message.file_name_rules,
			file_name_error:Message.file_name_error,
		};

		def = extend(def, obj);
		//      msg = extend(msg, $message);
		
		var uploader = WebUploader.create(def);

		uploader.on('beforeFileQueued', function(file) {
			if(this.isInProgress()) {
				this.stop(true);
			}
			this.reset();
			$list.html("");
		});

		//选择文件后正常上传文件，信息到页面
		var fileinfo=function(file,rgt,val){
			if(!rgt.test(file.name)) {
				$list.html('<div id="' + file.id + '" class="item">' +
					'<p class="info" style="color:#f00">' + msg['name'] + '：' +file_name_rule + '</p>' +
					'<p>' + msg['size'] + '：' + file.size + ' B</p>' +
					'<p>MD5：' + val + '</p>' +
					'<p class="state">' + msg['state'] + '：' + msg['file_name_error'] + '</p>' +
					'</div>');

				$(".FormAjax").addClass("ajaxoff");
				

			}else{

				$(".FormAjax").removeClass("ajaxoff");
				$list.html('<div id="' + file.id + '" class="item">' +
					'<p class="info">' + msg['name'] + '：' + file.name + '</p>' +
					'<p>' + msg['size'] + '：' + file.size + ' B</p>' +
					'<p>MD5：' + val + '</p>' +
					'<input type="hidden" name="file_url_state" value="true">'+
					'<input type="hidden" name="file_name" value='+file.name+'>'+
					'<p class="state">' + msg['state'] + '：' + msg['wait'] + '</p>' +
					'</div>');
				
					uploader.upload();

				$("#cancle_upload").removeClass('hidden');
				// $('#app_icon_img').attr('src','');
			}
		}
		uploader.on('error', function(file){
			if (file=='Q_TYPE_DENIED') {
				var close = Prompt.alert({
						title:'提示',
						info:'上传文件类型错误',
						btn_text: Message.ok,
						btn_fn: function() {

							close();

						}

					});
			};

		});
		// 当有文件添加进来的时候
		uploader.on('fileQueued', function(file) {

			var domain = window.location.href.split("Home")
			var url = domain[0] +'Home/Api/getToken';

			$.ajax({
	    		url:url,
	    		type: 'post',
	    		async:false,
	    		success:function(data){
	    			console.log(data)
	    			if (data.code == 200) {	//授权上传
	    				var token = data.token
	    				uploader.options.formData.token = token; //将token放入上传参数内

	    				if ($("#app_icon").length>0) {
							var rgt = /^[^ ]+(\.apk)$/;

							file_name_rule = msg['file_name_rule2'];

						}else{
							var rgt = /^[a-zA-Z0-9\_\-\.]+(\.[0-9a-zA-Z]{1,4})$/;

							file_name_rule = msg['file_name_rule1'];
						}
						   
						$list.html('<p class="state">' + msg['file_info'] + '</p>');
						uploader.md5File(file)
							.progress(function(percentage) {})
							.then(function(val) {
								file.md5 = val;
			                    if (def.fileserver) {
			                    	$.ajax({
							    		url:def.fileserver,
							    		type: 'post',
							    		data: {md5:val,size:file.size,token:token,upload_type:def.formData.upload_type},
							    		async:false,
							    		success:function(data){
							    			console.log(data.code);
							    			var data=eval(('(' + data + ')'));
							    			if (data.code == 200) {//文件存在，无需上传
							    				$list.html('<div id="' + file.id + '" class="item">' +
												'<p class="info">' + msg['name'] + '：' + file.name + '</p>' +
												'<p>' + msg['size'] + '：' + file.size + ' B</p>' +
												'<p>MD5：' + val + '</p>' +
												'<input type="hidden" name="file_url_state" value="true">'+
												'<input type="hidden" name="file_name" value='+file.name+'>'+
												'<input type="hidden" name="file_sha256" value='+data.file_sha256+'>'+
												'<p class="state">' + msg['state'] + '：' + '上传成功' + '</p>' +
												'</div>');
							    				$("#file_url").val(data.file_url);
												$("#file_md5").val(data.file_md5);
												$("#file_size").val(data.file_size);
												// that.stop(true);
												var a = {'data' : data}
												uploadEnd(a,file);
												

							    			}else if(data.code == 107){//未授权或授权过期
							    				$list.html('<div id="' + file.id + '" class="item">' +
													'<p class="state">' + msg['state'] + '：' + data.info + '</p>' +
													'</div>');

												$(".FormAjax").addClass("ajaxoff");
							    			}else{//正常上传
							    				fileinfo(file,rgt,val);
							    			}

							    		},error:function(e) {
							    			console.log(888)
							    			console.log(e)
							    			
							    		}
							    	})
			                    }else{
			                    	console.log(222) 
			                    	fileinfo(file,rgt,val);
			                    }
			                   


							});


	    			}else{//未授权
	    				$list.html('<div id="' + file.id + '" class="item">' +
							'<p class="state">' + msg['state'] + '：' + data.info + '</p>' +
							'</div>');

						$(".FormAjax").addClass("ajaxoff");
	    			}
	    			
	    			

	    		},error:function(e) {
	    			console.log(888)
	    			console.log(e)
	    			$list.html('<div id="' + file.id + '" class="item">' +
						'<p class="state">' + msg['state'] + '：Network error.</p>' +
						'</div>');

					$(".FormAjax").addClass("ajaxoff");
	    			
	    		}
	    	})
			
			return false;


			

		});


		// 文件上传过程中创建进度条实时显示。
		uploader.on('uploadProgress', function(file, percentage) {
			var $li = $('#' + file.id),
				$percent = $li.find('.progress .progress-bar');

			// 避免重复创建
			if(!$percent.length) {
				$percent = $('<div class="progress progress-striped active">' +
					'<div class="progress-bar" role="progressbar" style="width: 0%">' +
					'</div>' +
					'</div>').appendTo($li).find('.progress-bar');
			}

			$li.find('p.state').text(msg['uploading'] + parseInt(percentage * 100) + '%');
			$percent.css('width', percentage * 100 + '%');


		});

		//上传成功后写入页面和解析apk包
		var uploadEnd=function(data,file){
			if(data.data.file_md5 != file.md5) {
				$('#' + file.id).find('p.state').text(msg['md5_not_match']);
			} else if(data.data.file_size != file.size) {
				$('#' + file.id).find('p.state').text(msg['size_not_match']);
			} else {
				$('#' + file.id).find('p.state').text(msg['success']);

				// //解析 apk包 返回值
				if( data['data']['py_result'] ){
					
					var	app_icon_img = data['data']['py_result']['icon_url'];//"http://download.ota.mwhtml5.com/Uploads/106/apk/a5344ff48c1ed6a525dd0cb1e611696e.apk-unpack/res/drawable-mdpi/ic_launcher.png";
					var app_icon     = data['data']['py_result']['icon_path'];//图标地址
					var app_name     = data['data']['py_result']['appNameArray'][0];//应用名称
					var app_pkg      = data['data']['py_result']['pkg'];//应用包名
					var app_version_name = data['data']['py_result']['versionName'];//应用版本
					var app_version_code = data['data']['py_result']['versionCode'];//应用版本
					// console.log(data['data']['py_result']);

					var timestamp=new Date().getTime();



					$("#app_icon_img").attr('src',app_icon_img+'?time='+timestamp); 
					$("#app_icon").val(app_icon);
					$("#app_name").val(app_name).removeClass('error');
					$("#app_pkg").val(app_pkg).css('color','');
					$("#app_version").val(app_version_name).removeClass('error');
					$("#file_sha256").val(data.data.file_sha256);

					$("#check_app_name").html(" ");
					$("#check_app_version").html(" ");

					// alert(app_version_code);
					$("#app_version_code").val(app_version_code);

					if ($('#app_icon_img').attr('src')) {

                        $('#app_icon_img').show();
			        }else{
			            $('#app_icon_img').hide()
			        }

				}else{

					// $("#tubiao").html( Message.upload_file_failed).css('color','red');
					$("#app_pkg").val(Message.upload_file_failed).css('color','red');
					$("#app_name").val("");
					$("#app_version").val("");
					$("#check_app_name").html(" ");
					$("#check_app_version").html(" ");
					$("#file_sha256").val(data['data']['file_sha256']);
					console.log(data['data']['file_sha256']);

				}
				console.log(def.pick)
				if (def.pick == '#start') {
					$("#start_url").val(data.data.file_url);
					$("#start_md5").val(data.data.file_md5);
					$("#start_size").val(data.data.file_size);
					$("#file_sha256").val(data.data.file_sha256);
				}else if(def.pick == '#end'){
					$("#end_url").val(data.data.file_url);
					$("#end_md5").val(data.data.file_md5);
					$("#end_size").val(data.data.file_size);
					$("#file_sha256").val(data.data.file_sha256);
				}else{
					$("#file_url").val(data.data.file_url);
					$("#file_md5").val(data.data.file_md5);
					$("#file_sha256").val(data.data.file_sha256);
					$("#file_size").val(data.data.file_size);
				}
				

			}
		}

		uploader.on('uploadSuccess', function(file, response) {

			if(response.code == 200) {
				if (def.mergeserver) {
					var retry = 0;
					var poll = 2000; //轮询时间2秒
					var predictTime = 100; //最大轮询次数，
					predictTime = Math.ceil(file.size / 5242880) / poll *1000;//预计最慢每秒合成10M，计算预计合成时间和请求次数
					//最低轮询3次
					if (predictTime <3) {
						predictTime = 5;
					}
					var ajax=function(){
	              		$.ajax({
						url:def.mergeserver,
						type: 'post',
			    		data: {path:def.formData.path,file_name:def.formData.file_name,name:file.name,upload_type:def.formData.upload_type},
			    		async:false,
			    		success:function(data){
			    			var data=eval('('+data+')')
			    			var timeId;
			    			if (data.code==200) {
			    				clearTimeout(timeId);
			    				uploadEnd(data,file);
			    			}else{
			    				if ( retry < predictTime) {
			    					timeId= setTimeout(ajax,poll);
			    					retry += 1;
			    				}else{
			    					clearTimeout(timeId);
			    					$('#' + file.id).find('p.state').text("File upload failed or file is not legal");
			    				}
			    				
			    			}
			    		}
					})
	            }
					
					ajax();
				}else{
					uploadEnd(response,file);
				}
              	
			} else {

				$('#' + file.id).find('p.state').text(response.info);

			}

		});

		uploader.on('uploadError', function(file) {
			
			$('#' + file.id).find('p.state').text(msg['error']);
		});

		uploader.on('uploadComplete', function(file) {
			$('#' + file.id).find('.progress').fadeOut();
			$("#cancle_upload").addClass('hidden');
		});

		$btn = $("#cancle_upload");
		//state = "pending";
		//uploader.on( 'all', function( type ) {
		//    if ( type === 'startUpload' ) {
		//        state = 'uploading';
		//    } else if ( type === 'stopUpload' ) {
		//        state = 'paused';
		//    } else if ( type === 'uploadFinished' ) {
		//        state = 'done';
		//    }
		//
		//    if ( state === 'uploading' ) {
		//        $btn.text('暂停上传');
		//    } else {
		//        $btn.text('开始上传');
		//    }
		//});

		$btn.click(function() {
			//if ( state === 'uploading' ) {
			//    uploader.stop(true);
			//} else {
			//    uploader.upload(uploader.getFiles());
			//}
			if(uploader.isInProgress()) {
				uploader.stop(true);
			}
			uploader.reset();
			$list.html("");
			$("#cancle_upload").addClass('hidden');

			return false;
		});

	}

}();