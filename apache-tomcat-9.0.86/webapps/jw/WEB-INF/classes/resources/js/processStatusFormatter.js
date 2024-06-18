ProcessStatusDF = {
    gap: 50, //gap to the edge
    init : function () {
        $(".process_status_dl_container").each(function(){
            ProcessStatusDF.loadData($(this));
        });

        $(window).off("resize.process_status_dl_container")
            .on("resize.process_status_dl_container", function(){
            ProcessStatusDF.reposition();
        });
    },
    loadData: function(el) {
        var url = $(el).data("url") + "&_rid=" + $(el).data("record-id");
        
        //if parent is a link, make it display inline block
        if ($(el).parent().is("a")) {
            $(el).parent().css("display", "inline-block");
        }
        
        $(el).append('<div class="blockui"></div><div class="ps_progress_container"></div><div class="ps_iframe_container" style="display:none;"><div class="arrow"></div><iframe src=""></iframe></div>');
        $(el).find("iframe").on("load", function(){
            var renderProgressBar = function() {
                if ($(el).find("iframe").contents().find("#process-status-canvas .process_container .progress_bar").length > 0) {
                    $(el).find(".ps_progress_container").append($(el).find("iframe").contents().find("#process-status-canvas .process_container .progress_bar").first().clone(true));
                } else {
                    setTimeout(function() {
                        renderProgressBar();
                    }, 100);
                }
            };
            renderProgressBar();
            
            $(el).find(".ps_progress_container").on("click", function(){
                $(".table-wrapper").data("psdf_style", $(".table-wrapper").attr("style"));
                $(".table-wrapper").attr("style", "overflow:visible;");
                $(el).closest(".datalist-body-content").data("psdf_style", $("body").attr("style"));
                $(el).closest(".datalist-body-content").attr("style", "height:auto !important;");
                
                var height = $("body").height();
                var top = $(this).offset().top;
                var paddingBottom = 0;
                if (top + 450 > height) {
                    paddingBottom =  top + 450 - height + 100; 
                    $(el).closest(".datalist-body-content").attr("style", "height:auto !important; padding-bottom:"+paddingBottom+"px !important;");
                }

                $(this).closest("span").addClass("show_popup");
             
                //calculate the scroll value by adding the top position to current scroll value and minus 100px gap on top for header
                var scrollTop = top - 100;  

                $('html, body').animate({
                   scrollTop: scrollTop
                }, 200, function(){
                    $("body").addClass("psdf_stop_scrolling");
                    ProcessStatusDF.reposition();
                });
            });
            $(el).find(".blockui").on("click", function(){
                $(this).closest("span").removeClass("show_popup");
                var listStyle = $(".table-wrapper").data("psdf_style");
                if (listStyle === undefined) {
                    listStyle = "";
                }
                $(".table-wrapper").attr("style", listStyle);
                var bodyStyle = $(el).closest(".datalist-body-content").data("psdf_style");
                if (bodyStyle === undefined) {
                    bodyStyle = "";
                }
                $(el).closest(".datalist-body-content").attr("style", bodyStyle);
                $("body").removeClass("psdf_stop_scrolling");
            });
            
            $(el).addClass("ready");
        });
        $(el).find("iframe").attr("src", url);
    },
    /**
     * Reposition the popup based on window size
     */
    reposition: function(el) {
        if (el === undefined) {
            el = $(".process_status_dl_container.show_popup");
        }
        if ($(el).closest(".rtl").length > 0) {
            var right = $(el).offset().left + $(el).find(".ps_iframe_container").width() + ProcessStatusDF.gap; 
            if (right > $(window).width()) {
                right = $(window).width() - right;
                $(el).find(".ps_iframe_container").css("left", (right) + "px");
                $(el).find(".ps_iframe_container .arrow").css("left", (45 - right) + "px");
            } else {
                $(el).find(".ps_iframe_container").css("left", "0px");
                $(el).find(".ps_iframe_container .arrow").css("left", "45px");
            }
        } else {
            var left = $(el).offset().left - $(el).find(".ps_iframe_container").width() + ProcessStatusDF.gap; 
            if (left < 0) {
                $(el).find(".ps_iframe_container").css("right", left + "px");
                $(el).find(".ps_iframe_container .arrow").css("right", (45 - left) + "px");
            } else {
                $(el).find(".ps_iframe_container").css("right", "0px");
                $(el).find(".ps_iframe_container .arrow").css("right","45px");
            }
        }
    }
};

jQuery(document).ready(function() {
    ProcessStatusDF.init();
});