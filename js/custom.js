$(function() {
	toggleSlider(".btn-play");
	initPopup(".js-open-popup", ".popup-wrapper");
    mobileMenu();
});

$(window).on("load", function() {
	initGallery(".js-gallery-1", ".gallery-1-next", ".gallery-1-prev", ".gallery-1-scrollbar");
	initGallery(".js-gallery-2", ".gallery-2-next", ".gallery-2-prev", ".gallery-2-scrollbar");
	initGallery(".js-gallery-3");
	initSlider(".js-slider-1");
	initSlider(".js-slider-2");
	initSlider(".js-slider-3");

	loadingPage();
	initZoomGallery([".js-slider-1", ".js-slider-2", ".js-slider-3"], ".btn-zoomin");
	initDropdown();
});

function loadingPage() {
	$(".loading-page").remove();
	$("body").removeClass("no-scroll");
}

function initGallery(selector, nextBtn, prevBtn, scrollbar) {

	let options = {
		slidesPerView: "auto"
	};

	if (nextBtn && prevBtn) {
		options.navigation = {
			nextEl: nextBtn,
			prevEl: prevBtn
		};
	}

	if (scrollbar) {
		options.scrollbar = {
			el: scrollbar,
			draggable: true
		};
	}

	new Swiper(selector, options);
}

function initSlider(selector) {
	new Swiper(selector, {
		slidesPerView: 1,
		loop: true,
		autoplay: {
			delay: 3000,
			disableOnInteraction: false
		}
	});
}

function toggleSlider(buttonSelector) {
    $(document).on("click", buttonSelector, function(event) {
        event.stopPropagation();

        var $slider = $(this).closest(".swiper");
        var swiper = $slider[0].swiper;

        if (!swiper) return;

        if ($(this).hasClass("paused")) {
            swiper.autoplay.start();
            $(this).removeClass("paused");
        } else {
            swiper.autoplay.stop();
            $(this).addClass("paused");
        }
    });
}

function initZoomGallery(sliderSelectors, buttonSelector) {
    let mainSwiper = null, thumbSwiper = null;

    let combinedSelector = Array.isArray(sliderSelectors)
        ? sliderSelectors.join(", ")
        : sliderSelectors;

    $(document).on("click", combinedSelector + " " + buttonSelector, function () {

        let $slider = $(this).closest(".swiper");
        let swiper = $slider[0].swiper;

        if (!swiper) return;

        let realIndex = swiper.realIndex;

        let $lightbox = $(".lightbox");

        if (mainSwiper) { mainSwiper.destroy(true, true); mainSwiper = null; }
        if (thumbSwiper) { thumbSwiper.destroy(true, true); thumbSwiper = null; }

        $(".main-slider .swiper-wrapper, .thumb-slider .swiper-wrapper").empty();

        let realSlides = swiper.slides.filter(slide =>
            !slide.classList.contains("swiper-slide-duplicate")
        );

        $(realSlides).each(function () {
            let $img = $(this).find("img");
            let fullSrc = $img.attr("data-full") || $img.attr("src");
            let thumbSrc = $img.attr("src");

            $(".main-slider .swiper-wrapper").append(`
                <div class="swiper-slide">
                    <img src="${fullSrc}" alt="">
                </div>
            `);

            $(".thumb-slider .swiper-wrapper").append(`
                <div class="swiper-slide">
                    <img src="${thumbSrc}" alt="">
                </div>
            `);
        });

        thumbSwiper = new Swiper(".thumb-slider", {
            spaceBetween: 10,
            slidesPerView: "auto",
            freeMode: true,
            watchSlidesProgress: true
        });

        mainSwiper = new Swiper(".main-slider", {
            slidesPerView: 1,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            },
            thumbs: { swiper: thumbSwiper }
        });

        mainSwiper.slideTo(realIndex, 0);

        $lightbox.fadeIn();
    });

    $(".lightbox-close, .lightbox-overlay").on("click", function () {
        $(".lightbox").fadeOut(function () {
            if (mainSwiper) mainSwiper.destroy(true, true);
            if (thumbSwiper) thumbSwiper.destroy(true, true);
            mainSwiper = null;
            thumbSwiper = null;
        });
    });
}

function initDropdown() {
	$(document).on("click", ".btn-dropdown", function() {
		var $wrap = $(this).closest(".dropdown-wrap");

		$wrap.toggleClass("open");
		$wrap.find(".dropdown-list").slideToggle(200);
	});
}

function initPopup(openBtnSelector, popupSelector) {

    const $popup = $(popupSelector);

    $(document).on("click", openBtnSelector, function (e) {
        e.preventDefault();
        $popup.addClass("active");
        $("body").addClass("no-scroll");
    });

    $popup.on("click", ".popup-close", function () {
        $popup.removeClass("active");
        $("body").removeClass("no-scroll");
    });

    $popup.on("click", ".popup-overlay", function () {
        $popup.removeClass("active");
        $("body").removeClass("no-scroll");
    });
}

function mobileMenu() {
    $(".burger-menu").on("click", function() {
        var $header = $(".header");
        $header.toggleClass("active");
    });
}
