package com.otaserver.ota_project.common.filter;

import org.apache.catalina.manager.util.SessionUtils;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


/**
 * @Author: WangJiaPeng
 * @Date: 2019/9/16 9:34
 * @Version 1.0
 */
@WebFilter(filterName="myFilter",urlPatterns="/*")
public class MyFilter implements Filter {
    //标示符：表示当前用户未登录(可改为json样式：如下方我使用的是map)
    String NO_LOGIN = "403";

    Map<String, Object> rtnMap = new HashMap<String, Object>();

    //免登录就可访问的路径(比如:注册,登录,注册页面上的一些获取数据等)
    String[] includeUrls = new String[]{"/ota-server/user/","/ota-server/error/loginIndex","/ota-server/user/login"};


    @Override
    public void init(FilterConfig arg0) throws ServletException {
        System.out.println("MyFilter init............");
    }
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
            throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        HttpSession session = request.getSession(false);
        //当前请求的url
        String uri = request.getRequestURI();

        System.out.println("filter url:"+uri);
        //判断url是否需要过滤
        boolean needFilter = isNeedFilter(uri);
        if (!needFilter) { //不需要过滤直接传给下一个过滤器
            filterChain.doFilter(servletRequest, servletResponse);
        } else { //需要过滤器
            // session中包含user对象,则是登录状态
            if(null != session){
                filterChain.doFilter(request, response);
            }else{
//                rtnMap.put("code", 403);
//                rtnMap.put("errMsg", "您还未登录,请先登录！！！");
//                response.setContentType("text/html; charset=utf-8");
//                response.getWriter().write("<div align='center'><h3>"+rtnMap.toString()+"</h3></div>");
                response.sendRedirect(request.getContextPath()+"/error/loginIndex");
            }
        }
    }
    public boolean isNeedFilter(String uri) {

        for (String includeUrl : includeUrls) {
            if(includeUrl.equals(uri)) {
                return false;
            }
        }

        return true;
    }

    @Override
    public void destroy() {
        System.out.println("MyFilter destroy..........");
    }
}
