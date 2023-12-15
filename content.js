// content.js

// set video speed
function setVideoSpeed(speed) {
  console.log("Fast Forwarding");
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    video.playbackRate = parseFloat(speed);
  });
  // Optional: Save the speed to local storage for persistence
  localStorage.setItem('yt_speed', speed);
}

function clickButtonIfFound() {
  // console.log("In button function.");
  const buttonSelector = "button[class^='ytp-ad-skip-button']";
  const buttonToClick = document.querySelector(buttonSelector);
  //document.querySelector("button[class^='ytp-ad-skip-button']")
  if (buttonToClick) {
    console.log("Button found. Clicking...");
    buttonToClick.click();
    return true;
  } else {
    console.log("Button not found.");
    return false;
  }
}

// Create a MutationObserver to watch for changes in the DOM
const observer = new MutationObserver(mutationCallback);

// Specify the target node and the type of mutations to observe
const targetNode = document.body;
const config = { attributes: true, subtree: true };

// Start observing the target node for configured mutations
observer.observe(targetNode, config);
const total_duration_seconds = 10;
const wait_duration_seconds = 0.1;

function mutationCallback(mutationsList) {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList' || mutation.type === 'attributes') {
      // Check for changes in the class attribute, which may indicate the start of an ad
      // fastForwardIfElementExists();
      const adElement = document.querySelector('div.ad-showing');
      if (adElement) {
        // Ad has started
        muteVideos();
        setVideoSpeed(16);
        for (let i = 0; i < total_duration_seconds/wait_duration_seconds && !clickButtonIfFound(); i++) {
          setTimeout(() => {}, wait_duration_seconds);
        }
      }
    }
  }
}


function muteVideos() {
  console.log("Muting videos");
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    video.muted = true;
  });
}
