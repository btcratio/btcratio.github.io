$(document).ready(function() {
	var firstTime = true;

	getRates();
	
	// Refresh rates in 15 seconds interval
	setInterval(function () {
		getRates();
	}, 15000);

	$('#average, #spinner').click(function() {
		getRates();
	});
});

var getRates = function() {
	var spinner = $('#spinner > i');
	spinner.addClass('fa-spin');

	$.get('https://api.bitcoinaverage.com/exchanges/EUR', function(get) {
		
		var sum, average, counter = 0;

		$.each(get, function(name, data) {
			if (name !== "timestamp") {
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
		
		average = sum / counter;
		$('#rate-average').html(average.toFixed(2) + ' <span class="eur">EUR</span>');
	});

	setTimeout(function() {
		spinner.removeClass('fa-spin');
	}, 500);
	
	firstTime = false;
};