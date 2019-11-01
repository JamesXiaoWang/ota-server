package com.otaserver.ota_project;

import javax.swing.*;

/**
 * @Author: WangJiaPeng
 * @Date: 2019/9/25 17:13
 * @Version 1.0
 */
public class Test2 {
    public static void main(String[] args) {
            int x,y;  //x：鸡  y：兔
            for(x=0;x<=35;x++) {   //遍历鸡的只数
                y=35-x;        //兔的只数等于35 - 鸡
                if(2*x+4*y==94)   //如果鸡和兔的脚总数是94
                    System.out.println("鸡"+x+"只，兔"+y+"只");
            }
    }
}
