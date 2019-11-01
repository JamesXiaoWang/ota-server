package com.otaserver.ota_project.common.util;

import com.github.pagehelper.Page;

/**
 * @describe 分页对象实体
 */
public class PageUtil {

	public static final Integer PAGE_SIZE = 10;

	/**
	 * 当前页
	 */
	private Integer pageNum = 1;
	/**
	 * 每页记录数
	 */
	private Integer pageSize = PAGE_SIZE;
	/**
	 * 总页数
	 */
	private Integer totalPage = 0;
	/**
	 * 开始行
	 */
	private Integer startRecord = 0;
	/**
	 * 结束行
	 */
	private Integer endRecord = 0;
	/**
	 * 总记录数
	 */
	private Long totalRecord = 0L;

	private String remark;

	public PageUtil getPage(Page<?> page) {
		this.pageNum = page.getPageNum();
		this.pageSize = page.getPageSize();
		this.totalPage = page.getPages();
		this.startRecord = page.getStartRow();
		this.endRecord = page.getEndRow();
		this.totalRecord = page.getTotal();
		return this;
	}

	public String getRemark() {
		return remark;
	}

	public PageUtil setRemark(String remark) {
		this.remark = remark;
		return this;
	}

	public Integer getPageNum() {
		return pageNum;
	}

	public PageUtil setPageNum(int pageNum) {
		this.pageNum = pageNum;
		return this;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public PageUtil setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
		return this;
	}

	public Long getTotalRecord() {
		return totalRecord;
	}

	public PageUtil setTotalRecord(long totalRecord) {
		this.totalRecord = totalRecord;
		return this;
	}

	public Integer getTotalPage() {
		return totalPage;
	}

	public PageUtil setTotalPage(int totalPage) {
		this.totalPage = totalPage;
		return this;
	}

	public Integer getStartRecord() {
		return startRecord;
	}

	public PageUtil setStartRecord(Integer startRecord) {
		this.startRecord = startRecord;
		return this;
	}

	public long getEndRecord() {
		return endRecord;
	}

	public PageUtil setEndRecord(Integer endRecord) {
		this.endRecord = endRecord;
		return this;
	}

	@Override
	public String toString() {
		return "PageUtil{" + "pageNum=" + pageNum + ", pageSize=" + pageSize + ", totalPage=" + totalPage
				+ ", startRecord=" + startRecord + ", endRecord=" + endRecord + ", totalRecord=" + totalRecord
				+ ", remark='" + remark + '\'' + '}';
	}
}
