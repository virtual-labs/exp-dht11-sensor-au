import * as kn from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import { Path as Dn } from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
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
var Rn = { value: () => {} };
function jt() {
  for (var t = 0, n = arguments.length, e = {}, r; t < n; ++t) {
    if (!(r = arguments[t] + "") || r in e || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    e[r] = [];
  }
  return new tt(e);
}
function tt(t) {
  this._ = t;
}
function On(t, n) {
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
tt.prototype = jt.prototype = {
  constructor: tt,
  on: function (t, n) {
    var e = this._,
      r = On(t + "", e),
      i,
      o = -1,
      s = r.length;
    if (arguments.length < 2) {
      for (; ++o < s; )
        if ((i = (t = r[o]).type) && (i = Ln(e[i], t.name))) return i;
      return;
    }
    if (n != null && typeof n != "function")
      throw new Error("invalid callback: " + n);
    for (; ++o < s; )
      if ((i = (t = r[o]).type)) e[i] = kt(e[i], t.name, n);
      else if (n == null) for (i in e) e[i] = kt(e[i], t.name, null);
    return this;
  },
  copy: function () {
    var t = {},
      n = this._;
    for (var e in n) t[e] = n[e].slice();
    return new tt(t);
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
function Ln(t, n) {
  for (var e = 0, r = t.length, i; e < r; ++e)
    if ((i = t[e]).name === n) return i.value;
}
function kt(t, n, e) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === n) {
      (t[r] = Rn), (t = t.slice(0, r).concat(t.slice(r + 1)));
      break;
    }
  return e != null && t.push({ name: n, value: e }), t;
}
var dt = "http://www.w3.org/1999/xhtml";
const Dt = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: dt,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/",
};
function lt(t) {
  var n = (t += ""),
    e = n.indexOf(":");
  return (
    e >= 0 && (n = t.slice(0, e)) !== "xmlns" && (t = t.slice(e + 1)),
    Dt.hasOwnProperty(n) ? { space: Dt[n], local: t } : t
  );
}
function Mn(t) {
  return function () {
    var n = this.ownerDocument,
      e = this.namespaceURI;
    return e === dt && n.documentElement.namespaceURI === dt
      ? n.createElement(t)
      : n.createElementNS(e, t);
  };
}
function Gn(t) {
  return function () {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function tn(t) {
  var n = lt(t);
  return (n.local ? Gn : Mn)(n);
}
function Hn() {}
function vt(t) {
  return t == null
    ? Hn
    : function () {
        return this.querySelector(t);
      };
}
function Bn(t) {
  typeof t != "function" && (t = vt(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (
      var o = n[i], s = o.length, c = (r[i] = new Array(s)), a, l, u = 0;
      u < s;
      ++u
    )
      (a = o[u]) &&
        (l = t.call(a, a.__data__, u, o)) &&
        ("__data__" in a && (l.__data__ = a.__data__), (c[u] = l));
  return new _(r, this._parents);
}
function Xn(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Fn() {
  return [];
}
function nn(t) {
  return t == null
    ? Fn
    : function () {
        return this.querySelectorAll(t);
      };
}
function qn(t) {
  return function () {
    return Xn(t.apply(this, arguments));
  };
}
function Vn(t) {
  typeof t == "function" ? (t = qn(t)) : (t = nn(t));
  for (var n = this._groups, e = n.length, r = [], i = [], o = 0; o < e; ++o)
    for (var s = n[o], c = s.length, a, l = 0; l < c; ++l)
      (a = s[l]) && (r.push(t.call(a, a.__data__, l, s)), i.push(a));
  return new _(r, i);
}
function en(t) {
  return function () {
    return this.matches(t);
  };
}
function rn(t) {
  return function (n) {
    return n.matches(t);
  };
}
var Yn = Array.prototype.find;
function Un(t) {
  return function () {
    return Yn.call(this.children, t);
  };
}
function zn() {
  return this.firstElementChild;
}
function Wn(t) {
  return this.select(t == null ? zn : Un(typeof t == "function" ? t : rn(t)));
}
var Kn = Array.prototype.filter;
function Jn() {
  return Array.from(this.children);
}
function Qn(t) {
  return function () {
    return Kn.call(this.children, t);
  };
}
function Zn(t) {
  return this.selectAll(
    t == null ? Jn : Qn(typeof t == "function" ? t : rn(t))
  );
}
function jn(t) {
  typeof t != "function" && (t = en(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, c = (r[i] = []), a, l = 0; l < s; ++l)
      (a = o[l]) && t.call(a, a.__data__, l, o) && c.push(a);
  return new _(r, this._parents);
}
function on(t) {
  return new Array(t.length);
}
function te() {
  return new _(this._enter || this._groups.map(on), this._parents);
}
function rt(t, n) {
  (this.ownerDocument = t.ownerDocument),
    (this.namespaceURI = t.namespaceURI),
    (this._next = null),
    (this._parent = t),
    (this.__data__ = n);
}
rt.prototype = {
  constructor: rt,
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
function ne(t) {
  return function () {
    return t;
  };
}
function ee(t, n, e, r, i, o) {
  for (var s = 0, c, a = n.length, l = o.length; s < l; ++s)
    (c = n[s]) ? ((c.__data__ = o[s]), (r[s] = c)) : (e[s] = new rt(t, o[s]));
  for (; s < a; ++s) (c = n[s]) && (i[s] = c);
}
function re(t, n, e, r, i, o, s) {
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
        : (e[c] = new rt(t, o[c]));
  for (c = 0; c < u; ++c) (a = n[c]) && l.get(h[c]) === a && (i[c] = a);
}
function ie(t) {
  return t.__data__;
}
function oe(t, n) {
  if (!arguments.length) return Array.from(this, ie);
  var e = n ? re : ee,
    r = this._parents,
    i = this._groups;
  typeof t != "function" && (t = ne(t));
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
      p = se(t.call(u, u && u.__data__, l, r)),
      d = p.length,
      g = (c[l] = new Array(d)),
      A = (s[l] = new Array(d)),
      Sn = (a[l] = new Array(h));
    e(u, f, g, A, Sn, p, n);
    for (var M = 0, W = 0, Pt, St; M < d; ++M)
      if ((Pt = g[M])) {
        for (M >= W && (W = M + 1); !(St = A[W]) && ++W < d; );
        Pt._next = St || null;
      }
  }
  return (s = new _(s, r)), (s._enter = c), (s._exit = a), s;
}
function se(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function ce() {
  return new _(this._exit || this._groups.map(on), this._parents);
}
function ae(t, n, e) {
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
function le(t) {
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
  return new _(c, this._parents);
}
function ue() {
  for (var t = this._groups, n = -1, e = t.length; ++n < e; )
    for (var r = t[n], i = r.length - 1, o = r[i], s; --i >= 0; )
      (s = r[i]) &&
        (o &&
          s.compareDocumentPosition(o) ^ 4 &&
          o.parentNode.insertBefore(s, o),
        (o = s));
  return this;
}
function fe(t) {
  t || (t = he);
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
  return new _(i, this._parents).order();
}
function he(t, n) {
  return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
function pe() {
  var t = arguments[0];
  return (arguments[0] = this), t.apply(null, arguments), this;
}
function de() {
  return Array.from(this);
}
function ge() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
      var s = r[i];
      if (s) return s;
    }
  return null;
}
function me() {
  let t = 0;
  for (const n of this) ++t;
  return t;
}
function _e() {
  return !this.node();
}
function ye(t) {
  for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
    for (var i = n[e], o = 0, s = i.length, c; o < s; ++o)
      (c = i[o]) && t.call(c, c.__data__, o, i);
  return this;
}
function we(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function xe(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function ve(t, n) {
  return function () {
    this.setAttribute(t, n);
  };
}
function be(t, n) {
  return function () {
    this.setAttributeNS(t.space, t.local, n);
  };
}
function Ee(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null ? this.removeAttribute(t) : this.setAttribute(t, e);
  };
}
function Ne(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null
      ? this.removeAttributeNS(t.space, t.local)
      : this.setAttributeNS(t.space, t.local, e);
  };
}
function Ce(t, n) {
  var e = lt(t);
  if (arguments.length < 2) {
    var r = this.node();
    return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e);
  }
  return this.each(
    (n == null
      ? e.local
        ? xe
        : we
      : typeof n == "function"
      ? e.local
        ? Ne
        : Ee
      : e.local
      ? be
      : ve)(e, n)
  );
}
function sn(t) {
  return (
    (t.ownerDocument && t.ownerDocument.defaultView) ||
    (t.document && t) ||
    t.defaultView
  );
}
function Ie(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function Ae(t, n, e) {
  return function () {
    this.style.setProperty(t, n, e);
  };
}
function $e(t, n, e) {
  return function () {
    var r = n.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, e);
  };
}
function Te(t, n, e) {
  return arguments.length > 1
    ? this.each(
        (n == null ? Ie : typeof n == "function" ? $e : Ae)(t, n, e ?? "")
      )
    : O(this.node(), t);
}
function O(t, n) {
  return (
    t.style.getPropertyValue(n) ||
    sn(t).getComputedStyle(t, null).getPropertyValue(n)
  );
}
function Pe(t) {
  return function () {
    delete this[t];
  };
}
function Se(t, n) {
  return function () {
    this[t] = n;
  };
}
function ke(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null ? delete this[t] : (this[t] = e);
  };
}
function De(t, n) {
  return arguments.length > 1
    ? this.each((n == null ? Pe : typeof n == "function" ? ke : Se)(t, n))
    : this.node()[t];
}
function cn(t) {
  return t.trim().split(/^|\s+/);
}
function bt(t) {
  return t.classList || new an(t);
}
function an(t) {
  (this._node = t), (this._names = cn(t.getAttribute("class") || ""));
}
an.prototype = {
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
function ln(t, n) {
  for (var e = bt(t), r = -1, i = n.length; ++r < i; ) e.add(n[r]);
}
function un(t, n) {
  for (var e = bt(t), r = -1, i = n.length; ++r < i; ) e.remove(n[r]);
}
function Re(t) {
  return function () {
    ln(this, t);
  };
}
function Oe(t) {
  return function () {
    un(this, t);
  };
}
function Le(t, n) {
  return function () {
    (n.apply(this, arguments) ? ln : un)(this, t);
  };
}
function Me(t, n) {
  var e = cn(t + "");
  if (arguments.length < 2) {
    for (var r = bt(this.node()), i = -1, o = e.length; ++i < o; )
      if (!r.contains(e[i])) return !1;
    return !0;
  }
  return this.each((typeof n == "function" ? Le : n ? Re : Oe)(e, n));
}
function Ge() {
  this.textContent = "";
}
function He(t) {
  return function () {
    this.textContent = t;
  };
}
function Be(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.textContent = n ?? "";
  };
}
function Xe(t) {
  return arguments.length
    ? this.each(t == null ? Ge : (typeof t == "function" ? Be : He)(t))
    : this.node().textContent;
}
function Fe() {
  this.innerHTML = "";
}
function qe(t) {
  return function () {
    this.innerHTML = t;
  };
}
function Ve(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.innerHTML = n ?? "";
  };
}
function Ye(t) {
  return arguments.length
    ? this.each(t == null ? Fe : (typeof t == "function" ? Ve : qe)(t))
    : this.node().innerHTML;
}
function Ue() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function ze() {
  return this.each(Ue);
}
function We() {
  this.previousSibling &&
    this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Ke() {
  return this.each(We);
}
function Je(t) {
  var n = typeof t == "function" ? t : tn(t);
  return this.select(function () {
    return this.appendChild(n.apply(this, arguments));
  });
}
function Qe() {
  return null;
}
function Ze(t, n) {
  var e = typeof t == "function" ? t : tn(t),
    r = n == null ? Qe : typeof n == "function" ? n : vt(n);
  return this.select(function () {
    return this.insertBefore(
      e.apply(this, arguments),
      r.apply(this, arguments) || null
    );
  });
}
function je() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function tr() {
  return this.each(je);
}
function nr() {
  var t = this.cloneNode(!1),
    n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function er() {
  var t = this.cloneNode(!0),
    n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function rr(t) {
  return this.select(t ? er : nr);
}
function ir(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function or(t) {
  return function (n) {
    t.call(this, n, this.__data__);
  };
}
function sr(t) {
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
function cr(t) {
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
function ar(t, n, e) {
  return function () {
    var r = this.__on,
      i,
      o = or(n);
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
function lr(t, n, e) {
  var r = sr(t + ""),
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
  for (c = n ? ar : cr, i = 0; i < o; ++i) this.each(c(r[i], n, e));
  return this;
}
function fn(t, n, e) {
  var r = sn(t),
    i = r.CustomEvent;
  typeof i == "function"
    ? (i = new i(n, e))
    : ((i = r.document.createEvent("Event")),
      e
        ? (i.initEvent(n, e.bubbles, e.cancelable), (i.detail = e.detail))
        : i.initEvent(n, !1, !1)),
    t.dispatchEvent(i);
}
function ur(t, n) {
  return function () {
    return fn(this, t, n);
  };
}
function fr(t, n) {
  return function () {
    return fn(this, t, n.apply(this, arguments));
  };
}
function hr(t, n) {
  return this.each((typeof n == "function" ? fr : ur)(t, n));
}
function* pr() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length, s; i < o; ++i)
      (s = r[i]) && (yield s);
}
var hn = [null];
function _(t, n) {
  (this._groups = t), (this._parents = n);
}
function U() {
  return new _([[document.documentElement]], hn);
}
function dr() {
  return this;
}
_.prototype = U.prototype = {
  constructor: _,
  select: Bn,
  selectAll: Vn,
  selectChild: Wn,
  selectChildren: Zn,
  filter: jn,
  data: oe,
  enter: te,
  exit: ce,
  join: ae,
  merge: le,
  selection: dr,
  order: ue,
  sort: fe,
  call: pe,
  nodes: de,
  node: ge,
  size: me,
  empty: _e,
  each: ye,
  attr: Ce,
  style: Te,
  property: De,
  classed: Me,
  text: Xe,
  html: Ye,
  raise: ze,
  lower: Ke,
  append: Je,
  insert: Ze,
  remove: tr,
  clone: rr,
  datum: ir,
  on: lr,
  dispatch: hr,
  [Symbol.iterator]: pr,
};
function Rt(t) {
  return typeof t == "string"
    ? new _([[document.querySelector(t)]], [document.documentElement])
    : new _([[t]], hn);
}
function Et(t, n, e) {
  (t.prototype = n.prototype = e), (e.constructor = t);
}
function pn(t, n) {
  var e = Object.create(t.prototype);
  for (var r in n) e[r] = n[r];
  return e;
}
function z() {}
var F = 0.7,
  it = 1 / F,
  R = "\\s*([+-]?\\d+)\\s*",
  q = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  v = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  gr = /^#([0-9a-f]{3,8})$/,
  mr = new RegExp(`^rgb\\(${R},${R},${R}\\)$`),
  _r = new RegExp(`^rgb\\(${v},${v},${v}\\)$`),
  yr = new RegExp(`^rgba\\(${R},${R},${R},${q}\\)$`),
  wr = new RegExp(`^rgba\\(${v},${v},${v},${q}\\)$`),
  xr = new RegExp(`^hsl\\(${q},${v},${v}\\)$`),
  vr = new RegExp(`^hsla\\(${q},${v},${v},${q}\\)$`),
  Ot = {
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
Et(z, V, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Lt,
  formatHex: Lt,
  formatHex8: br,
  formatHsl: Er,
  formatRgb: Mt,
  toString: Mt,
});
function Lt() {
  return this.rgb().formatHex();
}
function br() {
  return this.rgb().formatHex8();
}
function Er() {
  return dn(this).formatHsl();
}
function Mt() {
  return this.rgb().formatRgb();
}
function V(t) {
  var n, e;
  return (
    (t = (t + "").trim().toLowerCase()),
    (n = gr.exec(t))
      ? ((e = n[1].length),
        (n = parseInt(n[1], 16)),
        e === 6
          ? Gt(n)
          : e === 3
          ? new m(
              ((n >> 8) & 15) | ((n >> 4) & 240),
              ((n >> 4) & 15) | (n & 240),
              ((n & 15) << 4) | (n & 15),
              1
            )
          : e === 8
          ? K((n >> 24) & 255, (n >> 16) & 255, (n >> 8) & 255, (n & 255) / 255)
          : e === 4
          ? K(
              ((n >> 12) & 15) | ((n >> 8) & 240),
              ((n >> 8) & 15) | ((n >> 4) & 240),
              ((n >> 4) & 15) | (n & 240),
              (((n & 15) << 4) | (n & 15)) / 255
            )
          : null)
      : (n = mr.exec(t))
      ? new m(n[1], n[2], n[3], 1)
      : (n = _r.exec(t))
      ? new m((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, 1)
      : (n = yr.exec(t))
      ? K(n[1], n[2], n[3], n[4])
      : (n = wr.exec(t))
      ? K((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, n[4])
      : (n = xr.exec(t))
      ? Xt(n[1], n[2] / 100, n[3] / 100, 1)
      : (n = vr.exec(t))
      ? Xt(n[1], n[2] / 100, n[3] / 100, n[4])
      : Ot.hasOwnProperty(t)
      ? Gt(Ot[t])
      : t === "transparent"
      ? new m(NaN, NaN, NaN, 0)
      : null
  );
}
function Gt(t) {
  return new m((t >> 16) & 255, (t >> 8) & 255, t & 255, 1);
}
function K(t, n, e, r) {
  return r <= 0 && (t = n = e = NaN), new m(t, n, e, r);
}
function Nr(t) {
  return (
    t instanceof z || (t = V(t)),
    t ? ((t = t.rgb()), new m(t.r, t.g, t.b, t.opacity)) : new m()
  );
}
function gt(t, n, e, r) {
  return arguments.length === 1 ? Nr(t) : new m(t, n, e, r ?? 1);
}
function m(t, n, e, r) {
  (this.r = +t), (this.g = +n), (this.b = +e), (this.opacity = +r);
}
Et(
  m,
  gt,
  pn(z, {
    brighter(t) {
      return (
        (t = t == null ? it : Math.pow(it, t)),
        new m(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? F : Math.pow(F, t)),
        new m(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    rgb() {
      return this;
    },
    clamp() {
      return new m(S(this.r), S(this.g), S(this.b), ot(this.opacity));
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
    hex: Ht,
    formatHex: Ht,
    formatHex8: Cr,
    formatRgb: Bt,
    toString: Bt,
  })
);
function Ht() {
  return `#${T(this.r)}${T(this.g)}${T(this.b)}`;
}
function Cr() {
  return `#${T(this.r)}${T(this.g)}${T(this.b)}${T(
    (isNaN(this.opacity) ? 1 : this.opacity) * 255
  )}`;
}
function Bt() {
  const t = ot(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${S(this.r)}, ${S(this.g)}, ${S(
    this.b
  )}${t === 1 ? ")" : `, ${t})`}`;
}
function ot(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function S(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function T(t) {
  return (t = S(t)), (t < 16 ? "0" : "") + t.toString(16);
}
function Xt(t, n, e, r) {
  return (
    r <= 0
      ? (t = n = e = NaN)
      : e <= 0 || e >= 1
      ? (t = n = NaN)
      : n <= 0 && (t = NaN),
    new w(t, n, e, r)
  );
}
function dn(t) {
  if (t instanceof w) return new w(t.h, t.s, t.l, t.opacity);
  if ((t instanceof z || (t = V(t)), !t)) return new w();
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
function Ir(t, n, e, r) {
  return arguments.length === 1 ? dn(t) : new w(t, n, e, r ?? 1);
}
function w(t, n, e, r) {
  (this.h = +t), (this.s = +n), (this.l = +e), (this.opacity = +r);
}
Et(
  w,
  Ir,
  pn(z, {
    brighter(t) {
      return (
        (t = t == null ? it : Math.pow(it, t)),
        new w(this.h, this.s, this.l * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? F : Math.pow(F, t)),
        new w(this.h, this.s, this.l * t, this.opacity)
      );
    },
    rgb() {
      var t = (this.h % 360) + (this.h < 0) * 360,
        n = isNaN(t) || isNaN(this.s) ? 0 : this.s,
        e = this.l,
        r = e + (e < 0.5 ? e : 1 - e) * n,
        i = 2 * e - r;
      return new m(
        ht(t >= 240 ? t - 240 : t + 120, i, r),
        ht(t, i, r),
        ht(t < 120 ? t + 240 : t - 120, i, r),
        this.opacity
      );
    },
    clamp() {
      return new w(Ft(this.h), J(this.s), J(this.l), ot(this.opacity));
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
      const t = ot(this.opacity);
      return `${t === 1 ? "hsl(" : "hsla("}${Ft(this.h)}, ${
        J(this.s) * 100
      }%, ${J(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
    },
  })
);
function Ft(t) {
  return (t = (t || 0) % 360), t < 0 ? t + 360 : t;
}
function J(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function ht(t, n, e) {
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
const gn = (t) => () => t;
function Ar(t, n) {
  return function (e) {
    return t + e * n;
  };
}
function $r(t, n, e) {
  return (
    (t = Math.pow(t, e)),
    (n = Math.pow(n, e) - t),
    (e = 1 / e),
    function (r) {
      return Math.pow(t + r * n, e);
    }
  );
}
function Tr(t) {
  return (t = +t) == 1
    ? mn
    : function (n, e) {
        return e - n ? $r(n, e, t) : gn(isNaN(n) ? e : n);
      };
}
function mn(t, n) {
  var e = n - t;
  return e ? Ar(t, e) : gn(isNaN(t) ? n : t);
}
const qt = (function t(n) {
  var e = Tr(n);
  function r(i, o) {
    var s = e((i = gt(i)).r, (o = gt(o)).r),
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
function C(t, n) {
  return (
    (t = +t),
    (n = +n),
    function (e) {
      return t * (1 - e) + n * e;
    }
  );
}
var mt = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  pt = new RegExp(mt.source, "g");
function Pr(t) {
  return function () {
    return t;
  };
}
function Sr(t) {
  return function (n) {
    return t(n) + "";
  };
}
function kr(t, n) {
  var e = (mt.lastIndex = pt.lastIndex = 0),
    r,
    i,
    o,
    s = -1,
    c = [],
    a = [];
  for (t = t + "", n = n + ""; (r = mt.exec(t)) && (i = pt.exec(n)); )
    (o = i.index) > e &&
      ((o = n.slice(e, o)), c[s] ? (c[s] += o) : (c[++s] = o)),
      (r = r[0]) === (i = i[0])
        ? c[s]
          ? (c[s] += i)
          : (c[++s] = i)
        : ((c[++s] = null), a.push({ i: s, x: C(r, i) })),
      (e = pt.lastIndex);
  return (
    e < n.length && ((o = n.slice(e)), c[s] ? (c[s] += o) : (c[++s] = o)),
    c.length < 2
      ? a[0]
        ? Sr(a[0].x)
        : Pr(n)
      : ((n = a.length),
        function (l) {
          for (var u = 0, f; u < n; ++u) c[(f = a[u]).i] = f.x(l);
          return c.join("");
        })
  );
}
var Vt = 180 / Math.PI,
  _t = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1,
  };
function _n(t, n, e, r, i, o) {
  var s, c, a;
  return (
    (s = Math.sqrt(t * t + n * n)) && ((t /= s), (n /= s)),
    (a = t * e + n * r) && ((e -= t * a), (r -= n * a)),
    (c = Math.sqrt(e * e + r * r)) && ((e /= c), (r /= c), (a /= c)),
    t * r < n * e && ((t = -t), (n = -n), (a = -a), (s = -s)),
    {
      translateX: i,
      translateY: o,
      rotate: Math.atan2(n, t) * Vt,
      skewX: Math.atan(a) * Vt,
      scaleX: s,
      scaleY: c,
    }
  );
}
var Q;
function Dr(t) {
  const n = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(
    t + ""
  );
  return n.isIdentity ? _t : _n(n.a, n.b, n.c, n.d, n.e, n.f);
}
function Rr(t) {
  return t == null ||
    (Q || (Q = document.createElementNS("http://www.w3.org/2000/svg", "g")),
    Q.setAttribute("transform", t),
    !(t = Q.transform.baseVal.consolidate()))
    ? _t
    : ((t = t.matrix), _n(t.a, t.b, t.c, t.d, t.e, t.f));
}
function yn(t, n, e, r) {
  function i(l) {
    return l.length ? l.pop() + " " : "";
  }
  function o(l, u, f, h, p, d) {
    if (l !== f || u !== h) {
      var g = p.push("translate(", null, n, null, e);
      d.push({ i: g - 4, x: C(l, f) }, { i: g - 2, x: C(u, h) });
    } else (f || h) && p.push("translate(" + f + n + h + e);
  }
  function s(l, u, f, h) {
    l !== u
      ? (l - u > 180 ? (u += 360) : u - l > 180 && (l += 360),
        h.push({ i: f.push(i(f) + "rotate(", null, r) - 2, x: C(l, u) }))
      : u && f.push(i(f) + "rotate(" + u + r);
  }
  function c(l, u, f, h) {
    l !== u
      ? h.push({ i: f.push(i(f) + "skewX(", null, r) - 2, x: C(l, u) })
      : u && f.push(i(f) + "skewX(" + u + r);
  }
  function a(l, u, f, h, p, d) {
    if (l !== f || u !== h) {
      var g = p.push(i(p) + "scale(", null, ",", null, ")");
      d.push({ i: g - 4, x: C(l, f) }, { i: g - 2, x: C(u, h) });
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
        for (var d = -1, g = h.length, A; ++d < g; ) f[(A = h[d]).i] = A.x(p);
        return f.join("");
      }
    );
  };
}
var Or = yn(Dr, "px, ", "px)", "deg)"),
  Lr = yn(Rr, ", ", ")", ")"),
  L = 0,
  H = 0,
  G = 0,
  wn = 1e3,
  st,
  B,
  ct = 0,
  D = 0,
  ut = 0,
  Y = typeof performance == "object" && performance.now ? performance : Date,
  xn =
    typeof window == "object" && window.requestAnimationFrame
      ? window.requestAnimationFrame.bind(window)
      : function (t) {
          setTimeout(t, 17);
        };
function Nt() {
  return D || (xn(Mr), (D = Y.now() + ut));
}
function Mr() {
  D = 0;
}
function at() {
  this._call = this._time = this._next = null;
}
at.prototype = vn.prototype = {
  constructor: at,
  restart: function (t, n, e) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    (e = (e == null ? Nt() : +e) + (n == null ? 0 : +n)),
      !this._next &&
        B !== this &&
        (B ? (B._next = this) : (st = this), (B = this)),
      (this._call = t),
      (this._time = e),
      yt();
  },
  stop: function () {
    this._call && ((this._call = null), (this._time = 1 / 0), yt());
  },
};
function vn(t, n, e) {
  var r = new at();
  return r.restart(t, n, e), r;
}
function Gr() {
  Nt(), ++L;
  for (var t = st, n; t; )
    (n = D - t._time) >= 0 && t._call.call(void 0, n), (t = t._next);
  --L;
}
function Yt() {
  (D = (ct = Y.now()) + ut), (L = H = 0);
  try {
    Gr();
  } finally {
    (L = 0), Br(), (D = 0);
  }
}
function Hr() {
  var t = Y.now(),
    n = t - ct;
  n > wn && ((ut -= n), (ct = t));
}
function Br() {
  for (var t, n = st, e, r = 1 / 0; n; )
    n._call
      ? (r > n._time && (r = n._time), (t = n), (n = n._next))
      : ((e = n._next), (n._next = null), (n = t ? (t._next = e) : (st = e)));
  (B = t), yt(r);
}
function yt(t) {
  if (!L) {
    H && (H = clearTimeout(H));
    var n = t - D;
    n > 24
      ? (t < 1 / 0 && (H = setTimeout(Yt, t - Y.now() - ut)),
        G && (G = clearInterval(G)))
      : (G || ((ct = Y.now()), (G = setInterval(Hr, wn))), (L = 1), xn(Yt));
  }
}
function Ut(t, n, e) {
  var r = new at();
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
var Xr = jt("start", "end", "cancel", "interrupt"),
  Fr = [],
  bn = 0,
  zt = 1,
  wt = 2,
  nt = 3,
  Wt = 4,
  xt = 5,
  et = 6;
function ft(t, n, e, r, i, o) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (e in s) return;
  qr(t, e, {
    name: n,
    index: r,
    group: i,
    on: Xr,
    tween: Fr,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: bn,
  });
}
function Ct(t, n) {
  var e = x(t, n);
  if (e.state > bn) throw new Error("too late; already scheduled");
  return e;
}
function b(t, n) {
  var e = x(t, n);
  if (e.state > nt) throw new Error("too late; already running");
  return e;
}
function x(t, n) {
  var e = t.__transition;
  if (!e || !(e = e[n])) throw new Error("transition not found");
  return e;
}
function qr(t, n, e) {
  var r = t.__transition,
    i;
  (r[n] = e), (e.timer = vn(o, 0, e.time));
  function o(l) {
    (e.state = zt),
      e.timer.restart(s, e.delay, e.time),
      e.delay <= l && s(l - e.delay);
  }
  function s(l) {
    var u, f, h, p;
    if (e.state !== zt) return a();
    for (u in r)
      if (((p = r[u]), p.name === e.name)) {
        if (p.state === nt) return Ut(s);
        p.state === Wt
          ? ((p.state = et),
            p.timer.stop(),
            p.on.call("interrupt", t, t.__data__, p.index, p.group),
            delete r[u])
          : +u < n &&
            ((p.state = et),
            p.timer.stop(),
            p.on.call("cancel", t, t.__data__, p.index, p.group),
            delete r[u]);
      }
    if (
      (Ut(function () {
        e.state === nt &&
          ((e.state = Wt), e.timer.restart(c, e.delay, e.time), c(l));
      }),
      (e.state = wt),
      e.on.call("start", t, t.__data__, e.index, e.group),
      e.state === wt)
    ) {
      for (
        e.state = nt, i = new Array((h = e.tween.length)), u = 0, f = -1;
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
            : (e.timer.restart(a), (e.state = xt), 1),
        f = -1,
        h = i.length;
      ++f < h;

    )
      i[f].call(t, u);
    e.state === xt && (e.on.call("end", t, t.__data__, e.index, e.group), a());
  }
  function a() {
    (e.state = et), e.timer.stop(), delete r[n];
    for (var l in r) return;
    delete t.__transition;
  }
}
function Vr(t, n) {
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
      (i = r.state > wt && r.state < xt),
        (r.state = et),
        r.timer.stop(),
        r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group),
        delete e[s];
    }
    o && delete t.__transition;
  }
}
function Yr(t) {
  return this.each(function () {
    Vr(this, t);
  });
}
function Ur(t, n) {
  var e, r;
  return function () {
    var i = b(this, t),
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
function zr(t, n, e) {
  var r, i;
  if (typeof e != "function") throw new Error();
  return function () {
    var o = b(this, t),
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
function Wr(t, n) {
  var e = this._id;
  if (((t += ""), arguments.length < 2)) {
    for (var r = x(this.node(), e).tween, i = 0, o = r.length, s; i < o; ++i)
      if ((s = r[i]).name === t) return s.value;
    return null;
  }
  return this.each((n == null ? Ur : zr)(e, t, n));
}
function It(t, n, e) {
  var r = t._id;
  return (
    t.each(function () {
      var i = b(this, r);
      (i.value || (i.value = {}))[n] = e.apply(this, arguments);
    }),
    function (i) {
      return x(i, r).value[n];
    }
  );
}
function En(t, n) {
  var e;
  return (
    typeof n == "number"
      ? C
      : n instanceof V
      ? qt
      : (e = V(n))
      ? ((n = e), qt)
      : kr
  )(t, n);
}
function Kr(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function Jr(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Qr(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = this.getAttribute(t);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function Zr(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = this.getAttributeNS(t.space, t.local);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function jr(t, n, e) {
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
function ti(t, n, e) {
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
function ni(t, n) {
  var e = lt(t),
    r = e === "transform" ? Lr : En;
  return this.attrTween(
    t,
    typeof n == "function"
      ? (e.local ? ti : jr)(e, r, It(this, "attr." + t, n))
      : n == null
      ? (e.local ? Jr : Kr)(e)
      : (e.local ? Zr : Qr)(e, r, n)
  );
}
function ei(t, n) {
  return function (e) {
    this.setAttribute(t, n.call(this, e));
  };
}
function ri(t, n) {
  return function (e) {
    this.setAttributeNS(t.space, t.local, n.call(this, e));
  };
}
function ii(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && ri(t, o)), e;
  }
  return (i._value = n), i;
}
function oi(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && ei(t, o)), e;
  }
  return (i._value = n), i;
}
function si(t, n) {
  var e = "attr." + t;
  if (arguments.length < 2) return (e = this.tween(e)) && e._value;
  if (n == null) return this.tween(e, null);
  if (typeof n != "function") throw new Error();
  var r = lt(t);
  return this.tween(e, (r.local ? ii : oi)(r, n));
}
function ci(t, n) {
  return function () {
    Ct(this, t).delay = +n.apply(this, arguments);
  };
}
function ai(t, n) {
  return (
    (n = +n),
    function () {
      Ct(this, t).delay = n;
    }
  );
}
function li(t) {
  var n = this._id;
  return arguments.length
    ? this.each((typeof t == "function" ? ci : ai)(n, t))
    : x(this.node(), n).delay;
}
function ui(t, n) {
  return function () {
    b(this, t).duration = +n.apply(this, arguments);
  };
}
function fi(t, n) {
  return (
    (n = +n),
    function () {
      b(this, t).duration = n;
    }
  );
}
function hi(t) {
  var n = this._id;
  return arguments.length
    ? this.each((typeof t == "function" ? ui : fi)(n, t))
    : x(this.node(), n).duration;
}
function pi(t, n) {
  if (typeof n != "function") throw new Error();
  return function () {
    b(this, t).ease = n;
  };
}
function di(t) {
  var n = this._id;
  return arguments.length ? this.each(pi(n, t)) : x(this.node(), n).ease;
}
function gi(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    if (typeof e != "function") throw new Error();
    b(this, t).ease = e;
  };
}
function mi(t) {
  if (typeof t != "function") throw new Error();
  return this.each(gi(this._id, t));
}
function _i(t) {
  typeof t != "function" && (t = en(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, c = (r[i] = []), a, l = 0; l < s; ++l)
      (a = o[l]) && t.call(a, a.__data__, l, o) && c.push(a);
  return new N(r, this._parents, this._name, this._id);
}
function yi(t) {
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
  return new N(s, this._parents, this._name, this._id);
}
function wi(t) {
  return (t + "")
    .trim()
    .split(/^|\s+/)
    .every(function (n) {
      var e = n.indexOf(".");
      return e >= 0 && (n = n.slice(0, e)), !n || n === "start";
    });
}
function xi(t, n, e) {
  var r,
    i,
    o = wi(n) ? Ct : b;
  return function () {
    var s = o(this, t),
      c = s.on;
    c !== r && (i = (r = c).copy()).on(n, e), (s.on = i);
  };
}
function vi(t, n) {
  var e = this._id;
  return arguments.length < 2
    ? x(this.node(), e).on.on(t)
    : this.each(xi(e, t, n));
}
function bi(t) {
  return function () {
    var n = this.parentNode;
    for (var e in this.__transition) if (+e !== t) return;
    n && n.removeChild(this);
  };
}
function Ei() {
  return this.on("end.remove", bi(this._id));
}
function Ni(t) {
  var n = this._name,
    e = this._id;
  typeof t != "function" && (t = vt(t));
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
        ft(l[h], n, e, h, l, x(u, e)));
  return new N(o, this._parents, n, e);
}
function Ci(t) {
  var n = this._name,
    e = this._id;
  typeof t != "function" && (t = nn(t));
  for (var r = this._groups, i = r.length, o = [], s = [], c = 0; c < i; ++c)
    for (var a = r[c], l = a.length, u, f = 0; f < l; ++f)
      if ((u = a[f])) {
        for (
          var h = t.call(u, u.__data__, f, a),
            p,
            d = x(u, e),
            g = 0,
            A = h.length;
          g < A;
          ++g
        )
          (p = h[g]) && ft(p, n, e, g, h, d);
        o.push(h), s.push(u);
      }
  return new N(o, s, n, e);
}
var Ii = U.prototype.constructor;
function Ai() {
  return new Ii(this._groups, this._parents);
}
function $i(t, n) {
  var e, r, i;
  return function () {
    var o = O(this, t),
      s = (this.style.removeProperty(t), O(this, t));
    return o === s ? null : o === e && s === r ? i : (i = n((e = o), (r = s)));
  };
}
function Nn(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function Ti(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = O(this, t);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function Pi(t, n, e) {
  var r, i, o;
  return function () {
    var s = O(this, t),
      c = e(this),
      a = c + "";
    return (
      c == null && (a = c = (this.style.removeProperty(t), O(this, t))),
      s === a ? null : s === r && a === i ? o : ((i = a), (o = n((r = s), c)))
    );
  };
}
function Si(t, n) {
  var e,
    r,
    i,
    o = "style." + n,
    s = "end." + o,
    c;
  return function () {
    var a = b(this, t),
      l = a.on,
      u = a.value[o] == null ? c || (c = Nn(n)) : void 0;
    (l !== e || i !== u) && (r = (e = l).copy()).on(s, (i = u)), (a.on = r);
  };
}
function ki(t, n, e) {
  var r = (t += "") == "transform" ? Or : En;
  return n == null
    ? this.styleTween(t, $i(t, r)).on("end.style." + t, Nn(t))
    : typeof n == "function"
    ? this.styleTween(t, Pi(t, r, It(this, "style." + t, n))).each(
        Si(this._id, t)
      )
    : this.styleTween(t, Ti(t, r, n), e).on("end.style." + t, null);
}
function Di(t, n, e) {
  return function (r) {
    this.style.setProperty(t, n.call(this, r), e);
  };
}
function Ri(t, n, e) {
  var r, i;
  function o() {
    var s = n.apply(this, arguments);
    return s !== i && (r = (i = s) && Di(t, s, e)), r;
  }
  return (o._value = n), o;
}
function Oi(t, n, e) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (n == null) return this.tween(r, null);
  if (typeof n != "function") throw new Error();
  return this.tween(r, Ri(t, n, e ?? ""));
}
function Li(t) {
  return function () {
    this.textContent = t;
  };
}
function Mi(t) {
  return function () {
    var n = t(this);
    this.textContent = n ?? "";
  };
}
function Gi(t) {
  return this.tween(
    "text",
    typeof t == "function"
      ? Mi(It(this, "text", t))
      : Li(t == null ? "" : t + "")
  );
}
function Hi(t) {
  return function (n) {
    this.textContent = t.call(this, n);
  };
}
function Bi(t) {
  var n, e;
  function r() {
    var i = t.apply(this, arguments);
    return i !== e && (n = (e = i) && Hi(i)), n;
  }
  return (r._value = t), r;
}
function Xi(t) {
  var n = "text";
  if (arguments.length < 1) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, Bi(t));
}
function Fi() {
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
        var u = x(a, n);
        ft(a, t, e, l, s, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease,
        });
      }
  return new N(r, this._parents, t, e);
}
function qi() {
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
      var l = b(this, r),
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
var Vi = 0;
function N(t, n, e, r) {
  (this._groups = t), (this._parents = n), (this._name = e), (this._id = r);
}
function Cn() {
  return ++Vi;
}
var E = U.prototype;
N.prototype = {
  constructor: N,
  select: Ni,
  selectAll: Ci,
  selectChild: E.selectChild,
  selectChildren: E.selectChildren,
  filter: _i,
  merge: yi,
  selection: Ai,
  transition: Fi,
  call: E.call,
  nodes: E.nodes,
  node: E.node,
  size: E.size,
  empty: E.empty,
  each: E.each,
  on: vi,
  attr: ni,
  attrTween: si,
  style: ki,
  styleTween: Oi,
  text: Gi,
  textTween: Xi,
  remove: Ei,
  tween: Wr,
  delay: li,
  duration: hi,
  ease: di,
  easeVarying: mi,
  end: qi,
  [Symbol.iterator]: E[Symbol.iterator],
};
function Yi(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Ui = { time: null, delay: 0, duration: 250, ease: Yi };
function zi(t, n) {
  for (var e; !(e = t.__transition) || !(e = e[n]); )
    if (!(t = t.parentNode)) throw new Error(`transition ${n} not found`);
  return e;
}
function Wi(t) {
  var n, e;
  t instanceof N
    ? ((n = t._id), (t = t._name))
    : ((n = Cn()), ((e = Ui).time = Nt()), (t = t == null ? null : t + ""));
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], c = s.length, a, l = 0; l < c; ++l)
      (a = s[l]) && ft(a, t, n, l, s, e || zi(a, n));
  return new N(r, this._parents, t, n);
}
U.prototype.interrupt = Yr;
U.prototype.transition = Wi;
function Ki(t) {
  if (!t.ok) throw new Error(t.status + " " + t.statusText);
  return t.text();
}
function Ji(t, n) {
  return fetch(t, n).then(Ki);
}
function Qi(t) {
  return (n, e) => Ji(n, e).then((r) => new DOMParser().parseFromString(r, t));
}
const Zi = Qi("application/xml");
function X(t, n, e) {
  (this.k = t), (this.x = n), (this.y = e);
}
X.prototype = {
  constructor: X,
  scale: function (t) {
    return t === 1 ? this : new X(this.k * t, this.x, this.y);
  },
  translate: function (t, n) {
    return (t === 0) & (n === 0)
      ? this
      : new X(this.k, this.x + this.k * t, this.y + this.k * n);
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
X.prototype;
class In {
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
    if (Rt("#" + this.id).node() != null) return;
    const n = await Zi(this.url);
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
      this.sensor.node().append(Rt(n.documentElement).node());
  }
}
const At = [
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
  ji = ["vcc", "gnd", "out"],
  Z = {
    vcc: "VCC of DHT11 Sensor",
    gnd: "Ground pin of DHT11 Sensor",
    out: "Out pin DHT11 Sensor",
  },
  to = (t) => {
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
class no {
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
          : Z[this.connections[this.connections.length - 2].connector]
          ? Z[this.connections[this.connections.length - 2].connector]
          : this.connections[this.connections.length - 2].connector,
        r = P[this.connections[this.connections.length - 1].connector]
          ? `${
              P[this.connections[this.connections.length - 1].connector]
            } pin of Raspberry Pi`
          : Z[this.connections[this.connections.length - 1].connector]
          ? Z[this.connections[this.connections.length - 1].connector]
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
class eo {
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
const Kt = (t, n) => {
    $t.append("path")
      .attr("d", t)
      .attr("stroke", "black")
      .attr("stroke-width", "2px")
      .attr("fill", "none")
      .attr("id", n);
  },
  k = kn
    .select("#svg")
    .append("svg")
    .attr("id", "svgContainer")
    .attr(
      "height",
      window.innerHeight - document.getElementById("svg").offsetTop
    )
    .attr("width", document.getElementById("svg").offsetWidth),
  ro = new In("raspberry", k, "images/pi3dirk.svg", 1, !1, 0, 0),
  io = new In("sensorDHT11", k, "images/sensor.svg", 2.5, !1, 300, 35),
  $t = k.append("g").attr("id", "pathsGroup"),
  An = document.getElementById("rasberryPi"),
  $n = document.getElementById("sensor"),
  Tt = document.getElementById("displayInfo"),
  j = document.getElementById("componentDescription"),
  I = new no("connectionLog"),
  Jt = new eo("errorBox", "errorHeading", "errorText", "closeErrorBox");
let y,
  $ = 0,
  Tn = !1;
const oo = document.querySelector("#undoButton");
oo.addEventListener("click", () => {
  I.undoLastConnection(), co();
});
const so = (t) => {
    $t.selectAll(`path[id="${t}"]`)
      .nodes()
      .forEach((e) => e.remove());
  },
  co = () => {
    if (y) {
      $t
        .selectAll(`path[id^="path${$}"]`)
        .nodes()
        .forEach((n) => n.remove()),
        (y = null),
        ($ = 0),
        console.log("Removed all incomplete paths");
      return;
    }
    if (I.connections.length > 0) {
      const n = I.connections[I.connections.length - 1].lineID;
      so(n),
        I.connections.pop(),
        console.log(`Removed paths with line ID: ${n}`);
    } else console.warn("No more connections to undo");
  };
An.addEventListener("click", async () => {
  await ro.load();
});
$n.addEventListener("click", async () => {
  await io.load();
});
const Pn = (t, n) => {
    t.addEventListener("mouseover", () => {
      (j.innerHTML = n), (j.style.display = "block");
    }),
      t.addEventListener("mouseout", () => {
        (j.style.display = "none"), (j.innerHTML = "");
      });
  },
  ao =
    "Raspberry Pi: A small single-board computer for learning and prototyping. The 5V pin connects to the DHT11 VCC for power, GND pin connects to the DHT11 GND for a common ground, and GPIO4 (Physical Pin 7) connects to the sensor’s Data Out to receive temperature and humidity data.",
  lo =
    "DHT11 Sensor: A basic temperature and humidity sensor with digital output. The VCC pin connects to the Raspberry Pi’s 5V for power, GND pin connects to the Raspberry Pi’s GND, and Data Out pin connects to GPIO4 (Physical Pin 7) to send data for processing.";
Pn(An, ao);
Pn($n, lo);
k.on("dblclick", (t) => {
  if (Zt(t) && !y) {
    (y = new Dn()),
      y.moveTo(t.offsetX, t.offsetY),
      I.addConnection({
        lineID: `path${$}`,
        x: t.offsetX,
        y: t.offsetY,
        connector: t.srcElement.id,
        connectorEnd: null,
        incomplete: !0,
      }),
      k.style("cursor", "crosshair"),
      console.log("path created 0");
    return;
  }
  if (t.srcElement.id === "svgContainer" && !At.includes(t.srcElement.id)) {
    y &&
      (y.lineTo(t.offsetX, t.offsetY),
      Kt(y.toString(), `path${$}`),
      console.log("path created"));
    return;
  }
  if (Zt(t) && y) {
    y.lineTo(t.offsetX, t.offsetY),
      Kt(y.toString(), `path${$}`),
      I.addConnection({
        lineID: `path${$}`,
        x: t.offsetX,
        y: t.offsetY,
        connector: t.srcElement.id,
        connectorEnd: t.srcElement.id,
        incomplete: !1,
      }),
      $++,
      k.style("cursor", "default"),
      (y = null),
      console.log("path created 2");
    return;
  }
});
k.on("mouseover", (t) => {
  At.includes(t.srcElement.id) && (Tt.innerHTML = P[t.srcElement.id]);
});
const uo = () => {
    const t = document.getElementById("temperature").value;
    Tt.innerHTML = "Temperature: " + t + "°C";
  },
  Qt = document.getElementById("temperature");
Qt.addEventListener("input", () => {
  const t = parseInt(Qt.value);
  if (((Tt.innerHTML = "Temperature: " + t + "°C"), Tn)) {
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
uo();
document.getElementById("codeSubmit").addEventListener("click", () => {
  const t = to(I.getConnectionLog());
  t === !0
    ? ((Tn = !0),
      document.querySelector("#my-drawer-4").click(),
      console.log("Circuit complete, slider should now show messages"))
    : t.error
    ? Jt.throw("Error", t.error)
    : Jt.throw(
        "Error",
        "Please connect the components properly. Refer to the connection diagram."
      );
});
function Zt(t) {
  return At.includes(t.srcElement.id) || ji.includes(t.srcElement.id);
}
