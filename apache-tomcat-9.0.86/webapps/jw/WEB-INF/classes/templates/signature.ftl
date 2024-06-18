<div class="form-cell" ${elementMetaData!}>
    <label field-tooltip="${elementParamName!}" class="label">${element.properties.label} <span class="form-cell-validator">${decoration}</span><#if error??> <span class="form-error-message">${error}</span></#if></label>
    <div class="form-cell-value sigPad" style="width:${width!}px;" >
        <link rel="stylesheet" href="${request.contextPath}/wro/signature.min.css" />
        <#if (element.properties.readonly! == 'true' && value??)>
            <img class="pad" src="${src!?html}" />
        <#else>
            <#if !(request.getAttribute("org.joget.plugin.enterprise.Signature_EDITABLE")??) >
                <script type="text/javascript" src="${request.contextPath}/wro/signature.min.js"></script>
                <!--[if lt IE 9]><script src="${request.contextPath}/plugin/org.joget.plugin.enterprise.Signature/js/signature_pad/assets/flashcanvas.js"></script><![endif]-->
            </#if>
            <div id="${elementParamName!}_sigPad" class="sigPad" style="width:${width!}px;">
                <canvas class="pad" width="${width!}" height="${height!}"></canvas>
                <input id="${elementParamName!}" name="${elementParamName!}" type="hidden" class="output"/>
                <div id="${elementParamName!}_clear" class="clearButton" style="cursor:pointer;width:fit-content;"><a>Clear</a></div>
                <a id="${elementParamName!}_full-button" class="fullscreenButton" style="cursor:pointer;">
                    <i class="fas fa-expand-arrows-alt"></i>
                </a>
            </div>
            <#if !includeMetaData >
                <script>
                    $(document).ready(function() {
                        ${elementParamName!}_sigPad();
                    });
                    // handle mobile page show
                    $(document).bind("pageshow", function() {
                        ${elementParamName!}_sigPad();
                    });
                    function ${elementParamName!}_sigPad(){
                        if ($('#${elementParamName!}_sigPad').length > 0) {
                            ${elementParamName!}_signaturePad = $('#${elementParamName!}_sigPad').signaturePadFullscreen({
                                drawOnly:true,
                                validateFields: false,
                                defaultAction: "drawIt",
                                lineColour: "#fff",
                                paramName: '${elementParamName!}',
                                width: "${width!}",
                                height: "${height!}"
                            });
                            <#if value??>
                                ${elementParamName!}_signaturePad.regenerate(${value!});
                            </#if>
                        }
                    }
                </script>
            </#if>
        </#if>
    </div>
    <div class="form-clear"></div>
</div>