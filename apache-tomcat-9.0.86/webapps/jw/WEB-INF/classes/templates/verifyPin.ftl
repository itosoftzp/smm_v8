<#if updated! == "true">
    <script>
        parent.window.location = '${redirectUrl!}';
    </script>
</#if>
    <div id="main-body-header">
        @@totp.pleaseKeyIn@@
    </div>
    <div id="main-body-content">
        <#if error??>
            <div class="form-errors">
                ${error!}
            </div>
        </#if>
        <form id="verifyPin" action="${url!}" class="form" method="POST">
            <fieldset>
                <div class="form-row">
                    <label for="pin">@@totp.pin@@ *</label>
                    <span class="form-input"><input id="pin" name="pin" type="text" value=""/></span>
                </div>
            </fieldset>
            <div class="form-buttons">
                <input class="form-button btn button" type="submit" value="Submit" />
            </div>
        </form>
    </div>