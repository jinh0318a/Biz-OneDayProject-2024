package com.callor.memo.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MemoVO {

	private String m_seq; // BIGINT primary key,
	private String m_author; // varchar(25) not null,
	private String m_date; // varchar(10) not null,
	private String m_time; // varchar(10) not null,
	private String m_title;
	private String m_memo; // varchar(40) not null,
	private String m_image; // varchar(125)

}
