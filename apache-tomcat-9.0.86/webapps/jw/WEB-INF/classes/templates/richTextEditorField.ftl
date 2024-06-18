<div class="form-cell full_width_field" ${elementMetaData!}>    

<#if element.properties.readonly! != 'true'>

    <#if !(request.getAttribute("org.joget.plugin.enterprise.RichTextEditorField_EDITABLE:richTextEditorField.ftl")??) >
        <script type="text/javascript">
            if ($('head script#tinymcescript').length === 0) {
                $('head').append("<script id=\"tinymcescript\" type=\"text/javascript\" src=\"${request.contextPath}/js/tiny_mce/js/tinymce/tinymce.min.js\"></"+"script>");
            }
        </script>
        <script type="text/javascript" src="${request.contextPath}/plugin/org.joget.plugin.enterprise.RichTextEditorField/js/jquery.richtext.js"></script>
        <link rel="stylesheet" href="${request.contextPath}/plugin/org.joget.plugin.enterprise.RichTextEditorField/css/jquery.richtext.css" />
    </#if>

    <label class="label">${element.properties.label!} <span class="form-cell-validator">${decoration}</span><#if error??> <span class="form-error-message">${error}</span></#if></label>
    <div class="form-clear"></div>
    <textarea id="${elementParamName!}_${element.properties.elementUniqueKey!}" name="${elementParamName!}" style='height:300px;width:100%' class="tinymce ${elementParamName!} <#if error??>form-error-cell</#if>" <#if element.properties.readonly! == 'true'>readonly</#if>>${value!?html}</textarea>

<script type="text/javascript">
    $(document).ready(function() {
        $('[id=${elementParamName!}_${element.properties.elementUniqueKey!}]').richtext({
            mode : '${element.properties.mode!}', 
            height : '${element.properties.height!}',
            paramName : '${elementParamName!}',
            serviceUrl : '${element.serviceUrl!}',
            contextPath : '${request.contextPath!}',
            customSettings : "${element.properties.customSettings!?js_string}"
        });
    });
</script>

<#else>
    <label field-tooltip="${elementParamName!}" class="label">${element.properties.label!} <span class="form-cell-validator">${decoration}</span><#if error??> <span class="form-error-message">${error}</span></#if></label>
    <#if includeMetaData>
        <span class="form-floating-label">@@form.richtexteditorfield.readonlyRichTextEditor@@</span>
    </#if>
    <div class="form-clear"></div>
    <input id="${elementParamName!}_${element.properties.elementUniqueKey!}" name="${elementParamName!}" type='hidden' value="${value!?html}" />
    <div class="richtexteditor ${elementParamName!}" id="${elementParamName!}">${value!}</div>
</#if>

<script type="text/javascript">
    $(window).load(function() {
        if ($("body").hasClass("rtl")) {
            $('body.rtl iframe#${elementParamName!}_${element.properties.elementUniqueKey!}_ifr').contents().find("body.mce-content-body").css("direction","rtl");
        }
    });
</script>
</div>
