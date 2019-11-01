package com.otaserver.ota_project.device.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.otaserver.ota_project.common.util.JSONResult;
import com.otaserver.ota_project.device.entity.DeviceNumber;
import com.otaserver.ota_project.device.entity.DeviceNumberBind;
import com.otaserver.ota_project.device.service.DeviceNumberBindService;
import com.otaserver.ota_project.device.service.DeviceNumberService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * @Author: WangJiaPeng
 * @Date: 2019/10/21 15:21
 * @Version 1.0
 */
@Controller
@RequestMapping("/device")
public class DeviceBindController {
    private static Logger logger = LoggerFactory.getLogger(DeviceBindController.class);

    @Autowired
    DeviceNumberBindService bindService;

    @Autowired
    DeviceNumberService deviceNumberService;

    @RequestMapping("/device_bind_list")
    public String device_bind_list(HttpServletRequest request,Model model) {
        String str_pageNo = request.getParameter("pageNo");

        System.out.println("pageNo："+str_pageNo);

        if(str_pageNo == null){
            //开始使用分页插件，准备查询第一页的8条数据
            PageHelper.startPage(1, 10);
        } else{
            //准备查询 第X页 的8条数据
            PageHelper.startPage(Integer.parseInt(str_pageNo), 10);
        }

        List<DeviceNumberBind> deviceNumberBinds = bindService.queryAllDeviceBindInfo();


        PageInfo<DeviceNumberBind> pageInfo = new PageInfo<>(deviceNumberBinds);


        model.addAttribute("list", deviceNumberBinds);

        model.addAttribute("index", str_pageNo);

        model.addAttribute("pageInfo", pageInfo);

        return "bind/device_bind_list";
    }
    @RequestMapping("/queryDeviceBindInfo")
    public String queryDeviceBindInfo(String imei, Model model) {
        logger.info("查询设备IMEI号id：IMEI：" + imei);
        if ("".equals(imei)) {
            PageHelper.startPage(1,10);
            List<DeviceNumberBind> list = bindService.queryAllDeviceBindInfo();

            model.addAttribute("list", list);
            return "bind/device_bind_list";
        }
        List<DeviceNumberBind> list = bindService.queryDeviceBindInfoByParams(imei);

        if (0 == list.size()) {
            model.addAttribute("list", "");
            return "bind/device_bind_list";
        }
        model.addAttribute("imei",imei);
        model.addAttribute("list", list);

        return "bind/device_bind_list";
    }
    @RequestMapping("/device_bind_edit")
    public String device_bind_edit(HttpServletRequest request, Model model) {
        System.out.println("要修改的imei："+request.getParameter("imei"));

        model.addAttribute("id", request.getParameter("id"));

        model.addAttribute("IMEI", request.getParameter("imei"));

        model.addAttribute("deviceId",request.getParameter("deviceId"));

        model.addAttribute("index", request.getParameter("pageNo"));

        return "bind/device_bind_edit";
    }
    @RequestMapping("/deviceBindInfoCheck")
    @ResponseBody
    public JSONResult deviceBindInfoCheck(String number) {
        System.out.println("有没有数据："+number);
        List<DeviceNumberBind> bindList =  bindService.queryDeviceBindInfoByParams(number);
        System.out.println("query："+bindList.size());
        List<DeviceNumber> deviceNumberList =  deviceNumberService.queryDeviceNumberByParams(number);
        System.out.println("deviceNumberList："+deviceNumberList.size());
        if (0 == deviceNumberList.size()){
            return new JSONResult(404, "ERROR", "this imei number not exists", "");
        }
        if (bindList.size() > 0) {
            return new JSONResult(300, "ERROR", "Already exist", "");
        }

        return new JSONResult(200, "SUCCESS", "success", "");
    }

    @PostMapping("/updateDeviceBindInfo")
    public String  updateDeviceBindInfo(DeviceNumberBind deviceNumberBind,String pageNo,String did,Model model) {
        logger.info("修改设备IMEI号deviceId：" + deviceNumberBind.getDeviceId()+ "\t" + "IMEI：" + deviceNumberBind.getImeiNumber());

        int count = bindService.updateDeviceBindInfo(deviceNumberBind);

        logger.info("count："+count);

        if (0 == count) {
            model.addAttribute("IMEI",deviceNumberBind.getImeiNumber());
            model.addAttribute("deviceId",deviceNumberBind.getDeviceId());
            return "bind/device_bind_edit";
        }
        if(pageNo == null || pageNo == ""){
            //开始使用分页插件，准备查询第一页的8条数据
            PageHelper.startPage(1, 10);
        } else{
            //准备查询 第X页 的8条数据
            PageHelper.startPage(Integer.parseInt(pageNo), 10);
        }

        List<DeviceNumberBind> deviceNumberBinds = bindService.queryAllDeviceBindInfo();


        PageInfo<DeviceNumberBind> pageInfo = new PageInfo<>(deviceNumberBinds);


        model.addAttribute("list", deviceNumberBinds);

        model.addAttribute("index", pageNo);

        model.addAttribute("pageInfo", pageInfo);

        return "bind/device_bind_list";
    }

    @RequestMapping("/deleteDeviceBindInfo")
    @ResponseBody
    public JSONResult deleteDeviceBindInfo(String id) {
        logger.info("解绑设备id：" + id);

        int count = bindService.updateDeviceBindStatus(id);

        logger.info("count："+count);

        if (0 == count) {
            return new JSONResult(200, "ERROR", "delete error", "");
        }

        return new JSONResult(200, "SUCCESS", "delete success", "");
    }

}
