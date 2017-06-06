! function($) {
    var t = 1,
        n = "g",
        r = "path",
        e = "rect",
        a = "circle",
        s = "line",
        o = "polygon",
        h = [],
        l = {
            action: "start",
            drawTime: 3e3,
            draw: "all",
            delay: 20,
            id: 1,
            shuffle: !1
        };
    $.fn.zPath = function(n) {
        var r = this; + function() {
            var e = $.extend({}, l, n);
            return $(r).each(function() {
                var n = $(this);
                e.id = t, "start" == e.action ? (u(n, e), n.attr("data-id", t), c(n, e), t++) : "destroy" == e.action && f(n, n.attr("data-id"))
            })
        }()
    };
    var c = function(t, i) {
            var l = i.drawTime,
                u = i.draw,
                f = i.id,
                g = i.delay,
                y = i.delay;
            if (1 == i.shuffle && p.arrayShuffle(h), "all" == u) t.children().each(function() {
                $(this).is(n) ? c($(this), i) : $(this).is(r) ? d.path($(this), l) : $(this).is(e) ? d.rect($(this), l) : $(this).is(a) ? d.circle($(this), l) : $(this).is(s) ? d.line($(this), l) : $(this).is(o) && d.polygon($(this), l)
            });
            else if ("delayed" == u || "1by1" == u)
                for ("1by1" == u && (y = l), m = 0; m <= h.length - 1; m++) p.idCompare(h[m], f) && (setTimeout(function(t) {
                    return function() {
                        $("." + t).is(r) ? d.path($("." + t), l) : $("." + t).is(e) ? d.rect($("." + t), l) : $("." + t).is(a) ? d.circle($("." + t), l) : $("." + t).is(s) ? d.line($("." + t), l) : $("." + t).is(o) && d.polygon($("." + t), l)
                    }
                }(h[m]), g), g += y);
            else if ("terminus" == u || "terminusDelayed" == u)
                for (var m = 0, v = h.length - 1; m <= h.length / 2 && v >= h.length / 2; m++, v--) p.idCompare(h[m], f) && (setTimeout(function(t, n) {
                    return function() {
                        $("." + t).is(r) ? d.path($("." + t), l) : $("." + t).is(e) ? d.rect($("." + t), l) : $("." + t).is(a) ? d.circle($("." + t), l) : $("." + t).is(s) ? d.line($("." + t), l) : $("." + t).is(o) && d.polygon($("." + t), l), $("." + n).is(r) ? d.path($("." + n), l) : $("." + n).is(e) ? d.rect($("." + n), l) : $("." + n).is(a) ? d.circle($("." + n), l) : $("." + n).is(s) ? d.line($("." + n), l) : $("." + n).is(o) && d.polygon($("." + n), l)
                    }
                }(h[m], h[v]), g), g += "terminusDelayed" != u ? l : y);
            else {
                var w = [],
                    C = [],
                    M, L;
                if (u.indexOf("by") >= 0)
                    for (w = u.split("by"), M = Number(w[0]), L = w[1], m = 0; m <= h.length - 1; m += M)
                        if (p.idCompare(h[m], f)) {
                            for (var v = 0; M > v; v++) C.push(h[m + v]);
                            setTimeout(function(t) {
                                return function() {
                                    for (var n = 0; M > n; n++) $("." + t[n]).is(r) ? d.path($("." + t[n]), l) : $("." + t[n]).is(e) ? d.rect($("." + t[n]), l) : $("." + t[n]).is(a) ? d.circle($("." + t[n]), l) : $("." + t[n]).is(s) ? d.line($("." + t[n]), l) : $("." + t[n]).is(o) && d.polygon($("." + t[n]), l)
                                }
                            }(C), g), C = [], g += L.indexOf("Delayed") >= 0 ? y : l
                        }
            }
        },
        u = function(i, l) {
            i.children().each(function() {
                var i = p.randomClass();
                $(this).attr("class", i + "_" + t), h.push(i + "_" + t), $(this).is(n) ? u($(this)) : $(this).is(r) ? g.path($(this)) : $(this).is(e) ? g.rect($(this)) : $(this).is(a) ? g.circle($(this)) : $(this).is(s) ? g.line($(this)) : $(this).is(o) && g.polygon($(this))
            })
        },
        f = function(t, n) {
            var r = [];
            for (i = 0; i <= h.length - 1; i++) r = h[i].split("_"), n == Number(r[r.length - 1]) && p.destroy($("." + h[i]));
            h = []
        },
        d = {
            path: function(t, n) {
                p.dashDraw(t, n)
            },
            rect: function(t, n) {
                p.dashDraw(t, n)
            },
            circle: function(t, n) {
                p.dashDraw(t, n)
            },
            line: function(t, n) {
                p.dashDraw(t, n)
            },
            polygon: function(t, n) {
                p.dashDraw(t, n)
            }
        },
        g = {
            path: function(t) {
                var n = p.getPathLength(t);
                p.dashClear(t, n)
            },
            rect: function(t) {
                p.dashClear(t, p.getRectLength(t))
            },
            circle: function(t) {
                p.dashClear(t, p.getCircleLength(t))
            },
            line: function(t) {
                p.dashClear(t, p.getLineLength(t))
            },
            polygon: function(t) {
                p.dashClear(t, p.getPolygonLength(t))
            }
        },
        p = {
            getRectLength: function(t) {
                var n = t.attr("width"),
                    r = t.attr("height");
                return 2 * n + 2 * r
            },
            getPolygonLength: function(t) {
                var n = t.attr("points");
                n = n.split(" ");
                for (var r = null, e, i = null, a, s = 0, o, h, l = 0; l < n.length; l++) {
                    var c = n[l].split(",");
                    null == r && null == i ? (/(\r\n|\n|\r)/gm.test(c[0]) && (c[0] = c[0].replace(/(\r\n|\n|\r)/gm, ""), c[0] = c[0].replace(/\s+/g, "")), /(\r\n|\n|\r)/gm.test(c[1]) && (c[0] = c[1].replace(/(\r\n|\n|\r)/gm, ""), c[0] = c[1].replace(/\s+/g, "")), r = c[0], i = c[1], o = c[0], h = c[1]) : "" != c[0] && "" != c[1] && isNaN(c) && (/(\r\n|\n|\r)/gm.test(c[0]) && (c[0] = c[0].replace(/(\r\n|\n|\r)/gm, ""), c[0] = c[0].replace(/\s+/g, "")), /(\r\n|\n|\r)/gm.test(c[1]) && (c[0] = c[1].replace(/(\r\n|\n|\r)/gm, ""), c[0] = c[1].replace(/\s+/g, "")), e = c[0], a = c[1], s += Math.sqrt(Math.pow(e - r, 2) + Math.pow(a - i, 2)), r = e, i = a, l == n.length - 2 && (s += Math.sqrt(Math.pow(o - r, 2) + Math.pow(h - i, 2))))
                }
                return s
            },
            getLineLength: function(t) {
                var n = t.attr("x1"),
                    r = t.attr("x2"),
                    e = t.attr("y1"),
                    i = t.attr("y2"),
                    a = Math.sqrt(Math.pow(r - n, 2) + Math.pow(i - e, 2));
                return a
            },
            getCircleLength: function(t) {
                var n = t.attr("r"),
                    r = 2 * Math.PI * n;
                return r
            },
            clearFill: function(t) {
                t.css({
                    "fill-opacity": "0"
                })
            },
            drawFill: function(t, n) {
                t.animate({
                    "fill-opacity": 1
                }, {
                    duration: n
                })
            },
            dashClear: function(t, n) {
                var r = t.attr("stroke-dasharray");
                ("undefined" == typeof r || r === !1) && t.css({
                    "stroke-dasharray": n + "px"
                }), t.css({
                    "stroke-dashoffset": n + "px"
                })
            },
            destroy: function(t) {
                t.stop().css({
                    "stroke-dashoffset": "0px"
                })
            },
            dashDraw: function(t, n) {
                t.animate({
                    "stroke-dashoffset": 0
                }, {
                    queue: !1,
                    duration: n
                })
            },
            getPathLength: function(t) {
                var n = t.get(0),
                    r = n.getTotalLength();
                return r
            },
            randomClass: function() {
                return "z-" + Math.random().toString(36).substr(2, 6)
            },
            idCompare: function(t, n) {
                var r = [];
                return r = t.split("_"), Number(r[1]) == n ? !0 : !1
            },
            arrayShuffle: function(t) {
                for (var n, r, e = t.length; e; n = parseInt(Math.random() * e), r = t[--e], t[e] = t[n], t[n] = r);
                return t
            },
            randomColor: function() {
                return "#" + Math.floor(16777215 * Math.random()).toString(16)
            }
        }
}(jQuery);
