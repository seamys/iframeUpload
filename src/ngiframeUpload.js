(function () {
    'use-strict';

    var defaults = {
        templateUrl: 'ng-iframeUpload.html'
    };
    var iframeUpload = function ($templateCache) {
        $templateCache.put(defaults.template_url,
            '<iframe width="0" height="0" id="{{iframeName}}" name="{{iframeName}}"></iframe>' +
            '<form style="display: none" action="{{url}}" method="post" enctype="multipart/form-data" target="{{iframeName}}">' +
            '<input type="hidden" ng-repeat="item in hiddens" name="{{item.key}}" value="{{item.value}}" /></form>');
        return {
            restrict: 'EA',
            scope: {
                images: '=',
                thumbsNum: '@'
            },
            controller: [
                '$scope',
                function ($scope) {
                    $scope.$on('ng-change', function (e, args) {
                        $scope.openGallery(args.index);
                    });
                }
            ],
            templateUrl: function (element, attrs) {
                return attrs.templateUrl || defaults.templateUrl;
            }
        }
    };
    angular.module('iframeUpload', []).directive('iframeUpload', iframeUpload);
    iframeUpload.$inject = ['$templateCache'];
})();