    <div id="main-body-header">
        @@app.edm.label.forgotPassword@@
    </div>
    <div id="main-body-content">
        <#if updated! == "true">
            <p>@@app.edm.message.passwordReset@@</p>
        <#else>
            <#if errors??>
                <div class="form-errors">
                    <#list errors! as error>
                        ${error!}<br/>
                    </#list>
                </div>
            </#if>
            <form id="forgotPassword" action="?a=fps" class="form" method="POST">
                <fieldset>
                    <div class="form-row">
                        <label for="username">@@app.edm.label.username@@</label>
                        <span class="form-input"><input id="username" name="username" type="text" value=""/> *</span>
                    </div>
                    <#if enableCaptcha! == "true">
                        <div class="form-row">
                            <label for="captcha">@@app.edm.label.captcha@@</label>
                            <span class="form-input">
                                <img id="captcha_img" src="${request.contextPath}/web/json/plugin/org.joget.plugin.directory.UserSecurityImpl/service?a=cptha&_t=${timestamp}" title="@@app.edm.title.refresh@@" onclick="$(this).attr('src', $(this).attr('src').substring(0, $(this).attr('src').indexOf('?'))+'?_t='+(new Date()).getTime()+'&reload=true&a=cptha');"/><br/>
                                <label for="username">@@app.edm.label.captcha.desc@@</label>
                                <input id="captcha_value" name="captcha_value" type="text" value="" /> *
                            </span>
                        </div>
                    </#if>
                </fieldset>
                <div class="form-buttons">
                    <input class="form-button btn button" type="submit" value="@@app.edm.label.submit@@" />
                </div>
            </form>
        </#if>
    </div>