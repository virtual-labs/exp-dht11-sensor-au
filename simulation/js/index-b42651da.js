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
var Dn = { value: () => {} };
function en() {
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
function Rn(t, n) {
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
it.prototype = en.prototype = {
  constructor: it,
  on: function (t, n) {
    var e = this._,
      r = Rn(t + "", e),
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
      if ((i = (t = r[o]).type)) e[i] = Ot(e[i], t.name, n);
      else if (n == null) for (i in e) e[i] = Ot(e[i], t.name, null);
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
function Ln(t, n) {
  for (var e = 0, r = t.length, i; e < r; ++e)
    if ((i = t[e]).name === n) return i.value;
}
function Ot(t, n, e) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === n) {
      (t[r] = Dn), (t = t.slice(0, r).concat(t.slice(r + 1)));
      break;
    }
  return e != null && t.push({ name: n, value: e }), t;
}
var mt = "http://www.w3.org/1999/xhtml";
const Gt = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: mt,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/",
};
function pt(t) {
  var n = (t += ""),
    e = n.indexOf(":");
  return (
    e >= 0 && (n = t.slice(0, e)) !== "xmlns" && (t = t.slice(e + 1)),
    Gt.hasOwnProperty(n) ? { space: Gt[n], local: t } : t
  );
}
function On(t) {
  return function () {
    var n = this.ownerDocument,
      e = this.namespaceURI;
    return e === mt && n.documentElement.namespaceURI === mt
      ? n.createElement(t)
      : n.createElementNS(e, t);
  };
}
function Gn(t) {
  return function () {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function rn(t) {
  var n = pt(t);
  return (n.local ? Gn : On)(n);
}
function Hn() {}
function Pt(t) {
  return t == null
    ? Hn
    : function () {
        return this.querySelector(t);
      };
}
function Bn(t) {
  typeof t != "function" && (t = Pt(t));
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
function Xn(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function qn() {
  return [];
}
function on(t) {
  return t == null
    ? qn
    : function () {
        return this.querySelectorAll(t);
      };
}
function Fn(t) {
  return function () {
    return Xn(t.apply(this, arguments));
  };
}
function Vn(t) {
  typeof t == "function" ? (t = Fn(t)) : (t = on(t));
  for (var n = this._groups, e = n.length, r = [], i = [], o = 0; o < e; ++o)
    for (var s = n[o], c = s.length, a, l = 0; l < c; ++l)
      (a = s[l]) && (r.push(t.call(a, a.__data__, l, s)), i.push(a));
  return new y(r, i);
}
function sn(t) {
  return function () {
    return this.matches(t);
  };
}
function cn(t) {
  return function (n) {
    return n.matches(t);
  };
}
var Yn = Array.prototype.find;
function zn(t) {
  return function () {
    return Yn.call(this.children, t);
  };
}
function Un() {
  return this.firstElementChild;
}
function Wn(t) {
  return this.select(t == null ? Un : zn(typeof t == "function" ? t : cn(t)));
}
var Kn = Array.prototype.filter;
function Zn() {
  return Array.from(this.children);
}
function Qn(t) {
  return function () {
    return Kn.call(this.children, t);
  };
}
function Jn(t) {
  return this.selectAll(
    t == null ? Zn : Qn(typeof t == "function" ? t : cn(t))
  );
}
function jn(t) {
  typeof t != "function" && (t = sn(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, c = (r[i] = []), a, l = 0; l < s; ++l)
      (a = o[l]) && t.call(a, a.__data__, l, o) && c.push(a);
  return new y(r, this._parents);
}
function an(t) {
  return new Array(t.length);
}
function te() {
  return new y(this._enter || this._groups.map(an), this._parents);
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
function ne(t) {
  return function () {
    return t;
  };
}
function ee(t, n, e, r, i, o) {
  for (var s = 0, c, a = n.length, l = o.length; s < l; ++s)
    (c = n[s]) ? ((c.__data__ = o[s]), (r[s] = c)) : (e[s] = new ct(t, o[s]));
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
        : (e[c] = new ct(t, o[c]));
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
      _ = (c[l] = new Array(d)),
      $ = (s[l] = new Array(d)),
      J = (a[l] = new Array(h));
    e(u, f, _, $, J, p, n);
    for (var I = 0, P = 0, O, X; I < d; ++I)
      if ((O = _[I])) {
        for (I >= P && (P = I + 1); !(X = $[P]) && ++P < d; );
        O._next = X || null;
      }
  }
  return (s = new y(s, r)), (s._enter = c), (s._exit = a), s;
}
function se(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function ce() {
  return new y(this._exit || this._groups.map(an), this._parents);
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
  return new y(c, this._parents);
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
  return new y(i, this._parents).order();
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
function _e() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
      var s = r[i];
      if (s) return s;
    }
  return null;
}
function ge() {
  let t = 0;
  for (const n of this) ++t;
  return t;
}
function ye() {
  return !this.node();
}
function me(t) {
  for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
    for (var i = n[e], o = 0, s = i.length, c; o < s; ++o)
      (c = i[o]) && t.call(c, c.__data__, o, i);
  return this;
}
function xe(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function we(t) {
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
function $e(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null ? this.removeAttribute(t) : this.setAttribute(t, e);
  };
}
function Ee(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null
      ? this.removeAttributeNS(t.space, t.local)
      : this.setAttributeNS(t.space, t.local, e);
  };
}
function Ne(t, n) {
  var e = pt(t);
  if (arguments.length < 2) {
    var r = this.node();
    return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e);
  }
  return this.each(
    (n == null
      ? e.local
        ? we
        : xe
      : typeof n == "function"
      ? e.local
        ? Ee
        : $e
      : e.local
      ? be
      : ve)(e, n)
  );
}
function ln(t) {
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
function Ce(t, n, e) {
  return function () {
    this.style.setProperty(t, n, e);
  };
}
function Ae(t, n, e) {
  return function () {
    var r = n.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, e);
  };
}
function Pe(t, n, e) {
  return arguments.length > 1
    ? this.each(
        (n == null ? Ie : typeof n == "function" ? Ae : Ce)(t, n, e ?? "")
      )
    : H(this.node(), t);
}
function H(t, n) {
  return (
    t.style.getPropertyValue(n) ||
    ln(t).getComputedStyle(t, null).getPropertyValue(n)
  );
}
function Te(t) {
  return function () {
    delete this[t];
  };
}
function ke(t, n) {
  return function () {
    this[t] = n;
  };
}
function Se(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null ? delete this[t] : (this[t] = e);
  };
}
function Me(t, n) {
  return arguments.length > 1
    ? this.each((n == null ? Te : typeof n == "function" ? Se : ke)(t, n))
    : this.node()[t];
}
function un(t) {
  return t.trim().split(/^|\s+/);
}
function Tt(t) {
  return t.classList || new fn(t);
}
function fn(t) {
  (this._node = t), (this._names = un(t.getAttribute("class") || ""));
}
fn.prototype = {
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
function hn(t, n) {
  for (var e = Tt(t), r = -1, i = n.length; ++r < i; ) e.add(n[r]);
}
function pn(t, n) {
  for (var e = Tt(t), r = -1, i = n.length; ++r < i; ) e.remove(n[r]);
}
function De(t) {
  return function () {
    hn(this, t);
  };
}
function Re(t) {
  return function () {
    pn(this, t);
  };
}
function Le(t, n) {
  return function () {
    (n.apply(this, arguments) ? hn : pn)(this, t);
  };
}
function Oe(t, n) {
  var e = un(t + "");
  if (arguments.length < 2) {
    for (var r = Tt(this.node()), i = -1, o = e.length; ++i < o; )
      if (!r.contains(e[i])) return !1;
    return !0;
  }
  return this.each((typeof n == "function" ? Le : n ? De : Re)(e, n));
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
function qe() {
  this.innerHTML = "";
}
function Fe(t) {
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
    ? this.each(t == null ? qe : (typeof t == "function" ? Ve : Fe)(t))
    : this.node().innerHTML;
}
function ze() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Ue() {
  return this.each(ze);
}
function We() {
  this.previousSibling &&
    this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Ke() {
  return this.each(We);
}
function Ze(t) {
  var n = typeof t == "function" ? t : rn(t);
  return this.select(function () {
    return this.appendChild(n.apply(this, arguments));
  });
}
function Qe() {
  return null;
}
function Je(t, n) {
  var e = typeof t == "function" ? t : rn(t),
    r = n == null ? Qe : typeof n == "function" ? n : Pt(n);
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
function dn(t, n, e) {
  var r = ln(t),
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
    return dn(this, t, n);
  };
}
function fr(t, n) {
  return function () {
    return dn(this, t, n.apply(this, arguments));
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
var _n = [null];
function y(t, n) {
  (this._groups = t), (this._parents = n);
}
function Z() {
  return new y([[document.documentElement]], _n);
}
function dr() {
  return this;
}
y.prototype = Z.prototype = {
  constructor: y,
  select: Bn,
  selectAll: Vn,
  selectChild: Wn,
  selectChildren: Jn,
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
  node: _e,
  size: ge,
  empty: ye,
  each: me,
  attr: Ne,
  style: Pe,
  property: Me,
  classed: Oe,
  text: Xe,
  html: Ye,
  raise: Ue,
  lower: Ke,
  append: Ze,
  insert: Je,
  remove: tr,
  clone: rr,
  datum: ir,
  on: lr,
  dispatch: hr,
  [Symbol.iterator]: pr,
};
function xt(t) {
  return typeof t == "string"
    ? new y([[document.querySelector(t)]], [document.documentElement])
    : new y([[t]], _n);
}
function kt(t, n, e) {
  (t.prototype = n.prototype = e), (e.constructor = t);
}
function gn(t, n) {
  var e = Object.create(t.prototype);
  for (var r in n) e[r] = n[r];
  return e;
}
function Q() {}
var z = 0.7,
  at = 1 / z,
  G = "\\s*([+-]?\\d+)\\s*",
  U = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  v = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  _r = /^#([0-9a-f]{3,8})$/,
  gr = new RegExp(`^rgb\\(${G},${G},${G}\\)$`),
  yr = new RegExp(`^rgb\\(${v},${v},${v}\\)$`),
  mr = new RegExp(`^rgba\\(${G},${G},${G},${U}\\)$`),
  xr = new RegExp(`^rgba\\(${v},${v},${v},${U}\\)$`),
  wr = new RegExp(`^hsl\\(${U},${v},${v}\\)$`),
  vr = new RegExp(`^hsla\\(${U},${v},${v},${U}\\)$`),
  Ht = {
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
kt(Q, W, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Bt,
  formatHex: Bt,
  formatHex8: br,
  formatHsl: $r,
  formatRgb: Xt,
  toString: Xt,
});
function Bt() {
  return this.rgb().formatHex();
}
function br() {
  return this.rgb().formatHex8();
}
function $r() {
  return yn(this).formatHsl();
}
function Xt() {
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
          ? new g(
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
      : (n = gr.exec(t))
      ? new g(n[1], n[2], n[3], 1)
      : (n = yr.exec(t))
      ? new g((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, 1)
      : (n = mr.exec(t))
      ? j(n[1], n[2], n[3], n[4])
      : (n = xr.exec(t))
      ? j((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, n[4])
      : (n = wr.exec(t))
      ? Yt(n[1], n[2] / 100, n[3] / 100, 1)
      : (n = vr.exec(t))
      ? Yt(n[1], n[2] / 100, n[3] / 100, n[4])
      : Ht.hasOwnProperty(t)
      ? qt(Ht[t])
      : t === "transparent"
      ? new g(NaN, NaN, NaN, 0)
      : null
  );
}
function qt(t) {
  return new g((t >> 16) & 255, (t >> 8) & 255, t & 255, 1);
}
function j(t, n, e, r) {
  return r <= 0 && (t = n = e = NaN), new g(t, n, e, r);
}
function Er(t) {
  return (
    t instanceof Q || (t = W(t)),
    t ? ((t = t.rgb()), new g(t.r, t.g, t.b, t.opacity)) : new g()
  );
}
function wt(t, n, e, r) {
  return arguments.length === 1 ? Er(t) : new g(t, n, e, r ?? 1);
}
function g(t, n, e, r) {
  (this.r = +t), (this.g = +n), (this.b = +e), (this.opacity = +r);
}
kt(
  g,
  wt,
  gn(Q, {
    brighter(t) {
      return (
        (t = t == null ? at : Math.pow(at, t)),
        new g(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? z : Math.pow(z, t)),
        new g(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    rgb() {
      return this;
    },
    clamp() {
      return new g(D(this.r), D(this.g), D(this.b), lt(this.opacity));
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
    hex: Ft,
    formatHex: Ft,
    formatHex8: Nr,
    formatRgb: Vt,
    toString: Vt,
  })
);
function Ft() {
  return `#${S(this.r)}${S(this.g)}${S(this.b)}`;
}
function Nr() {
  return `#${S(this.r)}${S(this.g)}${S(this.b)}${S(
    (isNaN(this.opacity) ? 1 : this.opacity) * 255
  )}`;
}
function Vt() {
  const t = lt(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${D(this.r)}, ${D(this.g)}, ${D(
    this.b
  )}${t === 1 ? ")" : `, ${t})`}`;
}
function lt(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function D(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function S(t) {
  return (t = D(t)), (t < 16 ? "0" : "") + t.toString(16);
}
function Yt(t, n, e, r) {
  return (
    r <= 0
      ? (t = n = e = NaN)
      : e <= 0 || e >= 1
      ? (t = n = NaN)
      : n <= 0 && (t = NaN),
    new x(t, n, e, r)
  );
}
function yn(t) {
  if (t instanceof x) return new x(t.h, t.s, t.l, t.opacity);
  if ((t instanceof Q || (t = W(t)), !t)) return new x();
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
function Ir(t, n, e, r) {
  return arguments.length === 1 ? yn(t) : new x(t, n, e, r ?? 1);
}
function x(t, n, e, r) {
  (this.h = +t), (this.s = +n), (this.l = +e), (this.opacity = +r);
}
kt(
  x,
  Ir,
  gn(Q, {
    brighter(t) {
      return (
        (t = t == null ? at : Math.pow(at, t)),
        new x(this.h, this.s, this.l * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? z : Math.pow(z, t)),
        new x(this.h, this.s, this.l * t, this.opacity)
      );
    },
    rgb() {
      var t = (this.h % 360) + (this.h < 0) * 360,
        n = isNaN(t) || isNaN(this.s) ? 0 : this.s,
        e = this.l,
        r = e + (e < 0.5 ? e : 1 - e) * n,
        i = 2 * e - r;
      return new g(
        gt(t >= 240 ? t - 240 : t + 120, i, r),
        gt(t, i, r),
        gt(t < 120 ? t + 240 : t - 120, i, r),
        this.opacity
      );
    },
    clamp() {
      return new x(zt(this.h), tt(this.s), tt(this.l), lt(this.opacity));
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
        tt(this.s) * 100
      }%, ${tt(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
    },
  })
);
function zt(t) {
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
const mn = (t) => () => t;
function Cr(t, n) {
  return function (e) {
    return t + e * n;
  };
}
function Ar(t, n, e) {
  return (
    (t = Math.pow(t, e)),
    (n = Math.pow(n, e) - t),
    (e = 1 / e),
    function (r) {
      return Math.pow(t + r * n, e);
    }
  );
}
function Pr(t) {
  return (t = +t) == 1
    ? xn
    : function (n, e) {
        return e - n ? Ar(n, e, t) : mn(isNaN(n) ? e : n);
      };
}
function xn(t, n) {
  var e = n - t;
  return e ? Cr(t, e) : mn(isNaN(t) ? n : t);
}
const Ut = (function t(n) {
  var e = Pr(n);
  function r(i, o) {
    var s = e((i = wt(i)).r, (o = wt(o)).r),
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
function C(t, n) {
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
function Tr(t) {
  return function () {
    return t;
  };
}
function kr(t) {
  return function (n) {
    return t(n) + "";
  };
}
function Sr(t, n) {
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
        : ((c[++s] = null), a.push({ i: s, x: C(r, i) })),
      (e = yt.lastIndex);
  return (
    e < n.length && ((o = n.slice(e)), c[s] ? (c[s] += o) : (c[++s] = o)),
    c.length < 2
      ? a[0]
        ? kr(a[0].x)
        : Tr(n)
      : ((n = a.length),
        function (l) {
          for (var u = 0, f; u < n; ++u) c[(f = a[u]).i] = f.x(l);
          return c.join("");
        })
  );
}
var Wt = 180 / Math.PI,
  bt = {
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
      rotate: Math.atan2(n, t) * Wt,
      skewX: Math.atan(a) * Wt,
      scaleX: s,
      scaleY: c,
    }
  );
}
var nt;
function Mr(t) {
  const n = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(
    t + ""
  );
  return n.isIdentity ? bt : wn(n.a, n.b, n.c, n.d, n.e, n.f);
}
function Dr(t) {
  return t == null ||
    (nt || (nt = document.createElementNS("http://www.w3.org/2000/svg", "g")),
    nt.setAttribute("transform", t),
    !(t = nt.transform.baseVal.consolidate()))
    ? bt
    : ((t = t.matrix), wn(t.a, t.b, t.c, t.d, t.e, t.f));
}
function vn(t, n, e, r) {
  function i(l) {
    return l.length ? l.pop() + " " : "";
  }
  function o(l, u, f, h, p, d) {
    if (l !== f || u !== h) {
      var _ = p.push("translate(", null, n, null, e);
      d.push({ i: _ - 4, x: C(l, f) }, { i: _ - 2, x: C(u, h) });
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
      var _ = p.push(i(p) + "scale(", null, ",", null, ")");
      d.push({ i: _ - 4, x: C(l, f) }, { i: _ - 2, x: C(u, h) });
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
        for (var d = -1, _ = h.length, $; ++d < _; ) f[($ = h[d]).i] = $.x(p);
        return f.join("");
      }
    );
  };
}
var Rr = vn(Mr, "px, ", "px)", "deg)"),
  Lr = vn(Dr, ", ", ")", ")"),
  B = 0,
  F = 0,
  q = 0,
  bn = 1e3,
  ut,
  V,
  ft = 0,
  L = 0,
  dt = 0,
  K = typeof performance == "object" && performance.now ? performance : Date,
  $n =
    typeof window == "object" && window.requestAnimationFrame
      ? window.requestAnimationFrame.bind(window)
      : function (t) {
          setTimeout(t, 17);
        };
function St() {
  return L || ($n(Or), (L = K.now() + dt));
}
function Or() {
  L = 0;
}
function ht() {
  this._call = this._time = this._next = null;
}
ht.prototype = En.prototype = {
  constructor: ht,
  restart: function (t, n, e) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    (e = (e == null ? St() : +e) + (n == null ? 0 : +n)),
      !this._next &&
        V !== this &&
        (V ? (V._next = this) : (ut = this), (V = this)),
      (this._call = t),
      (this._time = e),
      $t();
  },
  stop: function () {
    this._call && ((this._call = null), (this._time = 1 / 0), $t());
  },
};
function En(t, n, e) {
  var r = new ht();
  return r.restart(t, n, e), r;
}
function Gr() {
  St(), ++B;
  for (var t = ut, n; t; )
    (n = L - t._time) >= 0 && t._call.call(void 0, n), (t = t._next);
  --B;
}
function Kt() {
  (L = (ft = K.now()) + dt), (B = F = 0);
  try {
    Gr();
  } finally {
    (B = 0), Br(), (L = 0);
  }
}
function Hr() {
  var t = K.now(),
    n = t - ft;
  n > bn && ((dt -= n), (ft = t));
}
function Br() {
  for (var t, n = ut, e, r = 1 / 0; n; )
    n._call
      ? (r > n._time && (r = n._time), (t = n), (n = n._next))
      : ((e = n._next), (n._next = null), (n = t ? (t._next = e) : (ut = e)));
  (V = t), $t(r);
}
function $t(t) {
  if (!B) {
    F && (F = clearTimeout(F));
    var n = t - L;
    n > 24
      ? (t < 1 / 0 && (F = setTimeout(Kt, t - K.now() - dt)),
        q && (q = clearInterval(q)))
      : (q || ((ft = K.now()), (q = setInterval(Hr, bn))), (B = 1), $n(Kt));
  }
}
function Zt(t, n, e) {
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
var Xr = en("start", "end", "cancel", "interrupt"),
  qr = [],
  Nn = 0,
  Qt = 1,
  Et = 2,
  ot = 3,
  Jt = 4,
  Nt = 5,
  st = 6;
function _t(t, n, e, r, i, o) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (e in s) return;
  Fr(t, e, {
    name: n,
    index: r,
    group: i,
    on: Xr,
    tween: qr,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: Nn,
  });
}
function Mt(t, n) {
  var e = w(t, n);
  if (e.state > Nn) throw new Error("too late; already scheduled");
  return e;
}
function b(t, n) {
  var e = w(t, n);
  if (e.state > ot) throw new Error("too late; already running");
  return e;
}
function w(t, n) {
  var e = t.__transition;
  if (!e || !(e = e[n])) throw new Error("transition not found");
  return e;
}
function Fr(t, n, e) {
  var r = t.__transition,
    i;
  (r[n] = e), (e.timer = En(o, 0, e.time));
  function o(l) {
    (e.state = Qt),
      e.timer.restart(s, e.delay, e.time),
      e.delay <= l && s(l - e.delay);
  }
  function s(l) {
    var u, f, h, p;
    if (e.state !== Qt) return a();
    for (u in r)
      if (((p = r[u]), p.name === e.name)) {
        if (p.state === ot) return Zt(s);
        p.state === Jt
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
      (Zt(function () {
        e.state === ot &&
          ((e.state = Jt), e.timer.restart(c, e.delay, e.time), c(l));
      }),
      (e.state = Et),
      e.on.call("start", t, t.__data__, e.index, e.group),
      e.state === Et)
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
            : (e.timer.restart(a), (e.state = Nt), 1),
        f = -1,
        h = i.length;
      ++f < h;

    )
      i[f].call(t, u);
    e.state === Nt && (e.on.call("end", t, t.__data__, e.index, e.group), a());
  }
  function a() {
    (e.state = st), e.timer.stop(), delete r[n];
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
      (i = r.state > Et && r.state < Nt),
        (r.state = st),
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
function zr(t, n) {
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
function Ur(t, n, e) {
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
    for (var r = w(this.node(), e).tween, i = 0, o = r.length, s; i < o; ++i)
      if ((s = r[i]).name === t) return s.value;
    return null;
  }
  return this.each((n == null ? zr : Ur)(e, t, n));
}
function Dt(t, n, e) {
  var r = t._id;
  return (
    t.each(function () {
      var i = b(this, r);
      (i.value || (i.value = {}))[n] = e.apply(this, arguments);
    }),
    function (i) {
      return w(i, r).value[n];
    }
  );
}
function In(t, n) {
  var e;
  return (
    typeof n == "number"
      ? C
      : n instanceof W
      ? Ut
      : (e = W(n))
      ? ((n = e), Ut)
      : Sr
  )(t, n);
}
function Kr(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function Zr(t) {
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
function Jr(t, n, e) {
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
  var e = pt(t),
    r = e === "transform" ? Lr : In;
  return this.attrTween(
    t,
    typeof n == "function"
      ? (e.local ? ti : jr)(e, r, Dt(this, "attr." + t, n))
      : n == null
      ? (e.local ? Zr : Kr)(e)
      : (e.local ? Jr : Qr)(e, r, n)
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
  var r = pt(t);
  return this.tween(e, (r.local ? ii : oi)(r, n));
}
function ci(t, n) {
  return function () {
    Mt(this, t).delay = +n.apply(this, arguments);
  };
}
function ai(t, n) {
  return (
    (n = +n),
    function () {
      Mt(this, t).delay = n;
    }
  );
}
function li(t) {
  var n = this._id;
  return arguments.length
    ? this.each((typeof t == "function" ? ci : ai)(n, t))
    : w(this.node(), n).delay;
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
    : w(this.node(), n).duration;
}
function pi(t, n) {
  if (typeof n != "function") throw new Error();
  return function () {
    b(this, t).ease = n;
  };
}
function di(t) {
  var n = this._id;
  return arguments.length ? this.each(pi(n, t)) : w(this.node(), n).ease;
}
function _i(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    if (typeof e != "function") throw new Error();
    b(this, t).ease = e;
  };
}
function gi(t) {
  if (typeof t != "function") throw new Error();
  return this.each(_i(this._id, t));
}
function yi(t) {
  typeof t != "function" && (t = sn(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, c = (r[i] = []), a, l = 0; l < s; ++l)
      (a = o[l]) && t.call(a, a.__data__, l, o) && c.push(a);
  return new N(r, this._parents, this._name, this._id);
}
function mi(t) {
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
function xi(t) {
  return (t + "")
    .trim()
    .split(/^|\s+/)
    .every(function (n) {
      var e = n.indexOf(".");
      return e >= 0 && (n = n.slice(0, e)), !n || n === "start";
    });
}
function wi(t, n, e) {
  var r,
    i,
    o = xi(n) ? Mt : b;
  return function () {
    var s = o(this, t),
      c = s.on;
    c !== r && (i = (r = c).copy()).on(n, e), (s.on = i);
  };
}
function vi(t, n) {
  var e = this._id;
  return arguments.length < 2
    ? w(this.node(), e).on.on(t)
    : this.each(wi(e, t, n));
}
function bi(t) {
  return function () {
    var n = this.parentNode;
    for (var e in this.__transition) if (+e !== t) return;
    n && n.removeChild(this);
  };
}
function $i() {
  return this.on("end.remove", bi(this._id));
}
function Ei(t) {
  var n = this._name,
    e = this._id;
  typeof t != "function" && (t = Pt(t));
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
        _t(l[h], n, e, h, l, w(u, e)));
  return new N(o, this._parents, n, e);
}
function Ni(t) {
  var n = this._name,
    e = this._id;
  typeof t != "function" && (t = on(t));
  for (var r = this._groups, i = r.length, o = [], s = [], c = 0; c < i; ++c)
    for (var a = r[c], l = a.length, u, f = 0; f < l; ++f)
      if ((u = a[f])) {
        for (
          var h = t.call(u, u.__data__, f, a),
            p,
            d = w(u, e),
            _ = 0,
            $ = h.length;
          _ < $;
          ++_
        )
          (p = h[_]) && _t(p, n, e, _, h, d);
        o.push(h), s.push(u);
      }
  return new N(o, s, n, e);
}
var Ii = Z.prototype.constructor;
function Ci() {
  return new Ii(this._groups, this._parents);
}
function Ai(t, n) {
  var e, r, i;
  return function () {
    var o = H(this, t),
      s = (this.style.removeProperty(t), H(this, t));
    return o === s ? null : o === e && s === r ? i : (i = n((e = o), (r = s)));
  };
}
function Cn(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function Pi(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = H(this, t);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function Ti(t, n, e) {
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
function ki(t, n) {
  var e,
    r,
    i,
    o = "style." + n,
    s = "end." + o,
    c;
  return function () {
    var a = b(this, t),
      l = a.on,
      u = a.value[o] == null ? c || (c = Cn(n)) : void 0;
    (l !== e || i !== u) && (r = (e = l).copy()).on(s, (i = u)), (a.on = r);
  };
}
function Si(t, n, e) {
  var r = (t += "") == "transform" ? Rr : In;
  return n == null
    ? this.styleTween(t, Ai(t, r)).on("end.style." + t, Cn(t))
    : typeof n == "function"
    ? this.styleTween(t, Ti(t, r, Dt(this, "style." + t, n))).each(
        ki(this._id, t)
      )
    : this.styleTween(t, Pi(t, r, n), e).on("end.style." + t, null);
}
function Mi(t, n, e) {
  return function (r) {
    this.style.setProperty(t, n.call(this, r), e);
  };
}
function Di(t, n, e) {
  var r, i;
  function o() {
    var s = n.apply(this, arguments);
    return s !== i && (r = (i = s) && Mi(t, s, e)), r;
  }
  return (o._value = n), o;
}
function Ri(t, n, e) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (n == null) return this.tween(r, null);
  if (typeof n != "function") throw new Error();
  return this.tween(r, Di(t, n, e ?? ""));
}
function Li(t) {
  return function () {
    this.textContent = t;
  };
}
function Oi(t) {
  return function () {
    var n = t(this);
    this.textContent = n ?? "";
  };
}
function Gi(t) {
  return this.tween(
    "text",
    typeof t == "function"
      ? Oi(Dt(this, "text", t))
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
function qi() {
  for (
    var t = this._name,
      n = this._id,
      e = An(),
      r = this._groups,
      i = r.length,
      o = 0;
    o < i;
    ++o
  )
    for (var s = r[o], c = s.length, a, l = 0; l < c; ++l)
      if ((a = s[l])) {
        var u = w(a, n);
        _t(a, t, e, l, s, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease,
        });
      }
  return new N(r, this._parents, t, e);
}
function Fi() {
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
function An() {
  return ++Vi;
}
var E = Z.prototype;
N.prototype = {
  constructor: N,
  select: Ei,
  selectAll: Ni,
  selectChild: E.selectChild,
  selectChildren: E.selectChildren,
  filter: yi,
  merge: mi,
  selection: Ci,
  transition: qi,
  call: E.call,
  nodes: E.nodes,
  node: E.node,
  size: E.size,
  empty: E.empty,
  each: E.each,
  on: vi,
  attr: ni,
  attrTween: si,
  style: Si,
  styleTween: Ri,
  text: Gi,
  textTween: Xi,
  remove: $i,
  tween: Wr,
  delay: li,
  duration: hi,
  ease: di,
  easeVarying: gi,
  end: Fi,
  [Symbol.iterator]: E[Symbol.iterator],
};
function Yi(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var zi = { time: null, delay: 0, duration: 250, ease: Yi };
function Ui(t, n) {
  for (var e; !(e = t.__transition) || !(e = e[n]); )
    if (!(t = t.parentNode)) throw new Error(`transition ${n} not found`);
  return e;
}
function Wi(t) {
  var n, e;
  t instanceof N
    ? ((n = t._id), (t = t._name))
    : ((n = An()), ((e = zi).time = St()), (t = t == null ? null : t + ""));
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], c = s.length, a, l = 0; l < c; ++l)
      (a = s[l]) && _t(a, t, n, l, s, e || Ui(a, n));
  return new N(r, this._parents, t, n);
}
Z.prototype.interrupt = Yr;
Z.prototype.transition = Wi;
const It = Math.PI,
  Ct = 2 * It,
  T = 1e-6,
  Ki = Ct - T;
function Pn(t) {
  this._ += t[0];
  for (let n = 1, e = t.length; n < e; ++n) this._ += arguments[n] + t[n];
}
function Zi(t) {
  let n = Math.floor(t);
  if (!(n >= 0)) throw new Error(`invalid digits: ${t}`);
  if (n > 15) return Pn;
  const e = 10 ** n;
  return function (r) {
    this._ += r[0];
    for (let i = 1, o = r.length; i < o; ++i)
      this._ += Math.round(arguments[i] * e) / e + r[i];
  };
}
class Qi {
  constructor(n) {
    (this._x0 = this._y0 = this._x1 = this._y1 = null),
      (this._ = ""),
      (this._append = n == null ? Pn : Zi(n));
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
    else if (h > T)
      if (!(Math.abs(f * a - l * u) > T) || !o)
        this._append`L${(this._x1 = n)},${(this._y1 = e)}`;
      else {
        let p = r - s,
          d = i - c,
          _ = a * a + l * l,
          $ = p * p + d * d,
          J = Math.sqrt(_),
          I = Math.sqrt(h),
          P = o * Math.tan((It - Math.acos((_ + h - $) / (2 * J * I))) / 2),
          O = P / I,
          X = P / J;
        Math.abs(O - 1) > T && this._append`L${n + O * u},${e + O * f}`,
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
      : (Math.abs(this._x1 - l) > T || Math.abs(this._y1 - u) > T) &&
        this._append`L${l},${u}`,
      r &&
        (h < 0 && (h = (h % Ct) + Ct),
        h > Ki
          ? this._append`A${r},${r},0,1,${f},${n - c},${
              e - a
            }A${r},${r},0,1,${f},${(this._x1 = l)},${(this._y1 = u)}`
          : h > T &&
            this._append`A${r},${r},0,${+(h >= It)},${f},${(this._x1 =
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
function Ji(t) {
  if (!t.ok) throw new Error(t.status + " " + t.statusText);
  return t.text();
}
function ji(t, n) {
  return fetch(t, n).then(Ji);
}
function to(t) {
  return (n, e) => ji(n, e).then((r) => new DOMParser().parseFromString(r, t));
}
const no = to("application/xml");
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
class Tn {
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
    if (xt("#" + this.id).node() != null) return;
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
      this.sensor.node().append(xt(n.documentElement).node());
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
    "_x30_.1.0.220.2.3-0",
    "_x30_.1.0.221.0.5.13-6",
    "_x30_.1.0.224.0.10_1_-3",
    "_x30_.1.0.223.0.0.1.12-2",
    "_x30_.1.0.224.0.10-7",
    "_x30_.1.0.226.0.1",
    "_x30_.1.0.227.1",
  ],
  M = {
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
  eo = ["vcc", "gnd", "out"],
  et = {
    vcc: "VCC of DHT11 Sensor",
    gnd: "Ground pin of DHT11 Sensor",
    out: "Out pin DHT11 Sensor",
  },
  ro = (t) => {
    if (t.length == 0) return { error: "No connection found" };
    const n = ["GPIO", "GND", "vcc", "gnd", "out", "5V PWR"];
    let e = 0;
    return (
      t.forEach((r) => {
        if (n.find((i) => i == r.connector)) {
          e++;
          return;
        }
        if (M[r.connector] == "GND") {
          e++;
          return;
        }
        if (M[r.connector].includes("GPIO")) {
          e++;
          return;
        }
      }),
      console.log(e),
      e == 5
    );
  };
class io {
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
      const e = M[this.connections[this.connections.length - 2].connector]
          ? `${
              M[this.connections[this.connections.length - 2].connector]
            } pin of Raspberry Pi`
          : et[this.connections[this.connections.length - 2].connector]
          ? et[this.connections[this.connections.length - 2].connector]
          : this.connections[this.connections.length - 2].connector,
        r = M[this.connections[this.connections.length - 1].connector]
          ? `${
              M[this.connections[this.connections.length - 1].connector]
            } pin of Raspberry Pi`
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
class oo {
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
const jt = (t, n) => {
    Lt.append("path")
      .attr("d", t)
      .attr("stroke", "black")
      .attr("stroke-width", "2px")
      .attr("fill", "none")
      .attr("id", n);
  },
  R = xt("#svg")
    .append("svg")
    .attr("id", "svgContainer")
    .attr(
      "height",
      window.innerHeight - document.getElementById("svg").offsetTop
    )
    .attr("width", document.getElementById("svg").offsetWidth),
  so = new Tn("raspberry", R, "images/pi3dirk.svg", 1, !1, 0, 0),
  co = new Tn("sensorDHT11", R, "images/sensor.svg", 2.5, !1, 300, 35),
  Lt = R.append("g").attr("id", "pathsGroup"),
  kn = document.getElementById("rasberryPi"),
  Sn = document.getElementById("sensor"),
  At = document.getElementById("displayInfo"),
  rt = document.getElementById("componentDescription"),
  A = new io("connectionLog"),
  tn = new oo("errorBox", "errorHeading", "errorText", "closeErrorBox");
let m,
  k = 0;
const ao = document.querySelector("#undoButton");
ao.addEventListener("click", () => {
  A.undoLastConnection(), uo();
});
const lo = (t) => {
    Lt.selectAll(`path[id="${t}"]`)
      .nodes()
      .forEach((e) => e.remove());
  },
  uo = () => {
    if (m) {
      Lt.selectAll(`path[id^="path${k}"]`)
        .nodes()
        .forEach((n) => n.remove()),
        (m = null),
        (k = 0),
        console.log("Removed all incomplete paths");
      return;
    }
    if (A.connections.length > 0) {
      const n = A.connections[A.connections.length - 1].lineID;
      lo(n),
        A.connections.pop(),
        console.log(`Removed paths with line ID: ${n}`);
    } else console.warn("No more connections to undo");
  };
kn.addEventListener("click", async () => {
  await so.load();
});
Sn.addEventListener("click", async () => {
  await co.load();
});
const Mn = (t, n) => {
    t.addEventListener("mouseover", () => {
      (rt.innerHTML = n), (rt.style.display = "block");
    }),
      t.addEventListener("mouseout", () => {
        (rt.style.display = "none"), (rt.innerHTML = "");
      });
  },
  fo =
    "Raspberry Pi: A small single-board computer for learning and prototyping. The 5V pin connects to the DHT11 VCC for power, GND pin connects to the DHT11 GND for a common ground, and GPIO4 (Physical Pin 7) connects to the sensor’s Data Out to receive temperature and humidity data. Click the 'Code' button to view and submit the program, then adjust the slider to change temperature and observe the results.",
  ho =
    "DHT11 Sensor: A basic temperature and humidity sensor with digital output. The VCC pin connects to the Raspberry Pi’s 5V for power, GND pin connects to the Raspberry Pi’s GND, and Data Out pin connects to GPIO4 (Physical Pin 7) to send data for processing.";
Mn(kn, fo);
Mn(Sn, ho);
R.on("dblclick", (t) => {
  if (nn(t) && !m) {
    (m = new Qi()),
      m.moveTo(t.offsetX, t.offsetY),
      A.addConnection({
        lineID: `path${k}`,
        x: t.offsetX,
        y: t.offsetY,
        connector: t.srcElement.id,
        connectorEnd: null,
        incomplete: !0,
      }),
      R.style("cursor", "crosshair"),
      console.log("path created 0");
    return;
  }
  if (t.srcElement.id === "svgContainer" && !Rt.includes(t.srcElement.id)) {
    m &&
      (m.lineTo(t.offsetX, t.offsetY),
      jt(m.toString(), `path${k}`),
      console.log("path created"));
    return;
  }
  if (nn(t) && m) {
    m.lineTo(t.offsetX, t.offsetY),
      jt(m.toString(), `path${k}`),
      A.addConnection({
        lineID: `path${k}`,
        x: t.offsetX,
        y: t.offsetY,
        connector: t.srcElement.id,
        connectorEnd: t.srcElement.id,
        incomplete: !1,
      }),
      k++,
      R.style("cursor", "default"),
      (m = null),
      console.log("path created 2");
    return;
  }
});
R.on("mouseover", (t) => {
  Rt.includes(t.srcElement.id) && (At.innerHTML = M[t.srcElement.id]);
});
const po = () => {
  const t = document.getElementById("temperature").value;
  (At.innerHTML = "Temperature: " + t + "°C"),
    document.getElementById("temperature").addEventListener("change", () => {
      At.innerHTML =
        "Temperature: " + document.getElementById("temperature").value + "°C";
    });
};
document.getElementById("codeSubmit").addEventListener("click", () => {
  const t = ro(A.getConnectionLog());
  t === !0
    ? (po(), document.querySelector("#my-drawer-4").click())
    : t.error
    ? tn.throw("Error", t.error)
    : tn.throw(
        "Error",
        "Please connect the components properly. Refer to the connection diagram."
      );
});
function nn(t) {
  return Rt.includes(t.srcElement.id) || eo.includes(t.srcElement.id);
}
