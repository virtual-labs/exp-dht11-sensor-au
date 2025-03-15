(function () {
  const n = document.createElement("link").relList;
  if (n && n.supports && n.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) r(i);
  new MutationObserver((i) => {
    for (const o of i)
      if (o.type === "childList")
        for (const s of o.addedNodes)
          s.tagName === "LINK" && s.rel === "modulepreload" && r(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function e(i) {
    const o = {};
    return (
      i.integrity && (o.integrity = i.integrity),
      i.referrerPolicy && (o.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : i.crossOrigin === "anonymous"
        ? (o.credentials = "omit")
        : (o.credentials = "same-origin"),
      o
    );
  }
  function r(i) {
    if (i.ep) return;
    i.ep = !0;
    const o = e(i);
    fetch(i.href, o);
  }
})();
var Tn = { value: () => {} };
function nn() {
  for (var t = 0, n = arguments.length, e = {}, r; t < n; ++t) {
    if (!(r = arguments[t] + "") || r in e || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    e[r] = [];
  }
  return new rt(e);
}
function rt(t) {
  this._ = t;
}
function kn(t, n) {
  return t
    .trim()
    .split(/^|\s+/)
    .map(function (e) {
      var r = "",
        i = e.indexOf(".");
      if (
        (i >= 0 && ((r = e.slice(i + 1)), (e = e.slice(0, i))),
        e && !n.hasOwnProperty(e))
      )
        throw new Error("unknown type: " + e);
      return { type: e, name: r };
    });
}
rt.prototype = nn.prototype = {
  constructor: rt,
  on: function (t, n) {
    var e = this._,
      r = kn(t + "", e),
      i,
      o = -1,
      s = r.length;
    if (arguments.length < 2) {
      for (; ++o < s; )
        if ((i = (t = r[o]).type) && (i = Mn(e[i], t.name))) return i;
      return;
    }
    if (n != null && typeof n != "function")
      throw new Error("invalid callback: " + n);
    for (; ++o < s; )
      if ((i = (t = r[o]).type)) e[i] = Ot(e[i], t.name, n);
      else if (n == null) for (i in e) e[i] = Ot(e[i], t.name, null);
    return this;
  },
  copy: function () {
    var t = {},
      n = this._;
    for (var e in n) t[e] = n[e].slice();
    return new rt(t);
  },
  call: function (t, n) {
    if ((i = arguments.length - 2) > 0)
      for (var e = new Array(i), r = 0, i, o; r < i; ++r)
        e[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (o = this._[t], r = 0, i = o.length; r < i; ++r) o[r].value.apply(n, e);
  },
  apply: function (t, n, e) {
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (var r = this._[t], i = 0, o = r.length; i < o; ++i)
      r[i].value.apply(n, e);
  },
};
function Mn(t, n) {
  for (var e = 0, r = t.length, i; e < r; ++e)
    if ((i = t[e]).name === n) return i.value;
}
function Ot(t, n, e) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === n) {
      (t[r] = Tn), (t = t.slice(0, r).concat(t.slice(r + 1)));
      break;
    }
  return e != null && t.push({ name: n, value: e }), t;
}
var yt = "http://www.w3.org/1999/xhtml";
const Gt = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: yt,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/",
};
function ht(t) {
  var n = (t += ""),
    e = n.indexOf(":");
  return (
    e >= 0 && (n = t.slice(0, e)) !== "xmlns" && (t = t.slice(e + 1)),
    Gt.hasOwnProperty(n) ? { space: Gt[n], local: t } : t
  );
}
function Sn(t) {
  return function () {
    var n = this.ownerDocument,
      e = this.namespaceURI;
    return e === yt && n.documentElement.namespaceURI === yt
      ? n.createElement(t)
      : n.createElementNS(e, t);
  };
}
function Rn(t) {
  return function () {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function en(t) {
  var n = ht(t);
  return (n.local ? Rn : Sn)(n);
}
function Ln() {}
function At(t) {
  return t == null
    ? Ln
    : function () {
        return this.querySelector(t);
      };
}
function On(t) {
  typeof t != "function" && (t = At(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (
      var o = n[i], s = o.length, c = (r[i] = new Array(s)), a, l, u = 0;
      u < s;
      ++u
    )
      (a = o[u]) &&
        (l = t.call(a, a.__data__, u, o)) &&
        ("__data__" in a && (l.__data__ = a.__data__), (c[u] = l));
  return new m(r, this._parents);
}
function Gn(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Dn() {
  return [];
}
function rn(t) {
  return t == null
    ? Dn
    : function () {
        return this.querySelectorAll(t);
      };
}
function Hn(t) {
  return function () {
    return Gn(t.apply(this, arguments));
  };
}
function Bn(t) {
  typeof t == "function" ? (t = Hn(t)) : (t = rn(t));
  for (var n = this._groups, e = n.length, r = [], i = [], o = 0; o < e; ++o)
    for (var s = n[o], c = s.length, a, l = 0; l < c; ++l)
      (a = s[l]) && (r.push(t.call(a, a.__data__, l, s)), i.push(a));
  return new m(r, i);
}
function on(t) {
  return function () {
    return this.matches(t);
  };
}
function sn(t) {
  return function (n) {
    return n.matches(t);
  };
}
var Xn = Array.prototype.find;
function qn(t) {
  return function () {
    return Xn.call(this.children, t);
  };
}
function Fn() {
  return this.firstElementChild;
}
function Vn(t) {
  return this.select(t == null ? Fn : qn(typeof t == "function" ? t : sn(t)));
}
var Yn = Array.prototype.filter;
function zn() {
  return Array.from(this.children);
}
function Un(t) {
  return function () {
    return Yn.call(this.children, t);
  };
}
function Wn(t) {
  return this.selectAll(
    t == null ? zn : Un(typeof t == "function" ? t : sn(t))
  );
}
function Kn(t) {
  typeof t != "function" && (t = on(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, c = (r[i] = []), a, l = 0; l < s; ++l)
      (a = o[l]) && t.call(a, a.__data__, l, o) && c.push(a);
  return new m(r, this._parents);
}
function cn(t) {
  return new Array(t.length);
}
function Zn() {
  return new m(this._enter || this._groups.map(cn), this._parents);
}
function st(t, n) {
  (this.ownerDocument = t.ownerDocument),
    (this.namespaceURI = t.namespaceURI),
    (this._next = null),
    (this._parent = t),
    (this.__data__ = n);
}
st.prototype = {
  constructor: st,
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
};
function Qn(t) {
  return function () {
    return t;
  };
}
function Jn(t, n, e, r, i, o) {
  for (var s = 0, c, a = n.length, l = o.length; s < l; ++s)
    (c = n[s]) ? ((c.__data__ = o[s]), (r[s] = c)) : (e[s] = new st(t, o[s]));
  for (; s < a; ++s) (c = n[s]) && (i[s] = c);
}
function jn(t, n, e, r, i, o, s) {
  var c,
    a,
    l = new Map(),
    u = n.length,
    f = o.length,
    h = new Array(u),
    p;
  for (c = 0; c < u; ++c)
    (a = n[c]) &&
      ((h[c] = p = s.call(a, a.__data__, c, n) + ""),
      l.has(p) ? (i[c] = a) : l.set(p, a));
  for (c = 0; c < f; ++c)
    (p = s.call(t, o[c], c, o) + ""),
      (a = l.get(p))
        ? ((r[c] = a), (a.__data__ = o[c]), l.delete(p))
        : (e[c] = new st(t, o[c]));
  for (c = 0; c < u; ++c) (a = n[c]) && l.get(h[c]) === a && (i[c] = a);
}
function te(t) {
  return t.__data__;
}
function ne(t, n) {
  if (!arguments.length) return Array.from(this, te);
  var e = n ? jn : Jn,
    r = this._parents,
    i = this._groups;
  typeof t != "function" && (t = Qn(t));
  for (
    var o = i.length,
      s = new Array(o),
      c = new Array(o),
      a = new Array(o),
      l = 0;
    l < o;
    ++l
  ) {
    var u = r[l],
      f = i[l],
      h = f.length,
      p = ee(t.call(u, u && u.__data__, l, r)),
      d = p.length,
      g = (c[l] = new Array(d)),
      N = (s[l] = new Array(d)),
      J = (a[l] = new Array(h));
    e(u, f, g, N, J, p, n);
    for (var A = 0, T = 0, G, X; A < d; ++A)
      if ((G = g[A])) {
        for (A >= T && (T = A + 1); !(X = N[T]) && ++T < d; );
        G._next = X || null;
      }
  }
  return (s = new m(s, r)), (s._enter = c), (s._exit = a), s;
}
function ee(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function re() {
  return new m(this._exit || this._groups.map(cn), this._parents);
}
function ie(t, n, e) {
  var r = this.enter(),
    i = this,
    o = this.exit();
  return (
    typeof t == "function"
      ? ((r = t(r)), r && (r = r.selection()))
      : (r = r.append(t + "")),
    n != null && ((i = n(i)), i && (i = i.selection())),
    e == null ? o.remove() : e(o),
    r && i ? r.merge(i).order() : i
  );
}
function oe(t) {
  for (
    var n = t.selection ? t.selection() : t,
      e = this._groups,
      r = n._groups,
      i = e.length,
      o = r.length,
      s = Math.min(i, o),
      c = new Array(i),
      a = 0;
    a < s;
    ++a
  )
    for (
      var l = e[a], u = r[a], f = l.length, h = (c[a] = new Array(f)), p, d = 0;
      d < f;
      ++d
    )
      (p = l[d] || u[d]) && (h[d] = p);
  for (; a < i; ++a) c[a] = e[a];
  return new m(c, this._parents);
}
function se() {
  for (var t = this._groups, n = -1, e = t.length; ++n < e; )
    for (var r = t[n], i = r.length - 1, o = r[i], s; --i >= 0; )
      (s = r[i]) &&
        (o &&
          s.compareDocumentPosition(o) ^ 4 &&
          o.parentNode.insertBefore(s, o),
        (o = s));
  return this;
}
function ce(t) {
  t || (t = ae);
  function n(f, h) {
    return f && h ? t(f.__data__, h.__data__) : !f - !h;
  }
  for (
    var e = this._groups, r = e.length, i = new Array(r), o = 0;
    o < r;
    ++o
  ) {
    for (
      var s = e[o], c = s.length, a = (i[o] = new Array(c)), l, u = 0;
      u < c;
      ++u
    )
      (l = s[u]) && (a[u] = l);
    a.sort(n);
  }
  return new m(i, this._parents).order();
}
function ae(t, n) {
  return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
function le() {
  var t = arguments[0];
  return (arguments[0] = this), t.apply(null, arguments), this;
}
function ue() {
  return Array.from(this);
}
function fe() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
      var s = r[i];
      if (s) return s;
    }
  return null;
}
function he() {
  let t = 0;
  for (const n of this) ++t;
  return t;
}
function pe() {
  return !this.node();
}
function de(t) {
  for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
    for (var i = n[e], o = 0, s = i.length, c; o < s; ++o)
      (c = i[o]) && t.call(c, c.__data__, o, i);
  return this;
}
function ge(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function _e(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function ye(t, n) {
  return function () {
    this.setAttribute(t, n);
  };
}
function me(t, n) {
  return function () {
    this.setAttributeNS(t.space, t.local, n);
  };
}
function we(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null ? this.removeAttribute(t) : this.setAttribute(t, e);
  };
}
function xe(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null
      ? this.removeAttributeNS(t.space, t.local)
      : this.setAttributeNS(t.space, t.local, e);
  };
}
function ve(t, n) {
  var e = ht(t);
  if (arguments.length < 2) {
    var r = this.node();
    return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e);
  }
  return this.each(
    (n == null
      ? e.local
        ? _e
        : ge
      : typeof n == "function"
      ? e.local
        ? xe
        : we
      : e.local
      ? me
      : ye)(e, n)
  );
}
function an(t) {
  return (
    (t.ownerDocument && t.ownerDocument.defaultView) ||
    (t.document && t) ||
    t.defaultView
  );
}
function be(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function $e(t, n, e) {
  return function () {
    this.style.setProperty(t, n, e);
  };
}
function Ee(t, n, e) {
  return function () {
    var r = n.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, e);
  };
}
function Ne(t, n, e) {
  return arguments.length > 1
    ? this.each(
        (n == null ? be : typeof n == "function" ? Ee : $e)(t, n, e ?? "")
      )
    : H(this.node(), t);
}
function H(t, n) {
  return (
    t.style.getPropertyValue(n) ||
    an(t).getComputedStyle(t, null).getPropertyValue(n)
  );
}
function Ie(t) {
  return function () {
    delete this[t];
  };
}
function Ce(t, n) {
  return function () {
    this[t] = n;
  };
}
function Ae(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null ? delete this[t] : (this[t] = e);
  };
}
function Pe(t, n) {
  return arguments.length > 1
    ? this.each((n == null ? Ie : typeof n == "function" ? Ae : Ce)(t, n))
    : this.node()[t];
}
function ln(t) {
  return t.trim().split(/^|\s+/);
}
function Pt(t) {
  return t.classList || new un(t);
}
function un(t) {
  (this._node = t), (this._names = ln(t.getAttribute("class") || ""));
}
un.prototype = {
  add: function (t) {
    var n = this._names.indexOf(t);
    n < 0 &&
      (this._names.push(t),
      this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function (t) {
    var n = this._names.indexOf(t);
    n >= 0 &&
      (this._names.splice(n, 1),
      this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function (t) {
    return this._names.indexOf(t) >= 0;
  },
};
function fn(t, n) {
  for (var e = Pt(t), r = -1, i = n.length; ++r < i; ) e.add(n[r]);
}
function hn(t, n) {
  for (var e = Pt(t), r = -1, i = n.length; ++r < i; ) e.remove(n[r]);
}
function Te(t) {
  return function () {
    fn(this, t);
  };
}
function ke(t) {
  return function () {
    hn(this, t);
  };
}
function Me(t, n) {
  return function () {
    (n.apply(this, arguments) ? fn : hn)(this, t);
  };
}
function Se(t, n) {
  var e = ln(t + "");
  if (arguments.length < 2) {
    for (var r = Pt(this.node()), i = -1, o = e.length; ++i < o; )
      if (!r.contains(e[i])) return !1;
    return !0;
  }
  return this.each((typeof n == "function" ? Me : n ? Te : ke)(e, n));
}
function Re() {
  this.textContent = "";
}
function Le(t) {
  return function () {
    this.textContent = t;
  };
}
function Oe(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.textContent = n ?? "";
  };
}
function Ge(t) {
  return arguments.length
    ? this.each(t == null ? Re : (typeof t == "function" ? Oe : Le)(t))
    : this.node().textContent;
}
function De() {
  this.innerHTML = "";
}
function He(t) {
  return function () {
    this.innerHTML = t;
  };
}
function Be(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.innerHTML = n ?? "";
  };
}
function Xe(t) {
  return arguments.length
    ? this.each(t == null ? De : (typeof t == "function" ? Be : He)(t))
    : this.node().innerHTML;
}
function qe() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Fe() {
  return this.each(qe);
}
function Ve() {
  this.previousSibling &&
    this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Ye() {
  return this.each(Ve);
}
function ze(t) {
  var n = typeof t == "function" ? t : en(t);
  return this.select(function () {
    return this.appendChild(n.apply(this, arguments));
  });
}
function Ue() {
  return null;
}
function We(t, n) {
  var e = typeof t == "function" ? t : en(t),
    r = n == null ? Ue : typeof n == "function" ? n : At(n);
  return this.select(function () {
    return this.insertBefore(
      e.apply(this, arguments),
      r.apply(this, arguments) || null
    );
  });
}
function Ke() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Ze() {
  return this.each(Ke);
}
function Qe() {
  var t = this.cloneNode(!1),
    n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function Je() {
  var t = this.cloneNode(!0),
    n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function je(t) {
  return this.select(t ? Je : Qe);
}
function tr(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function nr(t) {
  return function (n) {
    t.call(this, n, this.__data__);
  };
}
function er(t) {
  return t
    .trim()
    .split(/^|\s+/)
    .map(function (n) {
      var e = "",
        r = n.indexOf(".");
      return (
        r >= 0 && ((e = n.slice(r + 1)), (n = n.slice(0, r))),
        { type: n, name: e }
      );
    });
}
function rr(t) {
  return function () {
    var n = this.__on;
    if (n) {
      for (var e = 0, r = -1, i = n.length, o; e < i; ++e)
        (o = n[e]),
          (!t.type || o.type === t.type) && o.name === t.name
            ? this.removeEventListener(o.type, o.listener, o.options)
            : (n[++r] = o);
      ++r ? (n.length = r) : delete this.__on;
    }
  };
}
function ir(t, n, e) {
  return function () {
    var r = this.__on,
      i,
      o = nr(n);
    if (r) {
      for (var s = 0, c = r.length; s < c; ++s)
        if ((i = r[s]).type === t.type && i.name === t.name) {
          this.removeEventListener(i.type, i.listener, i.options),
            this.addEventListener(i.type, (i.listener = o), (i.options = e)),
            (i.value = n);
          return;
        }
    }
    this.addEventListener(t.type, o, e),
      (i = { type: t.type, name: t.name, value: n, listener: o, options: e }),
      r ? r.push(i) : (this.__on = [i]);
  };
}
function or(t, n, e) {
  var r = er(t + ""),
    i,
    o = r.length,
    s;
  if (arguments.length < 2) {
    var c = this.node().__on;
    if (c) {
      for (var a = 0, l = c.length, u; a < l; ++a)
        for (i = 0, u = c[a]; i < o; ++i)
          if ((s = r[i]).type === u.type && s.name === u.name) return u.value;
    }
    return;
  }
  for (c = n ? ir : rr, i = 0; i < o; ++i) this.each(c(r[i], n, e));
  return this;
}
function pn(t, n, e) {
  var r = an(t),
    i = r.CustomEvent;
  typeof i == "function"
    ? (i = new i(n, e))
    : ((i = r.document.createEvent("Event")),
      e
        ? (i.initEvent(n, e.bubbles, e.cancelable), (i.detail = e.detail))
        : i.initEvent(n, !1, !1)),
    t.dispatchEvent(i);
}
function sr(t, n) {
  return function () {
    return pn(this, t, n);
  };
}
function cr(t, n) {
  return function () {
    return pn(this, t, n.apply(this, arguments));
  };
}
function ar(t, n) {
  return this.each((typeof n == "function" ? cr : sr)(t, n));
}
function* lr() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length, s; i < o; ++i)
      (s = r[i]) && (yield s);
}
var dn = [null];
function m(t, n) {
  (this._groups = t), (this._parents = n);
}
function Z() {
  return new m([[document.documentElement]], dn);
}
function ur() {
  return this;
}
m.prototype = Z.prototype = {
  constructor: m,
  select: On,
  selectAll: Bn,
  selectChild: Vn,
  selectChildren: Wn,
  filter: Kn,
  data: ne,
  enter: Zn,
  exit: re,
  join: ie,
  merge: oe,
  selection: ur,
  order: se,
  sort: ce,
  call: le,
  nodes: ue,
  node: fe,
  size: he,
  empty: pe,
  each: de,
  attr: ve,
  style: Ne,
  property: Pe,
  classed: Se,
  text: Ge,
  html: Xe,
  raise: Fe,
  lower: Ye,
  append: ze,
  insert: We,
  remove: Ze,
  clone: je,
  datum: tr,
  on: or,
  dispatch: ar,
  [Symbol.iterator]: lr,
};
function mt(t) {
  return typeof t == "string"
    ? new m([[document.querySelector(t)]], [document.documentElement])
    : new m([[t]], dn);
}
function Tt(t, n, e) {
  (t.prototype = n.prototype = e), (e.constructor = t);
}
function gn(t, n) {
  var e = Object.create(t.prototype);
  for (var r in n) e[r] = n[r];
  return e;
}
function Q() {}
var z = 0.7,
  ct = 1 / z,
  D = "\\s*([+-]?\\d+)\\s*",
  U = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  $ = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  fr = /^#([0-9a-f]{3,8})$/,
  hr = new RegExp(`^rgb\\(${D},${D},${D}\\)$`),
  pr = new RegExp(`^rgb\\(${$},${$},${$}\\)$`),
  dr = new RegExp(`^rgba\\(${D},${D},${D},${U}\\)$`),
  gr = new RegExp(`^rgba\\(${$},${$},${$},${U}\\)$`),
  _r = new RegExp(`^hsl\\(${U},${$},${$}\\)$`),
  yr = new RegExp(`^hsla\\(${U},${$},${$},${U}\\)$`),
  Dt = {
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
Tt(Q, W, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Ht,
  formatHex: Ht,
  formatHex8: mr,
  formatHsl: wr,
  formatRgb: Bt,
  toString: Bt,
});
function Ht() {
  return this.rgb().formatHex();
}
function mr() {
  return this.rgb().formatHex8();
}
function wr() {
  return _n(this).formatHsl();
}
function Bt() {
  return this.rgb().formatRgb();
}
function W(t) {
  var n, e;
  return (
    (t = (t + "").trim().toLowerCase()),
    (n = fr.exec(t))
      ? ((e = n[1].length),
        (n = parseInt(n[1], 16)),
        e === 6
          ? Xt(n)
          : e === 3
          ? new y(
              ((n >> 8) & 15) | ((n >> 4) & 240),
              ((n >> 4) & 15) | (n & 240),
              ((n & 15) << 4) | (n & 15),
              1
            )
          : e === 8
          ? j((n >> 24) & 255, (n >> 16) & 255, (n >> 8) & 255, (n & 255) / 255)
          : e === 4
          ? j(
              ((n >> 12) & 15) | ((n >> 8) & 240),
              ((n >> 8) & 15) | ((n >> 4) & 240),
              ((n >> 4) & 15) | (n & 240),
              (((n & 15) << 4) | (n & 15)) / 255
            )
          : null)
      : (n = hr.exec(t))
      ? new y(n[1], n[2], n[3], 1)
      : (n = pr.exec(t))
      ? new y((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, 1)
      : (n = dr.exec(t))
      ? j(n[1], n[2], n[3], n[4])
      : (n = gr.exec(t))
      ? j((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, n[4])
      : (n = _r.exec(t))
      ? Vt(n[1], n[2] / 100, n[3] / 100, 1)
      : (n = yr.exec(t))
      ? Vt(n[1], n[2] / 100, n[3] / 100, n[4])
      : Dt.hasOwnProperty(t)
      ? Xt(Dt[t])
      : t === "transparent"
      ? new y(NaN, NaN, NaN, 0)
      : null
  );
}
function Xt(t) {
  return new y((t >> 16) & 255, (t >> 8) & 255, t & 255, 1);
}
function j(t, n, e, r) {
  return r <= 0 && (t = n = e = NaN), new y(t, n, e, r);
}
function xr(t) {
  return (
    t instanceof Q || (t = W(t)),
    t ? ((t = t.rgb()), new y(t.r, t.g, t.b, t.opacity)) : new y()
  );
}
function wt(t, n, e, r) {
  return arguments.length === 1 ? xr(t) : new y(t, n, e, r ?? 1);
}
function y(t, n, e, r) {
  (this.r = +t), (this.g = +n), (this.b = +e), (this.opacity = +r);
}
Tt(
  y,
  wt,
  gn(Q, {
    brighter(t) {
      return (
        (t = t == null ? ct : Math.pow(ct, t)),
        new y(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? z : Math.pow(z, t)),
        new y(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    rgb() {
      return this;
    },
    clamp() {
      return new y(R(this.r), R(this.g), R(this.b), at(this.opacity));
    },
    displayable() {
      return (
        -0.5 <= this.r &&
        this.r < 255.5 &&
        -0.5 <= this.g &&
        this.g < 255.5 &&
        -0.5 <= this.b &&
        this.b < 255.5 &&
        0 <= this.opacity &&
        this.opacity <= 1
      );
    },
    hex: qt,
    formatHex: qt,
    formatHex8: vr,
    formatRgb: Ft,
    toString: Ft,
  })
);
function qt() {
  return `#${M(this.r)}${M(this.g)}${M(this.b)}`;
}
function vr() {
  return `#${M(this.r)}${M(this.g)}${M(this.b)}${M(
    (isNaN(this.opacity) ? 1 : this.opacity) * 255
  )}`;
}
function Ft() {
  const t = at(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${R(this.r)}, ${R(this.g)}, ${R(
    this.b
  )}${t === 1 ? ")" : `, ${t})`}`;
}
function at(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function R(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function M(t) {
  return (t = R(t)), (t < 16 ? "0" : "") + t.toString(16);
}
function Vt(t, n, e, r) {
  return (
    r <= 0
      ? (t = n = e = NaN)
      : e <= 0 || e >= 1
      ? (t = n = NaN)
      : n <= 0 && (t = NaN),
    new w(t, n, e, r)
  );
}
function _n(t) {
  if (t instanceof w) return new w(t.h, t.s, t.l, t.opacity);
  if ((t instanceof Q || (t = W(t)), !t)) return new w();
  if (t instanceof w) return t;
  t = t.rgb();
  var n = t.r / 255,
    e = t.g / 255,
    r = t.b / 255,
    i = Math.min(n, e, r),
    o = Math.max(n, e, r),
    s = NaN,
    c = o - i,
    a = (o + i) / 2;
  return (
    c
      ? (n === o
          ? (s = (e - r) / c + (e < r) * 6)
          : e === o
          ? (s = (r - n) / c + 2)
          : (s = (n - e) / c + 4),
        (c /= a < 0.5 ? o + i : 2 - o - i),
        (s *= 60))
      : (c = a > 0 && a < 1 ? 0 : s),
    new w(s, c, a, t.opacity)
  );
}
function br(t, n, e, r) {
  return arguments.length === 1 ? _n(t) : new w(t, n, e, r ?? 1);
}
function w(t, n, e, r) {
  (this.h = +t), (this.s = +n), (this.l = +e), (this.opacity = +r);
}
Tt(
  w,
  br,
  gn(Q, {
    brighter(t) {
      return (
        (t = t == null ? ct : Math.pow(ct, t)),
        new w(this.h, this.s, this.l * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? z : Math.pow(z, t)),
        new w(this.h, this.s, this.l * t, this.opacity)
      );
    },
    rgb() {
      var t = (this.h % 360) + (this.h < 0) * 360,
        n = isNaN(t) || isNaN(this.s) ? 0 : this.s,
        e = this.l,
        r = e + (e < 0.5 ? e : 1 - e) * n,
        i = 2 * e - r;
      return new y(
        gt(t >= 240 ? t - 240 : t + 120, i, r),
        gt(t, i, r),
        gt(t < 120 ? t + 240 : t - 120, i, r),
        this.opacity
      );
    },
    clamp() {
      return new w(Yt(this.h), tt(this.s), tt(this.l), at(this.opacity));
    },
    displayable() {
      return (
        ((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
        0 <= this.l &&
        this.l <= 1 &&
        0 <= this.opacity &&
        this.opacity <= 1
      );
    },
    formatHsl() {
      const t = at(this.opacity);
      return `${t === 1 ? "hsl(" : "hsla("}${Yt(this.h)}, ${
        tt(this.s) * 100
      }%, ${tt(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
    },
  })
);
function Yt(t) {
  return (t = (t || 0) % 360), t < 0 ? t + 360 : t;
}
function tt(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function gt(t, n, e) {
  return (
    (t < 60
      ? n + ((e - n) * t) / 60
      : t < 180
      ? e
      : t < 240
      ? n + ((e - n) * (240 - t)) / 60
      : n) * 255
  );
}
const yn = (t) => () => t;
function $r(t, n) {
  return function (e) {
    return t + e * n;
  };
}
function Er(t, n, e) {
  return (
    (t = Math.pow(t, e)),
    (n = Math.pow(n, e) - t),
    (e = 1 / e),
    function (r) {
      return Math.pow(t + r * n, e);
    }
  );
}
function Nr(t) {
  return (t = +t) == 1
    ? mn
    : function (n, e) {
        return e - n ? Er(n, e, t) : yn(isNaN(n) ? e : n);
      };
}
function mn(t, n) {
  var e = n - t;
  return e ? $r(t, e) : yn(isNaN(t) ? n : t);
}
const zt = (function t(n) {
  var e = Nr(n);
  function r(i, o) {
    var s = e((i = wt(i)).r, (o = wt(o)).r),
      c = e(i.g, o.g),
      a = e(i.b, o.b),
      l = mn(i.opacity, o.opacity);
    return function (u) {
      return (
        (i.r = s(u)), (i.g = c(u)), (i.b = a(u)), (i.opacity = l(u)), i + ""
      );
    };
  }
  return (r.gamma = t), r;
})(1);
function P(t, n) {
  return (
    (t = +t),
    (n = +n),
    function (e) {
      return t * (1 - e) + n * e;
    }
  );
}
var xt = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  _t = new RegExp(xt.source, "g");
function Ir(t) {
  return function () {
    return t;
  };
}
function Cr(t) {
  return function (n) {
    return t(n) + "";
  };
}
function Ar(t, n) {
  var e = (xt.lastIndex = _t.lastIndex = 0),
    r,
    i,
    o,
    s = -1,
    c = [],
    a = [];
  for (t = t + "", n = n + ""; (r = xt.exec(t)) && (i = _t.exec(n)); )
    (o = i.index) > e &&
      ((o = n.slice(e, o)), c[s] ? (c[s] += o) : (c[++s] = o)),
      (r = r[0]) === (i = i[0])
        ? c[s]
          ? (c[s] += i)
          : (c[++s] = i)
        : ((c[++s] = null), a.push({ i: s, x: P(r, i) })),
      (e = _t.lastIndex);
  return (
    e < n.length && ((o = n.slice(e)), c[s] ? (c[s] += o) : (c[++s] = o)),
    c.length < 2
      ? a[0]
        ? Cr(a[0].x)
        : Ir(n)
      : ((n = a.length),
        function (l) {
          for (var u = 0, f; u < n; ++u) c[(f = a[u]).i] = f.x(l);
          return c.join("");
        })
  );
}
var Ut = 180 / Math.PI,
  vt = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1,
  };
function wn(t, n, e, r, i, o) {
  var s, c, a;
  return (
    (s = Math.sqrt(t * t + n * n)) && ((t /= s), (n /= s)),
    (a = t * e + n * r) && ((e -= t * a), (r -= n * a)),
    (c = Math.sqrt(e * e + r * r)) && ((e /= c), (r /= c), (a /= c)),
    t * r < n * e && ((t = -t), (n = -n), (a = -a), (s = -s)),
    {
      translateX: i,
      translateY: o,
      rotate: Math.atan2(n, t) * Ut,
      skewX: Math.atan(a) * Ut,
      scaleX: s,
      scaleY: c,
    }
  );
}
var nt;
function Pr(t) {
  const n = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(
    t + ""
  );
  return n.isIdentity ? vt : wn(n.a, n.b, n.c, n.d, n.e, n.f);
}
function Tr(t) {
  return t == null ||
    (nt || (nt = document.createElementNS("http://www.w3.org/2000/svg", "g")),
    nt.setAttribute("transform", t),
    !(t = nt.transform.baseVal.consolidate()))
    ? vt
    : ((t = t.matrix), wn(t.a, t.b, t.c, t.d, t.e, t.f));
}
function xn(t, n, e, r) {
  function i(l) {
    return l.length ? l.pop() + " " : "";
  }
  function o(l, u, f, h, p, d) {
    if (l !== f || u !== h) {
      var g = p.push("translate(", null, n, null, e);
      d.push({ i: g - 4, x: P(l, f) }, { i: g - 2, x: P(u, h) });
    } else (f || h) && p.push("translate(" + f + n + h + e);
  }
  function s(l, u, f, h) {
    l !== u
      ? (l - u > 180 ? (u += 360) : u - l > 180 && (l += 360),
        h.push({ i: f.push(i(f) + "rotate(", null, r) - 2, x: P(l, u) }))
      : u && f.push(i(f) + "rotate(" + u + r);
  }
  function c(l, u, f, h) {
    l !== u
      ? h.push({ i: f.push(i(f) + "skewX(", null, r) - 2, x: P(l, u) })
      : u && f.push(i(f) + "skewX(" + u + r);
  }
  function a(l, u, f, h, p, d) {
    if (l !== f || u !== h) {
      var g = p.push(i(p) + "scale(", null, ",", null, ")");
      d.push({ i: g - 4, x: P(l, f) }, { i: g - 2, x: P(u, h) });
    } else (f !== 1 || h !== 1) && p.push(i(p) + "scale(" + f + "," + h + ")");
  }
  return function (l, u) {
    var f = [],
      h = [];
    return (
      (l = t(l)),
      (u = t(u)),
      o(l.translateX, l.translateY, u.translateX, u.translateY, f, h),
      s(l.rotate, u.rotate, f, h),
      c(l.skewX, u.skewX, f, h),
      a(l.scaleX, l.scaleY, u.scaleX, u.scaleY, f, h),
      (l = u = null),
      function (p) {
        for (var d = -1, g = h.length, N; ++d < g; ) f[(N = h[d]).i] = N.x(p);
        return f.join("");
      }
    );
  };
}
var kr = xn(Pr, "px, ", "px)", "deg)"),
  Mr = xn(Tr, ", ", ")", ")"),
  B = 0,
  F = 0,
  q = 0,
  vn = 1e3,
  lt,
  V,
  ut = 0,
  O = 0,
  pt = 0,
  K = typeof performance == "object" && performance.now ? performance : Date,
  bn =
    typeof window == "object" && window.requestAnimationFrame
      ? window.requestAnimationFrame.bind(window)
      : function (t) {
          setTimeout(t, 17);
        };
function kt() {
  return O || (bn(Sr), (O = K.now() + pt));
}
function Sr() {
  O = 0;
}
function ft() {
  this._call = this._time = this._next = null;
}
ft.prototype = $n.prototype = {
  constructor: ft,
  restart: function (t, n, e) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    (e = (e == null ? kt() : +e) + (n == null ? 0 : +n)),
      !this._next &&
        V !== this &&
        (V ? (V._next = this) : (lt = this), (V = this)),
      (this._call = t),
      (this._time = e),
      bt();
  },
  stop: function () {
    this._call && ((this._call = null), (this._time = 1 / 0), bt());
  },
};
function $n(t, n, e) {
  var r = new ft();
  return r.restart(t, n, e), r;
}
function Rr() {
  kt(), ++B;
  for (var t = lt, n; t; )
    (n = O - t._time) >= 0 && t._call.call(void 0, n), (t = t._next);
  --B;
}
function Wt() {
  (O = (ut = K.now()) + pt), (B = F = 0);
  try {
    Rr();
  } finally {
    (B = 0), Or(), (O = 0);
  }
}
function Lr() {
  var t = K.now(),
    n = t - ut;
  n > vn && ((pt -= n), (ut = t));
}
function Or() {
  for (var t, n = lt, e, r = 1 / 0; n; )
    n._call
      ? (r > n._time && (r = n._time), (t = n), (n = n._next))
      : ((e = n._next), (n._next = null), (n = t ? (t._next = e) : (lt = e)));
  (V = t), bt(r);
}
function bt(t) {
  if (!B) {
    F && (F = clearTimeout(F));
    var n = t - O;
    n > 24
      ? (t < 1 / 0 && (F = setTimeout(Wt, t - K.now() - pt)),
        q && (q = clearInterval(q)))
      : (q || ((ut = K.now()), (q = setInterval(Lr, vn))), (B = 1), bn(Wt));
  }
}
function Kt(t, n, e) {
  var r = new ft();
  return (
    (n = n == null ? 0 : +n),
    r.restart(
      (i) => {
        r.stop(), t(i + n);
      },
      n,
      e
    ),
    r
  );
}
var Gr = nn("start", "end", "cancel", "interrupt"),
  Dr = [],
  En = 0,
  Zt = 1,
  $t = 2,
  it = 3,
  Qt = 4,
  Et = 5,
  ot = 6;
function dt(t, n, e, r, i, o) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (e in s) return;
  Hr(t, e, {
    name: n,
    index: r,
    group: i,
    on: Gr,
    tween: Dr,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: En,
  });
}
function Mt(t, n) {
  var e = v(t, n);
  if (e.state > En) throw new Error("too late; already scheduled");
  return e;
}
function E(t, n) {
  var e = v(t, n);
  if (e.state > it) throw new Error("too late; already running");
  return e;
}
function v(t, n) {
  var e = t.__transition;
  if (!e || !(e = e[n])) throw new Error("transition not found");
  return e;
}
function Hr(t, n, e) {
  var r = t.__transition,
    i;
  (r[n] = e), (e.timer = $n(o, 0, e.time));
  function o(l) {
    (e.state = Zt),
      e.timer.restart(s, e.delay, e.time),
      e.delay <= l && s(l - e.delay);
  }
  function s(l) {
    var u, f, h, p;
    if (e.state !== Zt) return a();
    for (u in r)
      if (((p = r[u]), p.name === e.name)) {
        if (p.state === it) return Kt(s);
        p.state === Qt
          ? ((p.state = ot),
            p.timer.stop(),
            p.on.call("interrupt", t, t.__data__, p.index, p.group),
            delete r[u])
          : +u < n &&
            ((p.state = ot),
            p.timer.stop(),
            p.on.call("cancel", t, t.__data__, p.index, p.group),
            delete r[u]);
      }
    if (
      (Kt(function () {
        e.state === it &&
          ((e.state = Qt), e.timer.restart(c, e.delay, e.time), c(l));
      }),
      (e.state = $t),
      e.on.call("start", t, t.__data__, e.index, e.group),
      e.state === $t)
    ) {
      for (
        e.state = it, i = new Array((h = e.tween.length)), u = 0, f = -1;
        u < h;
        ++u
      )
        (p = e.tween[u].value.call(t, t.__data__, e.index, e.group)) &&
          (i[++f] = p);
      i.length = f + 1;
    }
  }
  function c(l) {
    for (
      var u =
          l < e.duration
            ? e.ease.call(null, l / e.duration)
            : (e.timer.restart(a), (e.state = Et), 1),
        f = -1,
        h = i.length;
      ++f < h;

    )
      i[f].call(t, u);
    e.state === Et && (e.on.call("end", t, t.__data__, e.index, e.group), a());
  }
  function a() {
    (e.state = ot), e.timer.stop(), delete r[n];
    for (var l in r) return;
    delete t.__transition;
  }
}
function Br(t, n) {
  var e = t.__transition,
    r,
    i,
    o = !0,
    s;
  if (e) {
    n = n == null ? null : n + "";
    for (s in e) {
      if ((r = e[s]).name !== n) {
        o = !1;
        continue;
      }
      (i = r.state > $t && r.state < Et),
        (r.state = ot),
        r.timer.stop(),
        r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group),
        delete e[s];
    }
    o && delete t.__transition;
  }
}
function Xr(t) {
  return this.each(function () {
    Br(this, t);
  });
}
function qr(t, n) {
  var e, r;
  return function () {
    var i = E(this, t),
      o = i.tween;
    if (o !== e) {
      r = e = o;
      for (var s = 0, c = r.length; s < c; ++s)
        if (r[s].name === n) {
          (r = r.slice()), r.splice(s, 1);
          break;
        }
    }
    i.tween = r;
  };
}
function Fr(t, n, e) {
  var r, i;
  if (typeof e != "function") throw new Error();
  return function () {
    var o = E(this, t),
      s = o.tween;
    if (s !== r) {
      i = (r = s).slice();
      for (var c = { name: n, value: e }, a = 0, l = i.length; a < l; ++a)
        if (i[a].name === n) {
          i[a] = c;
          break;
        }
      a === l && i.push(c);
    }
    o.tween = i;
  };
}
function Vr(t, n) {
  var e = this._id;
  if (((t += ""), arguments.length < 2)) {
    for (var r = v(this.node(), e).tween, i = 0, o = r.length, s; i < o; ++i)
      if ((s = r[i]).name === t) return s.value;
    return null;
  }
  return this.each((n == null ? qr : Fr)(e, t, n));
}
function St(t, n, e) {
  var r = t._id;
  return (
    t.each(function () {
      var i = E(this, r);
      (i.value || (i.value = {}))[n] = e.apply(this, arguments);
    }),
    function (i) {
      return v(i, r).value[n];
    }
  );
}
function Nn(t, n) {
  var e;
  return (
    typeof n == "number"
      ? P
      : n instanceof W
      ? zt
      : (e = W(n))
      ? ((n = e), zt)
      : Ar
  )(t, n);
}
function Yr(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function zr(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Ur(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = this.getAttribute(t);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function Wr(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = this.getAttributeNS(t.space, t.local);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function Kr(t, n, e) {
  var r, i, o;
  return function () {
    var s,
      c = e(this),
      a;
    return c == null
      ? void this.removeAttribute(t)
      : ((s = this.getAttribute(t)),
        (a = c + ""),
        s === a
          ? null
          : s === r && a === i
          ? o
          : ((i = a), (o = n((r = s), c))));
  };
}
function Zr(t, n, e) {
  var r, i, o;
  return function () {
    var s,
      c = e(this),
      a;
    return c == null
      ? void this.removeAttributeNS(t.space, t.local)
      : ((s = this.getAttributeNS(t.space, t.local)),
        (a = c + ""),
        s === a
          ? null
          : s === r && a === i
          ? o
          : ((i = a), (o = n((r = s), c))));
  };
}
function Qr(t, n) {
  var e = ht(t),
    r = e === "transform" ? Mr : Nn;
  return this.attrTween(
    t,
    typeof n == "function"
      ? (e.local ? Zr : Kr)(e, r, St(this, "attr." + t, n))
      : n == null
      ? (e.local ? zr : Yr)(e)
      : (e.local ? Wr : Ur)(e, r, n)
  );
}
function Jr(t, n) {
  return function (e) {
    this.setAttribute(t, n.call(this, e));
  };
}
function jr(t, n) {
  return function (e) {
    this.setAttributeNS(t.space, t.local, n.call(this, e));
  };
}
function ti(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && jr(t, o)), e;
  }
  return (i._value = n), i;
}
function ni(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && Jr(t, o)), e;
  }
  return (i._value = n), i;
}
function ei(t, n) {
  var e = "attr." + t;
  if (arguments.length < 2) return (e = this.tween(e)) && e._value;
  if (n == null) return this.tween(e, null);
  if (typeof n != "function") throw new Error();
  var r = ht(t);
  return this.tween(e, (r.local ? ti : ni)(r, n));
}
function ri(t, n) {
  return function () {
    Mt(this, t).delay = +n.apply(this, arguments);
  };
}
function ii(t, n) {
  return (
    (n = +n),
    function () {
      Mt(this, t).delay = n;
    }
  );
}
function oi(t) {
  var n = this._id;
  return arguments.length
    ? this.each((typeof t == "function" ? ri : ii)(n, t))
    : v(this.node(), n).delay;
}
function si(t, n) {
  return function () {
    E(this, t).duration = +n.apply(this, arguments);
  };
}
function ci(t, n) {
  return (
    (n = +n),
    function () {
      E(this, t).duration = n;
    }
  );
}
function ai(t) {
  var n = this._id;
  return arguments.length
    ? this.each((typeof t == "function" ? si : ci)(n, t))
    : v(this.node(), n).duration;
}
function li(t, n) {
  if (typeof n != "function") throw new Error();
  return function () {
    E(this, t).ease = n;
  };
}
function ui(t) {
  var n = this._id;
  return arguments.length ? this.each(li(n, t)) : v(this.node(), n).ease;
}
function fi(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    if (typeof e != "function") throw new Error();
    E(this, t).ease = e;
  };
}
function hi(t) {
  if (typeof t != "function") throw new Error();
  return this.each(fi(this._id, t));
}
function pi(t) {
  typeof t != "function" && (t = on(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, c = (r[i] = []), a, l = 0; l < s; ++l)
      (a = o[l]) && t.call(a, a.__data__, l, o) && c.push(a);
  return new C(r, this._parents, this._name, this._id);
}
function di(t) {
  if (t._id !== this._id) throw new Error();
  for (
    var n = this._groups,
      e = t._groups,
      r = n.length,
      i = e.length,
      o = Math.min(r, i),
      s = new Array(r),
      c = 0;
    c < o;
    ++c
  )
    for (
      var a = n[c], l = e[c], u = a.length, f = (s[c] = new Array(u)), h, p = 0;
      p < u;
      ++p
    )
      (h = a[p] || l[p]) && (f[p] = h);
  for (; c < r; ++c) s[c] = n[c];
  return new C(s, this._parents, this._name, this._id);
}
function gi(t) {
  return (t + "")
    .trim()
    .split(/^|\s+/)
    .every(function (n) {
      var e = n.indexOf(".");
      return e >= 0 && (n = n.slice(0, e)), !n || n === "start";
    });
}
function _i(t, n, e) {
  var r,
    i,
    o = gi(n) ? Mt : E;
  return function () {
    var s = o(this, t),
      c = s.on;
    c !== r && (i = (r = c).copy()).on(n, e), (s.on = i);
  };
}
function yi(t, n) {
  var e = this._id;
  return arguments.length < 2
    ? v(this.node(), e).on.on(t)
    : this.each(_i(e, t, n));
}
function mi(t) {
  return function () {
    var n = this.parentNode;
    for (var e in this.__transition) if (+e !== t) return;
    n && n.removeChild(this);
  };
}
function wi() {
  return this.on("end.remove", mi(this._id));
}
function xi(t) {
  var n = this._name,
    e = this._id;
  typeof t != "function" && (t = At(t));
  for (var r = this._groups, i = r.length, o = new Array(i), s = 0; s < i; ++s)
    for (
      var c = r[s], a = c.length, l = (o[s] = new Array(a)), u, f, h = 0;
      h < a;
      ++h
    )
      (u = c[h]) &&
        (f = t.call(u, u.__data__, h, c)) &&
        ("__data__" in u && (f.__data__ = u.__data__),
        (l[h] = f),
        dt(l[h], n, e, h, l, v(u, e)));
  return new C(o, this._parents, n, e);
}
function vi(t) {
  var n = this._name,
    e = this._id;
  typeof t != "function" && (t = rn(t));
  for (var r = this._groups, i = r.length, o = [], s = [], c = 0; c < i; ++c)
    for (var a = r[c], l = a.length, u, f = 0; f < l; ++f)
      if ((u = a[f])) {
        for (
          var h = t.call(u, u.__data__, f, a),
            p,
            d = v(u, e),
            g = 0,
            N = h.length;
          g < N;
          ++g
        )
          (p = h[g]) && dt(p, n, e, g, h, d);
        o.push(h), s.push(u);
      }
  return new C(o, s, n, e);
}
var bi = Z.prototype.constructor;
function $i() {
  return new bi(this._groups, this._parents);
}
function Ei(t, n) {
  var e, r, i;
  return function () {
    var o = H(this, t),
      s = (this.style.removeProperty(t), H(this, t));
    return o === s ? null : o === e && s === r ? i : (i = n((e = o), (r = s)));
  };
}
function In(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function Ni(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = H(this, t);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function Ii(t, n, e) {
  var r, i, o;
  return function () {
    var s = H(this, t),
      c = e(this),
      a = c + "";
    return (
      c == null && (a = c = (this.style.removeProperty(t), H(this, t))),
      s === a ? null : s === r && a === i ? o : ((i = a), (o = n((r = s), c)))
    );
  };
}
function Ci(t, n) {
  var e,
    r,
    i,
    o = "style." + n,
    s = "end." + o,
    c;
  return function () {
    var a = E(this, t),
      l = a.on,
      u = a.value[o] == null ? c || (c = In(n)) : void 0;
    (l !== e || i !== u) && (r = (e = l).copy()).on(s, (i = u)), (a.on = r);
  };
}
function Ai(t, n, e) {
  var r = (t += "") == "transform" ? kr : Nn;
  return n == null
    ? this.styleTween(t, Ei(t, r)).on("end.style." + t, In(t))
    : typeof n == "function"
    ? this.styleTween(t, Ii(t, r, St(this, "style." + t, n))).each(
        Ci(this._id, t)
      )
    : this.styleTween(t, Ni(t, r, n), e).on("end.style." + t, null);
}
function Pi(t, n, e) {
  return function (r) {
    this.style.setProperty(t, n.call(this, r), e);
  };
}
function Ti(t, n, e) {
  var r, i;
  function o() {
    var s = n.apply(this, arguments);
    return s !== i && (r = (i = s) && Pi(t, s, e)), r;
  }
  return (o._value = n), o;
}
function ki(t, n, e) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (n == null) return this.tween(r, null);
  if (typeof n != "function") throw new Error();
  return this.tween(r, Ti(t, n, e ?? ""));
}
function Mi(t) {
  return function () {
    this.textContent = t;
  };
}
function Si(t) {
  return function () {
    var n = t(this);
    this.textContent = n ?? "";
  };
}
function Ri(t) {
  return this.tween(
    "text",
    typeof t == "function"
      ? Si(St(this, "text", t))
      : Mi(t == null ? "" : t + "")
  );
}
function Li(t) {
  return function (n) {
    this.textContent = t.call(this, n);
  };
}
function Oi(t) {
  var n, e;
  function r() {
    var i = t.apply(this, arguments);
    return i !== e && (n = (e = i) && Li(i)), n;
  }
  return (r._value = t), r;
}
function Gi(t) {
  var n = "text";
  if (arguments.length < 1) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, Oi(t));
}
function Di() {
  for (
    var t = this._name,
      n = this._id,
      e = Cn(),
      r = this._groups,
      i = r.length,
      o = 0;
    o < i;
    ++o
  )
    for (var s = r[o], c = s.length, a, l = 0; l < c; ++l)
      if ((a = s[l])) {
        var u = v(a, n);
        dt(a, t, e, l, s, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease,
        });
      }
  return new C(r, this._parents, t, e);
}
function Hi() {
  var t,
    n,
    e = this,
    r = e._id,
    i = e.size();
  return new Promise(function (o, s) {
    var c = { value: s },
      a = {
        value: function () {
          --i === 0 && o();
        },
      };
    e.each(function () {
      var l = E(this, r),
        u = l.on;
      u !== t &&
        ((n = (t = u).copy()),
        n._.cancel.push(c),
        n._.interrupt.push(c),
        n._.end.push(a)),
        (l.on = n);
    }),
      i === 0 && o();
  });
}
var Bi = 0;
function C(t, n, e, r) {
  (this._groups = t), (this._parents = n), (this._name = e), (this._id = r);
}
function Cn() {
  return ++Bi;
}
var I = Z.prototype;
C.prototype = {
  constructor: C,
  select: xi,
  selectAll: vi,
  selectChild: I.selectChild,
  selectChildren: I.selectChildren,
  filter: pi,
  merge: di,
  selection: $i,
  transition: Di,
  call: I.call,
  nodes: I.nodes,
  node: I.node,
  size: I.size,
  empty: I.empty,
  each: I.each,
  on: yi,
  attr: Qr,
  attrTween: ei,
  style: Ai,
  styleTween: ki,
  text: Ri,
  textTween: Gi,
  remove: wi,
  tween: Vr,
  delay: oi,
  duration: ai,
  ease: ui,
  easeVarying: hi,
  end: Hi,
  [Symbol.iterator]: I[Symbol.iterator],
};
function Xi(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var qi = { time: null, delay: 0, duration: 250, ease: Xi };
function Fi(t, n) {
  for (var e; !(e = t.__transition) || !(e = e[n]); )
    if (!(t = t.parentNode)) throw new Error(`transition ${n} not found`);
  return e;
}
function Vi(t) {
  var n, e;
  t instanceof C
    ? ((n = t._id), (t = t._name))
    : ((n = Cn()), ((e = qi).time = kt()), (t = t == null ? null : t + ""));
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], c = s.length, a, l = 0; l < c; ++l)
      (a = s[l]) && dt(a, t, n, l, s, e || Fi(a, n));
  return new C(r, this._parents, t, n);
}
Z.prototype.interrupt = Xr;
Z.prototype.transition = Vi;
const Nt = Math.PI,
  It = 2 * Nt,
  k = 1e-6,
  Yi = It - k;
function An(t) {
  this._ += t[0];
  for (let n = 1, e = t.length; n < e; ++n) this._ += arguments[n] + t[n];
}
function zi(t) {
  let n = Math.floor(t);
  if (!(n >= 0)) throw new Error(`invalid digits: ${t}`);
  if (n > 15) return An;
  const e = 10 ** n;
  return function (r) {
    this._ += r[0];
    for (let i = 1, o = r.length; i < o; ++i)
      this._ += Math.round(arguments[i] * e) / e + r[i];
  };
}
class Ui {
  constructor(n) {
    (this._x0 = this._y0 = this._x1 = this._y1 = null),
      (this._ = ""),
      (this._append = n == null ? An : zi(n));
  }
  moveTo(n, e) {
    this._append`M${(this._x0 = this._x1 = +n)},${(this._y0 = this._y1 = +e)}`;
  }
  closePath() {
    this._x1 !== null &&
      ((this._x1 = this._x0), (this._y1 = this._y0), this._append`Z`);
  }
  lineTo(n, e) {
    this._append`L${(this._x1 = +n)},${(this._y1 = +e)}`;
  }
  quadraticCurveTo(n, e, r, i) {
    this._append`Q${+n},${+e},${(this._x1 = +r)},${(this._y1 = +i)}`;
  }
  bezierCurveTo(n, e, r, i, o, s) {
    this._append`C${+n},${+e},${+r},${+i},${(this._x1 = +o)},${(this._y1 =
      +s)}`;
  }
  arcTo(n, e, r, i, o) {
    if (((n = +n), (e = +e), (r = +r), (i = +i), (o = +o), o < 0))
      throw new Error(`negative radius: ${o}`);
    let s = this._x1,
      c = this._y1,
      a = r - n,
      l = i - e,
      u = s - n,
      f = c - e,
      h = u * u + f * f;
    if (this._x1 === null) this._append`M${(this._x1 = n)},${(this._y1 = e)}`;
    else if (h > k)
      if (!(Math.abs(f * a - l * u) > k) || !o)
        this._append`L${(this._x1 = n)},${(this._y1 = e)}`;
      else {
        let p = r - s,
          d = i - c,
          g = a * a + l * l,
          N = p * p + d * d,
          J = Math.sqrt(g),
          A = Math.sqrt(h),
          T = o * Math.tan((Nt - Math.acos((g + h - N) / (2 * J * A))) / 2),
          G = T / A,
          X = T / J;
        Math.abs(G - 1) > k && this._append`L${n + G * u},${e + G * f}`,
          this._append`A${o},${o},0,0,${+(f * p > u * d)},${(this._x1 =
            n + X * a)},${(this._y1 = e + X * l)}`;
      }
  }
  arc(n, e, r, i, o, s) {
    if (((n = +n), (e = +e), (r = +r), (s = !!s), r < 0))
      throw new Error(`negative radius: ${r}`);
    let c = r * Math.cos(i),
      a = r * Math.sin(i),
      l = n + c,
      u = e + a,
      f = 1 ^ s,
      h = s ? i - o : o - i;
    this._x1 === null
      ? this._append`M${l},${u}`
      : (Math.abs(this._x1 - l) > k || Math.abs(this._y1 - u) > k) &&
        this._append`L${l},${u}`,
      r &&
        (h < 0 && (h = (h % It) + It),
        h > Yi
          ? this._append`A${r},${r},0,1,${f},${n - c},${
              e - a
            }A${r},${r},0,1,${f},${(this._x1 = l)},${(this._y1 = u)}`
          : h > k &&
            this._append`A${r},${r},0,${+(h >= Nt)},${f},${(this._x1 =
              n + r * Math.cos(o))},${(this._y1 = e + r * Math.sin(o))}`);
  }
  rect(n, e, r, i) {
    this._append`M${(this._x0 = this._x1 = +n)},${(this._y0 = this._y1 =
      +e)}h${(r = +r)}v${+i}h${-r}Z`;
  }
  toString() {
    return this._;
  }
}
function Wi(t) {
  if (!t.ok) throw new Error(t.status + " " + t.statusText);
  return t.text();
}
function Ki(t, n) {
  return fetch(t, n).then(Wi);
}
function Zi(t) {
  return (n, e) => Ki(n, e).then((r) => new DOMParser().parseFromString(r, t));
}
const Qi = Zi("application/xml");
function Y(t, n, e) {
  (this.k = t), (this.x = n), (this.y = e);
}
Y.prototype = {
  constructor: Y,
  scale: function (t) {
    return t === 1 ? this : new Y(this.k * t, this.x, this.y);
  },
  translate: function (t, n) {
    return (t === 0) & (n === 0)
      ? this
      : new Y(this.k, this.x + this.k * t, this.y + this.k * n);
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
};
Y.prototype;
class Pn {
  constructor(n, e, r, i, o, s, c) {
    (this.id = n),
      (this.svgContainer = e),
      (this.url = r),
      this.sensor,
      (this.scale = i),
      (this.offsetX = s),
      (this.offsetY = c),
      (this.movable = o),
      console.log("Component created: " + this.id),
      console.log("url: " + this.url),
      console.log("scale: " + this.scale);
  }
  async load() {
    if (mt("#" + this.id).node() != null) return;
    const n = await Qi(this.url);
    (this.sensor = this.svgContainer
      .append("g")
      .attr(
        "transform",
        "translate(" +
          [this.offsetX, this.offsetY] +
          ") scale(" +
          this.scale +
          ")"
      )
      .attr("id", this.id)),
      this.sensor.node().append(mt(n.documentElement).node());
  }
}
const Rt = [
    "connector0pin-0",
    "connector1pin-1",
    "connector2pin-3",
    "connector3pin-7",
    "connector4pin-4",
    "connector5pin-1",
    "connector6pin-1",
    "connector7pin-3",
    "connector8pin-0",
    "connector9pin-3",
    "connector10pin-2",
    "connector11pin-1",
    "connector12pin-7",
    "connector13pin-5",
    "connector14pin-6",
    "connector15pin-5",
    "connector16pin-4",
    "connector17pin-2",
    "connector18pin-2",
    "connector19pin-1",
    "connector20pin-7",
    "connector21pin-2",
    "connector22pin-4",
    "connector23pin-1",
    "connector24pin-6",
    "connector25pin-5",
    "connector26pin-7",
    "connector27pin-8",
    "connector28pin-5",
    "connector29pin-9",
    "connector30pin-2",
    "connector31pin-7",
    "connector32pin-3",
    "connector33pin-6",
    "connector34pin-4",
    "connector35pin-7",
    "connector36pin-9",
    "connector37pin-7",
    "connector38pin-2",
    "connector39pin-2",
  ],
  Ji = ["vcc", "gnd", "out"],
  et = { vcc: "VCC", gnd: "Ground", out: "Out" },
  S = {
    "connector0pin-0": "3.3v",
    "connector1pin-1": "GPIO 2",
    "connector2pin-3": "GPIO 3",
    "connector3pin-7": "GPIO 4",
    "connector4pin-4": "GND",
    "connector5pin-1": "GPIO 17",
    "connector6pin-1": "GPIO 27",
    "connector7pin-3": "GPIO 22",
    "connector8pin-0": "3.3v",
    "connector9pin-3": "GPIO 10",
    "connector10pin-2": "GPIO 9",
    "connector11pin-1": "GPIO 11",
    "connector12pin-7": "GND",
    "connector13pin-5": "RESERVED",
    "connector14pin-6": "GPIO 5",
    "connector15pin-5": "GPIO 6",
    "connector16pin-4": "GPIO 13",
    "connector17pin-2": "GPIO 19",
    "connector18pin-2": "GPIO 26",
    "connector19pin-1": "GND",
    "connector20pin-7": "GPIO 21",
    "connector21pin-2": "GPIO 20",
    "connector22pin-4": "GPIO 16",
    "connector23pin-1": "GND",
    "connector24pin-6": "GPIO 12",
    "connector25pin-5": "GND",
    "connector26pin-7": "RESERVED",
    "connector27pin-8": "GPIO 7",
    "connector28pin-5": "GPIO 8",
    "connector29pin-9": "GPIO 25",
    "connector30pin-2": "GND",
    "connector31pin-7": "GPIO 24",
    "connector32pin-3": "GPIO 23",
    "connector33pin-6": "GND",
    "connector34pin-4": "GPIO 18",
    "connector35pin-7": "UART 0 RX",
    "connector36pin-9": "UART 0 TX",
    "connector37pin-7": "GND",
    "connector38pin-2": "5V PWR",
    "connector39pin-2": "5V PWR",
  },
  ji = (t) => {
    if (t.length == 0) return { error: "No connection found" };
    const n = ["GPIO", "GND", "vcc", "gnd", "out", "5V PWR"];
    let e = 0;
    return (
      t.forEach((r) => {
        if (n.find((i) => i == r.connector)) {
          e++;
          return;
        }
        if (S[r.connector] == "GND") {
          e++;
          return;
        }
        if (S[r.connector].includes("GPIO")) {
          e++;
          return;
        }
      }),
      console.log(e),
      e == 5
    );
  };
class to {
  constructor(n) {
    (this.logLocationId = n), (this.connections = []);
  }
  addConnection(n) {
    this.connections.push(n), this.logConnectionsToHtml();
  }
  undoLastConnection() {
    if (this.connections.length) {
      const n = this.connections.pop(),
        e = document.getElementById(this.logLocationId),
        r = e.lastChild;
      e.removeChild(r),
        this.logConnectionsToHtml(),
        console.log("Removed connection:", n);
    } else console.warn("No more connections to undo");
  }
  logConnectionsToHtml() {
    if (this.connections.length % 2 == 0) {
      let n = document.createElement("li");
      const e = S[this.connections[this.connections.length - 2].connector]
          ? S[this.connections[this.connections.length - 2].connector]
          : et[this.connections[this.connections.length - 2].connector]
          ? et[this.connections[this.connections.length - 2].connector]
          : this.connections[this.connections.length - 2].connector,
        r = S[this.connections[this.connections.length - 1].connector]
          ? S[this.connections[this.connections.length - 1].connector]
          : et[this.connections[this.connections.length - 1].connector]
          ? et[this.connections[this.connections.length - 1].connector]
          : this.connections[this.connections.length - 1].connector;
      (n.innerHTML = `Connection no. ${
        this.connections.length / 2
      } : ${e} to ${r}`),
        document.getElementById(this.logLocationId).appendChild(n);
      return;
    }
  }
  getConnectionLog() {
    return this.connections;
  }
}
class no {
  constructor(n, e, r, i) {
    (this.id = n),
      (this.headingId = e),
      (this.textId = r),
      (this.closeButtonId = i),
      document
        .getElementById(this.closeButtonId)
        .addEventListener("click", () => {
          document.getElementById(this.id).style.display = "none";
        });
  }
  throw(n, e) {
    (document.getElementById(this.id).style.display = "flex"),
      (document.getElementById(this.headingId).innerHTML = n),
      (document.getElementById(this.textId).innerHTML = e);
  }
}
const Jt = (t, n) => {
    Lt.append("path")
      .attr("d", t)
      .attr("stroke", "black")
      .attr("stroke-width", "2px")
      .attr("fill", "none")
      .attr("id", n);
  },
  L = mt("#svg")
    .append("svg")
    .attr("id", "svgContainer")
    .attr(
      "height",
      window.innerHeight - document.getElementById("svg").offsetTop
    )
    .attr("width", document.getElementById("svg").offsetWidth),
  eo = new Pn("raspberry", L, "./images/pi3dirk.svg", 1, !1, 0, 0),
  ro = new Pn("sensorDHT11", L, "./images/sensor.svg", 2.5, !1, 300, 35),
  Lt = L.append("g").attr("id", "pathsGroup"),
  io = document.getElementById("rasberryPi"),
  oo = document.getElementById("sensor"),
  jt = (t) => Rt.includes(t.srcElement.id) || Ji.includes(t.srcElement.id),
  Ct = document.getElementById("displayInfo"),
  so = document.getElementById("codeSubmit");
io.addEventListener("click", async () => await eo.load());
oo.addEventListener("click", async () => await ro.load());
let _;
const x = new to("connectionLog"),
  tn = new no("errorBox", "errorHeading", "errorText", "closeErrorBox");
let b = 0;
const co = document.querySelector("#undoButton");
co.addEventListener("click", () => {
  x.undoLastConnection(), lo();
});
const ao = (t) => {
    Lt.selectAll(`path[id="${t}"]`)
      .nodes()
      .forEach((e) => {
        e.remove();
      });
  },
  lo = () => {
    if (_) {
      Lt.selectAll(`path[id^="path${b}"]`)
        .nodes()
        .forEach((n) => n.remove()),
        (_ = null),
        (b = 0),
        console.log("Removed all incomplete paths");
      return;
    }
    if (x.connections.length > 0) {
      const n = x.connections[x.connections.length - 1].lineID;
      ao(n),
        x.connections.pop(),
        console.log(`Removed paths with line ID: ${n}`);
    } else console.warn("No more connections to undo");
  };
L.on("dblclick", (t) => {
  if (jt(t) && _ == null) {
    (_ = new Ui()),
      _.moveTo(t.offsetX, t.offsetY),
      x.addConnection({
        lineID: `path${b}`,
        x: t.offsetX,
        y: t.offsetY,
        connector: t.srcElement.id,
        connectorEnd: null,
        incomplete: !0,
      }),
      L.style("cursor", "crosshair"),
      console.log("path created 0"),
      console.log(b, "path count");
    return;
  }
  if (t.srcElement.id == "svgContainer" && !Rt.includes(t.srcElement.id)) {
    _ && _.lineTo(t.offsetX, t.offsetY),
      _ &&
        x.connections.length > 0 &&
        (x.connections[x.connections.length - 1].connectorEnd = null),
      _ &&
        (Jt(_.toString(), `path${b}`),
        console.log("path created"),
        console.log(b));
    return;
  }
  if (jt(t) && _) {
    _.lineTo(t.offsetX, t.offsetY),
      Jt(_.toString(), `path${b}`),
      x.addConnection({
        lineID: `path${b}`,
        x: t.offsetX,
        y: t.offsetY,
        connector: t.srcElement.id,
        connectorEnd: t.srcElement.id,
        incomplete: !1,
      }),
      b++,
      L.style("cursor", "default"),
      (_ = null),
      console.log("connectedPointSequence", connectedPointSequence),
      console.log("path created 2"),
      console.log(b);
    return;
  }
});
L.on("mouseover", (t) => {
  Rt.includes(t.srcElement.id) && (Ct.innerHTML = S[t.srcElement.id]);
});
const uo = () => {
  const t = document.getElementById("temperature").value;
  (Ct.innerHTML = "Temperature: " + t + "°C"),
    document.getElementById("temperature").addEventListener("change", () => {
      Ct.innerHTML =
        "Temperature: " + document.getElementById("temperature").value + "°C";
    });
};
so.addEventListener("click", () => {
  const t = ji(x.getConnectionLog());
  t == !0
    ? (uo(), document.querySelector("#my-drawer-4").click())
    : t.error
    ? tn.throw("Error", t.error)
    : tn.throw(
        "Error",
        "Please connect the components properly. Refer to the connection diagram."
      );
});
