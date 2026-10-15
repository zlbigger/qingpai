const {JSDOM}=require('jsdom');
const fs=require('node:fs'),assert=require('node:assert/strict');
const source=fs.readFileSync('content.js','utf8');
const functions=source.slice(source.indexOf('  function layoutTable('),source.indexOf('  function enforceLayout('));
const dom=new JSDOM('<body>',{runScripts:'outside-only'}),d=dom.window.document;
const layout=dom.window.eval('(function(){'+functions+';return layoutTable;})()');
for(const n of [2,3,4,6,9])for(const gap of [0,4,16]){
 const cols=n===2||n===4?2:3,images=Array.from({length:n},()=>d.createElement('img'));
 const root=layout(images,cols,gap);
 for(const node of root.querySelectorAll('[style]')){
  // Observed publication filter drops declarations containing calc().
  for(const prop of Array.from(node.style))if(node.style.getPropertyValue(prop).includes('calc('))node.style.removeProperty(prop);
 }
 const rows=root.querySelectorAll('[data-qingpai-v6-row]');assert.equal(rows.length,n/cols);
 for(const row of rows){assert.equal(row.children.length,cols);for(const cell of row.children){assert.equal(parseFloat(cell.style.width),100/cols);assert.equal(cell.style.flexBasis,cell.style.width);assert.equal(cell.style.boxSizing,'border-box');assert.equal(parseFloat(cell.style.paddingLeft),gap/2);assert.equal(parseFloat(cell.style.paddingRight),gap/2);assert.equal(cell.firstChild.style.width,'100%');assert.equal(cell.firstChild.style.height,'auto');}}
}
console.log('Published layout: percentage column widths survive calc filtering for 2/3/4/6/9 images and 0/4/16px gutters.');
