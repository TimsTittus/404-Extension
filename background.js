chrome.webRequest.onHeadersReceived.addListener(
  (details) => {
    if (details.statusCode === 404) {
      console.log("404 Error Detected at:", details.url);

      chrome.storage.local.get({ errorHistory: [] }, (result) => {
        const history = result.errorHistory;

        const newEntry = {
          url: details.url,
          timestamp: new Date().toISOString()
        };

        history.unshift(newEntry);
        
        if (history.length > 100) {
            history.pop();
        }

        chrome.storage.local.set({ errorHistory: history });
        chrome.action.setBadgeText({ text: history.length.toString() });
      });
    }
  },

  { urls: ["<all_urls>"] }
);

chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.get({ errorHistory: [] }, (result) => {
    const count = result.errorHistory.length;
    chrome.action.setBadgeText({ text: count.toString() });
  });
});