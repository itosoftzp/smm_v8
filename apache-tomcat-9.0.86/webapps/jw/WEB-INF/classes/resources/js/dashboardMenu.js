(function($){
    $.fn.extend({
        dashboardMenu : function(o){
            var target = this;
            if($(target)){
                $(target).gridstack(o);
                var grid = $(target).data('gridstack');
                
                //populate position based on local storage
                var cache = $.localStorage.getItem(o.storage_key);
                if (cache !== undefined && cache !== null) {
                    var cachedObj =  JSON.decode(cache);
                    var arrayLength = cachedObj.length;
                    for (var i = 0; i < arrayLength; i++) {
                        var node = cachedObj[i];
                        var el = $(o.portlets).find(".grid-stack-item#"+ node['id']);
                        if ($(el).length > 0) {
                            $(el).data('gs-x', node['x']);
                            $(el).data('gs-y', node['y']);
                            $(el).data('gs-width', node['width']);
                            $(el).data('gs-height', node['height']);
                            $(el).data('gs-auto-position', 'no');
                        }
                    }
                }
                
                //add portlet
                $(o.portlets).find(".grid-stack-item").each(function(){
                    var item = this;
                    var auto = $(item).data("gs-auto-position");
                    if (auto !== "yes") {
                        var x = $(item).data("gs-x");
                        var y = $(item).data("gs-y");
                        var width = $(item).data("gs-width");
                        var height = $(item).data("gs-height");
                        if (grid.will_it_fit(x, y, width, height, true)) {
                            grid.add_widget(item, x, y, width, height, false);
                        } else {
                            grid.add_widget(item, x, y, width, height, true);
                        }
                    }
                });
                $(o.portlets).find(".grid-stack-item").each(function(){
                    var item = this;
                    var width = $(item).data("gs-width");
                    var height = $(item).data("gs-height");
                    grid.add_widget(item, 0, 0, width, height, true);
                });
                
                //initial iframe
                $(target).find(".grid-stack-item").each(function(){
                    var item = this;
                    if (o.ajax !== undefined && o.ajax) {
                        resizeAjax(item, o);
                        $(item).find(".grid-stack-item-header-refresh").click(function(){
                            AjaxComponent.call($(item).find('[data-ajax-component]'), window.location.href, "GET", null, function(){
                                resizeAjax(item, o);
                            });
                        });
                        var autoReload = $(item).data("gs-auto-reload");
                        if (autoReload !== undefined && autoReload !== "" && !isNaN(autoReload) && autoReload!== "0" ) {
                            var reload = parseInt(autoReload) * 60000;
                            var reloadCallback = function(item, reload) {
                                AjaxComponent.call($(item).find('[data-ajax-component]'), window.location.href, "GET", null, function(){
                                    resizeAjax(item, o);
                                });
                                setTimeout(function(){
                                    reloadCallback(item, reload);
                                }, reload);
                            };
                            setTimeout(function(){
                                reloadCallback(item, reload);
                            }, reload);
                        }
                    } else {
                        var url = $(item).data("gs-url");
                        var iframe = $(item).find("iframe");
                        $.ajax({
                            type : "HEAD",
                            async : true,
                            url : url,
                            beforeSend: function (request) {
                                request.setRequestHeader(ConnectionManager.tokenName, ConnectionManager.tokenValue);
                            }
                        })
                        .success(function() {
                            $(iframe).attr("src", url);
                        });
                        
                        $(iframe).load(function(){
                            $(item).find(".grid-stack-item-loading").hide();
                            setTimeout(function(){
                                resizeIframe(item, o);
                                overrideIframeBehavior($(iframe));
                            }, 50);
                        });
                        $(iframe).on("iframe-ui-maxsize", function() {
                            $(iframe).closest(".grid-stack-item-content").css("position", "unset");
                            $(iframe).closest(".grid-stack-item").css("position", "unset");
                        });
                        $(iframe).on("iframe-ui-restore", function() {
                            $(iframe).closest(".grid-stack-item-content").css("position", "absolute");
                            $(iframe).closest(".grid-stack-item").css("position", "absolute");
                        });

                        $(item).find(".grid-stack-item-header-open").click(function(){
                            var win = window.open($(iframe).attr("src"), '_blank');
                            win.focus();
                        });
                        $(item).find(".grid-stack-item-header-refresh").click(function(){
                            $(item).find(".grid-stack-item-loading").show();
                            $(iframe).attr("src", url);
                        });
                        var autoReload = $(item).data("gs-auto-reload");
                        if (autoReload !== undefined && autoReload !== "" && !isNaN(autoReload) && autoReload!== "0" ) {
                            var reload = parseInt(autoReload) * 60000;
                            var reloadCallback = function(item, reload) {
                                $(item).find(".grid-stack-item-loading").show();
                                $(iframe).attr("src", url);
                                setTimeout(function(){
                                    reloadCallback(item, reload);
                                }, reload);
                            };
                            setTimeout(function(){
                                reloadCallback(item, reload);
                            }, reload);
                        }
                    }
                });
                
                var updateCell = function (grid, element) {
                    if (o.ajax !== undefined && o.ajax) {
                        resizeAjax(element, o);
                    } else {
                        $(element).find("iframe").show();
                        resizeIframe(element, o);
                    }
                    var res = [];
                    $(grid).find('.grid-stack-item').each(function () {
                        var el = $(this);
                        var node = el.data('_gridstack_node');
                        if (node !== undefined) {
                            res.push({
                                id: el.attr('id'),
                                x: node.x,
                                y: node.y,
                                width: node.width,
                                height: node.height
                            });
                        }
                    });
                    $.localStorage.setItem(o.storage_key, JSON.encode(res));
                };
                
                if (o.ajax !== undefined && o.ajax) {
                    $(target).on('change', ".grid-stack-item", function(event, ui) {
                        var element = $(event.target).closest(".grid-stack-item");
                        updateCell($(target), element);
                    });
                }
                
                $(target).on('dragstart', function(event, ui) {
                    var grid = this;
                    var element = event.target;
                    $(element).find("iframe").hide();
                });
                
                $(target).on('dragstop', function (event, ui) {
                    var grid = this;
                    var element = event.target;
                    updateCell(grid, element);
                });
                
                $(target).on('resizestart', function(event, ui) {
                    var grid = this;
                    var element = event.target;
                    $(element).find("iframe").hide();
                });

                $(target).on('resizestop', function (event, ui) {
                    var grid = this;
                    var element = event.target;
                    updateCell(grid, element);
                });
                
                $(o.reset_position).click(function(){
                    $.localStorage.removeItem(o.storage_key);
                    window.location.reload(true);
                });
            }
            return target;
        }
    });
    
    function resizeAjax(item, o) {
        var contentFrame = $(item).find(".grid-stack-item-body");
        if ($(item).data("gs-auto-height") === "yes") {
            $(contentFrame).css("height", "auto");
        }
        $(window).trigger("resize");
        var timeout = $(item).data("timeout");
        if (timeout !== undefined) {
            clearTimeout(timeout);
        }
        
        timeout = setTimeout(function(){
            var itemHeight = $(item).height() - 30;
            var headerHight = $(item).find(".grid-stack-item-header").height();
            var frameheight = itemHeight - headerHight;

            if ($(item).data("gs-auto-height") === "yes") {
                var frameContentHeight = $(contentFrame).outerHeight(true);
                var height = Math.ceil((frameContentHeight + headerHight + 30 + o.vertical_margin) / (o.cell_height + o.vertical_margin));
                var grid = $('.grid-stack').data('gridstack');
                grid.resize(item, null, height);
                itemHeight = (height * (o.cell_height + o.vertical_margin)) - 30 - o.vertical_margin;
                frameheight = itemHeight - headerHight;
            }
            $(contentFrame).height(frameheight);
            $(window).trigger("resize");
        }, 100);
        $(item).data("timeout", timeout);
    }
    
    function resizeIframe(item, o) {
        var iframe = $(item).find("iframe");
        if ($(iframe).hasClass("maxsize")) {
            return;
        }
        var itemHeight = $(item).height() - 30;
        var headerHight = $(item).find(".grid-stack-item-header").height();
        var iframeheight = itemHeight - headerHight;
        if ($(item).data("gs-auto-height") === "yes") {
            $(iframe).css("height", "auto");
            var iframeContentHeight = $(iframe).contents().height();
            var height = Math.ceil((iframeContentHeight + headerHight + 30 + o.vertical_margin) / (o.cell_height + o.vertical_margin));
            var grid = $('.grid-stack').data('gridstack');
            grid.resize(item, null, height);
            itemHeight = (height * (o.cell_height + o.vertical_margin)) - 30 - o.vertical_margin;
            iframeheight = itemHeight - headerHight;
        }
        $(iframe).height(iframeheight);
    }
    
    function overrideIframeBehavior(iframe) {
        $(iframe).contents().find("[onclick]").each(function(){
            var $el = $(this);
            var onclick = $el.attr("onclick");
            if (onclick.indexOf("top.location") !== -1) {
                onclick = onclick.replace("top.location", "document.location");
                $el.attr("onclick", onclick);
            }
        });
    }
})(jQuery);