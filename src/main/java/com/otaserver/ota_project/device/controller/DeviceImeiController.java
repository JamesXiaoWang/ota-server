package com.otaserver.ota_project.device.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.otaserver.ota_project.common.util.JSONResult;
import com.otaserver.ota_project.device.entity.DeviceNumber;
import com.otaserver.ota_project.device.entity.DeviceNumberBind;
import com.otaserver.ota_project.device.entity.Page;
import com.otaserver.ota_project.device.service.DeviceNumberBindService;
import com.otaserver.ota_project.device.service.DeviceNumberService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.sound.midi.Soundbank;
import java.util.List;

/**
 * @Author: WangJiaPeng
 * @Date: 2019/10/15 20:23
 * @Version 1.0
 */
@Controller
@RequestMapping("/list")
public class DeviceImeiController {
    private static Logger logger = LoggerFactory.getLogger(DeviceImeiController.class);

    @Autowired
    DeviceNumberService imeiService;


    @RequestMapping("/list")
    public String list(HttpServletRequest request, Model model) {
        List<DeviceNumber> list = imeiService.queryDeviceNumberAll();

        System.out.println("list：" + list.size());

        model.addAttribute("list", list);

        return "list/list";
    }

    @RequestMapping("/list_page")
    public String list_page(HttpServletRequest request, Model model) {
        String str_pageNo = request.getParameter("pageNo");

        if(str_pageNo == null || str_pageNo == ""){
            //开始使用分页插件，准备查询第一页的8条数据
            PageHelper.startPage(1, 10);
        } else {
            //准备查询 第X页 的8条数据
            PageHelper.startPage(Integer.parseInt(str_pageNo), 10);
        }
        //获取分页数据
        List<DeviceNumber> list = imeiService.queryDeviceNumberInfoByPages();

        //将查询结果放入分页控件中
        PageInfo<DeviceNumber> pageInfo = new PageInfo<>(list);

        model.addAttribute("list", list);

        model.addAttribute("pageInfo", pageInfo);

        return "list/list_page";
    }

    @RequestMapping("/queryDeviceNumberInfo")
    public String queryDeviceNumberInfo(String imei, String pageNo, Model model) {
        logger.info("queryDeviceNumberInfo imei：" + imei + "\t" + pageNo);
        if ("".equals(imei)) {
            if(pageNo == null || pageNo == ""){
                //开始使用分页插件，准备查询第一页的8条数据
                PageHelper.startPage(1, 10);
            } else {
                //准备查询 第X页 的8条数据
                PageHelper.startPage(Integer.parseInt(pageNo), 10);
            }
            //获取分页数据
            List<DeviceNumber> list = imeiService.queryDeviceNumberInfoByPages();

            //将查询结果放入分页控件中
            PageInfo<DeviceNumber> pageInfo = new PageInfo<>(list);

            model.addAttribute("list", list);

            model.addAttribute("pageInfo", pageInfo);

            return "list/list_page";
        }
        //获取数据
        List<DeviceNumber> list = imeiService.queryDeviceNumberByParams(imei);

        if (0 == list.size()) {
            model.addAttribute("list", "");

            return "list/list_page";
        }

        //将查询结果放入分页控件中
        PageInfo<DeviceNumber> pageInfo = new PageInfo<>(list);

        model.addAttribute("list", list);

        model.addAttribute("pageInfo", pageInfo);

        model.addAttribute("imei", imei);

        return "list/list_page";
    }

    @RequestMapping("/list_edit")
    public String list_edit(HttpServletRequest request, Model model) {
        System.out.println("要修改的imei："+request.getParameter("imei"));

        model.addAttribute("id", request.getParameter("id"));

        model.addAttribute("IMEI", request.getParameter("imei"));

        model.addAttribute("pageNo", request.getParameter("pageNo"));

        return "list/list_edit";
    }
    @RequestMapping("/list_add")
    public String list_add(HttpServletRequest request, Model model) {
        return "list/list_add";
    }


    @PostMapping("/updateDeviceNumber")
    public String  updateDeviceNumber(DeviceNumber deviceNumber,String pageNo,Model model) {
        logger.info("修改设备IMEI号id：" + deviceNumber.getId() + "\t" + "IMEI：" + deviceNumber.getImeiNumber());

        System.out.println("pageNo："+pageNo);

        int count = imeiService.updateDeviceNumber(deviceNumber);

        logger.info("count："+count);

        if (0 == count) {
            model.addAttribute("IMEI",deviceNumber.getImeiNumber());
            return "list/list_edit";
        }
        if(pageNo == null || pageNo == ""){
            //开始使用分页插件，准备查询第一页的8条数据
            PageHelper.startPage(1, 10);
        } else {
            //准备查询 第X页 的8条数据
            PageHelper.startPage(Integer.parseInt(pageNo), 10);
        }
        //获取分页数据
        List<DeviceNumber> list = imeiService.queryDeviceNumberInfoByPages();

        PageInfo<DeviceNumber> pageInfo = new PageInfo<>(list);

        pageInfo.setPageNum(Integer.parseInt(pageNo));

        model.addAttribute("list", list);

        model.addAttribute("pageInfo", pageInfo);

        return "list/list_page";
    }

    @RequestMapping("/deleteDeviceNumber")
    @ResponseBody
    public JSONResult deleteDeviceNumber(String id) {
        logger.info("删除设备IMEI号id：" + id);

        int count = imeiService.deleteDeviceNumber(id);

        logger.info("count："+count);

        if (0 == count) {
            return new JSONResult(200, "ERROR", "delete error", "");
        }

        return new JSONResult(200, "SUCCESS", "delete success", "");
    }
    @RequestMapping("/deviceNumberCheck")
    @ResponseBody
    public JSONResult deviceNumberCheck(String number) {
        System.out.println("有没有数据："+number);
        List<DeviceNumber> deviceNumber =  imeiService.queryDeviceNumberByParams(number);
        System.out.println("query："+deviceNumber.size());
        if (deviceNumber.size() > 0) {
            return new JSONResult(200, "ERROR", "Already exist", "");
        }

        return new JSONResult(200, "SUCCESS", "success", "");
    }
    @PostMapping("/addDeviceNumber")
    public String addDeviceNumber(DeviceNumber deviceNumber,String pageNo,Model model) {
        System.out.println("addDeviceNumber 有没有数据："+deviceNumber.getImeiNumber()+"\tpageNo："+pageNo);

        int count = imeiService.insertDeviceNumber(deviceNumber);

        logger.info("count："+count);

        if (0 == count) {
            return "list/list_add";
        }
        if(pageNo == null || pageNo == ""){
            //开始使用分页插件，准备查询第一页的8条数据
            PageHelper.startPage(1, 10);
        } else {
            //准备查询 第X页 的8条数据
            PageHelper.startPage(Integer.parseInt(pageNo), 10);
        }
        List<DeviceNumber> list = imeiService.queryDeviceNumberInfoByPages();

        PageInfo<DeviceNumber> pageInfo = new PageInfo<>(list);

        model.addAttribute("list", list);

        model.addAttribute("pageInfo", pageInfo);

        return "list/list_page";
    }
}
