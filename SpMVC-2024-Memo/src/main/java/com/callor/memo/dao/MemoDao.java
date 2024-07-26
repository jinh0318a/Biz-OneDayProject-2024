package com.callor.memo.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Select;

import com.callor.memo.model.MemoVO;

public interface MemoDao {

	@Select("select * from tbl_memo")
	public List<MemoVO> findAll();

	@Select("select * from tbl_memo where m_seq=#{seq}")
	public MemoVO findBySeq(String seq);

	public int insert(MemoVO memoVO);

	public int update(MemoVO memoVO);

}
