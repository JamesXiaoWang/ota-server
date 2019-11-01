package com.otaserver.ota_project.user.service;

import com.otaserver.ota_project.user.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @Author: WangJiaPeng
 * @Date: 2019/8/8 18:18
 * @Version 1.0
 */
@Service
@Transactional
public class UserServiceImpl implements UserService{

    @Autowired
    UserMapper userMapper;

    @Override
    public int getUserLogin(String username, String password) {
        return userMapper.getUserLogin(username,password);
    }
}
