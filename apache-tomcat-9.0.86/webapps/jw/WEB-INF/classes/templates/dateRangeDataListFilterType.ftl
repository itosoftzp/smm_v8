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
<#if element.properties.showFieldLabel! == 'true'>
    <span class="dateRangeLabel">${label!?html}</span>
</#if>
<div style="display:inline-block;position:relative;"><input id="${name!?replace(".", "_")}_from" name="${name!}" type="text" size="10" value="${value1!?html}" readonly="readonly" class="datepicker from no-manual-input" placeholder="${element.properties.fromLabel!?html}"/></div>
<span class="dateRangeSeparator"> - </span>
<div style="display:inline-block;position:relative;"><input id="${name!?replace(".", "_")}_to" name="${name!}" type="text" size="10" value="${value2!?html}" readonly="readonly" class="datepicker to no-manual-input" placeholder="${element.properties.toLabel!?html}"/></div>
<#assign newName = name!?replace("-", "") >

<script type="text/javascript">
    $(document).ready(function(){
        $('#${name!?replace(".", "_")}_from, #${name!?replace(".", "_")}_to').cdatepicker({
            showOn: "button",
            buttonImage: "${contextPath}/css/images/calendar.png",
            buttonImageOnly: true,
            changeMonth: true,
            changeYear: true,
            <#if element.properties.enableTime! == 'true'>
                 datePickerType: "dateTime",
                 timeOnlyTitle : "@@form.datepicker.chooseTime@@",
                 timeText : "@@form.datepicker.time@@",
                 hourText : "@@form.datepicker.hour@@",
                 minuteText : "@@form.datepicker.minute@@",
                 currentText : "@@form.datepicker.now@@",
                 closeText : "@@form.datepicker.done@@",
            </#if>
            onSelect: function( selectedDate ) {
                ${newName!?replace(".", "_")}_limit_date_range(this, selectedDate);
            }
            <#if element.properties.format! != ''>
                ,dateFormat: "${element.properties.format!}"
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
        $('#${name!?replace(".", "_")}_from, #${name!?replace(".", "_")}_to').off("click.clear");
        $('#${name!?replace(".", "_")}_from, #${name!?replace(".", "_")}_to').on("click.clear", function(){
            $(this).val('');
            ${newName!}_limit_date_range(this, '');
        });

        //set limit when value is not empty
        <#if value1??> 
            ${newName!?replace(".", "_")}_limit_date_range($('#${name!?replace(".", "_")}_from'), '${value1!?js_string}');
        </#if>
        <#if value2??> 
            ${newName!?replace(".", "_")}_limit_date_range($('#${name!?replace(".", "_")}_to'), '${value2!?js_string}');
        </#if>
    });

    function ${newName!?replace(".", "_")}_limit_date_range(element, selectedDate){
        try {
            var type = $(element).hasClass("from") ? "minDate" : "maxDate";
            $(element).cdatepicker("setDateRange", $(element), type, $("#${name!?replace(".", "_")}_from, #${name!?replace(".", "_")}_to").not(element), $(element).data("options"));
        } catch(err) {}    
    }
</script>