package com.otaserver.ota_project.common.util;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.otaserver.ota_project.common.encrypt.AES_ECB128;
import org.apache.http.HttpResponse;
import org.apache.http.util.EntityUtils;
import org.apache.tools.zip.ZipEntry;
import org.apache.tools.zip.ZipFile;
import org.json.JSONObject;

import com.github.junrar.Archive;
import com.github.junrar.rarfile.FileHeader;
/**
 * @Author: WangJiaPeng
 * @Date: 2019/8/30 20:34
 * @Version 1.0
 */
public class Utils {
    /** 使用GBK编码可以避免压缩中文文件名乱码 */
    private static final String CHINESE_CHARSET = "GBK";

    /*
     * 判断对象是否空值
     */
    public static boolean isObjNull(Object obj) {
        if (obj == null) {
            return true;
        } else if (obj == "") {
            return true;
        } else if ("".equals(obj)) {
            return true;
        }
        return false;
    }

    /*** 这里用到了synchronized ，也就是防止出现并发问题 ***/
    public static synchronized List<Map<String, String>> unrar(File rarFile, String extPlace) throws Exception {
        return unRarFile(rarFile, extPlace);
    }

    public static synchronized List<Map<String, String>> unzip(File zipFile, String extPlace) throws Exception {
        return unZipFiles(zipFile, extPlace);
    }

