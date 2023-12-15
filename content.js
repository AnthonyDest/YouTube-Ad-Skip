// content.js

// set video speed
function setVideoSpeed(speed) {
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    video.playbackRate = parseFloat(speed);
  });
  // Optional: Save the speed to local storage for persistence
  localStorage.setItem('yt_speed', speed);
}

function clickButtonIfFound() {
  console.log("In button function.");
  const buttonSelector = "button.ytp-ad-skip-button.ytp-button";
  const buttonToClick = document.querySelector(buttonSelector);

  if (buttonToClick) {
    console.log("Button found. Clicking...");
    buttonToClick.click();
    return true;
  } else {
    console.log("Button not found.");
    return false;
  }
}

// Check if the ad element exists and fast forward if it does
function fastForwardIfElementExists() {
  const adElement = document.querySelector("div.ad-showing");

  if (adElement) {
    console.log("Ad is active. Not playing video.");
    setVideoSpeed(16);

    // Check for the skip button every 1 second for a total of 10 seconds
    const totalSeconds = 10;
    const stepMilliseconds = 1000;

    for (let i = 0; i < totalSeconds && !clickButtonIfFound(); i++) {
      setTimeout(() => {}, i * stepMilliseconds);
    }
  } else {
    console.log("The video is playing.");
    setVideoSpeed(1);
  }
}

// Use MutationObserver to listen for changes in the DOM
const observer = new MutationObserver(function (mutationsList) {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList' || mutation.type === 'attributes') {
      console.log("Mutation detected. Checking for ad element...");
      fastForwardIfElementExists();
    }
  }
});

// Execute the function when the content script is injected
// fastForwardIfElementExists();

// Listen for messages from the extension popup or background script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.command === 'fastForward') {
    // fastForwardIfElementExists();
    setVideoSpeed(0.5);
  }
});
