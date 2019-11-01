package com.otaserver.ota_project.device.mapper;

import com.otaserver.ota_project.device.entity.Device;
import com.sun.xml.internal.xsom.impl.ListSimpleTypeImpl;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @Author: WangJiaPeng
 * @Date: 2019/9/9 14:49
 * @Version 1.0
 */
@Mapper
@Repository
public interface DeviceModelMapper {
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

    //机型详情，累计量
    List<Device> getModelDetailsByDaysAccumulation(int day_count,String clientId);

    //机型详情，累计量 按周
    List<Device> getModelDetailsByWeekAccumulation(int day_count,String clientId);

    //机型详情，累计量 按月
    List<Device> getModelDetailsByMonthAccumulation(int day_count,String clientId);
}
