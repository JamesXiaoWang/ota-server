package com.otaserver.ota_project;

import com.otaserver.ota_project.device.mapper.DeviceMapper;
import com.otaserver.ota_project.device.mapper.DeviceRecordsMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

/**
 * @Author: WangJiaPeng
 * @Date: 2019/9/27 16:11
 * @Version 1.0
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = OtaProjectApplication.class)
public class Spring {

    @Autowired
    private DeviceRecordsMapper recordsMapper;

    @Test
    public void testInfo(){
       int count =  recordsMapper.getAccumulationByDays(0);
        System.out.println(count);
    }
}
