package com.otaserver.ota_project.device.controller;

import com.otaserver.ota_project.common.util.JSONResult;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

/**
 * @Author: WangJiaPeng
 * @Date: 2019/10/12 17:10
 * @Version 1.0
 */
@Controller
public class UploadController {
    private static final Logger LOGGER = LoggerFactory.getLogger(UploadController.class);


    @PostMapping("/upload")
    @ResponseBody
    public JSONResult upload(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return new JSONResult(200, "ERROR", "上传失败，请选择文件！", "");
        }
        String fileName = file.getOriginalFilename();
        String filePath = "/cszjdata/unload/file/";
        File dest = new File(filePath + fileName);
        try {
            file.transferTo(dest);
            LOGGER.info("上传成功");
            return new JSONResult(200, "SUCCESS", "上传成功", "");
        } catch (IOException e) {
            LOGGER.error(e.toString(), e);
        }
        return new JSONResult(200, "ERROR", "上传失败", "");
    }

}
