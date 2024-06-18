<script src="${request.contextPath}/js/echarts/theme/dark.js"></script>
<#if element.properties.theme! != "">
    <script src="${request.contextPath}/js/echarts/theme/${element.properties.theme!}.js"></script>
</#if>

<div id="chart_body_content_${element.properties.id}" class="chart-body-content">
    ${element.properties.customHeader!}

    <#if element.properties.nodata??>
        <div class="alert alert-warning">@@userview.sqlchartmenu.nodata@@</div>
    <#elseif element.properties.error??>
        <div class="errors">
            ${element.properties.error!}
        </div>
    <#else>
        <script>
            <#if element.properties.theme! == "custom">
                echarts.registerTheme('custom', ${element.properties.customTheme!});
            </#if>
            
            $(document).ready(function(){
                var initChart = function() {
                    $("#echarts_${element.properties.id!}").html("");

                    var data = ${data!};

                    var dom = document.getElementById("echarts_${element.properties.id!}");
        
                    <#if element.properties.theme! != "">
                        var eChart;
                        if ($("body").hasClass("dark-mode")){
                            eChart = echarts.init(dom, 'dark');
                        } else{
                            eChart = echarts.init(dom, '${element.properties.theme!}');
                        }
                    <#else>
                        var eChart;
                        if ($("body").hasClass("dark-mode")){
                            eChart = echarts.init(dom, 'dark');
                        } else{
                            eChart = echarts.init(dom);
                        }
                    </#if>

                    // specify chart configuration item and data
                    var option = {
                        <#if element.properties.title! != "">
                            title: {
                                text: '${element.properties.title!}'
                            },
                        </#if>
                            tooltip: {
                                show : true,
                                backgroundColor : "#fff"
                            },
                    <#if element.properties.xyaxis! == "true">
                        <#if element.properties.horizontal! == "true">
                            yAxis: {
                        <#else>
                            xAxis : {
                        </#if>
                            <#if element.properties.limitTickLength! == "true">
                                nameTextStyle: {
                                    overflow: "break",
                                    width: 80,
                                    lineHeight:14
                                },
                                axisLabel: {
                                    width: 80,
                                    overflow: "break",
                                    interval:0,
                                    lineHeight:14
                                },
                            </#if>   
                                name: "${element.properties.categoryAxisLabel!}",
                                data: ${element.properties.ticks!},
                                type: "${element.properties.xAxisDisplayAS!}"
                            <#if element.properties.xAxisBoundaryGap! == "true">
                               ,boundaryGap: false
                            </#if>
                            },
                        <#if element.properties.horizontal! == "true">
                            xAxis: {
                        <#else>
                            yAxis : {
                        </#if>
                            <#if element.properties.limitTickLength! == "true">
                                nameTextStyle: {
                                    overflow: "break",
                                    width: 80,
                                    lineHeight:14
                                },
                                axisLabel: {
                                    width: 80,
                                    overflow: "break",
                                    interval:0,
                                    lineHeight:14
                                },
                            </#if>       
                                name: "${element.properties.valueAxisLabel!}",
                                type: "value"
                            },
                        </#if>

                        <#if element.properties.showLegend! == "true">
                            legend: {
                                <#if element.properties.title! != "">
                                    top:"6%",
                                </#if>
                                type: 'scroll',
                                orient: 'vertical',
                                left: 'right',
                                width: "20%",
                                textStyle : {
                                    width : 150,
                                    overflow: 'break',
                                    lineHeight:14
                                },
                                itemGap:10
                            },
                            grid: {
                                containLabel: true,
                                right: "20%",
                                top: "15%"
                            },
                        <#elseif element.properties.title! != "">    
                            grid: {
                                top: "15%",
                                containLabel: true
                            },
                        </#if>
                        textStyle : {
                            lineHeight : 14
                        },
                        series: data
                    };

                    <#if element.properties.optionCustomization! != "">
                    try {
                        var custom = ${element.properties.optionCustomization!};
                        option = $.extend(true, option, custom);
                    } catch (e) {}
                    </#if>

                    eChart.setOption(option);
                    $("#echarts_${element.properties.id!}").data("eChart", eChart);
                };

                //support jquery mobile
                if ($("html").hasClass("ui-mobile")) {
                    $('div:jqmData(role="page")').on('pageshow',initChart);
                } else {
                    initChart();
                }
                
                $(window).off("resize.echarts_${element.properties.id}");
                $(window).on("resize.echarts_${element.properties.id}", function(){
                    if ($("#echarts_${element.properties.id!}").data("eChart")) {
                        $("#echarts_${element.properties.id!}").css({
                            width : "100%",
                            height : "100%"
                        });
                        $("#echarts_${element.properties.id!}").data("eChart").resize();
                    } else {
                        $(window).off("resize.echarts_${element.properties.id}");
                    }
                });
            });
        </script>
    </#if>
    <style>
        #chart_container_${element.properties.id}{width:${element.properties.chartWidth!};padding-bottom:${element.properties.chartHeight!};height: 0;}
        @media (max-width: 767px) {
            #chart_container_${element.properties.id}{width:100%;padding-bottom:100%;}
        }
        <#if element.properties.showFilter! != "true">
            #chart_body_content_${element.properties.id} .filter_form{
                display: none !important;
            }
        </#if>

        <#if element.properties.showExportLinks! != "true">
            #chart_body_content_${element.properties.id} .exportlinks{
                display: none !important;
            }
        </#if>
    </style>
    <div id="chart_container_${element.properties.id}" style="position: relative;">
        <div id="echarts_${element.properties.id!}" class="echarts" style="position: absolute; top: 0; left: 0;width: 100%;height: 100%;"></div>
    </div>
    ${element.properties.customFooter!}

</div>