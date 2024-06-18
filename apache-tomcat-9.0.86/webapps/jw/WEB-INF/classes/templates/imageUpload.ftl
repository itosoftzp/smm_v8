<div class="form-cell" ${elementMetaData!}>
    <#if !(request.getAttribute("org.joget.apps.form.lib.FileUpload")?? || request.getAttribute("org.joget.plugin.enterprise.ImageUpload")??)  >
        <link rel="stylesheet" href="${request.contextPath}/js/dropzone/dropzone.css" />
        <script type="text/javascript" src="${request.contextPath}/js/dropzone/dropzone.js"></script>
        <script src="${request.contextPath}/plugin/org.joget.apps.form.lib.FileUpload/js/jquery.fileupload.js"></script>
        <script type="text/javascript">// Immediately after the js include
            Dropzone.autoDiscover = false;
        </script>
    </#if>
    <#if !(request.getAttribute("org.joget.plugin.enterprise.ImageUpload")??)  >
        <link rel="stylesheet" href="${request.contextPath}/js/tui-image-editor/tui-image-editor.css" />
        <script type="text/javascript" src="${request.contextPath}/js/tui-image-editor/tui-image-editor.js"></script>
        <style>
            .image-editor-modal {display: none; position: fixed; z-index: 1001; padding-top: 100px; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgb(0,0,0); background-color: rgba(0,0,0,0.4);}
            .modal-content {background-color: #fefefe; margin: -5% auto; padding: 20px; border: 1px solid #888; width: 50%;}
            .close-modal {color: #aaaaaa; margin-left: auto; font-size: 28px; font-weight: bold;}
            .close-modal:hover, .close-modal:focus {color: #000; text-decoration: none; cursor: pointer;}
            .save-photo {display: block; margin: auto; margin-left: 0; margin-top: 10px;}
            .tui-image-editor-container .tui-image-editor-submenu .tui-image-editor-submenu-item .tui-image-editor-button.apply label, .tui-image-editor-container .tui-image-editor-submenu .tui-image-editor-submenu-item .tui-image-editor-button.cancel label {vertical-align: 0;}
            .tui-image-editor-button *, .tui-image-editor-menu *, .tui-image-editor-virtual-range-pointer {cursor: pointer !important;}
            .tie-rotate-range-value, .tui-image-editor-range-value {display: inline !important;}
        </style>
    </#if>

    <label class="label" field-tooltip="${elementParamName!}">${element.properties.label} <span class="form-cell-validator">${decoration}</span><#if error??> <span class="form-error-message">${error}</span></#if></label>
    <div id="form-imageupload_${elementParamName!}_${element.properties.elementUniqueKey!}" tabindex="0" class="form-fileupload <#if error??>form-error-cell</#if> <#if element.properties.readonly! == 'true'>readonly<#else>dropzone</#if>">
    <#if element.properties.readonly! != 'true'>
        <div class="dz-message needsclick">
            @@form.fileupload.dropFile@@
        </div>
        <input style="display:none" id="${elementParamName!}" name="${elementParamName!}" type="file" size="${element.properties.size!}" <#if error??>class="form-error-cell"</#if> <#if element.properties.multiple! == 'true'>multiple</#if>/>
    </#if>
        <ul class="form-fileupload-value">
            <#if element.properties.readonly! != 'true'>
                <li class="template" style="display:none;">
                    <img src="${element.serviceUrl!}&_path=" style="max-height:${element.properties.height!}px;max-width:${element.properties.width!}px;" /> <#if element.properties.editor! == 'true'> <a class="edit">@@form.imageupload.edit@@</a> </#if> <a class="remove"style="display:none">@@form.imageupload.remove@@</a> 
                    <strong class="error text-danger" data-dz-errormessage></strong>
                    <div class="progress progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
                        <div class="progress-bar progress-bar-success" style="width:0%;" data-dz-uploadprogress></div>
                    </div>
                    <input type="hidden" name="${elementParamName!}_path" value="" disabled/>
                </li>
            </#if>
            <#if tempFilePaths??>
                <#list tempFilePaths?keys as key>
                    <li>
                        <img src="${element.serviceUrl!}&_path=${key!?url('UTF-8')}" style="max-height:${element.properties.height!}px;max-width:${element.properties.width!}px;"/> 
                            <#if element.properties.readonly! != 'true'>
                                <#if element.properties.editor! == 'true'>
                                    <a class="edit">@@form.imageupload.edit@@</a>
                                </#if>
                                <a class="remove">@@form.imageupload.remove@@</a>
                            </#if>
                        <input type="hidden" name="${elementParamName!}_path" value="${key!?html}"/>
                    </li>
                </#list>
            </#if>
            <#if filePaths??>
                <#list filePaths?keys as key>
                    <li>
                        <a href="${request.contextPath}${key!?html}" target="_blank" ><img src="${request.contextPath}${thumbPaths[key]!?html}" style="max-height:${element.properties.height!}px;max-width:${element.properties.width!}px;"/></a>
                        <#if element.properties.readonly! != 'true'>
                            <#if element.properties.editor! == 'true'>
                                <a class="edit">@@form.imageupload.edit@@</a>
                            </#if>
                            <a class="remove">@@form.imageupload.remove@@</a>
                        </#if>
                        <input type="hidden" name="${elementParamName!}_path" value="${filePaths[key]!?html}"/>
                    </li>
                </#list>
            </#if>
        </ul>
    <#if element.properties.editor! == 'true'>
        <div id="image-editor-modal_${elementParamName!}_${element.properties.elementUniqueKey!}" class="image-editor-modal">
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <div class="image-editor"></div>
                <button class="form-button btn button save-photo">@@form.imageupload.save@@</button>
            </div>
        </div>
    </#if>
    </div>
    <#if element.properties.readonly! != 'true'>
        <script>
            $(document).ready(function(){
                var messages = {
                    "form.imageupload.invalidImg": "@@form.imageupload.invalidImg@@",
                    "form.imageupload.crop" : "@@form.imageupload.crop@@",
                    "form.imageupload.crop.custom" : "@@form.imageupload.crop.custom@@",
                    "form.imageupload.crop.square" : "@@form.imageupload.crop.square@@",
                    "form.imageupload.crop.apply" : "@@form.imageupload.crop.apply@@",
                    "form.imageupload.crop.cancel" : "@@form.imageupload.crop.cancel@@",
                    "form.imageupload.flip" : "@@form.imageupload.flip@@",
                    "form.imageupload.flip.flipx" : "@@form.imageupload.flip.flipx@@",
                    "form.imageupload.flip.flipy" : "@@form.imageupload.flip.flipy@@",
                    "form.imageupload.flip.reset" : "@@form.imageupload.flip.reset@@",
                    "form.imageupload.rotate" : "@@form.imageupload.rotate@@",
                    "form.imageupload.rotate.range" : "@@form.imageupload.rotate.range@@"
                }
                
                $('#form-imageupload_${elementParamName!}_${element.properties.elementUniqueKey!}').fileUploadField({
                    url : "${element.serviceUrl!}",
                    paramName : "${elementParamName!}",
                    multiple : "${element.properties.multiple!}",
                    maxSize : "${element.properties.maxSize!}",
                    maxSizeMsg : "${element.properties.maxSizeMsg!}",
                    fileType : "${element.properties.fileType!}",
                    fileTypeMsg : "${element.properties.fileTypeMsg!}",
                    padding : "${element.properties.padding!}",
                    removeFile : "${element.properties.removeFile!}",
                    resizeWidth : "${element.properties.resizeWidth!}",
                    resizeHeight : "${element.properties.resizeHeight!}",
                    resizeQuality : "${element.properties.resizeQuality!}",
                    resizeMethod : "${element.properties.resizeMethod!}",
                    enableImageEditor: "${element.properties.editor!}",
                    messages: messages
                });
            });
        </script>
    </#if>
</div>
