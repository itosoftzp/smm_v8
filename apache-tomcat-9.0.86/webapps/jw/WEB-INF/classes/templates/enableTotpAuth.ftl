    <div id="main-body-header">
        @@totp.enable@@
    </div>
    <div id="main-body-content">
        <#if updated! == "true">
            <p>@@totp.activated@@</p>
        <#else>
            <#if error??>
                <div class="form-errors">
                    ${error!}
                </div>
            </#if>
            <form id="enableTotpAuth" action="?a=etotps" class="form" method="POST">
                <fieldset>
                    <div class="form-row">
                        <label for="secret">@@totp.secretKey@@</label>
                        <span class="form-input">${secret!}<br/><img src="${barcodeUrl!}"/>
                        </span>
                        <input id="secret" name="secret" type="hidden" value="${secret!}"/>
                    </div>
                    <div class="form-row">
                        <label for="pin">@@totp.pin@@ *</label>
                        <span class="form-input"><input id="pin" name="pin" type="text" value=""/></span>
                    </div>
                </fieldset>
                <div class="form-buttons">
                    <input class="form-button btn button" type="submit" value="Submit" />
                </div>
            </form>
        </#if>
    </div>