package com.otaserver.ota_project.device.entity;

import com.alibaba.excel.annotation.ExcelProperty;
import com.alibaba.excel.metadata.BaseRowModel;

import java.util.Date;

/**
 * @Author: WangJiaPeng
 * @Date: 2019/10/14 16:53
 * @Version 1.0
 */
public class DeviceNumberBind extends BaseRowModel {
    private int id;
    @ExcelProperty(value = "设备Id" ,index = 1)
    private String deviceId;
    @ExcelProperty(value = "IMEI" ,index = 0)
    private String imeiNumber;

//    @ExcelProperty(value = "是否绑定" ,index = 2)
    private int isBind;

    private Date bindDateTime;
    @ExcelProperty(value = "绑定时间",index = 2)
    private String date;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    public String getImeiNumber() {
        return imeiNumber;
    }

    public void setImeiNumber(String imeiNumber) {
        this.imeiNumber = imeiNumber;
    }

    public int getIsBind() {
        return isBind;
    }

    public void setIsBind(int isBind) {
        this.isBind = isBind;
    }

    public Date getBindDateTime() {
        return bindDateTime;
    }

    public void setBindDateTime(Date bindDateTime) {
        this.bindDateTime = bindDateTime;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
