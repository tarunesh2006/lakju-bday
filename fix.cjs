const fs = require('fs');
let code = fs.readFileSync('main.js', 'utf8');
code = code.replace(/\/images\//g, './images/');
fs.writeFileSync('main.js', code);

let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/\/music\//g, './music/');
fs.writeFileSync('index.html', html);
console.log('Fixed paths!');
