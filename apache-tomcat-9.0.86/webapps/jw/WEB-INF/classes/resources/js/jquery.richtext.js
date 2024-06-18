(function($){
    $.fn.extend({
        richtext : function(o){
            var target = this;
            var id = $(target).attr("id");
            
            var height = 350;
            if (!(o.height === undefined || o.height === "")) {
                try {
                    height = parseInt(o.height);
                } catch (err) {}
            }
            
            //check previous editor is still exist, if yes then remove it
            var prevEditor = tinymce.get(id);
            if (prevEditor !== null) {
                prevEditor.remove();
            }
            
            tinymce.baseURL = o.contextPath + "/js/tiny_mce/js/tinymce";
            tinymce.suffix = '.min';
            const custom_upload_handler = (blobInfo, progress) => new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.withCredentials = false;
                xhr.open('POST', o.serviceUrl);

                xhr.upload.onprogress = (e) => {
                    progress(e.loaded / e.total * 100);
                };

                xhr.onload = () => {
                    if (xhr.status === 403) {
                        reject({ message: 'HTTP Error: ' + xhr.status, remove: true });
                        return;
                    }

                    if (xhr.status < 200 || xhr.status >= 300) {
                        reject('HTTP Error: ' + xhr.status);
                        return;
                    }
                    const json = JSON.parse(xhr.responseText);

                    if (json && json.error !== undefined) {
                        reject(json.error);
                    } else if (!json || typeof json.filename != 'string') {
                        reject('Invalid JSON: ' + xhr.responseText);
                        return;
                    }
                    resolve(o.serviceUrl + "&_path=" + encodeURIComponent(json.path));
                };

                xhr.onerror = () => {
                  reject('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
                };

                const formData = new FormData();
                formData.append(o.paramName, blobInfo.blob(), blobInfo.filename());
                xhr.send(formData);
            });
            var themeSkin = "oxide";
            var contentCss = "default";
            if ($("body").hasClass("dark-mode")){
                themeSkin = "oxide-dark";
                contentCss = "dark";
            }
            
            var options = {
                selector: "[id='"+id+"']",
                height: height,
                menubar: false,
                image_advtab: true,
                convert_urls : false,
                relative_urls: false,
                images_upload_url: o.serviceUrl,
                promotion: false,
                skin: themeSkin,
                content_css: contentCss,
                images_upload_handler: custom_upload_handler
            };
            
            if (o.mode === undefined || o.mode === "") {
                options['plugins'] = 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table';
                options['toolbar'] = 'undo redo | formatselect | styles fontsize | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media table | removeformat';
            } else {
                options['plugins'] = 'advlist autolink lists link image charmap preview anchor pagebreak searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking table directionality emoticons codesample';
                options['toolbar1'] = 'undo redo | formatselect | styles fontsize | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media table codesample | forecolor backcolor emoticons | removeformat print preview | ltr rtl';
                options['menubar'] = 'edit insert view format table tools';
            }
            
            //to support custom settings added in plugin configuration, this allow adding custom formatting
            if (o.customSettings !== null && o.customSettings !== undefined && o.customSettings.startsWith("{") && o.customSettings.endsWith("}") ) {
                try {
                    var customSettings = "[" + o.customSettings + "]";
                    var customSettingsObj = eval(customSettings);
                    options = $.extend( options, customSettingsObj[0]);
                } catch (err) {}
            }
            
            tinymce.init(options);
        }
    });
})(jQuery);
