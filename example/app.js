var express = require('express');
var path = require('path');
var multiparty = require('multiparty');
var fs = require('fs');
var app = express();
app.use(express.static(__dirname));

app.post('/upload', function (req, res) {
    var files = __dirname + '/files/';
    var storage = function () {
        var form = new multiparty.Form({ autoFiles: true, uploadDir: __dirname + '/files/' });
        form.on('file', function (name, file) {
            var url = '/files/' + (new Date() - 0) + path.extname(file.path);
            fs.rename(file.path, __dirname + url, function (err) {
                if (err) throw err;
                console.log('renamed complete');
                res.send(url);
            });
        });
        form.parse(req);
    }
    var mkdir = function (err, stats) {
        if (err || !stats.isDirectory()) {
            fs.mkdirSync(files);
        }
        storage();
    }
    fs.stat(files, mkdir);
});

app.get('/upload', function (req, res) {
    console.log(fs);
    res.setHeader('Content-Type', 'text/html');
    res.send(
        'You can only post to "/upload".  Visit <a href="Index.html">Index</a> for more usage options. '
    );
});

var port = process.env.PORT || 3000;

app.listen(port);

console.log('Server started.  Running at http://localhost:' + port);