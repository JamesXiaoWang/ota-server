package com.otaserver.ota_project.device.service;


import com.otaserver.ota_project.device.entity.DeviceNumberBind;

import java.util.List;

public interface DeviceNumberBindService {
    //查询所有的绑定的关系
    List<DeviceNumberBind> queryAllDeviceBindInfo();

    //查询绑定关系
    DeviceNumberBind queryDeviceBindInfo(String deviceId);

    int getDeviceBindInfoCount();

    //绑定
    int insertDeviceNumberBind(DeviceNumberBind deviceBind);

    int updateDeviceBindInfo(DeviceNumberBind deviceNumberBind);

    List<DeviceNumberBind> queryDeviceBindInfoByParams(String imeiNumber);

    int updateDeviceBindStatus(String id);
}
