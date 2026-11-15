const {JSDOM}=require('jsdom'),fs=require('node:fs'),assert=require('node:assert/strict');
const dom=new JSDOM('<div class="weui-desktop-dialog_img-picker"></div>',{url:'https://mp.weixin.qq.com/cgi-bin/appmsg?action=edit&type=77',runScripts:'outside-only'}),w=dom.window,d=w.document,modal=d.querySelector('div');
modal.getBoundingClientRect=()=>({width:500});modal.__vue__={$options:{name:'mp-image-dialog'},selectedImgs:[]};w.eval(fs.readFileSync('page-bridge.js','utf8'));
let result;d.addEventListener('qingpai-editor-response',e=>result=JSON.parse(e.detail));
function select(url){modal.__vue__.selectedImgs=[{url,name:'图'}];d.dispatchEvent(new w.CustomEvent('qingpai-editor-request',{detail:JSON.stringify({id:1,action:'gallery-selection'})}));return result;}
const url='http://mmbiz.qpic.cn/mmbiz_jpg/a/0?wx_fmt=jpeg';assert.equal(select(url).items[0].src,url.replace('http:','https:'));
for(const bad of ['http://evil.test/a','http://mmbiz.qpic.cn.evil.test/a','javascript:alert(1)',null])assert.ok(select(bad).error);
assert.equal(select('https://mmbiz.qpic.cn/a').items[0].src,'https://mmbiz.qpic.cn/a');w.close();console.log('Actual page bridge gallery request: HTTP CDN normalized before validation; invalid URLs rejected.');
