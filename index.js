const finder = require('findit')(process.argv[2] || './content');
const fs = require('fs');
const readline = require('readline');
const http = require('http');
const https = require('https');


const expressionHttp = /http:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
const expressionHttps = /https:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
const regexHttp = new RegExp(expressionHttp);
const regexHttps = new RegExp(expressionHttps);

fs.appendFileSync('results.txt', "");
fs.appendFileSync('errors.txt', "");


function findBrokenLinks(){
        finder.on('file', function (fileLocation) {
            let file = fs.readFileSync(fileLocation, "utf8");
            readline.clearLine(process.stdout, 0);
            readline.cursorTo(process.stdout, 0);
            process.stdout.write(fileLocation);
            let httpUrls = [];
            let httpsUrls = [];
            httpUrls = file.match(regexHttp);
            httpsUrls = file.match(regexHttps);
            if(httpUrls != null){
                checkUrls(fileLocation, httpUrls, http);
            }
            if(httpsUrls != null){
                checkUrls(fileLocation, httpsUrls, https);
            }
            
            
        });
}

function checkUrls(fileLocation, urls, httpBase){
    for(let i = 0; i < urls.length; i++){
        let options = {method: 'HEAD'};
        let req = httpBase.request(urls[i], options, function(res) {
            if(res.statusCode == "404"){
                let result = fileLocation + "\n" + res.statusCode +  " " 
                + res.statusMessage + "\n" + res.req._headers.host + res.req.path + "\n";
                fs.appendFileSync('results.txt', result);
            }
      }
    )
        req.end();
        req.on("error", (error) => {
            fs.appendFileSync('errors.txt', error);
        })
        

    }
}


findBrokenLinks();




