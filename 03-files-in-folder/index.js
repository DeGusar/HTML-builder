const fs = require('fs');
const path = require('path');

pathFolder = path.join(__dirname, 'secret-folder');
fs.promises.readdir(pathFolder, {withFileTypes: true}).then(filenames => {
    filenames.forEach(item => {
        if (item.isFile()) {
           let dividedName =  item.name.split('.')
            fs.promises.stat(path.join(pathFolder, item.name)).then(stats => {
                console.log(`${dividedName[0]} - ${dividedName[dividedName.length - 1]} - ${stats.size}b`);
           }) 
     }
  })
})
  