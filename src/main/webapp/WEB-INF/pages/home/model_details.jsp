<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<html>
<head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
    <title>OTA管理系统</title>

    <!-- Bootstrap core CSS -->
    <!-- <link href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet"> -->
    <link href="${basePath}css/bootstrap.min.css" rel="stylesheet"/>
    <link rel="shortcut icon" href="${basePath}images/shield.png"/>
    <!-- 基础样式 -->

    <!-- <link href="#Public/Home/css/bootstrap.min.css" media="all" rel="stylesheet" type="text/css"/> -->
    <!-- 控制字体 -->
    <!-- <link href="/Public/Home/css/fonts-useso-com.css" media="all" rel="stylesheet" type="text/css"/> -->
    <link href="${basePath}css/font-awesome.css" media="all" rel="stylesheet" type="text/css"/>
    <link href="${basePath}css/se7en-font.css" media="all" rel="stylesheet" type="text/css"/>
    <!-- 自定义样式 -->
    <link href="${basePath}css/style.css" media="all" rel="stylesheet" type="text/css"/>
    <link href="${basePath}css/common.css" media="all" rel="stylesheet" type="text/css"/>

    <!-- 基础类库 -->
    <script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js" type="text/javascript"></script>
    <script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js" type="text/javascript"></script>
    <script src="http://cdn.datatables.net/1.10.15/js/jquery.dataTables.min.js" type="text/javascript"></script>

    <!-- 日期选择 -->
    <link href="https://cdn.bootcss.com/datepicker/0.6.5/datepicker.css" media="all" rel="stylesheet" type="text/css"/>

    <link href="${basePath}css/daterangepicker.css" media="all" rel="stylesheet" type="text/css"/>
    <script src="${basePath}js/daterangepicker.js" type="text/javascript"></script>
    <script src="${basePath}js/date.js" type="text/javascript"></script>

    <!-- 上传 -->
    <script src="${basePath}js/bootstrap-fileupload.js" type="text/javascript"></script>
    <!-- 表单验证 -->
    <script src="${basePath}js/reg/messages_zh-cn.js" type="text/javascript"></script>

    <!-- 时间选取 -->
    <script src="${basePath}js/bootstrap-datepicker.js" type="text/javascript"></script>
    <link rel="stylesheet" type="text/css" media="all" href="${basePath}css/daterangepicker-bs3.css"/>
    <script src="${basePath}js/moment.js" type="text/javascript"></script>
    <script src="${basePath}js/daterangepicker.js" type="text/javascript"></script>
    <!-- 扩展方法 -->

    <script src="${basePath}js/base.js" type="text/javascript"></script>

    <script src="${basePath}js/common.js" type="text/javascript"></script>
    <script src="${basePath}js/global.js" type="text/javascript"></script>

    <!--提示框-->
    <script src="${basePath}js/jquery.poshytip.js" type="text/javascript"></script>
    <!--搜索下拉框 -->
    <script src="${basePath}js/select2.js" type="text/javascript"></script>
