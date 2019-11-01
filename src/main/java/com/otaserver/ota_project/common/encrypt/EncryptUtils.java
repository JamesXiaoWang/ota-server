package com.otaserver.ota_project.common.encrypt;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import com.otaserver.ota_project.common.encoder.BASE64Decoder;
import com.otaserver.ota_project.common.encoder.BASE64Encoder;
import org.apache.commons.codec.digest.DigestUtils;



public class EncryptUtils {
	
	/**
	 * 图灵加密方法
	 * @param key
	 * @param secret
	 * @param timestamp
	 * @return
	 */
	private static TuringAES getTuringAES(String key, String secret, String timestamp){
		String secretKey = secret + timestamp + key;
		String aesKey = TuringMd5.MD5(secretKey);
		TuringAES ma = new TuringAES(aesKey);
		return ma;
	}
	
	/**
	 * 加密
	 * @param data
	 * @param key
	 * @param secret
	 * @param timestamp
	 * @return
	 */
	public static String encrypt(String data, String key, String secret, String timestamp){
		TuringAES ma = getTuringAES(key, secret, timestamp);
		return ma.encrypt(data);
	}
	
	/**
	 * 解密
	 * @param data
	 * @param key
	 * @param secret
	 * @param timestamp
	 * @return
	 */
	public static String decrypt(String data, String key, String secret, String timestamp){
		TuringAES ma = getTuringAES(key, secret, timestamp);
		return ma.decrypt(data);
	}
	
	private static final String UTF8 = "utf-8";
	
	/**
	 * MD5加密
	 * @param src
	 * @return
	 * @throws NoSuchAlgorithmException
	 * @throws UnsupportedEncodingException
	 */
	public static String md5Digest(String src) throws NoSuchAlgorithmException, UnsupportedEncodingException {
		MessageDigest md = MessageDigest.getInstance("MD5");
		byte[] b = md.digest(src.getBytes(UTF8));
		return byte2HexStr(b);
	}

	/**
	 * base64位加密
	 * @param src
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public static String base64Encoder(String src) throws UnsupportedEncodingException {
		BASE64Encoder encoder = new BASE64Encoder();
		return encoder.encode(src.getBytes(UTF8));
	}

	/**
	 * base64位解密
	 * @param dest
	 * @return
	 * @throws NoSuchAlgorithmException
	 * @throws IOException
	 */
	public static String base64Decoder(String dest) throws NoSuchAlgorithmException, IOException {
		BASE64Decoder decoder = new BASE64Decoder();
		return new String(decoder.decodeBuffer(dest), UTF8);
	}

	/**
	 * 生成16进制字符串
	 * @param b
	 * @return
	 */
	private static String byte2HexStr(byte[] b) {
		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < b.length; ++i) {
			String s = Integer.toHexString(b[i] & 0xFF);
			if (s.length() == 1)
				sb.append("0");

			sb.append(s);
		}
		return sb.toString();
	}
	
	public static void main(String[] args) throws NoSuchAlgorithmException, UnsupportedEncodingException {
		System.out.println(DigestUtils.md5("123456"));
	}
}
