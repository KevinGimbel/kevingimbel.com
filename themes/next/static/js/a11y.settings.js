!(function(window, document, undefined) {
    'use strict';
    console.log('a11y: Init Settings Module.');

    var settingsTrigger = document.querySelector('#settings-trigger');
    var settingsDialog = document.querySelector('#settings');
    var settingsForm = document.querySelector('#settings-form');
    var settingsClose = document.querySelector('#settings-close');
    var settingsClear = document.querySelector('#settings-clear');
    var lsSettings = localStorage.getItem('a11y_settings') && JSON.parse(localStorage.getItem('a11y_settings')) || {};
    var fontIncreaseBtn = document.querySelector('#font-increase');
    var fontDecreaseBtn = document.querySelector('#font-decrease');
    // var darkModeTrigger = document.querySelector('#dark-mode');

    /**
     * hex2Rgb converts a hex color to RGB for contrast calculation
     * Function for luminanace calculations are taken from this StackOverflow thread https://stackoverflow.com/questions/9733288/how-to-programmatically-calculate-the-contrast-ratio-between-two-colors/9733420
     */
    function hex2Rgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };

    function luminanace(rgb) {
      var r = rgb.r;
      var g = rgb.g;
      var b = rgb.b;
        var a = [r, g, b].map(function (v) {
            v /= 255;
            return v <= 0.03928
                ? v / 12.92
                : Math.pow( (v + 0.055) / 1.055, 2.4 );
        });
        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    }

    function contrast(rgb1, rgb2) {
        return (luminanace(rgb1) + 0.05) / (luminanace(rgb2) + 0.05);
    }

    /**
     * Increase or decrease the font size. `direction` can either be `+` for
     * increase or `-` for decrease.
     */
    function a11yChangeFontSize(direction) {
      if (lsSettings['--font-base-size']) {
        a11y.fontSize = parseInt(lsSettings['--font-base-size']);
      }
      if(a11y && a11y.fontSize) {
        if (direction == "-") {
          a11y.fontSize--;
        } else {
          a11y.fontSize++;
        }
        document.documentElement.style.setProperty('--font-base-size', a11y.fontSize + 'px');
        lsSettings['--font-base-size'] = a11y.fontSize + 'px';
        localStorage.setItem('a11y_settings', JSON.stringify(lsSettings));
      }
    }

    /**
     * Populate the settings with the current values from localStorage
     */
     function populateSettingsFromArray(settingsArray) {
       for (var rule in settingsArray) {
          var settingsInput = document.querySelector('input[name="'+ rule +'"]');
          if(settingsInput) {
            settingsInput.value = settingsArray[rule];
            if(contrast(hex2Rgb('#ffffff'), hex2Rgb(settingsArray[rule])) > 5) {
              document.documentElement.style.setProperty(rule + '-fg', '#ffffff');
            } else {
              document.documentElement.style.setProperty(rule + '-fg', '#000000');
            }
          }
        }
     }

    function setStylesAndCreateForgroundColors(lsSettings) {
      document.documentElement.style.setProperty('--color-accent-primary', lsSettings['--color-accent-primary']);
      document.documentElement.style.setProperty('--color-accent-secondary', lsSettings['--color-accent-secondary']);
       for(var rule in lsSettings) {
         console.log(lsSettings[rule]);
         if(lsSettings[rule].toString().charAt(0) != '#' ) { continue; }
         if(contrast(hex2Rgb('#ffffff'), hex2Rgb(lsSettings[rule])) > 5) {
           document.documentElement.style.setProperty(rule + '-fg', '#ffffff');
         } else {
           document.documentElement.style.setProperty(rule + '-fg', '#000000');
         }
       };
     }

    settingsTrigger.addEventListener('click', function(e) {
      document.body.classList.add('page-settings--open');
      document.body.setAttribute('tabindex', "-1");
      settingsDialog.focus();
    });

    settingsClose.addEventListener('click', function(e) {
      e.preventDefault();
      document.body.classList.remove('page-settings--open');
      document.body.setAttribute('tabindex', "0");
      return false;
    });

    settingsClear.addEventListener('click', function(e) {
      e.preventDefault();
      localStorage.removeItem('a11y_settings');

      lsSettings['--color-accent-primary'] =  a11y.defaultStyles['--color-accent-primary'];
      lsSettings['--color-accent-secondary'] = a11y.defaultStyles['--color-accent-secondary'];
      setStylesAndCreateForgroundColors(lsSettings);
      populateSettingsFromArray(lsSettings);
      localStorage.setItem('a11y_settings', JSON.stringify(lsSettings));
      // Remove the overlay
      document.body.classList.remove('page-settings--open');
      document.body.setAttribute('tabindex', "0");
    });

    settingsForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var fd = new FormData(settingsForm).entries();

      for (var cssRule of fd) {
        lsSettings[cssRule[0]] = cssRule[1];
      }

      setStylesAndCreateForgroundColors(lsSettings);
      populateSettingsFromArray(lsSettings);

      localStorage.setItem('a11y_settings', JSON.stringify(lsSettings));
      document.body.classList.remove('page-settings--open');
      document.body.setAttribute('tabindex', "0");
      return false;
    });

    fontIncreaseBtn.addEventListener('click', function(e) {
      a11yChangeFontSize("+");
    });

    fontDecreaseBtn.addEventListener('click', function(e) {
      a11yChangeFontSize("-");
    });

    if(!a11y.savedSettings) {
      a11y.savedSettings = localStorage.getItem('a11y_settings');
    }

    /*darkModeTrigger.addEventListener('click', function(e) {
      var el = e.target;
      if(lsSettings['--body-invert'] == 0 || !lsSettings['--body-invert']) {
        lsSettings['--body-invert'] = 100;
        document.body.classList.add('dark-mode');
      } else {
        lsSettings['--body-invert'] = 0;
        document.body.classList.remove('dark-mode');
      }
      document.documentElement.style.setProperty('--body-invert', lsSettings['--body-invert']);
      localStorage.setItem('a11y_settings', JSON.stringify(lsSettings));
    }); */

    populateSettingsFromArray(a11y.savedSettings);
})(window, document);
