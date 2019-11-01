package com.otaserver.ota_project.device.entity;

import com.alibaba.excel.annotation.ExcelProperty;
import com.alibaba.excel.metadata.BaseRowModel;

/**
 * @Author: WangJiaPeng
 * @Date: 2019/10/14 9:30
 * @Version 1.0
 */
public class DeviceNumber extends BaseRowModel{
    private int id;

    @ExcelProperty(value = "IMEI" ,index = 0)
    private String imeiNumber;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getImeiNumber() {
        return imeiNumber;
    }

    public void setImeiNumber(String imeiNumber) {
        this.imeiNumber = imeiNumber;
    }
}
