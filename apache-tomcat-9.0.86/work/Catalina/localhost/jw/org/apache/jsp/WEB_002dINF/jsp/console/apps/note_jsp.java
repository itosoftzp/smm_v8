/*
 * Generated by the Jasper component of Apache Tomcat
 * Version: Apache Tomcat/9.0.86
 * Generated at: 2024-06-21 07:22:16 UTC
 * Note: The last modified time of this file was set to
 *       the last modified time of the source file after
 *       generation to assist with modification tracking.
 */
package org.apache.jsp.WEB_002dINF.jsp.console.apps;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import org.joget.workflow.util.WorkflowUtil;

public final class note_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent,
                 org.apache.jasper.runtime.JspSourceImports {

  private static final javax.servlet.jsp.JspFactory _jspxFactory =
          javax.servlet.jsp.JspFactory.getDefaultFactory();

  private static java.util.Map<java.lang.String,java.lang.Long> _jspx_dependants;

  static {
    _jspx_dependants = new java.util.HashMap<java.lang.String,java.lang.Long>(14);
    _jspx_dependants.put("/WEB-INF/tags/commons/implicit.tld", Long.valueOf(1715136700000L));
    _jspx_dependants.put("jar:file:/opt/joget-enterprise-linux-8.1.1/apache-tomcat-9.0.86/webapps/jw/WEB-INF/lib/jstl-1.2.jar!/META-INF/fmt.tld", Long.valueOf(1153385082000L));
    _jspx_dependants.put("jar:file:/opt/joget-enterprise-linux-8.1.1/apache-tomcat-9.0.86/webapps/jw/WEB-INF/lib/spring-webmvc-5.3.33.jar!/META-INF/spring.tld", Long.valueOf(1710407190000L));
    _jspx_dependants.put("/WEB-INF/tags/commons/popupFooter.tag", Long.valueOf(1715136700000L));
    _jspx_dependants.put("/WEB-INF/tags/commons/popupHeader.tag", Long.valueOf(1715136700000L));
    _jspx_dependants.put("/WEB-INF/tags/ui/msgEscHTML.tag", Long.valueOf(1715136700000L));
    _jspx_dependants.put("jar:file:/opt/joget-enterprise-linux-8.1.1/apache-tomcat-9.0.86/webapps/jw/WEB-INF/lib/jstl-1.2.jar!/META-INF/c.tld", Long.valueOf(1153385082000L));
    _jspx_dependants.put("/WEB-INF/tags/ui/implicit.tld", Long.valueOf(1715136700000L));
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
  private org.apache.jasper.runtime.TagHandlerPool _005fjspx_005ftagPool_005fc_005fout_0026_005fvalue_005fescapeXml_005fnobody;

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
    _005fjspx_005ftagPool_005fc_005fout_0026_005fvalue_005fescapeXml_005fnobody = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
  }

  public void _jspDestroy() {
    _005fjspx_005ftagPool_005fc_005fif_0026_005ftest.release();
    _005fjspx_005ftagPool_005ffmt_005fmessage_0026_005fkey_005fnobody.release();
    _005fjspx_005ftagPool_005fc_005fout_0026_005fvalue_005fnobody.release();
    _005fjspx_005ftagPool_005fc_005fout_0026_005fvalue_005fescapeXml_005fnobody.release();
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
      if (_jspx_meth_commons_005fpopupHeader_005f0(_jspx_page_context))
        return;
      out.write("\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${pageContext.request.contextPath}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
      out.write("/js/ace/ace.js\"></script>\n");
      if (_jspx_meth_c_005fif_005f0(_jspx_page_context))
        return;
      out.write("\n");
      out.write("<style>\n");
      out.write("    .sticky-buttons {\n");
      out.write("        position: fixed;\n");
      out.write("        right: 20px;\n");
      out.write("        top: 15px;\n");
      out.write("    }\n");
      out.write("    .btn.btn-secondary {\n");
      out.write("        display: inline-block;\n");
      out.write("        font-weight: 400;\n");
      out.write("        text-align: center;\n");
      out.write("        vertical-align: middle;\n");
      out.write("        -webkit-user-select: none;\n");
      out.write("        -moz-user-select: none;\n");
      out.write("        -ms-user-select: none;\n");
      out.write("        user-select: none;\n");
      out.write("        border: 1px solid transparent;\n");
      out.write("        padding: 0.375rem 0.75rem;\n");
      out.write("        font-size: 1rem;\n");
      out.write("        line-height: 1.5;\n");
      out.write("        border-radius: 0.25rem;\n");
      out.write("        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;\n");
      out.write("        color: #fff;\n");
      out.write("        background-color: #6c757d;\n");
      out.write("        border-color: #6c757d;\n");
      out.write("    }\n");
      out.write("    .btn.btn-secondary:hover {\n");
      out.write("        color: #fff;\n");
      out.write("        background-color: #5a6268;\n");
      out.write("        border-color: #545b62;\n");
      out.write("    }\n");
      out.write("    #description_editor{\n");
      out.write("        margin: 0;\n");
      out.write("    }\n");
      out.write("</style>    \n");
      out.write("<div id=\"main-body-content\">\n");
      out.write("    <div id=\"appDesc\">\n");
      out.write("        <form method=\"post\" action=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${pageContext.request.contextPath}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
      out.write("/web/console/app/");
      if (_jspx_meth_c_005fout_005f0(_jspx_page_context))
        return;
      out.write('/');
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${appDefinition.version}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
      out.write("/note/submit\">\n");
      out.write("            <textarea id=\"description\" name=\"description\" style=\"display:none\">");
      if (_jspx_meth_c_005fout_005f1(_jspx_page_context))
        return;
      out.write("</textarea>\n");
      out.write("            <pre id=\"description_editor\" name=\"description_editor\" class=\"ace_editor\"></pre>\n");
      out.write("            <br />\n");
      out.write("            <div class=\"sticky-buttons\"><input type=\"submit\" value=\"");
      if (_jspx_meth_ui_005fmsgEscHTML_005f0(_jspx_page_context))
        return;
      out.write("\" class=\"btn btn-secondary\"/></div>\n");
      out.write("        </form>\n");
      out.write("    </div> \n");
      out.write("    <script>\n");
      out.write("        $(document).ready(function(){\n");
      out.write("            var editor = ace.edit(\"description_editor\");\n");
      out.write("            var textarea = $('textarea[name=\"description\"]');\n");
      out.write("            editor.getSession().setValue(textarea.val());\n");
      out.write("            editor.getSession().setTabSize(4);\n");
      out.write("            if ($('body').attr('builder-theme') === \"dark\") {\n");
      out.write("                editor.setTheme(\"ace/theme/vibrant_ink\");\n");
      out.write("            } else {\n");
      out.write("                editor.setTheme(\"ace/theme/textmate\");\n");
      out.write("            }\n");
      out.write("            editor.getSession().setMode(\"ace/mode/text\");\n");
      out.write("            editor.setAutoScrollEditorIntoView(true);\n");
      out.write("            editor.setOption(\"maxLines\", 1000000); //unlimited, to fix the height issue\n");
      out.write("            editor.setOption(\"minLines\", 20);\n");
      out.write("            editor.resize();\n");
      out.write("            editor.getSession().on('change', function(){\n");
      out.write("                textarea.val(editor.getSession().getValue());\n");
      out.write("            });\n");
      out.write("            \n");
      out.write("            if (\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${saved}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
      out.write("\" === \"true\") {\n");
      out.write("                if (window.top.CustomBuilder !== undefined) {\n");
      out.write("                    window.top.CustomBuilder.showMessage(\"");
      if (_jspx_meth_ui_005fmsgEscJS_005f0(_jspx_page_context))
        return;
      out.write("\" ,\"success\", true);\n");
      out.write("                    if ($(\"#versionsView\", window.top.document).length > 0) {\n");
      out.write("                        $(\"#versionsView\", window.top.document).remove();\n");
      out.write("                    }\n");
      out.write("                } else {\n");
      out.write("                    alert(\"");
      if (_jspx_meth_ui_005fmsgEscJS_005f1(_jspx_page_context))
        return;
      out.write("\");\n");
      out.write("                }\n");
      out.write("            }\n");
      out.write("        });\n");
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

  private boolean _jspx_meth_commons_005fpopupHeader_005f0(javax.servlet.jsp.PageContext _jspx_page_context)
          throws java.lang.Throwable {
    javax.servlet.jsp.PageContext pageContext = _jspx_page_context;
    javax.servlet.jsp.JspWriter out = _jspx_page_context.getOut();
    //  commons:popupHeader
    org.apache.jsp.tag.web.commons.popupHeader_tag _jspx_th_commons_005fpopupHeader_005f0 = new org.apache.jsp.tag.web.commons.popupHeader_tag();
    _jsp_getInstanceManager().newInstance(_jspx_th_commons_005fpopupHeader_005f0);
    try {
      _jspx_th_commons_005fpopupHeader_005f0.setJspContext(_jspx_page_context);
      // /WEB-INF/jsp/console/apps/note.jsp(9,0) name = bodyCssClass type = java.lang.String reqTime = true required = false fragment = false deferredValue = false expectedTypeName = java.lang.String deferredMethod = false methodSignature = null
      _jspx_th_commons_005fpopupHeader_005f0.setBodyCssClass(" builder-popup no-header");
      // /WEB-INF/jsp/console/apps/note.jsp(9,0) name = builderTheme type = java.lang.String reqTime = true required = false fragment = false deferredValue = false expectedTypeName = java.lang.String deferredMethod = false methodSignature = null
      _jspx_th_commons_005fpopupHeader_005f0.setBuilderTheme((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${theme}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
      _jspx_th_commons_005fpopupHeader_005f0.doTag();
    } finally {
      _jsp_getInstanceManager().destroyInstance(_jspx_th_commons_005fpopupHeader_005f0);
    }
    return false;
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
      // /WEB-INF/jsp/console/apps/note.jsp(11,0) name = test type = boolean reqTime = true required = true fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
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
      // /WEB-INF/jsp/console/apps/note.jsp(12,111) name = key type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
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
      // /WEB-INF/jsp/console/apps/note.jsp(50,87) name = value type = null reqTime = true required = true fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
      _jspx_th_c_005fout_005f0.setValue((java.lang.Object) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${appDefinition.id}", java.lang.Object.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
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

  private boolean _jspx_meth_c_005fout_005f1(javax.servlet.jsp.PageContext _jspx_page_context)
          throws java.lang.Throwable {
    javax.servlet.jsp.PageContext pageContext = _jspx_page_context;
    javax.servlet.jsp.JspWriter out = _jspx_page_context.getOut();
    //  c:out
    org.apache.taglibs.standard.tag.rt.core.OutTag _jspx_th_c_005fout_005f1 = (org.apache.taglibs.standard.tag.rt.core.OutTag) _005fjspx_005ftagPool_005fc_005fout_0026_005fvalue_005fescapeXml_005fnobody.get(org.apache.taglibs.standard.tag.rt.core.OutTag.class);
    boolean _jspx_th_c_005fout_005f1_reused = false;
    try {
      _jspx_th_c_005fout_005f1.setPageContext(_jspx_page_context);
      _jspx_th_c_005fout_005f1.setParent(null);
      // /WEB-INF/jsp/console/apps/note.jsp(51,79) name = value type = null reqTime = true required = true fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
      _jspx_th_c_005fout_005f1.setValue((java.lang.Object) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${appDefinition.description}", java.lang.Object.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
      // /WEB-INF/jsp/console/apps/note.jsp(51,79) name = escapeXml type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
      _jspx_th_c_005fout_005f1.setEscapeXml(true);
      int _jspx_eval_c_005fout_005f1 = _jspx_th_c_005fout_005f1.doStartTag();
      if (_jspx_th_c_005fout_005f1.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
        return true;
      }
      _005fjspx_005ftagPool_005fc_005fout_0026_005fvalue_005fescapeXml_005fnobody.reuse(_jspx_th_c_005fout_005f1);
      _jspx_th_c_005fout_005f1_reused = true;
    } finally {
      org.apache.jasper.runtime.JspRuntimeLibrary.releaseTag(_jspx_th_c_005fout_005f1, _jsp_getInstanceManager(), _jspx_th_c_005fout_005f1_reused);
    }
    return false;
  }

  private boolean _jspx_meth_ui_005fmsgEscHTML_005f0(javax.servlet.jsp.PageContext _jspx_page_context)
          throws java.lang.Throwable {
    javax.servlet.jsp.PageContext pageContext = _jspx_page_context;
    javax.servlet.jsp.JspWriter out = _jspx_page_context.getOut();
    //  ui:msgEscHTML
    org.apache.jsp.tag.web.ui.msgEscHTML_tag _jspx_th_ui_005fmsgEscHTML_005f0 = new org.apache.jsp.tag.web.ui.msgEscHTML_tag();
    _jsp_getInstanceManager().newInstance(_jspx_th_ui_005fmsgEscHTML_005f0);
    try {
      _jspx_th_ui_005fmsgEscHTML_005f0.setJspContext(_jspx_page_context);
      // /WEB-INF/jsp/console/apps/note.jsp(54,68) name = key type = java.lang.String reqTime = true required = true fragment = false deferredValue = false expectedTypeName = java.lang.String deferredMethod = false methodSignature = null
      _jspx_th_ui_005fmsgEscHTML_005f0.setKey("general.method.label.submit");
      _jspx_th_ui_005fmsgEscHTML_005f0.doTag();
    } finally {
      _jsp_getInstanceManager().destroyInstance(_jspx_th_ui_005fmsgEscHTML_005f0);
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
      // /WEB-INF/jsp/console/apps/note.jsp(79,58) name = key type = java.lang.String reqTime = true required = true fragment = false deferredValue = false expectedTypeName = java.lang.String deferredMethod = false methodSignature = null
      _jspx_th_ui_005fmsgEscJS_005f0.setKey("adv.tool.updated");
      _jspx_th_ui_005fmsgEscJS_005f0.doTag();
    } finally {
      _jsp_getInstanceManager().destroyInstance(_jspx_th_ui_005fmsgEscJS_005f0);
    }
    return false;
  }

  private boolean _jspx_meth_ui_005fmsgEscJS_005f1(javax.servlet.jsp.PageContext _jspx_page_context)
          throws java.lang.Throwable {
    javax.servlet.jsp.PageContext pageContext = _jspx_page_context;
    javax.servlet.jsp.JspWriter out = _jspx_page_context.getOut();
    //  ui:msgEscJS
    org.apache.jsp.tag.web.ui.msgEscJS_tag _jspx_th_ui_005fmsgEscJS_005f1 = new org.apache.jsp.tag.web.ui.msgEscJS_tag();
    _jsp_getInstanceManager().newInstance(_jspx_th_ui_005fmsgEscJS_005f1);
    try {
      _jspx_th_ui_005fmsgEscJS_005f1.setJspContext(_jspx_page_context);
      // /WEB-INF/jsp/console/apps/note.jsp(84,27) name = key type = java.lang.String reqTime = true required = true fragment = false deferredValue = false expectedTypeName = java.lang.String deferredMethod = false methodSignature = null
      _jspx_th_ui_005fmsgEscJS_005f1.setKey("adv.tool.updated");
      _jspx_th_ui_005fmsgEscJS_005f1.doTag();
    } finally {
      _jsp_getInstanceManager().destroyInstance(_jspx_th_ui_005fmsgEscJS_005f1);
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
