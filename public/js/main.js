(function($, marked, Prism, DISQUS, history, undefined) {

    var currentName;
    
    function setName(name) {
        if (name === currentName) {
            return;
        }

        currentName = name;

        history.pushState({
            state: name
        }, name, '/#' + name);
    }

    marked.setOptions({
        langPrefix: 'language-'
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

    function load(name, cb) {
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

        tmp += '</ul></div><h1>' + title + '</h1>';
        return tmp;
    }

    function formatDate(date) {
        var months = "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
            array = date.split('/');

        return array[0] + ' ' + months[array[1] - 1] + ' ' + array[2];
    }

    function getMeta(files, name) {
        for (var i=0; i < files.length; i++) {
            if (files[i].name === name) {
                return files[i].data;                
            }
        }
    }

    function loadArticle(files, name) {

        if (!name) {
            name = $('.md').first().data('name');
        }

        var meta = getMeta(files, name);        
        
        load(name, function(data) {

            setName(name);
            document.title = 'CodeMoods - ' + name.replace('.md', '');

            var article = marked(data);
            var header = renderHeader(meta.lang.fr_FR, formatDate(meta.date), meta.tags);
            $('header.current').html(header);
            $('article.current').html(article);
            Prism.highlightAll();
            updateDisqus(name);
        });
    }

    function renderMenu(files, newName) {
        var tmp = '<ul>';

        for (var i=0; i<files.length; i++) {
            var file = files[i];
            if (file.name !== newName) {
                tmp += '<li><a class="md" data-name="' + file.name + '" href="#' + file.name + '">' + file.data.lang.fr_FR + '</a>';
            }
        }

        tmp += '</ul>';
        return tmp;
    }

    function init(name) {

        $.get('./data', function(files) {

            $('.menu').html(renderMenu(files, name));

            $('.md').on('click', function() {
                loadArticle(files, $(this).data('name'));
            });

            loadArticle(files, name);
        });
    }

    $(window).bind("popstate", function(e) {
        init(location.hash.slice(1));
    });

    if (location.hash) {
        init(location.hash.slice(1));
    } else {
        init();
    }

})(window.jQuery, window.marked, window.Prism, window.DISQUS, window.history);
