<#if type! == 'autocomplete'>
    <script type="text/javascript" src="${contextPath}/plugin/org.joget.apps.datalist.lib.TextFieldDataListFilterType/js/jquery.placeholder.min.js"></script>

    <input id="${name!?replace(".", "_")}" name="${name!}" type="text" size="10" <#if value??> value="${value!?html}"</#if> placeholder="${label!?html}">

    <script>
        $(function() {
            $('#${name!?replace(".", "_")}').placeholder();

            var ${name!?replace(".", "_")?replace("-", "")}Options = [
                <#list options as option>
                    '${option.label!?js_string}'<#if option_has_next> ,</#if>
                </#list>
            ];

            $( "#${name!?replace(".", "_")}" ).autocomplete({
                minLength: 0,
                source: ${name!?replace(".", "_")?replace("-", "")}Options
            });
        });
    </script>
<#else>
    <#if type! == 'true'>
        <#if !(request.getAttribute("org.joget.plugin.enterprise.SelectBoxDataListFilterType")??) >
            <link rel="stylesheet" href="${request.contextPath}/plugin/org.joget.plugin.enterprise.SelectBoxDataListFilterType/css/bootstrap-multiselect.min.css" type="text/css"/>
            <script type="text/javascript" src="${request.contextPath}/plugin/org.joget.plugin.enterprise.SelectBoxDataListFilterType/js/bootstrap-multiselect.min.js"></script>
            <style>
                span.multiselect-native-select{display: inline-block; vertical-align: bottom; }
                span.multiselect-native-select button.custom-select.waves-effect {margin-bottom:15px;}
                span.multiselect-native-select button, span.multiselect-native-select button:hover, span.multiselect-native-select button:active {font-size: inherit; color: inherit; background-color: inherit;}
                span.multiselect-native-select .waves-effect + .dropdown-menu button.active, span.multiselect-native-select .waves-effect + .dropdown-menu button:active, span.multiselect-native-select .waves-effect + .dropdown-menu button:hover,
                span.multiselect-native-select .waves-effect + .dropdown-menu button {display:block; box-shadow: none; text-align:left; margin-left: 0 !important; width: 100%; color: inherit !important; background-color: inherit !important; border:0 !important;}
                span.multiselect-native-select .waves-effect + .dropdown-menu button .form-check-input {min-width:auto !important;}
                span.multiselect-native-select .waves-effect + .dropdown-menu button .form-check {position: relative; display: block;}
                span.multiselect-native-select .waves-effect + .dropdown-menu button .form-check .form-check-input {position: absolute; margin-top: .3rem; margin-left: -1.45rem;}
                span.multiselect-native-select .waves-effect + .dropdown-menu .multiselect-filter {align-items: center!important; display: flex!important;}
                span.multiselect-native-select .waves-effect + .dropdown-menu .multiselect-filter input {margin-bottom:5px;}
                span.multiselect-native-select .multiselect-container {max-width: 223px; left:auto !important; right: -34px;}
                @media (max-width: 767px) {span.multiselect-native-select .multiselect-container {right: auto !important;}}
                span.multiselect-native-select .multiselect-container .form-check .form-check-label {display:inline-block; max-width:180px; white-space: break-spaces;}
            </style>
        </#if>
    </#if>

    <select id="${name!?replace(".", "_")}" name="${name!}" title="${label!?html}" <#if element.properties.size?? && element.properties.size != ''> size="${element.properties.size!}"</#if> <#if element.properties.multiple?? && element.properties.multiple == 'true'> multiple="true"</#if>>
        <#if type! != 'true'>
            <option class="label" value="" style="color:gray;">${label!?html}</option>
        </#if>
        <#list options as option>
            <#if option.value != "" >
                <option value="${option.value!?html}" grouping="${option.grouping!?html}" <#if values?? && values?seq_contains(option.value!)>selected</#if> >${option.label!?html}</option>
            </#if>
        </#list>
    </select>
    <#if (element.properties.controlField?? && element.properties.controlField! != "") >
        <script>
            FormUtil = {
                controlFields : [],
                setControlField : function(fieldId, selector) {
                    if (selector !== undefined) {
                        $(selector).addClass("control-field");
                    } else {
                        $("[name='"+fieldId+"']:not(form)").addClass("control-field");
                    }
                    if (FormUtil.controlFields.indexOf(fieldId) === -1) {
                        FormUtil.controlFields.push(fieldId);
                    }
                },
                isControlField : function(fieldId, field) {
                    if (FormUtil.controlFields.indexOf(fieldId) !== -1 || $(field).hasClass("control-field")) {
                        return true;
                    } else {
                        //handle for subform
                        for (var i = 0; i < FormUtil.controlFields.length; i++) {
                            if (FormUtil.controlFields[i].startsWith("_") && fieldId.endsWith(FormUtil.controlFields[i])) {
                                return true;
                            }
                        }
                        return false;
                    }
                }
            };
        </script>
        <script type="text/javascript" src="${contextPath}/plugin/org.joget.plugin.enterprise.SelectBoxDataListFilterType/js/jquery.dynamicoptions.js"></script>
    </#if>
    <script type="text/javascript">
        $(document).ready(function(){
            <#if type! == 'true'>
                $('#${name!}').multiselect({
                    includeSelectAllOption: true,
                    enableCaseInsensitiveFiltering: true,
                    nonSelectedText: "${label!?html}",
                    buttonText: function (options) {
                        if (options.length == 0) {
                            return "${label!?html}";
                        } else if (options.length > 0) {
                            return options.length + ' @@datalist.sbdlft.selected@@  ';
                        }
                    }
                });
            </#if>

            if($("#${name!}").val() == "") {
                $("#${name!}").css("color", "gray");
            }

            $("#${name!}").change(function(){
                <#if element.properties.multiple?? && element.properties.multiple == 'true' && (element.properties.controlField?? && element.properties.controlField! != "")>
                    if(typeof($.fn.popover) !== 'undefined'){
                        $("#${name!}").multiselect("rebuild");
                    }
                <#else>
                    if($(this).val() == "") {
                        $(this).css("color", "gray");
                    } else {
                        $(this).css("color", "inherit");
                    }
                </#if>
            });

            <#if (element.properties.controlField?? && element.properties.controlField! != "") >
                $("#${name!}").dynamicOptions({
                    controlField : "${element.properties.controlFieldName!}",
                    paramName : "${name!}",
                    type : "selectbox",
                    readonly : "false",
                    nonce : "${element.properties.nonce!}",
                    binderData : "${element.properties.binderData!}",
                    appId : "${element.properties.appId!}",
                    appVersion : "${element.properties.appVersion!}",
                    contextPath : "${request.contextPath}"
                });
            </#if>
        });
    </script>
</#if>