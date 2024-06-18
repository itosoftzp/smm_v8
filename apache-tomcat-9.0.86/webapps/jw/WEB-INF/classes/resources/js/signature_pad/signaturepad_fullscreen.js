(function ($) {
    $.fn.extend({
        signaturePadFullscreen: function (o) {
            var target = this;
            //initial the signature pad
            var signaturePad = $(target).signaturePad(o);

            var canvas = $(target).find('.pad')[0];
            var paths = signaturePad.getSignature();

            var prevCanvasWidth = canvas.width;
            var prevCanvasHeight = canvas.height;

            var aspectRatio = canvas.width/canvas.height;

            $(target).find('.clearButton').on('mousedown click',function () {
                signaturePad.clearCanvas();
                paths = signaturePad.getSignature();
            });

            $(target).find('.fullscreenButton').on('mousedown click', function (event) {
                //Check if browser supports fullscreen api, if it doesn't, it will return
                // false/undefined
                if (document.fullscreenEnabled){
                    if (!$(target).fullScreen()) {
                        // Toggle fullscreen
                        paths = signaturePad.getSignature();
                        $(target).addClass("fullscreen-active");
                        $(target).fullScreen(true);
                        return false;
                    } else {
                        // Exit fullscreen
                        paths = signaturePad.getSignature();
                        $(target).fullScreen(false);
                        return false;
                    }
                }
                else{
                    //if user exits full screen mode, else, user enters full screen
                    if ($(target).hasClass("fullscreen")){
                        paths = signaturePad.getSignature();
                        $(target).removeClass("fullscreen")
                        handleFullscreenChange()
                    }else {
                        paths = signaturePad.getSignature();
                        $(target).addClass("fullscreen")
                        handleFullscreenChange()
                    }
                }
            });

            //Debounce function, to delay by 100ms, to ensure the function won't
            //be called more than once due to unexpected behavior
            function debounce(func, wait, immediate) {
                var timeout;
                return function () {
                    var context = this,
                    args = arguments;
                    var later = function () {
                        timeout = null;
                        if (!immediate) func.apply(context, args);
                    };
                    var callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                    if (callNow) func.apply(context, args);
                };
            }

            //Handle orientation change
            // Listen for orientation change event and trigger the handleFullscreenChange function
            $(window).on("resize", debounce(function (event) {
                handleFullscreenChange();
            },100)
            );
            
            //Detects screen changes (entering full screen and exiting full screen),
            //and adjust the containers and other important things.
            $(target).bind("fullscreenchange", handleFullscreenChange);

            function handleFullscreenChange() {
                var element = $(target);
                var button = element.find(".fullscreenButton");
                var canvas = element.find(".pad");
                if ($(target).fullScreen() || $(target).hasClass("fullscreen")) {
                    if (element.width() / element.height() > aspectRatio) {
                        canvas.attr("width", element.height() * aspectRatio);
                        canvas.attr("height", element.height());
                    } else {
                        canvas.attr("height", element.width() / aspectRatio);
                        canvas.attr("width", element.width());
                    }
                    paths = signaturePad.getSignature();
                    paths = scaleCanvas(paths);
                    signaturePad.clearCanvas();
                    signaturePad.regenerate(paths);
                    button.html('<i class="fas fa-compress-arrows-alt"></i>');
                } else {
                    canvas.attr("width", o.width);
                    canvas.attr("height", o.height);
                    paths = signaturePad.getSignature();
                    paths = scaleCanvas(paths);
                    signaturePad.clearCanvas();
                    signaturePad.regenerate(paths);
                    $(target).removeClass("fullscreen-active");
                    button.html('<i class="fas fa-expand-arrows-alt"></i>');
                }
                paths = signaturePad.getSignature();
            };

            //Function to scale the canvas appropriately.
            function scaleCanvas(pathArray) {
                signaturePad.clearCanvas();
                if (pathArray.length > 0) {
                    for (const data of pathArray) {
                        //lx: The lineTo() x coordinate
                        data.lx *= canvas.width / prevCanvasWidth;
                        //The lineTo() y coordinate
                        data.ly *= canvas.height / prevCanvasHeight;

                        //The moveTo() x coordinate
                        data.mx *= canvas.width / prevCanvasWidth;

                        //The moveTo() y coordinate
                        data.my *= canvas.height / prevCanvasHeight;
                    }
                }

                prevCanvasWidth = canvas.width;
                prevCanvasHeight = canvas.height;

                return pathArray;
            }

            return signaturePad;
        }
    });
})(jQuery);

