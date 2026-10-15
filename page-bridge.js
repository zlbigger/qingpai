(() => {
  if (window.__qingpaiBridgeInstalled) return;
  window.__qingpaiBridgeInstalled = true;
  document.addEventListener('qingpai-editor-request', event => {
    let request;
    try { request = JSON.parse(event.detail); } catch { return; }
    const reply = result => document.dispatchEvent(new CustomEvent('qingpai-editor-response', {detail:JSON.stringify({id:request.id,...result})}));
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
    } else if(request.selectAll) {
      api.invoke({apiName:'mp_editor_set_selection',apiParam:{selectAllMsg:true},sucCb:insert,errCb:()=>reply({error:'无法选中正文。'})});
    } else if(request.targetId) { reply({error:'原图片位置已变化，请重新选中。'}); }
    else insert();
  });
})();
