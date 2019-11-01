package com.otaserver.ota_project.common.encrypt;

import java.util.Date;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Base64;
/**
 *
 * @author Administrator
 *
 */
public class AES_ECB128 {

    // 加密
    public static String Encrypt(String sSrc, String sKey) throws Exception {
        if (sKey == null) {
            System.out.print("Key为空null");
            return null;
        }
        // 判断Key是否为16位
        if (sKey.length() != 16) {
            System.out.print("Key长度不是16位");
            return null;
        }
        byte[] raw = sKey.getBytes("utf-8");
        SecretKeySpec skeySpec = new SecretKeySpec(raw, "AES");
        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");//"算法/模式/补码方式"
        cipher.init(Cipher.ENCRYPT_MODE, skeySpec);
        byte[] encrypted = cipher.doFinal(sSrc.getBytes("utf-8"));

        return new Base64().encodeToString(encrypted);//此处使用BASE64做转码功能，同时能起到2次加密的作用。
    }

    // 解密
    public static String Decrypt(String sSrc, String sKey) throws Exception {
        try {
            // 判断Key是否正确
            if (sKey == null) {
                System.out.print("Key为空null");
                return null;
            }
            // 判断Key是否为16位
            if (sKey.length() != 16) {
                System.out.print("Key长度不是16位");
                return null;
            }
            byte[] raw = sKey.getBytes("utf-8");
            SecretKeySpec skeySpec = new SecretKeySpec(raw, "AES");
            Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
            cipher.init(Cipher.DECRYPT_MODE, skeySpec);
            byte[] encrypted1 = new Base64().decode(sSrc);//先用base64解密
            try {
                byte[] original = cipher.doFinal(encrypted1);
                String originalString = new String(original,"utf-8");
                return originalString;
            } catch (Exception e) {
                System.out.println(e.toString());
                return null;
            }
        } catch (Exception ex) {
            System.out.println(ex.toString());
            return null;
        }
    }

    public static void main(String[] args) throws Exception {
        /*
         * 此处使用AES-128-ECB加密模式，key需要为16位。
         */
    	
    	System.out.println(System.currentTimeMillis());
    	
    	
        String cKey = "1234567890123456";
        // 需要加密的字串
        String cSrc = "www.gowhere.so";
        System.out.println(cSrc);
        // 加密
        String enString = AES_ECB128.Encrypt(cSrc, cKey);
        System.out.println("加密后的字串是：" + enString);

        // 解密
        String DeString = AES_ECB128.Decrypt(enString, cKey);
        System.out.println("解密后的字串是：" + DeString);
        
//        String  ds = "iyjR9Gx3YZ4KY0U/wCj5YWPt7Ecd6QLNlf+J8Ll1+TboyRykc/zd+k9pbz1RAHkoJnPLqaUNgJ5QaomgjBUYYEc6Cyep8B7n1vqW6ly2+ACw41Lx63zKobXmDqeTRak5egmPZGbVVECxPVADseoQyQ==";
//        System.out.println("解密后的字串是：" + AES_ECB128.Decrypt(ds, "ztqXDAYH5o0rdFYM"));
        String  ds = "tQeaLrrQKVlgllhTdh53pWBDBGMIo7Pq/8dbwDJN0t+LoAe9rM7OHfJ7LSpYDaUMtKW9IycuwrhvsEPegYq9nmqEzRIvdEdLIqzxGPd3GUVEaJ1BlClUHBdyTlUIZ/Di0NMHFpWADFZJpTsPSJMsvj5mp0H+lIoMy3vm1Riwrp0QVIJrVrZsSFDsqO+aCqr1pF3KdfUrEKfENzJzmL+jKf6WY8p40fz6nWcRnJmJd+9CClmvNLf8Wz2BP+BPNIt58xVEhN3uY2Mkq4Vk7hRbig==";
        System.out.println("解密后的字串是：" + AES_ECB128.Decrypt(ds, "CEIqUACaRDV7COeY"));
    }
}

//源代码片段来自云代码http://yuncode.net