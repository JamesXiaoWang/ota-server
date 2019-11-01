package com.otaserver.ota_project.device.service;

import com.otaserver.ota_project.device.entity.Device;
import com.otaserver.ota_project.device.entity.DeviceRecords;
import com.otaserver.ota_project.device.mapper.DeviceMapper;
import com.otaserver.ota_project.device.mapper.DeviceRecordsMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @Author: WangJiaPeng
 * @Date: 2019/8/27 11:24
 * @Version 1.0
 */
@Service
@Transactional
public class DeviceServiceImpl implements DeviceService{

    @Autowired
    DeviceMapper deviceMapper;

    @Override
    public int queryDeviceAccumulation(int day_count) {
        return deviceMapper.queryDeviceAccumulation(day_count);
    }

    @Override
    public int queryDailyLivingCapacityByVersion(int day_count, String version) {
        return deviceMapper.queryDailyLivingCapacityByVersion(day_count, version);
    }

    @Override
    public int queryNewIncrementsByVersion(int day_count, String version) {
        return deviceMapper.queryNewIncrementsByVersion(day_count,version);
    }

    @Override
    public int getVersionTotal(String version) {
        return deviceMapper.getVersionTotal(version);
    }

    @Override
    public List<Device> versionSummaryList(String version,String clientId,String projectId) {
        return deviceMapper.versionSummaryList(version,clientId,projectId);
    }

    @Override
    public List<Device> queryVersionRank(String version, String projectId) {
        return deviceMapper.queryVersionRank(version,projectId);
    }

    @Override
    public List<Device> queryVersionDetails(int day_count, String version, String projectId) {
        return deviceMapper.queryVersionDetails(day_count,version,projectId);
    }

    @Override
    public List<Device> queryDailyLivingCapacity(int day_count, String version,String clientId,String projectId) {
        return deviceMapper.queryDailyLivingCapacity(day_count,version,clientId,projectId);
    }

    @Override
    public List<Device> queryDeviceNewIncrements(int day_count,String version,String clientId,String projectId) {
        return deviceMapper.queryDeviceNewIncrements(day_count,version,clientId,projectId);
    }

    @Override
    public List<Device> queryDeviceNewIncrementsByWeek(int day_count,String version,String clientId,String projectId) {
        return deviceMapper.queryDeviceNewIncrementsByWeek(day_count,version,clientId,projectId);
    }

    @Override
    public List<Device> queryDeviceNewIncrementsByMonth(int day_count,String version,String clientId,String projectId) {
        return deviceMapper.queryDeviceNewIncrementsByMonth(day_count,version,clientId,projectId);
    }

    @Override
    public List<Device> queryDeviceAccumulationByDays(int day_count,String version,String clientId,String projectId) {
        return deviceMapper.queryDeviceAccumulationByDays(day_count,version,clientId,projectId);
    }

    @Override
    public List<Device> queryDeviceAccumulationByWeek(int day_count,String version,String clientId,String projectId) {
        return deviceMapper.queryDeviceAccumulationByWeek(day_count,version,clientId,projectId);
    }

    @Override
    public List<Device> queryDeviceAccumulationByMonth(int day_count,String version,String clientId,String projectId) {
        return deviceMapper.queryDeviceAccumulationByMonth(day_count,version,clientId,projectId);
    }
}
