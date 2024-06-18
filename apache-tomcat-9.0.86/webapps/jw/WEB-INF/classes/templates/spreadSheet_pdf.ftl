<div class="form-cell full_width_field" ${elementMetaData!}>
    <label class="label">${element.properties.label!} <span class="form-cell-validator">${decoration}${customDecorator!}</span><#if error??> <span class="form-error-message">${error}</span></#if></label>
    <div class="form-clear"></div>
    <div class="spreadsheet_container">
        <table cellspacing="0" style="width:100%;"  class="tablesaw grid tablesaw-stack" data-tablesaw-mode="stack">
            <thead>
            <tr>
            <#if element.properties.showRowNumber?? && element.properties.showRowNumber! != "">
                <th></th>
            </#if>
            <#list headers?keys as header>
                <#assign width = "">
                <#if headers[header]['width']?? && headers[header]['width'] != "">
                    <#assign width = "width:" + headers[header]['width'] >
                </#if>
                <th id="${elementParamName!}_${header?html}" style="${width}">${headers[header]['label']!}</th>
            </#list>
            </tr>
            </thead>
            <tbody>
            <#list rows as row>
                <tr class="grid-row" id="{elementParamName!}_row_${row_index}">
                    <#if element.properties.showRowNumber?? && element.properties.showRowNumber! != "">
                        <td><span class="grid-cell rowNumber">${row_index + 1}</span></td>
                    </#if>
                <#list headers?keys as header>
                    <td>
                        <span class="grid-cell">
                            <#attempt>
                                ${element.formatColumn(header, headers[header], row["id"], row[header], appId, appVersion, request.contextPath)}
                            <#recover>
                                ${row[header]!?html}
                            </#attempt>
                        </span>
                    </td>
                </#list>
                </tr>
            </#list>
            </tbody>
        </table>
    </div>
</div>