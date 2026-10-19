const {JSDOM}=require('jsdom');
const fs=require('node:fs'),assert=require('node:assert/strict');
const source=fs.readFileSync('content.js','utf8');
const functions=source.slice(source.indexOf('  function layoutTable('),source.indexOf('  function enforceLayout('));
const dom=new JSDOM('<body>',{runScripts:'outside-only'}),d=dom.window.document;
const {layoutTable:layout,orderedImages}=dom.window.eval('(function(){'+functions+';return {layoutTable,orderedImages};})()');
for(const n of [2,3,4,6,9])for(const gap of [0,4,16]){
 const cols=n===2||n===4?2:3,images=Array.from({length:n},()=>d.createElement('img'));
 const root=layout(images,cols,gap);assert.deepEqual(orderedImages(root).map(img=>Number(img.getAttribute('data-qingpai-order'))).join(','),images.map((_,index)=>index).join(','));
 for(const node of root.querySelectorAll('[style]')){
  // Observed publication filter drops declarations containing calc().
  for(const prop of Array.from(node.style))if(node.style.getPropertyValue(prop).includes('calc('))node.style.removeProperty(prop);
 }
 const rows=root.querySelectorAll('[data-qingpai-v6-row]');assert.equal(rows.length,1);assert.equal(rows[0].children.length,cols);
 for(const [colIndex,column] of Array.from(rows[0].children).entries()){assert.equal(parseFloat(column.style.width),100/cols);assert.equal(column.style.flexBasis,column.style.width);assert.equal(column.style.boxSizing,'border-box');assert.equal(parseFloat(column.style.paddingLeft),gap/2);for(const [index,cell] of Array.from(column.children).entries()){const img=cell.firstChild;assert.equal(Number(img.getAttribute('data-qingpai-order')),index*cols+colIndex);assert.equal(img.style.minWidth,'100%');assert.equal(img.style.width,'100%');assert.equal(img.style.height,'auto');assert.equal(parseFloat(cell.style.paddingBottom),index<column.children.length-1?gap:0);}}
}
console.log('Published masonry: equal percentage columns, lazy-load minimum widths, original order and fixed vertical gutters survive calc filtering.');
