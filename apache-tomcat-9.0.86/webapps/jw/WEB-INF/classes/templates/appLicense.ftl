<#if close??>
    <script type="text/javascript">
        location.href="${request.contextPath}/web/console/app/${appId}/${version}/builders";
    </script>
<#else>
    <div id="app-license" style="padding:20px 30px;">
        <script>
            AppBuilder = {
                initBuilder: function (callback) {
                    $("#design-btn").attr("title", '@@abuilder.license@@').find("span").text('@@abuilder.license@@');
                    $("#design-btn").after('<a class="btn btn-light" title="@@console.app.common.label.versions@@" id="versions-btn" type="button" data-toggle="button" aria-pressed="false" data-cbuilder-view="versions" href="'+CustomBuilder.contextPath+'/web/console/app/'+CustomBuilder.appId+'/versioning" data-cbuilder-action="switchView" data-hide-tool=""><i class="la la-list-ol"></i> <span>@@console.app.common.label.versions@@</span></a>');
                    $('#save-btn').hide();
                    $('#save-btn').after(' <button class="btn btn-secondary btn-icon" style="display:none;" title="@@console.app.version.label.unpublish@@" id="unpublish-btn" data-cbuilder-action="unpublishApp"><i class="las la-cloud-download-alt"></i> <span>@@console.app.version.label.unpublish@@</button>\
                        <button class="btn btn-primary btn-icon" style="display:none;" title="@@console.app.version.label.publish@@" id="publish-btn" data-cbuilder-action="publishApp"><i class="las la-cloud-upload-alt"></i> <span>@@console.app.version.label.publish@@</span></button>');
                    $("#builderToolbar").append('<span id="app-info">'+AppBuilder.msg('appInfo')+'</div>');

                    <#if status! == 'invalidLicensor'>
                        if (CustomBuilder.appPublished !== "true") {
                            $("#unpublish-btn").hide();
                            $("#publish-btn").show();
                        } else {
                            $("#unpublish-btn").show();
                            $("#publish-btn").hide();
                        }
                    </#if>       

                    CustomBuilder.initBuilderActions();
                    $("body").removeClass("initializing");
                    CustomBuilder.intBuilderMenu();
                    CustomBuilder.builderType = "appLicense";

                    <#if status?? && status! != ''>callback();</#if>
                },
                publishApp: function() {
                    if (confirm('@@console.app.publish.label.confirm@@')) {
                        var callback = {
                            success : function() {
                                $("#unpublish-btn").show();
                                $("#publish-btn").hide();
                                CustomBuilder.appPublished = "true";
                                AppBuilder.reloadVersions();
                            }
                        };
                        ConnectionManager.post(CustomBuilder.contextPath+'/web/console/app'+CustomBuilder.appPath+'/publish', callback, '');
                    }
                },
                unpublishApp: function() {
                    if (confirm('@@console.app.unpublish.label.confirm@@')) {
                        var callback = {
                            success : function() {
                                $("#publish-btn").show();
                                $("#unpublish-btn").hide();
                                CustomBuilder.appPublished = "false";
                                AppBuilder.reloadVersions();
                            }
                        };
                        ConnectionManager.post(CustomBuilder.contextPath+'/web/console/app'+CustomBuilder.appPath+'/unpublish', callback, '');
                    }
                },
                reloadVersions: function() {
                    if ($("#versionsView").length > 0) {
                        $("#versionsView iframe")[0].contentWindow.reloadTable();
                    }
                },
                unloadBuilder: function() {
                    $("#unpublish-btn, #publish-btn, #versions-btn, #app-info").remove();
                    $("#design-btn").attr("title", "@@cbuilder.design@@").find("span").text("@@cbuilder.design@@");
                    $('#save-btn').show();
                    $('.btn-group.tool').css('display', 'inline-block');
                    $("#builder_canvas").css("opacity", "1");
                },
                msg: function(key) {
                    return CustomBuilder.config.msg[key];
                },
            };
        </script>
        <style>
            #builderToolbar div:not(#main-button-group), #save-btn {display:none !important;}
            #app-info a {cursor: none;pointer-events: none;}
        </style>
        <form id="appLicenseForm" class="form" method="POST" action="service">
            <fieldset>
                <#if status! != 'invalidLicensor'><legend>@@enterprise.console.label.appLicense@@</legend></#if>
                <#if message?? && message! != ''>
                    <div style="text-align:center" class="alert alert-danger">
                        ${message!}
                    </div>    
                </#if>
                <#if status! != 'invalidLicensor'>
                    <div class="form-group row">
                        <label for="appId" class="col-sm-2 col-form-label">@@enterprise.console.label.license.appId@@</label>
                        <div class="col-sm-10">
                            <input type="text" readonly class="form-control-plaintext" id="appId" value="${appId!?html}" />
                        </div>
                    </div>
                    <#if isProtectedReadonly! != 'true'>
                        <div class="form-group row">
                            <label for="holder" class="col-sm-2 col-form-label">@@enterprise.console.label.license.holder@@</label>
                            <div class="col-sm-10">
                                <input type="text" readonly class="form-control-plaintext" id="holder" value="${holder!?html}" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="systemKey" class="col-sm-2 col-form-label">@@enterprise.console.label.license.systemKey@@</label>
                            <div class="col-sm-10">
                                <input type="text" readonly class="form-control-plaintext" id="systemKey" value="${systemKey!?html}" />
                            </div>
                        </div>
                    </#if>   
                    <div class="form-group row">
                        <label for="username" class="col-sm-2 col-form-label">@@enterprise.console.label.username@@ <span style="color:red;">*</span></label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="username" name="username" value="" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="password" class="col-sm-2 col-form-label">@@enterprise.console.label.password@@ <span style="color:red;">*</span></label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control" id="password" name="password" value="" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="license" class="col-sm-2 col-form-label">@@enterprise.console.label.appLicense@@ <span style="color:red;">*</span></label>
                        <div class="col-sm-10">
                            <textarea id="license" class="form-control"  name="license" cols="40" rows="10"></textarea>
                        </div>
                    </div>
                </#if>       
            </fieldset>
            <#if status! != 'invalidLicensor'>
                <div class="form-buttons">
                    <input class="form-button btn btn-primary button" type="submit" value="@@enterprise.console.label.submit@@" />
                    <input type="hidden" name="appId" value="${appId!}" />
                    <input type="hidden" name="version" value="${version!}" />
                    <input type="hidden" name="spot" value="appLicense" />
                    <input type="hidden" name="action" value="submit" />
                </div> 
            </#if>        
        </form>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
    </div>
</#if>

