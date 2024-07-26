package com.callor.memo.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.callor.memo.dao.MemoDao;
import com.callor.memo.model.MemoVO;
import com.callor.memo.service.MemoService;

@Service
public class MemoServiceImplV1 implements MemoService {

	private final MemoDao memoDao;

	public MemoServiceImplV1(MemoDao memoDao) {
		super();
		this.memoDao = memoDao;
	}

	@Override
	public List<MemoVO> findAll() {
		List<MemoVO> memoList = memoDao.findAll();
		return memoList;
	}

	@Override
	public MemoVO findBySeq(String seq) {
		MemoVO memoVO = memoDao.findBySeq(seq);
		return memoVO;
	}

}
