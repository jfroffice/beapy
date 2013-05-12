(function(window, undefined) {

	marked.setOptions({
		/*gfm: true,
		tables: true,
		breaks: false,
		pedantic: false,
		sanitize: true,
		smartLists: true,*/
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

	var source = $("#md-files-template").html();

	$.get('./md', function(data) {
		var template = Handlebars.compile(source);
		$('.main').html(template(data));

		$('.md').on('click', function() {
			load($(this).html());
		});
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