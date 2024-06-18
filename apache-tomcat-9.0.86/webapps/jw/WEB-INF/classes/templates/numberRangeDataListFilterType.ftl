<script type="text/javascript" src="${contextPath}/plugin/org.joget.apps.datalist.lib.TextFieldDataListFilterType/js/jquery.placeholder.min.js"></script>
<#if element.properties.showFieldLabel! == 'true'>
    <span class="numberRangeLabel">${label!?html}</span>
</#if>
<input id="${name!?replace(".", "_")}_min" name="${name!}" type="number" step="any" value="${value1!?html}" class="min" placeholder="${element.properties.minLabel!?html}"/>
<span class="numberRangeSeparator"> - </span>
<input id="${name!?replace(".", "_")}_max" name="${name!}" type="number" step="any" value="${value2!?html}" class="max" placeholder="${element.properties.maxLabel!?html}"/>