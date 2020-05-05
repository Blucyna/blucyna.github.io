function scrollPageToTop() {
  let isSmoothScrollSupported = 'scrollBehavior' in document.documentElement.style;
  if (isSmoothScrollSupported) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  } else {
    smoothScroll(0, -1);
  }
}

function smoothScroll(targetOffset, direction) {
  let currentOffset = window.pageYOffset || document.body.scrollTop;
  let difference = Math.abs(currentOffset - targetOffset);
  if (!difference) return;
  let frames = parseInt(400 / 1000 * 60);
  let tick = 400 / frames;
  let perFrame = difference / frames;
  let timer = setInterval(() => {
    if (direction > 0) {
      if (window.pageYOffset >= targetOffset) {
        scrollBy(0, (targetOffset - difference) * direction);
        clearInterval(timer);
        return;
      }
    } else {
      if (window.pageYOffset <= 0) {
        scrollBy(0, difference * direction);
        clearInterval(timer);
        return;
      }
    }
    scrollBy(0, perFrame * direction);
    if (window.pageYOffset + window.innerHeight === document.body.scrollHeight) clearInterval(timer);
  }, tick);
}

function scrollDistance() {
  if (window.pageYOffset > 1200) {
    if(document.querySelector('.scroll-to-top').classList.contains('visible')) return;
    document.querySelector('.scroll-to-top').classList.add("visible");
  } else {
    document.querySelector('.scroll-to-top').classList.remove("visible");
  }
}

function init() {
  document
    .addEventListener('scroll', scrollDistance);

  document
    .getElementById('scroll-to-top')
    .addEventListener('click', scrollPageToTop);

  var previewButtons = document.getElementsByClassName('live-preview-btn');
  var footerContactButton = document.getElementById('footer-contact-button');

  Array.from(previewButtons).forEach(function(button) {
    button.addEventListener('click', function() {
      var id = this.getAttribute('id');

      fbq('trackCustom', 'ClickPreview', {path: window.siteConfig.path, buttonId: id});
    });
  });

  footerContactButton && footerContactButton.addEventListener('click', function() {
    fbq('trackCustom', 'ClickContact', {path: window.siteConfig.path, type: 'footer'});
    fbq('track', 'Lead');
  });
}

(function() {
  init();
})()