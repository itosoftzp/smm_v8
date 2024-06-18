<link href='${request.contextPath}/js/boxy/stylesheets/boxy.css' rel='stylesheet' />
<script src='${request.contextPath}/js/boxy/javascripts/jquery.boxy.js'></script>
<div class="permission-menu-body-content">
    <style>
        .category h4 {text-transform: uppercase;}
        td.value > span {display:inline-block; margin-right: 10px;}
        td.value > span > a {display:inline-block; color:#fff; background:red; text-align:center; height: 14px; width:14px; border-radius:7px; line-height:12px; vertical-align: middle;}
    </style>

    <#if element.properties.title?? ><h3>${element.properties.title!}</h3></#if>
    ${element.properties.customHeader!}

    <#if pluginEnabled && !isAdmin>
        @@userview.permissionMenu.requiredAdminUserRole@@
    <#else>
        <#list permissionsCatgory!?keys as cat>
            <div class="category">
                <h4>${cat?html}</h4>
                <table width="100%" class="table table-hover">
                    <tbody>
                        <#list permissionsCatgory[cat]?keys as p>
                            <tr data-id="${p?html}" data-label="${permissionsCatgory[cat][p]?html}">
                                <td width="20%"><strong>${permissionsCatgory[cat][p]?html}</strong></td>
                                <td class="value" width="60%">
                                    <#if permissionsValue[p]?? >
                                        <#if pluginEnabled >
                                            <#if references[permissionsValue[p]]?? >
                                                ${references[permissionsValue[p]]!?html}
                                            <#else>
                                                ${permissionsValue[p]!?html}
                                            </#if>    
                                        <#else>
                                            <#list permissionsValue[p]?split(";") as u>
                                                <span><a href="#" class="removeUser" data-username="${u}">x</a> ${u}</span>
                                            </#list>
                                        </#if>
                                    </#if>
                                </td>
                                <td class="action" width="20%">
                                    <#if pluginEnabled >
                                        <a href="#" class="edit form-button button btn">@@userview.permissionMenu.configPermission@@</a>
                                    <#else>
                                        <a href="#" class="addUser form-button button btn">@@userview.permissionMenu.addUser@@</a>
                                    </#if>    
                                </td>
                            </tr>
                        </#list>
                    </tbody>
                </table>
            </div>
        </#list>
        <script>
            var url = '${request.contextPath}${submissionUrl}';
            function addUser(id, label) {
                JPopup.show("permissionMenu", url, {"id":id, "label": label, "_frameId" : "permissionMenu", "action":"config"}, '', '90%', '90%', 'get');
            }
            function removeUser(id, username, el) {
                $.post(url, {
                    id : id,
                    username : username,
                    action : 'removeUser'
                }, function( data ) {
                    if (data.success === "true") {
                        $(el).parent().remove();
                    }
                }, "json");
            }
            function edit(id, label) {
                JPopup.show("permissionMenu", url, {"id":id, "label": label, "action":"config"}, '', '90%', '90%', 'get');
            }
            function refreshAllAction() {
                $("tr[data-id]").each(function(){
                    var id = $(this).data("id");
                    var label = $(this).data("label");

                    $(this).find(".edit").click(function(){
                        edit(id, label);
                        return false;
                    });
                    $(this).find(".addUser").click(function(){
                        addUser(id, label);
                        return false;
                    });
                    $(this).find(".removeUser").click(function(){
                        removeUser(id, $(this).data("username"), $(this));
                        return false;
                    });
                });
            }
            $(document).ready(function(){
                refreshAllAction();
            });
        </script>
    </#if>    
    ${element.properties.customFooter!}
</div>