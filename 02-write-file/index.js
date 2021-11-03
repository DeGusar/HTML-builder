const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin, stdout } = process;
let filePath = path.join(__dirname, 'write.txt');
const newText = fs.createWriteStream(filePath, 'utf-8');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
  
stdout.write('Privet! Write some text...\n');

rl.on('line', line => {
    if (line === 'exit') {
        rl.close()
    } else {
        newText.write(`${line}\n`)
    }
})

process.on('exit', () => stdout.write('Удачи в изучении Node.js!'));