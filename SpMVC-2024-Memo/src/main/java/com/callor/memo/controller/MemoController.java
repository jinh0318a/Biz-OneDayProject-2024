package com.callor.memo.controller;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.callor.memo.dao.MemoDao;
import com.callor.memo.model.MemoVO;
import com.callor.memo.service.MemoService;

@Controller
@RequestMapping(value = "/memo")
public class MemoController {
	private final MemoDao memoDao;
	private final MemoService memoService;

	public MemoController(MemoDao memoDao, MemoService memoService) {
		super();
		this.memoDao = memoDao;
		this.memoService = memoService;
	}

	@RequestMapping(value = "/insert", method = RequestMethod.GET)
	public String insert() {
		return null;
	}

	@RequestMapping(value = "/insert", method = RequestMethod.POST)
	public String insert(MemoVO memoVO) {
		memoVO.setM_author("jinh0318a@naver.com");
		int result = memoDao.insert(memoVO);
		return "redirect:/";
	}

	@RequestMapping(value = "/detail", method = RequestMethod.GET)
	public String detail(String m_seq, Model model) {
		MemoVO memoVO = memoService.findBySeq(m_seq);
		model.addAttribute("MEMO", memoVO);
		return null;
	}

	@RequestMapping(value = "/update", method = RequestMethod.GET)
	public String update(String m_seq, Model model) {
		MemoVO memoVO = memoService.findBySeq(m_seq);
		model.addAttribute("MEMO", memoVO);
		return null;
	}

	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public String update(MemoVO memoVO, Model model) {
		memoVO.setM_author("jinh0318a@naver.com");
		Date date = new Date();
		SimpleDateFormat day = new SimpleDateFormat("yyyy-MM-dd");
		SimpleDateFormat time = new SimpleDateFormat("HH:mm:ss");
		String m_date = day.format(date);
		String m_time = time.format(date);
		memoVO.setM_date(m_date);
		memoVO.setM_time(m_time);
		int result = memoDao.update(memoVO);
		String m_seq = memoVO.getM_seq();
		if (result > 0) {
			model.addAttribute(memoVO);
			return "redirect:/memo/detail?m_seq=" + m_seq;
		}
		return "redirect:/";
	}

}
