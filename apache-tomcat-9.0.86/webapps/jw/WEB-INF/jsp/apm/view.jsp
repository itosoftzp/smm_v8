<%@ include file="/WEB-INF/jsp/includes/taglibs.jsp" %>
<%@ page import="org.joget.commons.util.HostManager"%>


<commons:header />

<div id="nav">
    <div id="nav-title">
        <p><i class="fas fa-tachometer-alt"></i> <fmt:message key='console.header.menu.label.monitor'/></p>
    </div>
    <div id="nav-body">
        <ul id="nav-list">
            <jsp:include page="../console/monitor/subMenu.jsp" flush="true" />
        </ul>
    </div>
</div>
<jsp:include page="/WEB-INF/jsp/console/plugin/library.jsp" />
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/apmviewer.css?build=<fmt:message key="build.number"/>">    
<script type="text/javascript" src="${pageContext.request.contextPath}/js/echarts/echarts.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/moment/moment.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/web/console/i18n/apmviewer?build=<fmt:message key="build.number"/>"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/apmviewer.js?build=<fmt:message key="build.number"/>"></script>
<script>
    $(document).ready(function(){
        $("#nodes").val('${currentNode}');
        var node = $("#nodes").val();
        APMViewer.init('${pageContext.request.contextPath}', ${totalMemory}, ${maxHeap}, '<ui:msgEscJS key="console.header.browser.title"/>', ${isVirtualHostEnabled}, '', null, node);

        $("#nodes").on('change', function() {
            var selectedNode = $("#nodes").val();
            $(".apmtool").remove();
            $("body > table").closest('table').remove();
            APMViewer.init('${pageContext.request.contextPath}', ${totalMemory}, ${maxHeap}, '<ui:msgEscJS key="console.header.browser.title"/>', ${isVirtualHostEnabled}, '', null, selectedNode);
        });
    });
</script>
<style>
.form-row{margin-bottom: 20px;}
</style>
<div id="main">
    <div id="main-title"></div>
    <div id="main-action">
    <c:if test="${supportMultipleNode}">        
    <div class="form-row">
        <label for="nodes">Cluster Nodes</label>
        <span class="form-input">
            <select id="nodes" name="nodes">
                <c:forEach items="${nodes}" var="t">
                    <option value="${t.key}" ${selected}>${t.value}</option>
                </c:forEach>
            </select>
        </span>
    </div>
    </c:if>
        <c:if test="${!isVirtualHostEnabled}">
            <ul id="main-action-buttons">
                <li><button id="alert"><fmt:message key="apm.manageAlert"/></button></li>
                <li><button id="deleteData"><fmt:message key="apm.deleteData"/></button></li>
            </ul>
        </c:if>
    </div>
    <div id="main-body">
        <div class="apmviewer"></div>
    </div>
</div>

<script>
    Template.init("#menu-monitor", "#nav-monitor-apm");
</script>

<commons:footer />
