jQuery(function($) {

	//Preloader
	var preloader = $('.preloader');
	$(window).load(function(){
		preloader.remove();
	});
	
	//Header Slider
	var slideHeight = $(window).height();
	$('#beite-home-slider .item').css('height',slideHeight-450);

	$(window).resize(function(){'use strict',
		$('#beite-home-slider .item').css('height',slideHeight-450);
	});
	
	//Portfolio
	$(".portfolio-gallery:first a[rel^='prettyPhoto']").prettyPhoto({
		animation_speed:'normal',
		slideshow:3000, 
		autoplay_slideshow: true
	});
	
	// Contact form
	var form = $('#contact-form');
	form.submit(function(event){
		event.preventDefault();
		var form_status = $('<div class="form_status"></div>');
		$.ajax({
			url: $(this).attr('action'),
			beforeSend: function(){
				form.prepend( form_status.html('<p><i class="fa fa-spinner fa-spin"></i> Email is sending...</p>').fadeIn() );
			}
		}).done(function(data){
			form_status.html('<p class="text-success">Thank you for contact us. We will contact you as soon as possible.</p>').delay(3000).fadeOut();
		});
	});
	
	//Google Map
	function initialize_map() {
		var latitude = $('#google-map').data('latitude')
		var longitude = $('#google-map').data('longitude')
		var myLatlng = new google.maps.LatLng(latitude,longitude);
		var mapOptions = {
			zoom: 14,
			scrollwheel: false,
			center: myLatlng
		};
		var map = new google.maps.Map(document.getElementById('google-map'), mapOptions);
		var contentString = '';
		var infowindow = new google.maps.InfoWindow({
			content: '<div class="map-content"><ul class="address">' + $('.address').html() + '</ul></div>'
		});
		var marker = new google.maps.Marker({
			position: myLatlng,
			map: map
		});
		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map,marker);
		});
	}
	google.maps.event.addDomListener(window, 'load', initialize_map);
	
});