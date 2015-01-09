$(document).ready(function() {
	var data;
	var markets = [];
	$.get('https://api.bitcoinaverage.com/exchanges/EUR', function(get) {
		data = get;
		$.each(data, function(key, value) {
			if (key !== "timestamp") {
//				http://labs.abeautifulsite.net/jquery-dropdown/
//				$('.dropdown-menu').append('<li>' + key + '</li>');
				markets.push(key);
			}
		});
		var firstIndex = Math.round((Math.random() * markets.length));
		var firstMarket = markets.splice(firstIndex, 1)[0];
		var secondIndex = Math.round((Math.random() * markets.length));
		var secondMarket = markets.splice(firstIndex, 1)[0];
		getRates(data, firstMarket, secondMarket);
	});
	
	$('.rate').click(function() {
		$('body').toggleClass('ratio-mode');
		toggleRatioMode();
	});
});

function toggleRatioMode() {
	var firstRate = $('.box.first .rate').data('first-rate');
	var secondRate = $('.box.second .rate').data('second-rate');
	if ($('body').hasClass('ratio-mode') === true) {
		if (firstRate > secondRate) {
			firstRate = (firstRate / secondRate).toFixed(2);
			secondRate = 1;
		} else {
			secondRate = (secondRate / firstRate).toFixed(2);
			firstRate = 1;
		}
	}
	$('.box.first .rate').html(firstRate);
	$('.box.second .rate').html(secondRate);
}

function getRates(data, firstMarket, secondMarket) {
	// Set rates
	var firstRate = data[firstMarket].rates.last.toFixed(2);
	var secondRate = data[secondMarket].rates.last.toFixed(2);

	$('.box.first .rate').html(firstRate);
	$('.box.first .rate').data('first-rate', firstRate);
	$('.box.second .rate').html(secondRate);
	$('.box.second .rate').data('second-rate', secondRate);

	$('.box.first .market').html(
			'<a data-dropdown="#dropdown" href="#">'
					+ data[firstMarket].display_name + '</a>');

	$('.box.second .market').html(
			'<a data-dropdown="#dropdown" href="#">'
					+ data[secondMarket].display_name + '</a>');
}