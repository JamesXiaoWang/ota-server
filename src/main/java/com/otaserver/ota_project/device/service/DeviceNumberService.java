package com.otaserver.ota_project.device.service;

import com.otaserver.ota_project.device.entity.Page;
import com.otaserver.ota_project.device.entity.DeviceNumber;

import java.util.List;

/**
 * @Author: WangJiaPeng
 * @Date: 2019/8/8 18:18
 * @Version 1.0
 */
public interface DeviceNumberService {
    List<DeviceNumber> queryDeviceNumberAll();

    int getCount();

    List<DeviceNumber> queryDeviceNumberInfoByPages();

    List<DeviceNumber> queryDeviceNumberByParams(String number);

    int updateDeviceNumber(DeviceNumber deviceNumber);

    int insertDeviceNumber(DeviceNumber deviceNumber);

    int deleteDeviceNumber(String id);
}
