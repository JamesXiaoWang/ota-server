package com.otaserver.ota_project.common.util;

import net.sf.json.JSONObject;
import org.apache.http.HttpEntity;
import org.apache.http.HttpException;
import org.apache.http.HttpResponse;
import org.apache.http.StatusLine;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.config.Registry;
import org.apache.http.config.RegistryBuilder;
import org.apache.http.conn.socket.ConnectionSocketFactory;
import org.apache.http.conn.socket.PlainConnectionSocketFactory;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.entity.mime.HttpMultipartMode;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.util.EntityUtils;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;
import java.util.Map;
import java.util.UUID;

/**
 * @Author: WangJiaPeng
 * @Date: 2019/8/30 20:32
 * @Version 1.0
 */
public class HttpUtils {
    @SuppressWarnings({ "deprecation", "resource" })
    public static String sendGet(String url, String charset) throws HttpException, IOException {
        HttpClient client = new DefaultHttpClient();
        String result = null;
        HttpGet httpGet = new HttpGet();
        // 设置参数
        try {
            httpGet.setURI(new URI(url));
        } catch (URISyntaxException e) {
            throw new HttpException("请求url格式错误。" + e.getMessage());
        }
        // 发送请求
        HttpResponse httpResponse = client.execute(httpGet);
        // 获取返回的数据
        HttpEntity entity = httpResponse.getEntity();
        byte[] body = EntityUtils.toByteArray(entity);
        StatusLine sL = httpResponse.getStatusLine();
        int statusCode = sL.getStatusCode();
        if (statusCode == 200) {
            result = new String(body, charset);
            entity.consumeContent();
        } else {
            throw new HttpException("statusCode=" + statusCode);
        }
        return result;
    }

    /**
     *
     * @param url
     *            资源地址
     * @param map
     *            参数列表
     * @param encoding
     *            编码
     * @return
     * @throws NoSuchAlgorithmException
     * @throws KeyManagementException
     * @throws IOException
     * @throws ClientProtocolException
     */
    public static String sendPost(String url, String params, String method)
            throws KeyManagementException, NoSuchAlgorithmException, ClientProtocolException, IOException {
        String body = "";
        // 采用绕过验证的方式处理https请求
        SSLContext sslcontext = createIgnoreVerifySSL();

        // 设置协议http和https对应的处理socket链接工厂的对象
        Registry<ConnectionSocketFactory> socketFactoryRegistry = RegistryBuilder.<ConnectionSocketFactory>create()
                .register("http", PlainConnectionSocketFactory.INSTANCE)
                .register("https", new SSLConnectionSocketFactory(sslcontext)).build();
        PoolingHttpClientConnectionManager connManager = new PoolingHttpClientConnectionManager(socketFactoryRegistry);
        HttpClients.custom().setConnectionManager(connManager);

        // 创建自定义的httpclient对象
        CloseableHttpClient client = HttpClients.custom().setConnectionManager(connManager).build();
        // CloseableHttpClient client = HttpClients.createDefault();

        // 创建post方式请求对象
        HttpPost httpPost = new HttpPost(url);

        // 装填参数
        System.out.println("请求地址：" + url);
        System.out.println("请求参数：" + params);

        StringEntity stringEntity = new StringEntity(params, "utf-8");
        // 设置参数到请求对象中
        httpPost.setEntity(stringEntity);

        // 设置header信息
        // 指定报文头【Content-type】、【User-Agent】
        httpPost.setHeader("Content-type", method);
        // httpPost.setHeader("User-Agent", "Mozilla/4.0 (compatible; MSIE 5.0;
        // Windows NT; DigExt)");

        System.out.println("http 信息：" + httpPost);

        // 执行请求操作，并拿到结果（同步阻塞）
        CloseableHttpResponse response = client.execute(httpPost);
        // 获取结果实体
        HttpEntity entity = response.getEntity();
        if (entity != null) {
            // 按指定编码转换结果实体为String类型
            body = EntityUtils.toString(entity, "utf-8");
        }
        EntityUtils.consume(entity);
        // 释放链接
        response.close();
        return body;
    }

    /**
     * 绕过验证
     *
     * @return
     * @throws NoSuchAlgorithmException
     * @throws KeyManagementException
     */
    public static SSLContext createIgnoreVerifySSL() throws NoSuchAlgorithmException, KeyManagementException {
        SSLContext sc = SSLContext.getInstance("SSLv3");

        // 实现一个X509TrustManager接口，用于绕过验证，不用修改里面的方法
        X509TrustManager trustManager = new X509TrustManager() {
            public void checkClientTrusted(java.security.cert.X509Certificate[] paramArrayOfX509Certificate,
                                           String paramString) throws CertificateException {
            }

            public void checkServerTrusted(java.security.cert.X509Certificate[] paramArrayOfX509Certificate,
                                           String paramString) throws CertificateException {
            }

            public java.security.cert.X509Certificate[] getAcceptedIssuers() {
                return null;
            }
        };
        sc.init(null, new TrustManager[] { trustManager }, null);
        return sc;
    }

