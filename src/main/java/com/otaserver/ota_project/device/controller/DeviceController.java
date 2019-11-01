package com.otaserver.ota_project.device.controller;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.otaserver.ota_project.common.util.JSONResult;
import com.otaserver.ota_project.common.util.Utils;
import com.otaserver.ota_project.device.entity.Device;
import com.otaserver.ota_project.device.entity.DeviceNumber;
import com.otaserver.ota_project.device.entity.DeviceRecords;
import com.otaserver.ota_project.device.service.DeviceNumberBindService;
import com.otaserver.ota_project.device.service.DeviceRecordsService;
import com.otaserver.ota_project.device.service.DeviceService;
import com.otaserver.ota_project.device.service.DeviceNumberService;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author: WangJiaPeng
 * @Date: 2019/8/27 10:50
 * @Version 1.0
 */
@Controller
@RequestMapping("/device")
public class DeviceController {

    private static Logger logger = LoggerFactory.getLogger(DeviceController.class);

    @Autowired
    DeviceService deviceService;

    @Autowired
    DeviceNumberService imeiService;

    @Autowired
    DeviceNumberBindService bindService;

    @RequestMapping("/product")
    public String product(HttpServletRequest request) {
        return "/home/product";
    }

    @RequestMapping("/version")
    public String version(HttpServletRequest request) {
        return "/home/version";
    }

