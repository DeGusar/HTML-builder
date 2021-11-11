const fs = require('fs');
const path = require('path');

pathFolder = path.join(__dirname, 'secret-folder');
fs.promises.readdir(pathFolder, {withFileTypes: true}).then(filenames => {
    filenames.forEach(item => {
        if (item.isFile()) {
            let itemPath = path.join(pathFolder, item.name);
            fs.promises.stat(itemPath).then(stats => {
                console.log(`${path.basename(itemPath, path.extname(itemPath))} - ${path.extname(itemPath).slice(1)} - ${stats.size}b`);
           }) 
     }
  })
})
  