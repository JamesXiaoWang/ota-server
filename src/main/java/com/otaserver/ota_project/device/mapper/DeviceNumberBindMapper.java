package com.otaserver.ota_project.device.mapper;

import com.otaserver.ota_project.device.entity.DeviceNumberBind;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * @Author: WangJiaPeng
 * @Date: 2019/8/13 16:01
 * @Version 1.0
 */
@Mapper
@Repository
public interface DeviceNumberBindMapper {
    //查询所有的绑定的关系
    List<DeviceNumberBind> queryAllDeviceBindInfo();

    int getDeviceBindInfoCount();

    //查询绑定关系
    DeviceNumberBind queryDeviceBindInfo(String deviceId);

    //绑定
    int insertDeviceNumberBind(DeviceNumberBind deviceBind);

    int updateDeviceBindInfo(DeviceNumberBind deviceNumberBind);

    List<DeviceNumberBind> queryDeviceBindInfoByParams(String imeiNumber);
    //解绑
    int updateDeviceBindStatus(String id);

}