    @RequestMapping("/version_statistics_ajax")
    @ResponseBody
    public JSONResult version_statistics_ajax(HttpServletRequest request) {
        System.out.println("请求进来了version_statistics_ajax方法>>>>>>");

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
        int days = 7;
        if ("2".equals(time_horizon1)) {
            days = 31;
        } else if ("3".equals(time_horizon1)) {
            days = 365;
        }
        List<String> listDate = new ArrayList<>();
        List<Integer> dataCount = new ArrayList<>();
        List<Map> mapsY = new ArrayList<>();
        List<Map> mapsTable = new ArrayList<>();
        String version = model + ".MT7686%";
        if ("HJ001".equals(model)) {
            version = model + "%";
        }

        //获取版本概括
        List<Device> versionSummaryList = deviceService.versionSummaryList(version, brand, model);
        System.out.println("version>>>" + version);
        //获取版本总数
        int versionCount = deviceService.getVersionTotal(version);

        System.out.println("获取到的总数>>>" + versionCount);

        if ("1".equals(statistics_type1)) {
            logger.info("日活量>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            //获取日活量
            List<Device> deviceList = deviceService.queryDailyLivingCapacity(days, version, brand, model);
            logger.info("日活量方法.size" + deviceList.size());

            for (int i = 0; i < deviceList.size(); i++) {
                if (0 != deviceList.size()) {
                    Map<String, Object> map = new HashMap<>();

                    dataCount.add(deviceList.get(i).getCount());

                    listDate.add(deviceList.get(i).getDays());

                    map.put("name", deviceList.get(i).getVersion());

                    map.put("data", dataCount);

                    mapsY.add(map);
                }
            }
        } else if ("2".equals(statistics_type1)) {
            logger.info("用户选择了新增量>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" + days);

            List<Device> newIncrements = deviceService.queryDeviceNewIncrements(days, version, brand, model);

            logger.info("newIncrements>>>>>>" + newIncrements.size());

            if ("1".equals(time_group1)) {
                logger.info("当前是新增量，默认为日>>>>>>");
                for (int i = 0; i < newIncrements.size(); i++) {
                    if (0 != newIncrements.size()) {
                        Map<String, Object> map = new HashMap<>();

                        dataCount.add(newIncrements.get(i).getCount());

                        listDate.add(newIncrements.get(i).getDays());

                        map.put("name", newIncrements.get(i).getVersion());

                        map.put("data", dataCount);

                        if (null == newIncrements.get(i).getVersion()) {
                            map.put("visible", false);
                        }
                        mapsY.add(map);
                    } else {
                        logger.info("最近没有新增量>>>>");

                        Map<String, Object> map = new HashMap<>();

                        dataCount.add(newIncrements.get(i).getCount());

                        listDate.add(newIncrements.get(i).getDays());

                        map.put("name", newIncrements.get(i).getVersion());

                        map.put("data", dataCount);

                        if (null == newIncrements.get(i).getVersion()) {
                            map.put("visible", false);
                        }

                        mapsY.add(map);
                    }
                }
            } else if ("2".equals(time_group1)) {
                logger.info("用户选择了周>>>>>>>>>>>" + days);

                //查询设备新增量按周
                List<Device> weekList = deviceService.queryDeviceNewIncrementsByWeek(days, version, brand, model);

                for (int i = 0; i < weekList.size(); i++) {
                    if (0 != weekList.size() && null != weekList.get(i).getVersion()) {

                        if ("1".equals(time_horizon1)) {
                            logger.info("七天前" + days);

                            Map<String, Object> map = new HashMap<>();

                            dataCount.add(weekList.get(i).getCount());

                            listDate.add(weekList.get(i).getWeeks());

                            map.put("name", weekList.get(i).getVersion());

                            map.put("data", dataCount);

                            if (null == newIncrements.get(i).getVersion()) {
                                map.put("visible", false);
                            }
                            mapsY.add(map);
                        } else if ("2".equals(time_horizon1)) {
                            logger.info("三十天前" + days);

                            Map<String, Object> map = new HashMap<>();

                            dataCount.add(weekList.get(i).getCount());

                            listDate.add(weekList.get(i).getWeeks());

                            map.put("name", weekList.get(i).getVersion());

                            map.put("data", dataCount);

                            if (null == newIncrements.get(i).getVersion()) {
                                map.put("visible", false);
                            }
                            mapsY.add(map);
                        } else {
                            logger.info("一年前" + days);

                            Map<String, Object> map = new HashMap<>();

                            dataCount.add(weekList.get(i).getCount());

                            listDate.add(weekList.get(i).getWeeks());

                            map.put("name", weekList.get(i).getVersion());

                            map.put("data", dataCount);

                            if (null == newIncrements.get(i).getVersion()) {
                                map.put("visible", false);
                            }
                            mapsY.add(map);
                        }
                    } else {
                        System.out.println("没有数据啊》》》》》》》》》》》》");

                        Map<String, Object> map = new HashMap<>();

                        dataCount.add(weekList.get(i).getCount());

                        listDate.add(weekList.get(i).getWeeks());

                        map.put("name", weekList.get(i).getVersion());

                        map.put("data", dataCount);

                        map.put("visible", false);

                        mapsY.add(map);
                    }
                }
            } else {
                logger.info("用户选择了月>>>>>>>>>>>" + "\t" + "days" + days);
                List<Device> getMonthList = deviceService.queryDeviceNewIncrementsByMonth(days, version, brand, model);
                logger.info("getMonthList.size>>>" + getMonthList.size());
                for (int i = 0; i < getMonthList.size(); i++) {
                    if (0 != getMonthList.size()) {
                        if ("1".equals(time_horizon1)) {
                            logger.info("七天前" + days);

                            Map<String, Object> map = new HashMap<>();

                            dataCount.add(getMonthList.get(i).getCount());

                            listDate.add(getMonthList.get(i).getMonths());

                            map.put("name", getMonthList.get(i).getVersion());

                            map.put("data", dataCount);

                            if (null == getMonthList.get(i).getVersion()) {
                                map.put("visible", false);
                            }
                            mapsY.add(map);
                        } else if ("2".equals(time_horizon1)) {
                            logger.info("三十天前" + days);

                            Map<String, Object> map = new HashMap<>();

                            dataCount.add(getMonthList.get(i).getCount());

                            listDate.add(getMonthList.get(i).getMonths());

                            map.put("name", getMonthList.get(i).getVersion());

                            map.put("data", dataCount);

                            if (null == getMonthList.get(i).getVersion()) {
                                map.put("visible", false);
                            }
                            mapsY.add(map);
                        } else {
                            logger.info("一年前" + days);

                            Map<String, Object> map = new HashMap<>();

                            dataCount.add(getMonthList.get(i).getCount());

                            listDate.add(getMonthList.get(i).getMonths());

                            map.put("name", getMonthList.get(i).getVersion());

                            map.put("data", dataCount);

                            if (null == getMonthList.get(i).getVersion()) {
                                map.put("visible", false);
                            }
                            mapsY.add(map);
                        }
                    } else {
                        logger.info("月>>>没有数据 进入了 else");

                        Map<String, Object> map = new HashMap<>();

                        dataCount.add(getMonthList.get(i).getCount());

                        listDate.add(getMonthList.get(i).getMonths());

                        map.put("name", getMonthList.get(i).getVersion());

                        map.put("data", dataCount);

                        map.put("visible", false);

                        mapsY.add(map);
                    }
                }
            }
        } else if ("3".equals(statistics_type1)) {
            //查询设备累计量，按天
            List<Device> accumulation = deviceService.queryDeviceAccumulationByDays(days, version, brand, model);
            //获取设备累计量
//            int accumulationCount =  deviceService.queryDeviceAccumulation();

            logger.info("accumulation>>>>>>" + accumulation.size());
            if ("1".equals(time_group1)) {
                logger.info("累计量，默认为日>>>" + days);
                for (int i = 0; i < accumulation.size(); i++) {
                    if (0 != accumulation.size() && null != accumulation.get(i).getVersion()) {
                        Map<String, Object> map = new HashMap<>();

                        listDate.add(accumulation.get(i).getDays());

                        dataCount.add(accumulation.get(i).getCount());

                        map.put("name", accumulation.get(i).getVersion());

                        map.put("data", dataCount);

                        if (null == accumulation.get(i).getVersion()) {
                            map.put("visible", false);
                        }

                        mapsY.add(map);
                    } else {
                        Map<String, Object> map = new HashMap<>();

                        map.put("name", "");

                        map.put("data", 0);

                        map.put("visible", false);

                        mapsY.add(map);
                    }
                }
            } else if ("2".equals(time_group1)) {
                //查询设备累计量，按周
                List<Device> weekList = deviceService.queryDeviceAccumulationByWeek(days, version, brand, model);
                for (int i = 0; i < weekList.size(); i++) {
                    if (0 != weekList.size() && null != weekList.get(i).getVersion()) {
                        if ("1".equals(time_horizon1)) {
                            logger.info("七天前" + days);

                            Map<String, Object> map = new HashMap<>();

                            listDate.add(weekList.get(i).getWeeks());

                            dataCount.add(weekList.get(i).getCount());

                            map.put("name", weekList.get(i).getVersion());

                            map.put("data", dataCount);

                            if (null == weekList.get(i).getVersion()) {
                                map.put("visible", false);
                            }
                            mapsY.add(map);
                        } else if ("2".equals(time_horizon1)) {
                            logger.info("三十天前" + days);

                            Map<String, Object> map = new HashMap<>();

                            listDate.add(weekList.get(i).getWeeks());

                            dataCount.add(weekList.get(i).getCount());

                            map.put("name", weekList.get(i).getVersion());

                            map.put("data", dataCount);

                            if (null == weekList.get(i).getVersion()) {
                                map.put("visible", false);
                            }
                            mapsY.add(map);
                        } else {
                            logger.info("一年前" + days);

                            Map<String, Object> map = new HashMap<>();

                            listDate.add(weekList.get(i).getWeeks());

                            dataCount.add(weekList.get(i).getCount());

                            map.put("name", weekList.get(i).getVersion());

                            map.put("data", dataCount);

                            if (null == weekList.get(i).getVersion()) {
                                map.put("visible", false);
                            }
                            mapsY.add(map);
                        }
                    } else {
                        Map<String, Object> map = new HashMap<>();

                        map.put("name", "");

                        map.put("data", 0);

                        map.put("visible", false);

                        mapsY.add(map);
                    }
                }
            } else {
                logger.info("累计量，用户选择了月>>>" + days);

                //查询设备累计量，按月
                List<Device> monthList = deviceService.queryDeviceAccumulationByMonth(days, version, brand, model);

                for (int i = 0; i < monthList.size(); i++) {
                    if (0 != monthList.size() && null != accumulation.get(i).getVersion()) {
                        if ("1".equals(time_horizon1)) {
                            Map<String, Object> map = new HashMap<>();

                            listDate.add(monthList.get(i).getMonths());

                            dataCount.add(monthList.get(i).getCount());

                            map.put("name", monthList.get(i).getVersion());

                            map.put("data", dataCount);

                            if (null == monthList.get(i).getVersion()) {
                                map.put("visible", false);
                            }

                            mapsY.add(map);
                        } else if ("2".equals(time_horizon1)) {
                            Map<String, Object> map = new HashMap<>();

                            listDate.add(monthList.get(i).getMonths());

                            dataCount.add(monthList.get(i).getCount());

                            map.put("name", monthList.get(i).getVersion());

                            map.put("data", dataCount);

                            if (null == monthList.get(i).getVersion()) {
                                map.put("visible", false);
                            }
                            mapsY.add(map);
                        } else {
                            logger.info("一年前" + days);
                            Map<String, Object> map = new HashMap<>();

                            listDate.add(monthList.get(i).getMonths());

                            dataCount.add(monthList.get(i).getCount());

                            map.put("name", monthList.get(i).getVersion());

                            map.put("data", dataCount);

                            if (null == monthList.get(i).getVersion()) {
                                map.put("visible", false);
                            }

                            mapsY.add(map);
                        }
                    } else {
                        Map<String, Object> map = new HashMap<>();

                        map.put("name", "");

                        map.put("data", 0);

                        map.put("visible", false);

                        mapsY.add(map);
                    }
                }
            }
        }
        System.out.println("version>>>>>>>" + version);

        for (int j = 0; j < versionSummaryList.size(); j++) {
            Map<String, Object> map_table = new HashMap<>();
            map_table.put("model", versionSummaryList.get(j).getProjectId());
            map_table.put("brand", versionSummaryList.get(j).getClientId());
            map_table.put("version", versionSummaryList.get(j).getVersion());
            map_table.put("total", versionSummaryList.get(j).getCount());
            String total_percentage = getPercent(versionSummaryList.get(j).getCount(), versionCount);
            map_table.put("total_percentage", total_percentage + '%');

            int newCount = deviceService.queryDailyLivingCapacityByVersion(1, versionSummaryList.get(j).getVersion());
            System.out.println("newCount" + newCount);

            int count = deviceService.queryNewIncrementsByVersion(1, versionSummaryList.get(j).getVersion());
            System.out.println("count" + count);

            map_table.put("new", count);

            map_table.put("count", newCount);

            String percentage = "";
            if (0 != newCount && 0 != count) {
                percentage = getPercent(count, newCount);
                map_table.put("percentage", percentage + '%');
            } else {
                percentage = "-";

                map_table.put("percentage", percentage);
            }

            mapsTable.add(map_table);
        }

        hashMap.put("x", listDate);

        hashMap.put("y", mapsY);

        hashMap.put("table", mapsTable);

        hashMap.put("page_result", false);

        hashMap.put("identification", "");

        String result = JSON.toJSONString(hashMap);

        jsonResult = JSONObject.fromObject(result);

        System.out.println("jsonResult>>>>>>>>>>>>>>>>>>>>" + jsonResult);

        return new JSONResult(200, "SUCCESS", "Successful", jsonResult);
    }

    public static String getPercent(int num1, int num2) {
        // 创建一个数值格式化对象

        NumberFormat numberFormat = NumberFormat.getInstance();

        // 设置精确到小数点后2位

        numberFormat.setMaximumFractionDigits(5);

        String result = numberFormat.format((float) num1 / (float) num2 * 100);

        System.out.println("num1和num2的百分比为:" + result + "%");

        return result;
    }
}
