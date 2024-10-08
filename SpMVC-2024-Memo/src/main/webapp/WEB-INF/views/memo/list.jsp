<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set value="${pageContext.request.contextPath }" var="rootPath" />
<div class="memo list">
	<div>
		<input type="date" id="date" /> <input type="time" id="time" />
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
			<c:forEach items="${sessionScope.MemoList }" var="one">
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
