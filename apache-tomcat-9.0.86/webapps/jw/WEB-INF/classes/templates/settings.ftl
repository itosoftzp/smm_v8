<div class="main-body-content-subheader">
    <span>@@adminBar.label.system@@</span>
</div>
<div class="main-body-row">
    <span class="row-content">
        <div class="form-row">
            <label for="version">@@console.app.common.label.version@@</label>
            <span class="form-input">
                @@enterprise.console.footer.message@@
                <br>
                @@console.footer.label.revision@@
            </span>
        </div>
        <#if showSysinfoLink>
        <div id="sysinfoLinkDiv" class="form-row">
            <label for="sysinfoLink">&nbsp;</label>
            <span class="form-input">
                <a id="sysinfoLink" class="smallbutton" href="${request.contextPath}/web/console/setting/sysinfo" target="_blank">@@enterprise.console.label.sysinfo@@</a>
            </span>
        </div>
        </#if>
    </span>
</div>            
<div class="main-body-row">
    <span class="row-content">
        <div class="form-row">
            <label for="licenseInfo">@@enterprise.console.label.license@@</label>
            <span class="form-input">
                ${licenseInfo}
            </span>
        </div>
        <#if showLicenseLink>
        <div id="licenseLinkDiv" class="form-row">
            <label for="licenseLink">&nbsp;</label>
            <span class="form-input">
                <a id="licenseLink" class="smallbutton" href="@@license.purchase.url@@" target="_blank">@@license.purchase@@</a>
            </span>
        </div>
        </#if>
    </span>
</div>            
