package com.otaserver.ota_project.user.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * @Author: WangJiaPeng
 * @Date: 2019/9/16 19:41
 * @Version 1.0
 */
@Controller
@RequestMapping("/error")
public class ErrorController {
    private static Logger logger = LoggerFactory.getLogger(ErrorController.class);

    @RequestMapping(value = "/400")
    public String errorRequest(HttpServletRequest request, HttpServletResponse response) {
        logger.info("错误的请求，400");
        return "error/400";
    }

    @RequestMapping(value = "/404")
    public String notFoundPages(HttpServletRequest request, HttpServletResponse response) {
        logger.info("页面未找到，404");
        return "error/404";
    }

    @RequestMapping(value = "/500")
    public String serverError(HttpServletRequest request, HttpServletResponse response) {
        logger.info("服务器未响应，500");
        return "error/500";
    }

    @RequestMapping(value = "/loginIndex")
    public String loginIndex(HttpServletRequest request, Model model) {
        logger.info("服务器未响应，500");
        try {
            String path = request.getContextPath();

            String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";

            System.out.println("basePath：" + basePath);

            model.addAttribute("basePath",basePath);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return "error/index";
    }
}
