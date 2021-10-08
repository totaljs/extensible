NEWSCHEMA('Setup', function(schema) {

	schema.define('name', String, true);
	schema.define('token', String, true);
	schema.define('path', String, true);
	schema.define('allow_tms', Boolean);
	schema.define('secret_tms', String);
	schema.define('disconnected', Boolean);

	schema.setSave(function($, model) {

		if (!PREF.path) {
			var path = model.path;
			CONF.directory_databases = path;
			if (path[0] === '~')
				path = path.substring(1);
			else
				path = PATH.root(path);
			PATH.mkdir(path);
		}

		for (var key in model)
			PREF.set(key, model[key]);

		LOADCONFIG({ name: model.name, allow_tms: model.allow_tms, secret_tms: model.secret_tms });
		$.success();

	});

	schema.setRead(function($) {
		var data = CLONE(PREF);
		data.is = !!PREF.path;
		$.callback(data);
	});

	schema.addWorkflow('consumption', function($) {
		var data = {};
		var consumption = F.consumption;
		if (consumption) {
			data.memory = consumption.memory;
			data.usage = consumption.usage;
		} else {
			data.memory = 0;
			data.usage = 0;
		}
		$.callback(data);
	});

});