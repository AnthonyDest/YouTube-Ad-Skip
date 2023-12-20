chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (tab.url.startsWith('https://www.youtube.com/' && changeInfo.status === 'complete')) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['content.js'],
    });
  }
});
