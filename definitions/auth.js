var DDOS = {};

AUTH(function($) {

	if ($.path[0] === 'setup') {

		if (DDOS[$.ip] && DDOS[$.ip] > 5) {
			$.invalid();
			return;
		}

		if (!PREF.disconnected && (!PREF.token || $.query.token === PREF.token)) {
			$.success({ token: PREF.token, sa: true });
			return;
		}

		if (DDOS[$.ip])
			DDOS[$.ip]++;
		else
			DDOS[$.ip] = 1;

	}

	$.invalid();

});


ON('service', function(counter) {
	if (counter % 15 === 0)
		DDOS = {};
});