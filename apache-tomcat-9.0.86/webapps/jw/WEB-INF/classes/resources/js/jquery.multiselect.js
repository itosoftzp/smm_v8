(function($) {

    var methods = {
        init: function(options) {
            return this.each(function() {
                var element = $(this);

                // check for settings
                var readOnly = false;
                if (options && options.readOnly) {
                    element.attr("readonly", "true");
                    readOnly = true;
                }
                
                var width = "40%";
                if (options && options.width !== undefined &&  options.width !== "") {
                    width = options.width;
                }
                if ($(window).width() <= 767) {
                    width = "100%";
                }

                if ($("body").hasClass("rtl")) {
                    $(element).addClass("chosen-rtl");
                }
                
                var getPlaceholder = function() {
                    var placeholder = "";
                    if ($(element).find("option[value=\"\"]").length > 0) {
                        placeholder = $(element).find("option[value=\"\"]").text();
                        $(element).find("option[value=\"\"]").text("");
                    }
                    if (placeholder === "") {
                        placeholder = " ";
                    }
                    return placeholder;
                };
                
                $(element).chosen({width: width, placeholder_text : getPlaceholder()});
                
                if (!readOnly) {
                    if (options && options.controlField != undefined && options.controlField != "") {
                        $(element).dynamicOptions({
                            controlField : options.controlField,
                            paramName : options.paramName,
                            type : "selectbox",
                            readonly : options.readOnly,
                            nonce : options.nonce,
                            binderData : options.binderData,
                            appId : options.appId,
                            appVersion : options.appVersion,
                            contextPath : options.contextPath
                        });
                        
                        $(element).off("change");
                        $(element).on("change", function(){
                            $(".chosen-select").chosen({placeholder_text: getPlaceholder()}); 
                            $(element).trigger("chosen:updated");
                        });
                        $(element).off("jsection:hide");
                        $(element).on("jsection:hide", function(){
                            $(element).trigger("chosen:updated");
                        });
                        $(element).off("jsection:show");
                        $(element).on("jsection:show", function(){
                            $(element).trigger("chosen:updated");
                        });
                        setTimeout(function(){
                            $(element).trigger("chosen:updated");
                        }, 200);
                    }
                    setTimeout(function(){
                        var sf = $(element).parent().next().find('input').first();
                        $(sf).unbind("focus.chosen");
                        $(sf).off("blur.multiselect");
                        $(sf).on("blur.multiselect", function(){
                            $(element).parent().next().addClass("chosen-container-active");
                            $(element).trigger("chosen:close");
                        }); 
                    }, 1);
                } else {
                    $(element).prop('disabled', true).trigger("chosen:updated").prop('disabled', false);
                }
                
                var hidden = $(element).closest(".ui-screen-hidden");
                $(hidden).find(".chosen-container").insertAfter(hidden);
            });
        }
    };

    $.fn.multiselect = function(method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.multiselect');
        }

    };

})(jQuery);
