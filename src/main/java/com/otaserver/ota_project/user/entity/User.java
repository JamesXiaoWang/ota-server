package com.otaserver.ota_project.user.entity;

import com.github.pagehelper.Page;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * @Author: WangJiaPeng
 * @Date: 2019/8/8 12:16
 * @Version 1.0
 */
public class User implements Serializable {
    private static final long serialVersionUID = -2551518845606903429L;

    private Integer id;

    private String username;

    private String mobile;

    private String email;

    private String password;

    private Integer creater;

    private Date createDate;

    private String createDateStr;

    private Integer updater;

    private Date updateDate;

    public User() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getCreater() {
        return creater;
    }

    public void setCreater(Integer creater) {
        this.creater = creater;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Integer getUpdater() {
        return updater;
    }

    public void setUpdater(Integer updater) {
        this.updater = updater;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }
}
