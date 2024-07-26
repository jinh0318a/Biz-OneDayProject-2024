package com.callor.memo.service;

import java.util.List;

import com.callor.memo.model.MemoVO;

public interface MemoService {

	public List<MemoVO> findAll();

	public MemoVO findBySeq(String seq);

}
