(function($, w) {
    $.flexmozaik = {
      conf: {
        selector: '.mozaik',
        ratio: 1,
        definition: { '<': 1 },
        delay: 400,
        onReady: function(a) {},
        onUnready: function(a) {},
        api: false
      }, 
      constants: {
        STATUS_READY: 'READY',
        STATUS_UNREADY: 'UNREADY'
      }
    };

    function F(l, q) {
        var r = this,
            t = 1,
            u, v, n = 0,
            k = 0,
            y = null,
            z, A, B = [],
            C = $.flexmozaik.constants.STATUS_READY,
            D = [],
            E, o;
        for (E in q.definition) {
            o = E.split('<');
            if (!o[0]) o[0] = 0;
            if (!o[1]) o[1] = Number.POSITIVE_INFINITY;
            D.push([o[0], o[1], q.definition[E]])
        }
        $.extend(r, {
            layout: function() {
                var m = l.parent().width(),
                    x, a;
                for (x = 0, a = D.length; x < a; x++) {
                    if (m >= D[x][0] && m <= D[x][1]) {
                        t = Math.max(1, D[x][2]);
                        break
                    }
                }
                u = Math.max(1, Math.floor(m / t));
                v = Math.max(1, Math.floor((m / t) * q.ratio));
                l.css({ 'position': 'relative' });
                return r
            },
            reset: function() {
                k = 0;
                n = 0;
                B = [];
                l.css({ 'min-height': '0' });
                return r
            },
            run: function() {
                if (C === $.flexmozaik.constants.STATUS_READY) {
                    C = $.flexmozaik.constants.STATUS_UNREADY;
                    q.onUnready(r);
                    z = l.find(q.selector);
                    A = z.length
                }
                if (k >= A) {
                    C = $.flexmozaik.constants.STATUS_READY;
                    q.onReady(r);
                    return r
                }
                var i, j, a, b, c, d, p, e = true,
                    f = $(z.get(k)),
                    g = r._readBlockData(f);
                if (g.w < 1 || g.h < 1) {  // 判断当前的 li 元素的宽和高，如果宽和高都 <1（也就是元素不存在），执行下一次 run()
                    r._placeBlock(f, n, 0, 0, 0);
                    k++;
                    return r.run()
                }
                for (i = n; e; i++) { // 行数是不确定的，所以
                    if (B.length < (i + g.h)) {  // if there are not enough space , add new row
                        for (a = 0, b = (i + g.h) - B.length; a < b; a++) { r._addGridLine() }
                    }
                    for (j = 0; j < t; j++) {
                        if (r._checkAround(i, j, g.w, g.h)) {
                            r._placeBlock(f, i, j, g.w, g.h);
                            for (a = i, b = i + g.h; a < b; a++) {
                                for (c = j, d = j + g.w; c < d; c++) { B[a][c] = true }
                            }
                            e = false;
                            break
                        }
                    }
                    if (i === n) {  // if all grids of current row are occupied, this row can be ignored in next run().
                        for (a = i, b = i + g.h; a < b; a++) {
                            for (j = 0; j < t; j++) {
                                if (!B[a][j]) break
                            }
                            if (j === t) n++;  // 如果当前行没有空余格子，下次计算就从下一行开始
                            else break
                        }
                    }
                }
                k++;
                return r.run()
            },
            _readBlockData: function(b) {
                var c = [],
                    a, o, d, s = { w: 1, h: 1 },
                    e = b.data('mozaik');
                for (a in e) {
                    o = a.split('<');
                    if (!o[0]) o[0] = 0;
                    if (!o[1]) o[1] = Number.POSITIVE_INFINITY;
                    c.push([o[0], o[1], e[a].w, e[a].h])
                }
                for (a = 0, d = c.length; a < d; a++) {
                    if (t >= c[a][0] && t <= c[a][1]) {
                        s = { w: parseInt(c[a][2]), h: parseInt(c[a][3]) };
                        break
                    }
                }
                return s
            },
            _addGridLine: function() {  // Add a new grid row
                var a = t;
                B[B.length] = [];
                while (a--) B[B.length - 1].push(false);
                l.css({ 'min-height': B.length * v });
                return r
            },
            _placeBlock: function(b, i, j, w, h) {
                $(b).css({ 'position': 'absolute', 'left': j * u, 'top': i * v, 'width': w * u, 'height': h * v });
                return r
            },
            _checkAround: function(i, j, w, h) {  // check if there are enough grids for this Element base on current grid
                                                  // the grids nember is w × h
                if (B[i][j]) return false;
                var a, b;
                for (a = i; a < i + h; a++) {
                    for (b = j; b < j + w; b++) {
                        if (B[a].length <= b) return false;
                        if (B[a][b]) return false
                    }
                }
                return true
            },
            getNbColumns: function() {
                return t
            },
            getTrigger: function() {
                return l
            },
            getConf: function() {
                return q
            }
        });
        $(w).bind('resize', function() {
            if (y) w.clearTimeout(y);
            y = w.setTimeout(function() {
                var a = u,
                    b = t;
                r.layout();
                if (a !== u || b !== t) { r.reset().run() }
            }, q.delay)
        });
        return r.reset().layout().run()
    };
    
    $.fn.flexmozaik = function(a) {
        var b = this.data('__flexmozaik');
        if (b) {
            return b
        }
        a = $.extend({}, $.flexmozaik.conf, a);
        this.each(function() {
            b = new F($(this), a);
            $(this).data('__flexmozaik', b)
        });
        return a.api ? b : this
    }
})(jQuery, window);
