package com.otaserver.ota_project.device.controller;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.Page;
import com.otaserver.ota_project.common.util.JSONResult;
import com.otaserver.ota_project.common.util.Utils;
import com.otaserver.ota_project.device.entity.Device;
import com.otaserver.ota_project.device.service.DeviceModelService;
import com.otaserver.ota_project.device.service.DeviceRecordsService;
import com.otaserver.ota_project.device.service.DeviceService;
import com.otaserver.ota_project.device.service.DeviceVersionService;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.NumberFormat;
import java.util.*;

/**
 * @Author: WangJiaPeng
 * @Date: 2019/9/5 10:11
 * @Version 1.0
 */
@Controller
@RequestMapping("/model")
public class DeviceModelController {

    private static Logger logger = LoggerFactory.getLogger(DeviceModelController.class);

    @Autowired
    DeviceService deviceService;

    @Autowired
    DeviceModelService deviceModelService;

    @Autowired
    DeviceRecordsService deviceRecordsService;

    @Autowired
    DeviceVersionService deviceVersionService;

    @RequestMapping("/model_statistics")
    public String model_statistics(HttpServletRequest request, Model model) {
        List<Device> list = deviceModelService.getDeviceClientId();

        model.addAttribute("listModel", list);

        return "/home/model_statistics";
    }
    @RequestMapping("/model_details")
    public String model_details(HttpServletRequest request, Model model) {
        List<Device> listModel = deviceVersionService.getDeviceModelAndClientId();

        List<Device> listBrand = deviceVersionService.getDeviceClientId();

        model.addAttribute("model",request.getParameter("model"));

        model.addAttribute("listModel", listModel);

        model.addAttribute("listBrand", listBrand);

        return "home/model_details";
    }

