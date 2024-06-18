(function($){
    $.fn.extend({
        multiPagedForm : function(args){
            var target = this;
            
            var changePage = function(num) {
                $(target).find("> .cPageNum").val(num);
                $(target).find("> .page-container > .page").removeClass("current").hide();
                $(target).find("> .page-nav-panel > ul > .nav_item").removeClass("current").find("button").removeAttr("disabled");
                $(target).find("> .page-nav-panel > ul > .nav_item button[rel='"+num+"']").attr("disabled", "disabled").parent().addClass("current");
                var current = $(target).find("> .page-container > .page[data-pagenum='"+num+"']").addClass("current").show();
                
                if ($(current).find("> .no_data_loaded_input, > .data_loaded_input").length > 0) {
                    $(current).append('<img src="'+args.contextPath+'/images/v3/loading.gif" />');
                    loadPage(current, num);
                }
                
                var prev = $(current).prev(".page");
                if ($(prev).length > 0) {
                    $(target).find("> .page-button-panel > input.page-button-prev, > .page-button-panel > .page-button-prev input").removeAttr("disabled");
                } else {
                    $(target).find("> .page-button-panel > input.page-button-prev, > .page-button-panel > .page-button-prev input").attr("disabled", "disabled");
                }
                var next = $(current).next(".page");
                if ($(next).length > 0) {
                    $(target).find("> .page-button-panel > input.page-button-next, > .page-button-panel > .page-button-next input").removeAttr("disabled");
                    if (args.submitOnLastPage === "true") {
                        $(target).parents("form").find("#section-actions input[type='submit']").attr("disabled", "disabled");
                    }
                } else {
                    $(target).find("> .page-button-panel > input.page-button-next, > .page-button-panel > .page-button-next input").attr("disabled", "disabled");
                    $(target).parents("form").find("#section-actions input[type='submit']").removeAttr("disabled");
                }
            };
            
            //listen to parent section show/hide event to enable & disable the submit button
            if (args.submitOnLastPage === "true") {
                var name = $(target).find("> .cPageNum").attr("name");
                var section = $(target).closest(".subform-section, .form-section");
                $(section).off("jsection:show."+name+"_visible jsection:hide."+name+"_visible");
                $(section).on("jsection:show."+name+"_visible jsection:hide."+name+"_visible", function() {
                    if ($(target).find("> .cPageNum").hasClass("section-visibility-disabled")) {
                        //the multi paged form is hidden
                        $(target).parents("form").find("#section-actions input[type='submit']").removeAttr("disabled");
                    } else {
                        //check is there a next page
                        var current = $(target).find("> .page-container > .page.current");
                        var next = $(current).next(".page");
                        if ($(next).length > 0) {
                            $(target).parents("form").find("#section-actions input[type='submit']").attr("disabled", "disabled");
                        }
                    }
                });
            }
            
            var prevPage = function() {
                var current = $(target).find("> .page-container > .page.current");
                var prev = $(current).prev(".page");
                if ($(prev).length > 0) {
                    var pagenum = $(prev).data("pagenum");
                    changePage(pagenum);
                }
            };
            
            var nextPage = function() {
                var current = $(target).find("> .page-container > .page.current");
                var next = $(current).next(".page");
                if ($(next).length > 0) {
                    var pagenum = $(next).data("pagenum");
                    changePage(pagenum);
                }
            };
            
            var loadPage = function(current, num) {
                const formData = new FormData(); //using formdata to handle multiple values field
                formData.append("_id", $(current).data("id"));
                formData.append("_formDefId", $(current).data("formdefid"));
                formData.append("_readonly", $(current).data("readonly"));
                formData.append("_readonlyLabel", $(current).data("readonlylabel"));
                formData.append("_recordId", $(current).data("recordid"));
                formData.append("_pageNum", $(current).data("pagenum"));
                formData.append("_primaryKey", args.primaryKey);
                formData.append("_processId", args.processId);
                
                var formErrors = $(target).parents("form").find("[name='_FORM_ERRORS']");
                if ($(formErrors).length > 0) {
                    formData.append("_FORM_ERRORS", $(formErrors).val());
                }
                if ($(current).find("> .data_loaded_input").length > 0) {
                    $(current).find("input[type='hidden']").each(function(){
                        var name = $(this).attr("name");
                        if (name !== undefined && name !== null && name !== "") {
                            formData.append(name, $(this).val());
                        }
                    });
                }
                
                $.ajax({
                    type: "POST",
                    data: formData,
                    processData: false, //required when using formdata
                    contentType: false, //required when using formdata
                    dataType : "text",
                    url: args.serviceURL,
                    success: function(response) {
                        $(current).html(response);
                        $("body").trigger("dynamicContentLoaded", [$(current)]);
                    }
                });
            };
            
            if($(target)){
                if (args !== undefined && args  !== null && args.ajaxMode !== undefined && args.ajaxMode !== null && args.ajaxMode === "true") {
                    $(target).find("> .page-nav-panel > ul > li.nav_item button").off("click");
                    $(target).find("> .page-nav-panel > ul > li.nav_item button").on("click", function(e){
                        e.preventDefault();
                        e.stopImmediatePropagation();
                        var pageNum = $(this).attr("rel");
                        changePage(pageNum);
                        return false;
                    });
                    
                    $(target).find("> .page-button-panel > input.page-button-prev, > .page-button-panel > .page-button-prev input").off("click");
                    $(target).find("> .page-button-panel > input.page-button-prev, > .page-button-panel > .page-button-prev input").on("click", function(e){
                        e.preventDefault();
                        prevPage();
                        return false;
                    });
                    
                    $(target).find("> .page-button-panel > input.page-button-next, > .page-button-panel > .page-button-next input").off("click");
                    $(target).find("> .page-button-panel > input.page-button-next, > .page-button-panel > .page-button-next input").on("click", function(e){
                        e.preventDefault();
                        nextPage();
                        return false;
                    });
                } else {
                    $(target).find("> .page-nav-panel > ul > li.nav_item button").off("click");
                    $(target).find("> .page-nav-panel > ul > li.nav_item button").on("click", function(e){
                        e.stopImmediatePropagation();
                        var pageNum = $(this).attr("rel");
                        $(target).find("> .changePage").val(pageNum);
                        return true;
                    });
                }
                
                //trigger click event when it is click on the step number instead of the button
                $(target).find("> .page-nav-panel > ul > li.nav_item").off("click");
                $(target).find("> .page-nav-panel > ul > li.nav_item").on("click", function(){
                    $(this).find("button").trigger("click");
                    return false;
                });
            }
            return target;
        }
    });
})(jQuery);