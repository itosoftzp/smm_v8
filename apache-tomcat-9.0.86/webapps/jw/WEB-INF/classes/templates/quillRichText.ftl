<div class="form-cell full_width_field" ${elementMetaData!}>    

<#if element.properties.readonly! != 'true'>

    <#if !(request.getAttribute("org.joget.plugin.enterprise.RichTextEditorField_EDITABLE:quillRichText.ftl")??) >
        <script type="text/javascript" src="${request.contextPath}/wro/quill.js"></script>
        <script type="text/javascript" src="${request.contextPath}/plugin/org.joget.plugin.enterprise.RichTextEditorField/js/jquery.quilljs.js"></script>
        <link rel="stylesheet" href="${request.contextPath}/wro/quill.css" />
    </#if>

    <label field-tooltip="${elementParamName!}" class="label">${element.properties.label!} <span class="form-cell-validator">${decoration}</span><#if error??> <span class="form-error-message">${error}</span></#if></label>
    <#if element.properties.mode! == 'full'>
    <div class="form-clear"></div>
    </#if>
    <textarea id="${elementParamName!}_${element.properties.elementUniqueKey!}" name="${elementParamName!}" style='display:none' class="ui-screen-hidden focusable tinymce ${elementParamName!} <#if error??>form-error-cell</#if>" <#if element.properties.readonly! == 'true'>readonly</#if>>${value!?html}</textarea>
    <div id="${elementParamName!}_${element.properties.elementUniqueKey!}_editor_container" class="<#if element.properties.mode! != 'full'>form-cell-value<#else>spreadsheet_container</#if> <#if error??>form-error-cell</#if>" <#if element.properties.mode! == ''>style="padding-bottom:42px;"</#if>>
        <div id="${elementParamName!}_${element.properties.elementUniqueKey!}_editor">
            ${value!}
        </div>
    </div>
    
<script type="text/javascript">
    $(document).ready(function() {
        $('[id=${elementParamName!}_${element.properties.elementUniqueKey!}]').quillrichtext({
            mode : '${element.properties.mode!}', 
            height : '${element.properties.height!}',
            paramName : '${elementParamName!}',
            serviceUrl : '${element.serviceUrl!}',
            contextPath : '${request.contextPath!}',
            placeholder : '${element.properties.placeholder!}',
            switch : '<#if element.properties.mode! != 'inline'>${element.properties.switch!}</#if>',
            inlineSwitch : '${element.properties.inlineSwitch!}',
            customSettings : "${element.properties.customSettings!?js_string}"
        });
    });
</script>

<#else>
    <label class="label">${element.properties.label!} <span class="form-cell-validator">${decoration}</span><#if error??> <span class="form-error-message">${error}</span></#if></label>
    <#if includeMetaData>
        <span class="form-floating-label">@@form.richtexteditorfield.readonlyRichTextEditor@@</span>
    </#if>
    <div class="form-clear"></div>
    <input id="${elementParamName!}_${element.properties.elementUniqueKey!}" name="${elementParamName!}" type='hidden' value="${value!?html}" />
    <div class="richtexteditor ${elementParamName!} ql-editor" id="${elementParamName!}">${value!}</div>
</#if>

</div>
