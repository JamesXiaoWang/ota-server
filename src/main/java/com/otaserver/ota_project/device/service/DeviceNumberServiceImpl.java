package com.otaserver.ota_project.device.service;

import com.otaserver.ota_project.device.entity.DeviceNumber;
import com.otaserver.ota_project.device.entity.Page;
import com.otaserver.ota_project.device.mapper.DeviceNumberMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @Author: WangJiaPeng
 * @Date: 2019/8/8 18:18
 * @Version 1.0
 */
@Service
@Transactional
public class DeviceNumberServiceImpl implements DeviceNumberService {

    @Autowired
    DeviceNumberMapper imeiMapper;

    @Override
    public List<DeviceNumber> queryDeviceNumberAll() {
        return imeiMapper.queryDeviceNumberAll();
    }

    @Override
    public int getCount() {
        return imeiMapper.getCount();
    }

    @Override
    public List<DeviceNumber> queryDeviceNumberInfoByPages() {
        return imeiMapper.queryDeviceNumberInfoByPages();
    }

    @Override
    public List<DeviceNumber> queryDeviceNumberByParams(String number) {
        return imeiMapper.queryDeviceNumberByParams(number);
    }

    @Override
    public int updateDeviceNumber(DeviceNumber deviceNumber) {
        return imeiMapper.updateDeviceNumber(deviceNumber);
    }

    @Override
    public int insertDeviceNumber(DeviceNumber deviceNumber) {
        return imeiMapper.insertDeviceNumber(deviceNumber);
    }

    @Override
    public int deleteDeviceNumber(String id) {
        return imeiMapper.deleteDeviceNumber(id);
    }
}
