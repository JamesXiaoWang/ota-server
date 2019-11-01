package com.otaserver.ota_project.user.service;

import org.springframework.stereotype.Service;

/**
 * @Author: WangJiaPeng
 * @Date: 2019/8/8 18:18
 * @Version 1.0
 */
public interface UserService {
    int getUserLogin(String username,String password);
}
