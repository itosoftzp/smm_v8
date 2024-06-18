<%@ include file="/WEB-INF/jsp/includes/taglibs.jsp" %>
<%@ page import="org.joget.workflow.util.WorkflowUtil"%>

<%
    String theme = WorkflowUtil.getSystemSetupValue("systemTheme");
    pageContext.setAttribute("theme", theme);
%>

<c:if test="${not empty theme and theme ne 'classic'}">
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/builderTheme.css?build=<fmt:message key="build.number"/>" />
</c:if>
    
<commons:popupHeader  bodyCssClass=" builder-popup" builderTheme="${theme}"/>

    <div id="main-body-header">
        <fmt:message key="console.datalist.create.label.title"/>
    </div>

    <div id="main-body-content">
        <c:set var="builderMode" value="${param.builderMode == 'true'}"/>
        <form:form id="createDatalist" action="${pageContext.request.contextPath}/web/console/app/${appId}/${appVersion}/datalist/submit/create?builderMode=${builderMode}" method="POST" modelAttribute="datalistDefinition" cssClass="form blockui">
            <form:errors path="*" cssClass="form-errors"/>
            <c:if test="${!empty errors}">
                <span class="form-errors" style="display:block">
                    <c:forEach items="${errors}" var="error">
                        <fmt:message key="${error}"/>
                    </c:forEach>
                </span>
            </c:if>
            <fieldset>
                <legend><fmt:message key="console.datalist.common.label.details"/></legend>
                <div class="form-row">
                    <label for="field1"><fmt:message key="console.datalist.common.label.id"/> <span class="mandatory">*</span></label>
                    <span class="form-input"><form:input path="id" cssErrorClass="form-input-error" /></span>
                </div>
                <div class="form-row">
                    <label for="field1"><fmt:message key="console.datalist.common.label.name"/> <span class="mandatory">*</span></label>
                    <span class="form-input"><form:input path="name" cssErrorClass="form-input-error" /></span>
                </div>
                <div class="form-row">
                    <label for="field1"><fmt:message key="console.datalist.common.label.description"/></label>
                    <span class="form-input"><form:textarea path="description" cssErrorClass="form-input-error" cols="40" rows="10" /></span>
                </div>
                <div class="form-row">
                    <a href="#" id="showAdvancedInfo" onclick="showAdvancedInfo();return false"><fmt:message key="console.app.import.label.showAdvancedOptions"/></a>
                    <a href="#" style="display: none" id="hideAdvancedInfo" onclick="hideAdvancedInfo();return false"><fmt:message key="console.app.import.label.hideAdvancedOptions"/></a>
                </div>
                <div id="advancedView" style="display:none">
                    <h5><fmt:message key="console.datalist.create.copy.header"/></h5>
                    <div class="form-row">
                        <label for="copyAppId"><fmt:message key="console.datalist.create.copy.appId"/></label>
                        <span class="form-input">    
                            <select id="copyAppId" name="copyAppId">
                                <option></option>
                                <c:forEach items="${appList}" var="app">
                                    <option value="${app.id}"><c:out value="${app.name}"/></option>
                                </c:forEach>
                            </select>
                        </span>
                    </div>    
                    <div class="form-row">
                        <label for="copyListId"><fmt:message key="console.datalist.create.copy.datalistId"/></label>
                        <span class="form-input"> 
                            <select id="copyListId" name="copyListId"></select>
                        </span>
                    </div>    
                </div>
            </fieldset>
            <div class="form-buttons">
                <input class="form-button" type="button" value="<ui:msgEscHTML key="general.method.label.save"/>"  onclick="validateField()"/>
                <input class="form-button" type="button" value="<ui:msgEscHTML key="general.method.label.cancel"/>" onclick="closeDialog()"/>
            </div>
        </form:form>
    </div>

    <script type="text/javascript">
        $(document).ready(function(){
            $("#copyAppId").val("${appId}");
            $("#copyAppId").change(function(){
                var populate = {
                    success : function(resp) {
                        $("#copyListId option").remove();
                        
                        var options = $.parseJSON(resp);
                        $.each(options, function(i, option){
                            $("#copyListId").append('<option value="'+option.value+'">'+UI.escapeHTML(option.label)+'</option>');
                        });
                        $("#copyListId").trigger("change").trigger("chosen:updated");
                    }
                };
                if ($("#copyAppId").val()==='${appId}') {
                    version ='/${appVersion}';
                } else {
                    version='';
                }
                ConnectionManager.get('<c:out value="${pageContext.request.contextPath}"/>/web/json/console/app/'+$(this).val()+version+'/datalist/options', populate);
            });
            $("#copyAppId").trigger("change");
        });    
        
        function showAdvancedInfo(){
            $('#advancedView').slideToggle('slow');
            $('#showAdvancedInfo').hide();
            $('#hideAdvancedInfo').show();
        }

        function hideAdvancedInfo(){
            $('#advancedView').slideToggle('slow');
            $('#showAdvancedInfo').show();
            $('#hideAdvancedInfo').hide();
        }
         
        function validateField(){
            var idMatch = /^[0-9a-zA-Z_]+$/.test($("#id").val());
            if(!idMatch){
                var alertString = '';
                if(!idMatch){
                    alertString = '<ui:msgEscJS key="console.datalist.error.label.idInvalid"/>';
                    $("#id").focus();
                }
                alert(alertString);
            }else{
                $("#createDatalist").submit();
            }
        }

        function closeDialog() {
            if (parent && parent.JPopup) {
                parent.JPopup.hide("navCreateNewDialog");
            }
            return false;
        }
    </script>
<commons:popupFooter />