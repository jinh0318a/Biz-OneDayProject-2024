package com.callor.memo.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.callor.memo.dao.MemoDao;
import com.callor.memo.model.MemoVO;
import com.callor.memo.service.MemoService;

@Controller
public class HomeController {

	private final MemoDao memoDao;
	private final MemoService memoService;

	public HomeController(MemoDao memoDao, MemoService memoService) {
		super();
		this.memoDao = memoDao;
		this.memoService = memoService;
	}

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Model model) {

		List<MemoVO> memoList = memoService.findAll();

		model.addAttribute("MemoList", memoList);

		return "home";
	}

	@RequestMapping(value = "/", method = RequestMethod.POST)
	public String insert(MemoVO memoVO) {
		memoVO.setM_author("jinh0318a@naver.com");
		int result = memoDao.insert(memoVO);
		return "redirect:/";
	}

	@RequestMapping(value = "/detail", method = RequestMethod.GET)
	public String detail(String m_seq, Model model) {
		MemoVO memoVO = memoService.findBySeq(m_seq);
		model.addAttribute("MEMO", memoVO);
		return "redirect:/memo/detail?m_seq=" + m_seq;
	}

	@RequestMapping(value = "/update", method = RequestMethod.GET)
	public String update(String m_seq, Model model) {
		MemoVO memoVO = memoService.findBySeq(m_seq);
		model.addAttribute("MEMO", memoVO);
		return "/memo/update";
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
