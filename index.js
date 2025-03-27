const http = require('http');

const indexTemplate = require('./views/home/index.html');
const siteCss = require('./content/styles/site.css');
const addBreedHtml = require('./views/addBreed.html');
const addCatHtml = require('./views/addCat.html');
const editCatHtml = require('./views/editCat.html');


const port = 2000;

const cats = [
    {
        id: 1,
        imageUrl: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg" alt="Black Cat',
        name: 'Pretty Kitty',
        breed: 'Bombay Cat',
        description: 'Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.',
    },
    {
        id: 2,
        imageUrl: 'https://cdn.pixabay.com/photo/2015/06/19/14/20/cat-814952_1280.jpg',
        name: 'Sunny',
        breed: 'Angora',
        description: 'Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.',
    },
    {
        id: 3,
        imageUrl:"https://cdn.pixabay.com/photo/2018/08/08/05/12/cat-3591348_1280.jpg",
        name: 'Murry',
        breed: 'Persian',
        description: 'Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.',
    },
    {
        id: 4,
        imageUrl: "https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_1280.jpg",
        name: 'Navcho',
        breed: 'Sphinks',
        description: 'Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.',
    },
    {
        id: 5,
        imageUrl: "https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_1280.jpg",
        name: 'Sunny',
        breed: 'Nqkakva',
        description: 'Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.',
    }
];

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
                res.write(indexTemplate(cats));
                break;
            case '/cats/add-breed':
                res.write(addBreedHtml);
                break;
            case '/cats/add-cat':
                res.write(addCatHtml);
                break;
            case '/cats/edit-cat':
                res.write(editCatHtml);
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
