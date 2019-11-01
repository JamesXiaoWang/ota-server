package com.otaserver.ota_project;

/**
 * @Author: WangJiaPeng
 * @Date: 2019/9/25 10:19
 * @Version 1.0
 */
public class MaoPao {
    public static void main(String[] args) {
        int[] a = {49, 38, 65, 97, 76, 13, 27, 49, 78, 34, 12, 64, 1};
        System.out.println("排序之前：");
        for (int i = 0; i < a.length; i++) {
            System.out.print(a[i] + "\t");
        }
        //外层循环n -1，内层循环n - 1 - i ，两两比较做交换
       for (int i = 0;i < a.length - 1;i++){
           for (int j = 0;j < a.length - 1 - i;j++){
               //假设49
               if (a[j] > a[j + 1]){
                   int number = a[j];//49

                    //38
                   a[j] = a[j + 1];
                   //47
                   a[j + 1] = number;
               }
           }
       }
        System.out.println();
        System.out.println("排序之后：");
        for (int i : a) {
            System.out.print(i+"\t");
        }
    }
}
