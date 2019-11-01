package com.otaserver.ota_project.device.service;

import com.otaserver.ota_project.device.entity.Device;
import com.otaserver.ota_project.device.mapper.DeviceMapper;
import com.otaserver.ota_project.device.mapper.DeviceModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @Author: WangJiaPeng
 * @Date: 2019/9/10 11:08
 * @Version 1.0
 */
@Service
@Transactional
public class DeviceModelServiceImpl implements DeviceModelService{

    @Autowired
    DeviceModelMapper deviceModelMapper;

    @Override
    public List<Device> getDeviceClientId() {
        return deviceModelMapper.getDeviceClientId();
    }

    @Override
    public List<Device> getModelStatisticsByDaysCapacity(int day_count,String clientId) {
        return deviceModelMapper.getModelStatisticsByDaysCapacity(day_count,clientId);
    }

    @Override
    public List<Device> getModelStatisticsByDaysNewIncrement(int day_count, String clientId) {
        return deviceModelMapper.getModelStatisticsByDaysNewIncrement(day_count,clientId);
    }

    @Override
    public List<Device> getModelStatisticsByWeekNewIncrement(int day_count, String clientId) {
        return deviceModelMapper.getModelStatisticsByWeekNewIncrement(day_count,clientId);
    }

    @Override
    public List<Device> getModelStatisticsByMonthNewIncrement(int day_count, String clientId) {
        return deviceModelMapper.getModelStatisticsByMonthNewIncrement(day_count,clientId);
    }

    @Override
    public List<Device> getModelStatisticsByDaysAccumulation(int day_count, String clientId) {
        return deviceModelMapper.getModelStatisticsByDaysAccumulation(day_count,clientId);
    }

    @Override
    public List<Device> getModelStatisticsByWeekAccumulation(int day_count, String clientId) {
        return deviceModelMapper.getModelStatisticsByWeekAccumulation(day_count,clientId);
    }

    @Override
    public List<Device> getModelStatisticsByMonthAccumulation(int day_count, String clientId) {
        return deviceModelMapper.getModelStatisticsByMonthAccumulation(day_count,clientId);
    }

    @Override
    public List<Device> getModelSummarize(int day_count,String clientId) {
        return deviceModelMapper.getModelSummarize(day_count,clientId);
    }

    @Override
    public Integer getModelTotal(String version, String clientId, String projectId) {
        return deviceModelMapper.getModelTotal(version,clientId,projectId);
    }

    @Override
    public List<Device> getModelDetailsByDaysCapacity(int day_count, String clientId, String projectId) {
        return deviceModelMapper.getModelDetailsByDaysCapacity(day_count,clientId,projectId);
    }

    @Override
    public List<Device> getModelDetailsByDaysNewIncrement(int day_count, String clientId, String projectId) {
        return deviceModelMapper.getModelDetailsByDaysNewIncrement(day_count,clientId,projectId);
    }

    @Override
    public List<Device> getModelDetailsByWeekNewIncrement(int day_count, String clientId, String projectId) {
        return deviceModelMapper.getModelDetailsByWeekNewIncrement(day_count,clientId,projectId);
    }

    @Override
    public List<Device> getModelDetailsByMonthNewIncrement(int day_count, String clientId, String projectId) {
        return deviceModelMapper.getModelDetailsByMonthNewIncrement(day_count,clientId,projectId);
    }
}
