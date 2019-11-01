package com.otaserver.ota_project.common.util;

import java.net.URI;
import org.apache.http.client.methods.HttpEntityEnclosingRequestBase;

import java.net.URI;
/**
 * @Author: WangJiaPeng
 * @Date: 2019/8/30 20:33
 * @Version 1.0
 */
public class HttpGetWithEntity extends HttpEntityEnclosingRequestBase{
    private final static String METHOD_NAME = "GET";

    @Override
    public String getMethod() {
        return METHOD_NAME;
    }

    public HttpGetWithEntity() {
        super();
    }

    public HttpGetWithEntity(final URI uri) {
        super();
        setURI(uri);
    }

    HttpGetWithEntity(final String uri) {
        super();
        setURI(URI.create(uri));
    }
}
