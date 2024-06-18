<fieldset>
    <legend>@@app.edm.label.adminSetting@@</legend>
    <div class="form-row">
        <label for="field1">@@app.edm.label.generateRandomPassword@@</label>
        <span class="form-input">
            <input type="checkbox" id="generateRandomPassword" ${generateRandomPassword!} name="generateRandomPassword"/>
        </span>
    </div> 
    <div class="form-row">
        <label for="field1">@@app.edm.label.noPasswordExpiration@@</label>
        <span class="form-input">
            <input type="checkbox" id="noPasswordExpiration" name="noPasswordExpiration" ${noPasswordExpiration!}/>
        </span>
    </div>
</fieldset>
<script>
    $(document).ready(function(){
        $("#email").closest(".form-row").find("> label").append(' <span class="mandatory">*</span>');
        $('#generateRandomPassword').change(function () {
            hideShowPassword();
        });
        hideShowPassword();
    });

    function hideShowPassword() {
        if ($('#generateRandomPassword').prop("checked")) {
            $("#password, #confirmPassword").parent().parent().hide();
            $("#password, #confirmPassword").each(function(){
                $(this).attr("name", $(this).attr("name") + "_");
            });
        } else {
            $("#password, #confirmPassword").parent().parent().show();
            $("#password, #confirmPassword").each(function(){
                $(this).attr("name", $(this).attr("name").replace("_", ""));
            });
        }
    }
</script>