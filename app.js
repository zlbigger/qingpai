const $=id=>document.getElementById(id);
const fonts={optima:'Optima-Regular, PingFangTC-light, "PingFang SC", sans-serif',default:'-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif',song:'"Songti SC", SimSun, serif',arial:'Arial, Helvetica, sans-serif',futura:'Futura-Medium, Futura, sans-serif',cochin:'Cochin-BoldItalic, Cochin, serif'};
let count=4,images=[],dragIndex=null,uploadVersion=0;
const controls=['font','size','leading','paragraph','color','ratio','gap','radius','caption'];
function message(text){$('feedback').textContent=text;}
function formatted(){const root=document.createElement('section');root.style.cssText=`font-family:${fonts[$('font').value]};font-size:${$('size').value}px;line-height:${$('leading').value};color:${$('color').value};padding:0 8px;overflow-wrap:break-word;`;const blocks=$('text').value.trim().split(/\n\s*\n/).filter(Boolean);for(const block of blocks){const heading=/^#{1,3}\s/.test(block);const p=document.createElement(heading?'h2':'p');p.textContent=block.replace(/^#{1,3}\s/,'');p.style.cssText=`margin:0 0 ${$('paragraph').value}px;white-space:pre-wrap;${heading?'font-size:22px;font-weight:600;line-height:1.5;':''}`;root.append(p);}return root;}
function swap(a,b){if(a<0||b<0||a>=images.length||b>=images.length)return;[images[a],images[b]]=[images[b],images[a]];render();}
let composerRange=null,composerUpdating=false;
function drawComposer(){
 if(composerUpdating)return;
 const editor=$('composer');editor.replaceChildren();
 const blocks=$('text').value.trim().split(/\n\s*\n/).filter(Boolean).map(text=>{const p=document.createElement('p');p.textContent=text;editor.append(p);return p;});
 if(!blocks.length){const p=document.createElement('p');p.append(document.createElement('br'));editor.append(p);blocks.push(p);}
 if(images.length){const card=document.createElement('div');card.className='composer-images';card.contentEditable='false';card.setAttribute('aria-label','正文中的图片组合');
 const label=document.createElement('small');label.textContent=`图片组合 · ${Math.min(count,images.length)} 张`;card.append(label);
 const tiles=document.createElement('div');tiles.style.cssText=`display:grid;grid-template-columns:repeat(${count===2||count===4?2:3},minmax(0,1fr));gap:4px`;
 for(const item of images.slice(0,count)){const img=document.createElement('img');img.src=item.src;img.alt=item.name;tiles.append(img);}card.append(tiles);
 const at=$('imagePosition').value;if(at==='start')editor.prepend(card);else if(at==='end'||!blocks[Number(at)])editor.append(card);else blocks[Number(at)].after(card);
 if(card===editor.lastElementChild){const tail=document.createElement('p');tail.append(document.createElement('br'));editor.append(tail);}
 }
 composerRange=null;
}
function readComposer(){
 const editor=$('composer'),parts=[];let imageAfter=null;
 for(const node of editor.childNodes){if(node.nodeType===1&&node.classList.contains('composer-images')){imageAfter=parts.length-1;continue;}const text=(node.nodeType===3?node.textContent:node.innerText).replace(/\r/g,'').trim();if(text)parts.push(text);}
 if(imageAfter===null&&images.length)images=[];
 $('text').value=parts.join('\n\n');
 // Rebuild the position choices before updating the selected anchor.
 const at=imageAfter===null?'end':imageAfter<0?'start':String(imageAfter);
 composerUpdating=true;render();$('imagePosition').value=at;render();composerUpdating=false;
}
function placeAtCaret(){
 const editor=$('composer'),r=composerRange;
 readComposer();
 if(r&&editor.contains(r.startContainer)){
   const block=(r.startContainer.nodeType===1?r.startContainer:r.startContainer.parentElement).closest('p,div');
   if(block&&block!==editor&&!block.closest('.composer-images')){
     const tail=r.cloneRange();tail.setEnd(block,block.childNodes.length);const rest=tail.extractContents();
     if(rest.textContent.trim()){const next=document.createElement('p');next.append(rest);block.after(next);}
     const siblings=Array.from(editor.children),beforeCount=siblings.slice(0,siblings.indexOf(block)).filter(n=>!n.classList.contains('composer-images')&&n.textContent.trim()).length;
     const index=beforeCount+(block.textContent.trim()?0:-1);if(!block.textContent.trim())block.remove();
     readComposer();$('imagePosition').value=index<0?'start':String(index);
   }
 }
 render();message(images.length?'图片组合已插入左侧正文，右侧已同步。':'位置已记录，请选择图片；选好后会显示在这里。');
}
$('composer').addEventListener('input',readComposer);
const rememberComposer=()=>{const s=getSelection();if(s.rangeCount&&$('composer').contains(s.anchorNode))composerRange=s.getRangeAt(0).cloneRange();};
$('composer').addEventListener('keyup',rememberComposer);$('composer').addEventListener('mouseup',rememberComposer);
$('composer').addEventListener('paste',event=>{event.preventDefault();document.execCommand('insertText',false,event.clipboardData.getData('text/plain'));});
$('insertAtCaret').addEventListener('pointerdown',event=>event.preventDefault());$('insertAtCaret').onclick=()=>{placeAtCaret();if(!images.length)$('images').click();};
$('images').addEventListener('click',()=>{if(composerRange)placeAtCaret();});
function render(){
 const root=formatted(),position=$('imagePosition'),previous=position.value;
 position.replaceChildren();for(const [value,label] of [['end','文末'],['start','文首'],...Array.from(root.children).map((node,i)=>[String(i),`第 ${i+1} 段后 · ${node.textContent.slice(0,18)}`])]){const option=document.createElement('option');option.value=value;option.textContent=label;position.append(option);}
 position.value=Array.from(position.options).some(option=>option.value===previous)?previous:'end';
 // Move existing image nodes before replacing their old text container.
 const gridNode=$('grid'),captionNode=$('captionPreview');gridNode.remove();captionNode.remove();
 $('preview').replaceChildren(root);
 const blocks=Array.from(root.children),at=position.value;
 if(at==='start')root.prepend(gridNode,captionNode);else if(at==='end'||!blocks[Number(at)])root.append(gridNode,captionNode);else blocks[Number(at)].after(gridNode,captionNode);
 blocks.forEach((node,i)=>{node.dataset.imageAnchor=String(i);node.classList.toggle('image-anchor',at===String(i));node.title='点击将图片放在这段之后';});
 $('positionHint').textContent=at==='start'?'图片将插在文章开头':at==='end'?'图片将插在文章末尾':`图片将插在第 ${Number(at)+1} 段之后`;
const cols=count===2?2:count===4?2:3;const grid=$('grid');grid.style.display=images.length?'grid':'none';grid.style.gridTemplateColumns=`repeat(${cols},minmax(0,1fr))`;grid.style.gap=$('gap').value+'px';grid.replaceChildren();for(let i=0;i<count;i++){const tile=document.createElement('div');tile.className='tile';tile.style.aspectRatio=$('ratio').value;tile.style.borderRadius=$('radius').value+'px';if(images[i]){const img=document.createElement('img');img.src=images[i].src;img.alt=images[i].name;tile.append(img);tile.draggable=true;tile.addEventListener('dragstart',()=>dragIndex=i);tile.addEventListener('dragover',e=>e.preventDefault());tile.addEventListener('drop',e=>{e.preventDefault();if(dragIndex!==null)swap(dragIndex,i);dragIndex=null;});const nav=document.createElement('span');nav.className='move';for(const [label,delta] of [['←',-1],['→',1]]){const b=document.createElement('button');b.textContent=label;b.setAttribute('aria-label',`第 ${i+1} 张图片${delta<0?'前移':'后移'}`);b.disabled=i+delta<0||i+delta>=Math.min(count,images.length);b.onclick=()=>swap(i,i+delta);nav.append(b);}tile.append(nav);}else tile.textContent=String(i+1).padStart(2,'0');grid.append(tile);}$('captionPreview').textContent=$('caption').value;const n=Math.min(count,images.length);$('imageStatus').textContent=images.length?`已选 ${images.length} 张，本布局使用前 ${n} 张${n<count?`，还需 ${count-n} 张才能导出`:''}。`:'先选择图片；下方色块仅示意布局，不会导出。';drawComposer();}
for(const id of [...controls,'text'])$(id).addEventListener('input',()=>{render();if(controls.includes(id)){try{localStorage.setItem('qingpai-settings',JSON.stringify(Object.fromEntries(controls.map(k=>[k,$(k).value]))));}catch{}}});
$('imagePosition').addEventListener('change',render);
$('preview').addEventListener('click',event=>{const block=event.target.closest('[data-image-anchor]');if(!block)return;$('imagePosition').value=block.dataset.imageAnchor;render();message(`图片位置已设为第 ${Number(block.dataset.imageAnchor)+1} 段之后。`);});
$('counts').addEventListener('click',e=>{const b=e.target.closest('button[data-count]');if(!b)return;count=Number(b.dataset.count);for(const item of $('counts').children){const active=item===b;item.classList.toggle('selected',active);item.setAttribute('aria-pressed',String(active));}render();});
$('images').addEventListener('change',async e=>{const version=++uploadVersion;message('正在读取图片…');const result=[];try{for(const file of e.target.files){if(!['image/jpeg','image/png','image/webp'].includes(file.type))throw new Error('请选择 JPG、PNG 或 WebP 图片。');const src=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=()=>reject(new Error('图片读取失败'));reader.readAsDataURL(file);});const img=new Image();img.src=src;await img.decode();result.push({src,name:file.name,img});}if(version!==uploadVersion)return;images=result;render();message('图片已载入。');}catch(err){if(version===uploadVersion)message(err.message);}});
function download(blob,name){const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),10000);}
$('copy').onclick=async()=>{const node=formatted();try{await navigator.clipboard.write([new ClipboardItem({'text/html':new Blob([node.outerHTML],{type:'text/html'}),'text/plain':new Blob([node.textContent],{type:'text/plain'})})]);message('已复制文字排版，请粘贴到公众号编辑器并预览。');}catch{message('当前浏览器未允许复制。请导出 HTML，打开后选中正文复制。');}};
$('html').onclick=()=>{const html='<!doctype html><html lang="zh-CN"><meta charset="utf-8"><title>轻排文章</title><body style="max-width:600px;margin:40px auto;padding:20px">'+formatted().outerHTML+'</body></html>';download(new Blob([html],{type:'text/html;charset=utf-8'}),'轻排-文字.html');message('文字 HTML 已导出。');};
$('download').onclick=()=>{if(images.length<count){message(`此布局需要 ${count} 张图片，请再选择图片。`);return;}const cols=count===2||count===4?2:3,rows=Math.ceil(count/cols),scale=3.2,gap=Number($('gap').value)*scale,cellW=(1200-gap*(cols-1))/cols,cellH=cellW/Number($('ratio').value),radius=Number($('radius').value)*scale;const c=document.createElement('canvas');c.width=1200;c.height=Math.round(rows*cellH+(rows-1)*gap);const ctx=c.getContext('2d');ctx.fillStyle='#ffffff';ctx.fillRect(0,0,c.width,c.height);for(let i=0;i<count;i++){const img=images[i].img,x=(i%cols)*(cellW+gap),y=Math.floor(i/cols)*(cellH+gap);const factor=Math.max(cellW/img.naturalWidth,cellH/img.naturalHeight),sw=cellW/factor,sh=cellH/factor;ctx.save();ctx.beginPath();ctx.roundRect(x,y,cellW,cellH,Math.min(radius,cellW/2,cellH/2));ctx.clip();ctx.drawImage(img,(img.naturalWidth-sw)/2,(img.naturalHeight-sh)/2,sw,sh,x,y,cellW,cellH);ctx.restore();}c.toBlob(blob=>{if(blob){download(blob,`轻排-${count}图.png`);message('拼图已导出，可上传到公众号正文。图片说明请另行添加。');}else message('导出失败，请重试。');},'image/png');};
try{const saved=JSON.parse(localStorage.getItem('qingpai-settings')||'{}');for(const k of controls){if(saved[k]!==undefined){const old=$(k).value;$(k).value=saved[k];if(!$(k).value)$(k).value=old;}}}catch{}
render();
