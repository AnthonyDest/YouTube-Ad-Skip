// set video speed
function setVideoSpeed(speed) {
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    video.playbackRate = parseFloat(speed);
  });
  // Optional: Save the speed to local storage for persistence
  localStorage.setItem('yt_speed', speed);
}

// Check if the ad element exists and fast forward if it does
function fastForwardIfElementExists() {
  const adElement = document.querySelector("div.ad-showing");

  if (adElement) {
    console.log("Ad is active. Not playing video.");
    setVideoSpeed(16);
  } else {
    console.log("The video is playing.");
    setVideoSpeed(1);
  }
}

// Use MutationObserver to listen for changes in the DOM
const observer = new MutationObserver(function (mutationsList) {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList' || mutation.type === 'attributes') {
      fastForwardIfElementExists();
    }
  }
});

// Execute the function when the content script is injected
fastForwardIfElementExists();

// Listen for messages from the extension popup or background script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.command === 'fastForwardIfElementExists') {
    fastForwardIfElementExists();
  }
});
