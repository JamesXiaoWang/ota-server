package com.otaserver.ota_project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
//添加ServletComponentScan开启扫描Servlet注解
@ServletComponentScan
@SpringBootApplication
public class OtaProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(OtaProjectApplication.class, args);
    }

}
