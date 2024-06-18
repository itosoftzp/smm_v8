<div class="form-cell full_width_field" ${elementMetaData!}>
    <#if !(request.getAttribute("org.joget.plugin.enterprise.SpreadSheetGrid")??) >
        <link href="${request.contextPath}/plugin/org.joget.plugin.enterprise.SpreadSheetGrid/js/handsontable/handsontable.full.min.css" rel="stylesheet" type="text/css" />
        <script type="text/javascript" src="${request.contextPath}/wro/spreadsheet.min.js"></script>
    </#if>
    <label field-tooltip="${elementParamName!}" class="label">${element.properties.label!} <span class="form-cell-validator">${decoration}${customDecorator!}</span><#if error??> <span class="form-error-message">${error}</span></#if></label>
    <div class="form-clear"></div>
    <div class="spreadsheet_container">
        <div id="spreadsheet_${elementParamName!}_${element.properties.elementUniqueKey!}" name="${elementParamName!}" class="spreadsheet form-element <#if element.properties.readonly! == 'true'>readonly</#if>" data-maxheight="${element.properties.maxHeight!}">
            <textarea name="${elementParamName!}_JSON_DATA" class="jsonDataContainer" style="display:none" ></textarea>
        </div>
    </div>
    
    <script>
    $(document).ready(function() {
        $("#spreadsheet_${elementParamName!}_${element.properties.elementUniqueKey!}").jwspreadsheet(${settings}, {
            datepicker : {
                previousMonth : '@@form.spreadsheet.i18n.date.previousMonth@@',
                nextMonth     : '@@form.spreadsheet.i18n.date.nextMonth@@',
                months        : [@@form.spreadsheet.i18n.date.months@@],
                weekdays      : [@@form.spreadsheet.i18n.date.weekdays@@],
                weekdaysShort : [@@form.spreadsheet.i18n.date.weekdaysShort@@]
            }
        });
    });
    </script>
</div>