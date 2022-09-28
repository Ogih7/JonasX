const fs = require("fs");
const path = require("path")
const http = require("http");
const hostname = "localhost";
const port = 3000;


const server = http.createServer((req,res)=>{
    // console.log(req.headers);
    console.log(`Request for ${req.url} by ${req.method}`);
    // res.statusCode = 200,
    // res.setHeader = ('content-type', 'text/html'),
    // res.end('<html><body>Hello World</body></html>')

    if (req.method === 'GET'){
        var fileUrl;
        if (req.url === '/'){
            fileUrl = '/index.html'
        }else{
            fileUrl = req.url;
        }
        var filePath = path.resolve('./public' + fileUrl);
        const fileExt = path.extname(filePath);
        if (fileExt === '.html'){
            fs.exists(filePath,(exists)=> {
                if(!exists){
                    res.statusCode = 404,
                    res.setHeader = ('content-type', 'text/html'),
                    res.end('<html><body> Werey E no dey there</body></html>')
                    return;
                }else{
                    res.statusCode = 200,
                    res.setHeader = ('content-type', 'text/html'),
                    fs.createReadStream(filePath).pipe(res);
                }
            })
        }else{
            res.statusCode = 404,
            res.setHeader = ('content-type', 'text/html'),
            res.end(`<html><body>${fileUrl} is not html </body></html>`)
        }
    }else{
        res.statusCode = 404,
        res.setHeader = ('content-type', 'text/html'),
        res.end(`<html><body>${req.method} is not supported </body></html>`)
    }
});

server.listen(port,hostname, ()=> {
    console.log(`server is listening ${port}`);
    
});