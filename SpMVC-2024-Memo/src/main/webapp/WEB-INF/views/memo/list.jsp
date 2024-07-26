<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set value="${pageContext.request.contextPath }" var="rootPath" />
<section class="memo list">
	<input id="m_date" type="hidden" name="m_date" /> <input id="m_time"
		type="hidden" name="m_time" />
	<div class="memo insert">
		<fieldset>
			<legend>새 메모 작성</legend>
			<div>
				<label>제목</label><input type="text" name="m_title" />
			</div>
			<div>
				<label>내용</label>
				<textarea name="m_memo"></textarea>
			</div>
			<div>
				<label>이미지</label><input type="text" name="m_image" />
			</div>
			<div>
				<button type="submit" id="insert">작성</button>
			</div>
		</fieldset>
	</div>
	<div class="memo list">
		<div>
			<input type="date" id="date" name="m_date" /> <input type="time"
				id="time" name="m_time" />
			<button type="button" id="clock">새로작성</button>
		</div>
		<table class="memo list">
			<thead>
				<tr>
					<td>번호</td>
					<td>제목</td>
					<td>작성일</td>
					<td>작성시간</td>
				</tr>
			</thead>
			<tbody>
				<c:forEach items="${MemoList }" var="one">
					<tr data-m_seq="${one.m_seq }">
						<td>${one.m_seq }</td>
						<td>${one.m_title }</td>
						<td>${one.m_date }</td>
						<td>${one.m_time }</td>
					</tr>
				</c:forEach>
			</tbody>
		</table>
	</div>
</section>