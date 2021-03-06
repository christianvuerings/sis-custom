(function() {
  'use strict';

  /**
   * Slightly modified version of https://git.io/vtlVO
   */
  var loadCSS = function(href, before, media, callback) {
    // Arguments explained:
    // `href` is the URL for your CSS file.
    // `before` optionally defines the element we'll use as a reference for injecting our <link>
    // By default, `before` uses the last <script> element in the head.
    // However, since the order in which stylesheets are referenced matters, you might need a more specific location in your document.
    // If so, pass a different reference element to the `before` argument and it'll insert before that instead
    // note: `insertBefore` is used instead of `appendChild`, for safety re: http://www.paulirish.com/2011/surefire-dom-element-insertion/
    var ss = window.document.createElement('link');
    var scripts = window.document.head.getElementsByTagName('script');
    var lastScript = scripts[scripts.length - 1];
    var ref = before || lastScript;
    var sheets = window.document.styleSheets;
    ss.rel = 'stylesheet';
    ss.href = href;
    // temporarily, set media to something non-matching to ensure it'll fetch without blocking render
    ss.media = 'only x';
    // DEPRECATED
    if (callback) {
      ss.onload = callback;
    }

    // inject link
    ref.parentNode.insertBefore(ss, ref);
    // This function sets the link's media back to `all` so that the stylesheet applies once it loads
    // It is designed to poll until document.styleSheets includes the new sheet.
    ss.onloadcssdefined = function(cb) {
      var defined;
      for (var i = 0; i < sheets.length; i++) {
        if (sheets[ i ].href && sheets[ i ].href === ss.href) {
          defined = true;
        }
      }
      if (defined) {
        cb();
      } else {
        setTimeout(function() {
          ss.onloadcssdefined(cb);
        });
      }
    };
    ss.onloadcssdefined(function() {
      ss.media = media || 'all';
    });
    return ss;
  };

  // Random number for cache busting
  var randomNumber = Math.round(Math.random() * 10000000000000);
  loadCSS('/uc_cust/data/portal/css/sis_cs.css' + '?_=' + randomNumber);
})();
