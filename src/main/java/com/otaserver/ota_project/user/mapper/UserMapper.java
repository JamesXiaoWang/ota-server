package com.otaserver.ota_project.user.mapper;

import com.otaserver.ota_project.user.entity.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * @Author: WangJiaPeng
 * @Date: 2019/8/8 18:01
 * @Version 1.0
 */
@Mapper
public interface UserMapper {

    List<User> getUserInfo(String username);

    int getUserLogin(String username,String password);
}
