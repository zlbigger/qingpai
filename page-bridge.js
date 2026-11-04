(() => {
  // Only long-form article editors are supported. Other WeChat content types
  // must not mount controls, observe galleries, or register editing handlers.
  function isArticlePage(){
    const url=new URL(location.href);
    if(['127.0.0.1','localhost'].includes(url.hostname))return true; // local QA fixtures
    return url.protocol==='https:'&&url.hostname==='mp.weixin.qq.com'&&url.pathname==='/cgi-bin/appmsg'&&url.searchParams.get('action')==='edit'&&['10','77'].includes(url.searchParams.get('type'));
  }
  if(!isArticlePage())return;
  if (window.__qingpaiBridgeInstalled) return;
  window.__qingpaiBridgeInstalled = true;
  function bodyEditor(){return Array.from(document.querySelectorAll('.view .ProseMirror,.mock-iframe-body .ProseMirror')).find(e=>!e.closest('#js_title_main,.title-editor__input'));}
  function editorView(editor){
    const direct=editor?.pmViewDesc?.view;if(direct?.dom===editor)return direct;
    for(let el=editor;el;el=el.parentElement){let vm=el.__vue__;for(let i=0;vm&&i<12;i++,vm=vm.$parent){if(typeof vm.getView==='function'){try{const view=vm.getView();if(view?.dom===editor)return view;}catch{}}}}
    return null;
  }
  function sameCss(a,b){const normalize=value=>{const css=document.createElement('span').style;css.cssText=value||'';return Array.from(css).sort().map(key=>key+':'+css.getPropertyValue(key)+':'+css.getPropertyPriority(key)).join(';');};return normalize(a)===normalize(b);}
  // Change model attributes in one transaction. Never insert or replace article HTML.
  function applyModelStyles(request){
    const editor=bodyEditor(),view=editorView(editor);
    if(!view?.state?.tr||!view.dispatch)throw new Error('未找到微信正文样式接口，请重新加载插件并刷新编辑页。');
    const elements=Array.from(editor.querySelectorAll('*'));
    if(editor.textContent!==request.text||elements.length!==request.elementCount)throw new Error('正文已变化，请重新选择样式。');
    const indexed=new Map();view.state.doc.descendants((node,pos)=>{const dom=view.nodeDOM(pos);if(dom?.nodeType===1)indexed.set(dom,{node,pos});});
    const tr=view.state.tr;
    for(const item of request.changes||[]){const el=elements[item.index];if(!el||el.tagName!==item.tag||el.getAttribute('style')!==item.beforeStyle)throw new Error('段落样式已变化，请重新点击排版。');
      const entry=indexed.get(el);
      if(!entry){let matches=0;view.state.doc.descendants((node,pos)=>{if(!node.isText)return;const dom=view.nodeDOM(pos);if(!dom||!el.contains(dom))return;for(const mark of node.marks){const spec=mark.type.spec.toDOM?.(mark);if(!Array.isArray(spec)||String(spec[0]).toLowerCase()!==el.tagName.toLowerCase())continue;const rendered=spec[1]&&typeof spec[1]==='object'?spec[1]:{};if(!sameCss(rendered.style,item.beforeStyle))continue;const attrs={...mark.attrs};if(Object.prototype.hasOwnProperty.call(attrs,'attributes'))attrs.attributes={...(attrs.attributes||{}),style:item.style};else if(Object.prototype.hasOwnProperty.call(attrs,'style'))attrs.style=item.style;else continue;tr.removeMark(pos,pos+node.nodeSize,mark);tr.addMark(pos,pos+node.nodeSize,mark.type.create(attrs));matches++;}});if(!matches)throw new Error('该段包含暂不支持的文字样式，已保留原文。');continue;}
      const {node,pos}=entry,attrs={...node.attrs};
      if(Object.prototype.hasOwnProperty.call(attrs,'attributes')){attrs.attributes={...(attrs.attributes||{}),style:item.style};if(item.role)attrs.attributes['data-qingpai-role']=item.role;else delete attrs.attributes['data-qingpai-role'];}
      else if(Object.prototype.hasOwnProperty.call(attrs,'style'))attrs.style=item.style;
      else throw new Error('微信此段落不支持样式属性，已保留原文。');
      tr.setNodeMarkup(pos,undefined,attrs,node.marks);
    }
    const preserve=node=>{const json=node.toJSON();const clean=value=>{if(Array.isArray(value))return value.map(clean);if(!value||typeof value!=='object')return value;const result={};for(const [key,item] of Object.entries(value)){if(key==='style'||key==='data-qingpai-role')continue;result[key]=clean(item);}return result;};return JSON.stringify(clean(json));};
    if(preserve(view.state.doc)!==preserve(tr.doc))throw new Error('样式操作将改变正文，已停止。');
    view.dispatch(tr.setMeta('qingpaiStyle',true));
    return {ok:true,model:true,changed:request.changes.length};
  }
  function modelNodeFor(view,element){let match=null;view.state.doc.descendants((node,pos)=>{if(view.nodeDOM(pos)===element){match={node,pos};return false;}});return match;}
  function imageModelOperation(request){const editor=bodyEditor(),view=editorView(editor),target=document.getElementById(request.targetId);if(!view||!target||!editor.contains(target)||target.outerHTML!==request.expected)throw new Error('图片位置或内容已变化，请重新选中图片组。');const entry=modelNodeFor(view,target);if(!entry)throw new Error('未找到图片组在微信正文中的位置。');
    if(request.action==='remove-image-operation'){
      if(!target.matches('[data-qingpai-v6-layout],img')&&!(target.id.startsWith('qingpai-after-')&&!target.textContent.trim()&&!target.querySelector('img,video,audio,iframe,table,svg')))throw new Error('只能撤销图片组或新建的空行。');
      const ranges=[[entry.pos,entry.pos+entry.node.nodeSize]];if(request.tailId){const tail=document.getElementById(request.tailId);if(!tail||!editor.contains(tail)||tail.outerHTML!==request.tailExpected||tail.textContent.trim()||tail.querySelector('img,video,audio,iframe,table,svg'))throw new Error('图片后方已有编辑，请使用微信撤销。');const tailEntry=modelNodeFor(view,tail);if(!tailEntry)throw new Error('未找到图片后方空行的位置。');ranges.push([tailEntry.pos,tailEntry.pos+tailEntry.node.nodeSize]);}const tr=view.state.tr;for(const [from,to]of ranges.sort((a,b)=>b[0]-a[0]))tr.delete(from,to);view.dispatch(tr);return{ok:true};
    }
    const after=entry.pos+entry.node.nodeSize,next=view.state.doc.nodeAt(after);let media=false;next?.descendants(node=>{if(node.isAtom&&!node.isText)media=true;});let tr=view.state.tr,created=false,id=null;
    if(!(next&&(next.isTextblock||next.type===view.state.schema.nodes.para||next.type===view.state.schema.nodes.paragraph))||next.textContent.trim()||media){const type=view.state.schema.nodes.para||view.state.schema.nodes.paragraph;if(!type)throw new Error('微信当前正文不支持新建文字段落。');id='qingpai-after-'+Date.now();const attrs=Object.prototype.hasOwnProperty.call(type.spec.attrs||{},'attributes')?{attributes:{id}}:{};const leafType=view.state.schema.nodes.leaf,leaf=leafType&&type.contentMatch.matchType(leafType)?leafType.createAndFill():null;const para=type.createAndFill(attrs,leaf||undefined);if(!para)throw new Error('无法创建正文空行。');tr.insert(after,para);created=true;}
    let candidate=tr.doc.nodeAt(after),hasTextblock=!!candidate?.isTextblock;candidate?.descendants(node=>{if(node.isTextblock)hasTextblock=true;});const leafType=view.state.schema.nodes.leaf;if(!hasTextblock&&candidate&&leafType&&candidate.type.contentMatch.matchType(leafType)){const leaf=leafType.createAndFill();if(leaf)tr.insert(after+1,leaf);}
    const Selection=view.state.selection.constructor,writable=tr.doc.nodeAt(after);let cursor=after+1;if(writable&&!writable.isTextblock){let inner=null;writable.descendants((node,offset)=>{if(inner===null&&node.isTextblock){inner=after+offset+2;return false;}});if(inner!==null)cursor=inner;}tr.setSelection(Selection.near(tr.doc.resolve(cursor),1));view.dispatch(tr);view.focus();return{ok:true,created,nodeId:id};
  }
  document.addEventListener('qingpai-editor-request', event => {
    let request;
    try { request = JSON.parse(event.detail); } catch { return; }
    const reply = result => document.dispatchEvent(new CustomEvent('qingpai-editor-response', {detail:JSON.stringify({id:request.id,...result})}));
    if(request.action==='remove-image-operation'||request.action==='continue-after-image'){try{reply(imageModelOperation(request));}catch(err){reply({error:err.message});}return;}
    if(request.action==='style-probe'){reply({available:!!editorView(bodyEditor())});return;}
    if(request.action==='apply-styles'){try{reply(applyModelStyles(request));}catch(err){reply({error:err.message});}return;}
    if(request.action==='gallery-selection'){
      const modal=Array.from(document.querySelectorAll('.weui-desktop-dialog_img-picker')).find(e=>e.getBoundingClientRect().width>0);
      let component=modal?.__vue__;while(component&&component.$options?.name!=='mp-image-dialog')component=component.$parent;
      if(!component||!Array.isArray(component.selectedImgs)){reply({error:'未能读取图库选择，请取消后重新打开图库。'});return;}
      const items=component.selectedImgs.map(item=>({src:item.url,alt:item.name||''}));
      if(items.some(item=>typeof item.src!=='string'||!/^https:\/\//.test(item.src))){reply({error:'图库返回了不支持的图片地址。'});return;}
      reply({items});return;
    }
    const api = window.__MP_Editor_JSAPI__;
    if (request.action === 'probe') { reply({available:typeof api?.invoke === 'function'}); return; }
    if (!api?.invoke) { reply({error:'公众号原生编辑接口不可用，请重新打开编辑页。'}); return; }
    if (request.action !== 'insert' || typeof request.html !== 'string') return;
    const insert = () => api.invoke({apiName:'mp_editor_insert_html',apiParam:{html:request.html,isSelect:false},sucCb:()=>reply({ok:true}),errCb:()=>reply({error:'公众号编辑器拒绝了插入。'})});
    const target = request.targetId && document.getElementById(request.targetId);
    if (target && target.closest('[contenteditable="true"]')) {
      api.invoke({apiName:'mp_editor_set_selection',apiParam:{container:target,selectCurrent:true},sucCb:insert,errCb:()=>reply({error:'无法选中需要更新的图片组合。'})});
    } else if(request.selectAll) { reply({error:'已禁止整篇 HTML 替换，请使用段落样式或图片组操作。'});
    } else if(request.targetId) { reply({error:'原图片位置已变化，请重新选中。'}); }
    else insert();
  });
})();
