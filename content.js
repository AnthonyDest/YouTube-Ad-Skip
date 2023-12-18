// set video speed
function set_video_speed(speed) {
  console.log("Fast Forwarding");
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    video.playbackRate = parseFloat(speed);
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

console.log("Content script is running.");

// Wait for the ad to show up
async function handle_ad() {
  console.log("Waiting for ad");
  const adElement = await wait_for_element('.ad-showing');
  console.log('Ad is ready');
  mute_videos();
  set_video_speed(16);
  wait_for_ad_end();
}

// Wait for the ad to end and resets the ad watch
async function wait_for_ad_end() {
  const video = await wait_for_element("video")
  if(video.playbackRate!=16){
    handle_ad();
  } // Call the function recursively
}

// clicks the skip button if available
async function handle_skip_button() {
  console.log("Waiting for button");
  const skipButton = await wait_for_element(".ytp-ad-text.ytp-ad-skip-button-text-centered.ytp-ad-skip-button-text");
  console.log('Button is ready');
  // console.log(skipButton.textContent);
  skipButton.click();
  handle_skip_button(); // Call the function recursively
}

// start recursive functions
handle_ad();
handle_skip_button();

// mute videos
function mute_videos() {
  console.log("Muting videos");
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    video.muted = true;
  });
}
