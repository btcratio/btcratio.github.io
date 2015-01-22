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
		
		var firstIndex = Math.round((Math.random() * (markets.length-1)));
		var firstMarket = markets.splice(firstIndex, 1)[0];
		var secondIndex = Math.round((Math.random() * (markets.length-1)));
		var secondMarket = markets.splice(secondIndex, 1)[0];
		
		getRates(data, firstMarket, secondMarket);
	});
	
	// Toogle ratio display each 3 seconds
	setInterval(function () {
		var firstRate = $('.box.first .rate').data('first-rate');
		var secondRate = $('.box.second .rate').data('second-rate');
		$('body').toggleClass('ratio-mode');
		toggleRatioMode(firstRate, secondRate);
		if (firstRate > secondRate) {
			$('.box.second .rate').toggleClass('light');
		} else {
			$('.box.first .rate').toggleClass('light');
		}
	}, 3000);
});

function toggleRatioMode(firstRate, secondRate) {
	if ($('body').hasClass('ratio-mode') === true) {
		if (firstRate > secondRate) {
			firstRate = '+' + (((firstRate / secondRate) - 1) * 100).toFixed(1) + '%';
		} else {
			secondRate = '+' + (((secondRate / firstRate) - 1) * 100).toFixed(1) + '%';
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
			'<a target="_blank" href="' + data[firstMarket].display_URL + '">'
					+ data[firstMarket].display_name + '</a>');

	$('.box.second .market').html(
			'<a target="_blank" href="' + data[firstMarket].display_URL + '">'
					+ data[secondMarket].display_name + '</a>');
}