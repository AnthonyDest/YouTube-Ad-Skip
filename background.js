chrome.runtime.onInstalled.addListener(() => {
  chrome.browserAction.setBadgeText({
    text: "OFF",
  });
});
