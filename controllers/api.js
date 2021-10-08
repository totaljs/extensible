exports.install = function() {
	// Index
	ROUTE('GET /', index);
};

function index() {
	if (PREF.token)
		this.plain('Extensible v' + MAIN.version);
	else
		this.redirect('/setup/');
}