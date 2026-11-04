chrome.action.onClicked.addListener(async tab => {
  if (!tab.id || !tab.url) return;
  const url = new URL(tab.url);
  if (url.protocol !== 'https:' || url.hostname !== 'mp.weixin.qq.com' ||
      url.pathname !== '/cgi-bin/appmsg' || url.searchParams.get('action') !== 'edit' ||
      !['10', '77'].includes(url.searchParams.get('type'))) return;
  try { await chrome.tabs.sendMessage(tab.id, {type:'qingpai-toggle'}); } catch {}
});