    /**
     * 解压zip格式的压缩文件到指定位置
     *
     * @param zipFileName
     *            压缩文件
     * @param extPlace
     *            解压目录
     * @throws Exception
     */
    public static List<Map<String, String>> unZipFiles(File zipFile, String extPlace) throws Exception {

        List<Map<String, String>> sourceList = new ArrayList<Map<String, String>>();

        System.setProperty("sun.zip.encoding", System.getProperty("sun.jnu.encoding"));
        try {
            (new File(extPlace)).mkdirs();
            // File f = new File(zipFileName);
            if ((!zipFile.exists()) && (zipFile.length() <= 0)) {
                throw new Exception("要解压的文件不存在!");
            }

            ZipFile zf = new ZipFile(zipFile, CHINESE_CHARSET); // 处理中文文件名乱码的问题

            String strPath, gbkPath, strtemp;
            File tempFile = new File(extPlace);
            strPath = tempFile.getAbsolutePath();
            Enumeration<?> e = zf.getEntries();
            while (e.hasMoreElements()) {
                ZipEntry zipEnt = (ZipEntry) e.nextElement();
                gbkPath = zipEnt.getName();

                Map<String, String> map = new HashMap<String, String>();
                if(gbkPath.contains("/") && gbkPath.split("/").length >= 2){

                    String name = gbkPath.substring(gbkPath.lastIndexOf("/") + 1, gbkPath.length());
                    String catagoryParent = gbkPath.substring(0, gbkPath.lastIndexOf("/"));

                    String catagory = null, childCatagory = null;
                    if(catagoryParent.contains("/")){
                        String[] array = catagoryParent.split("/");
                        catagory = array[0];
                        if(catagoryParent.split("/").length > 1){
                            childCatagory = array[1];
                        }
                    }else{
                        catagory = catagoryParent;
                    }

                    map.put("path", gbkPath);
                    map.put("name", name);
                    map.put("catagory", catagory);
                    map.put("childCatagory", childCatagory);

                    sourceList.add(map);
                }

                if (zipEnt.isDirectory()) {
                    strtemp = strPath + File.separator + gbkPath;
                    File dir = new File(strtemp);
                    dir.mkdirs();
                    continue;
                } else { // 读写文件
                    InputStream is = zf.getInputStream(zipEnt);
                    BufferedInputStream bis = new BufferedInputStream(is);
                    strtemp = strPath + File.separator + gbkPath;// 建目录
                    String strsubdir = gbkPath;
                    for (int i = 0; i < strsubdir.length(); i++) {
                        if (strsubdir.substring(i, i + 1).equalsIgnoreCase("/")) {
                            String temp = strPath + File.separator + strsubdir.substring(0, i);
                            File subdir = new File(temp);
                            if (!subdir.exists())
                                subdir.mkdir();
                        }
                    }
                    FileOutputStream fos = new FileOutputStream(strtemp);
                    BufferedOutputStream bos = new BufferedOutputStream(fos);
                    int c;
                    while ((c = bis.read()) != -1) {
                        bos.write((byte) c);
                    }
                    bos.close();
                    fos.close();
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return sourceList;
    }

    /**
     * 根据原始rar路径，解压到指定文件夹下.
     *
     * @param srcRarPath
     *            原始rar路径
     * @param dstDirectoryPath
     *            解压到的文件夹
     */
    public static List<Map<String, String>> unRarFile(File rarFile, String dstDirectoryPath) {
        List<Map<String, String>> sourceList = new ArrayList<Map<String, String>>();

        File dstDiretory = new File(dstDirectoryPath);
        if (!dstDiretory.exists()) {// 目标目录不存在时，创建该文件夹
            dstDiretory.mkdirs();
        }
        Archive a = null;
        try {
            a = new Archive(rarFile);
            if (a != null) {
                // a.getMainHeader().print(); // 打印文件信息.
                FileHeader fh = a.nextFileHeader();
                while (fh != null) {
                    // 防止文件名中文乱码问题的处理
                    String filePath = fh.getFileNameW().isEmpty() ? fh.getFileNameString() : fh.getFileNameW();

                    if (filePath.contains("\\")) {
                        filePath = filePath.replaceAll("\\\\", "/");
                    }

                    Map<String, String> map = new HashMap<String, String>();
                    if(filePath.contains("/") && filePath.split("/").length >= 2){

                        String name = filePath.substring(filePath.lastIndexOf("/") + 1, filePath.length());

                        String catagoryParent = filePath.substring(0, filePath.lastIndexOf("/"));

                        String catagory = null, childCatagory = null;
                        if(catagoryParent.contains("/")){
                            String[] array = catagoryParent.split("/");
                            catagory = array[0];
                            if(catagoryParent.split("/").length > 1){
                                childCatagory = array[1];
                            }
                        }else{
                            catagory = catagoryParent;
                        }

                        map.put("path", filePath);
                        map.put("name", name);
                        map.put("catagory", catagory);
                        map.put("childCatagory", childCatagory);

                        sourceList.add(map);
                    }

                    if (fh.isDirectory()) { // 文件夹
                        File fol = new File(dstDirectoryPath + File.separator + filePath);
                        fol.mkdirs();
                    } else { // 文件
                        File out = new File(dstDirectoryPath + File.separator + filePath.trim());
                        try {
                            if (!out.exists()) {
                                if (!out.getParentFile().exists()) {// 相对路径可能多级，可能需要创建父目录.
                                    out.getParentFile().mkdirs();
                                }
                                out.createNewFile();
                            }
                            FileOutputStream os = new FileOutputStream(out);
                            a.extractFile(fh, os);
                            os.close();
                        } catch (Exception ex) {
                            ex.printStackTrace();
                        }
                    }
                    fh = a.nextFileHeader();
                }
                a.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return sourceList;
    }

    /**
     * 获取请求的真实IP
     * @param request
     * @return
     */
    public static String getIPAddress(HttpServletRequest request) {
        String ip = null;

        //X-Forwarded-For：Squid 服务代理
        String ipAddresses = request.getHeader("X-Forwarded-For");

        if (ipAddresses == null || ipAddresses.length() == 0 || "unknown".equalsIgnoreCase(ipAddresses)) {
            //Proxy-Client-IP：apache 服务代理
            ipAddresses = request.getHeader("Proxy-Client-IP");
        }

        if (ipAddresses == null || ipAddresses.length() == 0 || "unknown".equalsIgnoreCase(ipAddresses)) {
            //WL-Proxy-Client-IP：weblogic 服务代理
            ipAddresses = request.getHeader("WL-Proxy-Client-IP");
        }

        if (ipAddresses == null || ipAddresses.length() == 0 || "unknown".equalsIgnoreCase(ipAddresses)) {
            //HTTP_CLIENT_IP：有些代理服务器
            ipAddresses = request.getHeader("HTTP_CLIENT_IP");
        }

        if (ipAddresses == null || ipAddresses.length() == 0 || "unknown".equalsIgnoreCase(ipAddresses)) {
            //X-Real-IP：nginx服务代理
            ipAddresses = request.getHeader("X-Real-IP");
        }

        //有些网络通过多层代理，那么获取到的ip就会有多个，一般都是通过逗号（,）分割开来，并且第一个ip为客户端的真实IP
        if (ipAddresses != null && ipAddresses.length() != 0) {
            ip = ipAddresses.split(",")[0];
        }

        //还是不能获取到，最后再通过request.getRemoteAddr();获取
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ipAddresses)) {
            ip = request.getRemoteAddr();
        }
        return ip;
    }

    /**
     * 获取ip所在地
     * @param ip
     * @return
     * @throws Exception
     */
    public static Map<String,Object> getIpAddress(String ip) throws Exception {
        String ipAddress = "" ;
        Map<String,Object> mpas = new HashMap<>();
        String url = "https://dm-81.data.aliyun.com/rest/160601/ip/getIpInfo.json";
        String appcode = "4d76ad2ede10475d92ebdf68ca0084f7";
        Map<String,String> querys = new HashMap<>();
        querys.put("ip",ip);
        Map<String,String> headers = new HashMap<>();
        headers.put("Authorization","APPCODE " + appcode);
        HttpResponse response = HttpUtils.doGet(url,headers,querys);
        String result = EntityUtils.toString(response.getEntity(),"utf-8");
        JSONObject resultJson = new JSONObject(result);
        if(resultJson.getInt("code") == 0){
            JSONObject data = resultJson.getJSONObject("data");
            System.out.println("data>>>"+data.toString());
//            ipAddress = data.getString("city");
            mpas.put("province",data.getString("region"));
            mpas.put("city",data.getString("city"));
        }else {
            ipAddress = resultJson.getString("data");
        }
        return  mpas;
    }

    public static String getRequestResultByErrorCode(int errorcode){
        String result = "";
        switch (errorcode) {
            case 40003 :
                result = "openid 不合法";
                break;
            case 40013 :
                result = "appid 不合法";
                break;
            case 41009 :
                result = "缺少openID 参数";
                break;
            case 43001 :
                result = "要求使用GET请求";
                break;
            case 43002 :
                result = "要求使用POST请求";
                break;
            case 43003 :
                result = "要求使用HTTPS";
                break;
            case 43005 :
                result = "要求是好友关系";
                break;
            case 44002 :
                result = "post数据为空";
                break;
            case 47001 :
                result = "数据格式有误";
                break;
            case 0 :
                result = "成功";
                break;
            case -1 :
                result = "系统错误";
                break;
            case 100001 :
                result = "查询请求不存在";
                break;
            case 100002 :
                result = "新增请求已经存在";
                break;
            case 100003 :
                result = "请求中的数据大小不合法";
                break;
            case 100004 :
                result = "二维码不合法";
                break;
            case 100005 :
                result = "device type不合法";
                break;
            case 100006 :
                result = "device id不合法";
                break;
            case 100007 :
                result = "设备状态不合法";
                break;
            case 100008 :
                result = "mac地址不合法";
                break;
            case 100009 :
                result = "connect protocol 不合法";
                break;
            case 100010 :
                result = "auth key 不合法";
                break;
            case 100011 :
                result = "close strategy 不合法";
                break;
            case 100012 :
                result = "connect strategy 不合法";
                break;
            case 100013 :
                result = "crypt method 不合法";
                break;
            case 100014 :
                result = "auth version 不合法";
                break;
            case 100015 :
                result = "manufature mac position 不合法";
                break;
            case 100016 :
                result = "serial number mac position 不合法";
                break;
            case 100017 :
                result = "批量处理请求数量不合法";
                break;
            case 100018 :
                result = "optype 不合法";
                break;
            case 100019 :
                result = "账号状态不合法";
                break;
            case 100020 :
                result = "账号 quota 已用完";
                break;
            case 100021 :
                result = "用户和设备的绑定关系不存在";
                break;
            case 100022 :
                result = "消息类型不合法（msg type invalid）";
                break;
            case 100023 :
                result = "消息内容不合法（msg content invalid）";
                break;
            case 100024 :
                result = "用户当前没有订阅WIFI设备的状态（user not subscribe device status）";
                break;
            case 100025 :
                result = "设备属性未设置（device attr not set）";
                break;
            case 100026 :
                result = "票据不合法（ticket invalid）";
                break;
            default:
                break;
        }
        return result;
    }

    /**
     * 对结果集进行处理
     * @param dvtype
     * @return
     */
    public static String getResult(String result, String secKey, String dvtype){
        try {
            if("N".equals(dvtype)){
                result = AES_ECB128.Encrypt(result, secKey);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
}
