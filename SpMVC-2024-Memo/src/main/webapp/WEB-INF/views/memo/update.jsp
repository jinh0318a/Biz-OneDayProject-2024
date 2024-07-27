<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set value="${pageContext.request.contextPath }" var="rootPath" />

<div class="memo update">
	<form method="post" class="memo update">
		<fieldset>
			<legend>메모 수정</legend>
			<div>
				<label>제목</label><input type="text" name="m_title" id="m_title"
					value="<c:out value='${MEMO.m_title }'/>" />
			</div>
			<div>
				<label>내용</label>
				<textarea name="m_memo" id="m_memo"><c:out
						value="${MEMO.m_memo }" /></textarea>
			</div>
			<div>
				<label>이미지</label><input type="text" name="m_image"
					value="<c:out value='${MEMO.m_image }'/>" />
			</div>
			<div>
				<button>수정</button>
			</div>
		</fieldset>
	</form>
</div>
