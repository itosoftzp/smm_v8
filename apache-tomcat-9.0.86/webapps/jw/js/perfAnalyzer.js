var Analyzer = {
    currentAnalyzerElement: null,
    copyToClipboard : function(container) {
        const el = document.createElement('textarea');
        var text = $(container).find('.analyzer-info').html();
        text = text.replace(/<span class="analyzer-info-info">([^<]+)<\/span>/gi, '$1\n');
        text = text.replace(/<span class="analyzer-info-duration">([^<]+)<\/span>/gi, '($1)\n');
        
        el.value = text;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        
        $(container).find("a.textcopy i").removeClass("fa-spinner fa-spin").addClass("fa-check-circle");
        $(container).find("a.textcopy").css({
            "color" : "green"
        });
        setTimeout(function(){
            $(container).find("a.textcopy i").removeClass("fa-check-circle").addClass("fa-copy");
            $(container).find("a.textcopy").css({
                "color" : "#2e2bff",
                "pointer-events" : "",
                "cursor" : "pointer"
            });
        }, 1000);
    },
    displayAnalyzer : function (el, duration, id, info) {
        var $el = $(el);
        var $analyzerDiv = $(el).find('.analyzer-label');
        if ($analyzerDiv.length === 0) {
            var $analyzerDiv = $('<div class="analyzer-label"></div>');
            if ($el.prop("tagName") === 'INPUT' || $el.prop("tagName") === 'SELECT' || $el.prop("tagName") === 'TEXTAREA') {
                $el.before($analyzerDiv);
            } else {
                $el.addClass("analyzer-disabled");
                $el.prepend($analyzerDiv);
            }
            if (id) {
                $analyzerDiv.append(id);
            }
            if (info) {
                $analyzerDiv.append('<span class="info">' + UI.escapeHTML(info) + '</span>');
            }
            if (duration > 0) {
                $analyzerDiv.append('<span class="duration">' + duration + 'ms <a class="textcopy" style="display:none; cursor:pointer; color:#2e2bff;"><i class="fas fa-copy"></i></a></span>');
                
                $analyzerDiv.find(".textcopy").on("click", function(){
                    $(this).css({
                        "pointer-events" : "none",
                        "cursor" : "default",
                        "color" : "#ccc"
                    });
                    $(this).find("i").removeClass("fa-copy").addClass("fa-spinner fa-spin");
                    Analyzer.copyToClipboard($analyzerDiv);
                });
            }
        }
    },
    displayAnalyzerInfo : function (el, duration, info) {
        var $el = $(el).find(".analyzer-label");
        var $analyzerInfoDiv = $(el).find('.analyzer-info');
        if ($analyzerInfoDiv.length === 0) {
            $(el).find(".textcopy").show();
            $analyzerInfoDiv = $('<div class="analyzer-info" style="display:none;"></div>');
            if ($el.prop("tagName") === 'INPUT' || $el.prop("tagName") === 'SELECT' || $el.prop("tagName") === 'TEXTAREA') {
                $el.after($analyzerInfoDiv);
            } else {
                $el.append($analyzerInfoDiv);
            }
        }
        if (info) {
            $analyzerInfoDiv.append('<span class="analyzer-info-info">' + UI.escapeHTML(info) + '</span>');
        }
        if (duration > 0) {
            $analyzerInfoDiv.append('<span class="analyzer-info-duration">' + duration + 'ms</span>');
        }
    },
    displayPageInfo : function (el, info) {
        var $el = $(el);
        var $analyzerInfoDiv = $(el).find('.analyzer-page');
        if ($analyzerInfoDiv.length === 0) {
            $analyzerInfoDiv = $('<div class="analyzer-page"></div>');
            if ($el.prop("tagName") === 'INPUT' || $el.prop("tagName") === 'SELECT' || $el.prop("tagName") === 'TEXTAREA') {
                $el.before($analyzerInfoDiv);
            } else {
                $el.prepend($analyzerInfoDiv);
            }
            $el.addClass("hasAnalyzer");
        }
        if (info) {
            $analyzerInfoDiv.append('<span class="analyzer-info-info">' + UI.escapeHTML(info) + '</span>');
        }
        $("#adminBar").append($analyzerInfoDiv.clone());
        
        $("#adminBar").find(".analyzer-page").css("cursor", "pointer");
        $("#adminBar").find(".analyzer-page").on("click", function(){
            if ($("#adminBar").find(".adminBarButton:first-child").attr("href").indexOf("/forms") !== -1) {
                var url = $("#adminBar").find(".adminBarButton:first-child").attr("href").replace("/forms", "/performance");
                AdminBar.showQuickOverlay(url);
            } else {
                AdminBar.showQuickOverlay(AdminBar.contextPath + '/web/console/monitor/apm');
            }
        });
    },
    traverse : function (analyzer) {
        if (analyzer.type === 'request') {
            var el = "#page";
            var jvm = analyzer.jvm;
            var datasource = analyzer.datasource;
            var jvmInfo = "Memory Used: " + jvm.used + " / " + jvm.total + " MB";
            var datasourceInfo = "Datasource Active: " + datasource.numActive + ", Idle: " + datasource.numIdle;
            Analyzer.displayPageInfo(el, jvmInfo + "; " + datasourceInfo);
            currentAnalyzerElement = el;
        } else if (analyzer.type === 'userview') {
            var el = "#content:last, #content.main-content";
            Analyzer.displayAnalyzer(el, analyzer.duration);
            currentAnalyzerElement = el;
        } else if (analyzer.type === 'menu') {
            var el = "#" + analyzer.id + ".menu, #" + analyzer.id + ".menu-link";
            Analyzer.displayAnalyzer(el, analyzer.duration);
            currentAnalyzerElement = el;
        } else if (analyzer.type === 'userviewComponent' && analyzer.id !== null && analyzer.id !== undefined && analyzer.id !== "") {
            var el = "#pc-" + analyzer.id;
            Analyzer.displayAnalyzer(el, analyzer.duration);
            currentAnalyzerElement = el;
        } else if (analyzer.type === 'formElement') {
            if (analyzer.id && analyzer.duration > 0) {
                var el = $(".form-cell [name='" + analyzer.id + "']").parentsUntil(".form-cell").parent();
                if (el.length === 0) {
                    el = $(".subform-cell #" + analyzer.id + ".subform-section");
                }
                if (el.length === 0) {
                    el = $("#" + analyzer.id);
                }
                Analyzer.displayAnalyzer(el, analyzer.duration);
                currentAnalyzerElement = el;
            }
        } else {
            var el = currentAnalyzerElement;
            var info = "";
            for (var i = 0; i < analyzer.depth; i++) {
                info += "--";
            }
            info += analyzer.signature + ":" + analyzer.info
            Analyzer.displayAnalyzerInfo(el, analyzer.duration, info);
        }
        if (analyzer.children) {
            for (var i = 0; i < analyzer.children.length; i++) {
                Analyzer.traverse(analyzer.children[i]);
            }
        }
    },
    initAnalyzer : function(analyzer) {
        Analyzer.traverse(analyzer);
        $(".analyzer-label").on("mouseover", function () {
            $(".analyzer-label").not(this).css("zIndex", "500");
        });
        $(".analyzer-label").on("mouseout", function () {
            $(".analyzer-label").not(this).css("zIndex", "1000");
        });
        // heap health check
        var jvm = analyzer.jvm;
        if (jvm.max === jvm.total) {
            // max heap reached, check free percentage and absolute memory free
            var usedRatio = parseInt(jvm.used / jvm.max * 100);
            var usedThreshold = 98; // 98% used memory
            var freeAbsolute = 20; // 20M free memory
            if (usedRatio > usedThreshold || jvm.free <= freeAbsolute) {
                // show warning popup
                new Boxy("<div id='memWarning'><strong>Low Java VM Memory</strong><br/><br/><div class='memGauge'><div class='memUsage' style='width:" + usedRatio + "%;'>" + jvm.used + " / " + jvm.total + " MB (" + usedRatio + "%)</div></div><p class='warningMessage'>Insufficient Java VM memory allocation<br/> or possible app memory leak. <a target='_blank' href='https://www.joget.org/updates/DX8/performance'>More</a></p></div>",{title:"ADMIN WARNING", modal:true}).show();
            }
        }

        var quickEditModeActive = AdminBar.isQuickEditMode();
        if (quickEditModeActive) {
            AdminBar.showQuickEdit();
        }
    },
    clearAnalyzer : function() {
        $(".analyzer-info").remove();
        $(".analyzer-page").remove();
        $(".hasAnalyzer").removeClass("hasAnalyzer");
        $(".analyzer-disabled").removeClass("analyzer-disabled");
    }
};

(function () {
    $(window).on("load", function() {
        setTimeout(function() {
            var analyzerJson = $("#analyzerJson").val();
            var analyzer = JSON.parse(analyzerJson);
            Analyzer.initAnalyzer(analyzer);
        }, 0);
    });
})();