    private static final int CONNECT_TIMEOUT = 2000;

    private static final int READ_TIMEOUT = 5000;

    private static final String ENCODING = "utf-8";


    /**
     * @param url
     * @param param
     * @param connectTimeout
     * @param readTimeout
     * @param codeType
     * @return
     */
    public static String post(String url, String param) throws Exception {
        OutputStreamWriter out = null;
        BufferedReader in = null;
        String result = "";
        try {
            URL realUrl = new URL( url );
            HttpURLConnection conn = (HttpURLConnection) realUrl.openConnection();
            conn.setDoOutput( true );
            conn.setDoInput( true );

            conn.setUseCaches( false );
            conn.setRequestMethod( "POST" );
            conn.setConnectTimeout( CONNECT_TIMEOUT );
            conn.setReadTimeout( READ_TIMEOUT );
            conn.setRequestProperty( "Content-Type", "application/json" );
            conn.setRequestProperty( "Accept", "application/json" );
            conn.setRequestProperty( "Authorization", "token" );

            conn.connect();

            out = new OutputStreamWriter( conn.getOutputStream(), ENCODING );
            out.write( param );

            out.flush();
            out.close();

            in = new BufferedReader( new InputStreamReader( conn.getInputStream(), ENCODING ) );
            String line = "";
            while ( ( line = in.readLine() ) != null ) {
                result += line;
            }
            in.close();
        } catch ( Exception e ) {
            e.printStackTrace();
            result = e.getMessage();
            if ( in != null ) {
                in.close();
            }
            throw e;
        } finally {
            try {
                if ( in != null || out != null ) {
                    in.close();
                    out.close();
                }
            } catch ( IOException e ) {
                e.printStackTrace();
                result = e.getMessage();
                throw e;
            }
        }
        return result;
    }

    public static HttpResponse get(String url, String param) throws Exception {
        HttpClient client = new DefaultHttpClient();

        HttpGetWithEntity oHttpGet = new HttpGetWithEntity(url);
        HttpEntity httpEntity = new StringEntity(param, ContentType.TEXT_PLAIN);
        oHttpGet.setEntity(httpEntity);
        oHttpGet.setHeader("Context-Type", "text/plain");
        oHttpGet.setHeader("Context-Length", "120");
        oHttpGet.setHeader("Hook", UUID.randomUUID()+"");

        return client.execute(oHttpGet);
    }

    @SuppressWarnings({ "deprecation", "resource" })
    public static String sendGet(String url, String charset, String token, String hook) throws HttpException, IOException {
        HttpClient client = new DefaultHttpClient();
        String result = null;
        HttpGet httpGet = new HttpGet();
        // 设置参数
        try {
            httpGet.setURI(new URI(url));
        } catch (URISyntaxException e) {
            throw new HttpException("请求url格式错误。" + e.getMessage());
        }
        if(!Utils.isObjNull(token)){
            httpGet.setHeader("Authorization", token);
        }
        if(!Utils.isObjNull(hook)){
            httpGet.setHeader("Hook", hook);
        }

        // 发送请求
        HttpResponse httpResponse = client.execute(httpGet);
        // 获取返回的数据
        HttpEntity entity = httpResponse.getEntity();
        byte[] body = EntityUtils.toByteArray(entity);
        StatusLine sL = httpResponse.getStatusLine();
        int statusCode = sL.getStatusCode();
        if (statusCode == 200) {
            result = new String(body, charset);
            entity.consumeContent();
        } else {
            throw new HttpException("statusCode=" + statusCode);
        }
        return result;
    }

