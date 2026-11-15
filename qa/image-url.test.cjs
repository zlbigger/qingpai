const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync('content.js','utf8');
const helper=source.slice(source.indexOf('  function secureImageUrl('),source.indexOf('  function preview(){'));
const ctx=vm.createContext({});vm.runInContext(helper+';globalThis.normalize=secureImageUrl',ctx);
for(const url of ['http://mmbiz.qpic.cn/mmbiz_jpg/example/0?wx_fmt=jpeg&x=1','http://mmbiz.qpic.cn/mmbiz_png/example/640?wx_fmt=png'])assert.equal(ctx.normalize(url),url.replace('http:','https:'));
for(const url of ['https://mmbiz.qpic.cn/a?x=1','data:image/png;base64,AA','blob:https://mp.weixin.qq.com/a','http://example.com/a','http://mmbiz.qpic.cn.evil.test/a'])assert.equal(ctx.normalize(url),url);
for(const assignment of source.matchAll(/img\.src=([^;]+);/g))assert.ok(assignment[1].startsWith('secureImageUrl('),assignment[0]);
console.log('Image URL regression: CDN HTTPS upgrade, path/query preservation and every generated image sink passed.');
