<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
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


    <link href="${basePath}css/bootstrap.min.css" rel="stylesheet"/>
    <link rel="shortcut icon" href="${basePath}images/shield.png"/>

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
                        <a class="dropdown-toggle" href="#">
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

            <a class="logo" href="#"><img style="height: 30px;"
                                          src="${basePath}images/anquan.png"></a>

        </div>
        <div class="container-fluid main-nav clearfix">
            <div class="nav-collapse">
                <ul class="nav">
                    <li class="dropdown">
                        <a data-toggle="dropdown" class="current"
                           href="#">
                            <span aria-hidden="true" class="icon-pencil"></span>
                            设备管理 <b class="caret"></b> </a>
                        <ul class="dropdown-menu">
                            <li>
                                <a href="${basePath}list/list_info?pageNo=1">
                                    <i class="icon-anchor "></i>
                                    设备列表</a>
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
                    <li class="active">
                        <i class="icon-home"></i>
                        <a href="#">设备管理</a>
                    </li>
                    <li class="active">
                        设备列表
                    </li>
                </ul>
                <div class="row">
                    <form method="get" action="${basePath}list/queryDeviceNumberInfo" autocomplete="on"
                          id="uploadForm"
                          enctype="multipart/form-data">
                        <div class="col-md-9">
                            <div class="form-group">
                                <div class="col-xs-6 col-sm-4">
                                    <div class="input-group">
                                        <input id='location' class="form-control" onclick="$('#i-file').click();">
                                        <label class="input-group-btn">
                                            <input type="button" id="i-check" value="浏览文件" class="btn btn-primary"
                                                   onclick="$('#i-file').click();">
                                        </label>
                                    </div>
                                    <label class="input-group-btn">
                                        <input type="button" id="btn" value="点我上传"
                                               class="btn btn-primary" onclick="return upload_check()">
                                    </label>
                                    <label class="input-group-btn">
                                        <input type="button" id="btn_export" value="导出数据"
                                               class="btn btn-info" onclick="return exportExcel()">
                                    </label>
                                    <label class="input-group-btn">
                                        <a href="${basePath}list/list_add">
                                            <input type="button" id="btn_add" value="添加数据"
                                                   class="btn btn-info"></a>
                                    </label>
                                </div>
                                <input type="file" name="file" id='i-file' accept=".xls, .xlsx,.txt"
                                       onchange="$('#location').val($('#i-file').val());" style="display: none">
                            </div>

                        </div>
                        <div class="col-md-3">
                            <div class="input-group">
                                <input type="text" name="imei" autocomplete="off" placeholder="请输入完整的IMEI号"
                                       class="form-control"
                                       value="${imei}">
                                <span class="input-group-btn">
                                    <button type="submit" class="btn btn-primary" style="margin-right: 10px">搜索</button>
                                </span>
                                <input type="text" name="pageNo" value="${pageInfo.pageNum}" style="display: none">
                            </div>

                        </div>
                    </form>
                </div>
            </div>
            <div class="widget-content padded clearfix x-scroll">
                <table class="table table-bordered table-striped">
                    <thead>
                    <th>IMEI</th>
                    </thead>
                    <tbody>
                    <c:forEach items="${list}" varStatus="status" var="list">
                        <tr>
                            <td>
                                <a href="#" style="text-decoration: none">
                                    IMEI：${list.imeiNumber}
                                </a>
                                <input type="hidden" value="${list.id}" id="ids">
                                <button type="button" class="btn btn-primary"
                                        id="del"
                                        style="float: right" onclick="del(${list.id})">删除
                                </button>
                                <button type="button" class="btn btn-primary"
                                        onclick="update(${list.id},${list.imeiNumber},${pageInfo.pageNum})"
                                        style="float: right;margin-right: 10px">修改
                                </button>
                            </td>
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
                            <a href="<c:url value="${basePath}list/list_page?pageNo=1"/> ">«</a>
                        </li>
                        <li>
                            <!--如果当前页数是第一页，那么点上一页仍然是当前页。 -->
                            <a href="<c:url value="${basePath}list/list_page?pageNo=${pageInfo.pageNum==1?pageInfo.pageNum:pageInfo.pageNum-1}"/> ">上一页</a>
                        </li>
                        <!--判断最大页数是否超过X，如果超过X则是X，否则是最大页数。防止分页信息过长 -->
                        <c:forEach begin="1" end="${pageInfo.pages > 10 ? 10 : pageInfo.pages}" step="1" var="pageNo">
                            <li
                                    <c:if test="${pageInfo.pageNum == pageNo}">
                                        class="active"
                                    </c:if>>
                                <a href="<c:url value="${basePath}list/list_page?pageNo=${pageNo}"/> ">${pageNo}</a>
                            </li>
                        </c:forEach>
                        <li>
                            <!--如果当前页数是最后一页，那么点击下一页仍然是当前页。 -->
                            <a href="<c:url value="${basePath}list/list_page?pageNo=${pageInfo.pageNum==pageInfo.pages?pageInfo.pageNum:pageInfo.pageNum+1}"/> ">下一页</a>
                        </li>
                        <li
                                <c:if test="${pageInfo.pageNum == pageInfo.pages}">
                                    class="disabled"
                                </c:if>>
                            <a href="<c:url value="${basePath}list/list_page?pageNo=${pageInfo.pages}"/> ">»</a>
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
                <div class="modal fade" id="myModal_del" role="dialog" aria-labelledby="myModalLabel">
                    <div class="alert alert-success" role="alert">删除成功</div>
                </div>
                <div class="modal fade" id="myModal_del_error" role="dialog" aria-labelledby="myModalLabel">
                    <div class="alert alert-danger" role="alert">删除失败</div>
                </div>

                <!-- 模态框   信息删除确认 -->
                <div class="modal fade" id="delcfmOverhaul">
                    <div class="modal-dialog">
                        <div class="modal-content message_align">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal"
                                        aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                                <h4 class="modal-title">提示</h4>
                            </div>
                            <div class="modal-body">
                                <p>您确认要删除该条信息吗？</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default"
                                        data-dismiss="modal">取消
                                </button>
                                <button type="button" class="btn btn-primary"
                                        id="deleteHaulBtn">确认
                                </button>
                            </div>
                        </div>
                        <!-- /.modal-content -->
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
        form.attr("action", "/ota-server/writeExcelDeviceNumber");//定义action
        $("body").append(form);
        form.submit();
    }

    function update(id, imeinumber, index) {
        window.location.href = "${basePath}list/list_edit?imei=" + imeinumber + "&id=" + id + "&pageNo=" + index;
    }

    // 打开询问是否删除的模态框并设置需要删除的大修的ID
    var id;

    function del(val) {
        $('#delcfmOverhaul').modal('show');
        id = val;
    }

    $("#deleteHaulBtn").click(function (event) {
        $('#delcfmOverhaul').modal('hide')
        console.log(event)
        console.log(id)

        $.ajax({
            url: '/ota-server/list/deleteDeviceNumber',
            dataType: 'json',
            type: 'GET',
            async: false,
            data: {id},
            success: function (data) {
                console.log(data);
                if ("SUCCESS" == data.status) {
                    var v = $("#myModal_del").modal();
                    v.click(function () {
                        window.location.href = "${basePath}list/list_page?pageNo=${pageInfo.pageNum}";
                    })
                }
            },
            error: function (response) {
                $("#myModal_del_error").modal();
                console.log(response);
            }
        })

    });
</script>
</div>
</div>
</body>
</html>
