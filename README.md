# IframeUpload

最简单的jQuery文件上传插件，不需要浏览器支持flash，html5，理论上支持现有所有浏览器。

![演示](http://images2015.cnblogs.com/blog/329473/201603/329473-20160324105235198-413611840.gif)

## 快速开始

1.引入外部资源

``` html
<!--1.引入jQuery 脚本-->
<script src="jquery.js"></script>
<!--2.引入上传插件脚本-->
<script src="dist/iframeUpload.min.js"></script>
```
2.调用插件
``` html
<div id="show"></div>
<input type="file" id="upload">
<script>
 $("#upload").iframeUpload({
     url: '/upload',
     analysis: function (doc) {
	    //图片上传成功后在 div中显示
        $("#show").append($('<img height="150"/>').attr("src", doc));
     }
 });
</script>
```
3.完成

## 说明文档

参数说明：

`url`:服务器上传文件地址

`hidden`:与图片一起提交的参数，例子：{ tempKey: '' }

`analysis`:当文件上传成功后，回调此方法, doc 参数是服务器的响应。

`loading`:显示上传文字

## Examples

[nodejs 服务端上传](https://github.com/seamys/iframeUpload/tree/master/example/nodejs)

## Release History

- 2016-03-24 10:31:25 发布插件 v1.0.1
- 2016-03-24 10:31:44 修付插件在上传时显示其他iframe 或者 form 表单 v1.0.1
 
