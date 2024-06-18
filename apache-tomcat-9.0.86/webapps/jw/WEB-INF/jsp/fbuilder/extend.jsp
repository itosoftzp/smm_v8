<%@ include file="/WEB-INF/jsp/includes/taglibs.jsp" %>
<script type="text/javascript">
    <ui:popupdialog var="appGeneratorDialog" src="${pageContext.request.contextPath}/web/console/app/${appId}/${appDefinition.version}/generator/${formId}"/>
        
    $(document).ready(function(){
        $("#save-btn").parent().after('<div class="btn-group mr-1 float-right" style="margin-top:-16px;" role="group"><button class="btn btn-secondary btn-icon" id="generator-btn" title="<fmt:message key="formBuilder.generateApp"/>" title-default="<fmt:message key="formBuilder.generateApp"/>" title-empty="<fmt:message key="formBuilder.generateApp.emptyForm"/>" title-unsave="<fmt:message key="formBuilder.generateApp.save"/>"><i class="las la-bolt"></i> <span><fmt:message key="formBuilder.generateApp"/></span></button></div>');
        
        $("#generator-btn").click(function(){
            appGeneratorDialog.src = "${pageContext.request.contextPath}/web/console/app" + CustomBuilder.appPath + "/generator/" + CustomBuilder.id;
            if (FormBuilder.isEmpty() || !FormBuilder.isSaved()) {
                return
            } else {
                appGeneratorDialog.init();
            }
        });
    });
        
</script>