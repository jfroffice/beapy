(function(global, $, _, Handlebars, marked, Prism, undefined) {

	var tFiles = Handlebars.compile($("#md-files-template").html()),
		tTags = Handlebars.compile($("#md-tags-template").html());

	marked.setOptions({
		langPrefix: 'language-'
	});

	function load($elm) {

		var url = $elm.data('name');

		// show old element
		$('nav.menu li.current').removeClass('current').show();
		//hide current element
		$elm.parent().addClass('current');

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

			$elm.parent().hide();
		});
	}

	function filter(files, name) {
		return _.filter(files, { name: name });
	}

	function loadArticle(name) {
		if (name) {
			load($('.md[data-name="' + name + '"]'));
		} else {
			load($('.md').first());
		}
	}

	function init(name) {

		$.get('./data', function(files) {

			$('.menu').html(tFiles({ files: files }));

			//filter(files, name);

			loadArticle(name);

			$('.md').on('click', function() {
				load($(this));
			});

			$('.tags').html(tTags({
				tags: _.flatten(_.map(files, function(e) { return e.data.tags; }))
			}));
		});
	}

	var History = window.History;
	if (!History.enabled) {
		return false;
	}

	var state = History.getState();
	if (state && state.data && state.data.state) {
		init(state.data.state);
	} else {
		init();
	}

	History.Adapter.bind(window, 'statechange', function() {
		var State = History.getState();
	});

})(window, window.jQuery, window._, window.Handlebars, window.marked, window.Prism);