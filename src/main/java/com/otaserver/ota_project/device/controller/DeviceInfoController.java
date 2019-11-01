package com.otaserver.ota_project.device.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.otaserver.ota_project.common.util.JSONResult;
import com.otaserver.ota_project.device.entity.DeviceNumber;
import com.otaserver.ota_project.device.entity.DeviceRecords;
import com.otaserver.ota_project.device.entity.Page;
import com.otaserver.ota_project.device.service.DeviceNumberBindService;
import com.otaserver.ota_project.device.service.DeviceNumberService;
import com.otaserver.ota_project.device.service.DeviceRecordsService;
import net.sf.oval.guard.Post;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * @Author: WangJiaPeng
 * @Date: 2019/10/19 14:14
 * @Version 1.0
 */
@Controller
@RequestMapping("/device")
public class DeviceInfoController {
    private static Logger logger = LoggerFactory.getLogger(DeviceInfoController.class);

    @Autowired
    DeviceNumberService imeiService;

    @Autowired
    DeviceNumberBindService bindService;

    @Autowired
    DeviceRecordsService deviceRecordsService;

    @RequestMapping("/device_list")
    public String device_list(HttpServletRequest request, Model model) {
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

        return "device/device_list";
    }

    @RequestMapping("/device_records")
    public String device_records(HttpServletRequest request,Model model) {
        String str_pageNo = request.getParameter("pageNo");

        System.out.println("pageNo："+str_pageNo);

        if(str_pageNo == null){
            //开始使用分页插件，准备查询第一页的8条数据
            PageHelper.startPage(1, 10);
        } else{
            //准备查询 第X页 的8条数据
            PageHelper.startPage(Integer.parseInt(str_pageNo), 10);
        }

        List<DeviceRecords> deviceRecordsList = deviceRecordsService.queryDeviceRecordsPage();


        PageInfo<DeviceRecords> pageInfo = new PageInfo<>(deviceRecordsList);


        model.addAttribute("list", deviceRecordsList);

        model.addAttribute("pageInfo", pageInfo);

        return "records/device_records";
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

            return "device/device_list";
        }
        List<DeviceNumber> list = imeiService.queryDeviceNumberByParams(imei);

        System.out.println("查询："+list.size());

        if (0 == list.size()) {
            model.addAttribute("list", "");
            return "device/device_list";
        }

        PageInfo<DeviceNumber> pageInfo = new PageInfo<>(list);

        model.addAttribute("imei", imei);

        model.addAttribute("list", list);

        model.addAttribute("pageInfo", pageInfo);

        return "device/device_list";
    }

    @RequestMapping("/device_list_edit")
    public String device_list_edit(HttpServletRequest request, Model model) {
        model.addAttribute("id", request.getParameter("id"));

        model.addAttribute("IMEI", request.getParameter("imei"));

        model.addAttribute("pageNo", request.getParameter("pageNo"));

        return "device/device_list_edit";
    }
    @RequestMapping("/device_list_add")
    public String device_list_add(HttpServletRequest request, Model model) {
        return "device/device_list_add";
    }


    @PostMapping("/updateDeviceNumber")
    public String  updateDeviceNumber(DeviceNumber deviceNumber,String pageNo,Model model) {
        logger.info("修改设备IMEI号id：" + deviceNumber.getId() + "\t" + "IMEI：" + deviceNumber.getImeiNumber());

        int count = imeiService.updateDeviceNumber(deviceNumber);

        logger.info("count："+count);

        if (0 == count) {
            model.addAttribute("IMEI",deviceNumber.getImeiNumber());
            return "device/device_list_edit";
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

        //将查询结果放入分页控件中
        PageInfo<DeviceNumber> pageInfo = new PageInfo<>(list);

        pageInfo.setPageNum(Integer.parseInt(pageNo));

        model.addAttribute("list", list);

        model.addAttribute("pageInfo", pageInfo);

        return "device/device_list";
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
            return "device/device_list_add";
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

        //将查询结果放入分页控件中
        PageInfo<DeviceNumber> pageInfo = new PageInfo<>(list);

        model.addAttribute("list", list);

        model.addAttribute("pageInfo", pageInfo);

        return "device/device_list";
    }
}
