/**
 * JavaScript helper for viewport based CSS animations
 * @version v1.0.2
 * @author Ana Vicente
 * @copyright ©2018 Ana Vicente
 * Released under the MIT license
 **/

(function (global) {
  function Peekaboo(options) {
    this.peekabooed = [];
    this.options = {
      root: null,
      threshold: 0.25,
      finishedClass: 'peekabooed',
    };

    this.options = extend(this.options, options);

    var container = this.options.root ? this.options.root : document;
    this.items = container.querySelectorAll('[data-peekaboo]');

    if (this.items.length) {
      this.initPeekaboo();
    }
  }

  var PK = Peekaboo.prototype;

  PK.initPeekaboo = function () {
    var hasIntersectionObserver =
      'IntersectionObserver' in window &&
      'IntersectionObserverEntry' in window &&
      'intersectionRatio' in window.IntersectionObserverEntry.prototype;

    if (hasIntersectionObserver) {
      this.createObserver();
    } else {
      //Fallback to requestanimationframe
      for (var i = 0; i < this.items.length; i++) {
        this.requestAnim(this.items[i]);
      }
    }
  };

  PK.createObserver = function () {
    var options = {
      root: this.options.root,
      threshold: this.options.threshold,
    };

    var observer = new IntersectionObserver(
      this.observeItem.bind(this),
      options
    );

    for (var i = 0; i < this.items.length; i++) {
      observer.observe(this.items[i]);
    }
  };

  PK.observeItem = function (entries, observer) {
    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i],
        item = entry.target;

      if (entry.intersectionRatio > this.options.threshold) {
        this.animItem(item);

        observer.unobserve(item);
      }
    }
  };

  PK.requestAnim = function (item) {
    if (!this.isPeekabooed(item)) {
      var bounds = item.getBoundingClientRect(),
        visibleY = window.innerHeight - bounds.height * this.options.threshold,
        visibleX = window.innerWidth - bounds.width * this.options.threshold;

      if (bounds.top <= visibleY && bounds.left <= visibleX) {
        this.animItem(item);
      }

      window.requestAnimationFrame(this.requestAnim.bind(this, item));
    }
  };

  PK.animItem = function (item) {
    var delayAttr = item.getAttribute('data-peekaboo-delay');
    var delay = delayAttr ? parseInt(delayAttr, 10) : 0;
    var _this = this;

    this.peekabooed.push(item);

    if (delay > 0) {
      setTimeout(function () {
        item.classList.add(_this.options.finishedClass);
      }, delay);
    } else {
      item.classList.add(_this.options.finishedClass);
    }
  };

  PK.isPeekabooed = function (item) {
    return this.peekabooed.indexOf(item) >= 0;
  };

  function extend(defaultOpts, userOpts) {
    var extended = {};
    var attr;

    for (attr in defaultOpts) {
      extended[attr] = defaultOpts[attr];
    }

    for (attr in userOpts) {
      extended[attr] = userOpts[attr];
    }

    return extended;
  }

  if (typeof define === 'function' && define.amd) {
    //AMD
    define(function () {
      return Peekaboo;
    });
  } else if (typeof module !== 'undefined' && module.exports) {
    //node
    module.exports = Peekaboo;
  } else {
    // browser
    // use string because of Google closure compiler ADVANCED_MODE
    /* jslint sub:true */
    global['Peekaboo'] = Peekaboo;
  }
})(this);
