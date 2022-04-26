const http = require ('http');
const fs= require ('fs');
const os = require ('os');
const Port = 4001;
const host = '127.0.0.1';



const Server = http.createServer((req, res)=>{
    var UrlPath = req.url;
    
    if (UrlPath=== '/'){    
        fs.readFile('./Pages/index.html', 'utf-8', (err, data)=>{
           res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');   
           res.end(data);  
        });
    } 

    else if (UrlPath==='/about'){
        fs.readFile('./Pages/about.html', 'utf-8', (err, data)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        });
    }

    else if (UrlPath==='/sys'){
        const obj = {
            hostname: os.hostname(), 
            platform: os.platform(),
            architecture: os.arch(),
            numberOfCPUS: os.cpus(),
            networkInterfaces: os.networkInterfaces(),
            uptime: os.uptime()
        };
        const myJSON = JSON.stringify(obj);
        fs.writeFile('osinfo.json', `${myJSON}`, (err, data)=>{     
            res.setHeader('Content-Type', 'text/plain');
            res.end('Your OS info has been saved Successfully');
        });
    }


    else {
        fs.readFile('./Pages/404.html', 'utf-8', (err, data)=>{
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        });
    }


    
});




Server.listen(Port, host, ()=> {
console.log(`Server running on ${host}:${Port}`);
});


