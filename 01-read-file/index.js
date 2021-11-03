const fs = require('fs');
const path = require('path');

let data = "";
let textPath = path.join(__dirname, 'text.txt');
let readableStream = fs.createReadStream(textPath, "utf8");
readableStream.on('data', chunk => data += chunk);
readableStream.on('end',() => console.log(data));


