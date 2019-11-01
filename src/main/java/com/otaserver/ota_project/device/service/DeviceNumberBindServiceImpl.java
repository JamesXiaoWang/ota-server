package com.otaserver.ota_project.device.service;

import com.otaserver.ota_project.device.entity.DeviceNumberBind;
import com.otaserver.ota_project.device.mapper.DeviceNumberBindMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class DeviceNumberBindServiceImpl implements DeviceNumberBindService {

    @Autowired
    DeviceNumberBindMapper deviceNumberBindMapper;

    @Override
    public DeviceNumberBind queryDeviceBindInfo(String deviceId) {
        return deviceNumberBindMapper.queryDeviceBindInfo(deviceId);
    }

    @Override
    public int insertDeviceNumberBind(DeviceNumberBind deviceNumberBind) {
        return deviceNumberBindMapper.insertDeviceNumberBind(deviceNumberBind);
    }

    @Override
    public List<DeviceNumberBind> queryAllDeviceBindInfo() {
        return deviceNumberBindMapper.queryAllDeviceBindInfo();
    }

    @Override
    public int updateDeviceBindInfo(DeviceNumberBind deviceNumberBind) {
        return deviceNumberBindMapper.updateDeviceBindInfo(deviceNumberBind);
    }

    @Override
    public int getDeviceBindInfoCount() {
        return deviceNumberBindMapper.getDeviceBindInfoCount();
    }

    @Override
    public List<DeviceNumberBind> queryDeviceBindInfoByParams(String imeiNumber) {
        return deviceNumberBindMapper.queryDeviceBindInfoByParams(imeiNumber);
    }

    @Override
    public int updateDeviceBindStatus(String id) {
        return deviceNumberBindMapper.updateDeviceBindStatus(id);
    }
}
