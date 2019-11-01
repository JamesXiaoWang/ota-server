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
<%--Navigation--%>
<div class="navbar navbar-fixed-top scroll-hide">
    <div class="container-fluid top-bar">
        <div class="pull-right">
            <ul class="nav navbar-nav pull-right">
                <li class="dropdown user hidden-xs">
                    <a class="dropdown-toggle message" id="mymessage" href="#">
                        <span aria-hidden="true" class="se7en-envelope"></span>
                        <div class="sr-only">消息</div>
                    </a>
                </li>
                <li class="dropdown user hidden-xs">
                    <a class="dropdown-toggle" href="#">
                        <span aria-hidden="true" class="icon-user"></span>
                        ${username}
                    </a>
                </li>
                <li class="dropdown user hidden-xs">
                    <a class="dropdown-toggle" href="#" id="isCheck">
                        <span aria-hidden="true" class="se7en-feed"></span>
                        统计总览
                    </a>
                </li>

                <li class="dropdown user hidden-xs">
                    <a
                            data-toggle="dropdown"
                            class="dropdown-toggle"
                            href="#"
                    >
                        <span aria-hidden="true" class="se7en-gear"></span>
                        管理
                    </a>
                    <ul class="dropdown-menu">
                    </ul>
                </li>
                <li class="dropdown user hidden-xs">
                    <a class="dropdown-toggle" href="${basePath}user/loginOut">
                        <span aria-hidden="true" class="icon-signin"></span>
                        退出
                    </a>
                </li>
            </ul>
        </div>
        <button class="navbar-toggle">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>

        <a class="logo" href="#"><img style="height: 28px;" src="${basePath}images/anquan.png"/></a>
    </div>
    <div class="container-fluid main-nav clearfix">
        <div class="nav-collapse">
            <ul class="nav"></ul>
        </div>
    </div>
