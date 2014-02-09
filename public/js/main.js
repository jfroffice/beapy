var disqus_shortname = 'jfroffice';

(function($, marked, Prism, DISQUS, history, undefined) {

    var commentLoaded = true,
        currentName;

    function setName(name) {
        if (name === currentName) {
            return;
        }

        currentName = name;

        history.pushState({
            state: name
        }, name, '/#' + name);
    }

    function load(files, name, cb) {

        $.get('./md/' + name, function(data) {
            cb(data);
        });

        var meta = getMeta(files, name);

        setName(name);
        document.title = 'CodeMoods - ' + name.replace('.md', '');
        var header = renderHeader(meta.lang.fr_FR, formatDate(meta.date), meta.tags);
        $('header.current').html(header);
    }

    function renderHeader(title, date, tags) {
        var tmp = '<div class="meta-head">';
        tmp += '<div class="date">' + date + '</div>';
        tmp += '<ul class="tags">';

        for (var i = 0; i < tags.length; i++) {
            tmp += '<li><span>' + tags[i] + '</span></li>';
        }

        tmp += '</ul></div><h1>' + title + '</h1>';
        return tmp;
    }

    function formatDate(date) {
        var months = "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
            array = date.split('/');

        return array[0] + ' ' + months[array[1] - 1] + ' ' + array[2];
    }

    function getMeta(files, name) {
        for (var i = 0; i < files.length; i++) {
            if (files[i].name === name) {
                return files[i].data;
            }
        }
    }

    function loadArticle(files, name) {

        load(files, name, function(data) {

            $('article.current').html(data);

            Prism.highlightAll();

            commentLoaded = false; // comments are now able to be loaded
            updateDisqus(name);
        });
    }

    function renderMenu(files, newName) {
        var tmp = '<ul>';

        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            if (file.name !== newName) {
                tmp += '<li><a class="md" data-name="' + file.name + '" href="#' + file.name + '">' + file.data.lang.fr_FR + '</a>';
            }
        }

        return tmp + '</ul>';
    }

    function init(name) {
        $.get('./data', function(files) {

            if (!name) {
                name = $('.md').first().data('name');
            }

            $('.menu').html(renderMenu(files, name));

            $('.md').on('click', function() {
                loadArticle(files, $(this).data('name'));
            });

            loadArticle(files, name);
        });
    }

    // loading disqus comment only if user go at bottom of page
    $(window).scroll(function() {
        if (!commentLoaded && ($(window).scrollTop() + $(window).height() > $(document).height() - 300)) {

            commentLoaded = true;

            var dsq = document.createElement('script');
            dsq.type = 'text/javascript';
            dsq.async = true;
            dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';

            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);

            $('.comment').show();
        }
    });

    function updateDisqus(name) {
        if (DISQUS) {
            DISQUS.reset({
                reload: true,
                config: function() {
                    this.page.identifier = name;
                    this.page.url = window.location.href;
                }
            });
        }
    }

    $(window).bind("popstate", function() {
        init(location.hash.slice(1));
    });

    if (!location.hash) {
        init();
    }

})(window.Zepto, window.marked, window.Prism, window.DISQUS, window.history);
