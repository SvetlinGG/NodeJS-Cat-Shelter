const http = require('http');

const indexHtml = require('./views/home/index.html');
const siteCss = require('./content/styles/site.css');
const addBreedHtml = require('./views/addBreed.html');
const addCatHtml = require('./views/addCat.html');

const port = 2000

const server = http.createServer((req, res) => {

    if ( req.url === '/styles/site.css'){
        res.writeHead(200, {
            'content-type': 'text/css',
        });
        res.write(siteCss);
        return res.end();
         
    }
    
    
        switch (req.url) {
            case '/':
                res.write(indexHtml);
                break;
            case '/cats/add-breed':
                res.write(addBreedHtml);
                break;
            case '/cats/add-cat':
                res.write(addCatHtml);
                break;
            default:
                // TO DO return error page
                res.write(`<h1>Page Not Found!</h1>`)
                break;
        }
   
    res.end();
});

server.listen(port);
console.log(`Server is listening on http://localhost:${port}`);