    /**
     * 模拟form表单的形式 ，上传文件 以输出流的形式把文件写入到url中，然后用输入流来获取url的响应
     *
     * @param url
     *            请求地址
     *            微信接口地址比如http://file.api.weixin.qq.com/cgi-bin/media/upload?access_token=ACCESS_TOKEN&type=image
     * @param filePath
     *            文件在服务器保存路径比如localhost:8080/WeChat/file/xxx.jpg
     * @return String url的响应信息返回值
     * @throws IOException
     */
    public static String uploadFile(String url, String filePath) {
        String result = null;

        InputStream inputStream = null;
        BufferedReader reader = null;

        try {
            File file = new File(filePath);
            inputStream = new FileInputStream(file);

            /**
             * 第一部分
             */
            URL urlObj = new URL(url);
            // 连接
            HttpURLConnection con = (HttpURLConnection) urlObj.openConnection();
            /**
             * 设置关键值
             */
            con.setRequestMethod("POST"); // 以Post方式提交表单，默认get方式
            con.setDoInput(true);
            con.setDoOutput(true);
            con.setUseCaches(false); // post方式不能使用缓存
            // 设置请求头信息
            con.setRequestProperty("Connection", "Keep-Alive");
            con.setRequestProperty("Charset", "UTF-8");
            // 设置边界
            String BOUNDARY = "---------------------------" + System.currentTimeMillis();
            con.setRequestProperty("Content-Type", "multipart/form-data; boundary=" + BOUNDARY);
            // 请求正文信息
            // 第一部分：
            StringBuilder sb = new StringBuilder();
            String regex = ".*/([^\\.]+)";
            sb.append("--"); // 必须多两道线
            sb.append(BOUNDARY);
            sb.append("\r\n");
            sb.append("Content-Disposition: form-data;name=\"media\";filename=\"" + filePath.replaceAll(regex, "$1")
                    + "\"\r\n");
            sb.append("Content-Type:application/octet-stream\r\n\r\n");
            byte[] head = sb.toString().getBytes("utf-8");
            // 获得输出流
            OutputStream out = new DataOutputStream(con.getOutputStream());
            // 输出表头
            out.write(head);
            // 文件正文部分
            // 把文件已流文件的方式 推入到url中
            int bytes = 0;
            byte[] bufferOut = new byte[1024];
            while ((bytes = inputStream.read(bufferOut)) != -1) {
                out.write(bufferOut, 0, bytes);
            }
            inputStream.close();
            // 结尾部分
            byte[] foot = ("\r\n--" + BOUNDARY + "--\r\n").getBytes("utf-8");// 定义最后数据分隔线
            out.write(foot);

            out.flush();
            out.close();

            StringBuffer buffer = new StringBuffer();
            // 定义BufferedReader输入流来读取URL的响应
            reader = new BufferedReader(new InputStreamReader(con.getInputStream()));
            String line = null;
            while ((line = reader.readLine()) != null) {
                buffer.append(line);
            }
            if (result == null) {
                result = buffer.toString();
            }
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        } finally {
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return result;
    }

    public static HttpResponse doGet(String url, Map<String, String> headers, Map<String, String> querys)
            throws Exception {
        HttpClient httpClient = new DefaultHttpClient();
        StringBuilder param = new StringBuilder();
        for(Map.Entry entry : querys.entrySet()){
            if(param.length() > 0){
                param.append("&");
            }
            param.append(entry.getKey()).append("=").append(entry.getValue());
        }

        HttpGet request = new HttpGet(url + "?" + param.toString());
        for (Map.Entry<String, String> e : headers.entrySet()) {
            request.addHeader(e.getKey(), e.getValue());
        }

        return httpClient.execute(request);
    }

    /**
     * 上传文件
     * @param url 上传接口地址
     * @param filePath
     * @param fileName
     * @throws ClientProtocolException
     * @throws IOException
     */
    public static void testPostFile(String url,String filePath,String fileName) throws ClientProtocolException, IOException {
        RequestConfig defaultRequestConfig = RequestConfig.custom().setSocketTimeout(5000).setConnectTimeout(3000)
                .setConnectionRequestTimeout(3000).build();

        CloseableHttpClient httpClient = HttpClients.custom().setDefaultRequestConfig(defaultRequestConfig).build();
        httpClient = HttpClients.createDefault();

        HttpPost post = new HttpPost(url);
        // 设置超时时间
        post.setConfig(defaultRequestConfig);

        // 传文件
        MultipartEntityBuilder builder = MultipartEntityBuilder.create();
        builder.setMode(HttpMultipartMode.BROWSER_COMPATIBLE);
        builder.addTextBody("name", "test");

        builder.addBinaryBody("file", new File(filePath), ContentType.DEFAULT_BINARY,
                fileName);
        post.setEntity(builder.build());

        ResponseHandler<String> responseHandler = new ResponseHandler<String>() {
            public String handleResponse(HttpResponse response) throws ClientProtocolException, IOException {
                int status = response.getStatusLine().getStatusCode();
                if (status >= 200 && status < 300) {
                    HttpEntity entity = response.getEntity();
                    return entity != null ? EntityUtils.toString(entity) : null;
                } else {
                    throw new ClientProtocolException("Unexpected response status: " + status);
                }
            }
        };

        System.out.println(httpClient.execute(post, responseHandler));
    }

    public static void main(String[] args) throws HttpException, IOException {

        JSONObject access_token = JSONObject.fromObject(HttpUtils.sendGet("http://story.test.stormorai.cn/access_token", "utf-8", null, null));


        System.out.println(access_token.getString("access_token"));


        String resullt = uploadFile(
                "https://api.weixin.qq.com/cgi-bin/media/upload?access_token=" + access_token.getString("access_token") + "&type=voice",
                "C:/Users/Administrator/Desktop/思拓 设备管理平台 API 接入文档/32.mp3");
        System.out.println(resullt);
    }
}
