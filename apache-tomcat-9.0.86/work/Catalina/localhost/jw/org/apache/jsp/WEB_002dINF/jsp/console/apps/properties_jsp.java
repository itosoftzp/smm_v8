/*
 * Generated by the Jasper component of Apache Tomcat
 * Version: Apache Tomcat/9.0.86
 * Generated at: 2024-06-18 08:27:36 UTC
 * Note: The last modified time of this file was set to
 *       the last modified time of the source file after
 *       generation to assist with modification tracking.
 */
package org.apache.jsp.WEB_002dINF.jsp.console.apps;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import org.joget.workflow.util.WorkflowUtil;

public final class properties_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent,
                 org.apache.jasper.runtime.JspSourceImports {

  private static final javax.servlet.jsp.JspFactory _jspxFactory =
          javax.servlet.jsp.JspFactory.getDefaultFactory();

  private static java.util.Map<java.lang.String,java.lang.Long> _jspx_dependants;

  static {
    _jspx_dependants = new java.util.HashMap<java.lang.String,java.lang.Long>(17);
    _jspx_dependants.put("/WEB-INF/tags/commons/implicit.tld", Long.valueOf(1715136700000L));
    _jspx_dependants.put("jar:file:/opt/joget-enterprise-linux-8.1.1/apache-tomcat-9.0.86/webapps/jw/WEB-INF/lib/jstl-1.2.jar!/META-INF/fmt.tld", Long.valueOf(1153385082000L));
    _jspx_dependants.put("jar:file:/opt/joget-enterprise-linux-8.1.1/apache-tomcat-9.0.86/webapps/jw/WEB-INF/lib/spring-webmvc-5.3.33.jar!/META-INF/spring.tld", Long.valueOf(1710407190000L));
    _jspx_dependants.put("/WEB-INF/tags/ui/jsontable.tag", Long.valueOf(1715136700000L));
    _jspx_dependants.put("/WEB-INF/tags/commons/popupFooter.tag", Long.valueOf(1715136700000L));
    _jspx_dependants.put("/WEB-INF/tags/commons/popupHeader.tag", Long.valueOf(1715136700000L));
    _jspx_dependants.put("/WEB-INF/tags/ui/msgEscHTML.tag", Long.valueOf(1715136700000L));
    _jspx_dependants.put("jar:file:/opt/joget-enterprise-linux-8.1.1/apache-tomcat-9.0.86/webapps/jw/WEB-INF/lib/jstl-1.2.jar!/META-INF/c.tld", Long.valueOf(1153385082000L));
    _jspx_dependants.put("/WEB-INF/tags/ui/popupdialog.tag", Long.valueOf(1715136700000L));
    _jspx_dependants.put("/WEB-INF/tags/ui/implicit.tld", Long.valueOf(1715136700000L));
    _jspx_dependants.put("/WEB-INF/tags/ui/escape.tag", Long.valueOf(1715136700000L));
    _jspx_dependants.put("/WEB-INF/lib/jstl-1.2.jar", Long.valueOf(1635287458000L));
    _jspx_dependants.put("jar:file:/opt/joget-enterprise-linux-8.1.1/apache-tomcat-9.0.86/webapps/jw/WEB-INF/lib/jstl-1.2.jar!/META-INF/fn.tld", Long.valueOf(1153385082000L));
    _jspx_dependants.put("/WEB-INF/tags/ui/msgEscJS.tag", Long.valueOf(1715136700000L));
    _jspx_dependants.put("/WEB-INF/jsp/includes/taglibs.jsp", Long.valueOf(1715136700000L));
    _jspx_dependants.put("/WEB-INF/lib/spring-webmvc-5.3.33.jar", Long.valueOf(1713335440000L));
    _jspx_dependants.put("jar:file:/opt/joget-enterprise-linux-8.1.1/apache-tomcat-9.0.86/webapps/jw/WEB-INF/lib/spring-webmvc-5.3.33.jar!/META-INF/spring-form.tld", Long.valueOf(1710407190000L));
  }

  private static final java.util.Set<java.lang.String> _jspx_imports_packages;

  private static final java.util.Set<java.lang.String> _jspx_imports_classes;

  static {
    _jspx_imports_packages = new java.util.LinkedHashSet<>(3);
    _jspx_imports_packages.add("javax.servlet");
    _jspx_imports_packages.add("javax.servlet.http");
    _jspx_imports_packages.add("javax.servlet.jsp");
    _jspx_imports_classes = new java.util.LinkedHashSet<>(1);
    _jspx_imports_classes.add("org.joget.workflow.util.WorkflowUtil");
  }

  private org.apache.jasper.runtime.TagHandlerPool _005fjspx_005ftagPool_005fc_005fif_0026_005ftest;
  private org.apache.jasper.runtime.TagHandlerPool _005fjspx_005ftagPool_005ffmt_005fmessage_0026_005fkey_005fnobody;
  private org.apache.jasper.runtime.TagHandlerPool _005fjspx_005ftagPool_005fc_005fout_0026_005fvalue_005fnobody;

  private volatile javax.el.ExpressionFactory _el_expressionfactory;
  private volatile org.apache.tomcat.InstanceManager _jsp_instancemanager;

  public java.util.Map<java.lang.String,java.lang.Long> getDependants() {
    return _jspx_dependants;
  }

  public java.util.Set<java.lang.String> getPackageImports() {
    return _jspx_imports_packages;
  }

  public java.util.Set<java.lang.String> getClassImports() {
    return _jspx_imports_classes;
  }

  public javax.el.ExpressionFactory _jsp_getExpressionFactory() {
    if (_el_expressionfactory == null) {
      synchronized (this) {
        if (_el_expressionfactory == null) {
          _el_expressionfactory = _jspxFactory.getJspApplicationContext(getServletConfig().getServletContext()).getExpressionFactory();
        }
      }
    }
    return _el_expressionfactory;
  }

  public org.apache.tomcat.InstanceManager _jsp_getInstanceManager() {
    if (_jsp_instancemanager == null) {
      synchronized (this) {
        if (_jsp_instancemanager == null) {
          _jsp_instancemanager = org.apache.jasper.runtime.InstanceManagerFactory.getInstanceManager(getServletConfig());
        }
      }
    }
    return _jsp_instancemanager;
  }

  public void _jspInit() {
    _005fjspx_005ftagPool_005fc_005fif_0026_005ftest = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _005fjspx_005ftagPool_005ffmt_005fmessage_0026_005fkey_005fnobody = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _005fjspx_005ftagPool_005fc_005fout_0026_005fvalue_005fnobody = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
  }

  public void _jspDestroy() {
    _005fjspx_005ftagPool_005fc_005fif_0026_005ftest.release();
    _005fjspx_005ftagPool_005ffmt_005fmessage_0026_005fkey_005fnobody.release();
    _005fjspx_005ftagPool_005fc_005fout_0026_005fvalue_005fnobody.release();
  }

  public void _jspService(final javax.servlet.http.HttpServletRequest request, final javax.servlet.http.HttpServletResponse response)
      throws java.io.IOException, javax.servlet.ServletException {

    if (!javax.servlet.DispatcherType.ERROR.equals(request.getDispatcherType())) {
      final java.lang.String _jspx_method = request.getMethod();
      if ("OPTIONS".equals(_jspx_method)) {
        response.setHeader("Allow","GET, HEAD, POST, OPTIONS");
        return;
      }
      if (!"GET".equals(_jspx_method) && !"POST".equals(_jspx_method) && !"HEAD".equals(_jspx_method)) {
        response.setHeader("Allow","GET, HEAD, POST, OPTIONS");
        response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED, "JSPs only permit GET, POST or HEAD. Jasper also permits OPTIONS");
        return;
      }
    }

    final javax.servlet.jsp.PageContext pageContext;
    javax.servlet.http.HttpSession session = null;
    final javax.servlet.ServletContext application;
    final javax.servlet.ServletConfig config;
    javax.servlet.jsp.JspWriter out = null;
    final java.lang.Object page = this;
    javax.servlet.jsp.JspWriter _jspx_out = null;
    javax.servlet.jsp.PageContext _jspx_page_context = null;


    try {
      response.setContentType("text/html");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;

 response.setHeader("Cache-Control","no-cache, no-store"); 
      out.write('\r');
      out.write('\n');
 response.setContentType("text/html;charset=UTF-8"); 
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write('\n');
      out.write('\n');
      out.write('\n');

    String theme = WorkflowUtil.getSystemSetupValue("systemTheme");
    pageContext.setAttribute("theme", theme);

      out.write('\n');
      out.write('\n');
      if (_jspx_meth_c_005fif_005f0(_jspx_page_context))
        return;
      out.write('\n');
      out.write('\n');
      if (_jspx_meth_commons_005fpopupHeader_005f0(_jspx_page_context))
        return;
      out.write("\n");
      out.write("<div id=\"main-body-content\">\n");
      out.write("    <div id=\"pluginDefault\">\n");
      out.write("        ");
      if (_jspx_meth_ui_005fjsontable_005f0(_jspx_page_context))
        return;
      out.write("\n");
      out.write("    </div>\n");
      out.write("    \n");
      out.write("    <script>\n");
      out.write("        ");
      if (_jspx_meth_ui_005fpopupdialog_005f0(_jspx_page_context))
        return;
      out.write("\n");
      out.write("    \n");
      out.write("        $(document).ready(function(){\n");
      out.write("            $('#JsonPluginDefaultDataTable').hide();\n");
      out.write("            ");
      if (_jspx_meth_c_005fif_005f1(_jspx_page_context))
        return;
      out.write("\n");
      out.write("        });\n");
      out.write("        \n");
      out.write("        function defaultPluginPropertiesCreate(){\n");
      out.write("            pluginDefaultCreateDialog.init();\n");
      out.write("        }\n");
      out.write("        \n");
      out.write("        function pluginDefaultDelete(selectedList){\n");
      out.write("            if (confirm('");
      if (_jspx_meth_ui_005fmsgEscJS_005f0(_jspx_page_context))
        return;
      out.write("')) {\n");
      out.write("               parent.UI.blockUI();\n");
      out.write("               var callback = {\n");
      out.write("                   success : function() {\n");
      out.write("                       reloadTable();\n");
      out.write("                       JsonPluginDefaultDataTable.clearSelectedRows();\n");
      out.write("                       parent.UI.unblockUI();\n");
      out.write("                   }\n");
      out.write("               }\n");
      out.write("               var request = ConnectionManager.post('");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${pageContext.request.contextPath}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
      out.write("/web/console/app/");
      if (_jspx_meth_c_005fout_005f0(_jspx_page_context))
        return;
      out.write('/');
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${appVersion}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
      out.write("/pluginDefault/delete', callback, 'ids='+selectedList);\n");
      out.write("            }\n");
      out.write("        }\n");
      out.write("        function closeDialog() {\n");
      out.write("            pluginDefaultCreateDialog.close();\n");
      out.write("        }\n");
      out.write("        function reloadTable() {\n");
      out.write("            closeDialog();\n");
      out.write("            filter(JsonPluginDefaultDataTable, '&filter=', $('#JsonPluginDefaultDataTable_searchCondition').val());\n");
      out.write("        }   \n");
      out.write("    </script>\n");
      out.write("</div>  \n");
      if (_jspx_meth_commons_005fpopupFooter_005f0(_jspx_page_context))
        return;
      out.write('\n');
    } catch (java.lang.Throwable t) {
      if (!(t instanceof javax.servlet.jsp.SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          try {
            if (response.isCommitted()) {
              out.flush();
            } else {
              out.clearBuffer();
            }
          } catch (java.io.IOException e) {}
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
        else throw new ServletException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }

  private boolean _jspx_meth_c_005fif_005f0(javax.servlet.jsp.PageContext _jspx_page_context)
          throws java.lang.Throwable {
    javax.servlet.jsp.PageContext pageContext = _jspx_page_context;
    javax.servlet.jsp.JspWriter out = _jspx_page_context.getOut();
    //  c:if
    org.apache.taglibs.standard.tag.rt.core.IfTag _jspx_th_c_005fif_005f0 = (org.apache.taglibs.standard.tag.rt.core.IfTag) _005fjspx_005ftagPool_005fc_005fif_0026_005ftest.get(org.apache.taglibs.standard.tag.rt.core.IfTag.class);
    boolean _jspx_th_c_005fif_005f0_reused = false;
    try {
      _jspx_th_c_005fif_005f0.setPageContext(_jspx_page_context);
      _jspx_th_c_005fif_005f0.setParent(null);
      // /WEB-INF/jsp/console/apps/properties.jsp(9,0) name = test type = boolean reqTime = true required = true fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
      _jspx_th_c_005fif_005f0.setTest(((java.lang.Boolean) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${not empty theme and theme ne 'classic'}", boolean.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null)).booleanValue());
      int _jspx_eval_c_005fif_005f0 = _jspx_th_c_005fif_005f0.doStartTag();
      if (_jspx_eval_c_005fif_005f0 != javax.servlet.jsp.tagext.Tag.SKIP_BODY) {
        do {
          out.write("\n");
          out.write("    <link rel=\"stylesheet\" type=\"text/css\" href=\"");
          out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${pageContext.request.contextPath}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
          out.write("/css/builderTheme.css?build=");
          if (_jspx_meth_fmt_005fmessage_005f0(_jspx_th_c_005fif_005f0, _jspx_page_context))
            return true;
          out.write("\" />\n");
          int evalDoAfterBody = _jspx_th_c_005fif_005f0.doAfterBody();
          if (evalDoAfterBody != javax.servlet.jsp.tagext.BodyTag.EVAL_BODY_AGAIN)
            break;
        } while (true);
      }
      if (_jspx_th_c_005fif_005f0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
        return true;
      }
      _005fjspx_005ftagPool_005fc_005fif_0026_005ftest.reuse(_jspx_th_c_005fif_005f0);
      _jspx_th_c_005fif_005f0_reused = true;
    } finally {
      org.apache.jasper.runtime.JspRuntimeLibrary.releaseTag(_jspx_th_c_005fif_005f0, _jsp_getInstanceManager(), _jspx_th_c_005fif_005f0_reused);
    }
    return false;
  }

  private boolean _jspx_meth_fmt_005fmessage_005f0(javax.servlet.jsp.tagext.JspTag _jspx_th_c_005fif_005f0, javax.servlet.jsp.PageContext _jspx_page_context)
          throws java.lang.Throwable {
    javax.servlet.jsp.PageContext pageContext = _jspx_page_context;
    javax.servlet.jsp.JspWriter out = _jspx_page_context.getOut();
    //  fmt:message
    org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_005fmessage_005f0 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _005fjspx_005ftagPool_005ffmt_005fmessage_0026_005fkey_005fnobody.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
    boolean _jspx_th_fmt_005fmessage_005f0_reused = false;
    try {
      _jspx_th_fmt_005fmessage_005f0.setPageContext(_jspx_page_context);
      _jspx_th_fmt_005fmessage_005f0.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_c_005fif_005f0);
      // /WEB-INF/jsp/console/apps/properties.jsp(10,111) name = key type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
      _jspx_th_fmt_005fmessage_005f0.setKey("build.number");
      int _jspx_eval_fmt_005fmessage_005f0 = _jspx_th_fmt_005fmessage_005f0.doStartTag();
      if (_jspx_th_fmt_005fmessage_005f0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
        return true;
      }
      _005fjspx_005ftagPool_005ffmt_005fmessage_0026_005fkey_005fnobody.reuse(_jspx_th_fmt_005fmessage_005f0);
      _jspx_th_fmt_005fmessage_005f0_reused = true;
    } finally {
      org.apache.jasper.runtime.JspRuntimeLibrary.releaseTag(_jspx_th_fmt_005fmessage_005f0, _jsp_getInstanceManager(), _jspx_th_fmt_005fmessage_005f0_reused);
    }
    return false;
  }

  private boolean _jspx_meth_commons_005fpopupHeader_005f0(javax.servlet.jsp.PageContext _jspx_page_context)
          throws java.lang.Throwable {
    javax.servlet.jsp.PageContext pageContext = _jspx_page_context;
    javax.servlet.jsp.JspWriter out = _jspx_page_context.getOut();
    //  commons:popupHeader
    org.apache.jsp.tag.web.commons.popupHeader_tag _jspx_th_commons_005fpopupHeader_005f0 = new org.apache.jsp.tag.web.commons.popupHeader_tag();
    _jsp_getInstanceManager().newInstance(_jspx_th_commons_005fpopupHeader_005f0);
    try {
      _jspx_th_commons_005fpopupHeader_005f0.setJspContext(_jspx_page_context);
      // /WEB-INF/jsp/console/apps/properties.jsp(13,0) name = bodyCssClass type = java.lang.String reqTime = true required = false fragment = false deferredValue = false expectedTypeName = java.lang.String deferredMethod = false methodSignature = null
      _jspx_th_commons_005fpopupHeader_005f0.setBodyCssClass(" builder-popup no-header");
      // /WEB-INF/jsp/console/apps/properties.jsp(13,0) name = builderTheme type = java.lang.String reqTime = true required = false fragment = false deferredValue = false expectedTypeName = java.lang.String deferredMethod = false methodSignature = null
      _jspx_th_commons_005fpopupHeader_005f0.setBuilderTheme((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${theme}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
      _jspx_th_commons_005fpopupHeader_005f0.doTag();
    } finally {
      _jsp_getInstanceManager().destroyInstance(_jspx_th_commons_005fpopupHeader_005f0);
    }
    return false;
  }

  private boolean _jspx_meth_ui_005fjsontable_005f0(javax.servlet.jsp.PageContext _jspx_page_context)
          throws java.lang.Throwable {
    javax.servlet.jsp.PageContext pageContext = _jspx_page_context;
    javax.servlet.jsp.JspWriter out = _jspx_page_context.getOut();
    //  ui:jsontable
    org.apache.jsp.tag.web.ui.jsontable_tag _jspx_th_ui_005fjsontable_005f0 = new org.apache.jsp.tag.web.ui.jsontable_tag();
    _jsp_getInstanceManager().newInstance(_jspx_th_ui_005fjsontable_005f0);
    try {
      _jspx_th_ui_005fjsontable_005f0.setJspContext(_jspx_page_context);
      // /WEB-INF/jsp/console/apps/properties.jsp(16,8) name = url type = java.lang.String reqTime = true required = true fragment = false deferredValue = false expectedTypeName = java.lang.String deferredMethod = false methodSignature = null
      _jspx_th_ui_005fjsontable_005f0.setUrl((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${pageContext.request.contextPath}/web/json/console/app/${appId}/${appVersion}/pluginDefault/list?${pageContext.request.queryString}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
      // /WEB-INF/jsp/console/apps/properties.jsp(16,8) name = var type = java.lang.String reqTime = true required = false fragment = false deferredValue = false expectedTypeName = java.lang.String deferredMethod = false methodSignature = null
      _jspx_th_ui_005fjsontable_005f0.setVar("JsonPluginDefaultDataTable");
      // /WEB-INF/jsp/console/apps/properties.jsp(16,8) name = divToUpdate type = java.lang.String reqTime = true required = true fragment = false deferredValue = false expectedTypeName = java.lang.String deferredMethod = false methodSignature = null
      _jspx_th_ui_005fjsontable_005f0.setDivToUpdate("pluginDefaultList");
      // /WEB-INF/jsp/console/apps/properties.jsp(16,8) name = jsonData type = java.lang.String reqTime = true required = false fragment = false deferredValue = false expectedTypeName = java.lang.String deferredMethod = false methodSignature = null
      _jspx_th_ui_005fjsontable_005f0.setJsonData("data");
      // /WEB-INF/jsp/console/apps/properties.jsp(16,8) name = rowsPerPage type = java.lang.String reqTime = true required = false fragment = false deferredValue = false expectedTypeName = java.lang.String deferredMethod = false methodSignature = null
      _jspx_th_ui_005fjsontable_005f0.setRowsPerPage("15");
      // /WEB-INF/jsp/console/apps/properties.jsp(16,8) name = width type = java.lang.String reqTime = true required = false fragment = false deferredValue = false expectedTypeName = java.lang.String deferredMethod = false methodSignature = null
      _jspx_th_ui_005fjsontable_005f0.setWidth("100%");
      // /WEB-INF/jsp/console/apps/properties.jsp(16,8) name = sort type = java.lang.String reqTime = true required = false fragment = false deferredValue = false expectedTypeName = java.lang.String deferredMethod = false methodSignature = null
      _jspx_th_ui_005fjsontable_005f0.setSort("id");
      // /WEB-INF/jsp/console/apps/properties.jsp(16,8) name = desc type = java.lang.String reqTime = true required = false fragment = false deferredValue = false expectedTypeName = java.lang.String deferredMethod = false methodSignature = null
      _jspx_th_ui_005fjsontable_005f0.setDesc("false");
      // /WEB-INF/jsp/console/apps/properties.jsp(16,8) name = href type = java.lang.String reqTime = true required = false fragment = false deferredValue = false expectedTypeName = java.lang.String deferredMethod = false methodSignature = null
      _jspx_th_ui_005fjsontable_005f0.setHref((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${pageContext.request.contextPath}/web/console/app/${appId}/${appVersion}/pluginDefault/config", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
      // /WEB-INF/jsp/console/apps/properties.jsp(16,8) name = hrefParam type = java.lang.String reqTime = true required = false fragment = false deferredValue = false expectedTypeName = java.lang.String deferredMethod = false methodSignature = null
      _jspx_th_ui_005fjsontable_005f0.setHrefParam("id");
      // /WEB-INF/jsp/console/apps/properties.jsp(16,8) name = hrefQuery type = java.lang.String reqTime = true required = false fragment = false deferredValue = false expectedTypeName = java.lang.String deferredMethod = false methodSignature = null
      _jspx_th_ui_005fjsontable_005f0.setHrefQuery("true");
      // /WEB-INF/jsp/console/apps/properties.jsp(16,8) name = hrefDialog type = java.lang.String reqTime = true required = false fragment = false deferredValue = false expectedTypeName = java.lang.String deferredMethod = false methodSignature = null
      _jspx_th_ui_005fjsontable_005f0.setHrefDialog("true");
      // /WEB-INF/jsp/console/apps/properties.jsp(16,8) name = hrefDialogTitle type = java.lang.String reqTime = true required = false fragment = false deferredValue = false expectedTypeName = java.lang.String deferredMethod = false methodSignature = null
      _jspx_th_ui_005fjsontable_005f0.setHrefDialogTitle("");
      // /WEB-INF/jsp/console/apps/properties.jsp(16,8) name = checkbox type = java.lang.String reqTime = true required = false fragment = false deferredValue = false expectedTypeName = java.lang.String deferredMethod = false methodSignature = null
      _jspx_th_ui_005fjsontable_005f0.setCheckbox((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${protectedReadonly != 'true'}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
      // /WEB-INF/jsp/console/apps/properties.jsp(16,8) null
      _jspx_th_ui_005fjsontable_005f0.setDynamicAttribute(null, "checkboxButton1", "console.app.pluginDefault.create.label");
      // /WEB-INF/jsp/console/apps/properties.jsp(16,8) null
      _jspx_th_ui_005fjsontable_005f0.setDynamicAttribute(null, "checkboxCallback1", "defaultPluginPropertiesCreate");
      // /WEB-INF/jsp/console/apps/properties.jsp(16,8) null
      _jspx_th_ui_005fjsontable_005f0.setDynamicAttribute(null, "checkboxOptional1", "true");
      // /WEB-INF/jsp/console/apps/properties.jsp(16,8) null
      _jspx_th_ui_005fjsontable_005f0.setDynamicAttribute(null, "checkboxButton2", "general.method.label.delete");
      // /WEB-INF/jsp/console/apps/properties.jsp(16,8) null
      _jspx_th_ui_005fjsontable_005f0.setDynamicAttribute(null, "checkboxCallback2", "pluginDefaultDelete");
      // /WEB-INF/jsp/console/apps/properties.jsp(16,8) name = searchItems type = java.lang.String reqTime = true required = false fragment = false deferredValue = false expectedTypeName = java.lang.String deferredMethod = false methodSignature = null
      _jspx_th_ui_005fjsontable_005f0.setSearchItems("filter|Filter");
      // /WEB-INF/jsp/console/apps/properties.jsp(16,8) name = fields type = java.lang.String reqTime = true required = true fragment = false deferredValue = false expectedTypeName = java.lang.String deferredMethod = false methodSignature = null
      _jspx_th_ui_005fjsontable_005f0.setFields("['id','pluginName','pluginDescription']");
      // /WEB-INF/jsp/console/apps/properties.jsp(16,8) null
      _jspx_th_ui_005fjsontable_005f0.setDynamicAttribute(null, "column1", "{key: 'pluginName', label: 'console.plugin.label.name', sortable: true}");
      // /WEB-INF/jsp/console/apps/properties.jsp(16,8) null
      _jspx_th_ui_005fjsontable_005f0.setDynamicAttribute(null, "column2", "{key: 'pluginDescription', label: 'console.plugin.label.description', sortable: true}");
      _jspx_th_ui_005fjsontable_005f0.doTag();
    } finally {
      _jsp_getInstanceManager().destroyInstance(_jspx_th_ui_005fjsontable_005f0);
    }
    return false;
  }

  private boolean _jspx_meth_ui_005fpopupdialog_005f0(javax.servlet.jsp.PageContext _jspx_page_context)
          throws java.lang.Throwable {
    javax.servlet.jsp.PageContext pageContext = _jspx_page_context;
    javax.servlet.jsp.JspWriter out = _jspx_page_context.getOut();
    //  ui:popupdialog
    org.apache.jsp.tag.web.ui.popupdialog_tag _jspx_th_ui_005fpopupdialog_005f0 = new org.apache.jsp.tag.web.ui.popupdialog_tag();
    _jsp_getInstanceManager().newInstance(_jspx_th_ui_005fpopupdialog_005f0);
    try {
      _jspx_th_ui_005fpopupdialog_005f0.setJspContext(_jspx_page_context);
      // /WEB-INF/jsp/console/apps/properties.jsp(43,8) name = var type = java.lang.String reqTime = true required = false fragment = false deferredValue = false expectedTypeName = java.lang.String deferredMethod = false methodSignature = null
      _jspx_th_ui_005fpopupdialog_005f0.setVar("pluginDefaultCreateDialog");
      // /WEB-INF/jsp/console/apps/properties.jsp(43,8) name = src type = java.lang.String reqTime = true required = true fragment = false deferredValue = false expectedTypeName = java.lang.String deferredMethod = false methodSignature = null
      _jspx_th_ui_005fpopupdialog_005f0.setSrc((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${pageContext.request.contextPath}/web/console/app/${appId}/${appVersion}/pluginDefault/create", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
      _jspx_th_ui_005fpopupdialog_005f0.doTag();
    } finally {
      _jsp_getInstanceManager().destroyInstance(_jspx_th_ui_005fpopupdialog_005f0);
    }
    return false;
  }

  private boolean _jspx_meth_c_005fif_005f1(javax.servlet.jsp.PageContext _jspx_page_context)
          throws java.lang.Throwable {
    javax.servlet.jsp.PageContext pageContext = _jspx_page_context;
    javax.servlet.jsp.JspWriter out = _jspx_page_context.getOut();
    //  c:if
    org.apache.taglibs.standard.tag.rt.core.IfTag _jspx_th_c_005fif_005f1 = (org.apache.taglibs.standard.tag.rt.core.IfTag) _005fjspx_005ftagPool_005fc_005fif_0026_005ftest.get(org.apache.taglibs.standard.tag.rt.core.IfTag.class);
    boolean _jspx_th_c_005fif_005f1_reused = false;
    try {
      _jspx_th_c_005fif_005f1.setPageContext(_jspx_page_context);
      _jspx_th_c_005fif_005f1.setParent(null);
      // /WEB-INF/jsp/console/apps/properties.jsp(47,12) name = test type = boolean reqTime = true required = true fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
      _jspx_th_c_005fif_005f1.setTest(((java.lang.Boolean) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${protectedReadonly == 'true'}", boolean.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null)).booleanValue());
      int _jspx_eval_c_005fif_005f1 = _jspx_th_c_005fif_005f1.doStartTag();
      if (_jspx_eval_c_005fif_005f1 != javax.servlet.jsp.tagext.Tag.SKIP_BODY) {
        do {
          out.write("\n");
          out.write("                $(\".ui-tabs-panel button\").hide();\n");
          out.write("            ");
          int evalDoAfterBody = _jspx_th_c_005fif_005f1.doAfterBody();
          if (evalDoAfterBody != javax.servlet.jsp.tagext.BodyTag.EVAL_BODY_AGAIN)
            break;
        } while (true);
      }
      if (_jspx_th_c_005fif_005f1.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
        return true;
      }
      _005fjspx_005ftagPool_005fc_005fif_0026_005ftest.reuse(_jspx_th_c_005fif_005f1);
      _jspx_th_c_005fif_005f1_reused = true;
    } finally {
      org.apache.jasper.runtime.JspRuntimeLibrary.releaseTag(_jspx_th_c_005fif_005f1, _jsp_getInstanceManager(), _jspx_th_c_005fif_005f1_reused);
    }
    return false;
  }

  private boolean _jspx_meth_ui_005fmsgEscJS_005f0(javax.servlet.jsp.PageContext _jspx_page_context)
          throws java.lang.Throwable {
    javax.servlet.jsp.PageContext pageContext = _jspx_page_context;
    javax.servlet.jsp.JspWriter out = _jspx_page_context.getOut();
    //  ui:msgEscJS
    org.apache.jsp.tag.web.ui.msgEscJS_tag _jspx_th_ui_005fmsgEscJS_005f0 = new org.apache.jsp.tag.web.ui.msgEscJS_tag();
    _jsp_getInstanceManager().newInstance(_jspx_th_ui_005fmsgEscJS_005f0);
    try {
      _jspx_th_ui_005fmsgEscJS_005f0.setJspContext(_jspx_page_context);
      // /WEB-INF/jsp/console/apps/properties.jsp(57,25) name = key type = java.lang.String reqTime = true required = true fragment = false deferredValue = false expectedTypeName = java.lang.String deferredMethod = false methodSignature = null
      _jspx_th_ui_005fmsgEscJS_005f0.setKey("console.app.pluginDefault.delete.label.confirmation");
      _jspx_th_ui_005fmsgEscJS_005f0.doTag();
    } finally {
      _jsp_getInstanceManager().destroyInstance(_jspx_th_ui_005fmsgEscJS_005f0);
    }
    return false;
  }

  private boolean _jspx_meth_c_005fout_005f0(javax.servlet.jsp.PageContext _jspx_page_context)
          throws java.lang.Throwable {
    javax.servlet.jsp.PageContext pageContext = _jspx_page_context;
    javax.servlet.jsp.JspWriter out = _jspx_page_context.getOut();
    //  c:out
    org.apache.taglibs.standard.tag.rt.core.OutTag _jspx_th_c_005fout_005f0 = (org.apache.taglibs.standard.tag.rt.core.OutTag) _005fjspx_005ftagPool_005fc_005fout_0026_005fvalue_005fnobody.get(org.apache.taglibs.standard.tag.rt.core.OutTag.class);
    boolean _jspx_th_c_005fout_005f0_reused = false;
    try {
      _jspx_th_c_005fout_005f0.setPageContext(_jspx_page_context);
      _jspx_th_c_005fout_005f0.setParent(null);
      // /WEB-INF/jsp/console/apps/properties.jsp(66,104) name = value type = null reqTime = true required = true fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
      _jspx_th_c_005fout_005f0.setValue((java.lang.Object) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${appId}", java.lang.Object.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
      int _jspx_eval_c_005fout_005f0 = _jspx_th_c_005fout_005f0.doStartTag();
      if (_jspx_th_c_005fout_005f0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
        return true;
      }
      _005fjspx_005ftagPool_005fc_005fout_0026_005fvalue_005fnobody.reuse(_jspx_th_c_005fout_005f0);
      _jspx_th_c_005fout_005f0_reused = true;
    } finally {
      org.apache.jasper.runtime.JspRuntimeLibrary.releaseTag(_jspx_th_c_005fout_005f0, _jsp_getInstanceManager(), _jspx_th_c_005fout_005f0_reused);
    }
    return false;
  }

  private boolean _jspx_meth_commons_005fpopupFooter_005f0(javax.servlet.jsp.PageContext _jspx_page_context)
          throws java.lang.Throwable {
    javax.servlet.jsp.PageContext pageContext = _jspx_page_context;
    javax.servlet.jsp.JspWriter out = _jspx_page_context.getOut();
    //  commons:popupFooter
    org.apache.jsp.tag.web.commons.popupFooter_tag _jspx_th_commons_005fpopupFooter_005f0 = new org.apache.jsp.tag.web.commons.popupFooter_tag();
    _jsp_getInstanceManager().newInstance(_jspx_th_commons_005fpopupFooter_005f0);
    try {
      _jspx_th_commons_005fpopupFooter_005f0.setJspContext(_jspx_page_context);
      _jspx_th_commons_005fpopupFooter_005f0.doTag();
    } finally {
      _jsp_getInstanceManager().destroyInstance(_jspx_th_commons_005fpopupFooter_005f0);
    }
    return false;
  }
}