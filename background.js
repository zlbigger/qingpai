chrome.action.onClicked.addListener(async tab => {
  if (!tab.id || !tab.url?.startsWith('https://mp.weixin.qq.com/')) return;
  try { await chrome.tabs.sendMessage(tab.id, {type:'qingpai-toggle'}); } catch {}
});
