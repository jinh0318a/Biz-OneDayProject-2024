<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set value="${pageContext.request.contextPath }" var="rootPath" />

<section class="memo detail">
	<div class="body">
		<div class="title">
			<c:out value="${MEMO.m_title }" />
		</div>
		<div class="memo">
			<c:out value="${MEMO.m_memo }" />
		</div>
		<div class="button">
			<a href="${rootPath }/memo/update?m_seq=${MEMO.m_seq}"><button>수정</button></a>
		</div>
	</div>
</section>