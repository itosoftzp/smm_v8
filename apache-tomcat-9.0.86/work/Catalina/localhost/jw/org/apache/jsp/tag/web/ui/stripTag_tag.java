/*
 * Generated by the Jasper component of Apache Tomcat
 * Version: Apache Tomcat/9.0.86
 * Generated at: 2024-06-07 04:47:50 UTC
 * Note: The last modified time of this file was set to
 *       the last modified time of the source file after
 *       generation to assist with modification tracking.
 */
package org.apache.jsp.tag.web.ui;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import org.joget.commons.util.StringUtil;
import org.joget.apps.app.service.AppUtil;

public final class stripTag_tag
    extends javax.servlet.jsp.tagext.SimpleTagSupport
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
    _jspx_imports_packages = new java.util.LinkedHashSet<>(3);
    _jspx_imports_packages.add("javax.servlet");
    _jspx_imports_packages.add("javax.servlet.http");
    _jspx_imports_packages.add("javax.servlet.jsp");
    _jspx_imports_classes = new java.util.LinkedHashSet<>(2);
    _jspx_imports_classes.add("org.joget.commons.util.StringUtil");
    _jspx_imports_classes.add("org.joget.apps.app.service.AppUtil");
  }

  private javax.servlet.jsp.JspContext jspContext;
  private java.io.Writer _jspx_sout;
  private volatile javax.el.ExpressionFactory _el_expressionfactory;
  private volatile org.apache.tomcat.InstanceManager _jsp_instancemanager;

  public void setJspContext(javax.servlet.jsp.JspContext ctx) {
    super.setJspContext(ctx);
    java.util.ArrayList _jspx_nested = null;
    java.util.ArrayList _jspx_at_begin = null;
    java.util.ArrayList _jspx_at_end = null;
    this.jspContext = new org.apache.jasper.runtime.JspContextWrapper(this, ctx, _jspx_nested, _jspx_at_begin, _jspx_at_end, null);
  }

  public javax.servlet.jsp.JspContext getJspContext() {
    return this.jspContext;
  }
  private java.lang.String html;
  private java.lang.String relaxed;
  private java.lang.String processHashVariable;
  private org.joget.apps.app.model.AppDefinition appDef;

  public java.lang.String getHtml() {
    return this.html;
  }

  public void setHtml(java.lang.String html) {
    this.html = html;
    jspContext.setAttribute("html", html);
  }

  public java.lang.String getRelaxed() {
    return this.relaxed;
  }

  public void setRelaxed(java.lang.String relaxed) {
    this.relaxed = relaxed;
    jspContext.setAttribute("relaxed", relaxed);
  }

  public java.lang.String getProcessHashVariable() {
    return this.processHashVariable;
  }

  public void setProcessHashVariable(java.lang.String processHashVariable) {
    this.processHashVariable = processHashVariable;
    jspContext.setAttribute("processHashVariable", processHashVariable);
  }

  public org.joget.apps.app.model.AppDefinition getAppDef() {
    return this.appDef;
  }

  public void setAppDef(org.joget.apps.app.model.AppDefinition appDef) {
    this.appDef = appDef;
    jspContext.setAttribute("appDef", appDef);
  }

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
    return _el_expressionfactory;
  }

  public org.apache.tomcat.InstanceManager _jsp_getInstanceManager() {
    return _jsp_instancemanager;
  }

  private void _jspInit(javax.servlet.ServletConfig config) {
    _el_expressionfactory = _jspxFactory.getJspApplicationContext(config.getServletContext()).getExpressionFactory();
    _jsp_instancemanager = org.apache.jasper.runtime.InstanceManagerFactory.getInstanceManager(config);
  }

  public void _jspDestroy() {
  }

  public void doTag() throws javax.servlet.jsp.JspException, java.io.IOException {
    javax.servlet.jsp.PageContext _jspx_page_context = (javax.servlet.jsp.PageContext)jspContext;
    javax.servlet.http.HttpServletRequest request = (javax.servlet.http.HttpServletRequest) _jspx_page_context.getRequest();
    javax.servlet.http.HttpServletResponse response = (javax.servlet.http.HttpServletResponse) _jspx_page_context.getResponse();
    javax.servlet.http.HttpSession session = _jspx_page_context.getSession();
    javax.servlet.ServletContext application = _jspx_page_context.getServletContext();
    javax.servlet.ServletConfig config = _jspx_page_context.getServletConfig();
    javax.servlet.jsp.JspWriter out = jspContext.getOut();
    _jspInit(config);
    jspContext.getELContext().putContext(javax.servlet.jsp.JspContext.class,jspContext);
    if( getHtml() != null ) 
      _jspx_page_context.setAttribute("html", getHtml());
    if( getRelaxed() != null ) 
      _jspx_page_context.setAttribute("relaxed", getRelaxed());
    if( getProcessHashVariable() != null ) 
      _jspx_page_context.setAttribute("processHashVariable", getProcessHashVariable());
    if( getAppDef() != null ) 
      _jspx_page_context.setAttribute("appDef", getAppDef());

    try {
 response.setHeader("Cache-Control","no-cache, no-store"); 
 response.setContentType("text/html;charset=UTF-8"); 
      out.print( (!"true".equals(relaxed)) ? StringUtil.stripAllHtmlTag((("true".equals(processHashVariable)) ? AppUtil.processHashVariable(html, null, null, null, appDef) : html)) : StringUtil.stripHtmlRelaxed((("true".equals(processHashVariable)) ? AppUtil.processHashVariable(html, null, null, null, appDef) : html)) );
    } catch( java.lang.Throwable t ) {
      if( t instanceof javax.servlet.jsp.SkipPageException )
          throw (javax.servlet.jsp.SkipPageException) t;
      if( t instanceof java.io.IOException )
          throw (java.io.IOException) t;
      if( t instanceof java.lang.IllegalStateException )
          throw (java.lang.IllegalStateException) t;
      if( t instanceof javax.servlet.jsp.JspException )
          throw (javax.servlet.jsp.JspException) t;
      throw new javax.servlet.jsp.JspException(t);
    } finally {
      jspContext.getELContext().putContext(javax.servlet.jsp.JspContext.class,super.getJspContext());
      ((org.apache.jasper.runtime.JspContextWrapper) jspContext).syncEndTagFile();
    }
  }
}
