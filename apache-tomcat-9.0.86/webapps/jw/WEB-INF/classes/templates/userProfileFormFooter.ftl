<#if mfaAuthenticator?? >
    <fieldset>
        <legend>@@app.edm.label.mpfAuthenticator@@</legend>
        <div class="form-row">
            <label for="mfa">${mfaAuthenticator!}</label>
            ${mfaAuthenticatorProfileHtml!}
        </div>
    </fieldset>
</#if>
<script>
    $(document).ready(function(){
        $("#email").closest(".form-row").find("> label").append(' <span class="mandatory" style="color:red">*</span>');
    });
</script>