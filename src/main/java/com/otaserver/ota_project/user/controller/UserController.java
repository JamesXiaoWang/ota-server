package com.otaserver.ota_project.user.controller;

import com.otaserver.ota_project.common.encrypt.EncryptUtils;
import com.otaserver.ota_project.common.util.Utils;
import com.otaserver.ota_project.device.entity.DeviceNumber;
import com.otaserver.ota_project.device.service.DeviceRecordsService;
import com.otaserver.ota_project.device.service.DeviceNumberService;
import com.otaserver.ota_project.user.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

/**
 * @Author: WangJiaPeng
 * @Date: 2019/8/8 12:22
 * @Version 1.0
 */
@Controller
@RequestMapping("/user")
public class UserController {
    private static Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    UserService userService;

    @Autowired
    DeviceRecordsService deviceRecordsService;

    @Autowired
    DeviceNumberService imeiService;

    @RequestMapping("/loginMethod")
    public String loginMethod(String username, String password, HttpServletRequest request,Model model) throws NoSuchAlgorithmException, UnsupportedEncodingException {
        logger.info("登录方法，username：{" + username + "}\t" +"password：{" + password + "}");
        int count = deviceRecordsService.queryDeviceAccumulation();
        int capacity = deviceRecordsService.queryDailyLivingCapacity(0);
        int newIncrements = deviceRecordsService.queryNewIncrements(0);
        if (Utils.isObjNull(username) || Utils.isObjNull(password)){
            HttpSession session = request.getSession(false);

            if (session.getAttribute("username") != null){
                session.setAttribute("username", session.getAttribute("username"));

                session.setAttribute("count", count);

                session.setAttribute("capacity", capacity);

                session.setAttribute("newIncrements", newIncrements);

                return "home/product";
            }else {
                return "/user/login";
            }
        }
        HttpSession session = request.getSession(true);

        session.setAttribute("username", username);

        session.setAttribute("count", count);

        session.setAttribute("capacity", capacity);

        session.setAttribute("newIncrements", newIncrements);

        //将用户传进来的密码进行加密
        String digestPassword = EncryptUtils.md5Digest(password);

        //验证，用户名和密码是否正确
        int isRet = userService.getUserLogin(username, digestPassword);
        if (1 == isRet && username.equals("ad")){
            List<DeviceNumber> list =  imeiService.queryDeviceNumberAll();
            model.addAttribute("list",list);
            return "list/list_home";
        }
       logger.info("isRet："+isRet);
        if (isRet < 1) {
            logger.info("登录失败：isRet="+isRet);
            return "/user/login";
        }
        logger.info("登录成功：isRet="+isRet);
        return "home/product";
    }

    @RequestMapping(value = "/login")
    public String login(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("跳转");
        try {
            String path = request.getContextPath();

            String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";

            System.out.println("basePath：" + basePath);

            HttpSession session = request.getSession();

            session.setMaxInactiveInterval(30 * 60);

            session.setAttribute("basePath", basePath);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return "user/login";
    }
    @RequestMapping(value = "/loginOut")
    public String loginOut(HttpServletRequest request, HttpServletResponse response) {
        logger.info("用户退出登录");
        try {
            HttpSession session = request.getSession(false);

            session.setAttribute("username",null);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "user/login";
    }
    @RequestMapping(value = "/")
    public String loginUp(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("跳转");
        try {
            String path = request.getContextPath();

            String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";

            System.out.println("basePath：" + basePath);

            HttpSession session = request.getSession();

            session.setAttribute("basePath", basePath);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return "user/login";
    }
}
