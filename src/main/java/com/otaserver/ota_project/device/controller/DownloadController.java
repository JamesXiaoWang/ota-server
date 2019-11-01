package com.otaserver.ota_project.device.controller;

import com.alibaba.druid.util.StringUtils;
import com.otaserver.ota_project.common.util.JSONResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;

/**
 * @Author: WangJiaPeng
 * @Date: 2019/10/14 17:10
 * @Version 1.0
 */
@Controller
public class DownloadController {
    private static final Logger LOGGER = LoggerFactory.getLogger(DownloadController.class);

    @RequestMapping("/download")
    public String downloadFile(HttpServletRequest request, HttpServletResponse response) {
        String fileName = "IMEI.xlsx";// 设置文件名，根据业务需要替换成要下载的文件名

        //设置文件路径
        String realPath = "/cszjdata/unload/file/";
        String[] list = new File(realPath).list();
//        if (null != list){
//            for (String str : list) {
//                System.out.println(str);
//                if (str.lastIndexOf(".txt") == 1 || str.lastIndexOf(".xlsx") ==1)
//                fileName = str;
//            }
//        }

        if (fileName != null) {

            File file = new File(realPath , fileName);
            if (file.exists()) {
                response.setContentType("application/force-download");// 设置强制下载不打开
                response.addHeader("Content-Disposition", "attachment;fileName=" + fileName);// 设置文件名
                byte[] buffer = new byte[1024];
                FileInputStream fis = null;
                BufferedInputStream bis = null;
                try {
                    fis = new FileInputStream(file);
                    bis = new BufferedInputStream(fis);
                    OutputStream os = response.getOutputStream();
                    int i = bis.read(buffer);
                    while (i != -1) {
                        os.write(buffer, 0, i);
                        i = bis.read(buffer);
                    }
                    System.out.println("success");
                } catch (Exception e) {
                    e.printStackTrace();
                } finally {
                    if (bis != null) {
                        try {
                            bis.close();
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                    if (fis != null) {
                        try {
                            fis.close();
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                }
            }
        }
        return null;
    }
}
