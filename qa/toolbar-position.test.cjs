const {JSDOM}=require('jsdom'),fs=require('node:fs'),assert=require('node:assert/strict');
const dom=new JSDOM('<body><main><div class="edui-editor"><div class="edui-editor-toolbarbox"></div><div class="view" contenteditable="true"><p>正文保持不变</p></div></div></main></body>',{url:'https://mp.weixin.qq.com',runScripts:'outside-only',pretendToBeVisual:true});
const w=dom.window,d=w.document;w.ResizeObserver=class{observe(){}};w.requestAnimationFrame=fn=>setTimeout(()=>{if(w.document)fn();},0);w.cancelAnimationFrame=clearTimeout;w.HTMLElement.prototype.scrollIntoView=()=>{};
let box={left:617,right:1195,top:-900,bottom:-790,width:578,height:110},bar={left:0,right:1473,top:54,bottom:99,width:1473,height:45},articleBottom=4000;
w.HTMLElement.prototype.getBoundingClientRect=function(){if(this.id==='qingpai-article-tools')return box;if(this.classList.contains('edui-editor-toolbarbox'))return bar;if(this.tagName==='DETAILS')return{left:box.left,right:box.right,width:box.width,top:99,bottom:209,height:110};return{left:617,right:1195,width:578,top:100,bottom:articleBottom,height:articleBottom-100};};
Object.defineProperty(w,'innerWidth',{value:1473,writable:true});Object.defineProperty(w,'innerHeight',{value:723,writable:true});
w.eval(fs.readFileSync('content.js','utf8'));
const wait=()=>new Promise(resolve=>setTimeout(resolve,60));
(async()=>{await wait();const mount=d.getElementById('qingpai-article-tools'),panel=mount.shadowRoot.querySelector('details');assert.ok(mount);const original=d.querySelector('.view').innerHTML;
// Actual WeChat shape: native toolbar spans viewport, article remains narrow and offset.
assert.equal(panel.style.left,'617px');assert.equal(panel.style.width,'578px');assert.equal(panel.style.top,'99px');assert.equal(mount.style.height,'110px');assert.equal(mount.dataset.docked,'true');
for(const bounds of [{left:310,width:578},{left:420,width:420},{left:700,width:500},{left:-40,width:578}]){box={...box,...bounds,right:bounds.left+bounds.width};w.dispatchEvent(new w.Event('resize'));await wait();const expectedLeft=Math.max(0,box.left),expectedRight=Math.min(w.innerWidth,box.right);assert.equal(panel.style.left,expectedLeft+'px');assert.equal(panel.style.width,(expectedRight-expectedLeft)+'px');assert.ok(Number.parseFloat(panel.style.left)+Number.parseFloat(panel.style.width)<=w.innerWidth);}
// Natural top-of-article flow and article-end release must clear all fixed sizing.
box={...box,left:617,right:1195,width:578,top:300};w.dispatchEvent(new w.Event('resize'));await wait();assert.equal(panel.style.position,'');assert.equal(mount.style.height,'');assert.equal(mount.hasAttribute('data-docked'),false);
box.top=-900;articleBottom=120;w.dispatchEvent(new w.Event('resize'));await wait();assert.equal(panel.style.position,'');assert.equal(d.querySelector('.view').innerHTML,original);
assert.equal(d.querySelector('.edui-editor-toolbarbox').nextElementSibling,mount);console.log('Toolbar regression: full-width native bar, article-aligned bounds, narrow widths, viewport clipping, normal flow, article-end release, unchanged content passed.');w.close();})().catch(err=>{console.error(err);w.close();process.exitCode=1;});
