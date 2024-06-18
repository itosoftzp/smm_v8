(function( $ ){
    var contextPath;
    var messages;
    
    var methods = {

        init: function(args) {
            messages = args.messages;
            return this.each(function(){
                var thisObj = $(this);
                
                // initialize form grid for editing
                $(this).enterpriseformgrid(args);
                
                if (!$(thisObj).hasClass("readonly")) {
                    // set editable where necessary
                    $(this).find(".grid-cell[column_editable='yes']").each(function(idx, cell) {
                        $(cell).text($(cell).text().trim());
                        if ($(cell).text() === "") {
                            $(cell).addClass("editable_empty");
                        }
                        $(cell).editable(methods.updateCell, {
                            type: "text",
                            placeholder : messages['form.listgrid.editable.tooltip'],
                            tooltip: messages['form.listgrid.editable.tooltip'],
                            cssclass: "grid-cell-input",
                            width: "none",
                            submit: messages['form.listgrid.editable.ok']
                        });
                        $(cell).hover(
                            function () {
                                $(this).addClass("hover");
                            },
                            function () {
                                $(this).removeClass("hover");
                            }
                            );                        
                    });
                }
                
                // add new row button
                $(this).find(".grid-action-add").remove();
                if ($(this).find(".grid-action-add").length == 0) {
                    var link = $('<a class="grid-action-add" href="#" title="'+ messages['form.listgrid.addRows'] +'"><span>' + messages['form.listgrid.addRows'] + '</span></a>');
                    link.click(function() {
                        methods.add.apply(thisObj, arguments);
                        //focus on 1st foucusable element when popup opened
                        $(".boxy-wrapper .close").focus();
                        return false;
                    });
                    $(this).append(link);
                }
                
            });
        },
        
        getFrameId: function(id) {
            return "listGridFrame_" + id;
        },
        
        initPopupDialog: function(args){
            contextPath = args.contextPath;
            
            var frameId = methods.getFrameId($(this).attr('id'));
            
            $(this).data('appId', args.appId);
            $(this).data('appVersion', args.appVersion);
            $(this).data('listId', args.listId);
            $(this).data('formId', args.formId);
            $(this).data('uniqueKey', args.uniqueKey);
            $(this).data('label', args.label);
            $(this).data('width', args.width);
            $(this).data('height', args.height);
            $(this).data('requestParams', args.requestParams);
            $(this).enterpriseformgrid("initPopupDialog", {
                contextPath: contextPath, 
                title:messages['form.listgrid.addEntry']
            });
            
            // hide original edit icon
            if (!$(this).data('formId')) {
                $(this).find(".grid-action-edit").hide();
            }
            
            var width = $(this).data('width');
            var height = $(this).data('height');

            JPopup.create(frameId, "", width, height);
        },

        add: function() {
            return this.each(function() {
                methods.popupForm.call(this, $(this).attr('id'), $(this).find('#formUrl').val(), $(this).find('#json').val(), $(this).find('#nonceList').val(), $(this).attr('id')+"_add", "{}", "");
            });
        },
        
        edit: function(){
            return this.each(function() {
                $(this).enterpriseformgrid("edit");
            });
        },
        
        popupForm: function(id, url, json, nonce, callback, setting, value) {
            var frameId = methods.getFrameId(id);
            
            var params = "";
            
            if ($(this).data('requestParams') != undefined) {
                params = FormUtil.getFieldsAsUrlQueryString($(this).data('requestParams'), $(this).closest("div.subform-container"));
                
                if (params !== "") {
                    params = "&" + params; 
                }
            }
              
            var width = $(this).data('width');
            var height = $(this).data('height');
            var url = contextPath+'/web/app/'+$(this).data('appId')+'/'+$(this).data('appVersion')+'/datalist/embed?id='+id+params+UI.userviewThemeParams();
            
            var vars = {
                _frameId : frameId,
                _listId : $(this).data('listId'),
                _type : $(this).data('type'),
                _submitButtonLabel : $(this).data('label'),
                _callback : id+'_add',
                _setting : "{}",
                _nonce : nonce
            };

            JPopup.show(frameId, url, vars, "", width, height, "get");
        },
        
        addRow: function(args){
            return $(this).each(function() {
                var frameId = methods.getFrameId($(this).attr("id"));
                
                var okToInsert = true;
                var uniqueKey = $(this).data("uniqueKey");
                if (uniqueKey && uniqueKey != null) {
                    // find existing row
                    var obj = eval("[" + args.result + "]");
                    var uniqueVal = obj[0][uniqueKey];
                    if (uniqueVal) {
                        $(this).find("tbody .grid-row").each(function(idx, row) {
                            var rowJson = $(this).find("textarea").val();
                            var rowObj = eval("[" + rowJson + "]");
                            if (rowObj[0][uniqueKey] === uniqueVal) {
                                okToInsert = false;
                                return false;
                            }
                        });
                    }
                }
                
                if (okToInsert && $(this).find(".grid-action-add").is(":visible")) {
                    // insert rows
                    $(this).enterpriseformgrid("addRow", args);
                    
                if (!$(this).hasClass("readonly")) {
                    // set editable where necessary
                        $(this).find(".grid-cell[column_editable='yes']").each(function(idx, cell) {
                            $(cell).editable(methods.updateCell, {
                                type: "text",
                                placeholder : messages['form.listgrid.editable.tooltip'],
                                tooltip: messages['form.listgrid.editable.tooltip'],
                                cssclass: "grid-cell-input",
                                width: "none",
                                submit: messages['form.listgrid.editable.ok']
                            });
                            $(cell).hover(
                                function () {
                                    $(this).addClass("hover");
                                },
                                function () {
                                    $(this).removeClass("hover");
                                }
                                );                        
                        });
                    }

                    // hide original edit icon
                    if (!$(this).data('formId')) {
                        $(this).find(".grid-action-edit").hide();
                    }
                }

                // close dialog
                JPopup.hide(frameId);

                // trigger change
                $(this).trigger("change");
                $(this).enterpriseformgrid("showHidePlusIcon", this);
            });
        },
        
        updateCell: function(value, settings) {
            // update value
            var row = $(this).closest("tr");
            var json = $(row).find("textarea").val();
            var obj = eval("["+json+"]")[0];
            var field = $(this).attr("column_key");
            obj[field] = value;
            var newJson = JSON.stringify(obj);
            $(row).find("textarea").val(newJson);

            // trigger change
            var el = $(this).closest("table").parent();
            setTimeout(function() {
                $(el).enterpriseformgrid("fillValue", el, row, newJson);
                $(el).trigger("change");
                methods.updateEditableCell(row);
            }, 100);
            return value;
        },
        
        updateEditableCell: function (row) {
            $(row).find(".grid-cell[column_editable='yes']").each(function(idx, cell) {
                if ($(cell).text() === "") {
                    $(cell).text(messages['form.listgrid.editable.tooltip']);
                    $(cell).addClass("editable_empty");
                }
                if ($(cell).hasClass("editable_empty") && $(cell).text() !== messages['form.listgrid.editable.tooltip']) {
                    $(cell).removeClass("editable_empty");
                }
            });
        },
        
        editRow: function(args){
            return $(this).each(function(){
                var frameId = methods.getFrameId($(this).attr("id"));
                $(this).enterpriseformgrid("editRow", args);
                
                JPopup.hide(frameId);

                // trigger change
                $(this).trigger("change");
            });
        }
        
    };

    $.fn.listgrid = function( method ) {

        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.listgrid' );
        }

    };

})( jQuery );

