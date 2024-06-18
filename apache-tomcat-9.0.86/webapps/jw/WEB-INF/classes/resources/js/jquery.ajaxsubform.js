(function($){
    $.fn.extend({
        ajaxSubForm : function(o){
            var target = this;
            if($(target)){
                if(o.ajax == 'true' && o.parentSubFormId !== ""){
                    FormUtil.setControlField(o.parentSubFormId);
                    
                    var load = function() {
                        loadSubForm(target, o);
                    };
                    
                    $('body').off("change", '[name='+o.parentSubFormId+']:not(form)', load);
                    $('body').on("change", '[name='+o.parentSubFormId+']:not(form)', load);
                }
                if(o.collapsible == 'true'){
                    var link = $('<a class="collapsible_ajax_subform" href="#"></a>');
                    $(target).before(link);
                    toggleCollapsibleSubForm(link, target, o, true);
                    $(link).click(function(){
                        toggleCollapsibleSubForm(link, target, o, false);
                        return false;
                    });
                }
                if(o.collapsibleNoLoad !== 'true' && o.parentSubFormId !== ""){
                    hideEmpty(target, o);
                    loadSubForm(target, o);
                }
            }
            return target;
        }
    });
    
    function toggleCollapsibleSubForm(link, target, o, load){
        var show = $(link).hasClass('collapsible-hidden');
        
        if (load) {
            if(o.collapsibleNoLoad !== 'true'){
                if(o.collapsibleExpanded === 'true'){
                    show = true;
                }else{
                    show = false;
                }
            } else {
                //initially follow the expand by default setting, after that is depend on the collapsible status
                if(!$(link).hasClass('collapsible-show') && !$(link).hasClass('collapsible-hidden') && o.collapsibleExpanded === 'true'){
                    show = true;
                } else if ($(target).attr("loadedValue") !== "" && $(link).hasClass('collapsible-show')) {
                    show = true;
                } else {
                    show = false;
                }
            }
        }
        
        if ($(target).find(".form-error-message").length > 0) {
            show = true;
        }
        
        if(show){
            $(link).removeClass('collapsible-hidden');
            $(link).addClass('collapsible-show');
            $(link).html('<span>'+o.collapsibleLabelExpanded+'</span>');
            $(target).removeClass('collapsible-hidden');
            $(target).addClass('collapsible-show');
            
            if(o.collapsibleNoLoad === 'true'){
                loadSubForm(target, o);
            }
        
            $(target).show();
        }else{
            $(link).removeClass('collapsible-show');
            $(link).addClass('collapsible-hidden');
            $(link).html('<span>'+o.collapsibleLabelCollapsed+'</span>');
            $(target).removeClass('collapsible-show');
            $(target).addClass('collapsible-hidden');
            removeHtmlWhenHideOrcollapsed(target, o);
            $(target).hide();
        }
    }
    
    function loadSubForm(target, o){
        if ((o.collapsibleNoLoad === 'true' && $(target).hasClass('collapsible-show')) || o.collapsibleNoLoad !== 'true') {
            var primaryKey;
            if (o.parentSubFormId === "_FORM_META_ORIGINAL_ID") {
                primaryKey = o.parentPrimaryKeyValue;
            } else {
                primaryKey = FormUtil.getValue(o.parentSubFormId);
            }
            var loadedValue = $(target).attr("loadedValue");
            
            if (primaryKey === undefined) {
                primaryKey = null;
            }

            if($(target).attr("disabled") != "true" && loadedValue != primaryKey){
                $(target).attr("loadedValue", primaryKey);
                $(target).html('<img src="'+o.contextPath+'/images/v3/loading.gif" />');
                $.ajax({
                    type: "POST",
                    data: {
                        id : o.id,
                        label : o.label,
                        formDefId : o.formDefId,
                        readOnly : o.readOnly,
                        readOnlyLabel : o.readOnlyLabel,
                        noframe : o.noframe,
                        primaryKey : primaryKey,
                        prefix : o.prefix,
                        processId : o.processId,
                        appId : o.appId,
                        appVersion : o.appVersion,
                        _nonce : o.nonce
                    },
                    dataType : "text",
                    url: o.contextPath + '/web/json/plugin/org.joget.plugin.enterprise.AjaxSubForm/service',
                    success: function(response) {
                        $(target).html(response);
                        if(o.collapsible == 'true'){
                            var link = $(target).prev('a.collapsible_ajax_subform');
                            toggleCollapsibleSubForm(link, target, o, true);
                        }
                        removeHtmlWhenHideOrcollapsed(target, o);
                        $("body").trigger("dynamicContentLoaded", [$(target)]);
                    }
                });
            }
        }
        removeHtmlWhenHideOrcollapsed(target, o);
    }
    
    function removeHtmlWhenHideOrcollapsed(target, o) {
        hideEmpty(target, o);
        if (o.collapsibleNoLoad === 'true') {
            if ($(target).hasClass('collapsible-hide') || $(target).is(":hidden")) {
                var primaryKey;
                if (o.parentSubFormId === "_FORM_META_ORIGINAL_ID") {
                    primaryKey = o.parentPrimaryKeyValue;
                } else {
                    primaryKey = FormUtil.getValue(o.parentSubFormId);
                }
                var loadedValue = $(target).attr("loadedValue");

                if($(target).attr("disabled") !== "true" && (loadedValue !== primaryKey || loadedValue === "")){
                    $(target).html("");
                    $(target).attr("loadedValue", "");
                }
            }
        }
    }
    
    function hideEmpty(target, o) {
        if (o.hideEmpty == 'true') {
            var primaryKey;
            if (o.parentSubFormId === "_FORM_META_ORIGINAL_ID") {
                primaryKey = o.parentPrimaryKeyValue;
            } else {
                primaryKey = FormUtil.getValue(o.parentSubFormId);
            }
            if (primaryKey == undefined || primaryKey == "") {
                //To handle "hideEmpty" causing the element is not visible in form builder
                if($(target).closest(".subform-cell, .form-cell").is('[data-cbuilder-classname]')){
                    $(target).closest(".subform-cell, .form-cell").attr("data-cbuilder-invisible", "");
                } else {
                    $(target).parent().hide();
                }
            } else {
                $(target).parent().show();
            }
        }
    }
    
})(jQuery);