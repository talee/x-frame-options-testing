(function() {
  'use strict'
  var framesContainer = document.getElementById('frames')
  window.createFrames = function() {
    var urls = document.getElementById('urls').value.replace(/[ \t]/g, '').split('\n')
    if (urls.length == 1 && !urls[0].length) {
      return
    }

    var iframeWidth = document.getElementById('width').value
    var iframeHeight = document.getElementById('height').value
    var iframe, iframeLabel, iframeContainer
    for (var i=0; i < urls.length; i++) {
      if (!urls[i].length) {
        urls.splice(i, 1) && i--
        continue
      }

      iframe = document.createElement('iframe')
      iframeLabel = document.createElement('h2')
      iframeContainer = document.createElement('div')

      iframeContainer.style.display = 'inline-block'
      iframeLabel.innerText = urls[i]

      if (iframeWidth) {
        iframe.width = iframeWidth 
      }
      if (iframeHeight) {
        iframe.height = iframeHeight 
      }

      iframeContainer.appendChild(iframeLabel)
      iframeContainer.appendChild(iframe)

      iframe.src = urls[i]
      framesContainer.appendChild(iframeContainer)
    }
  }

  window.resetFrames = function() {
    while(framesContainer.lastChild) {
      framesContainer.lastChild.remove()
    }
  }

  window.onbeforeunload = function() {
    return 'A frame has attempted to change the location of the page. Allow?'
  }
})()
