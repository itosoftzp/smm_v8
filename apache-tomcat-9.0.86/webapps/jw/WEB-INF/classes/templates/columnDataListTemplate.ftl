<style>
    body.rtl #dataList_{{list.id}} .table-wrapper .ph_columns {
        text-align: right;
    }
</style>
<div class="list-group p-0 border-0">
    {{rows data-cbuilder-highlight="@@datalist.simpleListTemplate.list@@" data-cbuilder-style="[{'prefix' : 'list', 'class' : '.list-group-item', 'label' : '@@datalist.simpleListTemplate.list@@'}]"}}
        <div class="data-row list-group-item d-md-flex align-items-center {{actionsStyle}}"
            style="position:relative">
            {{selector}}
                <div class="px-3">{{body}}</div>
            {{selector}}
            {{columns data-cbuilder-sort-horizontal data-cbuilder-style="[{}, {'prefix' : 'header', 'class' : 'div > .label', 'label' : '@@datalist.simpleCardTemplate.label@@'}]"}}
                <div class="flex-fill row">
                    {{column}}
                       <div class="px-md-3 col-12 col-md" style="margin-bottom: 5px;word-wrap: break-word;min-width: 100px;">
                            <strong class="label" style="font-size:80%; display:block;">{{label||@@datalist.simpleCardTemplate.label@@}}</strong>
                            <span>{{body||@@datalist.simpleCardTemplate.textContent@@}}</span>
                       </div>
                    {{column}}
                    <div class="extraDataPlaceholder col-12"></div>
                </div>
            {{columns}}
            <#if element.properties.actionsStyle! == 'normalActions' || element.properties.actionsStyle! == 'swipeActions'>
                {{rowActions}}
                    <div class="px-md-3 rowActionsContainer">
                        <div class="rowActions" data-cbuilder-sort-horizontal>{{rowAction}}</div>
                    </div>
                {{rowActions}}
            <#else>
                {{rowActions attr-class="dropdown-item"}}
                    <div class="dropdown px-md-3">
                        <a data-toggle="dropdown" class="btn btn-secondary dropdown-toggle" tabindex="0" style="cursor:pointer;">
                            @@dbuilder.type.actions@@
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
