package com.otaserver.ota_project.device.controller;

import com.github.pagehelper.PageHelper;
import com.otaserver.ota_project.common.excel.ExcelUtil;
import com.otaserver.ota_project.device.entity.DeviceNumber;
import com.otaserver.ota_project.device.entity.DeviceNumberBind;
import com.otaserver.ota_project.device.entity.DeviceRecords;
import com.otaserver.ota_project.device.service.DeviceNumberBindService;
import com.otaserver.ota_project.device.service.DeviceRecordsService;
import com.otaserver.ota_project.device.service.DeviceNumberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

/**
 * Created with IntelliJ IDEA
 *
 * @Author yuanhaoyue swithaoy@gmail.com
 * @Description
 * @Date 2018-06-05
 * @Time 16:56
 */
@RestController
public class ExcelController {

    @Autowired
    DeviceNumberService imeiService;

    @Autowired
    DeviceRecordsService recordsService;

    @Autowired
    DeviceNumberBindService bindService;

    /**
     * 导出近期登录记录
     * @param response
     * @throws IOException
     */
    @RequestMapping(value = "writeExcelDeviceRecords", method = RequestMethod.GET)
    public void writeExcelDeviceRecords(HttpServletResponse response) throws IOException {
        int count = recordsService.getDeviceRecordsCount();
        PageHelper.startPage(1,count);
        List<DeviceRecords> list = recordsService.queryDeviceRecordsPage();
        String fileName = "login_tables";
        String sheetName = "Sheet1";

        ExcelUtil.writeExcel(response, list, fileName, sheetName, new DeviceRecords());
    }
    /**
     * 导出IMEI号
     */
    @RequestMapping(value = "writeExcelDeviceNumber", method = RequestMethod.GET)
    public void writeExcelDeviceNumber(HttpServletResponse response) throws IOException {
        List<DeviceNumber> list =  imeiService.queryDeviceNumberAll();
        String fileName = "IMEI";
        String sheetName = "Sheet1";

        ExcelUtil.writeExcel(response, list, fileName, sheetName, new DeviceNumber());
    }

    /**
     * 导出已绑定的设备数据
     * @param response
     * @throws IOException
     */
    @RequestMapping(value = "writeExcelDeviceBindInfo", method = RequestMethod.GET)
    public void writeExcelDeviceBindInfo(HttpServletResponse response) throws IOException {
        List<DeviceNumberBind> list =  bindService.queryAllDeviceBindInfo();

        String fileName = "bind_list_info";

        String sheetName = "Sheet1";

        ExcelUtil.writeExcel(response, list, fileName, sheetName, new DeviceNumberBind());
    }

}
