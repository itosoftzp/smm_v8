<%@ include file="/WEB-INF/jsp/includes/taglibs.jsp" %>
<%@ page import="org.joget.commons.util.HostManager"%>
<%@ page import="org.joget.commons.util.StringUtil"%>
<c:set var="analyzerEnabled" value="<%= org.joget.commons.util.Analyzer.isEnabled() %>"/>
<c:if test="${analyzerEnabled}">
    <c:if test="${!isVirtualHostEnabled}">
        <script>
            AdminBar.contextPath = '${pageContext.request.contextPath}';
            AdminBar.isVirtualHostEnabled = false;
        </script>
    </c:if>
<textarea id="analyzerJson" rows="1" cols="1" style="display:none;"><%= StringUtil.escapeString(org.joget.commons.util.Analyzer.getStatus(), StringUtil.TYPE_HTML) %></textarea>
<script src="${pageContext.request.contextPath}/js/perfAnalyzer.js" async></script>
</c:if>
