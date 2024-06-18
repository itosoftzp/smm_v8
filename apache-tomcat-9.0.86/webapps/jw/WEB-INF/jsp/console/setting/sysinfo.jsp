<%@ include file="/WEB-INF/jsp/includes/taglibs.jsp" %>
<%@ page import="java.util.Date"%>
<%@ page import="java.util.Locale" %>
<%@ page import="org.joget.commons.util.HostManager"%>
<%@ page import="org.joget.commons.util.SysInfo"%>
<%@ page import="org.joget.commons.util.ResourceBundleUtil" %>
<%@ page import="org.springframework.web.servlet.support.RequestContextUtils" %>
<%@ page import="org.joget.apps.app.service.AppUtil"%>
<% Locale locale = RequestContextUtils.getLocale(request); %>
<c:set var="licenseInfo" value="<%= SysInfo.getLicenseProperties()%>"/>
<c:set var="sysInfo" value="<%= SysInfo.getSystemProperties()%>"/>
<c:set var="isVirtualHostEnabled" value="<%= HostManager.isVirtualHostEnabled() %>"/>
<c:set var="lang" value="<%= AppUtil.getAppLocale() %>"/>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html xml:lang="${lang}">
    <head>
        <title><%= ResourceBundleUtil.getMessage("console.header.top.title", locale) %></title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="shortcut icon" href="${pageContext.request.contextPath}/images/v3/joget.ico"/>
        <link rel="stylesheet" href="${pageContext.request.contextPath}/js/fontawesome5/css/all.min.css"/>
        <link rel="stylesheet" href="${pageContext.request.contextPath}/home/style.css"/>
        <style>
            body { font-size: 12px }
            #page-container { width: 98%; max-width: 900px; margin: 20px auto; }
            #page-container #logo { width: 200px; margin: auto; }
            #page-footer { text-align: center; padding: 0px 10px 10px }
            .icon { float: left; width: 70px; }
            .icon .check { color: green; font-size: 60px;}           
            .content table { width: 800px }
            .key { word-wrap:break-word; max-width:250px }
            .value { word-wrap:break-word; max-width:500px }
        </style>
    </head>
    <body class="page-body">
        <div id="page-container">
            <div id="logo">
                <a href="${pageContext.request.contextPath}/"><img src="${pageContext.request.contextPath}/home/logo.png" border="0" height="60" /></a>
            </div>
            <div class="icon"><i class="check fas fa-check-circle" aria-hidden="true"></i></div>
            <div class="content">
                <h2><%= ResourceBundleUtil.getMessage("enterprise.console.label.license", locale) %></h2>
                <table border="1" cellspacing="0">
                <c:forEach var="info" items="${licenseInfo}">
                    <tr>
                        <td width="32%" valign="top"><div class="key"><c:out value="${info.key}"/></div></td>
                        <td><div class="value" valign="top"><c:out value="${info.value}"/></div></td>
                    </tr>
                </c:forEach>
                </table>
            </div>
            <c:if test="${!isVirtualHostEnabled}">
            <div class="icon"><i class="check fas fa-check-circle" aria-hidden="true"></i></div>
            <div class="content">
                <h2><%= ResourceBundleUtil.getMessage("enterprise.console.label.sysinfo", locale) %></h2>
                <table border="1" cellspacing="0">
                <c:forEach var="info" items="${sysInfo}">
                    <tr>
                        <td width="32%" valign="top"><div class="key"><c:out value="${info.key}"/></div></td>
                        <td><div class="value" valign="top"><c:out value="${info.value}"/></div></td>
                    </tr>
                </c:forEach>
                </table>
            </div>
            </c:if>
        </div>
        <div id="page-footer"><%= new Date() %></div>
    </body>
</html>
