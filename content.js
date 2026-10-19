(() => {
  if (document.getElementById('qingpai-extension')) return;
  const host=document.createElement('div');host.id='qingpai-extension';
  const shadow=host.attachShadow({mode:'open'});
  shadow.innerHTML=`<style>
  :host{all:initial;font:13px -apple-system,"PingFang SC",sans-serif;color:#34443b;position:fixed;left:12px;top:110px;z-index:1}*{box-sizing:border-box}button,select,input{font:inherit}button{cursor:pointer;border:1px solid #dbe2d9;border-radius:6px;background:#fff;color:#345b46;padding:8px}button:hover{background:#eef3ed;color:#345b46}button:focus-visible,select:focus-visible,input:focus-visible{outline:2px solid #779880;outline-offset:2px}.dockbar{width:300px;height:54px;display:flex;align-items:center;gap:6px;padding:8px;background:#fff;border:1px solid #dde4da;border-radius:8px;box-shadow:0 2px 8px #0001}.brand{font-size:14px;font-weight:700;color:#345b46;margin:0 6px}.tab{border:0;padding:8px 12px;font-weight:600;min-height:36px}.tab[aria-pressed="true"],.tab[aria-pressed="true"]:hover{background:#345b46;color:#fff}.launcher{margin-left:auto;width:44px;height:26px;padding:3px;border:0;border-radius:20px;background:#d4ddd5;display:flex;align-items:center}.launcher .knob{width:20px;height:20px;border-radius:50%;background:#fff;box-shadow:0 1px 3px #0002}.launcher:hover{background:#c3d0c5}.launcher[aria-checked="true"],.launcher[aria-checked="true"]:hover{background:#28b64c;justify-content:flex-end}.panel{position:absolute;left:0;top:62px}.panel{width:300px;max-height:calc(100vh - 145px);overflow:auto;background:#fafbf8;border:1px solid #dde4da;border-radius:10px;box-shadow:0 8px 24px #0002;padding:18px}.head{display:flex;justify-content:space-between;align-items:center}.head strong{font-size:18px}.head button{border:0;font-size:18px;padding:0 5px}h3{font-size:14px;margin:22px 0 12px}p{font-size:11px;color:#7b877e;line-height:1.7;margin:8px 0}label{display:block;font-size:12px;margin:10px 0 5px}select,input{width:100%;padding:8px;border:1px solid #dbe2d9;border-radius:5px;background:white;color:#34443b}.fields{display:grid;grid-template-columns:1fr 1fr;gap:10px}.primary{background:#345b46;color:white;border-color:#345b46;width:100%;margin-top:12px}.counts{display:flex;gap:4px}.counts button{flex:1;padding:7px 0;font-size:12px}.counts button.selected,.counts button.selected:hover,.counts button.selected:active{background:#345b46;color:#fff;border:2px solid #244532;font-weight:700;box-shadow:inset 0 0 0 1px #ffffff40}.counts button.selected::before{content:"✓";margin-right:3px}.counts button:not(.selected){background:#fff;color:#345b46}.selected{background:#345b46;color:#fff}.gallery{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;max-height:180px;overflow:auto;margin-top:10px}.photo{padding:4px;position:relative}.photo img{width:100%;height:56px;object-fit:contain;display:block}.photo.selected,.photo.selected:hover{border:2px solid #345b46;background:#e8efe7;color:#244532}.photo.selected::after{content:"✓";position:absolute;right:3px;top:3px;background:#345b46;color:#fff;border-radius:50%;width:18px;height:18px;display:grid;place-items:center}.order{font-size:10px}.preview{background:white;padding:8px;margin-top:10px;border:1px solid #e2e8de}.preview-row{display:flex;align-items:center;gap:4px;margin-bottom:4px}.preview-row img{min-width:0;height:auto;flex:1;width:0}.status{color:#345b46;font-size:12px;overflow-wrap:anywhere}.hidden{display:none!important}h3{ text-wrap:balance }p{text-wrap:pretty}@media(max-width:700px){.panel{width:280px}}
  
  :host{z-index:1;background:#fff;border-right:1px solid #e7e7eb;width:var(--dock-width,320px)}
  .dockbar{width:100%;height:56px;gap:0;padding:0 16px;background:#f8f8f8;border:0;border-radius:0;box-shadow:none}
  .brand{font-size:13px;margin:0 14px 0 0;color:#07b64a}
  .tab{height:56px;min-width:80px;padding:0 18px;border-radius:10px 10px 0 0;background:transparent;font-weight:500;color:#353535}
  .tab[aria-pressed="true"],.tab[aria-pressed="true"]:hover{background:#fff;color:#07b64a;font-weight:600}
  .launcher{width:32px;height:20px;padding:2px}.launcher .knob{width:16px;height:16px}
  .panel{position:relative;top:0;left:0;width:100%;border:0;border-radius:0;box-shadow:none;background:#fff;padding:20px 22px;max-height:none}
  .head{display:none}.head+p{display:none}h3{margin:0 0 18px;color:#353535;border-left:3px solid #c6c6c6;padding-left:10px;font-size:15px}
  .fields{gap:12px}select,input{border-color:#e4e4e4;color:#353535}p{color:#888;font-size:12px}
  @media(max-width:700px){.panel{width:100%}.tab{min-width:68px;padding:0 12px}}
  
  .presets{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-bottom:16px}.presets button{text-align:left;padding:10px 8px;background:#fafafa;border:1px solid #e7e7eb;color:#353535}.presets b{display:block;font-size:13px}.presets span{display:block;font-size:11px;color:#888;margin-top:5px}.presets button[aria-pressed="true"]{border-color:#07a545;background:#f0faf3}.context{padding:10px 12px;background:#f6f8f6;border-radius:4px;color:#345b46}.counts{gap:8px;margin-bottom:16px}.counts button{padding:10px 3px;display:flex;flex-direction:column;align-items:center;gap:7px;min-height:76px}.layout-icon{display:grid;gap:2px;width:28px;height:26px}.layout-icon i{display:block;background:currentColor;opacity:.65;border-radius:1px}.counts button.selected::before{content:none}.gallery{gap:10px;max-height:230px}.photo{width:100%}.sort-tools{display:flex;justify-content:space-between;gap:4px;margin-top:4px}.sort-tools button{padding:4px 8px;font-size:12px;flex:1}.preview{padding:12px;background:#fafafa;border:1px solid #e7e7eb;margin:14px 0}.preview{max-height:220px;overflow:auto}.preview:before{content:'组合预览 · 保留原图比例';display:block;color:#888;font-size:11px;margin-bottom:10px}#refresh,#placeholders,#clear-images,#new-group{font-size:12px;margin:0 5px 8px 0;padding:7px 9px}#status{border-top:1px solid #eee;margin-top:16px;padding-top:12px;color:#546258}.fields{align-items:end}button:disabled{opacity:.4;cursor:default}
  .roles{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:20px}summary{cursor:pointer;padding:14px 0;font-weight:600}#article-status{min-height:38px}#undo-article{width:100%}button[aria-pressed="true"]{border-color:#07a545;background:#f0faf3;color:#07863c}
  #insert,#refresh,#clear-images,#preview,#new-group{display:none!important}
  .author-info{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-top:16px;padding-top:12px;border-top:1px solid #e8ede9;font-size:12px;color:#707870}.author-info a{color:#345b46;text-decoration:underline;text-underline-offset:3px}.author-info a:focus-visible{outline:2px solid #07863c;outline-offset:3px}</style><div class="dockbar"><span class="brand">轻排</span><button class="tab" id="text-tab" aria-pressed="true" aria-controls="text-tools">文字</button><button class="tab" id="image-tab" aria-pressed="false" aria-controls="image-tools">图片</button><button class="launcher" type="button" role="switch" aria-checked="false" aria-expanded="false" aria-controls="qingpai-panel" aria-label="展开轻排排版面板"><span class="knob" aria-hidden="true"></span></button></div><div id="qingpai-panel" class="panel hidden"><div class="head"><strong>轻排 <small style="font-size:11px">0.19.1</small></strong><button id="close" aria-label="收起面板">×</button></div><p>直接编辑公众号正文</p><div id="text-tools"><p id="article-scope" role="status">当前：全文</p><h3>整篇风格</h3><p>选中文字只排选中段落；未选中时整理全文。</p><div class="presets" id="article-themes"><button data-theme="clean" aria-pressed="false"><b>清爽阅读</b><span>16字号 · 1.8行距 · 16px段距</span></button><button data-theme="fine" aria-pressed="false"><b>细体随笔</b><span>细体16字号 · 1.9行距 · 20px段距</span></button><button data-theme="book" aria-pressed="false"><b>宋体书刊</b><span>宋体17字号 · 1.9行距 · 20px段距</span></button></div><button id="undo-article" type="button" disabled>撤销上次排版</button><p id="article-status" role="status" aria-live="polite">保留原文，选择风格后才生效。</p><details id="local-adjustments"><summary>局部调整</summary><p>需要单独调整某段时，将光标放入该段，或选中多个段落。</p><div id="paragraph-roles" class="roles"><button data-role="body">正文</button><button data-role="heading">小标题</button><button data-role="quote">引用</button><button data-role="caption">图注</button></div><h3>字体与间距</h3><div class="presets" id="presets"><button data-preset="reading"><b>舒适阅读</b><span>16 字号 · 1.8 行距</span></button><button data-preset="compact"><b>紧凑清晰</b><span>15 字号 · 1.6 行距</span></button><button data-preset="literary"><b>留白宋体</b><span>16 字号 · 2.0 行距</span></button></div><div style="display:flex;gap:8px;margin:12px 0"><button id="save-style" type="button">保存为我的常用</button><button id="use-style" type="button">套用我的常用</button></div><p id="text-context" class="context">选中文字时调整选中内容，否则调整全文</p><label for="font">字体</label><select id="font"><option value="PingFang SC, Microsoft YaHei, sans-serif" selected>默认字体</option><option value="Optima-Regular, PingFangTC-light, PingFang SC, sans-serif">Optima · 中文细体</option><option value="Songti SC, SimSun, serif">宋体</option><option value="Arial, Helvetica, sans-serif">Arial</option></select><div class="fields"><label>字号<select id="size"><option>14</option><option selected>15</option><option>16</option><option>17</option><option>18</option></select></label><label>行距<select id="line"><option>1.6</option><option selected>1.8</option><option>2</option></select></label></div><div class="fields"><label>段间距<select id="paragraph"><option value="8">8px</option><option value="16" selected>16px</option><option value="24">24px</option><option value="32">32px</option></select></label><label>文字颜色<select id="color"><option value="#353535">深灰</option><option value="#000000">黑色</option><option value="#595959">柔灰</option></select></label></div><label>对齐<select id="align"><option value="left">左对齐</option><option value="justify">两端对齐</option><option value="center">居中</option></select></label><p>选中文字只调整选中内容；未选中时调整全文，选择后即时生效。</p><p>细体效果取决于设备，请用 iPhone 微信预览。</p></details></div><div id="image-tools" class="hidden"><h3>图片组合</h3><div class="counts" id="counts"><button data-n="2">双图</button><button data-n="3">三图</button><button data-n="4" class="selected" aria-pressed="true">四图</button><button data-n="6">六图</button><button data-n="9">九图</button></div><p>先选双图、四图等布局，再从公众号图库多选图片，确定后整组插入正文。</p><button id="choose-library" class="primary" style="margin:0 0 10px">从公众号图库选图</button><button id="placeholders">插入占位图</button><button id="refresh">读取正文图片</button><button id="clear-images" class="hidden">取消图片选择</button><p id="selection-count"></p><div id="gallery" class="gallery"></div><p id="editing-context" class="context">新建图片组合</p><div class="fields"><label>每行列数<select id="columns"><option value="2" selected>两列</option><option value="3">三列</option></select></label><label>图间距<select id="gap"><option value="0">无间距</option><option value="4" selected>4px</option><option value="8">8px</option><option value="12">12px</option></select></label><label>圆角<select id="radius"><option value="0" selected>直角</option><option value="8">8px</option><option value="16">16px</option></select></label></div><div id="preview" class="preview hidden" aria-label="图片组合预览"></div><p>等宽瀑布流，保留原图比例和固定间距；选中正文里的图片组后，列数、间距、圆角和顺序即时更新。</p><button id="new-group">新建另一组</button><button id="insert" class="primary hidden">插入选中图片组合</button></div><p id="status" role="status" aria-live="polite">请打开图文正文编辑页。</p><footer class="author-info"><span>轻排 · 作者 zlbigger</span><a href="https://zlbigger.com/" target="_blank" rel="noopener noreferrer">个人主页 ↗</a></footer></div>`;
  document.documentElement.append(host);
  let articleRoot=null;
  const $=id=>shadow.getElementById(id)||articleRoot?.getElementById(id);let editor=null,savedRange=null,images=[],selected=[],count=4,activeImage=null,activeLayout=null,busy=false;
  let libraryPending=false,libraryDialog=null;
  const preferenceIds=['size','line','paragraph','color','align','gap','radius'];
  try{const preferences=JSON.parse(localStorage.getItem('qingpai.preferences.v1')||'{}');for(const id of preferenceIds){const value=preferences[id];if(typeof value==='string'&&Array.from($(id).options).some(option=>option.value===value))$(id).value=value;}}catch{}
  function savePreferences(){try{localStorage.setItem('qingpai.preferences.v1',JSON.stringify(Object.fromEntries(preferenceIds.map(id=>[id,$(id).value]))));}catch{}}


  // Native controls own basic text editing; keep old control bindings inert for compatibility.
  $('local-adjustments').hidden=true;
  $('local-adjustments').style.display='none';
  $('text-tab').hidden=true;$('text-tab').style.display='none';
  $('image-tab').textContent='图片排版';
  $('image-tools').classList.remove('hidden');$('text-tools').classList.add('hidden');
  function attachArticleTools(){
    const toolbar=document.querySelector('.edui-editor-toolbarbox');
    if(!toolbar)return;
    // Keep native dropdowns above the dock and the following article controls.
    const toolbarStyle=getComputedStyle(toolbar);
    if(toolbarStyle.position==='static')toolbar.style.position='relative';
    if(!(Number(toolbarStyle.zIndex)>=2))toolbar.style.zIndex='2';
    let mount=document.getElementById('qingpai-article-tools');
    if(!mount){
      mount=document.createElement('div');mount.id='qingpai-article-tools';
      articleRoot=mount.attachShadow({mode:'open'});
      const css=document.createElement('style');css.textContent=shadow.querySelector('style').textContent+`
        :host{all:initial;display:block;position:relative;width:100%;font:13px -apple-system,"PingFang SC",sans-serif;color:#353535;background:#fff;border:0;z-index:auto}
        details{border-top:1px solid #eee;border-bottom:1px solid #eee;padding:0 16px;background:#fff}summary{font-weight:500;padding:10px 0;color:#07863c;cursor:pointer}
        #text-tools{padding:12px 0;max-width:640px}#local-adjustments{display:none!important}#undo-article{width:auto}#article-status{min-height:0}h3{display:none}.presets{margin-bottom:10px}
      `;
      articleRoot.append(css);
      const disclosure=document.createElement('details'),summary=document.createElement('summary');summary.textContent='轻排 · 文字排版';disclosure.open=true;disclosure.append(summary);
      const tools=$('text-tools');tools.classList.remove('hidden');const fontLabel=document.createElement('label');fontLabel.textContent='字体 ';fontLabel.style.cssText='display:flex;align-items:center;gap:8px;margin:0 0 10px';const font=$('font');font.style.cssText='width:240px;max-width:100%;padding:5px';fontLabel.append(font);tools.prepend(fontLabel);disclosure.append(tools);articleRoot.append(disclosure);
      mount.addEventListener('pointerdown',event=>{remember();if(event.composedPath().some(node=>node?.matches?.('[data-theme],#undo-article')))event.preventDefault();},true);
    }
    if(toolbar.nextElementSibling!==mount)toolbar.after(mount);
  }
  let statusVersion=0;const status=t=>{statusVersion++;$('status').textContent=t;};
  function candidates(){if(!document?.documentElement)return [];const docs=[document];for(const f of document.querySelectorAll('iframe')){try{if(f.contentDocument)docs.push(f.contentDocument);}catch{}}return docs.flatMap(d=>Array.from(d.querySelectorAll('[contenteditable="true"],body[contenteditable="true"]'))).filter(e=>!host.contains(e)&&!e.closest('#qingpai-extension')&&e.getBoundingClientRect().width>0);}
  function findEditor(){if(editor?.isConnected)return editor;const list=candidates();editor=list.find(e=>e.classList.contains('view')||e.classList.contains('edui-body-container'))||list.sort((a,b)=>b.innerHTML.length-a.innerHTML.length)[0]||null;return editor;}
  const textIds=['font','size','line','paragraph','color','align'];
  let confirmedText=Object.fromEntries(textIds.map(id=>[id,$(id).value]));
  function controls(values){for(const id of textIds)if(typeof values[id]==='string')$(id).value=values[id];}
  function readControls(){return Object.fromEntries(textIds.map(id=>[id,$(id).value]));}
  function clearPresets(){for(const b of $('presets').children)b.setAttribute('aria-pressed','false');}
  function syncPresets(){
    const v=readControls(),sets={reading:[1,'16','1.8','16','#353535'],compact:[0,'15','1.6','8','#353535'],literary:[2,'16','2','24','#595959']};
    for(const b of $('presets').children){const p=sets[b.dataset.preset];b.setAttribute('aria-pressed',String(!!p&&v.font===$('font').options[p[0]].value&&['size','line','paragraph','color'].every((id,i)=>v[id]===p[i+1])&&v.align==='left'));}
  }
  function textBusy(value){$('text-tools').setAttribute('aria-busy',String(value));for(const el of $('text-tools').querySelectorAll('select,button'))el.disabled=value;}
  function syncText(e,r){
    const selectedElement=r.startContainer.nodeType===1?r.startContainer:r.startContainer.parentElement;
    const selectedRole=selectedElement.closest('[data-qingpai-role]')?.dataset.qingpaiRole;
    for(const button of $('paragraph-roles').children)button.setAttribute('aria-pressed',String(button.dataset.role===selectedRole));
    if(r.collapsed||!r.toString().trim()){$('article-scope').textContent='当前：全文';$('text-context').textContent='当前调整：全文 · 选中文字可只改局部';clearPresets();return;}
    $('article-scope').textContent='当前：选中段落';
    const first=r.startContainer.nodeType===1?r.startContainer:r.startContainer.parentElement;
    if(first.closest('[data-qingpai-v6-layout]'))return;
    const nodes=[],walker=e.ownerDocument.createTreeWalker(e,NodeFilter.SHOW_TEXT);let node;
    while(node=walker.nextNode()){if(node.textContent.trim()&&r.intersectsNode(node)&&!node.parentElement.closest('[data-qingpai-v6-layout]'))nodes.push(node.parentElement);}
    if(!nodes.length)return;
    const read=(el,id)=>{const css=el.ownerDocument.defaultView.getComputedStyle(el),block=el.closest('p,h1,h2,h3,blockquote')||el,bc=el.ownerDocument.defaultView.getComputedStyle(block);
      if(id==='font'){const f=css.fontFamily.toLowerCase();return f.includes('optima')||f.includes('pingfangtc')?$('font').options[1].value:f.includes('songti')||f.includes('simsun')?$('font').options[2].value:f.split(',')[0].includes('arial')?$('font').options[3].value:$('font').options[0].value;}
      if(id==='size')return String(parseFloat(css.fontSize));
      if(id==='line')return css.lineHeight==='normal'?'':String(Math.round(parseFloat(css.lineHeight)/parseFloat(css.fontSize)*100)/100);
      if(id==='paragraph')return String(parseFloat(bc.marginBottom));
      if(id==='align')return ['start','auto'].includes(bc.textAlign)?'left':bc.textAlign;
      if(id==='color'){const rgb=css.color.match(/\d+/g);return rgb?'#'+rgb.slice(0,3).map(n=>Number(n).toString(16).padStart(2,'0')).join(''):'';}
    };
    for(const id of textIds){const select=$(id);for(const option of Array.from(select.options))if(option.dataset.context)option.remove();const values=new Set(nodes.map(el=>read(el,id))),value=values.size===1?[...values][0]:'';if(!Array.from(select.options).some(o=>o.value===value)){const o=document.createElement('option');o.value=value;o.textContent=value?(id==='size'?value+'px':id==='paragraph'?value+'px':value):'多种／默认';o.dataset.context='true';select.append(o);}select.value=value;}
    confirmedText=readControls();syncPresets();$('text-context').textContent=`当前调整：选中的 ${r.toString().length} 个字`;
    
  }
  function remember(){if(busy||document.activeElement===host||libraryPending)return;for(const e of candidates()){const s=e.ownerDocument.getSelection();if(s?.rangeCount&&e.contains(s.getRangeAt(0).commonAncestorContainer)){editor=e;savedRange=s.getRangeAt(0).cloneRange();syncText(e,savedRange);}}}
  const bound=new WeakSet();function bind(){for(const e of candidates()){const d=e.ownerDocument;if(!bound.has(d)){bound.add(d);d.addEventListener('input',event=>{if(!busy&&e.contains(event.target)){for(const b of $('article-themes').children)b.setAttribute('aria-pressed','false');}},true);d.addEventListener('selectionchange',remember);d.addEventListener('keydown',event=>{if(event.key!=='Enter'||event.isComposing||event.shiftKey||event.ctrlKey||event.metaKey||busy)return;const selection=d.getSelection();if(!selection?.rangeCount)return;const range=selection.getRangeAt(0),node=range.startContainer.nodeType===1?range.startContainer:range.startContainer.parentElement,group=node.closest?.('[data-qingpai-v6-layout]');if(group&&candidates().some(root=>root.contains(group))){event.preventDefault();event.stopPropagation();activeLayout=group;continueAfterGroup();}},true);d.addEventListener('keyup',remember);d.addEventListener('mouseup',remember);d.addEventListener('click',event=>{const img=event.target.closest?.('img'),target=img&&candidates().find(root=>root.contains(img));if(img&&target&&img.closest('[data-qingpai-v6-layout]')){editor=target;activeImage=img;activeLayout=img.closest('[data-qingpai-v6-layout]');syncLayout();showTools('image');positionQuick();const r=d.createRange();r.selectNode(img);savedRange=r;status('已选中图片组，可直接调列数、间距、圆角和顺序。');}});}}}
  function restore(requireSelection=false){const e=findEditor();if(!e)throw new Error('未找到正文编辑器，请先打开图文编辑页并点击正文。');const d=e.ownerDocument,s=d.getSelection(),target=savedRange?.cloneRange();e.focus();if(target&&e.contains(target.commonAncestorContainer)){s.removeAllRanges();s.addRange(target);}else if(requireSelection)throw new Error('请先在正文里选中需要修改的文字。');else throw new Error('请先点击正文里要插入的位置，再选择图片布局。');return {e,d,s};}
  function changed(e){e.dispatchEvent(new InputEvent('input',{bubbles:true,inputType:'insertText'}));e.dispatchEvent(new Event('change',{bubbles:true}));remember();}
  let requestId=0;
  let imageUndo=null,bulkTarget=null,bulkBefore=null;
  const quick=document.createElement('div');quick.id='image-quick-tools';quick.hidden=true;
  quick.style.cssText='margin:12px 0;padding:12px 0;border-top:1px solid #eee;';
  quick.innerHTML='<button data-action="continue">下方继续写</button> <button data-action="bulk">整组换图</button> <button data-action="previous" aria-label="选中图片前移">前移</button> <button data-action="next" aria-label="选中图片后移">后移</button> <button data-action="reverse">反转顺序</button> <label style="display:inline">间距 <select data-action="gap" style="width:70px;display:inline"><option value="0">0px</option><option value="4">4px</option><option value="8">8px</option><option value="12">12px</option></select></label> <button data-action="undo" disabled>撤销图片操作</button> <button data-action="close" aria-label="收起图片快捷编辑">×</button><p role="status" id="image-feedback" style="margin:4px 0 0"></p>';
  $('image-tools').prepend(quick);
  for(const action of ['previous','next','reverse','close'])quick.querySelector(`[data-action="${action}"]`).style.display='none';
  quick.querySelector('[data-action="gap"]').closest('label').style.display='none';
  const marker=document.createElement('div');marker.hidden=true;marker.id='insertion-marker';marker.textContent='图片将插入这里';marker.style.cssText='position:fixed;z-index:1000;border-top:2px solid #07a545;color:#07863c;background:#fff;padding:4px 8px;pointer-events:none;font-size:12px';shadow.append(marker);
  function positionQuick(){
    const target=activeLayout?.isConnected?activeLayout:null;if(!target){quick.hidden=true;return;}
    quick.hidden=false;
    quick.querySelector('[data-action="gap"]').value=target.getAttribute('data-qingpai-v6-gap')||'4';
  }
  async function continueAfterGroup(){if(busy||!activeLayout?.isConnected)return;const group=activeLayout,e=findEditor(),d=e.ownerDocument;try{let next=group.nextElementSibling;if(!next?.matches('p')||next.querySelector('img')||next.textContent.trim()){const id='qingpai-after-'+Date.now();const before=e.innerHTML;next=d.createElement('p');next.id=id;next.append(d.createElement('br'));busy=true;group.after(next);changed(e);await new Promise(resolve=>setTimeout(resolve,30));next=d.getElementById(id);if(next?.isConnected){imageUndo={editor:e,before,after:e.innerHTML};}if(!next||!e.contains(next))throw new Error('未能创建空行，请重试。');}const r=d.createRange();r.selectNodeContents(next);r.collapse(true);e.focus();const selection=d.getSelection();selection.removeAllRanges();selection.addRange(r);savedRange=r;activeImage=null;next.scrollIntoView?.({block:'nearest'});imageFeedback('可以在图片下方继续输入。');}catch(err){imageFeedback(err.message);}finally{busy=false;}}
  function imageFeedback(message){quick.querySelector('#image-feedback').textContent=message;positionQuick();quick.querySelector('[data-action="undo"]').disabled=!imageUndo;}
  let insertionContext='';
  function markInsertion(){
    if(!savedRange)return;const e=findEditor();if(!e?.contains(savedRange.commonAncestorContainer))return;
    const node=savedRange.startContainer.nodeType===1?savedRange.startContainer:savedRange.startContainer.parentElement;
    insertionContext=bulkTarget?'替换当前图片组':`插入位置：${(node.textContent||'正文光标处').trim().slice(0,24)}`;
    const rect=node.getBoundingClientRect();marker.style.left=rect.left+'px';marker.style.top=Math.max(0,Math.min(rect.bottom,innerHeight-36))+'px';marker.hidden=false;
  }
  quick.addEventListener('pointerdown',event=>{if(event.target.closest('button'))event.preventDefault();});
  quick.addEventListener('click',async event=>{const action=event.target.closest('button')?.dataset.action;if(!action||busy)return;
    if(action==='continue'){await continueAfterGroup();return;}
    if(action==='close'){quick.hidden=true;return;}
    if(action==='bulk'){bulkTarget=activeLayout;bulkBefore=bulkTarget?.outerHTML;openLibrary(true);}
    if(action==='previous'||action==='next'){const index=orderedImages(activeLayout).indexOf(activeImage);if(index<0){imageFeedback('先点击组内要移动的图片');return;}const next=index+(action==='previous'?-1:1);if(next<0||next>=selected.length){imageFeedback('已经在这一端');return;}await reorder(index,next);activeImage=orderedImages(activeLayout)[next];imageFeedback('图片顺序已更新');}
    if(action==='reverse'){selected.reverse();if(await updateLayout(true))imageFeedback('图片顺序已反转');else imageFeedback($('status').textContent);}
    if(action==='undo'){
      const snapshot=imageUndo,e=findEditor();if(!snapshot)return;
      if(e!==snapshot.editor||e.innerHTML!==snapshot.after){imageFeedback('正文已有后续修改，请使用公众号编辑器撤销');return;}
      try{const r=e.ownerDocument.createRange();r.selectNodeContents(e);savedRange=r;busy=true;await insertHtml(snapshot.before,false,{selectAll:true,skipImageUndo:true});imageUndo=null;activeLayout=null;quick.hidden=true;status('已撤销图片操作。');}catch(err){imageFeedback(err.message);}finally{busy=false;}
    }
  });
  quick.addEventListener('change',async event=>{if(event.target.dataset.action==='gap'){$('gap').value=event.target.value;if(await updateLayout())imageFeedback('图间距已更新');else imageFeedback($('status').textContent);}});
  window.addEventListener('resize',positionQuick);document.addEventListener('scroll',positionQuick,true);
  function nativeRequest(action,extra={}){return new Promise((resolve,reject)=>{const id=++requestId;const done=event=>{let result;try{result=JSON.parse(event.detail);}catch{return;}if(result.id!==id)return;clearTimeout(timer);document.removeEventListener('qingpai-editor-response',done);result.error?reject(new Error(result.error)):resolve(result);};document.addEventListener('qingpai-editor-response',done);const timer=setTimeout(()=>{document.removeEventListener('qingpai-editor-response',done);reject(new Error('编辑器接口未响应，请重新加载轻排并刷新编辑页。'));},4000);document.dispatchEvent(new CustomEvent('qingpai-editor-request',{detail:JSON.stringify({id,action,...extra})}));});}
  async function insertHtml(html,requireSelection=false,options={}){const e0=findEditor(),before=e0?.innerHTML;const scrolls=[];for(let n=e0;n;n=n.parentElement)scrolls.push([n,n.scrollLeft,n.scrollTop]);const win=e0?.ownerDocument.defaultView,wx=win?.scrollX,wy=win?.scrollY;try{const {e,d}=restore(requireSelection);let locallyApplied=false;if(options.textOnly&&typeof d.execCommand==='function'){const previous=e.innerHTML;d.execCommand('insertHTML',false,html);locallyApplied=e.innerHTML!==previous;if(locallyApplied){await new Promise(resolve=>setTimeout(resolve,30));if(e.innerHTML===previous)throw new Error('编辑器未保留排版，请重试；原文未改变。');changed(e);}}const native=!locallyApplied&&e.ownerDocument===document&&(await nativeRequest('probe')).available;if(locallyApplied){remember();}else if(native){await nativeRequest('insert',{html,...options});if(options.textOnly&&e.innerHTML===before)throw new Error('排版未完成：请处理微信的插入提示后重试，原文未被确认更新。');remember();}else{if(options.targetId){const target=d.getElementById(options.targetId);if(!target||!e.contains(target))throw new Error('原图片组合已变化，请重新点选。');const r=d.createRange();r.selectNode(target);const selection=d.getSelection();selection.removeAllRanges();selection.addRange(r);}const ok=d.execCommand('insertHTML',false,html);if(!ok)throw new Error('编辑器未接受插入，请重新点击正文后再试。');changed(e);}}finally{for(const [node,x,y] of scrolls){if(node.scrollLeft!==x)node.scrollLeft=x;if(node.scrollTop!==y)node.scrollTop=y;}if(win&&(win.scrollX!==wx||win.scrollY!==wy))win.scrollTo(wx,wy);marker.hidden=true;}if(!options.skipImageUndo&&!options.selectAll&&e0&&before!==e0.innerHTML&&(html.includes('data-qingpai-v6-layout')||options.targetId)){imageUndo={editor:e0,before,after:e0.innerHTML};quick.querySelector('[data-action="undo"]').disabled=false;}}

  function toggle(){const panel=$('qingpai-panel'),launcher=shadow.querySelector('.launcher');const open=panel.classList.contains('hidden');$('image-tools').classList.remove('hidden');panel.classList.toggle('hidden',!open);launcher.setAttribute('aria-checked',String(open));launcher.setAttribute('aria-expanded',String(open));launcher.setAttribute('aria-label',open?'收起轻排排版面板':'展开轻排排版面板');bind();positionDock();if(open&&findEditor())status('已找到正文编辑器。');}
  function positionDock(){if(activeLayout&&!activeLayout.isConnected&&!busy){activeLayout=null;activeImage=null;images=[];selected=[];gallery();quick.hidden=true;}attachArticleTools();const e=findEditor();if(!e){host.style.display='none';return;}const frame=e.ownerDocument.defaultView.frameElement;const shell=frame||e.closest('.edui_editor_wrp')||e.closest('.edui-editor')||e;let r=shell.getBoundingClientRect();for(let parent=shell.parentElement;parent&&parent!==document.body&&parent!==document.documentElement;parent=parent.parentElement){const box=parent.getBoundingClientRect();if(box.left<r.left-40&&box.width>r.width+80&&box.left>0){r=box;break;}}if(!r.width||r.right<=0||r.left>=innerWidth){host.style.display='none';return;}const toolbar=document.querySelector('.edui-editor-toolbarbox');const bar=toolbar?.getBoundingClientRect();const top=Math.max(0,Math.min(bar?.bottom>0?bar.bottom:142,innerHeight-100));const width=Math.max(280,r.left);const left=0;host.style.display='block';host.style.left=left+'px';host.style.top=top+'px';host.style.setProperty('--dock-width',width+'px');const open=!$('qingpai-panel').classList.contains('hidden');host.style.height=open?Math.max(100,innerHeight-top)+'px':'56px';$('qingpai-panel').style.maxHeight=Math.max(100,innerHeight-top-56)+'px';}
  let dockFrame=0;function scheduleDock(){if(dockFrame)return;dockFrame=requestAnimationFrame(()=>{dockFrame=0;if(host.isConnected)positionDock();});}
  window.addEventListener('resize',scheduleDock);document.addEventListener('scroll',scheduleDock,true);new ResizeObserver(scheduleDock).observe(document.documentElement);scheduleDock();

  shadow.querySelector('.launcher').onclick=toggle;$('close').onclick=toggle;
  function showTools(kind){if(kind==='text')return;$('image-tools').classList.remove('hidden');if($('qingpai-panel').classList.contains('hidden'))toggle();scheduleDock();}
  $('text-tab').onclick=()=>showTools('text');$('image-tab').onclick=()=>showTools('image');

  if(typeof chrome!=='undefined'&&chrome.runtime?.onMessage)chrome.runtime.onMessage.addListener(msg=>{if(msg.type==='qingpai-toggle')toggle();});
  // Text offsets survive DOM replacement, so successive dropdown changes keep the same selection.
  function offsets(e,r){const a=e.ownerDocument.createRange();a.selectNodeContents(e);a.setEnd(r.startContainer,r.startOffset);const start=a.toString().length;a.setEnd(r.endContainer,r.endOffset);return {start,end:a.toString().length};}
  function rangeAt(e,start,end){const d=e.ownerDocument,r=d.createRange(),walker=d.createTreeWalker(e,NodeFilter.SHOW_TEXT);let pos=0,n,found=false;while(n=walker.nextNode()){const next=pos+n.length;if(!found&&start<next){r.setStart(n,Math.max(0,start-pos));found=true;}if(found&&end<=next){r.setEnd(n,Math.max(0,end-pos));return r;}pos=next;}r.selectNodeContents(e);r.collapse(false);return r;}
  function textValues(){return {fontFamily:$('font').value,fontSize:$('size').value+'px',lineHeight:$('line').value,color:$('color').value,marginBottom:$('paragraph').value+'px',textAlign:$('align').value};}
  async function applyText(property){if(busy)return;try{
    const e=findEditor();if(!e)throw new Error('请先打开正文编辑页。');
    const all=!savedRange||savedRange.collapsed||!savedRange.toString().trim()||!e.contains(savedRange.commonAncestorContainer);
    if(all&&!savedRange){const r=e.ownerDocument.createRange();r.selectNodeContents(e);savedRange=r;}
    const {d,s}=restore(!all);if(all){const r=d.createRange();r.selectNodeContents(e);s.removeAllRanges();s.addRange(r);}
    if(s.isCollapsed)throw new Error('正文还是空的，请先写入内容。');
    const blockProperty=['preset','marginBottom','textAlign'].includes(property);
    if(blockProperty&&!all){const r=s.getRangeAt(0),start=(r.startContainer.nodeType===1?r.startContainer:r.startContainer.parentElement).closest('p,h1,h2,h3,blockquote'),end=(r.endContainer.nodeType===1?r.endContainer:r.endContainer.parentElement).closest('p,h1,h2,h3,blockquote');if(start&&end&&e.contains(start)&&e.contains(end)){r.setStartBefore(start);r.setEndAfter(end);s.removeAllRanges();s.addRange(r);}}
    const bookmark=offsets(e,s.getRangeAt(0)),fragment=s.getRangeAt(0).cloneContents(),hasBlocks=!!fragment.querySelector('p,h1,h2,h3,section,blockquote'),container=d.createElement(hasBlocks?'section':'span');container.append(fragment);
    const values=textValues(),keys=property==='preset'?Object.keys(values):[property];
    for(const key of keys){if(!['marginBottom','textAlign'].includes(key))container.style[key]=values[key];for(const node of container.querySelectorAll('*')){if(node.tagName==='IMG'||node.closest('[data-qingpai-v6-layout],pre,code'))continue;if(['marginBottom','textAlign'].includes(key)){if(node.matches('p,h1,h2,h3,blockquote')){node.style[key]=values[key];if(key==='marginBottom')node.style.marginTop='0';}}else node.style[key]=values[key];}}
    busy=true;textBusy(true);container.setAttribute('leaf','');await insertHtml(container.outerHTML,true,{selectAll:all,textOnly:true});savedRange=rangeAt(e,bookmark.start,bookmark.end);s.removeAllRanges();s.addRange(savedRange);changed(e);status(all?'正文排版已更新。':'选中文字排版已更新。');confirmedText=readControls();savePreferences();$('text-context').textContent=all?'已应用到正文全文':'已应用到选中文字';return true;
  }catch(err){status(err.message);controls(confirmedText);clearPresets();return false;}finally{busy=false;textBusy(false);}}
  for(const [id,key] of [['font','fontFamily'],['size','fontSize'],['line','lineHeight'],['paragraph','marginBottom'],['color','color'],['align','textAlign']])$(id).onchange=()=>{for(const b of $('presets').children)b.setAttribute('aria-pressed','false');applyText(key);};
  $('presets').onclick=async event=>{const b=event.target.closest('[data-preset]');if(!b)return;const presets={reading:{font:1,size:'16',line:'1.8',paragraph:'16',color:'#353535'},compact:{font:0,size:'15',line:'1.6',paragraph:'8',color:'#353535'},literary:{font:2,size:'16',line:'2',paragraph:'24',color:'#595959'}};const v=presets[b.dataset.preset];$('font').selectedIndex=v.font;for(const key of ['size','line','paragraph','color'])$(key).value=v[key];$('align').value='left';if(await applyText('preset'))for(const item of $('presets').children)item.setAttribute('aria-pressed',String(item===b));};
  $('save-style').onclick=()=>{try{const values=readControls();if(textIds.some(id=>!values[id]))throw new Error('请先选取样式一致的文字，再保存常用排版。');localStorage.setItem('qingpai.my-style.v1',JSON.stringify(values));status('已保存我的常用排版，点击套用即可使用。');}catch(err){status(err.message);}};
  $('use-style').onclick=async()=>{try{const values=JSON.parse(localStorage.getItem('qingpai.my-style.v1')||'null');if(!values)throw new Error('还没有常用排版，请先选择喜欢的参数并保存。');for(const id of textIds){if(typeof values[id]!=='string'||!values[id])throw new Error('常用排版数据不完整，请重新保存。');if(!Array.from($(id).options).some(o=>o.value===values[id])){const o=document.createElement('option');o.value=values[id];o.textContent=values[id];o.dataset.context='true';$(id).append(o);}}controls(values);if(await applyText('preset'))clearPresets();}catch(err){status(err.message);}};
  let articleUndo=null,articleTheme='clean';
  const articleThemes={
    clean:{font:'PingFang SC, Microsoft YaHei, sans-serif',size:'16px',line:'1.8',gap:'16px',color:'#353535'},
    fine:{font:'Optima-Regular, PingFangTC-light, PingFang SC, sans-serif',size:'16px',line:'1.9',gap:'20px',color:'#353535'},
    book:{font:'Songti SC, SimSun, serif',size:'17px',line:'1.9',gap:'20px',color:'#353535'}
  };
  function roleStyle(node,role,theme){
    const t=articleThemes[theme];
    for(const child of node.querySelectorAll('*')){if(child.closest('pre,code'))continue;for(const key of ['font-family','font-size','line-height','color','text-indent','text-align'])child.style.removeProperty(key);}
    Object.assign(node.style,{fontFamily:t.font,fontSize:t.size,lineHeight:t.line,color:t.color,textAlign:'left',textIndent:'0',marginTop:'0',marginBottom:t.gap,padding:'0',border:'0',backgroundColor:'transparent',fontWeight:'400'});
    if(role==='heading')Object.assign(node.style,{fontSize:theme==='book'?'21px':'20px',lineHeight:'1.5',fontWeight:'600',marginTop:'28px',marginBottom:'14px'});
    if(role==='quote')Object.assign(node.style,{color:'#595959',borderLeft:'3px solid #cddbd1',padding:'8px 14px',marginTop:'20px',marginBottom:'20px',backgroundColor:'#f7f8f7'});
    if(role==='caption')Object.assign(node.style,{fontSize:'13px',lineHeight:'1.6',color:'#888888',textAlign:'center',marginTop:'8px',marginBottom:'20px'});
    node.dataset.qingpaiRole=role;
  }
  function articleMediaSpacing(root,theme){
    const gap=articleThemes[theme].gap;
    // Padding survives collapsed margins between adjacent media blocks.
    for(const group of root.querySelectorAll('[data-qingpai-v6-layout]')){
      if(group.parentElement?.closest('[data-qingpai-v6-layout],table,pre,code'))continue;
      Object.assign(group.style,{marginTop:'0',marginBottom:'0',paddingTop:gap,paddingBottom:gap,boxSizing:'border-box'});
    }
    const blocks=new Set();
    for(const img of root.querySelectorAll('img')){
      if(img.closest('[data-qingpai-v6-layout],table,pre,code'))continue;
      let block=img.closest('p,figure,div,section');
      if(!block||block===root){block=root.ownerDocument.createElement('p');img.replaceWith(block);block.append(img);}
      blocks.add(block);
      Object.assign(img.style,{maxWidth:'100%',height:'auto'});
      // Consecutive unwrapped images also receive breathing room.
      if(img.previousElementSibling?.tagName==='IMG')img.style.marginTop=gap;
    }
    for(const block of blocks){
      Object.assign(block.style,{marginTop:'0',marginBottom:'0',paddingTop:gap,paddingBottom:gap,lineHeight:articleThemes[theme].line,boxSizing:'border-box'});
    }
  }
  function inferredRole(node){return node.dataset.qingpaiRole||(node.matches('h1,h2,h3,h4,h5,h6')?'heading':node.matches('blockquote')||node.closest('blockquote')?'quote':'body');}
  function sameArticleMarkup(a,b){
    const normalize=root=>{const copy=root.cloneNode(true);for(const node of copy.querySelectorAll('[style]')){const css=node.style;const sorted=Array.from(css).sort().map(key=>key+':'+css.getPropertyValue(key)+(css.getPropertyPriority(key)?' !important':'')).join(';');if(sorted)node.setAttribute('style',sorted);else node.removeAttribute('style');}return copy.innerHTML;};
    return normalize(a)===normalize(b);
  }
  async function articleChange(label,transform,compareThemes=false){
    if(busy)return;
    const e=findEditor();if(!e){$('article-status').textContent='请先打开正文编辑页。';return;}
    if(!e.textContent.trim()&&!e.querySelector('img')){$('article-status').textContent='正文还是空的，请先写入内容。';return;}
    const before=e.innerHTML,copy=e.cloneNode(true),bookmark=savedRange&&e.contains(savedRange.commonAncestorContainer)?offsets(e,savedRange):null;
    const original=compareThemes&&articleUndo?.themeSession&&articleUndo.editor===e&&articleUndo.after===before?articleUndo.before:before;
    try{
      transform(copy,e);
      if(sameArticleMarkup(copy,e)){$('article-status').textContent='当前已是该排版，无需重复修改。';return true;}
      const r=e.ownerDocument.createRange();r.selectNodeContents(e);savedRange=r;
      busy=true;textBusy(true);$('article-status').textContent='正在整理排版…';await insertHtml(copy.innerHTML,false,{selectAll:true,textOnly:true});if(bookmark){savedRange=rangeAt(e,bookmark.start,bookmark.end);const selection=e.ownerDocument.getSelection();selection.removeAllRanges();selection.addRange(savedRange);}changed(e);
      articleUndo={editor:e,before:original,after:e.innerHTML,themeSession:compareThemes};$('undo-article').disabled=false;
      $('undo-article').textContent=compareThemes?'恢复试排前':'撤销上次排版';
      $('article-status').textContent=label+(compareThemes?'已生效 · 可继续切换比较，或恢复试排前。':'已生效，可撤销上次排版。');
      clearPresets();return true;
    }catch(err){$('article-status').textContent=err.message;return false;}
    finally{busy=false;textBusy(false);$('undo-article').disabled=!articleUndo;}
  }
  // Normalize pasted text without flattening links, emphasis, or media.
  function prepareArticle(root){
    const protectedSelector='[data-qingpai-v6-layout],pre,code,table,img,video,audio,iframe,svg';
    const blockSelector='p,h1,h2,h3,h4,h5,h6,blockquote,div,section,article,main,ul,ol,li,figure,figcaption,hr';
    const split=node=>{
      if(node.nodeType===3)return node.textContent.split(/\r?\n/).map(text=>[root.ownerDocument.createTextNode(text)]);
      if(node.nodeType!==1)return [[node.cloneNode(true)]];
      if(node.tagName==='BR')return [[],[]];
      const lines=[[]];for(const child of node.childNodes){const pieces=split(child);lines[lines.length-1].push(...pieces[0]);for(const piece of pieces.slice(1))lines.push(piece);}
      return lines.map(line=>{const copy=node.cloneNode(false);copy.append(...line);return [copy];});
    };
    const visit=container=>{
      for(const child of Array.from(container.children)){
        if(child.matches(protectedSelector)||child.closest('[data-qingpai-v6-layout],pre,code,table'))continue;
        if(child.matches('div,section,article,main,blockquote,li,figure'))visit(child);
      }
      const output=[],lines=[[]];let pending=false;
      const flush=()=>{if(!pending)return;for(const line of lines){const p=root.ownerDocument.createElement('p');p.append(...line);if(p.textContent.trim())output.push(p);}lines.splice(0,lines.length,[]);pending=false;};
      for(const node of Array.from(container.childNodes)){
        if(node.nodeType===1&&(node.matches(blockSelector)||node.matches(protectedSelector)||node.querySelector(protectedSelector))){flush();output.push(node);continue;}
        const pieces=split(node);pending=true;lines[lines.length-1].push(...pieces[0]);for(const piece of pieces.slice(1))lines.push(piece);
      }
      flush();container.replaceChildren(...output);
    };
    visit(root);
    // Remove blank text blocks, but retain media, code, tables and image groups.
    const meaningful=node=>node.textContent.replace(/[\s\u200b\ufeff]/g,'')||node.matches(protectedSelector+',hr')||node.querySelector(protectedSelector+',hr');
    for(const node of Array.from(root.querySelectorAll('p,h1,h2,h3,h4,h5,h6,div,section,article,main,blockquote,li,ul,ol,figure,figcaption')).reverse()){
      if(node.closest('[data-qingpai-v6-layout],pre,code,table'))continue;
      if(!meaningful(node))node.remove();
    }
    for(const block of textBlocks(root)){
      for(const br of Array.from(block.querySelectorAll('br'))){
        const before=root.ownerDocument.createRange(),after=root.ownerDocument.createRange();
        before.selectNodeContents(block);before.setEndBefore(br);after.selectNodeContents(block);after.setStartAfter(br);
        if(!before.toString().trim()||!after.toString().trim()){br.remove();continue;}
        let prev=br.previousSibling;while(prev&&((prev.nodeType===3&&!prev.textContent.trim())||(prev.nodeType===1&&prev.nodeName!=='BR'&&!prev.textContent.trim()&&!prev.querySelector('br'))))prev=prev.previousSibling;
        if(prev?.nodeName==='BR')br.remove();
      }
    }
  }
  function textBlocks(root){return Array.from(root.querySelectorAll('p,h1,h2,h3,h4,h5,h6,blockquote')).filter(n=>!n.closest('[data-qingpai-v6-layout],pre,code,table')&&!n.querySelector('img,video,audio,iframe')&&!n.querySelector('p,h1,h2,h3,h4,h5,h6,blockquote')&&n.textContent.trim());}
  $('article-themes').onclick=async event=>{const b=event.target.closest('[data-theme]');if(!b||busy)return;const theme=b.dataset.theme;const e=findEditor(),range=savedRange;const scoped=!!(e&&range&&!range.collapsed&&range.toString().trim()&&e.contains(range.commonAncestorContainer));const targets=scoped?textBlocks(e).map((node,index)=>({node,index})).filter(({node})=>range.intersectsNode(node)).map(({index})=>index):null;
    if(await articleChange((scoped?'选中段落 · ':'全文 · ')+b.querySelector('b').textContent,copy=>{
      if(!scoped)prepareArticle(copy);const allBlocks=textBlocks(copy),blocks=scoped?allBlocks.filter((_,index)=>targets.includes(index)):allBlocks;if(!blocks.length)throw new Error('没有找到可排版的文字，图片、表格和代码已保留。');
      for(const node of blocks){
        for(const child of node.querySelectorAll('*')){if(child.closest('pre,code'))continue;for(const key of ['font-family','font-size','line-height','color','text-indent','text-align'])child.style.removeProperty(key);}
        roleStyle(node,inferredRole(node),theme);
      }
      if(!scoped)articleMediaSpacing(copy,theme);
      if(copy.lastElementChild?.matches('[data-qingpai-v6-layout]')){const p=copy.ownerDocument.createElement('p');p.append(copy.ownerDocument.createElement('br'));copy.append(p);}
    },true)){articleTheme=theme;for(const item of $('article-themes').children)item.setAttribute('aria-pressed',String(item===b));}
  };
  $('paragraph-roles').onclick=async event=>{const b=event.target.closest('[data-role]');if(!b||busy)return;
    const e=findEditor(),r=savedRange?.cloneRange();
    if(!e||!r||!e.contains(r.commonAncestorContainer)){$('article-status').textContent='请先将光标放入正文段落。';return;}
    const targets=textBlocks(e).map((node,index)=>({node,index})).filter(({node})=>r.collapsed?node.contains(r.startContainer):r.intersectsNode(node)).map(({index})=>index);
    if(!targets.length){$('article-status').textContent='请选择文字段落；图片组合、表格和代码保持原样。';return;}
    if(await articleChange(b.textContent,copy=>{const blocks=textBlocks(copy);for(const index of targets)roleStyle(blocks[index],b.dataset.role,articleTheme);})){for(const item of $('paragraph-roles').children)item.setAttribute('aria-pressed',String(item===b));}
  };
  $('undo-article').onclick=async()=>{
    if(busy||!articleUndo)return;const undo=articleUndo,e=findEditor();
    if(e!==undo.editor||e.innerHTML!==undo.after){$('article-status').textContent='正文已有后续编辑，为保留新内容，请使用编辑器撤销。';articleUndo=null;$('undo-article').disabled=true;return;}
    try{const r=e.ownerDocument.createRange();r.selectNodeContents(e);savedRange=r;busy=true;textBusy(true);await insertHtml(undo.before,false,{selectAll:true,textOnly:true});changed(e);articleUndo=null;for(const b of $('article-themes').children)b.setAttribute('aria-pressed','false');for(const b of $('paragraph-roles').children)b.setAttribute('aria-pressed','false');$('article-status').textContent='已恢复本次排版前的正文。';}catch(err){$('article-status').textContent=err.message;}finally{busy=false;textBusy(false);$('undo-article').disabled=!articleUndo;}
  };

  shadow.addEventListener('keydown',event=>{if(event.key==='Escape'&&!$('qingpai-panel').classList.contains('hidden')){event.preventDefault();toggle();shadow.querySelector('.launcher').focus();}});
  shadow.addEventListener('pointerdown',()=>remember(),true);
  function columnsFor(root){return Number(root?.getAttribute('data-qingpai-v6-cols'))||Number($('columns').value);}
  function preview(){const root=$('preview');root.replaceChildren();root.classList.toggle('hidden',!selected.length);if(!selected.length)return;const items=selected.map(i=>{const img=document.createElement('img');img.src=images[i].src;img.alt=images[i].alt||'';imageStyle(img);return img;});root.append(layoutTable(items,columnsFor(),Number($('gap').value)));}
  function chooseCount(n){count=n;for(const b of $('counts').children){const on=Number(b.dataset.n)===n;b.classList.toggle('selected',on);b.setAttribute('aria-pressed',String(on));}}
  function syncLayout(){if(!activeLayout?.isConnected)return;const imgs=orderedImages(activeLayout);chooseCount(imgs.length);$('columns').value=activeLayout.getAttribute('data-qingpai-v6-cols')||String(imgs.length===2||imgs.length===4?2:3);$('gap').value=activeLayout.getAttribute('data-qingpai-v6-gap')||'4';$('radius').value=String(parseFloat(imgs[0]?.style.borderRadius)||0);images=imgs.map(i=>({src:i.getAttribute('data-src')||i.src,alt:i.alt,placeholder:i.hasAttribute('data-qingpai-v6-placeholder')}));selected=images.map((_,i)=>i);$('editing-context').textContent=`正在编辑正文中的 ${imgs.length} 图组合`;gallery();}
  async function reorder(from,to){if(busy||to<0||to>=selected.length)return;[selected[from],selected[to]]=[selected[to],selected[from]];gallery();if(activeLayout?.isConnected)await updateLayout(true);else status('已调整顺序，插入时按当前顺序排列。');}
  function gallery(){const g=$('gallery');g.replaceChildren();if(!activeLayout?.isConnected){$('selection-count').textContent='';$('editing-context').textContent='点击正文中的图片组，可调整顺序和间距';$('insert').classList.add('hidden');return;}images.forEach((item,i)=>{const b=document.createElement('button');b.className='photo'+(selected.includes(i)?' selected':'');b.setAttribute('aria-pressed',String(selected.includes(i)));b.setAttribute('aria-label',`图片 ${i+1}，${selected.includes(i)?'已选':'未选'}`);const img=document.createElement('img');img.src=item.src;img.alt=`正文图片 ${i+1}`;const n=document.createElement('span');n.className='order';n.textContent=selected.includes(i)?`顺序 ${selected.indexOf(i)+1}`:`图片 ${i+1}`;b.append(img,n);b.onclick=()=>{activeImage=orderedImages(activeLayout)[i];status(`当前图片组中的第 ${i+1} 张，可用下方前移、后移调整顺序。`);};const tile=document.createElement('div');tile.append(b);const order=selected.indexOf(i);if(order>=0){const tools=document.createElement('div');tools.className='sort-tools';for(const [label,delta] of [['前移',-1],['后移',1]]){const move=document.createElement('button');move.textContent=label;move.setAttribute('aria-label',`第 ${order+1} 张图片${label}`);move.disabled=order+delta<0||order+delta>=selected.length;move.onclick=()=>reorder(order,order+delta);tools.append(move);}tile.append(tools);}g.append(tile);});$('selection-count').textContent=selected.length?`当前图片组 · ${images.length} 张 · 调整后直接生效`:"";$('clear-images').classList.toggle('hidden',!selected.length);$('insert').textContent='插入选中图片组合';$('insert').classList.add('hidden');preview();}
  $('clear-images').onclick=()=>{selected=[];activeImage=null;gallery();status('已取消图片选择。');};
  $('refresh').onclick=()=>{const e=findEditor();if(!e){status('未找到正文，请先点击公众号正文编辑区域。');return;}images=[];selected=[];activeImage=null;const seen=new Set();for(const img of e.querySelectorAll('img:not(.ProseMirror-separator)')){if(img.hasAttribute('data-qingpai-v6-placeholder'))continue;const src=img.getAttribute('data-src')||img.currentSrc||img.src;try{const u=new URL(src);if(!['https:','http:'].includes(u.protocol)||seen.has(src))continue;seen.add(src);images.push({src,alt:img.alt||''});}catch{}}gallery();status(images.length?`读取到 ${images.length} 张正文图片，请按插入顺序选择。`:'正文暂无图片，请先通过公众号图片按钮上传并插入。');};
  function placeholder(index){const canvas=document.createElement('canvas');canvas.width=600;canvas.height=800;const ctx=canvas.getContext('2d');ctx.fillStyle='#e8eee7';ctx.fillRect(0,0,600,800);ctx.strokeStyle='#7c9480';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(280,345);ctx.lineTo(320,345);ctx.moveTo(300,325);ctx.lineTo(300,365);ctx.stroke();ctx.fillStyle='#627867';ctx.font='24px sans-serif';ctx.textAlign='center';ctx.fillText(`图片 ${index+1} · 点击替换`,300,420);return canvas.toDataURL('image/png');}
  function imageStyle(img){img.removeAttribute('width');img.removeAttribute('height');img.style.cssText=`display:block;width:100%;max-width:100%;height:auto;border-radius:${$('radius').value}px;`;}
  async function replaceImage(item){try{const e=findEditor(),d=e.ownerDocument;const img=d.createElement('img');img.src=item.src;img.alt=item.alt;if(activeImage.hasAttribute('data-qingpai-order'))img.setAttribute('data-qingpai-order',activeImage.getAttribute('data-qingpai-order'));imageStyle(img);const r=d.createRange();r.selectNode(activeImage);savedRange=r;activeImage.id=activeImage.id||'qingpai-image-'+Date.now();await insertHtml(img.outerHTML,true,{targetId:activeImage.id});activeImage=null;status('图片已替换，按新图片比例显示。');}catch(err){status(err.message);}}
  // Numeric percentage columns survive WeChat's calc() filter. Each column
  // owns its vertical flow; mixed aspect ratios never introduce row-height gaps.
  function layoutTable(items,cols,gap){const wrap=document.createElement('section');wrap.setAttribute('data-qingpai-v6-grid','true');wrap.setAttribute('data-qingpai-masonry','1');const row=document.createElement('section');row.setAttribute('data-qingpai-v6-row','true');const columns=Array.from({length:cols},()=>{const column=document.createElement('section');column.setAttribute('data-qingpai-column','true');row.append(column);return column;});items.forEach((img,index)=>{img.setAttribute('data-qingpai-order',String(index));const cell=document.createElement('section');cell.setAttribute('data-qingpai-v6-cell','true');cell.append(img);columns[index%cols].append(cell);});wrap.append(row);styleLayoutRows(wrap,cols,gap);return wrap;}
  function orderedImages(root){return Array.from(root?.querySelectorAll('img:not(.ProseMirror-separator)')||[]).map((img,index)=>({img,index:Number(img.getAttribute('data-qingpai-order')??index)})).sort((a,b)=>a.index-b.index).map(item=>item.img);}
  function styleLayoutRows(root,cols,gap){for(const row of root.querySelectorAll('[data-qingpai-v6-row]')){for(const [k,v] of [['display','flex'],['flex-direction','row'],['flex-wrap','nowrap'],['align-items','flex-start'],['width','100%'],['margin','0'],['padding','0']])setImportant(row,k,v);for(const column of row.children){const width=(100/cols)+'%';for(const [k,v] of [['display','block'],['flex',`0 0 ${width}`],['width',width],['max-width',width],['min-width',width],['margin','0'],['padding',`0 ${gap/2}px`],['box-sizing','border-box']])setImportant(column,k,v);Array.from(column.children).forEach((cell,index)=>{for(const [k,v] of [['display','block'],['width','100%'],['margin','0'],['padding',`0 0 ${index<column.children.length-1?gap:0}px`],['box-sizing','border-box']])setImportant(cell,k,v);for(const img of cell.querySelectorAll('img:not(.ProseMirror-separator)'))for(const [k,v] of [['width','100%'],['min-width','100%'],['max-width','100%'],['height','auto'],['display','block'],['margin','0'],['padding','0'],['box-sizing','border-box']])setImportant(img,k,v);});}}}
  function setImportant(node,key,value){const scratch=document.createElement('div').style;scratch.setProperty(key,value,'important');const canonical=scratch.getPropertyValue(key);if(node.style.getPropertyValue(key)!==canonical||node.style.getPropertyPriority(key)!=='important')node.style.setProperty(key,value,'important');}
  function enforceLayout(root){repairLayout(root);styleLayoutRows(root,columnsFor(root),Number(root.getAttribute('data-qingpai-v6-gap')||$('gap').value));}
  function verifyLayout(root){if(!root?.isConnected){status('图片布局结构被编辑器移除，未完成插入。');return;}const cols=columnsFor(root),gap=Number(root.getAttribute('data-qingpai-v6-gap')||0),items=orderedImages(root),rects=items.map(img=>img.getBoundingClientRect());let okay=items.length===Number(root.getAttribute('data-qingpai-v6-layout'))&&rects.every(r=>r.width>0&&r.height>0&&Math.abs(r.width-rects[0].width)<1);for(let i=0;i<rects.length&&okay;i++){if(i>=cols){const previous=rects[i-cols];okay=Math.abs(rects[i].left-previous.left)<1&&Math.abs(rects[i].top-previous.bottom-gap)<2;}else if(i)okay=Math.abs(rects[i].top-rects[0].top)<1&&Math.abs(rects[i].left-rects[i-1].right-gap)<2;}status(okay?`已核验 ${cols} 列等宽瀑布流 · 原图比例 · ${gap}px 间距（轻排 0.19.1）。`:'图片尚未完成加载或布局未通过等宽检查，请加载后核对微信预览。');}
  async function insertLayout(){if(busy)return;try{if(selected.length&&selected.length!==count)throw new Error(`已选 ${selected.length} 张，请选择对应布局，或调整为 ${count} 张。`);const chosen=selected.map(i=>images[i]);const cols=columnsFor(),gap=Number($('gap').value),outer=document.createElement('section');outer.style.cssText='width:100%;margin:0;padding:0;';outer.setAttribute('data-qingpai-v6-layout',String(count));outer.setAttribute('data-qingpai-v6-gap',String(gap));outer.setAttribute('data-qingpai-v6-cols',String(cols));outer.id='qingpai-layout-'+Date.now();const items=[];for(let j=0;j<count;j++){const img=document.createElement('img');const item=chosen[j];img.src=item?item.src:placeholder(j);img.alt=item?(item.alt||'图片 '+(j+1)):'图片 '+(j+1)+'，点击替换';if(!item)img.setAttribute('data-qingpai-v6-placeholder','true');imageStyle(img);items.push(img);}outer.append(layoutTable(items,cols,gap));const {s}=restore();const r=s.getRangeAt(0);r.collapse(false);savedRange=r.cloneRange();busy=true;await insertHtml(outer.outerHTML+'<p><br></p>');activeLayout=editor.querySelector('#'+outer.id);activeImage=null;syncLayout();showTools('image');positionQuick();verifyLayout(activeLayout);imageFeedback('图片组已插入，可在左侧调整或撤销');const insertedLayout=activeLayout,verificationVersion=statusVersion;setTimeout(()=>{if(statusVersion===verificationVersion)verifyLayout(insertedLayout);},500);}catch(err){status(err.message);}finally{busy=false;}}

  function openLibrary(replaceGroup=false){try{restore();markInsertion();if(!replaceGroup){bulkTarget=null;bulkBefore=null;activeLayout=null;images=[];selected=[];gallery();quick.hidden=true;}else if(!bulkTarget?.isConnected)throw new Error('请先选中要替换的图片组。');if(replaceGroup)chooseCount(bulkTarget.querySelectorAll('img').length);$('editing-context').textContent='新建图片组合';const entry=document.querySelector('.js_img_dropdown_menu .js_img_from_local');if(!entry)throw new Error('未找到公众号图库入口，请先打开正文编辑页。');activeImage=null;libraryPending=true;libraryDialog=null;entry.click();status(`请在图库选择 ${count} 张图片，确定后自动排版。`);}catch(err){libraryPending=false;status(err.message);}}
  $('choose-library').onclick=()=>openLibrary(false);$('new-group').onclick=()=>{activeLayout=null;activeImage=null;selected=[];images=[];$('editing-context').textContent='新建图片组合';gallery();status('点击正文中的新位置，再从图库选图。');};
  $('placeholders').onclick=()=>{activeLayout=null;activeImage=null;selected=[];gallery();insertLayout();};
  let galleryInserting=false;
  const galleryOrders=new WeakMap();
  const galleryLayouts=new WeakMap();
  function galleryHint(modal,message,error=false){const box=modal.querySelector('[data-qingpai-gallery-tools]')?.shadowRoot;const hint=box?.getElementById('hint');if(hint){hint.textContent=message;hint.style.color=error?'#b45309':'#888';}}
  async function insertGallery(modal,n){
    if(galleryInserting||busy)return;
    galleryInserting=true;
    try{
      const result=await nativeRequest('gallery-selection');
      if(result.items.length!==n){galleryHint(modal,`请选 ${n} 张，当前已选 ${result.items.length} 张`,true);return;}
      if(!savedRange)throw new Error('请先关闭图库，点击正文插入位置，再打开图库。');
      if(bulkTarget){
        if(!bulkTarget.isConnected||bulkTarget.outerHTML!==bulkBefore)throw new Error('原图片组已变化，请取消后重新选择。');
        const ordered=orderGallery(modal,result.items),clone=bulkTarget.cloneNode(true);
        if(ordered.length!==clone.querySelectorAll('img').length)throw new Error('请选择与原图片组相同数量的图片。');
        orderedImages(clone).forEach((img,i)=>{img.src=ordered[i].src;img.alt=ordered[i].alt||'';img.removeAttribute('data-src');img.removeAttribute('data-qingpai-v6-placeholder');});
        enforceLayout(clone);const id=bulkTarget.id;busy=true;await insertHtml(clone.outerHTML,false,{targetId:id});activeLayout=editor.querySelector('#'+id);bulkTarget=null;bulkBefore=null;libraryPending=false;modal.querySelector('.weui-desktop-dialog__close-btn')?.click();syncLayout();imageFeedback('整组图片已替换，布局和间距保留');busy=false;return;
      }
      chooseCount(n);$('columns').value=String(n===2||n===4?2:3);
      const ordered=orderGallery(modal,result.items);images=ordered.map(item=>({...item,src:item.src.replace(/\/(?:300|640)\?/, '/0?')}));selected=images.map((_,i)=>i);
      activeLayout=null;activeImage=null;libraryPending=false;
      modal.querySelector('.weui-desktop-dialog__close-btn')?.click();gallery();await insertLayout();
    }catch(err){galleryHint(modal,err.message,true);status(err.message);}finally{galleryInserting=false;busy=false;}
  }
  const ordinaryGalleryConfirm=new WeakSet();
  async function confirmGallery(modal){
    if(galleryInserting||busy)return;
    try{
      const explicit=bulkTarget?bulkTarget.querySelectorAll('img').length:galleryLayouts.get(modal);
      if(!explicit)return;
      const n=explicit;
      await insertGallery(modal,n);
    }catch(err){galleryHint(modal,err.message,true);}
  }
  function orderGallery(modal,items){const previous=galleryOrders.get(modal)||[],bySource=new Map(items.map(item=>[item.src,item]));const result=previous.filter(src=>bySource.has(src)).map(src=>bySource.get(src));for(const item of items)if(!previous.includes(item.src))result.push(item);galleryOrders.set(modal,result.map(item=>item.src));return result;}
  function gallerySequence(modal,items){const ui=modal.querySelector('[data-qingpai-gallery-tools]')?.shadowRoot,strip=ui?.getElementById('sequence');if(!strip)return;strip.replaceChildren();const ordered=orderGallery(modal,items);strip.hidden=!ordered.length||ordered.length>9;if(strip.hidden)return;
    ordered.forEach((item,index)=>{const tile=document.createElement('div');tile.className='tile';const img=document.createElement('img');img.src=item.src;img.alt=`第 ${index+1} 张：${item.alt||'图片'}`;const label=document.createElement('span');label.textContent=String(index+1);tile.append(img,label);for(const [text,delta] of [['←',-1],['→',1]]){const b=document.createElement('button');b.type='button';b.textContent=text;b.setAttribute('aria-label',`第 ${index+1} 张${delta<0?'前移':'后移'}`);b.disabled=index+delta<0||index+delta>=ordered.length;b.onclick=()=>{const sources=ordered.map(item=>item.src);[sources[index],sources[index+delta]]=[sources[index+delta],sources[index]];galleryOrders.set(modal,sources);gallerySequence(modal,ordered);galleryHint(modal,'顺序已更新 · 点击布局按此顺序插入');};tile.append(b);}strip.append(tile);});
  }
  function attachGalleryTools(modal){
    const footer=modal.querySelector('.weui-desktop-dialog__ft');if(!footer||footer.querySelector('[data-qingpai-gallery-tools]'))return;
    const tools=document.createElement('div');tools.setAttribute('data-qingpai-gallery-tools','');tools.style.cssText='display:inline-block;position:relative;vertical-align:middle;margin:0 16px 0 0;';
    const ui=tools.attachShadow({mode:'open'});
    ui.innerHTML=`<style>:host{font:13px -apple-system,"PingFang SC",sans-serif;color:#353535} .sequence{position:absolute;bottom:calc(100% + 8px);right:0;display:flex;gap:6px;justify-content:flex-start;margin:0;max-width:520px;overflow:auto;padding:6px;background:#fff;border:1px solid #e7e7eb;border-radius:4px}.sequence[hidden]{display:none}.tile{position:relative;flex:0 0 48px}.tile img{width:48px;height:40px;object-fit:contain;background:#f6f6f6;display:block}.tile span{position:absolute;top:0;left:0;background:#07a545;color:white;padding:0 3px;font-size:11px}.tile button{display:inline-block;padding:2px 5px;font-size:12px}.tile button:disabled{opacity:.3;cursor:default} .row{display:flex;align-items:center;justify-content:flex-end;gap:6px}button{font:inherit;border:1px solid #d9dadc;background:white;color:#353535;border-radius:4px;padding:7px 9px;cursor:pointer;display:flex;align-items:center;gap:5px}button.recommended{border-color:#07a545;color:#07a545;background:#f0faf3;box-shadow:inset 0 0 0 1px #07a545}.grid{display:grid;gap:1px;width:18px;height:18px}.grid i{background:currentColor;border-radius:1px}button:hover,button:focus-visible{border-color:#07a545;color:#07a545;background:#f0faf3}button:focus-visible{outline:2px solid #07a545;outline-offset:2px}small{display:block;font-size:12px;color:#888;margin-top:5px;text-align:right}b{font-weight:500;margin-right:4px}</style><div id="sequence" class="sequence" hidden aria-label="拼图顺序，可前移后移"></div><div class="row"><b>插入方式</b><button type="button" data-n="0" aria-pressed="true" class="recommended" aria-label="默认，逐张插入">默认</button>${[2,3,4,6,9].map(n=>`<button type="button" data-n="${n}" aria-label="将所选 ${n} 张图片拼图插入"><span class="grid" aria-hidden="true" style="grid-template-columns:repeat(${n===2||n===4?2:3},1fr)">${'<i></i>'.repeat(n)}</span>${n} 图</button>`).join('')}</div><small id="hint" role="status">选择拼图布局和图片后，点击确定整组插入</small>`;
    ui.addEventListener('click',event=>{const button=event.target.closest('[data-n]');if(button){event.preventDefault();event.stopPropagation();const n=Number(button.dataset.n);galleryLayouts.set(modal,n);libraryPending=n>0;if(n)chooseCount(n);for(const item of ui.querySelectorAll('[data-n]')){const on=item===button;item.classList.toggle('recommended',on);item.setAttribute('aria-pressed',String(on));}galleryHint(modal,n?`已选 ${n} 图布局 · 选好图片后点击确定插入`:'默认方式 · 点击确定逐张插入');refreshGalleryHint(modal);}});
    galleryLayouts.set(modal,libraryPending?count:0);
    footer.prepend(tools);
    refreshGalleryHint(modal);

  }
  let galleryHintTimer=0,galleryHintRevision=0;
  function refreshGalleryHint(modal){
    clearTimeout(galleryHintTimer);const revision=++galleryHintRevision;
    galleryHintTimer=setTimeout(async()=>{try{
      if(!modal.isConnected||galleryInserting)return;
      const result=await nativeRequest('gallery-selection');if(revision!==galleryHintRevision||galleryInserting)return;
      gallerySequence(modal,result.items);const n=result.items.length,ui=modal.querySelector('[data-qingpai-gallery-tools]')?.shadowRoot;if(!ui)return;
      for(const button of ui.querySelectorAll('[data-n]')){const chosen=galleryLayouts.get(modal);const recommended=Number(button.dataset.n)===(chosen||0);button.classList.toggle('recommended',recommended);button.setAttribute('aria-pressed',String(Number(button.dataset.n)===galleryLayouts.get(modal)));button.setAttribute('aria-label',Number(button.dataset.n)===0?'默认，逐张插入':`${button.dataset.n} 图拼排${recommended?'，已选':''}`);}
      const chosen=galleryLayouts.get(modal);if(chosen){galleryHint(modal,n===chosen?`已选 ${n} 张 · 点击确定按 ${chosen} 图布局插入`:`${chosen} 图布局 · 已选 ${n} 张${n>chosen?'，请取消多选的图片':'，还需选择 '+(chosen-n)+' 张'}`,n>chosen);return;}
      galleryHint(modal,`默认方式 · 已选 ${n} 张，点击确定逐张插入${insertionContext?' · '+insertionContext:''}`);return;

    }catch{}},80);
  }
  const libraryObserver=new MutationObserver(records=>{
    if(!document?.documentElement)return;
    const modal=Array.from(document.querySelectorAll('.weui-desktop-dialog_img-picker')).find(e=>e.getBoundingClientRect().width>0);
    if(modal){libraryDialog=modal;attachGalleryTools(modal);if(records.some(record=>modal.contains(record.target)))refreshGalleryHint(modal);}else if(libraryDialog){libraryPending=false;libraryDialog=null;bulkTarget=null;bulkBefore=null;marker.hidden=true;}
  });
  libraryObserver.observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['style','class']});
  document.addEventListener('click',event=>{
    if(event.target.closest?.('.js_img_dropdown_menu')){remember();markInsertion();}
    if(!host.isConnected)return;const modal=event.target.closest?.('.weui-desktop-dialog_img-picker');if(!modal)return;
    const button=event.target.closest('button');if(!button||!button.closest('.weui-desktop-dialog__ft')||button.textContent.trim()!=='确定')return;
    if(ordinaryGalleryConfirm.has(modal)||(!galleryLayouts.get(modal)&&!bulkTarget))return;event.preventDefault();event.stopImmediatePropagation();confirmGallery(modal);
  },true);
  function repairLayout(root){if(root.querySelector('[data-qingpai-masonry="1"]'))return;const items=orderedImages(root);if(!items.length)return;const n=Number(root.getAttribute('data-qingpai-v6-layout')),cols=columnsFor(root);root.replaceChildren(layoutTable(items,cols,Number(root.getAttribute('data-qingpai-v6-gap')||$('gap').value)));root.style.cssText='width:100%;margin:0;padding:0;';}
  async function updateLayout(rebuild=false){if(busy)return;try{if(activeLayout?.isConnected){const root=activeLayout.cloneNode(true);root.setAttribute('data-qingpai-v6-gap',$('gap').value);root.setAttribute('data-qingpai-v6-cols',$('columns').value);if(rebuild){const items=(selected.length?selected.map(i=>images[i]):orderedImages(root).map(i=>({src:i.src,alt:i.alt,placeholder:i.hasAttribute('data-qingpai-v6-placeholder')}))).map(item=>{const img=document.createElement('img');img.src=item.src;img.alt=item.alt;if(item.placeholder)img.setAttribute('data-qingpai-v6-placeholder','true');imageStyle(img);return img;});root.replaceChildren(layoutTable(items,columnsFor(root),Number($('gap').value)));}repairLayout(root);root.querySelectorAll('img:not(.ProseMirror-separator)').forEach(imageStyle);enforceLayout(root);const id=activeLayout.id;busy=true;await insertHtml(root.outerHTML,true,{targetId:id});activeLayout=editor.querySelector('#'+id);syncLayout();verifyLayout(activeLayout);positionQuick();}return true;}catch(err){status(err.message);return false;}finally{busy=false;}}
  $('counts').onclick=event=>{const b=event.target.closest('[data-n]');if(!b)return;count=Number(b.dataset.n);$('columns').value=String(count===2||count===4?2:3);for(const item of $('counts').children){item.classList.toggle('selected',item===b);item.setAttribute('aria-pressed',String(item===b));}gallery();status(`已选择 ${count} 图布局，可插入占位图，或从公众号图库选图。`);};$('columns').onchange=()=>updateLayout(true);$('gap').onchange=()=>{savePreferences();updateLayout();};$('radius').onchange=()=>{savePreferences();updateLayout();};$('insert').onclick=()=>status('请从公众号图库选择图片并点击确定插入。');
  for(const button of $('counts').children){const n=Number(button.dataset.n),icon=document.createElement('span');icon.className='layout-icon';icon.setAttribute('aria-hidden','true');icon.style.gridTemplateColumns=`repeat(${n===2||n===4?2:3},1fr)`;for(let i=0;i<n;i++)icon.append(document.createElement('i'));button.prepend(icon);}
  const watched=new WeakSet();function watchImages(){for(const e of candidates()){if(watched.has(e))continue;watched.add(e);new MutationObserver(()=>{for(const img of e.querySelectorAll('[data-qingpai-v6-layout] img'))if(img.getAttribute('data-qingpai-v6-placeholder')&&!img.src.startsWith('data:'))img.removeAttribute('data-qingpai-v6-placeholder');}).observe(e,{subtree:true,childList:true,attributes:true,attributeFilter:['src','data-src']});}}
  $('gallery').before($('editing-context'));gallery();
  bind();watchImages();for(const f of document.querySelectorAll('iframe'))f.addEventListener('load',()=>{bind();watchImages();});const observer=new MutationObserver(()=>{bind();watchImages();scheduleDock();});observer.observe(document.documentElement,{childList:true,subtree:true});scheduleDock();
})();
