// set video speed
function set_video_speed(speed) {
  debug_print("Fast Forwarding");
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    video.playbackRate = parseFloat(speed);
  });
}

// mute videos
function mute_videos() {
  debug_print("Muting videos");
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    video.muted = true;
  });
}

// async detect desired element
function wait_for_element(selector) {
  return new Promise(resolve => {
    debug_print(`Waiting for element ${selector}`);
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver(mutations => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        resolve(document.querySelector(selector));
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}

// async detect video speed change
function wait_for_speed_change() {
  return new Promise(resolve => {
    const observer = new MutationObserver(mutationsList => {
      const videoElement = document.querySelector('video');

      debug_print("current speed: " + videoElement.playbackRate);
      if (videoElement && videoElement.playbackRate !== 16) {
        observer.disconnect();
        resolve(videoElement);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}

// wait for ad to start, then mute video and fast forward
async function wait_for_ad_start() {
  // else if not in ad, wait for ad to show up
  debug_print("Waiting for ad");
  const ad_element = await wait_for_element('.ad-showing');
  debug_print('Ad is ready');
  mute_videos();
  set_video_speed(16);
  wait_for_ad_end();
}

// Wait for the ad to end, then reset the ad watch
async function wait_for_ad_end() {
  debug_print("Waiting for ad to end");
  const ad_element = await wait_for_speed_change();
  debug_print('Ad has ended');
  wait_for_ad_start();

}

// clicks the skip button if available
async function handle_skip_button() {
  debug_print("Waiting for button");
  const skipButton = await wait_for_element(".ytp-ad-text.ytp-ad-skip-button-text-centered.ytp-ad-skip-button-text");
  debug_print('Button is ready');
  skipButton.click();
  handle_skip_button(); // Call the function recursively
}

debug = false;
// debug print message
function debug_print(message) {
  if (debug) {
    console.log(message);
  }
}

debug_print("Content script is running.");
// start recursive functions
wait_for_ad_start();
handle_skip_button();
