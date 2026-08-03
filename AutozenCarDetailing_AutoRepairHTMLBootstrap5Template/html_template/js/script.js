$(document).ready(function () {
  // Initialize AOS (Animate On Scroll)
  AOS.init({
    duration: 800,
    once: true
  });

  // Bootstrap Carousel Effect Ken Burns
  function doAnimations(elems) {
    const animEndEv = 'animationend';

    elems.forEach((elem) => {
      elem.classList.add('animate__animated', 'animate__flipInX');
      elem.addEventListener(animEndEv, () => {
        elem.classList.remove('animate__animated', 'animate__flipInX');
      });
    });
  }

  // Variables on page load
  const carouselKenBurns = document.querySelector('#carouselKenBurns');

  if (carouselKenBurns) {
    const firstAnimatingElems = Array.from(
      carouselKenBurns.querySelector('.carousel-item:first-child')
        .querySelectorAll("[data-animation^='animated']")
    );

    doAnimations(firstAnimatingElems);

    carouselKenBurns.addEventListener('slid.bs.carousel', (e) => {
      const animatingElems = Array.from(e.relatedTarget.querySelectorAll("[data-animation^='animated']"));
      doAnimations(animatingElems);
    });
  }

  // Client Logo
  $('.client-logos').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '120px',
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false,
    dots: false,
    pauseOnHover: false,
    responsive: [{
      breakpoint: 768,
      settings: {
        slidesToShow: 2
      }
    }, {
      breakpoint: 520,
      settings: {
        slidesToShow: 1
      }
    }]
  });

  // Testimonial

  $('.testimonial-slide').slick({
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    dots: true,
    arrows: false,
    autoplaySpeed: 2000,
    responsive: [{
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      }
    }, {
      breakpoint: 520,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    }]
  });

  // Fancy Box
  Fancybox.bind("[data-fancybox]", {
    Carousel: {
      Video: {
        autoplay: true,
      },
    },
  });

  // Ancore Proteção Veicular - Auto-rotating pills (carousel behavior)
  (function () {
    const pillsTab = document.getElementById('pills-tab');
    const pillsContent = document.getElementById('pills-tabContent');

    if (!pillsTab || !pillsContent || typeof bootstrap === 'undefined') return;

    const tabButtons = Array.from(pillsTab.querySelectorAll('[data-bs-toggle="pill"]'));
    if (tabButtons.length < 2) return;

    const INTERVAL = 5000; // tempo de exibição de cada card (ms)
    let timer = null;

    function currentIndex() {
      return tabButtons.findIndex((btn) => btn.classList.contains('active'));
    }

    function showTab(index) {
      const total = tabButtons.length;
      const btn = tabButtons[((index % total) + total) % total];
      bootstrap.Tab.getOrCreateInstance(btn).show();
    }

    function next() {
      showTab(currentIndex() + 1);
    }

    function start() {
      stop();
      timer = setInterval(next, INTERVAL);
    }

    function stop() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    // Navegação manual reinicia o contador (desktop e mobile)
    tabButtons.forEach((btn) => btn.addEventListener('click', start));

    // Pausa enquanto o usuário interage (hover no desktop), retoma ao sair
    [pillsTab, pillsContent].forEach((el) => {
      el.addEventListener('mouseenter', stop);
      el.addEventListener('mouseleave', start);
    });

    start();
  })();
});

/* ===== Assinatura / Console ===== */
(function () {
  var titulo = "color:#DF3B34;font-size:22px;font-weight:bold;";
  var claro  = "color:#EEEEEE;font-size:13px;";
  var suave  = "color:#808080;font-size:12px;";
  console.log("%cAncore \u2014 Prote\u00e7\u00e3o Veicular", titulo);
  console.log("%cDesenvolvido por Giovanni Marcaccini \u00b7 Front-end & Web Design", claro);
  console.log("%cHTML5 \u00b7 Bootstrap 5 \u00b7 jQuery \u00b7 AOS \u00b7 Slick \u00b7 Fancybox", suave);
  console.log("%c\u00a9 2024-2026 Ancore. Todos os direitos reservados.", suave);
})();
