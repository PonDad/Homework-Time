var exec = require('child_process').exec,
    child;
;

child = exec('./ngrok http 8080 --region=ap',
    function(error, stdout, stderr) {
        console.log(stdout);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
