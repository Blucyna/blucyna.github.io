function getHeight() {
  var body = document.body,
    html = document.documentElement;

  return Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  ) - Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
}

function scrollEvent() {
  if (!window.scrollEvents) {
    window.scrollEvents = {};
  }

  if (!window.scrollEventsQuarters) {
    window.scrollEventsQuarters = {};
  }

  var pageOffset = Math.floor(window.pageYOffset / 500);
  var percent = Math.floor(100 * window.pageYOffset / getHeight());

  if (percent > 99) {
    percent = 99;
  }

  var quarter = Math.floor(percent / 25);

  if (!window.scrollEvents[pageOffset]) {
    window.scrollEvents[pageOffset] = true;
    fbq('trackCustom', 'scrollDepthAbs', {path: window.siteConfig.path, depth: `${pageOffset * 500} - ${(pageOffset+1) * 500}`});
  }

  if (!window.scrollEventsQuarters[quarter]) {
    window.scrollEventsQuarters[quarter] = true;
    fbq('trackCustom', 'scrollDepthPercent', {path: window.siteConfig.path, depth: `${quarter * 25} - ${(quarter+1) * 25}`});
  }

  if(!window.scrollEventSend && window.pageYOffset > 3000) {
    window.scrollEventSend = true;

    fbq('track', 'ViewContent', {content_type: window.siteConfig.path});
  }
}

function init() {
  document.addEventListener('scroll', scrollEvent);
}

(function() {
  init();
})();