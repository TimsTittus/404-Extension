// This listener fires when the headers for a web request are received.
chrome.webRequest.onHeadersReceived.addListener(
  (details) => {
    // Check if the status code is 404 (Not Found).
    if (details.statusCode === 404) {
      console.log("404 Error Detected at:", details.url);

      // Get the current count from storage.
      chrome.storage.local.get(['errorCount'], (result) => {
        let count = result.errorCount || 0;
        count++; // Increment the count.

        // Save the new count back to storage.
        chrome.storage.local.set({ errorCount: count }, () => {
          console.log("404 count updated to:", count);
        });

        // Update the badge text on the extension icon to show the new count.
        chrome.action.setBadgeText({ text: count.toString() });
      });
    }
  },
  // Filter for requests to all URLs.
  { urls: ["<all_urls>"] }
);

// Initialize the badge text when the extension starts.
chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.get(['errorCount'], (result) => {
    const count = result.errorCount || 0;
    chrome.action.setBadgeText({ text: count.toString() });
  });
});