let startTime = Date.now();
let currentSite = window.location.hostname;

// Notify backend when the user leaves the site
window.addEventListener("beforeunload", () => {
  const timeSpent = Math.round((Date.now() - startTime) / 1000); // in seconds

  // Send to backend
  navigator.sendBeacon("http://localhost:5000/track", JSON.stringify({
    website: currentSite,
    timeSpent,
    timestamp: new Date().toISOString()
  }));
});
