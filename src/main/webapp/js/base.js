Date.prototype.Format = function (fmt) { //author: meizz 

    var o = {

        "M+": this.getMonth() + 1, //月

        "d+": this.getDate(), //日期

        "h+": this.getHours(), //小时

        "m+": this.getMinutes(), //分钟

        "s+": this.getSeconds(), //秒

        "q+": Math.floor((this.getMonth() + 3) / 3), //瀛ｅ害 

        "S": this.getMilliseconds() //姣 

    };

    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
var Base = {
    cookie: function (name, value, options) {
        if (typeof value != 'undefined') {
            options = options || {};
            if (value === null) {
                value = '';
                options.expires = -1;
            }
            var expires = '';
            if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                var date;
                if (typeof options.expires == 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString();
            }
            var path = options.path ? '; path=' + options.path : '';
            var domain = options.domain ? '; domain=' + options.domain : '';
            var secure = options.secure ? '; secure' : '';
            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        } else {
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = jQuery.trim(cookies[i]);
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    },
    ajax: function (options) {
        var defaultValue = {
            type: 'POST',
            url: '',
            data: '',
            async: true,
            dataType: 'json',
            context: $(document),
            beforeSend: function (obj) {
            },
            success: function (data, obj) {
            },
            complete: function (obj) {
            }
        };
        var setting = $.extend(defaultValue, options);
        if (!setting.context.data('flag')) {
            setting.context.data({'flag': 'true'});
        }
        if (setting.context.data('flag') == 'true') {
            $.ajax({
                type: setting.type,
                async: setting.async,
                url: setting.url,
                data: setting.data,
                dataType: setting.dataType,
                context: setting.context,
                beforeSend: function () {
                    setting.context.data({'flag': 'false'});
                    setting.beforeSend($(this));
                },
                success: function (data) {
                    setting.context.data({'flag': 'true'});
                    setting.success(data, $(this));
                },
                complete: function () {
                    setting.context.data({'flag': 'true'});
                    setting.complete($(this));
                }
            });
        }
        ;
    },
    serialize: function (form) {
        var data = {};
        for (var i = 0; i < form.length; i++) {
            var node = form.eq(i)[0];
            if (
                (node.tagName == "INPUT" && (node.type == "text" || ((node.type == "checkbox" || node.type == "radio") && node.checked)) || node.type == "password" || node.type == "hidden" || node.type == "tel" || node.type == "number" || node.type == "date")/* INPUT */
                ||
                (node.tagName == "SELECT")    /* SELECT */
                ||
                (node.tagName == "TEXTAREA")    /* TEXTAREA */
            ) {
                if (data[node.name]) {
                    if ($.isArray(data[node.name])) {
                        data[node.name].push(node.value)
                    } else {
                        data[node.name] = [data[node.name], node.value];
                    }
                    ;
                } else {
                    data[node.name] = node.value;
                }
                ;
            }
            ;
        }
        ;
        return data;
    },
    Cascade: function () {

        var list = [];

        var option = function (next, value) {

            var option = '<option value="" >' + next.html + '</option>';

            if (value != 0) {

                for (var k in next.data) {

                    if (next.data[k][next.fk] == value) {

                        var selected = '';

                        if (next.data[k][next.value] == next.def) {

                            selected = 'selected=""';

                        }
                        ;

                        option += '<option ' + selected + ' value="' + next.data[k][next.value] + '">' + next.data[k][next.name] + '</option>'

                    }
                    ;

                }
                ;

            }
            ;

            return option;

        };

        var fn = function (i) {

            var $this = list[i];

            if (i == 0) {

                var html = '';

                for (var k in $this.data) {

                    var selected = '';

                    if ($this.data[k][$this.value] == $this.def) {

                        selected = 'selected=""';

                    }
                    ;

                    html += '<option ' + selected + ' value="' + $this.data[k][$this.value] + '">' + $this.data[k][$this.name] + '</option>'

                }
                ;

                $this.dom.append(html);

            }
            ;

            if (i < list.length) {

                $this.dom.change(function (event) {

                    var num = i + 1;

                    if (num < list.length) {

                        var $next = list[num];

                        var value = $(this).val();

                        var html = option($next, value);

                        list[i + 1].dom.html(html).change();

                    }
                    ;

                }).change();

            }
            ;

        };

        return {

            init: function (dom, data) {

                for (var i = 0; i < dom.length; i++) {

                    list[i] = {};
                    list[i].dom = dom.eq(i);
                    list[i].html = dom.eq(i).find('option').eq(0).html();
                    list[i].fk = dom.eq(i).attr('data-fk');
                    list[i].value = dom.eq(i).attr('data-value');
                    list[i].name = dom.eq(i).attr('data-name');
                    list[i].def = dom.eq(i).attr('data-default');
                    list[i].data = data[i];

                }

                for (var i = 0; i < list.length; i++) {

                    fn(i);

                }
                ;

            }

        }

    }()


};