import * as Y from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import { Path as Mn } from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
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
var Ln = { value: () => {} };
function rn() {
  for (var t = 0, n = arguments.length, e = {}, r; t < n; ++t) {
    if (!(r = arguments[t] + "") || r in e || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    e[r] = [];
  }
  return new it(e);
}
function it(t) {
  this._ = t;
}
function Hn(t, n) {
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
it.prototype = rn.prototype = {
  constructor: it,
  on: function (t, n) {
    var e = this._,
      r = Hn(t + "", e),
      i,
      o = -1,
      s = r.length;
    if (arguments.length < 2) {
      for (; ++o < s; )
        if ((i = (t = r[o]).type) && (i = Gn(e[i], t.name))) return i;
      return;
    }
    if (n != null && typeof n != "function")
      throw new Error("invalid callback: " + n);
    for (; ++o < s; )
      if ((i = (t = r[o]).type)) e[i] = Lt(e[i], t.name, n);
      else if (n == null) for (i in e) e[i] = Lt(e[i], t.name, null);
    return this;
  },
  copy: function () {
    var t = {},
      n = this._;
    for (var e in n) t[e] = n[e].slice();
    return new it(t);
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
function Gn(t, n) {
  for (var e = 0, r = t.length, i; e < r; ++e)
    if ((i = t[e]).name === n) return i.value;
}
function Lt(t, n, e) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === n) {
      (t[r] = Ln), (t = t.slice(0, r).concat(t.slice(r + 1)));
      break;
    }
  return e != null && t.push({ name: n, value: e }), t;
}
var wt = "http://www.w3.org/1999/xhtml";
const Ht = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: wt,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/",
};
function pt(t) {
  var n = (t += ""),
    e = n.indexOf(":");
  return (
    e >= 0 && (n = t.slice(0, e)) !== "xmlns" && (t = t.slice(e + 1)),
    Ht.hasOwnProperty(n) ? { space: Ht[n], local: t } : t
  );
}
function Bn(t) {
  return function () {
    var n = this.ownerDocument,
      e = this.namespaceURI;
    return e === wt && n.documentElement.namespaceURI === wt
      ? n.createElement(t)
      : n.createElementNS(e, t);
  };
}
function Xn(t) {
  return function () {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function on(t) {
  var n = pt(t);
  return (n.local ? Xn : Bn)(n);
}
function Fn() {}
function $t(t) {
  return t == null
    ? Fn
    : function () {
        return this.querySelector(t);
      };
}
function qn(t) {
  typeof t != "function" && (t = $t(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (
      var o = n[i], s = o.length, c = (r[i] = new Array(s)), a, l, u = 0;
      u < s;
      ++u
    )
      (a = o[u]) &&
        (l = t.call(a, a.__data__, u, o)) &&
        ("__data__" in a && (l.__data__ = a.__data__), (c[u] = l));
  return new y(r, this._parents);
}
function Vn(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Yn() {
  return [];
}
function sn(t) {
  return t == null
    ? Yn
    : function () {
        return this.querySelectorAll(t);
      };
}
function Un(t) {
  return function () {
    return Vn(t.apply(this, arguments));
  };
}
function zn(t) {
  typeof t == "function" ? (t = Un(t)) : (t = sn(t));
  for (var n = this._groups, e = n.length, r = [], i = [], o = 0; o < e; ++o)
    for (var s = n[o], c = s.length, a, l = 0; l < c; ++l)
      (a = s[l]) && (r.push(t.call(a, a.__data__, l, s)), i.push(a));
  return new y(r, i);
}
function cn(t) {
  return function () {
    return this.matches(t);
  };
}
function an(t) {
  return function (n) {
    return n.matches(t);
  };
}
var Wn = Array.prototype.find;
function Kn(t) {
  return function () {
    return Wn.call(this.children, t);
  };
}
function Jn() {
  return this.firstElementChild;
}
function Qn(t) {
  return this.select(t == null ? Jn : Kn(typeof t == "function" ? t : an(t)));
}
var Zn = Array.prototype.filter;
function jn() {
  return Array.from(this.children);
}
function te(t) {
  return function () {
    return Zn.call(this.children, t);
  };
}
function ne(t) {
  return this.selectAll(
    t == null ? jn : te(typeof t == "function" ? t : an(t))
  );
}
function ee(t) {
  typeof t != "function" && (t = cn(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, c = (r[i] = []), a, l = 0; l < s; ++l)
      (a = o[l]) && t.call(a, a.__data__, l, o) && c.push(a);
  return new y(r, this._parents);
}
function ln(t) {
  return new Array(t.length);
}
function re() {
  return new y(this._enter || this._groups.map(ln), this._parents);
}
function ct(t, n) {
  (this.ownerDocument = t.ownerDocument),
    (this.namespaceURI = t.namespaceURI),
    (this._next = null),
    (this._parent = t),
    (this.__data__ = n);
}
ct.prototype = {
  constructor: ct,
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
function ie(t) {
  return function () {
    return t;
  };
}
function oe(t, n, e, r, i, o) {
  for (var s = 0, c, a = n.length, l = o.length; s < l; ++s)
    (c = n[s]) ? ((c.__data__ = o[s]), (r[s] = c)) : (e[s] = new ct(t, o[s]));
  for (; s < a; ++s) (c = n[s]) && (i[s] = c);
}
function se(t, n, e, r, i, o, s) {
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
        : (e[c] = new ct(t, o[c]));
  for (c = 0; c < u; ++c) (a = n[c]) && l.get(h[c]) === a && (i[c] = a);
}
function ce(t) {
  return t.__data__;
}
function ae(t, n) {
  if (!arguments.length) return Array.from(this, ce);
  var e = n ? se : oe,
    r = this._parents,
    i = this._groups;
  typeof t != "function" && (t = ie(t));
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
      p = le(t.call(u, u && u.__data__, l, r)),
      d = p.length,
      g = (c[l] = new Array(d)),
      T = (s[l] = new Array(d)),
      On = (a[l] = new Array(h));
    e(u, f, g, T, On, p, n);
    for (var G = 0, j = 0, Ot, Mt; G < d; ++G)
      if ((Ot = g[G])) {
        for (G >= j && (j = G + 1); !(Mt = T[j]) && ++j < d; );
        Ot._next = Mt || null;
      }
  }
  return (s = new y(s, r)), (s._enter = c), (s._exit = a), s;
}
function le(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function ue() {
  return new y(this._exit || this._groups.map(ln), this._parents);
}
function fe(t, n, e) {
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
function he(t) {
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
  return new y(c, this._parents);
}
function pe() {
  for (var t = this._groups, n = -1, e = t.length; ++n < e; )
    for (var r = t[n], i = r.length - 1, o = r[i], s; --i >= 0; )
      (s = r[i]) &&
        (o &&
          s.compareDocumentPosition(o) ^ 4 &&
          o.parentNode.insertBefore(s, o),
        (o = s));
  return this;
}
function de(t) {
  t || (t = ge);
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
  return new y(i, this._parents).order();
}
function ge(t, n) {
  return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
function me() {
  var t = arguments[0];
  return (arguments[0] = this), t.apply(null, arguments), this;
}
function ye() {
  return Array.from(this);
}
function _e() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
      var s = r[i];
      if (s) return s;
    }
  return null;
}
function we() {
  let t = 0;
  for (const n of this) ++t;
  return t;
}
function xe() {
  return !this.node();
}
function ve(t) {
  for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
    for (var i = n[e], o = 0, s = i.length, c; o < s; ++o)
      (c = i[o]) && t.call(c, c.__data__, o, i);
  return this;
}
function be(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function Ee(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Ne(t, n) {
  return function () {
    this.setAttribute(t, n);
  };
}
function Ie(t, n) {
  return function () {
    this.setAttributeNS(t.space, t.local, n);
  };
}
function Ce(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null ? this.removeAttribute(t) : this.setAttribute(t, e);
  };
}
function $e(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null
      ? this.removeAttributeNS(t.space, t.local)
      : this.setAttributeNS(t.space, t.local, e);
  };
}
function Ae(t, n) {
  var e = pt(t);
  if (arguments.length < 2) {
    var r = this.node();
    return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e);
  }
  return this.each(
    (n == null
      ? e.local
        ? Ee
        : be
      : typeof n == "function"
      ? e.local
        ? $e
        : Ce
      : e.local
      ? Ie
      : Ne)(e, n)
  );
}
function un(t) {
  return (
    (t.ownerDocument && t.ownerDocument.defaultView) ||
    (t.document && t) ||
    t.defaultView
  );
}
function Te(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function ke(t, n, e) {
  return function () {
    this.style.setProperty(t, n, e);
  };
}
function Pe(t, n, e) {
  return function () {
    var r = n.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, e);
  };
}
function Se(t, n, e) {
  return arguments.length > 1
    ? this.each(
        (n == null ? Te : typeof n == "function" ? Pe : ke)(t, n, e ?? "")
      )
    : M(this.node(), t);
}
function M(t, n) {
  return (
    t.style.getPropertyValue(n) ||
    un(t).getComputedStyle(t, null).getPropertyValue(n)
  );
}
function De(t) {
  return function () {
    delete this[t];
  };
}
function Re(t, n) {
  return function () {
    this[t] = n;
  };
}
function Oe(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null ? delete this[t] : (this[t] = e);
  };
}
function Me(t, n) {
  return arguments.length > 1
    ? this.each((n == null ? De : typeof n == "function" ? Oe : Re)(t, n))
    : this.node()[t];
}
function fn(t) {
  return t.trim().split(/^|\s+/);
}
function At(t) {
  return t.classList || new hn(t);
}
function hn(t) {
  (this._node = t), (this._names = fn(t.getAttribute("class") || ""));
}
hn.prototype = {
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
function pn(t, n) {
  for (var e = At(t), r = -1, i = n.length; ++r < i; ) e.add(n[r]);
}
function dn(t, n) {
  for (var e = At(t), r = -1, i = n.length; ++r < i; ) e.remove(n[r]);
}
function Le(t) {
  return function () {
    pn(this, t);
  };
}
function He(t) {
  return function () {
    dn(this, t);
  };
}
function Ge(t, n) {
  return function () {
    (n.apply(this, arguments) ? pn : dn)(this, t);
  };
}
function Be(t, n) {
  var e = fn(t + "");
  if (arguments.length < 2) {
    for (var r = At(this.node()), i = -1, o = e.length; ++i < o; )
      if (!r.contains(e[i])) return !1;
    return !0;
  }
  return this.each((typeof n == "function" ? Ge : n ? Le : He)(e, n));
}
function Xe() {
  this.textContent = "";
}
function Fe(t) {
  return function () {
    this.textContent = t;
  };
}
function qe(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.textContent = n ?? "";
  };
}
function Ve(t) {
  return arguments.length
    ? this.each(t == null ? Xe : (typeof t == "function" ? qe : Fe)(t))
    : this.node().textContent;
}
function Ye() {
  this.innerHTML = "";
}
function Ue(t) {
  return function () {
    this.innerHTML = t;
  };
}
function ze(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.innerHTML = n ?? "";
  };
}
function We(t) {
  return arguments.length
    ? this.each(t == null ? Ye : (typeof t == "function" ? ze : Ue)(t))
    : this.node().innerHTML;
}
function Ke() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Je() {
  return this.each(Ke);
}
function Qe() {
  this.previousSibling &&
    this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Ze() {
  return this.each(Qe);
}
function je(t) {
  var n = typeof t == "function" ? t : on(t);
  return this.select(function () {
    return this.appendChild(n.apply(this, arguments));
  });
}
function tr() {
  return null;
}
function nr(t, n) {
  var e = typeof t == "function" ? t : on(t),
    r = n == null ? tr : typeof n == "function" ? n : $t(n);
  return this.select(function () {
    return this.insertBefore(
      e.apply(this, arguments),
      r.apply(this, arguments) || null
    );
  });
}
function er() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function rr() {
  return this.each(er);
}
function ir() {
  var t = this.cloneNode(!1),
    n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function or() {
  var t = this.cloneNode(!0),
    n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function sr(t) {
  return this.select(t ? or : ir);
}
function cr(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function ar(t) {
  return function (n) {
    t.call(this, n, this.__data__);
  };
}
function lr(t) {
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
function ur(t) {
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
function fr(t, n, e) {
  return function () {
    var r = this.__on,
      i,
      o = ar(n);
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
function hr(t, n, e) {
  var r = lr(t + ""),
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
  for (c = n ? fr : ur, i = 0; i < o; ++i) this.each(c(r[i], n, e));
  return this;
}
function gn(t, n, e) {
  var r = un(t),
    i = r.CustomEvent;
  typeof i == "function"
    ? (i = new i(n, e))
    : ((i = r.document.createEvent("Event")),
      e
        ? (i.initEvent(n, e.bubbles, e.cancelable), (i.detail = e.detail))
        : i.initEvent(n, !1, !1)),
    t.dispatchEvent(i);
}
function pr(t, n) {
  return function () {
    return gn(this, t, n);
  };
}
function dr(t, n) {
  return function () {
    return gn(this, t, n.apply(this, arguments));
  };
}
function gr(t, n) {
  return this.each((typeof n == "function" ? dr : pr)(t, n));
}
function* mr() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length, s; i < o; ++i)
      (s = r[i]) && (yield s);
}
var mn = [null];
function y(t, n) {
  (this._groups = t), (this._parents = n);
}
function Q() {
  return new y([[document.documentElement]], mn);
}
function yr() {
  return this;
}
y.prototype = Q.prototype = {
  constructor: y,
  select: qn,
  selectAll: zn,
  selectChild: Qn,
  selectChildren: ne,
  filter: ee,
  data: ae,
  enter: re,
  exit: ue,
  join: fe,
  merge: he,
  selection: yr,
  order: pe,
  sort: de,
  call: me,
  nodes: ye,
  node: _e,
  size: we,
  empty: xe,
  each: ve,
  attr: Ae,
  style: Se,
  property: Me,
  classed: Be,
  text: Ve,
  html: We,
  raise: Je,
  lower: Ze,
  append: je,
  insert: nr,
  remove: rr,
  clone: sr,
  datum: cr,
  on: hr,
  dispatch: gr,
  [Symbol.iterator]: mr,
};
function Gt(t) {
  return typeof t == "string"
    ? new y([[document.querySelector(t)]], [document.documentElement])
    : new y([[t]], mn);
}
function Tt(t, n, e) {
  (t.prototype = n.prototype = e), (e.constructor = t);
}
function yn(t, n) {
  var e = Object.create(t.prototype);
  for (var r in n) e[r] = n[r];
  return e;
}
function Z() {}
var U = 0.7,
  at = 1 / U,
  O = "\\s*([+-]?\\d+)\\s*",
  z = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  b = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  _r = /^#([0-9a-f]{3,8})$/,
  wr = new RegExp(`^rgb\\(${O},${O},${O}\\)$`),
  xr = new RegExp(`^rgb\\(${b},${b},${b}\\)$`),
  vr = new RegExp(`^rgba\\(${O},${O},${O},${z}\\)$`),
  br = new RegExp(`^rgba\\(${b},${b},${b},${z}\\)$`),
  Er = new RegExp(`^hsl\\(${z},${b},${b}\\)$`),
  Nr = new RegExp(`^hsla\\(${z},${b},${b},${z}\\)$`),
  Bt = {
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
Tt(Z, W, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Xt,
  formatHex: Xt,
  formatHex8: Ir,
  formatHsl: Cr,
  formatRgb: Ft,
  toString: Ft,
});
function Xt() {
  return this.rgb().formatHex();
}
function Ir() {
  return this.rgb().formatHex8();
}
function Cr() {
  return _n(this).formatHsl();
}
function Ft() {
  return this.rgb().formatRgb();
}
function W(t) {
  var n, e;
  return (
    (t = (t + "").trim().toLowerCase()),
    (n = _r.exec(t))
      ? ((e = n[1].length),
        (n = parseInt(n[1], 16)),
        e === 6
          ? qt(n)
          : e === 3
          ? new m(
              ((n >> 8) & 15) | ((n >> 4) & 240),
              ((n >> 4) & 15) | (n & 240),
              ((n & 15) << 4) | (n & 15),
              1
            )
          : e === 8
          ? tt(
              (n >> 24) & 255,
              (n >> 16) & 255,
              (n >> 8) & 255,
              (n & 255) / 255
            )
          : e === 4
          ? tt(
              ((n >> 12) & 15) | ((n >> 8) & 240),
              ((n >> 8) & 15) | ((n >> 4) & 240),
              ((n >> 4) & 15) | (n & 240),
              (((n & 15) << 4) | (n & 15)) / 255
            )
          : null)
      : (n = wr.exec(t))
      ? new m(n[1], n[2], n[3], 1)
      : (n = xr.exec(t))
      ? new m((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, 1)
      : (n = vr.exec(t))
      ? tt(n[1], n[2], n[3], n[4])
      : (n = br.exec(t))
      ? tt((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, n[4])
      : (n = Er.exec(t))
      ? Ut(n[1], n[2] / 100, n[3] / 100, 1)
      : (n = Nr.exec(t))
      ? Ut(n[1], n[2] / 100, n[3] / 100, n[4])
      : Bt.hasOwnProperty(t)
      ? qt(Bt[t])
      : t === "transparent"
      ? new m(NaN, NaN, NaN, 0)
      : null
  );
}
function qt(t) {
  return new m((t >> 16) & 255, (t >> 8) & 255, t & 255, 1);
}
function tt(t, n, e, r) {
  return r <= 0 && (t = n = e = NaN), new m(t, n, e, r);
}
function $r(t) {
  return (
    t instanceof Z || (t = W(t)),
    t ? ((t = t.rgb()), new m(t.r, t.g, t.b, t.opacity)) : new m()
  );
}
function xt(t, n, e, r) {
  return arguments.length === 1 ? $r(t) : new m(t, n, e, r ?? 1);
}
function m(t, n, e, r) {
  (this.r = +t), (this.g = +n), (this.b = +e), (this.opacity = +r);
}
Tt(
  m,
  xt,
  yn(Z, {
    brighter(t) {
      return (
        (t = t == null ? at : Math.pow(at, t)),
        new m(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? U : Math.pow(U, t)),
        new m(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    rgb() {
      return this;
    },
    clamp() {
      return new m(S(this.r), S(this.g), S(this.b), lt(this.opacity));
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
    hex: Vt,
    formatHex: Vt,
    formatHex8: Ar,
    formatRgb: Yt,
    toString: Yt,
  })
);
function Vt() {
  return `#${k(this.r)}${k(this.g)}${k(this.b)}`;
}
function Ar() {
  return `#${k(this.r)}${k(this.g)}${k(this.b)}${k(
    (isNaN(this.opacity) ? 1 : this.opacity) * 255
  )}`;
}
function Yt() {
  const t = lt(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${S(this.r)}, ${S(this.g)}, ${S(
    this.b
  )}${t === 1 ? ")" : `, ${t})`}`;
}
function lt(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function S(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function k(t) {
  return (t = S(t)), (t < 16 ? "0" : "") + t.toString(16);
}
function Ut(t, n, e, r) {
  return (
    r <= 0
      ? (t = n = e = NaN)
      : e <= 0 || e >= 1
      ? (t = n = NaN)
      : n <= 0 && (t = NaN),
    new x(t, n, e, r)
  );
}
function _n(t) {
  if (t instanceof x) return new x(t.h, t.s, t.l, t.opacity);
  if ((t instanceof Z || (t = W(t)), !t)) return new x();
  if (t instanceof x) return t;
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
    new x(s, c, a, t.opacity)
  );
}
function Tr(t, n, e, r) {
  return arguments.length === 1 ? _n(t) : new x(t, n, e, r ?? 1);
}
function x(t, n, e, r) {
  (this.h = +t), (this.s = +n), (this.l = +e), (this.opacity = +r);
}
Tt(
  x,
  Tr,
  yn(Z, {
    brighter(t) {
      return (
        (t = t == null ? at : Math.pow(at, t)),
        new x(this.h, this.s, this.l * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? U : Math.pow(U, t)),
        new x(this.h, this.s, this.l * t, this.opacity)
      );
    },
    rgb() {
      var t = (this.h % 360) + (this.h < 0) * 360,
        n = isNaN(t) || isNaN(this.s) ? 0 : this.s,
        e = this.l,
        r = e + (e < 0.5 ? e : 1 - e) * n,
        i = 2 * e - r;
      return new m(
        mt(t >= 240 ? t - 240 : t + 120, i, r),
        mt(t, i, r),
        mt(t < 120 ? t + 240 : t - 120, i, r),
        this.opacity
      );
    },
    clamp() {
      return new x(zt(this.h), nt(this.s), nt(this.l), lt(this.opacity));
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
      const t = lt(this.opacity);
      return `${t === 1 ? "hsl(" : "hsla("}${zt(this.h)}, ${
        nt(this.s) * 100
      }%, ${nt(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
    },
  })
);
function zt(t) {
  return (t = (t || 0) % 360), t < 0 ? t + 360 : t;
}
function nt(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function mt(t, n, e) {
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
const wn = (t) => () => t;
function kr(t, n) {
  return function (e) {
    return t + e * n;
  };
}
function Pr(t, n, e) {
  return (
    (t = Math.pow(t, e)),
    (n = Math.pow(n, e) - t),
    (e = 1 / e),
    function (r) {
      return Math.pow(t + r * n, e);
    }
  );
}
function Sr(t) {
  return (t = +t) == 1
    ? xn
    : function (n, e) {
        return e - n ? Pr(n, e, t) : wn(isNaN(n) ? e : n);
      };
}
function xn(t, n) {
  var e = n - t;
  return e ? kr(t, e) : wn(isNaN(t) ? n : t);
}
const Wt = (function t(n) {
  var e = Sr(n);
  function r(i, o) {
    var s = e((i = xt(i)).r, (o = xt(o)).r),
      c = e(i.g, o.g),
      a = e(i.b, o.b),
      l = xn(i.opacity, o.opacity);
    return function (u) {
      return (
        (i.r = s(u)), (i.g = c(u)), (i.b = a(u)), (i.opacity = l(u)), i + ""
      );
    };
  }
  return (r.gamma = t), r;
})(1);
function $(t, n) {
  return (
    (t = +t),
    (n = +n),
    function (e) {
      return t * (1 - e) + n * e;
    }
  );
}
var vt = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  yt = new RegExp(vt.source, "g");
function Dr(t) {
  return function () {
    return t;
  };
}
function Rr(t) {
  return function (n) {
    return t(n) + "";
  };
}
function Or(t, n) {
  var e = (vt.lastIndex = yt.lastIndex = 0),
    r,
    i,
    o,
    s = -1,
    c = [],
    a = [];
  for (t = t + "", n = n + ""; (r = vt.exec(t)) && (i = yt.exec(n)); )
    (o = i.index) > e &&
      ((o = n.slice(e, o)), c[s] ? (c[s] += o) : (c[++s] = o)),
      (r = r[0]) === (i = i[0])
        ? c[s]
          ? (c[s] += i)
          : (c[++s] = i)
        : ((c[++s] = null), a.push({ i: s, x: $(r, i) })),
      (e = yt.lastIndex);
  return (
    e < n.length && ((o = n.slice(e)), c[s] ? (c[s] += o) : (c[++s] = o)),
    c.length < 2
      ? a[0]
        ? Rr(a[0].x)
        : Dr(n)
      : ((n = a.length),
        function (l) {
          for (var u = 0, f; u < n; ++u) c[(f = a[u]).i] = f.x(l);
          return c.join("");
        })
  );
}
var Kt = 180 / Math.PI,
  bt = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1,
  };
function vn(t, n, e, r, i, o) {
  var s, c, a;
  return (
    (s = Math.sqrt(t * t + n * n)) && ((t /= s), (n /= s)),
    (a = t * e + n * r) && ((e -= t * a), (r -= n * a)),
    (c = Math.sqrt(e * e + r * r)) && ((e /= c), (r /= c), (a /= c)),
    t * r < n * e && ((t = -t), (n = -n), (a = -a), (s = -s)),
    {
      translateX: i,
      translateY: o,
      rotate: Math.atan2(n, t) * Kt,
      skewX: Math.atan(a) * Kt,
      scaleX: s,
      scaleY: c,
    }
  );
}
var et;
function Mr(t) {
  const n = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(
    t + ""
  );
  return n.isIdentity ? bt : vn(n.a, n.b, n.c, n.d, n.e, n.f);
}
function Lr(t) {
  return t == null ||
    (et || (et = document.createElementNS("http://www.w3.org/2000/svg", "g")),
    et.setAttribute("transform", t),
    !(t = et.transform.baseVal.consolidate()))
    ? bt
    : ((t = t.matrix), vn(t.a, t.b, t.c, t.d, t.e, t.f));
}
function bn(t, n, e, r) {
  function i(l) {
    return l.length ? l.pop() + " " : "";
  }
  function o(l, u, f, h, p, d) {
    if (l !== f || u !== h) {
      var g = p.push("translate(", null, n, null, e);
      d.push({ i: g - 4, x: $(l, f) }, { i: g - 2, x: $(u, h) });
    } else (f || h) && p.push("translate(" + f + n + h + e);
  }
  function s(l, u, f, h) {
    l !== u
      ? (l - u > 180 ? (u += 360) : u - l > 180 && (l += 360),
        h.push({ i: f.push(i(f) + "rotate(", null, r) - 2, x: $(l, u) }))
      : u && f.push(i(f) + "rotate(" + u + r);
  }
  function c(l, u, f, h) {
    l !== u
      ? h.push({ i: f.push(i(f) + "skewX(", null, r) - 2, x: $(l, u) })
      : u && f.push(i(f) + "skewX(" + u + r);
  }
  function a(l, u, f, h, p, d) {
    if (l !== f || u !== h) {
      var g = p.push(i(p) + "scale(", null, ",", null, ")");
      d.push({ i: g - 4, x: $(l, f) }, { i: g - 2, x: $(u, h) });
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
        for (var d = -1, g = h.length, T; ++d < g; ) f[(T = h[d]).i] = T.x(p);
        return f.join("");
      }
    );
  };
}
var Hr = bn(Mr, "px, ", "px)", "deg)"),
  Gr = bn(Lr, ", ", ")", ")"),
  L = 0,
  X = 0,
  B = 0,
  En = 1e3,
  ut,
  F,
  ft = 0,
  D = 0,
  dt = 0,
  K = typeof performance == "object" && performance.now ? performance : Date,
  Nn =
    typeof window == "object" && window.requestAnimationFrame
      ? window.requestAnimationFrame.bind(window)
      : function (t) {
          setTimeout(t, 17);
        };
function kt() {
  return D || (Nn(Br), (D = K.now() + dt));
}
function Br() {
  D = 0;
}
function ht() {
  this._call = this._time = this._next = null;
}
ht.prototype = In.prototype = {
  constructor: ht,
  restart: function (t, n, e) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    (e = (e == null ? kt() : +e) + (n == null ? 0 : +n)),
      !this._next &&
        F !== this &&
        (F ? (F._next = this) : (ut = this), (F = this)),
      (this._call = t),
      (this._time = e),
      Et();
  },
  stop: function () {
    this._call && ((this._call = null), (this._time = 1 / 0), Et());
  },
};
function In(t, n, e) {
  var r = new ht();
  return r.restart(t, n, e), r;
}
function Xr() {
  kt(), ++L;
  for (var t = ut, n; t; )
    (n = D - t._time) >= 0 && t._call.call(void 0, n), (t = t._next);
  --L;
}
function Jt() {
  (D = (ft = K.now()) + dt), (L = X = 0);
  try {
    Xr();
  } finally {
    (L = 0), qr(), (D = 0);
  }
}
function Fr() {
  var t = K.now(),
    n = t - ft;
  n > En && ((dt -= n), (ft = t));
}
function qr() {
  for (var t, n = ut, e, r = 1 / 0; n; )
    n._call
      ? (r > n._time && (r = n._time), (t = n), (n = n._next))
      : ((e = n._next), (n._next = null), (n = t ? (t._next = e) : (ut = e)));
  (F = t), Et(r);
}
function Et(t) {
  if (!L) {
    X && (X = clearTimeout(X));
    var n = t - D;
    n > 24
      ? (t < 1 / 0 && (X = setTimeout(Jt, t - K.now() - dt)),
        B && (B = clearInterval(B)))
      : (B || ((ft = K.now()), (B = setInterval(Fr, En))), (L = 1), Nn(Jt));
  }
}
function Qt(t, n, e) {
  var r = new ht();
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
var Vr = rn("start", "end", "cancel", "interrupt"),
  Yr = [],
  Cn = 0,
  Zt = 1,
  Nt = 2,
  ot = 3,
  jt = 4,
  It = 5,
  st = 6;
function gt(t, n, e, r, i, o) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (e in s) return;
  Ur(t, e, {
    name: n,
    index: r,
    group: i,
    on: Vr,
    tween: Yr,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: Cn,
  });
}
function Pt(t, n) {
  var e = v(t, n);
  if (e.state > Cn) throw new Error("too late; already scheduled");
  return e;
}
function E(t, n) {
  var e = v(t, n);
  if (e.state > ot) throw new Error("too late; already running");
  return e;
}
function v(t, n) {
  var e = t.__transition;
  if (!e || !(e = e[n])) throw new Error("transition not found");
  return e;
}
function Ur(t, n, e) {
  var r = t.__transition,
    i;
  (r[n] = e), (e.timer = In(o, 0, e.time));
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
        if (p.state === ot) return Qt(s);
        p.state === jt
          ? ((p.state = st),
            p.timer.stop(),
            p.on.call("interrupt", t, t.__data__, p.index, p.group),
            delete r[u])
          : +u < n &&
            ((p.state = st),
            p.timer.stop(),
            p.on.call("cancel", t, t.__data__, p.index, p.group),
            delete r[u]);
      }
    if (
      (Qt(function () {
        e.state === ot &&
          ((e.state = jt), e.timer.restart(c, e.delay, e.time), c(l));
      }),
      (e.state = Nt),
      e.on.call("start", t, t.__data__, e.index, e.group),
      e.state === Nt)
    ) {
      for (
        e.state = ot, i = new Array((h = e.tween.length)), u = 0, f = -1;
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
            : (e.timer.restart(a), (e.state = It), 1),
        f = -1,
        h = i.length;
      ++f < h;

    )
      i[f].call(t, u);
    e.state === It && (e.on.call("end", t, t.__data__, e.index, e.group), a());
  }
  function a() {
    (e.state = st), e.timer.stop(), delete r[n];
    for (var l in r) return;
    delete t.__transition;
  }
}
function zr(t, n) {
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
      (i = r.state > Nt && r.state < It),
        (r.state = st),
        r.timer.stop(),
        r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group),
        delete e[s];
    }
    o && delete t.__transition;
  }
}
function Wr(t) {
  return this.each(function () {
    zr(this, t);
  });
}
function Kr(t, n) {
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
function Jr(t, n, e) {
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
function Qr(t, n) {
  var e = this._id;
  if (((t += ""), arguments.length < 2)) {
    for (var r = v(this.node(), e).tween, i = 0, o = r.length, s; i < o; ++i)
      if ((s = r[i]).name === t) return s.value;
    return null;
  }
  return this.each((n == null ? Kr : Jr)(e, t, n));
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
function $n(t, n) {
  var e;
  return (
    typeof n == "number"
      ? $
      : n instanceof W
      ? Wt
      : (e = W(n))
      ? ((n = e), Wt)
      : Or
  )(t, n);
}
function Zr(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function jr(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function ti(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = this.getAttribute(t);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function ni(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = this.getAttributeNS(t.space, t.local);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function ei(t, n, e) {
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
function ri(t, n, e) {
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
function ii(t, n) {
  var e = pt(t),
    r = e === "transform" ? Gr : $n;
  return this.attrTween(
    t,
    typeof n == "function"
      ? (e.local ? ri : ei)(e, r, St(this, "attr." + t, n))
      : n == null
      ? (e.local ? jr : Zr)(e)
      : (e.local ? ni : ti)(e, r, n)
  );
}
function oi(t, n) {
  return function (e) {
    this.setAttribute(t, n.call(this, e));
  };
}
function si(t, n) {
  return function (e) {
    this.setAttributeNS(t.space, t.local, n.call(this, e));
  };
}
function ci(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && si(t, o)), e;
  }
  return (i._value = n), i;
}
function ai(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && oi(t, o)), e;
  }
  return (i._value = n), i;
}
function li(t, n) {
  var e = "attr." + t;
  if (arguments.length < 2) return (e = this.tween(e)) && e._value;
  if (n == null) return this.tween(e, null);
  if (typeof n != "function") throw new Error();
  var r = pt(t);
  return this.tween(e, (r.local ? ci : ai)(r, n));
}
function ui(t, n) {
  return function () {
    Pt(this, t).delay = +n.apply(this, arguments);
  };
}
function fi(t, n) {
  return (
    (n = +n),
    function () {
      Pt(this, t).delay = n;
    }
  );
}
function hi(t) {
  var n = this._id;
  return arguments.length
    ? this.each((typeof t == "function" ? ui : fi)(n, t))
    : v(this.node(), n).delay;
}
function pi(t, n) {
  return function () {
    E(this, t).duration = +n.apply(this, arguments);
  };
}
function di(t, n) {
  return (
    (n = +n),
    function () {
      E(this, t).duration = n;
    }
  );
}
function gi(t) {
  var n = this._id;
  return arguments.length
    ? this.each((typeof t == "function" ? pi : di)(n, t))
    : v(this.node(), n).duration;
}
function mi(t, n) {
  if (typeof n != "function") throw new Error();
  return function () {
    E(this, t).ease = n;
  };
}
function yi(t) {
  var n = this._id;
  return arguments.length ? this.each(mi(n, t)) : v(this.node(), n).ease;
}
function _i(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    if (typeof e != "function") throw new Error();
    E(this, t).ease = e;
  };
}
function wi(t) {
  if (typeof t != "function") throw new Error();
  return this.each(_i(this._id, t));
}
function xi(t) {
  typeof t != "function" && (t = cn(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, c = (r[i] = []), a, l = 0; l < s; ++l)
      (a = o[l]) && t.call(a, a.__data__, l, o) && c.push(a);
  return new C(r, this._parents, this._name, this._id);
}
function vi(t) {
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
function bi(t) {
  return (t + "")
    .trim()
    .split(/^|\s+/)
    .every(function (n) {
      var e = n.indexOf(".");
      return e >= 0 && (n = n.slice(0, e)), !n || n === "start";
    });
}
function Ei(t, n, e) {
  var r,
    i,
    o = bi(n) ? Pt : E;
  return function () {
    var s = o(this, t),
      c = s.on;
    c !== r && (i = (r = c).copy()).on(n, e), (s.on = i);
  };
}
function Ni(t, n) {
  var e = this._id;
  return arguments.length < 2
    ? v(this.node(), e).on.on(t)
    : this.each(Ei(e, t, n));
}
function Ii(t) {
  return function () {
    var n = this.parentNode;
    for (var e in this.__transition) if (+e !== t) return;
    n && n.removeChild(this);
  };
}
function Ci() {
  return this.on("end.remove", Ii(this._id));
}
function $i(t) {
  var n = this._name,
    e = this._id;
  typeof t != "function" && (t = $t(t));
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
        gt(l[h], n, e, h, l, v(u, e)));
  return new C(o, this._parents, n, e);
}
function Ai(t) {
  var n = this._name,
    e = this._id;
  typeof t != "function" && (t = sn(t));
  for (var r = this._groups, i = r.length, o = [], s = [], c = 0; c < i; ++c)
    for (var a = r[c], l = a.length, u, f = 0; f < l; ++f)
      if ((u = a[f])) {
        for (
          var h = t.call(u, u.__data__, f, a),
            p,
            d = v(u, e),
            g = 0,
            T = h.length;
          g < T;
          ++g
        )
          (p = h[g]) && gt(p, n, e, g, h, d);
        o.push(h), s.push(u);
      }
  return new C(o, s, n, e);
}
var Ti = Q.prototype.constructor;
function ki() {
  return new Ti(this._groups, this._parents);
}
function Pi(t, n) {
  var e, r, i;
  return function () {
    var o = M(this, t),
      s = (this.style.removeProperty(t), M(this, t));
    return o === s ? null : o === e && s === r ? i : (i = n((e = o), (r = s)));
  };
}
function An(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function Si(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = M(this, t);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function Di(t, n, e) {
  var r, i, o;
  return function () {
    var s = M(this, t),
      c = e(this),
      a = c + "";
    return (
      c == null && (a = c = (this.style.removeProperty(t), M(this, t))),
      s === a ? null : s === r && a === i ? o : ((i = a), (o = n((r = s), c)))
    );
  };
}
function Ri(t, n) {
  var e,
    r,
    i,
    o = "style." + n,
    s = "end." + o,
    c;
  return function () {
    var a = E(this, t),
      l = a.on,
      u = a.value[o] == null ? c || (c = An(n)) : void 0;
    (l !== e || i !== u) && (r = (e = l).copy()).on(s, (i = u)), (a.on = r);
  };
}
function Oi(t, n, e) {
  var r = (t += "") == "transform" ? Hr : $n;
  return n == null
    ? this.styleTween(t, Pi(t, r)).on("end.style." + t, An(t))
    : typeof n == "function"
    ? this.styleTween(t, Di(t, r, St(this, "style." + t, n))).each(
        Ri(this._id, t)
      )
    : this.styleTween(t, Si(t, r, n), e).on("end.style." + t, null);
}
function Mi(t, n, e) {
  return function (r) {
    this.style.setProperty(t, n.call(this, r), e);
  };
}
function Li(t, n, e) {
  var r, i;
  function o() {
    var s = n.apply(this, arguments);
    return s !== i && (r = (i = s) && Mi(t, s, e)), r;
  }
  return (o._value = n), o;
}
function Hi(t, n, e) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (n == null) return this.tween(r, null);
  if (typeof n != "function") throw new Error();
  return this.tween(r, Li(t, n, e ?? ""));
}
function Gi(t) {
  return function () {
    this.textContent = t;
  };
}
function Bi(t) {
  return function () {
    var n = t(this);
    this.textContent = n ?? "";
  };
}
function Xi(t) {
  return this.tween(
    "text",
    typeof t == "function"
      ? Bi(St(this, "text", t))
      : Gi(t == null ? "" : t + "")
  );
}
function Fi(t) {
  return function (n) {
    this.textContent = t.call(this, n);
  };
}
function qi(t) {
  var n, e;
  function r() {
    var i = t.apply(this, arguments);
    return i !== e && (n = (e = i) && Fi(i)), n;
  }
  return (r._value = t), r;
}
function Vi(t) {
  var n = "text";
  if (arguments.length < 1) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, qi(t));
}
function Yi() {
  for (
    var t = this._name,
      n = this._id,
      e = Tn(),
      r = this._groups,
      i = r.length,
      o = 0;
    o < i;
    ++o
  )
    for (var s = r[o], c = s.length, a, l = 0; l < c; ++l)
      if ((a = s[l])) {
        var u = v(a, n);
        gt(a, t, e, l, s, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease,
        });
      }
  return new C(r, this._parents, t, e);
}
function Ui() {
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
var zi = 0;
function C(t, n, e, r) {
  (this._groups = t), (this._parents = n), (this._name = e), (this._id = r);
}
function Tn() {
  return ++zi;
}
var N = Q.prototype;
C.prototype = {
  constructor: C,
  select: $i,
  selectAll: Ai,
  selectChild: N.selectChild,
  selectChildren: N.selectChildren,
  filter: xi,
  merge: vi,
  selection: ki,
  transition: Yi,
  call: N.call,
  nodes: N.nodes,
  node: N.node,
  size: N.size,
  empty: N.empty,
  each: N.each,
  on: Ni,
  attr: ii,
  attrTween: li,
  style: Oi,
  styleTween: Hi,
  text: Xi,
  textTween: Vi,
  remove: Ci,
  tween: Qr,
  delay: hi,
  duration: gi,
  ease: yi,
  easeVarying: wi,
  end: Ui,
  [Symbol.iterator]: N[Symbol.iterator],
};
function Wi(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Ki = { time: null, delay: 0, duration: 250, ease: Wi };
function Ji(t, n) {
  for (var e; !(e = t.__transition) || !(e = e[n]); )
    if (!(t = t.parentNode)) throw new Error(`transition ${n} not found`);
  return e;
}
function Qi(t) {
  var n, e;
  t instanceof C
    ? ((n = t._id), (t = t._name))
    : ((n = Tn()), ((e = Ki).time = kt()), (t = t == null ? null : t + ""));
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], c = s.length, a, l = 0; l < c; ++l)
      (a = s[l]) && gt(a, t, n, l, s, e || Ji(a, n));
  return new C(r, this._parents, t, n);
}
Q.prototype.interrupt = Wr;
Q.prototype.transition = Qi;
function Zi(t) {
  if (!t.ok) throw new Error(t.status + " " + t.statusText);
  return t.text();
}
function ji(t, n) {
  return fetch(t, n).then(Zi);
}
function to(t) {
  return (n, e) => ji(n, e).then((r) => new DOMParser().parseFromString(r, t));
}
const no = to("application/xml");
function q(t, n, e) {
  (this.k = t), (this.x = n), (this.y = e);
}
q.prototype = {
  constructor: q,
  scale: function (t) {
    return t === 1 ? this : new q(this.k * t, this.x, this.y);
  },
  translate: function (t, n) {
    return (t === 0) & (n === 0)
      ? this
      : new q(this.k, this.x + this.k * t, this.y + this.k * n);
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
q.prototype;
class kn {
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
    if (Gt("#" + this.id).node() != null) return;
    const n = await no(this.url);
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
      this.sensor.node().append(Gt(n.documentElement).node());
  }
}
const R = [
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
    "_x30_.1.0.220.2.3-0",
    "_x30_.1.0.221.0.5.13-6",
    "_x30_.1.0.224.0.10_1_-3",
    "_x30_.1.0.223.0.0.1.12-2",
    "_x30_.1.0.224.0.10-7",
    "_x30_.1.0.226.0.1",
    "_x30_.1.0.227.1",
  ],
  P = {
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
    "_x30_.1.0.220.2.3-0": "HDMI",
    "_x30_.1.0.221.0.5.13-6": "Power",
    "_x30_.1.0.223.0.0.1.12-2": "Ethernet",
    "_x30_.1.0.224.0.10-7": "USB 0",
    "_x30_.1.0.224.0.10_1_-3": "USB 1",
    "_x30_.1.0.226.0.1": "CSI Camera",
    "_x30_.1.0.227.1": "DSI Display",
  },
  Dt = ["vcc", "gnd", "out"],
  V = {
    vcc: "VCC of DHT11 Sensor",
    gnd: "Ground pin of DHT11 Sensor",
    out: "Out pin DHT11 Sensor",
  },
  eo = (t) => {
    if (t.length == 0) return { error: "No connection found" };
    const n = ["GPIO", "GND", "vcc", "gnd", "out", "5V PWR"];
    let e = 0;
    return (
      t.forEach((r) => {
        if (n.find((i) => i == r.connector)) {
          e++;
          return;
        }
        if (P[r.connector] == "GND") {
          e++;
          return;
        }
        if (P[r.connector].includes("GPIO")) {
          e++;
          return;
        }
      }),
      console.log(e),
      e == 5
    );
  };
class ro {
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
      const e = P[this.connections[this.connections.length - 2].connector]
          ? `${
              P[this.connections[this.connections.length - 2].connector]
            } pin of Raspberry Pi`
          : V[this.connections[this.connections.length - 2].connector]
          ? V[this.connections[this.connections.length - 2].connector]
          : this.connections[this.connections.length - 2].connector,
        r = P[this.connections[this.connections.length - 1].connector]
          ? `${
              P[this.connections[this.connections.length - 1].connector]
            } pin of Raspberry Pi`
          : V[this.connections[this.connections.length - 1].connector]
          ? V[this.connections[this.connections.length - 1].connector]
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
class io {
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
const tn = (t, n) => {
    Rt.append("path")
      .attr("d", t)
      .attr("stroke", "black")
      .attr("stroke-width", "2px")
      .attr("fill", "none")
      .attr("id", n);
  },
  nn = (t, n, e) => {
    w.append("circle")
      .attr("cx", t)
      .attr("cy", n)
      .attr("r", 3)
      .attr("fill", "black")
      .attr("id", e);
  },
  w = Y.select("#svg")
    .append("svg")
    .attr("id", "svgContainer")
    .attr(
      "height",
      window.innerHeight - document.getElementById("svg").offsetTop
    )
    .attr("width", document.getElementById("svg").offsetWidth),
  oo = new kn("raspberry", w, "images/pi3dirk.svg", 1, !1, 0, 0),
  so = new kn("sensorDHT11", w, "images/sensor.svg", 2.5, !1, 300, 35),
  Rt = w.append("g").attr("id", "pathsGroup"),
  Pn = document.getElementById("rasberryPi"),
  Sn = document.getElementById("sensor"),
  J = document.getElementById("displayInfo"),
  rt = document.getElementById("componentDescription"),
  Ct = document.getElementById("undoButton"),
  H = document.getElementById("temperature");
H.disabled = !0;
H.style.opacity = "0.5";
const A = new ro("connectionLog"),
  en = new io("errorBox", "errorHeading", "errorText", "closeErrorBox");
let _,
  I = 0,
  Dn = !1;
Ct.addEventListener("click", () => {
  A.undoLastConnection(), ao();
});
const co = (t) => {
    Rt.selectAll(`path[id="${t}"]`)
      .nodes()
      .forEach((e) => e.remove());
  },
  ao = () => {
    if (_) {
      Rt.selectAll(`path[id^="path${I}"]`)
        .nodes()
        .forEach((e) => e.remove());
      const n = w.select(`#marker-start-${I}`);
      n.empty() || n.remove(),
        (_ = null),
        console.log("Removed all incomplete paths and markers");
      return;
    }
    if (A.connections.length > 0) {
      const t = A.connections[A.connections.length - 1],
        n = t.lineID,
        e = parseInt(n.replace("path", ""));
      co(n);
      const r = w.select(`#marker-start-${e}`);
      r.empty() || r.remove();
      const i = w.select(`#marker-end-${e}`);
      i.empty() || i.remove(),
        R.includes(t.connector) &&
          Y.select(`#${t.connector}`).style("fill", "#9a916c"),
        t.connectorEnd &&
          R.includes(t.connectorEnd) &&
          Y.select(`#${t.connectorEnd}`).style("fill", "#9a916c"),
        A.connections.pop(),
        console.log(`Removed paths and markers with line ID: ${n}`);
    } else console.warn("No more connections to undo");
  };
Pn.addEventListener("click", async () => {
  await oo.load();
});
Sn.addEventListener("click", async () => {
  await so.load();
});
const lo =
    "Raspberry Pi: A small single-board computer for learning and prototyping. The 5V pin connects to the DHT11 VCC for power, GND pin connects to the DHT11 GND for a common ground, and GPIO4 (Physical Pin 7) connects to the sensor’s Data Out to receive temperature and humidity data.",
  uo =
    "DHT11 Sensor: A basic temperature and humidity sensor with digital output. The VCC pin connects to the Raspberry Pi’s 5V for power, GND pin connects to the Raspberry Pi’s GND, and Data Out pin connects to GPIO4 (Physical Pin 7) to send data for processing.",
  Rn = (t, n) => {
    t.addEventListener("mouseover", () => {
      (rt.innerHTML = n), (rt.style.display = "block");
    }),
      t.addEventListener("mouseout", () => {
        (rt.style.display = "none"), (rt.innerHTML = "");
      });
  };
Rn(Pn, lo);
Rn(Sn, uo);
const _t = (t) => R.includes(t.srcElement.id) || Dt.includes(t.srcElement.id);
w.on("dblclick", (t) => {
  if (_t(t) && !_) {
    (_ = new Mn()),
      _.moveTo(t.offsetX, t.offsetY),
      R.includes(t.srcElement.id)
        ? Y.select(`#${t.srcElement.id}`).style("fill", "black")
        : nn(t.offsetX, t.offsetY, `marker-start-${I}`),
      A.addConnection({
        lineID: `path${I}`,
        x: t.offsetX,
        y: t.offsetY,
        connector: t.srcElement.id,
        connectorEnd: null,
        incomplete: !0,
      }),
      w.style("cursor", "crosshair"),
      console.log("Path started");
    return;
  }
  if (t.srcElement.id === "svgContainer" && !_t(t)) {
    _ &&
      (_.lineTo(t.offsetX, t.offsetY),
      tn(_.toString(), `path${I}`),
      console.log("Path segment added"));
    return;
  }
  if (_t(t) && _) {
    _.lineTo(t.offsetX, t.offsetY),
      tn(_.toString(), `path${I}`),
      R.includes(t.srcElement.id)
        ? Y.select(`#${t.srcElement.id}`).style("fill", "black")
        : nn(t.offsetX, t.offsetY, `marker-end-${I}`),
      A.addConnection({
        lineID: `path${I}`,
        x: t.offsetX,
        y: t.offsetY,
        connector: t.srcElement.id,
        connectorEnd: t.srcElement.id,
        incomplete: !1,
      }),
      I++,
      w.style("cursor", "default"),
      (_ = null),
      console.log("Path completed");
    return;
  }
});
w.on("mouseover", (t) => {
  R.includes(t.srcElement.id)
    ? (J.innerHTML = P[t.srcElement.id])
    : Dt.includes(t.srcElement.id) &&
      (J.innerHTML = V[t.srcElement.id] || "DHT11 Sensor Connector");
});
w.on("mouseout", (t) => {
  (R.includes(t.srcElement.id) || Dt.includes(t.srcElement.id)) &&
    (J.innerHTML = "CONNECTOR INFO");
});
const fo = () => {
  const t = document.getElementById("temperature").value;
  J.innerHTML = `Temperature: ${t}°C`;
};
H.addEventListener("input", () => {
  const t = parseInt(H.value);
  if (((J.innerHTML = `Temperature: ${t}°C`), Dn)) {
    const n = document.getElementById("tempChangeMessage");
    (n.style.display = "block"),
      t > 70
        ? ((n.textContent = `WARNING: High temperature detected - ${t}°C`),
          (n.className = "warning"))
        : ((n.textContent = `Temperature updated to ${t}°C`),
          (n.className = "normal")),
      console.log(`Message set: ${n.textContent}`),
      setTimeout(() => {
        (n.style.opacity = "0"),
          setTimeout(() => {
            (n.style.display = "none"), (n.style.opacity = "1");
          }, 500);
      }, 2e3);
  }
});
fo();
document.getElementById("codeSubmit").addEventListener("click", () => {
  const t = eo(A.getConnectionLog());
  t === !0
    ? ((Dn = !0),
      (Ct.disabled = !0),
      (Ct.style.opacity = "0.5"),
      (H.disabled = !1),
      (H.style.opacity = "1"),
      document.querySelector("#my-drawer-4").click(),
      console.log(
        "Circuit complete, UNDO button disabled, temperature slider enabled"
      ))
    : t.error
    ? en.throw("Error", t.error)
    : en.throw(
        "Error",
        "Please connect the components properly. Refer to the connection diagram."
      );
});
