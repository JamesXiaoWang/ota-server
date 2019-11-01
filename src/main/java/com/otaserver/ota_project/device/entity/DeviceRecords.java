package com.otaserver.ota_project.device.entity;

import com.alibaba.excel.annotation.ExcelProperty;
import com.alibaba.excel.metadata.BaseRowModel;

import java.io.Serializable;
import java.util.Date;

/**
 * @Author: WangJiaPeng
 * @Date: 2019/8/13 17:18
 * @Version 1.0
 */
public class DeviceRecords extends BaseRowModel implements Serializable {
    private static final long serialVersionUID = -4621342611090607621L;

    private Integer id;
    private Integer efId;
    @ExcelProperty(value = "projectId" ,index = 3)
    private String projectId;
    @ExcelProperty(value = "clientId" ,index = 2)
    private String clientId;
    @ExcelProperty(value = "deviceId" ,index = 1)
    private String deviceId;
    private String version;
    private Date registerDate;
    private String registerDateStr;
    private Integer status;
    private String remark;
    private Date lastLoginTime;

    private String country;
    private String region;
    private String city;
    private String ipAddress;
    @ExcelProperty(value = "IMEI" ,index = 0)
    private String imeiNumber;

    private String lastLoginTimeStr;

    private String aeskey;
    private String initversion;


    private Integer count;
    @ExcelProperty(value = "lastLoginTime" ,index = 4)
    private String days;
    private String weeks;
    private String months;
    private String dateFormat;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getEfId() {
        return efId;
    }

    public void setEfId(Integer efId) {
        this.efId = efId;
    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public Date getRegisterDate() {
        return registerDate;
    }

    public void setRegisterDate(Date registerDate) {
        this.registerDate = registerDate;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Date getLastLoginTime() {
        return lastLoginTime;
    }

    public void setLastLoginTime(Date lastLoginTime) {
        this.lastLoginTime = lastLoginTime;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    //    public String getRegisterDateStr() {
//        registerDateStr = DateUtil.dateToStr(getRegisterDate(), 11);
//        return registerDateStr;
//    }
//
//    public String getLastLoginTimeStr() {
//        lastLoginTimeStr = DateUtil.dateToStr(getLastLoginTime(), 12);
//        return lastLoginTimeStr;
//    }


    public String getImeiNumber() {
        return imeiNumber;
    }

    public void setImeiNumber(String imeiNumber) {
        this.imeiNumber = imeiNumber;
    }

    public String getAeskey() {
        return aeskey;
    }

    public void setAeskey(String aeskey) {
        this.aeskey = aeskey;
    }

    public String getInitversion() {
        return initversion;
    }

    public void setInitversion(String initversion) {
        this.initversion = initversion;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public String getDays() {
        return days;
    }

    public void setDays(String days) {
        this.days = days;
    }

    public String getDateFormat() {
        return dateFormat;
    }

    public void setDateFormat(String dateFormat) {
        this.dateFormat = dateFormat;
    }

    public String getWeeks() {
        return weeks;
    }

    public void setWeeks(String weeks) {
        this.weeks = weeks;
    }

    public String getMonths() {
        return months;
    }

    public void setMonths(String months) {
        this.months = months;
    }
}
