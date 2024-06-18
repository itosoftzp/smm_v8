<script src="${request.contextPath}/js/JSONError.js"></script>
<script src="${request.contextPath}/js/JSON.js"></script>
<script src="${request.contextPath}/plugin/org.joget.plugin.enterprise.ProcessStatusMenu/js/processStatusList.js"></script>
<link href="${request.contextPath}/plugin/org.joget.plugin.enterprise.ProcessStatusMenu/css/processStatus_list.css" rel="stylesheet" type="text/css" />

<div class="process-status-body-content">
    ${element.properties.customHeader!}

    <#if data??>
        <script>
            $(document).ready(function(){
                var ps = new ProcessStatusList(${data!}, $("#process-status-canvas"), {
                    <#list pmessages! as pmessage>
                        "${pmessage.messageKey}" : "${pmessage.message?js_string}",
                    </#list>
                    "label.started" : "@@userview.processStatus.label.started@@",
                    "label.end" : "@@userview.processStatus.label.end@@",
                    "label.by" : "@@userview.processStatus.label.by@@",
                    "label.to" : "@@userview.processStatus.label.to@@",
                    "label.on" : "@@userview.processStatus.label.on@@",
                    "label.eta" : "@@userview.processStatus.label.eta@@",
                    "label.acceptedUser" : "@@console.app.activity.common.label.acceptedUser@@",
                    "label.listOfPending" : "@@console.app.activity.common.label.listOfPending@@",
                    "msg.backToAct" : "@@userview.processStatus.msg.backToAct@@",
                    "msg.loopAct" : "@@userview.processStatus.msg.loopAct@@",
                    "msg.migrated" : "@@userview.processStatus.msg.migrated@@",
                    "status.inprogress" : "@@userview.processStatus.status.inprogress@@",
                    "status.completed" : "@@userview.processStatus.status.completed@@",
                    "status.terminated" : "@@userview.processStatus.status.terminated@@",
                    "status.notstarted" : "@@userview.processStatus.status.notstarted@@",
                    "status.skipped" : "@@userview.processStatus.status.skipped@@",
                    "status.withdrawn" : "@@userview.processStatus.status.withdrawn@@"
                },{
                    "showProcessName" : "${element.properties.showProcessName!}",
                    "showSkippedActivities" : "${element.properties.showSkippedActivities!}",
                    "showFutureActivities" : "${element.properties.showFutureActivities!}"
                    <#if element.properties.eventClick?? && element.properties.eventClick! != '' >
                        ,"clickCallback" : function(activity) {
                            ${element.properties.eventClick!}
                        }
                    </#if>
                });
                $("#xpdls textarea").each(function(){
                    ps.loadXpdl($(this).attr("id"), $(this).val());
                });
                $("#xpdls").remove();  
                ps.draw();
            });
        </script>
        <div id="process-status-canvas" class="layout_${element.properties.layout!}"></div>
        <div id="xpdls" style="display:none;">
            <#list xpdls?keys as xpdl>
                <textarea id="${xpdl!}">${xpdls[xpdl]?html}</textarea>
            </#list>
        </div>
    <#else> 
        <h3>@@userview.processStatus.noData@@</h3>
    </#if>

    ${element.properties.customFooter!}
</div>
