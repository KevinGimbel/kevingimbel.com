!(function(window, document, undefined) {
  'use strict';
  var tooltips = [];
  document.addEventListener('click', function(e) {
    var element = e.target;
    var nodeName = element.nodeName.toLowerCase();
    if (nodeName == 'abbr') {
      // TODO: Finish implementation :D
      var el = document.createElement('div');
      el.setAttribute('id', 'tooltip-' + e.pageX + e.pageY);
      el.setAttribute('style', 'left: ' + e.pageX + 'px; top: ' + e.pageY + 'px;position:absolute;');
      el.classList.add('tooltip');
      el.textContent = element.getAttribute('title');
      tooltips.push(el);
      document.body.appendChild(el);
    } else {
      tooltips.forEach(function(tip) {
        tip.style.display = 'none';
      });
    }
  });
})(window, document);
!(function(window, document, undefined) {
  'use strict';
  var LazyLoad = function(opts) {
  var opts = opts || {};
  this.options = {
    parent: opts.parent || '.lazyload',
    childs: opts.childs || 'img',
    offset: opts.offset || 200
  }
  this.parent = document.querySelector(this.options.parent);
  this.childs = this.parent.querySelectorAll(this.options.childs);
}

LazyLoad.prototype.init = function() {
  this.checkOffset();
  this.bindScroll();
}
LazyLoad.prototype.checkOffset = function() {
  var viewportHeight = window.innerHeight;
  var windowOffset = (window.scrollY > 0) ? window.scrollY : 0;
  var childs = this.childs;
  var offsetBounce = viewportHeight;
  var childsLen = this.childs.length;

    if(this.parent.offsetTop - offsetBounce <= windowOffset) {
      for(var i = 0; i <=  childsLen - 1; i++) {
        var cur = childs[i];
        // check if the current element needs to be displayed.
        if(cur.offsetTop - offsetBounce <= windowOffset) {
          if(cur.dataset.src !== '') {
            cur.src = cur.dataset.lazyload;
            cur.dataset.src = '';
          }
        }
      }
    }
}
LazyLoad.prototype.bindScroll = function() {
  window.addEventListener('scroll', function() {
    this.checkOffset();
  }.bind(this))
}

var l = new LazyLoad({parent: '#maincontent', childs: '[data-lazyload]'}).init();
})(window, document);
