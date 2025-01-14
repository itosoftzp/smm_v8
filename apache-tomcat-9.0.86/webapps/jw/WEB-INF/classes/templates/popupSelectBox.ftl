<div class="form-cell" ${elementMetaData!}>

    <#if (element.properties.readonly! == 'true' && element.properties.readonlyLabel! == 'true') >
        <label field-tooltip="${elementParamName!}" class="label">${element.properties.label} <span class="form-cell-validator">${decoration}</span><#if error??> <span class="form-error-message">${error}</span></#if></label>
        <div class="form-cell-value">
            <#list options as option>
                <#if values?? && values?seq_contains(option.value!)>
                    <label class="readonly_label">
                        <span>${option.label!?html}</span>
                        <input id="${elementParamName!}" name="${elementParamName!}" type="hidden" value="${option.value!?html}" />
                    </label>
                </#if>
            </#list>
        </div>
        <div style="clear:both;"></div>
    <#else>
        <#if !(request.getAttribute("org.joget.plugin.enterprise.PopupSelectBox_EDITABLE")??) >
            <script type="text/javascript" src="${request.contextPath}/plugin/org.joget.plugin.enterprise.PopupSelectBox/js/jquery.popupselect.js"></script>
        </#if>

            <label class="label">${element.properties.label!} <span class="form-cell-validator">${decoration}</span><#if error??> <span class="form-error-message">${error}</span></#if></label>
            <div class="ui-screen-hidden">
            <select id="popupselect_${element.properties.elementUniqueKey!}" name="${elementParamName!}" style="display:none" size="3" <#if element.properties.multiple! == 'true'>multiple</#if> class="${elementParamName!} <#if error??>form-error-cell</#if>">
                <#list options as option>
                    <option value="${option.value!?html}" html="${option.label!?html}" grouping="${option.grouping!?html}" <#if values?? && values?seq_contains(option.value!)>selected</#if>>${option.label!?html}</option>
                </#list>
            </select>
            </div>
        <script type="text/javascript">
            $(document).ready(function() {
                $("#popupselect_${element.properties.elementUniqueKey!}[name='${elementParamName!}']").popupselect({
                    contextPath: "${request.contextPath}",
                    title: "@@form.popupselectbox.title@@",
                    fieldName: "${elementParamName!}",
                    readOnly: "${element.properties.readonly!}",
                    primaryKey: "${element.properties.primaryKey!}",
                    idField: "${element.properties.idField!?html}",
                    displayField: "${element.properties.displayField!?html}",
                    buttonLabel: "${element.properties.buttonLabel!?html}",
                    listId: "${element.properties.listId!}",
                    appId : "${appId!}",
                    appVersion : "${appVersion!}",
                    nonce: "${nonceList!}",
                    height: "${element.properties.height!}",
                    width: "${element.properties.width!}",
                    multiple: "${element.properties.multiple!}"
                    <#if requestParams??>, requestParams:${requestParams}</#if>
                });
                $("#popupselect_${element.properties.elementUniqueKey!}[name='${elementParamName!}']").popupselect("initPopupDialog", {contextPath: "${request.contextPath}"});
            });
            function popupselect_${element.properties.elementUniqueKey!}_add(args){
                $("#popupselect_${element.properties.elementUniqueKey!}[name='${elementParamName!}']").popupselect("addOption", args);
            }
        </script>
    </#if>
</div>
