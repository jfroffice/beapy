(function(global, undefined) {

	var tFiles = Handlebars.compile($("#md-files-template").html()),
		tTags = Handlebars.compile($("#md-tags-template").html());

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

			if (global.DISQUS) {
				global.DISQUS.reset({
					reload: true,
					config: function () {
						this.page.identifier = url;
						this.page.url = window.location.href;
					}
				});
			}
		});
	}

	$.get('./json', function(files) {

		$('.menu').html(tFiles({ files: files }));

		if (files.length) {
			load(files[0].name);
		}

		$('.md').on('click', function() {
			load($(this).data('name'));
		});

		$('.tags').html(tTags({
			tags: _.flatten(_.map(files, function(e) { return e.data.tags; }))
		}));
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