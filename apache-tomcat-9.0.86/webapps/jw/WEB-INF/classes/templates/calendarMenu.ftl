<link href='${request.contextPath}/plugin/org.joget.plugin.enterprise.CalendarMenu/js/fullcalendar/main.min.css' rel='stylesheet' />
<script src='${request.contextPath}/plugin/org.joget.plugin.enterprise.CalendarMenu/js/fullcalendar/main.min.js'></script>
<script src='${request.contextPath}/plugin/org.joget.plugin.enterprise.CalendarMenu/js/fullcalendar/locales-all.min.js'></script>
<style>
    .calendar_menu_body .fc-header-toolbar {flex-wrap: wrap;}
    .fc-toolbar-chunk .btn-group .btn{border-color: transparent;}
    td.fc-daygrid-day, .fc-col-header-cell, .fc-timegrid-col {border:1px solid #ccc;}
    @media (max-width: 767px) {
        .calendar_menu_body .fc-header-toolbar {margin-bottom: 50px !important; position: relative;}
        .calendar_menu_body .fc-header-toolbar .fc-toolbar-chunk:nth-child(2) {position: absolute;top: 44px; width: 100%; text-align: center;}
    }
</style>
<script>
    $(document).ready(function() {
        if ($('#fullcalendar_${element.properties.id}').hasClass("fc")) {
            var temp = $('#fullcalendar_${element.properties.id}').data("fullcalendar");
            if (temp) {
                temp.destroy();
                $('#fullcalendar_${element.properties.id}').removeData("fullcalendar");
            }
        }
        var calendar = new FullCalendar.Calendar($('#fullcalendar_${element.properties.id}')[0], {
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            <#if lang! == 'en'>
            buttonText: {
                today:    '@@userview.calendarMenu.today@@',
                month:    '@@userview.calendarMenu.month@@',
                week:     '@@userview.calendarMenu.week@@',
                day:      '@@userview.calendarMenu.day@@'
            },
            </#if>
            <#if element.properties.firstday?? >
            'firstDay': '${element.properties.firstday!}',
            </#if>
            <#if eventTimeFormat?? >
            'eventTimeFormat': ${eventTimeFormat!},
            </#if>
            locale: "${lang!}",
            dayMaxEvents: true, 
            eventSources: [
                {
                    url: '${request.contextPath}${jsonUrl!}', 
                }
                ${google_src!}
            ],
            viewDidMount: function(info) {
                var view = info.view;
                ${element.properties.eventAfterAllRender!} 
            },
            eventDidMount: function(info) {
                var event =  info.event, element = info.el, view = info.view;
                ${element.properties.eventRender!}
                ${element.properties.eventAfterRender!} //v5 does not hv this event
            },
            eventClick: function(info) {
                var event = info.event, jsEvent = info.jsEvent, view = info.view;
                ${element.properties.eventClick!}
            },
            themeSystem: 'bootstrap'
        });
        calendar.render();
        $('#fullcalendar_${element.properties.id}').data("fullcalendar", calendar);
        
        $(window).off("resize.${element.properties.id}");
        $(window).on("resize.${element.properties.id}", function(){
            if ($('#fullcalendar_${element.properties.id}').data("fullcalendar")) {
                $('#fullcalendar_${element.properties.id}').data("fullcalendar").updateSize();
            } else {
                $(window).off("resize.${element.properties.id}");
            }
        });
    });
</script>
<div class="calendar_menu_body">
    <#if element.properties.title?has_content ><h3>${element.properties.title!}</h3></#if>
    ${element.properties.customHeader!}
    <div id="fullcalendar_${element.properties.id}" class="fullcalendar"></div>
    ${element.properties.customFooter!}
</div>