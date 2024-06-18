<div class="form-cell full_width_field" ${elementMetaData!}>
    <#if !(request.getAttribute("org.joget.plugin.enterprise.AdvancedGrid")??) >
        <link rel="stylesheet" href="${request.contextPath}/plugin/org.joget.plugin.enterprise.AdvancedGrid/js/pqgrid/pqgrid.min.css" />
        <script type="text/javascript" src="${request.contextPath}/js/JSONError.js"></script>
        <script type="text/javascript" src="${request.contextPath}/js/JSON.js"></script>
        <script src="${request.contextPath}/plugin/org.joget.plugin.enterprise.AdvancedGrid/js/pqgrid/pqgrid.min.js"></script>
        <script src="${request.contextPath}/plugin/org.joget.plugin.enterprise.AdvancedGrid/js/jquery.advancedgrid.js"></script>
        <link rel="stylesheet" href="${request.contextPath}/plugin/org.joget.plugin.enterprise.AdvancedGrid/js/pqgrid/themes/office/pqgrid.css" />
    </#if>
    
    <label field-tooltip="${elementParamName!}" class="label">${element.properties.label!} <span class="form-cell-validator">${decoration}${customDecorator!}</span><#if error??> <span class="form-error-message">${error}</span></#if></label>
    <div class="form-clear"></div>
    <script>
        $(function () {
            var messages = {
                "form.advancedgrid.button.save": "@@form.advancedgrid.button.save@@",
                "form.advancedgrid.button.cancel": "@@form.advancedgrid.button.cancel@@",
                "form.advancedgrid.button.add": "@@form.advancedgrid.button.add@@",
                "form.advancedgrid.button.delete": "@@form.advancedgrid.button.delete@@",
                "form.advancedgrid.button.delete.selectARow": "@@form.advancedgrid.button.delete.selectARow@@",
                "form.advancedgrid.deleteMessage.value": "@@form.formgrid.deleteMessage.value@@"
            }

            $("#${elementParamName!}_adgrid_${element.properties.elementUniqueKey!}").advancedgrid({
                url : "${request.contextPath}/web/json/plugin/org.joget.plugin.enterprise.AdvancedGrid/service",
                appId : "${appId!}",
                appVersion : "${appVersion!}",
                formdefid : "${element.properties.formDefId!}",
                paramName : "${elementParamName!}",
                search : "${element.properties.search!}",
                readonly : "${element.properties.readonly!}",
                disabledAdd : "${element.properties.disabledAdd!}",
                disabledDelete : "${element.properties.disabledDelete!}",
                deleteMessage : "${element.properties.deleteMessage!}",
                showRowNumber : "${element.properties.showRowNumber!}",
                keyToSave : "${element.properties.keyToSave!}",
                rPP : ${element.properties.recordPerPage!},
                rPPOptions : [${element.properties.pagingOptions!}],
                sortIndx : "${element.properties.sortIndx!}",
                sortDir : "${element.properties.sortDir!}",
                notEmptySpaceScroll : "${element.properties.notEmptySpaceScroll!}",
                rows : ${element.defaultRows(headers, editors)},
                messages : messages
            });
        });
    </script>                                                         
    <div id="${elementParamName!}_adgrid_${element.properties.elementUniqueKey!}" name="${elementParamName!}" class="adgrid grid form-element">
        <div class="pq_grid"></div>
        <#if element.properties.readonly! != 'true'><p class="adGrid_info">${element.properties.hint!}</p></#if>
        <div class="table_container pdf_visible" style="overflow:hidden; height:1px;width:1px;">
        <table cellspacing="0" style="width:100%; margin-top:5px;">
            <tbody>
            <tr>
                <th style="display:none; border: 0 none;"></th>
            <#list headers?keys as header>
                <#assign width = "200">
                <#if headers[header]['width']?? && headers[header]['width'] != "">
                    <#assign width = headers[header]['width'] >
                </#if>
                <#assign dataType = "string">
                <#if headers[header]['formatType']?? && headers[header]['formatType'] != "">
                    <#assign dataType = headers[header]['formatType'] >
                </#if>
                <#if (headers[header]['readonly']?? && headers[header]['readonly'] != "") || (element.properties.readonly! != 'true' && editors[header].properties.IS_READONLY_FIELD) >
                    <#assign colEditable = "false" >
                <#else>
                    <#assign colEditable = "true" >
                </#if>
                <th id="${elementParamName!}_${header}" data-editable="${colEditable}" data-width="${width}" data-dataType="${dataType}">${headers[header]['label']!}</th>
            </#list>
                <th style="display:none; border: 0 none;"></th>
            </tr>
            <#if element.properties.readonly! != 'true'>
                <tr id="grid-row-editor" class="grid-row-editor" style="display:none;">
                    <td style="display:none;" class="row_key"></td>
                <#list headers?keys as header>
                    <td><textarea key="${header!}" element_nonce="${editors[header].properties._NONCE!}" element_is_calculation="${editors[header].properties._IS_CALCULATION!}" >${editors[header].properties._JSON!}</textarea></td>
                </#list>
                    <td style="display:none;"></td>
                </tr>
            </#if>
            <tr id="grid-row-template" class="grid-row-template" style="display:none;">
                <td style="display:none;width:0px;" class="row_key"></td>
            <#list headers?keys as header>
                ${element.renderModel(header, headers, editors)}
            </#list>
                <td style="display:none;"><textarea id="${elementParamName!}_jsonrow" name="${elementParamName!}_jsonrow"></textarea></td>
            </tr>
            <#list rows as row>
                <tr class="grid-row key_${row_index}" id="${elementParamName!}_row_${row_index}">
                    <td style="display:none;width:0px;" class="row_key">${row_index}</td>
                <#list headers?keys as header>
                    <td><span id="${elementParamName!}_${header}" name="${elementParamName!}_${header}" column_key="${header}" column_type="${headers[header]['formatType']!?html}" column_format="${headers[header]['format']!?html}" class="grid-cell">
                            ${row[header]!?html}
                        </span>
                    </td>
                </#list>
                    <td style="display:none;width:0px;">
                        <#if !isPdfGeneration >
                            <textarea style="display:none;" id="${elementParamName!}_jsonrow" name="${elementParamName!}_jsonrow_${row_index}">${row['jsonrow']!?html}</textarea>
                        </#if>
                    </td>
                </tr>
            </#list>
            </tbody>
        </table>
        </div>
    </div>
</div>