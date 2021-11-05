const fs = require('fs');
const path = require('path');

let pathDest = path.join(__dirname, 'project-dist')
let pathAssets = path.join(__dirname, 'assets');
let pathComponents = path.join(__dirname, 'components');
let pathStyles = path.join(__dirname, 'styles');
let pathTemplate = path.join(__dirname,'template.html')
fs.promises.mkdir(pathDest, { recursive: true });
fs.stat(path.join(pathDest, 'assets'), function (error) {
    if (!error) {
        fs.promises.rm(path.join(pathDest, 'assets'), { recursive: true }).then(result => {
            fs.promises.mkdir(path.join(pathDest, 'assets'), { recursive: true });
            duplicate(pathAssets,path.join(pathDest, 'assets'))
        })
    } else {
        fs.promises.mkdir(path.join(pathDest, 'assets'), { recursive: true });
        duplicate(pathAssets,path.join(pathDest, 'assets'))}
}) 

fs.promises.readFile(pathTemplate, 'utf-8').then(result => {
    let tags = result.match(/{{(.*)}}/gi);
    tags.forEach(item => {
      let  tag = item.replace(/([^a-z]*)/gi, '');
        fs.promises.readFile(path.join(pathComponents, `${tag}.html`),'utf-8').then(comp => {
            result = result.replace(item, comp)
            fs.promises.writeFile(path.join(pathDest, 'index.html'), result)
        })
        })
    
  })

fs.promises.readdir(pathDest).then(data => {
    data.forEach(bundle => {
        if (bundle == 'style.css') {
            fs.promises.writeFile(path.join(pathDest,bundle), '')
           
        }
    })
})

fs.promises.readdir(pathStyles).then(styles => {
    styles.forEach(style => {
        if (path.extname(style) === '.css') {
            readableStream = fs.createReadStream(path.join(pathStyles, style), "utf8");
            readableStream.on('data', data => {
                fs.promises.appendFile(path.join(pathDest, 'style.css'), data)
            })
           
        }
       
    })
})

function duplicate(srcFolder, destFolder) {
    fs.promises.readdir(srcFolder, { withFileTypes: true }).then(files => {
        files.forEach(file => {
            let newSrcFolder = path.join(srcFolder, file.name);
            let newDestFolder = path.join(destFolder, file.name);
            if (file.isDirectory()) {
                fs.promises.mkdir(newDestFolder, { recursive: true })
                duplicate(newSrcFolder, newDestFolder);
            } else if (file.isFile()) {
                fs.promises.copyFile(newSrcFolder, newDestFolder);
            }
        })
    })
}

