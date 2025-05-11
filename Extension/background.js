// Keeps track of the currently active tab and when the user started viewing it
let currentTab = "";
let startTime = Date.now();

// Triggered when user switches tabs
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  trackTime(tab.url);
});

// Triggered when a tab finishes loading
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.status === "complete") {
    trackTime(tab.url);
  }
});

/**
 * Handles switching between websites
 * Calculates time spent on the previous tab
 * Resets timer for the new one
 */
function trackTime(url) {
  const endTime = Date.now();
  const duration = Math.floor((endTime - startTime) / 1000); // in seconds

  // Save time for the previous tab if one exists
  if (currentTab) {
    const domain = new URL(currentTab).hostname;
    saveTime(domain, duration);
  }

  // Reset state for the current tab
  currentTab = url;
  startTime = Date.now();
}

/**
 * Sends time tracking data to the backend
 * @param {string} domain - Website domain name
 * @param {number} duration - Time spent in seconds
 */
function saveTime(domain, duration) {
  const timestamp = new Date().toISOString();

  fetch("http://localhost:5000/log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ domain, duration, timestamp })
  }).catch(console.error); // If server is down, don't crash
}
