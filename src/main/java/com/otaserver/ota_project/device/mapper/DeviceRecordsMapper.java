package com.otaserver.ota_project.device.mapper;

import com.github.pagehelper.Page;
import com.otaserver.ota_project.common.util.PageUtil;
import com.otaserver.ota_project.device.entity.DeviceRecords;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @Author: WangJiaPeng
 * @Date: 2019/8/13 16:01
 * @Version 1.0
 */
@Mapper
public interface DeviceRecordsMapper {
    int queryDeviceAccumulation();

    int queryDailyLivingCapacity(int day_count);

    int queryNewIncrements(int day_count);

    int getAccumulationByDays(int day_count);

    List<DeviceRecords> queryDeviceRecordsPage();

    int getDeviceRecordsCount();

    List<DeviceRecords> queryDeviceRecordsByParams(String number);

    int updateDeviceNumber(DeviceRecords deviceRecords);

    List<DeviceRecords> getMapAreaDetails(String clientId,String projectId,String version,String lastLoginTime);

    List<DeviceRecords> getMapAreaDetailsNewIncrement(String clientId,String projectId,String version,String lastLoginTime);

    List<DeviceRecords> getAreaDetails(String clientId,String projectId,String version);

    List<DeviceRecords> getAreaDetailsNewIncrement(String clientId,String projectId,String version);

    List<DeviceRecords> queryDailyLivingCapacityByDays(int day_count);

    List<DeviceRecords> queryDeviceNewIncrementsByDays(int day_count);

    List<DeviceRecords> queryDeviceNewIncrementsByWeek(int day_count);

    List<DeviceRecords> queryDeviceNewIncrementsByMonth(int day_count);

    List<DeviceRecords> queryDeviceAccumulationByDays(int day_count);

    List<DeviceRecords> queryDeviceAccumulationByWeek(int day_count);

    List<DeviceRecords> queryDeviceAccumulationByMonth(int day_count);

    List<DeviceRecords> getDateDays(int day_count);

    List<DeviceRecords> getWeekDate(int day_count);

    List<DeviceRecords> getMonthDate(int day_count);
}
