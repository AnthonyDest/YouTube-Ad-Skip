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

// Wait for the ad to show up
wait_for_element('.ad-showing').then((elm) => {
  console.log('Ad is ready');
  // console.log(elm.textContent);
  mute_videos();
  set_video_speed(16);

});

// wait for the skip button to show up
wait_for_element("button[class^='ytp-ad-skip-button']").then((elm) => {
  console.log('Button is ready');
  // console.log(elm.textContent);
  elm.click();

});

// mute videos
function mute_videos() {
  console.log("Muting videos");
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    video.muted = true;
  });
}
