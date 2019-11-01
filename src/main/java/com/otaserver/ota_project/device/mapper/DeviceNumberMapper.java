package com.otaserver.ota_project.device.mapper;

import com.otaserver.ota_project.device.entity.DeviceNumber;
import com.otaserver.ota_project.device.entity.Page;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DeviceNumberMapper {

    List<DeviceNumber> queryDeviceNumberAll();

    int getCount();

    List<DeviceNumber> queryDeviceNumberInfoByPages();

    List<DeviceNumber> queryDeviceNumberByParams(String number);

    int updateDeviceNumber(DeviceNumber deviceNumber);

    int insertDeviceNumber(DeviceNumber deviceNumber);

    int deleteDeviceNumber(String id);
}
