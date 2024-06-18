<div class="dashboard_menu ajax_mode">
    <link rel="stylesheet" href="${request.contextPath}/plugin/org.joget.plugin.enterprise.DashboardMenu/js/gridstack/gridstack.min.css" />
    <link rel="stylesheet" href="${request.contextPath}/plugin/org.joget.plugin.enterprise.DashboardMenu/css/dashboardMenu.css" />
    <script src="${request.contextPath}/plugin/org.joget.plugin.enterprise.DashboardMenu/js/lodash/lodash.js"></script>
    <script src="${request.contextPath}/js/storage/jquery.html5storage.min.js"></script>
    <script src="${request.contextPath}/js/JSON.js"></script>
    <script src="${request.contextPath}/js/JSONError.js"></script>
    <script src="${request.contextPath}/plugin/org.joget.plugin.enterprise.DashboardMenu/js/gridstack/gridstack.min.js"></script>
    <script src="${request.contextPath}/plugin/org.joget.plugin.enterprise.DashboardMenu/js/dashboardMenu.js"></script>

    ${element.properties.customHeader!}
    <a class="reset_position"><i class="fas fa-th"></i> @@userview.dashboard.label.resetLayout@@</a>
    <div id="dashboard_${element.properties.id!}" class="grid-stack grid-stack-3">
        <#if error>
            <p class="error">@@userview.dashboard.error.noPortlet@@</p>
        </#if>
    </div>
    <div id="dashboard_portlets_${element.properties.id!}" class="portlets" style="display:none">
        <#if !error>
            <#list portlets as portlet>
                <#assign extraSetting = " ">
                <#if portlet.properties.PORTLET_resizable != 'true'>
                    <#assign extraSetting = "${extraSetting} data-gs-no-resize=\"yes\"">
                </#if>
                <#if portlet.properties.PORTLET_autoHeight == 'true'>
                    <#assign extraSetting = "${extraSetting} data-gs-auto-height=\"yes\"">
                </#if>
                <#if portlet.properties.PORTLET_x != '' && portlet.properties.PORTLET_y != ''>
                    <#assign extraSetting = "${extraSetting} data-gs-x=\"${portlet.properties.PORTLET_x}\" data-gs-y=\"${portlet.properties.PORTLET_y}\"">
                <#else>
                    <#assign extraSetting = "${extraSetting} data-gs-auto-position=\"yes\"">
                </#if>
                <#if portlet.properties.PORTLET_fixed == 'true'>
                    <#assign extraSetting = "${extraSetting} data-gs-no-move=\"yes\" data-gs-locked=\"yes\"">
                </#if>
                <#if portlet.properties.PORTLET_autoReload != ''>
                    <#assign extraSetting = "${extraSetting} data-gs-auto-reload=\"${portlet.properties.PORTLET_autoReload}\"">
                </#if>
                <div id="${portlet.properties.id}" class="grid-stack-item" ${extraSetting} data-gs-width="${portlet.properties.PORTLET_width}" data-gs-height="${portlet.properties.PORTLET_height}" >
                    <div class="grid-stack-item-content">
                        <div class="grid-stack-item-header">
                            <h4>${portlet.properties.label!}</h4>
                            <a class="grid-stack-item-header-action grid-stack-item-header-refresh" title="@@general.method.label.refresh@@"><i class="fas fa-sync-alt"></i></a>
                        </div>
                        <div class="grid-stack-item-body">
                            ${portlet.render()}
                        </div>
                    </div>
                </div>
            </#list>

            <script type="text/javascript">
                $(function () {
                    var options = {
                        storage_key : '${localStorageKey!}',
                        handle : '.grid-stack-item-header',
                        cell_height: 25,
                        vertical_margin: 10,
                        width: 3,
                        portlets: '#dashboard_portlets_${element.properties.id!}.portlets',
                        reset_position: '.reset_position',
                        ajax: true
                    };
                    $('#dashboard_${element.properties.id!}.grid-stack').dashboardMenu(options);
                });
            </script>
        </#if>
    </div>

    ${element.properties.customFooter!}
</div>