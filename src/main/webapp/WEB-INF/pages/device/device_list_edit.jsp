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

    <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap3-dialog/1.34.7/css/bootstrap-dialog.min.css"
          rel="stylesheet">
    <!-- 基础类库 -->
    <script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js" type="text/javascript"></script>
    <script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js" type="text/javascript"></script>
    <script src="http://cdn.datatables.net/1.10.15/js/jquery.dataTables.min.js" type="text/javascript"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap3-dialog/1.34.7/js/bootstrap-dialog.min.js"
            type="text/javascript"></script>

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
                            设备管理 </a>
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
                        修改设备的IMEI号
                    </li>
                </ul>
                <form class="FormAjax form-horizontal" id="form" autocomplete="off" method="post"
                      action="${basePath}device/updateDeviceNumber">

                    <div class="form-group">
                        <label for="imeiNumber" class="control-label col-md-3">设备唯一标识<span
                                class="w6 red">*</span></label>
                        <div class="col-md-6">
                            <input type="text" autocomplete="off" placeholder="请输入设备唯一标识" id="imeiNumber"
                                   name="imeiNumber"
                                   value="${IMEI}"
                                   class="form-control CascadeAjaxCd">
                        </div>
                        <%--<div class="col-md-3" for="imei">--%>
                        <%--<label for="imeiNumber" class="error" style="display: none;"></label>--%>
                        <%--</div>--%>
                    </div>

                    <div class="form-group">
                        <label class="control-label col-md-3"></label>
                        <div class="col-md-6">
                            <span style="color:#f00;">例：IMEI:861477033921808，IMEI号长度必须到达15位</span>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="control-label col-md-3"></label>
                        <div class="col-md-6">
                            <button type="submit" class="btn btn-primary fl" id="btn" onclick="return isCheck()">修改
                            </button>
                            <button type="button" onclick="javascript:history.go(-1);" class="btn btn-primary fl ml10">
                                返回
                            </button>
                        </div>
                    </div>

                    <input type="text" id="pageNo" name="pageNo" value="${pageNo}" style="display: none">
                    <input id="id" name="id" style="display: none" value="${id}">
                </form>
                <div class="modal fade" tabindex="-1" id="myModal_confirm" role="dialog"
                     aria-labelledby="gridSystemModalLabel">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                        aria-hidden="true">&times;</span></button>
                                <h4 class="modal-title" id="gridSystemModalLabel"><strong>修改操作</strong></h4>
                            </div>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-md-4 col-md-offset-4" style="margin-top: 80px"><h4>
                                        <strong>确认要修改吗？</strong></h4></div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                                <button type="button" class="btn btn-primary">确认</button>
                            </div>
                        </div><!-- /.modal-content -->
                    </div><!-- /.modal-dialog -->
                </div><!-- /.modal -->
                <div class="modal fade" id="myModal" role="dialog" aria-labelledby="myModalLabel">
                    <div class="alert alert-success" role="alert">修改成功</div>
                </div>
                <div class="modal fade" id="myModal_error" role="dialog" aria-labelledby="myModalLabel">
                    <div class="alert alert-danger" role="alert">修改失败</div>
                </div>

            </div>
        </div>
    </div>
</div>
</body>
<script>
    function isCheck() {
        var id = $("#id").val();
        var pageNo = $("#pageNo").val();
        var number = $("#imeiNumber").val();
        if ("" == number || null == number) {
            $("#txt-isnull").show();
            var dialog = new BootstrapDialog.show({
                title: '操作提示',
                message: 'IMEI号不能为空！'
            });
            dialog.getModalBody().css('color', 'red');
            return false;
        } else if (number.length < 15) {
            var dialog = new BootstrapDialog.show({
                title: '操作提示',
                message: 'IMEI号的长度不能小于15位！'
            });
            dialog.getModalBody().css('color', 'red');
            return false;
        } else if (number.length > 15) {
            var dialog = new BootstrapDialog.show({
                title: '操作提示',
                message: 'IMEI号的长度不能大于15位！'
            });
            dialog.getModalBody().css('color', 'red');
            return false;
        } else if (!(/^[0-9]+$/.test(number))) {
            var dialog = new BootstrapDialog.show({
                title: '操作提示',
                message: 'IMEI号只能是数字，不能含有特殊字符'
            });
            dialog.getModalBody().css('color', 'red');
            return false;
        } else {
            var result = false;
            $.ajax({
                url: '/ota-server/device/deviceNumberCheck',
                dataType: 'json',
                type: 'GET',
                async: false,
                data: {number},
                success: function (data) {
                    console.log(data);
                    if ("ERROR" == data.status) {
                        var dialog = new BootstrapDialog.show({
                            title: '操作提示',
                            message: '已存在相同的IMEI号'
                        });
                        dialog.getModalBody().css('color', 'red');
                        result = false;
                    } else {
                        result = true;
                    }
                },
                error: function (response) {
                    console.log(response);
                    $("#myModal_error").modal('show');
                    return false;
                }
            })
            console.log(result)
            return result;
            // $.ajax({
            //     url: '/ota-server/list/updateDeviceNumber',
            //     dataType: 'json',
            //     type: 'GET',
            //     async: false,
            //     data: {id, number},
            //     success: function (data) {
            //         console.log(data);
            //         if ("SUCCESS" == data.status) {
            //             var v = $('#myModal').modal();
            //             v.click(function () {
            //                 href(pageNo)
            //             })
            //         }
            //     },
            //     error: function (response) {
            //         $('#myModal_error').modal();
            //         console.log(response);
            //     }
            // })
        }
    }

    function href(pageNo) {
        window.location.href = "${basePath}list/list_page?pageNo=" + pageNo
    }
</script>
</html>
