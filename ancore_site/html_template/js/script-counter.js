$(document).ready(function () {
  /**
   * Animates a count-up effect on the given element.
   * @param {jQuery} $el - The jQuery element to animate.
   * @param {number} [duration=2000] - Duration of the animation in milliseconds.
   */
  function countUp($el, duration = 2000) {
    const target = parseInt($el.data('count'), 10) || 0;
    const prefix = $el.data('prefix') !== undefined ? $el.data('prefix') : '';
    const suffix = $el.data('suffix') !== undefined ? $el.data('suffix') : '+';

    $({ countNum: 0 }).animate({ countNum: target }, {
      duration: duration,
      easing: 'swing',
      step: function () {
        $el.text(prefix + Math.floor(this.countNum) + suffix);
      },
      complete: function () {
        $el.text(prefix + target + suffix);
      }
    });
  }
  /**
   * Gives a "live" counter a slow, randomized trickle of increments after
   * its initial count-up finishes, so the number keeps feeling current.
   * @param {jQuery} $el - The jQuery element to keep ticking.
   */
  function startLiveTicker($el) {
    const minDelay = 5000;
    const maxDelay = 9000;

    function scheduleNext() {
      setTimeout(tick, minDelay + Math.random() * (maxDelay - minDelay));
    }

    function tick() {
      const current = parseInt($el.data('count'), 10) || 0;
      const next = current + 1 + Math.floor(Math.random() * 3);
      const prefix = $el.data('prefix') !== undefined ? $el.data('prefix') : '';
      const suffix = $el.data('suffix') !== undefined ? $el.data('suffix') : '+';

      $el.data('count', next);
      $el.text(prefix + next + suffix);
      scheduleNext();
    }

    scheduleNext();
  }

  // Setup IntersectionObserver
  function setupCountUpObserver(selector = '.count-up', duration = 2000) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const $target = $(entry.target);
          if (!$target.hasClass('counted')) {
            countUp($target, duration);
            $target.addClass('counted');
            if ($target.hasClass('live-counter')) {
              setTimeout(() => startLiveTicker($target), duration);
            }
          }
          obs.unobserve(entry.target); // Stop observing after triggered
        }
      });
    }, { threshold: 0.6 });

    $(selector).each(function () {
      observer.observe(this);
    });
  }
  // Activate count-up observers
  setupCountUpObserver();
});