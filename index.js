const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const {EOL} = require('os');

const siteCss = require('./content/styles/site.css');
const catShelterHtml = require('./views/catShelter.html');
const { readFile } = require('fs/promises');


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

function path(path){
    return  fs.readFile(path, {encoding: 'utf-8'});

     
}

function render(html, data){
    html = html.toString();

    const resultHtml =  Object
        .keys(data)
        .reduce((result, key) => result.replaceAll(`{{${key}}}`, data[key]), html);

    return resultHtml;
}



async function renderCat(catData){
    let catHtml = await readFile('./views/cat.html');

    return render(catHtml, catData);
}



async function renderHome(cats) {
    let indexHtml = await readFile('./views/home/index.html');
    const catsHtmlResult = await Promise.all(cats.map(renderCat));

    return render(indexHtml, {cats: catsHtmlResult.join('\n')});
    
}

function parsePart(part){
    const namePattern = new RegExp(`name="(.+)"`, 'm');
    const valuePattern = new RegExp(`${EOL}${EOL}(.*)${EOL}`, 'm');
    
    const [match, name] = part.match(namePattern);
    const [_, value] = part.match(valuePattern);
    console.log(name);
    console.log(value);
    
    return [name, value];
}

const server = http.createServer( async (req, res) => {

    if ( req.url === '/styles/site.css'){
        res.writeHead(200, {
            'content-type': 'text/css',
        });
        res.write(siteCss);
        return res.end();
         
    }
    
    
    switch (req.url) {
        case '/':
            const indexHtml = await renderHome(cats);

            res.write(indexHtml);
            return res.end();
        case '/cats/add-breed':
            const addBreedHtml = await readFile('./views/addBreed.html');
            res.write(addBreedHtml);
            return res.end();
        case '/cats/add-cat':

            if ( req.method === 'GET'){
                const addCatHtml = await readFile('./views/addCat.html')
                res.write(addCatHtml);
            }else if ( req.method === 'POST'){
                let body = '';
                req.on('data', (chunk) => {
                    body += chunk;
                });
                req.on('end', async () => {
                    const boundary = req.headers['content-type'].split('boundary=').at(1);
                    const parts = body.split(`--${boundary}`).filter(part => !!part).slice(0, -1);

                    const [name, value] = parsePart(parts[2]);
                    console.log(name);
                    console.log(value);
                    await fs.writeFile(`./uploads/image.jpg`, value, {encoding: 'binary'});

                    res.end();
                });
            }
            
            break;
        case '/cats/edit-cat':
            const editCatHtml = await readFile('./views/editCat.html');
            res.write(editCatHtml);
            return res.end();
            
        case '/cats/cat-shelter':
            res.write(catShelterHtml);
            return res.end();
            
    default:
                // TO DO return error page
        res.write(`<h1>Page Not Found!</h1>`);
        return res.end();
        
        }
   
    
});

server.listen(port);
console.log(`Server is listening on http://localhost:${port}`);
