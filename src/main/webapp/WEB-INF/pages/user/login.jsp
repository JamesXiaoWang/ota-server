<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
    <title>登录</title>
    <link rel="stylesheet" href="${basePath}css/signin.css">
    <!-- Bootstrap core CSS -->
    <link href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <script type="text/javascript" src="${basePath}js/jquery-2.1.4.min.js"></script>
</head>
<body>
<div class="container">
    <form class="form-signin" action="${basePath}user/loginMethod" method="post">
        <h2 class="form-signin-heading">OTA后台管理系统</h2>
        <label for="inputUsername" class="sr-only">Username</label>
        <input type="text" id="inputUsername" class="form-control" name="username" placeholder="User name" required autofocus>
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" class="form-control" name="password" placeholder="Password" required>
        <div class="checkbox">
            <label>
                <input type="checkbox" value="remember-me"> Remember me
            </label>
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit" id="btn">Sign in</button>
    </form>
</div>
<script>
    <%--$(function () {--%>
        <%--$("#btn").click(function () {--%>
            <%--var name = $("input[name='username']").val();--%>
            <%--var pwd = $("input[name='password']").val();--%>
            <%--if (name.length == 0 || name == ""){--%>
                <%--console.log("name 不能为空呦")--%>
                <%--this.focus();--%>
            <%--}else if (pwd.length == 0 || pwd == ""){--%>
                <%--console.log("pwd 不能为空呦")--%>
                <%--this.focus();--%>
            <%--}else {--%>
                <%--&lt;%&ndash;$.post("${basePath}user/login", {&ndash;%&gt;--%>
                        <%--&lt;%&ndash;"name": name,&ndash;%&gt;--%>
                        <%--&lt;%&ndash;"pwd": pwd&ndash;%&gt;--%>
                    <%--&lt;%&ndash;},&ndash;%&gt;--%>
                    <%--&lt;%&ndash;function(result) {&ndash;%&gt;--%>
                        <%--&lt;%&ndash;window.location.href="/wechatserver/wifi/testAudio"+'?deviceId='+name+"_"+pwd;&ndash;%&gt;--%>
                    <%--&lt;%&ndash;},&ndash;%&gt;--%>
                    <%--&lt;%&ndash;'text');&ndash;%&gt;--%>
                <%--var url = "${basePath}user/loginMethod?username="+name+"&password="+pwd;--%>
                <%--window.location.href = url;--%>
            <%--}--%>

        <%--})--%>
    <%--})--%>
</script>
</body>
</html>
