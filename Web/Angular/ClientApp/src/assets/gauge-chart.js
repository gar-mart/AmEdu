!(function (t, n) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = n())
    : "function" == typeof define && define.amd
    ? define([], n)
    : "object" == typeof exports
    ? (exports.GaugeChart = n())
    : (t.GaugeChart = n());
})(this, function () {
  return (function (t) {
    function n(r) {
      if (e[r]) return e[r].exports;
      var i = (e[r] = { i: r, l: !1, exports: {} });
      return t[r].call(i.exports, i, i.exports, n), (i.l = !0), i.exports;
    }
    var e = {};
    return (
      (n.m = t),
      (n.c = e),
      (n.i = function (t) {
        return t;
      }),
      (n.d = function (t, e, r) {
        n.o(t, e) || Object.defineProperty(t, e, { configurable: !1, enumerable: !0, get: r });
      }),
      (n.n = function (t) {
        var e =
          t && t.__esModule
            ? function () {
                return t.default;
              }
            : function () {
                return t;
              };
        return n.d(e, "a", e), e;
      }),
      (n.o = function (t, n) {
        return Object.prototype.hasOwnProperty.call(t, n);
      }),
      (n.p = ""),
      n((n.s = 196))
    );
  })([
    function (t, n, e) {
      "use strict";
      function r(t) {
        return t > 1 ? 0 : t < -1 ? c : Math.acos(t);
      }
      function i(t) {
        return t > 1 ? f : t < -1 ? -f : Math.asin(t);
      }
      function u(t) {
        return (t = w(t / 2)) * t;
      }
      e.d(n, "o", function () {
        return a;
      }),
        e.d(n, "w", function () {
          return o;
        }),
        e.d(n, "a", function () {
          return c;
        }),
        e.d(n, "k", function () {
          return f;
        }),
        e.d(n, "v", function () {
          return s;
        }),
        e.d(n, "b", function () {
          return l;
        }),
        e.d(n, "h", function () {
          return h;
        }),
        e.d(n, "g", function () {
          return d;
        }),
        e.d(n, "p", function () {
          return p;
        }),
        e.d(n, "l", function () {
          return v;
        }),
        e.d(n, "e", function () {
          return b;
        }),
        e.d(n, "c", function () {
          return g;
        }),
        e.d(n, "u", function () {
          return y;
        }),
        e.d(n, "m", function () {
          return _;
        }),
        e.d(n, "i", function () {
          return m;
        }),
        e.d(n, "r", function () {
          return x;
        }),
        e.d(n, "d", function () {
          return w;
        }),
        e.d(n, "q", function () {
          return M;
        }),
        e.d(n, "n", function () {
          return k;
        }),
        e.d(n, "j", function () {
          return N;
        }),
        (n.s = r),
        (n.f = i),
        (n.t = u);
      var a = 1e-6,
        o = 1e-12,
        c = Math.PI,
        f = c / 2,
        s = c / 4,
        l = 2 * c,
        h = 180 / c,
        d = c / 180,
        p = Math.abs,
        v = Math.atan,
        b = Math.atan2,
        g = Math.cos,
        y = Math.ceil,
        _ = Math.exp,
        m = (Math.floor, Math.log),
        x = Math.pow,
        w = Math.sin,
        M =
          Math.sign ||
          function (t) {
            return t > 0 ? 1 : t < 0 ? -1 : 0;
          },
        k = Math.sqrt,
        N = Math.tan;
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t) {
        for (var n = (t.length / 6) | 0, e = new Array(n), r = 0; r < n; ) e[r] = "#" + t.slice(6 * r, 6 * ++r);
        return e;
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(366);
      n.a = function (t) {
        return e.i(r.a)(t[t.length - 1]);
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(431);
      e.d(n, "a", function () {
        return r.a;
      });
      var i = e(46);
      e.d(n, "b", function () {
        return i.a;
      });
      var u = e(432);
      e.d(n, "c", function () {
        return u.a;
      });
      var a = e(165);
      e.d(n, "d", function () {
        return a.a;
      });
      var o = e(433);
      e.d(n, "e", function () {
        return o.a;
      });
      var c = e(84);
      e.d(n, "f", function () {
        return c.a;
      });
      var f = e(85);
      e.d(n, "g", function () {
        return f.a;
      });
      var s = e(47);
      e.d(n, "h", function () {
        return s.a;
      });
      var l = e(166);
      e.d(n, "i", function () {
        return l.a;
      });
      var h = e(434);
      e.d(n, "j", function () {
        return h.a;
      });
      var d = e(7);
      e.d(n, "k", function () {
        return d.a;
      });
      var p = e(87);
      e.d(n, "l", function () {
        return p.a;
      });
      var v = e(170);
      e.d(n, "m", function () {
        return v.a;
      });
      var b = e(169);
      e.d(n, "n", function () {
        return b.a;
      });
      var g = e(462);
      e.d(n, "o", function () {
        return g.a;
      });
      var y = e(463);
      e.d(n, "p", function () {
        return y.a;
      });
      var _ = e(89);
      e.d(n, "q", function () {
        return _.a;
      });
      var m = e(86);
      e.d(n, "r", function () {
        return m.a;
      }),
        e.d(n, "s", function () {
          return m.b;
        });
    },
    function (t, n, e) {
      "use strict";
      function r(t, n, e, a) {
        function o(n) {
          return t((n = new Date(+n))), n;
        }
        return (
          (o.floor = o),
          (o.ceil = function (e) {
            return t((e = new Date(e - 1))), n(e, 1), t(e), e;
          }),
          (o.round = function (t) {
            var n = o(t),
              e = o.ceil(t);
            return t - n < e - t ? n : e;
          }),
          (o.offset = function (t, e) {
            return n((t = new Date(+t)), null == e ? 1 : Math.floor(e)), t;
          }),
          (o.range = function (e, r, i) {
            var u,
              a = [];
            if (((e = o.ceil(e)), (i = null == i ? 1 : Math.floor(i)), !(e < r && i > 0))) return a;
            do {
              a.push((u = new Date(+e))), n(e, i), t(e);
            } while (u < e && e < r);
            return a;
          }),
          (o.filter = function (e) {
            return r(
              function (n) {
                if (n >= n) for (; t(n), !e(n); ) n.setTime(n - 1);
              },
              function (t, r) {
                if (t >= t)
                  if (r < 0) for (; ++r <= 0; ) for (; n(t, -1), !e(t); );
                  else for (; --r >= 0; ) for (; n(t, 1), !e(t); );
              }
            );
          }),
          e &&
            ((o.count = function (n, r) {
              return i.setTime(+n), u.setTime(+r), t(i), t(u), Math.floor(e(i, u));
            }),
            (o.every = function (t) {
              return (
                (t = Math.floor(t)),
                isFinite(t) && t > 0
                  ? t > 1
                    ? o.filter(
                        a
                          ? function (n) {
                              return a(n) % t == 0;
                            }
                          : function (n) {
                              return o.count(0, n) % t == 0;
                            }
                      )
                    : o
                  : null
              );
            })),
          o
        );
      }
      n.a = r;
      var i = new Date(),
        u = new Date();
    },
    function (t, n, e) {
      "use strict";
      var r = e(103);
      e.d(n, "a", function () {
        return r.a;
      }),
        e.d(n, "b", function () {
          return r.b;
        }),
        e.d(n, "c", function () {
          return r.c;
        });
      var i = e(19);
      e.d(n, "d", function () {
        return i.a;
      });
      var u = e(104);
      e.d(n, "e", function () {
        return u.a;
      });
      var a = e(198);
      e.d(n, "f", function () {
        return a.a;
      });
      var o = e(199);
      e.d(n, "g", function () {
        return o.a;
      });
      var c = e(105);
      e.d(n, "h", function () {
        return c.a;
      });
      var f = e(106);
      e.d(n, "i", function () {
        return f.a;
      });
      var s = e(200);
      e.d(n, "j", function () {
        return s.a;
      });
      var l = e(210);
      e.d(n, "k", function () {
        return l.a;
      });
      var h = e(211);
      e.d(n, "l", function () {
        return h.a;
      });
      var d = e(110);
      e.d(n, "m", function () {
        return d.a;
      });
      var p = e(202);
      e.d(n, "n", function () {
        return p.a;
      });
      var v = e(203);
      e.d(n, "o", function () {
        return v.a;
      });
      var b = e(204);
      e.d(n, "p", function () {
        return b.a;
      });
      var g = e(205);
      e.d(n, "q", function () {
        return g.a;
      });
      var y = e(107);
      e.d(n, "r", function () {
        return y.a;
      });
      var _ = e(108);
      e.d(n, "s", function () {
        return _.a;
      });
      var m = e(206);
      e.d(n, "t", function () {
        return m.a;
      });
      var x = e(56);
      e.d(n, "u", function () {
        return x.a;
      });
      var w = e(109);
      e.d(n, "v", function () {
        return w.a;
      });
      var M = e(207);
      e.d(n, "w", function () {
        return M.a;
      });
      var k = e(208);
      e.d(n, "x", function () {
        return k.a;
      });
      var N = e(209);
      e.d(n, "y", function () {
        return N.a;
      });
      var A = e(111);
      e.d(n, "z", function () {
        return A.a;
      }),
        e.d(n, "A", function () {
          return A.b;
        }),
        e.d(n, "B", function () {
          return A.c;
        });
      var S = e(112);
      e.d(n, "C", function () {
        return S.a;
      });
      var T = e(113);
      e.d(n, "D", function () {
        return T.a;
      });
      var E = e(212);
      e.d(n, "E", function () {
        return E.a;
      });
    },
    function (t, n, e) {
      "use strict";
      var r = e(75);
      e.d(n, "a", function () {
        return r.a;
      });
      var i = e(143);
      e.d(n, "b", function () {
        return i.a;
      });
      var u = e(74);
      e.d(n, "c", function () {
        return u.a;
      });
      var a = e(144);
      e.d(n, "d", function () {
        return a.a;
      });
      var o = e(146);
      e.d(n, "e", function () {
        return o.a;
      });
      var c = e(42);
      e.d(n, "f", function () {
        return c.a;
      });
      var f = e(147);
      e.d(n, "g", function () {
        return f.a;
      });
      var s = e(322);
      e.d(n, "h", function () {
        return s.a;
      });
      var l = e(149);
      e.d(n, "i", function () {
        return l.a;
      });
      var h = e(324);
      e.d(n, "j", function () {
        return h.a;
      }),
        e.d(n, "k", function () {
          return h.b;
        });
      var d = e(326);
      e.d(n, "l", function () {
        return d.a;
      });
      var p = e(148);
      e.d(n, "m", function () {
        return p.a;
      }),
        e.d(n, "n", function () {
          return p.b;
        }),
        e.d(n, "o", function () {
          return p.c;
        });
      var v = e(319);
      e.d(n, "p", function () {
        return v.a;
      }),
        e.d(n, "q", function () {
          return v.b;
        });
      var b = e(320);
      e.d(n, "r", function () {
        return b.a;
      });
      var g = e(318);
      e.d(n, "s", function () {
        return g.a;
      }),
        e.d(n, "t", function () {
          return g.b;
        });
      var y = e(317);
      e.d(n, "u", function () {
        return y.a;
      }),
        e.d(n, "v", function () {
          return y.b;
        });
      var _ = e(321);
      e.d(n, "w", function () {
        return _.a;
      });
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        (this._groups = t), (this._parents = n);
      }
      function i() {
        return new r([[document.documentElement]], L);
      }
      e.d(n, "c", function () {
        return L;
      }),
        (n.b = r);
      var u = e(457),
        a = e(458),
        o = e(446),
        c = e(440),
        f = e(167),
        s = e(445),
        l = e(450),
        h = e(453),
        d = e(460),
        p = e(437),
        v = e(452),
        b = e(451),
        g = e(459),
        y = e(444),
        _ = e(443),
        m = e(436),
        x = e(169),
        w = e(454),
        M = e(438),
        k = e(461),
        N = e(447),
        A = e(455),
        S = e(449),
        T = e(435),
        E = e(448),
        C = e(456),
        P = e(439),
        z = e(441),
        R = e(86),
        q = e(442),
        L = [null];
      (r.prototype = i.prototype =
        {
          constructor: r,
          select: u.a,
          selectAll: a.a,
          filter: o.a,
          data: c.a,
          enter: f.a,
          exit: s.a,
          merge: l.a,
          order: h.a,
          sort: d.a,
          call: p.a,
          nodes: v.a,
          node: b.a,
          size: g.a,
          empty: y.a,
          each: _.a,
          attr: m.a,
          style: x.b,
          property: w.a,
          classed: M.a,
          text: k.a,
          html: N.a,
          raise: A.a,
          lower: S.a,
          append: T.a,
          insert: E.a,
          remove: C.a,
          clone: P.a,
          datum: z.a,
          on: R.c,
          dispatch: q.a,
        }),
        (n.a = i);
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        var e = u(t, n);
        if (e.state > l) throw new Error("too late; already scheduled");
        return e;
      }
      function i(t, n) {
        var e = u(t, n);
        if (e.state > d) throw new Error("too late; already started");
        return e;
      }
      function u(t, n) {
        var e = t.__transition;
        if (!e || !(e = e[n])) throw new Error("transition not found");
        return e;
      }
      function a(t, n, r) {
        function i(t) {
          (r.state = h), r.timer.restart(u, r.delay, r.time), r.delay <= t && u(t - r.delay);
        }
        function u(i) {
          var l, b, y, _;
          if (r.state !== h) return o();
          for (l in s)
            if (((_ = s[l]), _.name === r.name)) {
              if (_.state === p) return e.i(c.d)(u);
              _.state === v
                ? ((_.state = g), _.timer.stop(), _.on.call("interrupt", t, t.__data__, _.index, _.group), delete s[l])
                : +l < n && ((_.state = g), _.timer.stop(), delete s[l]);
            }
          if (
            (e.i(c.d)(function () {
              r.state === p && ((r.state = v), r.timer.restart(a, r.delay, r.time), a(i));
            }),
            (r.state = d),
            r.on.call("start", t, t.__data__, r.index, r.group),
            r.state === d)
          ) {
            for (r.state = p, f = new Array((y = r.tween.length)), l = 0, b = -1; l < y; ++l)
              (_ = r.tween[l].value.call(t, t.__data__, r.index, r.group)) && (f[++b] = _);
            f.length = b + 1;
          }
        }
        function a(n) {
          for (
            var e = n < r.duration ? r.ease.call(null, n / r.duration) : (r.timer.restart(o), (r.state = b), 1),
              i = -1,
              u = f.length;
            ++i < u;

          )
            f[i].call(null, e);
          r.state === b && (r.on.call("end", t, t.__data__, r.index, r.group), o());
        }
        function o() {
          (r.state = g), r.timer.stop(), delete s[n];
          for (var e in s) return;
          delete t.__transition;
        }
        var f,
          s = t.__transition;
        (s[n] = r), (r.timer = e.i(c.b)(i, 0, r.time));
      }
      e.d(n, "d", function () {
        return h;
      }),
        e.d(n, "a", function () {
          return d;
        }),
        e.d(n, "b", function () {
          return b;
        }),
        e.d(n, "c", function () {
          return g;
        }),
        (n.g = r),
        (n.e = i),
        (n.f = u);
      var o = e(14),
        c = e(53),
        f = e.i(o.a)("start", "end", "interrupt"),
        s = [],
        l = 0,
        h = 1,
        d = 2,
        p = 3,
        v = 4,
        b = 5,
        g = 6;
      n.h = function (t, n, e, r, i, u) {
        var o = t.__transition;
        if (o) {
          if (e in o) return;
        } else t.__transition = {};
        a(t, e, {
          name: n,
          index: r,
          group: i,
          on: f,
          tween: s,
          time: u.time,
          delay: u.delay,
          duration: u.duration,
          ease: u.ease,
          timer: null,
          state: l,
        });
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(58);
      e.d(n, "a", function () {
        return r.a;
      }),
        e.d(n, "b", function () {
          return r.b;
        }),
        e.d(n, "c", function () {
          return r.c;
        });
      var i = e(233);
      e.d(n, "d", function () {
        return i.a;
      }),
        e.d(n, "e", function () {
          return i.b;
        });
      var u = e(232);
      e.d(n, "f", function () {
        return u.a;
      });
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return e.i(d.b)({
          point: function (n, e) {
            var r = t(n, e);
            return this.stream.point(r[0], r[1]);
          },
        });
      }
      function i(t) {
        return u(function () {
          return t;
        })();
      }
      function u(t) {
        function n(t) {
          return (t = w(t[0] * l.g, t[1] * l.g)), [t[0] * T + _, m - t[1] * T];
        }
        function i(t) {
          return (t = w.invert((t[0] - _) / T, (m - t[1]) / T)) && [t[0] * l.h, t[1] * l.h];
        }
        function u(t, n) {
          return (t = y(t, n)), [t[0] * T + _, m - t[1] * T];
        }
        function d() {
          w = e.i(f.a)((x = e.i(h.b)(R, q, L)), y);
          var t = y(P, z);
          return (_ = E - t[0] * T), (m = C + t[1] * T), g();
        }
        function g() {
          return (A = S = null), n;
        }
        var y,
          _,
          m,
          x,
          w,
          M,
          k,
          N,
          A,
          S,
          T = 150,
          E = 480,
          C = 250,
          P = 0,
          z = 0,
          R = 0,
          q = 0,
          L = 0,
          O = null,
          D = a.a,
          U = null,
          j = s.a,
          I = 0.5,
          B = e.i(v.a)(u, I);
        return (
          (n.stream = function (t) {
            return A && S === t ? A : (A = b(r(x)(D(B(j((S = t)))))));
          }),
          (n.preclip = function (t) {
            return arguments.length ? ((D = t), (O = void 0), g()) : D;
          }),
          (n.postclip = function (t) {
            return arguments.length ? ((j = t), (U = M = k = N = null), g()) : j;
          }),
          (n.clipAngle = function (t) {
            return arguments.length ? ((D = +t ? e.i(o.a)((O = t * l.g)) : ((O = null), a.a)), g()) : O * l.h;
          }),
          (n.clipExtent = function (t) {
            return arguments.length
              ? ((j =
                  null == t
                    ? ((U = M = k = N = null), s.a)
                    : e.i(c.a)((U = +t[0][0]), (M = +t[0][1]), (k = +t[1][0]), (N = +t[1][1]))),
                g())
              : null == U
              ? null
              : [
                  [U, M],
                  [k, N],
                ];
          }),
          (n.scale = function (t) {
            return arguments.length ? ((T = +t), d()) : T;
          }),
          (n.translate = function (t) {
            return arguments.length ? ((E = +t[0]), (C = +t[1]), d()) : [E, C];
          }),
          (n.center = function (t) {
            return arguments.length ? ((P = (t[0] % 360) * l.g), (z = (t[1] % 360) * l.g), d()) : [P * l.h, z * l.h];
          }),
          (n.rotate = function (t) {
            return arguments.length
              ? ((R = (t[0] % 360) * l.g), (q = (t[1] % 360) * l.g), (L = t.length > 2 ? (t[2] % 360) * l.g : 0), d())
              : [R * l.h, q * l.h, L * l.h];
          }),
          (n.precision = function (t) {
            return arguments.length ? ((B = e.i(v.a)(u, (I = t * t))), g()) : e.i(l.n)(I);
          }),
          (n.fitExtent = function (t, r) {
            return e.i(p.a)(n, t, r);
          }),
          (n.fitSize = function (t, r) {
            return e.i(p.b)(n, t, r);
          }),
          (n.fitWidth = function (t, r) {
            return e.i(p.c)(n, t, r);
          }),
          (n.fitHeight = function (t, r) {
            return e.i(p.d)(n, t, r);
          }),
          function () {
            return (y = t.apply(this, arguments)), (n.invert = y.invert && i), d();
          }
        );
      }
      (n.a = i), (n.b = u);
      var a = e(126),
        o = e(128),
        c = e(38),
        f = e(131),
        s = e(66),
        l = e(0),
        h = e(39),
        d = e(40),
        p = e(69),
        v = e(292),
        b = e.i(d.b)({
          point: function (t, n) {
            this.stream.point(t * l.g, n * l.g);
          },
        });
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "e", function () {
        return r;
      }),
        e.d(n, "d", function () {
          return i;
        }),
        e.d(n, "c", function () {
          return u;
        }),
        e.d(n, "b", function () {
          return a;
        }),
        e.d(n, "a", function () {
          return o;
        });
      var r = 1e3,
        i = 6e4,
        u = 36e5,
        a = 864e5,
        o = 6048e5;
    },
    function (t, n, e) {
      "use strict";
      function r() {}
      n.a = r;
    },
    function (t, n, e) {
      "use strict";
      function r(t, n, e, r) {
        (this._groups = t), (this._parents = n), (this._name = e), (this._id = r);
      }
      function i(t) {
        return e.i(a.k)().transition(t);
      }
      function u() {
        return ++k;
      }
      (n.b = r), (n.a = i), (n.c = u);
      var a = e(3),
        o = e(510),
        c = e(511),
        f = e(512),
        s = e(513),
        l = e(514),
        h = e(515),
        d = e(516),
        p = e(517),
        v = e(518),
        b = e(519),
        g = e(520),
        y = e(521),
        _ = e(522),
        m = e(523),
        x = e(524),
        w = e(525),
        M = e(54),
        k = 0,
        N = a.k.prototype;
      r.prototype = i.prototype = {
        constructor: r,
        select: b.a,
        selectAll: g.a,
        filter: h.a,
        merge: d.a,
        selection: y.a,
        transition: w.a,
        call: N.call,
        nodes: N.nodes,
        node: N.node,
        size: N.size,
        empty: N.empty,
        each: N.each,
        on: p.a,
        attr: o.a,
        attrTween: c.a,
        style: _.a,
        styleTween: m.a,
        text: x.a,
        remove: v.a,
        tween: M.a,
        delay: f.a,
        duration: s.a,
        ease: l.a,
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(234);
      e.d(n, "a", function () {
        return r.a;
      });
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        t && o.hasOwnProperty(t.type) && o[t.type](t, n);
      }
      function i(t, n, e) {
        var r,
          i = -1,
          u = t.length - e;
        for (n.lineStart(); ++i < u; ) (r = t[i]), n.point(r[0], r[1], r[2]);
        n.lineEnd();
      }
      function u(t, n) {
        var e = -1,
          r = t.length;
        for (n.polygonStart(); ++e < r; ) i(t[e], n, 1);
        n.polygonEnd();
      }
      var a = {
          Feature: function (t, n) {
            r(t.geometry, n);
          },
          FeatureCollection: function (t, n) {
            for (var e = t.features, i = -1, u = e.length; ++i < u; ) r(e[i].geometry, n);
          },
        },
        o = {
          Sphere: function (t, n) {
            n.sphere();
          },
          Point: function (t, n) {
            (t = t.coordinates), n.point(t[0], t[1], t[2]);
          },
          MultiPoint: function (t, n) {
            for (var e = t.coordinates, r = -1, i = e.length; ++r < i; ) (t = e[r]), n.point(t[0], t[1], t[2]);
          },
          LineString: function (t, n) {
            i(t.coordinates, n, 0);
          },
          MultiLineString: function (t, n) {
            for (var e = t.coordinates, r = -1, u = e.length; ++r < u; ) i(e[r], n, 0);
          },
          Polygon: function (t, n) {
            u(t.coordinates, n);
          },
          MultiPolygon: function (t, n) {
            for (var e = t.coordinates, r = -1, i = e.length; ++r < i; ) u(e[r], n);
          },
          GeometryCollection: function (t, n) {
            for (var e = t.geometries, i = -1, u = e.length; ++i < u; ) r(e[i], n);
          },
        };
      n.a = function (t, n) {
        t && a.hasOwnProperty(t.type) ? a[t.type](t, n) : r(t, n);
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(327);
      e.d(n, "a", function () {
        return r.a;
      });
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "a", function () {
        return i;
      }),
        e.d(n, "b", function () {
          return u;
        });
      var r = Array.prototype,
        i = r.map,
        u = r.slice;
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t) {
        return function () {
          return t;
        };
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t, n) {
        return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t) {
        return function () {
          return t;
        };
      };
    },
    function (t, n, e) {
      "use strict";
      function r() {
        this.reset();
      }
      function i(t, n, e) {
        var r = (t.s = n + e),
          i = r - n,
          u = r - i;
        t.t = n - u + (e - i);
      }
      (n.a = function () {
        return new r();
      }),
        (r.prototype = {
          constructor: r,
          reset: function () {
            this.s = this.t = 0;
          },
          add: function (t) {
            i(u, t, this.t), i(this, u.s, this.s), this.s ? (this.t += u.t) : (this.s = u.t);
          },
          valueOf: function () {
            return this.s;
          },
        });
      var u = new r();
    },
    function (t, n, e) {
      "use strict";
      n.a = function () {
        return Math.random();
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(79);
      e.d(n, "f", function () {
        return r.h;
      }),
        e.d(n, "e", function () {
          return r.g;
        }),
        e.d(n, "d", function () {
          return r.f;
        });
      var i = e(365);
      e.d(n, "c", function () {
        return i.b;
      }),
        e.d(n, "b", function () {
          return i.a;
        });
      var u = e(364);
      e.d(n, "a", function () {
        return u.a;
      });
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t) {
        return null === t ? NaN : +t;
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(229);
      e.d(n, "a", function () {
        return r.a;
      });
      var i = e(230);
      e.d(n, "b", function () {
        return i.a;
      });
      var u = e(57);
      e.d(n, "c", function () {
        return u.a;
      });
      var a = e(228);
      e.d(n, "d", function () {
        return a.a;
      });
      var o = e(231);
      e.d(n, "e", function () {
        return o.a;
      });
      var c = e(227);
      e.d(n, "f", function () {
        return c.a;
      });
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return [e.i(s.e)(t[1], t[0]), e.i(s.f)(t[2])];
      }
      function i(t) {
        var n = t[0],
          r = t[1],
          i = e.i(s.c)(r);
        return [i * e.i(s.c)(n), i * e.i(s.d)(n), e.i(s.d)(r)];
      }
      function u(t, n) {
        return t[0] * n[0] + t[1] * n[1] + t[2] * n[2];
      }
      function a(t, n) {
        return [t[1] * n[2] - t[2] * n[1], t[2] * n[0] - t[0] * n[2], t[0] * n[1] - t[1] * n[0]];
      }
      function o(t, n) {
        (t[0] += n[0]), (t[1] += n[1]), (t[2] += n[2]);
      }
      function c(t, n) {
        return [t[0] * n, t[1] * n, t[2] * n];
      }
      function f(t) {
        var n = e.i(s.n)(t[0] * t[0] + t[1] * t[1] + t[2] * t[2]);
        (t[0] /= n), (t[1] /= n), (t[2] /= n);
      }
      (n.g = r), (n.a = i), (n.d = u), (n.b = a), (n.f = o), (n.e = c), (n.c = f);
      var s = e(0);
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return function (n, r) {
          var i = e.i(u.c)(n),
            a = e.i(u.c)(r),
            o = t(i * a);
          return [o * a * e.i(u.d)(n), o * e.i(u.d)(r)];
        };
      }
      function i(t) {
        return function (n, r) {
          var i = e.i(u.n)(n * n + r * r),
            a = t(i),
            o = e.i(u.d)(a),
            c = e.i(u.c)(a);
          return [e.i(u.e)(n * o, i * c), e.i(u.f)(i && (r * o) / i)];
        };
      }
      (n.b = r), (n.a = i);
      var u = e(0);
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t, n, e, r, i) {
        for (var u, a = t.children, o = -1, c = a.length, f = t.value && (r - n) / t.value; ++o < c; )
          (u = a[o]), (u.y0 = e), (u.y1 = i), (u.x0 = n), (u.x1 = n += u.value * f);
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        return function (e) {
          return t + e * n;
        };
      }
      function i(t, n, e) {
        return (
          (t = Math.pow(t, e)),
          (n = Math.pow(n, e) - t),
          (e = 1 / e),
          function (r) {
            return Math.pow(t + r * n, e);
          }
        );
      }
      function u(t, n) {
        var i = n - t;
        return i ? r(t, i > 180 || i < -180 ? i - 360 * Math.round(i / 360) : i) : e.i(c.a)(isNaN(t) ? n : t);
      }
      function a(t) {
        return 1 == (t = +t)
          ? o
          : function (n, r) {
              return r - n ? i(n, r, t) : e.i(c.a)(isNaN(n) ? r : n);
            };
      }
      function o(t, n) {
        var i = n - t;
        return i ? r(t, i) : e.i(c.a)(isNaN(t) ? n : t);
      }
      (n.b = u), (n.c = a), (n.a = o);
      var c = e(145);
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        return function (e) {
          return t + e * n;
        };
      }
      function i(t, n, e) {
        return (
          (t = Math.pow(t, e)),
          (n = Math.pow(n, e) - t),
          (e = 1 / e),
          function (r) {
            return Math.pow(t + r * n, e);
          }
        );
      }
      function u(t, n) {
        var i = n - t;
        return i ? r(t, i > 180 || i < -180 ? i - 360 * Math.round(i / 360) : i) : e.i(c.a)(isNaN(t) ? n : t);
      }
      function a(t) {
        return 1 == (t = +t)
          ? o
          : function (n, r) {
              return r - n ? i(n, r, t) : e.i(c.a)(isNaN(n) ? r : n);
            };
      }
      function o(t, n) {
        var i = n - t;
        return i ? r(t, i) : e.i(c.a)(isNaN(t) ? n : t);
      }
      (n.b = u), (n.c = a), (n.a = o);
      var c = e(156);
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t) {
        return t.match(/.{6}/g).map(function (t) {
          return "#" + t;
        });
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        var n = t.domain;
        return (
          (t.ticks = function (t) {
            var r = n();
            return e.i(u.z)(r[0], r[r.length - 1], null == t ? 10 : t);
          }),
          (t.tickFormat = function (t, r) {
            return e.i(c.a)(n(), t, r);
          }),
          (t.nice = function (r) {
            null == r && (r = 10);
            var i,
              a = n(),
              o = 0,
              c = a.length - 1,
              f = a[o],
              s = a[c];
            return (
              s < f && ((i = f), (f = s), (s = i), (i = o), (o = c), (c = i)),
              (i = e.i(u.A)(f, s, r)),
              i > 0
                ? ((f = Math.floor(f / i) * i), (s = Math.ceil(s / i) * i), (i = e.i(u.A)(f, s, r)))
                : i < 0 && ((f = Math.ceil(f * i) / i), (s = Math.floor(s * i) / i), (i = e.i(u.A)(f, s, r))),
              i > 0
                ? ((a[o] = Math.floor(f / i) * i), (a[c] = Math.ceil(s / i) * i), n(a))
                : i < 0 && ((a[o] = Math.ceil(f * i) / i), (a[c] = Math.floor(s * i) / i), n(a)),
              t
            );
          }),
          t
        );
      }
      function i() {
        var t = e.i(o.a)(o.b, a.f);
        return (
          (t.copy = function () {
            return e.i(o.c)(t, i());
          }),
          r(t)
        );
      }
      (n.b = r), (n.a = i);
      var u = e(5),
        a = e(6),
        o = e(45),
        c = e(427);
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return t > 1 ? 0 : t < -1 ? d : Math.acos(t);
      }
      function i(t) {
        return t >= 1 ? p : t <= -1 ? -p : Math.asin(t);
      }
      e.d(n, "g", function () {
        return u;
      }),
        e.d(n, "m", function () {
          return a;
        }),
        e.d(n, "h", function () {
          return o;
        }),
        e.d(n, "e", function () {
          return c;
        }),
        e.d(n, "j", function () {
          return f;
        }),
        e.d(n, "i", function () {
          return s;
        }),
        e.d(n, "d", function () {
          return l;
        }),
        e.d(n, "a", function () {
          return h;
        }),
        e.d(n, "b", function () {
          return d;
        }),
        e.d(n, "f", function () {
          return p;
        }),
        e.d(n, "c", function () {
          return v;
        }),
        (n.l = r),
        (n.k = i);
      var u = Math.abs,
        a = Math.atan2,
        o = Math.cos,
        c = Math.max,
        f = Math.min,
        s = Math.sin,
        l = Math.sqrt,
        h = 1e-12,
        d = Math.PI,
        p = d / 2,
        v = 2 * d;
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t, n) {
        if ((i = t.length) > 1)
          for (var e, r, i, u = 1, a = t[n[0]], o = a.length; u < i; ++u)
            for (r = a, a = t[n[u]], e = 0; e < o; ++e) a[e][1] += a[e][0] = isNaN(r[e][1]) ? r[e][0] : r[e][1];
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t) {
        for (var n = t.length, e = new Array(n); --n >= 0; ) e[n] = n;
        return e;
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t, n, e) {
        return (t[0] - e[0]) * (n[1] - t[1]) - (t[0] - n[0]) * (e[1] - t[1]);
      }
      function i(t, n) {
        return n[1] - t[1] || n[0] - t[0];
      }
      function u(t, n) {
        var r,
          u,
          v,
          b = t.sort(i).pop();
        for (f = [], o = new Array(t.length), a = new p.a(), c = new p.a(); ; )
          if (((v = h.a), b && (!v || b[1] < v.y || (b[1] === v.y && b[0] < v.x))))
            (b[0] === r && b[1] === u) || (e.i(s.a)(b), (r = b[0]), (u = b[1])), (b = t.pop());
          else {
            if (!v) break;
            e.i(s.b)(v.arc);
          }
        if ((e.i(l.a)(), n)) {
          var g = +n[0][0],
            y = +n[0][1],
            _ = +n[1][0],
            m = +n[1][1];
          e.i(d.a)(g, y, _, m), e.i(l.b)(g, y, _, m);
        }
        (this.edges = f), (this.cells = o), (a = c = f = o = null);
      }
      e.d(n, "b", function () {
        return v;
      }),
        e.d(n, "f", function () {
          return b;
        }),
        e.d(n, "e", function () {
          return a;
        }),
        e.d(n, "c", function () {
          return o;
        }),
        e.d(n, "g", function () {
          return c;
        }),
        e.d(n, "d", function () {
          return f;
        }),
        (n.a = u);
      var a,
        o,
        c,
        f,
        s = e(527),
        l = e(189),
        h = e(190),
        d = e(98),
        p = e(99),
        v = 1e-6,
        b = 1e-12;
      u.prototype = {
        constructor: u,
        polygons: function () {
          var t = this.edges;
          return this.cells.map(function (n) {
            var r = n.halfedges.map(function (r) {
              return e.i(l.c)(n, t[r]);
            });
            return (r.data = n.site.data), r;
          });
        },
        triangles: function () {
          var t = [],
            n = this.edges;
          return (
            this.cells.forEach(function (e, i) {
              if ((a = (u = e.halfedges).length))
                for (var u, a, o, c = e.site, f = -1, s = n[u[a - 1]], l = s.left === c ? s.right : s.left; ++f < a; )
                  (o = l),
                    (s = n[u[f]]),
                    (l = s.left === c ? s.right : s.left),
                    o && l && i < o.index && i < l.index && r(c, o, l) < 0 && t.push([c.data, o.data, l.data]);
            }),
            t
          );
        },
        links: function () {
          return this.edges
            .filter(function (t) {
              return t.right;
            })
            .map(function (t) {
              return { source: t.left.data, target: t.right.data };
            });
        },
        find: function (t, n, e) {
          for (var r, i, u = this, a = u._found || 0, o = u.cells.length; !(i = u.cells[a]); )
            if (++a >= o) return null;
          var c = t - i.site[0],
            f = n - i.site[1],
            s = c * c + f * f;
          do {
            (i = u.cells[(r = a)]),
              (a = null),
              i.halfedges.forEach(function (e) {
                var r = u.edges[e],
                  o = r.left;
                if ((o !== i.site && o) || (o = r.right)) {
                  var c = t - o[0],
                    f = n - o[1],
                    l = c * c + f * f;
                  l < s && ((s = l), (a = o.index));
                }
              });
          } while (null !== a);
          return (u._found = r), null == e || s <= e * e ? i.site : null;
        },
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(65);
      n.a = function (t) {
        return (t = e.i(r.a)(Math.abs(t))), t ? t[1] : NaN;
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t, n, r, l) {
        function h(e, i) {
          return t <= e && e <= r && n <= i && i <= l;
        }
        function d(e, i, u, a) {
          var o = 0,
            c = 0;
          if (null == e || (o = p(e, u)) !== (c = p(i, u)) || (b(e, i) < 0) ^ (u > 0))
            do {
              a.point(0 === o || 3 === o ? t : r, o > 1 ? l : n);
            } while ((o = (o + u + 4) % 4) !== c);
          else a.point(i[0], i[1]);
        }
        function p(u, a) {
          return e.i(i.p)(u[0] - t) < i.o
            ? a > 0
              ? 0
              : 3
            : e.i(i.p)(u[0] - r) < i.o
            ? a > 0
              ? 2
              : 1
            : e.i(i.p)(u[1] - n) < i.o
            ? a > 0
              ? 1
              : 0
            : a > 0
            ? 3
            : 2;
        }
        function v(t, n) {
          return b(t.x, n.x);
        }
        function b(t, n) {
          var e = p(t, 1),
            r = p(n, 1);
          return e !== r ? e - r : 0 === e ? n[1] - t[1] : 1 === e ? t[0] - n[0] : 2 === e ? t[1] - n[1] : n[0] - t[0];
        }
        return function (i) {
          function p(t, n) {
            h(t, n) && R.point(t, n);
          }
          function b() {
            for (var n = 0, e = 0, r = M.length; e < r; ++e)
              for (var i, u, a = M[e], o = 1, c = a.length, f = a[0], s = f[0], h = f[1]; o < c; ++o)
                (i = s),
                  (u = h),
                  (f = a[o]),
                  (s = f[0]),
                  (h = f[1]),
                  u <= l
                    ? h > l && (s - i) * (l - u) > (h - u) * (t - i) && ++n
                    : h <= l && (s - i) * (l - u) < (h - u) * (t - i) && --n;
            return n;
          }
          function g() {
            (R = q), (w = []), (M = []), (z = !0);
          }
          function y() {
            var t = b(),
              n = z && t,
              r = (w = e.i(c.q)(w)).length;
            (n || r) &&
              (i.polygonStart(),
              n && (i.lineStart(), d(null, null, 1, i), i.lineEnd()),
              r && e.i(o.a)(w, v, t, d, i),
              i.polygonEnd()),
              (R = i),
              (w = M = k = null);
          }
          function _() {
            (L.point = x), M && M.push((k = [])), (P = !0), (C = !1), (T = E = NaN);
          }
          function m() {
            w && (x(N, A), S && C && q.rejoin(), w.push(q.result())), (L.point = p), C && R.lineEnd();
          }
          function x(i, u) {
            var o = h(i, u);
            if ((M && k.push([i, u]), P)) (N = i), (A = u), (S = o), (P = !1), o && (R.lineStart(), R.point(i, u));
            else if (o && C) R.point(i, u);
            else {
              var c = [(T = Math.max(s, Math.min(f, T))), (E = Math.max(s, Math.min(f, E)))],
                d = [(i = Math.max(s, Math.min(f, i))), (u = Math.max(s, Math.min(f, u)))];
              e.i(a.a)(c, d, t, n, r, l)
                ? (C || (R.lineStart(), R.point(c[0], c[1])), R.point(d[0], d[1]), o || R.lineEnd(), (z = !1))
                : o && (R.lineStart(), R.point(i, u), (z = !1));
            }
            (T = i), (E = u), (C = o);
          }
          var w,
            M,
            k,
            N,
            A,
            S,
            T,
            E,
            C,
            P,
            z,
            R = i,
            q = e.i(u.a)(),
            L = { point: p, lineStart: _, lineEnd: m, polygonStart: g, polygonEnd: y };
          return L;
        };
      }
      n.a = r;
      var i = e(0),
        u = e(127),
        a = e(271),
        o = e(130),
        c = e(5),
        f = 1e9,
        s = -f;
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        return [t > f.a ? t - f.b : t < -f.a ? t + f.b : t, n];
      }
      function i(t, n, i) {
        return (t %= f.b) ? (n || i ? e.i(c.a)(a(t), o(n, i)) : a(t)) : n || i ? o(n, i) : r;
      }
      function u(t) {
        return function (n, e) {
          return (n += t), [n > f.a ? n - f.b : n < -f.a ? n + f.b : n, e];
        };
      }
      function a(t) {
        var n = u(t);
        return (n.invert = u(-t)), n;
      }
      function o(t, n) {
        function r(t, n) {
          var r = e.i(f.c)(n),
            c = e.i(f.c)(t) * r,
            s = e.i(f.d)(t) * r,
            l = e.i(f.d)(n),
            h = l * i + c * u;
          return [e.i(f.e)(s * a - h * o, c * i - l * u), e.i(f.f)(h * a + s * o)];
        }
        var i = e.i(f.c)(t),
          u = e.i(f.d)(t),
          a = e.i(f.c)(n),
          o = e.i(f.d)(n);
        return (
          (r.invert = function (t, n) {
            var r = e.i(f.c)(n),
              c = e.i(f.c)(t) * r,
              s = e.i(f.d)(t) * r,
              l = e.i(f.d)(n),
              h = l * a - s * o;
            return [e.i(f.e)(s * a + l * o, c * i + h * u), e.i(f.f)(h * i - c * u)];
          }),
          r
        );
      }
      n.b = i;
      var c = e(131),
        f = e(0);
      (r.invert = r),
        (n.a = function (t) {
          function n(n) {
            return (n = t(n[0] * f.g, n[1] * f.g)), (n[0] *= f.h), (n[1] *= f.h), n;
          }
          return (
            (t = i(t[0] * f.g, t[1] * f.g, t.length > 2 ? t[2] * f.g : 0)),
            (n.invert = function (n) {
              return (n = t.invert(n[0] * f.g, n[1] * f.g)), (n[0] *= f.h), (n[1] *= f.h), n;
            }),
            n
          );
        });
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return function (n) {
          var e = new i();
          for (var r in t) e[r] = t[r];
          return (e.stream = n), e;
        };
      }
      function i() {}
      (n.b = r),
        (n.a = function (t) {
          return { stream: r(t) };
        }),
        (i.prototype = {
          constructor: i,
          point: function (t, n) {
            this.stream.point(t, n);
          },
          sphere: function () {
            this.stream.sphere();
          },
          lineStart: function () {
            this.stream.lineStart();
          },
          lineEnd: function () {
            this.stream.lineEnd();
          },
          polygonStart: function () {
            this.stream.polygonStart();
          },
          polygonEnd: function () {
            this.stream.polygonEnd();
          },
        });
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t, n, e, r, i) {
        for (var u, a = t.children, o = -1, c = a.length, f = t.value && (i - e) / t.value; ++o < c; )
          (u = a[o]), (u.x0 = n), (u.x1 = r), (u.y0 = e), (u.y1 = e += u.value * f);
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t, n) {
        return (
          (t = +t),
          (n -= t),
          function (e) {
            return t + n * e;
          }
        );
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(78);
      n.a = function (t, n) {
        return function (i, u) {
          var a = e.i(r.a)(i).mimeType(t).response(n);
          if (null != u) {
            if ("function" != typeof u) throw new Error("invalid callback: " + u);
            return a.get(u);
          }
          return a;
        };
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t, n) {
        return (
          (t = +t),
          (n -= t),
          function (e) {
            return t + n * e;
          }
        );
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        return (n -= t = +t)
          ? function (e) {
              return (e - t) / n;
            }
          : e.i(d.a)(n);
      }
      function i(t) {
        return function (n, e) {
          var r = t((n = +n), (e = +e));
          return function (t) {
            return t <= n ? 0 : t >= e ? 1 : r(t);
          };
        };
      }
      function u(t) {
        return function (n, e) {
          var r = t((n = +n), (e = +e));
          return function (t) {
            return t <= 0 ? n : t >= 1 ? e : r(t);
          };
        };
      }
      function a(t, n, e, r) {
        var i = t[0],
          u = t[1],
          a = n[0],
          o = n[1];
        return (
          u < i ? ((i = e(u, i)), (a = r(o, a))) : ((i = e(i, u)), (a = r(a, o))),
          function (t) {
            return a(i(t));
          }
        );
      }
      function o(t, n, r, i) {
        var u = Math.min(t.length, n.length) - 1,
          a = new Array(u),
          o = new Array(u),
          c = -1;
        for (t[u] < t[0] && ((t = t.slice().reverse()), (n = n.slice().reverse())); ++c < u; )
          (a[c] = r(t[c], t[c + 1])), (o[c] = i(n[c], n[c + 1]));
        return function (n) {
          var r = e.i(s.a)(t, n, 1, u) - 1;
          return o[r](a[r](n));
        };
      }
      function c(t, n) {
        return n.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp());
      }
      function f(t, n) {
        function e() {
          return (f = Math.min(b.length, g.length) > 2 ? o : a), (s = d = null), c;
        }
        function c(n) {
          return (s || (s = f(b, g, _ ? i(t) : t, y)))(+n);
        }
        var f,
          s,
          d,
          b = v,
          g = v,
          y = l.a,
          _ = !1;
        return (
          (c.invert = function (t) {
            return (d || (d = f(g, b, r, _ ? u(n) : n)))(+t);
          }),
          (c.domain = function (t) {
            return arguments.length ? ((b = h.a.call(t, p.a)), e()) : b.slice();
          }),
          (c.range = function (t) {
            return arguments.length ? ((g = h.b.call(t)), e()) : g.slice();
          }),
          (c.rangeRound = function (t) {
            return (g = h.b.call(t)), (y = l.h), e();
          }),
          (c.clamp = function (t) {
            return arguments.length ? ((_ = !!t), e()) : _;
          }),
          (c.interpolate = function (t) {
            return arguments.length ? ((y = t), e()) : y;
          }),
          e()
        );
      }
      (n.b = r), (n.c = c), (n.a = f);
      var s = e(5),
        l = e(6),
        h = e(17),
        d = e(83),
        p = e(162),
        v = [0, 1];
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return function () {
          var n = this.ownerDocument,
            e = this.namespaceURI;
          return e === a.b && n.documentElement.namespaceURI === a.b ? n.createElement(t) : n.createElementNS(e, t);
        };
      }
      function i(t) {
        return function () {
          return this.ownerDocument.createElementNS(t.space, t.local);
        };
      }
      var u = e(84),
        a = e(85);
      n.a = function (t) {
        var n = e.i(u.a)(t);
        return (n.local ? i : r)(n);
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t, n) {
        var e = t.ownerSVGElement || t;
        if (e.createSVGPoint) {
          var r = e.createSVGPoint();
          return (r.x = n.clientX), (r.y = n.clientY), (r = r.matrixTransform(t.getScreenCTM().inverse())), [r.x, r.y];
        }
        var i = t.getBoundingClientRect();
        return [n.clientX - i.left - t.clientLeft, n.clientY - i.top - t.clientTop];
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t, n, e) {
        t._context.bezierCurveTo(
          (2 * t._x0 + t._x1) / 3,
          (2 * t._y0 + t._y1) / 3,
          (t._x0 + 2 * t._x1) / 3,
          (t._y0 + 2 * t._y1) / 3,
          (t._x0 + 4 * t._x1 + n) / 6,
          (t._y0 + 4 * t._y1 + e) / 6
        );
      }
      function i(t) {
        this._context = t;
      }
      (n.c = r),
        (n.b = i),
        (i.prototype = {
          areaStart: function () {
            this._line = 0;
          },
          areaEnd: function () {
            this._line = NaN;
          },
          lineStart: function () {
            (this._x0 = this._x1 = this._y0 = this._y1 = NaN), (this._point = 0);
          },
          lineEnd: function () {
            switch (this._point) {
              case 3:
                r(this, this._x1, this._y1);
              case 2:
                this._context.lineTo(this._x1, this._y1);
            }
            (this._line || (0 !== this._line && 1 === this._point)) && this._context.closePath(),
              (this._line = 1 - this._line);
          },
          point: function (t, n) {
            switch (((t = +t), (n = +n), this._point)) {
              case 0:
                (this._point = 1), this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
                break;
              case 1:
                this._point = 2;
                break;
              case 2:
                (this._point = 3), this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
              default:
                r(this, t, n);
            }
            (this._x0 = this._x1), (this._x1 = t), (this._y0 = this._y1), (this._y1 = n);
          },
        }),
        (n.a = function (t) {
          return new i(t);
        });
    },
    function (t, n, e) {
      "use strict";
      function r(t, n, e) {
        t._context.bezierCurveTo(
          t._x1 + t._k * (t._x2 - t._x0),
          t._y1 + t._k * (t._y2 - t._y0),
          t._x2 + t._k * (t._x1 - n),
          t._y2 + t._k * (t._y1 - e),
          t._x2,
          t._y2
        );
      }
      function i(t, n) {
        (this._context = t), (this._k = (1 - n) / 6);
      }
      (n.c = r),
        (n.b = i),
        (i.prototype = {
          areaStart: function () {
            this._line = 0;
          },
          areaEnd: function () {
            this._line = NaN;
          },
          lineStart: function () {
            (this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN), (this._point = 0);
          },
          lineEnd: function () {
            switch (this._point) {
              case 2:
                this._context.lineTo(this._x2, this._y2);
                break;
              case 3:
                r(this, this._x1, this._y1);
            }
            (this._line || (0 !== this._line && 1 === this._point)) && this._context.closePath(),
              (this._line = 1 - this._line);
          },
          point: function (t, n) {
            switch (((t = +t), (n = +n), this._point)) {
              case 0:
                (this._point = 1), this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
                break;
              case 1:
                (this._point = 2), (this._x1 = t), (this._y1 = n);
                break;
              case 2:
                this._point = 3;
              default:
                r(this, t, n);
            }
            (this._x0 = this._x1),
              (this._x1 = this._x2),
              (this._x2 = t),
              (this._y0 = this._y1),
              (this._y1 = this._y2),
              (this._y2 = n);
          },
        }),
        (n.a = (function t(n) {
          function e(t) {
            return new i(t, n);
          }
          return (
            (e.tension = function (n) {
              return t(+n);
            }),
            e
          );
        })(0));
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        this._context = t;
      }
      (r.prototype = {
        areaStart: function () {
          this._line = 0;
        },
        areaEnd: function () {
          this._line = NaN;
        },
        lineStart: function () {
          this._point = 0;
        },
        lineEnd: function () {
          (this._line || (0 !== this._line && 1 === this._point)) && this._context.closePath(),
            (this._line = 1 - this._line);
        },
        point: function (t, n) {
          switch (((t = +t), (n = +n), this._point)) {
            case 0:
              (this._point = 1), this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
              break;
            case 1:
              this._point = 2;
            default:
              this._context.lineTo(t, n);
          }
        },
      }),
        (n.a = function (t) {
          return new r(t);
        });
    },
    function (t, n, e) {
      "use strict";
      n.a = function () {};
    },
    function (t, n, e) {
      "use strict";
      var r = e(4);
      e.d(n, "a", function () {
        return r.a;
      });
      var i = e(492);
      e.d(n, "b", function () {
        return i.a;
      }),
        e.d(n, "c", function () {
          return i.b;
        }),
        e.d(n, "d", function () {
          return i.a;
        }),
        e.d(n, "e", function () {
          return i.b;
        });
      var u = e(495);
      e.d(n, "f", function () {
        return u.a;
      }),
        e.d(n, "g", function () {
          return u.b;
        }),
        e.d(n, "h", function () {
          return u.a;
        }),
        e.d(n, "i", function () {
          return u.b;
        });
      var a = e(493);
      e.d(n, "j", function () {
        return a.a;
      }),
        e.d(n, "k", function () {
          return a.b;
        });
      var o = e(491);
      e.d(n, "l", function () {
        return o.a;
      }),
        e.d(n, "m", function () {
          return o.b;
        });
      var c = e(490);
      e.d(n, "n", function () {
        return c.a;
      }),
        e.d(n, "o", function () {
          return c.b;
        });
      var f = e(502);
      e.d(n, "p", function () {
        return f.a;
      }),
        e.d(n, "q", function () {
          return f.b;
        }),
        e.d(n, "r", function () {
          return f.a;
        }),
        e.d(n, "s", function () {
          return f.b;
        }),
        e.d(n, "t", function () {
          return f.c;
        }),
        e.d(n, "u", function () {
          return f.d;
        }),
        e.d(n, "v", function () {
          return f.e;
        }),
        e.d(n, "w", function () {
          return f.f;
        }),
        e.d(n, "x", function () {
          return f.g;
        }),
        e.d(n, "y", function () {
          return f.h;
        }),
        e.d(n, "z", function () {
          return f.i;
        }),
        e.d(n, "A", function () {
          return f.j;
        }),
        e.d(n, "B", function () {
          return f.k;
        }),
        e.d(n, "C", function () {
          return f.l;
        }),
        e.d(n, "D", function () {
          return f.m;
        }),
        e.d(n, "E", function () {
          return f.n;
        });
      var s = e(494);
      e.d(n, "F", function () {
        return s.a;
      }),
        e.d(n, "G", function () {
          return s.b;
        });
      var l = e(503);
      e.d(n, "H", function () {
        return l.a;
      }),
        e.d(n, "I", function () {
          return l.b;
        });
      var h = e(498);
      e.d(n, "J", function () {
        return h.a;
      }),
        e.d(n, "K", function () {
          return h.b;
        });
      var d = e(497);
      e.d(n, "L", function () {
        return d.a;
      }),
        e.d(n, "M", function () {
          return d.b;
        });
      var p = e(496);
      e.d(n, "N", function () {
        return p.a;
      }),
        e.d(n, "O", function () {
          return p.b;
        });
      var v = e(500);
      e.d(n, "P", function () {
        return v.a;
      }),
        e.d(n, "Q", function () {
          return v.b;
        }),
        e.d(n, "R", function () {
          return v.a;
        }),
        e.d(n, "S", function () {
          return v.b;
        }),
        e.d(n, "T", function () {
          return v.c;
        }),
        e.d(n, "U", function () {
          return v.d;
        }),
        e.d(n, "V", function () {
          return v.e;
        }),
        e.d(n, "W", function () {
          return v.f;
        }),
        e.d(n, "X", function () {
          return v.g;
        }),
        e.d(n, "Y", function () {
          return v.h;
        }),
        e.d(n, "Z", function () {
          return v.i;
        }),
        e.d(n, "_0", function () {
          return v.j;
        }),
        e.d(n, "_1", function () {
          return v.k;
        }),
        e.d(n, "_2", function () {
          return v.l;
        }),
        e.d(n, "_3", function () {
          return v.m;
        }),
        e.d(n, "_4", function () {
          return v.n;
        });
      var b = e(499);
      e.d(n, "_5", function () {
        return b.a;
      }),
        e.d(n, "_6", function () {
          return b.b;
        });
      var g = e(501);
      e.d(n, "_7", function () {
        return g.a;
      }),
        e.d(n, "_8", function () {
          return g.b;
        });
    },
    function (t, n, e) {
      "use strict";
      var r = e(96);
      e.d(n, "a", function () {
        return r.a;
      }),
        e.d(n, "b", function () {
          return r.b;
        }),
        e.d(n, "c", function () {
          return r.c;
        });
      var i = e(505);
      e.d(n, "d", function () {
        return i.a;
      });
      var u = e(504);
      e.d(n, "e", function () {
        return u.a;
      });
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        var r, i;
        return function () {
          var u = e.i(a.e)(this, t),
            o = u.tween;
          if (o !== r) {
            i = r = o;
            for (var c = 0, f = i.length; c < f; ++c)
              if (i[c].name === n) {
                (i = i.slice()), i.splice(c, 1);
                break;
              }
          }
          u.tween = i;
        };
      }
      function i(t, n, r) {
        var i, u;
        if ("function" != typeof r) throw new Error();
        return function () {
          var o = e.i(a.e)(this, t),
            c = o.tween;
          if (c !== i) {
            u = (i = c).slice();
            for (var f = { name: n, value: r }, s = 0, l = u.length; s < l; ++s)
              if (u[s].name === n) {
                u[s] = f;
                break;
              }
            s === l && u.push(f);
          }
          o.tween = u;
        };
      }
      function u(t, n, r) {
        var i = t._id;
        return (
          t.each(function () {
            var t = e.i(a.e)(this, i);
            (t.value || (t.value = {}))[n] = r.apply(this, arguments);
          }),
          function (t) {
            return e.i(a.f)(t, i).value[n];
          }
        );
      }
      n.b = u;
      var a = e(8);
      n.a = function (t, n) {
        var u = this._id;
        if (((t += ""), arguments.length < 2)) {
          for (var o, c = e.i(a.f)(this.node(), u).tween, f = 0, s = c.length; f < s; ++f)
            if ((o = c[f]).name === t) return o.value;
          return null;
        }
        return this.each((null == n ? r : i)(u, t, n));
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        if (t.length > n.length - 1)
          for (var e = t.length - n.length + 1, r = 0; r < e; r++) n.push(h.schemePaired[r % h.schemePaired.length]);
        else t.length < n.length - 1 && (n = n.slice(0, t.length + 1));
        return n;
      }
      function i(t) {
        return t < 0 ? 0 : t > 100 ? 100 : t;
      }
      function u(t) {
        return (t / 100 - 0.5) * Math.PI;
      }
      function a(t, n, e, r, i, a, o, c, f, s, h, d) {
        r.forEach(function (r, c) {
          var f = u(c ? a[c - 1] : 0),
            s = u(a[c] || 100),
            h = l.arc().innerRadius(n).outerRadius(i).startAngle(f).endAngle(s),
            d = t
              .append("path")
              .attr("d", h)
              .attr("fill", r)
              .attr("transform", "translate(" + (n + 2 * e) + ", " + (n + e) + ")");
          if (o) {
            h = l
              .arc()
              .innerRadius(n)
              .outerRadius(n + 0.1 * n)
              .startAngle(f)
              .endAngle(s);
            var p = t
              .append("path")
              .attr("d", h)
              .attr("fill", "transparent")
              .attr("opacity", "0.2")
              .attr("transform", "translate(" + (n + 2 * e) + ", " + (n + e) + ")");
            d.on("mouseover", function () {
              d.style("opacity", 0.8), p.transition().duration(50).ease(l.easeLinear).attr("fill", r);
            }).on("mouseout", function () {
              d.style("opacity", 1), p.transition().duration(300).ease(l.easeLinear).attr("fill", "transparent");
            });
          }
        }),
          r.forEach(function (r, i) {
            if (a[i]) {
              var o = u(a[i]);
              if (c && f) {
                var l = n + 2 * e,
                  p = e - n * (1.1 - 1);
                t.append("rect")
                  .attr("x", 0)
                  .attr("y", 0)
                  .attr("fill", f)
                  .attr("width", c)
                  .attr("height", 1.1 * n)
                  .attr(
                    "transform",
                    "translate(" + l + "," + p + ") rotate(" + (180 * o) / Math.PI + ", 0," + 1.1 * n + ")"
                  );
              }
              if (s[i]) {
                var v = n + 2 * e + Math.cos(o - Math.PI / 2) * (1.07 * n),
                  b = n + e + Math.sin(o - Math.PI / 2) * (1.07 * n);
                h = h || Math.round(0.09 * n);
                var g = document.createElement("canvas"),
                  y = g.getContext("2d");
                y.font = h + "px";
                var _ = y.measureText(s[i]),
                  m = ((o - Math.PI / 2) / Math.PI) * (_.width + 4);
                t.append("text")
                  .attr("x", v + m)
                  .attr("y", b)
                  .text(s[i])
                  .attr("align", "center")
                  .attr("font-size", h + "px")
                  .attr("font-family", d);
              }
            }
          });
      }
      function o(t, n, e, r, i, a) {
        var o = i || a ? 0.5 * n : 0.1 * n,
          c = l.arc().innerRadius(o).outerRadius(0).startAngle(u(0)).endAngle(u(200));
        t.append("path")
          .attr("d", c)
          .attr("fill", i || a ? "transparent" : r)
          .attr("transform", "translate(" + (n + 2 * e) + ", " + (n + e) + ")")
          .attr("class", "bar");
      }
      function c(t, n, e, r, i, u, a, o) {
        var c = o,
          f = new p.Needle(t, c, u, n, i, e, r, a);
        return f.setValue(c), f.getSelection(), f;
      }
      function f(t, n, e, r, i, u, a, o, c) {
        var f = e - i;
        o = o || Math.round(0.18 * e);
        var s = 0.6 * o,
          l = 1.5 * o,
          h = 0.56 * l,
          d = u[0] ? n / 2 - i - f / 2 - (s * u[0].length) / 2 : 0,
          p = u[1] ? n / 2 + i + f / 2 - (s * u[1].length) / 2 : 0,
          v = r + e + 2 * s,
          b = n / 2 - (h * a.length) / 2,
          g = r + e;
        t
          .append("text")
          .attr("x", d)
          .attr("y", v)
          .text(u ? u[0] : "")
          .attr("font-size", o + "px")
          .attr("font-family", c),
          t
            .append("text")
            .attr("x", p)
            .attr("y", v)
            .text(u ? u[1] : "")
            .attr("font-size", o + "px")
            .attr("font-family", c),
          t
            .append("text")
            .attr("x", b)
            .attr("y", g)
            .text(a)
            .attr("font-size", l + "px")
            .attr("font-family", c);
      }
      function s(t, n, e) {
        var i = {
            hasNeedle: !1,
            outerNeedle: !1,
            needleColor: "gray",
            needleStartValue: 0,
            needleUpdateSpeed: 1e3,
            arcColors: [],
            arcDelimiters: [],
            arcOverEffect: !0,
            arcPadding: 0,
            arcPaddingColor: void 0,
            arcLabels: [],
            arcLabelFontSize: void 0,
            rangeLabel: [],
            centralLabel: "",
            rangeLabelFontSize: void 0,
            labelsFont: "Roboto,Helvetica Neue,sans-serif",
          },
          u = Object.assign(i, e),
          s = u.hasNeedle,
          h = u.needleColor,
          p = u.needleUpdateSpeed,
          b = u.arcColors,
          g = u.arcDelimiters,
          y = u.arcOverEffect,
          _ = u.arcPadding,
          m = u.arcPaddingColor,
          x = u.arcLabels,
          w = u.arcLabelFontSize,
          M = u.rangeLabel,
          k = u.centralLabel,
          N = u.rangeLabelFontSize,
          A = u.labelsFont,
          S = u.outerNeedle,
          T = u.needleStartValue;
        if (v.paramChecker(g, b, M)) {
          b = r(g, b);
          var E = 0.075 * n,
            C = 0.5 * n - 2 * E,
            P = n - 2 * E,
            z = 0.75 * C,
            R = l
              .select(t)
              .append("svg")
              .attr("width", P + 2 * E)
              .attr("height", C + 4 * E);
          a(R, C, E, b, z, g, y, _, m, x, w, A);
          var q = null;
          return (
            s && ((q = c(R, C, E, h, z, k, S, T)), o(R, C, E, h, k, S)),
            f(R, n, C, E, z, M, k, N, A),
            new d.Gauge(R, p, q)
          );
        }
      }
      Object.defineProperty(n, "__esModule", { value: !0 });
      var l = e(100),
        h = e(363);
      e(537);
      var d = e(193),
        p = e(194),
        v = e(195);
      (n.arcColorsModifier = r),
        (n.needleValueModifier = i),
        (n.perc2RadWithShift = u),
        (n.arcOutline = a),
        (n.needleBaseOutline = o),
        (n.needleOutline = c),
        (n.labelOutline = f),
        (n.gaugeChart = s);
    },
    function (t, n, e) {
      "use strict";
      var r = e(24);
      n.a = function (t, n, e) {
        if ((null == e && (e = r.a), (i = t.length))) {
          if ((n = +n) <= 0 || i < 2) return +e(t[0], 0, t);
          if (n >= 1) return +e(t[i - 1], i - 1, t);
          var i,
            u = (i - 1) * n,
            a = Math.floor(u),
            o = +e(t[a], a, t);
          return o + (+e(t[a + 1], a + 1, t) - o) * (u - a);
        }
      };
    },
    function (t, n, e) {
      "use strict";
      function r() {}
      function i(t, n) {
        var e = new r();
        if (t instanceof r)
          t.each(function (t, n) {
            e.set(n, t);
          });
        else if (Array.isArray(t)) {
          var i,
            u = -1,
            a = t.length;
          if (null == n) for (; ++u < a; ) e.set(u, t[u]);
          else for (; ++u < a; ) e.set(n((i = t[u]), u, t), i);
        } else if (t) for (var o in t) e.set(o, t[o]);
        return e;
      }
      e.d(n, "b", function () {
        return u;
      });
      var u = "$";
      (r.prototype = i.prototype =
        {
          constructor: r,
          has: function (t) {
            return u + t in this;
          },
          get: function (t) {
            return this[u + t];
          },
          set: function (t, n) {
            return (this[u + t] = n), this;
          },
          remove: function (t) {
            var n = u + t;
            return n in this && delete this[n];
          },
          clear: function () {
            for (var t in this) t[0] === u && delete this[t];
          },
          keys: function () {
            var t = [];
            for (var n in this) n[0] === u && t.push(n.slice(1));
            return t;
          },
          values: function () {
            var t = [];
            for (var n in this) n[0] === u && t.push(this[n]);
            return t;
          },
          entries: function () {
            var t = [];
            for (var n in this) n[0] === u && t.push({ key: n.slice(1), value: this[n] });
            return t;
          },
          size: function () {
            var t = 0;
            for (var n in this) n[0] === u && ++t;
            return t;
          },
          empty: function () {
            for (var t in this) if (t[0] === u) return !1;
            return !0;
          },
          each: function (t) {
            for (var n in this) n[0] === u && t(this[n], n.slice(1), this);
          },
        }),
        (n.a = i);
    },
    function (t, n, e) {
      "use strict";
      function r() {}
      function i(t) {
        var n;
        return (
          (t = (t + "").trim().toLowerCase()),
          (n = x.exec(t))
            ? ((n = parseInt(n[1], 16)),
              new f(((n >> 8) & 15) | ((n >> 4) & 240), ((n >> 4) & 15) | (240 & n), ((15 & n) << 4) | (15 & n), 1))
            : (n = w.exec(t))
            ? u(parseInt(n[1], 16))
            : (n = M.exec(t))
            ? new f(n[1], n[2], n[3], 1)
            : (n = k.exec(t))
            ? new f((255 * n[1]) / 100, (255 * n[2]) / 100, (255 * n[3]) / 100, 1)
            : (n = N.exec(t))
            ? a(n[1], n[2], n[3], n[4])
            : (n = A.exec(t))
            ? a((255 * n[1]) / 100, (255 * n[2]) / 100, (255 * n[3]) / 100, n[4])
            : (n = S.exec(t))
            ? s(n[1], n[2] / 100, n[3] / 100, 1)
            : (n = T.exec(t))
            ? s(n[1], n[2] / 100, n[3] / 100, n[4])
            : E.hasOwnProperty(t)
            ? u(E[t])
            : "transparent" === t
            ? new f(NaN, NaN, NaN, 0)
            : null
        );
      }
      function u(t) {
        return new f((t >> 16) & 255, (t >> 8) & 255, 255 & t, 1);
      }
      function a(t, n, e, r) {
        return r <= 0 && (t = n = e = NaN), new f(t, n, e, r);
      }
      function o(t) {
        return t instanceof r || (t = i(t)), t ? ((t = t.rgb()), new f(t.r, t.g, t.b, t.opacity)) : new f();
      }
      function c(t, n, e, r) {
        return 1 === arguments.length ? o(t) : new f(t, n, e, null == r ? 1 : r);
      }
      function f(t, n, e, r) {
        (this.r = +t), (this.g = +n), (this.b = +e), (this.opacity = +r);
      }
      function s(t, n, e, r) {
        return r <= 0 ? (t = n = e = NaN) : e <= 0 || e >= 1 ? (t = n = NaN) : n <= 0 && (t = NaN), new d(t, n, e, r);
      }
      function l(t) {
        if (t instanceof d) return new d(t.h, t.s, t.l, t.opacity);
        if ((t instanceof r || (t = i(t)), !t)) return new d();
        if (t instanceof d) return t;
        t = t.rgb();
        var n = t.r / 255,
          e = t.g / 255,
          u = t.b / 255,
          a = Math.min(n, e, u),
          o = Math.max(n, e, u),
          c = NaN,
          f = o - a,
          s = (o + a) / 2;
        return (
          f
            ? ((c = n === o ? (e - u) / f + 6 * (e < u) : e === o ? (u - n) / f + 2 : (n - e) / f + 4),
              (f /= s < 0.5 ? o + a : 2 - o - a),
              (c *= 60))
            : (f = s > 0 && s < 1 ? 0 : c),
          new d(c, f, s, t.opacity)
        );
      }
      function h(t, n, e, r) {
        return 1 === arguments.length ? l(t) : new d(t, n, e, null == r ? 1 : r);
      }
      function d(t, n, e, r) {
        (this.h = +t), (this.s = +n), (this.l = +e), (this.opacity = +r);
      }
      function p(t, n, e) {
        return 255 * (t < 60 ? n + ((e - n) * t) / 60 : t < 180 ? e : t < 240 ? n + ((e - n) * (240 - t)) / 60 : n);
      }
      (n.f = r),
        e.d(n, "h", function () {
          return b;
        }),
        e.d(n, "g", function () {
          return g;
        }),
        (n.a = i),
        (n.e = o),
        (n.b = c),
        (n.d = f),
        (n.c = h);
      var v = e(59),
        b = 0.7,
        g = 1 / b,
        y = "\\s*([+-]?\\d+)\\s*",
        _ = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
        m = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
        x = /^#([0-9a-f]{3})$/,
        w = /^#([0-9a-f]{6})$/,
        M = new RegExp("^rgb\\(" + [y, y, y] + "\\)$"),
        k = new RegExp("^rgb\\(" + [m, m, m] + "\\)$"),
        N = new RegExp("^rgba\\(" + [y, y, y, _] + "\\)$"),
        A = new RegExp("^rgba\\(" + [m, m, m, _] + "\\)$"),
        S = new RegExp("^hsl\\(" + [_, m, m] + "\\)$"),
        T = new RegExp("^hsla\\(" + [_, m, m, _] + "\\)$"),
        E = {
          aliceblue: 15792383,
          antiquewhite: 16444375,
          aqua: 65535,
          aquamarine: 8388564,
          azure: 15794175,
          beige: 16119260,
          bisque: 16770244,
          black: 0,
          blanchedalmond: 16772045,
          blue: 255,
          blueviolet: 9055202,
          brown: 10824234,
          burlywood: 14596231,
          cadetblue: 6266528,
          chartreuse: 8388352,
          chocolate: 13789470,
          coral: 16744272,
          cornflowerblue: 6591981,
          cornsilk: 16775388,
          crimson: 14423100,
          cyan: 65535,
          darkblue: 139,
          darkcyan: 35723,
          darkgoldenrod: 12092939,
          darkgray: 11119017,
          darkgreen: 25600,
          darkgrey: 11119017,
          darkkhaki: 12433259,
          darkmagenta: 9109643,
          darkolivegreen: 5597999,
          darkorange: 16747520,
          darkorchid: 10040012,
          darkred: 9109504,
          darksalmon: 15308410,
          darkseagreen: 9419919,
          darkslateblue: 4734347,
          darkslategray: 3100495,
          darkslategrey: 3100495,
          darkturquoise: 52945,
          darkviolet: 9699539,
          deeppink: 16716947,
          deepskyblue: 49151,
          dimgray: 6908265,
          dimgrey: 6908265,
          dodgerblue: 2003199,
          firebrick: 11674146,
          floralwhite: 16775920,
          forestgreen: 2263842,
          fuchsia: 16711935,
          gainsboro: 14474460,
          ghostwhite: 16316671,
          gold: 16766720,
          goldenrod: 14329120,
          gray: 8421504,
          green: 32768,
          greenyellow: 11403055,
          grey: 8421504,
          honeydew: 15794160,
          hotpink: 16738740,
          indianred: 13458524,
          indigo: 4915330,
          ivory: 16777200,
          khaki: 15787660,
          lavender: 15132410,
          lavenderblush: 16773365,
          lawngreen: 8190976,
          lemonchiffon: 16775885,
          lightblue: 11393254,
          lightcoral: 15761536,
          lightcyan: 14745599,
          lightgoldenrodyellow: 16448210,
          lightgray: 13882323,
          lightgreen: 9498256,
          lightgrey: 13882323,
          lightpink: 16758465,
          lightsalmon: 16752762,
          lightseagreen: 2142890,
          lightskyblue: 8900346,
          lightslategray: 7833753,
          lightslategrey: 7833753,
          lightsteelblue: 11584734,
          lightyellow: 16777184,
          lime: 65280,
          limegreen: 3329330,
          linen: 16445670,
          magenta: 16711935,
          maroon: 8388608,
          mediumaquamarine: 6737322,
          mediumblue: 205,
          mediumorchid: 12211667,
          mediumpurple: 9662683,
          mediumseagreen: 3978097,
          mediumslateblue: 8087790,
          mediumspringgreen: 64154,
          mediumturquoise: 4772300,
          mediumvioletred: 13047173,
          midnightblue: 1644912,
          mintcream: 16121850,
          mistyrose: 16770273,
          moccasin: 16770229,
          navajowhite: 16768685,
          navy: 128,
          oldlace: 16643558,
          olive: 8421376,
          olivedrab: 7048739,
          orange: 16753920,
          orangered: 16729344,
          orchid: 14315734,
          palegoldenrod: 15657130,
          palegreen: 10025880,
          paleturquoise: 11529966,
          palevioletred: 14381203,
          papayawhip: 16773077,
          peachpuff: 16767673,
          peru: 13468991,
          pink: 16761035,
          plum: 14524637,
          powderblue: 11591910,
          purple: 8388736,
          rebeccapurple: 6697881,
          red: 16711680,
          rosybrown: 12357519,
          royalblue: 4286945,
          saddlebrown: 9127187,
          salmon: 16416882,
          sandybrown: 16032864,
          seagreen: 3050327,
          seashell: 16774638,
          sienna: 10506797,
          silver: 12632256,
          skyblue: 8900331,
          slateblue: 6970061,
          slategray: 7372944,
          slategrey: 7372944,
          snow: 16775930,
          springgreen: 65407,
          steelblue: 4620980,
          tan: 13808780,
          teal: 32896,
          thistle: 14204888,
          tomato: 16737095,
          turquoise: 4251856,
          violet: 15631086,
          wheat: 16113331,
          white: 16777215,
          whitesmoke: 16119285,
          yellow: 16776960,
          yellowgreen: 10145074,
        };
      e.i(v.a)(r, i, {
        displayable: function () {
          return this.rgb().displayable();
        },
        toString: function () {
          return this.rgb() + "";
        },
      }),
        e.i(v.a)(
          f,
          c,
          e.i(v.b)(r, {
            brighter: function (t) {
              return (t = null == t ? g : Math.pow(g, t)), new f(this.r * t, this.g * t, this.b * t, this.opacity);
            },
            darker: function (t) {
              return (t = null == t ? b : Math.pow(b, t)), new f(this.r * t, this.g * t, this.b * t, this.opacity);
            },
            rgb: function () {
              return this;
            },
            displayable: function () {
              return (
                0 <= this.r &&
                this.r <= 255 &&
                0 <= this.g &&
                this.g <= 255 &&
                0 <= this.b &&
                this.b <= 255 &&
                0 <= this.opacity &&
                this.opacity <= 1
              );
            },
            toString: function () {
              var t = this.opacity;
              return (
                (t = isNaN(t) ? 1 : Math.max(0, Math.min(1, t))),
                (1 === t ? "rgb(" : "rgba(") +
                  Math.max(0, Math.min(255, Math.round(this.r) || 0)) +
                  ", " +
                  Math.max(0, Math.min(255, Math.round(this.g) || 0)) +
                  ", " +
                  Math.max(0, Math.min(255, Math.round(this.b) || 0)) +
                  (1 === t ? ")" : ", " + t + ")")
              );
            },
          })
        ),
        e.i(v.a)(
          d,
          h,
          e.i(v.b)(r, {
            brighter: function (t) {
              return (t = null == t ? g : Math.pow(g, t)), new d(this.h, this.s, this.l * t, this.opacity);
            },
            darker: function (t) {
              return (t = null == t ? b : Math.pow(b, t)), new d(this.h, this.s, this.l * t, this.opacity);
            },
            rgb: function () {
              var t = (this.h % 360) + 360 * (this.h < 0),
                n = isNaN(t) || isNaN(this.s) ? 0 : this.s,
                e = this.l,
                r = e + (e < 0.5 ? e : 1 - e) * n,
                i = 2 * e - r;
              return new f(
                p(t >= 240 ? t - 240 : t + 120, i, r),
                p(t, i, r),
                p(t < 120 ? t + 240 : t - 120, i, r),
                this.opacity
              );
            },
            displayable: function () {
              return (
                ((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
                0 <= this.l &&
                this.l <= 1 &&
                0 <= this.opacity &&
                this.opacity <= 1
              );
            },
          })
        );
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        var e = Object.create(t.prototype);
        for (var r in n) e[r] = n[r];
        return e;
      }
      (n.b = r),
        (n.a = function (t, n, e) {
          (t.prototype = n.prototype = e), (e.constructor = t);
        });
    },
    function (t, n, e) {
      "use strict";
      var r = e(236);
      e.d(n, "a", function () {
        return r.a;
      });
      var i = e(116);
      e.d(n, "b", function () {
        return i.a;
      }),
        e.d(n, "c", function () {
          return i.b;
        });
    },
    function (t, n, e) {
      "use strict";
      var r = e(62);
      e.d(n, "a", function () {
        return r.a;
      });
      var i = e(238);
      e.d(n, "b", function () {
        return i.a;
      }),
        e.d(n, "c", function () {
          return i.b;
        }),
        e.d(n, "d", function () {
          return i.c;
        }),
        e.d(n, "e", function () {
          return i.d;
        });
      var u = e(239);
      e.d(n, "f", function () {
        return u.a;
      }),
        e.d(n, "g", function () {
          return u.b;
        }),
        e.d(n, "h", function () {
          return u.c;
        }),
        e.d(n, "i", function () {
          return u.d;
        });
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return new Function(
          "d",
          "return {" +
            t
              .map(function (t, n) {
                return JSON.stringify(t) + ": d[" + n + "]";
              })
              .join(",") +
            "}"
        );
      }
      function i(t, n) {
        var e = r(t);
        return function (r, i) {
          return n(e(r), i, t);
        };
      }
      function u(t) {
        var n = Object.create(null),
          e = [];
        return (
          t.forEach(function (t) {
            for (var r in t) r in n || e.push((n[r] = r));
          }),
          e
        );
      }
      var a = {},
        o = {},
        c = 34,
        f = 10,
        s = 13;
      n.a = function (t) {
        function n(t, n) {
          var u,
            a,
            o = e(t, function (t, e) {
              if (u) return u(t, e - 1);
              (a = t), (u = n ? i(t, n) : r(t));
            });
          return (o.columns = a || []), o;
        }
        function e(t, n) {
          function e() {
            if (d) return o;
            if (p) return (p = !1), a;
            var n,
              e,
              r = l;
            if (t.charCodeAt(r) === c) {
              for (; (l++ < u && t.charCodeAt(l) !== c) || t.charCodeAt(++l) === c; );
              return (
                (n = l) >= u
                  ? (d = !0)
                  : (e = t.charCodeAt(l++)) === f
                  ? (p = !0)
                  : e === s && ((p = !0), t.charCodeAt(l) === f && ++l),
                t.slice(r + 1, n - 1).replace(/""/g, '"')
              );
            }
            for (; l < u; ) {
              if ((e = t.charCodeAt((n = l++))) === f) p = !0;
              else if (e === s) (p = !0), t.charCodeAt(l) === f && ++l;
              else if (e !== b) continue;
              return t.slice(r, n);
            }
            return (d = !0), t.slice(r, u);
          }
          var r,
            i = [],
            u = t.length,
            l = 0,
            h = 0,
            d = u <= 0,
            p = !1;
          for (t.charCodeAt(u - 1) === f && --u, t.charCodeAt(u - 1) === s && --u; (r = e()) !== o; ) {
            for (var v = []; r !== a && r !== o; ) v.push(r), (r = e());
            (n && null == (v = n(v, h++))) || i.push(v);
          }
          return i;
        }
        function l(n, e) {
          return (
            null == e && (e = u(n)),
            [e.map(p).join(t)]
              .concat(
                n.map(function (n) {
                  return e
                    .map(function (t) {
                      return p(n[t]);
                    })
                    .join(t);
                })
              )
              .join("\n")
          );
        }
        function h(t) {
          return t.map(d).join("\n");
        }
        function d(n) {
          return n.map(p).join(t);
        }
        function p(t) {
          return null == t ? "" : v.test((t += "")) ? '"' + t.replace(/"/g, '""') + '"' : t;
        }
        var v = new RegExp('["' + t + "\n\r]"),
          b = t.charCodeAt(0);
        return { parse: n, parseRows: e, format: l, formatRows: h };
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function () {
        return 1e-6 * (Math.random() - 0.5);
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(258);
      e.d(n, "a", function () {
        return r.a;
      }),
        e.d(n, "b", function () {
          return r.b;
        }),
        e.d(n, "c", function () {
          return r.c;
        });
      var i = e(123);
      e.d(n, "d", function () {
        return i.a;
      });
      var u = e(121);
      e.d(n, "e", function () {
        return u.a;
      });
      var a = e(264);
      e.d(n, "f", function () {
        return a.a;
      });
      var o = e(265);
      e.d(n, "g", function () {
        return o.a;
      });
      var c = e(266);
      e.d(n, "h", function () {
        return c.a;
      });
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t, n) {
        if ((e = (t = n ? t.toExponential(n - 1) : t.toExponential()).indexOf("e")) < 0) return null;
        var e,
          r = t.slice(0, e);
        return [r.length > 1 ? r[0] + r.slice(2) : r, +t.slice(e + 1)];
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t) {
        return t;
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        var n = 0,
          r = i.a / 3,
          a = e.i(u.b)(t),
          o = a(n, r);
        return (
          (o.parallels = function (t) {
            return arguments.length ? a((n = t[0] * i.g), (r = t[1] * i.g)) : [n * i.h, r * i.h];
          }),
          o
        );
      }
      n.a = r;
      var i = e(0),
        u = e(10);
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        function r(t, n) {
          var r = e.i(i.n)(c - 2 * o * e.i(i.d)(n)) / o;
          return [r * e.i(i.d)((t *= o)), f - r * e.i(i.c)(t)];
        }
        var u = e.i(i.d)(t),
          o = (u + e.i(i.d)(n)) / 2;
        if (e.i(i.p)(o) < i.o) return e.i(a.a)(t);
        var c = 1 + u * (2 * o - u),
          f = e.i(i.n)(c) / o;
        return (
          (r.invert = function (t, n) {
            var r = f - n;
            return [(e.i(i.e)(t, e.i(i.p)(r)) / o) * e.i(i.q)(r), e.i(i.f)((c - (t * t + r * r) * o * o) / (2 * o))];
          }),
          r
        );
      }
      n.b = r;
      var i = e(0),
        u = e(67),
        a = e(287);
      n.a = function () {
        return e.i(u.a)(r).scale(155.424).center([0, 33.6442]);
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t, n, r) {
        var i = t.clipExtent && t.clipExtent();
        return (
          t.scale(150).translate([0, 0]),
          null != i && t.clipExtent(null),
          e.i(c.a)(r, t.stream(f.a)),
          n(f.a.result()),
          null != i && t.clipExtent(i),
          t
        );
      }
      function i(t, n, e) {
        return r(
          t,
          function (e) {
            var r = n[1][0] - n[0][0],
              i = n[1][1] - n[0][1],
              u = Math.min(r / (e[1][0] - e[0][0]), i / (e[1][1] - e[0][1])),
              a = +n[0][0] + (r - u * (e[1][0] + e[0][0])) / 2,
              o = +n[0][1] + (i - u * (e[1][1] + e[0][1])) / 2;
            t.scale(150 * u).translate([a, o]);
          },
          e
        );
      }
      function u(t, n, e) {
        return i(t, [[0, 0], n], e);
      }
      function a(t, n, e) {
        return r(
          t,
          function (e) {
            var r = +n,
              i = r / (e[1][0] - e[0][0]),
              u = (r - i * (e[1][0] + e[0][0])) / 2,
              a = -i * e[0][1];
            t.scale(150 * i).translate([u, a]);
          },
          e
        );
      }
      function o(t, n, e) {
        return r(
          t,
          function (e) {
            var r = +n,
              i = r / (e[1][1] - e[0][1]),
              u = -i * e[0][0],
              a = (r - i * (e[1][1] + e[0][1])) / 2;
            t.scale(150 * i).translate([u, a]);
          },
          e
        );
      }
      (n.a = i), (n.b = u), (n.c = a), (n.d = o);
      var c = e(15),
        f = e(134);
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        return [t, e.i(u.i)(e.i(u.j)((u.k + n) / 2))];
      }
      function i(t) {
        function n() {
          var n = u.a * h(),
            o = s(e.i(a.a)(s.rotate()).invert([0, 0]));
          return p(
            null == v
              ? [
                  [o[0] - n, o[1] - n],
                  [o[0] + n, o[1] + n],
                ]
              : t === r
              ? [
                  [Math.max(o[0] - n, v), i],
                  [Math.min(o[0] + n, c), f],
                ]
              : [
                  [v, Math.max(o[1] - n, i)],
                  [c, Math.min(o[1] + n, f)],
                ]
          );
        }
        var i,
          c,
          f,
          s = e.i(o.a)(t),
          l = s.center,
          h = s.scale,
          d = s.translate,
          p = s.clipExtent,
          v = null;
        return (
          (s.scale = function (t) {
            return arguments.length ? (h(t), n()) : h();
          }),
          (s.translate = function (t) {
            return arguments.length ? (d(t), n()) : d();
          }),
          (s.center = function (t) {
            return arguments.length ? (l(t), n()) : l();
          }),
          (s.clipExtent = function (t) {
            return arguments.length
              ? (null == t ? (v = i = c = f = null) : ((v = +t[0][0]), (i = +t[0][1]), (c = +t[1][0]), (f = +t[1][1])),
                n())
              : null == v
              ? null
              : [
                  [v, i],
                  [c, f],
                ];
          }),
          n()
        );
      }
      (n.b = r), (n.c = i);
      var u = e(0),
        a = e(39),
        o = e(10);
      (r.invert = function (t, n) {
        return [t, 2 * e.i(u.l)(e.i(u.m)(n)) - u.k];
      }),
        (n.a = function () {
          return i(r).scale(961 / u.b);
        });
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return null == t ? null : i(t);
      }
      function i(t) {
        if ("function" != typeof t) throw new Error();
        return t;
      }
      (n.b = r), (n.a = i);
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        var e,
          r,
          i,
          a,
          f,
          s = new c(t),
          l = +t.value && (s.value = t.value),
          h = [s];
        for (null == n && (n = u); (e = h.pop()); )
          if ((l && (e.value = +e.data.value), (i = n(e.data)) && (f = i.length)))
            for (e.children = new Array(f), a = f - 1; a >= 0; --a)
              h.push((r = e.children[a] = new c(i[a]))), (r.parent = e), (r.depth = e.depth + 1);
        return s.eachBefore(o);
      }
      function i() {
        return r(this).eachBefore(a);
      }
      function u(t) {
        return t.children;
      }
      function a(t) {
        t.data = t.data.data;
      }
      function o(t) {
        var n = 0;
        do {
          t.height = n;
        } while ((t = t.parent) && t.height < ++n);
      }
      function c(t) {
        (this.data = t), (this.depth = this.height = 0), (this.parent = null);
      }
      (n.a = r), (n.c = o), (n.b = c);
      var f = e(299),
        s = e(301),
        l = e(303),
        h = e(302),
        d = e(308),
        p = e(307),
        v = e(306),
        b = e(298),
        g = e(300),
        y = e(304),
        _ = e(305);
      c.prototype = r.prototype = {
        constructor: c,
        count: f.a,
        each: s.a,
        eachAfter: h.a,
        eachBefore: l.a,
        sum: d.a,
        sort: p.a,
        path: v.a,
        ancestors: b.a,
        descendants: g.a,
        leaves: y.a,
        links: _.a,
        copy: i,
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t, n, r, a, o, c) {
        for (
          var f, s, l, h, d, p, v, b, g, y, _, m = [], x = n.children, w = 0, M = 0, k = x.length, N = n.value;
          w < k;

        ) {
          (l = o - r), (h = c - a);
          do {
            d = x[M++].value;
          } while (!d && M < k);
          for (p = v = d, y = Math.max(h / l, l / h) / (N * t), _ = d * d * y, g = Math.max(v / _, _ / p); M < k; ++M) {
            if (
              ((d += s = x[M].value),
              s < p && (p = s),
              s > v && (v = s),
              (_ = d * d * y),
              (b = Math.max(v / _, _ / p)) > g)
            ) {
              d -= s;
              break;
            }
            g = b;
          }
          m.push((f = { value: d, dice: l < h, children: x.slice(w, M) })),
            f.dice
              ? e.i(i.a)(f, r, a, o, N ? (a += (h * d) / N) : c)
              : e.i(u.a)(f, r, a, N ? (r += (l * d) / N) : o, c),
            (N -= d),
            (w = M);
        }
        return m;
      }
      e.d(n, "c", function () {
        return a;
      }),
        (n.b = r);
      var i = e(28),
        u = e(41),
        a = (1 + Math.sqrt(5)) / 2;
      n.a = (function t(n) {
        function e(t, e, i, u, a) {
          r(n, t, e, i, u, a);
        }
        return (
          (e.ratio = function (n) {
            return t((n = +n) > 1 ? n : 1);
          }),
          e
        );
      })(a);
    },
    function (t, n, e) {
      "use strict";
      function r(t, n, e, r, i) {
        var u = t * t,
          a = u * t;
        return ((1 - 3 * t + 3 * u - a) * n + (4 - 6 * u + 3 * a) * e + (1 + 3 * t + 3 * u - 3 * a) * r + a * i) / 6;
      }
      (n.b = r),
        (n.a = function (t) {
          var n = t.length - 1;
          return function (e) {
            var i = e <= 0 ? (e = 0) : e >= 1 ? ((e = 1), n - 1) : Math.floor(e * n),
              u = t[i],
              a = t[i + 1],
              o = i > 0 ? t[i - 1] : 2 * u - a,
              c = i < n - 1 ? t[i + 2] : 2 * a - u;
            return r((e - i / n) * n, o, u, a, c);
          };
        });
    },
    function (t, n, e) {
      "use strict";
      var r = e(9),
        i = e(148),
        u = e(143),
        a = e(146),
        o = e(42),
        c = e(147),
        f = e(149),
        s = e(145);
      n.a = function (t, n) {
        var l,
          h = typeof n;
        return null == n || "boolean" === h
          ? e.i(s.a)(n)
          : ("number" === h
              ? o.a
              : "string" === h
              ? (l = e.i(r.a)(n))
                ? ((n = l), i.a)
                : f.a
              : n instanceof r.a
              ? i.a
              : n instanceof Date
              ? a.a
              : Array.isArray(n)
              ? u.a
              : ("function" != typeof n.valueOf && "function" != typeof n.toString) || isNaN(n)
              ? c.a
              : o.a)(t, n);
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(340);
      e.d(n, "a", function () {
        return r.a;
      });
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t, n, e, r, i) {
        (this.node = t), (this.x0 = n), (this.y0 = e), (this.x1 = r), (this.y1 = i);
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return function (n, e) {
          t(null == n ? e : null);
        };
      }
      function i(t) {
        var n = t.responseType;
        return n && "text" !== n ? t.response : t.responseText;
      }
      var u = e(25),
        a = e(14);
      n.a = function (t, n) {
        function o(t) {
          var n,
            e = p.status;
          if ((!e && i(p)) || (e >= 200 && e < 300) || 304 === e) {
            if (s)
              try {
                n = s.call(c, p);
              } catch (t) {
                return void h.call("error", c, t);
              }
            else n = p;
            h.call("load", c, n);
          } else h.call("error", c, t);
        }
        var c,
          f,
          s,
          l,
          h = e.i(a.a)("beforesend", "progress", "load", "error"),
          d = e.i(u.c)(),
          p = new XMLHttpRequest(),
          v = null,
          b = null,
          g = 0;
        if (
          ("undefined" == typeof XDomainRequest ||
            "withCredentials" in p ||
            !/^(http(s)?:)?\/\//.test(t) ||
            (p = new XDomainRequest()),
          "onload" in p
            ? (p.onload = p.onerror = p.ontimeout = o)
            : (p.onreadystatechange = function (t) {
                p.readyState > 3 && o(t);
              }),
          (p.onprogress = function (t) {
            h.call("progress", c, t);
          }),
          (c = {
            header: function (t, n) {
              return (
                (t = (t + "").toLowerCase()),
                arguments.length < 2 ? d.get(t) : (null == n ? d.remove(t) : d.set(t, n + ""), c)
              );
            },
            mimeType: function (t) {
              return arguments.length ? ((f = null == t ? null : t + ""), c) : f;
            },
            responseType: function (t) {
              return arguments.length ? ((l = t), c) : l;
            },
            timeout: function (t) {
              return arguments.length ? ((g = +t), c) : g;
            },
            user: function (t) {
              return arguments.length < 1 ? v : ((v = null == t ? null : t + ""), c);
            },
            password: function (t) {
              return arguments.length < 1 ? b : ((b = null == t ? null : t + ""), c);
            },
            response: function (t) {
              return (s = t), c;
            },
            get: function (t, n) {
              return c.send("GET", t, n);
            },
            post: function (t, n) {
              return c.send("POST", t, n);
            },
            send: function (n, e, i) {
              return (
                p.open(n, t, !0, v, b),
                null == f || d.has("accept") || d.set("accept", f + ",*/*"),
                p.setRequestHeader &&
                  d.each(function (t, n) {
                    p.setRequestHeader(n, t);
                  }),
                null != f && p.overrideMimeType && p.overrideMimeType(f),
                null != l && (p.responseType = l),
                g > 0 && (p.timeout = g),
                null == i && "function" == typeof e && ((i = e), (e = null)),
                null != i && 1 === i.length && (i = r(i)),
                null != i &&
                  c.on("error", i).on("load", function (t) {
                    i(null, t);
                  }),
                h.call("beforesend", c, p),
                p.send(null == e ? null : e),
                c
              );
            },
            abort: function () {
              return p.abort(), c;
            },
            on: function () {
              var t = h.on.apply(h, arguments);
              return t === h ? c : t;
            },
          }),
          null != n)
        ) {
          if ("function" != typeof n) throw new Error("invalid callback: " + n);
          return c.get(n);
        }
        return c;
      };
    },
    function (t, n, e) {
      "use strict";
      function r() {}
      function i(t) {
        var n;
        return (
          (t = (t + "").trim().toLowerCase()),
          (n = x.exec(t))
            ? ((n = parseInt(n[1], 16)),
              new f(((n >> 8) & 15) | ((n >> 4) & 240), ((n >> 4) & 15) | (240 & n), ((15 & n) << 4) | (15 & n), 1))
            : (n = w.exec(t))
            ? u(parseInt(n[1], 16))
            : (n = M.exec(t))
            ? new f(n[1], n[2], n[3], 1)
            : (n = k.exec(t))
            ? new f((255 * n[1]) / 100, (255 * n[2]) / 100, (255 * n[3]) / 100, 1)
            : (n = N.exec(t))
            ? a(n[1], n[2], n[3], n[4])
            : (n = A.exec(t))
            ? a((255 * n[1]) / 100, (255 * n[2]) / 100, (255 * n[3]) / 100, n[4])
            : (n = S.exec(t))
            ? s(n[1], n[2] / 100, n[3] / 100, 1)
            : (n = T.exec(t))
            ? s(n[1], n[2] / 100, n[3] / 100, n[4])
            : E.hasOwnProperty(t)
            ? u(E[t])
            : "transparent" === t
            ? new f(NaN, NaN, NaN, 0)
            : null
        );
      }
      function u(t) {
        return new f((t >> 16) & 255, (t >> 8) & 255, 255 & t, 1);
      }
      function a(t, n, e, r) {
        return r <= 0 && (t = n = e = NaN), new f(t, n, e, r);
      }
      function o(t) {
        return t instanceof r || (t = i(t)), t ? ((t = t.rgb()), new f(t.r, t.g, t.b, t.opacity)) : new f();
      }
      function c(t, n, e, r) {
        return 1 === arguments.length ? o(t) : new f(t, n, e, null == r ? 1 : r);
      }
      function f(t, n, e, r) {
        (this.r = +t), (this.g = +n), (this.b = +e), (this.opacity = +r);
      }
      function s(t, n, e, r) {
        return r <= 0 ? (t = n = e = NaN) : e <= 0 || e >= 1 ? (t = n = NaN) : n <= 0 && (t = NaN), new d(t, n, e, r);
      }
      function l(t) {
        if (t instanceof d) return new d(t.h, t.s, t.l, t.opacity);
        if ((t instanceof r || (t = i(t)), !t)) return new d();
        if (t instanceof d) return t;
        t = t.rgb();
        var n = t.r / 255,
          e = t.g / 255,
          u = t.b / 255,
          a = Math.min(n, e, u),
          o = Math.max(n, e, u),
          c = NaN,
          f = o - a,
          s = (o + a) / 2;
        return (
          f
            ? ((c = n === o ? (e - u) / f + 6 * (e < u) : e === o ? (u - n) / f + 2 : (n - e) / f + 4),
              (f /= s < 0.5 ? o + a : 2 - o - a),
              (c *= 60))
            : (f = s > 0 && s < 1 ? 0 : c),
          new d(c, f, s, t.opacity)
        );
      }
      function h(t, n, e, r) {
        return 1 === arguments.length ? l(t) : new d(t, n, e, null == r ? 1 : r);
      }
      function d(t, n, e, r) {
        (this.h = +t), (this.s = +n), (this.l = +e), (this.opacity = +r);
      }
      function p(t, n, e) {
        return 255 * (t < 60 ? n + ((e - n) * t) / 60 : t < 180 ? e : t < 240 ? n + ((e - n) * (240 - t)) / 60 : n);
      }
      (n.c = r),
        e.d(n, "e", function () {
          return b;
        }),
        e.d(n, "d", function () {
          return g;
        }),
        (n.h = i),
        (n.b = o),
        (n.g = c),
        (n.a = f),
        (n.f = h);
      var v = e(80),
        b = 0.7,
        g = 1 / b,
        y = "\\s*([+-]?\\d+)\\s*",
        _ = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
        m = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
        x = /^#([0-9a-f]{3})$/,
        w = /^#([0-9a-f]{6})$/,
        M = new RegExp("^rgb\\(" + [y, y, y] + "\\)$"),
        k = new RegExp("^rgb\\(" + [m, m, m] + "\\)$"),
        N = new RegExp("^rgba\\(" + [y, y, y, _] + "\\)$"),
        A = new RegExp("^rgba\\(" + [m, m, m, _] + "\\)$"),
        S = new RegExp("^hsl\\(" + [_, m, m] + "\\)$"),
        T = new RegExp("^hsla\\(" + [_, m, m, _] + "\\)$"),
        E = {
          aliceblue: 15792383,
          antiquewhite: 16444375,
          aqua: 65535,
          aquamarine: 8388564,
          azure: 15794175,
          beige: 16119260,
          bisque: 16770244,
          black: 0,
          blanchedalmond: 16772045,
          blue: 255,
          blueviolet: 9055202,
          brown: 10824234,
          burlywood: 14596231,
          cadetblue: 6266528,
          chartreuse: 8388352,
          chocolate: 13789470,
          coral: 16744272,
          cornflowerblue: 6591981,
          cornsilk: 16775388,
          crimson: 14423100,
          cyan: 65535,
          darkblue: 139,
          darkcyan: 35723,
          darkgoldenrod: 12092939,
          darkgray: 11119017,
          darkgreen: 25600,
          darkgrey: 11119017,
          darkkhaki: 12433259,
          darkmagenta: 9109643,
          darkolivegreen: 5597999,
          darkorange: 16747520,
          darkorchid: 10040012,
          darkred: 9109504,
          darksalmon: 15308410,
          darkseagreen: 9419919,
          darkslateblue: 4734347,
          darkslategray: 3100495,
          darkslategrey: 3100495,
          darkturquoise: 52945,
          darkviolet: 9699539,
          deeppink: 16716947,
          deepskyblue: 49151,
          dimgray: 6908265,
          dimgrey: 6908265,
          dodgerblue: 2003199,
          firebrick: 11674146,
          floralwhite: 16775920,
          forestgreen: 2263842,
          fuchsia: 16711935,
          gainsboro: 14474460,
          ghostwhite: 16316671,
          gold: 16766720,
          goldenrod: 14329120,
          gray: 8421504,
          green: 32768,
          greenyellow: 11403055,
          grey: 8421504,
          honeydew: 15794160,
          hotpink: 16738740,
          indianred: 13458524,
          indigo: 4915330,
          ivory: 16777200,
          khaki: 15787660,
          lavender: 15132410,
          lavenderblush: 16773365,
          lawngreen: 8190976,
          lemonchiffon: 16775885,
          lightblue: 11393254,
          lightcoral: 15761536,
          lightcyan: 14745599,
          lightgoldenrodyellow: 16448210,
          lightgray: 13882323,
          lightgreen: 9498256,
          lightgrey: 13882323,
          lightpink: 16758465,
          lightsalmon: 16752762,
          lightseagreen: 2142890,
          lightskyblue: 8900346,
          lightslategray: 7833753,
          lightslategrey: 7833753,
          lightsteelblue: 11584734,
          lightyellow: 16777184,
          lime: 65280,
          limegreen: 3329330,
          linen: 16445670,
          magenta: 16711935,
          maroon: 8388608,
          mediumaquamarine: 6737322,
          mediumblue: 205,
          mediumorchid: 12211667,
          mediumpurple: 9662683,
          mediumseagreen: 3978097,
          mediumslateblue: 8087790,
          mediumspringgreen: 64154,
          mediumturquoise: 4772300,
          mediumvioletred: 13047173,
          midnightblue: 1644912,
          mintcream: 16121850,
          mistyrose: 16770273,
          moccasin: 16770229,
          navajowhite: 16768685,
          navy: 128,
          oldlace: 16643558,
          olive: 8421376,
          olivedrab: 7048739,
          orange: 16753920,
          orangered: 16729344,
          orchid: 14315734,
          palegoldenrod: 15657130,
          palegreen: 10025880,
          paleturquoise: 11529966,
          palevioletred: 14381203,
          papayawhip: 16773077,
          peachpuff: 16767673,
          peru: 13468991,
          pink: 16761035,
          plum: 14524637,
          powderblue: 11591910,
          purple: 8388736,
          rebeccapurple: 6697881,
          red: 16711680,
          rosybrown: 12357519,
          royalblue: 4286945,
          saddlebrown: 9127187,
          salmon: 16416882,
          sandybrown: 16032864,
          seagreen: 3050327,
          seashell: 16774638,
          sienna: 10506797,
          silver: 12632256,
          skyblue: 8900331,
          slateblue: 6970061,
          slategray: 7372944,
          slategrey: 7372944,
          snow: 16775930,
          springgreen: 65407,
          steelblue: 4620980,
          tan: 13808780,
          teal: 32896,
          thistle: 14204888,
          tomato: 16737095,
          turquoise: 4251856,
          violet: 15631086,
          wheat: 16113331,
          white: 16777215,
          whitesmoke: 16119285,
          yellow: 16776960,
          yellowgreen: 10145074,
        };
      e.i(v.a)(r, i, {
        displayable: function () {
          return this.rgb().displayable();
        },
        toString: function () {
          return this.rgb() + "";
        },
      }),
        e.i(v.a)(
          f,
          c,
          e.i(v.b)(r, {
            brighter: function (t) {
              return (t = null == t ? g : Math.pow(g, t)), new f(this.r * t, this.g * t, this.b * t, this.opacity);
            },
            darker: function (t) {
              return (t = null == t ? b : Math.pow(b, t)), new f(this.r * t, this.g * t, this.b * t, this.opacity);
            },
            rgb: function () {
              return this;
            },
            displayable: function () {
              return (
                0 <= this.r &&
                this.r <= 255 &&
                0 <= this.g &&
                this.g <= 255 &&
                0 <= this.b &&
                this.b <= 255 &&
                0 <= this.opacity &&
                this.opacity <= 1
              );
            },
            toString: function () {
              var t = this.opacity;
              return (
                (t = isNaN(t) ? 1 : Math.max(0, Math.min(1, t))),
                (1 === t ? "rgb(" : "rgba(") +
                  Math.max(0, Math.min(255, Math.round(this.r) || 0)) +
                  ", " +
                  Math.max(0, Math.min(255, Math.round(this.g) || 0)) +
                  ", " +
                  Math.max(0, Math.min(255, Math.round(this.b) || 0)) +
                  (1 === t ? ")" : ", " + t + ")")
              );
            },
          })
        ),
        e.i(v.a)(
          d,
          h,
          e.i(v.b)(r, {
            brighter: function (t) {
              return (t = null == t ? g : Math.pow(g, t)), new d(this.h, this.s, this.l * t, this.opacity);
            },
            darker: function (t) {
              return (t = null == t ? b : Math.pow(b, t)), new d(this.h, this.s, this.l * t, this.opacity);
            },
            rgb: function () {
              var t = (this.h % 360) + 360 * (this.h < 0),
                n = isNaN(t) || isNaN(this.s) ? 0 : this.s,
                e = this.l,
                r = e + (e < 0.5 ? e : 1 - e) * n,
                i = 2 * e - r;
              return new f(
                p(t >= 240 ? t - 240 : t + 120, i, r),
                p(t, i, r),
                p(t < 120 ? t + 240 : t - 120, i, r),
                this.opacity
              );
            },
            displayable: function () {
              return (
                ((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
                0 <= this.l &&
                this.l <= 1 &&
                0 <= this.opacity &&
                this.opacity <= 1
              );
            },
          })
        );
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        var e = Object.create(t.prototype);
        for (var r in n) e[r] = n[r];
        return e;
      }
      (n.b = r),
        (n.a = function (t, n, e) {
          (t.prototype = n.prototype = e), (e.constructor = t);
        });
    },
    function (t, n, e) {
      "use strict";
      function r(t, n, e, r, i) {
        var u = t * t,
          a = u * t;
        return ((1 - 3 * t + 3 * u - a) * n + (4 - 6 * u + 3 * a) * e + (1 + 3 * t + 3 * u - 3 * a) * r + a * i) / 6;
      }
      (n.b = r),
        (n.a = function (t) {
          var n = t.length - 1;
          return function (e) {
            var i = e <= 0 ? (e = 0) : e >= 1 ? ((e = 1), n - 1) : Math.floor(e * n),
              u = t[i],
              a = t[i + 1],
              o = i > 0 ? t[i - 1] : 2 * u - a,
              c = i < n - 1 ? t[i + 2] : 2 * a - u;
            return r((e - i / n) * n, o, u, a, c);
          };
        });
    },
    function (t, n, e) {
      "use strict";
      var r = e(23),
        i = e(159),
        u = e(154),
        a = e(157),
        o = e(44),
        c = e(158),
        f = e(160),
        s = e(156);
      n.a = function (t, n) {
        var l,
          h = typeof n;
        return null == n || "boolean" === h
          ? e.i(s.a)(n)
          : ("number" === h
              ? o.a
              : "string" === h
              ? (l = e.i(r.f)(n))
                ? ((n = l), i.b)
                : f.a
              : n instanceof r.f
              ? i.b
              : n instanceof Date
              ? a.a
              : Array.isArray(n)
              ? u.a
              : ("function" != typeof n.valueOf && "function" != typeof n.toString) || isNaN(n)
              ? c.a
              : o.a)(t, n);
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t) {
        return function () {
          return t;
        };
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(85);
      n.a = function (t) {
        var n = (t += ""),
          e = n.indexOf(":");
        return (
          e >= 0 && "xmlns" !== (n = t.slice(0, e)) && (t = t.slice(e + 1)),
          r.a.hasOwnProperty(n) ? { space: r.a[n], local: t } : t
        );
      };
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return r;
      });
      var r = "http://www.w3.org/1999/xhtml";
      n.a = {
        svg: "http://www.w3.org/2000/svg",
        xhtml: r,
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace",
        xmlns: "http://www.w3.org/2000/xmlns/",
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t, n, e) {
        return (
          (t = i(t, n, e)),
          function (n) {
            var e = n.relatedTarget;
            (e && (e === this || 8 & e.compareDocumentPosition(this))) || t.call(this, n);
          }
        );
      }
      function i(t, n, e) {
        return function (r) {
          var i = s;
          s = r;
          try {
            t.call(this, this.__data__, n, e);
          } finally {
            s = i;
          }
        };
      }
      function u(t) {
        return t
          .trim()
          .split(/^|\s+/)
          .map(function (t) {
            var n = "",
              e = t.indexOf(".");
            return e >= 0 && ((n = t.slice(e + 1)), (t = t.slice(0, e))), { type: t, name: n };
          });
      }
      function a(t) {
        return function () {
          var n = this.__on;
          if (n) {
            for (var e, r = 0, i = -1, u = n.length; r < u; ++r)
              (e = n[r]),
                (t.type && e.type !== t.type) || e.name !== t.name
                  ? (n[++i] = e)
                  : this.removeEventListener(e.type, e.listener, e.capture);
            ++i ? (n.length = i) : delete this.__on;
          }
        };
      }
      function o(t, n, e) {
        var u = f.hasOwnProperty(t.type) ? r : i;
        return function (r, i, a) {
          var o,
            c = this.__on,
            f = u(n, i, a);
          if (c)
            for (var s = 0, l = c.length; s < l; ++s)
              if ((o = c[s]).type === t.type && o.name === t.name)
                return (
                  this.removeEventListener(o.type, o.listener, o.capture),
                  this.addEventListener(o.type, (o.listener = f), (o.capture = e)),
                  void (o.value = n)
                );
          this.addEventListener(t.type, f, e),
            (o = { type: t.type, name: t.name, value: n, listener: f, capture: e }),
            c ? c.push(o) : (this.__on = [o]);
        };
      }
      function c(t, n, e, r) {
        var i = s;
        (t.sourceEvent = s), (s = t);
        try {
          return n.apply(e, r);
        } finally {
          s = i;
        }
      }
      e.d(n, "a", function () {
        return s;
      }),
        (n.b = c);
      var f = {},
        s = null;
      if ("undefined" != typeof document) {
        "onmouseenter" in document.documentElement || (f = { mouseenter: "mouseover", mouseleave: "mouseout" });
      }
      n.c = function (t, n, e) {
        var r,
          i,
          c = u(t + ""),
          f = c.length;
        {
          if (!(arguments.length < 2)) {
            for (s = n ? o : a, null == e && (e = !1), r = 0; r < f; ++r) this.each(s(c[r], n, e));
            return this;
          }
          var s = this.node().__on;
          if (s)
            for (var l, h = 0, d = s.length; h < d; ++h)
              for (r = 0, l = s[h]; r < f; ++r) if ((i = c[r]).type === l.type && i.name === l.name) return l.value;
        }
      };
    },
    function (t, n, e) {
      "use strict";
      function r() {}
      n.a = function (t) {
        return null == t
          ? r
          : function () {
              return this.querySelector(t);
            };
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(86);
      n.a = function () {
        for (var t, n = r.a; (t = n.sourceEvent); ) n = t;
        return n;
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t) {
        return (t.ownerDocument && t.ownerDocument.defaultView) || (t.document && t) || t.defaultView;
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t, n, e) {
        var r = t._x1,
          i = t._y1,
          a = t._x2,
          o = t._y2;
        if (t._l01_a > u.a) {
          var c = 2 * t._l01_2a + 3 * t._l01_a * t._l12_a + t._l12_2a,
            f = 3 * t._l01_a * (t._l01_a + t._l12_a);
          (r = (r * c - t._x0 * t._l12_2a + t._x2 * t._l01_2a) / f),
            (i = (i * c - t._y0 * t._l12_2a + t._y2 * t._l01_2a) / f);
        }
        if (t._l23_a > u.a) {
          var s = 2 * t._l23_2a + 3 * t._l23_a * t._l12_a + t._l12_2a,
            l = 3 * t._l23_a * (t._l23_a + t._l12_a);
          (a = (a * s + t._x1 * t._l23_2a - n * t._l12_2a) / l), (o = (o * s + t._y1 * t._l23_2a - e * t._l12_2a) / l);
        }
        t._context.bezierCurveTo(r, i, a, o, t._x2, t._y2);
      }
      function i(t, n) {
        (this._context = t), (this._alpha = n);
      }
      n.b = r;
      var u = e(33),
        a = e(49);
      (i.prototype = {
        areaStart: function () {
          this._line = 0;
        },
        areaEnd: function () {
          this._line = NaN;
        },
        lineStart: function () {
          (this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN),
            (this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0);
        },
        lineEnd: function () {
          switch (this._point) {
            case 2:
              this._context.lineTo(this._x2, this._y2);
              break;
            case 3:
              this.point(this._x2, this._y2);
          }
          (this._line || (0 !== this._line && 1 === this._point)) && this._context.closePath(),
            (this._line = 1 - this._line);
        },
        point: function (t, n) {
          if (((t = +t), (n = +n), this._point)) {
            var e = this._x2 - t,
              i = this._y2 - n;
            this._l23_a = Math.sqrt((this._l23_2a = Math.pow(e * e + i * i, this._alpha)));
          }
          switch (this._point) {
            case 0:
              (this._point = 1), this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
              break;
            case 1:
              this._point = 2;
              break;
            case 2:
              this._point = 3;
            default:
              r(this, t, n);
          }
          (this._l01_a = this._l12_a),
            (this._l12_a = this._l23_a),
            (this._l01_2a = this._l12_2a),
            (this._l12_2a = this._l23_2a),
            (this._x0 = this._x1),
            (this._x1 = this._x2),
            (this._x2 = t),
            (this._y0 = this._y1),
            (this._y1 = this._y2),
            (this._y2 = n);
        },
      }),
        (n.a = (function t(n) {
          function e(t) {
            return n ? new i(t, n) : new a.b(t, 0);
          }
          return (
            (e.alpha = function (n) {
              return t(+n);
            }),
            e
          );
        })(0.5));
    },
    function (t, n, e) {
      "use strict";
      var r = e(16),
        i = e(18),
        u = e(50),
        a = e(93);
      n.a = function () {
        function t(t) {
          var i,
            u,
            a,
            h = t.length,
            d = !1;
          for (null == f && (l = s((a = e.i(r.a)()))), i = 0; i <= h; ++i)
            !(i < h && c((u = t[i]), i, t)) === d && ((d = !d) ? l.lineStart() : l.lineEnd()),
              d && l.point(+n(u, i, t), +o(u, i, t));
          if (a) return (l = null), a + "" || null;
        }
        var n = a.a,
          o = a.b,
          c = e.i(i.a)(!0),
          f = null,
          s = u.a,
          l = null;
        return (
          (t.x = function (r) {
            return arguments.length ? ((n = "function" == typeof r ? r : e.i(i.a)(+r)), t) : n;
          }),
          (t.y = function (n) {
            return arguments.length ? ((o = "function" == typeof n ? n : e.i(i.a)(+n)), t) : o;
          }),
          (t.defined = function (n) {
            return arguments.length ? ((c = "function" == typeof n ? n : e.i(i.a)(!!n)), t) : c;
          }),
          (t.curve = function (n) {
            return arguments.length ? ((s = n), null != f && (l = s(f)), t) : s;
          }),
          (t.context = function (n) {
            return arguments.length ? (null == n ? (f = l = null) : (l = s((f = n))), t) : f;
          }),
          t
        );
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        for (var n, e = 0, r = -1, i = t.length; ++r < i; ) (n = +t[r][1]) && (e += n);
        return e;
      }
      n.b = r;
      var i = e(35);
      n.a = function (t) {
        var n = t.map(r);
        return e
          .i(i.a)(t)
          .sort(function (t, e) {
            return n[t] - n[e];
          });
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return t[0];
      }
      function i(t) {
        return t[1];
      }
      (n.a = r), (n.b = i);
    },
    function (t, n, e) {
      "use strict";
      var r = e(95);
      e.d(n, "a", function () {
        return r.a;
      }),
        e.d(n, "b", function () {
          return r.b;
        }),
        e.d(n, "c", function () {
          return r.c;
        }),
        e.d(n, "d", function () {
          return r.d;
        }),
        e.d(n, "e", function () {
          return r.e;
        });
      var i = e(186);
      e.d(n, "f", function () {
        return i.a;
      });
      var u = e(185);
      e.d(n, "g", function () {
        return u.a;
      });
      var a = e(489);
      e.d(n, "h", function () {
        return a.a;
      });
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return (i = e.i(f.a)(t)), (u = i.format), (a = i.parse), (o = i.utcFormat), (c = i.utcParse), i;
      }
      e.d(n, "b", function () {
        return u;
      }),
        e.d(n, "c", function () {
          return a;
        }),
        e.d(n, "d", function () {
          return o;
        }),
        e.d(n, "e", function () {
          return c;
        }),
        (n.a = r);
      var i,
        u,
        a,
        o,
        c,
        f = e(186);
      r({
        dateTime: "%x, %X",
        date: "%-m/%-d/%Y",
        time: "%-I:%M:%S %p",
        periods: ["AM", "PM"],
        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        months: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      });
    },
    function (t, n, e) {
      "use strict";
      function r() {
        return _ || (w(i), (_ = x.now() + m));
      }
      function i() {
        _ = 0;
      }
      function u() {
        this._call = this._time = this._next = null;
      }
      function a(t, n, e) {
        var r = new u();
        return r.restart(t, n, e), r;
      }
      function o() {
        r(), ++p;
        for (var t, n = h; n; ) (t = _ - n._time) >= 0 && n._call.call(null, t), (n = n._next);
        --p;
      }
      function c() {
        (_ = (y = x.now()) + m), (p = v = 0);
        try {
          o();
        } finally {
          (p = 0), s(), (_ = 0);
        }
      }
      function f() {
        var t = x.now(),
          n = t - y;
        n > g && ((m -= n), (y = t));
      }
      function s() {
        for (var t, n, e = h, r = 1 / 0; e; )
          e._call
            ? (r > e._time && (r = e._time), (t = e), (e = e._next))
            : ((n = e._next), (e._next = null), (e = t ? (t._next = n) : (h = n)));
        (d = t), l(r);
      }
      function l(t) {
        if (!p) {
          v && (v = clearTimeout(v));
          t - _ > 24
            ? (t < 1 / 0 && (v = setTimeout(c, t - x.now() - m)), b && (b = clearInterval(b)))
            : (b || ((y = x.now()), (b = setInterval(f, g))), (p = 1), w(c));
        }
      }
      (n.a = r), (n.d = u), (n.b = a), (n.c = o);
      var h,
        d,
        p = 0,
        v = 0,
        b = 0,
        g = 1e3,
        y = 0,
        _ = 0,
        m = 0,
        x = "object" == typeof performance && performance.now ? performance : Date,
        w =
          "object" == typeof window && window.requestAnimationFrame
            ? window.requestAnimationFrame.bind(window)
            : function (t) {
                setTimeout(t, 17);
              };
      u.prototype = a.prototype = {
        constructor: u,
        restart: function (t, n, e) {
          if ("function" != typeof t) throw new TypeError("callback is not a function");
          (e = (null == e ? r() : +e) + (null == n ? 0 : +n)),
            this._next || d === this || (d ? (d._next = this) : (h = this), (d = this)),
            (this._call = t),
            (this._time = e),
            l();
        },
        stop: function () {
          this._call && ((this._call = null), (this._time = 1 / 0), l());
        },
      };
    },
    function (t, n, e) {
      "use strict";
      var r = (e(507), e(13));
      e.d(n, "a", function () {
        return r.a;
      });
      var i = e(506);
      e.d(n, "b", function () {
        return i.a;
      });
      var u = e(187);
      e.d(n, "c", function () {
        return u.a;
      });
    },
    function (t, n, e) {
      "use strict";
      function r(t, n, e, r) {
        var i = [null, null],
          a = f.d.push(i) - 1;
        return (
          (i.left = t),
          (i.right = n),
          e && u(i, t, n, e),
          r && u(i, n, t, r),
          f.c[t.index].halfedges.push(a),
          f.c[n.index].halfedges.push(a),
          i
        );
      }
      function i(t, n, e) {
        var r = [n, e];
        return (r.left = t), r;
      }
      function u(t, n, e, r) {
        t[0] || t[1] ? (t.left === e ? (t[1] = r) : (t[0] = r)) : ((t[0] = r), (t.left = n), (t.right = e));
      }
      function a(t, n, e, r, i) {
        var u,
          a = t[0],
          o = t[1],
          c = a[0],
          f = a[1],
          s = o[0],
          l = o[1],
          h = 0,
          d = 1,
          p = s - c,
          v = l - f;
        if (((u = n - c), p || !(u > 0))) {
          if (((u /= p), p < 0)) {
            if (u < h) return;
            u < d && (d = u);
          } else if (p > 0) {
            if (u > d) return;
            u > h && (h = u);
          }
          if (((u = r - c), p || !(u < 0))) {
            if (((u /= p), p < 0)) {
              if (u > d) return;
              u > h && (h = u);
            } else if (p > 0) {
              if (u < h) return;
              u < d && (d = u);
            }
            if (((u = e - f), v || !(u > 0))) {
              if (((u /= v), v < 0)) {
                if (u < h) return;
                u < d && (d = u);
              } else if (v > 0) {
                if (u > d) return;
                u > h && (h = u);
              }
              if (((u = i - f), v || !(u < 0))) {
                if (((u /= v), v < 0)) {
                  if (u > d) return;
                  u > h && (h = u);
                } else if (v > 0) {
                  if (u < h) return;
                  u < d && (d = u);
                }
                return (
                  !(h > 0 || d < 1) ||
                  (h > 0 && (t[0] = [c + h * p, f + h * v]), d < 1 && (t[1] = [c + d * p, f + d * v]), !0)
                );
              }
            }
          }
        }
      }
      function o(t, n, e, r, i) {
        var u = t[1];
        if (u) return !0;
        var a,
          o,
          c = t[0],
          f = t.left,
          s = t.right,
          l = f[0],
          h = f[1],
          d = s[0],
          p = s[1],
          v = (l + d) / 2,
          b = (h + p) / 2;
        if (p === h) {
          if (v < n || v >= r) return;
          if (l > d) {
            if (c) {
              if (c[1] >= i) return;
            } else c = [v, e];
            u = [v, i];
          } else {
            if (c) {
              if (c[1] < e) return;
            } else c = [v, i];
            u = [v, e];
          }
        } else if (((a = (l - d) / (p - h)), (o = b - a * v), a < -1 || a > 1))
          if (l > d) {
            if (c) {
              if (c[1] >= i) return;
            } else c = [(e - o) / a, e];
            u = [(i - o) / a, i];
          } else {
            if (c) {
              if (c[1] < e) return;
            } else c = [(i - o) / a, i];
            u = [(e - o) / a, e];
          }
        else if (h < p) {
          if (c) {
            if (c[0] >= r) return;
          } else c = [n, a * n + o];
          u = [r, a * r + o];
        } else {
          if (c) {
            if (c[0] < n) return;
          } else c = [r, a * r + o];
          u = [n, a * n + o];
        }
        return (t[0] = c), (t[1] = u), !0;
      }
      function c(t, n, e, r) {
        for (var i, u = f.d.length; u--; )
          (o((i = f.d[u]), t, n, e, r) &&
            a(i, t, n, e, r) &&
            (Math.abs(i[0][0] - i[1][0]) > f.b || Math.abs(i[0][1] - i[1][1]) > f.b)) ||
            delete f.d[u];
      }
      (n.d = r), (n.b = i), (n.c = u), (n.a = c);
      var f = e(36);
    },
    function (t, n, e) {
      "use strict";
      function r() {
        this._ = null;
      }
      function i(t) {
        t.U = t.C = t.L = t.R = t.P = t.N = null;
      }
      function u(t, n) {
        var e = n,
          r = n.R,
          i = e.U;
        i ? (i.L === e ? (i.L = r) : (i.R = r)) : (t._ = r),
          (r.U = i),
          (e.U = r),
          (e.R = r.L),
          e.R && (e.R.U = e),
          (r.L = e);
      }
      function a(t, n) {
        var e = n,
          r = n.L,
          i = e.U;
        i ? (i.L === e ? (i.L = r) : (i.R = r)) : (t._ = r),
          (r.U = i),
          (e.U = r),
          (e.L = r.R),
          e.L && (e.L.U = e),
          (r.R = e);
      }
      function o(t) {
        for (; t.L; ) t = t.L;
        return t;
      }
      (n.b = i),
        (r.prototype = {
          constructor: r,
          insert: function (t, n) {
            var e, r, i;
            if (t) {
              if (((n.P = t), (n.N = t.N), t.N && (t.N.P = n), (t.N = n), t.R)) {
                for (t = t.R; t.L; ) t = t.L;
                t.L = n;
              } else t.R = n;
              e = t;
            } else
              this._
                ? ((t = o(this._)), (n.P = null), (n.N = t), (t.P = t.L = n), (e = t))
                : ((n.P = n.N = null), (this._ = n), (e = null));
            for (n.L = n.R = null, n.U = e, n.C = !0, t = n; e && e.C; )
              (r = e.U),
                e === r.L
                  ? ((i = r.R),
                    i && i.C
                      ? ((e.C = i.C = !1), (r.C = !0), (t = r))
                      : (t === e.R && (u(this, e), (t = e), (e = t.U)), (e.C = !1), (r.C = !0), a(this, r)))
                  : ((i = r.L),
                    i && i.C
                      ? ((e.C = i.C = !1), (r.C = !0), (t = r))
                      : (t === e.L && (a(this, e), (t = e), (e = t.U)), (e.C = !1), (r.C = !0), u(this, r))),
                (e = t.U);
            this._.C = !1;
          },
          remove: function (t) {
            t.N && (t.N.P = t.P), t.P && (t.P.N = t.N), (t.N = t.P = null);
            var n,
              e,
              r,
              i = t.U,
              c = t.L,
              f = t.R;
            if (
              ((e = c ? (f ? o(f) : c) : f),
              i ? (i.L === t ? (i.L = e) : (i.R = e)) : (this._ = e),
              c && f
                ? ((r = e.C),
                  (e.C = t.C),
                  (e.L = c),
                  (c.U = e),
                  e !== f
                    ? ((i = e.U), (e.U = t.U), (t = e.R), (i.L = t), (e.R = f), (f.U = e))
                    : ((e.U = i), (i = e), (t = e.R)))
                : ((r = t.C), (t = e)),
              t && (t.U = i),
              !r)
            ) {
              if (t && t.C) return void (t.C = !1);
              do {
                if (t === this._) break;
                if (t === i.L) {
                  if (
                    ((n = i.R),
                    n.C && ((n.C = !1), (i.C = !0), u(this, i), (n = i.R)),
                    (n.L && n.L.C) || (n.R && n.R.C))
                  ) {
                    (n.R && n.R.C) || ((n.L.C = !1), (n.C = !0), a(this, n), (n = i.R)),
                      (n.C = i.C),
                      (i.C = n.R.C = !1),
                      u(this, i),
                      (t = this._);
                    break;
                  }
                } else if (
                  ((n = i.L), n.C && ((n.C = !1), (i.C = !0), a(this, i), (n = i.L)), (n.L && n.L.C) || (n.R && n.R.C))
                ) {
                  (n.L && n.L.C) || ((n.R.C = !1), (n.C = !0), u(this, n), (n = i.L)),
                    (n.C = i.C),
                    (i.C = n.L.C = !1),
                    a(this, i),
                    (t = this._);
                  break;
                }
                (n.C = !0), (t = i), (i = i.U);
              } while (!t.C);
              t && (t.C = !1);
            }
          },
        }),
        (n.a = r);
    },
    function (t, n, e) {
      "use strict";
      Object.defineProperty(n, "__esModule", { value: !0 });
      var r = e(536);
      e.d(n, "version", function () {
        return r.a;
      });
      var i = e(5);
      e.d(n, "bisect", function () {
        return i.a;
      }),
        e.d(n, "bisectRight", function () {
          return i.b;
        }),
        e.d(n, "bisectLeft", function () {
          return i.c;
        }),
        e.d(n, "ascending", function () {
          return i.d;
        }),
        e.d(n, "bisector", function () {
          return i.e;
        }),
        e.d(n, "cross", function () {
          return i.f;
        }),
        e.d(n, "descending", function () {
          return i.g;
        }),
        e.d(n, "deviation", function () {
          return i.h;
        }),
        e.d(n, "extent", function () {
          return i.i;
        }),
        e.d(n, "histogram", function () {
          return i.j;
        }),
        e.d(n, "thresholdFreedmanDiaconis", function () {
          return i.k;
        }),
        e.d(n, "thresholdScott", function () {
          return i.l;
        }),
        e.d(n, "thresholdSturges", function () {
          return i.m;
        }),
        e.d(n, "max", function () {
          return i.n;
        }),
        e.d(n, "mean", function () {
          return i.o;
        }),
        e.d(n, "median", function () {
          return i.p;
        }),
        e.d(n, "merge", function () {
          return i.q;
        }),
        e.d(n, "min", function () {
          return i.r;
        }),
        e.d(n, "pairs", function () {
          return i.s;
        }),
        e.d(n, "permute", function () {
          return i.t;
        }),
        e.d(n, "quantile", function () {
          return i.u;
        }),
        e.d(n, "range", function () {
          return i.v;
        }),
        e.d(n, "scan", function () {
          return i.w;
        }),
        e.d(n, "shuffle", function () {
          return i.x;
        }),
        e.d(n, "sum", function () {
          return i.y;
        }),
        e.d(n, "ticks", function () {
          return i.z;
        }),
        e.d(n, "tickIncrement", function () {
          return i.A;
        }),
        e.d(n, "tickStep", function () {
          return i.B;
        }),
        e.d(n, "transpose", function () {
          return i.C;
        }),
        e.d(n, "variance", function () {
          return i.D;
        }),
        e.d(n, "zip", function () {
          return i.E;
        });
      var u = e(213);
      e.d(n, "axisTop", function () {
        return u.a;
      }),
        e.d(n, "axisRight", function () {
          return u.b;
        }),
        e.d(n, "axisBottom", function () {
          return u.c;
        }),
        e.d(n, "axisLeft", function () {
          return u.d;
        });
      var a = e(217);
      e.d(n, "brush", function () {
        return a.a;
      }),
        e.d(n, "brushX", function () {
          return a.b;
        }),
        e.d(n, "brushY", function () {
          return a.c;
        }),
        e.d(n, "brushSelection", function () {
          return a.d;
        });
      var o = e(222);
      e.d(n, "chord", function () {
        return o.a;
      }),
        e.d(n, "ribbon", function () {
          return o.b;
        });
      var c = e(25);
      e.d(n, "nest", function () {
        return c.a;
      }),
        e.d(n, "set", function () {
          return c.b;
        }),
        e.d(n, "map", function () {
          return c.c;
        }),
        e.d(n, "keys", function () {
          return c.d;
        }),
        e.d(n, "values", function () {
          return c.e;
        }),
        e.d(n, "entries", function () {
          return c.f;
        });
      var f = e(9);
      e.d(n, "color", function () {
        return f.a;
      }),
        e.d(n, "rgb", function () {
          return f.b;
        }),
        e.d(n, "hsl", function () {
          return f.c;
        }),
        e.d(n, "lab", function () {
          return f.d;
        }),
        e.d(n, "hcl", function () {
          return f.e;
        }),
        e.d(n, "cubehelix", function () {
          return f.f;
        });
      var s = e(14);
      e.d(n, "dispatch", function () {
        return s.a;
      });
      var l = e(60);
      e.d(n, "drag", function () {
        return l.a;
      }),
        e.d(n, "dragDisable", function () {
          return l.b;
        }),
        e.d(n, "dragEnable", function () {
          return l.c;
        });
      var h = e(61);
      e.d(n, "dsvFormat", function () {
        return h.a;
      }),
        e.d(n, "csvParse", function () {
          return h.b;
        }),
        e.d(n, "csvParseRows", function () {
          return h.c;
        }),
        e.d(n, "csvFormat", function () {
          return h.d;
        }),
        e.d(n, "csvFormatRows", function () {
          return h.e;
        }),
        e.d(n, "tsvParse", function () {
          return h.f;
        }),
        e.d(n, "tsvParseRows", function () {
          return h.g;
        }),
        e.d(n, "tsvFormat", function () {
          return h.h;
        }),
        e.d(n, "tsvFormatRows", function () {
          return h.i;
        });
      var d = e(118);
      e.d(n, "easeLinear", function () {
        return d.a;
      }),
        e.d(n, "easeQuad", function () {
          return d.b;
        }),
        e.d(n, "easeQuadIn", function () {
          return d.c;
        }),
        e.d(n, "easeQuadOut", function () {
          return d.d;
        }),
        e.d(n, "easeQuadInOut", function () {
          return d.e;
        }),
        e.d(n, "easeCubic", function () {
          return d.f;
        }),
        e.d(n, "easeCubicIn", function () {
          return d.g;
        }),
        e.d(n, "easeCubicOut", function () {
          return d.h;
        }),
        e.d(n, "easeCubicInOut", function () {
          return d.i;
        }),
        e.d(n, "easePoly", function () {
          return d.j;
        }),
        e.d(n, "easePolyIn", function () {
          return d.k;
        }),
        e.d(n, "easePolyOut", function () {
          return d.l;
        }),
        e.d(n, "easePolyInOut", function () {
          return d.m;
        }),
        e.d(n, "easeSin", function () {
          return d.n;
        }),
        e.d(n, "easeSinIn", function () {
          return d.o;
        }),
        e.d(n, "easeSinOut", function () {
          return d.p;
        }),
        e.d(n, "easeSinInOut", function () {
          return d.q;
        }),
        e.d(n, "easeExp", function () {
          return d.r;
        }),
        e.d(n, "easeExpIn", function () {
          return d.s;
        }),
        e.d(n, "easeExpOut", function () {
          return d.t;
        }),
        e.d(n, "easeExpInOut", function () {
          return d.u;
        }),
        e.d(n, "easeCircle", function () {
          return d.v;
        }),
        e.d(n, "easeCircleIn", function () {
          return d.w;
        }),
        e.d(n, "easeCircleOut", function () {
          return d.x;
        }),
        e.d(n, "easeCircleInOut", function () {
          return d.y;
        }),
        e.d(n, "easeBounce", function () {
          return d.z;
        }),
        e.d(n, "easeBounceIn", function () {
          return d.A;
        }),
        e.d(n, "easeBounceOut", function () {
          return d.B;
        }),
        e.d(n, "easeBounceInOut", function () {
          return d.C;
        }),
        e.d(n, "easeBack", function () {
          return d.D;
        }),
        e.d(n, "easeBackIn", function () {
          return d.E;
        }),
        e.d(n, "easeBackOut", function () {
          return d.F;
        }),
        e.d(n, "easeBackInOut", function () {
          return d.G;
        }),
        e.d(n, "easeElastic", function () {
          return d.H;
        }),
        e.d(n, "easeElasticIn", function () {
          return d.I;
        }),
        e.d(n, "easeElasticOut", function () {
          return d.J;
        }),
        e.d(n, "easeElasticInOut", function () {
          return d.K;
        });
      var p = e(250);
      e.d(n, "forceCenter", function () {
        return p.a;
      }),
        e.d(n, "forceCollide", function () {
          return p.b;
        }),
        e.d(n, "forceLink", function () {
          return p.c;
        }),
        e.d(n, "forceManyBody", function () {
          return p.d;
        }),
        e.d(n, "forceRadial", function () {
          return p.e;
        }),
        e.d(n, "forceSimulation", function () {
          return p.f;
        }),
        e.d(n, "forceX", function () {
          return p.g;
        }),
        e.d(n, "forceY", function () {
          return p.h;
        });
      var v = e(64);
      e.d(n, "formatDefaultLocale", function () {
        return v.a;
      }),
        e.d(n, "format", function () {
          return v.b;
        }),
        e.d(n, "formatPrefix", function () {
          return v.c;
        }),
        e.d(n, "formatLocale", function () {
          return v.d;
        }),
        e.d(n, "formatSpecifier", function () {
          return v.e;
        }),
        e.d(n, "precisionFixed", function () {
          return v.f;
        }),
        e.d(n, "precisionPrefix", function () {
          return v.g;
        }),
        e.d(n, "precisionRound", function () {
          return v.h;
        });
      var b = e(267);
      e.d(n, "geoArea", function () {
        return b.a;
      }),
        e.d(n, "geoBounds", function () {
          return b.b;
        }),
        e.d(n, "geoCentroid", function () {
          return b.c;
        }),
        e.d(n, "geoCircle", function () {
          return b.d;
        }),
        e.d(n, "geoClipAntimeridian", function () {
          return b.e;
        }),
        e.d(n, "geoClipCircle", function () {
          return b.f;
        }),
        e.d(n, "geoClipExtent", function () {
          return b.g;
        }),
        e.d(n, "geoClipRectangle", function () {
          return b.h;
        }),
        e.d(n, "geoContains", function () {
          return b.i;
        }),
        e.d(n, "geoDistance", function () {
          return b.j;
        }),
        e.d(n, "geoGraticule", function () {
          return b.k;
        }),
        e.d(n, "geoGraticule10", function () {
          return b.l;
        }),
        e.d(n, "geoInterpolate", function () {
          return b.m;
        }),
        e.d(n, "geoLength", function () {
          return b.n;
        }),
        e.d(n, "geoPath", function () {
          return b.o;
        }),
        e.d(n, "geoAlbers", function () {
          return b.p;
        }),
        e.d(n, "geoAlbersUsa", function () {
          return b.q;
        }),
        e.d(n, "geoAzimuthalEqualArea", function () {
          return b.r;
        }),
        e.d(n, "geoAzimuthalEqualAreaRaw", function () {
          return b.s;
        }),
        e.d(n, "geoAzimuthalEquidistant", function () {
          return b.t;
        }),
        e.d(n, "geoAzimuthalEquidistantRaw", function () {
          return b.u;
        }),
        e.d(n, "geoConicConformal", function () {
          return b.v;
        }),
        e.d(n, "geoConicConformalRaw", function () {
          return b.w;
        }),
        e.d(n, "geoConicEqualArea", function () {
          return b.x;
        }),
        e.d(n, "geoConicEqualAreaRaw", function () {
          return b.y;
        }),
        e.d(n, "geoConicEquidistant", function () {
          return b.z;
        }),
        e.d(n, "geoConicEquidistantRaw", function () {
          return b.A;
        }),
        e.d(n, "geoEquirectangular", function () {
          return b.B;
        }),
        e.d(n, "geoEquirectangularRaw", function () {
          return b.C;
        }),
        e.d(n, "geoGnomonic", function () {
          return b.D;
        }),
        e.d(n, "geoGnomonicRaw", function () {
          return b.E;
        }),
        e.d(n, "geoIdentity", function () {
          return b.F;
        }),
        e.d(n, "geoProjection", function () {
          return b.G;
        }),
        e.d(n, "geoProjectionMutator", function () {
          return b.H;
        }),
        e.d(n, "geoMercator", function () {
          return b.I;
        }),
        e.d(n, "geoMercatorRaw", function () {
          return b.J;
        }),
        e.d(n, "geoNaturalEarth1", function () {
          return b.K;
        }),
        e.d(n, "geoNaturalEarth1Raw", function () {
          return b.L;
        }),
        e.d(n, "geoOrthographic", function () {
          return b.M;
        }),
        e.d(n, "geoOrthographicRaw", function () {
          return b.N;
        }),
        e.d(n, "geoStereographic", function () {
          return b.O;
        }),
        e.d(n, "geoStereographicRaw", function () {
          return b.P;
        }),
        e.d(n, "geoTransverseMercator", function () {
          return b.Q;
        }),
        e.d(n, "geoTransverseMercatorRaw", function () {
          return b.R;
        }),
        e.d(n, "geoRotation", function () {
          return b.S;
        }),
        e.d(n, "geoStream", function () {
          return b.T;
        }),
        e.d(n, "geoTransform", function () {
          return b.U;
        });
      var g = e(295);
      e.d(n, "cluster", function () {
        return g.a;
      }),
        e.d(n, "hierarchy", function () {
          return g.b;
        }),
        e.d(n, "pack", function () {
          return g.c;
        }),
        e.d(n, "packSiblings", function () {
          return g.d;
        }),
        e.d(n, "packEnclose", function () {
          return g.e;
        }),
        e.d(n, "partition", function () {
          return g.f;
        }),
        e.d(n, "stratify", function () {
          return g.g;
        }),
        e.d(n, "tree", function () {
          return g.h;
        }),
        e.d(n, "treemap", function () {
          return g.i;
        }),
        e.d(n, "treemapBinary", function () {
          return g.j;
        }),
        e.d(n, "treemapDice", function () {
          return g.k;
        }),
        e.d(n, "treemapSlice", function () {
          return g.l;
        }),
        e.d(n, "treemapSliceDice", function () {
          return g.m;
        }),
        e.d(n, "treemapSquarify", function () {
          return g.n;
        }),
        e.d(n, "treemapResquarify", function () {
          return g.o;
        });
      var y = e(6);
      e.d(n, "interpolate", function () {
        return y.a;
      }),
        e.d(n, "interpolateArray", function () {
          return y.b;
        }),
        e.d(n, "interpolateBasis", function () {
          return y.c;
        }),
        e.d(n, "interpolateBasisClosed", function () {
          return y.d;
        }),
        e.d(n, "interpolateDate", function () {
          return y.e;
        }),
        e.d(n, "interpolateNumber", function () {
          return y.f;
        }),
        e.d(n, "interpolateObject", function () {
          return y.g;
        }),
        e.d(n, "interpolateRound", function () {
          return y.h;
        }),
        e.d(n, "interpolateString", function () {
          return y.i;
        }),
        e.d(n, "interpolateTransformCss", function () {
          return y.j;
        }),
        e.d(n, "interpolateTransformSvg", function () {
          return y.k;
        }),
        e.d(n, "interpolateZoom", function () {
          return y.l;
        }),
        e.d(n, "interpolateRgb", function () {
          return y.m;
        }),
        e.d(n, "interpolateRgbBasis", function () {
          return y.n;
        }),
        e.d(n, "interpolateRgbBasisClosed", function () {
          return y.o;
        }),
        e.d(n, "interpolateHsl", function () {
          return y.p;
        }),
        e.d(n, "interpolateHslLong", function () {
          return y.q;
        }),
        e.d(n, "interpolateLab", function () {
          return y.r;
        }),
        e.d(n, "interpolateHcl", function () {
          return y.s;
        }),
        e.d(n, "interpolateHclLong", function () {
          return y.t;
        }),
        e.d(n, "interpolateCubehelix", function () {
          return y.u;
        }),
        e.d(n, "interpolateCubehelixLong", function () {
          return y.v;
        }),
        e.d(n, "quantize", function () {
          return y.w;
        });
      var _ = e(16);
      e.d(n, "path", function () {
        return _.a;
      });
      var m = e(328);
      e.d(n, "polygonArea", function () {
        return m.a;
      }),
        e.d(n, "polygonCentroid", function () {
          return m.b;
        }),
        e.d(n, "polygonHull", function () {
          return m.c;
        }),
        e.d(n, "polygonContains", function () {
          return m.d;
        }),
        e.d(n, "polygonLength", function () {
          return m.e;
        });
      var x = e(76);
      e.d(n, "quadtree", function () {
        return x.a;
      });
      var w = e(348);
      e.d(n, "queue", function () {
        return w.a;
      });
      var M = e(351);
      e.d(n, "randomUniform", function () {
        return M.a;
      }),
        e.d(n, "randomNormal", function () {
          return M.b;
        }),
        e.d(n, "randomLogNormal", function () {
          return M.c;
        }),
        e.d(n, "randomBates", function () {
          return M.d;
        }),
        e.d(n, "randomIrwinHall", function () {
          return M.e;
        }),
        e.d(n, "randomExponential", function () {
          return M.f;
        });
      var k = e(356);
      e.d(n, "request", function () {
        return k.a;
      }),
        e.d(n, "html", function () {
          return k.b;
        }),
        e.d(n, "json", function () {
          return k.c;
        }),
        e.d(n, "text", function () {
          return k.d;
        }),
        e.d(n, "xml", function () {
          return k.e;
        }),
        e.d(n, "csv", function () {
          return k.f;
        }),
        e.d(n, "tsv", function () {
          return k.g;
        });
      var N = e(412);
      e.d(n, "scaleBand", function () {
        return N.a;
      }),
        e.d(n, "scalePoint", function () {
          return N.b;
        }),
        e.d(n, "scaleIdentity", function () {
          return N.c;
        }),
        e.d(n, "scaleLinear", function () {
          return N.d;
        }),
        e.d(n, "scaleLog", function () {
          return N.e;
        }),
        e.d(n, "scaleOrdinal", function () {
          return N.f;
        }),
        e.d(n, "scaleImplicit", function () {
          return N.g;
        }),
        e.d(n, "scalePow", function () {
          return N.h;
        }),
        e.d(n, "scaleSqrt", function () {
          return N.i;
        }),
        e.d(n, "scaleQuantile", function () {
          return N.j;
        }),
        e.d(n, "scaleQuantize", function () {
          return N.k;
        }),
        e.d(n, "scaleThreshold", function () {
          return N.l;
        }),
        e.d(n, "scaleTime", function () {
          return N.m;
        }),
        e.d(n, "scaleUtc", function () {
          return N.n;
        }),
        e.d(n, "schemeCategory10", function () {
          return N.o;
        }),
        e.d(n, "schemeCategory20b", function () {
          return N.p;
        }),
        e.d(n, "schemeCategory20c", function () {
          return N.q;
        }),
        e.d(n, "schemeCategory20", function () {
          return N.r;
        }),
        e.d(n, "interpolateCubehelixDefault", function () {
          return N.s;
        }),
        e.d(n, "interpolateRainbow", function () {
          return N.t;
        }),
        e.d(n, "interpolateWarm", function () {
          return N.u;
        }),
        e.d(n, "interpolateCool", function () {
          return N.v;
        }),
        e.d(n, "interpolateViridis", function () {
          return N.w;
        }),
        e.d(n, "interpolateMagma", function () {
          return N.x;
        }),
        e.d(n, "interpolateInferno", function () {
          return N.y;
        }),
        e.d(n, "interpolatePlasma", function () {
          return N.z;
        }),
        e.d(n, "scaleSequential", function () {
          return N.A;
        });
      var A = e(3);
      e.d(n, "create", function () {
        return A.a;
      }),
        e.d(n, "creator", function () {
          return A.b;
        }),
        e.d(n, "local", function () {
          return A.c;
        }),
        e.d(n, "matcher", function () {
          return A.d;
        }),
        e.d(n, "mouse", function () {
          return A.e;
        }),
        e.d(n, "namespace", function () {
          return A.f;
        }),
        e.d(n, "namespaces", function () {
          return A.g;
        }),
        e.d(n, "clientPoint", function () {
          return A.h;
        }),
        e.d(n, "select", function () {
          return A.i;
        }),
        e.d(n, "selectAll", function () {
          return A.j;
        }),
        e.d(n, "selection", function () {
          return A.k;
        }),
        e.d(n, "selector", function () {
          return A.l;
        }),
        e.d(n, "selectorAll", function () {
          return A.m;
        }),
        e.d(n, "style", function () {
          return A.n;
        }),
        e.d(n, "touch", function () {
          return A.o;
        }),
        e.d(n, "touches", function () {
          return A.p;
        }),
        e.d(n, "window", function () {
          return A.q;
        }),
        e.d(n, "event", function () {
          return A.r;
        }),
        e.d(n, "customEvent", function () {
          return A.s;
        });
      var S = e(464);
      e.d(n, "arc", function () {
        return S.a;
      }),
        e.d(n, "area", function () {
          return S.b;
        }),
        e.d(n, "line", function () {
          return S.c;
        }),
        e.d(n, "pie", function () {
          return S.d;
        }),
        e.d(n, "areaRadial", function () {
          return S.e;
        }),
        e.d(n, "radialArea", function () {
          return S.f;
        }),
        e.d(n, "lineRadial", function () {
          return S.g;
        }),
        e.d(n, "radialLine", function () {
          return S.h;
        }),
        e.d(n, "pointRadial", function () {
          return S.i;
        }),
        e.d(n, "linkHorizontal", function () {
          return S.j;
        }),
        e.d(n, "linkVertical", function () {
          return S.k;
        }),
        e.d(n, "linkRadial", function () {
          return S.l;
        }),
        e.d(n, "symbol", function () {
          return S.m;
        }),
        e.d(n, "symbols", function () {
          return S.n;
        }),
        e.d(n, "symbolCircle", function () {
          return S.o;
        }),
        e.d(n, "symbolCross", function () {
          return S.p;
        }),
        e.d(n, "symbolDiamond", function () {
          return S.q;
        }),
        e.d(n, "symbolSquare", function () {
          return S.r;
        }),
        e.d(n, "symbolStar", function () {
          return S.s;
        }),
        e.d(n, "symbolTriangle", function () {
          return S.t;
        }),
        e.d(n, "symbolWye", function () {
          return S.u;
        }),
        e.d(n, "curveBasisClosed", function () {
          return S.v;
        }),
        e.d(n, "curveBasisOpen", function () {
          return S.w;
        }),
        e.d(n, "curveBasis", function () {
          return S.x;
        }),
        e.d(n, "curveBundle", function () {
          return S.y;
        }),
        e.d(n, "curveCardinalClosed", function () {
          return S.z;
        }),
        e.d(n, "curveCardinalOpen", function () {
          return S.A;
        }),
        e.d(n, "curveCardinal", function () {
          return S.B;
        }),
        e.d(n, "curveCatmullRomClosed", function () {
          return S.C;
        }),
        e.d(n, "curveCatmullRomOpen", function () {
          return S.D;
        }),
        e.d(n, "curveCatmullRom", function () {
          return S.E;
        }),
        e.d(n, "curveLinearClosed", function () {
          return S.F;
        }),
        e.d(n, "curveLinear", function () {
          return S.G;
        }),
        e.d(n, "curveMonotoneX", function () {
          return S.H;
        }),
        e.d(n, "curveMonotoneY", function () {
          return S.I;
        }),
        e.d(n, "curveNatural", function () {
          return S.J;
        }),
        e.d(n, "curveStep", function () {
          return S.K;
        }),
        e.d(n, "curveStepAfter", function () {
          return S.L;
        }),
        e.d(n, "curveStepBefore", function () {
          return S.M;
        }),
        e.d(n, "stack", function () {
          return S.N;
        }),
        e.d(n, "stackOffsetExpand", function () {
          return S.O;
        }),
        e.d(n, "stackOffsetDiverging", function () {
          return S.P;
        }),
        e.d(n, "stackOffsetNone", function () {
          return S.Q;
        }),
        e.d(n, "stackOffsetSilhouette", function () {
          return S.R;
        }),
        e.d(n, "stackOffsetWiggle", function () {
          return S.S;
        }),
        e.d(n, "stackOrderAscending", function () {
          return S.T;
        }),
        e.d(n, "stackOrderDescending", function () {
          return S.U;
        }),
        e.d(n, "stackOrderInsideOut", function () {
          return S.V;
        }),
        e.d(n, "stackOrderNone", function () {
          return S.W;
        }),
        e.d(n, "stackOrderReverse", function () {
          return S.X;
        });
      var T = e(52);
      e.d(n, "timeInterval", function () {
        return T.a;
      }),
        e.d(n, "timeMillisecond", function () {
          return T.b;
        }),
        e.d(n, "timeMilliseconds", function () {
          return T.c;
        }),
        e.d(n, "utcMillisecond", function () {
          return T.d;
        }),
        e.d(n, "utcMilliseconds", function () {
          return T.e;
        }),
        e.d(n, "timeSecond", function () {
          return T.f;
        }),
        e.d(n, "timeSeconds", function () {
          return T.g;
        }),
        e.d(n, "utcSecond", function () {
          return T.h;
        }),
        e.d(n, "utcSeconds", function () {
          return T.i;
        }),
        e.d(n, "timeMinute", function () {
          return T.j;
        }),
        e.d(n, "timeMinutes", function () {
          return T.k;
        }),
        e.d(n, "timeHour", function () {
          return T.l;
        }),
        e.d(n, "timeHours", function () {
          return T.m;
        }),
        e.d(n, "timeDay", function () {
          return T.n;
        }),
        e.d(n, "timeDays", function () {
          return T.o;
        }),
        e.d(n, "timeWeek", function () {
          return T.p;
        }),
        e.d(n, "timeWeeks", function () {
          return T.q;
        }),
        e.d(n, "timeSunday", function () {
          return T.r;
        }),
        e.d(n, "timeSundays", function () {
          return T.s;
        }),
        e.d(n, "timeMonday", function () {
          return T.t;
        }),
        e.d(n, "timeMondays", function () {
          return T.u;
        }),
        e.d(n, "timeTuesday", function () {
          return T.v;
        }),
        e.d(n, "timeTuesdays", function () {
          return T.w;
        }),
        e.d(n, "timeWednesday", function () {
          return T.x;
        }),
        e.d(n, "timeWednesdays", function () {
          return T.y;
        }),
        e.d(n, "timeThursday", function () {
          return T.z;
        }),
        e.d(n, "timeThursdays", function () {
          return T.A;
        }),
        e.d(n, "timeFriday", function () {
          return T.B;
        }),
        e.d(n, "timeFridays", function () {
          return T.C;
        }),
        e.d(n, "timeSaturday", function () {
          return T.D;
        }),
        e.d(n, "timeSaturdays", function () {
          return T.E;
        }),
        e.d(n, "timeMonth", function () {
          return T.F;
        }),
        e.d(n, "timeMonths", function () {
          return T.G;
        }),
        e.d(n, "timeYear", function () {
          return T.H;
        }),
        e.d(n, "timeYears", function () {
          return T.I;
        }),
        e.d(n, "utcMinute", function () {
          return T.J;
        }),
        e.d(n, "utcMinutes", function () {
          return T.K;
        }),
        e.d(n, "utcHour", function () {
          return T.L;
        }),
        e.d(n, "utcHours", function () {
          return T.M;
        }),
        e.d(n, "utcDay", function () {
          return T.N;
        }),
        e.d(n, "utcDays", function () {
          return T.O;
        }),
        e.d(n, "utcWeek", function () {
          return T.P;
        }),
        e.d(n, "utcWeeks", function () {
          return T.Q;
        }),
        e.d(n, "utcSunday", function () {
          return T.R;
        }),
        e.d(n, "utcSundays", function () {
          return T.S;
        }),
        e.d(n, "utcMonday", function () {
          return T.T;
        }),
        e.d(n, "utcMondays", function () {
          return T.U;
        }),
        e.d(n, "utcTuesday", function () {
          return T.V;
        }),
        e.d(n, "utcTuesdays", function () {
          return T.W;
        }),
        e.d(n, "utcWednesday", function () {
          return T.X;
        }),
        e.d(n, "utcWednesdays", function () {
          return T.Y;
        }),
        e.d(n, "utcThursday", function () {
          return T.Z;
        }),
        e.d(n, "utcThursdays", function () {
          return T._0;
        }),
        e.d(n, "utcFriday", function () {
          return T._1;
        }),
        e.d(n, "utcFridays", function () {
          return T._2;
        }),
        e.d(n, "utcSaturday", function () {
          return T._3;
        }),
        e.d(n, "utcSaturdays", function () {
          return T._4;
        }),
        e.d(n, "utcMonth", function () {
          return T._5;
        }),
        e.d(n, "utcMonths", function () {
          return T._6;
        }),
        e.d(n, "utcYear", function () {
          return T._7;
        }),
        e.d(n, "utcYears", function () {
          return T._8;
        });
      var E = e(94);
      e.d(n, "timeFormatDefaultLocale", function () {
        return E.a;
      }),
        e.d(n, "timeFormat", function () {
          return E.b;
        }),
        e.d(n, "timeParse", function () {
          return E.c;
        }),
        e.d(n, "utcFormat", function () {
          return E.d;
        }),
        e.d(n, "utcParse", function () {
          return E.e;
        }),
        e.d(n, "timeFormatLocale", function () {
          return E.f;
        }),
        e.d(n, "isoFormat", function () {
          return E.g;
        }),
        e.d(n, "isoParse", function () {
          return E.h;
        });
      var C = e(53);
      e.d(n, "now", function () {
        return C.a;
      }),
        e.d(n, "timer", function () {
          return C.b;
        }),
        e.d(n, "timerFlush", function () {
          return C.c;
        }),
        e.d(n, "timeout", function () {
          return C.d;
        }),
        e.d(n, "interval", function () {
          return C.e;
        });
      var P = e(97);
      e.d(n, "transition", function () {
        return P.a;
      }),
        e.d(n, "active", function () {
          return P.b;
        }),
        e.d(n, "interrupt", function () {
          return P.c;
        });
      var z = e(526);
      e.d(n, "voronoi", function () {
        return z.a;
      });
      var R = e(531);
      e.d(n, "zoom", function () {
        return R.a;
      }),
        e.d(n, "zoomTransform", function () {
          return R.b;
        }),
        e.d(n, "zoomIdentity", function () {
          return R.c;
        });
    },
    function (t, n, e) {
      "use strict";
      function r() {
        for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
        console.error.apply(console, arguments);
      }
      function i() {
        for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
      }
      Object.defineProperty(n, "__esModule", { value: !0 }), (n.error = r), (n.warn = i);
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return i;
      }),
        e.d(n, "a", function () {
          return u;
        });
      var r = Array.prototype,
        i = r.slice,
        u = r.map;
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return a;
      }),
        e.d(n, "c", function () {
          return o;
        });
      var r = e(19),
        i = e(104),
        u = e.i(i.a)(r.a),
        a = u.right,
        o = u.left;
      n.a = a;
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return function (n, r) {
          return e.i(i.a)(t(n), r);
        };
      }
      var i = e(19);
      n.a = function (t) {
        return (
          1 === t.length && (t = r(t)),
          {
            left: function (n, e, r, i) {
              for (null == r && (r = 0), null == i && (i = n.length); r < i; ) {
                var u = (r + i) >>> 1;
                t(n[u], e) < 0 ? (r = u + 1) : (i = u);
              }
              return r;
            },
            right: function (n, e, r, i) {
              for (null == r && (r = 0), null == i && (i = n.length); r < i; ) {
                var u = (r + i) >>> 1;
                t(n[u], e) > 0 ? (i = u) : (r = u + 1);
              }
              return r;
            },
          }
        );
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(113);
      n.a = function (t, n) {
        var i = e.i(r.a)(t, n);
        return i ? Math.sqrt(i) : i;
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t, n) {
        var e,
          r,
          i,
          u = t.length,
          a = -1;
        if (null == n) {
          for (; ++a < u; )
            if (null != (e = t[a]) && e >= e)
              for (r = i = e; ++a < u; ) null != (e = t[a]) && (r > e && (r = e), i < e && (i = e));
        } else
          for (; ++a < u; )
            if (null != (e = n(t[a], a, t)) && e >= e)
              for (r = i = e; ++a < u; ) null != (e = n(t[a], a, t)) && (r > e && (r = e), i < e && (i = e));
        return [r, i];
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t, n) {
        var e,
          r,
          i = t.length,
          u = -1;
        if (null == n) {
          for (; ++u < i; )
            if (null != (e = t[u]) && e >= e) for (r = e; ++u < i; ) null != (e = t[u]) && r > e && (r = e);
        } else
          for (; ++u < i; )
            if (null != (e = n(t[u], u, t)) && e >= e)
              for (r = e; ++u < i; ) null != (e = n(t[u], u, t)) && r > e && (r = e);
        return r;
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        return [t, n];
      }
      (n.b = r),
        (n.a = function (t, n) {
          null == n && (n = r);
          for (var e = 0, i = t.length - 1, u = t[0], a = new Array(i < 0 ? 0 : i); e < i; ) a[e] = n(u, (u = t[++e]));
          return a;
        });
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t, n, e) {
        (t = +t), (n = +n), (e = (i = arguments.length) < 2 ? ((n = t), (t = 0), 1) : i < 3 ? 1 : +e);
        for (var r = -1, i = 0 | Math.max(0, Math.ceil((n - t) / e)), u = new Array(i); ++r < i; ) u[r] = t + r * e;
        return u;
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t) {
        return Math.ceil(Math.log(t.length) / Math.LN2) + 1;
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t, n, e) {
        var r = (n - t) / Math.max(0, e),
          i = Math.floor(Math.log(r) / Math.LN10),
          c = r / Math.pow(10, i);
        return i >= 0
          ? (c >= u ? 10 : c >= a ? 5 : c >= o ? 2 : 1) * Math.pow(10, i)
          : -Math.pow(10, -i) / (c >= u ? 10 : c >= a ? 5 : c >= o ? 2 : 1);
      }
      function i(t, n, e) {
        var r = Math.abs(n - t) / Math.max(0, e),
          i = Math.pow(10, Math.floor(Math.log(r) / Math.LN10)),
          c = r / i;
        return c >= u ? (i *= 10) : c >= a ? (i *= 5) : c >= o && (i *= 2), n < t ? -i : i;
      }
      (n.b = r), (n.c = i);
      var u = Math.sqrt(50),
        a = Math.sqrt(10),
        o = Math.sqrt(2);
      n.a = function (t, n, e) {
        var i,
          u,
          a,
          o,
          c = -1;
        if (((n = +n), (t = +t), (e = +e), t === n && e > 0)) return [t];
        if (((i = n < t) && ((u = t), (t = n), (n = u)), 0 === (o = r(t, n, e)) || !isFinite(o))) return [];
        if (o > 0)
          for (t = Math.ceil(t / o), n = Math.floor(n / o), a = new Array((u = Math.ceil(n - t + 1))); ++c < u; )
            a[c] = (t + c) * o;
        else
          for (t = Math.floor(t * o), n = Math.ceil(n * o), a = new Array((u = Math.ceil(t - n + 1))); ++c < u; )
            a[c] = (t - c) / o;
        return i && a.reverse(), a;
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return t.length;
      }
      var i = e(107);
      n.a = function (t) {
        if (!(o = t.length)) return [];
        for (var n = -1, u = e.i(i.a)(t, r), a = new Array(u); ++n < u; )
          for (var o, c = -1, f = (a[n] = new Array(o)); ++c < o; ) f[c] = t[c][n];
        return a;
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(24);
      n.a = function (t, n) {
        var i,
          u,
          a = t.length,
          o = 0,
          c = -1,
          f = 0,
          s = 0;
        if (null == n)
          for (; ++c < a; ) isNaN((i = e.i(r.a)(t[c]))) || ((u = i - f), (f += u / ++o), (s += u * (i - f)));
        else
          for (; ++c < a; ) isNaN((i = e.i(r.a)(n(t[c], c, t)))) || ((u = i - f), (f += u / ++o), (s += u * (i - f)));
        if (o > 1) return s / (o - 1);
      };
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return r;
      }),
        e.d(n, "c", function () {
          return i;
        }),
        e.d(n, "a", function () {
          return a;
        }),
        e.d(n, "e", function () {
          return o;
        }),
        e.d(n, "d", function () {
          return c;
        });
      var r = Math.cos,
        i = Math.sin,
        u = Math.PI,
        a = u / 2,
        o = 2 * u,
        c = Math.max;
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return r;
      }),
        e.d(n, "a", function () {
          return i;
        });
      var r = Math.PI / 180,
        i = 180 / Math.PI;
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        var r = t.document.documentElement,
          a = e.i(i.i)(t).on("dragstart.drag", null);
        n &&
          (a.on("click.drag", u.a, !0),
          setTimeout(function () {
            a.on("click.drag", null);
          }, 0)),
          "onselectstart" in r
            ? a.on("selectstart.drag", null)
            : ((r.style.MozUserSelect = r.__noselect), delete r.__noselect);
      }
      n.b = r;
      var i = e(3),
        u = e(117);
      n.a = function (t) {
        var n = t.document.documentElement,
          r = e.i(i.i)(t).on("dragstart.drag", u.a, !0);
        "onselectstart" in n
          ? r.on("selectstart.drag", u.a, !0)
          : ((n.__noselect = n.style.MozUserSelect), (n.style.MozUserSelect = "none"));
      };
    },
    function (t, n, e) {
      "use strict";
      function r() {
        i.r.stopImmediatePropagation();
      }
      n.b = r;
      var i = e(3);
      n.a = function () {
        i.r.preventDefault(), i.r.stopImmediatePropagation();
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(246);
      e.d(n, "a", function () {
        return r.a;
      });
      var i = e(248);
      e.d(n, "b", function () {
        return i.a;
      }),
        e.d(n, "c", function () {
          return i.b;
        }),
        e.d(n, "d", function () {
          return i.c;
        }),
        e.d(n, "e", function () {
          return i.a;
        });
      var u = e(243);
      e.d(n, "f", function () {
        return u.a;
      }),
        e.d(n, "g", function () {
          return u.b;
        }),
        e.d(n, "h", function () {
          return u.c;
        }),
        e.d(n, "i", function () {
          return u.a;
        });
      var a = e(247);
      e.d(n, "j", function () {
        return a.a;
      }),
        e.d(n, "k", function () {
          return a.b;
        }),
        e.d(n, "l", function () {
          return a.c;
        }),
        e.d(n, "m", function () {
          return a.a;
        });
      var o = e(249);
      e.d(n, "n", function () {
        return o.a;
      }),
        e.d(n, "o", function () {
          return o.b;
        }),
        e.d(n, "p", function () {
          return o.c;
        }),
        e.d(n, "q", function () {
          return o.a;
        });
      var c = e(245);
      e.d(n, "r", function () {
        return c.a;
      }),
        e.d(n, "s", function () {
          return c.b;
        }),
        e.d(n, "t", function () {
          return c.c;
        }),
        e.d(n, "u", function () {
          return c.a;
        });
      var f = e(242);
      e.d(n, "v", function () {
        return f.a;
      }),
        e.d(n, "w", function () {
          return f.b;
        }),
        e.d(n, "x", function () {
          return f.c;
        }),
        e.d(n, "y", function () {
          return f.a;
        });
      var s = e(241);
      e.d(n, "z", function () {
        return s.a;
      }),
        e.d(n, "A", function () {
          return s.b;
        }),
        e.d(n, "B", function () {
          return s.a;
        }),
        e.d(n, "C", function () {
          return s.c;
        });
      var l = e(240);
      e.d(n, "D", function () {
        return l.a;
      }),
        e.d(n, "E", function () {
          return l.b;
        }),
        e.d(n, "F", function () {
          return l.c;
        }),
        e.d(n, "G", function () {
          return l.a;
        });
      var h = e(244);
      e.d(n, "H", function () {
        return h.a;
      }),
        e.d(n, "I", function () {
          return h.b;
        }),
        e.d(n, "J", function () {
          return h.a;
        }),
        e.d(n, "K", function () {
          return h.c;
        });
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return t.x;
      }
      function i(t) {
        return t.y;
      }
      (n.b = r), (n.c = i);
      var u = e(14),
        a = e(25),
        o = e(53),
        c = Math.PI * (3 - Math.sqrt(5));
      n.a = function (t) {
        function n() {
          r(), y.call("tick", s), l < h && (g.stop(), y.call("end", s));
        }
        function r() {
          var n,
            e,
            r = t.length;
          for (
            l += (p - l) * d,
              b.each(function (t) {
                t(l);
              }),
              n = 0;
            n < r;
            ++n
          )
            (e = t[n]),
              null == e.fx ? (e.x += e.vx *= v) : ((e.x = e.fx), (e.vx = 0)),
              null == e.fy ? (e.y += e.vy *= v) : ((e.y = e.fy), (e.vy = 0));
        }
        function i() {
          for (var n, e = 0, r = t.length; e < r; ++e) {
            if (((n = t[e]), (n.index = e), isNaN(n.x) || isNaN(n.y))) {
              var i = 10 * Math.sqrt(e),
                u = e * c;
              (n.x = i * Math.cos(u)), (n.y = i * Math.sin(u));
            }
            (isNaN(n.vx) || isNaN(n.vy)) && (n.vx = n.vy = 0);
          }
        }
        function f(n) {
          return n.initialize && n.initialize(t), n;
        }
        var s,
          l = 1,
          h = 0.001,
          d = 1 - Math.pow(h, 1 / 300),
          p = 0,
          v = 0.6,
          b = e.i(a.c)(),
          g = e.i(o.b)(n),
          y = e.i(u.a)("tick", "end");
        return (
          null == t && (t = []),
          i(),
          (s = {
            tick: r,
            restart: function () {
              return g.restart(n), s;
            },
            stop: function () {
              return g.stop(), s;
            },
            nodes: function (n) {
              return arguments.length ? ((t = n), i(), b.each(f), s) : t;
            },
            alpha: function (t) {
              return arguments.length ? ((l = +t), s) : l;
            },
            alphaMin: function (t) {
              return arguments.length ? ((h = +t), s) : h;
            },
            alphaDecay: function (t) {
              return arguments.length ? ((d = +t), s) : +d;
            },
            alphaTarget: function (t) {
              return arguments.length ? ((p = +t), s) : p;
            },
            velocityDecay: function (t) {
              return arguments.length ? ((v = 1 - t), s) : 1 - v;
            },
            force: function (t, n) {
              return arguments.length > 1 ? (null == n ? b.remove(t) : b.set(t, f(n)), s) : b.get(t);
            },
            find: function (n, e, r) {
              var i,
                u,
                a,
                o,
                c,
                f = 0,
                s = t.length;
              for (null == r ? (r = 1 / 0) : (r *= r), f = 0; f < s; ++f)
                (o = t[f]), (i = n - o.x), (u = e - o.y), (a = i * i + u * u) < r && ((c = o), (r = a));
              return c;
            },
            on: function (t, n) {
              return arguments.length > 1 ? (y.on(t, n), s) : y.on(t);
            },
          })
        );
      };
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return r;
      });
      var r,
        i = e(65);
      n.a = function (t, n) {
        var u = e.i(i.a)(t, n);
        if (!u) return t + "";
        var a = u[0],
          o = u[1],
          c = o - (r = 3 * Math.max(-8, Math.min(8, Math.floor(o / 3)))) + 1,
          f = a.length;
        return c === f
          ? a
          : c > f
          ? a + new Array(c - f + 1).join("0")
          : c > 0
          ? a.slice(0, c) + "." + a.slice(c)
          : "0." + new Array(1 - c).join("0") + e.i(i.a)(t, Math.max(0, n + c - 1))[0];
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return new i(t);
      }
      function i(t) {
        if (!(n = a.exec(t))) throw new Error("invalid format: " + t);
        var n,
          e = n[1] || " ",
          r = n[2] || ">",
          i = n[3] || "-",
          o = n[4] || "",
          c = !!n[5],
          f = n[6] && +n[6],
          s = !!n[7],
          l = n[8] && +n[8].slice(1),
          h = n[9] || "";
        "n" === h ? ((s = !0), (h = "g")) : u.a[h] || (h = ""),
          (c || ("0" === e && "=" === r)) && ((c = !0), (e = "0"), (r = "=")),
          (this.fill = e),
          (this.align = r),
          (this.sign = i),
          (this.symbol = o),
          (this.zero = c),
          (this.width = f),
          (this.comma = s),
          (this.precision = l),
          (this.type = h);
      }
      n.a = r;
      var u = e(122),
        a = /^(?:(.)?([<>=^]))?([+\-\( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?([a-z%])?$/i;
      (r.prototype = i.prototype),
        (i.prototype.toString = function () {
          return (
            this.fill +
            this.align +
            this.sign +
            this.symbol +
            (this.zero ? "0" : "") +
            (null == this.width ? "" : Math.max(1, 0 | this.width)) +
            (this.comma ? "," : "") +
            (null == this.precision ? "" : "." + Math.max(0, 0 | this.precision)) +
            this.type
          );
        });
    },
    function (t, n, e) {
      "use strict";
      var r = e(259),
        i = e(120),
        u = e(262);
      n.a = {
        "": r.a,
        "%": function (t, n) {
          return (100 * t).toFixed(n);
        },
        b: function (t) {
          return Math.round(t).toString(2);
        },
        c: function (t) {
          return t + "";
        },
        d: function (t) {
          return Math.round(t).toString(10);
        },
        e: function (t, n) {
          return t.toExponential(n);
        },
        f: function (t, n) {
          return t.toFixed(n);
        },
        g: function (t, n) {
          return t.toPrecision(n);
        },
        o: function (t) {
          return Math.round(t).toString(8);
        },
        p: function (t, n) {
          return e.i(u.a)(100 * t, n);
        },
        r: u.a,
        s: i.a,
        X: function (t) {
          return Math.round(t).toString(16).toUpperCase();
        },
        x: function (t) {
          return Math.round(t).toString(16);
        },
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(37),
        i = e(260),
        u = e(261),
        a = e(121),
        o = e(122),
        c = e(120),
        f = e(263),
        s = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
      n.a = function (t) {
        function n(t) {
          function n(t) {
            var n,
              e,
              a,
              o = x,
              f = w;
            if ("c" === m) (f = M(t) + f), (t = "");
            else {
              t = +t;
              var d = t < 0;
              if (
                ((t = M(Math.abs(t), _)),
                d && 0 == +t && (d = !1),
                (o = (d ? ("(" === u ? u : "-") : "-" === u || "(" === u ? "" : u) + o),
                (f = ("s" === m ? s[8 + c.b / 3] : "") + f + (d && "(" === u ? ")" : "")),
                k)
              )
                for (n = -1, e = t.length; ++n < e; )
                  if (48 > (a = t.charCodeAt(n)) || a > 57) {
                    (f = (46 === a ? p + t.slice(n + 1) : t.slice(n)) + f), (t = t.slice(0, n));
                    break;
                  }
            }
            y && !l && (t = h(t, 1 / 0));
            var b = o.length + t.length + f.length,
              N = b < g ? new Array(g - b + 1).join(r) : "";
            switch ((y && l && ((t = h(N + t, N.length ? g - f.length : 1 / 0)), (N = "")), i)) {
              case "<":
                t = o + t + f + N;
                break;
              case "=":
                t = o + N + t + f;
                break;
              case "^":
                t = N.slice(0, (b = N.length >> 1)) + o + t + f + N.slice(b);
                break;
              default:
                t = N + o + t + f;
            }
            return v(t);
          }
          t = e.i(a.a)(t);
          var r = t.fill,
            i = t.align,
            u = t.sign,
            f = t.symbol,
            l = t.zero,
            g = t.width,
            y = t.comma,
            _ = t.precision,
            m = t.type,
            x = "$" === f ? d[0] : "#" === f && /[boxX]/.test(m) ? "0" + m.toLowerCase() : "",
            w = "$" === f ? d[1] : /[%p]/.test(m) ? b : "",
            M = o.a[m],
            k = !m || /[defgprs%]/.test(m);
          return (
            (_ =
              null == _
                ? m
                  ? 6
                  : 12
                : /[gprs]/.test(m)
                ? Math.max(1, Math.min(21, _))
                : Math.max(0, Math.min(20, _))),
            (n.toString = function () {
              return t + "";
            }),
            n
          );
        }
        function l(t, i) {
          var u = n(((t = e.i(a.a)(t)), (t.type = "f"), t)),
            o = 3 * Math.max(-8, Math.min(8, Math.floor(e.i(r.a)(i) / 3))),
            c = Math.pow(10, -o),
            f = s[8 + o / 3];
          return function (t) {
            return u(c * t) + f;
          };
        }
        var h = t.grouping && t.thousands ? e.i(i.a)(t.grouping, t.thousands) : f.a,
          d = t.currency,
          p = t.decimal,
          v = t.numerals ? e.i(u.a)(t.numerals) : f.a,
          b = t.percent || "%";
        return { format: n, formatPrefix: l };
      };
    },
    function (t, n, e) {
      "use strict";
      function r() {
        y.point = u;
      }
      function i() {
        a(o, c);
      }
      function u(t, n) {
        (y.point = a),
          (o = t),
          (c = n),
          (t *= d.g),
          (n *= d.g),
          (f = t),
          (s = e.i(d.c)((n = n / 2 + d.v))),
          (l = e.i(d.d)(n));
      }
      function a(t, n) {
        (t *= d.g), (n *= d.g), (n = n / 2 + d.v);
        var r = t - f,
          i = r >= 0 ? 1 : -1,
          u = i * r,
          a = e.i(d.c)(n),
          o = e.i(d.d)(n),
          c = l * o,
          h = s * a + c * e.i(d.c)(u),
          p = c * i * e.i(d.d)(u);
        b.add(e.i(d.e)(p, h)), (f = t), (s = a), (l = o);
      }
      e.d(n, "c", function () {
        return b;
      }),
        e.d(n, "b", function () {
          return y;
        });
      var o,
        c,
        f,
        s,
        l,
        h = e(21),
        d = e(0),
        p = e(12),
        v = e(15),
        b = e.i(h.a)(),
        g = e.i(h.a)(),
        y = {
          point: p.a,
          lineStart: p.a,
          lineEnd: p.a,
          polygonStart: function () {
            b.reset(), (y.lineStart = r), (y.lineEnd = i);
          },
          polygonEnd: function () {
            var t = +b;
            g.add(t < 0 ? d.b + t : t), (this.lineStart = this.lineEnd = this.point = p.a);
          },
          sphere: function () {
            g.add(d.b);
          },
        };
      n.a = function (t) {
        return g.reset(), e.i(v.a)(t, y), 2 * g;
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t, n, r, a, c, f) {
        if (r) {
          var s = e.i(o.c)(n),
            l = e.i(o.d)(n),
            h = a * r;
          null == c
            ? ((c = n + a * o.b), (f = n - h / 2))
            : ((c = i(s, c)), (f = i(s, f)), (a > 0 ? c < f : c > f) && (c += a * o.b));
          for (var d, p = c; a > 0 ? p > f : p < f; p -= h)
            (d = e.i(u.g)([s, -l * e.i(o.c)(p), -l * e.i(o.d)(p)])), t.point(d[0], d[1]);
        }
      }
      function i(t, n) {
        (n = e.i(u.a)(n)), (n[0] -= t), e.i(u.c)(n);
        var r = e.i(o.s)(-n[1]);
        return ((-n[2] < 0 ? -r : r) + o.b - o.o) % o.b;
      }
      n.b = r;
      var u = e(26),
        a = e(272),
        o = e(0),
        c = e(39);
      n.a = function () {
        function t(t, n) {
          i.push((t = u(t, n))), (t[0] *= o.h), (t[1] *= o.h);
        }
        function n() {
          var t = f.apply(this, arguments),
            n = s.apply(this, arguments) * o.g,
            a = l.apply(this, arguments) * o.g;
          return (
            (i = []),
            (u = e.i(c.b)(-t[0] * o.g, -t[1] * o.g, 0).invert),
            r(h, n, a, 1),
            (t = { type: "Polygon", coordinates: [i] }),
            (i = u = null),
            t
          );
        }
        var i,
          u,
          f = e.i(a.a)([0, 0]),
          s = e.i(a.a)(90),
          l = e.i(a.a)(6),
          h = { point: t };
        return (
          (n.center = function (t) {
            return arguments.length ? ((f = "function" == typeof t ? t : e.i(a.a)([+t[0], +t[1]])), n) : f;
          }),
          (n.radius = function (t) {
            return arguments.length ? ((s = "function" == typeof t ? t : e.i(a.a)(+t)), n) : s;
          }),
          (n.precision = function (t) {
            return arguments.length ? ((l = "function" == typeof t ? t : e.i(a.a)(+t)), n) : l;
          }),
          n
        );
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        var n,
          r = NaN,
          u = NaN,
          a = NaN;
        return {
          lineStart: function () {
            t.lineStart(), (n = 1);
          },
          point: function (c, f) {
            var s = c > 0 ? o.a : -o.a,
              l = e.i(o.p)(c - r);
            e.i(o.p)(l - o.a) < o.o
              ? (t.point(r, (u = (u + f) / 2 > 0 ? o.k : -o.k)),
                t.point(a, u),
                t.lineEnd(),
                t.lineStart(),
                t.point(s, u),
                t.point(c, u),
                (n = 0))
              : a !== s &&
                l >= o.a &&
                (e.i(o.p)(r - a) < o.o && (r -= a * o.o),
                e.i(o.p)(c - s) < o.o && (c -= s * o.o),
                (u = i(r, u, c, f)),
                t.point(a, u),
                t.lineEnd(),
                t.lineStart(),
                t.point(s, u),
                (n = 0)),
              t.point((r = c), (u = f)),
              (a = s);
          },
          lineEnd: function () {
            t.lineEnd(), (r = u = NaN);
          },
          clean: function () {
            return 2 - n;
          },
        };
      }
      function i(t, n, r, i) {
        var u,
          a,
          c = e.i(o.d)(t - r);
        return e.i(o.p)(c) > o.o
          ? e.i(o.l)(
              (e.i(o.d)(n) * (a = e.i(o.c)(i)) * e.i(o.d)(r) - e.i(o.d)(i) * (u = e.i(o.c)(n)) * e.i(o.d)(t)) /
                (u * a * c)
            )
          : (n + i) / 2;
      }
      function u(t, n, r, i) {
        var u;
        if (null == t)
          (u = r * o.k),
            i.point(-o.a, u),
            i.point(0, u),
            i.point(o.a, u),
            i.point(o.a, 0),
            i.point(o.a, -u),
            i.point(0, -u),
            i.point(-o.a, -u),
            i.point(-o.a, 0),
            i.point(-o.a, u);
        else if (e.i(o.p)(t[0] - n[0]) > o.o) {
          var a = t[0] < n[0] ? o.a : -o.a;
          (u = (r * a) / 2), i.point(-a, u), i.point(0, u), i.point(a, u);
        } else i.point(n[0], n[1]);
      }
      var a = e(129),
        o = e(0);
      n.a = e.i(a.a)(
        function () {
          return !0;
        },
        r,
        u,
        [-o.a, -o.k]
      );
    },
    function (t, n, e) {
      "use strict";
      var r = e(12);
      n.a = function () {
        var t,
          n = [];
        return {
          point: function (n, e) {
            t.push([n, e]);
          },
          lineStart: function () {
            n.push((t = []));
          },
          lineEnd: r.a,
          rejoin: function () {
            n.length > 1 && n.push(n.pop().concat(n.shift()));
          },
          result: function () {
            var e = n;
            return (n = []), (t = null), e;
          },
        };
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(26),
        i = e(125),
        u = e(0),
        a = e(135),
        o = e(129);
      n.a = function (t) {
        function n(n, r, u, a) {
          e.i(i.b)(a, t, d, u, n, r);
        }
        function c(t, n) {
          return e.i(u.c)(t) * e.i(u.c)(n) > h;
        }
        function f(t) {
          var n, r, i, o, f;
          return {
            lineStart: function () {
              (o = i = !1), (f = 1);
            },
            point: function (h, d) {
              var b,
                g = [h, d],
                y = c(h, d),
                _ = p ? (y ? 0 : l(h, d)) : y ? l(h + (h < 0 ? u.a : -u.a), d) : 0;
              if (
                (!n && (o = i = y) && t.lineStart(),
                y !== i &&
                  (!(b = s(n, g)) || e.i(a.a)(n, b) || e.i(a.a)(g, b)) &&
                  ((g[0] += u.o), (g[1] += u.o), (y = c(g[0], g[1]))),
                y !== i)
              )
                (f = 0),
                  y
                    ? (t.lineStart(), (b = s(g, n)), t.point(b[0], b[1]))
                    : ((b = s(n, g)), t.point(b[0], b[1]), t.lineEnd()),
                  (n = b);
              else if (v && n && p ^ y) {
                var m;
                _ & r ||
                  !(m = s(g, n, !0)) ||
                  ((f = 0),
                  p
                    ? (t.lineStart(), t.point(m[0][0], m[0][1]), t.point(m[1][0], m[1][1]), t.lineEnd())
                    : (t.point(m[1][0], m[1][1]), t.lineEnd(), t.lineStart(), t.point(m[0][0], m[0][1])));
              }
              !y || (n && e.i(a.a)(n, g)) || t.point(g[0], g[1]), (n = g), (i = y), (r = _);
            },
            lineEnd: function () {
              i && t.lineEnd(), (n = null);
            },
            clean: function () {
              return f | ((o && i) << 1);
            },
          };
        }
        function s(t, n, i) {
          var a = e.i(r.a)(t),
            o = e.i(r.a)(n),
            c = [1, 0, 0],
            f = e.i(r.b)(a, o),
            s = e.i(r.d)(f, f),
            l = f[0],
            d = s - l * l;
          if (!d) return !i && t;
          var p = (h * s) / d,
            v = (-h * l) / d,
            b = e.i(r.b)(c, f),
            g = e.i(r.e)(c, p),
            y = e.i(r.e)(f, v);
          e.i(r.f)(g, y);
          var _ = b,
            m = e.i(r.d)(g, _),
            x = e.i(r.d)(_, _),
            w = m * m - x * (e.i(r.d)(g, g) - 1);
          if (!(w < 0)) {
            var M = e.i(u.n)(w),
              k = e.i(r.e)(_, (-m - M) / x);
            if ((e.i(r.f)(k, g), (k = e.i(r.g)(k)), !i)) return k;
            var N,
              A = t[0],
              S = n[0],
              T = t[1],
              E = n[1];
            S < A && ((N = A), (A = S), (S = N));
            var C = S - A,
              P = e.i(u.p)(C - u.a) < u.o,
              z = P || C < u.o;
            if (
              (!P && E < T && ((N = T), (T = E), (E = N)),
              z
                ? P
                  ? (T + E > 0) ^ (k[1] < (e.i(u.p)(k[0] - A) < u.o ? T : E))
                  : T <= k[1] && k[1] <= E
                : (C > u.a) ^ (A <= k[0] && k[0] <= S))
            ) {
              var R = e.i(r.e)(_, (-m + M) / x);
              return e.i(r.f)(R, g), [k, e.i(r.g)(R)];
            }
          }
        }
        function l(n, e) {
          var r = p ? t : u.a - t,
            i = 0;
          return n < -r ? (i |= 1) : n > r && (i |= 2), e < -r ? (i |= 4) : e > r && (i |= 8), i;
        }
        var h = e.i(u.c)(t),
          d = 6 * u.g,
          p = h > 0,
          v = e.i(u.p)(h) > u.o;
        return e.i(o.a)(c, f, n, p ? [0, -t] : [-u.a, t - u.a]);
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return t.length > 1;
      }
      function i(t, n) {
        return ((t = t.x)[0] < 0 ? t[1] - o.k - o.o : o.k - t[1]) - ((n = n.x)[0] < 0 ? n[1] - o.k - o.o : o.k - n[1]);
      }
      var u = e(127),
        a = e(130),
        o = e(0),
        c = e(136),
        f = e(5);
      n.a = function (t, n, o, s) {
        return function (l) {
          function h(n, e) {
            t(n, e) && l.point(n, e);
          }
          function d(t, n) {
            w.point(t, n);
          }
          function p() {
            (A.point = d), w.lineStart();
          }
          function v() {
            (A.point = h), w.lineEnd();
          }
          function b(t, n) {
            x.push([t, n]), k.point(t, n);
          }
          function g() {
            k.lineStart(), (x = []);
          }
          function y() {
            b(x[0][0], x[0][1]), k.lineEnd();
            var t,
              n,
              e,
              i,
              u = k.clean(),
              a = M.result(),
              o = a.length;
            if ((x.pop(), _.push(x), (x = null), o))
              if (1 & u) {
                if (((e = a[0]), (n = e.length - 1) > 0)) {
                  for (N || (l.polygonStart(), (N = !0)), l.lineStart(), t = 0; t < n; ++t)
                    l.point((i = e[t])[0], i[1]);
                  l.lineEnd();
                }
              } else o > 1 && 2 & u && a.push(a.pop().concat(a.shift())), m.push(a.filter(r));
          }
          var _,
            m,
            x,
            w = n(l),
            M = e.i(u.a)(),
            k = n(M),
            N = !1,
            A = {
              point: h,
              lineStart: p,
              lineEnd: v,
              polygonStart: function () {
                (A.point = b), (A.lineStart = g), (A.lineEnd = y), (m = []), (_ = []);
              },
              polygonEnd: function () {
                (A.point = h), (A.lineStart = p), (A.lineEnd = v), (m = e.i(f.q)(m));
                var t = e.i(c.a)(_, s);
                m.length
                  ? (N || (l.polygonStart(), (N = !0)), e.i(a.a)(m, i, t, o, l))
                  : t && (N || (l.polygonStart(), (N = !0)), l.lineStart(), o(null, null, 1, l), l.lineEnd()),
                  N && (l.polygonEnd(), (N = !1)),
                  (m = _ = null);
              },
              sphere: function () {
                l.polygonStart(), l.lineStart(), o(null, null, 1, l), l.lineEnd(), l.polygonEnd();
              },
            };
          return A;
        };
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t, n, e, r) {
        (this.x = t), (this.z = n), (this.o = e), (this.e = r), (this.v = !1), (this.n = this.p = null);
      }
      function i(t) {
        if ((n = t.length)) {
          for (var n, e, r = 0, i = t[0]; ++r < n; ) (i.n = e = t[r]), (e.p = i), (i = e);
          (i.n = e = t[0]), (e.p = i);
        }
      }
      var u = e(135);
      n.a = function (t, n, a, o, c) {
        var f,
          s,
          l = [],
          h = [];
        if (
          (t.forEach(function (t) {
            if (!((n = t.length - 1) <= 0)) {
              var n,
                i,
                a = t[0],
                o = t[n];
              if (e.i(u.a)(a, o)) {
                for (c.lineStart(), f = 0; f < n; ++f) c.point((a = t[f])[0], a[1]);
                return void c.lineEnd();
              }
              l.push((i = new r(a, t, null, !0))),
                h.push((i.o = new r(a, null, i, !1))),
                l.push((i = new r(o, t, null, !1))),
                h.push((i.o = new r(o, null, i, !0)));
            }
          }),
          l.length)
        ) {
          for (h.sort(n), i(l), i(h), f = 0, s = h.length; f < s; ++f) h[f].e = a = !a;
          for (var d, p, v = l[0]; ; ) {
            for (var b = v, g = !0; b.v; ) if ((b = b.n) === v) return;
            (d = b.z), c.lineStart();
            do {
              if (((b.v = b.o.v = !0), b.e)) {
                if (g) for (f = 0, s = d.length; f < s; ++f) c.point((p = d[f])[0], p[1]);
                else o(b.x, b.n.x, 1, c);
                b = b.n;
              } else {
                if (g) for (d = b.p.z, f = d.length - 1; f >= 0; --f) c.point((p = d[f])[0], p[1]);
                else o(b.x, b.p.x, -1, c);
                b = b.p;
              }
              (b = b.o), (d = b.z), (g = !g);
            } while (!b.v);
            c.lineEnd();
          }
        }
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t, n) {
        function e(e, r) {
          return (e = t(e, r)), n(e[0], e[1]);
        }
        return (
          t.invert &&
            n.invert &&
            (e.invert = function (e, r) {
              return (e = n.invert(e, r)) && t.invert(e[0], e[1]);
            }),
          e
        );
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(133),
        i = [null, null],
        u = { type: "LineString", coordinates: i };
      n.a = function (t, n) {
        return (i[0] = t), (i[1] = n), e.i(r.a)(u);
      };
    },
    function (t, n, e) {
      "use strict";
      function r() {
        (v.point = u), (v.lineEnd = i);
      }
      function i() {
        v.point = v.lineEnd = h.a;
      }
      function u(t, n) {
        (t *= l.g), (n *= l.g), (o = t), (c = e.i(l.d)(n)), (f = e.i(l.c)(n)), (v.point = a);
      }
      function a(t, n) {
        (t *= l.g), (n *= l.g);
        var r = e.i(l.d)(n),
          i = e.i(l.c)(n),
          u = e.i(l.p)(t - o),
          a = e.i(l.c)(u),
          s = e.i(l.d)(u),
          h = i * s,
          d = f * r - c * i * a,
          v = c * r + f * i * a;
        p.add(e.i(l.e)(e.i(l.n)(h * h + d * d), v)), (o = t), (c = r), (f = i);
      }
      var o,
        c,
        f,
        s = e(21),
        l = e(0),
        h = e(12),
        d = e(15),
        p = e.i(s.a)(),
        v = { sphere: h.a, point: h.a, lineStart: r, lineEnd: h.a, polygonStart: h.a, polygonEnd: h.a };
      n.a = function (t) {
        return p.reset(), e.i(d.a)(t, v), +p;
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        t < u && (u = t), t > o && (o = t), n < a && (a = n), n > c && (c = n);
      }
      var i = e(12),
        u = 1 / 0,
        a = u,
        o = -u,
        c = o,
        f = {
          point: r,
          lineStart: i.a,
          lineEnd: i.a,
          polygonStart: i.a,
          polygonEnd: i.a,
          result: function () {
            var t = [
              [u, a],
              [o, c],
            ];
            return (o = c = -(a = u = 1 / 0)), t;
          },
        };
      n.a = f;
    },
    function (t, n, e) {
      "use strict";
      var r = e(0);
      n.a = function (t, n) {
        return e.i(r.p)(t[0] - n[0]) < r.o && e.i(r.p)(t[1] - n[1]) < r.o;
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(21),
        i = e(26),
        u = e(0),
        a = e.i(r.a)();
      n.a = function (t, n) {
        var r = n[0],
          o = n[1],
          c = [e.i(u.d)(r), -e.i(u.c)(r), 0],
          f = 0,
          s = 0;
        a.reset();
        for (var l = 0, h = t.length; l < h; ++l)
          if ((p = (d = t[l]).length))
            for (
              var d, p, v = d[p - 1], b = v[0], g = v[1] / 2 + u.v, y = e.i(u.d)(g), _ = e.i(u.c)(g), m = 0;
              m < p;
              ++m, b = w, y = k, _ = N, v = x
            ) {
              var x = d[m],
                w = x[0],
                M = x[1] / 2 + u.v,
                k = e.i(u.d)(M),
                N = e.i(u.c)(M),
                A = w - b,
                S = A >= 0 ? 1 : -1,
                T = S * A,
                E = T > u.a,
                C = y * k;
              if (
                (a.add(e.i(u.e)(C * S * e.i(u.d)(T), _ * N + C * e.i(u.c)(T))),
                (f += E ? A + S * u.b : A),
                E ^ (b >= r) ^ (w >= r))
              ) {
                var P = e.i(i.b)(e.i(i.a)(v), e.i(i.a)(x));
                e.i(i.c)(P);
                var z = e.i(i.b)(c, P);
                e.i(i.c)(z);
                var R = (E ^ (A >= 0) ? -1 : 1) * e.i(u.f)(z[2]);
                (o > R || (o === R && (P[0] || P[1]))) && (s += E ^ (A >= 0) ? 1 : -1);
              }
            }
        return (f < -u.o || (f < u.o && a < -u.o)) ^ (1 & s);
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(68);
      n.a = function () {
        return e
          .i(r.a)()
          .parallels([29.5, 45.5])
          .scale(1070)
          .translate([480, 250])
          .rotate([96, 0])
          .center([-0.6, 38.7]);
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        return [t, n];
      }
      n.b = r;
      var i = e(10);
      (r.invert = r),
        (n.a = function () {
          return e.i(i.a)(r).scale(152.63);
        });
    },
    function (t, n, e) {
      "use strict";
      function r() {
        return 0;
      }
      (n.a = r),
        (n.b = function (t) {
          return function () {
            return t;
          };
        });
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        var e, r;
        if (a(n, t)) return [n];
        for (e = 0; e < t.length; ++e) if (i(n, t[e]) && a(f(t[e], n), t)) return [t[e], n];
        for (e = 0; e < t.length - 1; ++e)
          for (r = e + 1; r < t.length; ++r)
            if (i(f(t[e], t[r]), n) && i(f(t[e], n), t[r]) && i(f(t[r], n), t[e]) && a(s(t[e], t[r], n), t))
              return [t[e], t[r], n];
        throw new Error();
      }
      function i(t, n) {
        var e = t.r - n.r,
          r = n.x - t.x,
          i = n.y - t.y;
        return e < 0 || e * e < r * r + i * i;
      }
      function u(t, n) {
        var e = t.r - n.r + 1e-6,
          r = n.x - t.x,
          i = n.y - t.y;
        return e > 0 && e * e > r * r + i * i;
      }
      function a(t, n) {
        for (var e = 0; e < n.length; ++e) if (!u(t, n[e])) return !1;
        return !0;
      }
      function o(t) {
        switch (t.length) {
          case 1:
            return c(t[0]);
          case 2:
            return f(t[0], t[1]);
          case 3:
            return s(t[0], t[1], t[2]);
        }
      }
      function c(t) {
        return { x: t.x, y: t.y, r: t.r };
      }
      function f(t, n) {
        var e = t.x,
          r = t.y,
          i = t.r,
          u = n.x,
          a = n.y,
          o = n.r,
          c = u - e,
          f = a - r,
          s = o - i,
          l = Math.sqrt(c * c + f * f);
        return { x: (e + u + (c / l) * s) / 2, y: (r + a + (f / l) * s) / 2, r: (l + i + o) / 2 };
      }
      function s(t, n, e) {
        var r = t.x,
          i = t.y,
          u = t.r,
          a = n.x,
          o = n.y,
          c = n.r,
          f = e.x,
          s = e.y,
          l = e.r,
          h = r - a,
          d = r - f,
          p = i - o,
          v = i - s,
          b = c - u,
          g = l - u,
          y = r * r + i * i - u * u,
          _ = y - a * a - o * o + c * c,
          m = y - f * f - s * s + l * l,
          x = d * p - h * v,
          w = (p * m - v * _) / (2 * x) - r,
          M = (v * b - p * g) / x,
          k = (d * _ - h * m) / (2 * x) - i,
          N = (h * g - d * b) / x,
          A = M * M + N * N - 1,
          S = 2 * (u + w * M + k * N),
          T = w * w + k * k - u * u,
          E = -(A ? (S + Math.sqrt(S * S - 4 * A * T)) / (2 * A) : T / S);
        return { x: r + w + M * E, y: i + k + N * E, r: E };
      }
      var l = e(296);
      n.a = function (t) {
        for (var n, i, a = 0, c = (t = e.i(l.a)(l.b.call(t))).length, f = []; a < c; )
          (n = t[a]), i && u(i, n) ? ++a : ((i = o((f = r(f, n)))), (a = 0));
        return i;
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t, n, e) {
        var r = t.x,
          i = t.y,
          u = n.r + e.r,
          a = t.r + e.r,
          o = n.x - r,
          c = n.y - i,
          f = o * o + c * c;
        if (f) {
          var s = 0.5 + ((a *= a) - (u *= u)) / (2 * f),
            l = Math.sqrt(Math.max(0, 2 * u * (a + f) - (a -= f) * a - u * u)) / (2 * f);
          (e.x = r + s * o + l * c), (e.y = i + s * c - l * o);
        } else (e.x = r + a), (e.y = i);
      }
      function i(t, n) {
        var e = n.x - t.x,
          r = n.y - t.y,
          i = t.r + n.r;
        return i * i - 1e-6 > e * e + r * r;
      }
      function u(t) {
        var n = t._,
          e = t.next._,
          r = n.r + e.r,
          i = (n.x * e.r + e.x * n.r) / r,
          u = (n.y * e.r + e.y * n.r) / r;
        return i * i + u * u;
      }
      function a(t) {
        (this._ = t), (this.next = null), (this.previous = null);
      }
      function o(t) {
        if (!(s = t.length)) return 0;
        var n, o, f, s, l, h, d, p, v, b, g;
        if (((n = t[0]), (n.x = 0), (n.y = 0), !(s > 1))) return n.r;
        if (((o = t[1]), (n.x = -o.r), (o.x = n.r), (o.y = 0), !(s > 2))) return n.r + o.r;
        r(o, n, (f = t[2])),
          (n = new a(n)),
          (o = new a(o)),
          (f = new a(f)),
          (n.next = f.previous = o),
          (o.next = n.previous = f),
          (f.next = o.previous = n);
        t: for (d = 3; d < s; ++d) {
          r(n._, o._, (f = t[d])), (f = new a(f)), (p = o.next), (v = n.previous), (b = o._.r), (g = n._.r);
          do {
            if (b <= g) {
              if (i(p._, f._)) {
                (o = p), (n.next = o), (o.previous = n), --d;
                continue t;
              }
              (b += p._.r), (p = p.next);
            } else {
              if (i(v._, f._)) {
                (n = v), (n.next = o), (o.previous = n), --d;
                continue t;
              }
              (g += v._.r), (v = v.previous);
            }
          } while (p !== v.next);
          for (f.previous = n, f.next = o, n.next = o.previous = o = f, l = u(n); (f = f.next) !== o; )
            (h = u(f)) < l && ((n = f), (l = h));
          o = n.next;
        }
        for (n = [o._], f = o; (f = f.next) !== o; ) n.push(f._);
        for (f = e.i(c.a)(n), d = 0; d < s; ++d) (n = t[d]), (n.x -= f.x), (n.y -= f.y);
        return f.r;
      }
      n.b = o;
      var c = e(140);
      n.a = function (t) {
        return o(t), t;
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t) {
        (t.x0 = Math.round(t.x0)), (t.y0 = Math.round(t.y0)), (t.x1 = Math.round(t.x1)), (t.y1 = Math.round(t.y1));
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(75);
      n.a = function (t, n) {
        var i,
          u = n ? n.length : 0,
          a = t ? Math.min(u, t.length) : 0,
          o = new Array(a),
          c = new Array(u);
        for (i = 0; i < a; ++i) o[i] = e.i(r.a)(t[i], n[i]);
        for (; i < u; ++i) c[i] = n[i];
        return function (t) {
          for (i = 0; i < a; ++i) c[i] = o[i](t);
          return c;
        };
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(74);
      n.a = function (t) {
        var n = t.length;
        return function (i) {
          var u = Math.floor(((i %= 1) < 0 ? ++i : i) * n),
            a = t[(u + n - 1) % n],
            o = t[u % n],
            c = t[(u + 1) % n],
            f = t[(u + 2) % n];
          return e.i(r.b)((i - u / n) * n, a, o, c, f);
        };
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t) {
        return function () {
          return t;
        };
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t, n) {
        var e = new Date();
        return (
          (t = +t),
          (n -= t),
          function (r) {
            return e.setTime(t + n * r), e;
          }
        );
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(75);
      n.a = function (t, n) {
        var i,
          u = {},
          a = {};
        (null !== t && "object" == typeof t) || (t = {}), (null !== n && "object" == typeof n) || (n = {});
        for (i in n) i in t ? (u[i] = e.i(r.a)(t[i], n[i])) : (a[i] = n[i]);
        return function (t) {
          for (i in u) a[i] = u[i](t);
          return a;
        };
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return function (n) {
          var r,
            u,
            a = n.length,
            o = new Array(a),
            c = new Array(a),
            f = new Array(a);
          for (r = 0; r < a; ++r) (u = e.i(i.b)(n[r])), (o[r] = u.r || 0), (c[r] = u.g || 0), (f[r] = u.b || 0);
          return (
            (o = t(o)),
            (c = t(c)),
            (f = t(f)),
            (u.opacity = 1),
            function (t) {
              return (u.r = o(t)), (u.g = c(t)), (u.b = f(t)), u + "";
            }
          );
        };
      }
      e.d(n, "b", function () {
        return c;
      }),
        e.d(n, "c", function () {
          return f;
        });
      var i = e(9),
        u = e(74),
        a = e(144),
        o = e(29);
      n.a = (function t(n) {
        function r(t, n) {
          var r = u((t = e.i(i.b)(t)).r, (n = e.i(i.b)(n)).r),
            a = u(t.g, n.g),
            c = u(t.b, n.b),
            f = e.i(o.a)(t.opacity, n.opacity);
          return function (n) {
            return (t.r = r(n)), (t.g = a(n)), (t.b = c(n)), (t.opacity = f(n)), t + "";
          };
        }
        var u = e.i(o.c)(n);
        return (r.gamma = t), r;
      })(1);
      var c = r(u.a),
        f = r(a.a);
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return function () {
          return t;
        };
      }
      function i(t) {
        return function (n) {
          return t(n) + "";
        };
      }
      var u = e(42),
        a = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
        o = new RegExp(a.source, "g");
      n.a = function (t, n) {
        var c,
          f,
          s,
          l = (a.lastIndex = o.lastIndex = 0),
          h = -1,
          d = [],
          p = [];
        for (t += "", n += ""; (c = a.exec(t)) && (f = o.exec(n)); )
          (s = f.index) > l && ((s = n.slice(l, s)), d[h] ? (d[h] += s) : (d[++h] = s)),
            (c = c[0]) === (f = f[0])
              ? d[h]
                ? (d[h] += f)
                : (d[++h] = f)
              : ((d[++h] = null), p.push({ i: h, x: e.i(u.a)(c, f) })),
            (l = o.lastIndex);
        return (
          l < n.length && ((s = n.slice(l)), d[h] ? (d[h] += s) : (d[++h] = s)),
          d.length < 2
            ? p[0]
              ? i(p[0].x)
              : r(n)
            : ((n = p.length),
              function (t) {
                for (var e, r = 0; r < n; ++r) d[(e = p[r]).i] = e.x(t);
                return d.join("");
              })
        );
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(22);
      n.a = (function t(n) {
        function e(t) {
          return function () {
            for (var e = 0, r = 0; r < t; ++r) e += n();
            return e;
          };
        }
        return (e.source = t), e;
      })(r.a);
    },
    function (t, n, e) {
      "use strict";
      var r = e(22);
      n.a = (function t(n) {
        function e(t, e) {
          var r, i;
          return (
            (t = null == t ? 0 : +t),
            (e = null == e ? 1 : +e),
            function () {
              var u;
              if (null != r) (u = r), (r = null);
              else
                do {
                  (r = 2 * n() - 1), (u = 2 * n() - 1), (i = r * r + u * u);
                } while (!i || i > 1);
              return t + e * u * Math.sqrt((-2 * Math.log(i)) / i);
            }
          );
        }
        return (e.source = t), e;
      })(r.a);
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        return function (e) {
          return t(e.responseText, n);
        };
      }
      var i = e(78);
      n.a = function (t, n) {
        return function (u, a, o) {
          arguments.length < 3 && ((o = a), (a = null));
          var c = e.i(i.a)(u).mimeType(t);
          return (
            (c.row = function (t) {
              return arguments.length ? c.response(r(n, (a = t))) : a;
            }),
            c.row(a),
            o ? c.get(o) : c
          );
        };
      };
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return r;
      }),
        e.d(n, "a", function () {
          return i;
        });
      var r = Math.PI / 180,
        i = 180 / Math.PI;
    },
    function (t, n, e) {
      "use strict";
      var r = e(82);
      n.a = function (t, n) {
        var i,
          u = n ? n.length : 0,
          a = t ? Math.min(u, t.length) : 0,
          o = new Array(u),
          c = new Array(u);
        for (i = 0; i < a; ++i) o[i] = e.i(r.a)(t[i], n[i]);
        for (; i < u; ++i) c[i] = n[i];
        return function (t) {
          for (i = 0; i < a; ++i) c[i] = o[i](t);
          return c;
        };
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(81);
      n.a = function (t) {
        var n = t.length;
        return function (i) {
          var u = Math.floor(((i %= 1) < 0 ? ++i : i) * n),
            a = t[(u + n - 1) % n],
            o = t[u % n],
            c = t[(u + 1) % n],
            f = t[(u + 2) % n];
          return e.i(r.b)((i - u / n) * n, a, o, c, f);
        };
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t) {
        return function () {
          return t;
        };
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t, n) {
        var e = new Date();
        return (
          (t = +t),
          (n -= t),
          function (r) {
            return e.setTime(t + n * r), e;
          }
        );
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(82);
      n.a = function (t, n) {
        var i,
          u = {},
          a = {};
        (null !== t && "object" == typeof t) || (t = {}), (null !== n && "object" == typeof n) || (n = {});
        for (i in n) i in t ? (u[i] = e.i(r.a)(t[i], n[i])) : (a[i] = n[i]);
        return function (t) {
          for (i in u) a[i] = u[i](t);
          return a;
        };
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return function (n) {
          var r,
            u,
            a = n.length,
            o = new Array(a),
            c = new Array(a),
            f = new Array(a);
          for (r = 0; r < a; ++r) (u = e.i(i.e)(n[r])), (o[r] = u.r || 0), (c[r] = u.g || 0), (f[r] = u.b || 0);
          return (
            (o = t(o)),
            (c = t(c)),
            (f = t(f)),
            (u.opacity = 1),
            function (t) {
              return (u.r = o(t)), (u.g = c(t)), (u.b = f(t)), u + "";
            }
          );
        };
      }
      e.d(n, "a", function () {
        return c;
      });
      var i = e(23),
        u = e(81),
        a = e(155),
        o = e(30);
      n.b = (function t(n) {
        function r(t, n) {
          var r = u((t = e.i(i.e)(t)).r, (n = e.i(i.e)(n)).r),
            a = u(t.g, n.g),
            c = u(t.b, n.b),
            f = e.i(o.a)(t.opacity, n.opacity);
          return function (n) {
            return (t.r = r(n)), (t.g = a(n)), (t.b = c(n)), (t.opacity = f(n)), t + "";
          };
        }
        var u = e.i(o.c)(n);
        return (r.gamma = t), r;
      })(1);
      var c = r(u.a);
      r(a.a);
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return function () {
          return t;
        };
      }
      function i(t) {
        return function (n) {
          return t(n) + "";
        };
      }
      var u = e(44),
        a = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
        o = new RegExp(a.source, "g");
      n.a = function (t, n) {
        var c,
          f,
          s,
          l = (a.lastIndex = o.lastIndex = 0),
          h = -1,
          d = [],
          p = [];
        for (t += "", n += ""; (c = a.exec(t)) && (f = o.exec(n)); )
          (s = f.index) > l && ((s = n.slice(l, s)), d[h] ? (d[h] += s) : (d[++h] = s)),
            (c = c[0]) === (f = f[0])
              ? d[h]
                ? (d[h] += f)
                : (d[++h] = f)
              : ((d[++h] = null), p.push({ i: h, x: e.i(u.a)(c, f) })),
            (l = o.lastIndex);
        return (
          l < n.length && ((s = n.slice(l)), d[h] ? (d[h] += s) : (d[++h] = s)),
          d.length < 2
            ? p[0]
              ? i(p[0].x)
              : r(n)
            : ((n = p.length),
              function (t) {
                for (var e, r = 0; r < n; ++r) d[(e = p[r]).i] = e.x(t);
                return d.join("");
              })
        );
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t, n) {
        t = t.slice();
        var e,
          r = 0,
          i = t.length - 1,
          u = t[r],
          a = t[i];
        return (
          a < u && ((e = r), (r = i), (i = e), (e = u), (u = a), (a = e)), (t[r] = n.floor(u)), (t[i] = n.ceil(a)), t
        );
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t) {
        return +t;
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        function n(n) {
          var e = n + "",
            r = o.get(e);
          if (!r) {
            if (f !== a) return f;
            o.set(e, (r = c.push(n)));
          }
          return t[(r - 1) % t.length];
        }
        var o = e.i(i.c)(),
          c = [],
          f = a;
        return (
          (t = null == t ? [] : u.b.call(t)),
          (n.domain = function (t) {
            if (!arguments.length) return c.slice();
            (c = []), (o = e.i(i.c)());
            for (var r, u, a = -1, f = t.length; ++a < f; ) o.has((u = (r = t[a]) + "")) || o.set(u, c.push(r));
            return n;
          }),
          (n.range = function (e) {
            return arguments.length ? ((t = u.b.call(e)), n) : t.slice();
          }),
          (n.unknown = function (t) {
            return arguments.length ? ((f = t), n) : f;
          }),
          (n.copy = function () {
            return r().domain(c).range(t).unknown(f);
          }),
          n
        );
      }
      e.d(n, "b", function () {
        return a;
      }),
        (n.a = r);
      var i = e(25),
        u = e(17),
        a = { name: "implicit" };
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return new Date(t);
      }
      function i(t) {
        return t instanceof Date ? +t : +new Date(+t);
      }
      function u(t, n, c, f, m, x, w, M, k) {
        function N(e) {
          return (
            w(e) < e ? C : x(e) < e ? P : m(e) < e ? z : f(e) < e ? R : n(e) < e ? (c(e) < e ? q : L) : t(e) < e ? O : D
          )(e);
        }
        function A(n, r, i, u) {
          if ((null == n && (n = 10), "number" == typeof n)) {
            var o = Math.abs(i - r) / n,
              c = e
                .i(a.e)(function (t) {
                  return t[2];
                })
                .right(U, o);
            c === U.length
              ? ((u = e.i(a.B)(r / _, i / _, n)), (n = t))
              : c
              ? ((c = U[o / U[c - 1][2] < U[c][2] / o ? c - 1 : c]), (u = c[1]), (n = c[0]))
              : ((u = Math.max(e.i(a.B)(r, i, n), 1)), (n = M));
          }
          return null == u ? n : n.every(u);
        }
        var S = e.i(l.a)(l.b, o.f),
          T = S.invert,
          E = S.domain,
          C = k(".%L"),
          P = k(":%S"),
          z = k("%I:%M"),
          R = k("%I %p"),
          q = k("%a %d"),
          L = k("%b %d"),
          O = k("%B"),
          D = k("%Y"),
          U = [
            [w, 1, d],
            [w, 5, 5 * d],
            [w, 15, 15 * d],
            [w, 30, 30 * d],
            [x, 1, p],
            [x, 5, 5 * p],
            [x, 15, 15 * p],
            [x, 30, 30 * p],
            [m, 1, v],
            [m, 3, 3 * v],
            [m, 6, 6 * v],
            [m, 12, 12 * v],
            [f, 1, b],
            [f, 2, 2 * b],
            [c, 1, g],
            [n, 1, y],
            [n, 3, 3 * y],
            [t, 1, _],
          ];
        return (
          (S.invert = function (t) {
            return new Date(T(t));
          }),
          (S.domain = function (t) {
            return arguments.length ? E(s.a.call(t, i)) : E().map(r);
          }),
          (S.ticks = function (t, n) {
            var e,
              r = E(),
              i = r[0],
              u = r[r.length - 1],
              a = u < i;
            return (
              a && ((e = i), (i = u), (u = e)),
              (e = A(t, i, u, n)),
              (e = e ? e.range(i, u + 1) : []),
              a ? e.reverse() : e
            );
          }),
          (S.tickFormat = function (t, n) {
            return null == n ? N : k(n);
          }),
          (S.nice = function (t, n) {
            var r = E();
            return (t = A(t, r[0], r[r.length - 1], n)) ? E(e.i(h.a)(r, t)) : S;
          }),
          (S.copy = function () {
            return e.i(l.c)(S, u(t, n, c, f, m, x, w, M, k));
          }),
          S
        );
      }
      n.b = u;
      var a = e(5),
        o = e(6),
        c = e(52),
        f = e(94),
        s = e(17),
        l = e(45),
        h = e(161),
        d = 1e3,
        p = 60 * d,
        v = 60 * p,
        b = 24 * v,
        g = 7 * b,
        y = 30 * b,
        _ = 365 * b;
      n.a = function () {
        return u(c.H, c.F, c.p, c.n, c.l, c.j, c.f, c.b, f.b).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]);
      };
    },
    function (t, n, e) {
      "use strict";
      var r = function (t) {
        return function () {
          return this.matches(t);
        };
      };
      if ("undefined" != typeof document) {
        var i = document.documentElement;
        if (!i.matches) {
          var u = i.webkitMatchesSelector || i.msMatchesSelector || i.mozMatchesSelector || i.oMatchesSelector;
          r = function (t) {
            return function () {
              return u.call(this, t);
            };
          };
        }
      }
      n.a = r;
    },
    function (t, n, e) {
      "use strict";
      var r = e(7);
      n.a = function (t) {
        return "string" == typeof t
          ? new r.b([[document.querySelector(t)]], [document.documentElement])
          : new r.b([[t]], r.c);
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        (this.ownerDocument = t.ownerDocument),
          (this.namespaceURI = t.namespaceURI),
          (this._next = null),
          (this._parent = t),
          (this.__data__ = n);
      }
      n.b = r;
      var i = e(168),
        u = e(7);
      (n.a = function () {
        return new u.b(this._enter || this._groups.map(i.a), this._parents);
      }),
        (r.prototype = {
          constructor: r,
          appendChild: function (t) {
            return this._parent.insertBefore(t, this._next);
          },
          insertBefore: function (t, n) {
            return this._parent.insertBefore(t, n);
          },
          querySelector: function (t) {
            return this._parent.querySelector(t);
          },
          querySelectorAll: function (t) {
            return this._parent.querySelectorAll(t);
          },
        });
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t) {
        return new Array(t.length);
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return function () {
          this.style.removeProperty(t);
        };
      }
      function i(t, n, e) {
        return function () {
          this.style.setProperty(t, n, e);
        };
      }
      function u(t, n, e) {
        return function () {
          var r = n.apply(this, arguments);
          null == r ? this.style.removeProperty(t) : this.style.setProperty(t, r, e);
        };
      }
      function a(t, n) {
        return t.style.getPropertyValue(n) || e.i(o.a)(t).getComputedStyle(t, null).getPropertyValue(n);
      }
      n.a = a;
      var o = e(89);
      n.b = function (t, n, e) {
        return arguments.length > 1
          ? this.each((null == n ? r : "function" == typeof n ? u : i)(t, n, null == e ? "" : e))
          : a(this.node(), t);
      };
    },
    function (t, n, e) {
      "use strict";
      function r() {
        return [];
      }
      n.a = function (t) {
        return null == t
          ? r
          : function () {
              return this.querySelectorAll(t);
            };
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(16),
        i = e(18),
        u = e(50),
        a = e(91),
        o = e(93);
      n.a = function () {
        function t(t) {
          var n,
            i,
            u,
            a,
            o,
            b = t.length,
            g = !1,
            y = new Array(b),
            _ = new Array(b);
          for (null == d && (v = p((o = e.i(r.a)()))), n = 0; n <= b; ++n) {
            if (!(n < b && h((a = t[n]), n, t)) === g)
              if ((g = !g)) (i = n), v.areaStart(), v.lineStart();
              else {
                for (v.lineEnd(), v.lineStart(), u = n - 1; u >= i; --u) v.point(y[u], _[u]);
                v.lineEnd(), v.areaEnd();
              }
            g && ((y[n] = +c(a, n, t)), (_[n] = +s(a, n, t)), v.point(f ? +f(a, n, t) : y[n], l ? +l(a, n, t) : _[n]));
          }
          if (o) return (v = null), o + "" || null;
        }
        function n() {
          return e.i(a.a)().defined(h).curve(p).context(d);
        }
        var c = o.a,
          f = null,
          s = e.i(i.a)(0),
          l = o.b,
          h = e.i(i.a)(!0),
          d = null,
          p = u.a,
          v = null;
        return (
          (t.x = function (n) {
            return arguments.length ? ((c = "function" == typeof n ? n : e.i(i.a)(+n)), (f = null), t) : c;
          }),
          (t.x0 = function (n) {
            return arguments.length ? ((c = "function" == typeof n ? n : e.i(i.a)(+n)), t) : c;
          }),
          (t.x1 = function (n) {
            return arguments.length ? ((f = null == n ? null : "function" == typeof n ? n : e.i(i.a)(+n)), t) : f;
          }),
          (t.y = function (n) {
            return arguments.length ? ((s = "function" == typeof n ? n : e.i(i.a)(+n)), (l = null), t) : s;
          }),
          (t.y0 = function (n) {
            return arguments.length ? ((s = "function" == typeof n ? n : e.i(i.a)(+n)), t) : s;
          }),
          (t.y1 = function (n) {
            return arguments.length ? ((l = null == n ? null : "function" == typeof n ? n : e.i(i.a)(+n)), t) : l;
          }),
          (t.lineX0 = t.lineY0 =
            function () {
              return n().x(c).y(s);
            }),
          (t.lineY1 = function () {
            return n().x(c).y(l);
          }),
          (t.lineX1 = function () {
            return n().x(f).y(s);
          }),
          (t.defined = function (n) {
            return arguments.length ? ((h = "function" == typeof n ? n : e.i(i.a)(!!n)), t) : h;
          }),
          (t.curve = function (n) {
            return arguments.length ? ((p = n), null != d && (v = p(d)), t) : p;
          }),
          (t.context = function (n) {
            return arguments.length ? (null == n ? (d = v = null) : (v = p((d = n))), t) : d;
          }),
          t
        );
      };
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "a", function () {
        return r;
      });
      var r = Array.prototype.slice;
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        (this._context = t), (this._k = (1 - n) / 6);
      }
      n.b = r;
      var i = e(51),
        u = e(49);
      (r.prototype = {
        areaStart: i.a,
        areaEnd: i.a,
        lineStart: function () {
          (this._x0 =
            this._x1 =
            this._x2 =
            this._x3 =
            this._x4 =
            this._x5 =
            this._y0 =
            this._y1 =
            this._y2 =
            this._y3 =
            this._y4 =
            this._y5 =
              NaN),
            (this._point = 0);
        },
        lineEnd: function () {
          switch (this._point) {
            case 1:
              this._context.moveTo(this._x3, this._y3), this._context.closePath();
              break;
            case 2:
              this._context.lineTo(this._x3, this._y3), this._context.closePath();
              break;
            case 3:
              this.point(this._x3, this._y3), this.point(this._x4, this._y4), this.point(this._x5, this._y5);
          }
        },
        point: function (t, n) {
          switch (((t = +t), (n = +n), this._point)) {
            case 0:
              (this._point = 1), (this._x3 = t), (this._y3 = n);
              break;
            case 1:
              (this._point = 2), this._context.moveTo((this._x4 = t), (this._y4 = n));
              break;
            case 2:
              (this._point = 3), (this._x5 = t), (this._y5 = n);
              break;
            default:
              e.i(u.c)(this, t, n);
          }
          (this._x0 = this._x1),
            (this._x1 = this._x2),
            (this._x2 = t),
            (this._y0 = this._y1),
            (this._y1 = this._y2),
            (this._y2 = n);
        },
      }),
        (n.a = (function t(n) {
          function e(t) {
            return new r(t, n);
          }
          return (
            (e.tension = function (n) {
              return t(+n);
            }),
            e
          );
        })(0));
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        (this._context = t), (this._k = (1 - n) / 6);
      }
      n.b = r;
      var i = e(49);
      (r.prototype = {
        areaStart: function () {
          this._line = 0;
        },
        areaEnd: function () {
          this._line = NaN;
        },
        lineStart: function () {
          (this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN), (this._point = 0);
        },
        lineEnd: function () {
          (this._line || (0 !== this._line && 3 === this._point)) && this._context.closePath(),
            (this._line = 1 - this._line);
        },
        point: function (t, n) {
          switch (((t = +t), (n = +n), this._point)) {
            case 0:
              this._point = 1;
              break;
            case 1:
              this._point = 2;
              break;
            case 2:
              (this._point = 3),
                this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
              break;
            case 3:
              this._point = 4;
            default:
              e.i(i.c)(this, t, n);
          }
          (this._x0 = this._x1),
            (this._x1 = this._x2),
            (this._x2 = t),
            (this._y0 = this._y1),
            (this._y1 = this._y2),
            (this._y2 = n);
        },
      }),
        (n.a = (function t(n) {
          function e(t) {
            return new r(t, n);
          }
          return (
            (e.tension = function (n) {
              return t(+n);
            }),
            e
          );
        })(0));
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        this._curve = t;
      }
      function i(t) {
        function n(n) {
          return new r(t(n));
        }
        return (n._curve = t), n;
      }
      e.d(n, "b", function () {
        return a;
      }),
        (n.a = i);
      var u = e(50),
        a = i(u.a);
      r.prototype = {
        areaStart: function () {
          this._curve.areaStart();
        },
        areaEnd: function () {
          this._curve.areaEnd();
        },
        lineStart: function () {
          this._curve.lineStart();
        },
        lineEnd: function () {
          this._curve.lineEnd();
        },
        point: function (t, n) {
          this._curve.point(n * Math.sin(t), n * -Math.cos(t));
        },
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        var n = t.curve;
        return (
          (t.angle = t.x),
          delete t.x,
          (t.radius = t.y),
          delete t.y,
          (t.curve = function (t) {
            return arguments.length ? n(e.i(i.a)(t)) : n()._curve;
          }),
          t
        );
      }
      n.b = r;
      var i = e(175),
        u = e(91);
      n.a = function () {
        return r(e.i(u.a)().curve(i.b));
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t, n) {
        return [(n = +n) * Math.cos((t -= Math.PI / 2)), n * Math.sin(t)];
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(33);
      n.a = {
        draw: function (t, n) {
          var e = Math.sqrt(n / r.b);
          t.moveTo(e, 0), t.arc(0, 0, e, 0, r.c);
        },
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = {
        draw: function (t, n) {
          var e = Math.sqrt(n / 5) / 2;
          t.moveTo(-3 * e, -e),
            t.lineTo(-e, -e),
            t.lineTo(-e, -3 * e),
            t.lineTo(e, -3 * e),
            t.lineTo(e, -e),
            t.lineTo(3 * e, -e),
            t.lineTo(3 * e, e),
            t.lineTo(e, e),
            t.lineTo(e, 3 * e),
            t.lineTo(-e, 3 * e),
            t.lineTo(-e, e),
            t.lineTo(-3 * e, e),
            t.closePath();
        },
      };
    },
    function (t, n, e) {
      "use strict";
      var r = Math.sqrt(1 / 3),
        i = 2 * r;
      n.a = {
        draw: function (t, n) {
          var e = Math.sqrt(n / i),
            u = e * r;
          t.moveTo(0, -e), t.lineTo(u, 0), t.lineTo(0, e), t.lineTo(-u, 0), t.closePath();
        },
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = {
        draw: function (t, n) {
          var e = Math.sqrt(n),
            r = -e / 2;
          t.rect(r, r, e, e);
        },
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(33),
        i = Math.sin(r.b / 10) / Math.sin((7 * r.b) / 10),
        u = Math.sin(r.c / 10) * i,
        a = -Math.cos(r.c / 10) * i;
      n.a = {
        draw: function (t, n) {
          var e = Math.sqrt(0.8908130915292852 * n),
            i = u * e,
            o = a * e;
          t.moveTo(0, -e), t.lineTo(i, o);
          for (var c = 1; c < 5; ++c) {
            var f = (r.c * c) / 5,
              s = Math.cos(f),
              l = Math.sin(f);
            t.lineTo(l * e, -s * e), t.lineTo(s * i - l * o, l * i + s * o);
          }
          t.closePath();
        },
      };
    },
    function (t, n, e) {
      "use strict";
      var r = Math.sqrt(3);
      n.a = {
        draw: function (t, n) {
          var e = -Math.sqrt(n / (3 * r));
          t.moveTo(0, 2 * e), t.lineTo(-r * e, -e), t.lineTo(r * e, -e), t.closePath();
        },
      };
    },
    function (t, n, e) {
      "use strict";
      var r = -0.5,
        i = Math.sqrt(3) / 2,
        u = 1 / Math.sqrt(12),
        a = 3 * (u / 2 + 1);
      n.a = {
        draw: function (t, n) {
          var e = Math.sqrt(n / a),
            o = e / 2,
            c = e * u,
            f = o,
            s = e * u + e,
            l = -f,
            h = s;
          t.moveTo(o, c),
            t.lineTo(f, s),
            t.lineTo(l, h),
            t.lineTo(r * o - i * c, i * o + r * c),
            t.lineTo(r * f - i * s, i * f + r * s),
            t.lineTo(r * l - i * h, i * l + r * h),
            t.lineTo(r * o + i * c, r * c - i * o),
            t.lineTo(r * f + i * s, r * s - i * f),
            t.lineTo(r * l + i * h, r * h - i * l),
            t.closePath();
        },
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return t.toISOString();
      }
      e.d(n, "b", function () {
        return u;
      });
      var i = e(95),
        u = "%Y-%m-%dT%H:%M:%S.%LZ",
        a = Date.prototype.toISOString ? r : e.i(i.d)(u);
      n.a = a;
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        if (0 <= t.y && t.y < 100) {
          var n = new Date(-1, t.m, t.d, t.H, t.M, t.S, t.L);
          return n.setFullYear(t.y), n;
        }
        return new Date(t.y, t.m, t.d, t.H, t.M, t.S, t.L);
      }
      function i(t) {
        if (0 <= t.y && t.y < 100) {
          var n = new Date(Date.UTC(-1, t.m, t.d, t.H, t.M, t.S, t.L));
          return n.setUTCFullYear(t.y), n;
        }
        return new Date(Date.UTC(t.y, t.m, t.d, t.H, t.M, t.S, t.L));
      }
      function u(t) {
        return { y: t, m: 0, d: 1, H: 0, M: 0, S: 0, L: 0 };
      }
      function a(t) {
        function n(t, n) {
          return function (e) {
            var r,
              i,
              u,
              a = [],
              o = -1,
              c = 0,
              f = t.length;
            for (e instanceof Date || (e = new Date(+e)); ++o < f; )
              37 === t.charCodeAt(o) &&
                (a.push(t.slice(c, o)),
                null != (i = pt[(r = t.charAt(++o))]) ? (r = t.charAt(++o)) : (i = "e" === r ? " " : "0"),
                (u = n[r]) && (r = u(e, i)),
                a.push(r),
                (c = o + 1));
            return a.push(t.slice(c, o)), a.join("");
          };
        }
        function a(t, n) {
          return function (r) {
            var a,
              c,
              f = u(1900),
              s = o(f, t, (r += ""), 0);
            if (s != r.length) return null;
            if ("Q" in f) return new Date(f.Q);
            if (("p" in f && (f.H = (f.H % 12) + 12 * f.p), "V" in f)) {
              if (f.V < 1 || f.V > 53) return null;
              "w" in f || (f.w = 1),
                "Z" in f
                  ? ((a = i(u(f.y))),
                    (c = a.getUTCDay()),
                    (a = c > 4 || 0 === c ? dt.T.ceil(a) : e.i(dt.T)(a)),
                    (a = dt.N.offset(a, 7 * (f.V - 1))),
                    (f.y = a.getUTCFullYear()),
                    (f.m = a.getUTCMonth()),
                    (f.d = a.getUTCDate() + ((f.w + 6) % 7)))
                  : ((a = n(u(f.y))),
                    (c = a.getDay()),
                    (a = c > 4 || 0 === c ? dt.t.ceil(a) : e.i(dt.t)(a)),
                    (a = dt.n.offset(a, 7 * (f.V - 1))),
                    (f.y = a.getFullYear()),
                    (f.m = a.getMonth()),
                    (f.d = a.getDate() + ((f.w + 6) % 7)));
            } else
              ("W" in f || "U" in f) &&
                ("w" in f || (f.w = "u" in f ? f.u % 7 : "W" in f ? 1 : 0),
                (c = "Z" in f ? i(u(f.y)).getUTCDay() : n(u(f.y)).getDay()),
                (f.m = 0),
                (f.d = "W" in f ? ((f.w + 6) % 7) + 7 * f.W - ((c + 5) % 7) : f.w + 7 * f.U - ((c + 6) % 7)));
            return "Z" in f ? ((f.H += (f.Z / 100) | 0), (f.M += f.Z % 100), i(f)) : n(f);
          };
        }
        function o(t, n, e, r) {
          for (var i, u, a = 0, o = n.length, c = e.length; a < o; ) {
            if (r >= c) return -1;
            if (37 === (i = n.charCodeAt(a++))) {
              if (((i = n.charAt(a++)), !(u = Jt[i in pt ? n.charAt(a++) : i]) || (r = u(t, e, r)) < 0)) return -1;
            } else if (i != e.charCodeAt(r++)) return -1;
          }
          return r;
        }
        function c(t, n, e) {
          var r = It.exec(n.slice(e));
          return r ? ((t.p = Bt[r[0].toLowerCase()]), e + r[0].length) : -1;
        }
        function vt(t, n, e) {
          var r = Ht.exec(n.slice(e));
          return r ? ((t.w = Xt[r[0].toLowerCase()]), e + r[0].length) : -1;
        }
        function bt(t, n, e) {
          var r = Yt.exec(n.slice(e));
          return r ? ((t.w = Ft[r[0].toLowerCase()]), e + r[0].length) : -1;
        }
        function gt(t, n, e) {
          var r = Wt.exec(n.slice(e));
          return r ? ((t.m = $t[r[0].toLowerCase()]), e + r[0].length) : -1;
        }
        function yt(t, n, e) {
          var r = Gt.exec(n.slice(e));
          return r ? ((t.m = Vt[r[0].toLowerCase()]), e + r[0].length) : -1;
        }
        function _t(t, n, e) {
          return o(t, zt, n, e);
        }
        function mt(t, n, e) {
          return o(t, Rt, n, e);
        }
        function xt(t, n, e) {
          return o(t, qt, n, e);
        }
        function wt(t) {
          return Dt[t.getDay()];
        }
        function Mt(t) {
          return Ot[t.getDay()];
        }
        function kt(t) {
          return jt[t.getMonth()];
        }
        function Nt(t) {
          return Ut[t.getMonth()];
        }
        function At(t) {
          return Lt[+(t.getHours() >= 12)];
        }
        function St(t) {
          return Dt[t.getUTCDay()];
        }
        function Tt(t) {
          return Ot[t.getUTCDay()];
        }
        function Et(t) {
          return jt[t.getUTCMonth()];
        }
        function Ct(t) {
          return Ut[t.getUTCMonth()];
        }
        function Pt(t) {
          return Lt[+(t.getUTCHours() >= 12)];
        }
        var zt = t.dateTime,
          Rt = t.date,
          qt = t.time,
          Lt = t.periods,
          Ot = t.days,
          Dt = t.shortDays,
          Ut = t.months,
          jt = t.shortMonths,
          It = f(Lt),
          Bt = s(Lt),
          Yt = f(Ot),
          Ft = s(Ot),
          Ht = f(Dt),
          Xt = s(Dt),
          Gt = f(Ut),
          Vt = s(Ut),
          Wt = f(jt),
          $t = s(jt),
          Qt = {
            a: wt,
            A: Mt,
            b: kt,
            B: Nt,
            c: null,
            d: C,
            e: C,
            f: L,
            H: P,
            I: z,
            j: R,
            L: q,
            m: O,
            M: D,
            p: At,
            Q: lt,
            s: ht,
            S: U,
            u: j,
            U: I,
            V: B,
            w: Y,
            W: F,
            x: null,
            X: null,
            y: H,
            Y: X,
            Z: G,
            "%": st,
          },
          Zt = {
            a: St,
            A: Tt,
            b: Et,
            B: Ct,
            c: null,
            d: V,
            e: V,
            f: J,
            H: W,
            I: $,
            j: Q,
            L: Z,
            m: K,
            M: tt,
            p: Pt,
            Q: lt,
            s: ht,
            S: nt,
            u: et,
            U: rt,
            V: it,
            w: ut,
            W: at,
            x: null,
            X: null,
            y: ot,
            Y: ct,
            Z: ft,
            "%": st,
          },
          Jt = {
            a: vt,
            A: bt,
            b: gt,
            B: yt,
            c: _t,
            d: m,
            e: m,
            f: A,
            H: w,
            I: w,
            j: x,
            L: N,
            m: _,
            M: M,
            p: c,
            Q: T,
            s: E,
            S: k,
            u: h,
            U: d,
            V: p,
            w: l,
            W: v,
            x: mt,
            X: xt,
            y: g,
            Y: b,
            Z: y,
            "%": S,
          };
        return (
          (Qt.x = n(Rt, Qt)),
          (Qt.X = n(qt, Qt)),
          (Qt.c = n(zt, Qt)),
          (Zt.x = n(Rt, Zt)),
          (Zt.X = n(qt, Zt)),
          (Zt.c = n(zt, Zt)),
          {
            format: function (t) {
              var e = n((t += ""), Qt);
              return (
                (e.toString = function () {
                  return t;
                }),
                e
              );
            },
            parse: function (t) {
              var n = a((t += ""), r);
              return (
                (n.toString = function () {
                  return t;
                }),
                n
              );
            },
            utcFormat: function (t) {
              var e = n((t += ""), Zt);
              return (
                (e.toString = function () {
                  return t;
                }),
                e
              );
            },
            utcParse: function (t) {
              var n = a(t, i);
              return (
                (n.toString = function () {
                  return t;
                }),
                n
              );
            },
          }
        );
      }
      function o(t, n, e) {
        var r = t < 0 ? "-" : "",
          i = (r ? -t : t) + "",
          u = i.length;
        return r + (u < e ? new Array(e - u + 1).join(n) + i : i);
      }
      function c(t) {
        return t.replace(gt, "\\$&");
      }
      function f(t) {
        return new RegExp("^(?:" + t.map(c).join("|") + ")", "i");
      }
      function s(t) {
        for (var n = {}, e = -1, r = t.length; ++e < r; ) n[t[e].toLowerCase()] = e;
        return n;
      }
      function l(t, n, e) {
        var r = vt.exec(n.slice(e, e + 1));
        return r ? ((t.w = +r[0]), e + r[0].length) : -1;
      }
      function h(t, n, e) {
        var r = vt.exec(n.slice(e, e + 1));
        return r ? ((t.u = +r[0]), e + r[0].length) : -1;
      }
      function d(t, n, e) {
        var r = vt.exec(n.slice(e, e + 2));
        return r ? ((t.U = +r[0]), e + r[0].length) : -1;
      }
      function p(t, n, e) {
        var r = vt.exec(n.slice(e, e + 2));
        return r ? ((t.V = +r[0]), e + r[0].length) : -1;
      }
      function v(t, n, e) {
        var r = vt.exec(n.slice(e, e + 2));
        return r ? ((t.W = +r[0]), e + r[0].length) : -1;
      }
      function b(t, n, e) {
        var r = vt.exec(n.slice(e, e + 4));
        return r ? ((t.y = +r[0]), e + r[0].length) : -1;
      }
      function g(t, n, e) {
        var r = vt.exec(n.slice(e, e + 2));
        return r ? ((t.y = +r[0] + (+r[0] > 68 ? 1900 : 2e3)), e + r[0].length) : -1;
      }
      function y(t, n, e) {
        var r = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(n.slice(e, e + 6));
        return r ? ((t.Z = r[1] ? 0 : -(r[2] + (r[3] || "00"))), e + r[0].length) : -1;
      }
      function _(t, n, e) {
        var r = vt.exec(n.slice(e, e + 2));
        return r ? ((t.m = r[0] - 1), e + r[0].length) : -1;
      }
      function m(t, n, e) {
        var r = vt.exec(n.slice(e, e + 2));
        return r ? ((t.d = +r[0]), e + r[0].length) : -1;
      }
      function x(t, n, e) {
        var r = vt.exec(n.slice(e, e + 3));
        return r ? ((t.m = 0), (t.d = +r[0]), e + r[0].length) : -1;
      }
      function w(t, n, e) {
        var r = vt.exec(n.slice(e, e + 2));
        return r ? ((t.H = +r[0]), e + r[0].length) : -1;
      }
      function M(t, n, e) {
        var r = vt.exec(n.slice(e, e + 2));
        return r ? ((t.M = +r[0]), e + r[0].length) : -1;
      }
      function k(t, n, e) {
        var r = vt.exec(n.slice(e, e + 2));
        return r ? ((t.S = +r[0]), e + r[0].length) : -1;
      }
      function N(t, n, e) {
        var r = vt.exec(n.slice(e, e + 3));
        return r ? ((t.L = +r[0]), e + r[0].length) : -1;
      }
      function A(t, n, e) {
        var r = vt.exec(n.slice(e, e + 6));
        return r ? ((t.L = Math.floor(r[0] / 1e3)), e + r[0].length) : -1;
      }
      function S(t, n, e) {
        var r = bt.exec(n.slice(e, e + 1));
        return r ? e + r[0].length : -1;
      }
      function T(t, n, e) {
        var r = vt.exec(n.slice(e));
        return r ? ((t.Q = +r[0]), e + r[0].length) : -1;
      }
      function E(t, n, e) {
        var r = vt.exec(n.slice(e));
        return r ? ((t.Q = 1e3 * +r[0]), e + r[0].length) : -1;
      }
      function C(t, n) {
        return o(t.getDate(), n, 2);
      }
      function P(t, n) {
        return o(t.getHours(), n, 2);
      }
      function z(t, n) {
        return o(t.getHours() % 12 || 12, n, 2);
      }
      function R(t, n) {
        return o(1 + dt.n.count(e.i(dt.H)(t), t), n, 3);
      }
      function q(t, n) {
        return o(t.getMilliseconds(), n, 3);
      }
      function L(t, n) {
        return q(t, n) + "000";
      }
      function O(t, n) {
        return o(t.getMonth() + 1, n, 2);
      }
      function D(t, n) {
        return o(t.getMinutes(), n, 2);
      }
      function U(t, n) {
        return o(t.getSeconds(), n, 2);
      }
      function j(t) {
        var n = t.getDay();
        return 0 === n ? 7 : n;
      }
      function I(t, n) {
        return o(dt.r.count(e.i(dt.H)(t), t), n, 2);
      }
      function B(t, n) {
        var r = t.getDay();
        return (
          (t = r >= 4 || 0 === r ? e.i(dt.z)(t) : dt.z.ceil(t)),
          o(dt.z.count(e.i(dt.H)(t), t) + (4 === e.i(dt.H)(t).getDay()), n, 2)
        );
      }
      function Y(t) {
        return t.getDay();
      }
      function F(t, n) {
        return o(dt.t.count(e.i(dt.H)(t), t), n, 2);
      }
      function H(t, n) {
        return o(t.getFullYear() % 100, n, 2);
      }
      function X(t, n) {
        return o(t.getFullYear() % 1e4, n, 4);
      }
      function G(t) {
        var n = t.getTimezoneOffset();
        return (n > 0 ? "-" : ((n *= -1), "+")) + o((n / 60) | 0, "0", 2) + o(n % 60, "0", 2);
      }
      function V(t, n) {
        return o(t.getUTCDate(), n, 2);
      }
      function W(t, n) {
        return o(t.getUTCHours(), n, 2);
      }
      function $(t, n) {
        return o(t.getUTCHours() % 12 || 12, n, 2);
      }
      function Q(t, n) {
        return o(1 + dt.N.count(e.i(dt._7)(t), t), n, 3);
      }
      function Z(t, n) {
        return o(t.getUTCMilliseconds(), n, 3);
      }
      function J(t, n) {
        return Z(t, n) + "000";
      }
      function K(t, n) {
        return o(t.getUTCMonth() + 1, n, 2);
      }
      function tt(t, n) {
        return o(t.getUTCMinutes(), n, 2);
      }
      function nt(t, n) {
        return o(t.getUTCSeconds(), n, 2);
      }
      function et(t) {
        var n = t.getUTCDay();
        return 0 === n ? 7 : n;
      }
      function rt(t, n) {
        return o(dt.R.count(e.i(dt._7)(t), t), n, 2);
      }
      function it(t, n) {
        var r = t.getUTCDay();
        return (
          (t = r >= 4 || 0 === r ? e.i(dt.Z)(t) : dt.Z.ceil(t)),
          o(dt.Z.count(e.i(dt._7)(t), t) + (4 === e.i(dt._7)(t).getUTCDay()), n, 2)
        );
      }
      function ut(t) {
        return t.getUTCDay();
      }
      function at(t, n) {
        return o(dt.T.count(e.i(dt._7)(t), t), n, 2);
      }
      function ot(t, n) {
        return o(t.getUTCFullYear() % 100, n, 2);
      }
      function ct(t, n) {
        return o(t.getUTCFullYear() % 1e4, n, 4);
      }
      function ft() {
        return "+0000";
      }
      function st() {
        return "%";
      }
      function lt(t) {
        return +t;
      }
      function ht(t) {
        return Math.floor(+t / 1e3);
      }
      n.a = a;
      var dt = e(52),
        pt = { "-": "", _: " ", 0: "0" },
        vt = /^\s*\d+/,
        bt = /^%/,
        gt = /[\\^$*+?|[\]().{}]/g;
    },
    function (t, n, e) {
      "use strict";
      var r = e(8);
      n.a = function (t, n) {
        var e,
          i,
          u,
          a = t.__transition,
          o = !0;
        if (a) {
          n = null == n ? null : n + "";
          for (u in a)
            (e = a[u]).name === n
              ? ((i = e.state > r.a && e.state < r.b),
                (e.state = r.c),
                e.timer.stop(),
                i && e.on.call("interrupt", t, t.__data__, e.index, e.group),
                delete a[u])
              : (o = !1);
          o && delete t.__transition;
        }
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(9),
        i = e(6);
      n.a = function (t, n) {
        var u;
        return ("number" == typeof n ? i.f : n instanceof r.a ? i.m : (u = e.i(r.a)(n)) ? ((n = u), i.m) : i.i)(t, n);
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return (s.c[t.index] = { site: t, halfedges: [] });
      }
      function i(t, n) {
        var e = t.site,
          r = n.left,
          i = n.right;
        return (
          e === i && ((i = r), (r = e)),
          i
            ? Math.atan2(i[1] - r[1], i[0] - r[0])
            : (e === r ? ((r = n[1]), (i = n[0])) : ((r = n[0]), (i = n[1])), Math.atan2(r[0] - i[0], i[1] - r[1]))
        );
      }
      function u(t, n) {
        return n[+(n.left !== t.site)];
      }
      function a(t, n) {
        return n[+(n.left === t.site)];
      }
      function o() {
        for (var t, n, e, r, u = 0, a = s.c.length; u < a; ++u)
          if ((t = s.c[u]) && (r = (n = t.halfedges).length)) {
            var o = new Array(r),
              c = new Array(r);
            for (e = 0; e < r; ++e) (o[e] = e), (c[e] = i(t, s.d[n[e]]));
            for (
              o.sort(function (t, n) {
                return c[n] - c[t];
              }),
                e = 0;
              e < r;
              ++e
            )
              c[e] = n[o[e]];
            for (e = 0; e < r; ++e) n[e] = c[e];
          }
      }
      function c(t, n, r, i) {
        var o,
          c,
          l,
          h,
          d,
          p,
          v,
          b,
          g,
          y,
          _,
          m,
          x = s.c.length,
          w = !0;
        for (o = 0; o < x; ++o)
          if ((c = s.c[o])) {
            for (l = c.site, d = c.halfedges, h = d.length; h--; ) s.d[d[h]] || d.splice(h, 1);
            for (h = 0, p = d.length; h < p; )
              (y = a(c, s.d[d[h]])),
                (_ = y[0]),
                (m = y[1]),
                (v = u(c, s.d[d[++h % p]])),
                (b = v[0]),
                (g = v[1]),
                (Math.abs(_ - b) > s.b || Math.abs(m - g) > s.b) &&
                  (d.splice(
                    h,
                    0,
                    s.d.push(
                      e.i(f.b)(
                        l,
                        y,
                        Math.abs(_ - t) < s.b && i - m > s.b
                          ? [t, Math.abs(b - t) < s.b ? g : i]
                          : Math.abs(m - i) < s.b && r - _ > s.b
                          ? [Math.abs(g - i) < s.b ? b : r, i]
                          : Math.abs(_ - r) < s.b && m - n > s.b
                          ? [r, Math.abs(b - r) < s.b ? g : n]
                          : Math.abs(m - n) < s.b && _ - t > s.b
                          ? [Math.abs(g - n) < s.b ? b : t, n]
                          : null
                      )
                    ) - 1
                  ),
                  ++p);
            p && (w = !1);
          }
        if (w) {
          var M,
            k,
            N,
            A = 1 / 0;
          for (o = 0, w = null; o < x; ++o)
            (c = s.c[o]) &&
              ((l = c.site), (M = l[0] - t), (k = l[1] - n), (N = M * M + k * k) < A && ((A = N), (w = c)));
          if (w) {
            var S = [t, n],
              T = [t, i],
              E = [r, i],
              C = [r, n];
            w.halfedges.push(
              s.d.push(e.i(f.b)((l = w.site), S, T)) - 1,
              s.d.push(e.i(f.b)(l, T, E)) - 1,
              s.d.push(e.i(f.b)(l, E, C)) - 1,
              s.d.push(e.i(f.b)(l, C, S)) - 1
            );
          }
        }
        for (o = 0; o < x; ++o) (c = s.c[o]) && (c.halfedges.length || delete s.c[o]);
      }
      (n.d = r), (n.c = u), (n.a = o), (n.b = c);
      var f = e(98),
        s = e(36);
    },
    function (t, n, e) {
      "use strict";
      function r() {
        e.i(o.b)(this), (this.x = this.y = this.arc = this.site = this.cy = null);
      }
      function i(t) {
        var n = t.P,
          e = t.N;
        if (n && e) {
          var i = n.site,
            u = t.site,
            o = e.site;
          if (i !== o) {
            var s = u[0],
              l = u[1],
              h = i[0] - s,
              d = i[1] - l,
              p = o[0] - s,
              v = o[1] - l,
              b = 2 * (h * v - d * p);
            if (!(b >= -c.f)) {
              var g = h * h + d * d,
                y = p * p + v * v,
                _ = (v * g - d * y) / b,
                m = (h * y - p * g) / b,
                x = f.pop() || new r();
              (x.arc = t),
                (x.site = u),
                (x.x = _ + s),
                (x.y = (x.cy = m + l) + Math.sqrt(_ * _ + m * m)),
                (t.circle = x);
              for (var w = null, M = c.g._; M; )
                if (x.y < M.y || (x.y === M.y && x.x <= M.x)) {
                  if (!M.L) {
                    w = M.P;
                    break;
                  }
                  M = M.L;
                } else {
                  if (!M.R) {
                    w = M;
                    break;
                  }
                  M = M.R;
                }
              c.g.insert(w, x), w || (a = x);
            }
          }
        }
      }
      function u(t) {
        var n = t.circle;
        n && (n.P || (a = n.N), c.g.remove(n), f.push(n), e.i(o.b)(n), (t.circle = null));
      }
      e.d(n, "a", function () {
        return a;
      }),
        (n.c = i),
        (n.b = u);
      var a,
        o = e(99),
        c = e(36),
        f = [];
    },
    function (t, n, e) {
      "use strict";
      function r(t, n, e) {
        (this.k = t), (this.x = n), (this.y = e);
      }
      function i(t) {
        return t.__zoom || u;
      }
      (n.c = r),
        e.d(n, "b", function () {
          return u;
        }),
        (n.a = i),
        (r.prototype = {
          constructor: r,
          scale: function (t) {
            return 1 === t ? this : new r(this.k * t, this.x, this.y);
          },
          translate: function (t, n) {
            return (0 === t) & (0 === n) ? this : new r(this.k, this.x + this.k * t, this.y + this.k * n);
          },
          apply: function (t) {
            return [t[0] * this.k + this.x, t[1] * this.k + this.y];
          },
          applyX: function (t) {
            return t * this.k + this.x;
          },
          applyY: function (t) {
            return t * this.k + this.y;
          },
          invert: function (t) {
            return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
          },
          invertX: function (t) {
            return (t - this.x) / this.k;
          },
          invertY: function (t) {
            return (t - this.y) / this.k;
          },
          rescaleX: function (t) {
            return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t));
          },
          rescaleY: function (t) {
            return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t));
          },
          toString: function () {
            return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
          },
        });
      var u = new r(1, 0, 0);
      i.prototype = r.prototype;
    },
    function (t, n, e) {
      "use strict";
      Object.defineProperty(n, "__esModule", { value: !0 }),
        (function (t) {
          for (var e in t) n.hasOwnProperty(e) || (n[e] = t[e]);
        })(e(55));
    },
    function (t, n, e) {
      "use strict";
      Object.defineProperty(n, "__esModule", { value: !0 });
      var r = e(100),
        i = e(55),
        u = e(101),
        a = (function () {
          function t(t, n, e) {
            void 0 === e && (e = null), (this.svg = t), (this.needleUpdateSpeed = n), (this.needle = e);
          }
          return (
            (t.prototype.updateNeedle = function (t) {
              var n = this;
              if (!this.needle) return void u.warn("Gauge-chart Warning: no needle to update");
              (t = i.needleValueModifier(t)),
                this.needle
                  .getSelection()
                  .transition()
                  .duration(this.needleUpdateSpeed)
                  .ease(r.easeCubic)
                  .tween("needle animation", function () {
                    var e = n.needle.getValue(),
                      i = r.interpolateNumber(e, t);
                    return function (t) {
                      return n.needle.setValue(i(t));
                    };
                  });
            }),
            (t.prototype.removeGauge = function () {
              this.svg.remove();
            }),
            t
          );
        })();
      n.Gauge = a;
    },
    function (t, n, e) {
      "use strict";
      Object.defineProperty(n, "__esModule", { value: !0 });
      var r = e(100),
        i = e(55),
        u = (function () {
          function t(t, n, e, i, u, a, o, c) {
            (this.needleValue = n),
              (this.centralLabel = e),
              (this.chartHeight = i),
              (this.outerRadius = u),
              (this.offset = a),
              (this.needleColor = o),
              (this.outerNeedle = c),
              (this.lineFunction = r
                .line()
                .x(function (t) {
                  return t.x;
                })
                .y(function (t) {
                  return t.y;
                })
                .curve(r.curveLinear)),
              (this.needleSvg = t
                .append("path")
                .attr("d", this.getLine())
                .attr("stroke", this.needleColor)
                .attr("stroke-width", 2)
                .attr("fill", this.needleColor)
                .attr(
                  "transform",
                  "translate(" + (this.chartHeight + 2 * this.offset) + ", " + (this.chartHeight + this.offset) + ")"
                ));
          }
          return (
            (t.prototype.setValue = function (t) {
              (this.needleValue = t), this.needleSvg.attr("d", this.getLine());
            }),
            (t.prototype.getValue = function () {
              return this.needleValue;
            }),
            (t.prototype.calcCoordinates = function () {
              var t = this.centralLabel ? 0.7 * this.chartHeight : 0.1 * this.chartHeight;
              t = this.outerNeedle ? 0.25 * this.chartHeight : t;
              var n = this.outerNeedle ? 1.4 * this.outerRadius : 0.97 * this.outerRadius,
                e = 0.5 * t,
                r = 0.5 * t,
                u = i.perc2RadWithShift(this.needleValue);
              return this.outerNeedle
                ? [
                    { x: n * Math.sin(u), y: -n * Math.cos(u) },
                    { x: (n + e) * Math.sin(u) + r * Math.cos(u), y: -(n + e) * Math.cos(u) + r * Math.sin(u) },
                    { x: (n + e) * Math.sin(u) - r * Math.cos(u), y: -(n + e) * Math.cos(u) - r * Math.sin(u) },
                    { x: n * Math.sin(u), y: -n * Math.cos(u) },
                  ]
                : this.centralLabel
                ? [
                    { x: n * Math.sin(u), y: -n * Math.cos(u) },
                    {
                      x: 1.5 * r * Math.sin(u) - (r / 3) * Math.cos(u),
                      y: -1.5 * r * Math.cos(u) - (r / 3) * Math.sin(u),
                    },
                    {
                      x: 1.5 * r * Math.sin(u) + (r / 3) * Math.cos(u),
                      y: -1.5 * r * Math.cos(u) + (r / 3) * Math.sin(u),
                    },
                    { x: n * Math.sin(u), y: -n * Math.cos(u) },
                  ]
                : [
                    { x: n * Math.sin(u), y: -n * Math.cos(u) },
                    { x: -r * Math.cos(u), y: -r * Math.sin(u) },
                    { x: -e * Math.sin(u), y: e * Math.cos(u) },
                    { x: r * Math.cos(u), y: r * Math.sin(u) },
                    { x: n * Math.sin(u), y: -n * Math.cos(u) },
                  ];
            }),
            (t.prototype.getSelection = function () {
              return this.needleSvg;
            }),
            (t.prototype.getLine = function () {
              return this.lineFunction(this.calcCoordinates());
            }),
            t
          );
        })();
      n.Needle = u;
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return (
          !t ||
          !(t.slice(-1)[0] >= 100 || t[0] <= 0) ||
          (h.error("Gauge-chart Error: gauge delimiters have to be LARGER than 0 and LESS than 100"), !1)
        );
      }
      function i(t) {
        var n = !0;
        return (
          t &&
            t.forEach(function (e, r) {
              r && e < t[r - 1] && (h.error("Gauge-chart Error: gauge delimiters are not sorted"), (n = !1));
            }),
          n
        );
      }
      function u(t, n) {
        t &&
          n &&
          t.length > n.length - 1 &&
          h.warn("Gauge-chart Warning: list of colors is not complete, standard colors added to the chart");
      }
      function a(t, n) {
        t &&
          n &&
          t.length < n.length - 1 &&
          h.warn("Gauge-chart Warning: list of colors exceeds number of slices, therefore it was shortened");
      }
      function o(t) {
        (t < 0 || t > 100) && h.warn("Gauge-chart Warning: value of needdle is less that 0 or larger than 100");
      }
      function c(t) {
        t.length > 2 && h.warn("Gauge-chart Warning: number of range label parameters is bigger than 2");
      }
      function f(t, n, e) {
        u(t, n), a(t, n), c(e);
      }
      function s(t) {
        return r(t) && i(t);
      }
      function l(t, n, e) {
        return f(t, n, e), s(t);
      }
      Object.defineProperty(n, "__esModule", { value: !0 });
      var h = e(101);
      (n.delimiterRangeErrorChecker = r),
        (n.delimiterSortErrorChecker = i),
        (n.colorsLackWarnChecker = u),
        (n.colorsExcessWarnChecker = a),
        (n.needleValueWarnChecker = o),
        (n.rangeLabelNumberWarnChecker = c),
        (n.warnChecker = f),
        (n.errorChecker = s),
        (n.paramChecker = l);
    },
    function (t, n, e) {
      "use strict";
      Object.defineProperty(n, "__esModule", { value: !0 }),
        (function (t) {
          for (var e in t) n.hasOwnProperty(e) || (n[e] = t[e]);
        })(e(192));
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t) {
        return function () {
          return t;
        };
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(108);
      n.a = function (t, n, e) {
        var i,
          u,
          a,
          o,
          c = t.length,
          f = n.length,
          s = new Array(c * f);
        for (null == e && (e = r.b), i = a = 0; i < c; ++i) for (o = t[i], u = 0; u < f; ++u, ++a) s[a] = e(o, n[u]);
        return s;
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t, n) {
        return n < t ? -1 : n > t ? 1 : n >= t ? 0 : NaN;
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(102),
        i = e(103),
        u = e(197),
        a = e(106),
        o = e(201),
        c = e(109),
        f = e(111),
        s = e(110);
      n.a = function () {
        function t(t) {
          var r,
            u,
            a = t.length,
            o = new Array(a);
          for (r = 0; r < a; ++r) o[r] = n(t[r], r, t);
          var s = l(o),
            d = s[0],
            p = s[1],
            v = h(o, d, p);
          Array.isArray(v) || ((v = e.i(f.c)(d, p, v)), (v = e.i(c.a)(Math.ceil(d / v) * v, Math.floor(p / v) * v, v)));
          for (var b = v.length; v[0] <= d; ) v.shift(), --b;
          for (; v[b - 1] > p; ) v.pop(), --b;
          var g,
            y = new Array(b + 1);
          for (r = 0; r <= b; ++r) (g = y[r] = []), (g.x0 = r > 0 ? v[r - 1] : d), (g.x1 = r < b ? v[r] : p);
          for (r = 0; r < a; ++r) (u = o[r]), d <= u && u <= p && y[e.i(i.a)(v, u, 0, b)].push(t[r]);
          return y;
        }
        var n = o.a,
          l = a.a,
          h = s.a;
        return (
          (t.value = function (r) {
            return arguments.length ? ((n = "function" == typeof r ? r : e.i(u.a)(r)), t) : n;
          }),
          (t.domain = function (n) {
            return arguments.length ? ((l = "function" == typeof n ? n : e.i(u.a)([n[0], n[1]])), t) : l;
          }),
          (t.thresholds = function (n) {
            return arguments.length
              ? ((h = "function" == typeof n ? n : Array.isArray(n) ? e.i(u.a)(r.b.call(n)) : e.i(u.a)(n)), t)
              : h;
          }),
          t
        );
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t) {
        return t;
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t, n) {
        var e,
          r,
          i = t.length,
          u = -1;
        if (null == n) {
          for (; ++u < i; )
            if (null != (e = t[u]) && e >= e) for (r = e; ++u < i; ) null != (e = t[u]) && e > r && (r = e);
        } else
          for (; ++u < i; )
            if (null != (e = n(t[u], u, t)) && e >= e)
              for (r = e; ++u < i; ) null != (e = n(t[u], u, t)) && e > r && (r = e);
        return r;
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(24);
      n.a = function (t, n) {
        var i,
          u = t.length,
          a = u,
          o = -1,
          c = 0;
        if (null == n) for (; ++o < u; ) isNaN((i = e.i(r.a)(t[o]))) ? --a : (c += i);
        else for (; ++o < u; ) isNaN((i = e.i(r.a)(n(t[o], o, t)))) ? --a : (c += i);
        if (a) return c / a;
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(19),
        i = e(24),
        u = e(56);
      n.a = function (t, n) {
        var a,
          o = t.length,
          c = -1,
          f = [];
        if (null == n) for (; ++c < o; ) isNaN((a = e.i(i.a)(t[c]))) || f.push(a);
        else for (; ++c < o; ) isNaN((a = e.i(i.a)(n(t[c], c, t)))) || f.push(a);
        return e.i(u.a)(f.sort(r.a), 0.5);
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t) {
        for (var n, e, r, i = t.length, u = -1, a = 0; ++u < i; ) a += t[u].length;
        for (e = new Array(a); --i >= 0; ) for (r = t[i], n = r.length; --n >= 0; ) e[--a] = r[n];
        return e;
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t, n) {
        for (var e = n.length, r = new Array(e); e--; ) r[e] = t[n[e]];
        return r;
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(19);
      n.a = function (t, n) {
        if ((e = t.length)) {
          var e,
            i,
            u = 0,
            a = 0,
            o = t[a];
          for (null == n && (n = r.a); ++u < e; ) (n((i = t[u]), o) < 0 || 0 !== n(o, o)) && ((o = i), (a = u));
          return 0 === n(o, o) ? a : void 0;
        }
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t, n, e) {
        for (var r, i, u = (null == e ? t.length : e) - (n = null == n ? 0 : +n); u; )
          (i = (Math.random() * u--) | 0), (r = t[u + n]), (t[u + n] = t[i + n]), (t[i + n] = r);
        return t;
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t, n) {
        var e,
          r = t.length,
          i = -1,
          u = 0;
        if (null == n) for (; ++i < r; ) (e = +t[i]) && (u += e);
        else for (; ++i < r; ) (e = +n(t[i], i, t)) && (u += e);
        return u;
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(102),
        i = e(19),
        u = e(24),
        a = e(56);
      n.a = function (t, n, o) {
        return (
          (t = r.a.call(t, u.a).sort(i.a)),
          Math.ceil((o - n) / (2 * (e.i(a.a)(t, 0.75) - e.i(a.a)(t, 0.25)) * Math.pow(t.length, -1 / 3)))
        );
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(105);
      n.a = function (t, n, i) {
        return Math.ceil((i - n) / (3.5 * e.i(r.a)(t) * Math.pow(t.length, -1 / 3)));
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(112);
      n.a = function () {
        return e.i(r.a)(arguments);
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(215);
      e.d(n, "a", function () {
        return r.a;
      }),
        e.d(n, "b", function () {
          return r.b;
        }),
        e.d(n, "c", function () {
          return r.c;
        }),
        e.d(n, "d", function () {
          return r.d;
        });
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "a", function () {
        return r;
      });
      var r = Array.prototype.slice;
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return "translate(" + (t + 0.5) + ",0)";
      }
      function i(t) {
        return "translate(0," + (t + 0.5) + ")";
      }
      function u(t) {
        return function (n) {
          return +t(n);
        };
      }
      function a(t) {
        var n = Math.max(0, t.bandwidth() - 1) / 2;
        return (
          t.round() && (n = Math.round(n)),
          function (e) {
            return +t(e) + n;
          }
        );
      }
      function o() {
        return !this.__axis;
      }
      function c(t, n) {
        function e(e) {
          var r = null == f ? (n.ticks ? n.ticks.apply(n, c) : n.domain()) : f,
            i = null == s ? (n.tickFormat ? n.tickFormat.apply(n, c) : p.a) : s,
            d = Math.max(l, 0) + m,
            k = n.range(),
            N = +k[0] + 0.5,
            A = +k[k.length - 1] + 0.5,
            S = (n.bandwidth ? a : u)(n.copy()),
            T = e.selection ? e.selection() : e,
            E = T.selectAll(".domain").data([null]),
            C = T.selectAll(".tick").data(r, n).order(),
            P = C.exit(),
            z = C.enter().append("g").attr("class", "tick"),
            R = C.select("line"),
            q = C.select("text");
          (E = E.merge(E.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "#000"))),
            (C = C.merge(z)),
            (R = R.merge(
              z
                .append("line")
                .attr("stroke", "#000")
                .attr(w + "2", x * l)
            )),
            (q = q.merge(
              z
                .append("text")
                .attr("fill", "#000")
                .attr(w, x * d)
                .attr("dy", t === v ? "0em" : t === g ? "0.71em" : "0.32em")
            )),
            e !== T &&
              ((E = E.transition(e)),
              (C = C.transition(e)),
              (R = R.transition(e)),
              (q = q.transition(e)),
              (P = P.transition(e)
                .attr("opacity", _)
                .attr("transform", function (t) {
                  return isFinite((t = S(t))) ? M(t) : this.getAttribute("transform");
                })),
              z.attr("opacity", _).attr("transform", function (t) {
                var n = this.parentNode.__axis;
                return M(n && isFinite((n = n(t))) ? n : S(t));
              })),
            P.remove(),
            E.attr(
              "d",
              t === y || t == b
                ? "M" + x * h + "," + N + "H0.5V" + A + "H" + x * h
                : "M" + N + "," + x * h + "V0.5H" + A + "V" + x * h
            ),
            C.attr("opacity", 1).attr("transform", function (t) {
              return M(S(t));
            }),
            R.attr(w + "2", x * l),
            q.attr(w, x * d).text(i),
            T.filter(o)
              .attr("fill", "none")
              .attr("font-size", 10)
              .attr("font-family", "sans-serif")
              .attr("text-anchor", t === b ? "start" : t === y ? "end" : "middle"),
            T.each(function () {
              this.__axis = S;
            });
        }
        var c = [],
          f = null,
          s = null,
          l = 6,
          h = 6,
          m = 3,
          x = t === v || t === y ? -1 : 1,
          w = t === y || t === b ? "x" : "y",
          M = t === v || t === g ? r : i;
        return (
          (e.scale = function (t) {
            return arguments.length ? ((n = t), e) : n;
          }),
          (e.ticks = function () {
            return (c = d.a.call(arguments)), e;
          }),
          (e.tickArguments = function (t) {
            return arguments.length ? ((c = null == t ? [] : d.a.call(t)), e) : c.slice();
          }),
          (e.tickValues = function (t) {
            return arguments.length ? ((f = null == t ? null : d.a.call(t)), e) : f && f.slice();
          }),
          (e.tickFormat = function (t) {
            return arguments.length ? ((s = t), e) : s;
          }),
          (e.tickSize = function (t) {
            return arguments.length ? ((l = h = +t), e) : l;
          }),
          (e.tickSizeInner = function (t) {
            return arguments.length ? ((l = +t), e) : l;
          }),
          (e.tickSizeOuter = function (t) {
            return arguments.length ? ((h = +t), e) : h;
          }),
          (e.tickPadding = function (t) {
            return arguments.length ? ((m = +t), e) : m;
          }),
          e
        );
      }
      function f(t) {
        return c(v, t);
      }
      function s(t) {
        return c(b, t);
      }
      function l(t) {
        return c(g, t);
      }
      function h(t) {
        return c(y, t);
      }
      (n.a = f), (n.b = s), (n.c = l), (n.d = h);
      var d = e(214),
        p = e(216),
        v = 1,
        b = 2,
        g = 3,
        y = 4,
        _ = 1e-6;
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t) {
        return t;
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(218);
      e.d(n, "a", function () {
        return r.a;
      }),
        e.d(n, "b", function () {
          return r.b;
        }),
        e.d(n, "c", function () {
          return r.c;
        }),
        e.d(n, "d", function () {
          return r.d;
        });
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return { type: t };
      }
      function i() {
        return !v.r.button;
      }
      function u() {
        var t = this.ownerSVGElement || this;
        return [
          [0, 0],
          [t.width.baseVal.value, t.height.baseVal.value],
        ];
      }
      function a(t) {
        for (; !t.__brush; ) if (!(t = t.parentNode)) return;
        return t.__brush;
      }
      function o(t) {
        return t[0][0] === t[1][0] || t[0][1] === t[1][1];
      }
      function c(t) {
        var n = t.__brush;
        return n ? n.dim.output(n.selection) : null;
      }
      function f() {
        return l(k);
      }
      function s() {
        return l(N);
      }
      function l(t) {
        function n(n) {
          var i = n
            .property("__brush", A)
            .selectAll(".overlay")
            .data([r("overlay")]);
          i
            .enter()
            .append("rect")
            .attr("class", "overlay")
            .attr("pointer-events", "all")
            .attr("cursor", S.overlay)
            .merge(i)
            .each(function () {
              var t = a(this).extent;
              e.i(v.i)(this)
                .attr("x", t[0][0])
                .attr("y", t[0][1])
                .attr("width", t[1][0] - t[0][0])
                .attr("height", t[1][1] - t[0][1]);
            }),
            n
              .selectAll(".selection")
              .data([r("selection")])
              .enter()
              .append("rect")
              .attr("class", "selection")
              .attr("cursor", S.selection)
              .attr("fill", "#777")
              .attr("fill-opacity", 0.3)
              .attr("stroke", "#fff")
              .attr("shape-rendering", "crispEdges");
          var u = n.selectAll(".handle").data(t.handles, function (t) {
            return t.type;
          });
          u.exit().remove(),
            u
              .enter()
              .append("rect")
              .attr("class", function (t) {
                return "handle handle--" + t.type;
              })
              .attr("cursor", function (t) {
                return S[t.type];
              }),
            n
              .each(c)
              .attr("fill", "none")
              .attr("pointer-events", "all")
              .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)")
              .on("mousedown.brush touchstart.brush", l);
        }
        function c() {
          var t = e.i(v.i)(this),
            n = a(this).selection;
          n
            ? (t
                .selectAll(".selection")
                .style("display", null)
                .attr("x", n[0][0])
                .attr("y", n[0][1])
                .attr("width", n[1][0] - n[0][0])
                .attr("height", n[1][1] - n[0][1]),
              t
                .selectAll(".handle")
                .style("display", null)
                .attr("x", function (t) {
                  return "e" === t.type[t.type.length - 1] ? n[1][0] - O / 2 : n[0][0] - O / 2;
                })
                .attr("y", function (t) {
                  return "s" === t.type[0] ? n[1][1] - O / 2 : n[0][1] - O / 2;
                })
                .attr("width", function (t) {
                  return "n" === t.type || "s" === t.type ? n[1][0] - n[0][0] + O : O;
                })
                .attr("height", function (t) {
                  return "e" === t.type || "w" === t.type ? n[1][1] - n[0][1] + O : O;
                }))
            : t
                .selectAll(".selection,.handle")
                .style("display", "none")
                .attr("x", null)
                .attr("y", null)
                .attr("width", null)
                .attr("height", null);
        }
        function f(t, n) {
          return t.__brush.emitter || new s(t, n);
        }
        function s(t, n) {
          (this.that = t), (this.args = n), (this.state = t.__brush), (this.active = 0);
        }
        function l() {
          function n() {
            var t = e.i(v.e)(B);
            !K || j || I || (Math.abs(t[0] - nt[0]) > Math.abs(t[1] - nt[1]) ? (I = !0) : (j = !0)),
              (nt = t),
              (U = !0),
              e.i(_.a)(),
              r();
          }
          function r() {
            var t;
            switch (((O = nt[0] - tt[0]), (D = nt[1] - tt[1]), F)) {
              case x:
              case m:
                H && ((O = Math.max($ - l, Math.min(Z - y, O))), (h = l + O), (A = y + O)),
                  X && ((D = Math.max(Q - p, Math.min(J - R, D))), (g = p + D), (L = R + D));
                break;
              case w:
                H < 0
                  ? ((O = Math.max($ - l, Math.min(Z - l, O))), (h = l + O), (A = y))
                  : H > 0 && ((O = Math.max($ - y, Math.min(Z - y, O))), (h = l), (A = y + O)),
                  X < 0
                    ? ((D = Math.max(Q - p, Math.min(J - p, D))), (g = p + D), (L = R))
                    : X > 0 && ((D = Math.max(Q - R, Math.min(J - R, D))), (g = p), (L = R + D));
                break;
              case M:
                H && ((h = Math.max($, Math.min(Z, l - O * H))), (A = Math.max($, Math.min(Z, y + O * H)))),
                  X && ((g = Math.max(Q, Math.min(J, p - D * X))), (L = Math.max(Q, Math.min(J, R + D * X))));
            }
            A < h &&
              ((H *= -1),
              (t = l),
              (l = y),
              (y = t),
              (t = h),
              (h = A),
              (A = t),
              Y in T && it.attr("cursor", S[(Y = T[Y])])),
              L < g &&
                ((X *= -1),
                (t = p),
                (p = R),
                (R = t),
                (t = g),
                (g = L),
                (L = t),
                Y in E && it.attr("cursor", S[(Y = E[Y])])),
              G.selection && (W = G.selection),
              j && ((h = W[0][0]), (A = W[1][0])),
              I && ((g = W[0][1]), (L = W[1][1])),
              (W[0][0] === h && W[0][1] === g && W[1][0] === A && W[1][1] === L) ||
                ((G.selection = [
                  [h, g],
                  [A, L],
                ]),
                c.call(B),
                et.brush());
          }
          function i() {
            if ((e.i(_.b)(), v.r.touches)) {
              if (v.r.touches.length) return;
              z && clearTimeout(z),
                (z = setTimeout(function () {
                  z = null;
                }, 500)),
                rt.on("touchmove.brush touchend.brush touchcancel.brush", null);
            } else e.i(d.c)(v.r.view, U), ut.on("keydown.brush keyup.brush mousemove.brush mouseup.brush", null);
            rt.attr("pointer-events", "all"),
              it.attr("cursor", S.overlay),
              G.selection && (W = G.selection),
              o(W) && ((G.selection = null), c.call(B)),
              et.end();
          }
          function u() {
            switch (v.r.keyCode) {
              case 16:
                K = H && X;
                break;
              case 18:
                F === w &&
                  (H && ((y = A - O * H), (l = h + O * H)), X && ((R = L - D * X), (p = g + D * X)), (F = M), r());
                break;
              case 32:
                (F !== w && F !== M) ||
                  (H < 0 ? (y = A - O) : H > 0 && (l = h - O),
                  X < 0 ? (R = L - D) : X > 0 && (p = g - D),
                  (F = x),
                  it.attr("cursor", S.selection),
                  r());
                break;
              default:
                return;
            }
            e.i(_.a)();
          }
          function s() {
            switch (v.r.keyCode) {
              case 16:
                K && ((j = I = K = !1), r());
                break;
              case 18:
                F === M && (H < 0 ? (y = A) : H > 0 && (l = h), X < 0 ? (R = L) : X > 0 && (p = g), (F = w), r());
                break;
              case 32:
                F === x &&
                  (v.r.altKey
                    ? (H && ((y = A - O * H), (l = h + O * H)), X && ((R = L - D * X), (p = g + D * X)), (F = M))
                    : (H < 0 ? (y = A) : H > 0 && (l = h), X < 0 ? (R = L) : X > 0 && (p = g), (F = w)),
                  it.attr("cursor", S[Y]),
                  r());
                break;
              default:
                return;
            }
            e.i(_.a)();
          }
          if (v.r.touches) {
            if (v.r.changedTouches.length < v.r.touches.length) return e.i(_.a)();
          } else if (z) return;
          if (q.apply(this, arguments)) {
            var l,
              h,
              p,
              g,
              y,
              A,
              R,
              L,
              O,
              D,
              U,
              j,
              I,
              B = this,
              Y = v.r.target.__data__.type,
              F = "selection" === (v.r.metaKey ? (Y = "overlay") : Y) ? m : v.r.altKey ? M : w,
              H = t === N ? null : C[Y],
              X = t === k ? null : P[Y],
              G = a(B),
              V = G.extent,
              W = G.selection,
              $ = V[0][0],
              Q = V[0][1],
              Z = V[1][0],
              J = V[1][1],
              K = H && X && v.r.shiftKey,
              tt = e.i(v.e)(B),
              nt = tt,
              et = f(B, arguments).beforestart();
            "overlay" === Y
              ? (G.selection = W =
                  [
                    [(l = t === N ? $ : tt[0]), (p = t === k ? Q : tt[1])],
                    [(y = t === N ? Z : l), (R = t === k ? J : p)],
                  ])
              : ((l = W[0][0]), (p = W[0][1]), (y = W[1][0]), (R = W[1][1])),
              (h = l),
              (g = p),
              (A = y),
              (L = R);
            var rt = e.i(v.i)(B).attr("pointer-events", "none"),
              it = rt.selectAll(".overlay").attr("cursor", S[Y]);
            if (v.r.touches) rt.on("touchmove.brush", n, !0).on("touchend.brush touchcancel.brush", i, !0);
            else {
              var ut = e
                .i(v.i)(v.r.view)
                .on("keydown.brush", u, !0)
                .on("keyup.brush", s, !0)
                .on("mousemove.brush", n, !0)
                .on("mouseup.brush", i, !0);
              e.i(d.b)(v.r.view);
            }
            e.i(_.b)(), e.i(b.c)(B), c.call(B), et.start();
          }
        }
        function A() {
          var n = this.__brush || { selection: null };
          return (n.extent = R.apply(this, arguments)), (n.dim = t), n;
        }
        var z,
          R = u,
          q = i,
          L = e.i(h.a)(n, "start", "brush", "end"),
          O = 6;
        return (
          (n.move = function (n, r) {
            n.selection
              ? n
                  .on("start.brush", function () {
                    f(this, arguments).beforestart().start();
                  })
                  .on("interrupt.brush end.brush", function () {
                    f(this, arguments).end();
                  })
                  .tween("brush", function () {
                    function n(t) {
                      (u.selection = 1 === t && o(l) ? null : h(t)), c.call(i), a.brush();
                    }
                    var i = this,
                      u = i.__brush,
                      a = f(i, arguments),
                      s = u.selection,
                      l = t.input("function" == typeof r ? r.apply(this, arguments) : r, u.extent),
                      h = e.i(p.a)(s, l);
                    return s && l ? n : n(1);
                  })
              : n.each(function () {
                  var n = this,
                    i = arguments,
                    u = n.__brush,
                    a = t.input("function" == typeof r ? r.apply(n, i) : r, u.extent),
                    s = f(n, i).beforestart();
                  e.i(b.c)(n), (u.selection = null == a || o(a) ? null : a), c.call(n), s.start().brush().end();
                });
          }),
          (s.prototype = {
            beforestart: function () {
              return 1 == ++this.active && ((this.state.emitter = this), (this.starting = !0)), this;
            },
            start: function () {
              return this.starting && ((this.starting = !1), this.emit("start")), this;
            },
            brush: function () {
              return this.emit("brush"), this;
            },
            end: function () {
              return 0 == --this.active && (delete this.state.emitter, this.emit("end")), this;
            },
            emit: function (r) {
              e.i(v.s)(new y.a(n, r, t.output(this.state.selection)), L.apply, L, [r, this.that, this.args]);
            },
          }),
          (n.extent = function (t) {
            return arguments.length
              ? ((R =
                  "function" == typeof t
                    ? t
                    : e.i(g.a)([
                        [+t[0][0], +t[0][1]],
                        [+t[1][0], +t[1][1]],
                      ])),
                n)
              : R;
          }),
          (n.filter = function (t) {
            return arguments.length ? ((q = "function" == typeof t ? t : e.i(g.a)(!!t)), n) : q;
          }),
          (n.handleSize = function (t) {
            return arguments.length ? ((O = +t), n) : O;
          }),
          (n.on = function () {
            var t = L.on.apply(L, arguments);
            return t === L ? n : t;
          }),
          n
        );
      }
      (n.d = c), (n.b = f), (n.c = s);
      var h = e(14),
        d = e(60),
        p = e(6),
        v = e(3),
        b = e(97),
        g = e(219),
        y = e(220),
        _ = e(221),
        m = { name: "drag" },
        x = { name: "space" },
        w = { name: "handle" },
        M = { name: "center" },
        k = {
          name: "x",
          handles: ["e", "w"].map(r),
          input: function (t, n) {
            return (
              t && [
                [t[0], n[0][1]],
                [t[1], n[1][1]],
              ]
            );
          },
          output: function (t) {
            return t && [t[0][0], t[1][0]];
          },
        },
        N = {
          name: "y",
          handles: ["n", "s"].map(r),
          input: function (t, n) {
            return (
              t && [
                [n[0][0], t[0]],
                [n[1][0], t[1]],
              ]
            );
          },
          output: function (t) {
            return t && [t[0][1], t[1][1]];
          },
        },
        A = {
          name: "xy",
          handles: ["n", "e", "s", "w", "nw", "ne", "se", "sw"].map(r),
          input: function (t) {
            return t;
          },
          output: function (t) {
            return t;
          },
        },
        S = {
          overlay: "crosshair",
          selection: "move",
          n: "ns-resize",
          e: "ew-resize",
          s: "ns-resize",
          w: "ew-resize",
          nw: "nwse-resize",
          ne: "nesw-resize",
          se: "nwse-resize",
          sw: "nesw-resize",
        },
        T = { e: "w", w: "e", nw: "ne", ne: "nw", se: "sw", sw: "se" },
        E = { n: "s", s: "n", nw: "sw", ne: "se", se: "ne", sw: "nw" },
        C = { overlay: 1, selection: 1, n: null, e: 1, s: null, w: -1, nw: -1, ne: 1, se: 1, sw: -1 },
        P = { overlay: 1, selection: 1, n: -1, e: null, s: 1, w: null, nw: -1, ne: -1, se: 1, sw: 1 };
      n.a = function () {
        return l(A);
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t) {
        return function () {
          return t;
        };
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t, n, e) {
        (this.target = t), (this.type = n), (this.selection = e);
      };
    },
    function (t, n, e) {
      "use strict";
      function r() {
        i.r.stopImmediatePropagation();
      }
      n.b = r;
      var i = e(3);
      n.a = function () {
        i.r.preventDefault(), i.r.stopImmediatePropagation();
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(224);
      e.d(n, "a", function () {
        return r.a;
      });
      var i = e(226);
      e.d(n, "b", function () {
        return i.a;
      });
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "a", function () {
        return r;
      });
      var r = Array.prototype.slice;
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return function (n, e) {
          return t(n.source.value + n.target.value, e.source.value + e.target.value);
        };
      }
      var i = e(5),
        u = e(114);
      n.a = function () {
        function t(t) {
          var r,
            f,
            s,
            l,
            h,
            d,
            p = t.length,
            v = [],
            b = e.i(i.v)(p),
            g = [],
            y = [],
            _ = (y.groups = new Array(p)),
            m = new Array(p * p);
          for (r = 0, h = -1; ++h < p; ) {
            for (f = 0, d = -1; ++d < p; ) f += t[h][d];
            v.push(f), g.push(e.i(i.v)(p)), (r += f);
          }
          for (
            a &&
              b.sort(function (t, n) {
                return a(v[t], v[n]);
              }),
              o &&
                g.forEach(function (n, e) {
                  n.sort(function (n, r) {
                    return o(t[e][n], t[e][r]);
                  });
                }),
              r = e.i(u.d)(0, u.e - n * p) / r,
              l = r ? n : u.e / p,
              f = 0,
              h = -1;
            ++h < p;

          ) {
            for (s = f, d = -1; ++d < p; ) {
              var x = b[h],
                w = g[x][d],
                M = t[x][w],
                k = f,
                N = (f += M * r);
              m[w * p + x] = { index: x, subindex: w, startAngle: k, endAngle: N, value: M };
            }
            (_[x] = { index: x, startAngle: s, endAngle: f, value: v[x] }), (f += l);
          }
          for (h = -1; ++h < p; )
            for (d = h - 1; ++d < p; ) {
              var A = m[d * p + h],
                S = m[h * p + d];
              (A.value || S.value) && y.push(A.value < S.value ? { source: S, target: A } : { source: A, target: S });
            }
          return c ? y.sort(c) : y;
        }
        var n = 0,
          a = null,
          o = null,
          c = null;
        return (
          (t.padAngle = function (r) {
            return arguments.length ? ((n = e.i(u.d)(0, r)), t) : n;
          }),
          (t.sortGroups = function (n) {
            return arguments.length ? ((a = n), t) : a;
          }),
          (t.sortSubgroups = function (n) {
            return arguments.length ? ((o = n), t) : o;
          }),
          (t.sortChords = function (n) {
            return arguments.length ? (null == n ? (c = null) : ((c = r(n))._ = n), t) : c && c._;
          }),
          t
        );
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t) {
        return function () {
          return t;
        };
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return t.source;
      }
      function i(t) {
        return t.target;
      }
      function u(t) {
        return t.radius;
      }
      function a(t) {
        return t.startAngle;
      }
      function o(t) {
        return t.endAngle;
      }
      var c = e(223),
        f = e(225),
        s = e(114),
        l = e(16);
      n.a = function () {
        function t() {
          var t,
            r = c.a.call(arguments),
            i = n.apply(this, r),
            u = h.apply(this, r),
            a = +d.apply(this, ((r[0] = i), r)),
            o = p.apply(this, r) - s.a,
            f = v.apply(this, r) - s.a,
            g = a * e.i(s.b)(o),
            y = a * e.i(s.c)(o),
            _ = +d.apply(this, ((r[0] = u), r)),
            m = p.apply(this, r) - s.a,
            x = v.apply(this, r) - s.a;
          if (
            (b || (b = t = e.i(l.a)()),
            b.moveTo(g, y),
            b.arc(0, 0, a, o, f),
            (o === m && f === x) || (b.quadraticCurveTo(0, 0, _ * e.i(s.b)(m), _ * e.i(s.c)(m)), b.arc(0, 0, _, m, x)),
            b.quadraticCurveTo(0, 0, g, y),
            b.closePath(),
            t)
          )
            return (b = null), t + "" || null;
        }
        var n = r,
          h = i,
          d = u,
          p = a,
          v = o,
          b = null;
        return (
          (t.radius = function (n) {
            return arguments.length ? ((d = "function" == typeof n ? n : e.i(f.a)(+n)), t) : d;
          }),
          (t.startAngle = function (n) {
            return arguments.length ? ((p = "function" == typeof n ? n : e.i(f.a)(+n)), t) : p;
          }),
          (t.endAngle = function (n) {
            return arguments.length ? ((v = "function" == typeof n ? n : e.i(f.a)(+n)), t) : v;
          }),
          (t.source = function (e) {
            return arguments.length ? ((n = e), t) : n;
          }),
          (t.target = function (n) {
            return arguments.length ? ((h = n), t) : h;
          }),
          (t.context = function (n) {
            return arguments.length ? ((b = null == n ? null : n), t) : b;
          }),
          t
        );
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t) {
        var n = [];
        for (var e in t) n.push({ key: e, value: t[e] });
        return n;
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t) {
        var n = [];
        for (var e in t) n.push(e);
        return n;
      };
    },
    function (t, n, e) {
      "use strict";
      function r() {
        return {};
      }
      function i(t, n, e) {
        t[n] = e;
      }
      function u() {
        return e.i(o.a)();
      }
      function a(t, n, e) {
        t.set(n, e);
      }
      var o = e(57);
      n.a = function () {
        function t(n, r, i, u) {
          if (r >= l.length) return null != c && n.sort(c), null != f ? f(n) : n;
          for (var a, s, h, d = -1, p = n.length, v = l[r++], b = e.i(o.a)(), g = i(); ++d < p; )
            (h = b.get((a = v((s = n[d])) + ""))) ? h.push(s) : b.set(a, [s]);
          return (
            b.each(function (n, e) {
              u(g, e, t(n, r, i, u));
            }),
            g
          );
        }
        function n(t, e) {
          if (++e > l.length) return t;
          var r,
            i = h[e - 1];
          return (
            null != f && e >= l.length
              ? (r = t.entries())
              : ((r = []),
                t.each(function (t, i) {
                  r.push({ key: i, values: n(t, e) });
                })),
            null != i
              ? r.sort(function (t, n) {
                  return i(t.key, n.key);
                })
              : r
          );
        }
        var c,
          f,
          s,
          l = [],
          h = [];
        return (s = {
          object: function (n) {
            return t(n, 0, r, i);
          },
          map: function (n) {
            return t(n, 0, u, a);
          },
          entries: function (e) {
            return n(t(e, 0, u, a), 0);
          },
          key: function (t) {
            return l.push(t), s;
          },
          sortKeys: function (t) {
            return (h[l.length - 1] = t), s;
          },
          sortValues: function (t) {
            return (c = t), s;
          },
          rollup: function (t) {
            return (f = t), s;
          },
        });
      };
    },
    function (t, n, e) {
      "use strict";
      function r() {}
      function i(t, n) {
        var e = new r();
        if (t instanceof r)
          t.each(function (t) {
            e.add(t);
          });
        else if (t) {
          var i = -1,
            u = t.length;
          if (null == n) for (; ++i < u; ) e.add(t[i]);
          else for (; ++i < u; ) e.add(n(t[i], i, t));
        }
        return e;
      }
      var u = e(57),
        a = u.a.prototype;
      (r.prototype = i.prototype =
        {
          constructor: r,
          has: a.has,
          add: function (t) {
            return (t += ""), (this[u.b + t] = t), this;
          },
          remove: a.remove,
          clear: a.clear,
          values: a.keys,
          size: a.size,
          empty: a.empty,
          each: a.each,
        }),
        (n.a = i);
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t) {
        var n = [];
        for (var e in t) n.push(t[e]);
        return n;
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        if (t instanceof u) return new u(t.h, t.s, t.l, t.opacity);
        t instanceof o.d || (t = e.i(o.e)(t));
        var n = t.r / 255,
          r = t.g / 255,
          i = t.b / 255,
          a = (b * i + p * n - v * r) / (b + p - v),
          f = i - a,
          s = (d * (r - a) - l * f) / h,
          g = Math.sqrt(s * s + f * f) / (d * a * (1 - a)),
          y = g ? Math.atan2(s, f) * c.a - 120 : NaN;
        return new u(y < 0 ? y + 360 : y, g, a, t.opacity);
      }
      function i(t, n, e, i) {
        return 1 === arguments.length ? r(t) : new u(t, n, e, null == i ? 1 : i);
      }
      function u(t, n, e, r) {
        (this.h = +t), (this.s = +n), (this.l = +e), (this.opacity = +r);
      }
      n.a = i;
      var a = e(59),
        o = e(58),
        c = e(115),
        f = -0.14861,
        s = 1.78277,
        l = -0.29227,
        h = -0.90649,
        d = 1.97294,
        p = d * h,
        v = d * s,
        b = s * l - h * f;
      e.i(a.a)(
        u,
        i,
        e.i(a.b)(o.f, {
          brighter: function (t) {
            return (t = null == t ? o.g : Math.pow(o.g, t)), new u(this.h, this.s, this.l * t, this.opacity);
          },
          darker: function (t) {
            return (t = null == t ? o.h : Math.pow(o.h, t)), new u(this.h, this.s, this.l * t, this.opacity);
          },
          rgb: function () {
            var t = isNaN(this.h) ? 0 : (this.h + 120) * c.b,
              n = +this.l,
              e = isNaN(this.s) ? 0 : this.s * n * (1 - n),
              r = Math.cos(t),
              i = Math.sin(t);
            return new o.d(
              255 * (n + e * (f * r + s * i)),
              255 * (n + e * (l * r + h * i)),
              255 * (n + e * (d * r)),
              this.opacity
            );
          },
        })
      );
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        if (t instanceof u) return new u(t.l, t.a, t.b, t.opacity);
        if (t instanceof h) {
          var n = t.h * v.b;
          return new u(t.l, Math.cos(n) * t.c, Math.sin(n) * t.c, t.opacity);
        }
        t instanceof p.d || (t = e.i(p.e)(t));
        var r = f(t.r),
          i = f(t.g),
          o = f(t.b),
          c = a((0.4124564 * r + 0.3575761 * i + 0.1804375 * o) / b),
          s = a((0.2126729 * r + 0.7151522 * i + 0.072175 * o) / g);
        return new u(
          116 * s - 16,
          500 * (c - s),
          200 * (s - a((0.0193339 * r + 0.119192 * i + 0.9503041 * o) / y)),
          t.opacity
        );
      }
      function i(t, n, e, i) {
        return 1 === arguments.length ? r(t) : new u(t, n, e, null == i ? 1 : i);
      }
      function u(t, n, e, r) {
        (this.l = +t), (this.a = +n), (this.b = +e), (this.opacity = +r);
      }
      function a(t) {
        return t > w ? Math.pow(t, 1 / 3) : t / x + _;
      }
      function o(t) {
        return t > m ? t * t * t : x * (t - _);
      }
      function c(t) {
        return 255 * (t <= 0.0031308 ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - 0.055);
      }
      function f(t) {
        return (t /= 255) <= 0.04045 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4);
      }
      function s(t) {
        if (t instanceof h) return new h(t.h, t.c, t.l, t.opacity);
        t instanceof u || (t = r(t));
        var n = Math.atan2(t.b, t.a) * v.a;
        return new h(n < 0 ? n + 360 : n, Math.sqrt(t.a * t.a + t.b * t.b), t.l, t.opacity);
      }
      function l(t, n, e, r) {
        return 1 === arguments.length ? s(t) : new h(t, n, e, null == r ? 1 : r);
      }
      function h(t, n, e, r) {
        (this.h = +t), (this.c = +n), (this.l = +e), (this.opacity = +r);
      }
      (n.a = i), (n.b = l);
      var d = e(59),
        p = e(58),
        v = e(115),
        b = 0.95047,
        g = 1,
        y = 1.08883,
        _ = 4 / 29,
        m = 6 / 29,
        x = 3 * m * m,
        w = m * m * m;
      e.i(d.a)(
        u,
        i,
        e.i(d.b)(p.f, {
          brighter: function (t) {
            return new u(this.l + 18 * (null == t ? 1 : t), this.a, this.b, this.opacity);
          },
          darker: function (t) {
            return new u(this.l - 18 * (null == t ? 1 : t), this.a, this.b, this.opacity);
          },
          rgb: function () {
            var t = (this.l + 16) / 116,
              n = isNaN(this.a) ? t : t + this.a / 500,
              e = isNaN(this.b) ? t : t - this.b / 200;
            return (
              (t = g * o(t)),
              (n = b * o(n)),
              (e = y * o(e)),
              new p.d(
                c(3.2404542 * n - 1.5371385 * t - 0.4985314 * e),
                c(-0.969266 * n + 1.8760108 * t + 0.041556 * e),
                c(0.0556434 * n - 0.2040259 * t + 1.0572252 * e),
                this.opacity
              )
            );
          },
        })
      ),
        e.i(d.a)(
          h,
          l,
          e.i(d.b)(p.f, {
            brighter: function (t) {
              return new h(this.h, this.c, this.l + 18 * (null == t ? 1 : t), this.opacity);
            },
            darker: function (t) {
              return new h(this.h, this.c, this.l - 18 * (null == t ? 1 : t), this.opacity);
            },
            rgb: function () {
              return r(this).rgb();
            },
          })
        );
    },
    function (t, n, e) {
      "use strict";
      function r() {
        for (var t, n = 0, e = arguments.length, r = {}; n < e; ++n) {
          if (!(t = arguments[n] + "") || t in r) throw new Error("illegal type: " + t);
          r[t] = [];
        }
        return new i(r);
      }
      function i(t) {
        this._ = t;
      }
      function u(t, n) {
        return t
          .trim()
          .split(/^|\s+/)
          .map(function (t) {
            var e = "",
              r = t.indexOf(".");
            if ((r >= 0 && ((e = t.slice(r + 1)), (t = t.slice(0, r))), t && !n.hasOwnProperty(t)))
              throw new Error("unknown type: " + t);
            return { type: t, name: e };
          });
      }
      function a(t, n) {
        for (var e, r = 0, i = t.length; r < i; ++r) if ((e = t[r]).name === n) return e.value;
      }
      function o(t, n, e) {
        for (var r = 0, i = t.length; r < i; ++r)
          if (t[r].name === n) {
            (t[r] = c), (t = t.slice(0, r).concat(t.slice(r + 1)));
            break;
          }
        return null != e && t.push({ name: n, value: e }), t;
      }
      var c = { value: function () {} };
      (i.prototype = r.prototype =
        {
          constructor: i,
          on: function (t, n) {
            var e,
              r = this._,
              i = u(t + "", r),
              c = -1,
              f = i.length;
            {
              if (!(arguments.length < 2)) {
                if (null != n && "function" != typeof n) throw new Error("invalid callback: " + n);
                for (; ++c < f; )
                  if ((e = (t = i[c]).type)) r[e] = o(r[e], t.name, n);
                  else if (null == n) for (e in r) r[e] = o(r[e], t.name, null);
                return this;
              }
              for (; ++c < f; ) if ((e = (t = i[c]).type) && (e = a(r[e], t.name))) return e;
            }
          },
          copy: function () {
            var t = {},
              n = this._;
            for (var e in n) t[e] = n[e].slice();
            return new i(t);
          },
          call: function (t, n) {
            if ((e = arguments.length - 2) > 0)
              for (var e, r, i = new Array(e), u = 0; u < e; ++u) i[u] = arguments[u + 2];
            if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
            for (r = this._[t], u = 0, e = r.length; u < e; ++u) r[u].value.apply(n, i);
          },
          apply: function (t, n, e) {
            if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
            for (var r = this._[t], i = 0, u = r.length; i < u; ++i) r[i].value.apply(n, e);
          },
        }),
        (n.a = r);
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t) {
        return function () {
          return t;
        };
      };
    },
    function (t, n, e) {
      "use strict";
      function r() {
        return !c.r.button;
      }
      function i() {
        return this.parentNode;
      }
      function u(t) {
        return null == t ? { x: c.r.x, y: c.r.y } : t;
      }
      function a() {
        return "ontouchstart" in this;
      }
      var o = e(14),
        c = e(3),
        f = e(116),
        s = e(117),
        l = e(235),
        h = e(237);
      n.a = function () {
        function t(t) {
          t.on("mousedown.drag", n)
            .filter(A)
            .on("touchstart.drag", v)
            .on("touchmove.drag", b)
            .on("touchend.drag touchcancel.drag", g)
            .style("touch-action", "none")
            .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
        }
        function n() {
          if (!w && M.apply(this, arguments)) {
            var t = y("mouse", k.apply(this, arguments), c.e, this, arguments);
            t &&
              (e.i(c.i)(c.r.view).on("mousemove.drag", d, !0).on("mouseup.drag", p, !0),
              e.i(f.a)(c.r.view),
              e.i(s.b)(),
              (x = !1),
              (_ = c.r.clientX),
              (m = c.r.clientY),
              t("start"));
          }
        }
        function d() {
          if ((e.i(s.a)(), !x)) {
            var t = c.r.clientX - _,
              n = c.r.clientY - m;
            x = t * t + n * n > C;
          }
          S.mouse("drag");
        }
        function p() {
          e.i(c.i)(c.r.view).on("mousemove.drag mouseup.drag", null), e.i(f.b)(c.r.view, x), e.i(s.a)(), S.mouse("end");
        }
        function v() {
          if (M.apply(this, arguments)) {
            var t,
              n,
              r = c.r.changedTouches,
              i = k.apply(this, arguments),
              u = r.length;
            for (t = 0; t < u; ++t) (n = y(r[t].identifier, i, c.o, this, arguments)) && (e.i(s.b)(), n("start"));
          }
        }
        function b() {
          var t,
            n,
            r = c.r.changedTouches,
            i = r.length;
          for (t = 0; t < i; ++t) (n = S[r[t].identifier]) && (e.i(s.a)(), n("drag"));
        }
        function g() {
          var t,
            n,
            r = c.r.changedTouches,
            i = r.length;
          for (
            w && clearTimeout(w),
              w = setTimeout(function () {
                w = null;
              }, 500),
              t = 0;
            t < i;
            ++t
          )
            (n = S[r[t].identifier]) && (e.i(s.b)(), n("end"));
        }
        function y(n, r, i, u, a) {
          var o,
            f,
            s,
            l = i(r, n),
            d = T.copy();
          if (
            e.i(c.s)(new h.a(t, "beforestart", o, n, E, l[0], l[1], 0, 0, d), function () {
              return null != (c.r.subject = o = N.apply(u, a)) && ((f = o.x - l[0] || 0), (s = o.y - l[1] || 0), !0);
            })
          )
            return function p(v) {
              var b,
                g = l;
              switch (v) {
                case "start":
                  (S[n] = p), (b = E++);
                  break;
                case "end":
                  delete S[n], --E;
                case "drag":
                  (l = i(r, n)), (b = E);
              }
              e.i(c.s)(new h.a(t, v, o, n, b, l[0] + f, l[1] + s, l[0] - g[0], l[1] - g[1], d), d.apply, d, [v, u, a]);
            };
        }
        var _,
          m,
          x,
          w,
          M = r,
          k = i,
          N = u,
          A = a,
          S = {},
          T = e.i(o.a)("start", "drag", "end"),
          E = 0,
          C = 0;
        return (
          (t.filter = function (n) {
            return arguments.length ? ((M = "function" == typeof n ? n : e.i(l.a)(!!n)), t) : M;
          }),
          (t.container = function (n) {
            return arguments.length ? ((k = "function" == typeof n ? n : e.i(l.a)(n)), t) : k;
          }),
          (t.subject = function (n) {
            return arguments.length ? ((N = "function" == typeof n ? n : e.i(l.a)(n)), t) : N;
          }),
          (t.touchable = function (n) {
            return arguments.length ? ((A = "function" == typeof n ? n : e.i(l.a)(!!n)), t) : A;
          }),
          (t.on = function () {
            var n = T.on.apply(T, arguments);
            return n === T ? t : n;
          }),
          (t.clickDistance = function (n) {
            return arguments.length ? ((C = (n = +n) * n), t) : Math.sqrt(C);
          }),
          t
        );
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t, n, e, r, i, u, a, o, c, f) {
        (this.target = t),
          (this.type = n),
          (this.subject = e),
          (this.identifier = r),
          (this.active = i),
          (this.x = u),
          (this.y = a),
          (this.dx = o),
          (this.dy = c),
          (this._ = f);
      }
      (n.a = r),
        (r.prototype.on = function () {
          var t = this._.on.apply(this._, arguments);
          return t === this._ ? this : t;
        });
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "a", function () {
        return u;
      }),
        e.d(n, "b", function () {
          return a;
        }),
        e.d(n, "c", function () {
          return o;
        }),
        e.d(n, "d", function () {
          return c;
        });
      var r = e(62),
        i = e.i(r.a)(","),
        u = i.parse,
        a = i.parseRows,
        o = i.format,
        c = i.formatRows;
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "a", function () {
        return u;
      }),
        e.d(n, "b", function () {
          return a;
        }),
        e.d(n, "c", function () {
          return o;
        }),
        e.d(n, "d", function () {
          return c;
        });
      var r = e(62),
        i = e.i(r.a)("\t"),
        u = i.parse,
        a = i.parseRows,
        o = i.format,
        c = i.formatRows;
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return r;
      }),
        e.d(n, "c", function () {
          return i;
        }),
        e.d(n, "a", function () {
          return u;
        });
      var r = (function t(n) {
          function e(t) {
            return t * t * ((n + 1) * t - n);
          }
          return (n = +n), (e.overshoot = t), e;
        })(1.70158),
        i = (function t(n) {
          function e(t) {
            return --t * t * ((n + 1) * t + n) + 1;
          }
          return (n = +n), (e.overshoot = t), e;
        })(1.70158),
        u = (function t(n) {
          function e(t) {
            return ((t *= 2) < 1 ? t * t * ((n + 1) * t - n) : (t -= 2) * t * ((n + 1) * t + n) + 2) / 2;
          }
          return (n = +n), (e.overshoot = t), e;
        })(1.70158);
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return 1 - i(1 - t);
      }
      function i(t) {
        return (t = +t) < a
          ? v * t * t
          : t < c
          ? v * (t -= o) * t + f
          : t < l
          ? v * (t -= s) * t + h
          : v * (t -= d) * t + p;
      }
      function u(t) {
        return ((t *= 2) <= 1 ? 1 - i(1 - t) : i(t - 1) + 1) / 2;
      }
      (n.b = r), (n.a = i), (n.c = u);
      var a = 4 / 11,
        o = 6 / 11,
        c = 8 / 11,
        f = 0.75,
        s = 9 / 11,
        l = 10 / 11,
        h = 0.9375,
        d = 21 / 22,
        p = 63 / 64,
        v = 1 / a / a;
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return 1 - Math.sqrt(1 - t * t);
      }
      function i(t) {
        return Math.sqrt(1 - --t * t);
      }
      function u(t) {
        return ((t *= 2) <= 1 ? 1 - Math.sqrt(1 - t * t) : Math.sqrt(1 - (t -= 2) * t) + 1) / 2;
      }
      (n.b = r), (n.c = i), (n.a = u);
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return t * t * t;
      }
      function i(t) {
        return --t * t * t + 1;
      }
      function u(t) {
        return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
      }
      (n.b = r), (n.c = i), (n.a = u);
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return i;
      }),
        e.d(n, "a", function () {
          return u;
        }),
        e.d(n, "c", function () {
          return a;
        });
      var r = 2 * Math.PI,
        i = (function t(n, e) {
          function i(t) {
            return n * Math.pow(2, 10 * --t) * Math.sin((u - t) / e);
          }
          var u = Math.asin(1 / (n = Math.max(1, n))) * (e /= r);
          return (
            (i.amplitude = function (n) {
              return t(n, e * r);
            }),
            (i.period = function (e) {
              return t(n, e);
            }),
            i
          );
        })(1, 0.3),
        u = (function t(n, e) {
          function i(t) {
            return 1 - n * Math.pow(2, -10 * (t = +t)) * Math.sin((t + u) / e);
          }
          var u = Math.asin(1 / (n = Math.max(1, n))) * (e /= r);
          return (
            (i.amplitude = function (n) {
              return t(n, e * r);
            }),
            (i.period = function (e) {
              return t(n, e);
            }),
            i
          );
        })(1, 0.3),
        a = (function t(n, e) {
          function i(t) {
            return (
              ((t = 2 * t - 1) < 0
                ? n * Math.pow(2, 10 * t) * Math.sin((u - t) / e)
                : 2 - n * Math.pow(2, -10 * t) * Math.sin((u + t) / e)) / 2
            );
          }
          var u = Math.asin(1 / (n = Math.max(1, n))) * (e /= r);
          return (
            (i.amplitude = function (n) {
              return t(n, e * r);
            }),
            (i.period = function (e) {
              return t(n, e);
            }),
            i
          );
        })(1, 0.3);
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return Math.pow(2, 10 * t - 10);
      }
      function i(t) {
        return 1 - Math.pow(2, -10 * t);
      }
      function u(t) {
        return ((t *= 2) <= 1 ? Math.pow(2, 10 * t - 10) : 2 - Math.pow(2, 10 - 10 * t)) / 2;
      }
      (n.b = r), (n.c = i), (n.a = u);
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return +t;
      }
      n.a = r;
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return r;
      }),
        e.d(n, "c", function () {
          return i;
        }),
        e.d(n, "a", function () {
          return u;
        });
      var r = (function t(n) {
          function e(t) {
            return Math.pow(t, n);
          }
          return (n = +n), (e.exponent = t), e;
        })(3),
        i = (function t(n) {
          function e(t) {
            return 1 - Math.pow(1 - t, n);
          }
          return (n = +n), (e.exponent = t), e;
        })(3),
        u = (function t(n) {
          function e(t) {
            return ((t *= 2) <= 1 ? Math.pow(t, n) : 2 - Math.pow(2 - t, n)) / 2;
          }
          return (n = +n), (e.exponent = t), e;
        })(3);
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return t * t;
      }
      function i(t) {
        return t * (2 - t);
      }
      function u(t) {
        return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2;
      }
      (n.b = r), (n.c = i), (n.a = u);
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return 1 - Math.cos(t * o);
      }
      function i(t) {
        return Math.sin(t * o);
      }
      function u(t) {
        return (1 - Math.cos(a * t)) / 2;
      }
      (n.b = r), (n.c = i), (n.a = u);
      var a = Math.PI,
        o = a / 2;
    },
    function (t, n, e) {
      "use strict";
      var r = e(251);
      e.d(n, "a", function () {
        return r.a;
      });
      var i = e(252);
      e.d(n, "b", function () {
        return i.a;
      });
      var u = e(253);
      e.d(n, "c", function () {
        return u.a;
      });
      var a = e(254);
      e.d(n, "d", function () {
        return a.a;
      });
      var o = e(255);
      e.d(n, "e", function () {
        return o.a;
      });
      var c = e(119);
      e.d(n, "f", function () {
        return c.a;
      });
      var f = e(256);
      e.d(n, "g", function () {
        return f.a;
      });
      var s = e(257);
      e.d(n, "h", function () {
        return s.a;
      });
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t, n) {
        function e() {
          var e,
            i,
            u = r.length,
            a = 0,
            o = 0;
          for (e = 0; e < u; ++e) (i = r[e]), (a += i.x), (o += i.y);
          for (a = a / u - t, o = o / u - n, e = 0; e < u; ++e) (i = r[e]), (i.x -= a), (i.y -= o);
        }
        var r;
        return (
          null == t && (t = 0),
          null == n && (n = 0),
          (e.initialize = function (t) {
            r = t;
          }),
          (e.x = function (n) {
            return arguments.length ? ((t = +n), e) : t;
          }),
          (e.y = function (t) {
            return arguments.length ? ((n = +t), e) : n;
          }),
          e
        );
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return t.x + t.vx;
      }
      function i(t) {
        return t.y + t.vy;
      }
      var u = e(20),
        a = e(63),
        o = e(76);
      n.a = function (t) {
        function n() {
          function t(t, n, r, i, u) {
            var o = t.data,
              c = t.r,
              s = b + c;
            {
              if (!o) return n > p + s || i < p - s || r > v + s || u < v - s;
              if (o.index > f.index) {
                var l = p - o.x - o.vx,
                  d = v - o.y - o.vy,
                  y = l * l + d * d;
                y < s * s &&
                  (0 === l && ((l = e.i(a.a)()), (y += l * l)),
                  0 === d && ((d = e.i(a.a)()), (y += d * d)),
                  (y = ((s - (y = Math.sqrt(y))) / y) * h),
                  (f.vx += (l *= y) * (s = (c *= c) / (g + c))),
                  (f.vy += (d *= y) * s),
                  (o.vx -= l * (s = 1 - s)),
                  (o.vy -= d * s));
              }
            }
          }
          for (var n, u, f, p, v, b, g, y = s.length, _ = 0; _ < d; ++_)
            for (u = e.i(o.a)(s, r, i).visitAfter(c), n = 0; n < y; ++n)
              (f = s[n]), (b = l[f.index]), (g = b * b), (p = f.x + f.vx), (v = f.y + f.vy), u.visit(t);
        }
        function c(t) {
          if (t.data) return (t.r = l[t.data.index]);
          for (var n = (t.r = 0); n < 4; ++n) t[n] && t[n].r > t.r && (t.r = t[n].r);
        }
        function f() {
          if (s) {
            var n,
              e,
              r = s.length;
            for (l = new Array(r), n = 0; n < r; ++n) (e = s[n]), (l[e.index] = +t(e, n, s));
          }
        }
        var s,
          l,
          h = 1,
          d = 1;
        return (
          "function" != typeof t && (t = e.i(u.a)(null == t ? 1 : +t)),
          (n.initialize = function (t) {
            (s = t), f();
          }),
          (n.iterations = function (t) {
            return arguments.length ? ((d = +t), n) : d;
          }),
          (n.strength = function (t) {
            return arguments.length ? ((h = +t), n) : h;
          }),
          (n.radius = function (r) {
            return arguments.length ? ((t = "function" == typeof r ? r : e.i(u.a)(+r)), f(), n) : t;
          }),
          n
        );
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return t.index;
      }
      function i(t, n) {
        var e = t.get(n);
        if (!e) throw new Error("missing: " + n);
        return e;
      }
      var u = e(20),
        a = e(63),
        o = e(25);
      n.a = function (t) {
        function n(t) {
          return 1 / Math.min(v[t.source.index], v[t.target.index]);
        }
        function c(n) {
          for (var r = 0, i = t.length; r < m; ++r)
            for (var u, o, c, f, s, l, p, v = 0; v < i; ++v)
              (u = t[v]),
                (o = u.source),
                (c = u.target),
                (f = c.x + c.vx - o.x - o.vx || e.i(a.a)()),
                (s = c.y + c.vy - o.y - o.vy || e.i(a.a)()),
                (l = Math.sqrt(f * f + s * s)),
                (l = ((l - d[v]) / l) * n * h[v]),
                (f *= l),
                (s *= l),
                (c.vx -= f * (p = b[v])),
                (c.vy -= s * p),
                (o.vx += f * (p = 1 - p)),
                (o.vy += s * p);
        }
        function f() {
          if (p) {
            var n,
              r,
              u = p.length,
              a = t.length,
              c = e.i(o.c)(p, g);
            for (n = 0, v = new Array(u); n < a; ++n)
              (r = t[n]),
                (r.index = n),
                "object" != typeof r.source && (r.source = i(c, r.source)),
                "object" != typeof r.target && (r.target = i(c, r.target)),
                (v[r.source.index] = (v[r.source.index] || 0) + 1),
                (v[r.target.index] = (v[r.target.index] || 0) + 1);
            for (n = 0, b = new Array(a); n < a; ++n)
              (r = t[n]), (b[n] = v[r.source.index] / (v[r.source.index] + v[r.target.index]));
            (h = new Array(a)), s(), (d = new Array(a)), l();
          }
        }
        function s() {
          if (p) for (var n = 0, e = t.length; n < e; ++n) h[n] = +y(t[n], n, t);
        }
        function l() {
          if (p) for (var n = 0, e = t.length; n < e; ++n) d[n] = +_(t[n], n, t);
        }
        var h,
          d,
          p,
          v,
          b,
          g = r,
          y = n,
          _ = e.i(u.a)(30),
          m = 1;
        return (
          null == t && (t = []),
          (c.initialize = function (t) {
            (p = t), f();
          }),
          (c.links = function (n) {
            return arguments.length ? ((t = n), f(), c) : t;
          }),
          (c.id = function (t) {
            return arguments.length ? ((g = t), c) : g;
          }),
          (c.iterations = function (t) {
            return arguments.length ? ((m = +t), c) : m;
          }),
          (c.strength = function (t) {
            return arguments.length ? ((y = "function" == typeof t ? t : e.i(u.a)(+t)), s(), c) : y;
          }),
          (c.distance = function (t) {
            return arguments.length ? ((_ = "function" == typeof t ? t : e.i(u.a)(+t)), l(), c) : _;
          }),
          c
        );
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(20),
        i = e(63),
        u = e(76),
        a = e(119);
      n.a = function () {
        function t(t) {
          var n,
            r = f.length,
            i = e.i(u.a)(f, a.b, a.c).visitAfter(o);
          for (l = t, n = 0; n < r; ++n) (s = f[n]), i.visit(c);
        }
        function n() {
          if (f) {
            var t,
              n,
              e = f.length;
            for (h = new Array(e), t = 0; t < e; ++t) (n = f[t]), (h[n.index] = +d(n, t, f));
          }
        }
        function o(t) {
          var n,
            e,
            r,
            i,
            u,
            a = 0,
            o = 0;
          if (t.length) {
            for (r = i = u = 0; u < 4; ++u)
              (n = t[u]) && (e = Math.abs(n.value)) && ((a += n.value), (o += e), (r += e * n.x), (i += e * n.y));
            (t.x = r / o), (t.y = i / o);
          } else {
            (n = t), (n.x = n.data.x), (n.y = n.data.y);
            do {
              a += h[n.data.index];
            } while ((n = n.next));
          }
          t.value = a;
        }
        function c(t, n, r, u) {
          if (!t.value) return !0;
          var a = t.x - s.x,
            o = t.y - s.y,
            c = u - n,
            f = a * a + o * o;
          if ((c * c) / b < f)
            return (
              f < v &&
                (0 === a && ((a = e.i(i.a)()), (f += a * a)),
                0 === o && ((o = e.i(i.a)()), (f += o * o)),
                f < p && (f = Math.sqrt(p * f)),
                (s.vx += (a * t.value * l) / f),
                (s.vy += (o * t.value * l) / f)),
              !0
            );
          if (!(t.length || f >= v)) {
            (t.data !== s || t.next) &&
              (0 === a && ((a = e.i(i.a)()), (f += a * a)),
              0 === o && ((o = e.i(i.a)()), (f += o * o)),
              f < p && (f = Math.sqrt(p * f)));
            do {
              t.data !== s && ((c = (h[t.data.index] * l) / f), (s.vx += a * c), (s.vy += o * c));
            } while ((t = t.next));
          }
        }
        var f,
          s,
          l,
          h,
          d = e.i(r.a)(-30),
          p = 1,
          v = 1 / 0,
          b = 0.81;
        return (
          (t.initialize = function (t) {
            (f = t), n();
          }),
          (t.strength = function (i) {
            return arguments.length ? ((d = "function" == typeof i ? i : e.i(r.a)(+i)), n(), t) : d;
          }),
          (t.distanceMin = function (n) {
            return arguments.length ? ((p = n * n), t) : Math.sqrt(p);
          }),
          (t.distanceMax = function (n) {
            return arguments.length ? ((v = n * n), t) : Math.sqrt(v);
          }),
          (t.theta = function (n) {
            return arguments.length ? ((b = n * n), t) : Math.sqrt(b);
          }),
          t
        );
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(20);
      n.a = function (t, n, i) {
        function u(t) {
          for (var e = 0, r = o.length; e < r; ++e) {
            var u = o[e],
              a = u.x - n || 1e-6,
              s = u.y - i || 1e-6,
              l = Math.sqrt(a * a + s * s),
              h = ((f[e] - l) * c[e] * t) / l;
            (u.vx += a * h), (u.vy += s * h);
          }
        }
        function a() {
          if (o) {
            var n,
              e = o.length;
            for (c = new Array(e), f = new Array(e), n = 0; n < e; ++n)
              (f[n] = +t(o[n], n, o)), (c[n] = isNaN(f[n]) ? 0 : +s(o[n], n, o));
          }
        }
        var o,
          c,
          f,
          s = e.i(r.a)(0.1);
        return (
          "function" != typeof t && (t = e.i(r.a)(+t)),
          null == n && (n = 0),
          null == i && (i = 0),
          (u.initialize = function (t) {
            (o = t), a();
          }),
          (u.strength = function (t) {
            return arguments.length ? ((s = "function" == typeof t ? t : e.i(r.a)(+t)), a(), u) : s;
          }),
          (u.radius = function (n) {
            return arguments.length ? ((t = "function" == typeof n ? n : e.i(r.a)(+n)), a(), u) : t;
          }),
          (u.x = function (t) {
            return arguments.length ? ((n = +t), u) : n;
          }),
          (u.y = function (t) {
            return arguments.length ? ((i = +t), u) : i;
          }),
          u
        );
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(20);
      n.a = function (t) {
        function n(t) {
          for (var n, e = 0, r = u.length; e < r; ++e) (n = u[e]), (n.vx += (o[e] - n.x) * a[e] * t);
        }
        function i() {
          if (u) {
            var n,
              e = u.length;
            for (a = new Array(e), o = new Array(e), n = 0; n < e; ++n)
              a[n] = isNaN((o[n] = +t(u[n], n, u))) ? 0 : +c(u[n], n, u);
          }
        }
        var u,
          a,
          o,
          c = e.i(r.a)(0.1);
        return (
          "function" != typeof t && (t = e.i(r.a)(null == t ? 0 : +t)),
          (n.initialize = function (t) {
            (u = t), i();
          }),
          (n.strength = function (t) {
            return arguments.length ? ((c = "function" == typeof t ? t : e.i(r.a)(+t)), i(), n) : c;
          }),
          (n.x = function (u) {
            return arguments.length ? ((t = "function" == typeof u ? u : e.i(r.a)(+u)), i(), n) : t;
          }),
          n
        );
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(20);
      n.a = function (t) {
        function n(t) {
          for (var n, e = 0, r = u.length; e < r; ++e) (n = u[e]), (n.vy += (o[e] - n.y) * a[e] * t);
        }
        function i() {
          if (u) {
            var n,
              e = u.length;
            for (a = new Array(e), o = new Array(e), n = 0; n < e; ++n)
              a[n] = isNaN((o[n] = +t(u[n], n, u))) ? 0 : +c(u[n], n, u);
          }
        }
        var u,
          a,
          o,
          c = e.i(r.a)(0.1);
        return (
          "function" != typeof t && (t = e.i(r.a)(null == t ? 0 : +t)),
          (n.initialize = function (t) {
            (u = t), i();
          }),
          (n.strength = function (t) {
            return arguments.length ? ((c = "function" == typeof t ? t : e.i(r.a)(+t)), i(), n) : c;
          }),
          (n.y = function (u) {
            return arguments.length ? ((t = "function" == typeof u ? u : e.i(r.a)(+u)), i(), n) : t;
          }),
          n
        );
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return (i = e.i(o.a)(t)), (u = i.format), (a = i.formatPrefix), i;
      }
      e.d(n, "b", function () {
        return u;
      }),
        e.d(n, "c", function () {
          return a;
        }),
        (n.a = r);
      var i,
        u,
        a,
        o = e(123);
      r({ decimal: ".", thousands: ",", grouping: [3], currency: ["$", ""] });
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t, n) {
        t = t.toPrecision(n);
        t: for (var e, r = t.length, i = 1, u = -1; i < r; ++i)
          switch (t[i]) {
            case ".":
              u = e = i;
              break;
            case "0":
              0 === u && (u = i), (e = i);
              break;
            case "e":
              break t;
            default:
              u > 0 && (u = 0);
          }
        return u > 0 ? t.slice(0, u) + t.slice(e + 1) : t;
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t, n) {
        return function (e, r) {
          for (
            var i = e.length, u = [], a = 0, o = t[0], c = 0;
            i > 0 &&
            o > 0 &&
            (c + o + 1 > r && (o = Math.max(1, r - c)), u.push(e.substring((i -= o), i + o)), !((c += o + 1) > r));

          )
            o = t[(a = (a + 1) % t.length)];
          return u.reverse().join(n);
        };
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t) {
        return function (n) {
          return n.replace(/[0-9]/g, function (n) {
            return t[+n];
          });
        };
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(65);
      n.a = function (t, n) {
        var i = e.i(r.a)(t, n);
        if (!i) return t + "";
        var u = i[0],
          a = i[1];
        return a < 0
          ? "0." + new Array(-a).join("0") + u
          : u.length > a + 1
          ? u.slice(0, a + 1) + "." + u.slice(a + 1)
          : u + new Array(a - u.length + 2).join("0");
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t) {
        return t;
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(37);
      n.a = function (t) {
        return Math.max(0, -e.i(r.a)(Math.abs(t)));
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(37);
      n.a = function (t, n) {
        return Math.max(0, 3 * Math.max(-8, Math.min(8, Math.floor(e.i(r.a)(n) / 3))) - e.i(r.a)(Math.abs(t)));
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(37);
      n.a = function (t, n) {
        return (t = Math.abs(t)), (n = Math.abs(n) - t), Math.max(0, e.i(r.a)(n) - e.i(r.a)(t)) + 1;
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(124);
      e.d(n, "a", function () {
        return r.a;
      });
      var i = e(268);
      e.d(n, "b", function () {
        return i.a;
      });
      var u = e(269);
      e.d(n, "c", function () {
        return u.a;
      });
      var a = e(125);
      e.d(n, "d", function () {
        return a.a;
      });
      var o = e(126);
      e.d(n, "e", function () {
        return o.a;
      });
      var c = e(128);
      e.d(n, "f", function () {
        return c.a;
      });
      var f = e(270);
      e.d(n, "g", function () {
        return f.a;
      });
      var s = e(38);
      e.d(n, "h", function () {
        return s.a;
      });
      var l = e(273);
      e.d(n, "i", function () {
        return l.a;
      });
      var h = e(132);
      e.d(n, "j", function () {
        return h.a;
      });
      var d = e(274);
      e.d(n, "k", function () {
        return d.a;
      }),
        e.d(n, "l", function () {
          return d.b;
        });
      var p = e(275);
      e.d(n, "m", function () {
        return p.a;
      });
      var v = e(133);
      e.d(n, "n", function () {
        return v.a;
      });
      var b = e(279);
      e.d(n, "o", function () {
        return b.a;
      });
      var g = e(137);
      e.d(n, "p", function () {
        return g.a;
      });
      var y = e(282);
      e.d(n, "q", function () {
        return y.a;
      });
      var _ = e(283);
      e.d(n, "r", function () {
        return _.a;
      }),
        e.d(n, "s", function () {
          return _.b;
        });
      var m = e(284);
      e.d(n, "t", function () {
        return m.a;
      }),
        e.d(n, "u", function () {
          return m.b;
        });
      var x = e(285);
      e.d(n, "v", function () {
        return x.a;
      }),
        e.d(n, "w", function () {
          return x.b;
        });
      var w = e(68);
      e.d(n, "x", function () {
        return w.a;
      }),
        e.d(n, "y", function () {
          return w.b;
        });
      var M = e(286);
      e.d(n, "z", function () {
        return M.a;
      }),
        e.d(n, "A", function () {
          return M.b;
        });
      var k = e(138);
      e.d(n, "B", function () {
        return k.a;
      }),
        e.d(n, "C", function () {
          return k.b;
        });
      var N = e(288);
      e.d(n, "D", function () {
        return N.a;
      }),
        e.d(n, "E", function () {
          return N.b;
        });
      var A = e(289);
      e.d(n, "F", function () {
        return A.a;
      });
      var S = e(10);
      e.d(n, "G", function () {
        return S.a;
      }),
        e.d(n, "H", function () {
          return S.b;
        });
      var T = e(70);
      e.d(n, "I", function () {
        return T.a;
      }),
        e.d(n, "J", function () {
          return T.b;
        });
      var E = e(290);
      e.d(n, "K", function () {
        return E.a;
      }),
        e.d(n, "L", function () {
          return E.b;
        });
      var C = e(291);
      e.d(n, "M", function () {
        return C.a;
      }),
        e.d(n, "N", function () {
          return C.b;
        });
      var P = e(293);
      e.d(n, "O", function () {
        return P.a;
      }),
        e.d(n, "P", function () {
          return P.b;
        });
      var z = e(294);
      e.d(n, "Q", function () {
        return z.a;
      }),
        e.d(n, "R", function () {
          return z.b;
        });
      var R = e(39);
      e.d(n, "S", function () {
        return R.a;
      });
      var q = e(15);
      e.d(n, "T", function () {
        return q.a;
      });
      var L = e(40);
      e.d(n, "U", function () {
        return L.a;
      });
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        x.push((w = [(d = t), (v = t)])), n < p && (p = n), n > b && (b = n);
      }
      function i(t, n) {
        var r = e.i(N.a)([t * A.g, n * A.g]);
        if (m) {
          var i = e.i(N.b)(m, r),
            u = [i[1], -i[0], 0],
            a = e.i(N.b)(u, i);
          e.i(N.c)(a), (a = e.i(N.g)(a));
          var o,
            c = t - g,
            f = c > 0 ? 1 : -1,
            l = a[0] * A.h * f,
            h = e.i(A.p)(c) > 180;
          h ^ (f * g < l && l < f * t)
            ? (o = a[1] * A.h) > b && (b = o)
            : ((l = ((l + 360) % 360) - 180),
              h ^ (f * g < l && l < f * t) ? (o = -a[1] * A.h) < p && (p = o) : (n < p && (p = n), n > b && (b = n))),
            h
              ? t < g
                ? s(d, t) > s(d, v) && (v = t)
                : s(t, v) > s(d, v) && (d = t)
              : v >= d
              ? (t < d && (d = t), t > v && (v = t))
              : t > g
              ? s(d, t) > s(d, v) && (v = t)
              : s(t, v) > s(d, v) && (d = t);
        } else x.push((w = [(d = t), (v = t)]));
        n < p && (p = n), n > b && (b = n), (m = r), (g = t);
      }
      function u() {
        E.point = i;
      }
      function a() {
        (w[0] = d), (w[1] = v), (E.point = r), (m = null);
      }
      function o(t, n) {
        if (m) {
          var r = t - g;
          T.add(e.i(A.p)(r) > 180 ? r + (r > 0 ? 360 : -360) : r);
        } else (y = t), (_ = n);
        k.b.point(t, n), i(t, n);
      }
      function c() {
        k.b.lineStart();
      }
      function f() {
        o(y, _), k.b.lineEnd(), e.i(A.p)(T) > A.o && (d = -(v = 180)), (w[0] = d), (w[1] = v), (m = null);
      }
      function s(t, n) {
        return (n -= t) < 0 ? n + 360 : n;
      }
      function l(t, n) {
        return t[0] - n[0];
      }
      function h(t, n) {
        return t[0] <= t[1] ? t[0] <= n && n <= t[1] : n < t[0] || t[1] < n;
      }
      var d,
        p,
        v,
        b,
        g,
        y,
        _,
        m,
        x,
        w,
        M = e(21),
        k = e(124),
        N = e(26),
        A = e(0),
        S = e(15),
        T = e.i(M.a)(),
        E = {
          point: r,
          lineStart: u,
          lineEnd: a,
          polygonStart: function () {
            (E.point = o), (E.lineStart = c), (E.lineEnd = f), T.reset(), k.b.polygonStart();
          },
          polygonEnd: function () {
            k.b.polygonEnd(),
              (E.point = r),
              (E.lineStart = u),
              (E.lineEnd = a),
              k.c < 0 ? ((d = -(v = 180)), (p = -(b = 90))) : T > A.o ? (b = 90) : T < -A.o && (p = -90),
              (w[0] = d),
              (w[1] = v);
          },
        };
      n.a = function (t) {
        var n, r, i, u, a, o, c;
        if (((b = v = -(d = p = 1 / 0)), (x = []), e.i(S.a)(t, E), (r = x.length))) {
          for (x.sort(l), n = 1, i = x[0], a = [i]; n < r; ++n)
            (u = x[n]),
              h(i, u[0]) || h(i, u[1])
                ? (s(i[0], u[1]) > s(i[0], i[1]) && (i[1] = u[1]), s(u[0], i[1]) > s(i[0], i[1]) && (i[0] = u[0]))
                : a.push((i = u));
          for (o = -1 / 0, r = a.length - 1, n = 0, i = a[r]; n <= r; i = u, ++n)
            (u = a[n]), (c = s(i[1], u[0])) > o && ((o = c), (d = u[0]), (v = i[1]));
        }
        return (
          (x = w = null),
          d === 1 / 0 || p === 1 / 0
            ? [
                [NaN, NaN],
                [NaN, NaN],
              ]
            : [
                [d, p],
                [v, b],
              ]
        );
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        (t *= E.g), (n *= E.g);
        var r = e.i(E.c)(n);
        i(r * e.i(E.c)(t), r * e.i(E.d)(t), e.i(E.d)(n));
      }
      function i(t, n, e) {
        ++d, (v += (t - v) / d), (b += (n - b) / d), (g += (e - g) / d);
      }
      function u() {
        z.point = a;
      }
      function a(t, n) {
        (t *= E.g), (n *= E.g);
        var r = e.i(E.c)(n);
        (A = r * e.i(E.c)(t)), (S = r * e.i(E.d)(t)), (T = e.i(E.d)(n)), (z.point = o), i(A, S, T);
      }
      function o(t, n) {
        (t *= E.g), (n *= E.g);
        var r = e.i(E.c)(n),
          u = r * e.i(E.c)(t),
          a = r * e.i(E.d)(t),
          o = e.i(E.d)(n),
          c = e.i(E.e)(
            e.i(E.n)((c = S * o - T * a) * c + (c = T * u - A * o) * c + (c = A * a - S * u) * c),
            A * u + S * a + T * o
          );
        (p += c), (y += c * (A + (A = u))), (_ += c * (S + (S = a))), (m += c * (T + (T = o))), i(A, S, T);
      }
      function c() {
        z.point = r;
      }
      function f() {
        z.point = l;
      }
      function s() {
        h(k, N), (z.point = r);
      }
      function l(t, n) {
        (k = t), (N = n), (t *= E.g), (n *= E.g), (z.point = h);
        var r = e.i(E.c)(n);
        (A = r * e.i(E.c)(t)), (S = r * e.i(E.d)(t)), (T = e.i(E.d)(n)), i(A, S, T);
      }
      function h(t, n) {
        (t *= E.g), (n *= E.g);
        var r = e.i(E.c)(n),
          u = r * e.i(E.c)(t),
          a = r * e.i(E.d)(t),
          o = e.i(E.d)(n),
          c = S * o - T * a,
          f = T * u - A * o,
          s = A * a - S * u,
          l = e.i(E.n)(c * c + f * f + s * s),
          h = e.i(E.f)(l),
          d = l && -h / l;
        (x += d * c),
          (w += d * f),
          (M += d * s),
          (p += h),
          (y += h * (A + (A = u))),
          (_ += h * (S + (S = a))),
          (m += h * (T + (T = o))),
          i(A, S, T);
      }
      var d,
        p,
        v,
        b,
        g,
        y,
        _,
        m,
        x,
        w,
        M,
        k,
        N,
        A,
        S,
        T,
        E = e(0),
        C = e(12),
        P = e(15),
        z = {
          sphere: C.a,
          point: r,
          lineStart: u,
          lineEnd: c,
          polygonStart: function () {
            (z.lineStart = f), (z.lineEnd = s);
          },
          polygonEnd: function () {
            (z.lineStart = u), (z.lineEnd = c);
          },
        };
      n.a = function (t) {
        (d = p = v = b = g = y = _ = m = x = w = M = 0), e.i(P.a)(t, z);
        var n = x,
          r = w,
          i = M,
          u = n * n + r * r + i * i;
        return u < E.w &&
          ((n = y), (r = _), (i = m), p < E.o && ((n = v), (r = b), (i = g)), (u = n * n + r * r + i * i) < E.w)
          ? [NaN, NaN]
          : [e.i(E.e)(r, n) * E.h, e.i(E.f)(i / e.i(E.n)(u)) * E.h];
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(38);
      n.a = function () {
        var t,
          n,
          i,
          u = 0,
          a = 0,
          o = 960,
          c = 500;
        return (i = {
          stream: function (i) {
            return t && n === i ? t : (t = e.i(r.a)(u, a, o, c)((n = i)));
          },
          extent: function (e) {
            return arguments.length
              ? ((u = +e[0][0]), (a = +e[0][1]), (o = +e[1][0]), (c = +e[1][1]), (t = n = null), i)
              : [
                  [u, a],
                  [o, c],
                ];
          },
        });
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t, n, e, r, i, u) {
        var a,
          o = t[0],
          c = t[1],
          f = n[0],
          s = n[1],
          l = 0,
          h = 1,
          d = f - o,
          p = s - c;
        if (((a = e - o), d || !(a > 0))) {
          if (((a /= d), d < 0)) {
            if (a < l) return;
            a < h && (h = a);
          } else if (d > 0) {
            if (a > h) return;
            a > l && (l = a);
          }
          if (((a = i - o), d || !(a < 0))) {
            if (((a /= d), d < 0)) {
              if (a > h) return;
              a > l && (l = a);
            } else if (d > 0) {
              if (a < l) return;
              a < h && (h = a);
            }
            if (((a = r - c), p || !(a > 0))) {
              if (((a /= p), p < 0)) {
                if (a < l) return;
                a < h && (h = a);
              } else if (p > 0) {
                if (a > h) return;
                a > l && (l = a);
              }
              if (((a = u - c), p || !(a < 0))) {
                if (((a /= p), p < 0)) {
                  if (a > h) return;
                  a > l && (l = a);
                } else if (p > 0) {
                  if (a < l) return;
                  a < h && (h = a);
                }
                return (
                  l > 0 && ((t[0] = o + l * d), (t[1] = c + l * p)),
                  h < 1 && ((n[0] = o + h * d), (n[1] = c + h * p)),
                  !0
                );
              }
            }
          }
        }
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t) {
        return function () {
          return t;
        };
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        return !(!t || !d.hasOwnProperty(t.type)) && d[t.type](t, n);
      }
      function i(t, n) {
        return 0 === e.i(s.a)(t, n);
      }
      function u(t, n) {
        var r = e.i(s.a)(t[0], t[1]);
        return e.i(s.a)(t[0], n) + e.i(s.a)(n, t[1]) <= r + l.o;
      }
      function a(t, n) {
        return !!e.i(f.a)(t.map(o), c(n));
      }
      function o(t) {
        return (t = t.map(c)), t.pop(), t;
      }
      function c(t) {
        return [t[0] * l.g, t[1] * l.g];
      }
      var f = e(136),
        s = e(132),
        l = e(0),
        h = {
          Feature: function (t, n) {
            return r(t.geometry, n);
          },
          FeatureCollection: function (t, n) {
            for (var e = t.features, i = -1, u = e.length; ++i < u; ) if (r(e[i].geometry, n)) return !0;
            return !1;
          },
        },
        d = {
          Sphere: function () {
            return !0;
          },
          Point: function (t, n) {
            return i(t.coordinates, n);
          },
          MultiPoint: function (t, n) {
            for (var e = t.coordinates, r = -1, u = e.length; ++r < u; ) if (i(e[r], n)) return !0;
            return !1;
          },
          LineString: function (t, n) {
            return u(t.coordinates, n);
          },
          MultiLineString: function (t, n) {
            for (var e = t.coordinates, r = -1, i = e.length; ++r < i; ) if (u(e[r], n)) return !0;
            return !1;
          },
          Polygon: function (t, n) {
            return a(t.coordinates, n);
          },
          MultiPolygon: function (t, n) {
            for (var e = t.coordinates, r = -1, i = e.length; ++r < i; ) if (a(e[r], n)) return !0;
            return !1;
          },
          GeometryCollection: function (t, n) {
            for (var e = t.geometries, i = -1, u = e.length; ++i < u; ) if (r(e[i], n)) return !0;
            return !1;
          },
        };
      n.a = function (t, n) {
        return (t && h.hasOwnProperty(t.type) ? h[t.type] : r)(t, n);
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t, n, r) {
        var i = e
          .i(o.v)(t, n - c.o, r)
          .concat(n);
        return function (t) {
          return i.map(function (n) {
            return [t, n];
          });
        };
      }
      function i(t, n, r) {
        var i = e
          .i(o.v)(t, n - c.o, r)
          .concat(n);
        return function (t) {
          return i.map(function (n) {
            return [n, t];
          });
        };
      }
      function u() {
        function t() {
          return { type: "MultiLineString", coordinates: n() };
        }
        function n() {
          return e
            .i(o.v)(e.i(c.u)(s / x) * x, f, x)
            .map(g)
            .concat(
              e
                .i(o.v)(e.i(c.u)(p / w) * w, d, w)
                .map(y)
            )
            .concat(
              e
                .i(o.v)(e.i(c.u)(a / _) * _, u, _)
                .filter(function (t) {
                  return e.i(c.p)(t % x) > c.o;
                })
                .map(v)
            )
            .concat(
              e
                .i(o.v)(e.i(c.u)(h / m) * m, l, m)
                .filter(function (t) {
                  return e.i(c.p)(t % w) > c.o;
                })
                .map(b)
            );
        }
        var u,
          a,
          f,
          s,
          l,
          h,
          d,
          p,
          v,
          b,
          g,
          y,
          _ = 10,
          m = _,
          x = 90,
          w = 360,
          M = 2.5;
        return (
          (t.lines = function () {
            return n().map(function (t) {
              return { type: "LineString", coordinates: t };
            });
          }),
          (t.outline = function () {
            return {
              type: "Polygon",
              coordinates: [g(s).concat(y(d).slice(1), g(f).reverse().slice(1), y(p).reverse().slice(1))],
            };
          }),
          (t.extent = function (n) {
            return arguments.length ? t.extentMajor(n).extentMinor(n) : t.extentMinor();
          }),
          (t.extentMajor = function (n) {
            return arguments.length
              ? ((s = +n[0][0]),
                (f = +n[1][0]),
                (p = +n[0][1]),
                (d = +n[1][1]),
                s > f && ((n = s), (s = f), (f = n)),
                p > d && ((n = p), (p = d), (d = n)),
                t.precision(M))
              : [
                  [s, p],
                  [f, d],
                ];
          }),
          (t.extentMinor = function (n) {
            return arguments.length
              ? ((a = +n[0][0]),
                (u = +n[1][0]),
                (h = +n[0][1]),
                (l = +n[1][1]),
                a > u && ((n = a), (a = u), (u = n)),
                h > l && ((n = h), (h = l), (l = n)),
                t.precision(M))
              : [
                  [a, h],
                  [u, l],
                ];
          }),
          (t.step = function (n) {
            return arguments.length ? t.stepMajor(n).stepMinor(n) : t.stepMinor();
          }),
          (t.stepMajor = function (n) {
            return arguments.length ? ((x = +n[0]), (w = +n[1]), t) : [x, w];
          }),
          (t.stepMinor = function (n) {
            return arguments.length ? ((_ = +n[0]), (m = +n[1]), t) : [_, m];
          }),
          (t.precision = function (n) {
            return arguments.length
              ? ((M = +n), (v = r(h, l, 90)), (b = i(a, u, M)), (g = r(p, d, 90)), (y = i(s, f, M)), t)
              : M;
          }),
          t
            .extentMajor([
              [-180, -90 + c.o],
              [180, 90 - c.o],
            ])
            .extentMinor([
              [-180, -80 - c.o],
              [180, 80 + c.o],
            ])
        );
      }
      function a() {
        return u()();
      }
      (n.a = u), (n.b = a);
      var o = e(5),
        c = e(0);
    },
    function (t, n, e) {
      "use strict";
      var r = e(0);
      n.a = function (t, n) {
        var i = t[0] * r.g,
          u = t[1] * r.g,
          a = n[0] * r.g,
          o = n[1] * r.g,
          c = e.i(r.c)(u),
          f = e.i(r.d)(u),
          s = e.i(r.c)(o),
          l = e.i(r.d)(o),
          h = c * e.i(r.c)(i),
          d = c * e.i(r.d)(i),
          p = s * e.i(r.c)(a),
          v = s * e.i(r.d)(a),
          b = 2 * e.i(r.f)(e.i(r.n)(e.i(r.t)(o - u) + c * s * e.i(r.t)(a - i))),
          g = e.i(r.d)(b),
          y = b
            ? function (t) {
                var n = e.i(r.d)((t *= b)) / g,
                  i = e.i(r.d)(b - t) / g,
                  u = i * h + n * p,
                  a = i * d + n * v,
                  o = i * f + n * l;
                return [e.i(r.e)(a, u) * r.h, e.i(r.e)(o, e.i(r.n)(u * u + a * a)) * r.h];
              }
            : function () {
                return [i * r.h, u * r.h];
              };
        return (y.distance = b), y;
      };
    },
    function (t, n, e) {
      "use strict";
      function r() {
        b.point = i;
      }
      function i(t, n) {
        (b.point = u), (o = f = t), (c = s = n);
      }
      function u(t, n) {
        v.add(s * t - f * n), (f = t), (s = n);
      }
      function a() {
        u(o, c);
      }
      var o,
        c,
        f,
        s,
        l = e(21),
        h = e(0),
        d = e(12),
        p = e.i(l.a)(),
        v = e.i(l.a)(),
        b = {
          point: d.a,
          lineStart: d.a,
          lineEnd: d.a,
          polygonStart: function () {
            (b.lineStart = r), (b.lineEnd = a);
          },
          polygonEnd: function () {
            (b.lineStart = b.lineEnd = b.point = d.a), p.add(e.i(h.p)(v)), v.reset();
          },
          result: function () {
            var t = p / 2;
            return p.reset(), t;
          },
        };
      n.a = b;
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        (g += t), (y += n), ++_;
      }
      function i() {
        A.point = u;
      }
      function u(t, n) {
        (A.point = a), r((p = t), (v = n));
      }
      function a(t, n) {
        var i = t - p,
          u = n - v,
          a = e.i(b.n)(i * i + u * u);
        (m += (a * (p + t)) / 2), (x += (a * (v + n)) / 2), (w += a), r((p = t), (v = n));
      }
      function o() {
        A.point = r;
      }
      function c() {
        A.point = s;
      }
      function f() {
        l(h, d);
      }
      function s(t, n) {
        (A.point = l), r((h = p = t), (d = v = n));
      }
      function l(t, n) {
        var i = t - p,
          u = n - v,
          a = e.i(b.n)(i * i + u * u);
        (m += (a * (p + t)) / 2),
          (x += (a * (v + n)) / 2),
          (w += a),
          (a = v * t - p * n),
          (M += a * (p + t)),
          (k += a * (v + n)),
          (N += 3 * a),
          r((p = t), (v = n));
      }
      var h,
        d,
        p,
        v,
        b = e(0),
        g = 0,
        y = 0,
        _ = 0,
        m = 0,
        x = 0,
        w = 0,
        M = 0,
        k = 0,
        N = 0,
        A = {
          point: r,
          lineStart: i,
          lineEnd: o,
          polygonStart: function () {
            (A.lineStart = c), (A.lineEnd = f);
          },
          polygonEnd: function () {
            (A.point = r), (A.lineStart = i), (A.lineEnd = o);
          },
          result: function () {
            var t = N ? [M / N, k / N] : w ? [m / w, x / w] : _ ? [g / _, y / _] : [NaN, NaN];
            return (g = y = _ = m = x = w = M = k = N = 0), t;
          },
        };
      n.a = A;
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        this._context = t;
      }
      n.a = r;
      var i = e(0),
        u = e(12);
      r.prototype = {
        _radius: 4.5,
        pointRadius: function (t) {
          return (this._radius = t), this;
        },
        polygonStart: function () {
          this._line = 0;
        },
        polygonEnd: function () {
          this._line = NaN;
        },
        lineStart: function () {
          this._point = 0;
        },
        lineEnd: function () {
          0 === this._line && this._context.closePath(), (this._point = NaN);
        },
        point: function (t, n) {
          switch (this._point) {
            case 0:
              this._context.moveTo(t, n), (this._point = 1);
              break;
            case 1:
              this._context.lineTo(t, n);
              break;
            default:
              this._context.moveTo(t + this._radius, n), this._context.arc(t, n, this._radius, 0, i.b);
          }
        },
        result: u.a,
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(66),
        i = e(15),
        u = e(276),
        a = e(134),
        o = e(277),
        c = e(278),
        f = e(280),
        s = e(281);
      n.a = function (t, n) {
        function l(t) {
          return (
            t && ("function" == typeof p && d.pointRadius(+p.apply(this, arguments)), e.i(i.a)(t, h(d))), d.result()
          );
        }
        var h,
          d,
          p = 4.5;
        return (
          (l.area = function (t) {
            return e.i(i.a)(t, h(u.a)), u.a.result();
          }),
          (l.measure = function (t) {
            return e.i(i.a)(t, h(f.a)), f.a.result();
          }),
          (l.bounds = function (t) {
            return e.i(i.a)(t, h(a.a)), a.a.result();
          }),
          (l.centroid = function (t) {
            return e.i(i.a)(t, h(o.a)), o.a.result();
          }),
          (l.projection = function (n) {
            return arguments.length ? ((h = null == n ? ((t = null), r.a) : (t = n).stream), l) : t;
          }),
          (l.context = function (t) {
            return arguments.length
              ? ((d = null == t ? ((n = null), new s.a()) : new c.a((n = t))),
                "function" != typeof p && d.pointRadius(p),
                l)
              : n;
          }),
          (l.pointRadius = function (t) {
            return arguments.length ? ((p = "function" == typeof t ? t : (d.pointRadius(+t), +t)), l) : p;
          }),
          l.projection(t).context(n)
        );
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        (p.point = i), (a = c = t), (o = f = n);
      }
      function i(t, n) {
        (c -= t), (f -= n), d.add(e.i(l.n)(c * c + f * f)), (c = t), (f = n);
      }
      var u,
        a,
        o,
        c,
        f,
        s = e(21),
        l = e(0),
        h = e(12),
        d = e.i(s.a)(),
        p = {
          point: h.a,
          lineStart: function () {
            p.point = r;
          },
          lineEnd: function () {
            u && i(a, o), (p.point = h.a);
          },
          polygonStart: function () {
            u = !0;
          },
          polygonEnd: function () {
            u = null;
          },
          result: function () {
            var t = +d;
            return d.reset(), t;
          },
        };
      n.a = p;
    },
    function (t, n, e) {
      "use strict";
      function r() {
        this._string = [];
      }
      function i(t) {
        return "m0," + t + "a" + t + "," + t + " 0 1,1 0," + -2 * t + "a" + t + "," + t + " 0 1,1 0," + 2 * t + "z";
      }
      (n.a = r),
        (r.prototype = {
          _radius: 4.5,
          _circle: i(4.5),
          pointRadius: function (t) {
            return (t = +t) !== this._radius && ((this._radius = t), (this._circle = null)), this;
          },
          polygonStart: function () {
            this._line = 0;
          },
          polygonEnd: function () {
            this._line = NaN;
          },
          lineStart: function () {
            this._point = 0;
          },
          lineEnd: function () {
            0 === this._line && this._string.push("Z"), (this._point = NaN);
          },
          point: function (t, n) {
            switch (this._point) {
              case 0:
                this._string.push("M", t, ",", n), (this._point = 1);
                break;
              case 1:
                this._string.push("L", t, ",", n);
                break;
              default:
                null == this._circle && (this._circle = i(this._radius)),
                  this._string.push("M", t, ",", n, this._circle);
            }
          },
          result: function () {
            if (this._string.length) {
              var t = this._string.join("");
              return (this._string = []), t;
            }
            return null;
          },
        });
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        var n = t.length;
        return {
          point: function (e, r) {
            for (var i = -1; ++i < n; ) t[i].point(e, r);
          },
          sphere: function () {
            for (var e = -1; ++e < n; ) t[e].sphere();
          },
          lineStart: function () {
            for (var e = -1; ++e < n; ) t[e].lineStart();
          },
          lineEnd: function () {
            for (var e = -1; ++e < n; ) t[e].lineEnd();
          },
          polygonStart: function () {
            for (var e = -1; ++e < n; ) t[e].polygonStart();
          },
          polygonEnd: function () {
            for (var e = -1; ++e < n; ) t[e].polygonEnd();
          },
        };
      }
      var i = e(0),
        u = e(137),
        a = e(68),
        o = e(69);
      n.a = function () {
        function t(t) {
          var n = t[0],
            e = t[1];
          return (d = null), s.point(n, e), d || (l.point(n, e), d) || (h.point(n, e), d);
        }
        function n() {
          return (c = f = null), t;
        }
        var c,
          f,
          s,
          l,
          h,
          d,
          p = e.i(u.a)(),
          v = e.i(a.a)().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]),
          b = e.i(a.a)().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]),
          g = {
            point: function (t, n) {
              d = [t, n];
            },
          };
        return (
          (t.invert = function (t) {
            var n = p.scale(),
              e = p.translate(),
              r = (t[0] - e[0]) / n,
              i = (t[1] - e[1]) / n;
            return (
              i >= 0.12 && i < 0.234 && r >= -0.425 && r < -0.214
                ? v
                : i >= 0.166 && i < 0.234 && r >= -0.214 && r < -0.115
                ? b
                : p
            ).invert(t);
          }),
          (t.stream = function (t) {
            return c && f === t ? c : (c = r([p.stream((f = t)), v.stream(t), b.stream(t)]));
          }),
          (t.precision = function (t) {
            return arguments.length ? (p.precision(t), v.precision(t), b.precision(t), n()) : p.precision();
          }),
          (t.scale = function (n) {
            return arguments.length
              ? (p.scale(n), v.scale(0.35 * n), b.scale(n), t.translate(p.translate()))
              : p.scale();
          }),
          (t.translate = function (t) {
            if (!arguments.length) return p.translate();
            var e = p.scale(),
              r = +t[0],
              u = +t[1];
            return (
              (s = p
                .translate(t)
                .clipExtent([
                  [r - 0.455 * e, u - 0.238 * e],
                  [r + 0.455 * e, u + 0.238 * e],
                ])
                .stream(g)),
              (l = v
                .translate([r - 0.307 * e, u + 0.201 * e])
                .clipExtent([
                  [r - 0.425 * e + i.o, u + 0.12 * e + i.o],
                  [r - 0.214 * e - i.o, u + 0.234 * e - i.o],
                ])
                .stream(g)),
              (h = b
                .translate([r - 0.205 * e, u + 0.212 * e])
                .clipExtent([
                  [r - 0.214 * e + i.o, u + 0.166 * e + i.o],
                  [r - 0.115 * e - i.o, u + 0.234 * e - i.o],
                ])
                .stream(g)),
              n()
            );
          }),
          (t.fitExtent = function (n, r) {
            return e.i(o.a)(t, n, r);
          }),
          (t.fitSize = function (n, r) {
            return e.i(o.b)(t, n, r);
          }),
          (t.fitWidth = function (n, r) {
            return e.i(o.c)(t, n, r);
          }),
          (t.fitHeight = function (n, r) {
            return e.i(o.d)(t, n, r);
          }),
          t.scale(1070)
        );
      };
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return a;
      });
      var r = e(0),
        i = e(27),
        u = e(10),
        a = e.i(i.b)(function (t) {
          return e.i(r.n)(2 / (1 + t));
        });
      (a.invert = e.i(i.a)(function (t) {
        return 2 * e.i(r.f)(t / 2);
      })),
        (n.a = function () {
          return e.i(u.a)(a).scale(124.75).clipAngle(179.999);
        });
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return a;
      });
      var r = e(0),
        i = e(27),
        u = e(10),
        a = e.i(i.b)(function (t) {
          return (t = e.i(r.s)(t)) && t / e.i(r.d)(t);
        });
      (a.invert = e.i(i.a)(function (t) {
        return t;
      })),
        (n.a = function () {
          return e.i(u.a)(a).scale(79.4188).clipAngle(179.999);
        });
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return e.i(u.j)((u.k + t) / 2);
      }
      function i(t, n) {
        function i(t, n) {
          f > 0 ? n < -u.k + u.o && (n = -u.k + u.o) : n > u.k - u.o && (n = u.k - u.o);
          var i = f / e.i(u.r)(r(n), c);
          return [i * e.i(u.d)(c * t), f - i * e.i(u.c)(c * t)];
        }
        var a = e.i(u.c)(t),
          c = t === n ? e.i(u.d)(t) : e.i(u.i)(a / e.i(u.c)(n)) / e.i(u.i)(r(n) / r(t)),
          f = (a * e.i(u.r)(r(t), c)) / c;
        return c
          ? ((i.invert = function (t, n) {
              var r = f - n,
                i = e.i(u.q)(c) * e.i(u.n)(t * t + r * r);
              return [(e.i(u.e)(t, e.i(u.p)(r)) / c) * e.i(u.q)(r), 2 * e.i(u.l)(e.i(u.r)(f / i, 1 / c)) - u.k];
            }),
            i)
          : o.b;
      }
      n.b = i;
      var u = e(0),
        a = e(67),
        o = e(70);
      n.a = function () {
        return e.i(a.a)(i).scale(109.5).parallels([30, 30]);
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        function r(t, n) {
          var r = c - n,
            u = o * t;
          return [r * e.i(i.d)(u), c - r * e.i(i.c)(u)];
        }
        var u = e.i(i.c)(t),
          o = t === n ? e.i(i.d)(t) : (u - e.i(i.c)(n)) / (n - t),
          c = u / o + t;
        return e.i(i.p)(o) < i.o
          ? a.b
          : ((r.invert = function (t, n) {
              var r = c - n;
              return [(e.i(i.e)(t, e.i(i.p)(r)) / o) * e.i(i.q)(r), c - e.i(i.q)(o) * e.i(i.n)(t * t + r * r)];
            }),
            r);
      }
      n.b = r;
      var i = e(0),
        u = e(67),
        a = e(138);
      n.a = function () {
        return e.i(u.a)(r).scale(131.154).center([0, 13.9389]);
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        function n(t, n) {
          return [t * r, e.i(i.d)(n) / r];
        }
        var r = e.i(i.c)(t);
        return (
          (n.invert = function (t, n) {
            return [t / r, e.i(i.f)(n * r)];
          }),
          n
        );
      }
      n.a = r;
      var i = e(0);
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        var r = e.i(i.c)(n),
          u = e.i(i.c)(t) * r;
        return [(r * e.i(i.d)(t)) / u, e.i(i.d)(n) / u];
      }
      n.b = r;
      var i = e(0),
        u = e(27),
        a = e(10);
      (r.invert = e.i(u.a)(i.l)),
        (n.a = function () {
          return e.i(a.a)(r).scale(144.049).clipAngle(60);
        });
    },
    function (t, n, e) {
      "use strict";
      function r(t, n, r, i) {
        return 1 === t && 1 === n && 0 === r && 0 === i
          ? u.a
          : e.i(a.b)({
              point: function (e, u) {
                this.stream.point(e * t + r, u * n + i);
              },
            });
      }
      var i = e(38),
        u = e(66),
        a = e(40),
        o = e(69);
      n.a = function () {
        function t() {
          return (f = s = null), l;
        }
        var n,
          a,
          c,
          f,
          s,
          l,
          h = 1,
          d = 0,
          p = 0,
          v = 1,
          b = 1,
          g = u.a,
          y = null,
          _ = u.a;
        return (l = {
          stream: function (t) {
            return f && s === t ? f : (f = g(_((s = t))));
          },
          postclip: function (e) {
            return arguments.length ? ((_ = e), (y = n = a = c = null), t()) : _;
          },
          clipExtent: function (r) {
            return arguments.length
              ? ((_ =
                  null == r
                    ? ((y = n = a = c = null), u.a)
                    : e.i(i.a)((y = +r[0][0]), (n = +r[0][1]), (a = +r[1][0]), (c = +r[1][1]))),
                t())
              : null == y
              ? null
              : [
                  [y, n],
                  [a, c],
                ];
          },
          scale: function (n) {
            return arguments.length ? ((g = r((h = +n) * v, h * b, d, p)), t()) : h;
          },
          translate: function (n) {
            return arguments.length ? ((g = r(h * v, h * b, (d = +n[0]), (p = +n[1]))), t()) : [d, p];
          },
          reflectX: function (n) {
            return arguments.length ? ((g = r(h * (v = n ? -1 : 1), h * b, d, p)), t()) : v < 0;
          },
          reflectY: function (n) {
            return arguments.length ? ((g = r(h * v, h * (b = n ? -1 : 1), d, p)), t()) : b < 0;
          },
          fitExtent: function (t, n) {
            return e.i(o.a)(l, t, n);
          },
          fitSize: function (t, n) {
            return e.i(o.b)(l, t, n);
          },
          fitWidth: function (t, n) {
            return e.i(o.c)(l, t, n);
          },
          fitHeight: function (t, n) {
            return e.i(o.d)(l, t, n);
          },
        });
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        var e = n * n,
          r = e * e;
        return [
          t * (0.8707 - 0.131979 * e + r * (r * (0.003971 * e - 0.001529 * r) - 0.013791)),
          n * (1.007226 + e * (0.015085 + r * (0.028874 * e - 0.044475 - 0.005916 * r))),
        ];
      }
      n.b = r;
      var i = e(10),
        u = e(0);
      (r.invert = function (t, n) {
        var r,
          i = n,
          a = 25;
        do {
          var o = i * i,
            c = o * o;
          i -= r =
            (i * (1.007226 + o * (0.015085 + c * (0.028874 * o - 0.044475 - 0.005916 * c))) - n) /
            (1.007226 + o * (0.045255 + c * (0.259866 * o - 0.311325 - 0.005916 * 11 * c)));
        } while (e.i(u.p)(r) > u.o && --a > 0);
        return [t / (0.8707 + (o = i * i) * (o * (o * o * o * (0.003971 - 0.001529 * o) - 0.013791) - 0.131979)), i];
      }),
        (n.a = function () {
          return e.i(i.a)(r).scale(175.295);
        });
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        return [e.i(i.c)(n) * e.i(i.d)(t), e.i(i.d)(n)];
      }
      n.b = r;
      var i = e(0),
        u = e(27),
        a = e(10);
      (r.invert = e.i(u.a)(i.f)),
        (n.a = function () {
          return e
            .i(a.a)(r)
            .scale(249.5)
            .clipAngle(90 + i.o);
        });
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return e.i(o.b)({
          point: function (n, e) {
            (n = t(n, e)), this.stream.point(n[0], n[1]);
          },
        });
      }
      function i(t, n) {
        function r(i, u, o, c, s, l, h, d, p, v, b, g, y, _) {
          var m = h - i,
            x = d - u,
            w = m * m + x * x;
          if (w > 4 * n && y--) {
            var M = c + v,
              k = s + b,
              N = l + g,
              A = e.i(a.n)(M * M + k * k + N * N),
              S = e.i(a.f)((N /= A)),
              T = e.i(a.p)(e.i(a.p)(N) - 1) < a.o || e.i(a.p)(o - p) < a.o ? (o + p) / 2 : e.i(a.e)(k, M),
              E = t(T, S),
              C = E[0],
              P = E[1],
              z = C - i,
              R = P - u,
              q = x * z - m * R;
            ((q * q) / w > n || e.i(a.p)((m * z + x * R) / w - 0.5) > 0.3 || c * v + s * b + l * g < f) &&
              (r(i, u, o, c, s, l, C, P, T, (M /= A), (k /= A), N, y, _),
              _.point(C, P),
              r(C, P, T, M, k, N, h, d, p, v, b, g, y, _));
          }
        }
        return function (n) {
          function i(e, r) {
            (e = t(e, r)), n.point(e[0], e[1]);
          }
          function a() {
            (m = NaN), (N.point = o), n.lineStart();
          }
          function o(i, a) {
            var o = e.i(u.a)([i, a]),
              f = t(i, a);
            r(m, x, _, w, M, k, (m = f[0]), (x = f[1]), (_ = i), (w = o[0]), (M = o[1]), (k = o[2]), c, n),
              n.point(m, x);
          }
          function f() {
            (N.point = i), n.lineEnd();
          }
          function s() {
            a(), (N.point = l), (N.lineEnd = h);
          }
          function l(t, n) {
            o((d = t), n), (p = m), (v = x), (b = w), (g = M), (y = k), (N.point = o);
          }
          function h() {
            r(m, x, _, w, M, k, p, v, d, b, g, y, c, n), (N.lineEnd = f), f();
          }
          var d,
            p,
            v,
            b,
            g,
            y,
            _,
            m,
            x,
            w,
            M,
            k,
            N = {
              point: i,
              lineStart: a,
              lineEnd: f,
              polygonStart: function () {
                n.polygonStart(), (N.lineStart = s);
              },
              polygonEnd: function () {
                n.polygonEnd(), (N.lineStart = a);
              },
            };
          return N;
        };
      }
      var u = e(26),
        a = e(0),
        o = e(40),
        c = 16,
        f = e.i(a.c)(30 * a.g);
      n.a = function (t, n) {
        return +n ? i(t, n) : r(t);
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        var r = e.i(i.c)(n),
          u = 1 + e.i(i.c)(t) * r;
        return [(r * e.i(i.d)(t)) / u, e.i(i.d)(n) / u];
      }
      n.b = r;
      var i = e(0),
        u = e(27),
        a = e(10);
      (r.invert = e.i(u.a)(function (t) {
        return 2 * e.i(i.l)(t);
      })),
        (n.a = function () {
          return e.i(a.a)(r).scale(250).clipAngle(142);
        });
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        return [e.i(i.i)(e.i(i.j)((i.k + n) / 2)), -t];
      }
      n.b = r;
      var i = e(0),
        u = e(70);
      (r.invert = function (t, n) {
        return [-n, 2 * e.i(i.l)(e.i(i.m)(t)) - i.k];
      }),
        (n.a = function () {
          var t = e.i(u.c)(r),
            n = t.center,
            i = t.rotate;
          return (
            (t.center = function (t) {
              return arguments.length ? n([-t[1], t[0]]) : ((t = n()), [t[1], -t[0]]);
            }),
            (t.rotate = function (t) {
              return arguments.length
                ? i([t[0], t[1], t.length > 2 ? t[2] + 90 : 90])
                : ((t = i()), [t[0], t[1], t[2] - 90]);
            }),
            i([0, 0, 90]).scale(159.155)
          );
        });
    },
    function (t, n, e) {
      "use strict";
      var r = e(297);
      e.d(n, "a", function () {
        return r.a;
      });
      var i = e(72);
      e.d(n, "b", function () {
        return i.a;
      });
      var u = e(309);
      e.d(n, "c", function () {
        return u.a;
      });
      var a = e(141);
      e.d(n, "d", function () {
        return a.a;
      });
      var o = e(140);
      e.d(n, "e", function () {
        return o.a;
      });
      var c = e(310);
      e.d(n, "f", function () {
        return c.a;
      });
      var f = e(311);
      e.d(n, "g", function () {
        return f.a;
      });
      var s = e(312);
      e.d(n, "h", function () {
        return s.a;
      });
      var l = e(314);
      e.d(n, "i", function () {
        return l.a;
      });
      var h = e(313);
      e.d(n, "j", function () {
        return h.a;
      });
      var d = e(28);
      e.d(n, "k", function () {
        return d.a;
      });
      var p = e(41);
      e.d(n, "l", function () {
        return p.a;
      });
      var v = e(316);
      e.d(n, "m", function () {
        return v.a;
      });
      var b = e(73);
      e.d(n, "n", function () {
        return b.a;
      });
      var g = e(315);
      e.d(n, "o", function () {
        return g.a;
      });
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        for (var n, e, r = t.length; r; ) (e = (Math.random() * r--) | 0), (n = t[r]), (t[r] = t[e]), (t[e] = n);
        return t;
      }
      e.d(n, "b", function () {
        return i;
      }),
        (n.a = r);
      var i = Array.prototype.slice;
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        return t.parent === n.parent ? 1 : 2;
      }
      function i(t) {
        return t.reduce(u, 0) / t.length;
      }
      function u(t, n) {
        return t + n.x;
      }
      function a(t) {
        return 1 + t.reduce(o, 0);
      }
      function o(t, n) {
        return Math.max(t, n.y);
      }
      function c(t) {
        for (var n; (n = t.children); ) t = n[0];
        return t;
      }
      function f(t) {
        for (var n; (n = t.children); ) t = n[n.length - 1];
        return t;
      }
      n.a = function () {
        function t(t) {
          var r,
            s = 0;
          t.eachAfter(function (t) {
            var e = t.children;
            e ? ((t.x = i(e)), (t.y = a(e))) : ((t.x = r ? (s += n(t, r)) : 0), (t.y = 0), (r = t));
          });
          var l = c(t),
            h = f(t),
            d = l.x - n(l, h) / 2,
            p = h.x + n(h, l) / 2;
          return t.eachAfter(
            o
              ? function (n) {
                  (n.x = (n.x - t.x) * e), (n.y = (t.y - n.y) * u);
                }
              : function (n) {
                  (n.x = ((n.x - d) / (p - d)) * e), (n.y = (1 - (t.y ? n.y / t.y : 1)) * u);
                }
          );
        }
        var n = r,
          e = 1,
          u = 1,
          o = !1;
        return (
          (t.separation = function (e) {
            return arguments.length ? ((n = e), t) : n;
          }),
          (t.size = function (n) {
            return arguments.length ? ((o = !1), (e = +n[0]), (u = +n[1]), t) : o ? null : [e, u];
          }),
          (t.nodeSize = function (n) {
            return arguments.length ? ((o = !0), (e = +n[0]), (u = +n[1]), t) : o ? [e, u] : null;
          }),
          t
        );
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function () {
        for (var t = this, n = [t]; (t = t.parent); ) n.push(t);
        return n;
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        var n = 0,
          e = t.children,
          r = e && e.length;
        if (r) for (; --r >= 0; ) n += e[r].value;
        else n = 1;
        t.value = n;
      }
      n.a = function () {
        return this.eachAfter(r);
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function () {
        var t = [];
        return (
          this.each(function (n) {
            t.push(n);
          }),
          t
        );
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t) {
        var n,
          e,
          r,
          i,
          u = this,
          a = [u];
        do {
          for (n = a.reverse(), a = []; (u = n.pop()); )
            if ((t(u), (e = u.children))) for (r = 0, i = e.length; r < i; ++r) a.push(e[r]);
        } while (a.length);
        return this;
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t) {
        for (var n, e, r, i = this, u = [i], a = []; (i = u.pop()); )
          if ((a.push(i), (n = i.children))) for (e = 0, r = n.length; e < r; ++e) u.push(n[e]);
        for (; (i = a.pop()); ) t(i);
        return this;
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t) {
        for (var n, e, r = this, i = [r]; (r = i.pop()); )
          if ((t(r), (n = r.children))) for (e = n.length - 1; e >= 0; --e) i.push(n[e]);
        return this;
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function () {
        var t = [];
        return (
          this.eachBefore(function (n) {
            n.children || t.push(n);
          }),
          t
        );
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function () {
        var t = this,
          n = [];
        return (
          t.each(function (e) {
            e !== t && n.push({ source: e.parent, target: e });
          }),
          n
        );
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        if (t === n) return t;
        var e = t.ancestors(),
          r = n.ancestors(),
          i = null;
        for (t = e.pop(), n = r.pop(); t === n; ) (i = t), (t = e.pop()), (n = r.pop());
        return i;
      }
      n.a = function (t) {
        for (var n = this, e = r(n, t), i = [n]; n !== e; ) (n = n.parent), i.push(n);
        for (var u = i.length; t !== e; ) i.splice(u, 0, t), (t = t.parent);
        return i;
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t) {
        return this.eachBefore(function (n) {
          n.children && n.children.sort(t);
        });
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t) {
        return this.eachAfter(function (n) {
          for (var e = +t(n.data) || 0, r = n.children, i = r && r.length; --i >= 0; ) e += r[i].value;
          n.value = e;
        });
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return Math.sqrt(t.value);
      }
      function i(t) {
        return function (n) {
          n.children || (n.r = Math.max(0, +t(n) || 0));
        };
      }
      function u(t, n) {
        return function (r) {
          if ((i = r.children)) {
            var i,
              u,
              a,
              c = i.length,
              f = t(r) * n || 0;
            if (f) for (u = 0; u < c; ++u) i[u].r += f;
            if (((a = e.i(o.b)(i)), f)) for (u = 0; u < c; ++u) i[u].r -= f;
            r.r = a + f;
          }
        };
      }
      function a(t) {
        return function (n) {
          var e = n.parent;
          (n.r *= t), e && ((n.x = e.x + t * n.x), (n.y = e.y + t * n.y));
        };
      }
      var o = e(141),
        c = e(71),
        f = e(139);
      n.a = function () {
        function t(t) {
          return (
            (t.x = o / 2),
            (t.y = s / 2),
            n
              ? t.eachBefore(i(n)).eachAfter(u(l, 0.5)).eachBefore(a(1))
              : t
                  .eachBefore(i(r))
                  .eachAfter(u(f.a, 1))
                  .eachAfter(u(l, t.r / Math.min(o, s)))
                  .eachBefore(a(Math.min(o, s) / (2 * t.r))),
            t
          );
        }
        var n = null,
          o = 1,
          s = 1,
          l = f.a;
        return (
          (t.radius = function (r) {
            return arguments.length ? ((n = e.i(c.b)(r)), t) : n;
          }),
          (t.size = function (n) {
            return arguments.length ? ((o = +n[0]), (s = +n[1]), t) : [o, s];
          }),
          (t.padding = function (n) {
            return arguments.length ? ((l = "function" == typeof n ? n : e.i(f.b)(+n)), t) : l;
          }),
          t
        );
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(142),
        i = e(28);
      n.a = function () {
        function t(t) {
          var e = t.height + 1;
          return (t.x0 = t.y0 = o), (t.x1 = u), (t.y1 = a / e), t.eachBefore(n(a, e)), c && t.eachBefore(r.a), t;
        }
        function n(t, n) {
          return function (r) {
            r.children && e.i(i.a)(r, r.x0, (t * (r.depth + 1)) / n, r.x1, (t * (r.depth + 2)) / n);
            var u = r.x0,
              a = r.y0,
              c = r.x1 - o,
              f = r.y1 - o;
            c < u && (u = c = (u + c) / 2),
              f < a && (a = f = (a + f) / 2),
              (r.x0 = u),
              (r.y0 = a),
              (r.x1 = c),
              (r.y1 = f);
          };
        }
        var u = 1,
          a = 1,
          o = 0,
          c = !1;
        return (
          (t.round = function (n) {
            return arguments.length ? ((c = !!n), t) : c;
          }),
          (t.size = function (n) {
            return arguments.length ? ((u = +n[0]), (a = +n[1]), t) : [u, a];
          }),
          (t.padding = function (n) {
            return arguments.length ? ((o = +n), t) : o;
          }),
          t
        );
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return t.id;
      }
      function i(t) {
        return t.parentId;
      }
      var u = e(71),
        a = e(72),
        o = "$",
        c = { depth: -1 },
        f = {};
      n.a = function () {
        function t(t) {
          var e,
            r,
            i,
            u,
            l,
            h,
            d,
            p = t.length,
            v = new Array(p),
            b = {};
          for (r = 0; r < p; ++r)
            (e = t[r]),
              (l = v[r] = new a.b(e)),
              null != (h = n(e, r, t)) && (h += "") && ((d = o + (l.id = h)), (b[d] = d in b ? f : l));
          for (r = 0; r < p; ++r)
            if (((l = v[r]), null != (h = s(t[r], r, t)) && (h += ""))) {
              if (!(u = b[o + h])) throw new Error("missing: " + h);
              if (u === f) throw new Error("ambiguous: " + h);
              u.children ? u.children.push(l) : (u.children = [l]), (l.parent = u);
            } else {
              if (i) throw new Error("multiple roots");
              i = l;
            }
          if (!i) throw new Error("no root");
          if (
            ((i.parent = c),
            i
              .eachBefore(function (t) {
                (t.depth = t.parent.depth + 1), --p;
              })
              .eachBefore(a.c),
            (i.parent = null),
            p > 0)
          )
            throw new Error("cycle");
          return i;
        }
        var n = r,
          s = i;
        return (
          (t.id = function (r) {
            return arguments.length ? ((n = e.i(u.a)(r)), t) : n;
          }),
          (t.parentId = function (n) {
            return arguments.length ? ((s = e.i(u.a)(n)), t) : s;
          }),
          t
        );
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        return t.parent === n.parent ? 1 : 2;
      }
      function i(t) {
        var n = t.children;
        return n ? n[0] : t.t;
      }
      function u(t) {
        var n = t.children;
        return n ? n[n.length - 1] : t.t;
      }
      function a(t, n, e) {
        var r = e / (n.i - t.i);
        (n.c -= r), (n.s += e), (t.c += r), (n.z += e), (n.m += e);
      }
      function o(t) {
        for (var n, e = 0, r = 0, i = t.children, u = i.length; --u >= 0; )
          (n = i[u]), (n.z += e), (n.m += e), (e += n.s + (r += n.c));
      }
      function c(t, n, e) {
        return t.a.parent === n.parent ? t.a : e;
      }
      function f(t, n) {
        (this._ = t),
          (this.parent = null),
          (this.children = null),
          (this.A = null),
          (this.a = this),
          (this.z = 0),
          (this.m = 0),
          (this.c = 0),
          (this.s = 0),
          (this.t = null),
          (this.i = n);
      }
      function s(t) {
        for (var n, e, r, i, u, a = new f(t, 0), o = [a]; (n = o.pop()); )
          if ((r = n._.children))
            for (n.children = new Array((u = r.length)), i = u - 1; i >= 0; --i)
              o.push((e = n.children[i] = new f(r[i], i))), (e.parent = n);
        return ((a.parent = new f(null, 0)).children = [a]), a;
      }
      var l = e(72);
      (f.prototype = Object.create(l.b.prototype)),
        (n.a = function () {
          function t(t) {
            var r = s(t);
            if ((r.eachAfter(n), (r.parent.m = -r.z), r.eachBefore(e), v)) t.eachBefore(l);
            else {
              var i = t,
                u = t,
                a = t;
              t.eachBefore(function (t) {
                t.x < i.x && (i = t), t.x > u.x && (u = t), t.depth > a.depth && (a = t);
              });
              var o = i === u ? 1 : h(i, u) / 2,
                c = o - i.x,
                f = d / (u.x + o + c),
                b = p / (a.depth || 1);
              t.eachBefore(function (t) {
                (t.x = (t.x + c) * f), (t.y = t.depth * b);
              });
            }
            return t;
          }
          function n(t) {
            var n = t.children,
              e = t.parent.children,
              r = t.i ? e[t.i - 1] : null;
            if (n) {
              o(t);
              var i = (n[0].z + n[n.length - 1].z) / 2;
              r ? ((t.z = r.z + h(t._, r._)), (t.m = t.z - i)) : (t.z = i);
            } else r && (t.z = r.z + h(t._, r._));
            t.parent.A = f(t, r, t.parent.A || e[0]);
          }
          function e(t) {
            (t._.x = t.z + t.parent.m), (t.m += t.parent.m);
          }
          function f(t, n, e) {
            if (n) {
              for (
                var r, o = t, f = t, s = n, l = o.parent.children[0], d = o.m, p = f.m, v = s.m, b = l.m;
                (s = u(s)), (o = i(o)), s && o;

              )
                (l = i(l)),
                  (f = u(f)),
                  (f.a = t),
                  (r = s.z + v - o.z - d + h(s._, o._)),
                  r > 0 && (a(c(s, t, e), t, r), (d += r), (p += r)),
                  (v += s.m),
                  (d += o.m),
                  (b += l.m),
                  (p += f.m);
              s && !u(f) && ((f.t = s), (f.m += v - p)), o && !i(l) && ((l.t = o), (l.m += d - b), (e = t));
            }
            return e;
          }
          function l(t) {
            (t.x *= d), (t.y = t.depth * p);
          }
          var h = r,
            d = 1,
            p = 1,
            v = null;
          return (
            (t.separation = function (n) {
              return arguments.length ? ((h = n), t) : h;
            }),
            (t.size = function (n) {
              return arguments.length ? ((v = !1), (d = +n[0]), (p = +n[1]), t) : v ? null : [d, p];
            }),
            (t.nodeSize = function (n) {
              return arguments.length ? ((v = !0), (d = +n[0]), (p = +n[1]), t) : v ? [d, p] : null;
            }),
            t
          );
        });
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t, n, e, r, i) {
        function u(t, n, e, r, i, a, o) {
          if (t >= n - 1) {
            var f = c[t];
            return (f.x0 = r), (f.y0 = i), (f.x1 = a), (f.y1 = o), void 0;
          }
          for (var l = s[t], h = e / 2 + l, d = t + 1, p = n - 1; d < p; ) {
            var v = (d + p) >>> 1;
            s[v] < h ? (d = v + 1) : (p = v);
          }
          h - s[d - 1] < s[d] - h && t + 1 < d && --d;
          var b = s[d] - l,
            g = e - b;
          if (a - r > o - i) {
            var y = (r * g + a * b) / e;
            u(t, d, b, r, i, y, o), u(d, n, g, y, i, a, o);
          } else {
            var _ = (i * g + o * b) / e;
            u(t, d, b, r, i, a, _), u(d, n, g, r, _, a, o);
          }
        }
        var a,
          o,
          c = t.children,
          f = c.length,
          s = new Array(f + 1);
        for (s[0] = o = a = 0; a < f; ++a) s[a + 1] = o += c[a].value;
        u(0, f, t.value, n, e, r, i);
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(142),
        i = e(73),
        u = e(71),
        a = e(139);
      n.a = function () {
        function t(t) {
          return (t.x0 = t.y0 = 0), (t.x1 = f), (t.y1 = s), t.eachBefore(n), (l = [0]), c && t.eachBefore(r.a), t;
        }
        function n(t) {
          var n = l[t.depth],
            e = t.x0 + n,
            r = t.y0 + n,
            i = t.x1 - n,
            u = t.y1 - n;
          i < e && (e = i = (e + i) / 2),
            u < r && (r = u = (r + u) / 2),
            (t.x0 = e),
            (t.y0 = r),
            (t.x1 = i),
            (t.y1 = u),
            t.children &&
              ((n = l[t.depth + 1] = h(t) / 2),
              (e += b(t) - n),
              (r += d(t) - n),
              (i -= p(t) - n),
              (u -= v(t) - n),
              i < e && (e = i = (e + i) / 2),
              u < r && (r = u = (r + u) / 2),
              o(t, e, r, i, u));
        }
        var o = i.a,
          c = !1,
          f = 1,
          s = 1,
          l = [0],
          h = a.a,
          d = a.a,
          p = a.a,
          v = a.a,
          b = a.a;
        return (
          (t.round = function (n) {
            return arguments.length ? ((c = !!n), t) : c;
          }),
          (t.size = function (n) {
            return arguments.length ? ((f = +n[0]), (s = +n[1]), t) : [f, s];
          }),
          (t.tile = function (n) {
            return arguments.length ? ((o = e.i(u.a)(n)), t) : o;
          }),
          (t.padding = function (n) {
            return arguments.length ? t.paddingInner(n).paddingOuter(n) : t.paddingInner();
          }),
          (t.paddingInner = function (n) {
            return arguments.length ? ((h = "function" == typeof n ? n : e.i(a.b)(+n)), t) : h;
          }),
          (t.paddingOuter = function (n) {
            return arguments.length ? t.paddingTop(n).paddingRight(n).paddingBottom(n).paddingLeft(n) : t.paddingTop();
          }),
          (t.paddingTop = function (n) {
            return arguments.length ? ((d = "function" == typeof n ? n : e.i(a.b)(+n)), t) : d;
          }),
          (t.paddingRight = function (n) {
            return arguments.length ? ((p = "function" == typeof n ? n : e.i(a.b)(+n)), t) : p;
          }),
          (t.paddingBottom = function (n) {
            return arguments.length ? ((v = "function" == typeof n ? n : e.i(a.b)(+n)), t) : v;
          }),
          (t.paddingLeft = function (n) {
            return arguments.length ? ((b = "function" == typeof n ? n : e.i(a.b)(+n)), t) : b;
          }),
          t
        );
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(28),
        i = e(41),
        u = e(73);
      n.a = (function t(n) {
        function a(t, a, o, c, f) {
          if ((s = t._squarify) && s.ratio === n)
            for (var s, l, h, d, p, v = -1, b = s.length, g = t.value; ++v < b; ) {
              for (l = s[v], h = l.children, d = l.value = 0, p = h.length; d < p; ++d) l.value += h[d].value;
              l.dice
                ? e.i(r.a)(l, a, o, c, (o += ((f - o) * l.value) / g))
                : e.i(i.a)(l, a, o, (a += ((c - a) * l.value) / g), f),
                (g -= l.value);
            }
          else (t._squarify = s = e.i(u.b)(n, t, a, o, c, f)), (s.ratio = n);
        }
        return (
          (a.ratio = function (n) {
            return t((n = +n) > 1 ? n : 1);
          }),
          a
        );
      })(u.c);
    },
    function (t, n, e) {
      "use strict";
      var r = e(28),
        i = e(41);
      n.a = function (t, n, e, u, a) {
        (1 & t.depth ? i.a : r.a)(t, n, e, u, a);
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return (function n(r) {
          function a(n, a) {
            var o = t((n = e.i(i.f)(n)).h, (a = e.i(i.f)(a)).h),
              c = e.i(u.a)(n.s, a.s),
              f = e.i(u.a)(n.l, a.l),
              s = e.i(u.a)(n.opacity, a.opacity);
            return function (t) {
              return (n.h = o(t)), (n.s = c(t)), (n.l = f(Math.pow(t, r))), (n.opacity = s(t)), n + "";
            };
          }
          return (r = +r), (a.gamma = n), a;
        })(1);
      }
      e.d(n, "b", function () {
        return a;
      });
      var i = e(9),
        u = e(29);
      n.a = r(u.b);
      var a = r(u.a);
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return function (n, r) {
          var a = t((n = e.i(i.e)(n)).h, (r = e.i(i.e)(r)).h),
            o = e.i(u.a)(n.c, r.c),
            c = e.i(u.a)(n.l, r.l),
            f = e.i(u.a)(n.opacity, r.opacity);
          return function (t) {
            return (n.h = a(t)), (n.c = o(t)), (n.l = c(t)), (n.opacity = f(t)), n + "";
          };
        };
      }
      e.d(n, "b", function () {
        return a;
      });
      var i = e(9),
        u = e(29);
      n.a = r(u.b);
      var a = r(u.a);
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return function (n, r) {
          var a = t((n = e.i(i.c)(n)).h, (r = e.i(i.c)(r)).h),
            o = e.i(u.a)(n.s, r.s),
            c = e.i(u.a)(n.l, r.l),
            f = e.i(u.a)(n.opacity, r.opacity);
          return function (t) {
            return (n.h = a(t)), (n.s = o(t)), (n.l = c(t)), (n.opacity = f(t)), n + "";
          };
        };
      }
      e.d(n, "b", function () {
        return a;
      });
      var i = e(9),
        u = e(29);
      n.a = r(u.b);
      var a = r(u.a);
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        var r = e.i(u.a)((t = e.i(i.d)(t)).l, (n = e.i(i.d)(n)).l),
          a = e.i(u.a)(t.a, n.a),
          o = e.i(u.a)(t.b, n.b),
          c = e.i(u.a)(t.opacity, n.opacity);
        return function (n) {
          return (t.l = r(n)), (t.a = a(n)), (t.b = o(n)), (t.opacity = c(n)), t + "";
        };
      }
      n.a = r;
      var i = e(9),
        u = e(29);
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t, n) {
        for (var e = new Array(n), r = 0; r < n; ++r) e[r] = t(r / (n - 1));
        return e;
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t, n) {
        return (
          (t = +t),
          (n -= t),
          function (e) {
            return Math.round(t + n * e);
          }
        );
      };
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "a", function () {
        return i;
      });
      var r = 180 / Math.PI,
        i = { translateX: 0, translateY: 0, rotate: 0, skewX: 0, scaleX: 1, scaleY: 1 };
      n.b = function (t, n, e, i, u, a) {
        var o, c, f;
        return (
          (o = Math.sqrt(t * t + n * n)) && ((t /= o), (n /= o)),
          (f = t * e + n * i) && ((e -= t * f), (i -= n * f)),
          (c = Math.sqrt(e * e + i * i)) && ((e /= c), (i /= c), (f /= c)),
          t * i < n * e && ((t = -t), (n = -n), (f = -f), (o = -o)),
          { translateX: u, translateY: a, rotate: Math.atan2(n, t) * r, skewX: Math.atan(f) * r, scaleX: o, scaleY: c }
        );
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t, n, r, u) {
        function a(t) {
          return t.length ? t.pop() + " " : "";
        }
        function o(t, u, a, o, c, f) {
          if (t !== a || u !== o) {
            var s = c.push("translate(", null, n, null, r);
            f.push({ i: s - 4, x: e.i(i.a)(t, a) }, { i: s - 2, x: e.i(i.a)(u, o) });
          } else (a || o) && c.push("translate(" + a + n + o + r);
        }
        function c(t, n, r, o) {
          t !== n
            ? (t - n > 180 ? (n += 360) : n - t > 180 && (t += 360),
              o.push({ i: r.push(a(r) + "rotate(", null, u) - 2, x: e.i(i.a)(t, n) }))
            : n && r.push(a(r) + "rotate(" + n + u);
        }
        function f(t, n, r, o) {
          t !== n
            ? o.push({ i: r.push(a(r) + "skewX(", null, u) - 2, x: e.i(i.a)(t, n) })
            : n && r.push(a(r) + "skewX(" + n + u);
        }
        function s(t, n, r, u, o, c) {
          if (t !== r || n !== u) {
            var f = o.push(a(o) + "scale(", null, ",", null, ")");
            c.push({ i: f - 4, x: e.i(i.a)(t, r) }, { i: f - 2, x: e.i(i.a)(n, u) });
          } else (1 === r && 1 === u) || o.push(a(o) + "scale(" + r + "," + u + ")");
        }
        return function (n, e) {
          var r = [],
            i = [];
          return (
            (n = t(n)),
            (e = t(e)),
            o(n.translateX, n.translateY, e.translateX, e.translateY, r, i),
            c(n.rotate, e.rotate, r, i),
            f(n.skewX, e.skewX, r, i),
            s(n.scaleX, n.scaleY, e.scaleX, e.scaleY, r, i),
            (n = e = null),
            function (t) {
              for (var n, e = -1, u = i.length; ++e < u; ) r[(n = i[e]).i] = n.x(t);
              return r.join("");
            }
          );
        };
      }
      e.d(n, "a", function () {
        return a;
      }),
        e.d(n, "b", function () {
          return o;
        });
      var i = e(42),
        u = e(325),
        a = r(u.a, "px, ", "px)", "deg)"),
        o = r(u.b, ", ", ")", ")");
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return "none" === t
          ? f.a
          : (u || ((u = document.createElement("DIV")), (a = document.documentElement), (o = document.defaultView)),
            (u.style.transform = t),
            (t = o.getComputedStyle(a.appendChild(u), null).getPropertyValue("transform")),
            a.removeChild(u),
            (t = t.slice(7, -1).split(",")),
            e.i(f.b)(+t[0], +t[1], +t[2], +t[3], +t[4], +t[5]));
      }
      function i(t) {
        return null == t
          ? f.a
          : (c || (c = document.createElementNS("http://www.w3.org/2000/svg", "g")),
            c.setAttribute("transform", t),
            (t = c.transform.baseVal.consolidate()) ? ((t = t.matrix), e.i(f.b)(t.a, t.b, t.c, t.d, t.e, t.f)) : f.a);
      }
      (n.a = r), (n.b = i);
      var u,
        a,
        o,
        c,
        f = e(323);
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return ((t = Math.exp(t)) + 1 / t) / 2;
      }
      function i(t) {
        return ((t = Math.exp(t)) - 1 / t) / 2;
      }
      function u(t) {
        return ((t = Math.exp(2 * t)) - 1) / (t + 1);
      }
      var a = Math.SQRT2;
      n.a = function (t, n) {
        var e,
          o,
          c = t[0],
          f = t[1],
          s = t[2],
          l = n[0],
          h = n[1],
          d = n[2],
          p = l - c,
          v = h - f,
          b = p * p + v * v;
        if (b < 1e-12)
          (o = Math.log(d / s) / a),
            (e = function (t) {
              return [c + t * p, f + t * v, s * Math.exp(a * t * o)];
            });
        else {
          var g = Math.sqrt(b),
            y = (d * d - s * s + 4 * b) / (2 * s * 2 * g),
            _ = (d * d - s * s - 4 * b) / (2 * d * 2 * g),
            m = Math.log(Math.sqrt(y * y + 1) - y),
            x = Math.log(Math.sqrt(_ * _ + 1) - _);
          (o = (x - m) / a),
            (e = function (t) {
              var n = t * o,
                e = r(m),
                l = (s / (2 * g)) * (e * u(a * n + m) - i(m));
              return [c + l * p, f + l * v, (s * e) / r(a * n + m)];
            });
        }
        return (e.duration = 1e3 * o), e;
      };
    },
    function (t, n, e) {
      "use strict";
      function r() {
        (this._x0 = this._y0 = this._x1 = this._y1 = null), (this._ = "");
      }
      function i() {
        return new r();
      }
      var u = Math.PI,
        a = 2 * u,
        o = a - 1e-6;
      (r.prototype = i.prototype =
        {
          constructor: r,
          moveTo: function (t, n) {
            this._ += "M" + (this._x0 = this._x1 = +t) + "," + (this._y0 = this._y1 = +n);
          },
          closePath: function () {
            null !== this._x1 && ((this._x1 = this._x0), (this._y1 = this._y0), (this._ += "Z"));
          },
          lineTo: function (t, n) {
            this._ += "L" + (this._x1 = +t) + "," + (this._y1 = +n);
          },
          quadraticCurveTo: function (t, n, e, r) {
            this._ += "Q" + +t + "," + +n + "," + (this._x1 = +e) + "," + (this._y1 = +r);
          },
          bezierCurveTo: function (t, n, e, r, i, u) {
            this._ += "C" + +t + "," + +n + "," + +e + "," + +r + "," + (this._x1 = +i) + "," + (this._y1 = +u);
          },
          arcTo: function (t, n, e, r, i) {
            (t = +t), (n = +n), (e = +e), (r = +r), (i = +i);
            var a = this._x1,
              o = this._y1,
              c = e - t,
              f = r - n,
              s = a - t,
              l = o - n,
              h = s * s + l * l;
            if (i < 0) throw new Error("negative radius: " + i);
            if (null === this._x1) this._ += "M" + (this._x1 = t) + "," + (this._y1 = n);
            else if (h > 1e-6)
              if (Math.abs(l * c - f * s) > 1e-6 && i) {
                var d = e - a,
                  p = r - o,
                  v = c * c + f * f,
                  b = d * d + p * p,
                  g = Math.sqrt(v),
                  y = Math.sqrt(h),
                  _ = i * Math.tan((u - Math.acos((v + h - b) / (2 * g * y))) / 2),
                  m = _ / y,
                  x = _ / g;
                Math.abs(m - 1) > 1e-6 && (this._ += "L" + (t + m * s) + "," + (n + m * l)),
                  (this._ +=
                    "A" +
                    i +
                    "," +
                    i +
                    ",0,0," +
                    +(l * d > s * p) +
                    "," +
                    (this._x1 = t + x * c) +
                    "," +
                    (this._y1 = n + x * f));
              } else this._ += "L" + (this._x1 = t) + "," + (this._y1 = n);
            else;
          },
          arc: function (t, n, e, r, i, c) {
            (t = +t), (n = +n), (e = +e);
            var f = e * Math.cos(r),
              s = e * Math.sin(r),
              l = t + f,
              h = n + s,
              d = 1 ^ c,
              p = c ? r - i : i - r;
            if (e < 0) throw new Error("negative radius: " + e);
            null === this._x1
              ? (this._ += "M" + l + "," + h)
              : (Math.abs(this._x1 - l) > 1e-6 || Math.abs(this._y1 - h) > 1e-6) && (this._ += "L" + l + "," + h),
              e &&
                (p < 0 && (p = (p % a) + a),
                p > o
                  ? (this._ +=
                      "A" +
                      e +
                      "," +
                      e +
                      ",0,1," +
                      d +
                      "," +
                      (t - f) +
                      "," +
                      (n - s) +
                      "A" +
                      e +
                      "," +
                      e +
                      ",0,1," +
                      d +
                      "," +
                      (this._x1 = l) +
                      "," +
                      (this._y1 = h))
                  : p > 1e-6 &&
                    (this._ +=
                      "A" +
                      e +
                      "," +
                      e +
                      ",0," +
                      +(p >= u) +
                      "," +
                      d +
                      "," +
                      (this._x1 = t + e * Math.cos(i)) +
                      "," +
                      (this._y1 = n + e * Math.sin(i))));
          },
          rect: function (t, n, e, r) {
            this._ +=
              "M" +
              (this._x0 = this._x1 = +t) +
              "," +
              (this._y0 = this._y1 = +n) +
              "h" +
              +e +
              "v" +
              +r +
              "h" +
              -e +
              "Z";
          },
          toString: function () {
            return this._;
          },
        }),
        (n.a = i);
    },
    function (t, n, e) {
      "use strict";
      var r = e(329);
      e.d(n, "a", function () {
        return r.a;
      });
      var i = e(330);
      e.d(n, "b", function () {
        return i.a;
      });
      var u = e(333);
      e.d(n, "c", function () {
        return u.a;
      });
      var a = e(331);
      e.d(n, "d", function () {
        return a.a;
      });
      var o = e(334);
      e.d(n, "e", function () {
        return o.a;
      });
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t) {
        for (var n, e = -1, r = t.length, i = t[r - 1], u = 0; ++e < r; )
          (n = i), (i = t[e]), (u += n[1] * i[0] - n[0] * i[1]);
        return u / 2;
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t) {
        for (var n, e, r = -1, i = t.length, u = 0, a = 0, o = t[i - 1], c = 0; ++r < i; )
          (n = o), (o = t[r]), (c += e = n[0] * o[1] - o[0] * n[1]), (u += (n[0] + o[0]) * e), (a += (n[1] + o[1]) * e);
        return (c *= 3), [u / c, a / c];
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t, n) {
        for (var e, r, i = t.length, u = t[i - 1], a = n[0], o = n[1], c = u[0], f = u[1], s = !1, l = 0; l < i; ++l)
          (u = t[l]),
            (e = u[0]),
            (r = u[1]),
            r > o != f > o && a < ((c - e) * (o - r)) / (f - r) + e && (s = !s),
            (c = e),
            (f = r);
        return s;
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t, n, e) {
        return (n[0] - t[0]) * (e[1] - t[1]) - (n[1] - t[1]) * (e[0] - t[0]);
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        return t[0] - n[0] || t[1] - n[1];
      }
      function i(t) {
        for (var n = t.length, r = [0, 1], i = 2, a = 2; a < n; ++a) {
          for (; i > 1 && e.i(u.a)(t[r[i - 2]], t[r[i - 1]], t[a]) <= 0; ) --i;
          r[i++] = a;
        }
        return r.slice(0, i);
      }
      var u = e(332);
      n.a = function (t) {
        if ((e = t.length) < 3) return null;
        var n,
          e,
          u = new Array(e),
          a = new Array(e);
        for (n = 0; n < e; ++n) u[n] = [+t[n][0], +t[n][1], n];
        for (u.sort(r), n = 0; n < e; ++n) a[n] = [u[n][0], -u[n][1]];
        var o = i(u),
          c = i(a),
          f = c[0] === o[0],
          s = c[c.length - 1] === o[o.length - 1],
          l = [];
        for (n = o.length - 1; n >= 0; --n) l.push(t[u[o[n]][2]]);
        for (n = +f; n < c.length - s; ++n) l.push(t[u[c[n]][2]]);
        return l;
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t) {
        for (var n, e, r = -1, i = t.length, u = t[i - 1], a = u[0], o = u[1], c = 0; ++r < i; )
          (n = a), (e = o), (u = t[r]), (a = u[0]), (o = u[1]), (n -= a), (e -= o), (c += Math.sqrt(n * n + e * e));
        return c;
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t, n, e, r) {
        if (isNaN(n) || isNaN(e)) return t;
        var i,
          u,
          a,
          o,
          c,
          f,
          s,
          l,
          h,
          d = t._root,
          p = { data: r },
          v = t._x0,
          b = t._y0,
          g = t._x1,
          y = t._y1;
        if (!d) return (t._root = p), t;
        for (; d.length; )
          if (
            ((f = n >= (u = (v + g) / 2)) ? (v = u) : (g = u),
            (s = e >= (a = (b + y) / 2)) ? (b = a) : (y = a),
            (i = d),
            !(d = d[(l = (s << 1) | f)]))
          )
            return (i[l] = p), t;
        if (((o = +t._x.call(null, d.data)), (c = +t._y.call(null, d.data)), n === o && e === c))
          return (p.next = d), i ? (i[l] = p) : (t._root = p), t;
        do {
          (i = i ? (i[l] = new Array(4)) : (t._root = new Array(4))),
            (f = n >= (u = (v + g) / 2)) ? (v = u) : (g = u),
            (s = e >= (a = (b + y) / 2)) ? (b = a) : (y = a);
        } while ((l = (s << 1) | f) == (h = ((c >= a) << 1) | (o >= u)));
        return (i[h] = d), (i[l] = p), t;
      }
      function i(t) {
        var n,
          e,
          i,
          u,
          a = t.length,
          o = new Array(a),
          c = new Array(a),
          f = 1 / 0,
          s = 1 / 0,
          l = -1 / 0,
          h = -1 / 0;
        for (e = 0; e < a; ++e)
          isNaN((i = +this._x.call(null, (n = t[e])))) ||
            isNaN((u = +this._y.call(null, n))) ||
            ((o[e] = i), (c[e] = u), i < f && (f = i), i > l && (l = i), u < s && (s = u), u > h && (h = u));
        for (
          l < f && ((f = this._x0), (l = this._x1)),
            h < s && ((s = this._y0), (h = this._y1)),
            this.cover(f, s).cover(l, h),
            e = 0;
          e < a;
          ++e
        )
          r(this, o[e], c[e], t[e]);
        return this;
      }
      (n.b = i),
        (n.a = function (t) {
          var n = +this._x.call(null, t),
            e = +this._y.call(null, t);
          return r(this.cover(n, e), n, e, t);
        });
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t, n) {
        if (isNaN((t = +t)) || isNaN((n = +n))) return this;
        var e = this._x0,
          r = this._y0,
          i = this._x1,
          u = this._y1;
        if (isNaN(e)) (i = (e = Math.floor(t)) + 1), (u = (r = Math.floor(n)) + 1);
        else {
          if (!(e > t || t > i || r > n || n > u)) return this;
          var a,
            o,
            c = i - e,
            f = this._root;
          switch ((o = ((n < (r + u) / 2) << 1) | (t < (e + i) / 2))) {
            case 0:
              do {
                (a = new Array(4)), (a[o] = f), (f = a);
              } while (((c *= 2), (i = e + c), (u = r + c), t > i || n > u));
              break;
            case 1:
              do {
                (a = new Array(4)), (a[o] = f), (f = a);
              } while (((c *= 2), (e = i - c), (u = r + c), e > t || n > u));
              break;
            case 2:
              do {
                (a = new Array(4)), (a[o] = f), (f = a);
              } while (((c *= 2), (i = e + c), (r = u - c), t > i || r > n));
              break;
            case 3:
              do {
                (a = new Array(4)), (a[o] = f), (f = a);
              } while (((c *= 2), (e = i - c), (r = u - c), e > t || r > n));
          }
          this._root && this._root.length && (this._root = f);
        }
        return (this._x0 = e), (this._y0 = r), (this._x1 = i), (this._y1 = u), this;
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function () {
        var t = [];
        return (
          this.visit(function (n) {
            if (!n.length)
              do {
                t.push(n.data);
              } while ((n = n.next));
          }),
          t
        );
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t) {
        return arguments.length
          ? this.cover(+t[0][0], +t[0][1]).cover(+t[1][0], +t[1][1])
          : isNaN(this._x0)
          ? void 0
          : [
              [this._x0, this._y0],
              [this._x1, this._y1],
            ];
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(77);
      n.a = function (t, n, e) {
        var i,
          u,
          a,
          o,
          c,
          f,
          s,
          l = this._x0,
          h = this._y0,
          d = this._x1,
          p = this._y1,
          v = [],
          b = this._root;
        for (
          b && v.push(new r.a(b, l, h, d, p)),
            null == e ? (e = 1 / 0) : ((l = t - e), (h = n - e), (d = t + e), (p = n + e), (e *= e));
          (f = v.pop());

        )
          if (!(!(b = f.node) || (u = f.x0) > d || (a = f.y0) > p || (o = f.x1) < l || (c = f.y1) < h))
            if (b.length) {
              var g = (u + o) / 2,
                y = (a + c) / 2;
              v.push(
                new r.a(b[3], g, y, o, c),
                new r.a(b[2], u, y, g, c),
                new r.a(b[1], g, a, o, y),
                new r.a(b[0], u, a, g, y)
              ),
                (s = ((n >= y) << 1) | (t >= g)) &&
                  ((f = v[v.length - 1]), (v[v.length - 1] = v[v.length - 1 - s]), (v[v.length - 1 - s] = f));
            } else {
              var _ = t - +this._x.call(null, b.data),
                m = n - +this._y.call(null, b.data),
                x = _ * _ + m * m;
              if (x < e) {
                var w = Math.sqrt((e = x));
                (l = t - w), (h = n - w), (d = t + w), (p = n + w), (i = b.data);
              }
            }
        return i;
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t, n, e) {
        var r = new i(null == n ? b.a : n, null == e ? g.a : e, NaN, NaN, NaN, NaN);
        return null == t ? r : r.addAll(t);
      }
      function i(t, n, e, r, i, u) {
        (this._x = t),
          (this._y = n),
          (this._x0 = e),
          (this._y0 = r),
          (this._x1 = i),
          (this._y1 = u),
          (this._root = void 0);
      }
      function u(t) {
        for (var n = { data: t.data }, e = n; (t = t.next); ) e = e.next = { data: t.data };
        return n;
      }
      n.a = r;
      var a = e(335),
        o = e(336),
        c = e(337),
        f = e(338),
        s = e(339),
        l = e(341),
        h = e(342),
        d = e(343),
        p = e(344),
        v = e(345),
        b = e(346),
        g = e(347),
        y = (r.prototype = i.prototype);
      (y.copy = function () {
        var t,
          n,
          e = new i(this._x, this._y, this._x0, this._y0, this._x1, this._y1),
          r = this._root;
        if (!r) return e;
        if (!r.length) return (e._root = u(r)), e;
        for (t = [{ source: r, target: (e._root = new Array(4)) }]; (r = t.pop()); )
          for (var a = 0; a < 4; ++a)
            (n = r.source[a]) &&
              (n.length ? t.push({ source: n, target: (r.target[a] = new Array(4)) }) : (r.target[a] = u(n)));
        return e;
      }),
        (y.add = a.a),
        (y.addAll = a.b),
        (y.cover = o.a),
        (y.data = c.a),
        (y.extent = f.a),
        (y.find = s.a),
        (y.remove = l.a),
        (y.removeAll = l.b),
        (y.root = h.a),
        (y.size = d.a),
        (y.visit = p.a),
        (y.visitAfter = v.a),
        (y.x = b.b),
        (y.y = g.b);
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        for (var n = 0, e = t.length; n < e; ++n) this.remove(t[n]);
        return this;
      }
      (n.b = r),
        (n.a = function (t) {
          if (isNaN((u = +this._x.call(null, t))) || isNaN((a = +this._y.call(null, t)))) return this;
          var n,
            e,
            r,
            i,
            u,
            a,
            o,
            c,
            f,
            s,
            l,
            h,
            d = this._root,
            p = this._x0,
            v = this._y0,
            b = this._x1,
            g = this._y1;
          if (!d) return this;
          if (d.length)
            for (;;) {
              if (
                ((f = u >= (o = (p + b) / 2)) ? (p = o) : (b = o),
                (s = a >= (c = (v + g) / 2)) ? (v = c) : (g = c),
                (n = d),
                !(d = d[(l = (s << 1) | f)]))
              )
                return this;
              if (!d.length) break;
              (n[(l + 1) & 3] || n[(l + 2) & 3] || n[(l + 3) & 3]) && ((e = n), (h = l));
            }
          for (; d.data !== t; ) if (((r = d), !(d = d.next))) return this;
          return (
            (i = d.next) && delete d.next,
            r
              ? (i ? (r.next = i) : delete r.next, this)
              : n
              ? (i ? (n[l] = i) : delete n[l],
                (d = n[0] || n[1] || n[2] || n[3]) &&
                  d === (n[3] || n[2] || n[1] || n[0]) &&
                  !d.length &&
                  (e ? (e[h] = d) : (this._root = d)),
                this)
              : ((this._root = i), this)
          );
        });
    },
    function (t, n, e) {
      "use strict";
      n.a = function () {
        return this._root;
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function () {
        var t = 0;
        return (
          this.visit(function (n) {
            if (!n.length)
              do {
                ++t;
              } while ((n = n.next));
          }),
          t
        );
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(77);
      n.a = function (t) {
        var n,
          e,
          i,
          u,
          a,
          o,
          c = [],
          f = this._root;
        for (f && c.push(new r.a(f, this._x0, this._y0, this._x1, this._y1)); (n = c.pop()); )
          if (!t((f = n.node), (i = n.x0), (u = n.y0), (a = n.x1), (o = n.y1)) && f.length) {
            var s = (i + a) / 2,
              l = (u + o) / 2;
            (e = f[3]) && c.push(new r.a(e, s, l, a, o)),
              (e = f[2]) && c.push(new r.a(e, i, l, s, o)),
              (e = f[1]) && c.push(new r.a(e, s, u, a, l)),
              (e = f[0]) && c.push(new r.a(e, i, u, s, l));
          }
        return this;
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(77);
      n.a = function (t) {
        var n,
          e = [],
          i = [];
        for (this._root && e.push(new r.a(this._root, this._x0, this._y0, this._x1, this._y1)); (n = e.pop()); ) {
          var u = n.node;
          if (u.length) {
            var a,
              o = n.x0,
              c = n.y0,
              f = n.x1,
              s = n.y1,
              l = (o + f) / 2,
              h = (c + s) / 2;
            (a = u[0]) && e.push(new r.a(a, o, c, l, h)),
              (a = u[1]) && e.push(new r.a(a, l, c, f, h)),
              (a = u[2]) && e.push(new r.a(a, o, h, l, s)),
              (a = u[3]) && e.push(new r.a(a, l, h, f, s));
          }
          i.push(n);
        }
        for (; (n = i.pop()); ) t(n.node, n.x0, n.y0, n.x1, n.y1);
        return this;
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return t[0];
      }
      (n.a = r),
        (n.b = function (t) {
          return arguments.length ? ((this._x = t), this) : this._x;
        });
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return t[1];
      }
      (n.a = r),
        (n.b = function (t) {
          return arguments.length ? ((this._y = t), this) : this._y;
        });
    },
    function (t, n, e) {
      "use strict";
      var r = e(350);
      e.d(n, "a", function () {
        return r.a;
      });
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "a", function () {
        return r;
      });
      var r = [].slice;
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        (this._size = t),
          (this._call = this._error = null),
          (this._tasks = []),
          (this._data = []),
          (this._waiting = this._active = this._ended = this._start = 0);
      }
      function i(t) {
        if (!t._start)
          try {
            u(t);
          } catch (n) {
            if (t._tasks[t._ended + t._active - 1]) o(t, n);
            else if (!t._data) throw n;
          }
      }
      function u(t) {
        for (; (t._start = t._waiting && t._active < t._size); ) {
          var n = t._ended + t._active,
            e = t._tasks[n],
            r = e.length - 1,
            i = e[r];
          (e[r] = a(t, n)), --t._waiting, ++t._active, (e = i.apply(null, e)), t._tasks[n] && (t._tasks[n] = e || l);
        }
      }
      function a(t, n) {
        return function (e, r) {
          t._tasks[n] &&
            (--t._active,
            ++t._ended,
            (t._tasks[n] = null),
            null == t._error && (null != e ? o(t, e) : ((t._data[n] = r), t._waiting ? i(t) : c(t))));
        };
      }
      function o(t, n) {
        var e,
          r = t._tasks.length;
        for (t._error = n, t._data = void 0, t._waiting = NaN; --r >= 0; )
          if ((e = t._tasks[r]) && ((t._tasks[r] = null), e.abort))
            try {
              e.abort();
            } catch (n) {}
        (t._active = NaN), c(t);
      }
      function c(t) {
        if (!t._active && t._call) {
          var n = t._data;
          (t._data = void 0), t._call(t._error, n);
        }
      }
      function f(t) {
        if (null == t) t = 1 / 0;
        else if (!((t = +t) >= 1)) throw new Error("invalid concurrency");
        return new r(t);
      }
      n.a = f;
      var s = e(349),
        l = {};
      r.prototype = f.prototype = {
        constructor: r,
        defer: function (t) {
          if ("function" != typeof t) throw new Error("invalid callback");
          if (this._call) throw new Error("defer after await");
          if (null != this._error) return this;
          var n = s.a.call(arguments, 1);
          return n.push(t), ++this._waiting, this._tasks.push(n), i(this), this;
        },
        abort: function () {
          return null == this._error && o(this, new Error("abort")), this;
        },
        await: function (t) {
          if ("function" != typeof t) throw new Error("invalid callback");
          if (this._call) throw new Error("multiple await");
          return (
            (this._call = function (n, e) {
              t.apply(null, [n].concat(e));
            }),
            c(this),
            this
          );
        },
        awaitAll: function (t) {
          if ("function" != typeof t) throw new Error("invalid callback");
          if (this._call) throw new Error("multiple await");
          return (this._call = t), c(this), this;
        },
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(355);
      e.d(n, "a", function () {
        return r.a;
      });
      var i = e(151);
      e.d(n, "b", function () {
        return i.a;
      });
      var u = e(354);
      e.d(n, "c", function () {
        return u.a;
      });
      var a = e(352);
      e.d(n, "d", function () {
        return a.a;
      });
      var o = e(150);
      e.d(n, "e", function () {
        return o.a;
      });
      var c = e(353);
      e.d(n, "f", function () {
        return c.a;
      });
    },
    function (t, n, e) {
      "use strict";
      var r = e(22),
        i = e(150);
      n.a = (function t(n) {
        function e(t) {
          var e = i.a.source(n)(t);
          return function () {
            return e() / t;
          };
        }
        return (e.source = t), e;
      })(r.a);
    },
    function (t, n, e) {
      "use strict";
      var r = e(22);
      n.a = (function t(n) {
        function e(t) {
          return function () {
            return -Math.log(1 - n()) / t;
          };
        }
        return (e.source = t), e;
      })(r.a);
    },
    function (t, n, e) {
      "use strict";
      var r = e(22),
        i = e(151);
      n.a = (function t(n) {
        function e() {
          var t = i.a.source(n).apply(this, arguments);
          return function () {
            return Math.exp(t());
          };
        }
        return (e.source = t), e;
      })(r.a);
    },
    function (t, n, e) {
      "use strict";
      var r = e(22);
      n.a = (function t(n) {
        function e(t, e) {
          return (
            (t = null == t ? 0 : +t),
            (e = null == e ? 1 : +e),
            1 === arguments.length ? ((e = t), (t = 0)) : (e -= t),
            function () {
              return n() * e + t;
            }
          );
        }
        return (e.source = t), e;
      })(r.a);
    },
    function (t, n, e) {
      "use strict";
      var r = e(78);
      e.d(n, "a", function () {
        return r.a;
      });
      var i = e(358);
      e.d(n, "b", function () {
        return i.a;
      });
      var u = e(359);
      e.d(n, "c", function () {
        return u.a;
      });
      var a = e(360);
      e.d(n, "d", function () {
        return a.a;
      });
      var o = e(362);
      e.d(n, "e", function () {
        return o.a;
      });
      var c = e(357);
      e.d(n, "f", function () {
        return c.a;
      });
      var f = e(361);
      e.d(n, "g", function () {
        return f.a;
      });
    },
    function (t, n, e) {
      "use strict";
      var r = e(61),
        i = e(152);
      n.a = e.i(i.a)("text/csv", r.b);
    },
    function (t, n, e) {
      "use strict";
      var r = e(43);
      n.a = e.i(r.a)("text/html", function (t) {
        return document.createRange().createContextualFragment(t.responseText);
      });
    },
    function (t, n, e) {
      "use strict";
      var r = e(43);
      n.a = e.i(r.a)("application/json", function (t) {
        return JSON.parse(t.responseText);
      });
    },
    function (t, n, e) {
      "use strict";
      var r = e(43);
      n.a = e.i(r.a)("text/plain", function (t) {
        return t.responseText;
      });
    },
    function (t, n, e) {
      "use strict";
      var r = e(61),
        i = e(152);
      n.a = e.i(i.a)("text/tab-separated-values", r.f);
    },
    function (t, n, e) {
      "use strict";
      var r = e(43);
      n.a = e.i(r.a)("application/xml", function (t) {
        var n = t.responseXML;
        if (!n) throw new Error("parse error");
        return n;
      });
    },
    function (t, n, e) {
      "use strict";
      Object.defineProperty(n, "__esModule", { value: !0 });
      var r = e(377);
      e.d(n, "schemeAccent", function () {
        return r.a;
      });
      var i = e(378);
      e.d(n, "schemeDark2", function () {
        return i.a;
      });
      var u = e(379);
      e.d(n, "schemePaired", function () {
        return u.a;
      });
      var a = e(380);
      e.d(n, "schemePastel1", function () {
        return a.a;
      });
      var o = e(381);
      e.d(n, "schemePastel2", function () {
        return o.a;
      });
      var c = e(382);
      e.d(n, "schemeSet1", function () {
        return c.a;
      });
      var f = e(383);
      e.d(n, "schemeSet2", function () {
        return f.a;
      });
      var s = e(384);
      e.d(n, "schemeSet3", function () {
        return s.a;
      });
      var l = e(385);
      e.d(n, "interpolateBrBG", function () {
        return l.a;
      }),
        e.d(n, "schemeBrBG", function () {
          return l.b;
        });
      var h = e(386);
      e.d(n, "interpolatePRGn", function () {
        return h.a;
      }),
        e.d(n, "schemePRGn", function () {
          return h.b;
        });
      var d = e(387);
      e.d(n, "interpolatePiYG", function () {
        return d.a;
      }),
        e.d(n, "schemePiYG", function () {
          return d.b;
        });
      var p = e(388);
      e.d(n, "interpolatePuOr", function () {
        return p.a;
      }),
        e.d(n, "schemePuOr", function () {
          return p.b;
        });
      var v = e(389);
      e.d(n, "interpolateRdBu", function () {
        return v.a;
      }),
        e.d(n, "schemeRdBu", function () {
          return v.b;
        });
      var b = e(390);
      e.d(n, "interpolateRdGy", function () {
        return b.a;
      }),
        e.d(n, "schemeRdGy", function () {
          return b.b;
        });
      var g = e(391);
      e.d(n, "interpolateRdYlBu", function () {
        return g.a;
      }),
        e.d(n, "schemeRdYlBu", function () {
          return g.b;
        });
      var y = e(392);
      e.d(n, "interpolateRdYlGn", function () {
        return y.a;
      }),
        e.d(n, "schemeRdYlGn", function () {
          return y.b;
        });
      var _ = e(393);
      e.d(n, "interpolateSpectral", function () {
        return _.a;
      }),
        e.d(n, "schemeSpectral", function () {
          return _.b;
        });
      var m = e(394);
      e.d(n, "interpolateBuGn", function () {
        return m.a;
      }),
        e.d(n, "schemeBuGn", function () {
          return m.b;
        });
      var x = e(395);
      e.d(n, "interpolateBuPu", function () {
        return x.a;
      }),
        e.d(n, "schemeBuPu", function () {
          return x.b;
        });
      var w = e(396);
      e.d(n, "interpolateGnBu", function () {
        return w.a;
      }),
        e.d(n, "schemeGnBu", function () {
          return w.b;
        });
      var M = e(397);
      e.d(n, "interpolateOrRd", function () {
        return M.a;
      }),
        e.d(n, "schemeOrRd", function () {
          return M.b;
        });
      var k = e(399);
      e.d(n, "interpolatePuBuGn", function () {
        return k.a;
      }),
        e.d(n, "schemePuBuGn", function () {
          return k.b;
        });
      var N = e(398);
      e.d(n, "interpolatePuBu", function () {
        return N.a;
      }),
        e.d(n, "schemePuBu", function () {
          return N.b;
        });
      var A = e(400);
      e.d(n, "interpolatePuRd", function () {
        return A.a;
      }),
        e.d(n, "schemePuRd", function () {
          return A.b;
        });
      var S = e(401);
      e.d(n, "interpolateRdPu", function () {
        return S.a;
      }),
        e.d(n, "schemeRdPu", function () {
          return S.b;
        });
      var T = e(403);
      e.d(n, "interpolateYlGnBu", function () {
        return T.a;
      }),
        e.d(n, "schemeYlGnBu", function () {
          return T.b;
        });
      var E = e(402);
      e.d(n, "interpolateYlGn", function () {
        return E.a;
      }),
        e.d(n, "schemeYlGn", function () {
          return E.b;
        });
      var C = e(404);
      e.d(n, "interpolateYlOrBr", function () {
        return C.a;
      }),
        e.d(n, "schemeYlOrBr", function () {
          return C.b;
        });
      var P = e(405);
      e.d(n, "interpolateYlOrRd", function () {
        return P.a;
      }),
        e.d(n, "schemeYlOrRd", function () {
          return P.b;
        });
      var z = e(406);
      e.d(n, "interpolateBlues", function () {
        return z.a;
      }),
        e.d(n, "schemeBlues", function () {
          return z.b;
        });
      var R = e(407);
      e.d(n, "interpolateGreens", function () {
        return R.a;
      }),
        e.d(n, "schemeGreens", function () {
          return R.b;
        });
      var q = e(408);
      e.d(n, "interpolateGreys", function () {
        return q.a;
      }),
        e.d(n, "schemeGreys", function () {
          return q.b;
        });
      var L = e(410);
      e.d(n, "interpolatePurples", function () {
        return L.a;
      }),
        e.d(n, "schemePurples", function () {
          return L.b;
        });
      var O = e(411);
      e.d(n, "interpolateReds", function () {
        return O.a;
      }),
        e.d(n, "schemeReds", function () {
          return O.b;
        });
      var D = e(409);
      e.d(n, "interpolateOranges", function () {
        return D.a;
      }),
        e.d(n, "schemeOranges", function () {
          return D.b;
        });
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        if (t instanceof u) return new u(t.h, t.s, t.l, t.opacity);
        t instanceof o.a || (t = e.i(o.b)(t));
        var n = t.r / 255,
          r = t.g / 255,
          i = t.b / 255,
          a = (b * i + p * n - v * r) / (b + p - v),
          f = i - a,
          s = (d * (r - a) - l * f) / h,
          g = Math.sqrt(s * s + f * f) / (d * a * (1 - a)),
          y = g ? Math.atan2(s, f) * c.a - 120 : NaN;
        return new u(y < 0 ? y + 360 : y, g, a, t.opacity);
      }
      function i(t, n, e, i) {
        return 1 === arguments.length ? r(t) : new u(t, n, e, null == i ? 1 : i);
      }
      function u(t, n, e, r) {
        (this.h = +t), (this.s = +n), (this.l = +e), (this.opacity = +r);
      }
      n.a = i;
      var a = e(80),
        o = e(79),
        c = e(153),
        f = -0.14861,
        s = 1.78277,
        l = -0.29227,
        h = -0.90649,
        d = 1.97294,
        p = d * h,
        v = d * s,
        b = s * l - h * f;
      e.i(a.a)(
        u,
        i,
        e.i(a.b)(o.c, {
          brighter: function (t) {
            return (t = null == t ? o.d : Math.pow(o.d, t)), new u(this.h, this.s, this.l * t, this.opacity);
          },
          darker: function (t) {
            return (t = null == t ? o.e : Math.pow(o.e, t)), new u(this.h, this.s, this.l * t, this.opacity);
          },
          rgb: function () {
            var t = isNaN(this.h) ? 0 : (this.h + 120) * c.b,
              n = +this.l,
              e = isNaN(this.s) ? 0 : this.s * n * (1 - n),
              r = Math.cos(t),
              i = Math.sin(t);
            return new o.a(
              255 * (n + e * (f * r + s * i)),
              255 * (n + e * (l * r + h * i)),
              255 * (n + e * (d * r)),
              this.opacity
            );
          },
        })
      );
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        if (t instanceof u) return new u(t.l, t.a, t.b, t.opacity);
        if (t instanceof h) {
          var n = t.h * v.b;
          return new u(t.l, Math.cos(n) * t.c, Math.sin(n) * t.c, t.opacity);
        }
        t instanceof p.a || (t = e.i(p.b)(t));
        var r = f(t.r),
          i = f(t.g),
          o = f(t.b),
          c = a((0.4124564 * r + 0.3575761 * i + 0.1804375 * o) / b),
          s = a((0.2126729 * r + 0.7151522 * i + 0.072175 * o) / g);
        return new u(
          116 * s - 16,
          500 * (c - s),
          200 * (s - a((0.0193339 * r + 0.119192 * i + 0.9503041 * o) / y)),
          t.opacity
        );
      }
      function i(t, n, e, i) {
        return 1 === arguments.length ? r(t) : new u(t, n, e, null == i ? 1 : i);
      }
      function u(t, n, e, r) {
        (this.l = +t), (this.a = +n), (this.b = +e), (this.opacity = +r);
      }
      function a(t) {
        return t > w ? Math.pow(t, 1 / 3) : t / x + _;
      }
      function o(t) {
        return t > m ? t * t * t : x * (t - _);
      }
      function c(t) {
        return 255 * (t <= 0.0031308 ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - 0.055);
      }
      function f(t) {
        return (t /= 255) <= 0.04045 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4);
      }
      function s(t) {
        if (t instanceof h) return new h(t.h, t.c, t.l, t.opacity);
        t instanceof u || (t = r(t));
        var n = Math.atan2(t.b, t.a) * v.a;
        return new h(n < 0 ? n + 360 : n, Math.sqrt(t.a * t.a + t.b * t.b), t.l, t.opacity);
      }
      function l(t, n, e, r) {
        return 1 === arguments.length ? s(t) : new h(t, n, e, null == r ? 1 : r);
      }
      function h(t, n, e, r) {
        (this.h = +t), (this.c = +n), (this.l = +e), (this.opacity = +r);
      }
      (n.b = i), (n.a = l);
      var d = e(80),
        p = e(79),
        v = e(153),
        b = 0.95047,
        g = 1,
        y = 1.08883,
        _ = 4 / 29,
        m = 6 / 29,
        x = 3 * m * m,
        w = m * m * m;
      e.i(d.a)(
        u,
        i,
        e.i(d.b)(p.c, {
          brighter: function (t) {
            return new u(this.l + 18 * (null == t ? 1 : t), this.a, this.b, this.opacity);
          },
          darker: function (t) {
            return new u(this.l - 18 * (null == t ? 1 : t), this.a, this.b, this.opacity);
          },
          rgb: function () {
            var t = (this.l + 16) / 116,
              n = isNaN(this.a) ? t : t + this.a / 500,
              e = isNaN(this.b) ? t : t - this.b / 200;
            return (
              (t = g * o(t)),
              (n = b * o(n)),
              (e = y * o(e)),
              new p.a(
                c(3.2404542 * n - 1.5371385 * t - 0.4985314 * e),
                c(-0.969266 * n + 1.8760108 * t + 0.041556 * e),
                c(0.0556434 * n - 0.2040259 * t + 1.0572252 * e),
                this.opacity
              )
            );
          },
        })
      ),
        e.i(d.a)(
          h,
          l,
          e.i(d.b)(p.c, {
            brighter: function (t) {
              return new h(this.h, this.c, this.l + 18 * (null == t ? 1 : t), this.opacity);
            },
            darker: function (t) {
              return new h(this.h, this.c, this.l - 18 * (null == t ? 1 : t), this.opacity);
            },
            rgb: function () {
              return r(this).rgb();
            },
          })
        );
    },
    function (t, n, e) {
      "use strict";
      var r = (e(82), e(154), e(81), e(155), e(157), e(44), e(158), e(372), e(160), e(374), e(376), e(159));
      e.d(n, "a", function () {
        return r.a;
      });
      e(369), e(370), e(368), e(367), e(371);
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return (function n(r) {
          function a(n, a) {
            var o = t((n = e.i(i.a)(n)).h, (a = e.i(i.a)(a)).h),
              c = e.i(u.a)(n.s, a.s),
              f = e.i(u.a)(n.l, a.l),
              s = e.i(u.a)(n.opacity, a.opacity);
            return function (t) {
              return (n.h = o(t)), (n.s = c(t)), (n.l = f(Math.pow(t, r))), (n.opacity = s(t)), n + "";
            };
          }
          return (r = +r), (a.gamma = n), a;
        })(1);
      }
      var i = e(23),
        u = e(30);
      r(u.b), r(u.a);
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return function (n, r) {
          var a = t((n = e.i(i.b)(n)).h, (r = e.i(i.b)(r)).h),
            o = e.i(u.a)(n.c, r.c),
            c = e.i(u.a)(n.l, r.l),
            f = e.i(u.a)(n.opacity, r.opacity);
          return function (t) {
            return (n.h = a(t)), (n.c = o(t)), (n.l = c(t)), (n.opacity = f(t)), n + "";
          };
        };
      }
      var i = e(23),
        u = e(30);
      r(u.b), r(u.a);
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return function (n, r) {
          var a = t((n = e.i(i.d)(n)).h, (r = e.i(i.d)(r)).h),
            o = e.i(u.a)(n.s, r.s),
            c = e.i(u.a)(n.l, r.l),
            f = e.i(u.a)(n.opacity, r.opacity);
          return function (t) {
            return (n.h = a(t)), (n.s = o(t)), (n.l = c(t)), (n.opacity = f(t)), n + "";
          };
        };
      }
      var i = e(23),
        u = e(30);
      r(u.b), r(u.a);
    },
    function (t, n, e) {
      "use strict";
      e(23), e(30);
    },
    function (t, n, e) {
      "use strict";
    },
    function (t, n, e) {
      "use strict";
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "a", function () {
        return i;
      });
      var r = 180 / Math.PI,
        i = { translateX: 0, translateY: 0, rotate: 0, skewX: 0, scaleX: 1, scaleY: 1 };
      n.b = function (t, n, e, i, u, a) {
        var o, c, f;
        return (
          (o = Math.sqrt(t * t + n * n)) && ((t /= o), (n /= o)),
          (f = t * e + n * i) && ((e -= t * f), (i -= n * f)),
          (c = Math.sqrt(e * e + i * i)) && ((e /= c), (i /= c), (f /= c)),
          t * i < n * e && ((t = -t), (n = -n), (f = -f), (o = -o)),
          { translateX: u, translateY: a, rotate: Math.atan2(n, t) * r, skewX: Math.atan(f) * r, scaleX: o, scaleY: c }
        );
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t, n, r, u) {
        function a(t) {
          return t.length ? t.pop() + " " : "";
        }
        function o(t, u, a, o, c, f) {
          if (t !== a || u !== o) {
            var s = c.push("translate(", null, n, null, r);
            f.push({ i: s - 4, x: e.i(i.a)(t, a) }, { i: s - 2, x: e.i(i.a)(u, o) });
          } else (a || o) && c.push("translate(" + a + n + o + r);
        }
        function c(t, n, r, o) {
          t !== n
            ? (t - n > 180 ? (n += 360) : n - t > 180 && (t += 360),
              o.push({ i: r.push(a(r) + "rotate(", null, u) - 2, x: e.i(i.a)(t, n) }))
            : n && r.push(a(r) + "rotate(" + n + u);
        }
        function f(t, n, r, o) {
          t !== n
            ? o.push({ i: r.push(a(r) + "skewX(", null, u) - 2, x: e.i(i.a)(t, n) })
            : n && r.push(a(r) + "skewX(" + n + u);
        }
        function s(t, n, r, u, o, c) {
          if (t !== r || n !== u) {
            var f = o.push(a(o) + "scale(", null, ",", null, ")");
            c.push({ i: f - 4, x: e.i(i.a)(t, r) }, { i: f - 2, x: e.i(i.a)(n, u) });
          } else (1 === r && 1 === u) || o.push(a(o) + "scale(" + r + "," + u + ")");
        }
        return function (n, e) {
          var r = [],
            i = [];
          return (
            (n = t(n)),
            (e = t(e)),
            o(n.translateX, n.translateY, e.translateX, e.translateY, r, i),
            c(n.rotate, e.rotate, r, i),
            f(n.skewX, e.skewX, r, i),
            s(n.scaleX, n.scaleY, e.scaleX, e.scaleY, r, i),
            (n = e = null),
            function (t) {
              for (var n, e = -1, u = i.length; ++e < u; ) r[(n = i[e]).i] = n.x(t);
              return r.join("");
            }
          );
        };
      }
      var i = e(44),
        u = e(375);
      r(u.a, "px, ", "px)", "deg)"), r(u.b, ", ", ")", ")");
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return "none" === t
          ? f.a
          : (u || ((u = document.createElement("DIV")), (a = document.documentElement), (o = document.defaultView)),
            (u.style.transform = t),
            (t = o.getComputedStyle(a.appendChild(u), null).getPropertyValue("transform")),
            a.removeChild(u),
            (t = t.slice(7, -1).split(",")),
            e.i(f.b)(+t[0], +t[1], +t[2], +t[3], +t[4], +t[5]));
      }
      function i(t) {
        return null == t
          ? f.a
          : (c || (c = document.createElementNS("http://www.w3.org/2000/svg", "g")),
            c.setAttribute("transform", t),
            (t = c.transform.baseVal.consolidate()) ? ((t = t.matrix), e.i(f.b)(t.a, t.b, t.c, t.d, t.e, t.f)) : f.a);
      }
      (n.a = r), (n.b = i);
      var u,
        a,
        o,
        c,
        f = e(373);
    },
    function (t, n, e) {
      "use strict";
      Math.SQRT2;
    },
    function (t, n, e) {
      "use strict";
      var r = e(1);
      n.a = e.i(r.a)("7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666");
    },
    function (t, n, e) {
      "use strict";
      var r = e(1);
      n.a = e.i(r.a)("1b9e77d95f027570b3e7298a66a61ee6ab02a6761d666666");
    },
    function (t, n, e) {
      "use strict";
      var r = e(1);
      n.a = e.i(r.a)("a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928");
    },
    function (t, n, e) {
      "use strict";
      var r = e(1);
      n.a = e.i(r.a)("fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bdfddaecf2f2f2");
    },
    function (t, n, e) {
      "use strict";
      var r = e(1);
      n.a = e.i(r.a)("b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2aef1e2cccccccc");
    },
    function (t, n, e) {
      "use strict";
      var r = e(1);
      n.a = e.i(r.a)("e41a1c377eb84daf4a984ea3ff7f00ffff33a65628f781bf999999");
    },
    function (t, n, e) {
      "use strict";
      var r = e(1);
      n.a = e.i(r.a)("66c2a5fc8d628da0cbe78ac3a6d854ffd92fe5c494b3b3b3");
    },
    function (t, n, e) {
      "use strict";
      var r = e(1);
      n.a = e.i(r.a)("8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f");
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return u;
      });
      var r = e(1),
        i = e(2),
        u = new Array(3)
          .concat(
            "d8b365f5f5f55ab4ac",
            "a6611adfc27d80cdc1018571",
            "a6611adfc27df5f5f580cdc1018571",
            "8c510ad8b365f6e8c3c7eae55ab4ac01665e",
            "8c510ad8b365f6e8c3f5f5f5c7eae55ab4ac01665e",
            "8c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e",
            "8c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e",
            "5430058c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e003c30",
            "5430058c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e003c30"
          )
          .map(r.a);
      n.a = e.i(i.a)(u);
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return u;
      });
      var r = e(1),
        i = e(2),
        u = new Array(3)
          .concat(
            "af8dc3f7f7f77fbf7b",
            "7b3294c2a5cfa6dba0008837",
            "7b3294c2a5cff7f7f7a6dba0008837",
            "762a83af8dc3e7d4e8d9f0d37fbf7b1b7837",
            "762a83af8dc3e7d4e8f7f7f7d9f0d37fbf7b1b7837",
            "762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b7837",
            "762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b7837",
            "40004b762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b783700441b",
            "40004b762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b783700441b"
          )
          .map(r.a);
      n.a = e.i(i.a)(u);
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return u;
      });
      var r = e(1),
        i = e(2),
        u = new Array(3)
          .concat(
            "e9a3c9f7f7f7a1d76a",
            "d01c8bf1b6dab8e1864dac26",
            "d01c8bf1b6daf7f7f7b8e1864dac26",
            "c51b7de9a3c9fde0efe6f5d0a1d76a4d9221",
            "c51b7de9a3c9fde0eff7f7f7e6f5d0a1d76a4d9221",
            "c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221",
            "c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221",
            "8e0152c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221276419",
            "8e0152c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221276419"
          )
          .map(r.a);
      n.a = e.i(i.a)(u);
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return u;
      });
      var r = e(1),
        i = e(2),
        u = new Array(3)
          .concat(
            "998ec3f7f7f7f1a340",
            "5e3c99b2abd2fdb863e66101",
            "5e3c99b2abd2f7f7f7fdb863e66101",
            "542788998ec3d8daebfee0b6f1a340b35806",
            "542788998ec3d8daebf7f7f7fee0b6f1a340b35806",
            "5427888073acb2abd2d8daebfee0b6fdb863e08214b35806",
            "5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b35806",
            "2d004b5427888073acb2abd2d8daebfee0b6fdb863e08214b358067f3b08",
            "2d004b5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b358067f3b08"
          )
          .map(r.a);
      n.a = e.i(i.a)(u);
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return u;
      });
      var r = e(1),
        i = e(2),
        u = new Array(3)
          .concat(
            "ef8a62f7f7f767a9cf",
            "ca0020f4a58292c5de0571b0",
            "ca0020f4a582f7f7f792c5de0571b0",
            "b2182bef8a62fddbc7d1e5f067a9cf2166ac",
            "b2182bef8a62fddbc7f7f7f7d1e5f067a9cf2166ac",
            "b2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac",
            "b2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac",
            "67001fb2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac053061",
            "67001fb2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac053061"
          )
          .map(r.a);
      n.a = e.i(i.a)(u);
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return u;
      });
      var r = e(1),
        i = e(2),
        u = new Array(3)
          .concat(
            "ef8a62ffffff999999",
            "ca0020f4a582bababa404040",
            "ca0020f4a582ffffffbababa404040",
            "b2182bef8a62fddbc7e0e0e09999994d4d4d",
            "b2182bef8a62fddbc7ffffffe0e0e09999994d4d4d",
            "b2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d",
            "b2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d",
            "67001fb2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d1a1a1a",
            "67001fb2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d1a1a1a"
          )
          .map(r.a);
      n.a = e.i(i.a)(u);
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return u;
      });
      var r = e(1),
        i = e(2),
        u = new Array(3)
          .concat(
            "fc8d59ffffbf91bfdb",
            "d7191cfdae61abd9e92c7bb6",
            "d7191cfdae61ffffbfabd9e92c7bb6",
            "d73027fc8d59fee090e0f3f891bfdb4575b4",
            "d73027fc8d59fee090ffffbfe0f3f891bfdb4575b4",
            "d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4",
            "d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4",
            "a50026d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4313695",
            "a50026d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4313695"
          )
          .map(r.a);
      n.a = e.i(i.a)(u);
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return u;
      });
      var r = e(1),
        i = e(2),
        u = new Array(3)
          .concat(
            "fc8d59ffffbf91cf60",
            "d7191cfdae61a6d96a1a9641",
            "d7191cfdae61ffffbfa6d96a1a9641",
            "d73027fc8d59fee08bd9ef8b91cf601a9850",
            "d73027fc8d59fee08bffffbfd9ef8b91cf601a9850",
            "d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850",
            "d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850",
            "a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837",
            "a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837"
          )
          .map(r.a);
      n.a = e.i(i.a)(u);
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return u;
      });
      var r = e(1),
        i = e(2),
        u = new Array(3)
          .concat(
            "fc8d59ffffbf99d594",
            "d7191cfdae61abdda42b83ba",
            "d7191cfdae61ffffbfabdda42b83ba",
            "d53e4ffc8d59fee08be6f59899d5943288bd",
            "d53e4ffc8d59fee08bffffbfe6f59899d5943288bd",
            "d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd",
            "d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd",
            "9e0142d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd5e4fa2",
            "9e0142d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd5e4fa2"
          )
          .map(r.a);
      n.a = e.i(i.a)(u);
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return u;
      });
      var r = e(1),
        i = e(2),
        u = new Array(3)
          .concat(
            "e5f5f999d8c92ca25f",
            "edf8fbb2e2e266c2a4238b45",
            "edf8fbb2e2e266c2a42ca25f006d2c",
            "edf8fbccece699d8c966c2a42ca25f006d2c",
            "edf8fbccece699d8c966c2a441ae76238b45005824",
            "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45005824",
            "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45006d2c00441b"
          )
          .map(r.a);
      n.a = e.i(i.a)(u);
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return u;
      });
      var r = e(1),
        i = e(2),
        u = new Array(3)
          .concat(
            "e0ecf49ebcda8856a7",
            "edf8fbb3cde38c96c688419d",
            "edf8fbb3cde38c96c68856a7810f7c",
            "edf8fbbfd3e69ebcda8c96c68856a7810f7c",
            "edf8fbbfd3e69ebcda8c96c68c6bb188419d6e016b",
            "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d6e016b",
            "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d810f7c4d004b"
          )
          .map(r.a);
      n.a = e.i(i.a)(u);
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return u;
      });
      var r = e(1),
        i = e(2),
        u = new Array(3)
          .concat(
            "e0f3dba8ddb543a2ca",
            "f0f9e8bae4bc7bccc42b8cbe",
            "f0f9e8bae4bc7bccc443a2ca0868ac",
            "f0f9e8ccebc5a8ddb57bccc443a2ca0868ac",
            "f0f9e8ccebc5a8ddb57bccc44eb3d32b8cbe08589e",
            "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe08589e",
            "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe0868ac084081"
          )
          .map(r.a);
      n.a = e.i(i.a)(u);
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return u;
      });
      var r = e(1),
        i = e(2),
        u = new Array(3)
          .concat(
            "fee8c8fdbb84e34a33",
            "fef0d9fdcc8afc8d59d7301f",
            "fef0d9fdcc8afc8d59e34a33b30000",
            "fef0d9fdd49efdbb84fc8d59e34a33b30000",
            "fef0d9fdd49efdbb84fc8d59ef6548d7301f990000",
            "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301f990000",
            "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301fb300007f0000"
          )
          .map(r.a);
      n.a = e.i(i.a)(u);
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return u;
      });
      var r = e(1),
        i = e(2),
        u = new Array(3)
          .concat(
            "ece7f2a6bddb2b8cbe",
            "f1eef6bdc9e174a9cf0570b0",
            "f1eef6bdc9e174a9cf2b8cbe045a8d",
            "f1eef6d0d1e6a6bddb74a9cf2b8cbe045a8d",
            "f1eef6d0d1e6a6bddb74a9cf3690c00570b0034e7b",
            "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0034e7b",
            "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0045a8d023858"
          )
          .map(r.a);
      n.a = e.i(i.a)(u);
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return u;
      });
      var r = e(1),
        i = e(2),
        u = new Array(3)
          .concat(
            "ece2f0a6bddb1c9099",
            "f6eff7bdc9e167a9cf02818a",
            "f6eff7bdc9e167a9cf1c9099016c59",
            "f6eff7d0d1e6a6bddb67a9cf1c9099016c59",
            "f6eff7d0d1e6a6bddb67a9cf3690c002818a016450",
            "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016450",
            "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016c59014636"
          )
          .map(r.a);
      n.a = e.i(i.a)(u);
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return u;
      });
      var r = e(1),
        i = e(2),
        u = new Array(3)
          .concat(
            "e7e1efc994c7dd1c77",
            "f1eef6d7b5d8df65b0ce1256",
            "f1eef6d7b5d8df65b0dd1c77980043",
            "f1eef6d4b9dac994c7df65b0dd1c77980043",
            "f1eef6d4b9dac994c7df65b0e7298ace125691003f",
            "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125691003f",
            "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125698004367001f"
          )
          .map(r.a);
      n.a = e.i(i.a)(u);
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return u;
      });
      var r = e(1),
        i = e(2),
        u = new Array(3)
          .concat(
            "fde0ddfa9fb5c51b8a",
            "feebe2fbb4b9f768a1ae017e",
            "feebe2fbb4b9f768a1c51b8a7a0177",
            "feebe2fcc5c0fa9fb5f768a1c51b8a7a0177",
            "feebe2fcc5c0fa9fb5f768a1dd3497ae017e7a0177",
            "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a0177",
            "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a017749006a"
          )
          .map(r.a);
      n.a = e.i(i.a)(u);
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return u;
      });
      var r = e(1),
        i = e(2),
        u = new Array(3)
          .concat(
            "f7fcb9addd8e31a354",
            "ffffccc2e69978c679238443",
            "ffffccc2e69978c67931a354006837",
            "ffffccd9f0a3addd8e78c67931a354006837",
            "ffffccd9f0a3addd8e78c67941ab5d238443005a32",
            "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443005a32",
            "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443006837004529"
          )
          .map(r.a);
      n.a = e.i(i.a)(u);
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return u;
      });
      var r = e(1),
        i = e(2),
        u = new Array(3)
          .concat(
            "edf8b17fcdbb2c7fb8",
            "ffffcca1dab441b6c4225ea8",
            "ffffcca1dab441b6c42c7fb8253494",
            "ffffccc7e9b47fcdbb41b6c42c7fb8253494",
            "ffffccc7e9b47fcdbb41b6c41d91c0225ea80c2c84",
            "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea80c2c84",
            "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea8253494081d58"
          )
          .map(r.a);
      n.a = e.i(i.a)(u);
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return u;
      });
      var r = e(1),
        i = e(2),
        u = new Array(3)
          .concat(
            "fff7bcfec44fd95f0e",
            "ffffd4fed98efe9929cc4c02",
            "ffffd4fed98efe9929d95f0e993404",
            "ffffd4fee391fec44ffe9929d95f0e993404",
            "ffffd4fee391fec44ffe9929ec7014cc4c028c2d04",
            "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c028c2d04",
            "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c02993404662506"
          )
          .map(r.a);
      n.a = e.i(i.a)(u);
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return u;
      });
      var r = e(1),
        i = e(2),
        u = new Array(3)
          .concat(
            "ffeda0feb24cf03b20",
            "ffffb2fecc5cfd8d3ce31a1c",
            "ffffb2fecc5cfd8d3cf03b20bd0026",
            "ffffb2fed976feb24cfd8d3cf03b20bd0026",
            "ffffb2fed976feb24cfd8d3cfc4e2ae31a1cb10026",
            "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cb10026",
            "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cbd0026800026"
          )
          .map(r.a);
      n.a = e.i(i.a)(u);
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return u;
      });
      var r = e(1),
        i = e(2),
        u = new Array(3)
          .concat(
            "deebf79ecae13182bd",
            "eff3ffbdd7e76baed62171b5",
            "eff3ffbdd7e76baed63182bd08519c",
            "eff3ffc6dbef9ecae16baed63182bd08519c",
            "eff3ffc6dbef9ecae16baed64292c62171b5084594",
            "f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594",
            "f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b"
          )
          .map(r.a);
      n.a = e.i(i.a)(u);
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return u;
      });
      var r = e(1),
        i = e(2),
        u = new Array(3)
          .concat(
            "e5f5e0a1d99b31a354",
            "edf8e9bae4b374c476238b45",
            "edf8e9bae4b374c47631a354006d2c",
            "edf8e9c7e9c0a1d99b74c47631a354006d2c",
            "edf8e9c7e9c0a1d99b74c47641ab5d238b45005a32",
            "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45005a32",
            "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45006d2c00441b"
          )
          .map(r.a);
      n.a = e.i(i.a)(u);
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return u;
      });
      var r = e(1),
        i = e(2),
        u = new Array(3)
          .concat(
            "f0f0f0bdbdbd636363",
            "f7f7f7cccccc969696525252",
            "f7f7f7cccccc969696636363252525",
            "f7f7f7d9d9d9bdbdbd969696636363252525",
            "f7f7f7d9d9d9bdbdbd969696737373525252252525",
            "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525",
            "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525000000"
          )
          .map(r.a);
      n.a = e.i(i.a)(u);
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return u;
      });
      var r = e(1),
        i = e(2),
        u = new Array(3)
          .concat(
            "fee6cefdae6be6550d",
            "feeddefdbe85fd8d3cd94701",
            "feeddefdbe85fd8d3ce6550da63603",
            "feeddefdd0a2fdae6bfd8d3ce6550da63603",
            "feeddefdd0a2fdae6bfd8d3cf16913d948018c2d04",
            "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d948018c2d04",
            "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d94801a636037f2704"
          )
          .map(r.a);
      n.a = e.i(i.a)(u);
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return u;
      });
      var r = e(1),
        i = e(2),
        u = new Array(3)
          .concat(
            "efedf5bcbddc756bb1",
            "f2f0f7cbc9e29e9ac86a51a3",
            "f2f0f7cbc9e29e9ac8756bb154278f",
            "f2f0f7dadaebbcbddc9e9ac8756bb154278f",
            "f2f0f7dadaebbcbddc9e9ac8807dba6a51a34a1486",
            "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a34a1486",
            "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a354278f3f007d"
          )
          .map(r.a);
      n.a = e.i(i.a)(u);
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return u;
      });
      var r = e(1),
        i = e(2),
        u = new Array(3)
          .concat(
            "fee0d2fc9272de2d26",
            "fee5d9fcae91fb6a4acb181d",
            "fee5d9fcae91fb6a4ade2d26a50f15",
            "fee5d9fcbba1fc9272fb6a4ade2d26a50f15",
            "fee5d9fcbba1fc9272fb6a4aef3b2ccb181d99000d",
            "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181d99000d",
            "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181da50f1567000d"
          )
          .map(r.a);
      n.a = e.i(i.a)(u);
    },
    function (t, n, e) {
      "use strict";
      var r = e(413);
      e.d(n, "a", function () {
        return r.a;
      }),
        e.d(n, "b", function () {
          return r.b;
        });
      var i = e(419);
      e.d(n, "c", function () {
        return i.a;
      });
      var u = e(32);
      e.d(n, "d", function () {
        return u.a;
      });
      var a = e(420);
      e.d(n, "e", function () {
        return a.a;
      });
      var o = e(163);
      e.d(n, "f", function () {
        return o.a;
      }),
        e.d(n, "g", function () {
          return o.b;
        });
      var c = e(421);
      e.d(n, "h", function () {
        return c.a;
      }),
        e.d(n, "i", function () {
          return c.b;
        });
      var f = e(422);
      e.d(n, "j", function () {
        return f.a;
      });
      var s = e(423);
      e.d(n, "k", function () {
        return s.a;
      });
      var l = e(426);
      e.d(n, "l", function () {
        return l.a;
      });
      var h = e(164);
      e.d(n, "m", function () {
        return h.a;
      });
      var d = e(428);
      e.d(n, "n", function () {
        return d.a;
      });
      var p = e(414);
      e.d(n, "o", function () {
        return p.a;
      });
      var v = e(416);
      e.d(n, "p", function () {
        return v.a;
      });
      var b = e(417);
      e.d(n, "q", function () {
        return b.a;
      });
      var g = e(415);
      e.d(n, "r", function () {
        return g.a;
      });
      var y = e(418);
      e.d(n, "s", function () {
        return y.a;
      });
      var _ = e(424);
      e.d(n, "t", function () {
        return _.a;
      }),
        e.d(n, "u", function () {
          return _.b;
        }),
        e.d(n, "v", function () {
          return _.c;
        });
      var m = e(429);
      e.d(n, "w", function () {
        return m.a;
      }),
        e.d(n, "x", function () {
          return m.b;
        }),
        e.d(n, "y", function () {
          return m.c;
        }),
        e.d(n, "z", function () {
          return m.d;
        });
      var x = e(425);
      e.d(n, "A", function () {
        return x.a;
      });
    },
    function (t, n, e) {
      "use strict";
      function r() {
        function t() {
          var t = c().length,
            r = s[1] < s[0],
            u = s[r - 0],
            o = s[1 - r];
          (n = (o - u) / Math.max(1, t - h + 2 * d)),
            l && (n = Math.floor(n)),
            (u += (o - u - n * (t - h)) * p),
            (i = n * (1 - h)),
            l && ((u = Math.round(u)), (i = Math.round(i)));
          var v = e
            .i(a.v)(t)
            .map(function (t) {
              return u + n * t;
            });
          return f(r ? v.reverse() : v);
        }
        var n,
          i,
          u = e
            .i(o.a)()
            .unknown(void 0),
          c = u.domain,
          f = u.range,
          s = [0, 1],
          l = !1,
          h = 0,
          d = 0,
          p = 0.5;
        return (
          delete u.unknown,
          (u.domain = function (n) {
            return arguments.length ? (c(n), t()) : c();
          }),
          (u.range = function (n) {
            return arguments.length ? ((s = [+n[0], +n[1]]), t()) : s.slice();
          }),
          (u.rangeRound = function (n) {
            return (s = [+n[0], +n[1]]), (l = !0), t();
          }),
          (u.bandwidth = function () {
            return i;
          }),
          (u.step = function () {
            return n;
          }),
          (u.round = function (n) {
            return arguments.length ? ((l = !!n), t()) : l;
          }),
          (u.padding = function (n) {
            return arguments.length ? ((h = d = Math.max(0, Math.min(1, n))), t()) : h;
          }),
          (u.paddingInner = function (n) {
            return arguments.length ? ((h = Math.max(0, Math.min(1, n))), t()) : h;
          }),
          (u.paddingOuter = function (n) {
            return arguments.length ? ((d = Math.max(0, Math.min(1, n))), t()) : d;
          }),
          (u.align = function (n) {
            return arguments.length ? ((p = Math.max(0, Math.min(1, n))), t()) : p;
          }),
          (u.copy = function () {
            return r().domain(c()).range(s).round(l).paddingInner(h).paddingOuter(d).align(p);
          }),
          t()
        );
      }
      function i(t) {
        var n = t.copy;
        return (
          (t.padding = t.paddingOuter),
          delete t.paddingInner,
          delete t.paddingOuter,
          (t.copy = function () {
            return i(n());
          }),
          t
        );
      }
      function u() {
        return i(r().paddingInner(1));
      }
      (n.a = r), (n.b = u);
      var a = e(5),
        o = e(163);
    },
    function (t, n, e) {
      "use strict";
      var r = e(31);
      n.a = e.i(r.a)("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf");
    },
    function (t, n, e) {
      "use strict";
      var r = e(31);
      n.a = e.i(r.a)(
        "1f77b4aec7e8ff7f0effbb782ca02c98df8ad62728ff98969467bdc5b0d58c564bc49c94e377c2f7b6d27f7f7fc7c7c7bcbd22dbdb8d17becf9edae5"
      );
    },
    function (t, n, e) {
      "use strict";
      var r = e(31);
      n.a = e.i(r.a)(
        "393b795254a36b6ecf9c9ede6379398ca252b5cf6bcedb9c8c6d31bd9e39e7ba52e7cb94843c39ad494ad6616be7969c7b4173a55194ce6dbdde9ed6"
      );
    },
    function (t, n, e) {
      "use strict";
      var r = e(31);
      n.a = e.i(r.a)(
        "3182bd6baed69ecae1c6dbefe6550dfd8d3cfdae6bfdd0a231a35474c476a1d99bc7e9c0756bb19e9ac8bcbddcdadaeb636363969696bdbdbdd9d9d9"
      );
    },
    function (t, n, e) {
      "use strict";
      var r = e(9),
        i = e(6);
      n.a = e.i(i.v)(e.i(r.f)(300, 0.5, 0), e.i(r.f)(-240, 0.5, 1));
    },
    function (t, n, e) {
      "use strict";
      function r() {
        function t(t) {
          return +t;
        }
        var n = [0, 1];
        return (
          (t.invert = t),
          (t.domain = t.range =
            function (e) {
              return arguments.length ? ((n = i.a.call(e, a.a)), t) : n.slice();
            }),
          (t.copy = function () {
            return r().domain(n);
          }),
          e.i(u.b)(t)
        );
      }
      n.a = r;
      var i = e(17),
        u = e(32),
        a = e(162);
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        return (n = Math.log(n / t))
          ? function (e) {
              return Math.log(e / t) / n;
            }
          : e.i(h.a)(n);
      }
      function i(t, n) {
        return t < 0
          ? function (e) {
              return -Math.pow(-n, e) * Math.pow(-t, 1 - e);
            }
          : function (e) {
              return Math.pow(n, e) * Math.pow(t, 1 - e);
            };
      }
      function u(t) {
        return isFinite(t) ? +("1e" + t) : t < 0 ? 0 : t;
      }
      function a(t) {
        return 10 === t
          ? u
          : t === Math.E
          ? Math.exp
          : function (n) {
              return Math.pow(t, n);
            };
      }
      function o(t) {
        return t === Math.E
          ? Math.log
          : (10 === t && Math.log10) ||
              (2 === t && Math.log2) ||
              ((t = Math.log(t)),
              function (n) {
                return Math.log(n) / t;
              });
      }
      function c(t) {
        return function (n) {
          return -t(-n);
        };
      }
      function f() {
        function t() {
          return (v = o(h)), (b = a(h)), u()[0] < 0 && ((v = c(v)), (b = c(b))), n;
        }
        var n = e.i(p.a)(r, i).domain([1, 10]),
          u = n.domain,
          h = 10,
          v = o(10),
          b = a(10);
        return (
          (n.base = function (n) {
            return arguments.length ? ((h = +n), t()) : h;
          }),
          (n.domain = function (n) {
            return arguments.length ? (u(n), t()) : u();
          }),
          (n.ticks = function (t) {
            var n,
              r = u(),
              i = r[0],
              a = r[r.length - 1];
            (n = a < i) && ((l = i), (i = a), (a = l));
            var o,
              c,
              f,
              l = v(i),
              d = v(a),
              p = null == t ? 10 : +t,
              g = [];
            if (!(h % 1) && d - l < p) {
              if (((l = Math.round(l) - 1), (d = Math.round(d) + 1), i > 0)) {
                for (; l < d; ++l)
                  for (c = 1, o = b(l); c < h; ++c)
                    if (!((f = o * c) < i)) {
                      if (f > a) break;
                      g.push(f);
                    }
              } else
                for (; l < d; ++l)
                  for (c = h - 1, o = b(l); c >= 1; --c)
                    if (!((f = o * c) < i)) {
                      if (f > a) break;
                      g.push(f);
                    }
            } else
              g = e
                .i(s.z)(l, d, Math.min(d - l, p))
                .map(b);
            return n ? g.reverse() : g;
          }),
          (n.tickFormat = function (t, r) {
            if ((null == r && (r = 10 === h ? ".0e" : ","), "function" != typeof r && (r = e.i(l.b)(r)), t === 1 / 0))
              return r;
            null == t && (t = 10);
            var i = Math.max(1, (h * t) / n.ticks().length);
            return function (t) {
              var n = t / b(Math.round(v(t)));
              return n * h < h - 0.5 && (n *= h), n <= i ? r(t) : "";
            };
          }),
          (n.nice = function () {
            return u(
              e.i(d.a)(u(), {
                floor: function (t) {
                  return b(Math.floor(v(t)));
                },
                ceil: function (t) {
                  return b(Math.ceil(v(t)));
                },
              })
            );
          }),
          (n.copy = function () {
            return e.i(p.c)(n, f().base(h));
          }),
          n
        );
      }
      n.a = f;
      var s = e(5),
        l = e(64),
        h = e(83),
        d = e(161),
        p = e(45);
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        return t < 0 ? -Math.pow(-t, n) : Math.pow(t, n);
      }
      function i() {
        function t(t, n) {
          return (n = r(n, u) - (t = r(t, u)))
            ? function (e) {
                return (r(e, u) - t) / n;
              }
            : e.i(a.a)(n);
        }
        function n(t, n) {
          return (
            (n = r(n, u) - (t = r(t, u))),
            function (e) {
              return r(t + n * e, 1 / u);
            }
          );
        }
        var u = 1,
          f = e.i(c.a)(t, n),
          s = f.domain;
        return (
          (f.exponent = function (t) {
            return arguments.length ? ((u = +t), s(s())) : u;
          }),
          (f.copy = function () {
            return e.i(c.c)(f, i().exponent(u));
          }),
          e.i(o.b)(f)
        );
      }
      function u() {
        return i().exponent(0.5);
      }
      (n.a = i), (n.b = u);
      var a = e(83),
        o = e(32),
        c = e(45);
    },
    function (t, n, e) {
      "use strict";
      function r() {
        function t() {
          var t = 0,
            r = Math.max(1, o.length);
          for (c = new Array(r - 1); ++t < r; ) c[t - 1] = e.i(i.u)(a, t / r);
          return n;
        }
        function n(t) {
          if (!isNaN((t = +t))) return o[e.i(i.a)(c, t)];
        }
        var a = [],
          o = [],
          c = [];
        return (
          (n.invertExtent = function (t) {
            var n = o.indexOf(t);
            return n < 0 ? [NaN, NaN] : [n > 0 ? c[n - 1] : a[0], n < c.length ? c[n] : a[a.length - 1]];
          }),
          (n.domain = function (n) {
            if (!arguments.length) return a.slice();
            a = [];
            for (var e, r = 0, u = n.length; r < u; ++r) null == (e = n[r]) || isNaN((e = +e)) || a.push(e);
            return a.sort(i.d), t();
          }),
          (n.range = function (n) {
            return arguments.length ? ((o = u.b.call(n)), t()) : o.slice();
          }),
          (n.quantiles = function () {
            return c.slice();
          }),
          (n.copy = function () {
            return r().domain(a).range(o);
          }),
          n
        );
      }
      n.a = r;
      var i = e(5),
        u = e(17);
    },
    function (t, n, e) {
      "use strict";
      function r() {
        function t(t) {
          if (t <= t) return l[e.i(i.a)(s, t, 0, f)];
        }
        function n() {
          var n = -1;
          for (s = new Array(f); ++n < f; ) s[n] = ((n + 1) * c - (n - f) * o) / (f + 1);
          return t;
        }
        var o = 0,
          c = 1,
          f = 1,
          s = [0.5],
          l = [0, 1];
        return (
          (t.domain = function (t) {
            return arguments.length ? ((o = +t[0]), (c = +t[1]), n()) : [o, c];
          }),
          (t.range = function (t) {
            return arguments.length ? ((f = (l = u.b.call(t)).length - 1), n()) : l.slice();
          }),
          (t.invertExtent = function (t) {
            var n = l.indexOf(t);
            return n < 0 ? [NaN, NaN] : n < 1 ? [o, s[0]] : n >= f ? [s[f - 1], c] : [s[n - 1], s[n]];
          }),
          (t.copy = function () {
            return r().domain([o, c]).range(l);
          }),
          e.i(a.b)(t)
        );
      }
      n.a = r;
      var i = e(5),
        u = e(17),
        a = e(32);
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return u;
      }),
        e.d(n, "c", function () {
          return a;
        });
      var r = e(9),
        i = e(6),
        u = e.i(i.v)(e.i(r.f)(-100, 0.75, 0.35), e.i(r.f)(80, 1.5, 0.8)),
        a = e.i(i.v)(e.i(r.f)(260, 0.75, 0.35), e.i(r.f)(80, 1.5, 0.8)),
        o = e.i(r.f)();
      n.a = function (t) {
        (t < 0 || t > 1) && (t -= Math.floor(t));
        var n = Math.abs(t - 0.5);
        return (o.h = 360 * t - 100), (o.s = 1.5 - 1.5 * n), (o.l = 0.8 - 0.9 * n), o + "";
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        function n(n) {
          var e = (n - u) / (a - u);
          return t(o ? Math.max(0, Math.min(1, e)) : e);
        }
        var u = 0,
          a = 1,
          o = !1;
        return (
          (n.domain = function (t) {
            return arguments.length ? ((u = +t[0]), (a = +t[1]), n) : [u, a];
          }),
          (n.clamp = function (t) {
            return arguments.length ? ((o = !!t), n) : o;
          }),
          (n.interpolator = function (e) {
            return arguments.length ? ((t = e), n) : t;
          }),
          (n.copy = function () {
            return r(t).domain([u, a]).clamp(o);
          }),
          e.i(i.b)(n)
        );
      }
      n.a = r;
      var i = e(32);
    },
    function (t, n, e) {
      "use strict";
      function r() {
        function t(t) {
          if (t <= t) return a[e.i(i.a)(n, t, 0, o)];
        }
        var n = [0.5],
          a = [0, 1],
          o = 1;
        return (
          (t.domain = function (e) {
            return arguments.length ? ((n = u.b.call(e)), (o = Math.min(n.length, a.length - 1)), t) : n.slice();
          }),
          (t.range = function (e) {
            return arguments.length ? ((a = u.b.call(e)), (o = Math.min(n.length, a.length - 1)), t) : a.slice();
          }),
          (t.invertExtent = function (t) {
            var e = a.indexOf(t);
            return [n[e - 1], n[e]];
          }),
          (t.copy = function () {
            return r().domain(n).range(a);
          }),
          t
        );
      }
      n.a = r;
      var i = e(5),
        u = e(17);
    },
    function (t, n, e) {
      "use strict";
      var r = e(5),
        i = e(64);
      n.a = function (t, n, u) {
        var a,
          o = t[0],
          c = t[t.length - 1],
          f = e.i(r.B)(o, c, null == n ? 10 : n);
        switch (((u = e.i(i.e)(null == u ? ",f" : u)), u.type)) {
          case "s":
            var s = Math.max(Math.abs(o), Math.abs(c));
            return null != u.precision || isNaN((a = e.i(i.g)(f, s))) || (u.precision = a), e.i(i.c)(u, s);
          case "":
          case "e":
          case "g":
          case "p":
          case "r":
            null != u.precision ||
              isNaN((a = e.i(i.h)(f, Math.max(Math.abs(o), Math.abs(c))))) ||
              (u.precision = a - ("e" === u.type));
            break;
          case "f":
          case "%":
            null != u.precision || isNaN((a = e.i(i.f)(f))) || (u.precision = a - 2 * ("%" === u.type));
        }
        return e.i(i.b)(u);
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(164),
        i = e(94),
        u = e(52);
      n.a = function () {
        return e
          .i(r.b)(u._7, u._5, u.P, u.N, u.L, u.J, u.h, u.d, i.d)
          .domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]);
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        var n = t.length;
        return function (e) {
          return t[Math.max(0, Math.min(n - 1, Math.floor(e * n)))];
        };
      }
      e.d(n, "b", function () {
        return u;
      }),
        e.d(n, "c", function () {
          return a;
        }),
        e.d(n, "d", function () {
          return o;
        });
      var i = e(31);
      n.a = r(
        e.i(i.a)(
          "44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725"
        )
      );
      var u = r(
          e.i(i.a)(
            "00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf"
          )
        ),
        a = r(
          e.i(i.a)(
            "00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4"
          )
        ),
        o = r(
          e.i(i.a)(
            "0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"
          )
        );
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t) {
        return function () {
          return t;
        };
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(46),
        i = e(166);
      n.a = function (t) {
        return e.i(i.a)(e.i(r.a)(t).call(document.documentElement));
      };
    },
    function (t, n, e) {
      "use strict";
      function r() {
        return new i();
      }
      function i() {
        this._ = "@" + (++u).toString(36);
      }
      n.a = r;
      var u = 0;
      i.prototype = r.prototype = {
        constructor: i,
        get: function (t) {
          for (var n = this._; !(n in t); ) if (!(t = t.parentNode)) return;
          return t[n];
        },
        set: function (t, n) {
          return (t[this._] = n);
        },
        remove: function (t) {
          return this._ in t && delete t[this._];
        },
        toString: function () {
          return this._;
        },
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(88),
        i = e(47);
      n.a = function (t) {
        var n = e.i(r.a)();
        return n.changedTouches && (n = n.changedTouches[0]), e.i(i.a)(t, n);
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(7);
      n.a = function (t) {
        return "string" == typeof t
          ? new r.b([document.querySelectorAll(t)], [document.documentElement])
          : new r.b([null == t ? [] : t], r.c);
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(46);
      n.a = function (t) {
        var n = "function" == typeof t ? t : e.i(r.a)(t);
        return this.select(function () {
          return this.appendChild(n.apply(this, arguments));
        });
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return function () {
          this.removeAttribute(t);
        };
      }
      function i(t) {
        return function () {
          this.removeAttributeNS(t.space, t.local);
        };
      }
      function u(t, n) {
        return function () {
          this.setAttribute(t, n);
        };
      }
      function a(t, n) {
        return function () {
          this.setAttributeNS(t.space, t.local, n);
        };
      }
      function o(t, n) {
        return function () {
          var e = n.apply(this, arguments);
          null == e ? this.removeAttribute(t) : this.setAttribute(t, e);
        };
      }
      function c(t, n) {
        return function () {
          var e = n.apply(this, arguments);
          null == e ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, e);
        };
      }
      var f = e(84);
      n.a = function (t, n) {
        var s = e.i(f.a)(t);
        if (arguments.length < 2) {
          var l = this.node();
          return s.local ? l.getAttributeNS(s.space, s.local) : l.getAttribute(s);
        }
        return this.each(
          (null == n ? (s.local ? i : r) : "function" == typeof n ? (s.local ? c : o) : s.local ? a : u)(s, n)
        );
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function () {
        var t = arguments[0];
        return (arguments[0] = this), t.apply(null, arguments), this;
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return t.trim().split(/^|\s+/);
      }
      function i(t) {
        return t.classList || new u(t);
      }
      function u(t) {
        (this._node = t), (this._names = r(t.getAttribute("class") || ""));
      }
      function a(t, n) {
        for (var e = i(t), r = -1, u = n.length; ++r < u; ) e.add(n[r]);
      }
      function o(t, n) {
        for (var e = i(t), r = -1, u = n.length; ++r < u; ) e.remove(n[r]);
      }
      function c(t) {
        return function () {
          a(this, t);
        };
      }
      function f(t) {
        return function () {
          o(this, t);
        };
      }
      function s(t, n) {
        return function () {
          (n.apply(this, arguments) ? a : o)(this, t);
        };
      }
      (u.prototype = {
        add: function (t) {
          this._names.indexOf(t) < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")));
        },
        remove: function (t) {
          var n = this._names.indexOf(t);
          n >= 0 && (this._names.splice(n, 1), this._node.setAttribute("class", this._names.join(" ")));
        },
        contains: function (t) {
          return this._names.indexOf(t) >= 0;
        },
      }),
        (n.a = function (t, n) {
          var e = r(t + "");
          if (arguments.length < 2) {
            for (var u = i(this.node()), a = -1, o = e.length; ++a < o; ) if (!u.contains(e[a])) return !1;
            return !0;
          }
          return this.each(("function" == typeof n ? s : n ? c : f)(e, n));
        });
    },
    function (t, n, e) {
      "use strict";
      function r() {
        return this.parentNode.insertBefore(this.cloneNode(!1), this.nextSibling);
      }
      function i() {
        return this.parentNode.insertBefore(this.cloneNode(!0), this.nextSibling);
      }
      n.a = function (t) {
        return this.select(t ? i : r);
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t, n, e, r, i, u) {
        for (var o, c = 0, f = n.length, s = u.length; c < s; ++c)
          (o = n[c]) ? ((o.__data__ = u[c]), (r[c] = o)) : (e[c] = new a.b(t, u[c]));
        for (; c < f; ++c) (o = n[c]) && (i[c] = o);
      }
      function i(t, n, e, r, i, u, o) {
        var f,
          s,
          l,
          h = {},
          d = n.length,
          p = u.length,
          v = new Array(d);
        for (f = 0; f < d; ++f)
          (s = n[f]) && ((v[f] = l = c + o.call(s, s.__data__, f, n)), l in h ? (i[f] = s) : (h[l] = s));
        for (f = 0; f < p; ++f)
          (l = c + o.call(t, u[f], f, u)),
            (s = h[l]) ? ((r[f] = s), (s.__data__ = u[f]), (h[l] = null)) : (e[f] = new a.b(t, u[f]));
        for (f = 0; f < d; ++f) (s = n[f]) && h[v[f]] === s && (i[f] = s);
      }
      var u = e(7),
        a = e(167),
        o = e(430),
        c = "$";
      n.a = function (t, n) {
        if (!t)
          return (
            (y = new Array(this.size())),
            (p = -1),
            this.each(function (t) {
              y[++p] = t;
            }),
            y
          );
        var a = n ? i : r,
          c = this._parents,
          f = this._groups;
        "function" != typeof t && (t = e.i(o.a)(t));
        for (var s = f.length, l = new Array(s), h = new Array(s), d = new Array(s), p = 0; p < s; ++p) {
          var v = c[p],
            b = f[p],
            g = b.length,
            y = t.call(v, v && v.__data__, p, c),
            _ = y.length,
            m = (h[p] = new Array(_)),
            x = (l[p] = new Array(_));
          a(v, b, m, x, (d[p] = new Array(g)), y, n);
          for (var w, M, k = 0, N = 0; k < _; ++k)
            if ((w = m[k])) {
              for (k >= N && (N = k + 1); !(M = x[N]) && ++N < _; );
              w._next = M || null;
            }
        }
        return (l = new u.b(l, c)), (l._enter = h), (l._exit = d), l;
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t) {
        return arguments.length ? this.property("__data__", t) : this.node().__data__;
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t, n, r) {
        var i = e.i(a.a)(t),
          u = i.CustomEvent;
        "function" == typeof u
          ? (u = new u(n, r))
          : ((u = i.document.createEvent("Event")),
            r ? (u.initEvent(n, r.bubbles, r.cancelable), (u.detail = r.detail)) : u.initEvent(n, !1, !1)),
          t.dispatchEvent(u);
      }
      function i(t, n) {
        return function () {
          return r(this, t, n);
        };
      }
      function u(t, n) {
        return function () {
          return r(this, t, n.apply(this, arguments));
        };
      }
      var a = e(89);
      n.a = function (t, n) {
        return this.each(("function" == typeof n ? u : i)(t, n));
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t) {
        for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
          for (var i, u = n[e], a = 0, o = u.length; a < o; ++a) (i = u[a]) && t.call(i, i.__data__, a, u);
        return this;
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function () {
        return !this.node();
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(168),
        i = e(7);
      n.a = function () {
        return new i.b(this._exit || this._groups.map(r.a), this._parents);
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(7),
        i = e(165);
      n.a = function (t) {
        "function" != typeof t && (t = e.i(i.a)(t));
        for (var n = this._groups, u = n.length, a = new Array(u), o = 0; o < u; ++o)
          for (var c, f = n[o], s = f.length, l = (a[o] = []), h = 0; h < s; ++h)
            (c = f[h]) && t.call(c, c.__data__, h, f) && l.push(c);
        return new r.b(a, this._parents);
      };
    },
    function (t, n, e) {
      "use strict";
      function r() {
        this.innerHTML = "";
      }
      function i(t) {
        return function () {
          this.innerHTML = t;
        };
      }
      function u(t) {
        return function () {
          var n = t.apply(this, arguments);
          this.innerHTML = null == n ? "" : n;
        };
      }
      n.a = function (t) {
        return arguments.length
          ? this.each(null == t ? r : ("function" == typeof t ? u : i)(t))
          : this.node().innerHTML;
      };
    },
    function (t, n, e) {
      "use strict";
      function r() {
        return null;
      }
      var i = e(46),
        u = e(87);
      n.a = function (t, n) {
        var a = "function" == typeof t ? t : e.i(i.a)(t),
          o = null == n ? r : "function" == typeof n ? n : e.i(u.a)(n);
        return this.select(function () {
          return this.insertBefore(a.apply(this, arguments), o.apply(this, arguments) || null);
        });
      };
    },
    function (t, n, e) {
      "use strict";
      function r() {
        this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
      }
      n.a = function () {
        return this.each(r);
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(7);
      n.a = function (t) {
        for (
          var n = this._groups, e = t._groups, i = n.length, u = e.length, a = Math.min(i, u), o = new Array(i), c = 0;
          c < a;
          ++c
        )
          for (var f, s = n[c], l = e[c], h = s.length, d = (o[c] = new Array(h)), p = 0; p < h; ++p)
            (f = s[p] || l[p]) && (d[p] = f);
        for (; c < i; ++c) o[c] = n[c];
        return new r.b(o, this._parents);
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function () {
        for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
          for (var r = t[n], i = 0, u = r.length; i < u; ++i) {
            var a = r[i];
            if (a) return a;
          }
        return null;
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function () {
        var t = new Array(this.size()),
          n = -1;
        return (
          this.each(function () {
            t[++n] = this;
          }),
          t
        );
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function () {
        for (var t = this._groups, n = -1, e = t.length; ++n < e; )
          for (var r, i = t[n], u = i.length - 1, a = i[u]; --u >= 0; )
            (r = i[u]) && (a && a !== r.nextSibling && a.parentNode.insertBefore(r, a), (a = r));
        return this;
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return function () {
          delete this[t];
        };
      }
      function i(t, n) {
        return function () {
          this[t] = n;
        };
      }
      function u(t, n) {
        return function () {
          var e = n.apply(this, arguments);
          null == e ? delete this[t] : (this[t] = e);
        };
      }
      n.a = function (t, n) {
        return arguments.length > 1
          ? this.each((null == n ? r : "function" == typeof n ? u : i)(t, n))
          : this.node()[t];
      };
    },
    function (t, n, e) {
      "use strict";
      function r() {
        this.nextSibling && this.parentNode.appendChild(this);
      }
      n.a = function () {
        return this.each(r);
      };
    },
    function (t, n, e) {
      "use strict";
      function r() {
        var t = this.parentNode;
        t && t.removeChild(this);
      }
      n.a = function () {
        return this.each(r);
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(7),
        i = e(87);
      n.a = function (t) {
        "function" != typeof t && (t = e.i(i.a)(t));
        for (var n = this._groups, u = n.length, a = new Array(u), o = 0; o < u; ++o)
          for (var c, f, s = n[o], l = s.length, h = (a[o] = new Array(l)), d = 0; d < l; ++d)
            (c = s[d]) &&
              (f = t.call(c, c.__data__, d, s)) &&
              ("__data__" in c && (f.__data__ = c.__data__), (h[d] = f));
        return new r.b(a, this._parents);
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(7),
        i = e(170);
      n.a = function (t) {
        "function" != typeof t && (t = e.i(i.a)(t));
        for (var n = this._groups, u = n.length, a = [], o = [], c = 0; c < u; ++c)
          for (var f, s = n[c], l = s.length, h = 0; h < l; ++h)
            (f = s[h]) && (a.push(t.call(f, f.__data__, h, s)), o.push(f));
        return new r.b(a, o);
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function () {
        var t = 0;
        return (
          this.each(function () {
            ++t;
          }),
          t
        );
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
      }
      var i = e(7);
      n.a = function (t) {
        function n(n, e) {
          return n && e ? t(n.__data__, e.__data__) : !n - !e;
        }
        t || (t = r);
        for (var e = this._groups, u = e.length, a = new Array(u), o = 0; o < u; ++o) {
          for (var c, f = e[o], s = f.length, l = (a[o] = new Array(s)), h = 0; h < s; ++h) (c = f[h]) && (l[h] = c);
          l.sort(n);
        }
        return new i.b(a, this._parents).order();
      };
    },
    function (t, n, e) {
      "use strict";
      function r() {
        this.textContent = "";
      }
      function i(t) {
        return function () {
          this.textContent = t;
        };
      }
      function u(t) {
        return function () {
          var n = t.apply(this, arguments);
          this.textContent = null == n ? "" : n;
        };
      }
      n.a = function (t) {
        return arguments.length
          ? this.each(null == t ? r : ("function" == typeof t ? u : i)(t))
          : this.node().textContent;
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(88),
        i = e(47);
      n.a = function (t, n, u) {
        arguments.length < 3 && ((u = n), (n = e.i(r.a)().changedTouches));
        for (var a, o = 0, c = n ? n.length : 0; o < c; ++o) if ((a = n[o]).identifier === u) return e.i(i.a)(t, a);
        return null;
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(88),
        i = e(47);
      n.a = function (t, n) {
        null == n && (n = e.i(r.a)().touches);
        for (var u = 0, a = n ? n.length : 0, o = new Array(a); u < a; ++u) o[u] = e.i(i.a)(t, n[u]);
        return o;
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(465);
      e.d(n, "a", function () {
        return r.a;
      });
      var i = e(171);
      e.d(n, "b", function () {
        return i.a;
      });
      var u = e(91);
      e.d(n, "c", function () {
        return u.a;
      });
      var a = e(486);
      e.d(n, "d", function () {
        return a.a;
      });
      var o = e(466);
      e.d(n, "e", function () {
        return o.a;
      }),
        e.d(n, "f", function () {
          return o.a;
        });
      var c = e(176);
      e.d(n, "g", function () {
        return c.a;
      }),
        e.d(n, "h", function () {
          return c.a;
        });
      var f = e(177);
      e.d(n, "i", function () {
        return f.a;
      });
      var s = e(478);
      e.d(n, "j", function () {
        return s.a;
      }),
        e.d(n, "k", function () {
          return s.b;
        }),
        e.d(n, "l", function () {
          return s.c;
        });
      var l = e(488);
      e.d(n, "m", function () {
        return l.a;
      }),
        e.d(n, "n", function () {
          return l.b;
        });
      var h = e(178);
      e.d(n, "o", function () {
        return h.a;
      });
      var d = e(179);
      e.d(n, "p", function () {
        return d.a;
      });
      var p = e(180);
      e.d(n, "q", function () {
        return p.a;
      });
      var v = e(181);
      e.d(n, "r", function () {
        return v.a;
      });
      var b = e(182);
      e.d(n, "s", function () {
        return b.a;
      });
      var g = e(183);
      e.d(n, "t", function () {
        return g.a;
      });
      var y = e(184);
      e.d(n, "u", function () {
        return y.a;
      });
      var _ = e(467);
      e.d(n, "v", function () {
        return _.a;
      });
      var m = e(468);
      e.d(n, "w", function () {
        return m.a;
      });
      var x = e(48);
      e.d(n, "x", function () {
        return x.a;
      });
      var w = e(469);
      e.d(n, "y", function () {
        return w.a;
      });
      var M = e(173);
      e.d(n, "z", function () {
        return M.a;
      });
      var k = e(174);
      e.d(n, "A", function () {
        return k.a;
      });
      var N = e(49);
      e.d(n, "B", function () {
        return N.a;
      });
      var A = e(470);
      e.d(n, "C", function () {
        return A.a;
      });
      var S = e(471);
      e.d(n, "D", function () {
        return S.a;
      });
      var T = e(90);
      e.d(n, "E", function () {
        return T.a;
      });
      var E = e(472);
      e.d(n, "F", function () {
        return E.a;
      });
      var C = e(50);
      e.d(n, "G", function () {
        return C.a;
      });
      var P = e(473);
      e.d(n, "H", function () {
        return P.a;
      }),
        e.d(n, "I", function () {
          return P.b;
        });
      var z = e(474);
      e.d(n, "J", function () {
        return z.a;
      });
      var R = e(475);
      e.d(n, "K", function () {
        return R.a;
      }),
        e.d(n, "L", function () {
          return R.b;
        }),
        e.d(n, "M", function () {
          return R.c;
        });
      var q = e(487);
      e.d(n, "N", function () {
        return q.a;
      });
      var L = e(480);
      e.d(n, "O", function () {
        return L.a;
      });
      var O = e(479);
      e.d(n, "P", function () {
        return O.a;
      });
      var D = e(34);
      e.d(n, "Q", function () {
        return D.a;
      });
      var U = e(481);
      e.d(n, "R", function () {
        return U.a;
      });
      var j = e(482);
      e.d(n, "S", function () {
        return j.a;
      });
      var I = e(92);
      e.d(n, "T", function () {
        return I.a;
      });
      var B = e(483);
      e.d(n, "U", function () {
        return B.a;
      });
      var Y = e(484);
      e.d(n, "V", function () {
        return Y.a;
      });
      var F = e(35);
      e.d(n, "W", function () {
        return F.a;
      });
      var H = e(485);
      e.d(n, "X", function () {
        return H.a;
      });
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return t.innerRadius;
      }
      function i(t) {
        return t.outerRadius;
      }
      function u(t) {
        return t.startAngle;
      }
      function a(t) {
        return t.endAngle;
      }
      function o(t) {
        return t && t.padAngle;
      }
      function c(t, n, e, r, i, u, a, o) {
        var c = e - t,
          f = r - n,
          s = a - i,
          l = o - u,
          h = (s * (n - u) - l * (t - i)) / (l * c - s * f);
        return [t + h * c, n + h * f];
      }
      function f(t, n, r, i, u, a, o) {
        var c = t - r,
          f = n - i,
          s = (o ? a : -a) / e.i(h.d)(c * c + f * f),
          l = s * f,
          d = -s * c,
          p = t + l,
          v = n + d,
          b = r + l,
          g = i + d,
          y = (p + b) / 2,
          _ = (v + g) / 2,
          m = b - p,
          x = g - v,
          w = m * m + x * x,
          M = u - a,
          k = p * g - b * v,
          N = (x < 0 ? -1 : 1) * e.i(h.d)(e.i(h.e)(0, M * M * w - k * k)),
          A = (k * x - m * N) / w,
          S = (-k * m - x * N) / w,
          T = (k * x + m * N) / w,
          E = (-k * m + x * N) / w,
          C = A - y,
          P = S - _,
          z = T - y,
          R = E - _;
        return (
          C * C + P * P > z * z + R * R && ((A = T), (S = E)),
          { cx: A, cy: S, x01: -l, y01: -d, x11: A * (u / M - 1), y11: S * (u / M - 1) }
        );
      }
      var s = e(16),
        l = e(18),
        h = e(33);
      n.a = function () {
        function t() {
          var t,
            r,
            i = +n.apply(this, arguments),
            u = +d.apply(this, arguments),
            a = b.apply(this, arguments) - h.f,
            o = g.apply(this, arguments) - h.f,
            l = e.i(h.g)(o - a),
            m = o > a;
          if ((_ || (_ = t = e.i(s.a)()), u < i && ((r = u), (u = i), (i = r)), u > h.a))
            if (l > h.c - h.a)
              _.moveTo(u * e.i(h.h)(a), u * e.i(h.i)(a)),
                _.arc(0, 0, u, a, o, !m),
                i > h.a && (_.moveTo(i * e.i(h.h)(o), i * e.i(h.i)(o)), _.arc(0, 0, i, o, a, m));
            else {
              var x,
                w,
                M = a,
                k = o,
                N = a,
                A = o,
                S = l,
                T = l,
                E = y.apply(this, arguments) / 2,
                C = E > h.a && (v ? +v.apply(this, arguments) : e.i(h.d)(i * i + u * u)),
                P = e.i(h.j)(e.i(h.g)(u - i) / 2, +p.apply(this, arguments)),
                z = P,
                R = P;
              if (C > h.a) {
                var q = e.i(h.k)((C / i) * e.i(h.i)(E)),
                  L = e.i(h.k)((C / u) * e.i(h.i)(E));
                (S -= 2 * q) > h.a ? ((q *= m ? 1 : -1), (N += q), (A -= q)) : ((S = 0), (N = A = (a + o) / 2)),
                  (T -= 2 * L) > h.a ? ((L *= m ? 1 : -1), (M += L), (k -= L)) : ((T = 0), (M = k = (a + o) / 2));
              }
              var O = u * e.i(h.h)(M),
                D = u * e.i(h.i)(M),
                U = i * e.i(h.h)(A),
                j = i * e.i(h.i)(A);
              if (P > h.a) {
                var I = u * e.i(h.h)(k),
                  B = u * e.i(h.i)(k),
                  Y = i * e.i(h.h)(N),
                  F = i * e.i(h.i)(N);
                if (l < h.b) {
                  var H = S > h.a ? c(O, D, Y, F, I, B, U, j) : [U, j],
                    X = O - H[0],
                    G = D - H[1],
                    V = I - H[0],
                    W = B - H[1],
                    $ =
                      1 / e.i(h.i)(e.i(h.l)((X * V + G * W) / (e.i(h.d)(X * X + G * G) * e.i(h.d)(V * V + W * W))) / 2),
                    Q = e.i(h.d)(H[0] * H[0] + H[1] * H[1]);
                  (z = e.i(h.j)(P, (i - Q) / ($ - 1))), (R = e.i(h.j)(P, (u - Q) / ($ + 1)));
                }
              }
              T > h.a
                ? R > h.a
                  ? ((x = f(Y, F, O, D, u, R, m)),
                    (w = f(I, B, U, j, u, R, m)),
                    _.moveTo(x.cx + x.x01, x.cy + x.y01),
                    R < P
                      ? _.arc(x.cx, x.cy, R, e.i(h.m)(x.y01, x.x01), e.i(h.m)(w.y01, w.x01), !m)
                      : (_.arc(x.cx, x.cy, R, e.i(h.m)(x.y01, x.x01), e.i(h.m)(x.y11, x.x11), !m),
                        _.arc(0, 0, u, e.i(h.m)(x.cy + x.y11, x.cx + x.x11), e.i(h.m)(w.cy + w.y11, w.cx + w.x11), !m),
                        _.arc(w.cx, w.cy, R, e.i(h.m)(w.y11, w.x11), e.i(h.m)(w.y01, w.x01), !m)))
                  : (_.moveTo(O, D), _.arc(0, 0, u, M, k, !m))
                : _.moveTo(O, D),
                i > h.a && S > h.a
                  ? z > h.a
                    ? ((x = f(U, j, I, B, i, -z, m)),
                      (w = f(O, D, Y, F, i, -z, m)),
                      _.lineTo(x.cx + x.x01, x.cy + x.y01),
                      z < P
                        ? _.arc(x.cx, x.cy, z, e.i(h.m)(x.y01, x.x01), e.i(h.m)(w.y01, w.x01), !m)
                        : (_.arc(x.cx, x.cy, z, e.i(h.m)(x.y01, x.x01), e.i(h.m)(x.y11, x.x11), !m),
                          _.arc(0, 0, i, e.i(h.m)(x.cy + x.y11, x.cx + x.x11), e.i(h.m)(w.cy + w.y11, w.cx + w.x11), m),
                          _.arc(w.cx, w.cy, z, e.i(h.m)(w.y11, w.x11), e.i(h.m)(w.y01, w.x01), !m)))
                    : _.arc(0, 0, i, A, N, m)
                  : _.lineTo(U, j);
            }
          else _.moveTo(0, 0);
          if ((_.closePath(), t)) return (_ = null), t + "" || null;
        }
        var n = r,
          d = i,
          p = e.i(l.a)(0),
          v = null,
          b = u,
          g = a,
          y = o,
          _ = null;
        return (
          (t.centroid = function () {
            var t = (+n.apply(this, arguments) + +d.apply(this, arguments)) / 2,
              r = (+b.apply(this, arguments) + +g.apply(this, arguments)) / 2 - h.b / 2;
            return [e.i(h.h)(r) * t, e.i(h.i)(r) * t];
          }),
          (t.innerRadius = function (r) {
            return arguments.length ? ((n = "function" == typeof r ? r : e.i(l.a)(+r)), t) : n;
          }),
          (t.outerRadius = function (n) {
            return arguments.length ? ((d = "function" == typeof n ? n : e.i(l.a)(+n)), t) : d;
          }),
          (t.cornerRadius = function (n) {
            return arguments.length ? ((p = "function" == typeof n ? n : e.i(l.a)(+n)), t) : p;
          }),
          (t.padRadius = function (n) {
            return arguments.length ? ((v = null == n ? null : "function" == typeof n ? n : e.i(l.a)(+n)), t) : v;
          }),
          (t.startAngle = function (n) {
            return arguments.length ? ((b = "function" == typeof n ? n : e.i(l.a)(+n)), t) : b;
          }),
          (t.endAngle = function (n) {
            return arguments.length ? ((g = "function" == typeof n ? n : e.i(l.a)(+n)), t) : g;
          }),
          (t.padAngle = function (n) {
            return arguments.length ? ((y = "function" == typeof n ? n : e.i(l.a)(+n)), t) : y;
          }),
          (t.context = function (n) {
            return arguments.length ? ((_ = null == n ? null : n), t) : _;
          }),
          t
        );
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(175),
        i = e(171),
        u = e(176);
      n.a = function () {
        var t = e.i(i.a)().curve(r.b),
          n = t.curve,
          a = t.lineX0,
          o = t.lineX1,
          c = t.lineY0,
          f = t.lineY1;
        return (
          (t.angle = t.x),
          delete t.x,
          (t.startAngle = t.x0),
          delete t.x0,
          (t.endAngle = t.x1),
          delete t.x1,
          (t.radius = t.y),
          delete t.y,
          (t.innerRadius = t.y0),
          delete t.y0,
          (t.outerRadius = t.y1),
          delete t.y1,
          (t.lineStartAngle = function () {
            return e.i(u.b)(a());
          }),
          delete t.lineX0,
          (t.lineEndAngle = function () {
            return e.i(u.b)(o());
          }),
          delete t.lineX1,
          (t.lineInnerRadius = function () {
            return e.i(u.b)(c());
          }),
          delete t.lineY0,
          (t.lineOuterRadius = function () {
            return e.i(u.b)(f());
          }),
          delete t.lineY1,
          (t.curve = function (t) {
            return arguments.length ? n(e.i(r.a)(t)) : n()._curve;
          }),
          t
        );
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        this._context = t;
      }
      var i = e(51),
        u = e(48);
      (r.prototype = {
        areaStart: i.a,
        areaEnd: i.a,
        lineStart: function () {
          (this._x0 =
            this._x1 =
            this._x2 =
            this._x3 =
            this._x4 =
            this._y0 =
            this._y1 =
            this._y2 =
            this._y3 =
            this._y4 =
              NaN),
            (this._point = 0);
        },
        lineEnd: function () {
          switch (this._point) {
            case 1:
              this._context.moveTo(this._x2, this._y2), this._context.closePath();
              break;
            case 2:
              this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3),
                this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3),
                this._context.closePath();
              break;
            case 3:
              this.point(this._x2, this._y2), this.point(this._x3, this._y3), this.point(this._x4, this._y4);
          }
        },
        point: function (t, n) {
          switch (((t = +t), (n = +n), this._point)) {
            case 0:
              (this._point = 1), (this._x2 = t), (this._y2 = n);
              break;
            case 1:
              (this._point = 2), (this._x3 = t), (this._y3 = n);
              break;
            case 2:
              (this._point = 3),
                (this._x4 = t),
                (this._y4 = n),
                this._context.moveTo((this._x0 + 4 * this._x1 + t) / 6, (this._y0 + 4 * this._y1 + n) / 6);
              break;
            default:
              e.i(u.c)(this, t, n);
          }
          (this._x0 = this._x1), (this._x1 = t), (this._y0 = this._y1), (this._y1 = n);
        },
      }),
        (n.a = function (t) {
          return new r(t);
        });
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        this._context = t;
      }
      var i = e(48);
      (r.prototype = {
        areaStart: function () {
          this._line = 0;
        },
        areaEnd: function () {
          this._line = NaN;
        },
        lineStart: function () {
          (this._x0 = this._x1 = this._y0 = this._y1 = NaN), (this._point = 0);
        },
        lineEnd: function () {
          (this._line || (0 !== this._line && 3 === this._point)) && this._context.closePath(),
            (this._line = 1 - this._line);
        },
        point: function (t, n) {
          switch (((t = +t), (n = +n), this._point)) {
            case 0:
              this._point = 1;
              break;
            case 1:
              this._point = 2;
              break;
            case 2:
              this._point = 3;
              var r = (this._x0 + 4 * this._x1 + t) / 6,
                u = (this._y0 + 4 * this._y1 + n) / 6;
              this._line ? this._context.lineTo(r, u) : this._context.moveTo(r, u);
              break;
            case 3:
              this._point = 4;
            default:
              e.i(i.c)(this, t, n);
          }
          (this._x0 = this._x1), (this._x1 = t), (this._y0 = this._y1), (this._y1 = n);
        },
      }),
        (n.a = function (t) {
          return new r(t);
        });
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        (this._basis = new i.b(t)), (this._beta = n);
      }
      var i = e(48);
      (r.prototype = {
        lineStart: function () {
          (this._x = []), (this._y = []), this._basis.lineStart();
        },
        lineEnd: function () {
          var t = this._x,
            n = this._y,
            e = t.length - 1;
          if (e > 0)
            for (var r, i = t[0], u = n[0], a = t[e] - i, o = n[e] - u, c = -1; ++c <= e; )
              (r = c / e),
                this._basis.point(
                  this._beta * t[c] + (1 - this._beta) * (i + r * a),
                  this._beta * n[c] + (1 - this._beta) * (u + r * o)
                );
          (this._x = this._y = null), this._basis.lineEnd();
        },
        point: function (t, n) {
          this._x.push(+t), this._y.push(+n);
        },
      }),
        (n.a = (function t(n) {
          function e(t) {
            return 1 === n ? new i.b(t) : new r(t, n);
          }
          return (
            (e.beta = function (n) {
              return t(+n);
            }),
            e
          );
        })(0.85));
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        (this._context = t), (this._alpha = n);
      }
      var i = e(173),
        u = e(51),
        a = e(90);
      (r.prototype = {
        areaStart: u.a,
        areaEnd: u.a,
        lineStart: function () {
          (this._x0 =
            this._x1 =
            this._x2 =
            this._x3 =
            this._x4 =
            this._x5 =
            this._y0 =
            this._y1 =
            this._y2 =
            this._y3 =
            this._y4 =
            this._y5 =
              NaN),
            (this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0);
        },
        lineEnd: function () {
          switch (this._point) {
            case 1:
              this._context.moveTo(this._x3, this._y3), this._context.closePath();
              break;
            case 2:
              this._context.lineTo(this._x3, this._y3), this._context.closePath();
              break;
            case 3:
              this.point(this._x3, this._y3), this.point(this._x4, this._y4), this.point(this._x5, this._y5);
          }
        },
        point: function (t, n) {
          if (((t = +t), (n = +n), this._point)) {
            var r = this._x2 - t,
              i = this._y2 - n;
            this._l23_a = Math.sqrt((this._l23_2a = Math.pow(r * r + i * i, this._alpha)));
          }
          switch (this._point) {
            case 0:
              (this._point = 1), (this._x3 = t), (this._y3 = n);
              break;
            case 1:
              (this._point = 2), this._context.moveTo((this._x4 = t), (this._y4 = n));
              break;
            case 2:
              (this._point = 3), (this._x5 = t), (this._y5 = n);
              break;
            default:
              e.i(a.b)(this, t, n);
          }
          (this._l01_a = this._l12_a),
            (this._l12_a = this._l23_a),
            (this._l01_2a = this._l12_2a),
            (this._l12_2a = this._l23_2a),
            (this._x0 = this._x1),
            (this._x1 = this._x2),
            (this._x2 = t),
            (this._y0 = this._y1),
            (this._y1 = this._y2),
            (this._y2 = n);
        },
      }),
        (n.a = (function t(n) {
          function e(t) {
            return n ? new r(t, n) : new i.b(t, 0);
          }
          return (
            (e.alpha = function (n) {
              return t(+n);
            }),
            e
          );
        })(0.5));
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        (this._context = t), (this._alpha = n);
      }
      var i = e(174),
        u = e(90);
      (r.prototype = {
        areaStart: function () {
          this._line = 0;
        },
        areaEnd: function () {
          this._line = NaN;
        },
        lineStart: function () {
          (this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN),
            (this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0);
        },
        lineEnd: function () {
          (this._line || (0 !== this._line && 3 === this._point)) && this._context.closePath(),
            (this._line = 1 - this._line);
        },
        point: function (t, n) {
          if (((t = +t), (n = +n), this._point)) {
            var r = this._x2 - t,
              i = this._y2 - n;
            this._l23_a = Math.sqrt((this._l23_2a = Math.pow(r * r + i * i, this._alpha)));
          }
          switch (this._point) {
            case 0:
              this._point = 1;
              break;
            case 1:
              this._point = 2;
              break;
            case 2:
              (this._point = 3),
                this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
              break;
            case 3:
              this._point = 4;
            default:
              e.i(u.b)(this, t, n);
          }
          (this._l01_a = this._l12_a),
            (this._l12_a = this._l23_a),
            (this._l01_2a = this._l12_2a),
            (this._l12_2a = this._l23_2a),
            (this._x0 = this._x1),
            (this._x1 = this._x2),
            (this._x2 = t),
            (this._y0 = this._y1),
            (this._y1 = this._y2),
            (this._y2 = n);
        },
      }),
        (n.a = (function t(n) {
          function e(t) {
            return n ? new r(t, n) : new i.b(t, 0);
          }
          return (
            (e.alpha = function (n) {
              return t(+n);
            }),
            e
          );
        })(0.5));
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        this._context = t;
      }
      var i = e(51);
      (r.prototype = {
        areaStart: i.a,
        areaEnd: i.a,
        lineStart: function () {
          this._point = 0;
        },
        lineEnd: function () {
          this._point && this._context.closePath();
        },
        point: function (t, n) {
          (t = +t),
            (n = +n),
            this._point ? this._context.lineTo(t, n) : ((this._point = 1), this._context.moveTo(t, n));
        },
      }),
        (n.a = function (t) {
          return new r(t);
        });
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return t < 0 ? -1 : 1;
      }
      function i(t, n, e) {
        var i = t._x1 - t._x0,
          u = n - t._x1,
          a = (t._y1 - t._y0) / (i || (u < 0 && -0)),
          o = (e - t._y1) / (u || (i < 0 && -0)),
          c = (a * u + o * i) / (i + u);
        return (r(a) + r(o)) * Math.min(Math.abs(a), Math.abs(o), 0.5 * Math.abs(c)) || 0;
      }
      function u(t, n) {
        var e = t._x1 - t._x0;
        return e ? ((3 * (t._y1 - t._y0)) / e - n) / 2 : n;
      }
      function a(t, n, e) {
        var r = t._x0,
          i = t._y0,
          u = t._x1,
          a = t._y1,
          o = (u - r) / 3;
        t._context.bezierCurveTo(r + o, i + o * n, u - o, a - o * e, u, a);
      }
      function o(t) {
        this._context = t;
      }
      function c(t) {
        this._context = new f(t);
      }
      function f(t) {
        this._context = t;
      }
      function s(t) {
        return new o(t);
      }
      function l(t) {
        return new c(t);
      }
      (n.a = s),
        (n.b = l),
        (o.prototype = {
          areaStart: function () {
            this._line = 0;
          },
          areaEnd: function () {
            this._line = NaN;
          },
          lineStart: function () {
            (this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN), (this._point = 0);
          },
          lineEnd: function () {
            switch (this._point) {
              case 2:
                this._context.lineTo(this._x1, this._y1);
                break;
              case 3:
                a(this, this._t0, u(this, this._t0));
            }
            (this._line || (0 !== this._line && 1 === this._point)) && this._context.closePath(),
              (this._line = 1 - this._line);
          },
          point: function (t, n) {
            var e = NaN;
            if (((t = +t), (n = +n), t !== this._x1 || n !== this._y1)) {
              switch (this._point) {
                case 0:
                  (this._point = 1), this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
                  break;
                case 1:
                  this._point = 2;
                  break;
                case 2:
                  (this._point = 3), a(this, u(this, (e = i(this, t, n))), e);
                  break;
                default:
                  a(this, this._t0, (e = i(this, t, n)));
              }
              (this._x0 = this._x1), (this._x1 = t), (this._y0 = this._y1), (this._y1 = n), (this._t0 = e);
            }
          },
        }),
        ((c.prototype = Object.create(o.prototype)).point = function (t, n) {
          o.prototype.point.call(this, n, t);
        }),
        (f.prototype = {
          moveTo: function (t, n) {
            this._context.moveTo(n, t);
          },
          closePath: function () {
            this._context.closePath();
          },
          lineTo: function (t, n) {
            this._context.lineTo(n, t);
          },
          bezierCurveTo: function (t, n, e, r, i, u) {
            this._context.bezierCurveTo(n, t, r, e, u, i);
          },
        });
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        this._context = t;
      }
      function i(t) {
        var n,
          e,
          r = t.length - 1,
          i = new Array(r),
          u = new Array(r),
          a = new Array(r);
        for (i[0] = 0, u[0] = 2, a[0] = t[0] + 2 * t[1], n = 1; n < r - 1; ++n)
          (i[n] = 1), (u[n] = 4), (a[n] = 4 * t[n] + 2 * t[n + 1]);
        for (i[r - 1] = 2, u[r - 1] = 7, a[r - 1] = 8 * t[r - 1] + t[r], n = 1; n < r; ++n)
          (e = i[n] / u[n - 1]), (u[n] -= e), (a[n] -= e * a[n - 1]);
        for (i[r - 1] = a[r - 1] / u[r - 1], n = r - 2; n >= 0; --n) i[n] = (a[n] - i[n + 1]) / u[n];
        for (u[r - 1] = (t[r] + i[r - 1]) / 2, n = 0; n < r - 1; ++n) u[n] = 2 * t[n + 1] - i[n + 1];
        return [i, u];
      }
      (r.prototype = {
        areaStart: function () {
          this._line = 0;
        },
        areaEnd: function () {
          this._line = NaN;
        },
        lineStart: function () {
          (this._x = []), (this._y = []);
        },
        lineEnd: function () {
          var t = this._x,
            n = this._y,
            e = t.length;
          if (e)
            if ((this._line ? this._context.lineTo(t[0], n[0]) : this._context.moveTo(t[0], n[0]), 2 === e))
              this._context.lineTo(t[1], n[1]);
            else
              for (var r = i(t), u = i(n), a = 0, o = 1; o < e; ++a, ++o)
                this._context.bezierCurveTo(r[0][a], u[0][a], r[1][a], u[1][a], t[o], n[o]);
          (this._line || (0 !== this._line && 1 === e)) && this._context.closePath(),
            (this._line = 1 - this._line),
            (this._x = this._y = null);
        },
        point: function (t, n) {
          this._x.push(+t), this._y.push(+n);
        },
      }),
        (n.a = function (t) {
          return new r(t);
        });
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        (this._context = t), (this._t = n);
      }
      function i(t) {
        return new r(t, 0);
      }
      function u(t) {
        return new r(t, 1);
      }
      (n.c = i),
        (n.b = u),
        (r.prototype = {
          areaStart: function () {
            this._line = 0;
          },
          areaEnd: function () {
            this._line = NaN;
          },
          lineStart: function () {
            (this._x = this._y = NaN), (this._point = 0);
          },
          lineEnd: function () {
            0 < this._t && this._t < 1 && 2 === this._point && this._context.lineTo(this._x, this._y),
              (this._line || (0 !== this._line && 1 === this._point)) && this._context.closePath(),
              this._line >= 0 && ((this._t = 1 - this._t), (this._line = 1 - this._line));
          },
          point: function (t, n) {
            switch (((t = +t), (n = +n), this._point)) {
              case 0:
                (this._point = 1), this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
                break;
              case 1:
                this._point = 2;
              default:
                if (this._t <= 0) this._context.lineTo(this._x, n), this._context.lineTo(t, n);
                else {
                  var e = this._x * (1 - this._t) + t * this._t;
                  this._context.lineTo(e, this._y), this._context.lineTo(e, n);
                }
            }
            (this._x = t), (this._y = n);
          },
        }),
        (n.a = function (t) {
          return new r(t, 0.5);
        });
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t, n) {
        return n < t ? -1 : n > t ? 1 : n >= t ? 0 : NaN;
      };
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t) {
        return t;
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return t.source;
      }
      function i(t) {
        return t.target;
      }
      function u(t) {
        function n() {
          var n,
            r = d.a.call(arguments),
            i = u.apply(this, r),
            s = a.apply(this, r);
          if (
            (f || (f = n = e.i(h.a)()),
            t(
              f,
              +o.apply(this, ((r[0] = i), r)),
              +c.apply(this, r),
              +o.apply(this, ((r[0] = s), r)),
              +c.apply(this, r)
            ),
            n)
          )
            return (f = null), n + "" || null;
        }
        var u = r,
          a = i,
          o = v.a,
          c = v.b,
          f = null;
        return (
          (n.source = function (t) {
            return arguments.length ? ((u = t), n) : u;
          }),
          (n.target = function (t) {
            return arguments.length ? ((a = t), n) : a;
          }),
          (n.x = function (t) {
            return arguments.length ? ((o = "function" == typeof t ? t : e.i(p.a)(+t)), n) : o;
          }),
          (n.y = function (t) {
            return arguments.length ? ((c = "function" == typeof t ? t : e.i(p.a)(+t)), n) : c;
          }),
          (n.context = function (t) {
            return arguments.length ? ((f = null == t ? null : t), n) : f;
          }),
          n
        );
      }
      function a(t, n, e, r, i) {
        t.moveTo(n, e), t.bezierCurveTo((n = (n + r) / 2), e, n, i, r, i);
      }
      function o(t, n, e, r, i) {
        t.moveTo(n, e), t.bezierCurveTo(n, (e = (e + i) / 2), r, e, r, i);
      }
      function c(t, n, r, i, u) {
        var a = e.i(b.a)(n, r),
          o = e.i(b.a)(n, (r = (r + u) / 2)),
          c = e.i(b.a)(i, r),
          f = e.i(b.a)(i, u);
        t.moveTo(a[0], a[1]), t.bezierCurveTo(o[0], o[1], c[0], c[1], f[0], f[1]);
      }
      function f() {
        return u(a);
      }
      function s() {
        return u(o);
      }
      function l() {
        var t = u(c);
        return (t.angle = t.x), delete t.x, (t.radius = t.y), delete t.y, t;
      }
      (n.a = f), (n.b = s), (n.c = l);
      var h = e(16),
        d = e(172),
        p = e(18),
        v = e(93),
        b = e(177);
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t, n) {
        if ((o = t.length) > 1)
          for (var e, r, i, u, a, o, c = 0, f = t[n[0]].length; c < f; ++c)
            for (u = a = 0, e = 0; e < o; ++e)
              (i = (r = t[n[e]][c])[1] - r[0]) >= 0
                ? ((r[0] = u), (r[1] = u += i))
                : i < 0
                ? ((r[1] = a), (r[0] = a += i))
                : (r[0] = u);
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(34);
      n.a = function (t, n) {
        if ((u = t.length) > 0) {
          for (var i, u, a, o = 0, c = t[0].length; o < c; ++o) {
            for (a = i = 0; i < u; ++i) a += t[i][o][1] || 0;
            if (a) for (i = 0; i < u; ++i) t[i][o][1] /= a;
          }
          e.i(r.a)(t, n);
        }
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(34);
      n.a = function (t, n) {
        if ((i = t.length) > 0) {
          for (var i, u = 0, a = t[n[0]], o = a.length; u < o; ++u) {
            for (var c = 0, f = 0; c < i; ++c) f += t[c][u][1] || 0;
            a[u][1] += a[u][0] = -f / 2;
          }
          e.i(r.a)(t, n);
        }
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(34);
      n.a = function (t, n) {
        if ((a = t.length) > 0 && (u = (i = t[n[0]]).length) > 0) {
          for (var i, u, a, o = 0, c = 1; c < u; ++c) {
            for (var f = 0, s = 0, l = 0; f < a; ++f) {
              for (var h = t[n[f]], d = h[c][1] || 0, p = h[c - 1][1] || 0, v = (d - p) / 2, b = 0; b < f; ++b) {
                var g = t[n[b]];
                v += (g[c][1] || 0) - (g[c - 1][1] || 0);
              }
              (s += d), (l += v * d);
            }
            (i[c - 1][1] += i[c - 1][0] = o), s && (o -= l / s);
          }
          (i[c - 1][1] += i[c - 1][0] = o), e.i(r.a)(t, n);
        }
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(92);
      n.a = function (t) {
        return e.i(r.a)(t).reverse();
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(35),
        i = e(92);
      n.a = function (t) {
        var n,
          u,
          a = t.length,
          o = t.map(i.b),
          c = e
            .i(r.a)(t)
            .sort(function (t, n) {
              return o[n] - o[t];
            }),
          f = 0,
          s = 0,
          l = [],
          h = [];
        for (n = 0; n < a; ++n) (u = c[n]), f < s ? ((f += o[u]), l.push(u)) : ((s += o[u]), h.push(u));
        return h.reverse().concat(l);
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(35);
      n.a = function (t) {
        return e.i(r.a)(t).reverse();
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(18),
        i = e(476),
        u = e(477),
        a = e(33);
      n.a = function () {
        function t(t) {
          var e,
            r,
            i,
            u,
            h,
            d = t.length,
            p = 0,
            v = new Array(d),
            b = new Array(d),
            g = +f.apply(this, arguments),
            y = Math.min(a.c, Math.max(-a.c, s.apply(this, arguments) - g)),
            _ = Math.min(Math.abs(y) / d, l.apply(this, arguments)),
            m = _ * (y < 0 ? -1 : 1);
          for (e = 0; e < d; ++e) (h = b[(v[e] = e)] = +n(t[e], e, t)) > 0 && (p += h);
          for (
            null != o
              ? v.sort(function (t, n) {
                  return o(b[t], b[n]);
                })
              : null != c &&
                v.sort(function (n, e) {
                  return c(t[n], t[e]);
                }),
              e = 0,
              i = p ? (y - d * m) / p : 0;
            e < d;
            ++e, g = u
          )
            (r = v[e]),
              (h = b[r]),
              (u = g + (h > 0 ? h * i : 0) + m),
              (b[r] = { data: t[r], index: e, value: h, startAngle: g, endAngle: u, padAngle: _ });
          return b;
        }
        var n = u.a,
          o = i.a,
          c = null,
          f = e.i(r.a)(0),
          s = e.i(r.a)(a.c),
          l = e.i(r.a)(0);
        return (
          (t.value = function (i) {
            return arguments.length ? ((n = "function" == typeof i ? i : e.i(r.a)(+i)), t) : n;
          }),
          (t.sortValues = function (n) {
            return arguments.length ? ((o = n), (c = null), t) : o;
          }),
          (t.sort = function (n) {
            return arguments.length ? ((c = n), (o = null), t) : c;
          }),
          (t.startAngle = function (n) {
            return arguments.length ? ((f = "function" == typeof n ? n : e.i(r.a)(+n)), t) : f;
          }),
          (t.endAngle = function (n) {
            return arguments.length ? ((s = "function" == typeof n ? n : e.i(r.a)(+n)), t) : s;
          }),
          (t.padAngle = function (n) {
            return arguments.length ? ((l = "function" == typeof n ? n : e.i(r.a)(+n)), t) : l;
          }),
          t
        );
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        return t[n];
      }
      var i = e(172),
        u = e(18),
        a = e(34),
        o = e(35);
      n.a = function () {
        function t(t) {
          var e,
            r,
            i = n.apply(this, arguments),
            u = t.length,
            a = i.length,
            o = new Array(a);
          for (e = 0; e < a; ++e) {
            for (var l, h = i[e], d = (o[e] = new Array(u)), p = 0; p < u; ++p)
              (d[p] = l = [0, +s(t[p], h, p, t)]), (l.data = t[p]);
            d.key = h;
          }
          for (e = 0, r = c(o); e < a; ++e) o[r[e]].index = e;
          return f(o, r), o;
        }
        var n = e.i(u.a)([]),
          c = o.a,
          f = a.a,
          s = r;
        return (
          (t.keys = function (r) {
            return arguments.length ? ((n = "function" == typeof r ? r : e.i(u.a)(i.a.call(r))), t) : n;
          }),
          (t.value = function (n) {
            return arguments.length ? ((s = "function" == typeof n ? n : e.i(u.a)(+n)), t) : s;
          }),
          (t.order = function (n) {
            return arguments.length
              ? ((c = null == n ? o.a : "function" == typeof n ? n : e.i(u.a)(i.a.call(n))), t)
              : c;
          }),
          (t.offset = function (n) {
            return arguments.length ? ((f = null == n ? a.a : n), t) : f;
          }),
          t
        );
      };
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return h;
      });
      var r = e(16),
        i = e(178),
        u = e(179),
        a = e(180),
        o = e(182),
        c = e(181),
        f = e(183),
        s = e(184),
        l = e(18),
        h = [i.a, u.a, a.a, c.a, o.a, f.a, s.a];
      n.a = function () {
        function t() {
          var t;
          if ((a || (a = t = e.i(r.a)()), n.apply(this, arguments).draw(a, +u.apply(this, arguments)), t))
            return (a = null), t + "" || null;
        }
        var n = e.i(l.a)(i.a),
          u = e.i(l.a)(64),
          a = null;
        return (
          (t.type = function (r) {
            return arguments.length ? ((n = "function" == typeof r ? r : e.i(l.a)(r)), t) : n;
          }),
          (t.size = function (n) {
            return arguments.length ? ((u = "function" == typeof n ? n : e.i(l.a)(+n)), t) : u;
          }),
          (t.context = function (n) {
            return arguments.length ? ((a = null == n ? null : n), t) : a;
          }),
          t
        );
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        var n = new Date(t);
        return isNaN(n) ? null : n;
      }
      var i = e(185),
        u = e(95),
        a = +new Date("2000-01-01T00:00:00.000Z") ? r : e.i(u.e)(i.b);
      n.a = a;
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return a;
      });
      var r = e(4),
        i = e(11),
        u = e.i(r.a)(
          function (t) {
            t.setHours(0, 0, 0, 0);
          },
          function (t, n) {
            t.setDate(t.getDate() + n);
          },
          function (t, n) {
            return (n - t - (n.getTimezoneOffset() - t.getTimezoneOffset()) * i.d) / i.b;
          },
          function (t) {
            return t.getDate() - 1;
          }
        );
      n.a = u;
      var a = u.range;
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return a;
      });
      var r = e(4),
        i = e(11),
        u = e.i(r.a)(
          function (t) {
            var n = (t.getTimezoneOffset() * i.d) % i.c;
            n < 0 && (n += i.c), t.setTime(Math.floor((+t - n) / i.c) * i.c + n);
          },
          function (t, n) {
            t.setTime(+t + n * i.c);
          },
          function (t, n) {
            return (n - t) / i.c;
          },
          function (t) {
            return t.getHours();
          }
        );
      n.a = u;
      var a = u.range;
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return u;
      });
      var r = e(4),
        i = e.i(r.a)(
          function () {},
          function (t, n) {
            t.setTime(+t + n);
          },
          function (t, n) {
            return n - t;
          }
        );
      (i.every = function (t) {
        return (
          (t = Math.floor(t)),
          isFinite(t) && t > 0
            ? t > 1
              ? e.i(r.a)(
                  function (n) {
                    n.setTime(Math.floor(n / t) * t);
                  },
                  function (n, e) {
                    n.setTime(+n + e * t);
                  },
                  function (n, e) {
                    return (e - n) / t;
                  }
                )
              : i
            : null
        );
      }),
        (n.a = i);
      var u = i.range;
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return a;
      });
      var r = e(4),
        i = e(11),
        u = e.i(r.a)(
          function (t) {
            t.setTime(Math.floor(t / i.d) * i.d);
          },
          function (t, n) {
            t.setTime(+t + n * i.d);
          },
          function (t, n) {
            return (n - t) / i.d;
          },
          function (t) {
            return t.getMinutes();
          }
        );
      n.a = u;
      var a = u.range;
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return u;
      });
      var r = e(4),
        i = e.i(r.a)(
          function (t) {
            t.setDate(1), t.setHours(0, 0, 0, 0);
          },
          function (t, n) {
            t.setMonth(t.getMonth() + n);
          },
          function (t, n) {
            return n.getMonth() - t.getMonth() + 12 * (n.getFullYear() - t.getFullYear());
          },
          function (t) {
            return t.getMonth();
          }
        );
      n.a = i;
      var u = i.range;
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return a;
      });
      var r = e(4),
        i = e(11),
        u = e.i(r.a)(
          function (t) {
            t.setTime(Math.floor(t / i.e) * i.e);
          },
          function (t, n) {
            t.setTime(+t + n * i.e);
          },
          function (t, n) {
            return (n - t) / i.e;
          },
          function (t) {
            return t.getUTCSeconds();
          }
        );
      n.a = u;
      var a = u.range;
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return a;
      });
      var r = e(4),
        i = e(11),
        u = e.i(r.a)(
          function (t) {
            t.setUTCHours(0, 0, 0, 0);
          },
          function (t, n) {
            t.setUTCDate(t.getUTCDate() + n);
          },
          function (t, n) {
            return (n - t) / i.b;
          },
          function (t) {
            return t.getUTCDate() - 1;
          }
        );
      n.a = u;
      var a = u.range;
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return a;
      });
      var r = e(4),
        i = e(11),
        u = e.i(r.a)(
          function (t) {
            t.setUTCMinutes(0, 0, 0);
          },
          function (t, n) {
            t.setTime(+t + n * i.c);
          },
          function (t, n) {
            return (n - t) / i.c;
          },
          function (t) {
            return t.getUTCHours();
          }
        );
      n.a = u;
      var a = u.range;
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return a;
      });
      var r = e(4),
        i = e(11),
        u = e.i(r.a)(
          function (t) {
            t.setUTCSeconds(0, 0);
          },
          function (t, n) {
            t.setTime(+t + n * i.d);
          },
          function (t, n) {
            return (n - t) / i.d;
          },
          function (t) {
            return t.getUTCMinutes();
          }
        );
      n.a = u;
      var a = u.range;
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return u;
      });
      var r = e(4),
        i = e.i(r.a)(
          function (t) {
            t.setUTCDate(1), t.setUTCHours(0, 0, 0, 0);
          },
          function (t, n) {
            t.setUTCMonth(t.getUTCMonth() + n);
          },
          function (t, n) {
            return n.getUTCMonth() - t.getUTCMonth() + 12 * (n.getUTCFullYear() - t.getUTCFullYear());
          },
          function (t) {
            return t.getUTCMonth();
          }
        );
      n.a = i;
      var u = i.range;
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return e.i(i.a)(
          function (n) {
            n.setUTCDate(n.getUTCDate() - ((n.getUTCDay() + 7 - t) % 7)), n.setUTCHours(0, 0, 0, 0);
          },
          function (t, n) {
            t.setUTCDate(t.getUTCDate() + 7 * n);
          },
          function (t, n) {
            return (n - t) / u.a;
          }
        );
      }
      e.d(n, "a", function () {
        return a;
      }),
        e.d(n, "c", function () {
          return o;
        }),
        e.d(n, "e", function () {
          return c;
        }),
        e.d(n, "g", function () {
          return f;
        }),
        e.d(n, "i", function () {
          return s;
        }),
        e.d(n, "k", function () {
          return l;
        }),
        e.d(n, "m", function () {
          return h;
        }),
        e.d(n, "b", function () {
          return d;
        }),
        e.d(n, "d", function () {
          return p;
        }),
        e.d(n, "f", function () {
          return v;
        }),
        e.d(n, "h", function () {
          return b;
        }),
        e.d(n, "j", function () {
          return g;
        }),
        e.d(n, "l", function () {
          return y;
        }),
        e.d(n, "n", function () {
          return _;
        });
      var i = e(4),
        u = e(11),
        a = r(0),
        o = r(1),
        c = r(2),
        f = r(3),
        s = r(4),
        l = r(5),
        h = r(6),
        d = a.range,
        p = o.range,
        v = c.range,
        b = f.range,
        g = s.range,
        y = l.range,
        _ = h.range;
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return u;
      });
      var r = e(4),
        i = e.i(r.a)(
          function (t) {
            t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
          },
          function (t, n) {
            t.setUTCFullYear(t.getUTCFullYear() + n);
          },
          function (t, n) {
            return n.getUTCFullYear() - t.getUTCFullYear();
          },
          function (t) {
            return t.getUTCFullYear();
          }
        );
      (i.every = function (t) {
        return isFinite((t = Math.floor(t))) && t > 0
          ? e.i(r.a)(
              function (n) {
                n.setUTCFullYear(Math.floor(n.getUTCFullYear() / t) * t),
                  n.setUTCMonth(0, 1),
                  n.setUTCHours(0, 0, 0, 0);
              },
              function (n, e) {
                n.setUTCFullYear(n.getUTCFullYear() + e * t);
              }
            )
          : null;
      }),
        (n.a = i);
      var u = i.range;
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return e.i(i.a)(
          function (n) {
            n.setDate(n.getDate() - ((n.getDay() + 7 - t) % 7)), n.setHours(0, 0, 0, 0);
          },
          function (t, n) {
            t.setDate(t.getDate() + 7 * n);
          },
          function (t, n) {
            return (n - t - (n.getTimezoneOffset() - t.getTimezoneOffset()) * u.d) / u.a;
          }
        );
      }
      e.d(n, "a", function () {
        return a;
      }),
        e.d(n, "c", function () {
          return o;
        }),
        e.d(n, "e", function () {
          return c;
        }),
        e.d(n, "g", function () {
          return f;
        }),
        e.d(n, "i", function () {
          return s;
        }),
        e.d(n, "k", function () {
          return l;
        }),
        e.d(n, "m", function () {
          return h;
        }),
        e.d(n, "b", function () {
          return d;
        }),
        e.d(n, "d", function () {
          return p;
        }),
        e.d(n, "f", function () {
          return v;
        }),
        e.d(n, "h", function () {
          return b;
        }),
        e.d(n, "j", function () {
          return g;
        }),
        e.d(n, "l", function () {
          return y;
        }),
        e.d(n, "n", function () {
          return _;
        });
      var i = e(4),
        u = e(11),
        a = r(0),
        o = r(1),
        c = r(2),
        f = r(3),
        s = r(4),
        l = r(5),
        h = r(6),
        d = a.range,
        p = o.range,
        v = c.range,
        b = f.range,
        g = s.range,
        y = l.range,
        _ = h.range;
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return u;
      });
      var r = e(4),
        i = e.i(r.a)(
          function (t) {
            t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
          },
          function (t, n) {
            t.setFullYear(t.getFullYear() + n);
          },
          function (t, n) {
            return n.getFullYear() - t.getFullYear();
          },
          function (t) {
            return t.getFullYear();
          }
        );
      (i.every = function (t) {
        return isFinite((t = Math.floor(t))) && t > 0
          ? e.i(r.a)(
              function (n) {
                n.setFullYear(Math.floor(n.getFullYear() / t) * t), n.setMonth(0, 1), n.setHours(0, 0, 0, 0);
              },
              function (n, e) {
                n.setFullYear(n.getFullYear() + e * t);
              }
            )
          : null;
      }),
        (n.a = i);
      var u = i.range;
    },
    function (t, n, e) {
      "use strict";
      var r = e(96);
      n.a = function (t, n, i) {
        var u = new r.d(),
          a = n;
        return null == n
          ? (u.restart(t, n, i), u)
          : ((n = +n),
            (i = null == i ? e.i(r.a)() : +i),
            u.restart(
              function e(r) {
                (r += a), u.restart(e, (a += n), i), t(r);
              },
              n,
              i
            ),
            u);
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(96);
      n.a = function (t, n, e) {
        var i = new r.d();
        return (
          (n = null == n ? 0 : +n),
          i.restart(
            function (e) {
              i.stop(), t(e + n);
            },
            n,
            e
          ),
          i
        );
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(13),
        i = e(8),
        u = [null];
      n.a = function (t, n) {
        var e,
          a,
          o = t.__transition;
        if (o) {
          n = null == n ? null : n + "";
          for (a in o) if ((e = o[a]).state > i.d && e.name === n) return new r.b([[t]], u, n, +a);
        }
        return null;
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(3),
        i = e(508),
        u = e(509);
      (r.k.prototype.interrupt = i.a), (r.k.prototype.transition = u.a);
    },
    function (t, n, e) {
      "use strict";
      var r = e(187);
      n.a = function (t) {
        return this.each(function () {
          e.i(r.a)(this, t);
        });
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        for (var r; !(r = t.__transition) || !(r = r[n]); ) if (!(t = t.parentNode)) return (c.time = e.i(o.a)()), c;
        return r;
      }
      var i = e(13),
        u = e(8),
        a = e(118),
        o = e(53),
        c = { time: null, delay: 0, duration: 250, ease: a.i };
      n.a = function (t) {
        var n, a;
        t instanceof i.b
          ? ((n = t._id), (t = t._name))
          : ((n = e.i(i.c)()), ((a = c).time = e.i(o.a)()), (t = null == t ? null : t + ""));
        for (var f = this._groups, s = f.length, l = 0; l < s; ++l)
          for (var h, d = f[l], p = d.length, v = 0; v < p; ++v) (h = d[v]) && e.i(u.h)(h, t, n, v, d, a || r(h, n));
        return new i.b(f, this._parents, t, n);
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return function () {
          this.removeAttribute(t);
        };
      }
      function i(t) {
        return function () {
          this.removeAttributeNS(t.space, t.local);
        };
      }
      function u(t, n, e) {
        var r, i;
        return function () {
          var u = this.getAttribute(t);
          return u === e ? null : u === r ? i : (i = n((r = u), e));
        };
      }
      function a(t, n, e) {
        var r, i;
        return function () {
          var u = this.getAttributeNS(t.space, t.local);
          return u === e ? null : u === r ? i : (i = n((r = u), e));
        };
      }
      function o(t, n, e) {
        var r, i, u;
        return function () {
          var a,
            o = e(this);
          return null == o
            ? void this.removeAttribute(t)
            : ((a = this.getAttribute(t)), a === o ? null : a === r && o === i ? u : (u = n((r = a), (i = o))));
        };
      }
      function c(t, n, e) {
        var r, i, u;
        return function () {
          var a,
            o = e(this);
          return null == o
            ? void this.removeAttributeNS(t.space, t.local)
            : ((a = this.getAttributeNS(t.space, t.local)),
              a === o ? null : a === r && o === i ? u : (u = n((r = a), (i = o))));
        };
      }
      var f = e(6),
        s = e(3),
        l = e(54),
        h = e(188);
      n.a = function (t, n) {
        var d = e.i(s.f)(t),
          p = "transform" === d ? f.k : h.a;
        return this.attrTween(
          t,
          "function" == typeof n
            ? (d.local ? c : o)(d, p, e.i(l.b)(this, "attr." + t, n))
            : null == n
            ? (d.local ? i : r)(d)
            : (d.local ? a : u)(d, p, n + "")
        );
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        function e() {
          var e = this,
            r = n.apply(e, arguments);
          return (
            r &&
            function (n) {
              e.setAttributeNS(t.space, t.local, r(n));
            }
          );
        }
        return (e._value = n), e;
      }
      function i(t, n) {
        function e() {
          var e = this,
            r = n.apply(e, arguments);
          return (
            r &&
            function (n) {
              e.setAttribute(t, r(n));
            }
          );
        }
        return (e._value = n), e;
      }
      var u = e(3);
      n.a = function (t, n) {
        var a = "attr." + t;
        if (arguments.length < 2) return (a = this.tween(a)) && a._value;
        if (null == n) return this.tween(a, null);
        if ("function" != typeof n) throw new Error();
        var o = e.i(u.f)(t);
        return this.tween(a, (o.local ? r : i)(o, n));
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        return function () {
          e.i(u.g)(this, t).delay = +n.apply(this, arguments);
        };
      }
      function i(t, n) {
        return (
          (n = +n),
          function () {
            e.i(u.g)(this, t).delay = n;
          }
        );
      }
      var u = e(8);
      n.a = function (t) {
        var n = this._id;
        return arguments.length ? this.each(("function" == typeof t ? r : i)(n, t)) : e.i(u.f)(this.node(), n).delay;
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        return function () {
          e.i(u.e)(this, t).duration = +n.apply(this, arguments);
        };
      }
      function i(t, n) {
        return (
          (n = +n),
          function () {
            e.i(u.e)(this, t).duration = n;
          }
        );
      }
      var u = e(8);
      n.a = function (t) {
        var n = this._id;
        return arguments.length ? this.each(("function" == typeof t ? r : i)(n, t)) : e.i(u.f)(this.node(), n).duration;
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        if ("function" != typeof n) throw new Error();
        return function () {
          e.i(i.e)(this, t).ease = n;
        };
      }
      var i = e(8);
      n.a = function (t) {
        var n = this._id;
        return arguments.length ? this.each(r(n, t)) : e.i(i.f)(this.node(), n).ease;
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(3),
        i = e(13);
      n.a = function (t) {
        "function" != typeof t && (t = e.i(r.d)(t));
        for (var n = this._groups, u = n.length, a = new Array(u), o = 0; o < u; ++o)
          for (var c, f = n[o], s = f.length, l = (a[o] = []), h = 0; h < s; ++h)
            (c = f[h]) && t.call(c, c.__data__, h, f) && l.push(c);
        return new i.b(a, this._parents, this._name, this._id);
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(13);
      n.a = function (t) {
        if (t._id !== this._id) throw new Error();
        for (
          var n = this._groups, e = t._groups, i = n.length, u = e.length, a = Math.min(i, u), o = new Array(i), c = 0;
          c < a;
          ++c
        )
          for (var f, s = n[c], l = e[c], h = s.length, d = (o[c] = new Array(h)), p = 0; p < h; ++p)
            (f = s[p] || l[p]) && (d[p] = f);
        for (; c < i; ++c) o[c] = n[c];
        return new r.b(o, this._parents, this._name, this._id);
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return (t + "")
          .trim()
          .split(/^|\s+/)
          .every(function (t) {
            var n = t.indexOf(".");
            return n >= 0 && (t = t.slice(0, n)), !t || "start" === t;
          });
      }
      function i(t, n, e) {
        var i,
          a,
          o = r(n) ? u.g : u.e;
        return function () {
          var r = o(this, t),
            u = r.on;
          u !== i && (a = (i = u).copy()).on(n, e), (r.on = a);
        };
      }
      var u = e(8);
      n.a = function (t, n) {
        var r = this._id;
        return arguments.length < 2 ? e.i(u.f)(this.node(), r).on.on(t) : this.each(i(r, t, n));
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return function () {
          var n = this.parentNode;
          for (var e in this.__transition) if (+e !== t) return;
          n && n.removeChild(this);
        };
      }
      n.a = function () {
        return this.on("end.remove", r(this._id));
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(3),
        i = e(13),
        u = e(8);
      n.a = function (t) {
        var n = this._name,
          a = this._id;
        "function" != typeof t && (t = e.i(r.l)(t));
        for (var o = this._groups, c = o.length, f = new Array(c), s = 0; s < c; ++s)
          for (var l, h, d = o[s], p = d.length, v = (f[s] = new Array(p)), b = 0; b < p; ++b)
            (l = d[b]) &&
              (h = t.call(l, l.__data__, b, d)) &&
              ("__data__" in l && (h.__data__ = l.__data__), (v[b] = h), e.i(u.h)(v[b], n, a, b, v, e.i(u.f)(l, a)));
        return new i.b(f, this._parents, n, a);
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(3),
        i = e(13),
        u = e(8);
      n.a = function (t) {
        var n = this._name,
          a = this._id;
        "function" != typeof t && (t = e.i(r.m)(t));
        for (var o = this._groups, c = o.length, f = [], s = [], l = 0; l < c; ++l)
          for (var h, d = o[l], p = d.length, v = 0; v < p; ++v)
            if ((h = d[v])) {
              for (var b, g = t.call(h, h.__data__, v, d), y = e.i(u.f)(h, a), _ = 0, m = g.length; _ < m; ++_)
                (b = g[_]) && e.i(u.h)(b, n, a, _, g, y);
              f.push(g), s.push(h);
            }
        return new i.b(f, s, n, a);
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(3),
        i = r.k.prototype.constructor;
      n.a = function () {
        return new i(this._groups, this._parents);
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        var r, i, u;
        return function () {
          var a = e.i(c.n)(this, t),
            o = (this.style.removeProperty(t), e.i(c.n)(this, t));
          return a === o ? null : a === r && o === i ? u : (u = n((r = a), (i = o)));
        };
      }
      function i(t) {
        return function () {
          this.style.removeProperty(t);
        };
      }
      function u(t, n, r) {
        var i, u;
        return function () {
          var a = e.i(c.n)(this, t);
          return a === r ? null : a === i ? u : (u = n((i = a), r));
        };
      }
      function a(t, n, r) {
        var i, u, a;
        return function () {
          var o = e.i(c.n)(this, t),
            f = r(this);
          return (
            null == f && (this.style.removeProperty(t), (f = e.i(c.n)(this, t))),
            o === f ? null : o === i && f === u ? a : (a = n((i = o), (u = f)))
          );
        };
      }
      var o = e(6),
        c = e(3),
        f = e(54),
        s = e(188);
      n.a = function (t, n, c) {
        var l = "transform" == (t += "") ? o.j : s.a;
        return null == n
          ? this.styleTween(t, r(t, l)).on("end.style." + t, i(t))
          : this.styleTween(t, "function" == typeof n ? a(t, l, e.i(f.b)(this, "style." + t, n)) : u(t, l, n + ""), c);
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t, n, e) {
        function r() {
          var r = this,
            i = n.apply(r, arguments);
          return (
            i &&
            function (n) {
              r.style.setProperty(t, i(n), e);
            }
          );
        }
        return (r._value = n), r;
      }
      n.a = function (t, n, e) {
        var i = "style." + (t += "");
        if (arguments.length < 2) return (i = this.tween(i)) && i._value;
        if (null == n) return this.tween(i, null);
        if ("function" != typeof n) throw new Error();
        return this.tween(i, r(t, n, null == e ? "" : e));
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return function () {
          this.textContent = t;
        };
      }
      function i(t) {
        return function () {
          var n = t(this);
          this.textContent = null == n ? "" : n;
        };
      }
      var u = e(54);
      n.a = function (t) {
        return this.tween("text", "function" == typeof t ? i(e.i(u.b)(this, "text", t)) : r(null == t ? "" : t + ""));
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(13),
        i = e(8);
      n.a = function () {
        for (var t = this._name, n = this._id, u = e.i(r.c)(), a = this._groups, o = a.length, c = 0; c < o; ++c)
          for (var f, s = a[c], l = s.length, h = 0; h < l; ++h)
            if ((f = s[h])) {
              var d = e.i(i.f)(f, n);
              e.i(i.h)(f, t, u, h, s, {
                time: d.time + d.delay + d.duration,
                delay: 0,
                duration: d.duration,
                ease: d.ease,
              });
            }
        return new r.b(a, this._parents, t, u);
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(530);
      e.d(n, "a", function () {
        return r.a;
      });
    },
    function (t, n, e) {
      "use strict";
      function r() {
        e.i(s.b)(this), (this.edge = this.site = this.circle = null);
      }
      function i(t) {
        var n = v.pop() || new r();
        return (n.site = t), n;
      }
      function u(t) {
        e.i(h.b)(t), p.e.remove(t), v.push(t), e.i(s.b)(t);
      }
      function a(t) {
        var n = t.circle,
          r = n.x,
          i = n.cy,
          a = [r, i],
          o = t.P,
          c = t.N,
          f = [t];
        u(t);
        for (var s = o; s.circle && Math.abs(r - s.circle.x) < p.b && Math.abs(i - s.circle.cy) < p.b; )
          (o = s.P), f.unshift(s), u(s), (s = o);
        f.unshift(s), e.i(h.b)(s);
        for (var l = c; l.circle && Math.abs(r - l.circle.x) < p.b && Math.abs(i - l.circle.cy) < p.b; )
          (c = l.N), f.push(l), u(l), (l = c);
        f.push(l), e.i(h.b)(l);
        var v,
          b = f.length;
        for (v = 1; v < b; ++v) (l = f[v]), (s = f[v - 1]), e.i(d.c)(l.edge, s.site, l.site, a);
        (s = f[0]), (l = f[b - 1]), (l.edge = e.i(d.d)(s.site, l.site, null, a)), e.i(h.c)(s), e.i(h.c)(l);
      }
      function o(t) {
        for (var n, r, u, a, o = t[0], s = t[1], v = p.e._; v; )
          if ((u = c(v, s) - o) > p.b) v = v.L;
          else {
            if (!((a = o - f(v, s)) > p.b)) {
              u > -p.b ? ((n = v.P), (r = v)) : a > -p.b ? ((n = v), (r = v.N)) : (n = r = v);
              break;
            }
            if (!v.R) {
              n = v;
              break;
            }
            v = v.R;
          }
        e.i(l.d)(t);
        var b = i(t);
        if ((p.e.insert(n, b), n || r)) {
          if (n === r)
            return (
              e.i(h.b)(n),
              (r = i(n.site)),
              p.e.insert(b, r),
              (b.edge = r.edge = e.i(d.d)(n.site, b.site)),
              e.i(h.c)(n),
              void e.i(h.c)(r)
            );
          if (!r) return void (b.edge = e.i(d.d)(n.site, b.site));
          e.i(h.b)(n), e.i(h.b)(r);
          var g = n.site,
            y = g[0],
            _ = g[1],
            m = t[0] - y,
            x = t[1] - _,
            w = r.site,
            M = w[0] - y,
            k = w[1] - _,
            N = 2 * (m * k - x * M),
            A = m * m + x * x,
            S = M * M + k * k,
            T = [(k * A - x * S) / N + y, (m * S - M * A) / N + _];
          e.i(d.c)(r.edge, g, w, T),
            (b.edge = e.i(d.d)(g, t, null, T)),
            (r.edge = e.i(d.d)(t, w, null, T)),
            e.i(h.c)(n),
            e.i(h.c)(r);
        }
      }
      function c(t, n) {
        var e = t.site,
          r = e[0],
          i = e[1],
          u = i - n;
        if (!u) return r;
        var a = t.P;
        if (!a) return -1 / 0;
        e = a.site;
        var o = e[0],
          c = e[1],
          f = c - n;
        if (!f) return o;
        var s = o - r,
          l = 1 / u - 1 / f,
          h = s / f;
        return l ? (-h + Math.sqrt(h * h - 2 * l * ((s * s) / (-2 * f) - c + f / 2 + i - u / 2))) / l + r : (r + o) / 2;
      }
      function f(t, n) {
        var e = t.N;
        if (e) return c(e, n);
        var r = t.site;
        return r[1] === n ? r[0] : 1 / 0;
      }
      (n.b = a), (n.a = o);
      var s = e(99),
        l = e(189),
        h = e(190),
        d = e(98),
        p = e(36),
        v = [];
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t) {
        return function () {
          return t;
        };
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        return t[0];
      }
      function i(t) {
        return t[1];
      }
      (n.a = r), (n.b = i);
    },
    function (t, n, e) {
      "use strict";
      var r = e(528),
        i = e(529),
        u = e(36);
      n.a = function () {
        function t(t) {
          return new u.a(
            t.map(function (e, r) {
              var i = [Math.round(n(e, r, t) / u.b) * u.b, Math.round(a(e, r, t) / u.b) * u.b];
              return (i.index = r), (i.data = e), i;
            }),
            o
          );
        }
        var n = i.a,
          a = i.b,
          o = null;
        return (
          (t.polygons = function (n) {
            return t(n).polygons();
          }),
          (t.links = function (n) {
            return t(n).links();
          }),
          (t.triangles = function (n) {
            return t(n).triangles();
          }),
          (t.x = function (i) {
            return arguments.length ? ((n = "function" == typeof i ? i : e.i(r.a)(+i)), t) : n;
          }),
          (t.y = function (n) {
            return arguments.length ? ((a = "function" == typeof n ? n : e.i(r.a)(+n)), t) : a;
          }),
          (t.extent = function (n) {
            return arguments.length
              ? ((o =
                  null == n
                    ? null
                    : [
                        [+n[0][0], +n[0][1]],
                        [+n[1][0], +n[1][1]],
                      ]),
                t)
              : o && [
                  [o[0][0], o[0][1]],
                  [o[1][0], o[1][1]],
                ];
          }),
          (t.size = function (n) {
            return arguments.length
              ? ((o =
                  null == n
                    ? null
                    : [
                        [0, 0],
                        [+n[0], +n[1]],
                      ]),
                t)
              : o && [o[1][0] - o[0][0], o[1][1] - o[0][1]];
          }),
          t
        );
      };
    },
    function (t, n, e) {
      "use strict";
      var r = e(535);
      e.d(n, "a", function () {
        return r.a;
      });
      var i = e(191);
      e.d(n, "b", function () {
        return i.a;
      }),
        e.d(n, "c", function () {
          return i.b;
        });
    },
    function (t, n, e) {
      "use strict";
      n.a = function (t) {
        return function () {
          return t;
        };
      };
    },
    function (t, n, e) {
      "use strict";
      function r(t, n, e) {
        (this.target = t), (this.type = n), (this.transform = e);
      }
      n.a = r;
    },
    function (t, n, e) {
      "use strict";
      function r() {
        i.r.stopImmediatePropagation();
      }
      n.b = r;
      var i = e(3);
      n.a = function () {
        i.r.preventDefault(), i.r.stopImmediatePropagation();
      };
    },
    function (t, n, e) {
      "use strict";
      function r() {
        return !h.r.button;
      }
      function i() {
        var t,
          n,
          e = this;
        return (
          e instanceof SVGElement
            ? ((e = e.ownerSVGElement || e), (t = e.width.baseVal.value), (n = e.height.baseVal.value))
            : ((t = e.clientWidth), (n = e.clientHeight)),
          [
            [0, 0],
            [t, n],
          ]
        );
      }
      function u() {
        return this.__zoom || b.b;
      }
      function a() {
        return (-h.r.deltaY * (h.r.deltaMode ? 120 : 1)) / 500;
      }
      function o() {
        return "ontouchstart" in this;
      }
      function c(t, n, e) {
        var r = t.invertX(n[0][0]) - e[0][0],
          i = t.invertX(n[1][0]) - e[1][0],
          u = t.invertY(n[0][1]) - e[0][1],
          a = t.invertY(n[1][1]) - e[1][1];
        return t.translate(
          i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i),
          a > u ? (u + a) / 2 : Math.min(0, u) || Math.max(0, a)
        );
      }
      var f = e(14),
        s = e(60),
        l = e(6),
        h = e(3),
        d = e(97),
        p = e(532),
        v = e(533),
        b = e(191),
        g = e(534);
      n.a = function () {
        function t(t) {
          t.property("__zoom", u)
            .on("wheel.zoom", M)
            .on("mousedown.zoom", k)
            .on("dblclick.zoom", N)
            .filter(L)
            .on("touchstart.zoom", A)
            .on("touchmove.zoom", S)
            .on("touchend.zoom touchcancel.zoom", T)
            .style("touch-action", "none")
            .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
        }
        function n(t, n) {
          return (n = Math.max(O[0], Math.min(O[1], n))), n === t.k ? t : new b.c(n, t.x, t.y);
        }
        function y(t, n, e) {
          var r = n[0] - e[0] * t.k,
            i = n[1] - e[1] * t.k;
          return r === t.x && i === t.y ? t : new b.c(t.k, r, i);
        }
        function _(t) {
          return [(+t[0][0] + +t[1][0]) / 2, (+t[0][1] + +t[1][1]) / 2];
        }
        function m(t, n, e) {
          t.on("start.zoom", function () {
            x(this, arguments).start();
          })
            .on("interrupt.zoom end.zoom", function () {
              x(this, arguments).end();
            })
            .tween("zoom", function () {
              var t = this,
                r = arguments,
                i = x(t, r),
                u = z.apply(t, r),
                a = e || _(u),
                o = Math.max(u[1][0] - u[0][0], u[1][1] - u[0][1]),
                c = t.__zoom,
                f = "function" == typeof n ? n.apply(t, r) : n,
                s = j(c.invert(a).concat(o / c.k), f.invert(a).concat(o / f.k));
              return function (t) {
                if (1 === t) t = f;
                else {
                  var n = s(t),
                    e = o / n[2];
                  t = new b.c(e, a[0] - n[0] * e, a[1] - n[1] * e);
                }
                i.zoom(null, t);
              };
            });
        }
        function x(t, n) {
          for (var e, r = 0, i = I.length; r < i; ++r) if ((e = I[r]).that === t) return e;
          return new w(t, n);
        }
        function w(t, n) {
          (this.that = t), (this.args = n), (this.index = -1), (this.active = 0), (this.extent = z.apply(t, n));
        }
        function M() {
          function t() {
            (r.wheel = null), r.end();
          }
          if (P.apply(this, arguments)) {
            var r = x(this, arguments),
              i = this.__zoom,
              u = Math.max(O[0], Math.min(O[1], i.k * Math.pow(2, q.apply(this, arguments)))),
              a = e.i(h.e)(this);
            if (r.wheel)
              (r.mouse[0][0] === a[0] && r.mouse[0][1] === a[1]) || (r.mouse[1] = i.invert((r.mouse[0] = a))),
                clearTimeout(r.wheel);
            else {
              if (i.k === u) return;
              (r.mouse = [a, i.invert(a)]), e.i(d.c)(this), r.start();
            }
            e.i(g.a)(),
              (r.wheel = setTimeout(t, F)),
              r.zoom("mouse", R(y(n(i, u), r.mouse[0], r.mouse[1]), r.extent, D));
          }
        }
        function k() {
          function t() {
            if ((e.i(g.a)(), !r.moved)) {
              var t = h.r.clientX - a,
                n = h.r.clientY - o;
              r.moved = t * t + n * n > H;
            }
            r.zoom("mouse", R(y(r.that.__zoom, (r.mouse[0] = e.i(h.e)(r.that)), r.mouse[1]), r.extent, D));
          }
          function n() {
            i.on("mousemove.zoom mouseup.zoom", null), e.i(s.c)(h.r.view, r.moved), e.i(g.a)(), r.end();
          }
          if (!C && P.apply(this, arguments)) {
            var r = x(this, arguments),
              i = e.i(h.i)(h.r.view).on("mousemove.zoom", t, !0).on("mouseup.zoom", n, !0),
              u = e.i(h.e)(this),
              a = h.r.clientX,
              o = h.r.clientY;
            e.i(s.b)(h.r.view), e.i(g.b)(), (r.mouse = [u, this.__zoom.invert(u)]), e.i(d.c)(this), r.start();
          }
        }
        function N() {
          if (P.apply(this, arguments)) {
            var r = this.__zoom,
              i = e.i(h.e)(this),
              u = r.invert(i),
              a = r.k * (h.r.shiftKey ? 0.5 : 2),
              o = R(y(n(r, a), i, u), z.apply(this, arguments), D);
            e.i(g.a)(),
              U > 0 ? e.i(h.i)(this).transition().duration(U).call(m, o, i) : e.i(h.i)(this).call(t.transform, o);
          }
        }
        function A() {
          if (P.apply(this, arguments)) {
            var t,
              n,
              r,
              i,
              u = x(this, arguments),
              a = h.r.changedTouches,
              o = a.length;
            for (e.i(g.b)(), n = 0; n < o; ++n)
              (r = a[n]),
                (i = e.i(h.o)(this, a, r.identifier)),
                (i = [i, this.__zoom.invert(i), r.identifier]),
                u.touch0 ? u.touch1 || (u.touch1 = i) : ((u.touch0 = i), (t = !0));
            if (E && ((E = clearTimeout(E)), !u.touch1))
              return u.end(), void ((i = e.i(h.i)(this).on("dblclick.zoom")) && i.apply(this, arguments));
            t &&
              ((E = setTimeout(function () {
                E = null;
              }, Y)),
              e.i(d.c)(this),
              u.start());
          }
        }
        function S() {
          var t,
            r,
            i,
            u,
            a = x(this, arguments),
            o = h.r.changedTouches,
            c = o.length;
          for (e.i(g.a)(), E && (E = clearTimeout(E)), t = 0; t < c; ++t)
            (r = o[t]),
              (i = e.i(h.o)(this, o, r.identifier)),
              a.touch0 && a.touch0[2] === r.identifier
                ? (a.touch0[0] = i)
                : a.touch1 && a.touch1[2] === r.identifier && (a.touch1[0] = i);
          if (((r = a.that.__zoom), a.touch1)) {
            var f = a.touch0[0],
              s = a.touch0[1],
              l = a.touch1[0],
              d = a.touch1[1],
              p = (p = l[0] - f[0]) * p + (p = l[1] - f[1]) * p,
              v = (v = d[0] - s[0]) * v + (v = d[1] - s[1]) * v;
            (r = n(r, Math.sqrt(p / v))),
              (i = [(f[0] + l[0]) / 2, (f[1] + l[1]) / 2]),
              (u = [(s[0] + d[0]) / 2, (s[1] + d[1]) / 2]);
          } else {
            if (!a.touch0) return;
            (i = a.touch0[0]), (u = a.touch0[1]);
          }
          a.zoom("touch", R(y(r, i, u), a.extent, D));
        }
        function T() {
          var t,
            n,
            r = x(this, arguments),
            i = h.r.changedTouches,
            u = i.length;
          for (
            e.i(g.b)(),
              C && clearTimeout(C),
              C = setTimeout(function () {
                C = null;
              }, Y),
              t = 0;
            t < u;
            ++t
          )
            (n = i[t]),
              r.touch0 && r.touch0[2] === n.identifier
                ? delete r.touch0
                : r.touch1 && r.touch1[2] === n.identifier && delete r.touch1;
          r.touch1 && !r.touch0 && ((r.touch0 = r.touch1), delete r.touch1),
            r.touch0 ? (r.touch0[1] = this.__zoom.invert(r.touch0[0])) : r.end();
        }
        var E,
          C,
          P = r,
          z = i,
          R = c,
          q = a,
          L = o,
          O = [0, 1 / 0],
          D = [
            [-1 / 0, -1 / 0],
            [1 / 0, 1 / 0],
          ],
          U = 250,
          j = l.l,
          I = [],
          B = e.i(f.a)("start", "zoom", "end"),
          Y = 500,
          F = 150,
          H = 0;
        return (
          (t.transform = function (t, n) {
            var e = t.selection ? t.selection() : t;
            e.property("__zoom", u),
              t !== e
                ? m(t, n)
                : e.interrupt().each(function () {
                    x(this, arguments)
                      .start()
                      .zoom(null, "function" == typeof n ? n.apply(this, arguments) : n)
                      .end();
                  });
          }),
          (t.scaleBy = function (n, e) {
            t.scaleTo(n, function () {
              return this.__zoom.k * ("function" == typeof e ? e.apply(this, arguments) : e);
            });
          }),
          (t.scaleTo = function (e, r) {
            t.transform(e, function () {
              var t = z.apply(this, arguments),
                e = this.__zoom,
                i = _(t),
                u = e.invert(i),
                a = "function" == typeof r ? r.apply(this, arguments) : r;
              return R(y(n(e, a), i, u), t, D);
            });
          }),
          (t.translateBy = function (n, e, r) {
            t.transform(n, function () {
              return R(
                this.__zoom.translate(
                  "function" == typeof e ? e.apply(this, arguments) : e,
                  "function" == typeof r ? r.apply(this, arguments) : r
                ),
                z.apply(this, arguments),
                D
              );
            });
          }),
          (t.translateTo = function (n, e, r) {
            t.transform(n, function () {
              var t = z.apply(this, arguments),
                n = this.__zoom,
                i = _(t);
              return R(
                b.b
                  .translate(i[0], i[1])
                  .scale(n.k)
                  .translate(
                    "function" == typeof e ? -e.apply(this, arguments) : -e,
                    "function" == typeof r ? -r.apply(this, arguments) : -r
                  ),
                t,
                D
              );
            });
          }),
          (w.prototype = {
            start: function () {
              return 1 == ++this.active && ((this.index = I.push(this) - 1), this.emit("start")), this;
            },
            zoom: function (t, n) {
              return (
                this.mouse && "mouse" !== t && (this.mouse[1] = n.invert(this.mouse[0])),
                this.touch0 && "touch" !== t && (this.touch0[1] = n.invert(this.touch0[0])),
                this.touch1 && "touch" !== t && (this.touch1[1] = n.invert(this.touch1[0])),
                (this.that.__zoom = n),
                this.emit("zoom"),
                this
              );
            },
            end: function () {
              return 0 == --this.active && (I.splice(this.index, 1), (this.index = -1), this.emit("end")), this;
            },
            emit: function (n) {
              e.i(h.s)(new v.a(t, n, this.that.__zoom), B.apply, B, [n, this.that, this.args]);
            },
          }),
          (t.wheelDelta = function (n) {
            return arguments.length ? ((q = "function" == typeof n ? n : e.i(p.a)(+n)), t) : q;
          }),
          (t.filter = function (n) {
            return arguments.length ? ((P = "function" == typeof n ? n : e.i(p.a)(!!n)), t) : P;
          }),
          (t.touchable = function (n) {
            return arguments.length ? ((L = "function" == typeof n ? n : e.i(p.a)(!!n)), t) : L;
          }),
          (t.extent = function (n) {
            return arguments.length
              ? ((z =
                  "function" == typeof n
                    ? n
                    : e.i(p.a)([
                        [+n[0][0], +n[0][1]],
                        [+n[1][0], +n[1][1]],
                      ])),
                t)
              : z;
          }),
          (t.scaleExtent = function (n) {
            return arguments.length ? ((O[0] = +n[0]), (O[1] = +n[1]), t) : [O[0], O[1]];
          }),
          (t.translateExtent = function (n) {
            return arguments.length
              ? ((D[0][0] = +n[0][0]), (D[1][0] = +n[1][0]), (D[0][1] = +n[0][1]), (D[1][1] = +n[1][1]), t)
              : [
                  [D[0][0], D[0][1]],
                  [D[1][0], D[1][1]],
                ];
          }),
          (t.constrain = function (n) {
            return arguments.length ? ((R = n), t) : R;
          }),
          (t.duration = function (n) {
            return arguments.length ? ((U = +n), t) : U;
          }),
          (t.interpolate = function (n) {
            return arguments.length ? ((j = n), t) : j;
          }),
          (t.on = function () {
            var n = B.on.apply(B, arguments);
            return n === B ? t : n;
          }),
          (t.clickDistance = function (n) {
            return arguments.length ? ((H = (n = +n) * n), t) : Math.sqrt(H);
          }),
          t
        );
      };
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "a", function () {
        return r;
      });
      var r = "4.13.0";
    },
    function (t, n) {},
  ]);
});
