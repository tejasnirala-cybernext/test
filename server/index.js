const http = require('http')
const fs = require('fs')
const url = require('url')

const PORT = 8000
const myserver = http.createServer((req, res) => {
    if(req.url === "/favicon.ico") return res.end()
    const log = `${Date.now()} ${req.method} : ${req.url} : -> Req received\n`
    const myUrl = url.parse(req.url, true)
    // console.log(myUrl);
    fs.appendFile("logs.log", log, (err, data) => {
        switch (myUrl.pathname) {
            case "/":
                res.end("Homepage");
                break;
            
            case "/about":
                const username = myUrl.query.name;
                res.end(`Hi, ${username}. How are you?`);
                break;

                // HTTP methods: GET, POST, PUT, PATCH, DELETE
            case "/signup":
                if(req.method === "GET"){
                    res.end("This is a signup form. :)")
                } else if (req.method === "POST"){
                    // some DB Query commands.
                    res.end("Submit in POST method is successful. :)")
                };
                break;
            
            default:
                res.end("404: Not Found :(");
                break;
        }
    } )
})

myserver.listen(PORT, () => console.log(`Server started on PORT:${PORT} !`))