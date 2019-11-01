<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt" %>
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

    <%--分页样式--%>
    <link href="${basePath}css/page-style.css" rel="stylesheet" type="text/css">

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
                    <li class="dropdown">
                        <a data-toggle="dropdown" class="current"
                           href="#">
                            <span aria-hidden="true" class="icon-pencil"></span>
                            设备管理 <b class="caret"></b></a>
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
                    <li class="dropdown">
                        <a data-toggle="dropdown"
                           class=""
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
    <div class="col-lg-12">
        <div class="widget-container fluid-height clearfix">

            <div class="grid-structure">
                <ul class="heading breadcrumb">
                    <li>
                        <i class="icon-home"></i>
                        <a href="#">渠道管理</a>
                    </li>
                    <li class="active">
                        <a href="${basePath}device/version">设备管理</a>
                    </li>
                    <li class="active">
                        近期登录
                    </li>
                </ul>
                <div class="widget-content padded clearfix x-scroll">
                    <table class="table table-bordered table-striped">
                        <thead>
                        <th>IMEI</th>
                        <th>设备Id</th>
                        <th>品牌</th>
                        <th>机型</th>
                        <%--<th>是否绑定</th>--%>
                        <th>登录时间</th>
                        <%--<th>国家</th>--%>
                        <%--<th>省份</th>--%>
                        <%--<th>城市</th>--%>
                        </thead>
                        <tbody>
                        <c:forEach items="${pageInfo.list}" varStatus="status" var="list">
                            <tr>
                                <td>
                                    <a href="#" style="text-decoration: none"> IMEI：${list.imeiNumber}</a>
                                </td>
                                <td>${list.deviceId}</td>
                                <td>${list.clientId}</td>
                                <td>${list.projectId}</td>
                                <td>${list.days}</td>
                            </tr>
                        </c:forEach>
                        </tbody>
                    </table>
                    <div style="text-align: center">
                        <ul class="pagination">
                            <li
                                    <c:if test="${pageInfo.pageNum==1}">
                                        class="disabled"
                                    </c:if>>
                                <a href="<c:url value="${basePath}device/device_records?pageNo=1"/> ">«</a>
                            </li>
                            <li>
                                <!--如果当前页数是第一页，那么点上一页仍然是当前页。 -->
                                <a href="<c:url value="${basePath}device/device_records?pageNo=${pageInfo.pageNum==1?pageInfo.pageNum:pageInfo.pageNum-1}"/> ">上一页</a>
                            </li>
                            <!--判断最大页数是否超过X，如果超过X则是X，否则是最大页数。防止分页信息过长 -->
                            <c:forEach begin="1" end="${pageInfo.pages >=  10 ? 10:pageInfo.pages}" step="1"
                                       var="pageNo">
                                <li
                                        <c:if test="${pageInfo.pageNum == pageNo}">
                                            class="active"
                                        </c:if>>
                                    <a href="<c:url value="${basePath}device/device_records?pageNo=${pageNo}"/> ">${pageNo}</a>
                                </li>
                            </c:forEach>
                            <li>
                                <!--如果当前页数是最后一页，那么点击下一页仍然是当前页。 -->
                                <a href="<c:url value="${basePath}device/device_records?pageNo=${pageInfo.pageNum==pageInfo.pages?pageInfo.pageNum:pageInfo.pageNum+1}"/> ">下一页</a>
                            </li>
                            <li
                                    <c:if test="${pageInfo.pageNum==pageInfo.pages}">
                                        class="disabled"
                                    </c:if>>
                                <a href="<c:url value="${basePath}device/device_records?pageNo=${pageInfo.pages}"/> ">»</a>
                            </li>
                        </ul>
                    </div>

                    <div class="modal fade" id="myModal" role="dialog" aria-labelledby="myModalLabel">
                        <div class="alert alert-success" role="alert">上传成功</div>
                    </div>
                    <div class="modal fade" id="myModal_select" role="dialog" aria-labelledby="myModalLabel">
                        <div class="alert alert-warning" role="alert">请先选择文件</div>
                    </div>
                    <div class="modal fade" id="myModal_error" role="dialog" aria-labelledby="myModalLabel">
                        <div class="alert alert-danger" role="alert">上传失败</div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
<script>
    function upload_check() {
        var location = document.getElementById("location");
        if ("" == location.value || null == location.value) {
            $('#myModal_select').modal();
            return false;
        } else {
            var formData = new FormData($('#uploadForm')[0]);
            $.ajax({
                url: '/ota-server/upload/',
                dataType: 'json',
                type: 'POST',
                async: false,
                data: formData,
                processData: false, // 使数据不做处理
                contentType: false, // 不要设置Content-Type请求头
                success: function (data) {
                    //文件上传功能基本已完成 ！！！！ f t
                    console.log(data);
                    if (data.status == 'SUCCESS') {
                        location.value = "";
                        $('#myModal').modal();
                    }
                },
                error: function (response) {
                    $('#myModal_error').modal();
                    console.log(response);
                }
            });
        }

    }

    function exportExcel() {
        // $('#myModal_confirm').modal();
        var form = $("<form>");
        form.attr("style", "display:none");
        form.attr("target", "");
        form.attr("method", "GET");//提交方式为post
        form.attr("action", "/ota-server/writeExcelDeviceRecords");//定义action
        $("body").append(form);
        form.submit();
    }

</script>


</div>
</div>
</body>
</html>
