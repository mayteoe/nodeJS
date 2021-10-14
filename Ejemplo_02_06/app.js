const http = require('http');

let options = {
    host: 'google.com',
    port: 80,
    path: '/'
};

http.get(options, function (res) {
    if (res.statusCode == 200) {
        console.log(`Server ${options.host} OK`);
    } else {
        console.log(`Server ${options.host} KO`);
    }

}).on('error', function (e) {
    console.log(`Hay un error: ` + e.message);
});