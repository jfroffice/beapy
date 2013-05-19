(function(window, undefined) {

	marked.setOptions({
		langPrefix: 'language-'
	});

	function load(url) {
		$.get('./md/' + url, function(data) {
			History.pushState({
				state: url
			}, url, "?article=" + url);
			$('article.current').html(marked(data));
			Prism.highlightAll();
		});
	}

	var tFiles = Handlebars.compile($("#md-files-template").html()),
		tTags = Handlebars.compile($("#md-tags-template").html());

	$.get('./json', function(files) {

		console.log(files);
		$('.menu').html(tFiles({ files: files }));

		$('.md').on('click', function() {
			load($(this).data('name'));
		});

		var tags = _.flatten(_.map(files, function(e) { return e.data.tags; }))
		$('.tags').html(tTags({ tags: tags }));
	});

	var History = window.History;
	if (!History.enabled) {
		return false;
	}

	var state = History.getState();
	if (state && state.data && state.data.state) {
		load(state.data.state);
	}

	History.Adapter.bind(window, 'statechange', function() {
		var State = History.getState();
	});

})(window);