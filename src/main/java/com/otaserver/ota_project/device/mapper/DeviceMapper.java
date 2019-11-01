package com.otaserver.ota_project.device.mapper;

import com.otaserver.ota_project.device.entity.Device;
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
public interface DeviceMapper {

    int queryDeviceAccumulation(int day_count);

    int queryDailyLivingCapacityByVersion(int day_count,String version);

    int queryNewIncrementsByVersion(int day_count,String version);

    int getVersionTotal(String version);

    List<Device> versionSummaryList(String version,String clientId,String projectId);

    List<Device> queryVersionRank(String version,String projectId);

    List<Device> queryVersionDetails(int day_count,String version,String projectId);

    List<Device> queryDailyLivingCapacity(int day_count,String version,String clientId,String projectId);

    List<Device> queryDeviceNewIncrements(int day_count,String version,String clientId,String projectId);

    List<Device> queryDeviceNewIncrementsByWeek(int day_count,String version,String clientId,String projectId);

    List<Device> queryDeviceNewIncrementsByMonth(int day_count,String version,String clientId,String projectId);

    List<Device> queryDeviceAccumulationByDays(int day_count,String version,String clientId,String projectId);

    List<Device> queryDeviceAccumulationByWeek(int day_count,String version,String clientId,String projectId);

    List<Device> queryDeviceAccumulationByMonth(int day_count,String version,String clientId,String projectId);
}
