(function() {
  'use strict'
  // Polyfill Object.keys
  if (!Object.keys) Object.keys = function(o) {
    if (o !== Object(o))
      throw new TypeError('Object.keys called on a non-object');
    var k=[],p;
    for (p in o) if (Object.prototype.hasOwnProperty.call(o,p)) k.push(p);
    return k;
  }// End polyfill

  var framesContainer = document.getElementById('frames')
  var loadingContainer = document.getElementById('loading-container')
  var requestsComplete = document.getElementById('requests-complete')
  var loadingElements = {}
  window.createFrames = function() {
    var startTime = new Date()
    resetFrames()
    var urls = document.getElementById('urls').value.replace(/[ \t]/g, '').split('\n')
    if (urls.length == 1 && !urls[0].length) {
      return
    }

    var iframeWidth = document.getElementById('width').value
    var iframeHeight = document.getElementById('height').value
    var iframe, iframeLabel, iframeContainer, loadingIndicator
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

      loadingIndicator = document.createElement('li')
      loadingIndicator.innerText = 'Requesting ' + urls[i]
      loadingElements[urls[i]] = loadingIndicator
      iframe.onload = (function() {
        var url = urls[i]
        return function() {
          // Remove loading indicator
          console.log('loaded ', url)
          loadingElements[url].remove()
          delete loadingElements[url]
          if (!Object.keys(loadingElements).length) {
            requestsComplete.className = ''
            requestsComplete.innerText += ' ' + startTime.toLocaleTimeString() +
              '. Took ' + (new Date() - startTime)/1000 + 's'
          }
        }
      })()

      if (iframeWidth) {
        iframe.width = iframeWidth 
      }
      if (iframeHeight) {
        iframe.height = iframeHeight 
      }

      iframeContainer.appendChild(iframeLabel)
      iframeContainer.appendChild(iframe)

      iframe.src = urls[i]
      loadingContainer.appendChild(loadingIndicator)
      framesContainer.appendChild(iframeContainer)
    }
  }

  window.resetFrames = function() {
    while(framesContainer.lastChild) {
      framesContainer.lastChild.remove()
    }
  }

  window.onbeforeunload = function() {
    //return 'A frame has attempted to change the location of the page. Allow?'
  }
})()
