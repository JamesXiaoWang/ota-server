package com.otaserver.ota_project.common.Interceptor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * @Author: WangJiaPeng
 * @Date: 2019/9/16 16:48
 * @Version 1.0
 */
@Component
public class UserLoginInterceptor implements HandlerInterceptor {
    private static Logger logger = LoggerFactory.getLogger(UserLoginInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
                             Object handler)throws Exception {

        HttpSession session = request.getSession(true);
        Object username=session.getAttribute("username");
        if(null != username) {//已登录
            return true;
        }else {//未登录
            //直接重定向到登录页面
            response.sendRedirect(request.getContextPath()+"/user/login.jsp");
            return false;
        }
    }
}
