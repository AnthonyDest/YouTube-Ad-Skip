// set video speed
function set_video_speed(speed) {
  console.log("Fast Forwarding");
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    video.playbackRate = parseFloat(speed);
  });
  // Optional: Save the speed to local storage for persistence
  localStorage.setItem('yt_speed', speed);
}

// Create a MutationObserver to watch for changes in the DOM
const observer = new MutationObserver(mutation_callback);

// Specify the target node and the type of mutations to observe
const target_node = document.body;
const config = { attributes: true, subtree: true };

// Start observing the target node for configured mutations
observer.observe(target_node, config);

// check what was modified
function mutation_callback(mutations_list) {
  for (const mutation of mutations_list) {
    if (mutation.type === 'childList' || mutation.type === 'attributes') {
      // Check for changes in the class attribute, which may indicate the start of an ad
      ad_element = document.querySelector('div.ad-showing');
      const button_selector = "button[class^='ytp-ad-skip-button']";
      button_to_click = document.querySelector(button_selector);
      videos = document.querySelectorAll('video');

      if (ad_element && videos[0].playbackRate !== 16) {
        // Ad has started
        mute_videos();
        set_video_speed(16);
      } else if (ad_element && button_to_click) {
        console.log("Clicking button");
        button_to_click.click();
      }
    }
  }
}

function mute_videos() {
  console.log("Muting videos");
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    video.muted = true;
  });
}
