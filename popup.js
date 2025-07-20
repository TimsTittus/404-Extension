// This function runs when the popup is opened.
document.addEventListener('DOMContentLoaded', () => {
  const countDisplay = document.getElementById('count-display');
  const resetButton = document.getElementById('reset-button');

  // Get the current count from storage and display it.
  chrome.storage.local.get(['errorCount'], (result) => {
    const count = result.errorCount || 0;
    countDisplay.textContent = count;
  });

  // Add a click event listener for the reset button.
  resetButton.addEventListener('click', () => {
    // Reset the count to 0 in storage.
    chrome.storage.local.set({ errorCount: 0 }, () => {
      // Update the display in the popup.
      countDisplay.textContent = '0';
      // Reset the badge text on the extension icon.
      chrome.action.setBadgeText({ text: '0' });
      console.log("Count has been reset.");
    });
  });
});