function init() {
  var navContactButton = document.getElementById('nav-contact-button');
  var cvDownloadButton = document.getElementById('nav-cv-button');

  navContactButton && navContactButton.addEventListener('click', function() {
    fbq('trackCustom', 'ClickContact', {path: window.siteConfig.path, type: 'navigation'});
    fbq('track', 'Lead');
  });

  cvDownloadButton && cvDownloadButton.addEventListener('click', function() {
    fbq('trackCustom', 'CvDownloaded', {path: window.siteConfig.path});
  });
}

(function() {
  init();
})();