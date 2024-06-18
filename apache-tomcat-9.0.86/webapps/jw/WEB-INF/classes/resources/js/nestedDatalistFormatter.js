NestedDL = {
    url: '',
    init: function() {
        $("body").off("click.nesteddl1", ".nesteddl_trigger")
                 .on("click.nesteddl1", ".nesteddl_trigger", NestedDL.click);
        $("body").off("click.nesteddl2", ".nesteddl_row th a[href], .nesteddl_row .pagelinks a[href]")
                 .on("click.nesteddl2", ".nesteddl_row th a[href], .nesteddl_row .pagelinks a[href]", NestedDL.reload);
        $("body").off("click.nesteddl3", ".nesteddl_trigger + .dataList th a[href], .nesteddl_trigger + .dataList .pagelinks a[href]")
                 .on("click.nesteddl3", ".nesteddl_trigger + .dataList th a[href], .nesteddl_trigger + .dataList .pagelinks a[href]", NestedDL.reload);
         
        $(window).off("resize.nesteddl").on("resize.nesteddl", function() {
            setTimeout(function(){
                $(".nesteddl_col .dataList, .nesteddl_trigger + .dataList").each(function() {
                    NestedDL.adjustHeight($(this));
                });
            }, 50); //delay for card layout ready
        });
    },
    click: function(event) {
        var el = $(this);
        var args = $(el).data("nesteddl");

        //Do nothing when the nested table is still loading
        if ($(el).hasClass("tableloading")) {
            return;
        }

        var mainDatalist = $(el).closest(".dataList");

        var tr = $(el).closest("tr");
        if (tr.length > 0) {
            if ($(tr).next().hasClass("footable-row-detail")) {
                nestedtr = $(tr).next();
            }else{
                nestedtr = tr;
            }

            var nestedListContainer = $(nestedtr).next(".nesteddl_row");
            if (nestedListContainer.length === 0) {
                var col = $(tr).find("td").length;
                var newTr = $("<tr class=\"nesteddl_row active\"><td class=\"nesteddl_col\" colspan=\"" + col + "\"></td></tr>");
                if ($(tr).hasClass("odd")) {
                    $(newTr).addClass("odd");
                } else {
                    $(newTr).addClass("even");
                }
                $(nestedtr).after(newTr);
                nestedListContainer = $(newTr);
            }
        } else if ($(el).closest(".data-row").length > 0 && $(el).closest(".data-row").find(".extraDataPlaceholder").length > 0){
            nestedListContainer = $(el).closest(".data-row").find(".extraDataPlaceholder");
        } else {
            nestedListContainer = $(el).closest(".column_body");
        }
        $(nestedListContainer).addClass("nesteddl_container");

        //render data on load with selected element
        if ($(nestedListContainer).find(".dataList." + args.uniqueId).length === 0) {
            $(nestedListContainer).find(".dataList").hide().removeClass("active");
            NestedDL.render(nestedListContainer, args, el);
        } else {
            //render loaded data 
            var list = $(nestedListContainer).find(".dataList." + args.uniqueId);
            if ($(list).hasClass("active")) {
                $(list).hide().removeClass("active");
                $(nestedListContainer).removeClass("active");
            } else {
                $(nestedListContainer).find(".dataList").hide().removeClass("active");
                $(list).show().addClass("active");
                $(nestedListContainer).addClass("active");
            }
            
            NestedDL.adjustHeight($(list));
        }
        
        //set current element as active
        $(el).toggleClass("active");
        $(tr).find(".nesteddl_trigger").each(function() {
            if (!$(this).is($(el))) {
                //set other element as inactive 
                $(this).removeClass("active");
                if ($(this).next().hasClass("dataList")) {
                    //hide inactive class if list is not null
                    $(this).next().hide().removeClass("active");
                }
            }
        });
    },
    render: function(div, args, trigger) {
        $(trigger).addClass("tableloading");
        
        var url = NestedDL.url + "&_listId=" + args.listId;

        $.get(url, args.datas, function(resp) {  
            var html = $(resp);    
            $(html).addClass(args.color);
            $(html).addClass(args.uniqueId);
            
            if ($(div).hasClass("nesteddl_row")) {
                $(div).find("> td").append(html);
            } else {
                $(div).append(html);
            }
            
            NestedDL.initTable(html);
            //get data with matching unique id
            $(div).find(".dataList." + args.uniqueId).addClass("active");
            $(div).find(".dataList." + args.uniqueId).data("trigger", trigger);
            $(div).find(".dataList." + args.uniqueId + " > .table-wrapper").addClass("nesteddl");
            $(div).addClass("active");

            NestedDL.adjustHeight($(div).find(".dataList." + args.uniqueId));
            $(trigger).removeClass("tableloading");
        });
    },
    reload: function(event) {
        var atag = $(this);
        var div = $(this).closest(".dataList");
        var url = NestedDL.url.substring(0, NestedDL.url.indexOf("?")) + $(atag).attr("href");
        
        $.get(url, function(resp) {
            var html = $("<div>" + resp + "</div>").find(".dataList");
            $(div).html($(html).html());
            NestedDL.initTable(div);
        });
        return false;
    },
    initTable: function(datalist) {
        if ($(datalist).find(".pagelinks a").length === 0) {
            $(datalist).find(".pagelinks").remove();
        }
        
        $(datalist).find("th a[href], .pagelinks a[href]").addClass("off_ajax");
        
        if ($(datalist).find("> .table-wrapper > table.responsivetable").length > 0) {
            responsiveTable($(datalist));
        }

        $(datalist).on("click", ".footable.breakpoint tr", function() {
            NestedDL.adjustHeight(datalist);
        });

        $(window).trigger("resize");
    },
    adjustHeight: function(datalist) {
        var height = $(datalist).height() * 0.2 - 10;
        $(datalist).css("margin-bottom", "-" + height + "px");
    },
    dlPostAction: function(element, message) {
        var div = $(element).closest(".dataList");
        var url = NestedDL.url.substring(0, NestedDL.url.indexOf("?")) + $(element).attr("href");
        
        var showPopup = true;
        if (message !== "") {
            showPopup = confirm(message);
        }
        if (showPopup) {
            $.post(url, function(resp) {
                var temp = $("<div>" + resp + "</div>");
                
                if ($(temp).find("> script").length > 0) {
                    $(div).append($(temp).find("> script"));
                }
                if ($(temp).find(".dataList").length > 0) {
                    $(div).html($(temp).find(".dataList").html());
                    NestedDL.initTable(div);
                }
            });
        }
        return false;
    },
    redirect: function(url) {
        location.href = url;
    }
};

jQuery(document).ready(function() {
    NestedDL.init();
});
