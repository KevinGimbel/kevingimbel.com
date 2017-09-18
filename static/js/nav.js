!(function(window, document, undefined) {
  var navTrigger = document.querySelector('#nav-mobile-trigger');
  var nav = document.querySelector('#navigation');
  var open = false;
  navTrigger.addEventListener('click', function() {
    if(open) {
      open = false;
      nav.classList.remove('open');
      navTrigger.textContent = "MENU";
    } else {
      open = true;
      nav.classList.add('open');
      navTrigger.textContent = "CLOSE";
    }
  });
})(window, document);
