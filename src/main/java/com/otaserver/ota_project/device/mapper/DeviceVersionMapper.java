package com.otaserver.ota_project.device.mapper;

import com.otaserver.ota_project.device.entity.Device;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @Author: WangJiaPeng
 * @Date: 2019/9/3 12:13
 * @Version 1.0
 */
@Mapper
@Repository
public interface DeviceVersionMapper {
    //获取设备的项目id和客户id
    List<Device> getDeviceModelAndClientId();

    List<Device> getDeviceClientId();

    List<Device> selectDeviceVersionList();

    List<Device> selectVersionData(String version,String clientId,String projectId);

    int getVersionTotal(String version);

    List<Device> versionSummaryList(String version,String clientId,String projectId);

    //地区明细
    List<Device> getAreaDetails();

    List<Device> queryVersionRank(String version,String clientId,String projectId);

    List<Device> queryVersionDetails(int day_count,String version,String clientId,String projectId);

    List<Device> getVersionNewIncrements(int day_count,String version,String clientId,String projectId);

    List<Device> queryDeviceNewIncrementsByWeek(int day_count,String version,String clientId,String projectId);

    List<Device> queryDeviceNewIncrementsByMonths(int day_count,String version,String clientId,String projectId);
}
