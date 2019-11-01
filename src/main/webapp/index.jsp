<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
    <title>index pages</title>
</head>
<body onload="tologin();">
</body>
    <script type="text/javascript">
        function tologin(){
            var url = "${basePath}user/login";
            window.location.href = url;
        }
    </script>
</html>
