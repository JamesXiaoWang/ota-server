<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<html>
<head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport">
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
                            管理  </a>
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
                            设备管理   <b class="caret"></b> </a>
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
                                <a href="${basePath}device/version_statistics">
                                    <i class="icon-filter "></i>
                                    版本统计</a>
                            </li>

                            <li>
                                <a href="#">
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
        <script src="${basePath}js/highmaps.js"></script>
        <script src="${basePath}js/highmaps/data.js"></script>
        <script src="${basePath}js/exporting.js"></script>
        <script src="${basePath}js/drilldown.js"></script>
        <script src="${basePath}js/world.js"></script>
        <%--<script src="${basePath}js/highcharts.js"></script>--%>
        <style type="text/css" class="style">
            /*.container-fluid.main-nav{display: none;}*/
            body{padding-top: 131px;}
            .widget-container1 {
                background: white;
                box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            .breadcrumb{
                background: #fff;
            }
            .btn_blue{
                background: #409EFF;
                color: #fff;
                width: 105px;
            }
            .mag{
                margin-top: 20px;
            }
            .f32 .flag {
                vertical-align: middle !important;
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
                                <a href="#" id="isData">数据统计</a>
                            </li>
                            <li class="active">
                                地区统计
                            </li>

                        </ul>
                        <img src="${basePath}images/hover-img.png" class="hover squer squer1"
                             style="position: relative;top:-52px;left:260px"/>
                    </div>
                    <div class="col-md-2">
                        <select class="form-control CascadeVersion ChangeChart ChangeChart1 ChangeChart2" name="model" id="model" data-url="http://fota.redstone.net.cn/Home/VersionStatistics/version_area?product_id=764&channel_id=664">
                            <option value="0">请选择机型</option>
                        <c:forEach varStatus="status" items="${listBrand}" var="itemsBrand">
                            <optgroup label="${itemsBrand.clientId}">
                                <c:forEach varStatus="status" items="${list}" var="items">
                                    <c:if test="${itemsBrand.clientId == items.clientId}">
                                    <option value="${items.projectId}"
                                            data-brand="${items.clientId}">${items.projectId}</option>
                                    </c:if>
                                </c:forEach>
                            </optgroup>
                        </c:forEach>
                        </select>
                    </div>

                    <div class="col-md-2">
                        <select class="form-control CascadeVersion ChangeChart ChangeChart1 ChangeChart2" name="version" data-url="http://fota.redstone.net.cn/Home/VersionStatistics/version_area?product_id=764&channel_id=664">
                            <option value="0">请选择版本</option>
                        </select>
                    </div>
                    <div class="col-md_10">
                        <div class="col-md-2 parent" style="padding-right:0px;">
                            <div class="input-group date data_start" data-date-autoclose="true"
                                 data-date-format="yyyy-mm-dd">
                                <input name="date" class="form-control input_date"
                                       value="" data-value="${date}" type="text"><span
                                    class="input-group-addon"><i class="icon-calendar"></i></span>
                            </div>
                        </div>

                        <div class="fr mr30">
                            <select class="form-control CascadeVersion ChangeChart btn_blue select_one select_type statistics_type1 type" name="statistics_type1" data-url="http://fota.redstone.net.cn/Home/VersionStatistics/version_area?product_id=764&channel_id=664">
                                <option value="1" >日活量</option>
                                <option value="2" >新增量</option>
                                <option value="3" >累计量</option>
                            </select>
                        </div>
                        <div class="fr mr30">
                            <select class="form-control  CascadeVersion ChangeChart btn_blue select_one" name="area" data-url="http://fota.redstone.net.cn/Home/VersionStatistics/version_area?product_id=764&channel_id=664">
                                <option value="1">省份 </option>
                                <option value="2">国家</option>
                            </select>
                        </div>

                    </div>
                    <div style="background:#fff;height:450px;">
                        <div id="container" class="mag" style="width:98%;padding: 50px 0;display: none"></div>
                        <span id="aaa" class="mag" style="width:98%;padding: 50px 0;display: block;text-align: center;height: 300px;"><img style="position:relative;top:40%;" src="${basePath}images/loading2.gif"></span>
                    </div>

                </div>
            </div>

            <div class="row" style="margin:0 0 15px 0;clear:both;">
                <div class="widget-container1 DevInfo padded">
                    <div class="grid-structure col-919191">
                        <ul class="heading breadcrumb">
                            <li>
                                <i class="icon-home"></i>
                                地区明细
                            </li>
                            <img src="${basePath}images/hover-img.png" class="hover1 squer"/>
                        </ul>
                    </div>
                    <table class="table table-bordered">
                        <thead class="thead">
                        <tr>

                            <th>品牌</th>
                            <th>机型</th>
                            <th>地区</th>
                            <th>日活量</th>
                            <th>新增量</th>
                            <th>截止至今日累计量</th>
                        </tr>
                        </thead>
                        <tbody class="tbody">

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <script type="text/javascript">
            $(function() {
                var aa = "zh-cn";

                if (aa == "en-us") {
                    $(".squer1").css("left", "460px");
                    $(".btn_blue").css("width", "auto");
                    $('select[name="area"]')
                        .children('option[value="2"]')
                        .prop("selected", "selected");
                } else {
                    $(".squer1").css("left", "270px");
                    $('select[name="area"]')
                        .children('option[value="1"]')
                        .prop("selected", "selected");
                }
                //version赋值

                var ajax_model = function() {
                    var model = $("#model").val();
                    var brand = $("#model")
                        .find("option:selected")
                        .data("brand");
                    var html = "";
                    var version = "";

                    $.ajax({
                        url: "${basePath}device/version_area_version",
                        type: "get",
                        async: false,
                        data: {
                            brand: brand,
                            model: model
                            // product_id: product_id,
                            // channel_id: channel_id
                        },
                        success: function(data) {
                            console.log("data>>>>>>>>>>"+data.data);
                            html += "<option value='0'>请选择版本</option>";
                            if (data) {
                                for (var i = data.data.length - 1; i >= 0; i--) {
                                    if (data.data[i] != "") {
                                        html +=
                                            '<option value="' +
                                            data.data[i] +
                                            '">' +
                                            data.data[i] +
                                            "</option>";
                                    }
                                }
                            }

                            $('select[name="version"]').html(html);
                        },
                        error: function(e) {
                            console.log(e);
                        }
                    });
                };
                var version = "";
                ajax_model();
                var option = $('select[name="version"]').find("option");

                for (var i = option.length - 1; i >= 0; i--) {
                    console.log("哈达迪："+$(option[i]).attr("value"))
                    if ($(option[i]).attr("value") == version) {
                        $(option[i]).prop("selected", true);
                    }
                }

                $("#model").change(function() {
                    ajax_model();
                });
                //鼠标画上去select失去焦点防止option遮挡弹框
                $(".squer").hover(function() {
                    $("select").blur();
                });

                $(".input_date").val($(".input_date").data("value"));

                var title = "日活";
                var text = "中国各省份日活量分布";
                var text1 = "";
                var text2 = "";
                var type = "";

                if (type == 1 || type == "") {
                    title = "日活量";
                    text = "中国各省份日活量分布";
                } else if (type == 2) {
                    title = "日新增";
                    text = "中国各省份新增量分布";
                } else if (type == 3) {
                    title = "累计量";
                    text = "中国各省份累计量分布";
                }
                var charts = function(area1, title, text) {
                    console.log("area1>>>"+area1)
                    console.log("this>>>>"+this)
                    console.log("this.code>>>>"+this.code)
                    Highcharts.setOptions({
                        lang: {
                            drillUpText: "< back{series.name}"
                        }
                    });
                    var map = null,
                        geochina =
                            "https://data.jianshukeji.com/jsonp?filename=geochina/",
                        //不能下钻的省份或地区，包括台湾、香港、澳门
                        unDrilldown = ["taiwan", "xianggang", "aomen"];
                    // 获取中国地图数据并初始化图表
                    $.getJSON(geochina + "china.json&callback=?", function(mapdata) {
                        var data = [];
                        var a = [];
                        // 随机数据
                        Highcharts.each(mapdata.features, function(md, index) {
                            console.log("md.properties.name>>>>>"+md.properties.name)
                            a[md.properties.name] = 0;

                            $.each(area1, function(index1, v) {
                                console.log("index："+index1)
                                console.log("v："+v)
                                if (md.properties.name == v.area) {
                                    a[md.properties.name] += parseInt(v.value);
                                }
                            });
                            data.push({
                                name: md.properties.name,
                                drilldown: md.properties.filename, // 赋值 drilldown
                                value: a[md.properties.name]
                            });
                        });

                        map = new Highcharts.Map("container", {
                            chart: {
                                events: {
                                    drilldown: function(e) {
                                        console.log("e>>>>>>>>>>>>>>>"+e)
                                        console.log("e.point>>>>>>>>>"+e.point.drilldown)
                                        // 异步下钻
                                        if (
                                            e.point.drilldown &&
                                            unDrilldown.indexOf(e.point.drilldown) === -1
                                        ) {
                                            var pointName = e.point.properties.fullname;
                                            map.showLoading("下钻中，请稍后......");
                                            // 获取二级行政地区数据并更新图表
                                            $.getJSON(
                                                geochina + e.point.drilldown + ".json&callback=?",
                                                function(data) {
                                                    data = Highcharts.geojson(data);

                                                    Highcharts.each(data, function(d) {
                                                        a[d.name] = 0;
                                                        $.each(area1, function(index, v) {
                                                            if (d.name == v.city) {
                                                                a[d.name] += parseInt(v.value);
                                                            }
                                                        });
                                                        d.value = a[d.name]; // 生成 1 ~ 100 随机值
                                                    });
                                                    map.hideLoading();

                                                    map.addSeriesAsDrilldown(e.point, {
                                                        name: e.point.name,
                                                        data: data,
                                                        dataLabels: {
                                                            enabled: true,
                                                            format: "{point.name}"
                                                        }
                                                    });
                                                    map.setTitle({
                                                        text: pointName
                                                    });
                                                }
                                            );
                                        }
                                    },

                                    drillup: function() {
                                        map.setTitle({
                                            text: ""
                                        });
                                    }
                                }
                            },
                            title: {
                                text: text
                            },
                            subtitle: {
                                text: ""
                            },
                            mapNavigation: {
                                enabled: true,
                                buttonOptions: {
                                    verticalAlign: "bottom"
                                }
                            },
                            tooltip: {
                                useHTML: true,
                                headerFormat: "<div>{point.name}</div>",
                                pointFormat:
                                    "<div>省份 :{point.properties.fullname}</div>" +
                                    "<div>" +
                                    title +
                                    ":{point.value}",
                                footerFormat: "</div>"
                            },
                            colorAxis: {
                                min: 0,
                                minColor: "#fff",
                                maxColor: "#006cee",
                                labels: {
                                    style: {
                                        color: "red",
                                        fontWeight: "bold"
                                    }
                                }
                            },
                            credits: {
                                enabled: false,
                                text: "",
                                style: {
                                    color: "rgba(255, 255, 255, 0.6)"
                                },
                                position: {
                                    y: -40
                                }
                            },
                            exporting: {
                                enabled: false //用来设置是否显示‘打印’,'导出'等功能按钮，不设置时默认为显示
                            },
                            series: [
                                {
                                    data: data,
                                    mapData: mapdata,
                                    joinBy: "name",
                                    name: "省份 ",
                                    states: {
                                        hover: {
                                            color: "#a4edba"
                                        }
                                    }
                                }
                            ]
                        });
                    });
                };

                var charts2 = function(data, title, text2) {
                    Highcharts.mapChart("container", {
                        title: {
                            text: text2
                        },
                        credits: {
                            enabled: false,
                            text: "",
                            style: {
                                color: "rgba(255, 255, 255, 0.6)"
                            },
                            position: {
                                y: -40
                            }
                        },
                        legend: {
                            title: {
                                text: title,
                                style: {
                                    color:
                                        (Highcharts.theme && Highcharts.theme.textColor) ||
                                        "black"
                                }
                            }
                        },

                        mapNavigation: {
                            enabled: true,
                            buttonOptions: {
                                verticalAlign: "bottom"
                            }
                        },
                        exporting: {
                            enabled: false //用来设置是否显示‘打印’,'导出'等功能按钮，不设置时默认为显示
                        },

                        tooltip: {
                            backgroundColor: "none",
                            borderWidth: 0,
                            shadow: false,
                            useHTML: true,
                            padding: 0,
                            pointFormat:
                                '<span class="f32"><span class="flag {point.flag}"></span></span>' +
                                "中国: <b>{point.value}</b>",
                            positioner: function() {
                                return { x: 300, y: 150 };
                            }
                        },

                        colorAxis: {
                            min: 1,
                            type: "logarithmic"
                        },

                        series: [
                            {
                                data: data,
                                mapData: Highcharts.maps["custom/world"],
                                joinBy: ["iso-a2", "code"],
                                name: title,
                                states: {
                                    hover: {
                                        color: "#a4edba"
                                    }
                                },
                                point: {
                                    events: {
                                        click: function() {
                                            var code = this.code,
                                                product_id = "764",
                                                channel_id = "664",
                                                statistics_type = $(
                                                    'select[name="statistics_type1"]'
                                                ).val(),
                                                model = $("#model").val(),
                                                brand = $('select[name="model"]')
                                                    .find("option:selected")
                                                    .data("brand"),
                                                version = $('select[name="version"]').val(),
                                                date = $(".input_date").val(),
                                                url =
                                                    "http://fota.redstone.net.cn/Home/VersionStatistics/info_detail?&product_id=" +
                                                    product_id +
                                                    "&channel_id=" +
                                                    channel_id +
                                                    "&statistics_type=" +
                                                    statistics_type +
                                                    "&iso_code=" +
                                                    code +
                                                    "&brand=" +
                                                    brand +
                                                    "&model=" +
                                                    model +
                                                    "&version=" +
                                                    version +
                                                    "&date=" +
                                                    date;
                                                // url = "#";
                                            window.location.href = url;
                                        }
                                    }
                                }
                            }
                        ]
                    });
                };
                var area_all = function() {
                    <%--var url = "${basePath}json/version_area.json"--%>
                    var url = "${basePath}device/version_area_ajax";
                    var title = "";
                    var text1 = "";
                    var brand = $('select[name="model"]')
                        .find("option:selected")
                        .data("brand");
                    var model = $('select[name="model"]').val();
                    var version = $('select[name="version"]').val();
                    var date = $('input[name="date"]').val();

                    var statistics_type = $('select[name="statistics_type1"]').val();
                    var area = $('select[name="area"]').val();

                    if (statistics_type == 1) {
                        title = "日活量";
                        text1 = "中国各省份日活量分布";
                        text2 = "全球各国家日活量分布";
                    } else if (statistics_type == 2) {
                        title = "日新增";
                        text1 = "中国各省份新增量分布";
                        text2 = "全球各国家新增量分布";
                    } else {
                        title = "累计量";
                        text1 = "中国各省份累计量分布";
                        text2 = "全球各国家累计量分布";
                    }
                    var html = "";
                    html += "<tr><td colspan='9' align='center'>加载中···</td></tr>";
                    $(".tbody").html(html);
                    $(".paging_full_numbers").remove();
                    $.getJSON(
                        url,
                        {
                            version: version,
                            brand: brand,
                            model: model,
                            date: date,
                            statistics_type1: statistics_type,
                            area: area
                        },
                        function(data) {
                            var a = eval(data.data.x);
                            for (var i = a.length - 1; i >= 0; i--) {
                                a[i].value = parseInt(a[i].value);
                            }
                            var table = data.data.table;
                            html = "";
                            var thead = "";
                            var product_id = "764";
                            var channel_id = "664";
                            var version_url = "";

                            if (version != 0 && version != null) {
                                thead +=
                                    "<tr><th>品牌</th><th>机型</th><th>版本</th><th>地区</th><th>新增量</th><th>日活量</th><th>截止至今日累计量</th></tr>";
                            } else if (model != 0 && model != null) {
                                thead +=
                                    "<tr><th>品牌</th><th>机型</th><th>地区</th><th>新增量</th><th>日活量</th><th>截止至今日累计量</th></tr>";
                            } else {
                                thead +=
                                    "<tr><th>地区</th><th>新增量</th><th>日活量</th><th>截止至今日累计量</th></tr>";
                            }

                            if (table != null) {
                                for (var i = 0; i < table.length; i++) {
                                    if (version != 0 && version != null) {
                                        // var url =
                                        //     "http://fota.redstone.net.cn/Home/VersionStatistics/version_details?product_id=" +
                                        //     product_id +
                                        //     "&channel_id=" +
                                        //     channel_id +
                                        //     "&brand=" +
                                        //     table[i].brand +
                                        //     "&model=" +
                                        //     table[i].model +
                                        //     "&version=" +
                                        //     table[i].version +
                                        //     "";
                                        var  url = "";

                                        html +=
                                            "<tr><td>" +
                                            table[i].brand +
                                            "</td><td>" +
                                            table[i].model +
                                            '</td><td><a href="' +
                                            url +
                                            '">' +
                                            table[i].version +
                                            "</a></td><td>" +
                                            table[i].area +
                                            "</td><td>" +
                                            table[i].new +
                                            "</td><td>" +
                                            table[i].active +
                                            "</td><td>" +
                                            table[i].total +
                                            "</td></tr>";
                                    } else if (model != 0 && model != null) {
                                        html +=
                                            "<tr><td>" +
                                            table[i].brand +
                                            "</td><td>" +
                                            table[i].model +
                                            "</td><td>" +
                                            table[i].area +
                                            "</td><td>" +
                                            table[i].new +
                                            "</td><td>" +
                                            table[i].active +
                                            "</td><td>" +
                                            table[i].total +
                                            "</td></tr>";
                                    } else {
                                        html +=
                                            "<tr><td>" +
                                            table[i].area +
                                            "</td><td>" +
                                            table[i].new +
                                            "</td><td>" +
                                            table[i].active +
                                            "</td><td>" +
                                            table[i].total +
                                            "</td></tr>";
                                    }
                                }
                            }

                            $(".thead").html(thead);
                            $(".tbody").html(html);
                            $("#container").show();
                            $("#aaa").hide();
                            if (area == 1) {
                                charts(a, title, text1);
                            } else {
                                console.log("this is area2")
                                console.log("area========"+area)
                                console.log("a>>>>>>>>>>>>>"+a)
                                console.log("title>>>>>>>>>"+title)
                                console.log("text1>>>>>>>>>"+text1)
                                charts2(a, title, text2);
                            }
                            $(".paging_full_numbers").remove();
                            $(".DevInfo").append(data.page_result);
                        }
                    );
                };
                var area_ajax = function() {
                    console.log("有没有被使用到>>>>>>>")
                    var url = "${basePath}device/version_area_ajax";
                    var title = "";
                    var text1 = "";
                    var brand = $('select[name="model"]')
                        .find("option:selected")
                        .data("brand");
                    var model = $('select[name="model"]').val();
                    var version = $('select[name="version"]').val();
                    var date = $('input[name="date"]').val();
                    var ajax = "";

                    var statistics_type = $('select[name="statistics_type1"]').val();
                    var area = $('select[name="area"]').val();

                    if (statistics_type == 1) {
                        title = "日活量";
                        text1 = "中国各省份日活量分布";
                        text2 = "全球各国家日活量分布";
                    } else if (statistics_type == 2) {
                        title = "日新增";
                        text1 = "中国各省份新增量分布";
                        text2 = "全球各国家新增量分布";
                    } else {
                        title = "累计量";
                        text1 = "中国各省份累计量分布";
                        text2 = "全球各国家累计量分布";
                    }

                    $.getJSON(
                        url,
                        {
                            ajax: 1,
                            version: version,
                            brand: brand,
                            model: model,
                            date: date,
                            statistics_type1: statistics_type,
                            area: area
                        },
                        function(data) {
                            console.log("Hode.............."+area)
                            var a = eval(data.data.x);
                            for (var i = a.length - 1; i >= 0; i--) {
                                a[i].value = parseInt(a[i].value);
                            }

                            $("#container").show();
                            $("#aaa").hide();
                            if (area == 1) {
                                charts(a, title, text1);
                            } else {
                                console.log("area?==="+area)
                                console.log("A的值"+a)
                                charts2(a, title, text2);
                            }
                        }
                    );
                };
                area_all();
                var gotoDate = function() {
                    $("#container").hide();
                    $("#aaa").show();
                    area_all();
                };
                $(".data_start")
                    .datepicker({
                        autoclose: 1,
                        endDate: 0,
                        onSelect: gotoDate
                    })
                    .on("changeDate", gotoDate);

                $("body").on("change", ".ChangeChart", function() {
                    $("#container").hide();
                    $("#aaa").show();
                    if ($(this).hasClass("type")) {
                        area_ajax();
                    } else {
                        area_all();
                    }
                });
                $("body").on("click", ".PageChange", function() {
                    var url = $(this).data("url");
                    var title = "";
                    var model = $('select[name="model"]').val();
                    var area = $('select[name="area"]').val();
                    var statistics_type = $('select[name="statistics_type1"]').val();
                    if (statistics_type == 1) {
                        title = "日活量";
                        text1 = "中国各省份日活量分布";
                        text2 = "全球各国家日活量分布";
                    } else if (statistics_type == 2) {
                        title = "日新增";
                        text1 = "中国各省份新增量分布";
                        text2 = "全球各国家新增量分布";
                    } else {
                        title = "累计量";
                        text1 = "中国各省份累计量分布";
                        text2 = "全球各国家累计量分布";
                    }
                    var html = "";
                    html += "<tr><td colspan='9' align='center'>加载中···</td></tr>";
                    $(".tbody").html(html);
                    $.getJSON(url, { ajax: 1 }, function(data) {
                        var table = data.data.table;
                        html = "";
                        var thead = "";
                        var product_id = "764";
                        var channel_id = "664";

                        if (version != 0 && version != null) {
                            thead +=
                                "<tr><th>品牌</th><th>机型</th><th>版本</th><th>地区</th><th>新增量</th><th>日活量</th><th>截止至今日累计量</th></tr>";
                        } else if (model != 0 && model != null) {
                            thead +=
                                "<tr><th>品牌</th><th>机型</th><th>地区</th><th>新增量</th><th>日活量</th><th>截止至今日累计量</th></tr>";
                        } else {
                            thead +=
                                "<tr><th>地区</th><th>新增量</th><th>日活量</th><th>截止至今日累计量</th></tr>";
                        }

                        if (table != null) {
                            for (var i = 0; i < table.length; i++) {
                                if (version != 0 && version != null) {
                                    var url =
                                        "http://fota.redstone.net.cn/Home/VersionStatistics/version_details?product_id=" +
                                        product_id +
                                        "&channel_id=" +
                                        channel_id +
                                        "&brand=" +
                                        table[i].brand +
                                        "&model=" +
                                        table[i].model +
                                        "&version=" +
                                        table[i].version +
                                        "";

                                    html +=
                                        "<tr><td>" +
                                        table[i].brand +
                                        "</td><td>" +
                                        table[i].model +
                                        '</td><td><a href="' +
                                        url +
                                        '">' +
                                        table[i].version +
                                        "</a></td><td>" +
                                        table[i].area +
                                        "</td><td>" +
                                        table[i].new +
                                        "</td><td>" +
                                        table[i].active +
                                        "</td><td>" +
                                        table[i].total +
                                        "</td></tr>";
                                } else if (model != 0 && model != null) {
                                    html +=
                                        "<tr><td>" +
                                        table[i].brand +
                                        "</td><td>" +
                                        table[i].model +
                                        "</td><td>" +
                                        table[i].area +
                                        "</td><td>" +
                                        table[i].new +
                                        "</td><td>" +
                                        table[i].active +
                                        "</td><td>" +
                                        table[i].total +
                                        "</td></tr>";
                                } else {
                                    html +=
                                        "<tr><td>" +
                                        table[i].area +
                                        "</td><td>" +
                                        table[i].new +
                                        "</td><td>" +
                                        table[i].active +
                                        "</td><td>" +
                                        table[i].total +
                                        "</td></tr>";
                                }
                            }
                        }

                        $(".thead").html(thead);
                        $(".tbody").html(html);

                        $(".paging_full_numbers").remove();
                        $(".DevInfo").append(data.page_result);
                    });
                });
            });
        </script>

        <script>
            $(function() {
                var new_title =
                    "<div class='font_lit'><span class='green_hover'>地区统计：</span>以地图的形式展现日活量、新增量、累计量</div><div class='font_lit'><span class='green_hover'>日活量：</span>" +
                    Message.hover3 +
                    "</div><div class='font_lit'><span class='green_hover'>" +
                    Message.hover7 +
                    "：</span>" +
                    Message.hover1 +
                    "</div><div class='font_lit'><span class='green_hover'>" +
                    Message.hover6 +
                    "：</span>" +
                    Message.hover4 +
                    "</div><div class='font_lit'><span class='green_hover'>日期：</span>日活量、新增量可以任意选择一天。累计量不能选择日期，按最新日期统计</div><div class='font_lit'><span class='green_hover'>地区：</span>可选择国家分布和省份分布，当选择省份时可下钻到城市</div>";
                var new_title1 =
                    "<div class='font_lit'><span class='green_hover'>地区明细：</span>以数据列表展现日活量、新增量、累计量与分布图的数据对应</div><div class='font_lit'><span class='green_hover'>日活量：</span>" +
                    Message.hover3 +
                    "</div><div class='font_lit'><span class='green_hover'>" +
                    Message.hover7 +
                    "：</span>" +
                    Message.hover1 +
                    "</div><div class='font_lit'><span class='green_hover'>截止至今日累计量：</span>" +
                    Message.hover9 +
                    "</div>";

                Poshytip.init("hover", new_title);
                Poshytip.init("hover1", new_title1);

                $(".select_type").change(function() {
                    var html = "",
                        week = "",
                        month = "",
                        _val = $(this)
                            .parent()
                            .siblings()
                            .children(".select_group")
                            .val();

                    if (_val == 2) {
                        week = "selected";
                    } else if (_val == 3) {
                        month = "selected";
                    }
                    if ($(this).val() != 1) {
                        html += '<option value="1">日</option>';
                        html += "<option " + week + '  value="2">周</option>';
                        html += "<option " + month + '  value="3">月</option>';
                        $(this)
                            .parent()
                            .siblings()
                            .children(".select_group")
                            .html(html);
                    } else {
                        html += '<option value="1">日</option>';
                        $(this)
                            .parent()
                            .siblings()
                            .children(".select_group")
                            .children("option")
                            .remove();
                        $(this)
                            .parent()
                            .siblings()
                            .children(".select_group")
                            .html(html);
                    }
                });

                $(".statistics_type1").change(function() {
                    if ($(this).val() == 3) {
                        $(".parent").hide();
                    } else {
                        $(".parent").show();
                    }
                });
            });
        </script>
        <script type="text/javascript">
            var identification = "";

            if (identification == 1) {
                $(".style").append(".highcharts-legend {display: none!important;}");
            } else {
                $(".style").append(
                    ".highcharts-legend {display: block!important;}"
                );
            }
        </script>
    </div>
</div>
</body>
</html>