</div>
<!-- End Navigation -->
<div class="container-fluid main-content"></div>
<script src="${basePath}js/highcharts.js"></script>
<style type="text/css" class="style">
    .container-fluid.main-nav {
        display: none;
    }
    body {
        padding-top: 49px;
    }

    .navbar {
        height: 46px;
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

    .fr {
        float: right;
    }

    .mr30 {
        margin-right: 30px;
    }
</style>
<div class="col-lg-12">
    <div class="row" style="margin:0 0 15px 0;">
        <div class="widget-container stats-container">
            <div class="col-md-4">
                <div class="number">
                    <div class="icon globe"></div>
                    ${newIncrements}
                </div>
                <div class="text">新增设备</div>
            </div>
            <div class="col-md-4">
                <div class="number">
                    <div class="icon visitors"></div>
                    ${capacity}
                </div>
                <div class="text">活跃设备</div>
            </div>
            <div class="col-md-4">
                <div class="number">
                    <div class="icon chat-bubbles"></div>
                    ${count}
                </div>
                <div class="text">累计设备</div>
            </div>
        </div>
    </div>

    <div class="row" style="margin:0 0 15px 0;">
        <div class="widget-container1 parent">
            <div class="grid-structure col-919191">
                <ul class="heading breadcrumb">
                    <li>
                        <i class="icon-home"></i>
                        统计概括
                    </li>
                    <img src="${basePath}images/hover-img.png" class="hover squer"/>
                </ul>
            </div>
            <div class="col-md-2">
                <select
                        class="form-control CascadeVersion ChangeChart ChangeChart1 ChangeChart2"
                        name="product"
                        id="product"
                        data-url="#"
                >
                    <option value="0">所有产品</option>
                    <option value="q6ciyjoilsqs26rlstiqlvzg" data-value="764"
                    >创世智佳产品
                    </option
                    >
                </select>
            </div>
            <div class="col-md_10">
                <div class="fr mr30">
                    <select
                            class="form-control CascadeVersion ChangeChart btn_blue select_one select_type"
                            name="statistics_type1"
                            data-url="#"
                    >
                        <option value="1">日活量</option>
                        <option value="2">新增量</option>
                        <option value="3">累计量</option>
                    </select>
                </div>
                <div class="fr mr30">
                    <select
                            class="form-control CascadeVersion ChangeChart btn_blue select_one select_group"
                            name="time_group1"
                            data-url="#"
                    >
                        <option value="1">日</option>
                    </select>
                </div>
                <div class="fr mr30">
                    <select
                            class="form-control CascadeVersion ChangeChart btn_blue select_one"
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
    <div class="col-lg-8" style="padding:0;">
        <div class="row" style="margin:0 0 15px 0;">
            <div class="widget-container1">
                <div class="grid-structure col-919191">
                    <ul class="heading breadcrumb">
                        <li>
                            <i class="icon-home"></i>
                            渠道分析
                        </li>
                        <img src="${basePath}images/hover-img.png" class="hover1 squer"/>
                    </ul>
                </div>

                <div class="col-md_10">
                    <div class="fr mr30">
                        <select
                                class="form-control CascadeVersion btn_blue ChangeChart1 select_two select_type"
                                name="statistics_type2">
                            <option value="1">日活量</option>
                            <option value="2">新增量</option>
                            <option value="3">累计量</option>
                        </select>
                    </div>
                    <div class="fr mr30">
                        <select
                                class="form-control CascadeVersion btn_blue ChangeChart1 select_two select_group"
                                name="time_group2"
                        >
                            <option value="1">日</option>
                        </select>
                    </div>
                    <div class="fr mr30">
                        <select
                                class="form-control CascadeVersion btn_blue ChangeChart1 select_two"
                                name="time_horizon2"
                                data-url="#"
                        >
                            <option value="1">近7天</option>
                            <option value="2">近30天</option>
                            <option value="3">近1年</option>
                        </select>
                    </div>
                </div>
                <div id="container1" class="mag" style="width:98%;"></div>
            </div>
        </div>
    </div>

    <div class="col-lg-4" style="padding-right:0;">
        <div class="row" style="margin:0 0 15px 0;">
            <div class="widget-container1">
                <div class="grid-structure col-919191">
                    <ul class="heading breadcrumb">
                        <li>
                            <i class="icon-home"></i>
                            Top 10 渠道
                        </li>
                        <img src="${basePath}images/hover-img.png" class="hover2 squer"/>
                    </ul>
                </div>

                <div class="col-md-3 col-md-offset-9">
                    <div class="fr mr30">
                        <select
                                class="form-control CascadeVersion  ChangeChart2 btn_blue"
                                name="statistics_type3"
                        >
                            <option value="1">日活量</option>
                            <option value="2">新增量</option>
                            <option value="3">累计量</option>
                        </select>
                    </div>
                </div>
                <div id="container2" class="mag" style="width:98%;"></div>
            </div>
        </div>
    </div>

    <div class="row" style="margin:0 0 15px 0;clear:both;">
        <div class="widget-container1 padded">
            <div class="grid-structure col-919191">
                <ul class="heading breadcrumb">
                    <li>
                        <i class="icon-home"></i>
                        渠道详情
                    </li>
                    <img src="${basePath}images/hover-img.png" class="hover3 squer"/>
                </ul>
            </div>
            <table class="table table-bordered">
                <thead>
                <tr>
                    <th>公司名称</th>
                    <th>产品名称</th>
                    <th>渠道名称</th>
                    <th>平台</th>
                    <th>昨日活跃量</th>
                    <th>昨日新增量</th>
                    <th>新增活跃占比（%）</th>
                    <th>累计量</th>
                    <th>销售</th>
                </tr>
                </thead>
                <tbody class="tbody"></tbody>
            </table>
        </div>
    </div>
    <!-- Highcharts -->
    <script type="text/javascript">
        $(function () {
            // js控制宽度
            var aa = "zh-cn";

            if (aa == "en-us") {
                $(".btn_blue").css("width", "auto");
            }

            var charts = function (X, value, Y) {
                console.log("X:>>>>>>>>>>" + X)
                var highchart = new Highcharts.Chart({
                    chart: {
                        renderTo: "container", // 渲染到容器当中
                        type: "line", // 折线图
                    },
                    // colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572',
                    //     '#FF9655', '#FFF263', '#6AF9C4'],B2DFEE,66ccff
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
                        },
                        gridLineDashStyle: 'longdash'
                    },
                    tooltip: {
                        enabled: true,
                        formatter: function () {
                            return (
                                "<b>" +
                                this.series.name +
                                "</b><br/>" +
                                this.x +
                                ": " +
                                this.y
                            );
                        },
                        // crosshairs: [
                        //     {
                        //         width: 3,
                        //         color: "#46db51"
                        //     },
                        //     {
                        //         width: 3,
                        //         color: "#46db51"
                        //     }
                        // ]
                    },
                    loading: {
                        style: {
                            position: "absolute", //默认值
                            textAlign: "center" //文字显示方式
                        }
                    },
                    plotOptions: {
                        line: {
                            dataLabels: {
                                enabled: true
                            },
                            enableMouseTracking: true //启用鼠标跟踪
                        }
                    },
                    credits: {
                        enabled: false //版权信息
                    },
                    series: [
                        {
                            name: Y,
                            data: value
                        }
                    ]
                });

                highchart.showLoading('<img src="${basePath}images/loading2.gif"/>');

                if (X != undefined) {
                    highchart.hideLoading('<img src="${basePath}images/loading2.gif"/>');
                }
            };

            charts();

            var product_ajax = function () {
                var title = "";
                <%--var url = "${basePath}json/data.json";--%>
                var url = "${basePath}device/getStatisticsData";

                var product = $('select[name="product"]').val();
                var product_id = $('select[name="product"]')
                    .find("option:selected")
                    .data("value");
                var select = $(".parent").find("select");

                for (var i = select.length - 1; i >= 0; i--) {
                    var time_horizon = $(select[3]).val();
                    var time_group = $(select[2]).val();
                    var statistics_type = $(select[1]).val();
                }
                console.log("statistics_type>>>>>>>>"+statistics_type)
                console.log("time_group>>>>>>>>"+time_group)
                if (statistics_type == 1) {
                    title = "日活量";
                } else if (statistics_type == 2) {
                    if (time_group == 1) {
                        title = "日新增";
                    } else if (time_group == 2) {
                        title = "周新增";
                    } else if (time_group == 3) {
                        title = "月新增";
                    }
                } else {
                    title = "累计量";
                }
                var html = "";
                html += '<tr><td colspan="9" align="center">加载中···</td></tr>';
                $(".tbody").html(html);

                $.getJSON(
                    url,
                    {
                        product: product,
                        product_id: product_id,
                        time_horizon1: time_horizon,
                        time_group1: time_group,
                        statistics_type1: statistics_type
                    },
                    function (data) {
                        var a = data.data.x;
                        var b = data.data.y;
                        var table = data.data.product;
                        html = "";
                        for (var i = 0; i < table.length; i++) {
                            <%--var url = "${basePath}json/version.json";--%>
                            var url = "${basePath}device/version";
                            var otype = data.data.os_type;

                            if (table[i].sales_name == null) {
                                table[i].sales_name = "";
                            }
                            if (table[i].today == null) {
                                table[i].today = 0;
                            }
                            if (table[i].yesterday == null) {
                                table[i].yesterday = 0;
                            }
                            if (table[i].total == null) {
                                table[i].total = 0;
                            }
                            html +=
                                "<tr><td>" +
                                table[i].company_name +
                                "</td><td>" +
                                table[i].name +
                                '</td><td><a href="' +
                                url +
                                '">' +
                                table[i].channel +
                                "</td><td>" +
                                otype[table[i].os_type] +
                                "</td><td>" +
                                table[i].today +
                                "</td><td>" +
                                table[i].yesterday +
                                "</td><td>" +
                                table[i].percentage +
                                "</td><td>" +
                                table[i].total +
                                "</td><td>" +
                                table[i].sales_name +
                                "</td></tr>";
                        }

                        charts(a, b, title);

                        $(".tbody").html(html);
                    }
                );
            };

            $("body").on("change", ".ChangeChart", function () {
                charts();
                product_ajax();
            });
            charts();
            product_ajax();
        });
    </script>
    <script type="text/javascript">
        $(function () {
            var charts = function (X, value, Y) {
                console.log("container1：" + X + "\t" + value)
                var highchart = new Highcharts.Chart({
                    chart: {
                        renderTo: "container1",
                        type: "line"
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
                            return (
                                this.x + "<br/><b>" + this.series.name + ": </b>" + this.y
                            );
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
                    series: value
                });

                highchart.showLoading('<img src="${basePath}images/loading2.gif"/>');

                if (X != undefined) {
                    highchart.hideLoading('<img src="${basePath}images/loading2.gif"/>');
                }
            };

            var channel_ajax = function () {
                var title = "";

                var url = "${basePath}device/getChannelAnalysis";

                var product = $('select[name="product"]').val();
                var product_id = $('select[name="product"]')
                    .find("option:selected")
                    .data("value");
                var select = $(".ChangeChart1");
                for (var i = select.length - 1; i >= 0; i--) {
                    var time_horizon = $(select[3]).val();
                    var time_group = $(select[2]).val();
                    var statistics_type = $(select[1]).val();
                }
                if (statistics_type == 1) {
                    title = "日活量";
                } else if (statistics_type == 2) {
                    if (time_group == 1) {
                        title = "日新增";
                    } else if (time_group == 2) {
                        title = "周新增";
                    } else if (time_group == 3) {
                        title = "月新增";
                    }
                } else {
                    title = "累计量";
                }

                $.getJSON(
                    url,
                    {
                        product_id: product_id,
                        product: product,
                        time_horizon2: time_horizon,
                        time_group2: time_group,
                        statistics_type2: statistics_type
                    },
                    function (data) {
                        console.log("data.data.channel_x：   " + data.data.channel_x)
                        console.log("data.data.data_channel：   " + data.data.data_channel)
                        var a = data.data.channel_x;
                        var b = eval(data.data.data_channel);
                        charts(a, b, title);
                        var identification = data.data.identification;
                        if (identification == 1) {
                            $(".style").append(
                                ".highcharts-legend {display: none!important;}"
                            );
                        } else {
                            $(".style").append(
                                ".highcharts-legend {display: block!important;}"
                            );
                        }
                    }
                );
            };
            $("body").on("change", ".ChangeChart1", function () {
                charts();
                channel_ajax();
            });
            charts();
            channel_ajax();
        });
    </script>
    <script type="text/javascript">
        $(function () {
            var percentage = "百分比";
            var charts = function (X, Y, change) {
                var highchart = new Highcharts.Chart({
                    chart: {
                        renderTo: "container2",
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false
                    },
                    title: {
                        text: Y
                    },
                    credits: {
                        text: "" //去除水印地址
                    },
                    tooltip: {
                        pointFormat:
                            percentage +
                            ":<b>{point.percentage:.1f}%</b><br>{series.name} :{point.y:.0f}"
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: "pointer",
                            dataLabels: {
                                enabled: true,
                                color: "#000000",
                                connectorColor: "#000000",
                                format: "<b>{point.name}</b>: {point.percentage:.1f} %"
                            },
                            showInLegend: true
                        }
                    },
                    series: [
                        {
                            type: "pie",
                            name: Y,
                            data: X
                        }
                    ]
                });

                highchart.showLoading('<img src="${basePath}images/loading2.gif"/>');

                if (X != undefined) {
                    highchart.hideLoading("Loading...");
                }
            };
            var pie_ajax = function () {
                var title = "";

                var url = "${basePath}device/getTopData";

                var product = $('select[name="product"]').val();
                var product_id = $('select[name="product"]')
                    .find("option:selected")
                    .data("value");
                var select = $(".ChangeChart2");
                for (var i = select.length - 1; i >= 0; i--) {
                    var statistics_type = $(select[1]).val();
                }
                if (statistics_type == 1) {
                    title = "日活量";
                } else if (statistics_type == 2) {
                    title = "日新增";
                } else {
                    title = "累计量";
                }

                $.getJSON(
                    url,
                    {
                        ajax: 1,
                        product_id: product_id,
                        product: product,
                        statistics_type3: statistics_type
                    },
                    function (data) {
                        var b = eval(data.data.chart_result_pie);
                        console.log("b：" + b)
                        charts(b, title);
                    }
                );
            };
            $("body").on("change", ".ChangeChart2", function () {
                charts();
                pie_ajax();
            });
            charts();
            pie_ajax();
        });
    </script>
    <script type="text/javascript">
        $("#isCheck").click(function () {
            window.location.reload();
        })
    </script>
    <script src="${basePath}js/custom/content-select.js"></script>
</div>
</body>
<script>
    var lastTime = new Date().getTime();
    var currentTime = new Date().getTime();
    var timeOut = 60 * 1000 * 30; //设置超时时间： 10分
    $(function(){
        $(document).mouseover(function(){
            lastTime = new Date().getTime(); //更新操作时间
        });
    });
    function testTime(){
        currentTime = new Date().getTime(); //更新当前时间
        if(currentTime - lastTime > timeOut){ //判断是否超时
            var base="<%=basePath+"user/login"%>";
            window.location.href = base;
        }
    }
    /* 定时器  间隔1秒检测是否长时间未操作页面  */
    window.setInterval(testTime, 1000);
</script>
</html>
