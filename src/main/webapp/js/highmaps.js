/*
 Highmaps JS v5.0.12 (2017-05-24)

 (c) 2011-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (K, S) {
    "object" === typeof module && module.exports ? module.exports = K.document ? S(K) : S : K.Highcharts = S(K)
})("undefined" !== typeof window ? window : this, function (K) {
    K = function () {
        var a = window, y = a.document, C = a.navigator && a.navigator.userAgent || "",
            A = y && y.createElementNS && !!y.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
            B = /(edge|msie|trident)/i.test(C) && !window.opera, d = !A, f = /Firefox/.test(C),
            u = f && 4 > parseInt(C.split("Firefox/")[1], 10);
        return a.Highcharts ? a.Highcharts.error(16, !0) : {
            product: "Highmaps",
            version: "5.0.12",
            deg2rad: 2 * Math.PI / 360,
            doc: y,
            hasBidiBug: u,
            hasTouch: y && void 0 !== y.documentElement.ontouchstart,
            isMS: B,
            isWebKit: /AppleWebKit/.test(C),
            isFirefox: f,
            isTouchDevice: /(Mobile|Android|Windows Phone)/.test(C),
            SVG_NS: "http://www.w3.org/2000/svg",
            chartCount: 0,
            seriesTypes: {},
            symbolSizes: {},
            svg: A,
            vml: d,
            win: a,
            marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"],
            noop: function () {
            },
            charts: []
        }
    }();
    (function (a) {
        var y = [], C = a.charts, A = a.doc, B = a.win;
        a.error = function (d, f) {
            d = a.isNumber(d) ? "Highcharts error #" +
                d + ": www.highcharts.com/errors/" + d : d;
            if (f) throw Error(d);
            B.console && console.log(d)
        };
        a.Fx = function (a, f, u) {
            this.options = f;
            this.elem = a;
            this.prop = u
        };
        a.Fx.prototype = {
            dSetter: function () {
                var a = this.paths[0], f = this.paths[1], u = [], q = this.now, n = a.length, m;
                if (1 === q) u = this.toD; else if (n === f.length && 1 > q) for (; n--;) m = parseFloat(a[n]), u[n] = isNaN(m) ? a[n] : q * parseFloat(f[n] - m) + m; else u = f;
                this.elem.attr("d", u, null, !0)
            }, update: function () {
                var a = this.elem, f = this.prop, u = this.now, q = this.options.step;
                if (this[f + "Setter"]) this[f +
                "Setter"](); else a.attr ? a.element && a.attr(f, u, null, !0) : a.style[f] = u + this.unit;
                q && q.call(a, u, this)
            }, run: function (a, f, u) {
                var d = this, n = function (a) {
                    return n.stopped ? !1 : d.step(a)
                }, m;
                this.startTime = +new Date;
                this.start = a;
                this.end = f;
                this.unit = u;
                this.now = this.start;
                this.pos = 0;
                n.elem = this.elem;
                n.prop = this.prop;
                n() && 1 === y.push(n) && (n.timerId = setInterval(function () {
                    for (m = 0; m < y.length; m++) y[m]() || y.splice(m--, 1);
                    y.length || clearInterval(n.timerId)
                }, 13))
            }, step: function (d) {
                var f = +new Date, u, q = this.options, n = this.elem,
                    m = q.complete, h = q.duration, t = q.curAnim;
                n.attr && !n.element ? d = !1 : d || f >= h + this.startTime ? (this.now = this.end, this.pos = 1, this.update(), u = t[this.prop] = !0, a.objectEach(t, function (a) {
                    !0 !== a && (u = !1)
                }), u && m && m.call(n), d = !1) : (this.pos = q.easing((f - this.startTime) / h), this.now = this.start + (this.end - this.start) * this.pos, this.update(), d = !0);
                return d
            }, initPath: function (d, f, u) {
                function q(a) {
                    var b, e;
                    for (g = a.length; g--;) b = "M" === a[g] || "L" === a[g], e = /[a-zA-Z]/.test(a[g + 3]), b && e && a.splice(g + 1, 0, a[g + 1], a[g + 2], a[g + 1], a[g + 2])
                }

                function n(a, b) {
                    for (; a.length < p;) {
                        a[0] = b[p - a.length];
                        var c = a.slice(0, e);
                        [].splice.apply(a, [0, 0].concat(c));
                        z && (c = a.slice(a.length - e), [].splice.apply(a, [a.length, 0].concat(c)), g--)
                    }
                    a[0] = "M"
                }

                function m(a, k) {
                    for (var g = (p - a.length) / e; 0 < g && g--;) b = a.slice().splice(a.length / G - e, e * G), b[0] = k[p - e - g * e], c && (b[e - 6] = b[e - 2], b[e - 5] = b[e - 1]), [].splice.apply(a, [a.length / G, 0].concat(b)), z && g--
                }

                f = f || "";
                var h, t = d.startX, l = d.endX, c = -1 < f.indexOf("C"), e = c ? 7 : 3, p, b, g;
                f = f.split(" ");
                u = u.slice();
                var z = d.isArea, G = z ? 2 : 1, k;
                c && (q(f),
                    q(u));
                if (t && l) {
                    for (g = 0; g < t.length; g++) if (t[g] === l[0]) {
                        h = g;
                        break
                    } else if (t[0] === l[l.length - t.length + g]) {
                        h = g;
                        k = !0;
                        break
                    }
                    void 0 === h && (f = [])
                }
                f.length && a.isNumber(h) && (p = u.length + h * G * e, k ? (n(f, u), m(u, f)) : (n(u, f), m(f, u)));
                return [f, u]
            }
        };
        a.Fx.prototype.fillSetter = a.Fx.prototype.strokeSetter = function () {
            this.elem.attr(this.prop, a.color(this.start).tweenTo(a.color(this.end), this.pos), null, !0)
        };
        a.extend = function (a, f) {
            var d;
            a || (a = {});
            for (d in f) a[d] = f[d];
            return a
        };
        a.merge = function () {
            var d, f = arguments, u, q = {}, n =
                function (d, h) {
                    "object" !== typeof d && (d = {});
                    a.objectEach(h, function (f, l) {
                        !a.isObject(f, !0) || a.isClass(f) || a.isDOMElement(f) ? d[l] = h[l] : d[l] = n(d[l] || {}, f)
                    });
                    return d
                };
            !0 === f[0] && (q = f[1], f = Array.prototype.slice.call(f, 2));
            u = f.length;
            for (d = 0; d < u; d++) q = n(q, f[d]);
            return q
        };
        a.pInt = function (a, f) {
            return parseInt(a, f || 10)
        };
        a.isString = function (a) {
            return "string" === typeof a
        };
        a.isArray = function (a) {
            a = Object.prototype.toString.call(a);
            return "[object Array]" === a || "[object Array Iterator]" === a
        };
        a.isObject = function (d,
                               f) {
            return !!d && "object" === typeof d && (!f || !a.isArray(d))
        };
        a.isDOMElement = function (d) {
            return a.isObject(d) && "number" === typeof d.nodeType
        };
        a.isClass = function (d) {
            var f = d && d.constructor;
            return !(!a.isObject(d, !0) || a.isDOMElement(d) || !f || !f.name || "Object" === f.name)
        };
        a.isNumber = function (a) {
            return "number" === typeof a && !isNaN(a)
        };
        a.erase = function (a, f) {
            for (var d = a.length; d--;) if (a[d] === f) {
                a.splice(d, 1);
                break
            }
        };
        a.defined = function (a) {
            return void 0 !== a && null !== a
        };
        a.attr = function (d, f, u) {
            var q;
            a.isString(f) ? a.defined(u) ?
                d.setAttribute(f, u) : d && d.getAttribute && (q = d.getAttribute(f)) : a.defined(f) && a.isObject(f) && a.objectEach(f, function (a, f) {
                d.setAttribute(f, a)
            });
            return q
        };
        a.splat = function (d) {
            return a.isArray(d) ? d : [d]
        };
        a.syncTimeout = function (a, f, u) {
            if (f) return setTimeout(a, f, u);
            a.call(0, u)
        };
        a.pick = function () {
            var a = arguments, f, u, q = a.length;
            for (f = 0; f < q; f++) if (u = a[f], void 0 !== u && null !== u) return u
        };
        a.css = function (d, f) {
            a.isMS && !a.svg && f && void 0 !== f.opacity && (f.filter = "alpha(opacity\x3d" + 100 * f.opacity + ")");
            a.extend(d.style,
                f)
        };
        a.createElement = function (d, f, u, q, n) {
            d = A.createElement(d);
            var m = a.css;
            f && a.extend(d, f);
            n && m(d, {padding: 0, border: "none", margin: 0});
            u && m(d, u);
            q && q.appendChild(d);
            return d
        };
        a.extendClass = function (d, f) {
            var u = function () {
            };
            u.prototype = new d;
            a.extend(u.prototype, f);
            return u
        };
        a.pad = function (a, f, u) {
            return Array((f || 2) + 1 - String(a).length).join(u || 0) + a
        };
        a.relativeLength = function (a, f) {
            return /%$/.test(a) ? f * parseFloat(a) / 100 : parseFloat(a)
        };
        a.wrap = function (a, f, u) {
            var d = a[f];
            a[f] = function () {
                var a = Array.prototype.slice.call(arguments),
                    f = arguments, h = this;
                h.proceed = function () {
                    d.apply(h, arguments.length ? arguments : f)
                };
                a.unshift(d);
                a = u.apply(this, a);
                h.proceed = null;
                return a
            }
        };
        a.getTZOffset = function (d) {
            var f = a.Date;
            return 6E4 * (f.hcGetTimezoneOffset && f.hcGetTimezoneOffset(d) || f.hcTimezoneOffset || 0)
        };
        a.dateFormat = function (d, f, u) {
            if (!a.defined(f) || isNaN(f)) return a.defaultOptions.lang.invalidDate || "";
            d = a.pick(d, "%Y-%m-%d %H:%M:%S");
            var q = a.Date, n = new q(f - a.getTZOffset(f)), m = n[q.hcGetHours](), h = n[q.hcGetDay](),
                t = n[q.hcGetDate](), l = n[q.hcGetMonth](),
                c = n[q.hcGetFullYear](), e = a.defaultOptions.lang, p = e.weekdays, b = e.shortWeekdays, g = a.pad,
                q = a.extend({
                    a: b ? b[h] : p[h].substr(0, 3),
                    A: p[h],
                    d: g(t),
                    e: g(t, 2, " "),
                    w: h,
                    b: e.shortMonths[l],
                    B: e.months[l],
                    m: g(l + 1),
                    y: c.toString().substr(2, 2),
                    Y: c,
                    H: g(m),
                    k: m,
                    I: g(m % 12 || 12),
                    l: m % 12 || 12,
                    M: g(n[q.hcGetMinutes]()),
                    p: 12 > m ? "AM" : "PM",
                    P: 12 > m ? "am" : "pm",
                    S: g(n.getSeconds()),
                    L: g(Math.round(f % 1E3), 3)
                }, a.dateFormats);
            a.objectEach(q, function (a, b) {
                for (; -1 !== d.indexOf("%" + b);) d = d.replace("%" + b, "function" === typeof a ? a(f) : a)
            });
            return u ? d.substr(0,
                1).toUpperCase() + d.substr(1) : d
        };
        a.formatSingle = function (d, f) {
            var u = /\.([0-9])/, q = a.defaultOptions.lang;
            /f$/.test(d) ? (u = (u = d.match(u)) ? u[1] : -1, null !== f && (f = a.numberFormat(f, u, q.decimalPoint, -1 < d.indexOf(",") ? q.thousandsSep : ""))) : f = a.dateFormat(d, f);
            return f
        };
        a.format = function (d, f) {
            for (var u = "{", q = !1, n, m, h, t, l = [], c; d;) {
                u = d.indexOf(u);
                if (-1 === u) break;
                n = d.slice(0, u);
                if (q) {
                    n = n.split(":");
                    m = n.shift().split(".");
                    t = m.length;
                    c = f;
                    for (h = 0; h < t; h++) c = c[m[h]];
                    n.length && (c = a.formatSingle(n.join(":"), c));
                    l.push(c)
                } else l.push(n);
                d = d.slice(u + 1);
                u = (q = !q) ? "}" : "{"
            }
            l.push(d);
            return l.join("")
        };
        a.getMagnitude = function (a) {
            return Math.pow(10, Math.floor(Math.log(a) / Math.LN10))
        };
        a.normalizeTickInterval = function (d, f, u, q, n) {
            var m, h = d;
            u = a.pick(u, 1);
            m = d / u;
            f || (f = n ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === q && (1 === u ? f = a.grep(f, function (a) {
                return 0 === a % 1
            }) : .1 >= u && (f = [1 / u])));
            for (q = 0; q < f.length && !(h = f[q], n && h * u >= d || !n && m <= (f[q] + (f[q + 1] || f[q])) / 2); q++) ;
            return h = a.correctFloat(h * u, -Math.round(Math.log(.001) / Math.LN10))
        };
        a.stableSort =
            function (a, f) {
                var d = a.length, q, n;
                for (n = 0; n < d; n++) a[n].safeI = n;
                a.sort(function (a, h) {
                    q = f(a, h);
                    return 0 === q ? a.safeI - h.safeI : q
                });
                for (n = 0; n < d; n++) delete a[n].safeI
            };
        a.arrayMin = function (a) {
            for (var f = a.length, d = a[0]; f--;) a[f] < d && (d = a[f]);
            return d
        };
        a.arrayMax = function (a) {
            for (var f = a.length, d = a[0]; f--;) a[f] > d && (d = a[f]);
            return d
        };
        a.destroyObjectProperties = function (d, f) {
            a.objectEach(d, function (a, q) {
                a && a !== f && a.destroy && a.destroy();
                delete d[q]
            })
        };
        a.discardElement = function (d) {
            var f = a.garbageBin;
            f || (f = a.createElement("div"));
            d && f.appendChild(d);
            f.innerHTML = ""
        };
        a.correctFloat = function (a, f) {
            return parseFloat(a.toPrecision(f || 14))
        };
        a.setAnimation = function (d, f) {
            f.renderer.globalAnimation = a.pick(d, f.options.chart.animation, !0)
        };
        a.animObject = function (d) {
            return a.isObject(d) ? a.merge(d) : {duration: d ? 500 : 0}
        };
        a.timeUnits = {
            millisecond: 1,
            second: 1E3,
            minute: 6E4,
            hour: 36E5,
            day: 864E5,
            week: 6048E5,
            month: 24192E5,
            year: 314496E5
        };
        a.numberFormat = function (d, f, u, q) {
            d = +d || 0;
            f = +f;
            var n = a.defaultOptions.lang, m = (d.toString().split(".")[1] || "").length,
                h, t;
            -1 === f ? f = Math.min(m, 20) : a.isNumber(f) || (f = 2);
            t = (Math.abs(d) + Math.pow(10, -Math.max(f, m) - 1)).toFixed(f);
            m = String(a.pInt(t));
            h = 3 < m.length ? m.length % 3 : 0;
            u = a.pick(u, n.decimalPoint);
            q = a.pick(q, n.thousandsSep);
            d = (0 > d ? "-" : "") + (h ? m.substr(0, h) + q : "");
            d += m.substr(h).replace(/(\d{3})(?=\d)/g, "$1" + q);
            f && (d += u + t.slice(-f));
            return d
        };
        Math.easeInOutSine = function (a) {
            return -.5 * (Math.cos(Math.PI * a) - 1)
        };
        a.getStyle = function (d, f, u) {
            if ("width" === f) return Math.min(d.offsetWidth, d.scrollWidth) - a.getStyle(d, "padding-left") -
                a.getStyle(d, "padding-right");
            if ("height" === f) return Math.min(d.offsetHeight, d.scrollHeight) - a.getStyle(d, "padding-top") - a.getStyle(d, "padding-bottom");
            if (d = B.getComputedStyle(d, void 0)) d = d.getPropertyValue(f), a.pick(u, !0) && (d = a.pInt(d));
            return d
        };
        a.inArray = function (a, f) {
            return f.indexOf ? f.indexOf(a) : [].indexOf.call(f, a)
        };
        a.grep = function (a, f) {
            return [].filter.call(a, f)
        };
        a.find = function (a, f) {
            return [].find.call(a, f)
        };
        a.map = function (a, f) {
            for (var d = [], q = 0, n = a.length; q < n; q++) d[q] = f.call(a[q], a[q], q, a);
            return d
        };
        a.offset = function (a) {
            var f = A.documentElement;
            a = a.getBoundingClientRect();
            return {
                top: a.top + (B.pageYOffset || f.scrollTop) - (f.clientTop || 0),
                left: a.left + (B.pageXOffset || f.scrollLeft) - (f.clientLeft || 0)
            }
        };
        a.stop = function (a, f) {
            for (var d = y.length; d--;) y[d].elem !== a || f && f !== y[d].prop || (y[d].stopped = !0)
        };
        a.each = function (a, f, u) {
            return Array.prototype.forEach.call(a, f, u)
        };
        a.objectEach = function (a, f, u) {
            for (var d in a) a.hasOwnProperty(d) && f.call(u, a[d], d, a)
        };
        a.addEvent = function (d, f, u) {
            function q(a) {
                a.target =
                    a.srcElement || B;
                u.call(d, a)
            }

            var n = d.hcEvents = d.hcEvents || {};
            d.addEventListener ? d.addEventListener(f, u, !1) : d.attachEvent && (d.hcEventsIE || (d.hcEventsIE = {}), d.hcEventsIE[u.toString()] = q, d.attachEvent("on" + f, q));
            n[f] || (n[f] = []);
            n[f].push(u);
            return function () {
                a.removeEvent(d, f, u)
            }
        };
        a.removeEvent = function (d, f, u) {
            function q(a, c) {
                d.removeEventListener ? d.removeEventListener(a, c, !1) : d.attachEvent && (c = d.hcEventsIE[c.toString()], d.detachEvent("on" + a, c))
            }

            function n() {
                var l, c;
                d.nodeName && (f ? (l = {}, l[f] = !0) : l = h,
                    a.objectEach(l, function (a, p) {
                        if (h[p]) for (c = h[p].length; c--;) q(p, h[p][c])
                    }))
            }

            var m, h = d.hcEvents, t;
            h && (f ? (m = h[f] || [], u ? (t = a.inArray(u, m), -1 < t && (m.splice(t, 1), h[f] = m), q(f, u)) : (n(), h[f] = [])) : (n(), d.hcEvents = {}))
        };
        a.fireEvent = function (d, f, u, q) {
            var n;
            n = d.hcEvents;
            var m, h;
            u = u || {};
            if (A.createEvent && (d.dispatchEvent || d.fireEvent)) n = A.createEvent("Events"), n.initEvent(f, !0, !0), a.extend(n, u), d.dispatchEvent ? d.dispatchEvent(n) : d.fireEvent(f, n); else if (n) for (n = n[f] || [], m = n.length, u.target || a.extend(u, {
                preventDefault: function () {
                    u.defaultPrevented =
                        !0
                }, target: d, type: f
            }), f = 0; f < m; f++) (h = n[f]) && !1 === h.call(d, u) && u.preventDefault();
            q && !u.defaultPrevented && q(u)
        };
        a.animate = function (d, f, u) {
            var q, n = "", m, h, t;
            a.isObject(u) || (t = arguments, u = {duration: t[2], easing: t[3], complete: t[4]});
            a.isNumber(u.duration) || (u.duration = 400);
            u.easing = "function" === typeof u.easing ? u.easing : Math[u.easing] || Math.easeInOutSine;
            u.curAnim = a.merge(f);
            a.objectEach(f, function (l, c) {
                a.stop(d, c);
                h = new a.Fx(d, u, c);
                m = null;
                "d" === c ? (h.paths = h.initPath(d, d.d, f.d), h.toD = f.d, q = 0, m = 1) : d.attr ?
                    q = d.attr(c) : (q = parseFloat(a.getStyle(d, c)) || 0, "opacity" !== c && (n = "px"));
                m || (m = l);
                m && m.match && m.match("px") && (m = m.replace(/px/g, ""));
                h.run(q, m, n)
            })
        };
        a.seriesType = function (d, f, u, q, n) {
            var m = a.getOptions(), h = a.seriesTypes;
            if (h[d]) return a.error(27);
            m.plotOptions[d] = a.merge(m.plotOptions[f], u);
            h[d] = a.extendClass(h[f] || function () {
            }, q);
            h[d].prototype.type = d;
            n && (h[d].prototype.pointClass = a.extendClass(a.Point, n));
            return h[d]
        };
        a.uniqueKey = function () {
            var a = Math.random().toString(36).substring(2, 9), f = 0;
            return function () {
                return "highcharts-" +
                    a + "-" + f++
            }
        }();
        B.jQuery && (B.jQuery.fn.highcharts = function () {
            var d = [].slice.call(arguments);
            if (this[0]) return d[0] ? (new (a[a.isString(d[0]) ? d.shift() : "Chart"])(this[0], d[0], d[1]), this) : C[a.attr(this[0], "data-highcharts-chart")]
        });
        A && !A.defaultView && (a.getStyle = function (d, f) {
            var u = {width: "clientWidth", height: "clientHeight"}[f];
            if (d.style[f]) return a.pInt(d.style[f]);
            "opacity" === f && (f = "filter");
            if (u) return d.style.zoom = 1, Math.max(d[u] - 2 * a.getStyle(d, "padding"), 0);
            d = d.currentStyle[f.replace(/\-(\w)/g,
                function (a, f) {
                    return f.toUpperCase()
                })];
            "filter" === f && (d = d.replace(/alpha\(opacity=([0-9]+)\)/, function (a, f) {
                return f / 100
            }));
            return "" === d ? 1 : a.pInt(d)
        });
        Array.prototype.forEach || (a.each = function (a, f, u) {
            for (var d = 0, n = a.length; d < n; d++) if (!1 === f.call(u, a[d], d, a)) return d
        });
        Array.prototype.indexOf || (a.inArray = function (a, f) {
            var d, q = 0;
            if (f) for (d = f.length; q < d; q++) if (f[q] === a) return q;
            return -1
        });
        Array.prototype.filter || (a.grep = function (a, f) {
            for (var d = [], q = 0, n = a.length; q < n; q++) f(a[q], q) && d.push(a[q]);
            return d
        });
        Array.prototype.find || (a.find = function (a, f) {
            var d, q = a.length;
            for (d = 0; d < q; d++) if (f(a[d], d)) return a[d]
        })
    })(K);
    (function (a) {
        var y = a.each, C = a.isNumber, A = a.map, B = a.merge, d = a.pInt;
        a.Color = function (f) {
            if (!(this instanceof a.Color)) return new a.Color(f);
            this.init(f)
        };
        a.Color.prototype = {
            parsers: [{
                regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                parse: function (a) {
                    return [d(a[1]), d(a[2]), d(a[3]), parseFloat(a[4], 10)]
                }
            }, {
                regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                parse: function (a) {
                    return [d(a[1]), d(a[2]), d(a[3]), 1]
                }
            }], names: {none: "rgba(255,255,255,0)", white: "#ffffff", black: "#000000"}, init: function (f) {
                var d, q, n, m;
                if ((this.input = f = this.names[f && f.toLowerCase ? f.toLowerCase() : ""] || f) && f.stops) this.stops = A(f.stops, function (h) {
                    return new a.Color(h[1])
                }); else if (f && "#" === f[0] && (d = f.length, f = parseInt(f.substr(1), 16), 7 === d ? q = [(f & 16711680) >> 16, (f & 65280) >> 8, f & 255, 1] : 4 === d && (q = [(f & 3840) >> 4 | (f & 3840) >> 8, (f & 240) >> 4 | f & 240, (f & 15) << 4 | f & 15, 1])), !q) for (n = this.parsers.length; n-- &&
                !q;) m = this.parsers[n], (d = m.regex.exec(f)) && (q = m.parse(d));
                this.rgba = q || []
            }, get: function (a) {
                var f = this.input, d = this.rgba, n;
                this.stops ? (n = B(f), n.stops = [].concat(n.stops), y(this.stops, function (f, h) {
                    n.stops[h] = [n.stops[h][0], f.get(a)]
                })) : n = d && C(d[0]) ? "rgb" === a || !a && 1 === d[3] ? "rgb(" + d[0] + "," + d[1] + "," + d[2] + ")" : "a" === a ? d[3] : "rgba(" + d.join(",") + ")" : f;
                return n
            }, brighten: function (a) {
                var f, q = this.rgba;
                if (this.stops) y(this.stops, function (f) {
                    f.brighten(a)
                }); else if (C(a) && 0 !== a) for (f = 0; 3 > f; f++) q[f] += d(255 * a), 0 >
                q[f] && (q[f] = 0), 255 < q[f] && (q[f] = 255);
                return this
            }, setOpacity: function (a) {
                this.rgba[3] = a;
                return this
            }, tweenTo: function (a, d) {
                var f, n;
                a.rgba.length ? (f = this.rgba, a = a.rgba, n = 1 !== a[3] || 1 !== f[3], a = (n ? "rgba(" : "rgb(") + Math.round(a[0] + (f[0] - a[0]) * (1 - d)) + "," + Math.round(a[1] + (f[1] - a[1]) * (1 - d)) + "," + Math.round(a[2] + (f[2] - a[2]) * (1 - d)) + (n ? "," + (a[3] + (f[3] - a[3]) * (1 - d)) : "") + ")") : a = a.input || "none";
                return a
            }
        };
        a.color = function (d) {
            return new a.Color(d)
        }
    })(K);
    (function (a) {
        function y() {
            var d = a.defaultOptions.global, f = q.moment;
            if (d.timezone) {
                if (f) return function (a) {
                    return -f.tz(a, d.timezone).utcOffset()
                };
                a.error(25)
            }
            return d.useUTC && d.getTimezoneOffset
        }

        function C() {
            var f = a.defaultOptions.global, m, h = f.useUTC, t = h ? "getUTC" : "get", l = h ? "setUTC" : "set";
            a.Date = m = f.Date || q.Date;
            m.hcTimezoneOffset = h && f.timezoneOffset;
            m.hcGetTimezoneOffset = y();
            m.hcMakeTime = function (a, e, p, b, g, f) {
                var c;
                h ? (c = m.UTC.apply(0, arguments), c += d(c)) : c = (new m(a, e, u(p, 1), u(b, 0), u(g, 0), u(f, 0))).getTime();
                return c
            };
            B("Minutes Hours Day Date Month FullYear".split(" "),
                function (a) {
                    m["hcGet" + a] = t + a
                });
            B("Milliseconds Seconds Minutes Hours Date Month FullYear".split(" "), function (a) {
                m["hcSet" + a] = l + a
            })
        }

        var A = a.color, B = a.each, d = a.getTZOffset, f = a.merge, u = a.pick, q = a.win;
        a.defaultOptions = {
            colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
            symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
            lang: {
                loading: "Loading...",
                months: "January February March April May June July August September October November December".split(" "),
                shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                decimalPoint: ".",
                numericSymbols: "kMGTPE".split(""),
                resetZoom: "Reset zoom",
                resetZoomTitle: "Reset zoom level 1:1",
                thousandsSep: " "
            },
            global: {useUTC: !0, VMLRadialGradientURL: "http://code.highcharts.com/5.0.12/gfx/vml-radial-gradient.png"},
            chart: {
                borderRadius: 0,
                defaultSeriesType: "line",
                ignoreHiddenSeries: !0,
                spacing: [10, 10, 15, 10],
                resetZoomButton: {
                    theme: {zIndex: 20},
                    position: {align: "right", x: -10, y: 10}
                },
                width: null,
                height: null,
                borderColor: "#335cad",
                backgroundColor: "#ffffff",
                plotBorderColor: "#cccccc"
            },
            title: {text: "Chart title", align: "center", margin: 15, widthAdjust: -44},
            subtitle: {text: "", align: "center", widthAdjust: -44},
            plotOptions: {},
            labels: {style: {position: "absolute", color: "#333333"}},
            legend: {
                enabled: !0,
                align: "center",
                layout: "horizontal",
                labelFormatter: function () {
                    return this.name
                },
                borderColor: "#999999",
                borderRadius: 0,
                navigation: {activeColor: "#003399", inactiveColor: "#cccccc"},
                itemStyle: {color: "#333333", fontSize: "12px", fontWeight: "bold", textOverflow: "ellipsis"},
                itemHoverStyle: {color: "#000000"},
                itemHiddenStyle: {color: "#cccccc"},
                shadow: !1,
                itemCheckboxStyle: {position: "absolute", width: "13px", height: "13px"},
                squareSymbol: !0,
                symbolPadding: 5,
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                title: {style: {fontWeight: "bold"}}
            },
            loading: {
                labelStyle: {fontWeight: "bold", position: "relative", top: "45%"},
                style: {position: "absolute", backgroundColor: "#ffffff", opacity: .5, textAlign: "center"}
            },
            tooltip: {
                enabled: !0,
                animation: a.svg,
                borderRadius: 3,
                dateTimeLabelFormats: {
                    millisecond: "%A, %b %e, %H:%M:%S.%L",
                    second: "%A, %b %e, %H:%M:%S",
                    minute: "%A, %b %e, %H:%M",
                    hour: "%A, %b %e, %H:%M",
                    day: "%A, %b %e, %Y",
                    week: "Week from %A, %b %e, %Y",
                    month: "%B %Y",
                    year: "%Y"
                },
                footerFormat: "",
                padding: 8,
                snap: a.isTouchDevice ? 25 : 10,
                backgroundColor: A("#f7f7f7").setOpacity(.85).get(),
                borderWidth: 1,
                headerFormat: '\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',
                shadow: !0,
                style: {
                    color: "#333333",
                    cursor: "default",
                    fontSize: "12px",
                    pointerEvents: "none",
                    whiteSpace: "nowrap"
                }
            },
            credits: {
                enabled: !0,
                href: "http://www.highcharts.com",
                position: {align: "right", x: -10, verticalAlign: "bottom", y: -5},
                style: {cursor: "pointer", color: "#999999", fontSize: "9px"},
                text: "Highcharts.com"
            }
        };
        a.setOptions = function (d) {
            a.defaultOptions = f(!0, a.defaultOptions, d);
            C();
            return a.defaultOptions
        };
        a.getOptions = function () {
            return a.defaultOptions
        };
        a.defaultPlotOptions = a.defaultOptions.plotOptions;
        C()
    })(K);
    (function (a) {
        var y, C, A = a.addEvent, B = a.animate, d = a.attr, f = a.charts, u = a.color, q = a.css, n = a.createElement,
            m = a.defined, h = a.deg2rad, t = a.destroyObjectProperties, l = a.doc, c = a.each, e = a.extend,
            p = a.erase, b = a.grep, g = a.hasTouch, z = a.inArray, G = a.isArray, k = a.isFirefox, I = a.isMS,
            E = a.isObject, D = a.isString, M = a.isWebKit, v = a.merge, F = a.noop, H = a.objectEach, J = a.pick,
            r = a.pInt, w = a.removeEvent, P = a.stop, L = a.svg, N = a.SVG_NS, Q = a.symbolSizes, O = a.win;
        y = a.SVGElement = function () {
            return this
        };
        e(y.prototype, {
            opacity: 1,
            SVG_NS: N,
            textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline".split(" "),
            init: function (a, b) {
                this.element = "span" === b ? n(b) : l.createElementNS(this.SVG_NS, b);
                this.renderer = a
            },
            animate: function (x, b, r) {
                b = a.animObject(J(b, this.renderer.globalAnimation, !0));
                0 !== b.duration ? (r && (b.complete = r), B(this, x, b)) : (this.attr(x, null, r), b.step && b.step.call(this));
                return this
            },
            colorGradient: function (x, b, r) {
                var w = this.renderer, e, k, g, h, R, E, p, L, d, I, f = [], l;
                x.radialGradient ? k = "radialGradient" : x.linearGradient && (k = "linearGradient");
                k && (g = x[k], R = w.gradients, p = x.stops, I = r.radialReference, G(g) && (x[k] =
                    g = {
                        x1: g[0],
                        y1: g[1],
                        x2: g[2],
                        y2: g[3],
                        gradientUnits: "userSpaceOnUse"
                    }), "radialGradient" === k && I && !m(g.gradientUnits) && (h = g, g = v(g, w.getRadialAttr(I, h), {gradientUnits: "userSpaceOnUse"})), H(g, function (a, x) {
                    "id" !== x && f.push(x, a)
                }), H(p, function (a) {
                    f.push(a)
                }), f = f.join(","), R[f] ? I = R[f].attr("id") : (g.id = I = a.uniqueKey(), R[f] = E = w.createElement(k).attr(g).add(w.defs), E.radAttr = h, E.stops = [], c(p, function (x) {
                    0 === x[1].indexOf("rgba") ? (e = a.color(x[1]), L = e.get("rgb"), d = e.get("a")) : (L = x[1], d = 1);
                    x = w.createElement("stop").attr({
                        offset: x[0],
                        "stop-color": L, "stop-opacity": d
                    }).add(E);
                    E.stops.push(x)
                })), l = "url(" + w.url + "#" + I + ")", r.setAttribute(b, l), r.gradient = f, x.toString = function () {
                    return l
                })
            },
            applyTextOutline: function (x) {
                var b = this.element, r, w, e, k, g;
                -1 !== x.indexOf("contrast") && (x = x.replace(/contrast/g, this.renderer.getContrast(b.style.fill)));
                x = x.split(" ");
                w = x[x.length - 1];
                if ((e = x[0]) && "none" !== e && a.svg) {
                    this.fakeTS = !0;
                    x = [].slice.call(b.getElementsByTagName("tspan"));
                    this.ySetter = this.xSetter;
                    e = e.replace(/(^[\d\.]+)(.*?)$/g, function (a,
                                                                 x, b) {
                        return 2 * x + b
                    });
                    for (g = x.length; g--;) r = x[g], "highcharts-text-outline" === r.getAttribute("class") && p(x, b.removeChild(r));
                    k = b.firstChild;
                    c(x, function (a, x) {
                        0 === x && (a.setAttribute("x", b.getAttribute("x")), x = b.getAttribute("y"), a.setAttribute("y", x || 0), null === x && b.setAttribute("y", 0));
                        a = a.cloneNode(1);
                        d(a, {
                            "class": "highcharts-text-outline",
                            fill: w,
                            stroke: w,
                            "stroke-width": e,
                            "stroke-linejoin": "round"
                        });
                        b.insertBefore(a, k)
                    })
                }
            },
            attr: function (a, b, r, w) {
                var x, e = this.element, k, c = this, g, v;
                "string" === typeof a &&
                void 0 !== b && (x = a, a = {}, a[x] = b);
                "string" === typeof a ? c = (this[a + "Getter"] || this._defaultGetter).call(this, a, e) : (H(a, function (x, b) {
                    g = !1;
                    w || P(this, b);
                    this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)$/.test(b) && (k || (this.symbolAttr(a), k = !0), g = !0);
                    !this.rotation || "x" !== b && "y" !== b || (this.doTransform = !0);
                    g || (v = this[b + "Setter"] || this._defaultSetter, v.call(this, x, b, e), this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(b) && this.updateShadows(b, x, v))
                }, this), this.afterSetters());
                r && r();
                return c
            },
            afterSetters: function () {
                this.doTransform && (this.updateTransform(), this.doTransform = !1)
            },
            updateShadows: function (a, b, r) {
                for (var x = this.shadows, w = x.length; w--;) r.call(x[w], "height" === a ? Math.max(b - (x[w].cutHeight || 0), 0) : "d" === a ? this.d : b, a, x[w])
            },
            addClass: function (a, b) {
                var x = this.attr("class") || "";
                -1 === x.indexOf(a) && (b || (a = (x + (x ? " " : "") + a).replace("  ", " ")), this.attr("class", a));
                return this
            },
            hasClass: function (a) {
                return -1 !== d(this.element, "class").indexOf(a)
            },
            removeClass: function (a) {
                d(this.element,
                    "class", (d(this.element, "class") || "").replace(a, ""));
                return this
            },
            symbolAttr: function (a) {
                var x = this;
                c("x y r start end width height innerR anchorX anchorY".split(" "), function (b) {
                    x[b] = J(a[b], x[b])
                });
                x.attr({d: x.renderer.symbols[x.symbolName](x.x, x.y, x.width, x.height, x)})
            },
            clip: function (a) {
                return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none")
            },
            crisp: function (a, b) {
                var x = this, r = {}, w;
                b = b || a.strokeWidth || 0;
                w = Math.round(b) % 2 / 2;
                a.x = Math.floor(a.x || x.x || 0) + w;
                a.y = Math.floor(a.y || x.y ||
                    0) + w;
                a.width = Math.floor((a.width || x.width || 0) - 2 * w);
                a.height = Math.floor((a.height || x.height || 0) - 2 * w);
                m(a.strokeWidth) && (a.strokeWidth = b);
                H(a, function (a, b) {
                    x[b] !== a && (x[b] = r[b] = a)
                });
                return r
            },
            css: function (a) {
                var b = this.styles, x = {}, w = this.element, k, c = "", g, v = !b,
                    h = ["textOutline", "textOverflow", "width"];
                a && a.color && (a.fill = a.color);
                b && H(a, function (a, r) {
                    a !== b[r] && (x[r] = a, v = !0)
                });
                v && (b && (a = e(b, x)), k = this.textWidth = a && a.width && "auto" !== a.width && "text" === w.nodeName.toLowerCase() && r(a.width), this.styles = a, k &&
                !L && this.renderer.forExport && delete a.width, I && !L ? q(this.element, a) : (g = function (a, b) {
                    return "-" + b.toLowerCase()
                }, H(a, function (a, b) {
                    -1 === z(b, h) && (c += b.replace(/([A-Z])/g, g) + ":" + a + ";")
                }), c && d(w, "style", c)), this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), a && a.textOutline && this.applyTextOutline(a.textOutline)));
                return this
            },
            strokeWidth: function () {
                return this["stroke-width"] || 0
            },
            on: function (a, b) {
                var x = this, r = x.element;
                g && "click" === a ? (r.ontouchstart = function (a) {
                    x.touchEventFired =
                        Date.now();
                    a.preventDefault();
                    b.call(r, a)
                }, r.onclick = function (a) {
                    (-1 === O.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (x.touchEventFired || 0)) && b.call(r, a)
                }) : r["on" + a] = b;
                return this
            },
            setRadialReference: function (a) {
                var b = this.renderer.gradients[this.element.gradient];
                this.element.radialReference = a;
                b && b.radAttr && b.animate(this.renderer.getRadialAttr(a, b.radAttr));
                return this
            },
            translate: function (a, b) {
                return this.attr({translateX: a, translateY: b})
            },
            invert: function (a) {
                this.inverted = a;
                this.updateTransform();
                return this
            },
            updateTransform: function () {
                var a = this.translateX || 0, b = this.translateY || 0, r = this.scaleX, w = this.scaleY,
                    e = this.inverted, k = this.rotation, c = this.element;
                e && (a += this.width, b += this.height);
                a = ["translate(" + a + "," + b + ")"];
                e ? a.push("rotate(90) scale(-1,1)") : k && a.push("rotate(" + k + " " + (c.getAttribute("x") || 0) + " " + (c.getAttribute("y") || 0) + ")");
                (m(r) || m(w)) && a.push("scale(" + J(r, 1) + " " + J(w, 1) + ")");
                a.length && c.setAttribute("transform", a.join(" "))
            },
            toFront: function () {
                var a = this.element;
                a.parentNode.appendChild(a);
                return this
            },
            align: function (a, b, r) {
                var x, w, e, k, c = {};
                w = this.renderer;
                e = w.alignedObjects;
                var g, v;
                if (a) {
                    if (this.alignOptions = a, this.alignByTranslate = b, !r || D(r)) this.alignTo = x = r || "renderer", p(e, this), e.push(this), r = null
                } else a = this.alignOptions, b = this.alignByTranslate, x = this.alignTo;
                r = J(r, w[x], w);
                x = a.align;
                w = a.verticalAlign;
                e = (r.x || 0) + (a.x || 0);
                k = (r.y || 0) + (a.y || 0);
                "right" === x ? g = 1 : "center" === x && (g = 2);
                g && (e += (r.width - (a.width || 0)) / g);
                c[b ? "translateX" : "x"] = Math.round(e);
                "bottom" === w ? v = 1 : "middle" === w && (v =
                    2);
                v && (k += (r.height - (a.height || 0)) / v);
                c[b ? "translateY" : "y"] = Math.round(k);
                this[this.placed ? "animate" : "attr"](c);
                this.placed = !0;
                this.alignAttr = c;
                return this
            },
            getBBox: function (a, b) {
                var x, r = this.renderer, w, k = this.element, g = this.styles, v, E = this.textStr, p, L = r.cache,
                    d = r.cacheKeys, I;
                b = J(b, this.rotation);
                w = b * h;
                v = g && g.fontSize;
                void 0 !== E && (I = E.toString(), -1 === I.indexOf("\x3c") && (I = I.replace(/[0-9]/g, "0")), I += ["", b || 0, v, g && g.width, g && g.textOverflow].join());
                I && !a && (x = L[I]);
                if (!x) {
                    if (k.namespaceURI === this.SVG_NS ||
                        r.forExport) {
                        try {
                            (p = this.fakeTS && function (a) {
                                c(k.querySelectorAll(".highcharts-text-outline"), function (b) {
                                    b.style.display = a
                                })
                            }) && p("none"), x = k.getBBox ? e({}, k.getBBox()) : {
                                width: k.offsetWidth,
                                height: k.offsetHeight
                            }, p && p("")
                        } catch (V) {
                        }
                        if (!x || 0 > x.width) x = {width: 0, height: 0}
                    } else x = this.htmlGetBBox();
                    r.isSVG && (a = x.width, r = x.height, g && "11px" === g.fontSize && 17 === Math.round(r) && (x.height = r = 14), b && (x.width = Math.abs(r * Math.sin(w)) + Math.abs(a * Math.cos(w)), x.height = Math.abs(r * Math.cos(w)) + Math.abs(a * Math.sin(w))));
                    if (I && 0 < x.height) {
                        for (; 250 < d.length;) delete L[d.shift()];
                        L[I] || d.push(I);
                        L[I] = x
                    }
                }
                return x
            },
            show: function (a) {
                return this.attr({visibility: a ? "inherit" : "visible"})
            },
            hide: function () {
                return this.attr({visibility: "hidden"})
            },
            fadeOut: function (a) {
                var b = this;
                b.animate({opacity: 0}, {
                    duration: a || 150, complete: function () {
                        b.attr({y: -9999})
                    }
                })
            },
            add: function (a) {
                var b = this.renderer, x = this.element, r;
                a && (this.parentGroup = a);
                this.parentInverted = a && a.inverted;
                void 0 !== this.textStr && b.buildText(this);
                this.added = !0;
                if (!a ||
                    a.handleZ || this.zIndex) r = this.zIndexSetter();
                r || (a ? a.element : b.box).appendChild(x);
                if (this.onAdd) this.onAdd();
                return this
            },
            safeRemoveChild: function (a) {
                var b = a.parentNode;
                b && b.removeChild(a)
            },
            destroy: function () {
                var a = this, b = a.element || {}, r = a.renderer.isSVG && "SPAN" === b.nodeName && a.parentGroup,
                    w = b.ownerSVGElement;
                b.onclick = b.onmouseout = b.onmouseover = b.onmousemove = b.point = null;
                P(a);
                a.clipPath && w && (c(w.querySelectorAll("[clip-path]"), function (b) {
                    -1 < b.getAttribute("clip-path").indexOf(a.clipPath.element.id +
                        ")") && b.removeAttribute("clip-path")
                }), a.clipPath = a.clipPath.destroy());
                if (a.stops) {
                    for (w = 0; w < a.stops.length; w++) a.stops[w] = a.stops[w].destroy();
                    a.stops = null
                }
                a.safeRemoveChild(b);
                for (a.destroyShadows(); r && r.div && 0 === r.div.childNodes.length;) b = r.parentGroup, a.safeRemoveChild(r.div), delete r.div, r = b;
                a.alignTo && p(a.renderer.alignedObjects, a);
                H(a, function (b, x) {
                    delete a[x]
                });
                return null
            },
            shadow: function (a, b, r) {
                var x = [], w, k, e = this.element, c, g, v, h;
                if (!a) this.destroyShadows(); else if (!this.shadows) {
                    g = J(a.width,
                        3);
                    v = (a.opacity || .15) / g;
                    h = this.parentInverted ? "(-1,-1)" : "(" + J(a.offsetX, 1) + ", " + J(a.offsetY, 1) + ")";
                    for (w = 1; w <= g; w++) k = e.cloneNode(0), c = 2 * g + 1 - 2 * w, d(k, {
                        isShadow: "true",
                        stroke: a.color || "#000000",
                        "stroke-opacity": v * w,
                        "stroke-width": c,
                        transform: "translate" + h,
                        fill: "none"
                    }), r && (d(k, "height", Math.max(d(k, "height") - c, 0)), k.cutHeight = c), b ? b.element.appendChild(k) : e.parentNode.insertBefore(k, e), x.push(k);
                    this.shadows = x
                }
                return this
            },
            destroyShadows: function () {
                c(this.shadows || [], function (a) {
                        this.safeRemoveChild(a)
                    },
                    this);
                this.shadows = void 0
            },
            xGetter: function (a) {
                "circle" === this.element.nodeName && ("x" === a ? a = "cx" : "y" === a && (a = "cy"));
                return this._defaultGetter(a)
            },
            _defaultGetter: function (a) {
                a = J(this[a], this.element ? this.element.getAttribute(a) : null, 0);
                /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
                return a
            },
            dSetter: function (a, b, r) {
                a && a.join && (a = a.join(" "));
                /(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
                r.setAttribute(b, a);
                this[b] = a
            },
            dashstyleSetter: function (a) {
                var b, w = this["stroke-width"];
                "inherit" === w && (w = 1);
                if (a = a && a.toLowerCase()) {
                    a =
                        a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
                    for (b = a.length; b--;) a[b] = r(a[b]) * w;
                    a = a.join(",").replace(/NaN/g, "none");
                    this.element.setAttribute("stroke-dasharray", a)
                }
            },
            alignSetter: function (a) {
                this.element.setAttribute("text-anchor", {left: "start", center: "middle", right: "end"}[a])
            },
            opacitySetter: function (a, b, r) {
                this[b] =
                    a;
                r.setAttribute(b, a)
            },
            titleSetter: function (a) {
                var b = this.element.getElementsByTagName("title")[0];
                b || (b = l.createElementNS(this.SVG_NS, "title"), this.element.appendChild(b));
                b.firstChild && b.removeChild(b.firstChild);
                b.appendChild(l.createTextNode(String(J(a), "").replace(/<[^>]*>/g, "")))
            },
            textSetter: function (a) {
                a !== this.textStr && (delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this))
            },
            fillSetter: function (a, b, r) {
                "string" === typeof a ? r.setAttribute(b, a) : a && this.colorGradient(a, b, r)
            },
            visibilitySetter: function (a, b, r) {
                "inherit" === a ? r.removeAttribute(b) : r.setAttribute(b, a)
            },
            zIndexSetter: function (a, b) {
                var w = this.renderer, x = this.parentGroup, k = (x || w).element || w.box, e, c = this.element, g;
                e = this.added;
                var v;
                m(a) && (c.zIndex = a, a = +a, this[b] === a && (e = !1), this[b] = a);
                if (e) {
                    (a = this.zIndex) && x && (x.handleZ = !0);
                    b = k.childNodes;
                    for (v = 0; v < b.length && !g; v++) x = b[v], e = x.zIndex, x !== c && (r(e) > a || !m(a) && m(e) || 0 > a && !m(e) && k !== w.box) && (k.insertBefore(c, x), g = !0);
                    g || k.appendChild(c)
                }
                return g
            },
            _defaultSetter: function (a,
                                      b, r) {
                r.setAttribute(b, a)
            }
        });
        y.prototype.yGetter = y.prototype.xGetter;
        y.prototype.translateXSetter = y.prototype.translateYSetter = y.prototype.rotationSetter = y.prototype.verticalAlignSetter = y.prototype.scaleXSetter = y.prototype.scaleYSetter = function (a, b) {
            this[b] = a;
            this.doTransform = !0
        };
        y.prototype["stroke-widthSetter"] = y.prototype.strokeSetter = function (a, b, r) {
            this[b] = a;
            this.stroke && this["stroke-width"] ? (y.prototype.fillSetter.call(this, this.stroke, "stroke", r), r.setAttribute("stroke-width", this["stroke-width"]),
                this.hasStroke = !0) : "stroke-width" === b && 0 === a && this.hasStroke && (r.removeAttribute("stroke"), this.hasStroke = !1)
        };
        C = a.SVGRenderer = function () {
            this.init.apply(this, arguments)
        };
        e(C.prototype, {
            Element: y, SVG_NS: N, init: function (a, b, r, w, e, c) {
                var x;
                w = this.createElement("svg").attr({version: "1.1", "class": "highcharts-root"}).css(this.getStyle(w));
                x = w.element;
                a.appendChild(x);
                -1 === a.innerHTML.indexOf("xmlns") && d(x, "xmlns", this.SVG_NS);
                this.isSVG = !0;
                this.box = x;
                this.boxWrapper = w;
                this.alignedObjects = [];
                this.url = (k ||
                    M) && l.getElementsByTagName("base").length ? O.location.href.replace(/#.*?$/, "").replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
                this.createElement("desc").add().element.appendChild(l.createTextNode("Created with Highmaps 5.0.12"));
                this.defs = this.createElement("defs").add();
                this.allowHTML = c;
                this.forExport = e;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount = 0;
                this.setSize(b, r, !1);
                var g;
                k && a.getBoundingClientRect && (b = function () {
                    q(a, {left: 0, top: 0});
                    g = a.getBoundingClientRect();
                    q(a, {left: Math.ceil(g.left) - g.left + "px", top: Math.ceil(g.top) - g.top + "px"})
                }, b(), this.unSubPixelFix = A(O, "resize", b))
            }, getStyle: function (a) {
                return this.style = e({
                    fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                    fontSize: "12px"
                }, a)
            }, setStyle: function (a) {
                this.boxWrapper.css(this.getStyle(a))
            }, isHidden: function () {
                return !this.boxWrapper.getBBox().width
            }, destroy: function () {
                var a = this.defs;
                this.box = null;
                this.boxWrapper = this.boxWrapper.destroy();
                t(this.gradients || {});
                this.gradients =
                    null;
                a && (this.defs = a.destroy());
                this.unSubPixelFix && this.unSubPixelFix();
                return this.alignedObjects = null
            }, createElement: function (a) {
                var b = new this.Element;
                b.init(this, a);
                return b
            }, draw: F, getRadialAttr: function (a, b) {
                return {cx: a[0] - a[2] / 2 + b.cx * a[2], cy: a[1] - a[2] / 2 + b.cy * a[2], r: b.r * a[2]}
            }, getSpanWidth: function (a, b) {
                var r = a.getBBox(!0).width;
                !L && this.forExport && (r = this.measureSpanWidth(b.firstChild.data, a.styles));
                return r
            }, applyEllipsis: function (a, b, r, w) {
                var x = this.getSpanWidth(a, b), k = x > w, x = r, e, c = 0, g =
                    r.length, v = function (a) {
                    b.removeChild(b.firstChild);
                    a && b.appendChild(l.createTextNode(a))
                };
                if (k) {
                    for (; c <= g;) e = Math.ceil((c + g) / 2), x = r.substring(0, e) + "\u2026", v(x), x = this.getSpanWidth(a, b), c === g ? c = g + 1 : x > w ? g = e - 1 : c = e;
                    0 === g && v("")
                }
                return k
            }, buildText: function (a) {
                var w = a.element, k = this, e = k.forExport, x = J(a.textStr, "").toString(),
                    g = -1 !== x.indexOf("\x3c"), v = w.childNodes, h, E, p, I, f = d(w, "x"), F = a.styles,
                    D = a.textWidth, H = F && F.lineHeight, t = F && F.textOutline,
                    m = F && "ellipsis" === F.textOverflow, z = F && "nowrap" === F.whiteSpace,
                    n = F && F.fontSize, P, G, M = v.length, F = D && !a.added && this.box, u = function (a) {
                        var b;
                        b = /(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : n || k.style.fontSize || 12;
                        return H ? r(H) : k.fontMetrics(b, a.getAttribute("style") ? a : w).h
                    };
                P = [x, m, z, H, t, n, D].join();
                if (P !== a.textCache) {
                    for (a.textCache = P; M--;) w.removeChild(v[M]);
                    g || t || m || D || -1 !== x.indexOf(" ") ? (h = /<.*class="([^"]+)".*>/, E = /<.*style="([^"]+)".*>/, p = /<.*href="([^"]+)".*>/, F && F.appendChild(w), x = g ? x.replace(/<(b|strong)>/g, '\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g,
                        '\x3cspan style\x3d"font-style:italic"\x3e').replace(/<a/g, "\x3cspan").replace(/<\/(b|strong|i|em|a)>/g, "\x3c/span\x3e").split(/<br.*?>/g) : [x], x = b(x, function (a) {
                        return "" !== a
                    }), c(x, function (b, r) {
                        var x, g = 0;
                        b = b.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||\x3cspan").replace(/<\/span>/g, "\x3c/span\x3e|||");
                        x = b.split("|||");
                        c(x, function (b) {
                            if ("" !== b || 1 === x.length) {
                                var c = {}, v = l.createElementNS(k.SVG_NS, "tspan"), F, H;
                                h.test(b) && (F = b.match(h)[1], d(v, "class", F));
                                E.test(b) && (H = b.match(E)[1].replace(/(;| |^)color([ :])/,
                                    "$1fill$2"), d(v, "style", H));
                                p.test(b) && !e && (d(v, "onclick", 'location.href\x3d"' + b.match(p)[1] + '"'), q(v, {cursor: "pointer"}));
                                b = (b.replace(/<(.|\n)*?>/g, "") || " ").replace(/&lt;/g, "\x3c").replace(/&gt;/g, "\x3e");
                                if (" " !== b) {
                                    v.appendChild(l.createTextNode(b));
                                    g ? c.dx = 0 : r && null !== f && (c.x = f);
                                    d(v, c);
                                    w.appendChild(v);
                                    !g && G && (!L && e && q(v, {display: "block"}), d(v, "dy", u(v)));
                                    if (D) {
                                        c = b.replace(/([^\^])-/g, "$1- ").split(" ");
                                        F = 1 < x.length || r || 1 < c.length && !z;
                                        var t = [], n, R = u(v), P = a.rotation;
                                        for (m && (I = k.applyEllipsis(a,
                                            v, b, D)); !m && F && (c.length || t.length);) a.rotation = 0, n = k.getSpanWidth(a, v), b = n > D, void 0 === I && (I = b), b && 1 !== c.length ? (v.removeChild(v.firstChild), t.unshift(c.pop())) : (c = t, t = [], c.length && !z && (v = l.createElementNS(N, "tspan"), d(v, {
                                            dy: R,
                                            x: f
                                        }), H && d(v, "style", H), w.appendChild(v)), n > D && (D = n)), c.length && v.appendChild(l.createTextNode(c.join(" ").replace(/- /g, "-")));
                                        a.rotation = P
                                    }
                                    g++
                                }
                            }
                        });
                        G = G || w.childNodes.length
                    }), I && a.attr("title", a.textStr), F && F.removeChild(w), t && a.applyTextOutline && a.applyTextOutline(t)) : w.appendChild(l.createTextNode(x.replace(/&lt;/g,
                        "\x3c").replace(/&gt;/g, "\x3e")))
                }
            }, getContrast: function (a) {
                a = u(a).rgba;
                return 510 < a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF"
            }, button: function (a, b, r, w, k, c, g, h, E) {
                var x = this.label(a, b, r, E, null, null, null, null, "button"), p = 0;
                x.attr(v({padding: 8, r: 2}, k));
                var L, d, f, F;
                k = v({
                    fill: "#f7f7f7",
                    stroke: "#cccccc",
                    "stroke-width": 1,
                    style: {color: "#333333", cursor: "pointer", fontWeight: "normal"}
                }, k);
                L = k.style;
                delete k.style;
                c = v(k, {fill: "#e6e6e6"}, c);
                d = c.style;
                delete c.style;
                g = v(k, {fill: "#e6ebf5", style: {color: "#000000", fontWeight: "bold"}},
                    g);
                f = g.style;
                delete g.style;
                h = v(k, {style: {color: "#cccccc"}}, h);
                F = h.style;
                delete h.style;
                A(x.element, I ? "mouseover" : "mouseenter", function () {
                    3 !== p && x.setState(1)
                });
                A(x.element, I ? "mouseout" : "mouseleave", function () {
                    3 !== p && x.setState(p)
                });
                x.setState = function (a) {
                    1 !== a && (x.state = p = a);
                    x.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][a || 0]);
                    x.attr([k, c, g, h][a || 0]).css([L, d, f, F][a || 0])
                };
                x.attr(k).css(e({cursor: "default"},
                    L));
                return x.on("click", function (a) {
                    3 !== p && w.call(x, a)
                })
            }, crispLine: function (a, b) {
                a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) - b % 2 / 2);
                a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) + b % 2 / 2);
                return a
            }, path: function (a) {
                var b = {fill: "none"};
                G(a) ? b.d = a : E(a) && e(b, a);
                return this.createElement("path").attr(b)
            }, circle: function (a, b, r) {
                a = E(a) ? a : {x: a, y: b, r: r};
                b = this.createElement("circle");
                b.xSetter = b.ySetter = function (a, b, r) {
                    r.setAttribute("c" + b, a)
                };
                return b.attr(a)
            }, arc: function (a, b, r, w, k, c) {
                E(a) ? (w = a, b = w.y, r = w.r, a = w.x) :
                    w = {innerR: w, start: k, end: c};
                a = this.symbol("arc", a, b, r, r, w);
                a.r = r;
                return a
            }, rect: function (a, b, r, w, k, c) {
                k = E(a) ? a.r : k;
                var e = this.createElement("rect");
                a = E(a) ? a : void 0 === a ? {} : {x: a, y: b, width: Math.max(r, 0), height: Math.max(w, 0)};
                void 0 !== c && (a.strokeWidth = c, a = e.crisp(a));
                a.fill = "none";
                k && (a.r = k);
                e.rSetter = function (a, b, r) {
                    d(r, {rx: a, ry: a})
                };
                return e.attr(a)
            }, setSize: function (a, b, r) {
                var w = this.alignedObjects, k = w.length;
                this.width = a;
                this.height = b;
                for (this.boxWrapper.animate({width: a, height: b}, {
                    step: function () {
                        this.attr({
                            viewBox: "0 0 " +
                                this.attr("width") + " " + this.attr("height")
                        })
                    }, duration: J(r, !0) ? void 0 : 0
                }); k--;) w[k].align()
            }, g: function (a) {
                var b = this.createElement("g");
                return a ? b.attr({"class": "highcharts-" + a}) : b
            }, image: function (a, b, r, w, k) {
                var c = {preserveAspectRatio: "none"};
                1 < arguments.length && e(c, {x: b, y: r, width: w, height: k});
                c = this.createElement("image").attr(c);
                c.element.setAttributeNS ? c.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", a) : c.element.setAttribute("hc-svg-href", a);
                return c
            }, symbol: function (a, b, r, w, k,
                                 g) {
                var x = this, v, h = /^url\((.*?)\)$/, p = h.test(a), E = !p && (this.symbols[a] ? a : "circle"),
                    I = E && this.symbols[E],
                    L = m(b) && I && I.call(this.symbols, Math.round(b), Math.round(r), w, k, g), d, F;
                I ? (v = this.path(L), v.attr("fill", "none"), e(v, {
                    symbolName: E,
                    x: b,
                    y: r,
                    width: w,
                    height: k
                }), g && e(v, g)) : p && (d = a.match(h)[1], v = this.image(d), v.imgwidth = J(Q[d] && Q[d].width, g && g.width), v.imgheight = J(Q[d] && Q[d].height, g && g.height), F = function () {
                    v.attr({width: v.width, height: v.height})
                }, c(["width", "height"], function (a) {
                    v[a + "Setter"] = function (a,
                                                b) {
                        var r = {}, w = this["img" + b], k = "width" === b ? "translateX" : "translateY";
                        this[b] = a;
                        m(w) && (this.element && this.element.setAttribute(b, w), this.alignByTranslate || (r[k] = ((this[b] || 0) - w) / 2, this.attr(r)))
                    }
                }), m(b) && v.attr({
                    x: b,
                    y: r
                }), v.isImg = !0, m(v.imgwidth) && m(v.imgheight) ? F() : (v.attr({width: 0, height: 0}), n("img", {
                    onload: function () {
                        var a = f[x.chartIndex];
                        0 === this.width && (q(this, {position: "absolute", top: "-999em"}), l.body.appendChild(this));
                        Q[d] = {width: this.width, height: this.height};
                        v.imgwidth = this.width;
                        v.imgheight =
                            this.height;
                        v.element && F();
                        this.parentNode && this.parentNode.removeChild(this);
                        x.imgCount--;
                        if (!x.imgCount && a && a.onload) a.onload()
                    }, src: d
                }), this.imgCount++));
                return v
            }, symbols: {
                circle: function (a, b, r, w) {
                    return this.arc(a + r / 2, b + w / 2, r / 2, w / 2, {start: 0, end: 2 * Math.PI, open: !1})
                }, square: function (a, b, r, w) {
                    return ["M", a, b, "L", a + r, b, a + r, b + w, a, b + w, "Z"]
                }, triangle: function (a, b, r, w) {
                    return ["M", a + r / 2, b, "L", a + r, b + w, a, b + w, "Z"]
                }, "triangle-down": function (a, b, r, w) {
                    return ["M", a, b, "L", a + r, b, a + r / 2, b + w, "Z"]
                }, diamond: function (a,
                                      b, r, w) {
                    return ["M", a + r / 2, b, "L", a + r, b + w / 2, a + r / 2, b + w, a, b + w / 2, "Z"]
                }, arc: function (a, b, r, w, k) {
                    var c = k.start, e = k.r || r, g = k.r || w || r, v = k.end - .001;
                    r = k.innerR;
                    w = k.open;
                    var x = Math.cos(c), h = Math.sin(c), p = Math.cos(v), v = Math.sin(v);
                    k = k.end - c < Math.PI ? 0 : 1;
                    e = ["M", a + e * x, b + g * h, "A", e, g, 0, k, 1, a + e * p, b + g * v];
                    m(r) && e.push(w ? "M" : "L", a + r * p, b + r * v, "A", r, r, 0, k, 0, a + r * x, b + r * h);
                    e.push(w ? "" : "Z");
                    return e
                }, callout: function (a, b, r, w, k) {
                    var c = Math.min(k && k.r || 0, r, w), e = c + 6, g = k && k.anchorX;
                    k = k && k.anchorY;
                    var v;
                    v = ["M", a + c, b, "L", a + r - c, b, "C",
                        a + r, b, a + r, b, a + r, b + c, "L", a + r, b + w - c, "C", a + r, b + w, a + r, b + w, a + r - c, b + w, "L", a + c, b + w, "C", a, b + w, a, b + w, a, b + w - c, "L", a, b + c, "C", a, b, a, b, a + c, b];
                    g && g > r ? k > b + e && k < b + w - e ? v.splice(13, 3, "L", a + r, k - 6, a + r + 6, k, a + r, k + 6, a + r, b + w - c) : v.splice(13, 3, "L", a + r, w / 2, g, k, a + r, w / 2, a + r, b + w - c) : g && 0 > g ? k > b + e && k < b + w - e ? v.splice(33, 3, "L", a, k + 6, a - 6, k, a, k - 6, a, b + c) : v.splice(33, 3, "L", a, w / 2, g, k, a, w / 2, a, b + c) : k && k > w && g > a + e && g < a + r - e ? v.splice(23, 3, "L", g + 6, b + w, g, b + w + 6, g - 6, b + w, a + c, b + w) : k && 0 > k && g > a + e && g < a + r - e && v.splice(3, 3, "L", g - 6, b, g, b - 6, g + 6, b, r - c, b);
                    return v
                }
            },
            clipRect: function (b, r, w, k) {
                var c = a.uniqueKey(), e = this.createElement("clipPath").attr({id: c}).add(this.defs);
                b = this.rect(b, r, w, k, 0).add(e);
                b.id = c;
                b.clipPath = e;
                b.count = 0;
                return b
            }, text: function (a, b, r, w) {
                var k = !L && this.forExport, c = {};
                if (w && (this.allowHTML || !this.forExport)) return this.html(a, b, r);
                c.x = Math.round(b || 0);
                r && (c.y = Math.round(r));
                if (a || 0 === a) c.text = a;
                a = this.createElement("text").attr(c);
                k && a.css({position: "absolute"});
                w || (a.xSetter = function (a, b, r) {
                    var w = r.getElementsByTagName("tspan"), k, c =
                        r.getAttribute(b), e;
                    for (e = 0; e < w.length; e++) k = w[e], k.getAttribute(b) === c && k.setAttribute(b, a);
                    r.setAttribute(b, a)
                });
                return a
            }, fontMetrics: function (a, b) {
                a = a || b && b.style && b.style.fontSize || this.style && this.style.fontSize;
                a = /px/.test(a) ? r(a) : /em/.test(a) ? parseFloat(a) * (b ? this.fontMetrics(null, b.parentNode).f : 16) : 12;
                b = 24 > a ? a + 3 : Math.round(1.2 * a);
                return {h: b, b: Math.round(.8 * b), f: a}
            }, rotCorr: function (a, b, r) {
                var w = a;
                b && r && (w = Math.max(w * Math.cos(b * h), 4));
                return {x: -a / 3 * Math.sin(b * h), y: w}
            }, label: function (b, r,
                                k, g, h, p, E, I, L) {
                var x = this, d = x.g("button" !== L && "label"), f = d.text = x.text("", 0, 0, E).attr({zIndex: 1}), F,
                    l, D = 0, H = 3, t = 0, z, q, n, P, G, M = {}, N, J, u = /^url\((.*?)\)$/.test(g), R = u, U, T, Q,
                    O;
                L && d.addClass("highcharts-" + L);
                R = u;
                U = function () {
                    return (N || 0) % 2 / 2
                };
                T = function () {
                    var a = f.element.style, b = {};
                    l = (void 0 === z || void 0 === q || G) && m(f.textStr) && f.getBBox();
                    d.width = (z || l.width || 0) + 2 * H + t;
                    d.height = (q || l.height || 0) + 2 * H;
                    J = H + x.fontMetrics(a && a.fontSize, f).b;
                    R && (F || (d.box = F = x.symbols[g] || u ? x.symbol(g) : x.rect(), F.addClass(("button" ===
                    L ? "" : "highcharts-label-box") + (L ? " highcharts-" + L + "-box" : "")), F.add(d), a = U(), b.x = a, b.y = (I ? -J : 0) + a), b.width = Math.round(d.width), b.height = Math.round(d.height), F.attr(e(b, M)), M = {})
                };
                Q = function () {
                    var a = t + H, b;
                    b = I ? 0 : J;
                    m(z) && l && ("center" === G || "right" === G) && (a += {center: .5, right: 1}[G] * (z - l.width));
                    if (a !== f.x || b !== f.y) f.attr("x", a), void 0 !== b && f.attr("y", b);
                    f.x = a;
                    f.y = b
                };
                O = function (a, b) {
                    F ? F.attr(a, b) : M[a] = b
                };
                d.onAdd = function () {
                    f.add(d);
                    d.attr({text: b || 0 === b ? b : "", x: r, y: k});
                    F && m(h) && d.attr({anchorX: h, anchorY: p})
                };
                d.widthSetter = function (b) {
                    z = a.isNumber(b) ? b : null
                };
                d.heightSetter = function (a) {
                    q = a
                };
                d["text-alignSetter"] = function (a) {
                    G = a
                };
                d.paddingSetter = function (a) {
                    m(a) && a !== H && (H = d.padding = a, Q())
                };
                d.paddingLeftSetter = function (a) {
                    m(a) && a !== t && (t = a, Q())
                };
                d.alignSetter = function (a) {
                    a = {left: 0, center: .5, right: 1}[a];
                    a !== D && (D = a, l && d.attr({x: n}))
                };
                d.textSetter = function (a) {
                    void 0 !== a && f.textSetter(a);
                    T();
                    Q()
                };
                d["stroke-widthSetter"] = function (a, b) {
                    a && (R = !0);
                    N = this["stroke-width"] = a;
                    O(b, a)
                };
                d.strokeSetter = d.fillSetter = d.rSetter =
                    function (a, b) {
                        "fill" === b && a && (R = !0);
                        O(b, a)
                    };
                d.anchorXSetter = function (a, b) {
                    h = d.anchorX = a;
                    O(b, Math.round(a) - U() - n)
                };
                d.anchorYSetter = function (a, b) {
                    p = d.anchorY = a;
                    O(b, a - P)
                };
                d.xSetter = function (a) {
                    d.x = a;
                    D && (a -= D * ((z || l.width) + 2 * H));
                    n = Math.round(a);
                    d.attr("translateX", n)
                };
                d.ySetter = function (a) {
                    P = d.y = Math.round(a);
                    d.attr("translateY", P)
                };
                var B = d.css;
                return e(d, {
                    css: function (a) {
                        if (a) {
                            var b = {};
                            a = v(a);
                            c(d.textProps, function (r) {
                                void 0 !== a[r] && (b[r] = a[r], delete a[r])
                            });
                            f.css(b)
                        }
                        return B.call(d, a)
                    }, getBBox: function () {
                        return {
                            width: l.width +
                                2 * H, height: l.height + 2 * H, x: l.x - H, y: l.y - H
                        }
                    }, shadow: function (a) {
                        a && (T(), F && F.shadow(a));
                        return d
                    }, destroy: function () {
                        w(d.element, "mouseenter");
                        w(d.element, "mouseleave");
                        f && (f = f.destroy());
                        F && (F = F.destroy());
                        y.prototype.destroy.call(d);
                        d = x = T = Q = O = null
                    }
                })
            }
        });
        a.Renderer = C
    })(K);
    (function (a) {
        var y = a.attr, C = a.createElement, A = a.css, B = a.defined, d = a.each, f = a.extend, u = a.isFirefox,
            q = a.isMS, n = a.isWebKit, m = a.pInt, h = a.SVGRenderer, t = a.win, l = a.wrap;
        f(a.SVGElement.prototype, {
            htmlCss: function (a) {
                var c = this.element;
                if (c =
                    a && "SPAN" === c.tagName && a.width) delete a.width, this.textWidth = c, this.updateTransform();
                a && "ellipsis" === a.textOverflow && (a.whiteSpace = "nowrap", a.overflow = "hidden");
                this.styles = f(this.styles, a);
                A(this.element, a);
                return this
            }, htmlGetBBox: function () {
                var a = this.element;
                "text" === a.nodeName && (a.style.position = "absolute");
                return {x: a.offsetLeft, y: a.offsetTop, width: a.offsetWidth, height: a.offsetHeight}
            }, htmlUpdateTransform: function () {
                if (this.added) {
                    var a = this.renderer, e = this.element, h = this.translateX || 0, b = this.translateY ||
                        0, g = this.x || 0, f = this.y || 0, l = this.textAlign || "left",
                        k = {left: 0, center: .5, right: 1}[l], I = this.styles;
                    A(e, {marginLeft: h, marginTop: b});
                    this.shadows && d(this.shadows, function (a) {
                        A(a, {marginLeft: h + 1, marginTop: b + 1})
                    });
                    this.inverted && d(e.childNodes, function (b) {
                        a.invertChild(b, e)
                    });
                    if ("SPAN" === e.tagName) {
                        var E = this.rotation, D = m(this.textWidth), t = I && I.whiteSpace,
                            v = [E, l, e.innerHTML, this.textWidth, this.textAlign].join();
                        v !== this.cTT && (I = a.fontMetrics(e.style.fontSize).b, B(E) && this.setSpanRotation(E, k, I), A(e, {
                            width: "",
                            whiteSpace: t || "nowrap"
                        }), e.offsetWidth > D && /[ \-]/.test(e.textContent || e.innerText) && A(e, {
                            width: D + "px",
                            display: "block",
                            whiteSpace: t || "normal"
                        }), this.getSpanCorrection(e.offsetWidth, I, k, E, l));
                        A(e, {left: g + (this.xCorr || 0) + "px", top: f + (this.yCorr || 0) + "px"});
                        n && (I = e.offsetHeight);
                        this.cTT = v
                    }
                } else this.alignOnAdd = !0
            }, setSpanRotation: function (a, e, h) {
                var b = {},
                    c = q ? "-ms-transform" : n ? "-webkit-transform" : u ? "MozTransform" : t.opera ? "-o-transform" : "";
                b[c] = b.transform = "rotate(" + a + "deg)";
                b[c + (u ? "Origin" : "-origin")] =
                    b.transformOrigin = 100 * e + "% " + h + "px";
                A(this.element, b)
            }, getSpanCorrection: function (a, e, h) {
                this.xCorr = -a * h;
                this.yCorr = -e
            }
        });
        f(h.prototype, {
            html: function (a, e, h) {
                var b = this.createElement("span"), c = b.element, p = b.renderer, t = p.isSVG, k = function (a, b) {
                    d(["opacity", "visibility"], function (k) {
                        l(a, k + "Setter", function (a, k, c, e) {
                            a.call(this, k, c, e);
                            b[c] = k
                        })
                    })
                };
                b.textSetter = function (a) {
                    a !== c.innerHTML && delete this.bBox;
                    c.innerHTML = this.textStr = a;
                    b.htmlUpdateTransform()
                };
                t && k(b, b.element.style);
                b.xSetter = b.ySetter = b.alignSetter =
                    b.rotationSetter = function (a, k) {
                        "align" === k && (k = "textAlign");
                        b[k] = a;
                        b.htmlUpdateTransform()
                    };
                b.attr({text: a, x: Math.round(e), y: Math.round(h)}).css({
                    fontFamily: this.style.fontFamily,
                    fontSize: this.style.fontSize,
                    position: "absolute"
                });
                c.style.whiteSpace = "nowrap";
                b.css = b.htmlCss;
                t && (b.add = function (a) {
                    var e, g = p.box.parentNode, h = [];
                    if (this.parentGroup = a) {
                        if (e = a.div, !e) {
                            for (; a;) h.push(a), a = a.parentGroup;
                            d(h.reverse(), function (a) {
                                var c, v = y(a.element, "class");
                                v && (v = {className: v});
                                e = a.div = a.div || C("div", v, {
                                    position: "absolute",
                                    left: (a.translateX || 0) + "px",
                                    top: (a.translateY || 0) + "px",
                                    display: a.display,
                                    opacity: a.opacity,
                                    pointerEvents: a.styles && a.styles.pointerEvents
                                }, e || g);
                                c = e.style;
                                f(a, {
                                    on: function () {
                                        b.on.apply({element: h[0].div}, arguments);
                                        return a
                                    }, translateXSetter: function (b, r) {
                                        c.left = b + "px";
                                        a[r] = b;
                                        a.doTransform = !0
                                    }, translateYSetter: function (b, r) {
                                        c.top = b + "px";
                                        a[r] = b;
                                        a.doTransform = !0
                                    }
                                });
                                k(a, c)
                            })
                        }
                    } else e = g;
                    e.appendChild(c);
                    b.added = !0;
                    b.alignOnAdd && b.htmlUpdateTransform();
                    return b
                });
                return b
            }
        })
    })(K);
    (function (a) {
        var y, C, A =
                a.createElement, B = a.css, d = a.defined, f = a.deg2rad, u = a.discardElement, q = a.doc, n = a.each,
            m = a.erase, h = a.extend;
        y = a.extendClass;
        var t = a.isArray, l = a.isNumber, c = a.isObject, e = a.merge;
        C = a.noop;
        var p = a.pick, b = a.pInt, g = a.SVGElement, z = a.SVGRenderer, G = a.win;
        a.svg || (C = {
            docMode8: q && 8 === q.documentMode, init: function (a, b) {
                var k = ["\x3c", b, ' filled\x3d"f" stroked\x3d"f"'], c = ["position: ", "absolute", ";"],
                    e = "div" === b;
                ("shape" === b || e) && c.push("left:0;top:0;width:1px;height:1px;");
                c.push("visibility: ", e ? "hidden" : "visible");
                k.push(' style\x3d"', c.join(""), '"/\x3e');
                b && (k = e || "span" === b || "img" === b ? k.join("") : a.prepVML(k), this.element = A(k));
                this.renderer = a
            }, add: function (a) {
                var b = this.renderer, k = this.element, c = b.box, e = a && a.inverted, c = a ? a.element || a : c;
                a && (this.parentGroup = a);
                e && b.invertChild(k, c);
                c.appendChild(k);
                this.added = !0;
                this.alignOnAdd && !this.deferUpdateTransform && this.updateTransform();
                if (this.onAdd) this.onAdd();
                this.className && this.attr("class", this.className);
                return this
            }, updateTransform: g.prototype.htmlUpdateTransform,
            setSpanRotation: function () {
                var a = this.rotation, b = Math.cos(a * f), c = Math.sin(a * f);
                B(this.element, {filter: a ? ["progid:DXImageTransform.Microsoft.Matrix(M11\x3d", b, ", M12\x3d", -c, ", M21\x3d", c, ", M22\x3d", b, ", sizingMethod\x3d'auto expand')"].join("") : "none"})
            }, getSpanCorrection: function (a, b, c, e, g) {
                var k = e ? Math.cos(e * f) : 1, h = e ? Math.sin(e * f) : 0,
                    d = p(this.elemHeight, this.element.offsetHeight), E;
                this.xCorr = 0 > k && -a;
                this.yCorr = 0 > h && -d;
                E = 0 > k * h;
                this.xCorr += h * b * (E ? 1 - c : c);
                this.yCorr -= k * b * (e ? E ? c : 1 - c : 1);
                g && "left" !==
                g && (this.xCorr -= a * c * (0 > k ? -1 : 1), e && (this.yCorr -= d * c * (0 > h ? -1 : 1)), B(this.element, {textAlign: g}))
            }, pathToVML: function (a) {
                for (var b = a.length, k = []; b--;) l(a[b]) ? k[b] = Math.round(10 * a[b]) - 5 : "Z" === a[b] ? k[b] = "x" : (k[b] = a[b], !a.isArc || "wa" !== a[b] && "at" !== a[b] || (k[b + 5] === k[b + 7] && (k[b + 7] += a[b + 7] > a[b + 5] ? 1 : -1), k[b + 6] === k[b + 8] && (k[b + 8] += a[b + 8] > a[b + 6] ? 1 : -1)));
                return k.join(" ") || "x"
            }, clip: function (a) {
                var b = this, k;
                a ? (k = a.members, m(k, b), k.push(b), b.destroyClip = function () {
                    m(k, b)
                }, a = a.getCSS(b)) : (b.destroyClip && b.destroyClip(),
                    a = {clip: b.docMode8 ? "inherit" : "rect(auto)"});
                return b.css(a)
            }, css: g.prototype.htmlCss, safeRemoveChild: function (a) {
                a.parentNode && u(a)
            }, destroy: function () {
                this.destroyClip && this.destroyClip();
                return g.prototype.destroy.apply(this)
            }, on: function (a, b) {
                this.element["on" + a] = function () {
                    var a = G.event;
                    a.target = a.srcElement;
                    b(a)
                };
                return this
            }, cutOffPath: function (a, c) {
                var k;
                a = a.split(/[ ,]/);
                k = a.length;
                if (9 === k || 11 === k) a[k - 4] = a[k - 2] = b(a[k - 2]) - 10 * c;
                return a.join(" ")
            }, shadow: function (a, c, e) {
                var k = [], g, v = this.element,
                    h = this.renderer, d, f = v.style, r, w = v.path, E, L, l, t;
                w && "string" !== typeof w.value && (w = "x");
                L = w;
                if (a) {
                    l = p(a.width, 3);
                    t = (a.opacity || .15) / l;
                    for (g = 1; 3 >= g; g++) E = 2 * l + 1 - 2 * g, e && (L = this.cutOffPath(w.value, E + .5)), r = ['\x3cshape isShadow\x3d"true" strokeweight\x3d"', E, '" filled\x3d"false" path\x3d"', L, '" coordsize\x3d"10 10" style\x3d"', v.style.cssText, '" /\x3e'], d = A(h.prepVML(r), null, {
                        left: b(f.left) + p(a.offsetX, 1),
                        top: b(f.top) + p(a.offsetY, 1)
                    }), e && (d.cutOff = E + 1), r = ['\x3cstroke color\x3d"', a.color || "#000000", '" opacity\x3d"',
                        t * g, '"/\x3e'], A(h.prepVML(r), null, null, d), c ? c.element.appendChild(d) : v.parentNode.insertBefore(d, v), k.push(d);
                    this.shadows = k
                }
                return this
            }, updateShadows: C, setAttr: function (a, b) {
                this.docMode8 ? this.element[a] = b : this.element.setAttribute(a, b)
            }, classSetter: function (a) {
                (this.added ? this.element : this).className = a
            }, dashstyleSetter: function (a, b, c) {
                (c.getElementsByTagName("stroke")[0] || A(this.renderer.prepVML(["\x3cstroke/\x3e"]), null, null, c))[b] = a || "solid";
                this[b] = a
            }, dSetter: function (a, b, c) {
                var k = this.shadows;
                a = a || [];
                this.d = a.join && a.join(" ");
                c.path = a = this.pathToVML(a);
                if (k) for (c = k.length; c--;) k[c].path = k[c].cutOff ? this.cutOffPath(a, k[c].cutOff) : a;
                this.setAttr(b, a)
            }, fillSetter: function (a, b, c) {
                var k = c.nodeName;
                "SPAN" === k ? c.style.color = a : "IMG" !== k && (c.filled = "none" !== a, this.setAttr("fillcolor", this.renderer.color(a, c, b, this)))
            }, "fill-opacitySetter": function (a, b, c) {
                A(this.renderer.prepVML(["\x3c", b.split("-")[0], ' opacity\x3d"', a, '"/\x3e']), null, null, c)
            }, opacitySetter: C, rotationSetter: function (a, b, c) {
                c =
                    c.style;
                this[b] = c[b] = a;
                c.left = -Math.round(Math.sin(a * f) + 1) + "px";
                c.top = Math.round(Math.cos(a * f)) + "px"
            }, strokeSetter: function (a, b, c) {
                this.setAttr("strokecolor", this.renderer.color(a, c, b, this))
            }, "stroke-widthSetter": function (a, b, c) {
                c.stroked = !!a;
                this[b] = a;
                l(a) && (a += "px");
                this.setAttr("strokeweight", a)
            }, titleSetter: function (a, b) {
                this.setAttr(b, a)
            }, visibilitySetter: function (a, b, c) {
                "inherit" === a && (a = "visible");
                this.shadows && n(this.shadows, function (c) {
                    c.style[b] = a
                });
                "DIV" === c.nodeName && (a = "hidden" === a ? "-999em" :
                    0, this.docMode8 || (c.style[b] = a ? "visible" : "hidden"), b = "top");
                c.style[b] = a
            }, xSetter: function (a, b, c) {
                this[b] = a;
                "x" === b ? b = "left" : "y" === b && (b = "top");
                this.updateClipping ? (this[b] = a, this.updateClipping()) : c.style[b] = a
            }, zIndexSetter: function (a, b, c) {
                c.style[b] = a
            }
        }, C["stroke-opacitySetter"] = C["fill-opacitySetter"], a.VMLElement = C = y(g, C), C.prototype.ySetter = C.prototype.widthSetter = C.prototype.heightSetter = C.prototype.xSetter, C = {
            Element: C, isIE8: -1 < G.navigator.userAgent.indexOf("MSIE 8.0"), init: function (a, b, c) {
                var e,
                    k;
                this.alignedObjects = [];
                e = this.createElement("div").css({position: "relative"});
                k = e.element;
                a.appendChild(e.element);
                this.isVML = !0;
                this.box = k;
                this.boxWrapper = e;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount = 0;
                this.setSize(b, c, !1);
                if (!q.namespaces.hcv) {
                    q.namespaces.add("hcv", "urn:schemas-microsoft-com:vml");
                    try {
                        q.createStyleSheet().cssText = "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
                    } catch (v) {
                        q.styleSheets[0].cssText += "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
                    }
                }
            },
            isHidden: function () {
                return !this.box.offsetWidth
            }, clipRect: function (a, b, e, g) {
                var k = this.createElement(), v = c(a);
                return h(k, {
                    members: [],
                    count: 0,
                    left: (v ? a.x : a) + 1,
                    top: (v ? a.y : b) + 1,
                    width: (v ? a.width : e) - 1,
                    height: (v ? a.height : g) - 1,
                    getCSS: function (a) {
                        var b = a.element, c = b.nodeName, r = a.inverted,
                            w = this.top - ("shape" === c ? b.offsetTop : 0), e = this.left, b = e + this.width,
                            k = w + this.height,
                            w = {clip: "rect(" + Math.round(r ? e : w) + "px," + Math.round(r ? k : b) + "px," + Math.round(r ? b : k) + "px," + Math.round(r ? w : e) + "px)"};
                        !r && a.docMode8 && "DIV" === c &&
                        h(w, {width: b + "px", height: k + "px"});
                        return w
                    },
                    updateClipping: function () {
                        n(k.members, function (a) {
                            a.element && a.css(k.getCSS(a))
                        })
                    }
                })
            }, color: function (b, c, e, g) {
                var k = this, v, h = /^rgba/, p, d, r = "none";
                b && b.linearGradient ? d = "gradient" : b && b.radialGradient && (d = "pattern");
                if (d) {
                    var w, f, L = b.linearGradient || b.radialGradient, l, t, E, x, m, z = "";
                    b = b.stops;
                    var D, q = [], I = function () {
                        p = ['\x3cfill colors\x3d"' + q.join(",") + '" opacity\x3d"', E, '" o:opacity2\x3d"', t, '" type\x3d"', d, '" ', z, 'focus\x3d"100%" method\x3d"any" /\x3e'];
                        A(k.prepVML(p), null, null, c)
                    };
                    l = b[0];
                    D = b[b.length - 1];
                    0 < l[0] && b.unshift([0, l[1]]);
                    1 > D[0] && b.push([1, D[1]]);
                    n(b, function (b, r) {
                        h.test(b[1]) ? (v = a.color(b[1]), w = v.get("rgb"), f = v.get("a")) : (w = b[1], f = 1);
                        q.push(100 * b[0] + "% " + w);
                        r ? (E = f, x = w) : (t = f, m = w)
                    });
                    if ("fill" === e) if ("gradient" === d) e = L.x1 || L[0] || 0, b = L.y1 || L[1] || 0, l = L.x2 || L[2] || 0, L = L.y2 || L[3] || 0, z = 'angle\x3d"' + (90 - 180 * Math.atan((L - b) / (l - e)) / Math.PI) + '"', I(); else {
                        var r = L.r, G = 2 * r, u = 2 * r, B = L.cx, y = L.cy, C = c.radialReference, K,
                            r = function () {
                                C && (K = g.getBBox(), B += (C[0] -
                                    K.x) / K.width - .5, y += (C[1] - K.y) / K.height - .5, G *= C[2] / K.width, u *= C[2] / K.height);
                                z = 'src\x3d"' + a.getOptions().global.VMLRadialGradientURL + '" size\x3d"' + G + "," + u + '" origin\x3d"0.5,0.5" position\x3d"' + B + "," + y + '" color2\x3d"' + m + '" ';
                                I()
                            };
                        g.added ? r() : g.onAdd = r;
                        r = x
                    } else r = w
                } else h.test(b) && "IMG" !== c.tagName ? (v = a.color(b), g[e + "-opacitySetter"](v.get("a"), e, c), r = v.get("rgb")) : (r = c.getElementsByTagName(e), r.length && (r[0].opacity = 1, r[0].type = "solid"), r = b);
                return r
            }, prepVML: function (a) {
                var b = this.isIE8;
                a = a.join("");
                b ? (a = a.replace("/\x3e", ' xmlns\x3d"urn:schemas-microsoft-com:vml" /\x3e'), a = -1 === a.indexOf('style\x3d"') ? a.replace("/\x3e", ' style\x3d"display:inline-block;behavior:url(#default#VML);" /\x3e') : a.replace('style\x3d"', 'style\x3d"display:inline-block;behavior:url(#default#VML);')) : a = a.replace("\x3c", "\x3chcv:");
                return a
            }, text: z.prototype.html, path: function (a) {
                var b = {coordsize: "10 10"};
                t(a) ? b.d = a : c(a) && h(b, a);
                return this.createElement("shape").attr(b)
            }, circle: function (a, b, e) {
                var g = this.symbol("circle");
                c(a) && (e = a.r, b = a.y, a = a.x);
                g.isCircle = !0;
                g.r = e;
                return g.attr({x: a, y: b})
            }, g: function (a) {
                var b;
                a && (b = {className: "highcharts-" + a, "class": "highcharts-" + a});
                return this.createElement("div").attr(b)
            }, image: function (a, b, c, e, g) {
                var k = this.createElement("img").attr({src: a});
                1 < arguments.length && k.attr({x: b, y: c, width: e, height: g});
                return k
            }, createElement: function (a) {
                return "rect" === a ? this.symbol(a) : z.prototype.createElement.call(this, a)
            }, invertChild: function (a, c) {
                var e = this;
                c = c.style;
                var g = "IMG" === a.tagName && a.style;
                B(a, {
                    flip: "x",
                    left: b(c.width) - (g ? b(g.top) : 1),
                    top: b(c.height) - (g ? b(g.left) : 1),
                    rotation: -90
                });
                n(a.childNodes, function (b) {
                    e.invertChild(b, a)
                })
            }, symbols: {
                arc: function (a, b, c, e, g) {
                    var k = g.start, h = g.end, p = g.r || c || e;
                    c = g.innerR;
                    e = Math.cos(k);
                    var d = Math.sin(k), r = Math.cos(h), w = Math.sin(h);
                    if (0 === h - k) return ["x"];
                    k = ["wa", a - p, b - p, a + p, b + p, a + p * e, b + p * d, a + p * r, b + p * w];
                    g.open && !c && k.push("e", "M", a, b);
                    k.push("at", a - c, b - c, a + c, b + c, a + c * r, b + c * w, a + c * e, b + c * d, "x", "e");
                    k.isArc = !0;
                    return k
                }, circle: function (a, b, c, e, g) {
                    g && d(g.r) &&
                    (c = e = 2 * g.r);
                    g && g.isCircle && (a -= c / 2, b -= e / 2);
                    return ["wa", a, b, a + c, b + e, a + c, b + e / 2, a + c, b + e / 2, "e"]
                }, rect: function (a, b, c, e, g) {
                    return z.prototype.symbols[d(g) && g.r ? "callout" : "square"].call(0, a, b, c, e, g)
                }
            }
        }, a.VMLRenderer = y = function () {
            this.init.apply(this, arguments)
        }, y.prototype = e(z.prototype, C), a.Renderer = y);
        z.prototype.measureSpanWidth = function (a, b) {
            var c = q.createElement("span");
            a = q.createTextNode(a);
            c.appendChild(a);
            B(c, b);
            this.box.appendChild(c);
            b = c.offsetWidth;
            u(c);
            return b
        }
    })(K);
    (function (a) {
        var y = a.correctFloat,
            C = a.defined, A = a.destroyObjectProperties, B = a.isNumber, d = a.merge, f = a.pick, u = a.deg2rad;
        a.Tick = function (a, d, f, h) {
            this.axis = a;
            this.pos = d;
            this.type = f || "";
            this.isNewLabel = this.isNew = !0;
            f || h || this.addLabel()
        };
        a.Tick.prototype = {
            addLabel: function () {
                var a = this.axis, n = a.options, m = a.chart, h = a.categories, t = a.names, l = this.pos,
                    c = n.labels, e = a.tickPositions, p = l === e[0], b = l === e[e.length - 1],
                    t = h ? f(h[l], t[l], l) : l, h = this.label, e = e.info, g;
                a.isDatetimeAxis && e && (g = n.dateTimeLabelFormats[e.higherRanks[l] || e.unitName]);
                this.isFirst =
                    p;
                this.isLast = b;
                n = a.labelFormatter.call({
                    axis: a,
                    chart: m,
                    isFirst: p,
                    isLast: b,
                    dateTimeLabelFormat: g,
                    value: a.isLog ? y(a.lin2log(t)) : t
                });
                C(h) ? h && h.attr({text: n}) : (this.labelLength = (this.label = h = C(n) && c.enabled ? m.renderer.text(n, 0, 0, c.useHTML).css(d(c.style)).add(a.labelGroup) : null) && h.getBBox().width, this.rotation = 0)
            }, getLabelSize: function () {
                return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
            }, handleOverflow: function (a) {
                var d = this.axis, m = a.x, h = d.chart.chartWidth, t = d.chart.spacing,
                    l = f(d.labelLeft, Math.min(d.pos, t[3])), t = f(d.labelRight, Math.max(d.pos + d.len, h - t[1])),
                    c = this.label, e = this.rotation, p = {left: 0, center: .5, right: 1}[d.labelAlign],
                    b = c.getBBox().width, g = d.getSlotWidth(), z = g, q = 1, k, I = {};
                if (e) 0 > e && m - p * b < l ? k = Math.round(m / Math.cos(e * u) - l) : 0 < e && m + p * b > t && (k = Math.round((h - m) / Math.cos(e * u))); else if (h = m + (1 - p) * b, m - p * b < l ? z = a.x + z * (1 - p) - l : h > t && (z = t - a.x + z * p, q = -1), z = Math.min(g, z), z < g && "center" === d.labelAlign && (a.x += q * (g - z - p * (g - Math.min(b, z)))), b > z || d.autoRotation && (c.styles || {}).width) k =
                    z;
                k && (I.width = k, (d.options.labels.style || {}).textOverflow || (I.textOverflow = "ellipsis"), c.css(I))
            }, getPosition: function (a, d, f, h) {
                var t = this.axis, l = t.chart, c = h && l.oldChartHeight || l.chartHeight;
                return {
                    x: a ? t.translate(d + f, null, null, h) + t.transB : t.left + t.offset + (t.opposite ? (h && l.oldChartWidth || l.chartWidth) - t.right - t.left : 0),
                    y: a ? c - t.bottom + t.offset - (t.opposite ? t.height : 0) : c - t.translate(d + f, null, null, h) - t.transB
                }
            }, getLabelPosition: function (a, d, f, h, t, l, c, e) {
                var p = this.axis, b = p.transA, g = p.reversed, m = p.staggerLines,
                    q = p.tickRotCorr || {x: 0, y: 0}, k = t.y;
                C(k) || (k = 0 === p.side ? f.rotation ? -8 : -f.getBBox().height : 2 === p.side ? q.y + 8 : Math.cos(f.rotation * u) * (q.y - f.getBBox(!1, 0).height / 2));
                a = a + t.x + q.x - (l && h ? l * b * (g ? -1 : 1) : 0);
                d = d + k - (l && !h ? l * b * (g ? 1 : -1) : 0);
                m && (f = c / (e || 1) % m, p.opposite && (f = m - f - 1), d += p.labelOffset / m * f);
                return {x: a, y: Math.round(d)}
            }, getMarkPath: function (a, d, f, h, t, l) {
                return l.crispLine(["M", a, d, "L", a + (t ? 0 : -f), d + (t ? f : 0)], h)
            }, renderGridLine: function (a, d, f) {
                var h = this.axis, t = h.options, l = this.gridLine, c = {}, e = this.pos, p = this.type,
                    b = h.tickmarkOffset, g = h.chart.renderer, m = p ? p + "Grid" : "grid", q = t[m + "LineWidth"],
                    k = t[m + "LineColor"], t = t[m + "LineDashStyle"];
                l || (c.stroke = k, c["stroke-width"] = q, t && (c.dashstyle = t), p || (c.zIndex = 1), a && (c.opacity = 0), this.gridLine = l = g.path().attr(c).addClass("highcharts-" + (p ? p + "-" : "") + "grid-line").add(h.gridGroup));
                if (!a && l && (a = h.getPlotLinePath(e + b, l.strokeWidth() * f, a, !0))) l[this.isNew ? "attr" : "animate"]({
                    d: a,
                    opacity: d
                })
            }, renderMark: function (a, d, m) {
                var h = this.axis, t = h.options, l = h.chart.renderer, c = this.type,
                    e = c ? c + "Tick" : "tick", p = h.tickSize(e), b = this.mark, g = !b, z = a.x;
                a = a.y;
                var q = f(t[e + "Width"], !c && h.isXAxis ? 1 : 0), t = t[e + "Color"];
                p && (h.opposite && (p[0] = -p[0]), g && (this.mark = b = l.path().addClass("highcharts-" + (c ? c + "-" : "") + "tick").add(h.axisGroup), b.attr({
                    stroke: t,
                    "stroke-width": q
                })), b[g ? "attr" : "animate"]({
                    d: this.getMarkPath(z, a, p[0], b.strokeWidth() * m, h.horiz, l),
                    opacity: d
                }))
            }, renderLabel: function (a, d, m, h) {
                var t = this.axis, l = t.horiz, c = t.options, e = this.label, p = c.labels, b = p.step,
                    g = t.tickmarkOffset, z = !0, n = a.x;
                a = a.y;
                e && B(n) && (e.xy = a = this.getLabelPosition(n, a, e, l, p, g, h, b), this.isFirst && !this.isLast && !f(c.showFirstLabel, 1) || this.isLast && !this.isFirst && !f(c.showLastLabel, 1) ? z = !1 : !l || t.isRadial || p.step || p.rotation || d || 0 === m || this.handleOverflow(a), b && h % b && (z = !1), z && B(a.y) ? (a.opacity = m, e[this.isNewLabel ? "attr" : "animate"](a), this.isNewLabel = !1) : (e.attr("y", -9999), this.isNewLabel = !0), this.isNew = !1)
            }, render: function (a, d, m) {
                var h = this.axis, t = h.horiz, l = this.getPosition(t, this.pos, h.tickmarkOffset, d), c = l.x,
                    e = l.y, h = t && c ===
                    h.pos + h.len || !t && e === h.pos ? -1 : 1;
                m = f(m, 1);
                this.isActive = !0;
                this.renderGridLine(d, m, h);
                this.renderMark(l, m, h);
                this.renderLabel(l, d, m, a)
            }, destroy: function () {
                A(this, this.axis)
            }
        }
    })(K);
    var S = function (a) {
        var y = a.addEvent, C = a.animObject, A = a.arrayMax, B = a.arrayMin, d = a.color, f = a.correctFloat,
            u = a.defaultOptions, q = a.defined, n = a.deg2rad, m = a.destroyObjectProperties, h = a.each, t = a.extend,
            l = a.fireEvent, c = a.format, e = a.getMagnitude, p = a.grep, b = a.inArray, g = a.isArray, z = a.isNumber,
            G = a.isString, k = a.merge, I = a.normalizeTickInterval,
            E = a.objectEach, D = a.pick, M = a.removeEvent, v = a.splat, F = a.syncTimeout, H = a.Tick,
            J = function () {
                this.init.apply(this, arguments)
            };
        a.extend(J.prototype, {
            defaultOptions: {
                dateTimeLabelFormats: {
                    millisecond: "%H:%M:%S.%L",
                    second: "%H:%M:%S",
                    minute: "%H:%M",
                    hour: "%H:%M",
                    day: "%e. %b",
                    week: "%e. %b",
                    month: "%b '%y",
                    year: "%Y"
                },
                endOnTick: !1,
                labels: {enabled: !0, style: {color: "#666666", cursor: "default", fontSize: "11px"}, x: 0},
                minPadding: .01,
                maxPadding: .01,
                minorTickLength: 2,
                minorTickPosition: "outside",
                startOfWeek: 1,
                startOnTick: !1,
                tickLength: 10,
                tickmarkPlacement: "between",
                tickPixelInterval: 100,
                tickPosition: "outside",
                title: {align: "middle", style: {color: "#666666"}},
                type: "linear",
                minorGridLineColor: "#f2f2f2",
                minorGridLineWidth: 1,
                minorTickColor: "#999999",
                lineColor: "#ccd6eb",
                lineWidth: 1,
                gridLineColor: "#e6e6e6",
                tickColor: "#ccd6eb"
            },
            defaultYAxisOptions: {
                endOnTick: !0,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: {x: -8},
                maxPadding: .05,
                minPadding: .05,
                startOnTick: !0,
                title: {rotation: 270, text: "Values"},
                stackLabels: {
                    enabled: !1, formatter: function () {
                        return a.numberFormat(this.total,
                            -1)
                    }, style: {fontSize: "11px", fontWeight: "bold", color: "#000000", textOutline: "1px contrast"}
                },
                gridLineWidth: 1,
                lineWidth: 0
            },
            defaultLeftAxisOptions: {labels: {x: -15}, title: {rotation: 270}},
            defaultRightAxisOptions: {labels: {x: 15}, title: {rotation: 90}},
            defaultBottomAxisOptions: {labels: {autoRotation: [-45], x: 0}, title: {rotation: 0}},
            defaultTopAxisOptions: {labels: {autoRotation: [-45], x: 0}, title: {rotation: 0}},
            init: function (a, w) {
                var r = w.isX, c = this;
                c.chart = a;
                c.horiz = a.inverted && !c.isZAxis ? !r : r;
                c.isXAxis = r;
                c.coll = c.coll ||
                    (r ? "xAxis" : "yAxis");
                c.opposite = w.opposite;
                c.side = w.side || (c.horiz ? c.opposite ? 0 : 2 : c.opposite ? 1 : 3);
                c.setOptions(w);
                var e = this.options, g = e.type;
                c.labelFormatter = e.labels.formatter || c.defaultLabelFormatter;
                c.userOptions = w;
                c.minPixelPadding = 0;
                c.reversed = e.reversed;
                c.visible = !1 !== e.visible;
                c.zoomEnabled = !1 !== e.zoomEnabled;
                c.hasNames = "category" === g || !0 === e.categories;
                c.categories = e.categories || c.hasNames;
                c.names = c.names || [];
                c.plotLinesAndBandsGroups = {};
                c.isLog = "logarithmic" === g;
                c.isDatetimeAxis = "datetime" ===
                    g;
                c.positiveValuesOnly = c.isLog && !c.allowNegativeLog;
                c.isLinked = q(e.linkedTo);
                c.ticks = {};
                c.labelEdge = [];
                c.minorTicks = {};
                c.plotLinesAndBands = [];
                c.alternateBands = {};
                c.len = 0;
                c.minRange = c.userMinRange = e.minRange || e.maxZoom;
                c.range = e.range;
                c.offset = e.offset || 0;
                c.stacks = {};
                c.oldStacks = {};
                c.stacksTouched = 0;
                c.max = null;
                c.min = null;
                c.crosshair = D(e.crosshair, v(a.options.tooltip.crosshairs)[r ? 0 : 1], !1);
                w = c.options.events;
                -1 === b(c, a.axes) && (r ? a.axes.splice(a.xAxis.length, 0, c) : a.axes.push(c), a[c.coll].push(c));
                c.series =
                    c.series || [];
                a.inverted && !c.isZAxis && r && void 0 === c.reversed && (c.reversed = !0);
                E(w, function (a, b) {
                    y(c, b, a)
                });
                c.lin2log = e.linearToLogConverter || c.lin2log;
                c.isLog && (c.val2lin = c.log2lin, c.lin2val = c.lin2log)
            },
            setOptions: function (a) {
                this.options = k(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], k(u[this.coll], a))
            },
            defaultLabelFormatter: function () {
                var b = this.axis,
                    w = this.value, e = b.categories, g = this.dateTimeLabelFormat, k = u.lang, v = k.numericSymbols,
                    k = k.numericSymbolMagnitude || 1E3, d = v && v.length, h, p = b.options.labels.format,
                    b = b.isLog ? Math.abs(w) : b.tickInterval;
                if (p) h = c(p, this); else if (e) h = w; else if (g) h = a.dateFormat(g, w); else if (d && 1E3 <= b) for (; d-- && void 0 === h;) e = Math.pow(k, d + 1), b >= e && 0 === 10 * w % e && null !== v[d] && 0 !== w && (h = a.numberFormat(w / e, -1) + v[d]);
                void 0 === h && (h = 1E4 <= Math.abs(w) ? a.numberFormat(w, -1) : a.numberFormat(w, -1, void 0, ""));
                return h
            },
            getSeriesExtremes: function () {
                var a =
                    this, b = a.chart;
                a.hasVisibleSeries = !1;
                a.dataMin = a.dataMax = a.threshold = null;
                a.softThreshold = !a.isXAxis;
                a.buildStacks && a.buildStacks();
                h(a.series, function (c) {
                    if (c.visible || !b.options.chart.ignoreHiddenSeries) {
                        var r = c.options, w = r.threshold, e;
                        a.hasVisibleSeries = !0;
                        a.positiveValuesOnly && 0 >= w && (w = null);
                        if (a.isXAxis) r = c.xData, r.length && (c = B(r), z(c) || c instanceof Date || (r = p(r, function (a) {
                            return z(a)
                        }), c = B(r)), a.dataMin = Math.min(D(a.dataMin, r[0]), c), a.dataMax = Math.max(D(a.dataMax, r[0]), A(r))); else if (c.getExtremes(),
                            e = c.dataMax, c = c.dataMin, q(c) && q(e) && (a.dataMin = Math.min(D(a.dataMin, c), c), a.dataMax = Math.max(D(a.dataMax, e), e)), q(w) && (a.threshold = w), !r.softThreshold || a.positiveValuesOnly) a.softThreshold = !1
                    }
                })
            },
            translate: function (a, b, c, e, g, k) {
                var r = this.linkedParent || this, w = 1, v = 0, h = e ? r.oldTransA : r.transA;
                e = e ? r.oldMin : r.min;
                var d = r.minPixelPadding;
                g = (r.isOrdinal || r.isBroken || r.isLog && g) && r.lin2val;
                h || (h = r.transA);
                c && (w *= -1, v = r.len);
                r.reversed && (w *= -1, v -= w * (r.sector || r.len));
                b ? (a = (a * w + v - d) / h + e, g && (a = r.lin2val(a))) :
                    (g && (a = r.val2lin(a)), a = w * (a - e) * h + v + w * d + (z(k) ? h * k : 0));
                return a
            },
            toPixels: function (a, b) {
                return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos)
            },
            toValue: function (a, b) {
                return this.translate(a - (b ? 0 : this.pos), !0, !this.horiz, null, !0)
            },
            getPlotLinePath: function (a, b, c, e, g) {
                var r = this.chart, w = this.left, k = this.top, v, h, d = c && r.oldChartHeight || r.chartHeight,
                    p = c && r.oldChartWidth || r.chartWidth, f;
                v = this.transB;
                var l = function (a, b, c) {
                    if (a < b || a > c) e ? a = Math.min(Math.max(b, a), c) : f = !0;
                    return a
                };
                g = D(g, this.translate(a,
                    null, null, c));
                a = c = Math.round(g + v);
                v = h = Math.round(d - g - v);
                z(g) ? this.horiz ? (v = k, h = d - this.bottom, a = c = l(a, w, w + this.width)) : (a = w, c = p - this.right, v = h = l(v, k, k + this.height)) : f = !0;
                return f && !e ? null : r.renderer.crispLine(["M", a, v, "L", c, h], b || 1)
            },
            getLinearTickPositions: function (a, b, c) {
                var r, w = f(Math.floor(b / a) * a);
                c = f(Math.ceil(c / a) * a);
                var e = [];
                if (this.single) return [b];
                for (b = w; b <= c;) {
                    e.push(b);
                    b = f(b + a);
                    if (b === r) break;
                    r = b
                }
                return e
            },
            getMinorTickPositions: function () {
                var a = this, b = a.options, c = a.tickPositions, e = a.minorTickInterval,
                    g = [], k = a.pointRangePadding || 0, v = a.min - k, k = a.max + k, d = k - v;
                if (d && d / e < a.len / 3) if (a.isLog) h(this.paddedTicks, function (b, c, r) {
                    c && g.push.apply(g, a.getLogTickPositions(e, r[c - 1], r[c], !0))
                }); else if (a.isDatetimeAxis && "auto" === b.minorTickInterval) g = g.concat(a.getTimeTicks(a.normalizeTimeTickInterval(e), v, k, b.startOfWeek)); else for (b = v + (c[0] - v) % e; b <= k && b !== g[0]; b += e) g.push(b);
                0 !== g.length && a.trimTicks(g);
                return g
            },
            adjustForMinRange: function () {
                var a = this.options, b = this.min, c = this.max, e, g, k, v, d, p, f, l;
                this.isXAxis &&
                void 0 === this.minRange && !this.isLog && (q(a.min) || q(a.max) ? this.minRange = null : (h(this.series, function (a) {
                    p = a.xData;
                    for (v = f = a.xIncrement ? 1 : p.length - 1; 0 < v; v--) if (d = p[v] - p[v - 1], void 0 === k || d < k) k = d
                }), this.minRange = Math.min(5 * k, this.dataMax - this.dataMin)));
                c - b < this.minRange && (g = this.dataMax - this.dataMin >= this.minRange, l = this.minRange, e = (l - c + b) / 2, e = [b - e, D(a.min, b - e)], g && (e[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin), b = A(e), c = [b + l, D(a.max, b + l)], g && (c[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax),
                    c = B(c), c - b < l && (e[0] = c - l, e[1] = D(a.min, c - l), b = A(e)));
                this.min = b;
                this.max = c
            },
            getClosest: function () {
                var a;
                this.categories ? a = 1 : h(this.series, function (b) {
                    var c = b.closestPointRange, r = b.visible || !b.chart.options.chart.ignoreHiddenSeries;
                    !b.noSharedTooltip && q(c) && r && (a = q(a) ? Math.min(a, c) : c)
                });
                return a
            },
            nameToX: function (a) {
                var c = g(this.categories), r = c ? this.categories : this.names, e = a.options.x, k;
                a.series.requireSorting = !1;
                q(e) || (e = !1 === this.options.uniqueNames ? a.series.autoIncrement() : b(a.name, r));
                -1 === e ? c ||
                    (k = r.length) : k = e;
                void 0 !== k && (this.names[k] = a.name);
                return k
            },
            updateNames: function () {
                var a = this;
                0 < this.names.length && (this.names.length = 0, this.minRange = this.userMinRange, h(this.series || [], function (b) {
                    b.xIncrement = null;
                    if (!b.points || b.isDirtyData) b.processData(), b.generatePoints();
                    h(b.points, function (c, r) {
                        var e;
                        c.options && (e = a.nameToX(c), void 0 !== e && e !== c.x && (c.x = e, b.xData[r] = e))
                    })
                }))
            },
            setAxisTranslation: function (a) {
                var b = this, c = b.max - b.min, e = b.axisPointRange || 0, r, g = 0, k = 0, v = b.linkedParent,
                    d = !!b.categories,
                    p = b.transA, f = b.isXAxis;
                if (f || d || e) r = b.getClosest(), v ? (g = v.minPointOffset, k = v.pointRangePadding) : h(b.series, function (a) {
                    var c = d ? 1 : f ? D(a.options.pointRange, r, 0) : b.axisPointRange || 0;
                    a = a.options.pointPlacement;
                    e = Math.max(e, c);
                    b.single || (g = Math.max(g, G(a) ? 0 : c / 2), k = Math.max(k, "on" === a ? 0 : c))
                }), v = b.ordinalSlope && r ? b.ordinalSlope / r : 1, b.minPointOffset = g *= v, b.pointRangePadding = k *= v, b.pointRange = Math.min(e, c), f && (b.closestPointRange = r);
                a && (b.oldTransA = p);
                b.translationSlope = b.transA = p = b.options.staticScale || b.len /
                    (c + k || 1);
                b.transB = b.horiz ? b.left : b.bottom;
                b.minPixelPadding = p * g
            },
            minFromRange: function () {
                return this.max - this.range
            },
            setTickInterval: function (b) {
                var c = this, r = c.chart, g = c.options, k = c.isLog, v = c.log2lin, d = c.isDatetimeAxis,
                    p = c.isXAxis, t = c.isLinked, F = g.maxPadding, H = g.minPadding, m = g.tickInterval,
                    E = g.tickPixelInterval, n = c.categories, G = c.threshold, u = c.softThreshold, J, M, B, A;
                d || n || t || this.getTickAmount();
                B = D(c.userMin, g.min);
                A = D(c.userMax, g.max);
                t ? (c.linkedParent = r[c.coll][g.linkedTo], r = c.linkedParent.getExtremes(),
                    c.min = D(r.min, r.dataMin), c.max = D(r.max, r.dataMax), g.type !== c.linkedParent.options.type && a.error(11, 1)) : (!u && q(G) && (c.dataMin >= G ? (J = G, H = 0) : c.dataMax <= G && (M = G, F = 0)), c.min = D(B, J, c.dataMin), c.max = D(A, M, c.dataMax));
                k && (c.positiveValuesOnly && !b && 0 >= Math.min(c.min, D(c.dataMin, c.min)) && a.error(10, 1), c.min = f(v(c.min), 15), c.max = f(v(c.max), 15));
                c.range && q(c.max) && (c.userMin = c.min = B = Math.max(c.min, c.minFromRange()), c.userMax = A = c.max, c.range = null);
                l(c, "foundExtremes");
                c.beforePadding && c.beforePadding();
                c.adjustForMinRange();
                !(n || c.axisPointRange || c.usePercentage || t) && q(c.min) && q(c.max) && (v = c.max - c.min) && (!q(B) && H && (c.min -= v * H), !q(A) && F && (c.max += v * F));
                z(g.softMin) && (c.min = Math.min(c.min, g.softMin));
                z(g.softMax) && (c.max = Math.max(c.max, g.softMax));
                z(g.floor) && (c.min = Math.max(c.min, g.floor));
                z(g.ceiling) && (c.max = Math.min(c.max, g.ceiling));
                u && q(c.dataMin) && (G = G || 0, !q(B) && c.min < G && c.dataMin >= G ? c.min = G : !q(A) && c.max > G && c.dataMax <= G && (c.max = G));
                c.tickInterval = c.min === c.max || void 0 === c.min || void 0 === c.max ? 1 : t && !m && E === c.linkedParent.options.tickPixelInterval ?
                    m = c.linkedParent.tickInterval : D(m, this.tickAmount ? (c.max - c.min) / Math.max(this.tickAmount - 1, 1) : void 0, n ? 1 : (c.max - c.min) * E / Math.max(c.len, E));
                p && !b && h(c.series, function (a) {
                    a.processData(c.min !== c.oldMin || c.max !== c.oldMax)
                });
                c.setAxisTranslation(!0);
                c.beforeSetTickPositions && c.beforeSetTickPositions();
                c.postProcessTickInterval && (c.tickInterval = c.postProcessTickInterval(c.tickInterval));
                c.pointRange && !m && (c.tickInterval = Math.max(c.pointRange, c.tickInterval));
                b = D(g.minTickInterval, c.isDatetimeAxis && c.closestPointRange);
                !m && c.tickInterval < b && (c.tickInterval = b);
                d || k || m || (c.tickInterval = I(c.tickInterval, null, e(c.tickInterval), D(g.allowDecimals, !(.5 < c.tickInterval && 5 > c.tickInterval && 1E3 < c.max && 9999 > c.max)), !!this.tickAmount));
                this.tickAmount || (c.tickInterval = c.unsquish());
                this.setTickPositions()
            },
            setTickPositions: function () {
                var a = this.options, b, c = a.tickPositions, e = a.tickPositioner, g = a.startOnTick, k = a.endOnTick;
                this.tickmarkOffset = this.categories && "between" === a.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
                this.minorTickInterval =
                    "auto" === a.minorTickInterval && this.tickInterval ? this.tickInterval / 5 : a.minorTickInterval;
                this.single = this.min === this.max && q(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== a.allowDecimals);
                this.tickPositions = b = c && c.slice();
                !b && (b = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, a.units), this.min, this.max, a.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval,
                    this.min, this.max), b.length > this.len && (b = [b[0], b.pop()]), this.tickPositions = b, e && (e = e.apply(this, [this.min, this.max]))) && (this.tickPositions = b = e);
                this.paddedTicks = b.slice(0);
                this.trimTicks(b, g, k);
                this.isLinked || (this.single && (this.min -= .5, this.max += .5), c || e || this.adjustTickAmount())
            },
            trimTicks: function (a, b, c) {
                var e = a[0], r = a[a.length - 1], g = this.minPointOffset || 0;
                if (!this.isLinked) {
                    if (b && -Infinity !== e) this.min = e; else for (; this.min - g > a[0];) a.shift();
                    if (c) this.max = r; else for (; this.max + g < a[a.length - 1];) a.pop();
                    0 === a.length && q(e) && a.push((r + e) / 2)
                }
            },
            alignToOthers: function () {
                var a = {}, b, c = this.options;
                !1 === this.chart.options.chart.alignTicks || !1 === c.alignTicks || this.isLog || h(this.chart[this.coll], function (c) {
                    var e = c.options, e = [c.horiz ? e.left : e.top, e.width, e.height, e.pane].join();
                    c.series.length && (a[e] ? b = !0 : a[e] = 1)
                });
                return b
            },
            getTickAmount: function () {
                var a = this.options, b = a.tickAmount, c = a.tickPixelInterval;
                !q(a.tickInterval) && this.len < c && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (b = 2);
                !b && this.alignToOthers() &&
                (b = Math.ceil(this.len / c) + 1);
                4 > b && (this.finalTickAmt = b, b = 5);
                this.tickAmount = b
            },
            adjustTickAmount: function () {
                var a = this.tickInterval, b = this.tickPositions, c = this.tickAmount, e = this.finalTickAmt,
                    g = b && b.length;
                if (g < c) {
                    for (; b.length < c;) b.push(f(b[b.length - 1] + a));
                    this.transA *= (g - 1) / (c - 1);
                    this.max = b[b.length - 1]
                } else g > c && (this.tickInterval *= 2, this.setTickPositions());
                if (q(e)) {
                    for (a = c = b.length; a--;) (3 === e && 1 === a % 2 || 2 >= e && 0 < a && a < c - 1) && b.splice(a, 1);
                    this.finalTickAmt = void 0
                }
            },
            setScale: function () {
                var a, b;
                this.oldMin =
                    this.min;
                this.oldMax = this.max;
                this.oldAxisLength = this.len;
                this.setAxisSize();
                b = this.len !== this.oldAxisLength;
                h(this.series, function (b) {
                    if (b.isDirtyData || b.isDirty || b.xAxis.isDirty) a = !0
                });
                b || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty =
                    b || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks()
            },
            setExtremes: function (a, b, c, e, g) {
                var r = this, k = r.chart;
                c = D(c, !0);
                h(r.series, function (a) {
                    delete a.kdTree
                });
                g = t(g, {min: a, max: b});
                l(r, "setExtremes", g, function () {
                    r.userMin = a;
                    r.userMax = b;
                    r.eventArgs = g;
                    c && k.redraw(e)
                })
            },
            zoom: function (a, b) {
                var c = this.dataMin, e = this.dataMax, g = this.options, r = Math.min(c, D(g.min, c)),
                    g = Math.max(e, D(g.max, e));
                if (a !== this.min || b !== this.max) this.allowZoomOutside || (q(c) && (a < r && (a = r), a > g && (a = g)),
                q(e) && (b < r && (b = r), b > g && (b = g))), this.displayBtn = void 0 !== a || void 0 !== b, this.setExtremes(a, b, !1, void 0, {trigger: "zoom"});
                return !0
            },
            setAxisSize: function () {
                var a = this.chart, b = this.options, c = b.offsets || [0, 0, 0, 0], e = this.horiz,
                    g = D(b.width, a.plotWidth - c[3] + c[1]), k = D(b.height, a.plotHeight - c[0] + c[2]),
                    v = D(b.top, a.plotTop + c[0]), b = D(b.left, a.plotLeft + c[3]), c = /%$/;
                c.test(k) && (k = Math.round(parseFloat(k) / 100 * a.plotHeight));
                c.test(v) && (v = Math.round(parseFloat(v) / 100 * a.plotHeight + a.plotTop));
                this.left = b;
                this.top = v;
                this.width = g;
                this.height = k;
                this.bottom = a.chartHeight - k - v;
                this.right = a.chartWidth - g - b;
                this.len = Math.max(e ? g : k, 0);
                this.pos = e ? b : v
            },
            getExtremes: function () {
                var a = this.isLog, b = this.lin2log;
                return {
                    min: a ? f(b(this.min)) : this.min,
                    max: a ? f(b(this.max)) : this.max,
                    dataMin: this.dataMin,
                    dataMax: this.dataMax,
                    userMin: this.userMin,
                    userMax: this.userMax
                }
            },
            getThreshold: function (a) {
                var b = this.isLog, c = this.lin2log, e = b ? c(this.min) : this.min, b = b ? c(this.max) : this.max;
                null === a ? a = e : e > a ? a = e : b < a && (a = b);
                return this.translate(a, 0,
                    1, 0, 1)
            },
            autoLabelAlign: function (a) {
                a = (D(a, 0) - 90 * this.side + 720) % 360;
                return 15 < a && 165 > a ? "right" : 195 < a && 345 > a ? "left" : "center"
            },
            tickSize: function (a) {
                var b = this.options, c = b[a + "Length"], e = D(b[a + "Width"], "tick" === a && this.isXAxis ? 1 : 0);
                if (e && c) return "inside" === b[a + "Position"] && (c = -c), [c, e]
            },
            labelMetrics: function () {
                var a = this.tickPositions && this.tickPositions[0] || 0;
                return this.chart.renderer.fontMetrics(this.options.labels.style && this.options.labels.style.fontSize, this.ticks[a] && this.ticks[a].label)
            },
            unsquish: function () {
                var a =
                        this.options.labels, b = this.horiz, c = this.tickInterval, e = c,
                    g = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / c), k, v = a.rotation,
                    d = this.labelMetrics(), p, f = Number.MAX_VALUE, l, t = function (a) {
                        a /= g || 1;
                        a = 1 < a ? Math.ceil(a) : 1;
                        return a * c
                    };
                b ? (l = !a.staggerLines && !a.step && (q(v) ? [v] : g < D(a.autoRotationLimit, 80) && a.autoRotation)) && h(l, function (a) {
                    var b;
                    if (a === v || a && -90 <= a && 90 >= a) p = t(Math.abs(d.h / Math.sin(n * a))), b = p + Math.abs(a / 360), b < f && (f = b, k = a, e = p)
                }) : a.step || (e = t(d.h));
                this.autoRotation = l;
                this.labelRotation = D(k,
                    v);
                return e
            },
            getSlotWidth: function () {
                var a = this.chart, b = this.horiz, c = this.options.labels,
                    e = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1), g = a.margin[3];
                return b && 2 > (c.step || 0) && !c.rotation && (this.staggerLines || 1) * this.len / e || !b && (g && g - a.spacing[3] || .33 * a.chartWidth)
            },
            renderUnsquish: function () {
                var a = this.chart, b = a.renderer, c = this.tickPositions, e = this.ticks, g = this.options.labels,
                    v = this.horiz, d = this.getSlotWidth(), p = Math.max(1, Math.round(d - 2 * (g.padding || 5))),
                    f = {}, l = this.labelMetrics(), t =
                    g.style && g.style.textOverflow, F, m = 0, H, E;
                G(g.rotation) || (f.rotation = g.rotation || 0);
                h(c, function (a) {
                    (a = e[a]) && a.labelLength > m && (m = a.labelLength)
                });
                this.maxLabelLength = m;
                if (this.autoRotation) m > p && m > l.h ? f.rotation = this.labelRotation : this.labelRotation = 0; else if (d && (F = {width: p + "px"}, !t)) for (F.textOverflow = "clip", H = c.length; !v && H--;) if (E = c[H], p = e[E].label) p.styles && "ellipsis" === p.styles.textOverflow ? p.css({textOverflow: "clip"}) : e[E].labelLength > d && p.css({width: d + "px"}), p.getBBox().height > this.len / c.length -
                (l.h - l.f) && (p.specCss = {textOverflow: "ellipsis"});
                f.rotation && (F = {width: (m > .5 * a.chartHeight ? .33 * a.chartHeight : a.chartHeight) + "px"}, t || (F.textOverflow = "ellipsis"));
                if (this.labelAlign = g.align || this.autoLabelAlign(this.labelRotation)) f.align = this.labelAlign;
                h(c, function (a) {
                    var b = (a = e[a]) && a.label;
                    b && (b.attr(f), F && b.css(k(F, b.specCss)), delete b.specCss, a.rotation = f.rotation)
                });
                this.tickRotCorr = b.rotCorr(l.b, this.labelRotation || 0, 0 !== this.side)
            },
            hasData: function () {
                return this.hasVisibleSeries || q(this.min) &&
                    q(this.max) && !!this.tickPositions
            },
            addTitle: function (a) {
                var b = this.chart.renderer, c = this.horiz, e = this.opposite, g = this.options.title, r;
                this.axisTitle || ((r = g.textAlign) || (r = (c ? {
                    low: "left",
                    middle: "center",
                    high: "right"
                } : {
                    low: e ? "right" : "left",
                    middle: "center",
                    high: e ? "left" : "right"
                })[g.align]), this.axisTitle = b.text(g.text, 0, 0, g.useHTML).attr({
                    zIndex: 7,
                    rotation: g.rotation || 0,
                    align: r
                }).addClass("highcharts-axis-title").css(g.style).add(this.axisGroup), this.axisTitle.isNew = !0);
                this.axisTitle[a ? "show" : "hide"](!0)
            },
            generateTick: function (a) {
                var b = this.ticks;
                b[a] ? b[a].addLabel() : b[a] = new H(this, a)
            },
            getOffset: function () {
                var a = this, b = a.chart, c = b.renderer, e = a.options, g = a.tickPositions, k = a.ticks, v = a.horiz,
                    d = a.side, p = b.inverted && !a.isZAxis ? [1, 0, 3, 2][d] : d, f, l, t = 0, F, m = 0, H = e.title,
                    z = e.labels, G = 0, n = b.axisOffset, b = b.clipOffset, I = [-1, 1, 1, -1][d], u = e.className,
                    J = a.axisParent, M = this.tickSize("tick");
                f = a.hasData();
                a.showAxis = l = f || D(e.showEmpty, !0);
                a.staggerLines = a.horiz && z.staggerLines;
                a.axisGroup || (a.gridGroup = c.g("grid").attr({
                    zIndex: e.gridZIndex ||
                        1
                }).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (u || "")).add(J), a.axisGroup = c.g("axis").attr({zIndex: e.zIndex || 2}).addClass("highcharts-" + this.coll.toLowerCase() + " " + (u || "")).add(J), a.labelGroup = c.g("axis-labels").attr({zIndex: z.zIndex || 7}).addClass("highcharts-" + a.coll.toLowerCase() + "-labels " + (u || "")).add(J));
                f || a.isLinked ? (h(g, function (b, c) {
                    a.generateTick(b, c)
                }), a.renderUnsquish(), !1 === z.reserveSpace || 0 !== d && 2 !== d && {
                    1: "left",
                    3: "right"
                }[d] !== a.labelAlign && "center" !== a.labelAlign || h(g,
                    function (a) {
                        G = Math.max(k[a].getLabelSize(), G)
                    }), a.staggerLines && (G *= a.staggerLines, a.labelOffset = G * (a.opposite ? -1 : 1))) : E(k, function (a, b) {
                    a.destroy();
                    delete k[b]
                });
                H && H.text && !1 !== H.enabled && (a.addTitle(l), l && !1 !== H.reserveSpace && (a.titleOffset = t = a.axisTitle.getBBox()[v ? "height" : "width"], F = H.offset, m = q(F) ? 0 : D(H.margin, v ? 5 : 10)));
                a.renderLine();
                a.offset = I * D(e.offset, n[d]);
                a.tickRotCorr = a.tickRotCorr || {x: 0, y: 0};
                c = 0 === d ? -a.labelMetrics().h : 2 === d ? a.tickRotCorr.y : 0;
                m = Math.abs(G) + m;
                G && (m = m - c + I * (v ? D(z.y, a.tickRotCorr.y +
                    8 * I) : z.x));
                a.axisTitleMargin = D(F, m);
                n[d] = Math.max(n[d], a.axisTitleMargin + t + I * a.offset, m, f && g.length && M ? M[0] + I * a.offset : 0);
                g = 2 * Math.floor(a.axisLine.strokeWidth() / 2);
                0 < e.offset && (g -= 2 * e.offset);
                b[p] = Math.max(b[p] || g, g)
            },
            getLinePath: function (a) {
                var b = this.chart, c = this.opposite, e = this.offset, g = this.horiz,
                    r = this.left + (c ? this.width : 0) + e,
                    e = b.chartHeight - this.bottom - (c ? this.height : 0) + e;
                c && (a *= -1);
                return b.renderer.crispLine(["M", g ? this.left : r, g ? e : this.top, "L", g ? b.chartWidth - this.right : r, g ? e : b.chartHeight -
                    this.bottom], a)
            },
            renderLine: function () {
                this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.axisLine.attr({
                    stroke: this.options.lineColor,
                    "stroke-width": this.options.lineWidth,
                    zIndex: 7
                }))
            },
            getTitlePosition: function () {
                var a = this.horiz, b = this.left, c = this.top, e = this.len, g = this.options.title, k = a ? b : c,
                    v = this.opposite, d = this.offset, h = g.x || 0, p = g.y || 0,
                    f = this.chart.renderer.fontMetrics(g.style && g.style.fontSize, this.axisTitle).f, e = {
                        low: k + (a ? 0 : e),
                        middle: k + e / 2, high: k + (a ? e : 0)
                    }[g.align],
                    b = (a ? c + this.height : b) + (a ? 1 : -1) * (v ? -1 : 1) * this.axisTitleMargin + (2 === this.side ? f : 0);
                return {
                    x: a ? e + h : b + (v ? this.width : 0) + d + h,
                    y: a ? b + p - (v ? this.height : 0) + d : e + p
                }
            },
            renderMinorTick: function (a) {
                var b = this.chart.hasRendered && z(this.oldMin), c = this.minorTicks;
                c[a] || (c[a] = new H(this, a, "minor"));
                b && c[a].isNew && c[a].render(null, !0);
                c[a].render(null, !1, 1)
            },
            renderTick: function (a, b) {
                var c = this.isLinked, e = this.ticks, g = this.chart.hasRendered && z(this.oldMin);
                if (!c || a >= this.min && a <= this.max) e[a] ||
                (e[a] = new H(this, a)), g && e[a].isNew && e[a].render(b, !0, .1), e[a].render(b)
            },
            render: function () {
                var b = this, c = b.chart, e = b.options, g = b.isLog, k = b.lin2log, v = b.isLinked,
                    d = b.tickPositions, p = b.axisTitle, f = b.ticks, l = b.minorTicks, t = b.alternateBands,
                    m = e.stackLabels, D = e.alternateGridColor, G = b.tickmarkOffset, n = b.axisLine, q = b.showAxis,
                    I = C(c.renderer.globalAnimation), u, J;
                b.labelEdge.length = 0;
                b.overlap = !1;
                h([f, l, t], function (a) {
                    E(a, function (a) {
                        a.isActive = !1
                    })
                });
                if (b.hasData() || v) b.minorTickInterval && !b.categories && h(b.getMinorTickPositions(),
                    function (a) {
                        b.renderMinorTick(a)
                    }), d.length && (h(d, function (a, c) {
                    b.renderTick(a, c)
                }), G && (0 === b.min || b.single) && (f[-1] || (f[-1] = new H(b, -1, null, !0)), f[-1].render(-1))), D && h(d, function (e, v) {
                    J = void 0 !== d[v + 1] ? d[v + 1] + G : b.max - G;
                    0 === v % 2 && e < b.max && J <= b.max + (c.polar ? -G : G) && (t[e] || (t[e] = new a.PlotLineOrBand(b)), u = e + G, t[e].options = {
                        from: g ? k(u) : u,
                        to: g ? k(J) : J,
                        color: D
                    }, t[e].render(), t[e].isActive = !0)
                }), b._addedPlotLB || (h((e.plotLines || []).concat(e.plotBands || []), function (a) {
                    b.addPlotBandOrLine(a)
                }), b._addedPlotLB =
                    !0);
                h([f, l, t], function (a) {
                    var b, e = [], g = I.duration;
                    E(a, function (a, b) {
                        a.isActive || (a.render(b, !1, 0), a.isActive = !1, e.push(b))
                    });
                    F(function () {
                        for (b = e.length; b--;) a[e[b]] && !a[e[b]].isActive && (a[e[b]].destroy(), delete a[e[b]])
                    }, a !== t && c.hasRendered && g ? g : 0)
                });
                n && (n[n.isPlaced ? "animate" : "attr"]({d: this.getLinePath(n.strokeWidth())}), n.isPlaced = !0, n[q ? "show" : "hide"](!0));
                p && q && (e = b.getTitlePosition(), z(e.y) ? (p[p.isNew ? "attr" : "animate"](e), p.isNew = !1) : (p.attr("y", -9999), p.isNew = !0));
                m && m.enabled && b.renderStackTotals();
                b.isDirty = !1
            },
            redraw: function () {
                this.visible && (this.render(), h(this.plotLinesAndBands, function (a) {
                    a.render()
                }));
                h(this.series, function (a) {
                    a.isDirty = !0
                })
            },
            keepProps: "extKey hcEvents names series userMax userMin".split(" "),
            destroy: function (a) {
                var c = this, e = c.stacks, g = c.plotLinesAndBands, k;
                a || M(c);
                E(e, function (a, b) {
                    m(a);
                    e[b] = null
                });
                h([c.ticks, c.minorTicks, c.alternateBands], function (a) {
                    m(a)
                });
                if (g) for (a = g.length; a--;) g[a].destroy();
                h("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "),
                    function (a) {
                        c[a] && (c[a] = c[a].destroy())
                    });
                for (k in c.plotLinesAndBandsGroups) c.plotLinesAndBandsGroups[k] = c.plotLinesAndBandsGroups[k].destroy();
                E(c, function (a, e) {
                    -1 === b(e, c.keepProps) && delete c[e]
                })
            },
            drawCrosshair: function (a, b) {
                var c, e = this.crosshair, g = D(e.snap, !0), k, v = this.cross;
                a || (a = this.cross && this.cross.e);
                this.crosshair && !1 !== (q(b) || !g) ? (g ? q(b) && (k = this.isXAxis ? b.plotX : this.len - b.plotY) : k = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos), q(k) && (c = this.getPlotLinePath(b && (this.isXAxis ?
                    b.x : D(b.stackY, b.y)), null, null, null, k) || null), q(c) ? (b = this.categories && !this.isRadial, v || (this.cross = v = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (b ? "category " : "thin ") + e.className).attr({zIndex: D(e.zIndex, 2)}).add(), v.attr({
                        stroke: e.color || (b ? d("#ccd6eb").setOpacity(.25).get() : "#cccccc"),
                        "stroke-width": D(e.width, 1)
                    }), e.dashStyle && v.attr({dashstyle: e.dashStyle})), v.show().attr({d: c}), b && !e.width && v.attr({"stroke-width": this.transA}), this.cross.e = a) : this.hideCrosshair()) :
                    this.hideCrosshair()
            },
            hideCrosshair: function () {
                this.cross && this.cross.hide()
            }
        });
        return a.Axis = J
    }(K);
    (function (a) {
        var y = a.Axis, C = a.getMagnitude, A = a.map, B = a.normalizeTickInterval, d = a.pick;
        y.prototype.getLogTickPositions = function (a, u, q, n) {
            var f = this.options, h = this.len, t = this.lin2log, l = this.log2lin, c = [];
            n || (this._minorAutoInterval = null);
            if (.5 <= a) a = Math.round(a), c = this.getLinearTickPositions(a, u, q); else if (.08 <= a) for (var h = Math.floor(u), e, p, b, g, z, f = .3 < a ? [1, 2, 4] : .15 < a ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; h <
            q + 1 && !z; h++) for (p = f.length, e = 0; e < p && !z; e++) b = l(t(h) * f[e]), b > u && (!n || g <= q) && void 0 !== g && c.push(g), g > q && (z = !0), g = b; else u = t(u), q = t(q), a = f[n ? "minorTickInterval" : "tickInterval"], a = d("auto" === a ? null : a, this._minorAutoInterval, f.tickPixelInterval / (n ? 5 : 1) * (q - u) / ((n ? h / this.tickPositions.length : h) || 1)), a = B(a, null, C(a)), c = A(this.getLinearTickPositions(a, u, q), l), n || (this._minorAutoInterval = a / 5);
            n || (this.tickInterval = a);
            return c
        };
        y.prototype.log2lin = function (a) {
            return Math.log(a) / Math.LN10
        };
        y.prototype.lin2log =
            function (a) {
                return Math.pow(10, a)
            }
    })(K);
    (function (a, y) {
        var C = a.arrayMax, A = a.arrayMin, B = a.defined, d = a.destroyObjectProperties, f = a.each, u = a.erase,
            q = a.merge, n = a.pick;
        a.PlotLineOrBand = function (a, d) {
            this.axis = a;
            d && (this.options = d, this.id = d.id)
        };
        a.PlotLineOrBand.prototype = {
            render: function () {
                var d = this, h = d.axis, f = h.horiz, l = d.options, c = l.label, e = d.label, p = l.to, b = l.from,
                    g = l.value, z = B(b) && B(p), G = B(g), k = d.svgElem, I = !k, E = [], D = l.color,
                    u = n(l.zIndex, 0), v = l.events, E = {
                        "class": "highcharts-plot-" + (z ? "band " : "line ") +
                            (l.className || "")
                    }, F = {}, H = h.chart.renderer, J = z ? "bands" : "lines", r = h.log2lin;
                h.isLog && (b = r(b), p = r(p), g = r(g));
                G ? (E = {
                    stroke: D,
                    "stroke-width": l.width
                }, l.dashStyle && (E.dashstyle = l.dashStyle)) : z && (D && (E.fill = D), l.borderWidth && (E.stroke = l.borderColor, E["stroke-width"] = l.borderWidth));
                F.zIndex = u;
                J += "-" + u;
                (D = h.plotLinesAndBandsGroups[J]) || (h.plotLinesAndBandsGroups[J] = D = H.g("plot-" + J).attr(F).add());
                I && (d.svgElem = k = H.path().attr(E).add(D));
                if (G) E = h.getPlotLinePath(g, k.strokeWidth()); else if (z) E = h.getPlotBandPath(b,
                    p, l); else return;
                I && E && E.length ? (k.attr({d: E}), v && a.objectEach(v, function (a, b) {
                    k.on(b, function (a) {
                        v[b].apply(d, [a])
                    })
                })) : k && (E ? (k.show(), k.animate({d: E})) : (k.hide(), e && (d.label = e = e.destroy())));
                c && B(c.text) && E && E.length && 0 < h.width && 0 < h.height && !E.flat ? (c = q({
                    align: f && z && "center",
                    x: f ? !z && 4 : 10,
                    verticalAlign: !f && z && "middle",
                    y: f ? z ? 16 : 10 : z ? 6 : -4,
                    rotation: f && !z && 90
                }, c), this.renderLabel(c, E, z, u)) : e && e.hide();
                return d
            }, renderLabel: function (a, d, f, l) {
                var c = this.label, e = this.axis.chart.renderer;
                c || (c = {
                    align: a.textAlign ||
                        a.align,
                    rotation: a.rotation,
                    "class": "highcharts-plot-" + (f ? "band" : "line") + "-label " + (a.className || "")
                }, c.zIndex = l, this.label = c = e.text(a.text, 0, 0, a.useHTML).attr(c).add(), c.css(a.style));
                l = [d[1], d[4], f ? d[6] : d[1]];
                d = [d[2], d[5], f ? d[7] : d[2]];
                f = A(l);
                e = A(d);
                c.align(a, !1, {x: f, y: e, width: C(l) - f, height: C(d) - e});
                c.show()
            }, destroy: function () {
                u(this.axis.plotLinesAndBands, this);
                delete this.axis;
                d(this)
            }
        };
        a.extend(y.prototype, {
            getPlotBandPath: function (a, d) {
                var h = this.getPlotLinePath(d, null, null, !0), f = this.getPlotLinePath(a,
                    null, null, !0), c = this.horiz, e = 1;
                a = a < this.min && d < this.min || a > this.max && d > this.max;
                f && h ? (a && (f.flat = f.toString() === h.toString(), e = 0), f.push(c && h[4] === f[4] ? h[4] + e : h[4], c || h[5] !== f[5] ? h[5] : h[5] + e, c && h[1] === f[1] ? h[1] + e : h[1], c || h[2] !== f[2] ? h[2] : h[2] + e)) : f = null;
                return f
            }, addPlotBand: function (a) {
                return this.addPlotBandOrLine(a, "plotBands")
            }, addPlotLine: function (a) {
                return this.addPlotBandOrLine(a, "plotLines")
            }, addPlotBandOrLine: function (d, h) {
                var f = (new a.PlotLineOrBand(this, d)).render(), l = this.userOptions;
                f && (h && (l[h] = l[h] || [], l[h].push(d)), this.plotLinesAndBands.push(f));
                return f
            }, removePlotBandOrLine: function (a) {
                for (var d = this.plotLinesAndBands, t = this.options, l = this.userOptions, c = d.length; c--;) d[c].id === a && d[c].destroy();
                f([t.plotLines || [], l.plotLines || [], t.plotBands || [], l.plotBands || []], function (e) {
                    for (c = e.length; c--;) e[c].id === a && u(e, e[c])
                })
            }, removePlotBand: function (a) {
                this.removePlotBandOrLine(a)
            }, removePlotLine: function (a) {
                this.removePlotBandOrLine(a)
            }
        })
    })(K, S);
    (function (a) {
        var y = a.dateFormat,
            C = a.each, A = a.extend, B = a.format, d = a.isNumber, f = a.map, u = a.merge, q = a.pick, n = a.splat,
            m = a.syncTimeout, h = a.timeUnits;
        a.Tooltip = function () {
            this.init.apply(this, arguments)
        };
        a.Tooltip.prototype = {
            init: function (a, d) {
                this.chart = a;
                this.options = d;
                this.crosshairs = [];
                this.now = {x: 0, y: 0};
                this.isHidden = !0;
                this.split = d.split && !a.inverted;
                this.shared = d.shared || this.split
            }, cleanSplit: function (a) {
                C(this.chart.series, function (d) {
                    var c = d && d.tt;
                    c && (!c.isActive || a ? d.tt = c.destroy() : c.isActive = !1)
                })
            }, getLabel: function () {
                var a =
                    this.chart.renderer, d = this.options;
                this.label || (this.split ? this.label = a.g("tooltip") : (this.label = a.label("", 0, 0, d.shape || "callout", null, null, d.useHTML, null, "tooltip").attr({
                    padding: d.padding,
                    r: d.borderRadius
                }), this.label.attr({
                    fill: d.backgroundColor,
                    "stroke-width": d.borderWidth
                }).css(d.style).shadow(d.shadow)), this.label.attr({zIndex: 8}).add());
                return this.label
            }, update: function (a) {
                this.destroy();
                u(!0, this.chart.options.tooltip.userOptions, a);
                this.init(this.chart, u(!0, this.options, a))
            }, destroy: function () {
                this.label &&
                (this.label = this.label.destroy());
                this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy());
                clearTimeout(this.hideTimer);
                clearTimeout(this.tooltipTimeout)
            }, move: function (a, d, c, e) {
                var p = this, b = p.now,
                    g = !1 !== p.options.animation && !p.isHidden && (1 < Math.abs(a - b.x) || 1 < Math.abs(d - b.y)),
                    h = p.followPointer || 1 < p.len;
                A(b, {
                    x: g ? (2 * b.x + a) / 3 : a,
                    y: g ? (b.y + d) / 2 : d,
                    anchorX: h ? void 0 : g ? (2 * b.anchorX + c) / 3 : c,
                    anchorY: h ? void 0 : g ? (b.anchorY + e) / 2 : e
                });
                p.getLabel().attr(b);
                g && (clearTimeout(this.tooltipTimeout),
                    this.tooltipTimeout = setTimeout(function () {
                        p && p.move(a, d, c, e)
                    }, 32))
            }, hide: function (a) {
                var d = this;
                clearTimeout(this.hideTimer);
                a = q(a, this.options.hideDelay, 500);
                this.isHidden || (this.hideTimer = m(function () {
                    d.getLabel()[a ? "fadeOut" : "hide"]();
                    d.isHidden = !0
                }, a))
            }, getAnchor: function (a, d) {
                var c, e = this.chart, h = e.inverted, b = e.plotTop, g = e.plotLeft, l = 0, t = 0, k, m;
                a = n(a);
                c = a[0].tooltipPos;
                this.followPointer && d && (void 0 === d.chartX && (d = e.pointer.normalize(d)), c = [d.chartX - e.plotLeft, d.chartY - b]);
                c || (C(a, function (a) {
                    k =
                        a.series.yAxis;
                    m = a.series.xAxis;
                    l += a.plotX + (!h && m ? m.left - g : 0);
                    t += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!h && k ? k.top - b : 0)
                }), l /= a.length, t /= a.length, c = [h ? e.plotWidth - t : l, this.shared && !h && 1 < a.length && d ? d.chartY - b : h ? e.plotHeight - l : t]);
                return f(c, Math.round)
            }, getPosition: function (a, d, c) {
                var e = this.chart, h = this.distance, b = {}, g = c.h || 0, f,
                    l = ["y", e.chartHeight, d, c.plotY + e.plotTop, e.plotTop, e.plotTop + e.plotHeight],
                    k = ["x", e.chartWidth, a, c.plotX + e.plotLeft, e.plotLeft, e.plotLeft + e.plotWidth],
                    t = !this.followPointer &&
                        q(c.ttBelow, !e.inverted === !!c.negative), E = function (a, c, e, d, k, v) {
                        var r = e < d - h, p = d + h + e < c, f = d - h - e;
                        d += h;
                        if (t && p) b[a] = d; else if (!t && r) b[a] = f; else if (r) b[a] = Math.min(v - e, 0 > f - g ? f : f - g); else if (p) b[a] = Math.max(k, d + g + e > c ? d : d + g); else return !1
                    }, m = function (a, c, e, g) {
                        var d;
                        g < h || g > c - h ? d = !1 : b[a] = g < e / 2 ? 1 : g > c - e / 2 ? c - e - 2 : g - e / 2;
                        return d
                    }, n = function (a) {
                        var b = l;
                        l = k;
                        k = b;
                        f = a
                    }, v = function () {
                        !1 !== E.apply(0, l) ? !1 !== m.apply(0, k) || f || (n(!0), v()) : f ? b.x = b.y = 0 : (n(!0), v())
                    };
                (e.inverted || 1 < this.len) && n();
                v();
                return b
            }, defaultFormatter: function (a) {
                var d =
                    this.points || n(this), c;
                c = [a.tooltipFooterHeaderFormatter(d[0])];
                c = c.concat(a.bodyFormatter(d));
                c.push(a.tooltipFooterHeaderFormatter(d[0], !0));
                return c
            }, refresh: function (a, d) {
                var c, e = this.options, h, b = a, g, f = {}, l = [];
                c = e.formatter || this.defaultFormatter;
                var f = this.shared, k;
                clearTimeout(this.hideTimer);
                this.followPointer = n(b)[0].series.tooltipOptions.followPointer;
                g = this.getAnchor(b, d);
                d = g[0];
                h = g[1];
                !f || b.series && b.series.noSharedTooltip ? f = b.getLabelConfig() : (C(b, function (a) {
                    a.setState("hover");
                    l.push(a.getLabelConfig())
                }),
                    f = {x: b[0].category, y: b[0].y}, f.points = l, b = b[0]);
                this.len = l.length;
                f = c.call(f, this);
                k = b.series;
                this.distance = q(k.tooltipOptions.distance, 16);
                !1 === f ? this.hide() : (c = this.getLabel(), this.isHidden && c.attr({opacity: 1}).show(), this.split ? this.renderSplit(f, a) : (e.style.width || c.css({width: this.chart.spacingBox.width}), c.attr({text: f && f.join ? f.join("") : f}), c.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + q(b.colorIndex, k.colorIndex)), c.attr({stroke: e.borderColor || b.color || k.color || "#666666"}),
                    this.updatePosition({
                        plotX: d,
                        plotY: h,
                        negative: b.negative,
                        ttBelow: b.ttBelow,
                        h: g[2] || 0
                    })), this.isHidden = !1)
            }, renderSplit: function (d, h) {
                var c = this, e = [], f = this.chart, b = f.renderer, g = !0, l = this.options, t, k = this.getLabel();
                C(d.slice(0, h.length + 1), function (a, d) {
                    d = h[d - 1] || {isHeader: !0, plotX: h[0].plotX};
                    var p = d.series || c, m = p.tt, v = d.series || {},
                        F = "highcharts-color-" + q(d.colorIndex, v.colorIndex, "none");
                    m || (p.tt = m = b.label(null, null, null, "callout").addClass("highcharts-tooltip-box " + F).attr({
                        padding: l.padding, r: l.borderRadius,
                        fill: l.backgroundColor, stroke: d.color || v.color || "#333333", "stroke-width": l.borderWidth
                    }).add(k));
                    m.isActive = !0;
                    m.attr({text: a});
                    m.css(l.style);
                    a = m.getBBox();
                    v = a.width + m.strokeWidth();
                    d.isHeader ? (t = a.height, v = Math.max(0, Math.min(d.plotX + f.plotLeft - v / 2, f.chartWidth - v))) : v = d.plotX + f.plotLeft - q(l.distance, 16) - v;
                    0 > v && (g = !1);
                    a = (d.series && d.series.yAxis && d.series.yAxis.pos) + (d.plotY || 0);
                    a -= f.plotTop;
                    e.push({
                        target: d.isHeader ? f.plotHeight + t : a,
                        rank: d.isHeader ? 1 : 0,
                        size: p.tt.getBBox().height + 1,
                        point: d,
                        x: v,
                        tt: m
                    })
                });
                this.cleanSplit();
                a.distribute(e, f.plotHeight + t);
                C(e, function (a) {
                    var b = a.point, c = b.series;
                    a.tt.attr({
                        visibility: void 0 === a.pos ? "hidden" : "inherit",
                        x: g || b.isHeader ? a.x : b.plotX + f.plotLeft + q(l.distance, 16),
                        y: a.pos + f.plotTop,
                        anchorX: b.isHeader ? b.plotX + f.plotLeft : b.plotX + c.xAxis.pos,
                        anchorY: b.isHeader ? a.pos + f.plotTop - 15 : b.plotY + c.yAxis.pos
                    })
                })
            }, updatePosition: function (a) {
                var d = this.chart, c = this.getLabel(),
                    c = (this.options.positioner || this.getPosition).call(this, c.width, c.height, a);
                this.move(Math.round(c.x),
                    Math.round(c.y || 0), a.plotX + d.plotLeft, a.plotY + d.plotTop)
            }, getDateFormat: function (a, d, c, e) {
                var f = y("%m-%d %H:%M:%S.%L", d), b, g, l = {millisecond: 15, second: 12, minute: 9, hour: 6, day: 3},
                    m = "millisecond";
                for (g in h) {
                    if (a === h.week && +y("%w", d) === c && "00:00:00.000" === f.substr(6)) {
                        g = "week";
                        break
                    }
                    if (h[g] > a) {
                        g = m;
                        break
                    }
                    if (l[g] && f.substr(l[g]) !== "01-01 00:00:00.000".substr(l[g])) break;
                    "week" !== g && (m = g)
                }
                g && (b = e[g]);
                return b
            }, getXDateFormat: function (a, d, c) {
                d = d.dateTimeLabelFormats;
                var e = c && c.closestPointRange;
                return (e ?
                    this.getDateFormat(e, a.x, c.options.startOfWeek, d) : d.day) || d.year
            }, tooltipFooterHeaderFormatter: function (a, h) {
                var c = h ? "footer" : "header";
                h = a.series;
                var e = h.tooltipOptions, f = e.xDateFormat, b = h.xAxis,
                    g = b && "datetime" === b.options.type && d(a.key), c = e[c + "Format"];
                g && !f && (f = this.getXDateFormat(a, e, b));
                g && f && (c = c.replace("{point.key}", "{point.key:" + f + "}"));
                return B(c, {point: a, series: h})
            }, bodyFormatter: function (a) {
                return f(a, function (a) {
                    var c = a.series.tooltipOptions;
                    return (c.pointFormatter || a.point.tooltipFormatter).call(a.point,
                        c.pointFormat)
                })
            }
        }
    })(K);
    (function (a) {
        var y = a.addEvent, C = a.attr, A = a.charts, B = a.color, d = a.css, f = a.defined, u = a.doc, q = a.each,
            n = a.extend, m = a.fireEvent, h = a.offset, t = a.pick, l = a.removeEvent, c = a.splat, e = a.Tooltip,
            p = a.win;
        a.Pointer = function (a, c) {
            this.init(a, c)
        };
        a.Pointer.prototype = {
            init: function (a, c) {
                this.options = c;
                this.chart = a;
                this.runChartClick = c.chart.events && !!c.chart.events.click;
                this.pinchDown = [];
                this.lastValidTouch = {};
                e && c.tooltip.enabled && (a.tooltip = new e(a, c.tooltip), this.followTouchMove = t(c.tooltip.followTouchMove,
                    !0));
                this.setDOMEvents()
            }, zoomOption: function (a) {
                var b = this.chart, c = b.options.chart, e = c.zoomType || "", b = b.inverted;
                /touch/.test(a.type) && (e = t(c.pinchType, e));
                this.zoomX = a = /x/.test(e);
                this.zoomY = e = /y/.test(e);
                this.zoomHor = a && !b || e && b;
                this.zoomVert = e && !b || a && b;
                this.hasZoom = a || e
            }, normalize: function (a, c) {
                var b, e;
                a = a || p.event;
                a.target || (a.target = a.srcElement);
                e = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a;
                c || (this.chartPosition = c = h(this.chart.container));
                void 0 === e.pageX ? (b = Math.max(a.x,
                    a.clientX - c.left), c = a.y) : (b = e.pageX - c.left, c = e.pageY - c.top);
                return n(a, {chartX: Math.round(b), chartY: Math.round(c)})
            }, getCoordinates: function (a) {
                var b = {xAxis: [], yAxis: []};
                q(this.chart.axes, function (c) {
                    b[c.isXAxis ? "xAxis" : "yAxis"].push({axis: c, value: c.toValue(a[c.horiz ? "chartX" : "chartY"])})
                });
                return b
            }, getKDPoints: function (a, c, e) {
                var b = [], g, d, h;
                q(a, function (a) {
                    g = a.noSharedTooltip && c;
                    d = !c && a.directTouch;
                    a.visible && !d && t(a.options.enableMouseTracking, !0) && (h = a.searchPoint(e, !g && 0 > a.options.findNearestPointBy.indexOf("y"))) &&
                    h.series && b.push(h)
                });
                b.sort(function (a, b) {
                    var e = a.distX - b.distX, g = a.dist - b.dist,
                        d = (b.series.group && b.series.group.zIndex) - (a.series.group && a.series.group.zIndex);
                    return 0 !== e && c ? e : 0 !== g ? g : 0 !== d ? d : a.series.index > b.series.index ? -1 : 1
                });
                if (c && b[0] && !b[0].series.noSharedTooltip) for (a = b.length; a--;) (b[a].x !== b[0].x || b[a].series.noSharedTooltip) && b.splice(a, 1);
                return b
            }, getPointFromEvent: function (a) {
                a = a.target;
                for (var b; a && !b;) b = a.point, a = a.parentNode;
                return b
            }, getChartCoordinatesFromPoint: function (a, c) {
                var b =
                    a.series, e = b.xAxis, b = b.yAxis;
                if (e && b) return c ? {
                    chartX: e.len + e.pos - a.clientX,
                    chartY: b.len + b.pos - a.plotY
                } : {chartX: a.clientX + e.pos, chartY: a.plotY + b.pos}
            }, getHoverData: function (b, c, e, d, k, h) {
                var g = b, f = c, g = k ? e : [f];
                d = !(!d || !b);
                c = f && !f.stickyTracking;
                var p = function (a, b) {
                    return 0 === b
                }, v;
                d ? p = function (a) {
                    return a === b
                } : c ? p = function (a) {
                    return a.series === f
                } : g = a.grep(e, function (a) {
                    return a.stickyTracking
                });
                v = d && !k ? [b] : this.getKDPoints(g, k, h);
                f = (g = a.find(v, p)) && g.series;
                d || c || !k || (v = this.getKDPoints(e, k, h));
                v.sort(function (a,
                                 b) {
                    return a.series.index - b.series.index
                });
                return {hoverPoint: g, hoverSeries: f, hoverPoints: v}
            }, runPointActions: function (b, c) {
                var e = this.chart, g = e.tooltip, d = g ? g.shared : !1, h = c || e.hoverPoint,
                    f = h && h.series || e.hoverSeries;
                c = this.getHoverData(h, f, e.series, !!c || f && f.directTouch && this.isDirectTouch, d, b);
                var p, l, h = c.hoverPoint;
                p = (f = c.hoverSeries) && f.tooltipOptions.followPointer;
                l = (d = d && h && !h.series.noSharedTooltip) ? c.hoverPoints : h ? [h] : [];
                if (h && (h !== e.hoverPoint || g && g.isHidden)) {
                    q(e.hoverPoints || [], function (b) {
                        -1 ===
                        a.inArray(b, l) && b.setState()
                    });
                    q(l || [], function (a) {
                        a.setState("hover")
                    });
                    if (e.hoverSeries !== f) f.onMouseOver();
                    e.hoverPoint && e.hoverPoint.firePointEvent("mouseOut");
                    h.firePointEvent("mouseOver");
                    e.hoverPoints = l;
                    e.hoverPoint = h;
                    g && g.refresh(d ? l : h, b)
                } else p && g && !g.isHidden && (f = g.getAnchor([{}], b), g.updatePosition({
                    plotX: f[0],
                    plotY: f[1]
                }));
                this.unDocMouseMove || (this.unDocMouseMove = y(u, "mousemove", function (b) {
                    var c = A[a.hoverChartIndex];
                    if (c) c.pointer.onDocumentMouseMove(b)
                }));
                q(e.axes, function (c) {
                    t(c.crosshair.snap,
                        !0) ? a.find(l, function (a) {
                        return a.series[c.coll] === c
                    }) ? c.drawCrosshair(b, h) : c.hideCrosshair() : c.drawCrosshair(b)
                })
            }, reset: function (a, e) {
                var b = this.chart, g = b.hoverSeries, d = b.hoverPoint, h = b.hoverPoints, f = b.tooltip,
                    p = f && f.shared ? h : d;
                a && p && q(c(p), function (b) {
                    b.series.isCartesian && void 0 === b.plotX && (a = !1)
                });
                if (a) f && p && (f.refresh(p), d && (d.setState(d.state, !0), q(b.axes, function (a) {
                    a.crosshair && a.drawCrosshair(null, d)
                }))); else {
                    if (d) d.onMouseOut();
                    h && q(h, function (a) {
                        a.setState()
                    });
                    if (g) g.onMouseOut();
                    f && f.hide(e);
                    this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
                    q(b.axes, function (a) {
                        a.hideCrosshair()
                    });
                    this.hoverX = b.hoverPoints = b.hoverPoint = null
                }
            }, scaleGroups: function (a, c) {
                var b = this.chart, e;
                q(b.series, function (g) {
                    e = a || g.getPlotBox();
                    g.xAxis && g.xAxis.zoomEnabled && g.group && (g.group.attr(e), g.markerGroup && (g.markerGroup.attr(e), g.markerGroup.clip(c ? b.clipRect : null)), g.dataLabelsGroup && g.dataLabelsGroup.attr(e))
                });
                b.clipRect.attr(c || b.clipBox)
            }, dragStart: function (a) {
                var b = this.chart;
                b.mouseIsDown =
                    a.type;
                b.cancelClick = !1;
                b.mouseDownX = this.mouseDownX = a.chartX;
                b.mouseDownY = this.mouseDownY = a.chartY
            }, drag: function (a) {
                var b = this.chart, c = b.options.chart, e = a.chartX, d = a.chartY, h = this.zoomHor,
                    f = this.zoomVert, p = b.plotLeft, l = b.plotTop, v = b.plotWidth, F = b.plotHeight, H,
                    m = this.selectionMarker, r = this.mouseDownX, w = this.mouseDownY,
                    t = c.panKey && a[c.panKey + "Key"];
                m && m.touch || (e < p ? e = p : e > p + v && (e = p + v), d < l ? d = l : d > l + F && (d = l + F), this.hasDragged = Math.sqrt(Math.pow(r - e, 2) + Math.pow(w - d, 2)), 10 < this.hasDragged && (H = b.isInsidePlot(r -
                    p, w - l), b.hasCartesianSeries && (this.zoomX || this.zoomY) && H && !t && !m && (this.selectionMarker = m = b.renderer.rect(p, l, h ? 1 : v, f ? 1 : F, 0).attr({
                    fill: c.selectionMarkerFill || B("#335cad").setOpacity(.25).get(),
                    "class": "highcharts-selection-marker",
                    zIndex: 7
                }).add()), m && h && (e -= r, m.attr({
                    width: Math.abs(e),
                    x: (0 < e ? 0 : e) + r
                })), m && f && (e = d - w, m.attr({
                    height: Math.abs(e),
                    y: (0 < e ? 0 : e) + w
                })), H && !m && c.panning && b.pan(a, c.panning)))
            }, drop: function (a) {
                var b = this, c = this.chart, e = this.hasPinched;
                if (this.selectionMarker) {
                    var k = {
                            originalEvent: a,
                            xAxis: [], yAxis: []
                        }, h = this.selectionMarker, p = h.attr ? h.attr("x") : h.x, l = h.attr ? h.attr("y") : h.y,
                        t = h.attr ? h.attr("width") : h.width, v = h.attr ? h.attr("height") : h.height, F;
                    if (this.hasDragged || e) q(c.axes, function (c) {
                        if (c.zoomEnabled && f(c.min) && (e || b[{xAxis: "zoomX", yAxis: "zoomY"}[c.coll]])) {
                            var g = c.horiz, d = "touchend" === a.type ? c.minPixelPadding : 0,
                                h = c.toValue((g ? p : l) + d), g = c.toValue((g ? p + t : l + v) - d);
                            k[c.coll].push({axis: c, min: Math.min(h, g), max: Math.max(h, g)});
                            F = !0
                        }
                    }), F && m(c, "selection", k, function (a) {
                        c.zoom(n(a, e ?
                            {animation: !1} : null))
                    });
                    this.selectionMarker = this.selectionMarker.destroy();
                    e && this.scaleGroups()
                }
                c && (d(c.container, {cursor: c._cursor}), c.cancelClick = 10 < this.hasDragged, c.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
            }, onContainerMouseDown: function (a) {
                a = this.normalize(a);
                this.zoomOption(a);
                a.preventDefault && a.preventDefault();
                this.dragStart(a)
            }, onDocumentMouseUp: function (b) {
                A[a.hoverChartIndex] && A[a.hoverChartIndex].pointer.drop(b)
            }, onDocumentMouseMove: function (a) {
                var b = this.chart,
                    c = this.chartPosition;
                a = this.normalize(a, c);
                !c || this.inClass(a.target, "highcharts-tracker") || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) || this.reset()
            }, onContainerMouseLeave: function (b) {
                var c = A[a.hoverChartIndex];
                c && (b.relatedTarget || b.toElement) && (c.pointer.reset(), c.pointer.chartPosition = null)
            }, onContainerMouseMove: function (b) {
                var c = this.chart;
                f(a.hoverChartIndex) && A[a.hoverChartIndex] && A[a.hoverChartIndex].mouseIsDown || (a.hoverChartIndex = c.index);
                b = this.normalize(b);
                b.returnValue = !1;
                "mousedown" === c.mouseIsDown && this.drag(b);
                !this.inClass(b.target, "highcharts-tracker") && !c.isInsidePlot(b.chartX - c.plotLeft, b.chartY - c.plotTop) || c.openMenu || this.runPointActions(b)
            }, inClass: function (a, c) {
                for (var b; a;) {
                    if (b = C(a, "class")) {
                        if (-1 !== b.indexOf(c)) return !0;
                        if (-1 !== b.indexOf("highcharts-container")) return !1
                    }
                    a = a.parentNode
                }
            }, onTrackerMouseOut: function (a) {
                var b = this.chart.hoverSeries;
                a = a.relatedTarget || a.toElement;
                this.isDirectTouch = !1;
                if (!(!b || !a || b.stickyTracking || this.inClass(a, "highcharts-tooltip") ||
                    this.inClass(a, "highcharts-series-" + b.index) && this.inClass(a, "highcharts-tracker"))) b.onMouseOut()
            }, onContainerClick: function (a) {
                var b = this.chart, c = b.hoverPoint, e = b.plotLeft, d = b.plotTop;
                a = this.normalize(a);
                b.cancelClick || (c && this.inClass(a.target, "highcharts-tracker") ? (m(c.series, "click", n(a, {point: c})), b.hoverPoint && c.firePointEvent("click", a)) : (n(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - e, a.chartY - d) && m(b, "click", a)))
            }, setDOMEvents: function () {
                var b = this, c = b.chart.container;
                c.onmousedown =
                    function (a) {
                        b.onContainerMouseDown(a)
                    };
                c.onmousemove = function (a) {
                    b.onContainerMouseMove(a)
                };
                c.onclick = function (a) {
                    b.onContainerClick(a)
                };
                y(c, "mouseleave", b.onContainerMouseLeave);
                1 === a.chartCount && y(u, "mouseup", b.onDocumentMouseUp);
                a.hasTouch && (c.ontouchstart = function (a) {
                    b.onContainerTouchStart(a)
                }, c.ontouchmove = function (a) {
                    b.onContainerTouchMove(a)
                }, 1 === a.chartCount && y(u, "touchend", b.onDocumentTouchEnd))
            }, destroy: function () {
                var b = this;
                b.unDocMouseMove && b.unDocMouseMove();
                l(b.chart.container, "mouseleave",
                    b.onContainerMouseLeave);
                a.chartCount || (l(u, "mouseup", b.onDocumentMouseUp), l(u, "touchend", b.onDocumentTouchEnd));
                clearInterval(b.tooltipTimeout);
                a.objectEach(b, function (a, c) {
                    b[c] = null
                })
            }
        }
    })(K);
    (function (a) {
        var y = a.charts, C = a.each, A = a.extend, B = a.map, d = a.noop, f = a.pick;
        A(a.Pointer.prototype, {
            pinchTranslate: function (a, d, f, m, h, t) {
                this.zoomHor && this.pinchTranslateDirection(!0, a, d, f, m, h, t);
                this.zoomVert && this.pinchTranslateDirection(!1, a, d, f, m, h, t)
            }, pinchTranslateDirection: function (a, d, f, m, h, t, l, c) {
                var e =
                        this.chart, p = a ? "x" : "y", b = a ? "X" : "Y", g = "chart" + b, n = a ? "width" : "height",
                    q = e["plot" + (a ? "Left" : "Top")], k, u, E = c || 1, D = e.inverted, M = e.bounds[a ? "h" : "v"],
                    v = 1 === d.length, F = d[0][g], H = f[0][g], J = !v && d[1][g], r = !v && f[1][g], w;
                f = function () {
                    !v && 20 < Math.abs(F - J) && (E = c || Math.abs(H - r) / Math.abs(F - J));
                    u = (q - H) / E + F;
                    k = e["plot" + (a ? "Width" : "Height")] / E
                };
                f();
                d = u;
                d < M.min ? (d = M.min, w = !0) : d + k > M.max && (d = M.max - k, w = !0);
                w ? (H -= .8 * (H - l[p][0]), v || (r -= .8 * (r - l[p][1])), f()) : l[p] = [H, r];
                D || (t[p] = u - q, t[n] = k);
                t = D ? 1 / E : E;
                h[n] = k;
                h[p] = d;
                m[D ? a ? "scaleY" :
                    "scaleX" : "scale" + b] = E;
                m["translate" + b] = t * q + (H - t * F)
            }, pinch: function (a) {
                var q = this, n = q.chart, m = q.pinchDown, h = a.touches, t = h.length, l = q.lastValidTouch,
                    c = q.hasZoom, e = q.selectionMarker, p = {},
                    b = 1 === t && (q.inClass(a.target, "highcharts-tracker") && n.runTrackerClick || q.runChartClick),
                    g = {};
                1 < t && (q.initiated = !0);
                c && q.initiated && !b && a.preventDefault();
                B(h, function (a) {
                    return q.normalize(a)
                });
                "touchstart" === a.type ? (C(h, function (a, b) {
                    m[b] = {chartX: a.chartX, chartY: a.chartY}
                }), l.x = [m[0].chartX, m[1] && m[1].chartX], l.y = [m[0].chartY,
                    m[1] && m[1].chartY], C(n.axes, function (a) {
                    if (a.zoomEnabled) {
                        var b = n.bounds[a.horiz ? "h" : "v"], c = a.minPixelPadding,
                            e = a.toPixels(f(a.options.min, a.dataMin)), d = a.toPixels(f(a.options.max, a.dataMax)),
                            g = Math.max(e, d);
                        b.min = Math.min(a.pos, Math.min(e, d) - c);
                        b.max = Math.max(a.pos + a.len, g + c)
                    }
                }), q.res = !0) : q.followTouchMove && 1 === t ? this.runPointActions(q.normalize(a)) : m.length && (e || (q.selectionMarker = e = A({
                    destroy: d,
                    touch: !0
                }, n.plotBox)), q.pinchTranslate(m, h, p, e, g, l), q.hasPinched = c, q.scaleGroups(p, g), q.res && (q.res =
                    !1, this.reset(!1, 0)))
            }, touch: function (d, q) {
                var n = this.chart, m, h;
                if (n.index !== a.hoverChartIndex) this.onContainerMouseLeave({relatedTarget: !0});
                a.hoverChartIndex = n.index;
                1 === d.touches.length ? (d = this.normalize(d), (h = n.isInsidePlot(d.chartX - n.plotLeft, d.chartY - n.plotTop)) && !n.openMenu ? (q && this.runPointActions(d), "touchmove" === d.type && (q = this.pinchDown, m = q[0] ? 4 <= Math.sqrt(Math.pow(q[0].chartX - d.chartX, 2) + Math.pow(q[0].chartY - d.chartY, 2)) : !1), f(m, !0) && this.pinch(d)) : q && this.reset()) : 2 === d.touches.length &&
                    this.pinch(d)
            }, onContainerTouchStart: function (a) {
                this.zoomOption(a);
                this.touch(a, !0)
            }, onContainerTouchMove: function (a) {
                this.touch(a)
            }, onDocumentTouchEnd: function (d) {
                y[a.hoverChartIndex] && y[a.hoverChartIndex].pointer.drop(d)
            }
        })
    })(K);
    (function (a) {
        var y = a.addEvent, C = a.charts, A = a.css, B = a.doc, d = a.extend, f = a.noop, u = a.Pointer,
            q = a.removeEvent, n = a.win, m = a.wrap;
        if (!a.hasTouch && (n.PointerEvent || n.MSPointerEvent)) {
            var h = {}, t = !!n.PointerEvent, l = function () {
                var c = [];
                c.item = function (a) {
                    return this[a]
                };
                a.objectEach(h,
                    function (a) {
                        c.push({pageX: a.pageX, pageY: a.pageY, target: a.target})
                    });
                return c
            }, c = function (c, d, b, g) {
                "touch" !== c.pointerType && c.pointerType !== c.MSPOINTER_TYPE_TOUCH || !C[a.hoverChartIndex] || (g(c), g = C[a.hoverChartIndex].pointer, g[d]({
                    type: b,
                    target: c.currentTarget,
                    preventDefault: f,
                    touches: l()
                }))
            };
            d(u.prototype, {
                onContainerPointerDown: function (a) {
                    c(a, "onContainerTouchStart", "touchstart", function (a) {
                        h[a.pointerId] = {pageX: a.pageX, pageY: a.pageY, target: a.currentTarget}
                    })
                }, onContainerPointerMove: function (a) {
                    c(a,
                        "onContainerTouchMove", "touchmove", function (a) {
                            h[a.pointerId] = {pageX: a.pageX, pageY: a.pageY};
                            h[a.pointerId].target || (h[a.pointerId].target = a.currentTarget)
                        })
                }, onDocumentPointerUp: function (a) {
                    c(a, "onDocumentTouchEnd", "touchend", function (a) {
                        delete h[a.pointerId]
                    })
                }, batchMSEvents: function (a) {
                    a(this.chart.container, t ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                    a(this.chart.container, t ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                    a(B, t ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
                }
            });
            m(u.prototype, "init", function (a, c, b) {
                a.call(this, c, b);
                this.hasZoom && A(c.container, {"-ms-touch-action": "none", "touch-action": "none"})
            });
            m(u.prototype, "setDOMEvents", function (a) {
                a.apply(this);
                (this.hasZoom || this.followTouchMove) && this.batchMSEvents(y)
            });
            m(u.prototype, "destroy", function (a) {
                this.batchMSEvents(q);
                a.call(this)
            })
        }
    })(K);
    (function (a) {
        var y = a.addEvent, C = a.css, A = a.discardElement, B = a.defined, d = a.each, f = a.isFirefox,
            u = a.marginNames, q = a.merge, n = a.pick, m = a.setAnimation, h = a.stableSort, t = a.win, l = a.wrap;
        a.Legend = function (a, e) {
            this.init(a, e)
        };
        a.Legend.prototype = {
            init: function (a, e) {
                this.chart = a;
                this.setOptions(e);
                e.enabled && (this.render(), y(this.chart, "endResize", function () {
                    this.legend.positionCheckboxes()
                }))
            }, setOptions: function (a) {
                var c = n(a.padding, 8);
                this.options = a;
                this.itemStyle = a.itemStyle;
                this.itemHiddenStyle = q(this.itemStyle, a.itemHiddenStyle);
                this.itemMarginTop = a.itemMarginTop || 0;
                this.padding = c;
                this.initialItemY = c - 5;
                this.itemHeight = this.maxItemWidth = 0;
                this.symbolWidth = n(a.symbolWidth, 16);
                this.pages =
                    []
            }, update: function (a, e) {
                var c = this.chart;
                this.setOptions(q(!0, this.options, a));
                this.destroy();
                c.isDirtyLegend = c.isDirtyBox = !0;
                n(e, !0) && c.redraw()
            }, colorizeItem: function (c, e) {
                c.legendGroup[e ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
                var d = this.options, b = c.legendItem, g = c.legendLine, h = c.legendSymbol,
                    f = this.itemHiddenStyle.color, d = e ? d.itemStyle.color : f, k = e ? c.color || f : f,
                    l = c.options && c.options.marker, m = {fill: k};
                b && b.css({fill: d, color: d});
                g && g.attr({stroke: k});
                h && (l && h.isMarker && (m = c.pointAttribs(),
                e || a.objectEach(m, function (a, b) {
                    m[b] = f
                })), h.attr(m))
            }, positionItem: function (a) {
                var c = this.options, d = c.symbolPadding, c = !c.rtl, b = a._legendItemPos, g = b[0], b = b[1],
                    h = a.checkbox;
                (a = a.legendGroup) && a.element && a.translate(c ? g : this.legendWidth - g - 2 * d - 4, b);
                h && (h.x = g, h.y = b)
            }, destroyItem: function (a) {
                var c = a.checkbox;
                d(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function (c) {
                    a[c] && (a[c] = a[c].destroy())
                });
                c && A(a.checkbox)
            }, destroy: function () {
                function a(a) {
                    this[a] && (this[a] = this[a].destroy())
                }

                d(this.getAllItems(),
                    function (c) {
                        d(["legendItem", "legendGroup"], a, c)
                    });
                d("clipRect up down pager nav box title group".split(" "), a, this);
                this.display = null
            }, positionCheckboxes: function (a) {
                var c = this.group && this.group.alignAttr, h, b = this.clipHeight || this.legendHeight,
                    g = this.titleHeight;
                c && (h = c.translateY, d(this.allItems, function (e) {
                    var d = e.checkbox, k;
                    d && (k = h + g + d.y + (a || 0) + 3, C(d, {
                        left: c.translateX + e.checkboxOffset + d.x - 20 + "px",
                        top: k + "px",
                        display: k > h - 6 && k < h + b - 6 ? "" : "none"
                    }))
                }))
            }, renderTitle: function () {
                var a = this.options, e = this.padding,
                    d = a.title, b = 0;
                d.text && (this.title || (this.title = this.chart.renderer.label(d.text, e - 3, e - 4, null, null, null, a.useHTML, null, "legend-title").attr({zIndex: 1}).css(d.style).add(this.group)), a = this.title.getBBox(), b = a.height, this.offsetWidth = a.width, this.contentGroup.attr({translateY: b}));
                this.titleHeight = b
            }, setText: function (c) {
                var e = this.options;
                c.legendItem.attr({text: e.labelFormat ? a.format(e.labelFormat, c) : e.labelFormatter.call(c)})
            }, renderItem: function (a) {
                var c = this.chart, d = c.renderer, b = this.options, g =
                    "horizontal" === b.layout, h = this.symbolWidth, f = b.symbolPadding, k = this.itemStyle,
                    l = this.itemHiddenStyle, m = this.padding, t = g ? n(b.itemDistance, 20) : 0, u = !b.rtl,
                    v = b.width, F = b.itemMarginBottom || 0, H = this.itemMarginTop, J = a.legendItem, r = !a.series,
                    w = !r && a.series.drawLegendSymbol ? a.series : a, B = w.options,
                    L = this.createCheckboxForItem && B && B.showCheckbox, B = h + f + t + (L ? 20 : 0), N = b.useHTML,
                    A = a.options.className;
                J || (a.legendGroup = d.g("legend-item").addClass("highcharts-" + w.type + "-series highcharts-color-" + a.colorIndex + (A ? " " +
                    A : "") + (r ? " highcharts-series-" + a.index : "")).attr({zIndex: 1}).add(this.scrollGroup), a.legendItem = J = d.text("", u ? h + f : -f, this.baseline || 0, N).css(q(a.visible ? k : l)).attr({
                    align: u ? "left" : "right",
                    zIndex: 2
                }).add(a.legendGroup), this.baseline || (h = k.fontSize, this.fontMetrics = d.fontMetrics(h, J), this.baseline = this.fontMetrics.f + 3 + H, J.attr("y", this.baseline)), this.symbolHeight = b.symbolHeight || this.fontMetrics.f, w.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, J, N), L && this.createCheckboxForItem(a));
                this.colorizeItem(a, a.visible);
                k.width || J.css({width: (b.itemWidth || c.spacingBox.width) - B});
                this.setText(a);
                d = J.getBBox();
                k = a.checkboxOffset = b.itemWidth || a.legendItemWidth || d.width + B;
                this.itemHeight = d = Math.round(a.legendItemHeight || d.height || this.symbolHeight);
                g && this.itemX - m + k > (v || c.spacingBox.width - 2 * m - b.x) && (this.itemX = m, this.itemY += H + this.lastLineHeight + F, this.lastLineHeight = 0);
                this.maxItemWidth = Math.max(this.maxItemWidth, k);
                this.lastItemY = H + this.itemY + F;
                this.lastLineHeight = Math.max(d, this.lastLineHeight);
                a._legendItemPos = [this.itemX, this.itemY];
                g ? this.itemX += k : (this.itemY += H + d + F, this.lastLineHeight = d);
                this.offsetWidth = v || Math.max((g ? this.itemX - m - t : k) + m, this.offsetWidth)
            }, getAllItems: function () {
                var a = [];
                d(this.chart.series, function (c) {
                    var e = c && c.options;
                    c && n(e.showInLegend, B(e.linkedTo) ? !1 : void 0, !0) && (a = a.concat(c.legendItems || ("point" === e.legendType ? c.data : c)))
                });
                return a
            }, adjustMargins: function (a, e) {
                var c = this.chart, b = this.options,
                    g = b.align.charAt(0) + b.verticalAlign.charAt(0) + b.layout.charAt(0);
                b.floating || d([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/], function (d, h) {
                    d.test(g) && !B(a[h]) && (c[u[h]] = Math.max(c[u[h]], c.legend[(h + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][h] * b[h % 2 ? "x" : "y"] + n(b.margin, 12) + e[h]))
                })
            }, render: function () {
                var a = this, e = a.chart, f = e.renderer, b = a.group, g, l, m, k, t = a.box, n = a.options,
                    D = a.padding;
                a.itemX = D;
                a.itemY = a.initialItemY;
                a.offsetWidth = 0;
                a.lastItemY = 0;
                b || (a.group = b = f.g("legend").attr({zIndex: 7}).add(), a.contentGroup = f.g().attr({zIndex: 1}).add(b), a.scrollGroup =
                    f.g().add(a.contentGroup));
                a.renderTitle();
                g = a.getAllItems();
                h(g, function (a, b) {
                    return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0)
                });
                n.reversed && g.reverse();
                a.allItems = g;
                a.display = l = !!g.length;
                a.lastLineHeight = 0;
                d(g, function (b) {
                    a.renderItem(b)
                });
                m = (n.width || a.offsetWidth) + D;
                k = a.lastItemY + a.lastLineHeight + a.titleHeight;
                k = a.handleOverflow(k);
                k += D;
                t || (a.box = t = f.rect().addClass("highcharts-legend-box").attr({r: n.borderRadius}).add(b), t.isNew = !0);
                t.attr({
                    stroke: n.borderColor,
                    "stroke-width": n.borderWidth || 0, fill: n.backgroundColor || "none"
                }).shadow(n.shadow);
                0 < m && 0 < k && (t[t.isNew ? "attr" : "animate"](t.crisp({
                    x: 0,
                    y: 0,
                    width: m,
                    height: k
                }, t.strokeWidth())), t.isNew = !1);
                t[l ? "show" : "hide"]();
                a.legendWidth = m;
                a.legendHeight = k;
                d(g, function (b) {
                    a.positionItem(b)
                });
                l && b.align(q(n, {width: m, height: k}), !0, "spacingBox");
                e.isResizing || this.positionCheckboxes()
            }, handleOverflow: function (a) {
                var c = this, h = this.chart, b = h.renderer, g = this.options, f = g.y, l = this.padding,
                    h = h.spacingBox.height + ("top" === g.verticalAlign ?
                        -f : f) - l, f = g.maxHeight, k, m = this.clipRect, t = g.navigation, q = n(t.animation, !0),
                    u = t.arrowSize || 12, v = this.nav, F = this.pages, H, J = this.allItems, r = function (a) {
                        "number" === typeof a ? m.attr({height: a}) : m && (c.clipRect = m.destroy(), c.contentGroup.clip());
                        c.contentGroup.div && (c.contentGroup.div.style.clip = a ? "rect(" + l + "px,9999px," + (l + a) + "px,0)" : "auto")
                    };
                "horizontal" !== g.layout || "middle" === g.verticalAlign || g.floating || (h /= 2);
                f && (h = Math.min(h, f));
                F.length = 0;
                a > h && !1 !== t.enabled ? (this.clipHeight = k = Math.max(h - 20 - this.titleHeight -
                    l, 0), this.currentPage = n(this.currentPage, 1), this.fullHeight = a, d(J, function (a, b) {
                    var c = a._legendItemPos[1];
                    a = Math.round(a.legendItem.getBBox().height);
                    var e = F.length;
                    if (!e || c - F[e - 1] > k && (H || c) !== F[e - 1]) F.push(H || c), e++;
                    b === J.length - 1 && c + a - F[e - 1] > k && F.push(c);
                    c !== H && (H = c)
                }), m || (m = c.clipRect = b.clipRect(0, l, 9999, 0), c.contentGroup.clip(m)), r(k), v || (this.nav = v = b.g().attr({zIndex: 1}).add(this.group), this.up = b.symbol("triangle", 0, 0, u, u).on("click", function () {
                    c.scroll(-1, q)
                }).add(v), this.pager = b.text("", 15,
                    10).addClass("highcharts-legend-navigation").css(t.style).add(v), this.down = b.symbol("triangle-down", 0, 0, u, u).on("click", function () {
                    c.scroll(1, q)
                }).add(v)), c.scroll(0), a = h) : v && (r(), this.nav = v.destroy(), this.scrollGroup.attr({translateY: 1}), this.clipHeight = 0);
                return a
            }, scroll: function (a, e) {
                var c = this.pages, b = c.length;
                a = this.currentPage + a;
                var d = this.clipHeight, h = this.options.navigation, f = this.pager, k = this.padding;
                a > b && (a = b);
                0 < a && (void 0 !== e && m(e, this.chart), this.nav.attr({
                    translateX: k, translateY: d + this.padding +
                        7 + this.titleHeight, visibility: "visible"
                }), this.up.attr({"class": 1 === a ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"}), f.attr({text: a + "/" + b}), this.down.attr({
                    x: 18 + this.pager.getBBox().width,
                    "class": a === b ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                }), this.up.attr({fill: 1 === a ? h.inactiveColor : h.activeColor}).css({cursor: 1 === a ? "default" : "pointer"}), this.down.attr({fill: a === b ? h.inactiveColor : h.activeColor}).css({cursor: a === b ? "default" : "pointer"}), e = -c[a - 1] + this.initialItemY,
                    this.scrollGroup.animate({translateY: e}), this.currentPage = a, this.positionCheckboxes(e))
            }
        };
        a.LegendSymbolMixin = {
            drawRectangle: function (a, e) {
                var c = a.symbolHeight, b = a.options.squareSymbol;
                e.legendSymbol = this.chart.renderer.rect(b ? (a.symbolWidth - c) / 2 : 0, a.baseline - c + 1, b ? c : a.symbolWidth, c, n(a.options.symbolRadius, c / 2)).addClass("highcharts-point").attr({zIndex: 3}).add(e.legendGroup)
            }, drawLineMarker: function (a) {
                var c = this.options, d = c.marker, b = a.symbolWidth, g = a.symbolHeight, h = g / 2,
                    f = this.chart.renderer, k =
                        this.legendGroup;
                a = a.baseline - Math.round(.3 * a.fontMetrics.b);
                var l;
                l = {"stroke-width": c.lineWidth || 0};
                c.dashStyle && (l.dashstyle = c.dashStyle);
                this.legendLine = f.path(["M", 0, a, "L", b, a]).addClass("highcharts-graph").attr(l).add(k);
                d && !1 !== d.enabled && (c = Math.min(n(d.radius, h), h), 0 === this.symbol.indexOf("url") && (d = q(d, {
                    width: g,
                    height: g
                }), c = 0), this.legendSymbol = d = f.symbol(this.symbol, b / 2 - c, a - c, 2 * c, 2 * c, d).addClass("highcharts-point").add(k), d.isMarker = !0)
            }
        };
        (/Trident\/7\.0/.test(t.navigator.userAgent) || f) &&
        l(a.Legend.prototype, "positionItem", function (a, e) {
            var c = this, b = function () {
                e._legendItemPos && a.call(c, e)
            };
            b();
            setTimeout(b)
        })
    })(K);
    (function (a) {
        var y = a.addEvent, C = a.animate, A = a.animObject, B = a.attr, d = a.doc, f = a.Axis, u = a.createElement,
            q = a.defaultOptions, n = a.discardElement, m = a.charts, h = a.css, t = a.defined, l = a.each,
            c = a.extend, e = a.find, p = a.fireEvent, b = a.getStyle, g = a.grep, z = a.isNumber, G = a.isObject,
            k = a.isString, I = a.Legend, E = a.marginNames, D = a.merge, M = a.objectEach, v = a.Pointer, F = a.pick,
            H = a.pInt, J = a.removeEvent,
            r = a.seriesTypes, w = a.splat, P = a.svg, L = a.syncTimeout, N = a.win, Q = a.Renderer,
            O = a.Chart = function () {
                this.getArgs.apply(this, arguments)
            };
        a.chart = function (a, b, c) {
            return new O(a, b, c)
        };
        c(O.prototype, {
            callbacks: [], getArgs: function () {
                var a = [].slice.call(arguments);
                if (k(a[0]) || a[0].nodeName) this.renderTo = a.shift();
                this.init(a[0], a[1])
            }, init: function (b, c) {
                var e, d, g = b.series, h = b.plotOptions || {};
                b.series = null;
                e = D(q, b);
                for (d in e.plotOptions) e.plotOptions[d].tooltip = h[d] && D(h[d].tooltip) || void 0;
                e.tooltip.userOptions =
                    b.chart && b.chart.forExport && b.tooltip.userOptions || b.tooltip;
                e.series = b.series = g;
                this.userOptions = b;
                b = e.chart;
                d = b.events;
                this.margin = [];
                this.spacing = [];
                this.bounds = {h: {}, v: {}};
                this.callback = c;
                this.isResizing = 0;
                this.options = e;
                this.axes = [];
                this.series = [];
                this.hasCartesianSeries = b.showAxes;
                var f = this;
                f.index = m.length;
                m.push(f);
                a.chartCount++;
                d && M(d, function (a, b) {
                    y(f, b, a)
                });
                f.xAxis = [];
                f.yAxis = [];
                f.pointCount = f.colorCounter = f.symbolCounter = 0;
                f.firstRender()
            }, initSeries: function (b) {
                var c = this.options.chart;
                (c = r[b.type || c.type || c.defaultSeriesType]) || a.error(17, !0);
                c = new c;
                c.init(this, b);
                return c
            }, orderSeries: function (a) {
                var b = this.series;
                for (a = a || 0; a < b.length; a++) b[a] && (b[a].index = a, b[a].name = b[a].name || "Series " + (b[a].index + 1))
            }, isInsidePlot: function (a, b, c) {
                var e = c ? b : a;
                a = c ? a : b;
                return 0 <= e && e <= this.plotWidth && 0 <= a && a <= this.plotHeight
            }, redraw: function (b) {
                var e = this.axes, d = this.series, g = this.pointer, h = this.legend, f = this.isDirtyLegend, k, v,
                    r = this.hasCartesianSeries, w = this.isDirtyBox, m, F = this.renderer, t =
                        F.isHidden(), x = [];
                this.setResponsive && this.setResponsive(!1);
                a.setAnimation(b, this);
                t && this.temporaryDisplay();
                this.layOutTitles();
                for (b = d.length; b--;) if (m = d[b], m.options.stacking && (k = !0, m.isDirty)) {
                    v = !0;
                    break
                }
                if (v) for (b = d.length; b--;) m = d[b], m.options.stacking && (m.isDirty = !0);
                l(d, function (a) {
                    a.isDirty && "point" === a.options.legendType && (a.updateTotals && a.updateTotals(), f = !0);
                    a.isDirtyData && p(a, "updatedData")
                });
                f && h.options.enabled && (h.render(), this.isDirtyLegend = !1);
                k && this.getStacks();
                r && l(e, function (a) {
                    a.updateNames();
                    a.setScale()
                });
                this.getMargins();
                r && (l(e, function (a) {
                    a.isDirty && (w = !0)
                }), l(e, function (a) {
                    var b = a.min + "," + a.max;
                    a.extKey !== b && (a.extKey = b, x.push(function () {
                        p(a, "afterSetExtremes", c(a.eventArgs, a.getExtremes()));
                        delete a.eventArgs
                    }));
                    (w || k) && a.redraw()
                }));
                w && this.drawChartBox();
                p(this, "predraw");
                l(d, function (a) {
                    (w || a.isDirty) && a.visible && a.redraw();
                    a.isDirtyData = !1
                });
                g && g.reset(!0);
                F.draw();
                p(this, "redraw");
                p(this, "render");
                t && this.temporaryDisplay(!0);
                l(x, function (a) {
                    a.call()
                })
            }, get: function (a) {
                function b(b) {
                    return b.id ===
                        a || b.options && b.options.id === a
                }

                var c, d = this.series, g;
                c = e(this.axes, b) || e(this.series, b);
                for (g = 0; !c && g < d.length; g++) c = e(d[g].points || [], b);
                return c
            }, getAxes: function () {
                var a = this, b = this.options, c = b.xAxis = w(b.xAxis || {}), b = b.yAxis = w(b.yAxis || {});
                l(c, function (a, b) {
                    a.index = b;
                    a.isX = !0
                });
                l(b, function (a, b) {
                    a.index = b
                });
                c = c.concat(b);
                l(c, function (b) {
                    new f(a, b)
                })
            }, getSelectedPoints: function () {
                var a = [];
                l(this.series, function (b) {
                    a = a.concat(g(b.data || [], function (a) {
                        return a.selected
                    }))
                });
                return a
            }, getSelectedSeries: function () {
                return g(this.series,
                    function (a) {
                        return a.selected
                    })
            }, setTitle: function (a, b, c) {
                var e = this, d = e.options, g;
                g = d.title = D({style: {color: "#333333", fontSize: d.isStock ? "16px" : "18px"}}, d.title, a);
                d = d.subtitle = D({style: {color: "#666666"}}, d.subtitle, b);
                l([["title", a, g], ["subtitle", b, d]], function (a, b) {
                    var c = a[0], d = e[c], g = a[1];
                    a = a[2];
                    d && g && (e[c] = d = d.destroy());
                    a && a.text && !d && (e[c] = e.renderer.text(a.text, 0, 0, a.useHTML).attr({
                        align: a.align,
                        "class": "highcharts-" + c,
                        zIndex: a.zIndex || 4
                    }).add(), e[c].update = function (a) {
                        e.setTitle(!b && a, b &&
                            a)
                    }, e[c].css(a.style))
                });
                e.layOutTitles(c)
            }, layOutTitles: function (a) {
                var b = 0, e, d = this.renderer, g = this.spacingBox;
                l(["title", "subtitle"], function (a) {
                    var e = this[a], h = this.options[a];
                    a = "title" === a ? -3 : h.verticalAlign ? 0 : b + 2;
                    var f;
                    e && (f = h.style.fontSize, f = d.fontMetrics(f, e).b, e.css({width: (h.width || g.width + h.widthAdjust) + "px"}).align(c({y: a + f}, h), !1, "spacingBox"), h.floating || h.verticalAlign || (b = Math.ceil(b + e.getBBox(h.useHTML).height)))
                }, this);
                e = this.titleOffset !== b;
                this.titleOffset = b;
                !this.isDirtyBox &&
                e && (this.isDirtyBox = e, this.hasRendered && F(a, !0) && this.isDirtyBox && this.redraw())
            }, getChartSize: function () {
                var c = this.options.chart, e = c.width, c = c.height, d = this.renderTo;
                t(e) || (this.containerWidth = b(d, "width"));
                t(c) || (this.containerHeight = b(d, "height"));
                this.chartWidth = Math.max(0, e || this.containerWidth || 600);
                this.chartHeight = Math.max(0, a.relativeLength(c, this.chartWidth) || this.containerHeight || 400)
            }, temporaryDisplay: function (c) {
                var e = this.renderTo;
                if (c) for (; e && e.style;) e.hcOrigStyle && (a.css(e, e.hcOrigStyle),
                    delete e.hcOrigStyle), e = e.parentNode; else for (; e && e.style;) "none" === b(e, "display", !1) && (e.hcOrigStyle = {
                    display: e.style.display,
                    height: e.style.height,
                    overflow: e.style.overflow
                }, c = {
                    display: "block",
                    overflow: "hidden"
                }, e !== this.renderTo && (c.height = 0), a.css(e, c), e.style.setProperty && e.style.setProperty("display", "block", "important")), e = e.parentNode
            }, setClassName: function (a) {
                this.container.className = "highcharts-container " + (a || "")
            }, getContainer: function () {
                var b, e = this.options, g = e.chart, h, f;
                b = this.renderTo;
                var v = a.uniqueKey(), r;
                b || (this.renderTo = b = g.renderTo);
                k(b) && (this.renderTo = b = d.getElementById(b));
                b || a.error(13, !0);
                h = H(B(b, "data-highcharts-chart"));
                z(h) && m[h] && m[h].hasRendered && m[h].destroy();
                B(b, "data-highcharts-chart", this.index);
                b.innerHTML = "";
                g.skipClone || b.offsetWidth || this.temporaryDisplay();
                this.getChartSize();
                h = this.chartWidth;
                f = this.chartHeight;
                r = c({
                        position: "relative",
                        overflow: "hidden",
                        width: h + "px",
                        height: f + "px",
                        textAlign: "left",
                        lineHeight: "normal",
                        zIndex: 0,
                        "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
                    },
                    g.style);
                this.container = b = u("div", {id: v}, r, b);
                this._cursor = b.style.cursor;
                this.renderer = new (a[g.renderer] || Q)(b, h, f, null, g.forExport, e.exporting && e.exporting.allowHTML);
                this.setClassName(g.className);
                this.renderer.setStyle(g.style);
                this.renderer.chartIndex = this.index
            }, getMargins: function (a) {
                var b = this.spacing, c = this.margin, e = this.titleOffset;
                this.resetMargins();
                e && !t(c[0]) && (this.plotTop = Math.max(this.plotTop, e + this.options.title.margin + b[0]));
                this.legend.display && this.legend.adjustMargins(c, b);
                this.extraMargin && (this[this.extraMargin.type] = (this[this.extraMargin.type] || 0) + this.extraMargin.value);
                this.extraTopMargin && (this.plotTop += this.extraTopMargin);
                a || this.getAxisMargins()
            }, getAxisMargins: function () {
                var a = this, b = a.axisOffset = [0, 0, 0, 0], c = a.margin;
                a.hasCartesianSeries && l(a.axes, function (a) {
                    a.visible && a.getOffset()
                });
                l(E, function (e, d) {
                    t(c[d]) || (a[e] += b[d])
                });
                a.setChartSize()
            }, reflow: function (a) {
                var c = this, e = c.options.chart, g = c.renderTo, h = t(e.width), f = e.width || b(g, "width"),
                    e = e.height || b(g,
                        "height"), g = a ? a.target : N;
                if (!h && !c.isPrinting && f && e && (g === N || g === d)) {
                    if (f !== c.containerWidth || e !== c.containerHeight) clearTimeout(c.reflowTimeout), c.reflowTimeout = L(function () {
                        c.container && c.setSize(void 0, void 0, !1)
                    }, a ? 100 : 0);
                    c.containerWidth = f;
                    c.containerHeight = e
                }
            }, initReflow: function () {
                var a = this, b;
                b = y(N, "resize", function (b) {
                    a.reflow(b)
                });
                y(a, "destroy", b)
            }, setSize: function (b, c, e) {
                var d = this, g = d.renderer;
                d.isResizing += 1;
                a.setAnimation(e, d);
                d.oldChartHeight = d.chartHeight;
                d.oldChartWidth = d.chartWidth;
                void 0 !== b && (d.options.chart.width = b);
                void 0 !== c && (d.options.chart.height = c);
                d.getChartSize();
                b = g.globalAnimation;
                (b ? C : h)(d.container, {width: d.chartWidth + "px", height: d.chartHeight + "px"}, b);
                d.setChartSize(!0);
                g.setSize(d.chartWidth, d.chartHeight, e);
                l(d.axes, function (a) {
                    a.isDirty = !0;
                    a.setScale()
                });
                d.isDirtyLegend = !0;
                d.isDirtyBox = !0;
                d.layOutTitles();
                d.getMargins();
                d.redraw(e);
                d.oldChartHeight = null;
                p(d, "resize");
                L(function () {
                    d && p(d, "endResize", null, function () {
                        --d.isResizing
                    })
                }, A(b).duration)
            }, setChartSize: function (a) {
                function b(a) {
                    a =
                        k[a] || 0;
                    return Math.max(m || a, a) / 2
                }

                var c = this.inverted, e = this.renderer, d = this.chartWidth, g = this.chartHeight,
                    h = this.options.chart, f = this.spacing, k = this.clipOffset, v, r, p, w, m;
                this.plotLeft = v = Math.round(this.plotLeft);
                this.plotTop = r = Math.round(this.plotTop);
                this.plotWidth = p = Math.max(0, Math.round(d - v - this.marginRight));
                this.plotHeight = w = Math.max(0, Math.round(g - r - this.marginBottom));
                this.plotSizeX = c ? w : p;
                this.plotSizeY = c ? p : w;
                this.plotBorderWidth = h.plotBorderWidth || 0;
                this.spacingBox = e.spacingBox = {
                    x: f[3], y: f[0],
                    width: d - f[3] - f[1], height: g - f[0] - f[2]
                };
                this.plotBox = e.plotBox = {x: v, y: r, width: p, height: w};
                m = 2 * Math.floor(this.plotBorderWidth / 2);
                c = Math.ceil(b(3));
                e = Math.ceil(b(0));
                this.clipBox = {
                    x: c,
                    y: e,
                    width: Math.floor(this.plotSizeX - b(1) - c),
                    height: Math.max(0, Math.floor(this.plotSizeY - b(2) - e))
                };
                a || l(this.axes, function (a) {
                    a.setAxisSize();
                    a.setAxisTranslation()
                })
            }, resetMargins: function () {
                var a = this, b = a.options.chart;
                l(["margin", "spacing"], function (c) {
                    var e = b[c], d = G(e) ? e : [e, e, e, e];
                    l(["Top", "Right", "Bottom", "Left"], function (e,
                                                                    g) {
                        a[c][g] = F(b[c + e], d[g])
                    })
                });
                l(E, function (b, c) {
                    a[b] = F(a.margin[c], a.spacing[c])
                });
                a.axisOffset = [0, 0, 0, 0];
                a.clipOffset = []
            }, drawChartBox: function () {
                var a = this.options.chart, b = this.renderer, c = this.chartWidth, e = this.chartHeight,
                    d = this.chartBackground, g = this.plotBackground, h = this.plotBorder, f, k = this.plotBGImage,
                    v = a.backgroundColor, r = a.plotBackgroundColor, p = a.plotBackgroundImage, w, l = this.plotLeft,
                    m = this.plotTop, F = this.plotWidth, t = this.plotHeight, H = this.plotBox, n = this.clipRect,
                    q = this.clipBox, D = "animate";
                d || (this.chartBackground = d = b.rect().addClass("highcharts-background").add(), D = "attr");
                f = a.borderWidth || 0;
                w = f + (a.shadow ? 8 : 0);
                v = {fill: v || "none"};
                if (f || d["stroke-width"]) v.stroke = a.borderColor, v["stroke-width"] = f;
                d.attr(v).shadow(a.shadow);
                d[D]({x: w / 2, y: w / 2, width: c - w - f % 2, height: e - w - f % 2, r: a.borderRadius});
                D = "animate";
                g || (D = "attr", this.plotBackground = g = b.rect().addClass("highcharts-plot-background").add());
                g[D](H);
                g.attr({fill: r || "none"}).shadow(a.plotShadow);
                p && (k ? k.animate(H) : this.plotBGImage = b.image(p,
                    l, m, F, t).add());
                n ? n.animate({width: q.width, height: q.height}) : this.clipRect = b.clipRect(q);
                D = "animate";
                h || (D = "attr", this.plotBorder = h = b.rect().addClass("highcharts-plot-border").attr({zIndex: 1}).add());
                h.attr({stroke: a.plotBorderColor, "stroke-width": a.plotBorderWidth || 0, fill: "none"});
                h[D](h.crisp({x: l, y: m, width: F, height: t}, -h.strokeWidth()));
                this.isDirtyBox = !1
            }, propFromSeries: function () {
                var a = this, b = a.options.chart, c, e = a.options.series, d, g;
                l(["inverted", "angular", "polar"], function (h) {
                    c = r[b.type || b.defaultSeriesType];
                    g = b[h] || c && c.prototype[h];
                    for (d = e && e.length; !g && d--;) (c = r[e[d].type]) && c.prototype[h] && (g = !0);
                    a[h] = g
                })
            }, linkSeries: function () {
                var a = this, b = a.series;
                l(b, function (a) {
                    a.linkedSeries.length = 0
                });
                l(b, function (b) {
                    var c = b.options.linkedTo;
                    k(c) && (c = ":previous" === c ? a.series[b.index - 1] : a.get(c)) && c.linkedParent !== b && (c.linkedSeries.push(b), b.linkedParent = c, b.visible = F(b.options.visible, c.options.visible, b.visible))
                })
            }, renderSeries: function () {
                l(this.series, function (a) {
                    a.translate();
                    a.render()
                })
            }, renderLabels: function () {
                var a =
                    this, b = a.options.labels;
                b.items && l(b.items, function (e) {
                    var d = c(b.style, e.style), g = H(d.left) + a.plotLeft, h = H(d.top) + a.plotTop + 12;
                    delete d.left;
                    delete d.top;
                    a.renderer.text(e.html, g, h).attr({zIndex: 2}).css(d).add()
                })
            }, render: function () {
                var a = this.axes, b = this.renderer, c = this.options, e, d, g;
                this.setTitle();
                this.legend = new I(this, c.legend);
                this.getStacks && this.getStacks();
                this.getMargins(!0);
                this.setChartSize();
                c = this.plotWidth;
                e = this.plotHeight -= 21;
                l(a, function (a) {
                    a.setScale()
                });
                this.getAxisMargins();
                d =
                    1.1 < c / this.plotWidth;
                g = 1.05 < e / this.plotHeight;
                if (d || g) l(a, function (a) {
                    (a.horiz && d || !a.horiz && g) && a.setTickInterval(!0)
                }), this.getMargins();
                this.drawChartBox();
                this.hasCartesianSeries && l(a, function (a) {
                    a.visible && a.render()
                });
                this.seriesGroup || (this.seriesGroup = b.g("series-group").attr({zIndex: 3}).add());
                this.renderSeries();
                this.renderLabels();
                this.addCredits();
                this.setResponsive && this.setResponsive();
                this.hasRendered = !0
            }, addCredits: function (a) {
                var b = this;
                a = D(!0, this.options.credits, a);
                a.enabled && !this.credits &&
                (this.credits = this.renderer.text(a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function () {
                    a.href && (N.location.href = a.href)
                }).attr({
                    align: a.position.align,
                    zIndex: 8
                }).css(a.style).add().align(a.position), this.credits.update = function (a) {
                    b.credits = b.credits.destroy();
                    b.addCredits(a)
                })
            }, destroy: function () {
                var b = this, c = b.axes, e = b.series, d = b.container, g, h = d && d.parentNode;
                p(b, "destroy");
                b.renderer.forExport ? a.erase(m, b) : m[b.index] = void 0;
                a.chartCount--;
                b.renderTo.removeAttribute("data-highcharts-chart");
                J(b);
                for (g = c.length; g--;) c[g] = c[g].destroy();
                this.scroller && this.scroller.destroy && this.scroller.destroy();
                for (g = e.length; g--;) e[g] = e[g].destroy();
                l("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "), function (a) {
                    var c = b[a];
                    c && c.destroy && (b[a] = c.destroy())
                });
                d && (d.innerHTML = "", J(d), h && n(d));
                M(b, function (a, c) {
                    delete b[c]
                })
            }, isReadyToRender: function () {
                var a = this;
                return P || N != N.top ||
                "complete" === d.readyState ? !0 : (d.attachEvent("onreadystatechange", function () {
                    d.detachEvent("onreadystatechange", a.firstRender);
                    "complete" === d.readyState && a.firstRender()
                }), !1)
            }, firstRender: function () {
                var a = this, b = a.options;
                if (a.isReadyToRender()) {
                    a.getContainer();
                    p(a, "init");
                    a.resetMargins();
                    a.setChartSize();
                    a.propFromSeries();
                    a.getAxes();
                    l(b.series || [], function (b) {
                        a.initSeries(b)
                    });
                    a.linkSeries();
                    p(a, "beforeRender");
                    v && (a.pointer = new v(a, b));
                    a.render();
                    if (!a.renderer.imgCount && a.onload) a.onload();
                    a.temporaryDisplay(!0)
                }
            }, onload: function () {
                l([this.callback].concat(this.callbacks), function (a) {
                    a && void 0 !== this.index && a.apply(this, [this])
                }, this);
                p(this, "load");
                p(this, "render");
                t(this.index) && !1 !== this.options.chart.reflow && this.initReflow();
                this.onload = null
            }
        })
    })(K);
    (function (a) {
        var y, C = a.each, A = a.extend, B = a.erase, d = a.fireEvent, f = a.format, u = a.isArray, q = a.isNumber,
            n = a.pick, m = a.removeEvent;
        a.Point = y = function () {
        };
        a.Point.prototype = {
            init: function (a, d, f) {
                this.series = a;
                this.color = a.color;
                this.applyOptions(d,
                    f);
                a.options.colorByPoint ? (d = a.options.colors || a.chart.options.colors, this.color = this.color || d[a.colorCounter], d = d.length, f = a.colorCounter, a.colorCounter++, a.colorCounter === d && (a.colorCounter = 0)) : f = a.colorIndex;
                this.colorIndex = n(this.colorIndex, f);
                a.chart.pointCount++;
                return this
            }, applyOptions: function (a, d) {
                var h = this.series, c = h.options.pointValKey || h.pointValKey;
                a = y.prototype.optionsToObject.call(this, a);
                A(this, a);
                this.options = this.options ? A(this.options, a) : a;
                a.group && delete this.group;
                c && (this.y =
                    this[c]);
                this.isNull = n(this.isValid && !this.isValid(), null === this.x || !q(this.y, !0));
                this.selected && (this.state = "select");
                "name" in this && void 0 === d && h.xAxis && h.xAxis.hasNames && (this.x = h.xAxis.nameToX(this));
                void 0 === this.x && h && (this.x = void 0 === d ? h.autoIncrement(this) : d);
                return this
            }, optionsToObject: function (a) {
                var d = {}, h = this.series, c = h.options.keys, e = c || h.pointArrayMap || ["y"], f = e.length, b = 0,
                    g = 0;
                if (q(a) || null === a) d[e[0]] = a; else if (u(a)) for (!c && a.length > f && (h = typeof a[0], "string" === h ? d.name = a[0] : "number" ===
                    h && (d.x = a[0]), b++); g < f;) c && void 0 === a[b] || (d[e[g]] = a[b]), b++, g++; else "object" === typeof a && (d = a, a.dataLabels && (h._hasPointLabels = !0), a.marker && (h._hasPointMarkers = !0));
                return d
            }, getClassName: function () {
                return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ?
                    " " + this.zone.className.replace("highcharts-negative", "") : "")
            }, getZone: function () {
                var a = this.series, d = a.zones, a = a.zoneAxis || "y", f = 0, c;
                for (c = d[f]; this[a] >= c.value;) c = d[++f];
                c && c.color && !this.options.color && (this.color = c.color);
                return c
            }, destroy: function () {
                var a = this.series.chart, d = a.hoverPoints, f;
                a.pointCount--;
                d && (this.setState(), B(d, this), d.length || (a.hoverPoints = null));
                if (this === a.hoverPoint) this.onMouseOut();
                if (this.graphic || this.dataLabel) m(this), this.destroyElements();
                this.legendItem && a.legend.destroyItem(this);
                for (f in this) this[f] = null
            }, destroyElements: function () {
                for (var a = ["graphic", "dataLabel", "dataLabelUpper", "connector", "shadowGroup"], d, f = 6; f--;) d = a[f], this[d] && (this[d] = this[d].destroy())
            }, getLabelConfig: function () {
                return {
                    x: this.category,
                    y: this.y,
                    color: this.color,
                    colorIndex: this.colorIndex,
                    key: this.name || this.category,
                    series: this.series,
                    point: this,
                    percentage: this.percentage,
                    total: this.total || this.stackTotal
                }
            }, tooltipFormatter: function (a) {
                var d = this.series, h = d.tooltipOptions, c = n(h.valueDecimals, ""),
                    e = h.valuePrefix || "", p = h.valueSuffix || "";
                C(d.pointArrayMap || ["y"], function (b) {
                    b = "{point." + b;
                    if (e || p) a = a.replace(b + "}", e + b + "}" + p);
                    a = a.replace(b + "}", b + ":,." + c + "f}")
                });
                return f(a, {point: this, series: this.series})
            }, firePointEvent: function (a, f, m) {
                var c = this, e = this.series.options;
                (e.point.events[a] || c.options && c.options.events && c.options.events[a]) && this.importEvents();
                "click" === a && e.allowPointSelect && (m = function (a) {
                    c.select && c.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
                });
                d(this, a, f, m)
            }, visible: !0
        }
    })(K);
    (function (a) {
        var y = a.addEvent, C = a.animObject, A = a.arrayMax, B = a.arrayMin, d = a.correctFloat, f = a.Date,
            u = a.defaultOptions, q = a.defaultPlotOptions, n = a.defined, m = a.each, h = a.erase, t = a.extend,
            l = a.fireEvent, c = a.grep, e = a.isArray, p = a.isNumber, b = a.isString, g = a.merge, z = a.objectEach,
            G = a.pick, k = a.removeEvent, I = a.splat, E = a.SVGElement, D = a.syncTimeout, M = a.win;
        a.Series = a.seriesType("line", null, {
            lineWidth: 2, allowPointSelect: !1, showCheckbox: !1, animation: {duration: 1E3}, events: {}, marker: {
                lineWidth: 0, lineColor: "#ffffff", radius: 4,
                states: {
                    hover: {animation: {duration: 50}, enabled: !0, radiusPlus: 2, lineWidthPlus: 1},
                    select: {fillColor: "#cccccc", lineColor: "#000000", lineWidth: 2}
                }
            }, point: {events: {}}, dataLabels: {
                align: "center",
                formatter: function () {
                    return null === this.y ? "" : a.numberFormat(this.y, -1)
                },
                style: {fontSize: "11px", fontWeight: "bold", color: "contrast", textOutline: "1px contrast"},
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                padding: 5
            }, cropThreshold: 300, pointRange: 0, softThreshold: !0, states: {
                hover: {
                    animation: {duration: 50}, lineWidthPlus: 1, marker: {},
                    halo: {size: 10, opacity: .25}
                }, select: {marker: {}}
            }, stickyTracking: !0, turboThreshold: 1E3, findNearestPointBy: "x"
        }, {
            isCartesian: !0,
            pointClass: a.Point,
            sorted: !0,
            requireSorting: !0,
            directTouch: !1,
            axisTypes: ["xAxis", "yAxis"],
            colorCounter: 0,
            parallelArrays: ["x", "y"],
            coll: "series",
            init: function (a, b) {
                var c = this, e, d = a.series, g;
                c.chart = a;
                c.options = b = c.setOptions(b);
                c.linkedSeries = [];
                c.bindAxes();
                t(c, {name: b.name, state: "", visible: !1 !== b.visible, selected: !0 === b.selected});
                e = b.events;
                z(e, function (a, b) {
                    y(c, b, a)
                });
                if (e &&
                    e.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect) a.runTrackerClick = !0;
                c.getColor();
                c.getSymbol();
                m(c.parallelArrays, function (a) {
                    c[a + "Data"] = []
                });
                c.setData(b.data, !1);
                c.isCartesian && (a.hasCartesianSeries = !0);
                d.length && (g = d[d.length - 1]);
                c._i = G(g && g._i, -1) + 1;
                a.orderSeries(this.insert(d))
            },
            insert: function (a) {
                var b = this.options.index, c;
                if (p(b)) {
                    for (c = a.length; c--;) if (b >= G(a[c].options.index, a[c]._i)) {
                        a.splice(c + 1, 0, this);
                        break
                    }
                    -1 === c && a.unshift(this);
                    c += 1
                } else a.push(this);
                return G(c,
                    a.length - 1)
            },
            bindAxes: function () {
                var b = this, c = b.options, e = b.chart, d;
                m(b.axisTypes || [], function (g) {
                    m(e[g], function (a) {
                        d = a.options;
                        if (c[g] === d.index || void 0 !== c[g] && c[g] === d.id || void 0 === c[g] && 0 === d.index) b.insert(a.series), b[g] = a, a.isDirty = !0
                    });
                    b[g] || b.optionalAxis === g || a.error(18, !0)
                })
            },
            updateParallelArrays: function (a, b) {
                var c = a.series, e = arguments, d = p(b) ? function (e) {
                    var d = "y" === e && c.toYData ? c.toYData(a) : a[e];
                    c[e + "Data"][b] = d
                } : function (a) {
                    Array.prototype[b].apply(c[a + "Data"], Array.prototype.slice.call(e,
                        2))
                };
                m(c.parallelArrays, d)
            },
            autoIncrement: function () {
                var a = this.options, b = this.xIncrement, c, e = a.pointIntervalUnit, b = G(b, a.pointStart, 0);
                this.pointInterval = c = G(this.pointInterval, a.pointInterval, 1);
                e && (a = new f(b), "day" === e ? a = +a[f.hcSetDate](a[f.hcGetDate]() + c) : "month" === e ? a = +a[f.hcSetMonth](a[f.hcGetMonth]() + c) : "year" === e && (a = +a[f.hcSetFullYear](a[f.hcGetFullYear]() + c)), c = a - b);
                this.xIncrement = b + c;
                return b
            },
            setOptions: function (a) {
                var b = this.chart, c = b.options, e = c.plotOptions, d = (b.userOptions || {}).plotOptions ||
                    {}, f = e[this.type];
                this.userOptions = a;
                b = g(f, e.series, a);
                this.tooltipOptions = g(u.tooltip, u.plotOptions.series && u.plotOptions.series.tooltip, u.plotOptions[this.type].tooltip, c.tooltip.userOptions, e.series && e.series.tooltip, e[this.type].tooltip, a.tooltip);
                this.stickyTracking = G(a.stickyTracking, d[this.type] && d[this.type].stickyTracking, d.series && d.series.stickyTracking, this.tooltipOptions.shared && !this.noSharedTooltip ? !0 : b.stickyTracking);
                null === f.marker && delete b.marker;
                this.zoneAxis = b.zoneAxis;
                a = this.zones =
                    (b.zones || []).slice();
                !b.negativeColor && !b.negativeFillColor || b.zones || a.push({
                    value: b[this.zoneAxis + "Threshold"] || b.threshold || 0,
                    className: "highcharts-negative",
                    color: b.negativeColor,
                    fillColor: b.negativeFillColor
                });
                a.length && n(a[a.length - 1].value) && a.push({color: this.color, fillColor: this.fillColor});
                return b
            },
            getCyclic: function (a, b, c) {
                var e, d = this.chart, g = this.userOptions, f = a + "Index", h = a + "Counter",
                    k = c ? c.length : G(d.options.chart[a + "Count"], d[a + "Count"]);
                b || (e = G(g[f], g["_" + f]), n(e) || (d.series.length ||
                (d[h] = 0), g["_" + f] = e = d[h] % k, d[h] += 1), c && (b = c[e]));
                void 0 !== e && (this[f] = e);
                this[a] = b
            },
            getColor: function () {
                this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || q[this.type].color, this.chart.options.colors)
            },
            getSymbol: function () {
                this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols)
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawLineMarker,
            setData: function (c, d, g, f) {
                var h = this, k = h.points, v = k && k.length || 0, l, t = h.options, F = h.chart, n = null,
                    q = h.xAxis,
                    D = t.turboThreshold, H = this.xData, E = this.yData, u = (l = h.pointArrayMap) && l.length;
                c = c || [];
                l = c.length;
                d = G(d, !0);
                if (!1 !== f && l && v === l && !h.cropped && !h.hasGroupedData && h.visible) m(c, function (a, b) {
                    k[b].update && a !== t.data[b] && k[b].update(a, !1, null, !1)
                }); else {
                    h.xIncrement = null;
                    h.colorCounter = 0;
                    m(this.parallelArrays, function (a) {
                        h[a + "Data"].length = 0
                    });
                    if (D && l > D) {
                        for (g = 0; null === n && g < l;) n = c[g], g++;
                        if (p(n)) for (g = 0; g < l; g++) H[g] = this.autoIncrement(), E[g] = c[g]; else if (e(n)) if (u) for (g = 0; g < l; g++) n = c[g], H[g] = n[0], E[g] = n.slice(1,
                            u + 1); else for (g = 0; g < l; g++) n = c[g], H[g] = n[0], E[g] = n[1]; else a.error(12)
                    } else for (g = 0; g < l; g++) void 0 !== c[g] && (n = {series: h}, h.pointClass.prototype.applyOptions.apply(n, [c[g]]), h.updateParallelArrays(n, g));
                    b(E[0]) && a.error(14, !0);
                    h.data = [];
                    h.options.data = h.userOptions.data = c;
                    for (g = v; g--;) k[g] && k[g].destroy && k[g].destroy();
                    q && (q.minRange = q.userMinRange);
                    h.isDirty = F.isDirtyBox = !0;
                    h.isDirtyData = !!k;
                    g = !1
                }
                "point" === t.legendType && (this.processData(), this.generatePoints());
                d && F.redraw(g)
            },
            processData: function (b) {
                var c =
                    this.xData, e = this.yData, d = c.length, g;
                g = 0;
                var h, f, k = this.xAxis, v, p = this.options;
                v = p.cropThreshold;
                var m = this.getExtremesFromAll || p.getExtremesFromAll, l = this.isCartesian, p = k && k.val2lin,
                    t = k && k.isLog, n, q;
                if (l && !this.isDirty && !k.isDirty && !this.yAxis.isDirty && !b) return !1;
                k && (b = k.getExtremes(), n = b.min, q = b.max);
                if (l && this.sorted && !m && (!v || d > v || this.forceCrop)) if (c[d - 1] < n || c[0] > q) c = [], e = []; else if (c[0] < n || c[d - 1] > q) g = this.cropData(this.xData, this.yData, n, q), c = g.xData, e = g.yData, g = g.start, h = !0;
                for (v = c.length ||
                    1; --v;) d = t ? p(c[v]) - p(c[v - 1]) : c[v] - c[v - 1], 0 < d && (void 0 === f || d < f) ? f = d : 0 > d && this.requireSorting && a.error(15);
                this.cropped = h;
                this.cropStart = g;
                this.processedXData = c;
                this.processedYData = e;
                this.closestPointRange = f
            },
            cropData: function (a, b, c, e) {
                var d = a.length, g = 0, h = d, f = G(this.cropShoulder, 1), k;
                for (k = 0; k < d; k++) if (a[k] >= c) {
                    g = Math.max(0, k - f);
                    break
                }
                for (c = k; c < d; c++) if (a[c] > e) {
                    h = c + f;
                    break
                }
                return {xData: a.slice(g, h), yData: b.slice(g, h), start: g, end: h}
            },
            generatePoints: function () {
                var a = this.options, b = a.data, c = this.data,
                    e, d = this.processedXData, g = this.processedYData, h = this.pointClass, f = d.length,
                    k = this.cropStart || 0, p, m = this.hasGroupedData, a = a.keys, l, n = [], t;
                c || m || (c = [], c.length = b.length, c = this.data = c);
                a && m && (this.options.keys = !1);
                for (t = 0; t < f; t++) p = k + t, m ? (l = (new h).init(this, [d[t]].concat(I(g[t]))), l.dataGroup = this.groupMap[t]) : (l = c[p]) || void 0 === b[p] || (c[p] = l = (new h).init(this, b[p], d[t])), l && (l.index = p, n[t] = l);
                this.options.keys = a;
                if (c && (f !== (e = c.length) || m)) for (t = 0; t < e; t++) t !== k || m || (t += f), c[t] && (c[t].destroyElements(),
                    c[t].plotX = void 0);
                this.data = c;
                this.points = n
            },
            getExtremes: function (a) {
                var b = this.yAxis, c = this.processedXData, d, g = [], h = 0;
                d = this.xAxis.getExtremes();
                var f = d.min, k = d.max, v, m, l, t;
                a = a || this.stackedYData || this.processedYData || [];
                d = a.length;
                for (t = 0; t < d; t++) if (m = c[t], l = a[t], v = (p(l, !0) || e(l)) && (!b.positiveValuesOnly || l.length || 0 < l), m = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (c[t] || m) >= f && (c[t] || m) <= k, v && m) if (v = l.length) for (; v--;) null !== l[v] && (g[h++] = l[v]); else g[h++] = l;
                this.dataMin =
                    B(g);
                this.dataMax = A(g)
            },
            translate: function () {
                this.processedXData || this.processData();
                this.generatePoints();
                var a = this.options, b = a.stacking, c = this.xAxis, e = c.categories, g = this.yAxis, h = this.points,
                    f = h.length, k = !!this.modifyValue, l = a.pointPlacement, m = "between" === l || p(l),
                    t = a.threshold, q = a.startFromThreshold ? t : 0, D, E, u, I, M = Number.MAX_VALUE;
                "between" === l && (l = .5);
                p(l) && (l *= G(a.pointRange || c.pointRange));
                for (a = 0; a < f; a++) {
                    var z = h[a], B = z.x, A = z.y;
                    E = z.low;
                    var y = b && g.stacks[(this.negStacks && A < (q ? 0 : t) ? "-" : "") + this.stackKey],
                        C;
                    g.positiveValuesOnly && null !== A && 0 >= A && (z.isNull = !0);
                    z.plotX = D = d(Math.min(Math.max(-1E5, c.translate(B, 0, 0, 0, 1, l, "flags" === this.type)), 1E5));
                    b && this.visible && !z.isNull && y && y[B] && (I = this.getStackIndicator(I, B, this.index), C = y[B], A = C.points[I.key], E = A[0], A = A[1], E === q && I.key === y[B].base && (E = G(t, g.min)), g.positiveValuesOnly && 0 >= E && (E = null), z.total = z.stackTotal = C.total, z.percentage = C.total && z.y / C.total * 100, z.stackY = A, C.setOffset(this.pointXOffset || 0, this.barW || 0));
                    z.yBottom = n(E) ? g.translate(E, 0, 1, 0, 1) :
                        null;
                    k && (A = this.modifyValue(A, z));
                    z.plotY = E = "number" === typeof A && Infinity !== A ? Math.min(Math.max(-1E5, g.translate(A, 0, 1, 0, 1)), 1E5) : void 0;
                    z.isInside = void 0 !== E && 0 <= E && E <= g.len && 0 <= D && D <= c.len;
                    z.clientX = m ? d(c.translate(B, 0, 0, 0, 1, l)) : D;
                    z.negative = z.y < (t || 0);
                    z.category = e && void 0 !== e[z.x] ? e[z.x] : z.x;
                    z.isNull || (void 0 !== u && (M = Math.min(M, Math.abs(D - u))), u = D);
                    z.zone = this.zones.length && z.getZone()
                }
                this.closestPointRangePx = M
            },
            getValidPoints: function (a, b) {
                var e = this.chart;
                return c(a || this.points || [], function (a) {
                    return b &&
                    !e.isInsidePlot(a.plotX, a.plotY, e.inverted) ? !1 : !a.isNull
                })
            },
            setClip: function (a) {
                var b = this.chart, c = this.options, e = b.renderer, d = b.inverted, g = this.clipBox,
                    h = g || b.clipBox,
                    f = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, h.height, c.xAxis, c.yAxis].join(),
                    k = b[f], v = b[f + "m"];
                k || (a && (h.width = 0, b[f + "m"] = v = e.clipRect(-99, d ? -b.plotLeft : -b.plotTop, 99, d ? b.chartWidth : b.chartHeight)), b[f] = k = e.clipRect(h), k.count = {length: 0});
                a && !k.count[this.index] && (k.count[this.index] = !0, k.count.length += 1);
                !1 !== c.clip &&
                (this.group.clip(a || g ? k : b.clipRect), this.markerGroup.clip(v), this.sharedClipKey = f);
                a || (k.count[this.index] && (delete k.count[this.index], --k.count.length), 0 === k.count.length && f && b[f] && (g || (b[f] = b[f].destroy()), b[f + "m"] && (b[f + "m"] = b[f + "m"].destroy())))
            },
            animate: function (a) {
                var b = this.chart, c = C(this.options.animation), e;
                a ? this.setClip(c) : (e = this.sharedClipKey, (a = b[e]) && a.animate({width: b.plotSizeX}, c), b[e + "m"] && b[e + "m"].animate({width: b.plotSizeX + 99}, c), this.animate = null)
            },
            afterAnimate: function () {
                this.setClip();
                l(this, "afterAnimate")
            },
            drawPoints: function () {
                var a = this.points, b = this.chart, c, e, d, g, f = this.options.marker, h, k, l, m,
                    t = this[this.specialGroup] || this.markerGroup,
                    n = G(f.enabled, this.xAxis.isRadial ? !0 : null, this.closestPointRangePx >= 2 * f.radius);
                if (!1 !== f.enabled || this._hasPointMarkers) for (e = 0; e < a.length; e++) d = a[e], c = d.plotY, g = d.graphic, h = d.marker || {}, k = !!d.marker, l = n && void 0 === h.enabled || h.enabled, m = d.isInside, l && p(c) && null !== d.y ? (c = G(h.symbol, this.symbol), d.hasImage = 0 === c.indexOf("url"), l = this.markerAttribs(d,
                    d.selected && "select"), g ? g[m ? "show" : "hide"](!0).animate(l) : m && (0 < l.width || d.hasImage) && (d.graphic = g = b.renderer.symbol(c, l.x, l.y, l.width, l.height, k ? h : f).add(t)), g && g.attr(this.pointAttribs(d, d.selected && "select")), g && g.addClass(d.getClassName(), !0)) : g && (d.graphic = g.destroy())
            },
            markerAttribs: function (a, b) {
                var c = this.options.marker, e = a.marker || {}, d = G(e.radius, c.radius);
                b && (c = c.states[b], b = e.states && e.states[b], d = G(b && b.radius, c && c.radius, d + (c && c.radiusPlus || 0)));
                a.hasImage && (d = 0);
                a = {
                    x: Math.floor(a.plotX) -
                        d, y: a.plotY - d
                };
                d && (a.width = a.height = 2 * d);
                return a
            },
            pointAttribs: function (a, b) {
                var c = this.options.marker, e = a && a.options, d = e && e.marker || {}, g = this.color,
                    f = e && e.color, h = a && a.color, e = G(d.lineWidth, c.lineWidth);
                a = a && a.zone && a.zone.color;
                g = f || a || h || g;
                a = d.fillColor || c.fillColor || g;
                g = d.lineColor || c.lineColor || g;
                b && (c = c.states[b], b = d.states && d.states[b] || {}, e = G(b.lineWidth, c.lineWidth, e + G(b.lineWidthPlus, c.lineWidthPlus, 0)), a = b.fillColor || c.fillColor || a, g = b.lineColor || c.lineColor || g);
                return {
                    stroke: g, "stroke-width": e,
                    fill: a
                }
            },
            destroy: function () {
                var a = this, b = a.chart, c = /AppleWebKit\/533/.test(M.navigator.userAgent), e, d, g = a.data || [],
                    f, p;
                l(a, "destroy");
                k(a);
                m(a.axisTypes || [], function (b) {
                    (p = a[b]) && p.series && (h(p.series, a), p.isDirty = p.forceRedraw = !0)
                });
                a.legendItem && a.chart.legend.destroyItem(a);
                for (d = g.length; d--;) (f = g[d]) && f.destroy && f.destroy();
                a.points = null;
                clearTimeout(a.animationTimeout);
                z(a, function (a, b) {
                    a instanceof E && !a.survive && (e = c && "group" === b ? "hide" : "destroy", a[e]())
                });
                b.hoverSeries === a && (b.hoverSeries =
                    null);
                h(b.series, a);
                b.orderSeries();
                z(a, function (b, c) {
                    delete a[c]
                })
            },
            getGraphPath: function (a, b, c) {
                var e = this, d = e.options, g = d.step, f, h = [], k = [], v;
                a = a || e.points;
                (f = a.reversed) && a.reverse();
                (g = {right: 1, center: 2}[g] || g && 3) && f && (g = 4 - g);
                !d.connectNulls || b || c || (a = this.getValidPoints(a));
                m(a, function (f, p) {
                    var l = f.plotX, r = f.plotY, m = a[p - 1];
                    (f.leftCliff || m && m.rightCliff) && !c && (v = !0);
                    f.isNull && !n(b) && 0 < p ? v = !d.connectNulls : f.isNull && !b ? v = !0 : (0 === p || v ? p = ["M", f.plotX, f.plotY] : e.getPointSpline ? p = e.getPointSpline(a,
                        f, p) : g ? (p = 1 === g ? ["L", m.plotX, r] : 2 === g ? ["L", (m.plotX + l) / 2, m.plotY, "L", (m.plotX + l) / 2, r] : ["L", l, m.plotY], p.push("L", l, r)) : p = ["L", l, r], k.push(f.x), g && k.push(f.x), h.push.apply(h, p), v = !1)
                });
                h.xMap = k;
                return e.graphPath = h
            },
            drawGraph: function () {
                var a = this, b = this.options, c = (this.gappedPath || this.getGraphPath).call(this),
                    e = [["graph", "highcharts-graph", b.lineColor || this.color, b.dashStyle]];
                m(this.zones, function (c, d) {
                    e.push(["zone-graph-" + d, "highcharts-graph highcharts-zone-graph-" + d + " " + (c.className || ""), c.color ||
                    a.color, c.dashStyle || b.dashStyle])
                });
                m(e, function (e, d) {
                    var g = e[0], f = a[g];
                    f ? (f.endX = c.xMap, f.animate({d: c})) : c.length && (a[g] = a.chart.renderer.path(c).addClass(e[1]).attr({zIndex: 1}).add(a.group), f = {
                        stroke: e[2],
                        "stroke-width": b.lineWidth,
                        fill: a.fillGraph && a.color || "none"
                    }, e[3] ? f.dashstyle = e[3] : "square" !== b.linecap && (f["stroke-linecap"] = f["stroke-linejoin"] = "round"), f = a[g].attr(f).shadow(2 > d && b.shadow));
                    f && (f.startX = c.xMap, f.isArea = c.isArea)
                })
            },
            applyZones: function () {
                var a = this, b = this.chart, c = b.renderer,
                    e = this.zones, d, g, f = this.clips || [], h, k = this.graph, p = this.area,
                    l = Math.max(b.chartWidth, b.chartHeight), t = this[(this.zoneAxis || "y") + "Axis"], n, q,
                    D = b.inverted, E, u, I, z, M = !1;
                e.length && (k || p) && t && void 0 !== t.min && (q = t.reversed, E = t.horiz, k && k.hide(), p && p.hide(), n = t.getExtremes(), m(e, function (e, v) {
                    d = q ? E ? b.plotWidth : 0 : E ? 0 : t.toPixels(n.min);
                    d = Math.min(Math.max(G(g, d), 0), l);
                    g = Math.min(Math.max(Math.round(t.toPixels(G(e.value, n.max), !0)), 0), l);
                    M && (d = g = t.toPixels(n.max));
                    u = Math.abs(d - g);
                    I = Math.min(d, g);
                    z = Math.max(d,
                        g);
                    t.isXAxis ? (h = {
                        x: D ? z : I,
                        y: 0,
                        width: u,
                        height: l
                    }, E || (h.x = b.plotHeight - h.x)) : (h = {
                        x: 0,
                        y: D ? z : I,
                        width: l,
                        height: u
                    }, E && (h.y = b.plotWidth - h.y));
                    D && c.isVML && (h = t.isXAxis ? {
                        x: 0,
                        y: q ? I : z,
                        height: h.width,
                        width: b.chartWidth
                    } : {x: h.y - b.plotLeft - b.spacingBox.x, y: 0, width: h.height, height: b.chartHeight});
                    f[v] ? f[v].animate(h) : (f[v] = c.clipRect(h), k && a["zone-graph-" + v].clip(f[v]), p && a["zone-area-" + v].clip(f[v]));
                    M = e.value > n.max
                }), this.clips = f)
            },
            invertGroups: function (a) {
                function b() {
                    m(["group", "markerGroup"], function (b) {
                        c[b] &&
                        (e.renderer.isVML && c[b].attr({
                            width: c.yAxis.len,
                            height: c.xAxis.len
                        }), c[b].width = c.yAxis.len, c[b].height = c.xAxis.len, c[b].invert(a))
                    })
                }

                var c = this, e = c.chart, d;
                c.xAxis && (d = y(e, "resize", b), y(c, "destroy", d), b(a), c.invertGroups = b)
            },
            plotGroup: function (a, b, c, e, d) {
                var g = this[a], f = !g;
                f && (this[a] = g = this.chart.renderer.g().attr({zIndex: e || .1}).add(d));
                g.addClass("highcharts-" + b + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series highcharts-color-" + this.colorIndex + " " + (this.options.className || ""),
                    !0);
                g.attr({visibility: c})[f ? "attr" : "animate"](this.getPlotBox());
                return g
            },
            getPlotBox: function () {
                var a = this.chart, b = this.xAxis, c = this.yAxis;
                a.inverted && (b = c, c = this.xAxis);
                return {translateX: b ? b.left : a.plotLeft, translateY: c ? c.top : a.plotTop, scaleX: 1, scaleY: 1}
            },
            render: function () {
                var a = this, b = a.chart, c, e = a.options,
                    d = !!a.animate && b.renderer.isSVG && C(e.animation).duration,
                    g = a.visible ? "inherit" : "hidden", f = e.zIndex, h = a.hasRendered, k = b.seriesGroup,
                    p = b.inverted;
                c = a.plotGroup("group", "series", g, f, k);
                a.markerGroup =
                    a.plotGroup("markerGroup", "markers", g, f, k);
                d && a.animate(!0);
                c.inverted = a.isCartesian ? p : !1;
                a.drawGraph && (a.drawGraph(), a.applyZones());
                a.drawDataLabels && a.drawDataLabels();
                a.visible && a.drawPoints();
                a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
                a.invertGroups(p);
                !1 === e.clip || a.sharedClipKey || h || c.clip(b.clipRect);
                d && a.animate();
                h || (a.animationTimeout = D(function () {
                    a.afterAnimate()
                }, d));
                a.isDirty = !1;
                a.hasRendered = !0
            },
            redraw: function () {
                var a = this.chart, b = this.isDirty || this.isDirtyData,
                    c = this.group, e = this.xAxis, d = this.yAxis;
                c && (a.inverted && c.attr({
                    width: a.plotWidth,
                    height: a.plotHeight
                }), c.animate({translateX: G(e && e.left, a.plotLeft), translateY: G(d && d.top, a.plotTop)}));
                this.translate();
                this.render();
                b && delete this.kdTree
            },
            kdAxisArray: ["clientX", "plotY"],
            searchPoint: function (a, b) {
                var c = this.xAxis, e = this.yAxis, d = this.chart.inverted;
                return this.searchKDTree({
                    clientX: d ? c.len - a.chartY + c.pos : a.chartX - c.pos,
                    plotY: d ? e.len - a.chartX + e.pos : a.chartY - e.pos
                }, b)
            },
            buildKDTree: function () {
                function a(c,
                           e, d) {
                    var g, f;
                    if (f = c && c.length) return g = b.kdAxisArray[e % d], c.sort(function (a, b) {
                        return a[g] - b[g]
                    }), f = Math.floor(f / 2), {
                        point: c[f],
                        left: a(c.slice(0, f), e + 1, d),
                        right: a(c.slice(f + 1), e + 1, d)
                    }
                }

                this.buildingKdTree = !0;
                var b = this, c = -1 < b.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                delete b.kdTree;
                D(function () {
                    b.kdTree = a(b.getValidPoints(null, !b.directTouch), c, c);
                    b.buildingKdTree = !1
                }, b.options.kdNow ? 0 : 1)
            },
            searchKDTree: function (a, b) {
                function c(a, b, h, k) {
                    var p = b.point, l = e.kdAxisArray[h % k], m, v, r = p;
                    v = n(a[d]) && n(p[d]) ?
                        Math.pow(a[d] - p[d], 2) : null;
                    m = n(a[g]) && n(p[g]) ? Math.pow(a[g] - p[g], 2) : null;
                    m = (v || 0) + (m || 0);
                    p.dist = n(m) ? Math.sqrt(m) : Number.MAX_VALUE;
                    p.distX = n(v) ? Math.sqrt(v) : Number.MAX_VALUE;
                    l = a[l] - p[l];
                    m = 0 > l ? "left" : "right";
                    v = 0 > l ? "right" : "left";
                    b[m] && (m = c(a, b[m], h + 1, k), r = m[f] < r[f] ? m : p);
                    b[v] && Math.sqrt(l * l) < r[f] && (a = c(a, b[v], h + 1, k), r = a[f] < r[f] ? a : r);
                    return r
                }

                var e = this, d = this.kdAxisArray[0], g = this.kdAxisArray[1], f = b ? "distX" : "dist";
                b = -1 < e.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                this.kdTree || this.buildingKdTree ||
                this.buildKDTree();
                if (this.kdTree) return c(a, this.kdTree, b, b)
            }
        })
    })(K);
    (function (a) {
        var y = a.addEvent, C = a.animate, A = a.Axis, B = a.createElement, d = a.css, f = a.defined, u = a.each,
            q = a.erase, n = a.extend, m = a.fireEvent, h = a.inArray, t = a.isNumber, l = a.isObject, c = a.isArray,
            e = a.merge, p = a.objectEach, b = a.pick, g = a.Point, z = a.Series, G = a.seriesTypes, k = a.setAnimation,
            I = a.splat;
        n(a.Chart.prototype, {
            addSeries: function (a, c, e) {
                var d, g = this;
                a && (c = b(c, !0), m(g, "addSeries", {options: a}, function () {
                    d = g.initSeries(a);
                    g.isDirtyLegend = !0;
                    g.linkSeries();
                    c && g.redraw(e)
                }));
                return d
            },
            addAxis: function (a, c, d, g) {
                var f = c ? "xAxis" : "yAxis", h = this.options;
                a = e(a, {index: this[f].length, isX: c});
                new A(this, a);
                h[f] = I(h[f] || {});
                h[f].push(a);
                b(d, !0) && this.redraw(g)
            },
            showLoading: function (a) {
                var b = this, c = b.options, e = b.loadingDiv, g = c.loading, f = function () {
                    e && d(e, {
                        left: b.plotLeft + "px",
                        top: b.plotTop + "px",
                        width: b.plotWidth + "px",
                        height: b.plotHeight + "px"
                    })
                };
                e || (b.loadingDiv = e = B("div", {className: "highcharts-loading highcharts-loading-hidden"}, null, b.container),
                    b.loadingSpan = B("span", {className: "highcharts-loading-inner"}, null, e), y(b, "redraw", f));
                e.className = "highcharts-loading";
                b.loadingSpan.innerHTML = a || c.lang.loading;
                d(e, n(g.style, {zIndex: 10}));
                d(b.loadingSpan, g.labelStyle);
                b.loadingShown || (d(e, {
                    opacity: 0,
                    display: ""
                }), C(e, {opacity: g.style.opacity || .5}, {duration: g.showDuration || 0}));
                b.loadingShown = !0;
                f()
            },
            hideLoading: function () {
                var a = this.options, b = this.loadingDiv;
                b && (b.className = "highcharts-loading highcharts-loading-hidden", C(b, {opacity: 0}, {
                    duration: a.loading.hideDuration ||
                        100, complete: function () {
                        d(b, {display: "none"})
                    }
                }));
                this.loadingShown = !1
            },
            propsRequireDirtyBox: "backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
            propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions tooltip".split(" "),
            update: function (a,
                              c) {
                var d = this, g = {credits: "addCredits", title: "setTitle", subtitle: "setSubtitle"}, k = a.chart, l,
                    m;
                if (k) {
                    e(!0, d.options.chart, k);
                    "className" in k && d.setClassName(k.className);
                    if ("inverted" in k || "polar" in k) d.propFromSeries(), l = !0;
                    "alignTicks" in k && (l = !0);
                    p(k, function (a, b) {
                        -1 !== h("chart." + b, d.propsRequireUpdateSeries) && (m = !0);
                        -1 !== h(b, d.propsRequireDirtyBox) && (d.isDirtyBox = !0)
                    });
                    "style" in k && d.renderer.setStyle(k.style)
                }
                a.colors && (this.options.colors = a.colors);
                a.plotOptions && e(!0, this.options.plotOptions,
                    a.plotOptions);
                p(a, function (a, b) {
                    if (d[b] && "function" === typeof d[b].update) d[b].update(a, !1); else if ("function" === typeof d[g[b]]) d[g[b]](a);
                    "chart" !== b && -1 !== h(b, d.propsRequireUpdateSeries) && (m = !0)
                });
                u("xAxis yAxis zAxis series colorAxis pane".split(" "), function (b) {
                    a[b] && u(I(a[b]), function (a, c) {
                        (c = f(a.id) && d.get(a.id) || d[b][c]) && c.coll === b && c.update(a, !1)
                    })
                });
                l && u(d.axes, function (a) {
                    a.update({}, !1)
                });
                m && u(d.series, function (a) {
                    a.update({}, !1)
                });
                a.loading && e(!0, d.options.loading, a.loading);
                l = k && k.width;
                k = k && k.height;
                t(l) && l !== d.chartWidth || t(k) && k !== d.chartHeight ? d.setSize(l, k) : b(c, !0) && d.redraw()
            },
            setSubtitle: function (a) {
                this.setTitle(void 0, a)
            }
        });
        n(g.prototype, {
            update: function (a, c, e, d) {
                function g() {
                    f.applyOptions(a);
                    null === f.y && k && (f.graphic = k.destroy());
                    l(a, !0) && (k && k.element && a && a.marker && a.marker.symbol && (f.graphic = k.destroy()), a && a.dataLabels && f.dataLabel && (f.dataLabel = f.dataLabel.destroy()));
                    p = f.index;
                    h.updateParallelArrays(f, p);
                    v.data[p] = l(v.data[p], !0) || l(a, !0) ? f.options : a;
                    h.isDirty = h.isDirtyData =
                        !0;
                    !h.fixedBox && h.hasCartesianSeries && (m.isDirtyBox = !0);
                    "point" === v.legendType && (m.isDirtyLegend = !0);
                    c && m.redraw(e)
                }

                var f = this, h = f.series, k = f.graphic, p, m = h.chart, v = h.options;
                c = b(c, !0);
                !1 === d ? g() : f.firePointEvent("update", {options: a}, g)
            }, remove: function (a, b) {
                this.series.removePoint(h(this, this.series.data), a, b)
            }
        });
        n(z.prototype, {
            addPoint: function (a, c, e, d) {
                var g = this.options, f = this.data, h = this.chart, k = this.xAxis, k = k && k.hasNames && k.names,
                    p = g.data, l, m, v = this.xData, t, n;
                c = b(c, !0);
                l = {series: this};
                this.pointClass.prototype.applyOptions.apply(l,
                    [a]);
                n = l.x;
                t = v.length;
                if (this.requireSorting && n < v[t - 1]) for (m = !0; t && v[t - 1] > n;) t--;
                this.updateParallelArrays(l, "splice", t, 0, 0);
                this.updateParallelArrays(l, t);
                k && l.name && (k[n] = l.name);
                p.splice(t, 0, a);
                m && (this.data.splice(t, 0, null), this.processData());
                "point" === g.legendType && this.generatePoints();
                e && (f[0] && f[0].remove ? f[0].remove(!1) : (f.shift(), this.updateParallelArrays(l, "shift"), p.shift()));
                this.isDirtyData = this.isDirty = !0;
                c && h.redraw(d)
            }, removePoint: function (a, c, e) {
                var d = this, g = d.data, f = g[a], h = d.points,
                    p = d.chart, l = function () {
                        h && h.length === g.length && h.splice(a, 1);
                        g.splice(a, 1);
                        d.options.data.splice(a, 1);
                        d.updateParallelArrays(f || {series: d}, "splice", a, 1);
                        f && f.destroy();
                        d.isDirty = !0;
                        d.isDirtyData = !0;
                        c && p.redraw()
                    };
                k(e, p);
                c = b(c, !0);
                f ? f.firePointEvent("remove", null, l) : l()
            }, remove: function (a, c, e) {
                function d() {
                    g.destroy();
                    f.isDirtyLegend = f.isDirtyBox = !0;
                    f.linkSeries();
                    b(a, !0) && f.redraw(c)
                }

                var g = this, f = g.chart;
                !1 !== e ? m(g, "remove", null, d) : d()
            }, update: function (a, c) {
                var d = this, g = d.chart, f = d.userOptions, h =
                    d.oldType || d.type, k = a.type || f.type || g.options.chart.type, p = G[h].prototype,
                    l = ["group", "markerGroup", "dataLabelsGroup"], m;
                if (Object.keys && "data" === Object.keys(a).toString()) return this.setData(a.data, c);
                if (k && k !== h || void 0 !== a.zIndex) l.length = 0;
                u(l, function (a) {
                    l[a] = d[a];
                    delete d[a]
                });
                a = e(f, {animation: !1, index: d.index, pointStart: d.xData[0]}, {data: d.options.data}, a);
                d.remove(!1, null, !1);
                for (m in p) d[m] = void 0;
                n(d, G[k || h].prototype);
                u(l, function (a) {
                    d[a] = l[a]
                });
                d.init(g, a);
                d.oldType = h;
                g.linkSeries();
                b(c,
                    !0) && g.redraw(!1)
            }
        });
        n(A.prototype, {
            update: function (a, c) {
                var d = this.chart;
                a = d.options[this.coll][this.options.index] = e(this.userOptions, a);
                this.destroy(!0);
                this.init(d, n(a, {events: void 0}));
                d.isDirtyBox = !0;
                b(c, !0) && d.redraw()
            }, remove: function (a) {
                for (var e = this.chart, d = this.coll, g = this.series, f = g.length; f--;) g[f] && g[f].remove(!1);
                q(e.axes, this);
                q(e[d], this);
                c(e.options[d]) ? e.options[d].splice(this.options.index, 1) : delete e.options[d];
                u(e[d], function (a, b) {
                    a.options.index = b
                });
                this.destroy();
                e.isDirtyBox =
                    !0;
                b(a, !0) && e.redraw()
            }, setTitle: function (a, b) {
                this.update({title: a}, b)
            }, setCategories: function (a, b) {
                this.update({categories: a}, b)
            }
        })
    })(K);
    (function (a) {
        var y = a.animObject, C = a.color, A = a.each, B = a.extend, d = a.isNumber, f = a.merge, u = a.pick,
            q = a.Series, n = a.seriesType, m = a.svg;
        n("column", "line", {
            borderRadius: 0,
            crisp: !0,
            groupPadding: .2,
            marker: null,
            pointPadding: .1,
            minPointLength: 0,
            cropThreshold: 50,
            pointRange: null,
            states: {
                hover: {halo: !1, brightness: .1, shadow: !1},
                select: {color: "#cccccc", borderColor: "#000000", shadow: !1}
            },
            dataLabels: {align: null, verticalAlign: null, y: null},
            softThreshold: !1,
            startFromThreshold: !0,
            stickyTracking: !1,
            tooltip: {distance: 6},
            threshold: 0,
            borderColor: "#ffffff"
        }, {
            cropShoulder: 0,
            directTouch: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            negStacks: !0,
            init: function () {
                q.prototype.init.apply(this, arguments);
                var a = this, d = a.chart;
                d.hasRendered && A(d.series, function (d) {
                    d.type === a.type && (d.isDirty = !0)
                })
            },
            getColumnMetrics: function () {
                var a = this, d = a.options, f = a.xAxis, c = a.yAxis, e = f.reversed, p, b = {}, g = 0;
                !1 === d.grouping ?
                    g = 1 : A(a.chart.series, function (d) {
                        var e = d.options, f = d.yAxis, h;
                        d.type !== a.type || !d.visible && a.chart.options.chart.ignoreHiddenSeries || c.len !== f.len || c.pos !== f.pos || (e.stacking ? (p = d.stackKey, void 0 === b[p] && (b[p] = g++), h = b[p]) : !1 !== e.grouping && (h = g++), d.columnIndex = h)
                    });
                var m = Math.min(Math.abs(f.transA) * (f.ordinalSlope || d.pointRange || f.closestPointRange || f.tickInterval || 1), f.len),
                    n = m * d.groupPadding, k = (m - 2 * n) / (g || 1),
                    d = Math.min(d.maxPointWidth || f.len, u(d.pointWidth, k * (1 - 2 * d.pointPadding)));
                a.columnMetrics =
                    {
                        width: d,
                        offset: (k - d) / 2 + (n + ((a.columnIndex || 0) + (e ? 1 : 0)) * k - m / 2) * (e ? -1 : 1)
                    };
                return a.columnMetrics
            },
            crispCol: function (a, d, f, c) {
                var e = this.chart, h = this.borderWidth, b = -(h % 2 ? .5 : 0), h = h % 2 ? .5 : 1;
                e.inverted && e.renderer.isVML && (h += 1);
                this.options.crisp && (f = Math.round(a + f) + b, a = Math.round(a) + b, f -= a);
                c = Math.round(d + c) + h;
                b = .5 >= Math.abs(d) && .5 < c;
                d = Math.round(d) + h;
                c -= d;
                b && c && (--d, c += 1);
                return {x: a, y: d, width: f, height: c}
            },
            translate: function () {
                var a = this, d = a.chart, f = a.options, c = a.dense = 2 > a.closestPointRange * a.xAxis.transA,
                    c = a.borderWidth = u(f.borderWidth, c ? 0 : 1), e = a.yAxis,
                    p = a.translatedThreshold = e.getThreshold(f.threshold), b = u(f.minPointLength, 5),
                    g = a.getColumnMetrics(), m = g.width, n = a.barW = Math.max(m, 1 + 2 * c),
                    k = a.pointXOffset = g.offset;
                d.inverted && (p -= .5);
                f.pointPadding && (n = Math.ceil(n));
                q.prototype.translate.apply(a);
                A(a.points, function (c) {
                    var g = u(c.yBottom, p), f = 999 + Math.abs(g), f = Math.min(Math.max(-f, c.plotY), e.len + f),
                        h = c.plotX + k, l = n, t = Math.min(f, g), q, z = Math.max(f, g) - t;
                    Math.abs(z) < b && b && (z = b, q = !e.reversed && !c.negative ||
                        e.reversed && c.negative, t = Math.abs(t - p) > b ? g - b : p - (q ? b : 0));
                    c.barX = h;
                    c.pointWidth = m;
                    c.tooltipPos = d.inverted ? [e.len + e.pos - d.plotLeft - f, a.xAxis.len - h - l / 2, z] : [h + l / 2, f + e.pos - d.plotTop, z];
                    c.shapeType = "rect";
                    c.shapeArgs = a.crispCol.apply(a, c.isNull ? [h, p, l, 0] : [h, t, l, z])
                })
            },
            getSymbol: a.noop,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            drawGraph: function () {
                this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
            },
            pointAttribs: function (a, d) {
                var h = this.options, c, e = this.pointAttrToOptions || {};
                c = e.stroke || "borderColor";
                var p = e["stroke-width"] || "borderWidth", b = a && a.color || this.color,
                    g = a[c] || h[c] || this.color || b, m = a[p] || h[p] || this[p] || 0, e = h.dashStyle;
                a && this.zones.length && (b = a.getZone(), b = a.options.color || b && b.color || this.color);
                d && (a = f(h.states[d], a.options.states && a.options.states[d] || {}), d = a.brightness, b = a.color || void 0 !== d && C(b).brighten(a.brightness).get() || b, g = a[c] || g, m = a[p] || m, e = a.dashStyle || e);
                c = {fill: b, stroke: g, "stroke-width": m};
                h.borderRadius && (c.r = h.borderRadius);
                e && (c.dashstyle =
                    e);
                return c
            },
            drawPoints: function () {
                var a = this, m = this.chart, l = a.options, c = m.renderer, e = l.animationLimit || 250, p;
                A(a.points, function (b) {
                    var g = b.graphic;
                    if (d(b.plotY) && null !== b.y) {
                        p = b.shapeArgs;
                        if (g) g[m.pointCount < e ? "animate" : "attr"](f(p)); else b.graphic = g = c[b.shapeType](p).add(b.group || a.group);
                        g.attr(a.pointAttribs(b, b.selected && "select")).shadow(l.shadow, null, l.stacking && !l.borderRadius);
                        g.addClass(b.getClassName(), !0)
                    } else g && (b.graphic = g.destroy())
                })
            },
            animate: function (a) {
                var d = this, f = this.yAxis,
                    c = d.options, e = this.chart.inverted, h = {};
                m && (a ? (h.scaleY = .001, a = Math.min(f.pos + f.len, Math.max(f.pos, f.toPixels(c.threshold))), e ? h.translateX = a - f.len : h.translateY = a, d.group.attr(h)) : (h[e ? "translateX" : "translateY"] = f.pos, d.group.animate(h, B(y(d.options.animation), {
                    step: function (a, c) {
                        d.group.attr({scaleY: Math.max(.001, c.pos)})
                    }
                })), d.animate = null))
            },
            remove: function () {
                var a = this, d = a.chart;
                d.hasRendered && A(d.series, function (d) {
                    d.type === a.type && (d.isDirty = !0)
                });
                q.prototype.remove.apply(a, arguments)
            }
        })
    })(K);
    (function (a) {
        var y = a.Series;
        a = a.seriesType;
        a("scatter", "line", {
            lineWidth: 0,
            findNearestPointBy: "xy",
            marker: {enabled: !0},
            tooltip: {
                headerFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 0.85em"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: "x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"
            }
        }, {
            sorted: !1,
            requireSorting: !1,
            noSharedTooltip: !0,
            trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
            takeOrdinalPosition: !1,
            drawGraph: function () {
                this.options.lineWidth && y.prototype.drawGraph.call(this)
            }
        })
    })(K);
    (function (a) {
        var y = a.addEvent, C = a.arrayMax, A = a.defined, B = a.each, d = a.extend, f = a.format, u = a.map,
            q = a.merge, n = a.noop, m = a.pick, h = a.relativeLength, t = a.Series, l = a.seriesTypes,
            c = a.stableSort;
        a.distribute = function (a, d) {
            function b(a, b) {
                return a.target - b.target
            }

            var e, f = !0, h = a, k = [], p;
            p = 0;
            for (e = a.length; e--;) p += a[e].size;
            if (p > d) {
                c(a, function (a, b) {
                    return (b.rank || 0) - (a.rank || 0)
                });
                for (p = e = 0; p <= d;) p += a[e].size, e++;
                k = a.splice(e - 1,
                    a.length)
            }
            c(a, b);
            for (a = u(a, function (a) {
                return {size: a.size, targets: [a.target]}
            }); f;) {
                for (e = a.length; e--;) f = a[e], p = (Math.min.apply(0, f.targets) + Math.max.apply(0, f.targets)) / 2, f.pos = Math.min(Math.max(0, p - f.size / 2), d - f.size);
                e = a.length;
                for (f = !1; e--;) 0 < e && a[e - 1].pos + a[e - 1].size > a[e].pos && (a[e - 1].size += a[e].size, a[e - 1].targets = a[e - 1].targets.concat(a[e].targets), a[e - 1].pos + a[e - 1].size > d && (a[e - 1].pos = d - a[e - 1].size), a.splice(e, 1), f = !0)
            }
            e = 0;
            B(a, function (a) {
                var b = 0;
                B(a.targets, function () {
                    h[e].pos = a.pos + b;
                    b +=
                        h[e].size;
                    e++
                })
            });
            h.push.apply(h, k);
            c(h, b)
        };
        t.prototype.drawDataLabels = function () {
            var c = this, d = c.options, b = d.dataLabels, g = c.points, h, l, k = c.hasRendered || 0, n, t,
                u = m(b.defer, !!d.animation), M = c.chart.renderer;
            if (b.enabled || c._hasPointLabels) c.dlProcessOptions && c.dlProcessOptions(b), t = c.plotGroup("dataLabelsGroup", "data-labels", u && !k ? "hidden" : "visible", b.zIndex || 6), u && (t.attr({opacity: +k}), k || y(c, "afterAnimate", function () {
                c.visible && t.show(!0);
                t[d.animation ? "animate" : "attr"]({opacity: 1}, {duration: 200})
            })),
                l = b, B(g, function (e) {
                var g, k = e.dataLabel, p, r, v = e.connector, u = !k, D;
                h = e.dlOptions || e.options && e.options.dataLabels;
                if (g = m(h && h.enabled, l.enabled) && null !== e.y) b = q(l, h), p = e.getLabelConfig(), n = b.format ? f(b.format, p) : b.formatter.call(p, b), D = b.style, p = b.rotation, D.color = m(b.color, D.color, c.color, "#000000"), "contrast" === D.color && (e.contrastColor = M.getContrast(e.color || c.color), D.color = b.inside || 0 > m(e.labelDistance, b.distance) || d.stacking ? e.contrastColor : "#000000"), d.cursor && (D.cursor = d.cursor), r = {
                    fill: b.backgroundColor,
                    stroke: b.borderColor,
                    "stroke-width": b.borderWidth,
                    r: b.borderRadius || 0,
                    rotation: p,
                    padding: b.padding,
                    zIndex: 1
                }, a.objectEach(r, function (a, b) {
                    void 0 === a && delete r[b]
                });
                !k || g && A(n) ? g && A(n) && (k ? r.text = n : (k = e.dataLabel = M[p ? "text" : "label"](n, 0, -9999, b.shape, null, null, b.useHTML, null, "data-label"), k.addClass("highcharts-data-label-color-" + e.colorIndex + " " + (b.className || "") + (b.useHTML ? "highcharts-tracker" : ""))), k.attr(r), k.css(D).shadow(b.shadow), k.added || k.add(t), c.alignDataLabel(e, k, b, null, u)) : (e.dataLabel =
                    k = k.destroy(), v && (e.connector = v.destroy()))
            })
        };
        t.prototype.alignDataLabel = function (a, c, b, g, f) {
            var e = this.chart, h = e.inverted, p = m(a.plotX, -9999), l = m(a.plotY, -9999), n = c.getBBox(), t,
                v = b.rotation, q = b.align,
                u = this.visible && (a.series.forceDL || e.isInsidePlot(p, Math.round(l), h) || g && e.isInsidePlot(p, h ? g.x + 1 : g.y + g.height - 1, h)),
                z = "justify" === m(b.overflow, "justify");
            if (u && (t = b.style.fontSize, t = e.renderer.fontMetrics(t, c).b, g = d({
                x: h ? e.plotWidth - l : p,
                y: Math.round(h ? e.plotHeight - p : l),
                width: 0,
                height: 0
            }, g), d(b, {
                width: n.width,
                height: n.height
            }), v ? (z = !1, p = e.renderer.rotCorr(t, v), p = {
                x: g.x + b.x + g.width / 2 + p.x,
                y: g.y + b.y + {top: 0, middle: .5, bottom: 1}[b.verticalAlign] * g.height
            }, c[f ? "attr" : "animate"](p).attr({align: q}), l = (v + 720) % 360, l = 180 < l && 360 > l, "left" === q ? p.y -= l ? n.height : 0 : "center" === q ? (p.x -= n.width / 2, p.y -= n.height / 2) : "right" === q && (p.x -= n.width, p.y -= l ? 0 : n.height)) : (c.align(b, null, g), p = c.alignAttr), z ? a.isLabelJustified = this.justifyDataLabel(c, b, p, n, g, f) : m(b.crop, !0) && (u = e.isInsidePlot(p.x, p.y) && e.isInsidePlot(p.x + n.width, p.y + n.height)),
            b.shape && !v)) c[f ? "attr" : "animate"]({
                anchorX: h ? e.plotWidth - a.plotY : a.plotX,
                anchorY: h ? e.plotHeight - a.plotX : a.plotY
            });
            u || (c.attr({y: -9999}), c.placed = !1)
        };
        t.prototype.justifyDataLabel = function (a, c, b, d, f, h) {
            var e = this.chart, g = c.align, p = c.verticalAlign, m, l, n = a.box ? 0 : a.padding || 0;
            m = b.x + n;
            0 > m && ("right" === g ? c.align = "left" : c.x = -m, l = !0);
            m = b.x + d.width - n;
            m > e.plotWidth && ("left" === g ? c.align = "right" : c.x = e.plotWidth - m, l = !0);
            m = b.y + n;
            0 > m && ("bottom" === p ? c.verticalAlign = "top" : c.y = -m, l = !0);
            m = b.y + d.height - n;
            m > e.plotHeight &&
            ("top" === p ? c.verticalAlign = "bottom" : c.y = e.plotHeight - m, l = !0);
            l && (a.placed = !h, a.align(c, null, f));
            return l
        };
        l.pie && (l.pie.prototype.drawDataLabels = function () {
            var c = this, d = c.data, b, g = c.chart, f = c.options.dataLabels, h = m(f.connectorPadding, 10),
                k = m(f.connectorWidth, 1), l = g.plotWidth, n = g.plotHeight, q, u = c.center, v = u[2] / 2, F = u[1],
                y, J, r, w, P = [[], []], L, N, K, O, x = [0, 0, 0, 0];
            c.visible && (f.enabled || c._hasPointLabels) && (B(d, function (a) {
                a.dataLabel && a.visible && a.dataLabel.shortened && (a.dataLabel.attr({width: "auto"}).css({
                    width: "auto",
                    textOverflow: "clip"
                }), a.dataLabel.shortened = !1)
            }), t.prototype.drawDataLabels.apply(c), B(d, function (a) {
                a.dataLabel && a.visible && (P[a.half].push(a), a.dataLabel._pos = null)
            }), B(P, function (d, e) {
                var k, m, p = d.length, t = [], q;
                if (p) for (c.sortByAngle(d, e - .5), 0 < c.maxLabelDistance && (k = Math.max(0, F - v - c.maxLabelDistance), m = Math.min(F + v + c.maxLabelDistance, g.plotHeight), B(d, function (a) {
                    0 < a.labelDistance && a.dataLabel && (a.top = Math.max(0, F - v - a.labelDistance), a.bottom = Math.min(F + v + a.labelDistance, g.plotHeight), q = a.dataLabel.getBBox().height ||
                        21, a.positionsIndex = t.push({target: a.labelPos[1] - a.top + q / 2, size: q, rank: a.y}) - 1)
                }), a.distribute(t, m + q - k)), O = 0; O < p; O++) b = d[O], m = b.positionsIndex, r = b.labelPos, y = b.dataLabel, K = !1 === b.visible ? "hidden" : "inherit", k = r[1], t && A(t[m]) ? void 0 === t[m].pos ? K = "hidden" : (w = t[m].size, N = b.top + t[m].pos) : N = k, delete b.positionIndex, L = f.justify ? u[0] + (e ? -1 : 1) * (v + b.labelDistance) : c.getX(N < b.top + 2 || N > b.bottom - 2 ? k : N, e, b), y._attr = {
                    visibility: K,
                    align: r[6]
                }, y._pos = {x: L + f.x + ({left: h, right: -h}[r[6]] || 0), y: N + f.y - 10}, r.x = L, r.y = N, J =
                    y.getBBox().width, k = null, L - J < h ? (k = Math.round(J - L + h), x[3] = Math.max(k, x[3])) : L + J > l - h && (k = Math.round(L + J - l + h), x[1] = Math.max(k, x[1])), 0 > N - w / 2 ? x[0] = Math.max(Math.round(-N + w / 2), x[0]) : N + w / 2 > n && (x[2] = Math.max(Math.round(N + w / 2 - n), x[2])), y.sideOverflow = k
            }), 0 === C(x) || this.verifyDataLabelOverflow(x)) && (this.placeDataLabels(), k && B(this.points, function (a) {
                var b;
                q = a.connector;
                if ((y = a.dataLabel) && y._pos && a.visible && 0 < a.labelDistance) {
                    K = y._attr.visibility;
                    if (b = !q) a.connector = q = g.renderer.path().addClass("highcharts-data-label-connector highcharts-color-" +
                        a.colorIndex).add(c.dataLabelsGroup), q.attr({
                        "stroke-width": k,
                        stroke: f.connectorColor || a.color || "#666666"
                    });
                    q[b ? "attr" : "animate"]({d: c.connectorPath(a.labelPos)});
                    q.attr("visibility", K)
                } else q && (a.connector = q.destroy())
            }))
        }, l.pie.prototype.connectorPath = function (a) {
            var c = a.x, b = a.y;
            return m(this.options.dataLabels.softConnector, !0) ? ["M", c + ("left" === a[6] ? 5 : -5), b, "C", c, b, 2 * a[2] - a[4], 2 * a[3] - a[5], a[2], a[3], "L", a[4], a[5]] : ["M", c + ("left" === a[6] ? 5 : -5), b, "L", a[2], a[3], "L", a[4], a[5]]
        }, l.pie.prototype.placeDataLabels =
            function () {
                B(this.points, function (a) {
                    var c = a.dataLabel;
                    c && a.visible && ((a = c._pos) ? (c.sideOverflow && (c._attr.width = c.getBBox().width - c.sideOverflow, c.css({
                        width: c._attr.width + "px",
                        textOverflow: "ellipsis"
                    }), c.shortened = !0), c.attr(c._attr), c[c.moved ? "animate" : "attr"](a), c.moved = !0) : c && c.attr({y: -9999}))
                }, this)
            }, l.pie.prototype.alignDataLabel = n, l.pie.prototype.verifyDataLabelOverflow = function (a) {
            var c = this.center, b = this.options, d = b.center, e = b.minSize || 80, f, k = null !== b.size;
            k || (null !== d[0] ? f = Math.max(c[2] -
                Math.max(a[1], a[3]), e) : (f = Math.max(c[2] - a[1] - a[3], e), c[0] += (a[3] - a[1]) / 2), null !== d[1] ? f = Math.max(Math.min(f, c[2] - Math.max(a[0], a[2])), e) : (f = Math.max(Math.min(f, c[2] - a[0] - a[2]), e), c[1] += (a[0] - a[2]) / 2), f < c[2] ? (c[2] = f, c[3] = Math.min(h(b.innerSize || 0, f), f), this.translate(c), this.drawDataLabels && this.drawDataLabels()) : k = !0);
            return k
        });
        l.column && (l.column.prototype.alignDataLabel = function (a, c, b, d, f) {
            var e = this.chart.inverted, g = a.series, h = a.dlBox || a.shapeArgs,
                l = m(a.below, a.plotY > m(this.translatedThreshold,
                    g.yAxis.len)), p = m(b.inside, !!this.options.stacking);
            h && (d = q(h), 0 > d.y && (d.height += d.y, d.y = 0), h = d.y + d.height - g.yAxis.len, 0 < h && (d.height -= h), e && (d = {
                x: g.yAxis.len - d.y - d.height,
                y: g.xAxis.len - d.x - d.width,
                width: d.height,
                height: d.width
            }), p || (e ? (d.x += l ? 0 : d.width, d.width = 0) : (d.y += l ? d.height : 0, d.height = 0)));
            b.align = m(b.align, !e || p ? "center" : l ? "right" : "left");
            b.verticalAlign = m(b.verticalAlign, e || p ? "middle" : l ? "top" : "bottom");
            t.prototype.alignDataLabel.call(this, a, c, b, d, f);
            a.isLabelJustified && a.contrastColor && a.dataLabel.css({color: a.contrastColor})
        })
    })(K);
    (function (a) {
        var y = a.Chart, C = a.each, A = a.pick, B = a.addEvent;
        y.prototype.callbacks.push(function (a) {
            function d() {
                var d = [];
                C(a.series || [], function (a) {
                    var f = a.options.dataLabels, m = a.dataLabelCollections || ["dataLabel"];
                    (f.enabled || a._hasPointLabels) && !f.allowOverlap && a.visible && C(m, function (f) {
                        C(a.points, function (a) {
                            a[f] && (a[f].labelrank = A(a.labelrank, a.shapeArgs && a.shapeArgs.height), d.push(a[f]))
                        })
                    })
                });
                a.hideOverlappingLabels(d)
            }

            d();
            B(a, "redraw", d)
        });
        y.prototype.hideOverlappingLabels = function (a) {
            var d =
                a.length, u, q, n, m, h, t, l, c, e, p = function (a, c, d, e, f, h, m, l) {
                return !(f > a + d || f + m < a || h > c + e || h + l < c)
            };
            for (q = 0; q < d; q++) if (u = a[q]) u.oldOpacity = u.opacity, u.newOpacity = 1;
            a.sort(function (a, c) {
                return (c.labelrank || 0) - (a.labelrank || 0)
            });
            for (q = 0; q < d; q++) for (n = a[q], u = q + 1; u < d; ++u) if (m = a[u], n && m && n !== m && n.placed && m.placed && 0 !== n.newOpacity && 0 !== m.newOpacity && (h = n.alignAttr, t = m.alignAttr, l = n.parentGroup, c = m.parentGroup, e = 2 * (n.box ? 0 : n.padding), h = p(h.x + l.translateX, h.y + l.translateY, n.width - e, n.height - e, t.x + c.translateX, t.y +
                c.translateY, m.width - e, m.height - e))) (n.labelrank < m.labelrank ? n : m).newOpacity = 0;
            C(a, function (a) {
                var b, c;
                a && (c = a.newOpacity, a.oldOpacity !== c && a.placed && (c ? a.show(!0) : b = function () {
                    a.hide()
                }, a.alignAttr.opacity = c, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, b)), a.isOld = !0)
            })
        }
    })(K);
    (function (a) {
        var y = a.addEvent, C = a.Chart, A = a.createElement, B = a.css, d = a.defaultOptions, f = a.defaultPlotOptions,
            u = a.each, q = a.extend, n = a.fireEvent, m = a.hasTouch, h = a.inArray, t = a.isObject, l = a.Legend,
            c = a.merge, e = a.pick, p = a.Point, b = a.Series,
            g = a.seriesTypes, z = a.svg, G;
        G = a.TrackerMixin = {
            drawTrackerPoint: function () {
                var a = this, b = a.chart.pointer, c = function (a) {
                    var c = b.getPointFromEvent(a);
                    void 0 !== c && (b.isDirectTouch = !0, c.onMouseOver(a))
                };
                u(a.points, function (a) {
                    a.graphic && (a.graphic.element.point = a);
                    a.dataLabel && (a.dataLabel.div ? a.dataLabel.div.point = a : a.dataLabel.element.point = a)
                });
                a._hasTracking || (u(a.trackerGroups, function (d) {
                    if (a[d]) {
                        a[d].addClass("highcharts-tracker").on("mouseover", c).on("mouseout", function (a) {
                            b.onTrackerMouseOut(a)
                        });
                        if (m) a[d].on("touchstart", c);
                        a.options.cursor && a[d].css(B).css({cursor: a.options.cursor})
                    }
                }), a._hasTracking = !0)
            }, drawTrackerGraph: function () {
                var a = this, b = a.options, c = b.trackByArea, d = [].concat(c ? a.areaPath : a.graphPath),
                    e = d.length, g = a.chart, f = g.pointer, h = g.renderer, l = g.options.tooltip.snap, p = a.tracker,
                    n, t = function () {
                        if (g.hoverSeries !== a) a.onMouseOver()
                    }, q = "rgba(192,192,192," + (z ? .0001 : .002) + ")";
                if (e && !c) for (n = e + 1; n--;) "M" === d[n] && d.splice(n + 1, 0, d[n + 1] - l, d[n + 2], "L"), (n && "M" === d[n] || n === e) && d.splice(n,
                    0, "L", d[n - 2] + l, d[n - 1]);
                p ? p.attr({d: d}) : a.graph && (a.tracker = h.path(d).attr({
                    "stroke-linejoin": "round",
                    visibility: a.visible ? "visible" : "hidden",
                    stroke: q,
                    fill: c ? q : "none",
                    "stroke-width": a.graph.strokeWidth() + (c ? 0 : 2 * l),
                    zIndex: 2
                }).add(a.group), u([a.tracker, a.markerGroup], function (a) {
                    a.addClass("highcharts-tracker").on("mouseover", t).on("mouseout", function (a) {
                        f.onTrackerMouseOut(a)
                    });
                    b.cursor && a.css({cursor: b.cursor});
                    if (m) a.on("touchstart", t)
                }))
            }
        };
        g.column && (g.column.prototype.drawTracker = G.drawTrackerPoint);
        g.pie && (g.pie.prototype.drawTracker = G.drawTrackerPoint);
        g.scatter && (g.scatter.prototype.drawTracker = G.drawTrackerPoint);
        q(l.prototype, {
            setItemEvents: function (a, b, d) {
                var e = this, g = e.chart.renderer.boxWrapper,
                    f = "highcharts-legend-" + (a.series ? "point" : "series") + "-active";
                (d ? b : a.legendGroup).on("mouseover", function () {
                    a.setState("hover");
                    g.addClass(f);
                    b.css(e.options.itemHoverStyle)
                }).on("mouseout", function () {
                    b.css(c(a.visible ? e.itemStyle : e.itemHiddenStyle));
                    g.removeClass(f);
                    a.setState()
                }).on("click", function (b) {
                    var c =
                        function () {
                            a.setVisible && a.setVisible()
                        };
                    b = {browserEvent: b};
                    a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : n(a, "legendItemClick", b, c)
                })
            }, createCheckboxForItem: function (a) {
                a.checkbox = A("input", {
                    type: "checkbox",
                    checked: a.selected,
                    defaultChecked: a.selected
                }, this.options.itemCheckboxStyle, this.chart.container);
                y(a.checkbox, "click", function (b) {
                    n(a.series || a, "checkboxClick", {checked: b.target.checked, item: a}, function () {
                        a.select()
                    })
                })
            }
        });
        d.legend.itemStyle.cursor = "pointer";
        q(C.prototype, {
            showResetZoom: function () {
                var a =
                        this, b = d.lang, c = a.options.chart.resetZoomButton, e = c.theme, g = e.states,
                    f = "chart" === c.relativeTo ? null : "plotBox";
                this.resetZoomButton = a.renderer.button(b.resetZoom, null, null, function () {
                    a.zoomOut()
                }, e, g && g.hover).attr({
                    align: c.position.align,
                    title: b.resetZoomTitle
                }).addClass("highcharts-reset-zoom").add().align(c.position, !1, f)
            }, zoomOut: function () {
                var a = this;
                n(a, "selection", {resetSelection: !0}, function () {
                    a.zoom()
                })
            }, zoom: function (a) {
                var b, c = this.pointer, d = !1, g;
                !a || a.resetSelection ? u(this.axes, function (a) {
                    b =
                        a.zoom()
                }) : u(a.xAxis.concat(a.yAxis), function (a) {
                    var e = a.axis;
                    c[e.isXAxis ? "zoomX" : "zoomY"] && (b = e.zoom(a.min, a.max), e.displayBtn && (d = !0))
                });
                g = this.resetZoomButton;
                d && !g ? this.showResetZoom() : !d && t(g) && (this.resetZoomButton = g.destroy());
                b && this.redraw(e(this.options.chart.animation, a && a.animation, 100 > this.pointCount))
            }, pan: function (a, b) {
                var c = this, d = c.hoverPoints, e;
                d && u(d, function (a) {
                    a.setState()
                });
                u("xy" === b ? [1, 0] : [1], function (b) {
                    b = c[b ? "xAxis" : "yAxis"][0];
                    var d = b.horiz, g = a[d ? "chartX" : "chartY"], d = d ?
                        "mouseDownX" : "mouseDownY", f = c[d], h = (b.pointRange || 0) / 2, k = b.getExtremes(),
                        m = b.toValue(f - g, !0) + h, h = b.toValue(f + b.len - g, !0) - h, l = h < m, f = l ? h : m,
                        m = l ? m : h, h = Math.min(k.dataMin, b.toValue(b.toPixels(k.min) - b.minPixelPadding)),
                        l = Math.max(k.dataMax, b.toValue(b.toPixels(k.max) + b.minPixelPadding)), p;
                    p = h - f;
                    0 < p && (m += p, f = h);
                    p = m - l;
                    0 < p && (m = l, f -= p);
                    b.series.length && f !== k.min && m !== k.max && (b.setExtremes(f, m, !1, !1, {trigger: "pan"}), e = !0);
                    c[d] = g
                });
                e && c.redraw(!1);
                B(c.container, {cursor: "move"})
            }
        });
        q(p.prototype, {
            select: function (a,
                              b) {
                var c = this, d = c.series, g = d.chart;
                a = e(a, !c.selected);
                c.firePointEvent(a ? "select" : "unselect", {accumulate: b}, function () {
                    c.selected = c.options.selected = a;
                    d.options.data[h(c, d.data)] = c.options;
                    c.setState(a && "select");
                    b || u(g.getSelectedPoints(), function (a) {
                        a.selected && a !== c && (a.selected = a.options.selected = !1, d.options.data[h(a, d.data)] = a.options, a.setState(""), a.firePointEvent("unselect"))
                    })
                })
            }, onMouseOver: function (a) {
                var b = this.series.chart, c = b.pointer;
                a = a ? c.normalize(a) : c.getChartCoordinatesFromPoint(this,
                    b.inverted);
                c.runPointActions(a, this)
            }, onMouseOut: function () {
                var a = this.series.chart;
                this.firePointEvent("mouseOut");
                u(a.hoverPoints || [], function (a) {
                    a.setState()
                });
                a.hoverPoints = a.hoverPoint = null
            }, importEvents: function () {
                if (!this.hasImportedEvents) {
                    var b = this, d = c(b.series.options.point, b.options).events;
                    b.events = d;
                    a.objectEach(d, function (a, c) {
                        y(b, c, a)
                    });
                    this.hasImportedEvents = !0
                }
            }, setState: function (a, b) {
                var c = Math.floor(this.plotX), d = this.plotY, g = this.series, h = g.options.states[a] || {},
                    k = f[g.type].marker &&
                        g.options.marker, m = k && !1 === k.enabled, l = k && k.states && k.states[a] || {},
                    p = !1 === l.enabled, n = g.stateMarkerGraphic, t = this.marker || {}, u = g.chart, z = g.halo, B,
                    G = k && g.markerAttribs;
                a = a || "";
                if (!(a === this.state && !b || this.selected && "select" !== a || !1 === h.enabled || a && (p || m && !1 === l.enabled) || a && t.states && t.states[a] && !1 === t.states[a].enabled)) {
                    G && (B = g.markerAttribs(this, a));
                    if (this.graphic) this.state && this.graphic.removeClass("highcharts-point-" + this.state), a && this.graphic.addClass("highcharts-point-" + a), this.graphic.attr(g.pointAttribs(this,
                        a)), B && this.graphic.animate(B, e(u.options.chart.animation, l.animation, k.animation)), n && n.hide(); else {
                        if (a && l) {
                            k = t.symbol || g.symbol;
                            n && n.currentSymbol !== k && (n = n.destroy());
                            if (n) n[b ? "animate" : "attr"]({
                                x: B.x,
                                y: B.y
                            }); else k && (g.stateMarkerGraphic = n = u.renderer.symbol(k, B.x, B.y, B.width, B.height).add(g.markerGroup), n.currentSymbol = k);
                            n && n.attr(g.pointAttribs(this, a))
                        }
                        n && (n[a && u.isInsidePlot(c, d, u.inverted) ? "show" : "hide"](), n.element.point = this)
                    }
                    (c = h.halo) && c.size ? (z || (g.halo = z = u.renderer.path().add((this.graphic ||
                        n).parentGroup)), z[b ? "animate" : "attr"]({d: this.haloPath(c.size)}), z.attr({"class": "highcharts-halo highcharts-color-" + e(this.colorIndex, g.colorIndex)}), z.point = this, z.attr(q({
                        fill: this.color || g.color,
                        "fill-opacity": c.opacity,
                        zIndex: -1
                    }, c.attributes))) : z && z.point && z.point.haloPath && z.animate({d: z.point.haloPath(0)});
                    this.state = a
                }
            }, haloPath: function (a) {
                return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - a, this.plotY - a, 2 * a, 2 * a)
            }
        });
        q(b.prototype, {
            onMouseOver: function () {
                var a = this.chart,
                    b = a.hoverSeries;
                if (b && b !== this) b.onMouseOut();
                this.options.events.mouseOver && n(this, "mouseOver");
                this.setState("hover");
                a.hoverSeries = this
            }, onMouseOut: function () {
                var a = this.options, b = this.chart, c = b.tooltip, d = b.hoverPoint;
                b.hoverSeries = null;
                if (d) d.onMouseOut();
                this && a.events.mouseOut && n(this, "mouseOut");
                !c || this.stickyTracking || c.shared && !this.noSharedTooltip || c.hide();
                this.setState()
            }, setState: function (a) {
                var b = this, c = b.options, d = b.graph, g = c.states, f = c.lineWidth, c = 0;
                a = a || "";
                if (b.state !== a && (u([b.group,
                    b.markerGroup, b.dataLabelsGroup], function (c) {
                    c && (b.state && c.removeClass("highcharts-series-" + b.state), a && c.addClass("highcharts-series-" + a))
                }), b.state = a, !g[a] || !1 !== g[a].enabled) && (a && (f = g[a].lineWidth || f + (g[a].lineWidthPlus || 0)), d && !d.dashstyle)) for (f = {"stroke-width": f}, d.animate(f, e(b.chart.options.chart.animation, g[a] && g[a].animation)); b["zone-graph-" + c];) b["zone-graph-" + c].attr(f), c += 1
            }, setVisible: function (a, b) {
                var c = this, d = c.chart, e = c.legendItem, g, f = d.options.chart.ignoreHiddenSeries, h = c.visible;
                g = (c.visible = a = c.options.visible = c.userOptions.visible = void 0 === a ? !h : a) ? "show" : "hide";
                u(["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"], function (a) {
                    if (c[a]) c[a][g]()
                });
                if (d.hoverSeries === c || (d.hoverPoint && d.hoverPoint.series) === c) c.onMouseOut();
                e && d.legend.colorizeItem(c, a);
                c.isDirty = !0;
                c.options.stacking && u(d.series, function (a) {
                    a.options.stacking && a.visible && (a.isDirty = !0)
                });
                u(c.linkedSeries, function (b) {
                    b.setVisible(a, !1)
                });
                f && (d.isDirtyBox = !0);
                !1 !== b && d.redraw();
                n(c, g)
            }, show: function () {
                this.setVisible(!0)
            },
            hide: function () {
                this.setVisible(!1)
            }, select: function (a) {
                this.selected = a = void 0 === a ? !this.selected : a;
                this.checkbox && (this.checkbox.checked = a);
                n(this, a ? "select" : "unselect")
            }, drawTracker: G.drawTrackerGraph
        })
    })(K);
    (function (a) {
        var y = a.Chart, C = a.each, A = a.inArray, B = a.isArray, d = a.isObject, f = a.pick, u = a.splat;
        y.prototype.setResponsive = function (d) {
            var f = this.options.responsive, m = [], h = this.currentResponsive;
            f && f.rules && C(f.rules, function (f) {
                void 0 === f._id && (f._id = a.uniqueKey());
                this.matchResponsiveRule(f, m,
                    d)
            }, this);
            var t = a.merge.apply(0, a.map(m, function (d) {
                return a.find(f.rules, function (a) {
                    return a._id === d
                }).chartOptions
            })), m = m.toString() || void 0;
            m !== (h && h.ruleIds) && (h && this.update(h.undoOptions, d), m ? (this.currentResponsive = {
                ruleIds: m,
                mergedOptions: t,
                undoOptions: this.currentOptions(t)
            }, this.update(t, d)) : this.currentResponsive = void 0)
        };
        y.prototype.matchResponsiveRule = function (a, d) {
            var m = a.condition;
            (m.callback || function () {
                return this.chartWidth <= f(m.maxWidth, Number.MAX_VALUE) && this.chartHeight <= f(m.maxHeight,
                    Number.MAX_VALUE) && this.chartWidth >= f(m.minWidth, 0) && this.chartHeight >= f(m.minHeight, 0)
            }).call(this) && d.push(a._id)
        };
        y.prototype.currentOptions = function (f) {
            function n(f, m, l, c) {
                var e;
                a.objectEach(f, function (a, b) {
                    if (!c && -1 < A(b, ["series", "xAxis", "yAxis"])) for (f[b] = u(f[b]), l[b] = [], e = 0; e < f[b].length; e++) m[b][e] && (l[b][e] = {}, n(a[e], m[b][e], l[b][e], c + 1)); else d(a) ? (l[b] = B(a) ? [] : {}, n(a, m[b] || {}, l[b], c + 1)) : l[b] = m[b] || null
                })
            }

            var m = {};
            n(f, this.options, m, 0);
            return m
        }
    })(K);
    (function (a) {
        var y = a.Axis, C = a.each, A =
            a.pick;
        a = a.wrap;
        a(y.prototype, "getSeriesExtremes", function (a) {
            var d = this.isXAxis, f, u, q = [], n;
            d && C(this.series, function (a, d) {
                a.useMapGeometry && (q[d] = a.xData, a.xData = [])
            });
            a.call(this);
            d && (f = A(this.dataMin, Number.MAX_VALUE), u = A(this.dataMax, -Number.MAX_VALUE), C(this.series, function (a, d) {
                a.useMapGeometry && (f = Math.min(f, A(a.minX, f)), u = Math.max(u, A(a.maxX, f)), a.xData = q[d], n = !0)
            }), n && (this.dataMin = f, this.dataMax = u))
        });
        a(y.prototype, "setAxisTranslation", function (a) {
            var d = this.chart, f = d.plotWidth / d.plotHeight,
                d = d.xAxis[0], u;
            a.call(this);
            "yAxis" === this.coll && void 0 !== d.transA && C(this.series, function (a) {
                a.preserveAspectRatio && (u = !0)
            });
            if (u && (this.transA = d.transA = Math.min(this.transA, d.transA), a = f / ((d.max - d.min) / (this.max - this.min)), a = 1 > a ? this : d, f = (a.max - a.min) * a.transA, a.pixelPadding = a.len - f, a.minPixelPadding = a.pixelPadding / 2, f = a.fixTo)) {
                f = f[1] - a.toValue(f[0], !0);
                f *= a.transA;
                if (Math.abs(f) > a.minPixelPadding || a.min === a.dataMin && a.max === a.dataMax) f = 0;
                a.minPixelPadding -= f
            }
        });
        a(y.prototype, "render", function (a) {
            a.call(this);
            this.fixTo = null
        })
    })(K);
    (function (a) {
        var y = a.Axis, C = a.Chart, A = a.color, B, d = a.each, f = a.extend, u = a.isNumber, q = a.Legend,
            n = a.LegendSymbolMixin, m = a.noop, h = a.merge, t = a.pick, l = a.wrap;
        B = a.ColorAxis = function () {
            this.init.apply(this, arguments)
        };
        f(B.prototype, y.prototype);
        f(B.prototype, {
            defaultColorAxisOptions: {
                lineWidth: 0,
                minPadding: 0,
                maxPadding: 0,
                gridLineWidth: 1,
                tickPixelInterval: 72,
                startOnTick: !0,
                endOnTick: !0,
                offset: 0,
                marker: {animation: {duration: 50}, width: .01, color: "#999999"},
                labels: {overflow: "justify", rotation: 0},
                minColor: "#e6ebf5",
                maxColor: "#003399",
                tickLength: 5,
                showInLegend: !0
            },
            keepProps: ["legendGroup", "legendItemHeight", "legendItemWidth", "legendItem", "legendSymbol"].concat(y.prototype.keepProps),
            init: function (a, d) {
                var c = "vertical" !== a.options.legend.layout, b;
                this.coll = "colorAxis";
                b = h(this.defaultColorAxisOptions, {side: c ? 2 : 1, reversed: !c}, d, {
                    opposite: !c,
                    showEmpty: !1,
                    title: null
                });
                y.prototype.init.call(this, a, b);
                d.dataClasses && this.initDataClasses(d);
                this.initStops();
                this.horiz = c;
                this.zoomEnabled = !1;
                this.defaultLegendLength =
                    200
            },
            initDataClasses: function (a) {
                var c = this.chart, f, b = 0, g = c.options.chart.colorCount, m = this.options,
                    l = a.dataClasses.length;
                this.dataClasses = f = [];
                this.legendItems = [];
                d(a.dataClasses, function (a, d) {
                    a = h(a);
                    f.push(a);
                    a.color || ("category" === m.dataClassColor ? (d = c.options.colors, g = d.length, a.color = d[b], a.colorIndex = b, b++, b === g && (b = 0)) : a.color = A(m.minColor).tweenTo(A(m.maxColor), 2 > l ? .5 : d / (l - 1)))
                })
            },
            initStops: function () {
                this.stops = this.options.stops || [[0, this.options.minColor], [1, this.options.maxColor]];
                d(this.stops,
                    function (a) {
                        a.color = A(a[1])
                    })
            },
            setOptions: function (a) {
                y.prototype.setOptions.call(this, a);
                this.options.crosshair = this.options.marker
            },
            setAxisSize: function () {
                var a = this.legendSymbol, d = this.chart, f = d.options.legend || {}, b, g;
                a ? (this.left = f = a.attr("x"), this.top = b = a.attr("y"), this.width = g = a.attr("width"), this.height = a = a.attr("height"), this.right = d.chartWidth - f - g, this.bottom = d.chartHeight - b - a, this.len = this.horiz ? g : a, this.pos = this.horiz ? f : b) : this.len = (this.horiz ? f.symbolWidth : f.symbolHeight) || this.defaultLegendLength
            },
            normalizedValue: function (a) {
                this.isLog && (a = this.val2lin(a));
                return 1 - (this.max - a) / (this.max - this.min || 1)
            },
            toColor: function (a, d) {
                var c = this.stops, b, e, f = this.dataClasses, h, k;
                if (f) for (k = f.length; k--;) {
                    if (h = f[k], b = h.from, c = h.to, (void 0 === b || a >= b) && (void 0 === c || a <= c)) {
                        e = h.color;
                        d && (d.dataClass = k, d.colorIndex = h.colorIndex);
                        break
                    }
                } else {
                    a = this.normalizedValue(a);
                    for (k = c.length; k-- && !(a > c[k][0]);) ;
                    b = c[k] || c[k + 1];
                    c = c[k + 1] || b;
                    a = 1 - (c[0] - a) / (c[0] - b[0] || 1);
                    e = b.color.tweenTo(c.color, a)
                }
                return e
            },
            getOffset: function () {
                var a =
                    this.legendGroup, d = this.chart.axisOffset[this.side];
                a && (this.axisParent = a, y.prototype.getOffset.call(this), this.added || (this.added = !0, this.labelLeft = 0, this.labelRight = this.width), this.chart.axisOffset[this.side] = d)
            },
            setLegendColor: function () {
                var a, d = this.reversed;
                a = d ? 1 : 0;
                d = d ? 0 : 1;
                a = this.horiz ? [a, 0, d, 0] : [0, d, 0, a];
                this.legendColor = {linearGradient: {x1: a[0], y1: a[1], x2: a[2], y2: a[3]}, stops: this.stops}
            },
            drawLegendSymbol: function (a, d) {
                var c = a.padding, b = a.options, e = this.horiz, f = t(b.symbolWidth, e ? this.defaultLegendLength :
                    12), h = t(b.symbolHeight, e ? 12 : this.defaultLegendLength), k = t(b.labelPadding, e ? 16 : 30),
                    b = t(b.itemDistance, 10);
                this.setLegendColor();
                d.legendSymbol = this.chart.renderer.rect(0, a.baseline - 11, f, h).attr({zIndex: 1}).add(d.legendGroup);
                this.legendItemWidth = f + c + (e ? b : k);
                this.legendItemHeight = h + c + (e ? k : 0)
            },
            setState: m,
            visible: !0,
            setVisible: m,
            getSeriesExtremes: function () {
                var a = this.series, d = a.length;
                this.dataMin = Infinity;
                for (this.dataMax = -Infinity; d--;) void 0 !== a[d].valueMin && (this.dataMin = Math.min(this.dataMin, a[d].valueMin),
                    this.dataMax = Math.max(this.dataMax, a[d].valueMax))
            },
            drawCrosshair: function (a, d) {
                var c = d && d.plotX, b = d && d.plotY, e, f = this.pos, h = this.len;
                d && (e = this.toPixels(d[d.series.colorKey]), e < f ? e = f - 2 : e > f + h && (e = f + h + 2), d.plotX = e, d.plotY = this.len - e, y.prototype.drawCrosshair.call(this, a, d), d.plotX = c, d.plotY = b, this.cross && (this.cross.addClass("highcharts-coloraxis-marker").add(this.legendGroup), this.cross.attr({fill: this.crosshair.color})))
            },
            getPlotLinePath: function (a, d, f, b, g) {
                return u(g) ? this.horiz ? ["M", g - 4, this.top -
                6, "L", g + 4, this.top - 6, g, this.top, "Z"] : ["M", this.left, g, "L", this.left - 6, g + 6, this.left - 6, g - 6, "Z"] : y.prototype.getPlotLinePath.call(this, a, d, f, b)
            },
            update: function (a, e) {
                var c = this.chart, b = c.legend;
                d(this.series, function (a) {
                    a.isDirtyData = !0
                });
                a.dataClasses && b.allItems && (d(b.allItems, function (a) {
                    a.isDataClass && a.legendGroup && a.legendGroup.destroy()
                }), c.isDirtyLegend = !0);
                c.options[this.coll] = h(this.userOptions, a);
                y.prototype.update.call(this, a, e);
                this.legendItem && (this.setLegendColor(), b.colorizeItem(this,
                    !0))
            },
            remove: function () {
                this.legendItem && this.chart.legend.destroyItem(this);
                y.prototype.remove.call(this)
            },
            getDataClassLegendSymbols: function () {
                var c = this, e = this.chart, h = this.legendItems, b = e.options.legend, g = b.valueDecimals,
                    l = b.valueSuffix || "", t;
                h.length || d(this.dataClasses, function (b, p) {
                    var k = !0, q = b.from, u = b.to;
                    t = "";
                    void 0 === q ? t = "\x3c " : void 0 === u && (t = "\x3e ");
                    void 0 !== q && (t += a.numberFormat(q, g) + l);
                    void 0 !== q && void 0 !== u && (t += " - ");
                    void 0 !== u && (t += a.numberFormat(u, g) + l);
                    h.push(f({
                        chart: e,
                        name: t,
                        options: {},
                        drawLegendSymbol: n.drawRectangle,
                        visible: !0,
                        setState: m,
                        isDataClass: !0,
                        setVisible: function () {
                            k = this.visible = !k;
                            d(c.series, function (a) {
                                d(a.points, function (a) {
                                    a.dataClass === p && a.setVisible(k)
                                })
                            });
                            e.legend.colorizeItem(this, k)
                        }
                    }, b))
                });
                return h
            },
            name: ""
        });
        d(["fill", "stroke"], function (c) {
            a.Fx.prototype[c + "Setter"] = function () {
                this.elem.attr(c, A(this.start).tweenTo(A(this.end), this.pos), null, !0)
            }
        });
        l(C.prototype, "getAxes", function (a) {
            var c = this.options.colorAxis;
            a.call(this);
            this.colorAxis = [];
            c && new B(this, c)
        });
        l(q.prototype, "getAllItems", function (a) {
            var c = [], f = this.chart.colorAxis[0];
            f && f.options && (f.options.showInLegend && (f.options.dataClasses ? c = c.concat(f.getDataClassLegendSymbols()) : c.push(f)), d(f.series, function (a) {
                a.options.showInLegend = !1
            }));
            return c.concat(a.call(this))
        });
        l(q.prototype, "colorizeItem", function (a, d, f) {
            a.call(this, d, f);
            f && d.legendColor && d.legendSymbol.attr({fill: d.legendColor})
        })
    })(K);
    (function (a) {
        var y = a.defined, C = a.each, A = a.noop, B = a.seriesTypes;
        a.colorPointMixin =
            {
                isValid: function () {
                    return null !== this.value
                }, setVisible: function (a) {
                    var d = this, u = a ? "show" : "hide";
                    C(["graphic", "dataLabel"], function (a) {
                        if (d[a]) d[a][u]()
                    })
                }, setState: function (d) {
                    a.Point.prototype.setState.call(this, d);
                    this.graphic && this.graphic.attr({zIndex: "hover" === d ? 1 : 0})
                }
            };
        a.colorSeriesMixin = {
            pointArrayMap: ["value"],
            axisTypes: ["xAxis", "yAxis", "colorAxis"],
            optionalAxis: "colorAxis",
            trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
            getSymbol: A,
            parallelArrays: ["x", "y", "value"],
            colorKey: "value",
            pointAttribs: B.column.prototype.pointAttribs,
            translateColors: function () {
                var a = this, f = this.options.nullColor, u = this.colorAxis, q = this.colorKey;
                C(this.data, function (d) {
                    var m = d[q];
                    if (m = d.options.color || (d.isNull ? f : u && void 0 !== m ? u.toColor(m, d) : d.color || a.color)) d.color = m
                })
            },
            colorAttribs: function (a) {
                var d = {};
                y(a.color) && (d[this.colorProp || "fill"] = a.color);
                return d
            }
        }
    })(K);
    (function (a) {
        function y(a) {
            a && (a.preventDefault && a.preventDefault(), a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
        }

        function C(a) {
            this.init(a)
        }

        var A = a.addEvent, B = a.Chart, d = a.doc, f = a.each, u = a.extend, q = a.merge, n = a.pick, m = a.wrap;
        C.prototype.init = function (a) {
            this.chart = a;
            a.mapNavButtons = []
        };
        C.prototype.update = function (d) {
            var f = this.chart, h = f.options.mapNavigation, c, e, m, b, g, z = function (a) {
                this.handler.call(f, a);
                y(a)
            }, B = f.mapNavButtons;
            d && (h = f.options.mapNavigation = q(f.options.mapNavigation, d));
            for (; B.length;) B.pop().destroy();
            n(h.enableButtons, h.enabled) && !f.renderer.forExport && a.objectEach(h.buttons, function (a, d) {
                c = q(h.buttonOptions, a);
                e = c.theme;
                e.style = q(c.theme.style, c.style);
                b = (m = e.states) && m.hover;
                g = m && m.select;
                a = f.renderer.button(c.text, 0, 0, z, e, b, g, 0, "zoomIn" === d ? "topbutton" : "bottombutton").addClass("highcharts-map-navigation").attr({
                    width: c.width,
                    height: c.height,
                    title: f.options.lang[d],
                    padding: c.padding,
                    zIndex: 5
                }).add();
                a.handler = c.onclick;
                a.align(u(c, {width: a.width, height: 2 * a.height}), null, c.alignTo);
                A(a.element, "dblclick", y);
                B.push(a)
            });
            this.updateEvents(h)
        };
        C.prototype.updateEvents = function (a) {
            var f = this.chart;
            n(a.enableDoubleClickZoom,
                a.enabled) || a.enableDoubleClickZoomTo ? this.unbindDblClick = this.unbindDblClick || A(f.container, "dblclick", function (a) {
                f.pointer.onContainerDblClick(a)
            }) : this.unbindDblClick && (this.unbindDblClick = this.unbindDblClick());
            n(a.enableMouseWheelZoom, a.enabled) ? this.unbindMouseWheel = this.unbindMouseWheel || A(f.container, void 0 === d.onmousewheel ? "DOMMouseScroll" : "mousewheel", function (a) {
                f.pointer.onContainerMouseWheel(a);
                y(a);
                return !1
            }) : this.unbindMouseWheel && (this.unbindMouseWheel = this.unbindMouseWheel())
        };
        u(B.prototype,
            {
                fitToBox: function (a, d) {
                    f([["x", "width"], ["y", "height"]], function (f) {
                        var c = f[0];
                        f = f[1];
                        a[c] + a[f] > d[c] + d[f] && (a[f] > d[f] ? (a[f] = d[f], a[c] = d[c]) : a[c] = d[c] + d[f] - a[f]);
                        a[f] > d[f] && (a[f] = d[f]);
                        a[c] < d[c] && (a[c] = d[c])
                    });
                    return a
                }, mapZoom: function (a, d, f, c, e) {
                    var h = this.xAxis[0], b = h.max - h.min, g = n(d, h.min + b / 2), m = b * a, b = this.yAxis[0],
                        l = b.max - b.min, k = n(f, b.min + l / 2), l = l * a, g = this.fitToBox({
                            x: g - m * (c ? (c - h.pos) / h.len : .5),
                            y: k - l * (e ? (e - b.pos) / b.len : .5),
                            width: m,
                            height: l
                        }, {
                            x: h.dataMin, y: b.dataMin, width: h.dataMax - h.dataMin,
                            height: b.dataMax - b.dataMin
                        }),
                        m = g.x <= h.dataMin && g.width >= h.dataMax - h.dataMin && g.y <= b.dataMin && g.height >= b.dataMax - b.dataMin;
                    c && (h.fixTo = [c - h.pos, d]);
                    e && (b.fixTo = [e - b.pos, f]);
                    void 0 === a || m ? (h.setExtremes(void 0, void 0, !1), b.setExtremes(void 0, void 0, !1)) : (h.setExtremes(g.x, g.x + g.width, !1), b.setExtremes(g.y, g.y + g.height, !1));
                    this.redraw()
                }
            });
        m(B.prototype, "render", function (a) {
            this.mapNavigation = new C(this);
            this.mapNavigation.update();
            a.call(this)
        })
    })(K);
    (function (a) {
        var y = a.extend, C = a.pick, A = a.Pointer;
        a = a.wrap;
        y(A.prototype, {
            onContainerDblClick: function (a) {
                var d = this.chart;
                a = this.normalize(a);
                d.options.mapNavigation.enableDoubleClickZoomTo ? d.pointer.inClass(a.target, "highcharts-tracker") && d.hoverPoint && d.hoverPoint.zoomTo() : d.isInsidePlot(a.chartX - d.plotLeft, a.chartY - d.plotTop) && d.mapZoom(.5, d.xAxis[0].toValue(a.chartX), d.yAxis[0].toValue(a.chartY), a.chartX, a.chartY)
            }, onContainerMouseWheel: function (a) {
                var d = this.chart, f;
                a = this.normalize(a);
                f = a.detail || -(a.wheelDelta / 120);
                d.isInsidePlot(a.chartX -
                    d.plotLeft, a.chartY - d.plotTop) && d.mapZoom(Math.pow(d.options.mapNavigation.mouseWheelSensitivity, f), d.xAxis[0].toValue(a.chartX), d.yAxis[0].toValue(a.chartY), a.chartX, a.chartY)
            }
        });
        a(A.prototype, "zoomOption", function (a) {
            var d = this.chart.options.mapNavigation;
            C(d.enableTouchZoom, d.enabled) && (this.chart.options.chart.pinchType = "xy");
            a.apply(this, [].slice.call(arguments, 1))
        });
        a(A.prototype, "pinchTranslate", function (a, d, f, u, q, n, m) {
            a.call(this, d, f, u, q, n, m);
            "map" === this.chart.options.chart.type && this.hasZoom &&
            (a = u.scaleX > u.scaleY, this.pinchTranslateDirection(!a, d, f, u, q, n, m, a ? u.scaleX : u.scaleY))
        })
    })(K);
    (function (a) {
        var y = a.color, C = a.colorPointMixin, A = a.each, B = a.extend, d = a.isNumber, f = a.map, u = a.merge,
            q = a.noop, n = a.pick, m = a.isArray, h = a.Point, t = a.Series, l = a.seriesType, c = a.seriesTypes,
            e = a.splat, p = void 0 !== a.doc.documentElement.style.vectorEffect;
        l("map", "scatter", {
            allAreas: !0,
            animation: !1,
            nullColor: "#f7f7f7",
            borderColor: "#cccccc",
            borderWidth: 1,
            marker: null,
            stickyTracking: !1,
            joinBy: "hc-key",
            dataLabels: {
                formatter: function () {
                    return this.point.value
                },
                inside: !0, verticalAlign: "middle", crop: !1, overflow: !1, padding: 0
            },
            turboThreshold: 0,
            tooltip: {followPointer: !0, pointFormat: "{point.name}: {point.value}\x3cbr/\x3e"},
            states: {normal: {animation: !0}, hover: {brightness: .2, halo: null}, select: {color: "#cccccc"}}
        }, u(a.colorSeriesMixin, {
            type: "map",
            supportsDrilldown: !0,
            getExtremesFromAll: !0,
            useMapGeometry: !0,
            forceDL: !0,
            searchPoint: q,
            directTouch: !0,
            preserveAspectRatio: !0,
            pointArrayMap: ["value"],
            getBox: function (b) {
                var c = Number.MAX_VALUE, e = -c, f = c, h = -c, m = c, l = c, p = this.xAxis,
                    t = this.yAxis, q;
                A(b || [], function (b) {
                    if (b.path) {
                        "string" === typeof b.path && (b.path = a.splitPath(b.path));
                        var g = b.path || [], k = g.length, p = !1, t = -c, v = c, u = -c, z = c, A = b.properties;
                        if (!b._foundBox) {
                            for (; k--;) d(g[k]) && (p ? (t = Math.max(t, g[k]), v = Math.min(v, g[k])) : (u = Math.max(u, g[k]), z = Math.min(z, g[k])), p = !p);
                            b._midX = v + (t - v) * (b.middleX || A && A["hc-middle-x"] || .5);
                            b._midY = z + (u - z) * (b.middleY || A && A["hc-middle-y"] || .5);
                            b._maxX = t;
                            b._minX = v;
                            b._maxY = u;
                            b._minY = z;
                            b.labelrank = n(b.labelrank, (t - v) * (u - z));
                            b._foundBox = !0
                        }
                        e = Math.max(e,
                            b._maxX);
                        f = Math.min(f, b._minX);
                        h = Math.max(h, b._maxY);
                        m = Math.min(m, b._minY);
                        l = Math.min(b._maxX - b._minX, b._maxY - b._minY, l);
                        q = !0
                    }
                });
                q && (this.minY = Math.min(m, n(this.minY, c)), this.maxY = Math.max(h, n(this.maxY, -c)), this.minX = Math.min(f, n(this.minX, c)), this.maxX = Math.max(e, n(this.maxX, -c)), p && void 0 === p.options.minRange && (p.minRange = Math.min(5 * l, (this.maxX - this.minX) / 5, p.minRange || c)), t && void 0 === t.options.minRange && (t.minRange = Math.min(5 * l, (this.maxY - this.minY) / 5, t.minRange || c)))
            },
            getExtremes: function () {
                t.prototype.getExtremes.call(this,
                    this.valueData);
                this.chart.hasRendered && this.isDirtyData && this.getBox(this.options.data);
                this.valueMin = this.dataMin;
                this.valueMax = this.dataMax;
                this.dataMin = this.minY;
                this.dataMax = this.maxY
            },
            translatePath: function (a) {
                var b = !1, c = this.xAxis, e = this.yAxis, f = c.min, h = c.transA, c = c.minPixelPadding, m = e.min,
                    l = e.transA, e = e.minPixelPadding, p, n = [];
                if (a) for (p = a.length; p--;) d(a[p]) ? (n[p] = b ? (a[p] - f) * h + c : (a[p] - m) * l + e, b = !b) : n[p] = a[p];
                return n
            },
            setData: function (b, c, h, l) {
                var g = this.options, p = this.chart.options.chart,
                    n = p && p.map, q = g.mapData, z = g.joinBy, v = null === z, y = g.keys || this.pointArrayMap,
                    B = [], C = {}, r = this.chart.mapTransforms;
                !q && n && (q = "string" === typeof n ? a.maps[n] : n);
                v && (z = "_i");
                z = this.joinBy = e(z);
                z[1] || (z[1] = z[0]);
                b && A(b, function (a, c) {
                    var e = 0;
                    if (d(a)) b[c] = {value: a}; else if (m(a)) {
                        b[c] = {};
                        !g.keys && a.length > y.length && "string" === typeof a[0] && (b[c]["hc-key"] = a[0], ++e);
                        for (var f = 0; f < y.length; ++f, ++e) y[f] && (b[c][y[f]] = a[e])
                    }
                    v && (b[c]._i = c)
                });
                this.getBox(b);
                (this.chart.mapTransforms = r = p && p.mapTransforms || q && q["hc-transform"] ||
                    r) && a.objectEach(r, function (a) {
                    a.rotation && (a.cosAngle = Math.cos(a.rotation), a.sinAngle = Math.sin(a.rotation))
                });
                if (q) {
                    "FeatureCollection" === q.type && (this.mapTitle = q.title, q = a.geojson(q, this.type, this));
                    this.mapData = q;
                    this.mapMap = {};
                    for (r = 0; r < q.length; r++) p = q[r], n = p.properties, p._i = r, z[0] && n && n[z[0]] && (p[z[0]] = n[z[0]]), C[p[z[0]]] = p;
                    this.mapMap = C;
                    b && z[1] && A(b, function (a) {
                        C[a[z[1]]] && B.push(C[a[z[1]]])
                    });
                    g.allAreas ? (this.getBox(q), b = b || [], z[1] && A(b, function (a) {
                        B.push(a[z[1]])
                    }), B = "|" + f(B, function (a) {
                        return a &&
                            a[z[0]]
                    }).join("|") + "|", A(q, function (a) {
                        z[0] && -1 !== B.indexOf("|" + a[z[0]] + "|") || (b.push(u(a, {value: null})), l = !1)
                    })) : this.getBox(B)
                }
                t.prototype.setData.call(this, b, c, h, l)
            },
            drawGraph: q,
            drawDataLabels: q,
            doFullTranslate: function () {
                return this.isDirtyData || this.chart.isResizing || this.chart.renderer.isVML || !this.baseTrans
            },
            translate: function () {
                var a = this, c = a.xAxis, d = a.yAxis, e = a.doFullTranslate();
                a.generatePoints();
                A(a.data, function (b) {
                    b.plotX = c.toPixels(b._midX, !0);
                    b.plotY = d.toPixels(b._midY, !0);
                    e && (b.shapeType =
                        "path", b.shapeArgs = {d: a.translatePath(b.path)})
                });
                a.translateColors()
            },
            pointAttribs: function (a, d) {
                d = c.column.prototype.pointAttribs.call(this, a, d);
                a.isFading && delete d.fill;
                p ? d["vector-effect"] = "non-scaling-stroke" : d["stroke-width"] = "inherit";
                return d
            },
            drawPoints: function () {
                var a = this, d = a.xAxis, e = a.yAxis, f = a.group, h = a.chart, m = h.renderer, l, n, t, q,
                    u = this.baseTrans, y, B, r, w, C;
                a.transformGroup || (a.transformGroup = m.g().attr({
                    scaleX: 1,
                    scaleY: 1
                }).add(f), a.transformGroup.survive = !0);
                a.doFullTranslate() ? (h.hasRendered &&
                A(a.points, function (b) {
                    b.shapeArgs && (b.shapeArgs.fill = a.pointAttribs(b, b.state).fill)
                }), a.group = a.transformGroup, c.column.prototype.drawPoints.apply(a), a.group = f, A(a.points, function (a) {
                    a.graphic && (a.name && a.graphic.addClass("highcharts-name-" + a.name.replace(/ /g, "-").toLowerCase()), a.properties && a.properties["hc-key"] && a.graphic.addClass("highcharts-key-" + a.properties["hc-key"].toLowerCase()))
                }), this.baseTrans = {
                    originX: d.min - d.minPixelPadding / d.transA,
                    originY: e.min - e.minPixelPadding / e.transA + (e.reversed ?
                        0 : e.len / e.transA),
                    transAX: d.transA,
                    transAY: e.transA
                }, this.transformGroup.animate({
                    translateX: 0,
                    translateY: 0,
                    scaleX: 1,
                    scaleY: 1
                })) : (l = d.transA / u.transAX, n = e.transA / u.transAY, t = d.toPixels(u.originX, !0), q = e.toPixels(u.originY, !0), .99 < l && 1.01 > l && .99 < n && 1.01 > n && (n = l = 1, t = Math.round(t), q = Math.round(q)), y = this.transformGroup, h.renderer.globalAnimation ? (B = y.attr("translateX"), r = y.attr("translateY"), w = y.attr("scaleX"), C = y.attr("scaleY"), y.attr({animator: 0}).animate({animator: 1}, {
                    step: function (a, b) {
                        y.attr({
                            translateX: B +
                                (t - B) * b.pos,
                            translateY: r + (q - r) * b.pos,
                            scaleX: w + (l - w) * b.pos,
                            scaleY: C + (n - C) * b.pos
                        })
                    }
                })) : y.attr({translateX: t, translateY: q, scaleX: l, scaleY: n}));
                p || a.group.element.setAttribute("stroke-width", a.options[a.pointAttrToOptions && a.pointAttrToOptions["stroke-width"] || "borderWidth"] / (l || 1));
                this.drawMapDataLabels()
            },
            drawMapDataLabels: function () {
                t.prototype.drawDataLabels.call(this);
                this.dataLabelsGroup && this.dataLabelsGroup.clip(this.chart.clipRect)
            },
            render: function () {
                var a = this, c = t.prototype.render;
                a.chart.renderer.isVML &&
                3E3 < a.data.length ? setTimeout(function () {
                    c.call(a)
                }) : c.call(a)
            },
            animate: function (a) {
                var b = this.options.animation, c = this.group, d = this.xAxis, e = this.yAxis, f = d.pos, h = e.pos;
                this.chart.renderer.isSVG && (!0 === b && (b = {duration: 1E3}), a ? c.attr({
                    translateX: f + d.len / 2,
                    translateY: h + e.len / 2,
                    scaleX: .001,
                    scaleY: .001
                }) : (c.animate({translateX: f, translateY: h, scaleX: 1, scaleY: 1}, b), this.animate = null))
            },
            animateDrilldown: function (a) {
                var b = this.chart.plotBox, c = this.chart.drilldownLevels[this.chart.drilldownLevels.length - 1],
                    d = c.bBox, e = this.chart.options.drilldown.animation;
                a || (a = Math.min(d.width / b.width, d.height / b.height), c.shapeArgs = {
                    scaleX: a,
                    scaleY: a,
                    translateX: d.x,
                    translateY: d.y
                }, A(this.points, function (a) {
                    a.graphic && a.graphic.attr(c.shapeArgs).animate({
                        scaleX: 1,
                        scaleY: 1,
                        translateX: 0,
                        translateY: 0
                    }, e)
                }), this.animate = null)
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            animateDrillupFrom: function (a) {
                c.column.prototype.animateDrillupFrom.call(this, a)
            },
            animateDrillupTo: function (a) {
                c.column.prototype.animateDrillupTo.call(this,
                    a)
            }
        }), B({
            applyOptions: function (a, c) {
                a = h.prototype.applyOptions.call(this, a, c);
                c = this.series;
                var b = c.joinBy;
                c.mapData && ((b = void 0 !== a[b[1]] && c.mapMap[a[b[1]]]) ? (c.xyFromShape && (a.x = b._midX, a.y = b._midY), B(a, b)) : a.value = a.value || null);
                return a
            }, onMouseOver: function (a) {
                clearTimeout(this.colorInterval);
                if (null !== this.value || this.series.options.nullInteraction) h.prototype.onMouseOver.call(this, a); else this.series.onMouseOut(a)
            }, onMouseOut: function () {
                var a = this, c = +new Date, d = y(this.series.pointAttribs(a).fill),
                    e = y(this.series.pointAttribs(a, "hover").fill), f = a.series.options.states.normal.animation,
                    m = f && (f.duration || 500);
                m && 4 === d.rgba.length && 4 === e.rgba.length && "select" !== a.state && (clearTimeout(a.colorInterval), a.colorInterval = setInterval(function () {
                    var b = (new Date - c) / m, f = a.graphic;
                    1 < b && (b = 1);
                    f && f.attr("fill", e.tweenTo(d, b));
                    1 <= b && clearTimeout(a.colorInterval)
                }, 13), a.isFading = !0);
                h.prototype.onMouseOut.call(a);
                a.isFading = null
            }, zoomTo: function () {
                var a = this.series;
                a.xAxis.setExtremes(this._minX, this._maxX,
                    !1);
                a.yAxis.setExtremes(this._minY, this._maxY, !1);
                a.chart.redraw()
            }
        }, C))
    })(K);
    (function (a) {
        var y = a.seriesType, C = a.seriesTypes;
        y("mapline", "map", {lineWidth: 1, fillColor: "none"}, {
            type: "mapline",
            colorProp: "stroke",
            pointAttrToOptions: {stroke: "color", "stroke-width": "lineWidth"},
            pointAttribs: function (a, y) {
                a = C.map.prototype.pointAttribs.call(this, a, y);
                a.fill = this.options.fillColor;
                return a
            },
            drawLegendSymbol: C.line.prototype.drawLegendSymbol
        })
    })(K);
    (function (a) {
        var y = a.merge, C = a.Point;
        a = a.seriesType;
        a("mappoint",
            "scatter", {
                dataLabels: {
                    enabled: !0, formatter: function () {
                        return this.point.name
                    }, crop: !1, defer: !1, overflow: !1, style: {color: "#000000"}
                }
            }, {type: "mappoint", forceDL: !0}, {
                applyOptions: function (a, B) {
                    a = void 0 !== a.lat && void 0 !== a.lon ? y(a, this.series.chart.fromLatLonToPoint(a)) : a;
                    return C.prototype.applyOptions.call(this, a, B)
                }
            })
    })(K);
    (function (a) {
        var y = a.arrayMax, C = a.arrayMin, A = a.Axis, B = a.color, d = a.each, f = a.isNumber, u = a.noop, q = a.pick,
            n = a.pInt, m = a.Point, h = a.Series, t = a.seriesType, l = a.seriesTypes;
        t("bubble", "scatter",
            {
                dataLabels: {
                    formatter: function () {
                        return this.point.z
                    }, inside: !0, verticalAlign: "middle"
                },
                marker: {
                    lineColor: null,
                    lineWidth: 1,
                    radius: null,
                    states: {hover: {radiusPlus: 0}},
                    symbol: "circle"
                },
                minSize: 8,
                maxSize: "20%",
                softThreshold: !1,
                states: {hover: {halo: {size: 5}}},
                tooltip: {pointFormat: "({point.x}, {point.y}), Size: {point.z}"},
                turboThreshold: 0,
                zThreshold: 0,
                zoneAxis: "z"
            }, {
                pointArrayMap: ["y", "z"],
                parallelArrays: ["x", "y", "z"],
                trackerGroups: ["group", "dataLabelsGroup"],
                specialGroup: "group",
                bubblePadding: !0,
                zoneAxis: "z",
                directTouch: !0,
                pointAttribs: function (a, d) {
                    var c = q(this.options.marker.fillOpacity, .5);
                    a = h.prototype.pointAttribs.call(this, a, d);
                    1 !== c && (a.fill = B(a.fill).setOpacity(c).get("rgba"));
                    return a
                },
                getRadii: function (a, d, f, b) {
                    var c, e, h, k = this.zData, m = [], l = this.options, n = "width" !== l.sizeBy, p = l.zThreshold,
                        t = d - a;
                    e = 0;
                    for (c = k.length; e < c; e++) h = k[e], l.sizeByAbsoluteValue && null !== h && (h = Math.abs(h - p), d = Math.max(d - p, Math.abs(a - p)), a = 0), null === h ? h = null : h < a ? h = f / 2 - 1 : (h = 0 < t ? (h - a) / t : .5, n && 0 <= h && (h = Math.sqrt(h)), h = Math.ceil(f +
                        h * (b - f)) / 2), m.push(h);
                    this.radii = m
                },
                animate: function (a) {
                    var c = this.options.animation;
                    a || (d(this.points, function (a) {
                        var b = a.graphic, d;
                        b && b.width && (d = {x: b.x, y: b.y, width: b.width, height: b.height}, b.attr({
                            x: a.plotX,
                            y: a.plotY,
                            width: 1,
                            height: 1
                        }), b.animate(d, c))
                    }), this.animate = null)
                },
                translate: function () {
                    var c, d = this.data, h, b, g = this.radii;
                    l.scatter.prototype.translate.call(this);
                    for (c = d.length; c--;) h = d[c], b = g ? g[c] : 0, f(b) && b >= this.minPxSize / 2 ? (h.marker = a.extend(h.marker, {
                        radius: b,
                        width: 2 * b,
                        height: 2 * b
                    }), h.dlBox =
                        {
                            x: h.plotX - b,
                            y: h.plotY - b,
                            width: 2 * b,
                            height: 2 * b
                        }) : h.shapeArgs = h.plotY = h.dlBox = void 0
                },
                alignDataLabel: l.column.prototype.alignDataLabel,
                buildKDTree: u,
                applyZones: u
            }, {
                haloPath: function (a) {
                    return m.prototype.haloPath.call(this, 0 === a ? 0 : (this.marker ? this.marker.radius || 0 : 0) + a)
                }, ttBelow: !1
            });
        A.prototype.beforePadding = function () {
            var a = this, e = this.len, h = this.chart, b = 0, g = e, m = this.isXAxis, l = m ? "xData" : "yData",
                k = this.min, t = {}, u = Math.min(h.plotWidth, h.plotHeight), A = Number.MAX_VALUE,
                B = -Number.MAX_VALUE, v = this.max -
                k, F = e / v, H = [];
            d(this.series, function (b) {
                var c = b.options;
                !b.bubblePadding || !b.visible && h.options.chart.ignoreHiddenSeries || (a.allowZoomOutside = !0, H.push(b), m && (d(["minSize", "maxSize"], function (a) {
                    var b = c[a], d = /%$/.test(b), b = n(b);
                    t[a] = d ? u * b / 100 : b
                }), b.minPxSize = t.minSize, b.maxPxSize = Math.max(t.maxSize, t.minSize), b = b.zData, b.length && (A = q(c.zMin, Math.min(A, Math.max(C(b), !1 === c.displayNegative ? c.zThreshold : -Number.MAX_VALUE))), B = q(c.zMax, Math.max(B, y(b))))))
            });
            d(H, function (c) {
                var d = c[l], e = d.length, h;
                m &&
                c.getRadii(A, B, c.minPxSize, c.maxPxSize);
                if (0 < v) for (; e--;) f(d[e]) && a.dataMin <= d[e] && d[e] <= a.dataMax && (h = c.radii[e], b = Math.min((d[e] - k) * F - h, b), g = Math.max((d[e] - k) * F + h, g))
            });
            H.length && 0 < v && !this.isLog && (g -= e, F *= (e + b - g) / e, d([["min", "userMin", b], ["max", "userMax", g]], function (b) {
                void 0 === q(a.options[b[0]], a[b[1]]) && (a[b[0]] += b[2] / F)
            }))
        }
    })(K);
    (function (a) {
        var y = a.merge, C = a.Point, A = a.seriesType, B = a.seriesTypes;
        B.bubble && A("mapbubble", "bubble", {animationLimit: 500, tooltip: {pointFormat: "{point.name}: {point.z}"}},
            {
                xyFromShape: !0,
                type: "mapbubble",
                pointArrayMap: ["z"],
                getMapData: B.map.prototype.getMapData,
                getBox: B.map.prototype.getBox,
                setData: B.map.prototype.setData
            }, {
                applyOptions: function (a, f) {
                    return a && void 0 !== a.lat && void 0 !== a.lon ? C.prototype.applyOptions.call(this, y(a, this.series.chart.fromLatLonToPoint(a)), f) : B.map.prototype.pointClass.prototype.applyOptions.call(this, a, f)
                }, ttBelow: !1
            })
    })(K);
    (function (a) {
        var y = a.colorPointMixin, C = a.each, A = a.merge, B = a.noop, d = a.pick, f = a.Series, u = a.seriesType,
            q = a.seriesTypes;
        u("heatmap", "scatter", {
            animation: !1,
            borderWidth: 0,
            nullColor: "#f7f7f7",
            dataLabels: {
                formatter: function () {
                    return this.point.value
                }, inside: !0, verticalAlign: "middle", crop: !1, overflow: !1, padding: 0
            },
            marker: null,
            pointRange: null,
            tooltip: {pointFormat: "{point.x}, {point.y}: {point.value}\x3cbr/\x3e"},
            states: {normal: {animation: !0}, hover: {halo: !1, brightness: .2}}
        }, A(a.colorSeriesMixin, {
            pointArrayMap: ["y", "value"],
            hasPointSpecificOptions: !0,
            supportsDrilldown: !0,
            getExtremesFromAll: !0,
            directTouch: !0,
            init: function () {
                var a;
                q.scatter.prototype.init.apply(this, arguments);
                a = this.options;
                a.pointRange = d(a.pointRange, a.colsize || 1);
                this.yAxis.axisPointRange = a.rowsize || 1
            },
            translate: function () {
                var a = this.options, d = this.xAxis, f = this.yAxis, t = function (a, c, d) {
                    return Math.min(Math.max(c, a), d)
                };
                this.generatePoints();
                C(this.points, function (h) {
                    var c = (a.colsize || 1) / 2, e = (a.rowsize || 1) / 2,
                        m = t(Math.round(d.len - d.translate(h.x - c, 0, 1, 0, 1)), -d.len, 2 * d.len),
                        c = t(Math.round(d.len - d.translate(h.x + c, 0, 1, 0, 1)), -d.len, 2 * d.len),
                        b = t(Math.round(f.translate(h.y -
                            e, 0, 1, 0, 1)), -f.len, 2 * f.len),
                        e = t(Math.round(f.translate(h.y + e, 0, 1, 0, 1)), -f.len, 2 * f.len);
                    h.plotX = h.clientX = (m + c) / 2;
                    h.plotY = (b + e) / 2;
                    h.shapeType = "rect";
                    h.shapeArgs = {
                        x: Math.min(m, c),
                        y: Math.min(b, e),
                        width: Math.abs(c - m),
                        height: Math.abs(e - b)
                    }
                });
                this.translateColors()
            },
            drawPoints: function () {
                q.column.prototype.drawPoints.call(this);
                C(this.points, function (a) {
                    a.graphic.attr(this.colorAttribs(a))
                }, this)
            },
            animate: B,
            getBox: B,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            alignDataLabel: q.column.prototype.alignDataLabel,
            getExtremes: function () {
                f.prototype.getExtremes.call(this, this.valueData);
                this.valueMin = this.dataMin;
                this.valueMax = this.dataMax;
                f.prototype.getExtremes.call(this)
            }
        }), y)
    })(K);
    (function (a) {
        function y(a, d) {
            var f, m, l, c = !1, e = a.x, n = a.y;
            a = 0;
            for (f = d.length - 1; a < d.length; f = a++) m = d[a][1] > n, l = d[f][1] > n, m !== l && e < (d[f][0] - d[a][0]) * (n - d[a][1]) / (d[f][1] - d[a][1]) + d[a][0] && (c = !c);
            return c
        }

        var C = a.Chart, A = a.each, B = a.extend, d = a.format, f = a.merge, u = a.win, q = a.wrap;
        C.prototype.transformFromLatLon = function (d, f) {
            if (void 0 ===
                u.proj4) return a.error(21), {x: 0, y: null};
            d = u.proj4(f.crs, [d.lon, d.lat]);
            var h = f.cosAngle || f.rotation && Math.cos(f.rotation),
                m = f.sinAngle || f.rotation && Math.sin(f.rotation);
            d = f.rotation ? [d[0] * h + d[1] * m, -d[0] * m + d[1] * h] : d;
            return {
                x: ((d[0] - (f.xoffset || 0)) * (f.scale || 1) + (f.xpan || 0)) * (f.jsonres || 1) + (f.jsonmarginX || 0),
                y: (((f.yoffset || 0) - d[1]) * (f.scale || 1) + (f.ypan || 0)) * (f.jsonres || 1) - (f.jsonmarginY || 0)
            }
        };
        C.prototype.transformToLatLon = function (d, f) {
            if (void 0 === u.proj4) a.error(21); else {
                d = {
                    x: ((d.x - (f.jsonmarginX ||
                        0)) / (f.jsonres || 1) - (f.xpan || 0)) / (f.scale || 1) + (f.xoffset || 0),
                    y: ((-d.y - (f.jsonmarginY || 0)) / (f.jsonres || 1) + (f.ypan || 0)) / (f.scale || 1) + (f.yoffset || 0)
                };
                var h = f.cosAngle || f.rotation && Math.cos(f.rotation),
                    m = f.sinAngle || f.rotation && Math.sin(f.rotation);
                f = u.proj4(f.crs, "WGS84", f.rotation ? {x: d.x * h + d.y * -m, y: d.x * m + d.y * h} : d);
                return {lat: f.y, lon: f.x}
            }
        };
        C.prototype.fromPointToLatLon = function (d) {
            var f = this.mapTransforms, h;
            if (f) {
                for (h in f) if (f.hasOwnProperty(h) && f[h].hitZone && y({
                    x: d.x,
                    y: -d.y
                }, f[h].hitZone.coordinates[0])) return this.transformToLatLon(d,
                    f[h]);
                return this.transformToLatLon(d, f["default"])
            }
            a.error(22)
        };
        C.prototype.fromLatLonToPoint = function (d) {
            var f = this.mapTransforms, h, n;
            if (!f) return a.error(22), {x: 0, y: null};
            for (h in f) if (f.hasOwnProperty(h) && f[h].hitZone && (n = this.transformFromLatLon(d, f[h]), y({
                x: n.x,
                y: -n.y
            }, f[h].hitZone.coordinates[0]))) return n;
            return this.transformFromLatLon(d, f["default"])
        };
        a.geojson = function (a, f, h) {
            var m = [], l = [], c = function (a) {
                var c, b = a.length;
                l.push("M");
                for (c = 0; c < b; c++) 1 === c && l.push("L"), l.push(a[c][0], -a[c][1])
            };
            f = f || "map";
            A(a.features, function (a) {
                var d = a.geometry, b = d.type, d = d.coordinates;
                a = a.properties;
                var e;
                l = [];
                "map" === f || "mapbubble" === f ? ("Polygon" === b ? (A(d, c), l.push("Z")) : "MultiPolygon" === b && (A(d, function (a) {
                    A(a, c)
                }), l.push("Z")), l.length && (e = {path: l})) : "mapline" === f ? ("LineString" === b ? c(d) : "MultiLineString" === b && A(d, c), l.length && (e = {path: l})) : "mappoint" === f && "Point" === b && (e = {
                    x: d[0],
                    y: -d[1]
                });
                e && m.push(B(e, {name: a.name || a.NAME, properties: a}))
            });
            h && a.copyrightShort && (h.chart.mapCredits = d(h.chart.options.credits.mapText,
                {geojson: a}), h.chart.mapCreditsFull = d(h.chart.options.credits.mapTextFull, {geojson: a}));
            return m
        };
        q(C.prototype, "addCredits", function (a, d) {
            d = f(!0, this.options.credits, d);
            this.mapCredits && (d.href = null);
            a.call(this, d);
            this.credits && this.mapCreditsFull && this.credits.attr({title: this.mapCreditsFull})
        })
    })(K);
    (function (a) {
        function y(a, d, f, c, e, m, b, g) {
            return ["M", a + e, d, "L", a + f - m, d, "C", a + f - m / 2, d, a + f, d + m / 2, a + f, d + m, "L", a + f, d + c - b, "C", a + f, d + c - b / 2, a + f - b / 2, d + c, a + f - b, d + c, "L", a + g, d + c, "C", a + g / 2, d + c, a, d + c - g / 2, a, d + c -
            g, "L", a, d + e, "C", a, d + e / 2, a + e / 2, d, a + e, d, "Z"]
        }

        var C = a.Chart, A = a.defaultOptions, B = a.each, d = a.extend, f = a.merge, u = a.pick, q = a.Renderer,
            n = a.SVGRenderer, m = a.VMLRenderer;
        d(A.lang, {zoomIn: "Zoom in", zoomOut: "Zoom out"});
        A.mapNavigation = {
            buttonOptions: {
                alignTo: "plotBox",
                align: "left",
                verticalAlign: "top",
                x: 0,
                width: 18,
                height: 18,
                padding: 5,
                style: {fontSize: "15px", fontWeight: "bold"},
                theme: {"stroke-width": 1, "text-align": "center"}
            }, buttons: {
                zoomIn: {
                    onclick: function () {
                        this.mapZoom(.5)
                    }, text: "+", y: 0
                }, zoomOut: {
                    onclick: function () {
                        this.mapZoom(2)
                    },
                    text: "-", y: 28
                }
            }, mouseWheelSensitivity: 1.1
        };
        a.splitPath = function (a) {
            var d;
            a = a.replace(/([A-Za-z])/g, " $1 ");
            a = a.replace(/^\s*/, "").replace(/\s*$/, "");
            a = a.split(/[ ,]+/);
            for (d = 0; d < a.length; d++) /[a-zA-Z]/.test(a[d]) || (a[d] = parseFloat(a[d]));
            return a
        };
        a.maps = {};
        n.prototype.symbols.topbutton = function (a, d, f, c, e) {
            return y(a - 1, d - 1, f, c, e.r, e.r, 0, 0)
        };
        n.prototype.symbols.bottombutton = function (a, d, f, c, e) {
            return y(a - 1, d - 1, f, c, 0, 0, e.r, e.r)
        };
        q === m && B(["topbutton", "bottombutton"], function (a) {
            m.prototype.symbols[a] =
                n.prototype.symbols[a]
        });
        a.Map = a.mapChart = function (d, m, l) {
            var c = "string" === typeof d || d.nodeName, e = arguments[c ? 1 : 0],
                h = {endOnTick: !1, visible: !1, minPadding: 0, maxPadding: 0, startOnTick: !1}, b,
                g = a.getOptions().credits;
            b = e.series;
            e.series = null;
            e = f({
                    chart: {panning: "xy", type: "map"},
                    credits: {
                        mapText: u(g.mapText, ' \u00a9 \x3ca href\x3d"{geojson.copyrightUrl}"\x3e{geojson.copyrightShort}\x3c/a\x3e'),
                        mapTextFull: u(g.mapTextFull, "{geojson.copyright}")
                    },
                    tooltip: {followTouchMove: !1},
                    xAxis: h,
                    yAxis: f(h, {reversed: !0})
                },
                e, {chart: {inverted: !1, alignTicks: !1}});
            e.series = b;
            return c ? new C(d, e, l) : new C(e, m)
        }
    })(K);
    return K
});