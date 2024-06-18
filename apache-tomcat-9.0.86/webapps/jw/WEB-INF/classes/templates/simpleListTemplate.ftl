<style>
    body.rtl #dataList_{{list.id}} .table-wrapper .flex-fill {
        display: flex;
        flex-direction: column;
        text-align: right;
    }
</style>
<div class="list-group p-0 border-0">
    {{rows data-cbuilder-highlight="@@datalist.simpleListTemplate.list@@" data-cbuilder-style="[{'prefix' : 'list', 'class' : '.list-group-item', 'label' : '@@datalist.simpleListTemplate.list@@'}]"}}
        <div class="data-row list-group-item d-flex align-items-center {{actionsStyle}}"
            style="position:relative">
            {{selector}}
                <div class="px-3">{{body}}</div>
            {{selector}}
            {{column_image data-cbuilder-droparea-msg="@@datalist.simpleCardTemplate.image@@"}}
                <div class="d-flex align-items-center 
                            justify-content-center rounded-2 ms-n1">
                    {{body||<svg class="bd-placeholder-img" width="50px" height="50px" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Image cap"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"></rect><text x="50%" y="50%" fill="#dee2e6" dy=".3em">@@datalist.simpleCardTemplate.image@@</text></svg>}}
                </div>
            {{column_image}}
            <div class="flex-fill px-3">
                {{column_title data-cbuilder-droparea-msg="@@datalist.simpleCardTemplate.title@@"}}
                    <h5>{{body||@@datalist.simpleCardTemplate.title@@}}</h5>
                {{column_title}}
                {{columns}}
                     {{column}}
                        <div class="fs-12px text-muted">
                            {{body||@@datalist.simpleCardTemplate.textContent@@}}
                        </div>
                     {{column}}
                {{columns}}
                <div class="extraDataPlaceholder"></div>
            </div>
            {{column_value data-cbuilder-droparea-msg="@@datalist.simpleListTemplate.value@@"}}
                <div class="px-3">{{body||@@datalist.simpleListTemplate.value@@}}</div>
            {{column_value}}
            <#if element.properties.actionsStyle! == 'normalActions' || element.properties.actionsStyle! == 'swipeActions'>
                {{rowActions}}
                    <div class="px-3 rowActionsContainer">
                        <div class="rowActions" data-cbuilder-sort-horizontal>{{rowAction}}</div>
                    </div>
                {{rowActions}}
            <#else>
                    {{rowActions attr-class="dropdown-item"}}
                    <div class="dropdown">
                        <a data-toggle="dropdown" class="text-muted" tabindex="0" style="cursor:pointer;">
                            <i class="fa fa-ellipsis-h"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right rowActions">
                            {{rowAction}}
                        </div>
                    </div>
                {{rowActions}}
            </#if>
        </div>
    {{rows}} 
    <#if element.properties.actionsStyle! == 'swipeActions'>
        <script>
            $(function(){
                var listDiv = document.getElementById("dataList_{{list.id}}");

                var pointerListener = null;

                if (listDiv !== null) {
                    function onSwipeLeft (event) {
                        var thisObj = this;
                        if (!$(thisObj).hasClass("swiped") && $(thisObj).find('.rowActionsContainer').css("position") === "absolute") {
                            $(thisObj).addClass("swiped");
                            $(thisObj).find("> div:not(.rowActionsContainer)").css('transform', 'translateX(-'+$(thisObj).find('.rowActionsContainer').width()+'px)');

                            //when on click/touch of non actions area, hide back the actions
                            $(thisObj).on("click.swiped", "*", function(){
                                if ($(this).closest(".rowActions").length === 0) {
                                    $(thisObj).find("> div:not(.rowActionsContainer)").css('transform', 'translateX(0)');
                                    $(thisObj).removeClass("swiped");
                                    $(thisObj).off("click.swiped"); 
                                }
                            });
                        }
                    }

                    var resize = function() {
                        if ($(window).width() < 768) {
                            pointerListener = new PointerListener(listDiv, {
                                supportedGestures : [Pan]
                            });

                            //bind swipeleft event to each data row
                            $(listDiv).find(".data-row").each(function(){
                                if ($(this).find('.rowActions a').length > 0) {
                                    this.addEventListener('swipeleft', onSwipeLeft);
                                }
                            });
                        } else {
                            //unbind swipeleft event to each data row
                            $(listDiv).find(".data-row").each(function(){
                                if ($(this).find('.rowActions a').length > 0) {
                                    this.removeEventListener('swipeleft', onSwipeLeft);
                                }
                            });

                            if (pointerListener) {
                                pointerListener.destroy();
                            }
                        }
                    };    
                    $(window).off("resize.dataList_{{list.id}}")
                        .on("resize.dataList_{{list.id}}", function(){
                        resize();
                    });
                    resize();
                }
            });
        </script>
    </#if>
</div>     
