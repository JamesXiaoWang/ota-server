package com.otaserver.ota_project.device.controller;

import com.alibaba.fastjson.JSON;
import com.otaserver.ota_project.common.util.JSONResult;
import com.otaserver.ota_project.common.util.Utils;
import com.otaserver.ota_project.device.entity.Device;
import com.otaserver.ota_project.device.entity.DeviceRecords;
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
import javax.xml.crypto.Data;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @Author: WangJiaPeng
 * @Date: 2019/9/3 12:23
 * @Version 1.0
 */
@Controller
@RequestMapping("/device")
public class DeviceVersionController {

    private static Logger logger = LoggerFactory.getLogger(DeviceVersionController.class);

    @Autowired
    DeviceVersionService deviceVersionService;

    @Autowired
    DeviceRecordsService deviceRecordsService;

    @RequestMapping("/version_statistics")
    public String version_statistics(HttpServletRequest request, Model model) {
        System.out.println("品牌：" + request.getParameter("brand"));

        System.out.println("model：" + request.getParameter("model"));

        List<Device> listModel = deviceVersionService.getDeviceModelAndClientId();

        List<Device> listBrand = deviceVersionService.getDeviceClientId();

        model.addAttribute("brand",request.getParameter("brand"));

        model.addAttribute("model",request.getParameter("model"));

        model.addAttribute("listModel", listModel);

        model.addAttribute("listBrand", listBrand);

        return "/home/version_statistics";
    }
    @RequestMapping("/version_details")
    public String version_details(HttpServletRequest request, Model model) {
        System.out.println("request>>>"+request.getParameter("version"));

        //下拉框
        List<Device> list = deviceVersionService.selectDeviceVersionList();

        List<Device> listModel= deviceVersionService.getDeviceModelAndClientId();

        List<Device> listBrand = deviceVersionService.getDeviceClientId();

        model.addAttribute("version",request.getParameter("version"));

        model.addAttribute("listVersion", list);

        model.addAttribute("listModel", listModel);

        model.addAttribute("listBrand", listBrand);

        return "/home/version_details";
    }
    @RequestMapping("/version_rank")
    public String version_rank(HttpServletRequest request, Model model) {
        System.out.println("brand>>>>>>>>>>>>>>"+request.getParameter("brand"));

        System.out.println("model>>>>>>>>>>>>>>"+request.getParameter("model"));

        List<Device> listModel = deviceVersionService.getDeviceModelAndClientId();

        List<Device> listBrand = deviceVersionService.getDeviceClientId();

        model.addAttribute("brand",request.getParameter("brand"));

        model.addAttribute("model",request.getParameter("model"));

        model.addAttribute("listModel", listModel);

        model.addAttribute("listBrand",listBrand);

        return "/home/version_rank";
    }
    @RequestMapping("/version_area")
    public String version_area(HttpServletRequest request, Model model) {
        String projectId = "",clientId = "",version = "",date = "";

        if (!Utils.isObjNull(request)) {
            projectId = !Utils.isObjNull(request.getParameter("model")) ? request.getParameter("model").trim() : "";
            clientId = !Utils.isObjNull(request.getParameter("brand")) ? request.getParameter("brand").trim() : "";
            version = !Utils.isObjNull(request.getParameter("version")) ? request.getParameter("version").trim() : "";
            date = !Utils.isObjNull(request.getParameter("date")) ? request.getParameter("date").trim() : "";
        }

        System.out.println(projectId+"\t"+clientId+"\t"+date);

        List<Device> list = deviceVersionService.getDeviceModelAndClientId();

        List<Device> listBrand = deviceVersionService.getDeviceClientId();

        model.addAttribute("clientId",clientId);

        model.addAttribute("projectId",projectId);

        model.addAttribute("version",version);
        if ("".equals(date)){
            SimpleDateFormat sdf =new SimpleDateFormat("yyyy-MM-dd" );
            Date d= new Date();
            String str = sdf.format(d);
            model.addAttribute("date",str);
        }else{
            model.addAttribute("date",date);
        }

        model.addAttribute("list", list);

        model.addAttribute("listBrand", listBrand);

        return "/home/version_area";
    }
    @RequestMapping("/version_area_version")
    @ResponseBody
    public JSONResult version_area_version(HttpServletRequest request) {
        String model = "",brand = "";
        if (!Utils.isObjNull(request)) {
            model = !Utils.isObjNull(request.getParameter("model")) ? request.getParameter("model").trim() : "";
            brand = !Utils.isObjNull(request.getParameter("brand")) ? request.getParameter("brand").trim() : "";
        } else{
            return new JSONResult(200,"ERROR", "The parameter value is empty！", "");
        }
        String version = model + ".MT7686%";
        if ("HJ001".equals(model)){
            version = model + "%";
        }

        JSONObject jsonResult = null;

        Map<String, Object> hashMap = new HashMap<>();

        System.out.println("准备获取版本啦>>>>"+request.getParameter("model")+"\t"+"brand"+"\t"+request.getParameter("brand"));
        List<String> x = new ArrayList<>();
        List<Device> list = deviceVersionService.selectVersionData(version,brand,model);
        for (int i = 0;i < list.size();i++){
            x.add(list.get(i).getVersion());
        }

        return new JSONResult(200, "SUCCESS", "Successful", x);
    }
    @RequestMapping("/version_area_ajax")
    @ResponseBody
    public JSONResult version_area_ajax(HttpServletRequest request) {
        System.out.println("version_are_ajax>>>>>>>>" + request.getParameter("area") + "\t" + request.getParameter("date"));
        String model = "", brand = "", version = "", time_horizon1 = "", date = "", statistics_type1 = "",area = "";

        if (!Utils.isObjNull(request)) {
            model = !Utils.isObjNull(request.getParameter("model")) ? request.getParameter("model").trim() : "";
            brand = !Utils.isObjNull(request.getParameter("brand")) ? request.getParameter("brand").trim() : "";
            version = !Utils.isObjNull(request.getParameter("version")) ? request.getParameter("version").trim() : "";
            date = !Utils.isObjNull(request.getParameter("date")) ? request.getParameter("date").trim() : "";
            area = !Utils.isObjNull(request.getParameter("area")) ? request.getParameter("area").trim() : "";
            statistics_type1 = !Utils.isObjNull(request.getParameter("statistics_type1")) ? request.getParameter("statistics_type1").trim() : "";
        } else {
            return new JSONResult(200, "ERROR", "The parameter value is empty！", "");
        }
        JSONObject jsonResult = null;
        Map<String, Object> hashMap = new HashMap<>();
        List<String> x = new ArrayList<>();
        List<Map> mapsTable = new ArrayList<>();
        List<Map> mapsTable2 = new ArrayList<>();
        List<Integer> y = new ArrayList<>();

        String lastTime = date + '%';
        if ("1".equals(area)){
           logger.info("area= "+area+"\t"+"中国地图>>>>>>>>>>>>>>>>>>>>>>>"+statistics_type1);
           if ("1".equals(statistics_type1)){
               logger.info("日活量>>>>>>>>>>>>>>>>>");
               List<DeviceRecords> mapsList = deviceRecordsService.getMapAreaDetails(brand,model,version,lastTime);
               List<DeviceRecords> areaDetails = deviceRecordsService.getAreaDetails(brand,model,version);
               for (int m = 0;m < mapsList.size();m++){
                   Map<String, Object> map = new HashMap<>();

                   System.out.println("region>>>>>>>>>>>>>>>>"+mapsList.get(m).getRegion().replace("省",""));
                   if (mapsList.get(m).getRegion().contains("省")){
                       map.put("area",mapsList.get(m).getRegion().replace("省",""));
                   }else if (mapsList.get(m).getRegion().contains("市")){
                       //直辖市
                       map.put("area",mapsList.get(m).getRegion().replace("市",""));
                   }else{
                       //特别行政区
                       map.put("area",mapsList.get(m).getRegion().replace("特别行政区",""));
                   }

                   map.put("city",mapsList.get(m).getCity().replace("市",""));

                   map.put("value",mapsList.get(m).getCount());

                   mapsTable2.add(map);
               }
               for (int i = 0;i < areaDetails.size();i++){
                   Map<String, Object> map_table = new HashMap<>();

                   map_table.put("active",areaDetails.get(i).getCount());

                   map_table.put("new",areaDetails.get(i).getCount());

                   map_table.put("total",areaDetails.get(i).getCount());

                   map_table.put("brand",areaDetails.get(i).getClientId());

                   map_table.put("model",areaDetails.get(i).getProjectId());

                   map_table.put("version",areaDetails.get(i).getVersion());

                   map_table.put("area",areaDetails.get(i).getRegion());

                   mapsTable.add(map_table);
               }
           }else if ("2".equals(statistics_type1)){
               logger.info("新增量>>>>>>>>>>>>>>>>>");
               List<DeviceRecords> mapsList = deviceRecordsService.getMapAreaDetailsNewIncrement(brand,model,version,lastTime);
               List<DeviceRecords> areaDetails = deviceRecordsService.getAreaDetailsNewIncrement(brand,model,version);
               for (int m = 0;m < mapsList.size();m++){
                   Map<String, Object> map = new HashMap<>();

                   System.out.println("region>>>>>>>>>>>>>>>>"+mapsList.get(m).getRegion().replace("省",""));
                   if (mapsList.get(m).getRegion().contains("省")){
                       map.put("area",mapsList.get(m).getRegion().replace("省",""));
                   }else if (mapsList.get(m).getRegion().contains("市")){
                       //直辖市
                       map.put("area",mapsList.get(m).getRegion().replace("市",""));
                   }else{
                       //特别行政区
                       map.put("area",mapsList.get(m).getRegion().replace("特别行政区",""));
                   }

                   map.put("city",mapsList.get(m).getCity().replace("市",""));

                   map.put("value",mapsList.get(m).getCount());

                   mapsTable2.add(map);
               }
               for (int i = 0;i < areaDetails.size();i++){
                   Map<String, Object> map_table = new HashMap<>();

                   map_table.put("active",areaDetails.get(i).getCount());

                   map_table.put("new",areaDetails.get(i).getCount());

                   map_table.put("total",areaDetails.get(i).getCount());

                   map_table.put("brand",areaDetails.get(i).getClientId());

                   map_table.put("model",areaDetails.get(i).getProjectId());

                   map_table.put("version",areaDetails.get(i).getVersion());

                   map_table.put("area",areaDetails.get(i).getRegion());

                   mapsTable.add(map_table);
               }
           }else {
               logger.info("累计量>>>>>>>>>>>>>>>>>");
               List<DeviceRecords> mapsList = deviceRecordsService.getMapAreaDetails(brand,model,version,lastTime);
               List<DeviceRecords> areaDetails = deviceRecordsService.getAreaDetails(brand,model,version);
               for (int m = 0;m < mapsList.size();m++){
                   Map<String, Object> map = new HashMap<>();

                   System.out.println("region>>>>>>>>>>>>>>>>"+mapsList.get(m).getRegion().replace("省",""));
                   if (mapsList.get(m).getRegion().contains("省")){
                       map.put("area",mapsList.get(m).getRegion().replace("省",""));
                   }else if (mapsList.get(m).getRegion().contains("市")){
                       //直辖市
                       map.put("area",mapsList.get(m).getRegion().replace("市",""));
                   }else{
                       //特别行政区
                       map.put("area",mapsList.get(m).getRegion().replace("特别行政区",""));
                   }

                   map.put("city",mapsList.get(m).getCity().replace("市",""));

                   map.put("value",mapsList.get(m).getCount());

                   mapsTable2.add(map);
               }
               for (int i = 0;i < areaDetails.size();i++){
                   Map<String, Object> map_table = new HashMap<>();

                   map_table.put("active",areaDetails.get(i).getCount());

                   map_table.put("new",areaDetails.get(i).getCount());

                   map_table.put("total",areaDetails.get(i).getCount());

                   map_table.put("brand",areaDetails.get(i).getClientId());

                   map_table.put("model",areaDetails.get(i).getProjectId());

                   map_table.put("version",areaDetails.get(i).getVersion());

                   map_table.put("area",areaDetails.get(i).getRegion());

                   mapsTable.add(map_table);
               }
           }

        }else if ("2".equals(area)){
            logger.info("area= "+area+"\t"+"世界地图>>>>>>>>>>>>>>>>>>>>>>>");
            List<DeviceRecords> mapsList = deviceRecordsService.getMapAreaDetails(brand,model,version,lastTime);
            List<DeviceRecords> areaDetails = deviceRecordsService.getAreaDetails(brand,model,version);
            for (int m = 0;m < mapsList.size();m++){
                Map<String, Object> map = new HashMap<>();

                map.put("area","中国");

                map.put("value",mapsList.get(m).getCount());

                mapsTable2.add(map);
            }

            for (int i = 0;i < areaDetails.size();i++){
                Map<String, Object> map_table = new HashMap<>();

                map_table.put("active",areaDetails.get(i).getCount());

                map_table.put("new",areaDetails.get(i).getCount());

                map_table.put("total",areaDetails.get(i).getCount());

                map_table.put("brand",areaDetails.get(i).getClientId());

                map_table.put("model",areaDetails.get(i).getProjectId());

                map_table.put("version",areaDetails.get(i).getVersion());

                map_table.put("area",areaDetails.get(i).getRegion());

                mapsTable.add(map_table);
            }
        }

        hashMap.put("x",mapsTable2);

        hashMap.put("table", mapsTable);

        hashMap.put("page_result",false);

        String result = JSON.toJSONString(hashMap);
        //记录一下，数据显示有问题
        jsonResult = JSONObject.fromObject(result);

        System.out.println("jsonResult>>>>>>>>>>>>>>>>>>>>" + jsonResult);

        return new JSONResult(200, "SUCCESS", "Successful", jsonResult);
    }
    @RequestMapping("/version_details_ajax")
    @ResponseBody
    public JSONResult version_details_ajax(HttpServletRequest request) {
        System.out.println("请求进来啦》》》》》》"+request.getParameter("time_horizon1")+"\t"+request.getParameter("model"));
        String model = "",brand = "",version = "",time_horizon1 = "",time_group1 = "",statistics_type1 = "";

        if (!Utils.isObjNull(request)) {
            model = !Utils.isObjNull(request.getParameter("model")) ? request.getParameter("model").trim() : "";
            brand = !Utils.isObjNull(request.getParameter("brand")) ? request.getParameter("brand").trim() : "";
            version = !Utils.isObjNull(request.getParameter("version")) ? request.getParameter("version").trim() : "";
            time_horizon1 = !Utils.isObjNull(request.getParameter("time_horizon1")) ? request.getParameter("time_horizon1").trim() : "";
            time_group1 = !Utils.isObjNull(request.getParameter("time_group1")) ? request.getParameter("time_group1").trim() : "";
            statistics_type1 = !Utils.isObjNull(request.getParameter("statistics_type1")) ? request.getParameter("statistics_type1").trim() : "";
        } else{
            return new JSONResult(200,"ERROR", "The parameter value is empty！", "");
        }
        JSONObject jsonResult = null;
        Map<String, Object> hashMap = new HashMap<>();
        List<String> x = new ArrayList<>();
        List<Map> mapsTable = new ArrayList<>();
        List<Map> mapsTable2 = new ArrayList<>();
        List<Integer> y = new ArrayList<>();
        int days = 7;
        if ("2".equals(time_horizon1)) {
            days = 31;
        } else if ("3".equals(time_horizon1)) {
            days = 365;
        }
        System.out.println("model>>>"+model+"\t"+"brand"+brand+"\t"+"version"+version+"\t"+days);
        //获取版本明细数据
        List<Device> queryVersionDetails = deviceVersionService.queryVersionDetails(days,version,brand,model);
        System.out.println("queryVersionDetails>>>"+queryVersionDetails.size());
        List<Device> versionNewIncrements = deviceVersionService.getVersionNewIncrements(days,version,brand,model);
        if ("1".equals(statistics_type1)) {
            System.out.println("日活量>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+days);
            for (int i = 0; i < queryVersionDetails.size(); i++) {
                x.add(queryVersionDetails.get(i).getDays());

                y.add(queryVersionDetails.get(i).getCount());

                Map<String, Object> map_table = new HashMap<>();

                map_table.put("target_date",queryVersionDetails.get(i).getDays());

                map_table.put("active",queryVersionDetails.get(i).getCount());

                map_table.put("new",versionNewIncrements.get(i).getCount());

                map_table.put("brand",queryVersionDetails.get(i).getClientId());

                map_table.put("model",queryVersionDetails.get(i).getProjectId());

                map_table.put("version",queryVersionDetails.get(i).getVersion());

                mapsTable.add(map_table);
            }
        } else {
            System.out.println("新增量>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            if ("1".equals(time_group1)){
                List<Device> newIncrementsList = deviceVersionService.getVersionNewIncrements(days,version,brand,model);
                System.out.println("list>>>>>>>>>>"+newIncrementsList.size());
                for (int i = 0;i < newIncrementsList.size();i++){
                    x.add(newIncrementsList.get(i).getDays());

                    y.add(newIncrementsList.get(i).getCount());

                    Map<String, Object> map_table = new HashMap<>();

                    map_table.put("target_date",newIncrementsList.get(i).getDays());

                    map_table.put("active",newIncrementsList.get(i).getCount());

                    map_table.put("new",newIncrementsList.get(i).getCount());

                    map_table.put("brand",newIncrementsList.get(i).getClientId());

                    map_table.put("model",newIncrementsList.get(i).getProjectId());

                    map_table.put("version",newIncrementsList.get(i).getVersion());

                    mapsTable.add(map_table);
                }
            }else if ("2".equals(time_group1)){
                System.out.println("周>>>>>>>>>>>>>>>>>>>"+days);
                List<Device> newIncrementsByWeek = deviceVersionService.queryDeviceNewIncrementsByWeek(days,version,brand,model);
                if (0 != newIncrementsByWeek.size()){
                    for (int i = 0;i < newIncrementsByWeek.size();i++){

                        x.add(newIncrementsByWeek.get(i).getWeeks());

                        y.add(newIncrementsByWeek.get(i).getCount());

                        Map<String, Object> map_table = new HashMap<>();

                        map_table.put("target_date",newIncrementsByWeek.get(i).getWeeks());

                        map_table.put("active",newIncrementsByWeek.get(i).getCount());

                        map_table.put("new",newIncrementsByWeek.get(i).getCount());

                        map_table.put("brand",newIncrementsByWeek.get(i).getClientId());

                        map_table.put("model",newIncrementsByWeek.get(i).getProjectId());

                        map_table.put("version",newIncrementsByWeek.get(i).getVersion());

                        mapsTable.add(map_table);
                    }

                }else{
                    x.add("");
                    y.add(0);
                }

            }else{
                System.out.println("月>>>>>>>>>>>>>>>>>>>"+days+"\t"+"brand>>>"+brand+"\t"+"model>>>"+model);
                List<Device> newIncrementsByMonths = deviceVersionService.queryDeviceNewIncrementsByMonths(days,version,brand,model);
                if (0 != newIncrementsByMonths.size()){
                    System.out.println("newIncrementsByMonths>>>>>"+newIncrementsByMonths.size());
                    for (int i = 0;i < newIncrementsByMonths.size();i++){
                        x.add(newIncrementsByMonths.get(i).getMonths());

                        y.add(newIncrementsByMonths.get(i).getCount());

                        Map<String, Object> map_table = new HashMap<>();

                        map_table.put("target_date",newIncrementsByMonths.get(i).getMonths());

                        map_table.put("active",newIncrementsByMonths.get(i).getCount());

                        map_table.put("new",newIncrementsByMonths.get(i).getCount());

                        map_table.put("brand",newIncrementsByMonths.get(i).getClientId());

                        map_table.put("model",newIncrementsByMonths.get(i).getProjectId());

                        map_table.put("version",newIncrementsByMonths.get(i).getVersion());

                        mapsTable.add(map_table);
                    }

                }else{
                    x.add("");
                    y.add(0);
                }
            }

            //周，月
        }
        hashMap.put("x", x);

        hashMap.put("y", y);

        hashMap.put("table", mapsTable);

        hashMap.put("page_result",false);

        String result = JSON.toJSONString(hashMap);

        jsonResult = JSONObject.fromObject(result);

        System.out.println("jsonResult>>>>>>>>>>>>>>>>>>>>" + jsonResult);

        return new JSONResult(200, "SUCCESS", "Successful", jsonResult);
    }

    @RequestMapping("/version_rank_ajax")
    @ResponseBody
    public JSONResult version_rank_ajax(HttpServletRequest request) {
        JSONObject jsonResult = null;
        Map<String, Object> hashMap = new HashMap<>();
        List<String> x = new ArrayList<>();
        List<Map> mapsTable = new ArrayList<>();
        List<Map> mapsTable2 = new ArrayList<>();
        List<Integer> y = new ArrayList<>();
        String model = "",brand = "";

        if (!Utils.isObjNull(request)) {
            model = !Utils.isObjNull(request.getParameter("model")) ? request.getParameter("model").trim() : "";
            brand = !Utils.isObjNull(request.getParameter("brand")) ? request.getParameter("brand").trim() : "";
        } else{
            return new JSONResult(200,"ERROR", "The parameter value is empty！", "");
        }
        String version = model + ".MT7686%";
        if ("HJ001".equals(model)){
            version = model + "%";
        }
        System.out.println("model>>>"+model+"\t"+"brand"+"\t"+brand);

        List<Device> queryVersionRankList = deviceVersionService.queryVersionRank(version,brand,model);

        int versionCount = deviceVersionService.getVersionTotal(version);

        for (int i = 0;i < queryVersionRankList.size();i++){
            System.out.println("queryVersionRankList.get(i).getCount()>>>>"+queryVersionRankList.get(i).getCount());

            x.add(queryVersionRankList.get(i).getVersion());

            y.add(i,queryVersionRankList.get(i).getCount());

            Map<String, Object> map_table = new HashMap<>();

            Map<String, Object> map = new HashMap<>();

            map_table.put("model",queryVersionRankList.get(i).getProjectId());

            map_table.put("brand",queryVersionRankList.get(i).getClientId());

            map_table.put("version",queryVersionRankList.get(i).getVersion());

            map_table.put("total",queryVersionRankList.get(i).getCount());

            String total_percentage = getPercent(queryVersionRankList.get(i).getCount(),versionCount);

            map_table.put("total_percentage",total_percentage + '%');

            map.put("name", queryVersionRankList.get(i).getVersion());

            map.put("y", queryVersionRankList.get(i).getCount());

            map_table.put("new",0);

            map_table.put("count",0);

            mapsTable.add(map_table);

            mapsTable2.add(map);
        }
        hashMap.put("x", x);

        hashMap.put("y", y);

        hashMap.put("chart",mapsTable2);

        hashMap.put("table", mapsTable);

        hashMap.put("page_result", false);

        String result = JSON.toJSONString(hashMap);
        //记录一下，数据显示有问题
        jsonResult = JSONObject.fromObject(result);

        System.out.println("jsonResult>>>>>>>>>>>>>>>>>>>>" + jsonResult);

        return new JSONResult(200, "SUCCESS", "Successful", jsonResult);
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
