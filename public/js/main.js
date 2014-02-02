(function(global, $, marked, Prism, moment, undefined) {

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

    function load($elm, name, cb) {
        // show old element
        $('nav.menu li.current').removeClass('current').show();
        //hide current element
        $elm.parent().addClass('current');

        $.get('./md/' + name, function(data) {
            cb(data);
        });
    }

    function renderHeader(title, date, tags) {
        var tmp = '<div class="meta-head">';

        tmp += '<div class="date">' + date + '</div>';
        tmp += '<ul class="tags">';

        for (var i = 0; i < tags.length; i++) {
            tmp += '<li><span>' + tags[i] + '</span></li>';
        }

        tmp += '</ul></div>';
        tmp += '<h1>' + title + '</h1>';
        return tmp;
    }

    function loadArticle(files, name) {

        if (!name) {
            name = $('.md').first().data('name');
        }

        var dataFiles;
        for (var i = 0; i < files.length; i++) {
            if (files[i].name === name) {
                dataFiles = files[i].data;
            }
        }
        var $elm = $('.md[data-name="' + name + '"]');

        load($elm, name, function(data) {

            $elm.parent().hide();

            History.pushState({
                state: name
            }, name, "?article=" + name);

            document.title = 'CodeMoods - ' + name.replace('.md', '');

            var header = renderHeader(dataFiles.lang.fr_FR, moment(dataFiles.date).format('LL'), dataFiles.tags);
            $('header.current').html(header);

            $('article.current').html(marked(data));
            Prism.highlightAll();

            updateComment(name);
        });
    }

    function renderMenu(files) {
        var tmp = '<ul>';

        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            tmp += '<li><span class="md" data-name="' + file.name + '">' + file.data.lang.fr_FR + '</span></li>';
        }

        tmp += '</ul>';
        return tmp;
    }

    function init(name) {
        $.get('./data', function(files) {

            $('.menu').html(renderMenu(files));

            $('.md').on('click', function() {
                loadArticle(files, $(this).data('name'));
            });

            loadArticle(files, name);
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

})(window, window.jQuery, window.marked, window.Prism, window.moment);