    @RequestMapping("/model_statistics_ajax")
    @ResponseBody
    public JSONResult model_statistics_ajax(HttpServletRequest request) {
       logger.info("model_statistics_ajax>>>>>>" + request.getParameter("brand"));
        String model = "", brand = "", version = "", time_horizon1 = "", time_group1 = "", statistics_type1 = "";

        if (!Utils.isObjNull(request)) {
            model = !Utils.isObjNull(request.getParameter("model")) ? request.getParameter("model").trim() : "";
            brand = !Utils.isObjNull(request.getParameter("brand")) ? request.getParameter("brand").trim() : "";
            version = !Utils.isObjNull(request.getParameter("version")) ? request.getParameter("version").trim() : "";
            time_horizon1 = !Utils.isObjNull(request.getParameter("time_horizon1")) ? request.getParameter("time_horizon1").trim() : "";
            time_group1 = !Utils.isObjNull(request.getParameter("time_group1")) ? request.getParameter("time_group1").trim() : "";
            statistics_type1 = !Utils.isObjNull(request.getParameter("statistics_type1")) ? request.getParameter("statistics_type1").trim() : "";
        } else {
            return new JSONResult(200, "ERROR", "The parameter value is empty！", "");
        }
        JSONObject jsonResult = null;
        Map<String, Object> hashMap = new HashMap<>();
        List<String> x = new ArrayList<>();
        List<Map> mapsTable = new ArrayList<>();
        List<Map> mapsY = new ArrayList<>();
        List<Map> mapsList = new ArrayList<>();
        List<Integer> y = new ArrayList<>();
        int days = 7;
        if ("2".equals(time_horizon1)) {
            days = 31;
        } else if ("3".equals(time_horizon1)) {
            days = 365;
        }
        if ("0".equals(brand)) {
            brand = "";
        }
//        System.out.println("pageNo："+pageNo);
//        int pageSum = 0;
//        if (pageNo != null) {
//            pageSum = (Integer.parseInt(pageNo) - 1) * 10;
//
//            System.out.println("pageSum：" + pageSum);
//        }
        //机型概括
        List<Device> modelSummarize = deviceModelService.getModelSummarize(days, brand);

        if ("1".equals(statistics_type1)) {
            logger.info("日活量>>>>>>" + days);
            //机型统计
            List<Device> deviceList = deviceModelService.getModelStatisticsByDaysCapacity(days, brand);
            for (int j = 0; j < modelSummarize.size(); j++) {

                Map<String, Object> map = new HashMap<>();

                map.put("name", modelSummarize.get(j).getClientId() + "(" + modelSummarize.get(j).getProjectId() + ")");

                map.put("data", y);

                mapsY.add(map);
            }
            for (int i = 0; i < deviceList.size(); i++) {
                x.add(deviceList.get(i).getDays());

                y.add(deviceList.get(i).getCount());

                Map<String, Object> map_table = new HashMap<>();

                map_table.put("total", deviceList.get(i).getCount());

                //昨日日活量
                int capacityCount = deviceService.queryDailyLivingCapacityByVersion(1, deviceList.get(i).getVersion());
                //昨日新增量
                int newCount = deviceService.queryNewIncrementsByVersion(1, deviceList.get(i).getVersion());

                map_table.put("new", newCount);

                map_table.put("count", capacityCount);

                map_table.put("brand", deviceList.get(i).getClientId());

                map_table.put("model", deviceList.get(i).getProjectId());

                map_table.put("version", null);

                String percentage = "";
                if (0 != newCount && 0 != capacityCount) {
                    percentage = getPercent(newCount, capacityCount);
                    map_table.put("percentage", percentage + '%');
                } else {
                    percentage = "-";

                    map_table.put("percentage", percentage);
                }

                mapsTable.add(map_table);
            }

        } else if ("2".equals(statistics_type1)) {
            logger.info("新增量>>>>>>" + days);
            if ("1".equals(time_group1)) {
                //机型统计
                List<Device> deviceList = deviceModelService.getModelStatisticsByDaysNewIncrement(days, brand);

                for (int j = 0; j < modelSummarize.size(); j++) {

                    Map<String, Object> map = new HashMap<>();

                    map.put("name", modelSummarize.get(j).getClientId() + "(" + modelSummarize.get(j).getProjectId() + ")");

                    map.put("data", y);

                    mapsY.add(map);
                }
                for (int i = 0; i < deviceList.size(); i++) {
                    x.add(deviceList.get(i).getDays());

                    y.add(deviceList.get(i).getCount());

                    Map<String, Object> map_table = new HashMap<>();

                    map_table.put("total", deviceList.get(i).getCount());

                    //昨日日活量
                    int capacityCount = deviceService.queryDailyLivingCapacityByVersion(1, deviceList.get(i).getVersion());
                    //昨日新增量
                    int newCount = deviceService.queryNewIncrementsByVersion(1, deviceList.get(i).getVersion());

                    map_table.put("new", newCount);

                    map_table.put("count", capacityCount);

                    map_table.put("brand", deviceList.get(i).getClientId());

                    map_table.put("model", deviceList.get(i).getProjectId());

                    map_table.put("version", null);

                    String percentage = "";
                    if (0 != newCount && 0 != capacityCount) {
                        percentage = getPercent(newCount, capacityCount);
                        map_table.put("percentage", percentage + '%');
                    } else {
                        percentage = "-";

                        map_table.put("percentage", percentage);
                    }

                    mapsTable.add(map_table);
                }

            } else if ("2".equals(time_group1)) {
                //周
                List<Device> weekNewIncrement = deviceModelService.getModelStatisticsByWeekNewIncrement(days, brand);
                for (int j = 0; j < modelSummarize.size(); j++) {

                    Map<String, Object> map = new HashMap<>();

                    map.put("name", modelSummarize.get(j).getClientId() + "(" + modelSummarize.get(j).getProjectId() + ")");

                    map.put("data", y);

                    mapsY.add(map);
                }
                for (int i = 0; i < weekNewIncrement.size(); i++) {
                    x.add(weekNewIncrement.get(i).getWeeks());

                    y.add(weekNewIncrement.get(i).getCount());

                    Map<String, Object> map_table = new HashMap<>();

                    map_table.put("total", weekNewIncrement.get(i).getCount());

                    //昨日日活量
                    int capacityCount = deviceService.queryDailyLivingCapacityByVersion(1, weekNewIncrement.get(i).getVersion());
                    //昨日新增量
                    int newCount = deviceService.queryNewIncrementsByVersion(1, weekNewIncrement.get(i).getVersion());

                    map_table.put("new", newCount);

                    map_table.put("count", capacityCount);

                    map_table.put("brand", weekNewIncrement.get(i).getClientId());

                    map_table.put("model", weekNewIncrement.get(i).getProjectId());

                    map_table.put("version", null);

                    String percentage = "";
                    if (0 != newCount && 0 != capacityCount) {
                        percentage = getPercent(newCount, capacityCount);
                        map_table.put("percentage", percentage + '%');
                    } else {
                        percentage = "-";

                        map_table.put("percentage", percentage);
                    }

                    mapsTable.add(map_table);
                }
            } else {
                //月
                List<Device> monthNewIncrement = deviceModelService.getModelStatisticsByMonthNewIncrement(days, brand);
                for (int j = 0; j < modelSummarize.size(); j++) {

                    Map<String, Object> map = new HashMap<>();

                    map.put("name", modelSummarize.get(j).getClientId() + "(" + modelSummarize.get(j).getProjectId() + ")");

                    map.put("data", y);

                    mapsY.add(map);
                }
                for (int i = 0; i < monthNewIncrement.size(); i++) {
                    x.add(monthNewIncrement.get(i).getMonths());

                    y.add(monthNewIncrement.get(i).getCount());

                    Map<String, Object> map_table = new HashMap<>();

                    map_table.put("total", monthNewIncrement.get(i).getCount());

                    //昨日日活量
                    int capacityCount = deviceService.queryDailyLivingCapacityByVersion(1, monthNewIncrement.get(i).getVersion());
                    //昨日新增量
                    int newCount = deviceService.queryNewIncrementsByVersion(1, monthNewIncrement.get(i).getVersion());

                    map_table.put("new", newCount);

                    map_table.put("count", capacityCount);

                    map_table.put("brand", monthNewIncrement.get(i).getClientId());

                    map_table.put("model", monthNewIncrement.get(i).getProjectId());

                    map_table.put("version", null);

                    String percentage = "";
                    if (0 != newCount && 0 != capacityCount) {
                        percentage = getPercent(newCount, capacityCount);
                        map_table.put("percentage", percentage + '%');
                    } else {
                        percentage = "-";

                        map_table.put("percentage", percentage);
                    }

                    mapsTable.add(map_table);
                }
            }
        } else if ("3".equals(statistics_type1)){
            System.out.println("Lei>>>>>>>>>>>>>>>>>>>>>");
            if ("1".equals(time_group1)) {
                List<Device> modelDetailsByDaysNewIncrement = deviceModelService.getModelDetailsByDaysNewIncrement(days, brand,model);
                System.out.println("累计量："+modelDetailsByDaysNewIncrement.size());
                for (int j = 0; j < modelSummarize.size(); j++) {

                    Map<String, Object> map = new HashMap<>();

                    map.put("name", modelSummarize.get(j).getClientId() + "(" + modelSummarize.get(j).getProjectId() + ")");

                    map.put("data", y);

                    mapsY.add(map);
                }
                for (int i = 0; i < modelDetailsByDaysNewIncrement.size(); i++) {
                    x.add(modelDetailsByDaysNewIncrement.get(i).getDays());

                    y.add(modelDetailsByDaysNewIncrement.get(i).getCount());

                    Map<String, Object> map_table = new HashMap<>();

                    map_table.put("total", modelDetailsByDaysNewIncrement.get(i).getCount());

                    //昨日日活量
                    int capacityCount = deviceService.queryDailyLivingCapacityByVersion(1, modelDetailsByDaysNewIncrement.get(i).getVersion());
                    //昨日新增量
                    int newCount = deviceService.queryNewIncrementsByVersion(1, modelDetailsByDaysNewIncrement.get(i).getVersion());

                    map_table.put("new", newCount);

                    map_table.put("count", capacityCount);

                    map_table.put("brand", modelDetailsByDaysNewIncrement.get(i).getClientId());

                    map_table.put("model", modelDetailsByDaysNewIncrement.get(i).getProjectId());

                    map_table.put("version", null);

                    String percentage = "";
                    if (0 != newCount && 0 != capacityCount) {
                        percentage = getPercent(newCount, capacityCount);
                        map_table.put("percentage", percentage + '%');
                    } else {
                        percentage = "-";

                        map_table.put("percentage", percentage);
                    }

                    mapsTable.add(map_table);
                }

            } else if ("2".equals(time_group1)) {
                List<Device> weekAccumulation = deviceModelService.getModelStatisticsByWeekAccumulation(days, brand);

                for (int j = 0; j < modelSummarize.size(); j++) {

                    Map<String, Object> map = new HashMap<>();

                    map.put("name", modelSummarize.get(j).getClientId() + "(" + modelSummarize.get(j).getProjectId() + ")");

                    map.put("data", y);

                    mapsY.add(map);
                }
                for (int i = 0; i < weekAccumulation.size(); i++) {
                    x.add(weekAccumulation.get(i).getWeeks());

                    y.add(weekAccumulation.get(i).getCount());

                    Map<String, Object> map_table = new HashMap<>();

                    map_table.put("total", weekAccumulation.get(i).getCount());

                    //昨日日活量
                    int capacityCount = deviceService.queryDailyLivingCapacityByVersion(1, weekAccumulation.get(i).getVersion());
                    //昨日新增量
                    int newCount = deviceService.queryNewIncrementsByVersion(1, weekAccumulation.get(i).getVersion());

                    map_table.put("new", newCount);

                    map_table.put("count", capacityCount);

                    map_table.put("brand", weekAccumulation.get(i).getClientId());

                    map_table.put("model", weekAccumulation.get(i).getProjectId());

                    map_table.put("version", null);

                    String percentage = "";
                    if (0 != newCount && 0 != capacityCount) {
                        percentage = getPercent(newCount, capacityCount);
                        map_table.put("percentage", percentage + '%');
                    } else {
                        percentage = "-";

                        map_table.put("percentage", percentage);
                    }

                    mapsTable.add(map_table);
                }
            } else {
                List<Device> monthAccumulation = deviceModelService.getModelStatisticsByMonthAccumulation(days, brand);

                for (int j = 0; j < modelSummarize.size(); j++) {

                    Map<String, Object> map = new HashMap<>();

                    map.put("name", modelSummarize.get(j).getClientId() + "(" + modelSummarize.get(j).getProjectId() + ")");

                    map.put("data", y);

                    mapsY.add(map);
                }
                for (int i = 0; i < monthAccumulation.size(); i++) {
                    x.add(monthAccumulation.get(i).getMonths());

                    y.add(monthAccumulation.get(i).getCount());

                    Map<String, Object> map_table = new HashMap<>();

                    map_table.put("total", monthAccumulation.get(i).getCount());

                    //昨日日活量
                    int capacityCount = deviceService.queryDailyLivingCapacityByVersion(1, monthAccumulation.get(i).getVersion());
                    //昨日新增量
                    int newCount = deviceService.queryNewIncrementsByVersion(1, monthAccumulation.get(i).getVersion());

                    map_table.put("new", newCount);

                    map_table.put("count", capacityCount);

                    map_table.put("brand", monthAccumulation.get(i).getClientId());

                    map_table.put("model", monthAccumulation.get(i).getProjectId());

                    map_table.put("version", null);

                    String percentage = "";
                    if (0 != newCount && 0 != capacityCount) {
                        percentage = getPercent(newCount, capacityCount);
                        map_table.put("percentage", percentage + '%');
                    } else {
                        percentage = "-";

                        map_table.put("percentage", percentage);
                    }

                    mapsTable.add(map_table);
                }
            }
        }
        hashMap.put("x", x);

        hashMap.put("y", mapsY);

        hashMap.put("table", mapsTable);

        hashMap.put("page_result", false);

        String result = JSON.toJSONString(hashMap);
        //记录一下，数据显示有问题
        jsonResult = JSONObject.fromObject(result);

        System.out.println("jsonResult>>>>>>>>>>>>>>>>>>>>" + jsonResult);

        return new JSONResult(200, "SUCCESS", "Success", jsonResult);
    }
    @RequestMapping("/model_details_ajax")
    @ResponseBody
    public JSONResult model_details_ajax(HttpServletRequest request) {
        System.out.println("model_details_ajax>>>>>>" + request.getParameter("brand"));
        String model = "", brand = "", time_horizon1 = "", time_group1 = "", statistics_type1 = "";

        if (!Utils.isObjNull(request)) {
            model = !Utils.isObjNull(request.getParameter("model")) ? request.getParameter("model").trim() : "";
            brand = !Utils.isObjNull(request.getParameter("brand")) ? request.getParameter("brand").trim() : "";
            time_horizon1 = !Utils.isObjNull(request.getParameter("time_horizon1")) ? request.getParameter("time_horizon1").trim() : "";
            time_group1 = !Utils.isObjNull(request.getParameter("time_group1")) ? request.getParameter("time_group1").trim() : "";
            statistics_type1 = !Utils.isObjNull(request.getParameter("statistics_type1")) ? request.getParameter("statistics_type1").trim() : "";
        } else {
            return new JSONResult(200, "ERROR", "The parameter value is empty！", "");
        }
        JSONObject jsonResult = null;
        Map<String, Object> hashMap = new HashMap<>();
        List<String> x = new ArrayList<>();
        List<Map> mapsTable = new ArrayList<>();
        List<Map> mapsY = new ArrayList<>();
        List<Map> mapsList = new ArrayList<>();
        List<Integer> y = new ArrayList<>();
        int days = 7;
        if ("2".equals(time_horizon1)) {
            days = 31;
        } else if ("3".equals(time_horizon1)) {
            days = 365;
        }


        if ("1".equals(statistics_type1)) {
            logger.info("日活量>>>>>>" + days);
            //获取机型详情
            List<Device> modelDetailsByDaysCapacity = deviceModelService.getModelDetailsByDaysCapacity(days, brand,model);
            for (int i = 0; i < modelDetailsByDaysCapacity.size(); i++) {
                x.add(modelDetailsByDaysCapacity.get(i).getDays());

                y.add(modelDetailsByDaysCapacity.get(i).getCount());

                //获取累计量
                Integer total = deviceModelService.getModelTotal(modelDetailsByDaysCapacity.get(i).getVersion(),brand,model);
                if (null == total){
                    total = 0;
                }

                //昨日日活量
                int capacityCount = deviceService.queryDailyLivingCapacityByVersion(0, modelDetailsByDaysCapacity.get(i).getVersion());
                //昨日新增量
                int newCount = deviceService.queryNewIncrementsByVersion(0, modelDetailsByDaysCapacity.get(i).getVersion());

                Map<String, Object> map_table = new HashMap<>();

                map_table.put("target_date",modelDetailsByDaysCapacity.get(i).getDays());

                map_table.put("total", total);

                map_table.put("new", newCount);

                map_table.put("active", capacityCount);

                map_table.put("brand", modelDetailsByDaysCapacity.get(i).getClientId());

                map_table.put("model", modelDetailsByDaysCapacity.get(i).getProjectId());

                mapsTable.add(map_table);
            }

        } else if ("2".equals(statistics_type1)) {
            logger.info("新增量>>>>>>" + days);
            if ("1".equals(time_group1)) {
                List<Device> newIncrementList = deviceModelService.getModelDetailsByDaysNewIncrement(days,brand,model);

                for (int i = 0; i < newIncrementList.size(); i++) {
                    x.add(newIncrementList.get(i).getDays());

                    y.add(newIncrementList.get(i).getCount());

                    //获取累计量
                    Integer total = deviceModelService.getModelTotal(newIncrementList.get(i).getVersion(),brand,model);
                    if (null == total){
                        total = 0;
                    }

                    //昨日日活量
                    int capacityCount = deviceService.queryDailyLivingCapacityByVersion(0, newIncrementList.get(i).getVersion());
                    //昨日新增量
                    int newCount = deviceService.queryNewIncrementsByVersion(0, newIncrementList.get(i).getVersion());

                    Map<String, Object> map_table = new HashMap<>();

                    map_table.put("target_date",newIncrementList.get(i).getDays());

                    map_table.put("total", total);

                    map_table.put("new", newCount);

                    map_table.put("active", capacityCount);

                    map_table.put("brand", newIncrementList.get(i).getClientId());

                    map_table.put("model", newIncrementList.get(i).getProjectId());

                    mapsTable.add(map_table);
                }
            } else if ("2".equals(time_group1)) {
                List<Device> newIncrementList = deviceModelService.getModelDetailsByWeekNewIncrement(days,brand,model);

                for (int i = 0; i < newIncrementList.size(); i++) {
                    x.add(newIncrementList.get(i).getWeeks());

                    y.add(newIncrementList.get(i).getCount());

                    //获取累计量
                    Integer total = deviceModelService.getModelTotal(newIncrementList.get(i).getVersion(),brand,model);
                    if (null == total){
                        total = 0;
                    }
                    //昨日日活量
                    int capacityCount = deviceService.queryDailyLivingCapacityByVersion(0, newIncrementList.get(i).getVersion());
                    //昨日新增量
                    int newCount = deviceService.queryNewIncrementsByVersion(0, newIncrementList.get(i).getVersion());

                    Map<String, Object> map_table = new HashMap<>();

                    map_table.put("target_date",newIncrementList.get(i).getWeeks());

                    map_table.put("total", total);

                    map_table.put("new", newCount);

                    map_table.put("active", capacityCount);

                    map_table.put("brand", newIncrementList.get(i).getClientId());

                    map_table.put("model", newIncrementList.get(i).getProjectId());

                    mapsTable.add(map_table);
                }
            } else {
                List<Device> newIncrementList = deviceModelService.getModelDetailsByMonthNewIncrement(days,brand,model);

                for (int i = 0; i < newIncrementList.size(); i++) {
                    x.add(newIncrementList.get(i).getMonths());

                    y.add(newIncrementList.get(i).getCount());

                    //获取累计量
                    Integer total = deviceModelService.getModelTotal(newIncrementList.get(i).getVersion(),brand,model);
                    if (null == total){
                        total = 0;
                    }
                    //昨日日活量
                    int capacityCount = deviceService.queryDailyLivingCapacityByVersion(0, newIncrementList.get(i).getVersion());
                    //昨日新增量
                    int newCount = deviceService.queryNewIncrementsByVersion(0, newIncrementList.get(i).getVersion());

                    Map<String, Object> map_table = new HashMap<>();

                    map_table.put("target_date",newIncrementList.get(i).getMonths());

                    map_table.put("total", total);

                    map_table.put("new", newCount);

                    map_table.put("active", capacityCount);

                    map_table.put("brand", newIncrementList.get(i).getClientId());

                    map_table.put("model", newIncrementList.get(i).getProjectId());

                    mapsTable.add(map_table);
                }
            }
        } else if ("3".equals(statistics_type1)) {
            logger.info("新增量>>>>>>" + days);
            if ("1".equals(time_group1)) {
                List<Device> daysAccumulation = deviceModelService.getModelStatisticsByDaysAccumulation(days, brand);
                System.out.println("daysAccumulation："+daysAccumulation.size());
                for (int i = 0; i < daysAccumulation.size(); i++) {
                    x.add(daysAccumulation.get(i).getDays());

                    y.add(daysAccumulation.get(i).getCount());

                    //获取累计量
                    Integer total = deviceModelService.getModelTotal(daysAccumulation.get(i).getVersion(),brand,model);
                    if (null == total){
                        total = 0;
                    }

                    //昨日日活量
                    int capacityCount = deviceService.queryDailyLivingCapacityByVersion(0, daysAccumulation.get(i).getVersion());
                    //昨日新增量
                    int newCount = deviceService.queryNewIncrementsByVersion(0, daysAccumulation.get(i).getVersion());

                    Map<String, Object> map_table = new HashMap<>();

                    map_table.put("target_date",daysAccumulation.get(i).getDays());

                    map_table.put("total", total);

                    map_table.put("new", newCount);

                    map_table.put("active", capacityCount);

                    map_table.put("brand", daysAccumulation.get(i).getClientId());

                    map_table.put("model", daysAccumulation.get(i).getProjectId());

                    mapsTable.add(map_table);
                }

            } else if ("2".equals(time_group1)) {
                List<Device> daysAccumulation = deviceModelService.getModelStatisticsByWeekAccumulation(days, brand);
                System.out.println("daysAccumulation："+daysAccumulation.size());
                for (int i = 0; i < daysAccumulation.size(); i++) {
                    x.add(daysAccumulation.get(i).getWeeks());

                    y.add(daysAccumulation.get(i).getCount());

                    //获取累计量
                    Integer total = deviceModelService.getModelTotal(daysAccumulation.get(i).getVersion(),brand,model);
                    if (null == total){
                        total = 0;
                    }

                    //昨日日活量
                    int capacityCount = deviceService.queryDailyLivingCapacityByVersion(0, daysAccumulation.get(i).getVersion());
                    //昨日新增量
                    int newCount = deviceService.queryNewIncrementsByVersion(0, daysAccumulation.get(i).getVersion());

                    Map<String, Object> map_table = new HashMap<>();

                    map_table.put("target_date",daysAccumulation.get(i).getWeeks());

                    map_table.put("total", total);

                    map_table.put("new", newCount);

                    map_table.put("active", capacityCount);

                    map_table.put("brand", daysAccumulation.get(i).getClientId());

                    map_table.put("model", daysAccumulation.get(i).getProjectId());

                    mapsTable.add(map_table);
                }
            } else {
                List<Device> daysAccumulation = deviceModelService.getModelStatisticsByMonthAccumulation(days, brand);
                System.out.println("daysAccumulation："+daysAccumulation.size());
                for (int i = 0; i < daysAccumulation.size(); i++) {
                    x.add(daysAccumulation.get(i).getMonths());

                    y.add(daysAccumulation.get(i).getCount());

                    //获取累计量
                    Integer total = deviceModelService.getModelTotal(daysAccumulation.get(i).getVersion(),brand,model);
                    if (null == total){
                        total = 0;
                    }

                    //昨日日活量
                    int capacityCount = deviceService.queryDailyLivingCapacityByVersion(0, daysAccumulation.get(i).getVersion());
                    //昨日新增量
                    int newCount = deviceService.queryNewIncrementsByVersion(0, daysAccumulation.get(i).getVersion());

                    Map<String, Object> map_table = new HashMap<>();

                    map_table.put("target_date",daysAccumulation.get(i).getMonths());

                    map_table.put("total", total);

                    map_table.put("new", newCount);

                    map_table.put("active", capacityCount);

                    map_table.put("brand", daysAccumulation.get(i).getClientId());

                    map_table.put("model", daysAccumulation.get(i).getProjectId());

                    mapsTable.add(map_table);
                }
            }
        }
        hashMap.put("x", x);

        hashMap.put("y", y);

        hashMap.put("table", mapsTable);

        hashMap.put("page_result", false);

        String result = JSON.toJSONString(hashMap);
        //记录一下，数据显示有问题
        jsonResult = JSONObject.fromObject(result);

        System.out.println("jsonResult>>>>>>>>>>>>>>>>>>>>" + jsonResult);

        return new JSONResult(200, "SUCCESS", "Success", jsonResult);
    }
    public static String getPercent(int num1, int num2) {
        // 创建一个数值格式化对象

        NumberFormat numberFormat = NumberFormat.getInstance();

        // 设置精确到小数点后2位

        numberFormat.setMaximumFractionDigits(5);

        String result = numberFormat.format((float) num1 / (float) num2 * 100);

//        System.out.println("num1和num2的百分比为:" + result + "%");

        return result;
    }
}