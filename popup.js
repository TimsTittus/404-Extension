document.addEventListener('DOMContentLoaded', () => {
    const countDisplay = document.getElementById('count-display');
    const historyList = document.getElementById('history-list');
    const clearButton = document.getElementById('clear-button');

    chrome.storage.local.get({ errorHistory: [] }, (result) => {
        const history = result.errorHistory;
        countDisplay.textContent = history.length;

        if (history.length === 0) {
            const emptyState = document.createElement('li');
            emptyState.className = 'empty-state';
            emptyState.textContent = 'Looks like you haven\'t found any lost pages yet. Happy Browse!';
            historyList.appendChild(emptyState);
            return;
        }

        history.forEach(entry => {
            const listItem = document.createElement('li');
            
            const link = document.createElement('a');
            link.href = entry.url;
            link.textContent = entry.url;
            link.target = '_blank';
            link.title = entry.url; // Show full URL on hover

            const timestamp = document.createElement('span');
            timestamp.className = 'timestamp';
            timestamp.textContent = new Date(entry.timestamp).toLocaleString();
            
            listItem.appendChild(link);
            listItem.appendChild(timestamp);
            historyList.appendChild(listItem);
        });
    });

    clearButton.addEventListener('click', () => {
        chrome.storage.local.set({ errorHistory: [] }, () => {
            countDisplay.textContent = '0';
            const emptyState = document.createElement('li');
            emptyState.className = 'empty-state';
            emptyState.textContent = 'History cleared!';
            historyList.innerHTML = ''; // Clear existing list
            historyList.appendChild(emptyState);
            
            chrome.action.setBadgeText({ text: '0' });
        });
    });
});