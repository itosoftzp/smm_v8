{
    templates : [%s],
    getData: function(useDefault) {
        var data = new Object();
        if (!this.isHidden()) {
            var value = this.codeeditor.getValue();
            if (value === undefined || value === null || value === "") {
                if (useDefault !== undefined && useDefault &&
                    this.defaultValue !== undefined && this.defaultValue !== null) {
                    value = this.defaultValue;
                }
            }
            data[this.properties.name] = value;
        }
        return data;
    },
    renderField : function() {
        
        var html = '<div class="template_editor_container" style="overflow:hidden;">';
        html += '<div class="actions"><a class="choosetemplate btn button small" style="margin-left:0px;">@@userview.infotile.chooseTemplate@@</a> <a class="edittemplate btn button small">@@userview.infotile.editTemplate@@</a> <a style="display:none;" class="hideedit btn button small">@@userview.infotile.hideTemplateEditor@@</a></div>';
        html += '<div class="editor" style="margin-top:10px; display:none;"><pre id="' + this.id + '" name="' + this.id + '" class="ace_editor"></pre></div>';
        html += '<div class="sample_container" style="margin-top:10px; padding:10px; border:1px solid #ced4da; background:#fff; border-radius:5px;"><label>@@userview.infotile.sample@@</label><div class="sample_preview"></div></div>';
        html += '</div>';
        
        return html;
    },
    initScripting: function() {
        var thisObj = this;
        
        var container = $("#" + this.id).closest('.template_editor_container');
        
        $(container).find(".choosetemplate").off("click");
        $(container).find(".choosetemplate").on("click", function() {
            thisObj.showTemplateChooser();
        });
        
        $(container).find(".edittemplate").off("click");
        $(container).find(".edittemplate").on("click", function() {
            $(container).find(".edittemplate").hide();
            $(container).find(".editor").show();
            $(container).find(".hideedit").show();
            thisObj.codeeditor.resize();
        });
        
        $(container).find(".hideedit").off("click");
        $(container).find(".hideedit").on("click", function() {
            $(container).find(".editor").hide();
            
            var value = thisObj.codeeditor.getValue();
            if (value !== "") {
                $(container).find(".edittemplate").show();
            }
            $(container).find(".hideedit").hide();
        });
        
        if (this.value === null) {
            this.value = "";
        }
        
        ace.config.set('loadWorkerFromBlob', false);
        this.codeeditor = ace.edit(this.id);
        this.codeeditor.setValue(this.value);
        this.codeeditor.getSession().setTabSize(4);
        if (this.properties.theme !== undefined || this.properties.theme !== "") {
            this.properties.theme = "textmate";
        }
        this.codeeditor.setTheme("ace/theme/" + this.properties.theme);
        if (this.properties.mode !== undefined && this.properties.mode !== "") {
            this.codeeditor.getSession().setMode("ace/mode/" + this.properties.mode);
        }
        if (this.properties.check_syntax !== undefined && this.properties.check_syntax.toLowerCase() === "false") {
            this.codeeditor.getSession().setUseWorker(false);
        }
        this.codeeditor.getSession().on('change', function() {
            thisObj.updateSample();
        });
        this.codeeditor.setAutoScrollEditorIntoView(true);
        this.codeeditor.setOption("maxLines", 1000000); //unlimited, to fix the height issue
        this.codeeditor.setOption("minLines", 10);
        this.codeeditor.resize();
        
        thisObj.updateSample();
    },
    pageShown: function() {
        this.codeeditor.resize();
        this.codeeditor.gotoLine(1);
    },
    updateSample : function() {
        var thisObj = this;
        
        var container = $(thisObj.editor).find("#"+thisObj.id).closest('.template_editor_container');
        $(thisObj.editor).find("#"+thisObj.id).trigger("change");
        
        $(container).find(".sample_preview").html("");
        var value = thisObj.codeeditor.getValue();
        if (value === "") {
            $(container).find(".edittemplate").hide();
        } else {
            if (!$(container).find(".editor").is(":visible")) {
                $(container).find(".edittemplate").show();
            }
            $(container).find(".sample_preview").append(thisObj.getTile(value));
        }
    },
    showTemplateChooser : function() {
        var thisObj = this;
        
        var height = $(thisObj.editor).height() * 0.95;
        var width = $(window).width() * 0.95;
        if (width > 800) {
            width = 800;
        }
        
        var html = "<div class=\"property_editor_template_chooser container\" style=\"overflow:scroll !important; padding:30px 20px !important; font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'; font-size:13px;\"><div class=\"search_tags\" style=\"margin-bottom:15px;\"></div><div class=\"templates row\" style=\"list-style:none;justify-content: flex-start;\"></div></div>";
        var object = $(html);
        
        var tags = $(object).find(".search_tags");
        
        $(tags).append('<button type="button" style="margin:2px;" class="btn btn-outline-primary clear active" data-tag="">@@userview.infotile.tag.all@@</button> ');
        $(tags).append('<button type="button" style="margin:2px;" class="btn btn-outline-primary" data-tag="icon">@@userview.infotile.tag.icon@@</button> ');
        $(tags).append('<button type="button" style="margin:2px;" class="btn btn-outline-primary" data-tag="image">@@userview.infotile.tag.image@@</button> ');
        $(tags).append('<button type="button" style="margin:2px;" class="btn btn-outline-primary" data-tag="line">@@userview.infotile.tag.line@@</button> ');
        $(tags).append('<button type="button" style="margin:2px;" class="btn btn-outline-primary" data-tag="area">@@userview.infotile.tag.area@@</button> ');
        $(tags).append('<button type="button" style="margin:2px;" class="btn btn-outline-primary" data-tag="bar">@@userview.infotile.tag.bar@@</button> ');
        $(tags).append('<button type="button" style="margin:2px;" class="btn btn-outline-primary" data-tag="pie">@@userview.infotile.tag.pie@@</button> ');
        $(tags).append('<button type="button" style="margin:2px;" class="btn btn-outline-primary" data-tag="donut">@@userview.infotile.tag.donut@@</button> ');
        $(tags).append('<button type="button" style="margin:2px;" class="btn btn-outline-primary" data-tag="radial">@@userview.infotile.tag.radial@@</button> ');
        $(tags).append('<button type="button" style="margin:2px;" class="btn btn-outline-primary" data-tag="polar">@@userview.infotile.tag.polar@@</button> ');
        $(tags).append('<button type="button" style="margin:2px;" class="btn btn-outline-primary" data-tag="gauge">@@userview.infotile.tag.gauge@@</button> ');
        $(tags).append('<button type="button" style="margin:2px;" class="btn btn-outline-primary" data-tag="progress">@@userview.infotile.tag.progress@@</button> ');
        $(tags).append('<button type="button" style="margin:2px;" class="btn btn-outline-primary" data-tag="dark-bg">@@userview.infotile.tag.colorBg@@</button> ');
        $(tags).append('<button type="button" style="margin:2px;" class="btn btn-outline-primary" data-tag="light-bg">@@userview.infotile.tag.whiteBg@@</button> ');
        $(tags).append('<button type="button" style="margin:2px;" class="btn btn-outline-primary" data-tag="header">@@userview.infotile.tag.header@@</button> ');
        $(tags).append('<button type="button" style="margin:2px;" class="btn btn-outline-primary" data-tag="link">@@userview.infotile.tag.link@@</button> ');
        $(tags).append('<button type="button" style="margin:2px;" class="btn btn-outline-primary" data-tag="tag">@@userview.infotile.tag.tag@@</button> ');
        $(tags).append('<button type="button" style="margin:2px;" class="btn btn-outline-primary" data-tag="grid">@@userview.infotile.tag.grid@@</button> ');
        $(tags).append('<button type="button" style="margin:2px;" class="btn btn-outline-primary" data-tag="complex">@@userview.infotile.tag.complex@@</button> ');
        
        //loop 20 first, the others load later
        var r = 0;
        for (; r < 20; r++) {
            var t_container = $(object).find(".templates");
            var tile = thisObj.getTile(thisObj.templates[r]);
            $(tile).css("cursor", "pointer");
            t_container.append(tile);
        }
        t_container.append('<div class="dt-loading"><i class=" las la-spinner la-3x la-spin" style="opacity:0.5;"></i></div>');
        
        $(object).dialog({
            autoOpen: false,
            modal: true,
            height: height,
            width: width,
            closeText: '',
            close: function(event, ui) {
                $(object).dialog("destroy");
                $(object).remove();
            }
        });
        $(object).dialog("open");
        
        var search = function() {
            if ($(object).find(".search_tags button:not(.clear).active").length > 0) {
                var tags = [];
                $(object).find(".search_tags button:not(.clear).active").each(function(){
                    tags.push($(this).data('tag'));
                });
                
                $(object).find(".templates > div.tile").each(function() {
                    var tile = $(this);
                    var match = true;
                    for (var t in tags) {
                        if ($(tile).data("tags").indexOf(tags[t]) === -1) {
                            match = false;
                            break;
                        }
                    }
                    
                    if (!match) {
                        $(this).hide();
                    } else {
                        $(this).show();
                    }
                });
            } else {
                $(object).find(".templates > div.tile").show();
            }
        };
        
        $(object).find(".search_tags button").off("click");
        $(object).find(".search_tags button").on("click", function() {
            var current = $(this);
            $(this).toggleClass("active");
            $(object).find(".search_tags button").each(function(){
                if (!$(this).is(current)) {
                    $(this).removeClass("active");
                }
            });
            
            if ($(this).hasClass("clear") && $(this).hasClass("active")) {
                $(object).find(".search_tags button:not(.clear)").removeClass("active");
            } else {
                if ($(object).find(".search_tags button:not(.clear).active").length > 0) {
                    $(object).find(".search_tags button.clear").removeClass("active");
                } else {
                    $(object).find(".search_tags button.clear").addClass("active");
                }
            }
            search();
        });
        
        $(object).find(".search-container .clear-backspace").off("click");
        $(object).find(".search-container .clear-backspace").on("click", function() {
            $(object).find(".search-container input").val("");
            $(object).find(".search-container .clear-backspace").hide();
            $(object).find(".templates > div.tile").show();
        });
        
        $(object).off("click", ".templates > div.tile");
        $(object).on("click", ".templates > div.tile", function() {
            var template = $(this).data('template');
            thisObj.codeeditor.setValue(template);
            $(object).dialog("close");
        });
        
        //loop the remaining templates
        setTimeout(function(){
            for (; r < thisObj.templates.length; r++) {
                var t_container = $(object).find(".templates");
                var tile = thisObj.getTile(thisObj.templates[r]);
                $(tile).css("cursor", "pointer");
                t_container.append(tile);
            }
            t_container.find(".dt-loading").remove();
            search();
        }, 800);
    },
    getTile : function(template) {
        var thisObj = this;
        var newTemplate = template;
        var width = "";
        var tags = "";
        
        var regexp = new RegExp('<!--(\{[^\}]+\})-->','g');
        var match;
        
        while ((match = regexp.exec(template)) !== null) {
            newTemplate = newTemplate.replace(match[0], "");
            try {
                var meta = eval("["+match[1]+"]")[0];
                width = "width:" + meta.sampleWidth;
                
                if (meta.tags !== undefined) {
                    tags = meta.tags;
                }
            } catch(err){}
        }
        
        var tile = $('<div class="tile" style="margin:5px;display:inline-block;'+width+'"></div>');
        
        var id = CustomBuilder.uuid();
        newTemplate = newTemplate.replace(/\{\{id\}\}/g, id);
        newTemplate = newTemplate.replace(/\{\{contextPath\}\}/g, CustomBuilder.contextPath);
        
        newTemplate = thisObj.fillVariables(newTemplate);
        
        $(tile).append(newTemplate);
        $(tile).data("template", template);
        $(tile).data("tags", tags);
        
        return tile;
    },
    fillVariables : function(template, objs) {
        var thisObj = this;
        template = thisObj.fillLoopVariables(template, objs);
        template = thisObj.fillStandardVariables(template, objs);
        return template;
    },
    fillLoopVariables : function(template, objs) {
        var thisObj = this;
        var newTemplate = template;
        var regexp = (/\{\{([^\|]+)\|\|(.+)\}\}([\s\S]+)\{\{\1\}\}/gm);
        while ((match = regexp.exec(template)) !== null) {
            var replace = match[0];
            if (replace !== "" && replace !== undefined) {
                var key = match[1];
                var sampleProps = match[2];
                var childtemplate = match[3];

                var cregexp = new RegExp('\{\{'+key+'\.','gm');
                childtemplate = childtemplate.replace(cregexp, "\{\{");

                var value = "";
                try {
                    var arr = eval(sampleProps);
                    for (var i = 0; i < arr.length; i++) {
                        value += thisObj.fillVariables(childtemplate, arr[i]);
                    }
                } catch (err) {}

                newTemplate = newTemplate.replace(replace, value);
            } else {
                break;
            }
        }
        return newTemplate;
    },
    fillStandardVariables : function(template, objs) {
        var newTemplate = template;
        var regexp = (/\{\{(.+?)\}\}/g);
        while ((match = regexp.exec(template)) !== null) {
            var key = match[1];
            var value = "";
            if (key.indexOf("||") !== -1) {
                value = match[1].substring(match[1].indexOf("||")+2);
                key = match[1].substring(0, match[1].indexOf("||"));
            }
            
            if (objs !== undefined && objs[key] !== undefined) {
                value = objs[key];
            }
            if (key === "reload") {
                value = '<a class="reload" style="color:inherit; opacity: 0.6; margin-left:5px;" href=""><i class="fas fa-redo"></i></a>';
            } else if (key === "actions") {
                value = '<div class="dropdown"><a class="text-muted"><i class="fa fa-ellipsis-h"></i></a></div>';
            }
            
            newTemplate = newTemplate.replace(match[0], value);
        }
        return newTemplate;
    }
}
