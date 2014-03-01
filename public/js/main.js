var disqus_shortname = 'jfroffice';

(function($, Prism, DISQUS, history, LANG, undefined) {

    var _commentLoaded = true,
        _suffixe = (LANG === 'en') ? '.en' : '',
        _name;

    function setName(name) {
        if (name === _name) {
            return;
        }

        _name = name;
        history.pushState({
            state: name
        }, name, '/#' + name);
    }

    function load(files, name, cb) {

        $.ajax({
            url: './md/' + name,
            type: 'GET',
            success: function(data) {
                cb(data);
            },
            error: function() {
                location.href = '/';
            }
        });

        var meta = getMeta(files, name);

        setName(name);
        document.title = 'CodeMoods - ' + name.replace('.md', '');
        var header = renderHeader(meta.lang[LANG].title, formatDate(meta.date), meta.tags);
        $('header.current').html(header);
    }

    function renderHeader(title, date, tags) {
        var tmp = '<div class="meta-head">';
        tmp += '<div class="date">' + date + '</div><ul class="tags">';

        for (var i = 0; i < tags.length; i++) {
            tmp += '<li><span>' + tags[i] + '</span></li>';
        }

        return tmp + '</ul></div><h1>' + title + '</h1>';
    }

    function toInt(argumentForCoercion) {
        var cNumber = +argumentForCoercion,
            value = 0;

        if (cNumber !== 0 && isFinite(cNumber)) {
            if (cNumber >= 0) {
                value = Math.floor(cNumber);
            } else {
                value = Math.ceil(cNumber);
            }
        }

        return value;
    }

    function ordinal(number) {
        var b = number % 10,
            output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
        return number + output;
    }

    function formatDate(date) {

        var array = date.split('/'),
            months;

        if (LANG === 'fr') {
            months = "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_");
            return array[0] + ' ' + months[array[1] - 1] + ' ' + array[2];
        } else {
            months = "january_february_march_april_may_june_july_august_september_october_november_december".split("_");
            return months[array[1] - 1] + ' ' + ordinal(array[0]) + ' ' + array[2];
        }
    }

    function getMeta(files, name) {
        for (var i = 0; i < files.length; i++) {
            if (files[i].name === name) {
                return files[i].data;
            }
        }
    }

    function loadArticle(files, name) {

        $('.sidebar').addClass('sidebar--clicked');

        load(files, name, function(data) {

            $('.content article').html(data);

            Prism.highlightAll();

            _commentLoaded = false; // comments are now able to be loaded
            updateDisqus(name);
        });
    }

    function renderMenu(files, newName) {
        var tmp = '<ul>';

        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            if (file.name !== newName) {
                tmp += '<li><a class="md" href="#' + file.name + '">' + file.data.lang[LANG].title + '</a>';
            }
        }

        return tmp + '</ul>';
    }

    function init(name) {
        $.get('./data', function(files) {

            name = name || files[0].name;
            $('.menu').html(renderMenu(files, name));

            loadArticle(files, name);
        });
    }

    // loading disqus comment only if user go at bottom of page
    $(window).scroll(function() {
        if (!_commentLoaded && ($(window).scrollTop() + $(window).height() > $(document).height() - 300)) {

            _commentLoaded = true;

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

    $('.toggle').click(function() {
        $(this).parent().toggleClass('sidebar--clicked');
    });

    if (!location.hash) {
        init();
    }

})(window.Zepto, window.Prism, window.DISQUS, window.history, window.LANG);
