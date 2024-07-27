<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set value="${pageContext.request.contextPath }" var="rootPath" />
<div class="memo insert">
	<form method="post" class="memo insert">
		<input id="m_date" type="hidden" name="m_date" /> <input id="m_time"
			type="hidden" name="m_time" />
		<fieldset>
			<legend>새 메모 작성</legend>
			<div>
				<label>제목</label><input type="text" name="m_title" id="m_title"/>
			</div>
			<div>
				<label>내용</label>
				<textarea name="m_memo" id="m_memo"></textarea>
			</div>
			<div>
				<label>이미지</label><input type="text" name="m_image" />
			</div>
			<div class="button">
				<button type="submit" id="insert">작성</button>
			</div>
		</fieldset>
	</form>
</div>
