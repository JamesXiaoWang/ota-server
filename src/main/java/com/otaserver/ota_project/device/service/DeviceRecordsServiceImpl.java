package com.otaserver.ota_project.device.service;

import com.github.pagehelper.Page;
import com.otaserver.ota_project.device.entity.DeviceRecords;
import com.otaserver.ota_project.device.mapper.DeviceRecordsMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @Author: WangJiaPeng
 * @Date: 2019/8/13 17:46
 * @Version 1.0
 */
@Service
@Transactional
public class DeviceRecordsServiceImpl implements DeviceRecordsService{

    @Autowired
    DeviceRecordsMapper deviceRecordsMapper;

    @Override
    public int queryDeviceAccumulation() {
        return deviceRecordsMapper.queryDeviceAccumulation();
    }

    @Override
    public int queryNewIncrements(int day_count) {
        return deviceRecordsMapper.queryNewIncrements(day_count);
    }

    @Override
    public int queryDailyLivingCapacity(int day_count) {
        return deviceRecordsMapper.queryDailyLivingCapacity(day_count);
    }

    @Override
    public List<DeviceRecords> queryDeviceRecordsPage() {
        return deviceRecordsMapper.queryDeviceRecordsPage();
    }

    @Override
    public int getDeviceRecordsCount() {
        return deviceRecordsMapper.getDeviceRecordsCount();
    }

    @Override
    public List<DeviceRecords> queryDeviceRecordsByParams(String number) {
        return deviceRecordsMapper.queryDeviceRecordsByParams(number);
    }

    @Override
    public int updateDeviceNumber(DeviceRecords deviceRecords) {
        return deviceRecordsMapper.updateDeviceNumber(deviceRecords);
    }

    @Override
    public int getAccumulationByDays(int day_count) {
        return deviceRecordsMapper.getAccumulationByDays(day_count);
    }

    @Override
    public List<DeviceRecords> queryDeviceNewIncrementsByDays(int day_count) {
        return deviceRecordsMapper.queryDeviceNewIncrementsByDays(day_count);
    }

    @Override
    public List<DeviceRecords> getMapAreaDetails(String clientId, String projectId, String version, String lastLoginTime) {
        return deviceRecordsMapper.getMapAreaDetails(clientId,projectId,version,lastLoginTime);
    }

    @Override
    public List<DeviceRecords> getMapAreaDetailsNewIncrement(String clientId, String projectId, String version, String lastLoginTime) {
        return deviceRecordsMapper.getMapAreaDetailsNewIncrement(clientId,projectId,version,lastLoginTime);
    }

    @Override
    public List<DeviceRecords> getAreaDetails(String clientId, String projectId, String version) {
        return deviceRecordsMapper.getAreaDetails(clientId,projectId,version);
    }

    @Override
    public List<DeviceRecords> getAreaDetailsNewIncrement(String clientId, String projectId, String version) {
        return deviceRecordsMapper.getAreaDetailsNewIncrement(clientId,projectId,version);
    }

    @Override
    public List<DeviceRecords> queryDailyLivingCapacityByDays(int day_count) {
        return deviceRecordsMapper.queryDailyLivingCapacityByDays(day_count);
    }

    @Override
    public List<DeviceRecords> queryDeviceNewIncrementsByWeek(int day_count) {
        return deviceRecordsMapper.queryDeviceNewIncrementsByWeek(day_count);
    }

    @Override
    public List<DeviceRecords> queryDeviceNewIncrementsByMonth(int day_count) {
        return deviceRecordsMapper.queryDeviceNewIncrementsByMonth(day_count);
    }

    @Override
    public List<DeviceRecords> queryDeviceAccumulationByDays(int day_count) {
        return deviceRecordsMapper.queryDeviceAccumulationByDays(day_count);
    }

    @Override
    public List<DeviceRecords> queryDeviceAccumulationByWeek(int day_count) {
        return deviceRecordsMapper.queryDeviceAccumulationByWeek(day_count);
    }

    @Override
    public List<DeviceRecords> queryDeviceAccumulationByMonth(int day_count) {
        return deviceRecordsMapper.queryDeviceAccumulationByMonth(day_count);
    }

    @Override
    public List<DeviceRecords> getDateDays(int day_count) {
        return deviceRecordsMapper.getDateDays(day_count);
    }

    @Override
    public List<DeviceRecords> getWeekDate(int day_count) {
        return deviceRecordsMapper.getWeekDate(day_count);
    }

    @Override
    public List<DeviceRecords> getMonthDate(int day_count) {
        return deviceRecordsMapper.getMonthDate(day_count);
    }
}
