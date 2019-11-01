package com.otaserver.ota_project.device.service;

import com.otaserver.ota_project.device.entity.Device;

import java.util.List;

/**
 * @Author: WangJiaPeng
 * @Date: 2019/9/10 11:06
 * @Version 1.0
 */
public interface DeviceModelService {
    List<Device> getDeviceClientId();

    //机型统计
    List<Device> getModelStatisticsByDaysCapacity(int day_count,String clientId);

    //机型统计，新增量
    List<Device> getModelStatisticsByDaysNewIncrement(int day_count,String clientId);

    //机型统计，新增量，按周
    List<Device> getModelStatisticsByWeekNewIncrement(int day_count,String clientId);

    //机型统计，新增量，按月
    List<Device> getModelStatisticsByMonthNewIncrement(int day_count,String clientId);

    //机型统计，累计量
    List<Device> getModelStatisticsByDaysAccumulation(int day_count,String clientId);

    //机型统计，累计量 按周
    List<Device> getModelStatisticsByWeekAccumulation(int day_count,String clientId);

    //机型统计，累计量 按月
    List<Device> getModelStatisticsByMonthAccumulation(int day_count,String clientId);

    //机型概括
    List<Device> getModelSummarize(int day_count,String clientId);

    //获取机型累计量
    Integer getModelTotal(String version,String clientId,String projectId);

    //机型详情
    List<Device> getModelDetailsByDaysCapacity(int day_count,String clientId,String projectId);

    //机型详情
    List<Device> getModelDetailsByDaysNewIncrement(int day_count,String clientId,String projectId);
    //机型详情，新增量 按周
    List<Device> getModelDetailsByWeekNewIncrement(int day_count,String clientId,String projectId);
    //机型详情，新增量 按月
    List<Device> getModelDetailsByMonthNewIncrement(int day_count,String clientId,String projectId);
}
