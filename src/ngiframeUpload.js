(function () {
    'use-strict';
    var defaults = {
        templateUrl: 'ng-uploader.html'
    };
    var templateUrl = defaults.template_url;
    var iframeUpload = function ($templateCache) {

        $templateCache.put(templateUrl,
            '<iframe width="0" height="0" id="{{iframeName}}" name="{{iframeName}}" ng-change="iframeChange()" ></iframe>' +
            '<form style="display: none" action="{{url}}" method="post" enctype="multipart/form-data" target="{{iframeName}}">' +
            '<input type="file" ng-change="fileChange()" name="file" />' +
            '<input type="hidden" ng-repeat="item in hiddens" name="{{item.key}}" value="{{item.value}}" />' +
            '</form>');

        return {
            restrict: 'EA',
            scope: {
                url: '@',
                callback: '&'
            },
            replace: true,
            templateUrl: function (element, attrs) {
                return attrs.templateUrl || defaults.templateUrl;
            },
            link: function (scope, element, attrs) {
                console.log(arguments);
            }
        }
    };
    angular.module('ngUtils', []).directive('ngUploader', iframeUpload);
    iframeUpload.$inject = ['$templateCache'];
    console.log(123);
})();