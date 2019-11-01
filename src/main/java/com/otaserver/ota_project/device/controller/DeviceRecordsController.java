package com.otaserver.ota_project.device.controller;

import com.alibaba.fastjson.JSON;
import com.google.gson.JsonArray;
import com.otaserver.ota_project.common.util.GetDateUtils;
import com.otaserver.ota_project.common.util.JSONResult;
import com.otaserver.ota_project.device.entity.Device;
import com.otaserver.ota_project.device.entity.DeviceRecords;
import com.otaserver.ota_project.device.mapper.DeviceRecordsMapper;
import com.otaserver.ota_project.device.service.DeviceRecordsService;
import com.sun.scenario.effect.impl.sw.sse.SSEBlend_SRC_OUTPeer;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.omg.PortableServer.AdapterActivator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sound.midi.Soundbank;
import java.text.NumberFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @Author: WangJiaPeng
 * @Date: 2019/8/13 17:35
 * @Version 1.0
 */
@Controller
@RequestMapping("/device")
public class DeviceRecordsController {

    private static Logger logger = LoggerFactory.getLogger(DeviceRecordsController.class);

    @Autowired
    DeviceRecordsService deviceRecordsService;

    @RequestMapping("getStatisticsData")
    @ResponseBody
    public JSONResult getStatisticsData(HttpServletRequest request) throws ParseException {
        JSONObject jsonResult = null;
        Map<String, Object> map = new HashMap<>();

        String time_horizon1 = request.getParameter("time_horizon1");

        String time_group1 = request.getParameter("time_group1");

        String statistics_type1 = request.getParameter("statistics_type1");

        Map<String, Object> hashMap = new HashMap<>();

        int days = 7;
        if ("2".equals(time_horizon1)) {
            days = 31;
        } else if ("3".equals(time_horizon1)) {
            days = 365;
        }
        List<String> listDate = new ArrayList<>();
        List<Integer> dataCount = new ArrayList<>();
        if ("1".equals(statistics_type1)) {
            logger.info("日活量>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            List<DeviceRecords> recordsList = deviceRecordsService.queryDailyLivingCapacityByDays(days);
            logger.info("日活量方法.size" + recordsList.size());
            for (int i = 0; i < recordsList.size(); i++) {
                logger.info("count" + recordsList.get(i).getCount());

                dataCount.add(recordsList.get(i).getCount());

                listDate.add(recordsList.get(i).getDays());
            }
            logger.info("dataCount>>>>" + dataCount.size());
        } else if ("2".equals(statistics_type1)) {
            logger.info("用户选择了新增量>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            logger.info("当前天数>>>>>>>>>>>>>>>>>>>>>>>>>>" + days);
            List<DeviceRecords> newIncrements = deviceRecordsService.queryDeviceNewIncrementsByDays(days);
//            List<DeviceRecords> newIncrementsByDays = deviceRecordsService.getDateDays(days);
            logger.info("newIncrements>>>>>>" + newIncrements.size());
            if ("1".equals(time_group1)) {
                logger.info("当前是新增量，默认为日>>>>>>");
                for (int i = 0; i < newIncrements.size(); i++) {
                    if (0 != newIncrements.size()) {

                        dataCount.add(newIncrements.get(i).getCount());

                        listDate.add(newIncrements.get(i).getDays());

                        logger.info("listDate>>>~~~~~~!!!!!!!" + listDate.size() + "\t" + dataCount.size());
                    } else {
                        logger.info("最近没有新增量>>>>");

                        dataCount.add(newIncrements.get(i).getCount());

                        listDate.add(newIncrements.get(i).getDays());
                    }
                }
                logger.info("arrayInt>>>>>>>" + dataCount.size());
            } else if ("2".equals(time_group1)) {
                logger.info("用户选择了周>>>>>>>>>>>" + days);
                List<DeviceRecords> weekList = deviceRecordsService.queryDeviceNewIncrementsByWeek(days);
                for (int i = 0; i < weekList.size(); i++) {
                    if (0 != weekList.size()) {
                        logger.info("这是周数据>>>>>>>>>>>>>>>>>>>" + time_group1);
                        logger.info("one select 选择了" + time_horizon1);
                        if ("1".equals(time_horizon1)) {
                            logger.info("七天前" + days);

                            logger.info("嘿嘿" + weekList.get(i).getCount());

                            logger.info("getDays()" + weekList.get(i).getWeeks());

                            listDate.add(weekList.get(i).getWeeks());

                            dataCount.add(weekList.get(i).getCount());

                        } else if ("2".equals(time_horizon1)) {
                            logger.info("三十天前" + days);

                            logger.info("看一下数据吧" + weekList.get(i).getWeeks());

                            dataCount.add(weekList.get(i).getCount());

                            listDate.add(weekList.get(i).getWeeks());

                        } else {
                            logger.info("一年前" + days);
                            logger.info("看一下数据吧" + weekList.get(i).getWeeks());

                            dataCount.add(weekList.get(i).getCount());

                            listDate.add(weekList.get(i).getWeeks());
                        }
                    } else {
                        System.out.println("没有数据啊》》》》》》》》》》》》");

                        dataCount.add(weekList.get(i).getCount());

                        listDate.add(weekList.get(i).getWeeks());
                    }
                }
            } else {
                logger.info("用户选择了月>>>>>>>>>>>" + "\t" + "days" + days);
                List<DeviceRecords> getMonthList = deviceRecordsService.queryDeviceNewIncrementsByMonth(days);
                logger.info("getMonthList.size>>>" + getMonthList.size());
                for (int k = 0; k < getMonthList.size(); k++) {
                    if (0 != getMonthList.size()) {
                        if ("1".equals(time_horizon1)) {
                            logger.info("七天前" + days);

                            dataCount.add(getMonthList.get(k).getCount());

                            listDate.add(getMonthList.get(k).getMonths());

                            logger.info("dataCount>>>>>>>>>>>>>>>" + dataCount.size());
                        } else if ("2".equals(time_horizon1)) {
                            logger.info("三十天前" + days);

                            dataCount.add(getMonthList.get(k).getCount());

                            listDate.add(getMonthList.get(k).getMonths());
                        } else {
                            logger.info("一年前" + days);

                            dataCount.add(getMonthList.get(k).getCount());

                            listDate.add(getMonthList.get(k).getMonths());
                        }
                    } else {
                        logger.info("月>>>没有数据 进入了 else");

                        dataCount.add(getMonthList.get(k).getCount());

                        listDate.add(getMonthList.get(k).getMonths());
                    }
                }
            }
        } else if ("3".equals(statistics_type1)) {
            List<DeviceRecords> accumulation = deviceRecordsService.queryDeviceAccumulationByDays(days);
//            int accumulationCount =  deviceRecordsService.getAccumulationByDays(days);
            int accumulationCount = deviceRecordsService.queryDeviceAccumulation();

            logger.info("accumulation>>>>>>" + accumulation.size());
            if ("1".equals(time_group1)) {
                logger.info("累计量，默认为日>>>" + days);
                for (int i = 0; i < accumulation.size(); i++) {
                    if (0 != accumulation.size()) {
                        dataCount.add(accumulationCount);

                        listDate.add(accumulation.get(i).getDays());
                    }
                }
            } else if ("2".equals(time_group1)) {
                List<DeviceRecords> weekList = deviceRecordsService.queryDeviceAccumulationByWeek(days);
                for (int i = 0; i < weekList.size(); i++) {
                    if (0 != weekList.size()) {
                        if ("1".equals(time_horizon1)) {
                            logger.info("七天前" + days);

                            listDate.add(weekList.get(i).getWeeks());

                            dataCount.add(accumulationCount);

                        } else if ("2".equals(time_horizon1)) {
                            logger.info("三十天前" + days);

                            dataCount.add(accumulationCount);

                            listDate.add(weekList.get(i).getWeeks());

                        } else {
                            logger.info("一年前" + days);

                            dataCount.add(accumulationCount);

                            listDate.add(weekList.get(i).getWeeks());
                        }
                    }
                }
            } else {
                logger.info("累计量，用户选择了月>>>" + days);
                List<DeviceRecords> monthList = deviceRecordsService.queryDeviceAccumulationByMonth(days);
                for (int i = 0; i < monthList.size(); i++) {
                    if (0 != monthList.size()) {
                        if ("1".equals(time_horizon1)) {
                            listDate.add(monthList.get(i).getMonths());

                            dataCount.add(accumulationCount);

                        } else if ("2".equals(time_horizon1)) {
                            dataCount.add(accumulationCount);

                            listDate.add(monthList.get(i).getMonths());

                        } else {
                            logger.info("一年前" + days);
//                            logger.info("看一下数据吧" + monthList.get(i).getMonths());

                            dataCount.add(accumulationCount);

                            listDate.add(monthList.get(i).getMonths());
                        }
                    }
                }
            }
        }
        int total = deviceRecordsService.queryDeviceAccumulation();
        int today = deviceRecordsService.queryDailyLivingCapacity(1);
        int yesterday = deviceRecordsService.queryNewIncrements(1);
        String percentage = getPercent(yesterday,today);
        map.put("sales_name", "何程");
        map.put("total", total);
        map.put("today", today);
        map.put("yesterday",yesterday);
        map.put("os_type", "2");
        map.put("channel", "cszj");
        map.put("company_name", "深圳市创世智佳科技有限公司");
        map.put("name", "创世智佳产品(cszj) ");
//        map.put("product_id", 77);
//        map.put("channel_id", 764);
        map.put("percentage", percentage+'%');

        JSONArray jsonArray = JSONArray.fromObject(map);

        Map<String, Object> os_map = new HashMap<>();
        os_map.put("1", "Android");
        os_map.put("2", "非智能设备");


        Map<String, Object> chart_result_pie = new HashMap<>();
        chart_result_pie.put("创世智佳产品(test)", 23);


        hashMap.put("x", listDate);
        hashMap.put("y", dataCount);
        hashMap.put("product", jsonArray);
        hashMap.put("os_type", os_map);
//        hashMap.put("chart_result_pie", "[[\"创世智佳产品(cszj)\"," + 0 + "]]");
        hashMap.put("identification", "");

        String result = JSON.toJSONString(hashMap);

        jsonResult = JSONObject.fromObject(result);

        return new JSONResult(200, "SUCCESS", "Successful", jsonResult);
    }

    @RequestMapping("getChannelAnalysis")
    @ResponseBody
    public JSONResult getChannelAnalysis(HttpServletRequest request, HttpServletResponse response) {
        logger.info("进入了渠道分析方法：" + request.getParameter("product"));
        String time_horizon2 = request.getParameter("time_horizon2");
        String statistics_type2 = request.getParameter("statistics_type2");
        String time_group2 = request.getParameter("time_group2");

        JSONObject jsonResult = null;
        int days = 7;

        Map<String, Object> hashMap = new HashMap<>();
        if ("2".equals(time_horizon2)) {
            days = 31;
        } else if ("3".equals(time_horizon2)) {
            days = 365;
        }
        List<String> listDate = new ArrayList<>();
        List<Integer> dataCount = new ArrayList<>();
        if ("1".equals(statistics_type2)) {
            System.out.println("日活量>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            List<DeviceRecords> recordsList = deviceRecordsService.queryDailyLivingCapacityByDays(days);
            System.out.println("日活量方法.size" + recordsList.size());
            for (int i = 0; i < recordsList.size(); i++) {
                System.out.println("count" + recordsList.get(i).getCount());

                dataCount.add(recordsList.get(i).getCount());

                listDate.add(recordsList.get(i).getDays());
            }
            System.out.println("dataCount>>>>" + dataCount.size());
        } else if ("2".equals(statistics_type2)) {
            List<DeviceRecords> newIncrements = deviceRecordsService.queryDeviceNewIncrementsByDays(days);
            logger.info("newIncrements>>>>>>" + newIncrements.size());
            if ("1".equals(time_group2)) {
                logger.info("当前是新增量，默认为日>>>>>>");
                for (int i = 0; i < newIncrements.size(); i++) {
                    if (0 != newIncrements.size()) {

                        dataCount.add(newIncrements.get(i).getCount());

                        listDate.add(newIncrements.get(i).getDays());

                        logger.info("listDate>>>~~~~~~!!!!!!!" + listDate.size() + "\t" + dataCount.size());
                    } else {
                        logger.info("最近没有新增量>>>>");

                        dataCount.add(newIncrements.get(i).getCount());

                        listDate.add(newIncrements.get(i).getDays());
                    }
                }
                logger.info("arrayInt>>>>>>>" + dataCount.size());
            } else if ("2".equals(time_group2)) {
                logger.info("用户选择了周>>>>>>>>>>>" + days);
                List<DeviceRecords> weekList = deviceRecordsService.queryDeviceNewIncrementsByWeek(days);
                for (int i = 0; i < weekList.size(); i++) {
                    if (0 != weekList.size()) {
                        if ("1".equals(time_horizon2)) {
                            logger.info("七天前" + days);

                            logger.info("嘿嘿" + weekList.get(i).getCount());

                            logger.info("getDays()" + weekList.get(i).getWeeks());

                            listDate.add(weekList.get(i).getWeeks());

                            dataCount.add(weekList.get(i).getCount());

                        } else if ("2".equals(time_horizon2)) {
                            logger.info("三十天前" + days);

                            logger.info("看一下数据吧" + weekList.get(i).getWeeks());

                            dataCount.add(weekList.get(i).getCount());

                            listDate.add(weekList.get(i).getWeeks());

                        } else {
                            logger.info("一年前" + days);
                            logger.info("看一下数据吧" + weekList.get(i).getWeeks());

                            dataCount.add(weekList.get(i).getCount());

                            listDate.add(weekList.get(i).getWeeks());
                        }
                    } else {
                        System.out.println("没有数据啊》》》》》》》》》》》》");

                        dataCount.add(weekList.get(i).getCount());

                        listDate.add(weekList.get(i).getWeeks());
                    }
                }
            } else {
                logger.info("用户选择了月>>>>>>>>>>>" + "\t" + "days" + days);
                List<DeviceRecords> getMonthList = deviceRecordsService.queryDeviceNewIncrementsByMonth(days);
                logger.info("getMonthList.size>>>" + getMonthList.size());
                for (int k = 0; k < getMonthList.size(); k++) {
                    if (0 != getMonthList.size()) {
                        if ("1".equals(time_horizon2)) {
                            logger.info("七天前" + days);

                            dataCount.add(getMonthList.get(k).getCount());

                            listDate.add(getMonthList.get(k).getMonths());

                            logger.info("dataCount>>>>>>>>>>>>>>>" + dataCount.size());
                        } else if ("2".equals(time_horizon2)) {
                            logger.info("三十天前" + days);

                            dataCount.add(getMonthList.get(k).getCount());

                            listDate.add(getMonthList.get(k).getMonths());
                        } else {
                            logger.info("一年前" + days);

                            dataCount.add(getMonthList.get(k).getCount());

                            listDate.add(getMonthList.get(k).getMonths());
                        }
                    } else {
                        logger.info("月>>>没有数据 进入了 else");

                        dataCount.add(getMonthList.get(k).getCount());

                        listDate.add(getMonthList.get(k).getMonths());
                    }
                }
            }
        } else if ("3".equals(statistics_type2)) {
            List<DeviceRecords> accumulation = deviceRecordsService.queryDeviceAccumulationByDays(days);
            int accumulationCount = deviceRecordsService.queryDeviceAccumulation();
            logger.info("accumulation>>>>>>" + accumulation.size());
            if ("1".equals(time_group2)) {
                logger.info("累计量，默认为日>>>" + days);
                for (int i = 0; i < accumulation.size(); i++) {
                    if (0 != accumulation.size()) {
                        dataCount.add(accumulationCount);

                        listDate.add(accumulation.get(i).getDays());
                    }
                }
            } else if ("2".equals(time_group2)) {
                List<DeviceRecords> weekList = deviceRecordsService.queryDeviceAccumulationByWeek(days);
                for (int i = 0; i < weekList.size(); i++) {
                    if (0 != weekList.size()) {
                        if ("1".equals(time_horizon2)) {
                            logger.info("七天前" + days);

                            listDate.add(weekList.get(i).getWeeks());

                            dataCount.add(accumulationCount);

                        } else if ("2".equals(time_horizon2)) {
                            logger.info("三十天前" + days);

                            dataCount.add(accumulationCount);

                            listDate.add(weekList.get(i).getWeeks());

                        } else {
                            logger.info("一年前" + days);

                            dataCount.add(accumulationCount);

                            listDate.add(weekList.get(i).getWeeks());
                        }
                    }
                }
            } else {
                logger.info("累计量，用户选择了月>>>" + days);
                List<DeviceRecords> monthList = deviceRecordsService.queryDeviceAccumulationByMonth(days);
                for (int i = 0; i < monthList.size(); i++) {
                    if (0 != monthList.size()) {
                        if ("1".equals(time_horizon2)) {
                            listDate.add(monthList.get(i).getMonths());

                            dataCount.add(accumulationCount);
                        } else if ("2".equals(time_horizon2)) {
                            dataCount.add(accumulationCount);

                            listDate.add(monthList.get(i).getMonths());
                        } else {
                            logger.info("一年前" + days);
                            logger.info("看一下数据吧" + monthList.get(i).getMonths());

                            dataCount.add(accumulationCount);

                            listDate.add(monthList.get(i).getMonths());
                        }
                    }
                }
            }
        }
        Map<String, Object> data_channel = new HashMap<>();

        data_channel.put("name", "创世智佳产品(cszj)");

        data_channel.put("data", dataCount);

        JSONArray jsonArray1 = JSONArray.fromObject(data_channel);

        hashMap.put("channel_x", listDate);

        hashMap.put("data_channel", jsonArray1);

        hashMap.put("identification", "");

        String result = JSON.toJSONString(hashMap);

        jsonResult = JSONObject.fromObject(result);

        return new JSONResult(200, "SUCCESS", "Successful", jsonResult);
    }
    @RequestMapping("getTopData")
    @ResponseBody
    public JSONResult getTopData(HttpServletRequest request){
        JSONObject jsonResult = null;

        Map<String, Object> hashMap = new HashMap<>();

        String statistics_type3 = request.getParameter("statistics_type3");

//        System.out.println("statistics_type3>>>>>>>>"+statistics_type3);

        int count = 0;
        if ("1".equals(statistics_type3)){
           count =  deviceRecordsService.queryDailyLivingCapacity(1);
        }else if ("2".equals(statistics_type3)){
            count =  deviceRecordsService.queryNewIncrements(1);
        }else {
            count =  deviceRecordsService.queryDeviceAccumulation();
        }

        System.out.println("count："+count);

        if(0 == count){
            hashMap.put("chart_result_pie","[['',]]");
        }else {
            hashMap.put("chart_result_pie","[['创世智佳产品(cszj)',"+count+"]]");
        }

        String result = JSON.toJSONString(hashMap);

        jsonResult = JSONObject.fromObject(result);

        System.out.println("jsonResult"+jsonResult);

        return new JSONResult(200, "SUCCESS", "Successful Setup of Equipment Information", jsonResult);
    }


    public static String getPercent(int num1,int num2){
        // 创建一个数值格式化对象

        NumberFormat numberFormat = NumberFormat.getInstance();

        // 设置精确到小数点后5位

        numberFormat.setMaximumFractionDigits(5);

        String result = numberFormat.format((float) num1 / (float) num2 * 100);

        return result;
    }
}