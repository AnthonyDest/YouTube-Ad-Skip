console.log('Popup script is running.');

document.addEventListener('DOMContentLoaded', function () {
  const fastForwardButton = document.getElementById('fastForwardButton');
  const clickButton = document.getElementById('clickButton');
  const testButton = document.getElementById('testButton');

  fastForwardButton.addEventListener('click', function () {
    // Send a message to the background script to initiate fast forward
    chrome.runtime.sendMessage({ command: 'fastForward' });
  });

  clickButton.addEventListener('click', function () {
    // Send a message to the background script to initiate button click
    chrome.runtime.sendMessage({ command: 'clickButton' });
  });

  testButton.addEventListener('click', function () {
    // Print "test1234" to the console
    console.log('test1234');
    chrome.runtime.sendMessage({ command: 'clickButton' });
  });
});
