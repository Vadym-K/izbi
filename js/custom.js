$(function() {

});

$(window).on("load", function() {
	initGallery(".js-gallery-1", ".gallery-1-next", ".gallery-1-prev", ".gallery-1-scrollbar");
	initGallery(".js-gallery-2", ".gallery-2-next", ".gallery-2-prev", ".gallery-2-scrollbar");
	initGallery(".js-gallery-3");
	initSlider(".js-slider-1");
	initSlider(".js-slider-2");
	initSlider(".js-slider-3");
});

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
			delay: 4000,
			disableOnInteraction: false
		}
	});
}