package com.otaserver.ota_project;


import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;

/**
 * @Author: WangJiaPeng
 * @Date: 2019/9/25 10:09
 * @Version 1.0
 */
public class Test {
    public static void main(String[] args) {
        int[] a = {49, 38, 65, 97, 76, 13, 27, 49, 78, 34, 12, 64, 1};
        System.out.println("排序之前：");
        for (int i = 0; i < a.length; i++) {
            System.out.print(a[i] + " ");
        }
        //直接插入排序
        for (int i = 1;i < a.length;i++){
            //待插入元素
            int temp = a[i];
            int j;
            for (j = i - 1;j >= 0;j--){
                //将大于temp的往后移动一位
                if (a[j]>temp){
                    a[j+1] = a[j];
                }else{
                    break;
                }
            }
            a[j+1] = temp;
        }
        System.out.println();
        System.out.println("排序之后：");
        for (int i = 0;i < a.length;i++){
            System.out.println(a[i]+" ");
        }
    }
}
