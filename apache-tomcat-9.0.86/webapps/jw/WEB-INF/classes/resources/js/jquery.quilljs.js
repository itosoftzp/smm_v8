(function($){
    $.fn.extend({
        quillrichtext : function(o){
            var target = this;
    
         
            var fixIndent = function(html) {
                var temp = $("<div>");
                $(temp).html(html);
                if ($(temp).find("li[class*='ql-indent-']").length > 0) {
                    var listStyleOl = ['decimal', 'lower-alpha', 'lower-roman'];
                    var listStyleUl = ['disc'];                    
                    $.each(['ul','ol'], function(i, type) {
                        $(temp).find(type).each(function(j, list){
                            $.each([9,8,7,6,5,4,3,2,1], function(k, qlindent) {
                                $(list).find(".ql-indent-"+qlindent).each(function(l, li){
                                    var parent = $(li).prev();
                                    if (parent.length === 0){                                 
                                        parent = $(list);
                                    }
                                    var padding = qlindent * 30;

                                    if ($(parent).find("> " + type).length === 0) {
                                        var listStyleType;                                      
                                        if (type === 'ol') {
                                            listStyleType = listStyleOl[(qlindent % 3)];
                                        } else {
                                            listStyleType = listStyleUl[(qlindent % 1)];
                                    }

                                        if (parent.hasClass("ql-indent-"+(qlindent-1)) || (parent.attr("class") === "" && $(li).hasClass("ql-indent-1"))) {
                                            $(parent).append("<" + type + " class=\"ql-cindent-" + qlindent + "\" style=\"list-style-type:" + listStyleType + ";\"></" + type + ">");
                                        } else {                                
                                            $(parent).append("<" + type + " class=\"ql-cindent-" + qlindent + "\" style=\"list-style-type:" + listStyleType + ";padding-left: " + padding + "px;\"></" + type + ">");
                                        }                                       
                                    }                 
                                    $(li).removeClass("ql-indent-"+qlindent);
                                    $(parent).find("> " + type).append(li);
                                });
                            });
                        });
                    });
                    html = $(temp).html();
                }
                $(temp).remove();
                return html;
            }
            
            var breakIndent = function(html) {
                var temp = $("<div>");
                $(temp).html(html);
                
                if ($(temp).find("ul[class*='ql-cindent-'], ol[class*='ql-cindent-']").length > 0) {
                    $.each([9,8,7,6,5,4,3,2,1], function(k, qlindent) {
                        $(temp).find("ul.ql-cindent-"+qlindent+", ol.ql-cindent-"+qlindent).each(function(i, list){
                            $(list).find("li").addClass("ql-indent-"+qlindent);
                            $(list).children().appendTo($(list).parent());
                            $(list).remove();
                        });
                    });                  
                    html = $(temp).html();
                }
                $(temp).remove();
                return html;
            }
   
            var id = $(target).attr("id");
            var html = $(target).text();
            $("[id='"+id+"_editor']").html(breakIndent(html));
            
            var height = 350;
            if (!(o.height === undefined || o.height === "")) {
                try {
                    height = parseInt(o.height);
                } catch (err) {}
            }
            
            var toolbarOptions = [
                [{ 'font': [] }, { 'header': [] }],
                [{ 'color': [] }, { 'background': [] }],
                ['bold', 'italic', 'underline', 'strike'],        
                [{ 'script': 'sub'}, { 'script': 'super' }],
                ['blockquote', 'code-block'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' },{ 'indent': '-1'}, { 'indent': '+1' }, {'align': []}],
                ['link', 'image', 'video', 'formula'],
                [{ 'direction': 'rtl' }, 'clean']                                        
            ];
            
            var simpleToolbarOptions = [
                [{ 'header': [] }],
                ['bold', 'italic', 'underline'],        
                ['blockquote', 'code-block'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['link', 'image'],
                ['clean']                               
            ];
            
            var inlineToolbarOptions = [
                ['bold', 'italic','link', 'image', 'blockquote', { 'list': 'ordered'}, { 'list': 'bullet' }, {'align': []}, { 'header': [] }, 'clean']                                        
            ];
            
            var switchEditor = function(target, o, mode, height) {
                var editor = $(target).data("editor");
                var id = $(target).attr("id");
                var html = $(target).text();
                $("[id='"+id+"_editor_container']").html('<div id="'+id+'_editor"></div>');
                $("[id='"+id+"_editor']").html(breakIndent(html));
                
                iniEditor(target, o, mode, height);
            };
            
            var iniEditor = function(target, o, mode, height) {
                var id = $(target).attr("id");
                $("[id='"+id+"_editor']").css("min-height", height + "px");
                
                var options = {
                    placeholder: '',
                    theme: 'snow',
                    placeholder: o.placeholder,
                    modules: {
                        imageUpload: {
                            url: o.serviceUrl, 
                            method: 'POST', 
                            name: o.paramName, 
                            withCredentials: false,
                            callbackOK: function(json, next) {
                                if (json !== null && json.error !== undefined) {
                                    alert(json.error);
                                } else if (!json || typeof json.filename != 'string') {
                                    return;
                                }
                                next(o.serviceUrl + "&_path=" + encodeURIComponent(json.path));
                            },
                            callbackKO: function(serverError) {
                                alert(serverError);
                            }
                        },
                        imageResize: {}
                    }
                };
                
                var ua = window.navigator.userAgent;
                var msie = ua.indexOf("MSIE "); //ie10 and below
                var trident = ua.indexOf('Trident/'); //ie11
                if (msie > 0 || trident > 0) {
                    options.modules.keyboard = {
                        bindings: {
                            list: {
                                key: 'backspace',
                                context: { format: ['list'] },
                                handler: function (range, context) { 
                                    if (range.length === 0 && range.index > 0) { 
                                        this.quill.deleteText(range.index - 1, 1, Quill.sources.USER); 
                                    } else if (range.length > 0) {
                                        this.quill.deleteText(range.index, range.length, Quill.sources.USER); 
                                    }
                                }
                            }
                        }
                    };
                }
                
                if (mode === "inline") {
                    options.theme = "bubble";
                    options.modules.toolbar = inlineToolbarOptions;
                } else if (mode === "full") {
                    options.modules.toolbar = toolbarOptions;
                } else {
                    options.modules.toolbar = simpleToolbarOptions;
                }
                
                if (o.switch === "true") {
                    options.modules.switcher = {
                        mode : mode,
                        target : "[id='"+id+"']",
                        onEvent : 'switchOn',
                        offEvent : 'switchOff'
                    };
                }
                
                //to support custom settings added in plugin configuration, this allow adding custom formatting
                if (o.customSettings !== null && o.customSettings !== undefined && o.customSettings.startsWith("{") && o.customSettings.endsWith("}") ) {
                    try {
                        var customSettings = "[" + o.customSettings + "]";
                        var customSettingsObj = eval(customSettings);
                        options = $.extend( options, customSettingsObj[0]);
                    } catch (err) {}
                }
                
                var editor = new Quill("[id='"+id+"_editor']", options);
                editor.on('text-change', function() {
                    var html = editor.root.innerHTML;
                    $(target).text(fixIndent(html));
                });
                
                editor.on('selection-change', function(range, oldRange, source) {
                    if (range === null && oldRange !== null) {
                        $("[id='"+id+"_editor']").removeClass('focus');
                    } else if (range !== null && oldRange === null)
                        $("[id='"+id+"_editor']").addClass('focus');
                    }
                );
                
                $(target).off('switchOn')
                    .off('switchOff')
                    .on('switchOn', function() {
                        switchEditor(target, o, o.mode, height);
                    })
                    .on('switchOff', function() {
                        switchEditor(target, o, "inline", height);
                    });
                    
                $(target).off('focusable').on('focusable', function(){
                    editor.focus();
                });  
                   
                $(target).text(fixIndent(editor.root.innerHTML));
                $(target).data("editor", editor);
            };
            
            if (o.mode === "inline" && o.inlineSwitch !== "") {
                if (o.inlineSwitch === "full") {
                    o.mode = "full";
                } else {
                    o.mode = "";
                }
                o.switch = "true";
                iniEditor(target, o, "inline", height);
            } else {
                iniEditor(target, o, o.mode, height);
            }
        }
    });
})(jQuery);
