<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>OTA 后台管理系统</title>
    <style type="text/css">
        body{
            font-family: "微软雅黑";
        }
        .success{
            width: 99%;
            position: absolute;
            top: 50%;
            margin-top: -244px;
        }
        .success div{
            text-align: center;
            margin: 10px auto;
        }
        .success-bd{
            font-size: 36px;
            letter-spacing: 8px;
            padding-left: 30px;
        }
        .success-ft{
            font-size: 14px;
            letter-spacing: 2px;
            padding-left: 10px;
        }

        a.col_blue{
            color: #157ff9;
        }

    </style>
</head>
<body>

<div class="success">

    <div class="success-title">
        <img src="${basePath}images/sigh.jpg" width="250px" height="250px"/>
    </div>

    <div class="success-bd">
        您还未登录，请先登录			</div>

    <div class="success-ft">

        <a class="col_blue" id="href" href="${basePath}user/login">页面自动跳转</a> 等待时间：<span id="wait" class="time">5</span>

    </div>

</div>

<script type="text/javascript">

    (function(){

        var wait = document.getElementById('wait')
        var href = document.getElementById('href').href;

        var interval = setInterval(function(){

            var time = --wait.innerHTML;

            if(time <= 0) {

                location.href = href;

                clearInterval(interval);

            };

        }, 1000);

    })();

</script>
</body>
</html>
