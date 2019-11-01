package com.otaserver.ota_project.device.entity;

import java.io.Serializable;

/**
 * @Author: WangJiaPeng
 * @Date: 2019/8/13 15:54
 * @Version 1.0
 */
public class Device implements Serializable {
    private static final long serialVersionUID = 2415422993893744354L;
    // id
    private Integer id;
    // 设备-项目ID
    private String projectId;
    // 设备-客户ID
    private String clientId;
    // apikey
    private String apiKey;
    // 设备ID
    private String deviceId;
    // 版本号
    private String version;
    // 版本链接
    private String url;

    private Integer status;

    private String dvtype;

    private int isCheck;

    private int count;

    private String days;

    private String weeks;

    private String months;

    public Device() {

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public String getApiKey() {
        return apiKey;
    }

    public void setApiKey(String apiKey) {
        this.apiKey = apiKey;
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

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getDvtype() {
        return dvtype;
    }

    public void setDvtype(String dvtype) {
        this.dvtype = dvtype;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public String getDays() {
        return days;
    }

    public void setDays(String days) {
        this.days = days;
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
