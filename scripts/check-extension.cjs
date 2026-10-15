const fs=require('node:fs'),assert=require('node:assert/strict');
for(const file of ['content.js','page-bridge.js','background.js','manifest.json'])assert.equal(fs.readFileSync(file,'utf8'),fs.readFileSync('extension/'+file,'utf8'),file+' must match extension/');
assert.equal(JSON.parse(fs.readFileSync('manifest.json')).version,JSON.parse(fs.readFileSync('package.json')).version);
console.log('Extension source and install directory match.');
