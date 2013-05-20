(function(global, $, _, Handlebars, marked, Prism, undefined) {

    var tFiles = Handlebars.compile($("#md-files-template").html()),
        tHeader = Handlebars.compile($("#md-header-template").html()),
        tTags = Handlebars.compile($("#md-tags-template").html());

    marked.setOptions({
        langPrefix: 'language-'
    });

   function updateComment(name) {
        if (global.DISQUS) {
            global.DISQUS.reset({
                reload: true,
                config: function() {
                    this.page.identifier = name;
                    this.page.url = window.location.href;
                }
            });
        }
   }

    function load($elm, name, callback) {
        // show old element
        $('nav.menu li.current').removeClass('current').show();
        //hide current element
        $elm.parent().addClass('current');

        $.get('./md/' + name, function(data) {
            callback(data);
        });
    }

    function loadArticle(files, name) {

        if (!name) {
            name = $('.md').first().data('name');
        }

    	var dataFiles = _.filter(files, { name: name })[0].data;
        var $elm = $('.md[data-name="' + name + '"]');

        load($elm, name, function(data) {

            $elm.parent().hide();

            History.pushState({
                state: name
            }, name, "?article=" + name);

            $('header.current').html(tHeader({
                title: dataFiles.lang.fr_FR,
                date: moment(dataFiles.date).format('LL'),
                tags: dataFiles.tags
            }));

            $('article.current').html(marked(data));
            Prism.highlightAll();

            updateComment(name);
        });
    }

    function init(name) {
        $.get('./data', function(files) {

            $('.menu').html(tFiles({
                files: files
            }));

            $('.md').on('click', function() {
                loadArticle(files, $(this).data('name'));
            });

            loadArticle(files, name);

            $('.tags').html(tTags({
                tags: _.flatten(_.map(files, function(e) {
                    return e.data.tags;
                }))
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

    // depend on current lang
    moment.lang('fr');

})(window, window.jQuery, window._, window.Handlebars, window.marked, window.Prism);
