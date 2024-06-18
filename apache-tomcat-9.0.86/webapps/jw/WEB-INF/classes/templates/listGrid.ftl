<div class="form-cell full_width_field" ${elementMetaData!}>
<#if !(request.getAttribute("org.joget.plugin.enterprise.ListGrid")??) >
    <script type="text/javascript" src="${request.contextPath}/js/jquery/jquery.jeditable.js"></script>
    <script type="text/javascript" src="${request.contextPath}/plugin/org.joget.plugin.enterprise.FormGrid/js/jquery.enterpriseformgrid.js"></script>
    <script type="text/javascript" src="${request.contextPath}/plugin/org.joget.plugin.enterprise.FormGrid/js/date.js"></script>
    <script type="text/javascript" src="${request.contextPath}/plugin/org.joget.plugin.enterprise.ListGrid/js/jquery.listgrid.js"></script>
    <script type="text/javascript" src="${request.contextPath}/plugin/org.joget.plugin.enterprise.FormGrid/js/jquery.gridPaging.js"></script>
</#if>
<script type="text/javascript">
    $(document).ready(function() {
        var messages = {
            "form.listgrid.addRows": "@@form.listgrid.addRows@@",
            "form.listgrid.addEntry": "@@form.listgrid.addEntry@@",
            "form.listgrid.editable.tooltip": "@@form.listgrid.editable.tooltip@@",
            "form.listgrid.editable.ok": "@@form.listgrid.editable.ok@@",
            "form.formgrid.deleteMessage.value": "@@form.formgrid.deleteMessage.value@@",
            "form.formgrid.bulkDeleteMessage": "@@form.formgrid.bulkDeleteMessage@@"
        }
        $("#listgrid_${elementParamName!}_${element.properties.elementUniqueKey!}").listgrid({messages: messages, options : ${optionsJson!}});
        $("#listgrid_${elementParamName!}_${element.properties.elementUniqueKey!}").listgrid("initPopupDialog", {contextPath:'${request.contextPath}', width:'${element.properties.width!?html}', height:'${element.properties.height!?html}', title:'@@form.listgrid.addEntry@@', appId:'${appId}', appVersion:'${appVersion}', listId:'${listId}', label: '<#if element.properties.buttonLabel??>${element.properties.buttonLabel?html}<#else>@@form.listgrid.insert@@</#if>' <#if formId??>, formId:'${formId}'</#if> <#if uniqueKey??>, uniqueKey:'${uniqueKey}'</#if> <#if requestParams??>, requestParams:${requestParams}</#if>});
        
        $("#listgrid_${elementParamName!}_${element.properties.elementUniqueKey!}").gridPaging({customSize: '${element.properties.pageSize!}' <#if element.properties.enableSorting! == 'true'>, dataSorting : true</#if>});
    });

    function listgrid_${elementParamName!}_${element.properties.elementUniqueKey!}_add(args){
        $("#listgrid_${elementParamName!}_${element.properties.elementUniqueKey!}").listgrid("addRow", args);
    }

    function listgrid_${elementParamName!}_${element.properties.elementUniqueKey!}_edit(args){
        $("#listgrid_${elementParamName!}_${element.properties.elementUniqueKey!}").listgrid("editRow", args);
    }
</script>
    <div style="display: flex; flex-direction: column;">
        <label field-tooltip="${elementParamName!}" class="label">${element.properties.label!} <span class="form-cell-validator">${decoration}${customDecorator!}</span><#if error??> <span class="form-error-message">${error}</span></#if></label>
    </div>
    <div class="form-clear"></div>
    <style>
        .td-checkbox .tablesaw-cell-label {
            display: none !important;
        }
    </style>
    <div id="listgrid_${elementParamName!}_${element.properties.elementUniqueKey!}" name="${elementParamName!}" class="grid listgrid form-element <#if element.properties.readonly! == 'true'>readonly</#if> <#if element.properties.enableSorting! == 'true'>enableSorting</#if> <#if element.properties.disabledAdd! == 'true'>disabledAdd</#if> <#if element.properties.disabledDelete! == 'true'>disabledDelete</#if>">
        <input type="hidden" disabled="disabled" id="formUrl" value="${request.contextPath}/web/app/${appId}/${appVersion}/form/embed?_submitButtonLabel=${buttonLabel!?html}">
        <input type="hidden" disabled="disabled" id="json" value="${json!}">
        <input type="hidden" disabled="disabled" id="appId" value="${appId!}">
        <input type="hidden" disabled="disabled" id="appVersion" value="${appVersion!}">
        <input type="hidden" disabled="disabled" id="contextPath" value="${request.contextPath}">
        <input type="hidden" disabled="disabled" id="height" value="${element.properties.height!?html}">
        <input type="hidden" disabled="disabled" id="width" value="${element.properties.width!?html}">
        <input type="hidden" disabled="disabled" id="validateMaxRow" value="${element.properties.validateMaxRow!}">
        <input type="hidden" disabled="disabled" id="deleteMessage" value="${element.properties.deleteMessage!?html}">
        <input type="hidden" disabled="disabled" id="nonce" value="${nonceForm!?html}">
        <input type="hidden" disabled="disabled" id="nonceList" value="${nonceList!?html}">
        <#if element.properties.disabledDelete! != 'true' && element.properties.readonly! != 'true'>
            <button type="button" class="btn btn-outline-danger btn-sm delete_btn" id="${elementParamName!}_${element.properties.elementUniqueKey!}_delete" style="display:none;width:fit-content;border-color:#dc3545 !important;"><i class="fas fa-trash-alt"></i></button>    
        </#if>
        <table cellspacing="0" class="tablesaw tablesaw-stack" data-tablesaw-mode="stack">
            <thead>
            <tr>
            <#if element.properties.disabledDelete! != 'true' && element.properties.readonly! != 'true'>
                <th class="grid-checkbox-header">
                    <input type="checkbox" id="${elementParamName!}_grid-checkbox-parent" class="grid-checkbox-parent">
                </th>
            </#if>
            <#if element.properties.showRowNumber?? && element.properties.showRowNumber! != "">
                <th></th>
            </#if>
            <#list headers?keys as header>
                <#assign width = "">
                <#if headers[header]['width']?? && headers[header]['width'] != "">
                    <#assign width = "width:" + headers[header]['width'] >
                </#if>
                <th id="${elementParamName!}_${header?html}" style="${width}">${headers[header]['label']!}</th>
            </#list>
                <th class="grid-action-header"></th>
            </tr>
            <tr id="grid-row-template" class="grid-row-template" style="display:none;">
                <#if element.properties.disabledDelete! != 'true' && element.properties.readonly! != 'true'>
                    <td class="td-checkbox">
                        <input type="checkbox" id="${elementParamName!}_grid-checkbox" class="grid-checkbox-children">
                    </td>
                </#if>
                <#if element.properties.showRowNumber?? && element.properties.showRowNumber! != "">
                    <td><span class="grid-cell rowNumber"></span></td>
                </#if>
            <#list headers?keys as header>
                <td><span id="${elementParamName!}_${header?html}"  name="${elementParamName!}_${header?html}" column_key="${header?html}" column_type="${headers[header]['formatType']!?html}" column_format="${headers[header]['format']!?html}" column_editable="${headers[header]['editable']!?html}" class="grid-cell"></span></td>
            </#list>
                <td style="display:none;"><textarea id="${elementParamName!}_jsonrow" name="${elementParamName!}_jsonrow"></textarea></td>
            </tr>
            </thead>
            <tbody>
            <#list rows as row>
                <tr class="grid-row" id="{elementParamName!}_row_${row_index}">
                    <#if element.properties.disabledDelete! != 'true' && element.properties.readonly! != 'true'>
                        <td class="td-checkbox">
                            <input type="checkbox" id="${elementParamName!}_grid-checkbox" class="grid-checkbox-children">
                        </td>
                    </#if>
                    <#if element.properties.showRowNumber?? && element.properties.showRowNumber! != "">
                        <td><span class="grid-cell rowNumber">${row_index + 1}</span></td>
                    </#if>
                <#list headers?keys as header>
                    <td><span id="${elementParamName!}_${header?html}" name="${elementParamName!}_${header?html}" column_key="${header?html}" column_type="${headers[header]['formatType']!?html}" column_format="${headers[header]['format']!?html}" column_editable="${headers[header]['editable']!?html}" class="grid-cell">
                            <#attempt>
                                ${element.formatColumn(header, headers[header], row["id"], row[header], appId, appVersion, request.contextPath)}
                            <#recover>
                                ${row[header]!?html}
                            </#attempt>
                        </span>
                    </td>
                </#list>
                    <td style="display:none;"><textarea id="${elementParamName!}_jsonrow" name="${elementParamName!}_jsonrow_${row_index}">${row['jsonrow']!?html}</textarea></td>
                </tr>
            </#list>
            </tbody>
        </table>
    </div>
</div>
