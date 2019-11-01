package com.otaserver.ota_project.device.service;

import com.otaserver.ota_project.device.entity.Device;
import com.otaserver.ota_project.device.entity.DeviceRecords;
import com.otaserver.ota_project.device.mapper.DeviceRecordsMapper;
import com.otaserver.ota_project.device.mapper.DeviceVersionMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @Author: WangJiaPeng
 * @Date: 2019/9/3 12:20
 * @Version 1.0
 */
@Service
@Transactional
public class DeviceVersionServiceImpl implements DeviceVersionService{

    @Autowired
    DeviceVersionMapper deviceVersionMapper;

    @Override
    public List<Device> getDeviceModelAndClientId() {
        return deviceVersionMapper.getDeviceModelAndClientId();
    }

    @Override
    public List<Device> getDeviceClientId() {
        return deviceVersionMapper.getDeviceClientId();
    }

    @Override
    public List<Device> selectDeviceVersionList() {
        return deviceVersionMapper.selectDeviceVersionList();
    }

    @Override
    public List<Device> selectVersionData(String version, String clientId,String projectId) {
        return deviceVersionMapper.selectVersionData(version,clientId,projectId);
    }


    @Override
    public int getVersionTotal(String version) {
        return deviceVersionMapper.getVersionTotal(version);
    }

    @Override
    public List<Device> queryVersionDetails(int day_count, String version,String clientId,String projectId) {
        return deviceVersionMapper.queryVersionDetails(day_count,version,clientId,projectId);
    }

    @Override
    public List<Device> queryVersionRank(String version,String clientId, String projectId) {
        return deviceVersionMapper.queryVersionRank(version,clientId,projectId);
    }

    @Override
    public List<Device> versionSummaryList(String version,String clientId, String projectId) {
        return deviceVersionMapper.versionSummaryList(version,clientId,projectId);
    }

    @Override
    public List<Device> getVersionNewIncrements(int day_count,String version,String clientId, String projectId) {
        return deviceVersionMapper.getVersionNewIncrements(day_count,version,clientId,projectId);
    }

    @Override
    public List<Device> queryDeviceNewIncrementsByWeek(int day_count, String version, String clientId,String projectId) {
        return deviceVersionMapper.queryDeviceNewIncrementsByWeek(day_count,version,clientId,projectId);
    }

    @Override
    public List<Device> queryDeviceNewIncrementsByMonths(int day_count, String version, String clientId,String projectId) {
        return deviceVersionMapper.queryDeviceNewIncrementsByMonths(day_count,version,clientId,projectId);
    }
}
