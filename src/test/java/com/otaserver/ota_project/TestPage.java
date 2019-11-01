package com.otaserver.ota_project;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.otaserver.ota_project.device.entity.DeviceNumber;
import com.otaserver.ota_project.device.entity.DeviceRecords;
import com.otaserver.ota_project.device.mapper.DeviceNumberMapper;
import com.otaserver.ota_project.device.mapper.DeviceRecordsMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author: WangJiaPeng
 * @Date: 2019/10/16 11:08
 * @Version 1.0
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = OtaProjectApplication.class)
public class TestPage {
    @Autowired
    private DeviceNumberMapper imeiMapper;

    @Autowired
    private DeviceRecordsMapper recordsMapper;

    @Test
    public void testPage() {

//        Page page = new  Page();
//        page.setPageNum(0);
//        page.setPageSize(10);
//
//        List<DeviceNumber> list =  imeiMapper.queryDeviceNumberInfoByPages(page);
//        System.out.println(list.size());
//
//        PageInfo<DeviceNumber> pageInfo = new PageInfo<>(list);
//
//        int totalPageNum = (21 + 10 - 1) / 10;
//        System.out.println(totalPageNum);
    }


    @Test
    public void testPage3() {
        PageHelper.startPage(1, 10);

        List<DeviceRecords> pageList = recordsMapper.queryDeviceRecordsPage();

        PageInfo pageInfo = new PageInfo(pageList);

        System.out.println(pageInfo.getSize());
    }

}