</head>
<body>
<div class="modal-shiftfix">
    <!-- Navigation -->
    <div class="navbar navbar-fixed-top scroll-hide">
        <div class="container-fluid top-bar">
            <div class="pull-right">
                <ul class="nav navbar-nav pull-right">
                    <li class="dropdown user hidden-xs">
                        <a class="dropdown-toggle message" id="mymessage"
                           href="#">
                            <span aria-hidden="true" class="se7en-envelope"></span>
                            <div class="sr-only">消息</div>
                        </a>
                    </li>
                    <li class="dropdown user hidden-xs">
                        <a class="dropdown-toggle" href="#">
                            <span aria-hidden="true" class="icon-user"></span>
                            <%=request.getSession().getAttribute("username") %>
                        </a>
                    </li>
                    <li class="dropdown user hidden-xs">
                        <a class="dropdown-toggle" href="${basePath}device/product">
                            <span aria-hidden="true" class="se7en-feed"></span>
                            统计总览 </a>
                    </li>

                    <li class="dropdown user hidden-xs">
                        <a data-toggle="dropdown"
                           class="dropdown-toggle" href="#">
                            <span aria-hidden="true" class="se7en-gear"></span>
                            管理 </a>
                    </li>
                    <li class="dropdown user hidden-xs">
                        <a class="dropdown-toggle" href="${basePath}user/loginOut">
                            <span aria-hidden="true" class="icon-signin"></span>
                            退出 </a>
                    </li>
                </ul>
            </div>
            <button class="navbar-toggle">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>

            <a class="logo" href="${basePath}device/product"><img style="height: 30px;"
                                                                  src="${basePath}images/anquan.png"></a>

        </div>
        <div class="container-fluid main-nav clearfix">
            <div class="nav-collapse">
                <ul class="nav">
                    <%--<li class="dropdown">--%>
                    <%--<a data-toggle=""--%>
                    <%--class=""--%>
                    <%--href="${basePath}device/version">--%>
                    <%--<span aria-hidden="true" class="se7en-tables"></span>--%>
                    <%--固件管理 </a>--%>
                    <%--</li>--%>
                    <li class="dropdown">
                        <a data-toggle="dropdown"
                           class=""
                           href="#">
                            <span aria-hidden="true" class="icon-pencil"></span>
                            设备管理 <b class="caret"></b> </a>
                        <ul class="dropdown-menu">
                            <li>
                                <a href="${basePath}device/device_list?pageNo=1">
                                    <i class="icon-anchor "></i>
                                    设备列表</a>
                            </li>
                            <li>
                                <a href="${basePath}device/device_bind_list?pageNo=1">
                                    <i class="icon-circle-blank"></i>
                                    绑定列表</a>
                            </li>
                            <li>
                                <a href="${basePath}device/device_records?pageNo=1">
                                    <i class="icon-star"></i>
                                    近期登录</a>
                            </li>
                        </ul>
                    </li>
                    <%--<li class="dropdown">--%>
                    <%--<a data-toggle="dropdown"--%>
                    <%--class=""--%>
                    <%--href="#">--%>
                    <%--<span aria-hidden="true" class="se7en-forms"></span>--%>
                    <%--集成测试 <b class="caret"></b> </a>--%>
                    <%--</li>--%>
                    <li class="dropdown">
                        <a data-toggle="dropdown"
                           class="current"
                           href="#">
                            <span aria-hidden="true" class="se7en-charts"></span>
                            数据统计 <b class="caret"></b> </a>
                        <ul class="dropdown-menu">
                            <li>
                                <a href="${basePath}device/version_statistics">
                                    <i class="icon-filter "></i>
                                    版本统计</a>
                            </li>

                            <li>
                                <a href="${basePath}device/version_area">
                                    <i class="icon-globe "></i>
                                    地区统计</a>
                            </li>

                            <li>
                                <a href="${basePath}model/model_statistics">
                                    <i class="icon-circle-arrow-left "></i>
                                    机型统计</a>
                            </li>


                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <!-- End Navigation -->
    <div class="container-fluid main-content">
        <script src="${basePath}js/highcharts.js"></script>
        <style type="text/css" class="style">
            body {
                padding-top: 121px;
            }

            .widget-container1 {
                background: white;
                box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }

            .breadcrumb {
                background: #fff;
            }

            .btn_blue {
                background: #409EFF;
                color: #fff;
                width: 105px;
            }

            .mag {
                margin-top: 20px;
            }
        </style>
        <div class="col-lg-12">

            <div class="row" style="margin:0 0 15px 0;">
                <div class="widget-container1 parent">
                    <div class="grid-structure col-919191" style="margin-top: 30px;">
                        <ul class="heading breadcrumb">
                            <li>

                                <i class="icon-home"></i>
                                <a href="#">渠道管理</a>
                            </li>
                            <li class="active">

                                <a href="${basePath}device/version_statistics">数据统计</a>
                            </li>
                            <li class="active">

                                <a href="${basePath}model/model_statistics">机型统计</a>
                            </li>
                            <li class="active">

                                机型详情
                            </li>

                        </ul>
                        <img src="${basePath}images/hover-img.png" class="hover squer squer1"
                             style="position: relative;top:-52px;left:350px"/>
                    </div>
                    <div class="col-md-2">
                        <select class="form-control CascadeVersion model ChangeChart ChangeChart1 ChangeChart2"
                                name="model" id="product"
                                data-url="#">
                            <c:forEach varStatus="status" items="${listBrand}" var="itemsBrand">
                                <optgroup label="${itemsBrand.clientId}">
                                    <c:forEach varStatus="status" items="${listModel}" var="items">
                                        <c:if test="${itemsBrand.clientId == items.clientId}">
                                            <c:if test="${model == items.projectId}">
                                                <option value="${model}"
                                                        data-brand="${items.clientId}" selected>${model}</option>
                                            </c:if>
                                            <c:if test="${items.projectId != model}">
                                                <option value="${items.projectId}"
                                                        data-brand="${items.clientId}">${items.projectId}</option>
                                            </c:if>
                                        </c:if>
                                    </c:forEach>
                                </optgroup>
                            </c:forEach>
                        </select>
                    </div>
                    <div class="col-md_10">
                        <div class="fr mr30">
                            <select class="form-control CascadeVersion ChangeChart btn_blue select_one select_type"
                                    name="statistics_type1"
                                    data-url="#">
                                <option value="1">日活量</option>
                                <option value="2">新增量</option>
                                <option value="3">累计量</option>
                            </select>
                        </div>
                        <div class="fr mr30">
                            <select class="form-control CascadeVersion ChangeChart btn_blue select_one select_group"
                                    name="time_group1"
                                    data-url="">
                                <option value="1">日</option>

                            </select>
                        </div>
                        <div class="fr mr30">
                            <select class="form-control model CascadeVersion ChangeChart btn_blue select_one"
                                    name="time_horizon1"
                                    data-url="#">
                                <option value="1">近7天</option>
                                <option value="2">近30天</option>
                                <option value="3">近1年</option>
                            </select>
                        </div>

                    </div>
                    <div id="container" class="mag" style="width:98%;"></div>
                </div>
            </div>

            <div class="row" style="margin:0 0 15px 0;clear:both;">
                <div class="widget-container1 DevInfo padded">
                    <div class="grid-structure col-919191">
                        <ul class="heading breadcrumb">
                            <li>
                                <i class="icon-home"></i>
                                机型日趋势明细
                            </li>
                            <img src="${basePath}images/hover-img.png" class="hover1 squer"/>
                        </ul>
                    </div>
                    <table class="table table-bordered">
                        <thead>
                        <tr>
                            <th>日期</th>
                            <th>品牌</th>
                            <th>机型</th>
                            <th>日活量</th>
                            <th>新增量</th>
                            <th>累计量</th>
                        </tr>
                        </thead>
                        <tbody class="tbody">

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <script type="text/javascript">
            $(function () {

                var aa = "zh-cn";

                if (aa == 'en-us') {

                    $('.squer1').css('left', '620px');
                    $('.btn_blue').css('width', 'auto');

                } else {
                    $('.squer1').css('left', '350px');

                }
                //鼠标画上去select失去焦点防止option遮挡弹框
                $(".squer").hover(function () {
                    $("select").blur();
                });
                var Y = "日活量";//y轴标题
                var X = []//x轴时间
                // var name = "激活数"; //
                var value = [];//值
                var charts = function (X, value, Y) {

                    var highchart = new Highcharts.Chart({
                        chart: {
                            renderTo: 'container',
                            type: 'line'
                        },
                        title: {
                            text: Y
                        },
                        xAxis: {
                            categories: X
                        },
                        yAxis: {
                            min: 0,
                            allowDecimals: false,
                            title: {
                                text: Y
                            }
                        },
                        tooltip: {
                            enabled: true,
                            formatter: function () {
                                return '<b>' + this.series.name + '</b><br/>' + this.x + ': ' + this.y;
                            }
                        },
                        plotOptions: {
                            line: {
                                dataLabels: {
                                    enabled: true
                                },
                                enableMouseTracking: true
                            }
                        },
                        credits: {
                            enabled: false
                        },
                        series: [{
                            name: Y,
                            data: value
                        }]
                    });

                    highchart.showLoading('<img src="${basePath}images/loading2.gif"/>');

                    if (X != undefined) {

                        highchart.hideLoading('<img src="${basePath}images/loading2.gif"/>');
                    }
                    ;
                }

                var model_all = function () {
                    var url = "${basePath}model/model_details_ajax";
                    var model = $('select[name="model"]').val();
                    var brand = $('select[name="model"]').find('option:selected').data('brand');
                    var title = '';
                    var select = $('.parent').find('select');
                    for (var i = select.length - 1; i >= 0; i--) {
                        var time_horizon = $(select[3]).val();
                        var time_group = $(select[2]).val();
                        var statistics_type = $(select[1]).val();
                    }
                    ;
                    if (statistics_type == 1) {
                        title = "日活量";
                    } else if (statistics_type == 2) {
                        title = "日新增";
                    } else {
                        title = "累计量";
                    }
                    var html = '';
                    html += "<tr><td colspan='9' align='center'>加载中···</td></tr>"
                    $('.tbody').html(html);
                    $('.paging_full_numbers').remove();
                    $.getJSON(url, {
                        ajax: 1,
                        model: model,
                        brand: brand,
                        time_horizon1: time_horizon,
                        time_group1: time_group,
                        statistics_type1: statistics_type
                    }, function (data) {

                        var a = data.data.x;
                        var b = data.data.y;
                        var table = data.data.table;
                        html = '';
                        var product_id = 764;
                        var channel_id = 664;

                        if (table != null) {
                            for (var i = 0; i < table.length; i++) {
                                var url = "#";
                                var url1 = "#";
                                var url2 = "#";
                                var url = "${basePath}device/version_statistics?brand=" + table[i].brand + "&model=" + table[i].model + ""
                                // var url1 = "http://fota.redstone.net.cn/Home/VersionStatistics/version_area?product_id=" + product_id + "&channel_id=" + channel_id + "&brand=" + table[i].brand + "&model=" + table[i].model + "&date=" + table[i].target_date + "&statistics_type1=1"
                                // var url2 = "http://fota.redstone.net.cn/Home/VersionStatistics/version_area?product_id=" + product_id + "&channel_id=" + channel_id + "&brand=" + table[i].brand + "&model=" + table[i].model + "&date=" + table[i].target_date + "&statistics_type1=2"
                                html += '<tr><td>' + table[i].target_date + '</td><td>' + table[i].brand + '</td><td><a href="' + url + '">' + table[i].model + '</a></td><td><a href="' + url1 + '">' + table[i].active + '</a></td><td><a href="' + url2 + '">' + table[i].new + '</a></td><td>' + table[i].total + '</td></tr>'
                            }
                            ;

                            $('.tbody').html(html);
                        } else {
                            $('.tbody').html('');
                        }

                        $('.paging_full_numbers').remove();
                        $('.DevInfo').append(data.page_result)
                        charts(a, b, title);


                    })

                }

                var model_ajax = function () {
                    var url = "${basePath}model/model_details_ajax";
                    var model = $('select[name="model"]').val();
                    var brand = $('select[name="model"]').find('option:selected').data('brand');
                    var title = '';
                    var select = $('.parent').find('select');
                    for (var i = select.length - 1; i >= 0; i--) {
                        var time_horizon = $(select[3]).val();
                        var time_group = $(select[2]).val();
                        var statistics_type = $(select[1]).val();
                    }
                    ;
                    if (statistics_type == 1) {
                        title = "日活量";
                    } else if (statistics_type == 2) {
                        title = "日新增";
                    } else {
                        title = "累计量";
                    }

                    $.getJSON(url, {
                        ajax: 1,
                        model: model,
                        brand: brand,
                        time_horizon1: time_horizon,
                        time_group1: time_group,
                        statistics_type1: statistics_type
                    }, function (data) {

                        var a = data.data.x;
                        var b = data.data.y;
                        console.log("a>>>>>>>>>>>" + a)
                        console.log("b>>>>>>>>>>>" + b)
                        charts(a, b, title);

                    })

                }
                $('body').on('change', '.ChangeChart', function () {
                    charts();
                    if ($(this).hasClass('model')) {
                        model_all();
                    } else {
                        model_ajax();
                    }

                })
                charts();
                model_all();
                //ajax分页
                $('body').on('click', '.PageChange', function () {

                    var url = $(this).data('url');

                    var title = '';
                    var statistics_type = $('select[name="statistics_type1"]').val();
                    if (statistics_type == 1) {
                        title = "日活量";
                    } else if (statistics_type == 2) {
                        title = "日新增";
                    } else {
                        title = "累计量";
                    }
                    var html = '';
                    html += "<tr><td colspan='9' align='center'>加载中···</td></tr>"
                    $('.tbody').html(html);
                    $.getJSON(url, {}, function (data) {
                        var table = data.data.table;
                        html = '';
                        var product_id = 764;
                        var channel_id = 664;
                        if (table != null) {
                            for (var i = 0; i < table.length; i++) {
                                var url = "#";
                                var url1 = "#";
                                var url2 = "#";
                                // var url = "http://fota.redstone.net.cn/Home/VersionStatistics/version_area?product_id=" + product_id + "&channel_id=" + channel_id + "&brand=" + table[i].brand + "&model_id=" + table[i].model + ""
                                // var url1 = "http://fota.redstone.net.cn/Home/VersionStatistics/version_area?product_id=" + product_id + "&channel_id=" + channel_id + "&brand=" + table[i].brand + "&model_id=" + table[i].model + "&date=" + table[i].target_date + "&statistics_type1=1"
                                // var url2 = "http://fota.redstone.net.cn/Home/VersionStatistics/version_area?product_id=" + product_id + "&channel_id=" + channel_id + "&brand=" + table[i].brand + "&model_id=" + table[i].model + "&date=" + table[i].target_date + "&statistics_type1=2"
                                html += '<tr><td>' + table[i].target_date + '</td><td>' + table[i].brand + '</td><td><a href="' + url + '">' + table[i].model + '</a></td><td><a href="' + url1 + '">' + table[i].active + '</a></td><td><a href="' + url2 + '">' + table[i].new + '</a></td><td>' + table[i].total + '</td></tr>'
                            }
                            ;

                            $('.tbody').html(html);
                        } else {
                            $('.tbody').html('');
                        }

                        $('.paging_full_numbers').remove();
                        $('.DevInfo').append(data.page_result)

                    });
                })
            })

        </script>

        <script>
            $(function () {
                var new_title = "</span><div class='font_lit'><span class='green_hover'>机型详情：</span>" + Message.model_details + "</div><div class='font_lit'><span class='green_hover'>日活量：</span>" + Message.hover3 + "</div><div class='font_lit'><span class='green_hover'>" + Message.hover7 + "：</span>" + Message.hover1 + "</div><div class='font_lit'><span class='green_hover'>" + Message.hover6 + "：</span>" + Message.hover4 + "</div><div class='font_lit'><span class='green_hover'>" + Message.time_f + "：</span>" + Message.time_f_data + "</div><div class='font_lit'><span class='green_hover'>" + Message.time_type + "：</span>" + Message.time_type_data + "</div><div class='font_lit'><span class='green_hover'>说明：</span>" + Message.model_des_data + "</div>";

                var new_title1 = "</span><div class='font_lit'><span class='green_hover'>" + Message.day_model_destail + "：</span>" + Message.day_model_destail_data + "</div><div class='font_lit'><span class='green_hover'>机型：</span>" + Message.model_data + "</div><div class='font_lit'><span class='green_hover'>日活量：</span>" + Message.y_new + "</div><div class='font_lit'><span class='green_hover'>" + Message.hover6 + "：</span>" + Message.y_new + "</div><div class='font_lit'><span class='green_hover'>" + Message.hover7 + "：</span>" + Message.hover1 + "</div>";

                Poshytip.init("hover", new_title);
                Poshytip.init("hover1", new_title1);

                $('.select_type').change(function () {
                    var html = '',
                        week = '',
                        month = '',
                        _val = $(this).parent().siblings().children('.select_group').val();

                    if (_val == 2) {
                        week = 'selected';

                    } else if (_val == 3) {
                        month = 'selected';
                    }
                    if ($(this).val() != 1) {
                        html += '<option value="1">日</option>';
                        html += '<option ' + week + '  value="2">周</option>';
                        html += '<option ' + month + '  value="3">月</option>'
                        $(this).parent().siblings().children('.select_group').html(html);

                    } else {
                        html += '<option value="1">日</option>';
                        $(this).parent().siblings().children('.select_group').children('option').remove();
                        $(this).parent().siblings().children('.select_group').html(html);
                    }
                })

            });
        </script>
    </div>
</div>
</body>
</html>
