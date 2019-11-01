package com.otaserver.ota_project.common.encrypt;

import java.io.FileInputStream;

import org.apache.commons.codec.digest.DigestUtils;


/**
 * @author Administrators
 * @date 2018年11月23日 下午3:01:57
 * @description:
 *
 */
public class MD5 {

	/**
	 * MD5方法
	 * 
	 * @param path 文件路径
	 * @return 密文
	 * @throws Exception
	 */
	public static String md5(String path) throws Exception {
		// 加密后的字符串
		String encodeStr = DigestUtils.md5Hex(new FileInputStream(path));	
		
		return encodeStr;
	}

	public static void main(String[] args) throws Exception {
		String path = "C:/Users/Administrator/Desktop/PCM/AECINPUT0x49.PCM";
		
		String url = "http://dev.ai.9hive.cn/api/voiceFile/upload?signature=56d470ac32281a1762e971b64f834030";
		
//		HttpUtils.testPostFile(url, path, "AECINPUT0x49.PCM");
	}
}
