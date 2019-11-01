var Message = (function(){

	return {
        not_blank: "输入格式错误，开头结尾不能是空格",
        
		user_required: "请输入用户名",

		min_6_username: "请输入6个字符以上的用户名",

		max_20_username: "请输入20个字符以下的用户名",

		username_remote: "用户名已存在",

		tel_required: "请输入手机号",

		tel_remote: '此手机号已被注册',

		pw_required: "请输入密码",

		pw_max_20: "密码长度不能大于20个字符",

		two_confrim:"该用户已关联产品,您是否确认删除?",

		pw_min_6: "密码长度不能小于6个字符",

		pw_re_equal: "两次密码输入不一致",

		email_required: "请输入邮箱",

		email_email: "请输入正确的邮箱格式",
		
		email_max50:"邮箱最多50位",

		email_remote: "此邮箱已被注册",
		
		company_name:"请输入公司名称",

		name_required: "请输入联系人",

		name_2_min: "联系人必需由两个以上字节组成",

		qq_number: "QQ号码格式不正确",

		qq_min_5: "QQ号码至少5位",
		
		qq_min_12: "QQ号码最多12位",

		product_name_required: "请输入产品名称",

		product_name_min_2: "产品名长度须为2-50位之间",

		product_name_max_50: "产品名长度须为2-50位之间",

		product_name_remote: "主账户或子账户已有该产品",

		os_type_required: "请选择所属平台",

		hard_type_required: "请选择硬件类型",

		chip_type_required: "请选择芯片类型",

		chip_model_required: "请选择芯片型号",

		brand_required: "请输入品牌名称",

		brand_remote: "品牌名已存在",

		tags_required: "请输入分组名",

		tags_remote: "分组名已存在",

		model_required: "请输入机型",

		model_remote: "机型已存在",

		operator_required: "请输入运营商",

		brand_id_required: "所有品牌",

		imei_required: "请输入设备唯一标识号码",

		model_id_required: "所有机型",

		product_id_required: "请选择产品",

		version_name_required: "请输入版本号",
		version_name_exit: "版本号已存在",
		imei_name_exit: "设备号已存在",
		
		cycle_required: "请输入检测周期",
		model_m:'以折线图的形式展示所有品牌下机型的日趋情况',
		time_f:'时间范围',
		time_type:'区间类型',
		time_f_data:'过去7天，过去30天，过去一年',
		time_type_data:'日、周、月(日活只能显示日)',
		model_des_data:'统计图形中以品牌名称(机型名称)的方式区分不同品牌下的各个机型',
		model_data:'点击机型名称查看该机型的版本分布日趋图',
		y_new:'点击数量,查看对应地区分布图',
		new_active:'昨日新增占昨日活跃的比例',
		model_details:'以折线图的形式展现某个机型的日趋图',
		version_details:'以折线图的形式展现某个版本的日趋图',
		hover1:"启动过应用的所有设备总量",
        hover2:"以折线图的形式展示所有产品下渠道的日趋情况",
        hover3:"一天内启动过应用的设备(去重)，启动过至少一次的设备即视为活跃设备，包括新设备与老设备",
        hover4:"第一次启动应用的设备",
        hover5:"统计概括",
        hover6:"新增量",
        hover7:"累计量",
        hover9:"截止到今日0点，启动过应用的所有设备总量，该量不受日期影响",
        day_model_destail:'机型日趋明细',
        day_model_destail_data:'以列表的形式展现机型日趋明细',
        day_version_destail:'版本日趋明细',
        day_version_destail_data:'以列表的形式展现版本日趋明细',
        version_m_data:'以折线图的形式展现所有机型下版本的日趋情况',
        version_des_data:'统计图形中以机型名称(版本名称)的方式区分不同机型下的各个版本',
        version_m_data:'以列表的形式展现各品牌机型下的版本概括情况',
        version_data:'点击版本，查看该版本的日趋明细',
        total_p:'(占该机型全部累计量比例)，如果该版本的升级到其他版本，则累计量会减少',
        device_count_data:'品牌机型下的设备总量',
        upgrade_num_data:'该品牌机型下每个升级包的升级成功总数之和',
        amount_touch_data:'该品牌机型下每个升级包,触达量总数之和',
        load_total_data:'该品牌机型下每个升级包的下载累计量总数之和',
        no_installed_data:'下载累计量-升级成功总数 = 下载未安装',
        upgrade_defeat_data:'该品牌机型下每个升级包的升级失败总数之和',
        start_version_total_data:'当前版本注册量 + 其它版本升级到当前版本累计量',
        target_edition_num_data:'目标版本注册量 + 其它版本升级到目标版本累计量',
        amount_touch_data1:'拉取到升级包的设备总量',
        load_total_data1:'下载了升级包的设备总量',
        no_installed_data1:'下载累计量 - 升级成功总量 = 下载未安装量',
        upgrade_num_data1:'升级成功的设备总量',
        success_rate_data:'升级成功总数/触达量 = 升级成功率',
        upgrade_defeat_data1:'升级失败的设备总量',



        /*2016年6月18日01:12:17 新添加的语言*/

        modal_title : "提示",

        waring : "警告",

        confirm_add : "确认添加 ?",

        confirm_delete : "删除后将无法恢复！请再一次确认！",

        ok :"确定",

        little_one:'语言标签不能少于一种',

        cancle:"取消",

        already_exists :"已存在",

        confirm_delete_two:"删除后，配置该RS_KEY的客户端将无法连接OTA服务器，请再一次确认！",

        fail:"失败",

        sign : "登录",

        submit : "提交",

        submitting : "正在提交...",
        
        handling:"正在处理...",

        logining : "正在登录...",

        wait: '等待上传',

        uploading: "正在上传...",

        success: "上传成功",

        error: "上传失败",

        name: "文件名",

        size: "大小",

        state: "状态",

        file_info: "正在获取文件信息...",

        md5_not_match:'上传文件MD5不匹配，建议重新上传或更换浏览器',

        size_not_match:'上传文件大小不匹配，建议重新上传或更换浏览器',
        
        /*2016年6月23日 新添加的语言*/
        
        input_format:'请输入正确的格式',
        
        input_format_imei:"请输入正确的设备格式",
        
        describe_required:"请输入渠道名称",
        
        describe_remote:"渠道名已经存在",
        language:"cn",
        

        /*2016年7月15日 新添加的语言xuzhongqiu*/

        export_excel: '是否确认导出?',
		
		/*2016年7月28日 新添语言 */

		version_start_not_exit:'开始版本不存在',

		this_type_not_exit:'此类型值不存在',

		/*2016年7月29日新添语言*/

		file_name_rule:'文件名须数字、下划线、字母组成，且后缀为英文',

		file_name_rules:'文件名不能有空格，且后缀必须为apk',
		/*2016.9.1 新添语言*/
		file_name_error:'文件名格式错误，请重新上传文件',

		app_version_exit:"应用版本已存在",

		app_name:'请选择上传文件',

		app_pkgname:'请输入包名',

		app_version:'请输入应用版本',

        upload_file_failed:'上传文件解析失败',

        select_condition:"请选择类型条件",
        role_id_required:'请选择角色',
        select_del_file:'请选择要删除的设备',
        channel_name_min_2: "渠道名长度须为2-50位之间",
		channel_name_max_50: "渠道名长度须为2-50位之间",
		code_required:'请输入验证码',

		no_notification:'您目前没有系统通知',
		max_200_ext:'字数不能超过200',

		role_id_input_required:'请输入角色',
        role_id_input_exit:'角色已存在',
        has_uploaded:'已上传'


	}

})();