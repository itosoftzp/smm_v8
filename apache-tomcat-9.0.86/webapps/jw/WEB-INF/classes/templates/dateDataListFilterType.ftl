<script type="text/javascript" src="${contextPath}/plugin/org.joget.apps.datalist.lib.TextFieldDataListFilterType/js/jquery.placeholder.min.js"></script>
<script type="text/javascript" src="${contextPath}/plugin/org.joget.apps.form.lib.DatePicker/js/jquery.custom.datepicker.js"></script>
<#if element.properties.enableTime! == 'true'>
    <link rel="stylesheet" href="${request.contextPath}/plugin/org.joget.apps.form.lib.DatePicker/css/jquery-ui-timepicker-addon.css" />
    <script type="text/javascript" src="${request.contextPath}/plugin/org.joget.apps.form.lib.DatePicker/js/jquery-ui-timepicker-addon.js"></script>
</#if>
<#if locale! != ''>
    <script type="text/javascript" src="${request.contextPath}/js/jquery/ui/i18n/jquery.ui.datepicker-${locale}.js"></script>
</#if>
<#if isBE!>
    <script type="text/javascript" src="${request.contextPath}/js/jquery/ui/i18n/jquery.ui.datepicker.ext.be.js"></script>
</#if>
<input id="${name!?replace(".", "_")}" name="${name!}" type="text" size="10" value="${value!?html}" readonly="readonly" class="datepicker no-manual-input" placeholder="${label!?html}"/>
<script type="text/javascript">
    $(document).ready(function(){
        $('#${name!?replace(".", "_")}').cdatepicker({
            showOn: "button",
            buttonImage: "${contextPath}/css/images/calendar.png",
            buttonImageOnly: true,
            changeMonth: true,
            changeYear: true
            <#if element.properties.enableTime! == 'true'>
                 ,datePickerType: "dateTime"
                 ,timeOnlyTitle : "@@form.datepicker.chooseTime@@"
                 ,timeText : "@@form.datepicker.time@@"
                 ,hourText : "@@form.datepicker.hour@@"
                 ,minuteText : "@@form.datepicker.minute@@"
                 ,currentText : "@@form.datepicker.now@@"
                 ,closeText : "@@form.datepicker.done@@"
            </#if>
            <#if element.properties.format! != ''>
                ,dateFormat: "${element.properties.format}"
            </#if>
            <#if element.properties.yearRange! != ''>
                ,yearRange: "${element.properties.yearRange}"
            </#if>
            <#if element.properties.firstday! != ''>
                ,firstDay: "${element.properties.firstday}"
            </#if>
            <#if isBE! && element.properties.datePickerType! != 'timeOnly'>
                ,isBE: true
                ,autoConversionField: false
            </#if>
            <#if isRTL!>
                ,isRTL: true
            </#if>
        });
        //reset to empty when click
        $('#${name!?replace(".", "_")}').click(function(){
            $(this).val('');
        });
    });
</script>