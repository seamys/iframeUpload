/*! Iframeupload - v0.1.0 - 2016-03-24
* https://github.com/seamys/iframeUpload
* Copyright (c) 2016 seamys; Licensed MIT */
(function ($) {
    $.fn.iframeUpload = function (option) {
        var root = this.eq(0),
            rootForm,
            rootContain,
            formEle,
            iframeEle,
            iframeName,
            fileParent,
            defaults = {
                url: '',
                hidden: { tempKey: '' },
                analysis: function () { },
                loading: 'Uploading ...'
            };
        defaults = $.extend({}, defaults, option);
        var method = {
            init: function () {
                if (this.isFile()) {
                    rootForm = root.parents("form");
                    fileParent = root.parent();
                    method.rootChange();
                }
            },
            getIframe: function () {
                if (!iframeEle) {
                    iframeName = "iframe_" + (new Date() - 0);
                    iframeEle = $('<iframe  width="0" height="0" id="' + iframeName + '" name="' + iframeName + '"></iframe>');
                    iframeEle.hide();
                    iframeEle.on("load", function () {
                        var doc;
                        if (document.all) {//ie
                            doc = document.frames[iframeName].document;
                        } else {//firefox    
                            doc = document.getElementById(iframeName).contentDocument;
                        }
                        var text = $(doc).text();
                        if ($.trim(text) !== '') {
                            defaults.analysis(text);
                        }
                        method.clear();
                    });
                }
                return iframeEle;
            },
            append: function () {
                rootContain.append(method.getIframe());
                method.getForm().append(root);
                rootContain.append(formEle);
            },
            isFile: function () {
                return root.attr("type") === "file";
            },
            getForm: function () {
                if (!formEle) {
                    formEle = $('<form style="display: none" action="' + defaults.url + '" method="post" enctype="multipart/form-data" target="' + iframeName + '"> </form>');
                    $.each(defaults.hidden, function (k, v) {
                        $('<input type="hidden" name="' + k + '" value="' + v + '"/>').appendTo(formEle);
                    });
                }
                return formEle;
            },
            rootChange: function () {
                root.on("change", function () {
                    (rootForm.length === 0 ? method._onFormInit : method._FormInit)();
                    root.parent("form").submit();
                });
            },
            clear: function () {
                root.appendTo(fileParent);
                formEle.remove();
                iframeEle.remove();
                iframeEle = null;
                formEle = null;
            },
            _onFormInit: function () {
                rootContain = fileParent;
                method.append();
            },
            _FormInit: function () {
                if (!rootContain) {
                    rootContain = $("<span></span>");
                    rootContain.hide();
                }
                rootForm.after(rootContain);
                method.append();
            }
        };
        method.init();
        return this;
    };
})(jQuery);