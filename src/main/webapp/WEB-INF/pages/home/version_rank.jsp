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
                        <a data-toggle="dropdown" class=""
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
                                <a href="${basePath}device/device_records">
                                    <i class="icon-star"></i>
                                    近期登录</a>
                            </li>
                        </ul>
                    </li>
                    <%--<li class="dropdown">--%>
                    <%--<a data-toggle="dropdown" class=""--%>
                    <%--href="#">--%>
                    <%--<span aria-hidden="true" class="se7en-forms"></span>--%>
                    <%--集成测试  </a>--%>
                    <%--</li>--%>
                    <li class="dropdown">
                        <a data-toggle="dropdown"
                           class="current"
                           href="#">
                            <span aria-hidden="true" class="se7en-charts"></span>
                            数据统计 <b class="caret"></b> </a>
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
                </ul>
            </div>
        </div>
    </div>
    <!-- End Navigation -->
    <div class="container-fluid main-content">

        <script src="${basePath}js/highcharts.js"></script>
        <style type="text/css" class="style">

            body {
                padding-top: 71px;
            }

            .main-content {
                margin-top: 60px;
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
                <div class="widget-container1">
                    <div class="grid-structure col-919191" style="margin-top: 30px;">
                        <ul class="heading breadcrumb">
                            <li>
                                <i class="icon-home"></i>
                                <a href="#">渠道管理</a>
                            </li>
                            <li class="active">
                                <a href="#">数据统计</a>
                            </li>
                            <li class="active">
                                <a href="${basePath}device/version_statistics">版本统计</a>
                            </li>
                            <li class="active">
                                累积量占比
                            </li>
                        </ul>
                        <img src="${basePath}images/hover-img.png" class="hover squer squer1"
                             style="position: relative;top:-52px;left:360px"/>
                    </div>
                    <div class="col-md-2">
                        <select class="form-control CascadeVersion ChangeChart ChangeChart1 model ChangeChart2"
                                name="model" id="model"
                                data-url="#">

                            <c:forEach varStatus="status" items="${listBrand}" var="itemsBrand">
                                <optgroup label="${itemsBrand.clientId}">
                                    <c:forEach varStatus="status" items="${listModel}" var="items">
                                        <c:if test="${itemsBrand.clientId == items.clientId}">
                                            <c:if test="${model == items.projectId and brand == itemsBrand.clientId}">
                                                <option value="${items.projectId}" selected
                                                        data-brand="${items.clientId}">${items.projectId}</option>
                                            </c:if>
                                            <c:if test="${model != items.projectId or brand != itemsBrand.clientId}">
                                                <option value="${items.projectId}"
                                                        data-brand="${items.clientId}">${items.projectId}</option>
                                            </c:if>
                                        </c:if>
                                    </c:forEach>
                                </optgroup>
                            </c:forEach>
                        </select>
                    </div>

                    <div id="container" class="mag" style="width:98%;"></div>

                    <div id="container2" class="mag" style="width:98%;"></div>

                </div>
            </div>

            <div class="row" style="margin:0 0 15px 0;clear:both;">
                <div class="widget-container1 DevInfo padded">
                    <div class="grid-structure col-919191">
                        <ul class="heading breadcrumb">
                            <li>
                                <i class="icon-home"></i>
                                占比详情
                            </li>
                            <img src="${basePath}images/hover-img.png" class="hover1 squer"/>
                        </ul>
                    </div>
                    <table class="table table-bordered">
                        <thead>
                        <tr>
                            <th>品牌</th>
                            <th>机型</th>
                            <th>版本</th>
                            <th>累计量%</th>
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

                    $('.squer1').css('left', '670px');

                } else {
                    $('.squer1').css('left', '360px');

                }
                //鼠标画上去select失去焦点防止option遮挡弹框
                $(".squer").hover(function () {
                    $("select").blur();
                });

                var charts = function (chart_x, chart_y) {
                    var highchart = new Highcharts.Chart({
                        chart: {
                            renderTo: 'container',
                            type: 'column',
                            marginBottom: 150,
                            margin: [50, 50, 100, 80]
                        },
                        credits: {
                            enabled: false//清楚右下角链接
                        },
                        title: {
                            text: "Top 30 版本累计量"
                        },
                        xAxis: {
                            categories: chart_x,
                            labels: {
                                align: 'center',
                                style: {
                                    fontSize: '13px',
                                    fontFamily: 'Verdana, sans-serif'
                                }
                            }
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: "累计量"
                            },
                        },
                        legend: {
                            enabled: false
                        },
                        tooltip: {
                            pointFormat: "累计量" + ': <b>{point.y} </b>',
                        },
                        series: [{
                            name: 'Population',
                            data: chart_y

                        }]
                    });
                    highchart.showLoading('<img src="${basePath}images/loading2.gif"/>');

                    if (chart_y != undefined) {

                        highchart.hideLoading('<img src="${basePath}images/loading2.gif"/>');
                    }
                    ;
                }

                var charts2 = function (X) {
                    var highchart = new Highcharts.Chart({
                        chart: {
                            renderTo: 'container2',
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false
                        },
                        title: {
                            text: "TOP 30 版本累计量百分比"
                        },
                        credits: {
                            text: ''   //去除水印地址
                        },

                        plotOptions: {
                            pie: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                dataLabels: {
                                    enabled: true,
                                    color: '#000000',
                                    connectorColor: '#000000',
                                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                },
                                showInLegend: true
                            }
                        },
                        series: [{
                            type: 'pie',
                            name: "累计量",
                            data: X
                        }]
                    });
                    highchart.showLoading('<img src="${basePath}images/loading2.gif"/>');

                    if (X != undefined) {

                        highchart.hideLoading('<img src="${basePath}images/loading2.gif"/>');
                    }
                    ;
                }

                var ajax_total = function () {
                    var url = "${basePath}device/version_rank_ajax";
                    <%--var url = "${basePath}json/version_rank.json";--%>
                    var model = $('select[name="model"]').val();
                    var brand = $('select[name="model"]').find('option:selected').data('brand');
                    var html = '';
                    html += "<tr><td colspan='9' align='center'>加载中···</td></tr>"
                    $('.tbody').html(html);
                    $('.paging_full_numbers').remove();
                    $.getJSON(url, {ajax: 1, model: model, brand: brand}, function (data) {
                        console.log("原始数据>>>>>>" + data.data.chart)
                        var a = eval(data.data.x);
                        var b = eval(data.data.y);
                        var c = eval(data.data.chart);

                        console.log("c>>>>>>>>>>>>" + c + "\t" + c.name);

                        var table = data.data.table;
                        console.log("table>>>" + table + "\t" + "length>>>" + "\t" + table.length);
                        html = '';
                        if (table != null) {

                            for (var i = 0; i < table.length; i++) {
                                var url = "${basePath}device/version_area?brand=" + table[i].brand + "&model=" + table[i].model + "&version=" + table[i].version + "&statistics_type1=3";
                                // var url = "http://fota.redstone.net.cn/Home/VersionStatistics/version_area?product_id=" + product_id + "&channel_id=" + channel_id + "&brand=" + table[i].brand + "&model=" + table[i].model + "&version=" + table[i].version + "&statistics_type1=3"
                                html += '<tr><td>' + table[i].brand + '</td><td>' + table[i].model + '</td><td>' + table[i].version + '</td><td><a href="' + url + '">' + table[i].total + '(' + table[i].total_percentage + ')' + '</a></td></tr>'
                            }
                        }

                        charts(a, b);
                        charts2(c);
                        $('.tbody').html(html);
                        $('.paging_full_numbers').remove();
                        $('.DevInfo').append(data.data.page_result)
                    })
                }

                $('body').on('change', '.ChangeChart', function () {
                    charts();
                    charts2();
                    ajax_total();
                })
                charts();
                charts2();
                ajax_total();

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
                    $.getJSON(url, {ajax: 1}, function (data) {

                        var a = eval(data.data.x);
                        var b = eval(data.data.y);
                        var c = eval(data.data.chart);

                        var table = data.data.table;
                        html = '';
                        if (table != null) {
                            for (var i = 0; i < table.length; i++) {

                                // var url = "http://fota.redstone.net.cn/Home/VersionStatistics/version_area?product_id=" + product_id + "&channel_id=" + channel_id + "&brand=" + table[i].brand + "&model=" + table[i].model + "&version=" + table[i].version + "&statistics_type1=3"
                                html += '<tr><td>' + table[i].brand + '</td><td>' + table[i].model + '</td><td>' + table[i].version + '</td><td><a href="' + url + '">' + table[i].total + '(' + table[i].total_percentage + ')' + '</a></td></tr>'
                            }
                            ;
                        }
                        ;

                        $('.tbody').html(html);
                        $('.paging_full_numbers').remove();
                        $('.DevInfo').append(data.data.page_result);

                    })

                })
            });

        </script>


        <script>
            $(function () {
                var new_title = "</span><div class='font_lit'><span class='green_hover'>累计量占比：</span>截至到今日0点，某机型下的版本占比情况，如果A版本升级到B版本，则A的累计量减少,B的累计量增加</div>";

                var new_title1 = "<div class='font_lit'><span class='green_hover'>占比详情：</span>以列表的形式展现各版本的累计量占比</div><div class='font_lit'><span class='green_hover'>" + Message.hover7 + "(%)：</span>" + Message.hover1 + Message.total_p + Message.y_new + "</div>";

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
        <script type="text/javascript">

            var identification = "";

            if (identification == 1) {

                $('.style').append(".highcharts-legend {display: none!important;}");
            } else {

                $('.style').append(".highcharts-legend {display: block!important;}");
            }

        </script>

        <script type="text/javascript">
            $("#isCheck").click(function () {
                window.location.reload();
            });
            $("#isData").click(function () {
                window.location.reload();
            });
            $("#isData2").click(function () {
                window.location.reload();
            })
        </script>
    </div>
</div>
</body>
</html>
