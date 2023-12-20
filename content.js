// set video speed
function set_video_speed(speed) {
  console.log("Fast Forwarding");
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    video.playbackRate = parseFloat(speed);
  });
}

// mute videos
function mute_videos() {
  console.log("Muting videos");
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    video.muted = true;
  });
}

// async detect desired element
function wait_for_element(selector) {
  return new Promise(resolve => {
    console.log(`Waiting for element ${selector}`);
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

      console.log("current speed: " + videoElement.playbackRate);
      if (videoElement && videoElement.playbackRate !== 16) {
        observer.disconnect();
        resolve(videoElement);
      }
    });

    // const video = document.querySelectorAll('#movie_player');
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}

// wait for ad to start, then mute video and fast forward
async function wait_for_ad_start() {
  // else if not in ad, wait for ad to show up
  console.log("Waiting for ad");
  const ad_element = await wait_for_element('.ad-showing');
  console.log('Ad is ready');
  mute_videos();
  set_video_speed(16);
  wait_for_ad_end();
}

// Wait for the ad to end, then reset the ad watch
async function wait_for_ad_end() {
  console.log("Waiting for ad to end");
  const ad_element = await wait_for_speed_change();
  console.log('Ad has ended');
  wait_for_ad_start();

}

// clicks the skip button if available
async function handle_skip_button() {
  // console.log("Waiting for button");
  const skipButton = await wait_for_element(".ytp-ad-text.ytp-ad-skip-button-text-centered.ytp-ad-skip-button-text");
  console.log('Button is ready');
  // console.log(skipButton.textContent);
  skipButton.click();
  handle_skip_button(); // Call the function recursively
}

console.log("Content script is running.");
// start recursive functions
wait_for_ad_start();
handle_skip_button();
