/*
 * Generated by the Jasper component of Apache Tomcat
 * Version: Apache Tomcat/9.0.86
 * Generated at: 2024-06-06 09:05:22 UTC
 * Note: The last modified time of this file was set to
 *       the last modified time of the source file after
 *       generation to assist with modification tracking.
 */
package org.apache.jsp.WEB_002dINF.jsp.setup;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import org.joget.apps.app.service.AppUtil;
import org.joget.commons.util.*;

public final class setup_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent,
                 org.apache.jasper.runtime.JspSourceImports {

  private static final javax.servlet.jsp.JspFactory _jspxFactory =
          javax.servlet.jsp.JspFactory.getDefaultFactory();

  private static java.util.Map<java.lang.String,java.lang.Long> _jspx_dependants;

  static {
    _jspx_dependants = new java.util.HashMap<java.lang.String,java.lang.Long>(10);
    _jspx_dependants.put("/WEB-INF/tags/commons/implicit.tld", Long.valueOf(1715136700000L));
    _jspx_dependants.put("jar:file:/opt/joget-enterprise-linux-8.1.1/apache-tomcat-9.0.86/webapps/jw/WEB-INF/lib/jstl-1.2.jar!/META-INF/c.tld", Long.valueOf(1153385082000L));
    _jspx_dependants.put("jar:file:/opt/joget-enterprise-linux-8.1.1/apache-tomcat-9.0.86/webapps/jw/WEB-INF/lib/jstl-1.2.jar!/META-INF/fmt.tld", Long.valueOf(1153385082000L));
    _jspx_dependants.put("/WEB-INF/tags/ui/implicit.tld", Long.valueOf(1715136700000L));
    _jspx_dependants.put("jar:file:/opt/joget-enterprise-linux-8.1.1/apache-tomcat-9.0.86/webapps/jw/WEB-INF/lib/spring-webmvc-5.3.33.jar!/META-INF/spring.tld", Long.valueOf(1710407190000L));
    _jspx_dependants.put("/WEB-INF/lib/jstl-1.2.jar", Long.valueOf(1635287458000L));
    _jspx_dependants.put("jar:file:/opt/joget-enterprise-linux-8.1.1/apache-tomcat-9.0.86/webapps/jw/WEB-INF/lib/jstl-1.2.jar!/META-INF/fn.tld", Long.valueOf(1153385082000L));
    _jspx_dependants.put("/WEB-INF/jsp/includes/taglibs.jsp", Long.valueOf(1715136700000L));
    _jspx_dependants.put("/WEB-INF/lib/spring-webmvc-5.3.33.jar", Long.valueOf(1713335440000L));
    _jspx_dependants.put("jar:file:/opt/joget-enterprise-linux-8.1.1/apache-tomcat-9.0.86/webapps/jw/WEB-INF/lib/spring-webmvc-5.3.33.jar!/META-INF/spring-form.tld", Long.valueOf(1710407190000L));
  }

  private static final java.util.Set<java.lang.String> _jspx_imports_packages;

  private static final java.util.Set<java.lang.String> _jspx_imports_classes;

  static {
    _jspx_imports_packages = new java.util.LinkedHashSet<>(4);
    _jspx_imports_packages.add("org.joget.commons.util");
    _jspx_imports_packages.add("javax.servlet");
    _jspx_imports_packages.add("javax.servlet.http");
    _jspx_imports_packages.add("javax.servlet.jsp");
    _jspx_imports_classes = new java.util.LinkedHashSet<>(1);
    _jspx_imports_classes.add("org.joget.apps.app.service.AppUtil");
  }

  private org.apache.jasper.runtime.TagHandlerPool _005fjspx_005ftagPool_005fc_005fset_0026_005fvar_005fvalue_005fnobody;

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
    _005fjspx_005ftagPool_005fc_005fset_0026_005fvar_005fvalue_005fnobody = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
  }

  public void _jspDestroy() {
    _005fjspx_005ftagPool_005fc_005fset_0026_005fvar_005fvalue_005fnobody.release();
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

      out.write('\n');
      out.write('\n');
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

    boolean test = true;
    if (!test) {
        try {
            SetupManager setupManager = (SetupManager) AppUtil.getApplicationContext().getBean("setupManager");
            response.sendRedirect(request.getContextPath());
            return;
        } catch (Exception e) {
            // ignore
        }
    }
    if (HostManager.isVirtualHostEnabled()) {
        response.sendError(response.SC_FORBIDDEN);
        return;
    }

      out.write("    \n");
      out.write("\n");
      //  c:set
      org.apache.taglibs.standard.tag.rt.core.SetTag _jspx_th_c_005fset_005f0 = (org.apache.taglibs.standard.tag.rt.core.SetTag) _005fjspx_005ftagPool_005fc_005fset_0026_005fvar_005fvalue_005fnobody.get(org.apache.taglibs.standard.tag.rt.core.SetTag.class);
      boolean _jspx_th_c_005fset_005f0_reused = false;
      try {
        _jspx_th_c_005fset_005f0.setPageContext(_jspx_page_context);
        _jspx_th_c_005fset_005f0.setParent(null);
        // /WEB-INF/jsp/setup/setup.jsp(21,0) name = var type = java.lang.String reqTime = false required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
        _jspx_th_c_005fset_005f0.setVar("lang");
        // /WEB-INF/jsp/setup/setup.jsp(21,0) name = value type = javax.el.ValueExpression reqTime = true required = false fragment = false deferredValue = true expectedTypeName = java.lang.Object deferredMethod = false methodSignature = null
        _jspx_th_c_005fset_005f0.setValue( AppUtil.getAppLocale() );
        int _jspx_eval_c_005fset_005f0 = _jspx_th_c_005fset_005f0.doStartTag();
        if (_jspx_th_c_005fset_005f0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
          return;
        }
        _005fjspx_005ftagPool_005fc_005fset_0026_005fvar_005fvalue_005fnobody.reuse(_jspx_th_c_005fset_005f0);
        _jspx_th_c_005fset_005f0_reused = true;
      } finally {
        org.apache.jasper.runtime.JspRuntimeLibrary.releaseTag(_jspx_th_c_005fset_005f0, _jsp_getInstanceManager(), _jspx_th_c_005fset_005f0_reused);
      }
      out.write("\n");
      out.write("\n");
      out.write("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01//EN\" \"http://www.w3.org/TR/html4/strict.dtd\">\n");
      out.write("<html lang=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${lang}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
      out.write("\">\n");
      out.write("    <head>\n");
      out.write("        <title>");
      out.print( ResourceBundleUtil.getMessage("console.header.top.title"));
      out.write("</title>\n");
      out.write("        <link rel=\"shortcut icon\" href=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${pageContext.request.contextPath}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
      out.write("/images/favicon.ico\"/>\n");
      out.write("        <link rel=\"stylesheet\" type=\"text/css\" href=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${pageContext.request.contextPath}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
      out.write("/js/fontawesome5/css/all.min.css\">\n");
      out.write("        <link rel=\"stylesheet\" type=\"text/css\" href=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${pageContext.request.contextPath}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
      out.write("/css/v7.css\">\n");
      out.write("        <link rel=\"stylesheet\" type=\"text/css\" href=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${pageContext.request.contextPath}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
      out.write("/css/console_custom.css\">\n");
      out.write("        <style>\n");
      out.write("            body {\n");
      out.write("                padding-top: 41px;\n");
      out.write("            }\n");
      out.write("            #main {\n");
      out.write("                margin-left: 0px;                \n");
      out.write("            }\n");
      out.write("            #main-header {\n");
      out.write("                display: block !important;\n");
      out.write("            }\n");
      out.write("            #setupNotice {\n");
      out.write("                border-bottom: solid 1px #555;\n");
      out.write("                padding: 10px 0px;\n");
      out.write("                margin-bottom: 10px;\n");
      out.write("            }\n");
      out.write("            #jdbcSetup {\n");
      out.write("                display: none;\n");
      out.write("            }\n");
      out.write("            #setupProgress {\n");
      out.write("                margin: 20px 0px;\n");
      out.write("            }\n");
      out.write("            #setupResult {\n");
      out.write("                padding: 10px 15px;\n");
      out.write("                margin-bottom: 20px;\n");
      out.write("                border-radius: 5px;\n");
      out.write("                border: 1px solid #c3e6cb;\n");
      out.write("            }\n");
      out.write("            #setupResult.setupSuccess {\n");
      out.write("                color: #155724;\n");
      out.write("                background-color: #d4edda;\n");
      out.write("                border-color: #c3e6cb;\n");
      out.write("            }\n");
      out.write("            #setupResult.setupError {\n");
      out.write("                color: #721c24;\n");
      out.write("                background-color: #f8d7da;\n");
      out.write("                border-color: #f5c6cb;\n");
      out.write("            }\n");
      out.write("            #setupResult ul {\n");
      out.write("                margin: 10px 15px;\n");
      out.write("            }\n");
      out.write("            #setupDetailsLink {\n");
      out.write("                display: block;\n");
      out.write("                text-decoration: underline;\n");
      out.write("                cursor: pointer;\n");
      out.write("                margin: 5px 0px;\n");
      out.write("            }\n");
      out.write("            #setupErrorDetails {\n");
      out.write("                margin: 5px 0px;\n");
      out.write("            }\n");
      out.write("            .form-row span.form-input.checkbox{\n");
      out.write("                min-height: 30px;\n");
      out.write("                display: block;\n");
      out.write("                margin-bottom: 15px;\n");
      out.write("                line-height: 16px;\n");
      out.write("            }\n");
      out.write("        </style>\n");
      out.write("    </head>\n");
      out.write("    <body>\n");
      out.write("        <div id=\"main-header\">\n");
      out.write("            <a id=\"home-link\" href=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${pageContext.request.contextPath}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
      out.write("/\">\n");
      out.write("                <span id=\"logo\"></span>\n");
      out.write("                <span id=\"logo-title\">");
      out.print( ResourceBundleUtil.getMessage("console.header.top.title"));
      out.write(' ');
      out.print( ResourceBundleUtil.getMessage("setup.datasource.label.title"));
      out.write("</span>\n");
      out.write("            </a>\n");
      out.write("        </div>\n");
      out.write("        <div id=\"container\">\n");
      out.write("            <div id=\"content-container\">        \n");
      out.write("                <div id=\"main\">\n");
      out.write("                    <div id=\"main-body\">\n");
      out.write("                        <form id=\"setupForm\" method=\"post\" action=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${pageContext.request.contextPath}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
      out.write("/web/console/setting/datasource/submit\">\n");
      out.write("                            <h3>");
      out.print( ResourceBundleUtil.getMessage("setup.datasource.label.dbSetup"));
      out.write("</h3>\n");
      out.write("                            <div id=\"setupNotice\">\n");
      out.write("                                ");
      out.print( ResourceBundleUtil.getMessage("setup.datasource.label.notice"));
      out.write("\n");
      out.write("                            </div>\n");
      out.write("                            <div class=\"form-row\">\n");
      out.write("                                <label for=\"dbType\">");
      out.print( ResourceBundleUtil.getMessage("setup.datasource.label.dbType"));
      out.write("</label>\n");
      out.write("                                <span class=\"form-input\">\n");
      out.write("                                    <select id=\"dbType\" name=\"dbType\">\n");
      out.write("                                        <option value=\"mysql\">MySQL</option>\n");
      out.write("                                        <option value=\"oracle\">Oracle</option>\n");
      out.write("                                        <option value=\"sqlserver\">MS SQL Server</option>\n");
      out.write("                                        <option value=\"postgresql\">PostgreSQL</option>\n");
      out.write("                                        <option value=\"custom\">");
      out.print( ResourceBundleUtil.getMessage("setup.datasource.label.custom"));
      out.write("</option>\n");
      out.write("                                    </select>\n");
      out.write("                                </span>\n");
      out.write("                            </div>\n");
      out.write("                            <div id=\"dbSetup\" class=\"main-row-content\">\n");
      out.write("                                <div class=\"form-row\">\n");
      out.write("                                    <label for=\"dbHost\">");
      out.print( ResourceBundleUtil.getMessage("setup.datasource.label.dbHost"));
      out.write("</label>\n");
      out.write("                                    <span class=\"form-input\">\n");
      out.write("                                        <input type=\"text\" size=\"40\" id=\"dbHost\" name=\"dbHost\" value=\"localhost\"/>\n");
      out.write("                                    </span>\n");
      out.write("                                </div>\n");
      out.write("                                <div class=\"form-row\">\n");
      out.write("                                    <label for=\"dbPort\">");
      out.print( ResourceBundleUtil.getMessage("setup.datasource.label.dbPort"));
      out.write("</label>\n");
      out.write("                                    <span class=\"form-input\">\n");
      out.write("                                        <input type=\"text\" size=\"40\" id=\"dbPort\" name=\"dbPort\" value=\"3306\"/>\n");
      out.write("                                    </span>\n");
      out.write("                                </div>\n");
      out.write("                                <div class=\"form-row\">\n");
      out.write("                                    <label for=\"dbName\">");
      out.print( ResourceBundleUtil.getMessage("setup.datasource.label.dbName"));
      out.write("</label>\n");
      out.write("                                    <span class=\"form-input\">\n");
      out.write("                                        <input type=\"text\" size=\"40\" id=\"dbName\" name=\"dbName\" value=\"jwdb\"/>\n");
      out.write("                                    </span>\n");
      out.write("                                </div>\n");
      out.write("                                <div class=\"form-row\">\n");
      out.write("                                    <label for=\"dbUser\">");
      out.print( ResourceBundleUtil.getMessage("setup.datasource.label.dbUser"));
      out.write("</label>\n");
      out.write("                                    <span class=\"form-input\">\n");
      out.write("                                        <input type=\"text\" size=\"40\" id=\"dbUser\" name=\"dbUser\" value=\"root\"/>\n");
      out.write("                                    </span>\n");
      out.write("                                </div>\n");
      out.write("                                <div class=\"form-row\">\n");
      out.write("                                    <label for=\"dbPassword\">");
      out.print( ResourceBundleUtil.getMessage("setup.datasource.label.dbPassword"));
      out.write("</label>\n");
      out.write("                                    <span class=\"form-input\">\n");
      out.write("                                        <input type=\"password\" size=\"40\" id=\"dbPassword\" name=\"dbPassword\" value=\"\" autocomplete=\"off\"/>\n");
      out.write("                                    </span>\n");
      out.write("                                </div>\n");
      out.write("                            </div>\n");
      out.write("                            <div id=\"jdbcSetup\" class=\"main-row-content\">\n");
      out.write("                                <div class=\"form-row\">\n");
      out.write("                                    <label for=\"jdbcDriver\">");
      out.print( ResourceBundleUtil.getMessage("setup.datasource.label.jdbcDriver"));
      out.write("</label>\n");
      out.write("                                    <span class=\"form-input\">\n");
      out.write("                                        <input type=\"text\" size=\"40\" id=\"jdbcDriver\" name=\"jdbcDriver\" value=\"com.mysql.jdbc.Driver\"/>\n");
      out.write("                                    </span>\n");
      out.write("                                </div>\n");
      out.write("                                <div class=\"form-row\">\n");
      out.write("                                    <label for=\"jdbcUrl\">");
      out.print( ResourceBundleUtil.getMessage("setup.datasource.label.jdbcUrl"));
      out.write("</label>\n");
      out.write("                                    <span class=\"form-input\">\n");
      out.write("                                        <input type=\"text\" size=\"40\" id=\"jdbcUrl\" name=\"jdbcUrl\" value=\"jdbc:mysql://localhost:3306/jwdb?characterEncoding=UTF-8&amp;useSSL=false&amp;allowPublicKeyRetrieval=true\"/>\n");
      out.write("                                        <input type=\"hidden\" size=\"40\" id=\"jdbcFullUrl\" name=\"jdbcFullUrl\" value=\"\"/>\n");
      out.write("                                    </span>\n");
      out.write("                                </div>\n");
      out.write("                                <div class=\"form-row\">\n");
      out.write("                                    <label for=\"jdbcUser\">");
      out.print( ResourceBundleUtil.getMessage("setup.datasource.label.jdbcUser"));
      out.write("</label>\n");
      out.write("                                    <span class=\"form-input\">\n");
      out.write("                                        <input type=\"text\" size=\"40\" id=\"jdbcUser\" name=\"jdbcUser\" value=\"root\"/>\n");
      out.write("                                    </span>\n");
      out.write("                                </div>\n");
      out.write("                                <div class=\"form-row\">\n");
      out.write("                                    <label for=\"jdbcPassword\">");
      out.print( ResourceBundleUtil.getMessage("setup.datasource.label.jdbcPassword"));
      out.write("</label>\n");
      out.write("                                    <span class=\"form-input\">\n");
      out.write("                                        <input type=\"password\" size=\"40\" id=\"jdbcPassword\" name=\"jdbcPassword\" value=\"\" autocomplete=\"off\"/>\n");
      out.write("                                    </span>\n");
      out.write("                                </div>\n");
      out.write("                            </div>\n");
      out.write("                            <div id=\"advancedSetup\" class=\"main-row-content\">\n");
      out.write("                                <div class=\"form-row\">\n");
      out.write("                                    <label for=\"sampleApps\">");
      out.print( ResourceBundleUtil.getMessage("setup.datasource.label.sampleApps"));
      out.write("</label>                                     \n");
      out.write("                                    <span class=\"form-input checkbox\">\n");
      out.write("                                        <input type=\"checkbox\" id=\"sampleApps\" name=\"sampleApps\" value=\"true\" checked />\n");
      out.write("                                    </span>\n");
      out.write("                                </div>\n");
      out.write("                                <div class=\"form-row\">\n");
      out.write("                                    <label for=\"sampleUsers\">");
      out.print( ResourceBundleUtil.getMessage("setup.datasource.label.sampleUsers"));
      out.write("</label>                                     \n");
      out.write("                                    <span class=\"form-input checkbox\">\n");
      out.write("                                        <input type=\"checkbox\" id=\"sampleUsers\" name=\"sampleUsers\" value=\"true\" checked />\n");
      out.write("                                    </span>\n");
      out.write("                                </div>\n");
      out.write("                            </div>                                        \n");
      out.write("                            <div class=\"main-row-content\" id=\"setupStatus\" style=\"display: none\">\n");
      out.write("                                <div id=\"setupProgress\"></div>\n");
      out.write("                            </div>\n");
      out.write("                            <div class=\"form-buttons\">\n");
      out.write("                                <input class=\"form-button\" id=\"setupButton\" type=\"button\" value=\"");
      out.print( ResourceBundleUtil.getMessage("setup.datasource.label.save"));
      out.write("\" />\n");
      out.write("                            </div>\n");
      out.write("                        </form>\n");
      out.write("                    </div>\n");
      out.write("                </div>\n");
      out.write("\n");
      out.write("            </div>\n");
      out.write("        </div>\n");
      out.write("        <script type=\"text/javascript\" src=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${pageContext.request.contextPath}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
      out.write("/js/jquery/jquery-3.5.1.min.js\"></script>\n");
      out.write("        <script type=\"text/javascript\" src=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${pageContext.request.contextPath}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
      out.write("/js/jquery/jquery-migrate-3.0.1.min.js\"></script>\n");
      out.write("        <script type=\"text/javascript\" src=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${pageContext.request.contextPath}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
      out.write("/js/json/util.js\"></script>\n");
      out.write("        <script type=\"text/javascript\">\n");
      out.write("            var Setup = {\n");
      out.write("                currentDbType: \"\",\n");
      out.write("                setupStatusCallback: {\n");
      out.write("                    success: function(data) {\n");
      out.write("                        $(\"#setupProgress\").empty();\n");
      out.write("                        var obj = JSON.parse(data);\n");
      out.write("                        var success = (obj.result === \"true\");\n");
      out.write("                        var label = success ? \"");
      out.print( ResourceBundleUtil.getMessage("setup.datasource.label.success"));
      out.write("\" : '");
      out.print( ResourceBundleUtil.getMessage("setup.datasource.label.errorWithDetails"));
      out.write("';\n");
      out.write("                        var labelClass = success ? \"setupSuccess\" : \"setupError\";\n");
      out.write("                        var setupResult = $(\"<div id='setupResult' class='\" + labelClass + \"'>\" + label + \"</div>\");\n");
      out.write("//                        $(\"#setupStatus\").append(setupResult);\n");
      out.write("                        $(\"#setupNotice\").after(setupResult);\n");
      out.write("                        if (!success) {\n");
      out.write("                            var setupDetails = \"<div id='setupErrorDetails' style='display:none'>\" + obj.message + \"</div>\";\n");
      out.write("                            var setupDetailsLink = $(\"<a id='setupDetailsLink'>");
      out.print( ResourceBundleUtil.getMessage("setup.datasource.label.details"));
      out.write("</a>\");\n");
      out.write("                            $(\"#setupResult\").append(setupDetailsLink);\n");
      out.write("                            $(\"#setupResult\").append(setupDetails);\n");
      out.write("                            $(\"#setupDetailsLink\").on(\"click\", function() {\n");
      out.write("                                $(\"#setupErrorDetails\").show();\n");
      out.write("                            });\n");
      out.write("                        }\n");
      out.write("                        $(\"#setupButton\").show();\n");
      out.write("                        $(\"#setupButton\").removeAttr(\"disabled\");\n");
      out.write("                        if (success) {\n");
      out.write("                            $(\"#setupButton\").val(\"");
      out.print( ResourceBundleUtil.getMessage("setup.datasource.label.done"));
      out.write("\");\n");
      out.write("                            $(\"#setupButton\").off(\"click\");\n");
      out.write("                            $(\"#setupButton\").on(\"click\", function() {\n");
      out.write("                                location.href = \"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${pageContext.request.contextPath}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
      out.write("\";\n");
      out.write("                            });\n");
      out.write("                        } else {\n");
      out.write("                            $(\"#setupForm input, #setupForm select\").removeAttr(\"disabled\");\n");
      out.write("                        }                            \n");
      out.write("                    },\n");
      out.write("                    error: function(data) {\n");
      out.write("                        $(\"#setupProgress\").empty();\n");
      out.write("                        var label = '");
      out.print( ResourceBundleUtil.getMessage("setup.datasource.label.error"));
      out.write(": ';\n");
      out.write("                        label += data.statusText;\n");
      out.write("                        var labelClass = \"setupError\";\n");
      out.write("                        var setupResult = $(\"<div id='setupResult' class='\" + labelClass + \"'>\" + label + \"</div>\");\n");
      out.write("//                        $(\"#setupStatus\").append(setupResult);\n");
      out.write("                        $(\"#setupNotice\").after(setupResult);\n");
      out.write("                        $(\"#setupButton\").show();\n");
      out.write("                        $(\"#setupForm input, #setupForm select\").removeAttr(\"disabled\");\n");
      out.write("                    }\n");
      out.write("                },    \n");
      out.write("                setupStatus: function() {\n");
      out.write("                    $(\"#setupResult\").remove();\n");
      out.write("                    $(\"#setupButton\").hide();\n");
      out.write("                    $(\"#setupForm input, #setupForm select\").attr(\"disabled\", \"disabled\")\n");
      out.write("                    $(\"#setupProgress\").append($(\"<b>");
      out.print( ResourceBundleUtil.getMessage("setup.datasource.label.inProgress"));
      out.write("</b> <img src='");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${pageContext.request.contextPath}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
      out.write("/images/v3/loading.gif'/>\"));\n");
      out.write("                    $(\"#setupStatus\").show();\n");
      out.write("                    var dbType = $(\"#dbType\").val();\n");
      out.write("                    var dbName = $(\"#dbName\").val();\n");
      out.write("                    var jdbcDriver = $(\"#jdbcDriver\").val();\n");
      out.write("                    var jdbcUrl = $(\"#jdbcUrl\").val();\n");
      out.write("                    var jdbcFullUrl = (dbType !== \"custom\") ? $(\"#jdbcFullUrl\").val(): \"\";\n");
      out.write("                    var jdbcUser = $(\"#jdbcUser\").val();\n");
      out.write("                    var jdbcPassword = $(\"#jdbcPassword\").val();\n");
      out.write("                    var sampleApps = $(\"#sampleApps:checked\").length > 0;\n");
      out.write("                    var sampleUsers = $(\"#sampleUsers:checked\").length > 0;\n");
      out.write("                    var setupParams = \"dbType=\" + encodeURIComponent(dbType) + \"&dbName=\" + encodeURIComponent(dbName) + \"&jdbcDriver=\" + encodeURIComponent(jdbcDriver) + \"&jdbcUrl=\" + encodeURIComponent(jdbcUrl) + \"&jdbcFullUrl=\" + encodeURIComponent(jdbcFullUrl) + \"&jdbcUser=\" + encodeURIComponent(jdbcUser) + \"&jdbcPassword=\" + encodeURIComponent(jdbcPassword);\n");
      out.write("                    if (sampleApps) {\n");
      out.write("                        setupParams += \"&sampleApps=true\";\n");
      out.write("                    }\n");
      out.write("                    if (sampleUsers) {\n");
      out.write("                        setupParams += \"&sampleUsers=true\";\n");
      out.write("                    }\n");
      out.write("                    var setupUrl = \"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${pageContext.request.contextPath}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
      out.write("/setup/init\";\n");
      out.write("                    ConnectionManager.post(setupUrl, Setup.setupStatusCallback, setupParams);\n");
      out.write("                },\n");
      out.write("                selectType: function() {\n");
      out.write("                    var dbType = $(\"#dbType\").val();\n");
      out.write("                    var dbName = $(\"#dbName\").val();\n");
      out.write("                    var dbHost = $(\"#dbHost\").val();\n");
      out.write("                    var dbPort = $(\"#dbPort\").val();\n");
      out.write("                    var dbUser = $(\"#dbUser\").val();\n");
      out.write("                    var dbPassword = $(\"#dbPassword\").val();\n");
      out.write("                    if (dbType === \"oracle\") {\n");
      out.write("                        $(\"#jdbcSetup\").hide();\n");
      out.write("                        $(\"#dbSetup\").show();\n");
      out.write("                        $(\"#jdbcDriver\").val(\"oracle.jdbc.driver.OracleDriver\");\n");
      out.write("                        if (Setup.currentDbType !== dbType) {\n");
      out.write("                            $(\"#dbPort\").val(\"1521\");\n");
      out.write("                            dbPort = 1521;\n");
      out.write("                        }\n");
      out.write("                        $(\"#jdbcUrl\").val(\"jdbc:oracle:thin:@\" + dbHost + \":\" + dbPort + \"/\" + dbName);\n");
      out.write("                        $(\"#jdbcFullUrl\").val(\"jdbc:oracle:thin:@\" + dbHost + \":\" + dbPort + \"/\" + dbName);\n");
      out.write("                    } else if (dbType === \"sqlserver\") {\n");
      out.write("                        $(\"#jdbcSetup\").hide();\n");
      out.write("                        $(\"#dbSetup\").show();\n");
      out.write("                        $(\"#jdbcDriver\").val(\"com.microsoft.sqlserver.jdbc.SQLServerDriver\");\n");
      out.write("                        if (Setup.currentDbType !== dbType) {\n");
      out.write("                            $(\"#dbPort\").val(\"1433\");\n");
      out.write("                            dbPort = 1433;\n");
      out.write("                        }\n");
      out.write("                        $(\"#jdbcUrl\").val(\"jdbc:sqlserver://\" + dbHost + \":\" + dbPort + \";SelectMethod=direct\");\n");
      out.write("                        $(\"#jdbcFullUrl\").val(\"jdbc:sqlserver://\" + dbHost + \":\" + dbPort + \";SelectMethod=direct;DatabaseName=\" + dbName);\n");
      out.write("                    } else if (dbType === \"postgresql\") {\n");
      out.write("                        $(\"#jdbcSetup\").hide();\n");
      out.write("                        $(\"#dbSetup\").show();\n");
      out.write("                        $(\"#jdbcDriver\").val(\"org.postgresql.Driver\");\n");
      out.write("                        if (Setup.currentDbType !== dbType) {\n");
      out.write("                            $(\"#dbPort\").val(\"5432\");\n");
      out.write("                            dbPort = 5432;\n");
      out.write("                        }\n");
      out.write("                        $(\"#jdbcUrl\").val(\"jdbc:postgresql://\" + dbHost + \":\" + dbPort + \"/\" + dbName);\n");
      out.write("                        $(\"#jdbcFullUrl\").val(\"jdbc:postgresql://\" + dbHost + \":\" + dbPort + \"/\" + dbName);\n");
      out.write("                    } else if (dbType === \"mysql\") {\n");
      out.write("                        $(\"#jdbcSetup\").hide();\n");
      out.write("                        $(\"#dbSetup\").show();\n");
      out.write("                        $(\"#jdbcDriver\").val(\"com.mysql.jdbc.Driver\");\n");
      out.write("                        if (Setup.currentDbType !== dbType) {\n");
      out.write("                            $(\"#dbPort\").val(\"3306\");\n");
      out.write("                            dbPort = 3306;\n");
      out.write("                        }\n");
      out.write("                        $(\"#jdbcUrl\").val(\"jdbc:mysql://\" + dbHost + \":\" + dbPort + \"/?characterEncoding=UTF-8&useSSL=false&allowPublicKeyRetrieval=true\");\n");
      out.write("                        $(\"#jdbcFullUrl\").val(\"jdbc:mysql://\" + dbHost + \":\" + dbPort + \"/\" + dbName + \"?characterEncoding=UTF-8&useSSL=false&allowPublicKeyRetrieval=true\");\n");
      out.write("                    } else {\n");
      out.write("                        $(\"#jdbcUrl\").val($(\"#jdbcFullUrl\").val());\n");
      out.write("                        $(\"#jdbcSetup\").show();\n");
      out.write("                        $(\"#dbSetup\").hide();\n");
      out.write("                    }\n");
      out.write("                    Setup.currentDbType = dbType;\n");
      out.write("                    $(\"#jdbcUser\").val(dbUser);\n");
      out.write("                    $(\"#jdbcPassword\").val(dbPassword);\n");
      out.write("                }\n");
      out.write("            }\n");
      out.write("            $(\"#dbType, #dbSetup input\").on(\"change\", Setup.selectType)\n");
      out.write("            $(\"#setupButton\").on(\"click\", Setup.setupStatus);\n");
      out.write("            $(function() {\n");
      out.write("                Setup.selectType();\n");
      out.write("            });\n");
      out.write("        </script>\n");
      out.write("    </body>\n");
      out.write("</html>\n");
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
}
