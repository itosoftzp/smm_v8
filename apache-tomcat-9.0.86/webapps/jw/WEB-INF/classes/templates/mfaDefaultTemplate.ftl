<input type="hidden" id="${name!}" name="${name!}" value="${data!}" />
<span class="form-input deactivate" <#if !mfaEnabled>style="display:none;"</#if>><input class="form-button btn button" type="button" value="@@app.edm.label.deactivate@@" onclick="disabledMfa()"/></span>
<span class="form-input activate" <#if mfaEnabled>style="display:none;"</#if>><input class="form-button btn button" type="button" value="@@app.edm.label.activate@@" onclick="popupMfa()"/></span>
<script>
    var popupActionDialog;
    window.updateMFa = function(data) {
        if (popupActionDialog !== undefined && popupActionDialog !== null) {
            popupActionDialog.close();
        }
        $("#${name!}").val(data);
        if (data !== "") {
            $(".deactivate").show();
            $(".activate").hide();
        } else {
            $(".deactivate").hide();
            $(".activate").show();
        }
    };
    function popupMfa() {
        popupActionDialog = new PopupDialog('${mfaActivateURL!}');
        popupActionDialog.init();
        return false;
    }
    function disabledMfa() {
        updateMFa("");
        return false;
    }
</script>