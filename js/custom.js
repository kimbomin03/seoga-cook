
$(function () {
    const main_visual_slide = new Swiper('.main_visual_slide', {
        loop: true,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 6000,


    });

});

$(function () {
    const MMS = new Swiper('.main_menu_slide', {
        loop: true,
        slidesPerView: 4,
        spaceBetween: 80,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },

        speed: 5000,
    });

    $(document).ready(function () {

        const $counters = $(".counter");

        const exposurePercentage = 100;
        const duration = 1000;

        const addCommas = true;


        function updateCounter($el, start, end) {
            let startTime;
            function animateCounter(timestamp) {
                if (!startTime) startTime = timestamp;
                const progress = (timestamp - startTime) / duration;
                const current = Math.round(start + progress * (end - start));
                const formattedNumber = addCommas ? current.toLocaleString() : current;
                $el.text(formattedNumber);

                if (progress < 1) {
                    requestAnimationFrame(animateCounter);
                } else {
                    $el.text(addCommas ? end.toLocaleString() : end);
                }
            }
            requestAnimationFrame(animateCounter);
        }

        $(window).on('scroll', function () {

            $counters.each(function () {
                const $el = $(this);

                if (!$el.data('scrolled')) {

                    const rect = $el[0].getBoundingClientRect();
                    const winHeight = window.innerHeight;
                    const contentHeight = rect.bottom - rect.top;


                    if (rect.top <= winHeight - (contentHeight * exposurePercentage / 100) && rect.bottom >= (contentHeight * exposurePercentage / 100)) {
                        const start = parseInt($el.data("start"));
                        const end = parseInt($el.data("end"));

                        updateCounter($el, start, end);
                        $el.data('scrolled', true);
                    }
                }
            });
        }).scroll();
    });
});

$(function () {
    $('.to_top').on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 1000)
    });

    $(window).on('scroll', function () {
        let sct = $(window).scrollTop();
        console.log(sct)

        if (sct > 400) {
            $('.to_top').addClass('on')
        } else {
            $('.to_top').removeClass('on')
        }
    });
});