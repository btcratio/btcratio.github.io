$(document).ready(function() {
	var firstTime = true;
	var rateMode = 'last';

	getRates(rateMode);
	
	// Refresh rates in 60 seconds interval
	setInterval(function () {
		getRates(rateMode);
	}, 60000);

	$('.kpi-item, #reload-spinner').click(function() {
		getRates(rateMode);
	});
});

var getRates = function(rateMode) {
	var spinner = $('#reload-spinner > i');
	spinner.addClass('fa-spin');

	$.get('https://api.bitcoinaverage.com/exchanges/EUR', function(get) {
		
		var sum = average = counter = max = min = 0;
		var minExchange = maxExchange = '';

		$.each(get, function(name, data) {
			if (name !== "timestamp") {

				if(max < data.rates.last) {
					max = data.rates.last;
					maxExchange = name;
					maxUrl = data.display_URL;
				}

				// console.log(min, data.rates.last, (min > data.rates.last));
				if(min > data.rates.last || min == 0) {
					min = data.rates.last;
					minExchange = name;
					minUrl = data.display_URL;
				}

				if ($('#rates-container #market-' + name).length > 0) {
					$('#rates-container #market-' + name + ' h2').html(
						data.rates.last.toFixed(2) + ' <span class="eur">EUR</span>'
					);
				} else {
					$('#rates-container').append(
						'<li id="market-' + name + '">' +
							'<a target="_blank" href="' + data.display_URL + '">' + data.display_name + '</a>' +
							'<h2>' + data.rates.last.toFixed(2) + ' <span class="eur">EUR</span>' + '</h2>' +
						'</li>'
					);
				}

				tinysort('ul#rates-container>li', {selector:'h2', order:'desc'});

				if(typeof sum != 'undefined') {
					sum += data.rates.last;
				} else {
					sum = data.rates.last;
				}
				counter += 1;
			}
		});
		
		// Set average box
		average = sum / counter;
		$('#rate-average h1').html('<span class="discrete hidden-xs">Ø</span> ' + average.toFixed(2) + ' <span class="eur">EUR</span>');

		// Set min box
		console.log(minExchange, min, maxExchange, max);
		$('#rate-min > span.market').html('on <a href="' + minUrl + '">' + minExchange + '</a>');
		$('#rate-min > h1 > .rate').text(min.toFixed(2));

		// Set max box
		$('#rate-max > span.market').html('on <a href="' + maxUrl + '">' + maxExchange + '</a>');
		$('#rate-max > h1 > .rate').text(max.toFixed(2));
	});

	setTimeout(function() {
		spinner.removeClass('fa-spin');
	}, 500);
	
	firstTime = false;
};