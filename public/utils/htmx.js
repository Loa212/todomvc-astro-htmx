(function (e, t) {
  if (typeof define === "function" && define.amd) {
    define([], t);
  } else if (typeof module === "object" && module.exports) {
    module.exports = t();
  } else {
    e.htmx = e.htmx || t();
  }
})(typeof self !== "undefined" ? self : this, function () {
  return (function () {
    "use strict";
    var Y = {
      onLoad: t,
      process: Dt,
      on: Z,
      off: K,
      trigger: fe,
      ajax: Cr,
      find: E,
      findAll: f,
      closest: d,
      values: function (e, t) {
        var r = or(e, t || "post");
        return r.values;
      },
      remove: B,
      addClass: F,
      removeClass: n,
      toggleClass: V,
      takeClass: j,
      defineExtension: Ar,
      removeExtension: Nr,
      logAll: X,
      logNone: U,
      logger: null,
      config: {
        historyEnabled: true,
        historyCacheSize: 10,
        refreshOnHistoryMiss: false,
        defaultSwapStyle: "innerHTML",
        defaultSwapDelay: 0,
        defaultSettleDelay: 20,
        includeIndicatorStyles: true,
        indicatorClass: "htmx-indicator",
        requestClass: "htmx-request",
        addedClass: "htmx-added",
        settlingClass: "htmx-settling",
        swappingClass: "htmx-swapping",
        allowEval: true,
        allowScriptTags: true,
        inlineScriptNonce: "",
        attributesToSettle: ["class", "style", "width", "height"],
        withCredentials: false,
        timeout: 0,
        wsReconnectDelay: "full-jitter",
        wsBinaryType: "blob",
        disableSelector: "[hx-disable], [data-hx-disable]",
        useTemplateFragments: false,
        scrollBehavior: "smooth",
        defaultFocusScroll: false,
        getCacheBusterParam: false,
        globalViewTransitions: false,
        methodsThatUseUrlParams: ["get"],
        selfRequestsOnly: false,
        scrollIntoViewOnBoost: true,
      },
      parseInterval: v,
      _: e,
      createEventSource: function (e) {
        return new EventSource(e, { withCredentials: true });
      },
      createWebSocket: function (e) {
        var t = new WebSocket(e, []);
        t.binaryType = Y.config.wsBinaryType;
        return t;
      },
      version: "1.9.8",
    };
    var r = {
      addTriggerHandler: St,
      bodyContains: oe,
      canAccessLocalStorage: M,
      findThisElement: ve,
      filterValues: cr,
      hasAttribute: o,
      getAttributeValue: ee,
      getClosestAttributeValue: re,
      getClosestMatch: c,
      getExpressionVars: wr,
      getHeaders: fr,
      getInputValues: or,
      getInternalData: ie,
      getSwapSpecification: dr,
      getTriggerSpecs: Ze,
      getTarget: ge,
      makeFragment: l,
      mergeObjects: se,
      makeSettleInfo: T,
      oobSwap: ye,
      querySelectorExt: le,
      selectAndSwap: Ue,
      settleImmediately: Jt,
      shouldCancel: tt,
      triggerEvent: fe,
      triggerErrorEvent: ue,
      withExtensions: C,
    };
    var b = ["get", "post", "put", "delete", "patch"];
    var w = b
      .map(function (e) {
        return "[hx-" + e + "], [data-hx-" + e + "]";
      })
      .join(", ");
    function v(e) {
      if (e == undefined) {
        return undefined;
      }
      if (e.slice(-2) == "ms") {
        return parseFloat(e.slice(0, -2)) || undefined;
      }
      if (e.slice(-1) == "s") {
        return parseFloat(e.slice(0, -1)) * 1e3 || undefined;
      }
      if (e.slice(-1) == "m") {
        return parseFloat(e.slice(0, -1)) * 1e3 * 60 || undefined;
      }
      return parseFloat(e) || undefined;
    }
    function Q(e, t) {
      return e.getAttribute && e.getAttribute(t);
    }
    function o(e, t) {
      return (
        e.hasAttribute && (e.hasAttribute(t) || e.hasAttribute("data-" + t))
      );
    }
    function ee(e, t) {
      return Q(e, t) || Q(e, "data-" + t);
    }
    function u(e) {
      return e.parentElement;
    }
    function te() {
      return document;
    }
    function c(e, t) {
      while (e && !t(e)) {
        e = u(e);
      }
      return e ? e : null;
    }
    function R(e, t, r) {
      var n = ee(t, r);
      var i = ee(t, "hx-disinherit");
      if (e !== t && i && (i === "*" || i.split(" ").indexOf(r) >= 0)) {
        return "unset";
      } else {
        return n;
      }
    }
    function re(t, r) {
      var n = null;
      c(t, function (e) {
        return (n = R(t, e, r));
      });
      if (n !== "unset") {
        return n;
      }
    }
    function h(e, t) {
      var r =
        e.matches ||
        e.matchesSelector ||
        e.msMatchesSelector ||
        e.mozMatchesSelector ||
        e.webkitMatchesSelector ||
        e.oMatchesSelector;
      return r && r.call(e, t);
    }
    function q(e) {
      var t = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i;
      var r = t.exec(e);
      if (r) {
        return r[1].toLowerCase();
      } else {
        return "";
      }
    }
    function i(e, t) {
      var r = new DOMParser();
      var n = r.parseFromString(e, "text/html");
      var i = n.body;
      while (t > 0) {
        t--;
        i = i.firstChild;
      }
      if (i == null) {
        i = te().createDocumentFragment();
      }
      return i;
    }
    function H(e) {
      return e.match(/<body/);
    }
    function l(e) {
      var t = !H(e);
      if (Y.config.useTemplateFragments && t) {
        var r = i("<body><template>" + e + "</template></body>", 0);
        return r.querySelector("template").content;
      } else {
        var n = q(e);
        switch (n) {
          case "thead":
          case "tbody":
          case "tfoot":
          case "colgroup":
          case "caption":
            return i("<table>" + e + "</table>", 1);
          case "col":
            return i("<table><colgroup>" + e + "</colgroup></table>", 2);
          case "tr":
            return i("<table><tbody>" + e + "</tbody></table>", 2);
          case "td":
          case "th":
            return i("<table><tbody><tr>" + e + "</tr></tbody></table>", 3);
          case "script":
          case "style":
            return i("<div>" + e + "</div>", 1);
          default:
            return i(e, 0);
        }
      }
    }
    function ne(e) {
      if (e) {
        e();
      }
    }
    function L(e, t) {
      return Object.prototype.toString.call(e) === "[object " + t + "]";
    }
    function A(e) {
      return L(e, "Function");
    }
    function N(e) {
      return L(e, "Object");
    }
    function ie(e) {
      var t = "htmx-internal-data";
      var r = e[t];
      if (!r) {
        r = e[t] = {};
      }
      return r;
    }
    function I(e) {
      var t = [];
      if (e) {
        for (var r = 0; r < e.length; r++) {
          t.push(e[r]);
        }
      }
      return t;
    }
    function ae(e, t) {
      if (e) {
        for (var r = 0; r < e.length; r++) {
          t(e[r]);
        }
      }
    }
    function k(e) {
      var t = e.getBoundingClientRect();
      var r = t.top;
      var n = t.bottom;
      return r < window.innerHeight && n >= 0;
    }
    function oe(e) {
      if (e.getRootNode && e.getRootNode() instanceof window.ShadowRoot) {
        return te().body.contains(e.getRootNode().host);
      } else {
        return te().body.contains(e);
      }
    }
    function P(e) {
      return e.trim().split(/\s+/);
    }
    function se(e, t) {
      for (var r in t) {
        if (t.hasOwnProperty(r)) {
          e[r] = t[r];
        }
      }
      return e;
    }
    function S(e) {
      try {
        return JSON.parse(e);
      } catch (e) {
        y(e);
        return null;
      }
    }
    function M() {
      var e = "htmx:localStorageTest";
      try {
        localStorage.setItem(e, e);
        localStorage.removeItem(e);
        return true;
      } catch (e) {
        return false;
      }
    }
    function D(t) {
      try {
        var e = new URL(t);
        if (e) {
          t = e.pathname + e.search;
        }
        if (!t.match("^/$")) {
          t = t.replace(/\/+$/, "");
        }
        return t;
      } catch (e) {
        return t;
      }
    }
    function e(e) {
      return xr(te().body, function () {
        return eval(e);
      });
    }
    function t(t) {
      var e = Y.on("htmx:load", function (e) {
        t(e.detail.elt);
      });
      return e;
    }
    function X() {
      Y.logger = function (e, t, r) {
        if (console) {
          console.log(t, e, r);
        }
      };
    }
    function U() {
      Y.logger = null;
    }
    function E(e, t) {
      if (t) {
        return e.querySelector(t);
      } else {
        return E(te(), e);
      }
    }
    function f(e, t) {
      if (t) {
        return e.querySelectorAll(t);
      } else {
        return f(te(), e);
      }
    }
    function B(e, t) {
      e = s(e);
      if (t) {
        setTimeout(function () {
          B(e);
          e = null;
        }, t);
      } else {
        e.parentElement.removeChild(e);
      }
    }
    function F(e, t, r) {
      e = s(e);
      if (r) {
        setTimeout(function () {
          F(e, t);
          e = null;
        }, r);
      } else {
        e.classList && e.classList.add(t);
      }
    }
    function n(e, t, r) {
      e = s(e);
      if (r) {
        setTimeout(function () {
          n(e, t);
          e = null;
        }, r);
      } else {
        if (e.classList) {
          e.classList.remove(t);
          if (e.classList.length === 0) {
            e.removeAttribute("class");
          }
        }
      }
    }
    function V(e, t) {
      e = s(e);
      e.classList.toggle(t);
    }
    function j(e, t) {
      e = s(e);
      ae(e.parentElement.children, function (e) {
        n(e, t);
      });
      F(e, t);
    }
    function d(e, t) {
      e = s(e);
      if (e.closest) {
        return e.closest(t);
      } else {
        do {
          if (e == null || h(e, t)) {
            return e;
          }
        } while ((e = e && u(e)));
        return null;
      }
    }
    function g(e, t) {
      return e.substring(0, t.length) === t;
    }
    function _(e, t) {
      return e.substring(e.length - t.length) === t;
    }
    function z(e) {
      var t = e.trim();
      if (g(t, "<") && _(t, "/>")) {
        return t.substring(1, t.length - 2);
      } else {
        return t;
      }
    }
    function W(e, t) {
      if (t.indexOf("closest ") === 0) {
        return [d(e, z(t.substr(8)))];
      } else if (t.indexOf("find ") === 0) {
        return [E(e, z(t.substr(5)))];
      } else if (t === "next") {
        return [e.nextElementSibling];
      } else if (t.indexOf("next ") === 0) {
        return [$(e, z(t.substr(5)))];
      } else if (t === "previous") {
        return [e.previousElementSibling];
      } else if (t.indexOf("previous ") === 0) {
        return [G(e, z(t.substr(9)))];
      } else if (t === "document") {
        return [document];
      } else if (t === "window") {
        return [window];
      } else if (t === "body") {
        return [document.body];
      } else {
        return te().querySelectorAll(z(t));
      }
    }
    var $ = function (e, t) {
      var r = te().querySelectorAll(t);
      for (var n = 0; n < r.length; n++) {
        var i = r[n];
        if (i.compareDocumentPosition(e) === Node.DOCUMENT_POSITION_PRECEDING) {
          return i;
        }
      }
    };
    var G = function (e, t) {
      var r = te().querySelectorAll(t);
      for (var n = r.length - 1; n >= 0; n--) {
        var i = r[n];
        if (i.compareDocumentPosition(e) === Node.DOCUMENT_POSITION_FOLLOWING) {
          return i;
        }
      }
    };
    function le(e, t) {
      if (t) {
        return W(e, t)[0];
      } else {
        return W(te().body, e)[0];
      }
    }
    function s(e) {
      if (L(e, "String")) {
        return E(e);
      } else {
        return e;
      }
    }
    function J(e, t, r) {
      if (A(t)) {
        return { target: te().body, event: e, listener: t };
      } else {
        return { target: s(e), event: t, listener: r };
      }
    }
    function Z(t, r, n) {
      Pr(function () {
        var e = J(t, r, n);
        e.target.addEventListener(e.event, e.listener);
      });
      var e = A(r);
      return e ? r : n;
    }
    function K(t, r, n) {
      Pr(function () {
        var e = J(t, r, n);
        e.target.removeEventListener(e.event, e.listener);
      });
      return A(r) ? r : n;
    }
    var he = te().createElement("output");
    function de(e, t) {
      var r = re(e, t);
      if (r) {
        if (r === "this") {
          return [ve(e, t)];
        } else {
          var n = W(e, r);
          if (n.length === 0) {
            y('The selector "' + r + '" on ' + t + " returned no matches!");
            return [he];
          } else {
            return n;
          }
        }
      }
    }
    function ve(e, t) {
      return c(e, function (e) {
        return ee(e, t) != null;
      });
    }
    function ge(e) {
      var t = re(e, "hx-target");
      if (t) {
        if (t === "this") {
          return ve(e, "hx-target");
        } else {
          return le(e, t);
        }
      } else {
        var r = ie(e);
        if (r.boosted) {
          return te().body;
        } else {
          return e;
        }
      }
    }
    function me(e) {
      var t = Y.config.attributesToSettle;
      for (var r = 0; r < t.length; r++) {
        if (e === t[r]) {
          return true;
        }
      }
      return false;
    }
    function pe(t, r) {
      ae(t.attributes, function (e) {
        if (!r.hasAttribute(e.name) && me(e.name)) {
          t.removeAttribute(e.name);
        }
      });
      ae(r.attributes, function (e) {
        if (me(e.name)) {
          t.setAttribute(e.name, e.value);
        }
      });
    }
    function xe(e, t) {
      var r = Ir(t);
      for (var n = 0; n < r.length; n++) {
        var i = r[n];
        try {
          if (i.isInlineSwap(e)) {
            return true;
          }
        } catch (e) {
          y(e);
        }
      }
      return e === "outerHTML";
    }
    function ye(e, i, a) {
      var t = "#" + Q(i, "id");
      var o = "outerHTML";
      if (e === "true") {
      } else if (e.indexOf(":") > 0) {
        o = e.substr(0, e.indexOf(":"));
        t = e.substr(e.indexOf(":") + 1, e.length);
      } else {
        o = e;
      }
      var r = te().querySelectorAll(t);
      if (r) {
        ae(r, function (e) {
          var t;
          var r = i.cloneNode(true);
          t = te().createDocumentFragment();
          t.appendChild(r);
          if (!xe(o, e)) {
            t = r;
          }
          var n = { shouldSwap: true, target: e, fragment: t };
          if (!fe(e, "htmx:oobBeforeSwap", n)) return;
          e = n.target;
          if (n["shouldSwap"]) {
            De(o, e, e, t, a);
          }
          ae(a.elts, function (e) {
            fe(e, "htmx:oobAfterSwap", n);
          });
        });
        i.parentNode.removeChild(i);
      } else {
        i.parentNode.removeChild(i);
        ue(te().body, "htmx:oobErrorNoTarget", { content: i });
      }
      return e;
    }
    function be(e, t, r) {
      var n = re(e, "hx-select-oob");
      if (n) {
        var i = n.split(",");
        for (let e = 0; e < i.length; e++) {
          var a = i[e].split(":", 2);
          var o = a[0].trim();
          if (o.indexOf("#") === 0) {
            o = o.substring(1);
          }
          var s = a[1] || "true";
          var l = t.querySelector("#" + o);
          if (l) {
            ye(s, l, r);
          }
        }
      }
      ae(f(t, "[hx-swap-oob], [data-hx-swap-oob]"), function (e) {
        var t = ee(e, "hx-swap-oob");
        if (t != null) {
          ye(t, e, r);
        }
      });
    }
    function we(e) {
      ae(f(e, "[hx-preserve], [data-hx-preserve]"), function (e) {
        var t = ee(e, "id");
        var r = te().getElementById(t);
        if (r != null) {
          e.parentNode.replaceChild(r, e);
        }
      });
    }
    function Se(o, e, s) {
      ae(e.querySelectorAll("[id]"), function (e) {
        var t = Q(e, "id");
        if (t && t.length > 0) {
          var r = t.replace("'", "\\'");
          var n = e.tagName.replace(":", "\\:");
          var i = o.querySelector(n + "[id='" + r + "']");
          if (i && i !== o) {
            var a = e.cloneNode();
            pe(e, i);
            s.tasks.push(function () {
              pe(e, a);
            });
          }
        }
      });
    }
    function Ee(e) {
      return function () {
        n(e, Y.config.addedClass);
        Dt(e);
        Ct(e);
        Ce(e);
        fe(e, "htmx:load");
      };
    }
    function Ce(e) {
      var t = "[autofocus]";
      var r = h(e, t) ? e : e.querySelector(t);
      if (r != null) {
        r.focus();
      }
    }
    function a(e, t, r, n) {
      Se(e, r, n);
      while (r.childNodes.length > 0) {
        var i = r.firstChild;
        F(i, Y.config.addedClass);
        e.insertBefore(i, t);
        if (i.nodeType !== Node.TEXT_NODE && i.nodeType !== Node.COMMENT_NODE) {
          n.tasks.push(Ee(i));
        }
      }
    }
    function Te(e, t) {
      var r = 0;
      while (r < e.length) {
        t = ((t << 5) - t + e.charCodeAt(r++)) | 0;
      }
      return t;
    }
    function Oe(e) {
      var t = 0;
      if (e.attributes) {
        for (var r = 0; r < e.attributes.length; r++) {
          var n = e.attributes[r];
          if (n.value) {
            t = Te(n.name, t);
            t = Te(n.value, t);
          }
        }
      }
      return t;
    }
    function Re(t) {
      var r = ie(t);
      if (r.onHandlers) {
        for (let e = 0; e < r.onHandlers.length; e++) {
          const n = r.onHandlers[e];
          t.removeEventListener(n.event, n.listener);
        }
        delete r.onHandlers;
      }
    }
    function qe(e) {
      var t = ie(e);
      if (t.timeout) {
        clearTimeout(t.timeout);
      }
      if (t.webSocket) {
        t.webSocket.close();
      }
      if (t.sseEventSource) {
        t.sseEventSource.close();
      }
      if (t.listenerInfos) {
        ae(t.listenerInfos, function (e) {
          if (e.on) {
            e.on.removeEventListener(e.trigger, e.listener);
          }
        });
      }
      if (t.initHash) {
        t.initHash = null;
      }
      Re(e);
    }
    function m(e) {
      fe(e, "htmx:beforeCleanupElement");
      qe(e);
      if (e.children) {
        ae(e.children, function (e) {
          m(e);
        });
      }
    }
    function He(t, e, r) {
      if (t.tagName === "BODY") {
        return Pe(t, e, r);
      } else {
        var n;
        var i = t.previousSibling;
        a(u(t), t, e, r);
        if (i == null) {
          n = u(t).firstChild;
        } else {
          n = i.nextSibling;
        }
        ie(t).replacedWith = n;
        r.elts = r.elts.filter(function (e) {
          return e != t;
        });
        while (n && n !== t) {
          if (n.nodeType === Node.ELEMENT_NODE) {
            r.elts.push(n);
          }
          n = n.nextElementSibling;
        }
        m(t);
        u(t).removeChild(t);
      }
    }
    function Le(e, t, r) {
      return a(e, e.firstChild, t, r);
    }
    function Ae(e, t, r) {
      return a(u(e), e, t, r);
    }
    function Ne(e, t, r) {
      return a(e, null, t, r);
    }
    function Ie(e, t, r) {
      return a(u(e), e.nextSibling, t, r);
    }
    function ke(e, t, r) {
      m(e);
      return u(e).removeChild(e);
    }
    function Pe(e, t, r) {
      var n = e.firstChild;
      a(e, n, t, r);
      if (n) {
        while (n.nextSibling) {
          m(n.nextSibling);
          e.removeChild(n.nextSibling);
        }
        m(n);
        e.removeChild(n);
      }
    }
    function Me(e, t, r) {
      var n = r || re(e, "hx-select");
      if (n) {
        var i = te().createDocumentFragment();
        ae(t.querySelectorAll(n), function (e) {
          i.appendChild(e);
        });
        t = i;
      }
      return t;
    }
    function De(e, t, r, n, i) {
      switch (e) {
        case "none":
          return;
        case "outerHTML":
          He(r, n, i);
          return;
        case "afterbegin":
          Le(r, n, i);
          return;
        case "beforebegin":
          Ae(r, n, i);
          return;
        case "beforeend":
          Ne(r, n, i);
          return;
        case "afterend":
          Ie(r, n, i);
          return;
        case "delete":
          ke(r, n, i);
          return;
        default:
          var a = Ir(t);
          for (var o = 0; o < a.length; o++) {
            var s = a[o];
            try {
              var l = s.handleSwap(e, r, n, i);
              if (l) {
                if (typeof l.length !== "undefined") {
                  for (var u = 0; u < l.length; u++) {
                    var f = l[u];
                    if (
                      f.nodeType !== Node.TEXT_NODE &&
                      f.nodeType !== Node.COMMENT_NODE
                    ) {
                      i.tasks.push(Ee(f));
                    }
                  }
                }
                return;
              }
            } catch (e) {
              y(e);
            }
          }
          if (e === "innerHTML") {
            Pe(r, n, i);
          } else {
            De(Y.config.defaultSwapStyle, t, r, n, i);
          }
      }
    }
    function Xe(e) {
      if (e.indexOf("<title") > -1) {
        var t = e.replace(/<svg(\s[^>]*>|>)([\s\S]*?)<\/svg>/gim, "");
        var r = t.match(/<title(\s[^>]*>|>)([\s\S]*?)<\/title>/im);
        if (r) {
          return r[2];
        }
      }
    }
    function Ue(e, t, r, n, i, a) {
      i.title = Xe(n);
      var o = l(n);
      if (o) {
        be(r, o, i);
        o = Me(r, o, a);
        we(o);
        return De(e, r, t, o, i);
      }
    }
    function Be(e, t, r) {
      var n = e.getResponseHeader(t);
      if (n.indexOf("{") === 0) {
        var i = S(n);
        for (var a in i) {
          if (i.hasOwnProperty(a)) {
            var o = i[a];
            if (!N(o)) {
              o = { value: o };
            }
            fe(r, a, o);
          }
        }
      } else {
        var s = n.split(",");
        for (var l = 0; l < s.length; l++) {
          fe(r, s[l].trim(), []);
        }
      }
    }
    var Fe = /\s/;
    var p = /[\s,]/;
    var Ve = /[_$a-zA-Z]/;
    var je = /[_$a-zA-Z0-9]/;
    var _e = ['"', "'", "/"];
    var ze = /[^\s]/;
    function We(e) {
      var t = [];
      var r = 0;
      while (r < e.length) {
        if (Ve.exec(e.charAt(r))) {
          var n = r;
          while (je.exec(e.charAt(r + 1))) {
            r++;
          }
          t.push(e.substr(n, r - n + 1));
        } else if (_e.indexOf(e.charAt(r)) !== -1) {
          var i = e.charAt(r);
          var n = r;
          r++;
          while (r < e.length && e.charAt(r) !== i) {
            if (e.charAt(r) === "\\") {
              r++;
            }
            r++;
          }
          t.push(e.substr(n, r - n + 1));
        } else {
          var a = e.charAt(r);
          t.push(a);
        }
        r++;
      }
      return t;
    }
    function $e(e, t, r) {
      return (
        Ve.exec(e.charAt(0)) &&
        e !== "true" &&
        e !== "false" &&
        e !== "this" &&
        e !== r &&
        t !== "."
      );
    }
    function Ge(e, t, r) {
      if (t[0] === "[") {
        t.shift();
        var n = 1;
        var i = " return (function(" + r + "){ return (";
        var a = null;
        while (t.length > 0) {
          var o = t[0];
          if (o === "]") {
            n--;
            if (n === 0) {
              if (a === null) {
                i = i + "true";
              }
              t.shift();
              i += ")})";
              try {
                var s = xr(
                  e,
                  function () {
                    return Function(i)();
                  },
                  function () {
                    return true;
                  }
                );
                s.source = i;
                return s;
              } catch (e) {
                ue(te().body, "htmx:syntax:error", { error: e, source: i });
                return null;
              }
            }
          } else if (o === "[") {
            n++;
          }
          if ($e(o, a, r)) {
            i +=
              "((" +
              r +
              "." +
              o +
              ") ? (" +
              r +
              "." +
              o +
              ") : (window." +
              o +
              "))";
          } else {
            i = i + o;
          }
          a = t.shift();
        }
      }
    }
    function x(e, t) {
      var r = "";
      while (e.length > 0 && !e[0].match(t)) {
        r += e.shift();
      }
      return r;
    }
    var Je = "input, textarea, select";
    function Ze(e) {
      var t = ee(e, "hx-trigger");
      var r = [];
      if (t) {
        var n = We(t);
        do {
          x(n, ze);
          var i = n.length;
          var a = x(n, /[,\[\s]/);
          if (a !== "") {
            if (a === "every") {
              var o = { trigger: "every" };
              x(n, ze);
              o.pollInterval = v(x(n, /[,\[\s]/));
              x(n, ze);
              var s = Ge(e, n, "event");
              if (s) {
                o.eventFilter = s;
              }
              r.push(o);
            } else if (a.indexOf("sse:") === 0) {
              r.push({ trigger: "sse", sseEvent: a.substr(4) });
            } else {
              var l = { trigger: a };
              var s = Ge(e, n, "event");
              if (s) {
                l.eventFilter = s;
              }
              while (n.length > 0 && n[0] !== ",") {
                x(n, ze);
                var u = n.shift();
                if (u === "changed") {
                  l.changed = true;
                } else if (u === "once") {
                  l.once = true;
                } else if (u === "consume") {
                  l.consume = true;
                } else if (u === "delay" && n[0] === ":") {
                  n.shift();
                  l.delay = v(x(n, p));
                } else if (u === "from" && n[0] === ":") {
                  n.shift();
                  var f = x(n, p);
                  if (
                    f === "closest" ||
                    f === "find" ||
                    f === "next" ||
                    f === "previous"
                  ) {
                    n.shift();
                    var c = x(n, p);
                    if (c.length > 0) {
                      f += " " + c;
                    }
                  }
                  l.from = f;
                } else if (u === "target" && n[0] === ":") {
                  n.shift();
                  l.target = x(n, p);
                } else if (u === "throttle" && n[0] === ":") {
                  n.shift();
                  l.throttle = v(x(n, p));
                } else if (u === "queue" && n[0] === ":") {
                  n.shift();
                  l.queue = x(n, p);
                } else if (
                  (u === "root" || u === "threshold") &&
                  n[0] === ":"
                ) {
                  n.shift();
                  l[u] = x(n, p);
                } else {
                  ue(e, "htmx:syntax:error", { token: n.shift() });
                }
              }
              r.push(l);
            }
          }
          if (n.length === i) {
            ue(e, "htmx:syntax:error", { token: n.shift() });
          }
          x(n, ze);
        } while (n[0] === "," && n.shift());
      }
      if (r.length > 0) {
        return r;
      } else if (h(e, "form")) {
        return [{ trigger: "submit" }];
      } else if (h(e, 'input[type="button"], input[type="submit"]')) {
        return [{ trigger: "click" }];
      } else if (h(e, Je)) {
        return [{ trigger: "change" }];
      } else {
        return [{ trigger: "click" }];
      }
    }
    function Ke(e) {
      ie(e).cancelled = true;
    }
    function Ye(e, t, r) {
      var n = ie(e);
      n.timeout = setTimeout(function () {
        if (oe(e) && n.cancelled !== true) {
          if (!nt(r, e, Ut("hx:poll:trigger", { triggerSpec: r, target: e }))) {
            t(e);
          }
          Ye(e, t, r);
        }
      }, r.pollInterval);
    }
    function Qe(e) {
      return (
        location.hostname === e.hostname &&
        Q(e, "href") &&
        Q(e, "href").indexOf("#") !== 0
      );
    }
    function et(t, r, e) {
      if (
        (t.tagName === "A" &&
          Qe(t) &&
          (t.target === "" || t.target === "_self")) ||
        t.tagName === "FORM"
      ) {
        r.boosted = true;
        var n, i;
        if (t.tagName === "A") {
          n = "get";
          i = Q(t, "href");
        } else {
          var a = Q(t, "method");
          n = a ? a.toLowerCase() : "get";
          if (n === "get") {
          }
          i = Q(t, "action");
        }
        e.forEach(function (e) {
          it(
            t,
            function (e, t) {
              if (d(e, Y.config.disableSelector)) {
                m(e);
                return;
              }
              ce(n, i, e, t);
            },
            r,
            e,
            true
          );
        });
      }
    }
    function tt(e, t) {
      if (e.type === "submit" || e.type === "click") {
        if (t.tagName === "FORM") {
          return true;
        }
        if (h(t, 'input[type="submit"], button') && d(t, "form") !== null) {
          return true;
        }
        if (
          t.tagName === "A" &&
          t.href &&
          (t.getAttribute("href") === "#" ||
            t.getAttribute("href").indexOf("#") !== 0)
        ) {
          return true;
        }
      }
      return false;
    }
    function rt(e, t) {
      return (
        ie(e).boosted &&
        e.tagName === "A" &&
        t.type === "click" &&
        (t.ctrlKey || t.metaKey)
      );
    }
    function nt(e, t, r) {
      var n = e.eventFilter;
      if (n) {
        try {
          return n.call(t, r) !== true;
        } catch (e) {
          ue(te().body, "htmx:eventFilter:error", {
            error: e,
            source: n.source,
          });
          return true;
        }
      }
      return false;
    }
    function it(a, o, e, s, l) {
      var u = ie(a);
      var t;
      if (s.from) {
        t = W(a, s.from);
      } else {
        t = [a];
      }
      if (s.changed) {
        t.forEach(function (e) {
          var t = ie(e);
          t.lastValue = e.value;
        });
      }
      ae(t, function (n) {
        var i = function (e) {
          if (!oe(a)) {
            n.removeEventListener(s.trigger, i);
            return;
          }
          if (rt(a, e)) {
            return;
          }
          if (l || tt(e, a)) {
            e.preventDefault();
          }
          if (nt(s, a, e)) {
            return;
          }
          var t = ie(e);
          t.triggerSpec = s;
          if (t.handledFor == null) {
            t.handledFor = [];
          }
          if (t.handledFor.indexOf(a) < 0) {
            t.handledFor.push(a);
            if (s.consume) {
              e.stopPropagation();
            }
            if (s.target && e.target) {
              if (!h(e.target, s.target)) {
                return;
              }
            }
            if (s.once) {
              if (u.triggeredOnce) {
                return;
              } else {
                u.triggeredOnce = true;
              }
            }
            if (s.changed) {
              var r = ie(n);
              if (r.lastValue === n.value) {
                return;
              }
              r.lastValue = n.value;
            }
            if (u.delayed) {
              clearTimeout(u.delayed);
            }
            if (u.throttle) {
              return;
            }
            if (s.throttle) {
              if (!u.throttle) {
                o(a, e);
                u.throttle = setTimeout(function () {
                  u.throttle = null;
                }, s.throttle);
              }
            } else if (s.delay) {
              u.delayed = setTimeout(function () {
                o(a, e);
              }, s.delay);
            } else {
              fe(a, "htmx:trigger");
              o(a, e);
            }
          }
        };
        if (e.listenerInfos == null) {
          e.listenerInfos = [];
        }
        e.listenerInfos.push({ trigger: s.trigger, listener: i, on: n });
        n.addEventListener(s.trigger, i);
      });
    }
    var at = false;
    var ot = null;
    function st() {
      if (!ot) {
        ot = function () {
          at = true;
        };
        window.addEventListener("scroll", ot);
        setInterval(function () {
          if (at) {
            at = false;
            ae(
              te().querySelectorAll(
                "[hx-trigger='revealed'],[data-hx-trigger='revealed']"
              ),
              function (e) {
                lt(e);
              }
            );
          }
        }, 200);
      }
    }
    function lt(t) {
      if (!o(t, "data-hx-revealed") && k(t)) {
        t.setAttribute("data-hx-revealed", "true");
        var e = ie(t);
        if (e.initHash) {
          fe(t, "revealed");
        } else {
          t.addEventListener(
            "htmx:afterProcessNode",
            function (e) {
              fe(t, "revealed");
            },
            { once: true }
          );
        }
      }
    }
    function ut(e, t, r) {
      var n = P(r);
      for (var i = 0; i < n.length; i++) {
        var a = n[i].split(/:(.+)/);
        if (a[0] === "connect") {
          ft(e, a[1], 0);
        }
        if (a[0] === "send") {
          ht(e);
        }
      }
    }
    function ft(s, r, n) {
      if (!oe(s)) {
        return;
      }
      if (r.indexOf("/") == 0) {
        var e = location.hostname + (location.port ? ":" + location.port : "");
        if (location.protocol == "https:") {
          r = "wss://" + e + r;
        } else if (location.protocol == "http:") {
          r = "ws://" + e + r;
        }
      }
      var t = Y.createWebSocket(r);
      t.onerror = function (e) {
        ue(s, "htmx:wsError", { error: e, socket: t });
        ct(s);
      };
      t.onclose = function (e) {
        if ([1006, 1012, 1013].indexOf(e.code) >= 0) {
          var t = dt(n);
          setTimeout(function () {
            ft(s, r, n + 1);
          }, t);
        }
      };
      t.onopen = function (e) {
        n = 0;
      };
      ie(s).webSocket = t;
      t.addEventListener("message", function (e) {
        if (ct(s)) {
          return;
        }
        var t = e.data;
        C(s, function (e) {
          t = e.transformResponse(t, null, s);
        });
        var r = T(s);
        var n = l(t);
        var i = I(n.children);
        for (var a = 0; a < i.length; a++) {
          var o = i[a];
          ye(ee(o, "hx-swap-oob") || "true", o, r);
        }
        Jt(r.tasks);
      });
    }
    function ct(e) {
      if (!oe(e)) {
        ie(e).webSocket.close();
        return true;
      }
    }
    function ht(u) {
      var f = c(u, function (e) {
        return ie(e).webSocket != null;
      });
      if (f) {
        u.addEventListener(Ze(u)[0].trigger, function (e) {
          var t = ie(f).webSocket;
          var r = fr(u, f);
          var n = or(u, "post");
          var i = n.errors;
          var a = n.values;
          var o = wr(u);
          var s = se(a, o);
          var l = cr(s, u);
          l["HEADERS"] = r;
          if (i && i.length > 0) {
            fe(u, "htmx:validation:halted", i);
            return;
          }
          t.send(JSON.stringify(l));
          if (tt(e, u)) {
            e.preventDefault();
          }
        });
      } else {
        ue(u, "htmx:noWebSocketSourceError");
      }
    }
    function dt(e) {
      var t = Y.config.wsReconnectDelay;
      if (typeof t === "function") {
        return t(e);
      }
      if (t === "full-jitter") {
        var r = Math.min(e, 6);
        var n = 1e3 * Math.pow(2, r);
        return n * Math.random();
      }
      y(
        'htmx.config.wsReconnectDelay must either be a function or the string "full-jitter"'
      );
    }
    function vt(e, t, r) {
      var n = P(r);
      for (var i = 0; i < n.length; i++) {
        var a = n[i].split(/:(.+)/);
        if (a[0] === "connect") {
          gt(e, a[1]);
        }
        if (a[0] === "swap") {
          mt(e, a[1]);
        }
      }
    }
    function gt(t, e) {
      var r = Y.createEventSource(e);
      r.onerror = function (e) {
        ue(t, "htmx:sseError", { error: e, source: r });
        xt(t);
      };
      ie(t).sseEventSource = r;
    }
    function mt(a, o) {
      var s = c(a, yt);
      if (s) {
        var l = ie(s).sseEventSource;
        var u = function (e) {
          if (xt(s)) {
            return;
          }
          if (!oe(a)) {
            l.removeEventListener(o, u);
            return;
          }
          var t = e.data;
          C(a, function (e) {
            t = e.transformResponse(t, null, a);
          });
          var r = dr(a);
          var n = ge(a);
          var i = T(a);
          Ue(r.swapStyle, n, a, t, i);
          Jt(i.tasks);
          fe(a, "htmx:sseMessage", e);
        };
        ie(a).sseListener = u;
        l.addEventListener(o, u);
      } else {
        ue(a, "htmx:noSSESourceError");
      }
    }
    function pt(e, t, r) {
      var n = c(e, yt);
      if (n) {
        var i = ie(n).sseEventSource;
        var a = function () {
          if (!xt(n)) {
            if (oe(e)) {
              t(e);
            } else {
              i.removeEventListener(r, a);
            }
          }
        };
        ie(e).sseListener = a;
        i.addEventListener(r, a);
      } else {
        ue(e, "htmx:noSSESourceError");
      }
    }
    function xt(e) {
      if (!oe(e)) {
        ie(e).sseEventSource.close();
        return true;
      }
    }
    function yt(e) {
      return ie(e).sseEventSource != null;
    }
    function bt(e, t, r, n) {
      var i = function () {
        if (!r.loaded) {
          r.loaded = true;
          t(e);
        }
      };
      if (n) {
        setTimeout(i, n);
      } else {
        i();
      }
    }
    function wt(t, i, e) {
      var a = false;
      ae(b, function (r) {
        if (o(t, "hx-" + r)) {
          var n = ee(t, "hx-" + r);
          a = true;
          i.path = n;
          i.verb = r;
          e.forEach(function (e) {
            St(t, e, i, function (e, t) {
              if (d(e, Y.config.disableSelector)) {
                m(e);
                return;
              }
              ce(r, n, e, t);
            });
          });
        }
      });
      return a;
    }
    function St(n, e, t, r) {
      if (e.sseEvent) {
        pt(n, r, e.sseEvent);
      } else if (e.trigger === "revealed") {
        st();
        it(n, r, t, e);
        lt(n);
      } else if (e.trigger === "intersect") {
        var i = {};
        if (e.root) {
          i.root = le(n, e.root);
        }
        if (e.threshold) {
          i.threshold = parseFloat(e.threshold);
        }
        var a = new IntersectionObserver(function (e) {
          for (var t = 0; t < e.length; t++) {
            var r = e[t];
            if (r.isIntersecting) {
              fe(n, "intersect");
              break;
            }
          }
        }, i);
        a.observe(n);
        it(n, r, t, e);
      } else if (e.trigger === "load") {
        if (!nt(e, n, Ut("load", { elt: n }))) {
          bt(n, r, t, e.delay);
        }
      } else if (e.pollInterval) {
        t.polling = true;
        Ye(n, r, e);
      } else {
        it(n, r, t, e);
      }
    }
    function Et(e) {
      if (
        Y.config.allowScriptTags &&
        (e.type === "text/javascript" || e.type === "module" || e.type === "")
      ) {
        var t = te().createElement("script");
        ae(e.attributes, function (e) {
          t.setAttribute(e.name, e.value);
        });
        t.textContent = e.textContent;
        t.async = false;
        if (Y.config.inlineScriptNonce) {
          t.nonce = Y.config.inlineScriptNonce;
        }
        var r = e.parentElement;
        try {
          r.insertBefore(t, e);
        } catch (e) {
          y(e);
        } finally {
          if (e.parentElement) {
            e.parentElement.removeChild(e);
          }
        }
      }
    }
    function Ct(e) {
      if (h(e, "script")) {
        Et(e);
      }
      ae(f(e, "script"), function (e) {
        Et(e);
      });
    }
    function Tt() {
      return document.querySelector("[hx-boost], [data-hx-boost]");
    }
    function Ot(e) {
      var t = null;
      var r = [];
      if (document.evaluate) {
        var n = document.evaluate(
          '//*[@*[ starts-with(name(), "hx-on:") or starts-with(name(), "data-hx-on:") ]]',
          e
        );
        while ((t = n.iterateNext())) r.push(t);
      } else {
        var i = document.getElementsByTagName("*");
        for (var a = 0; a < i.length; a++) {
          var o = i[a].attributes;
          for (var s = 0; s < o.length; s++) {
            var l = o[s].name;
            if (g(l, "hx-on:") || g(l, "data-hx-on:")) {
              r.push(i[a]);
            }
          }
        }
      }
      return r;
    }
    function Rt(e) {
      if (e.querySelectorAll) {
        var t = Tt() ? ", a" : "";
        var r = e.querySelectorAll(
          w +
            t +
            ", form, [type='submit'], [hx-sse], [data-hx-sse], [hx-ws]," +
            " [data-hx-ws], [hx-ext], [data-hx-ext], [hx-trigger], [data-hx-trigger], [hx-on], [data-hx-on]"
        );
        return r;
      } else {
        return [];
      }
    }
    function qt(e) {
      var t = d(e.target, "button, input[type='submit']");
      var r = Lt(e);
      if (r) {
        r.lastButtonClicked = t;
      }
    }
    function Ht(e) {
      var t = Lt(e);
      if (t) {
        t.lastButtonClicked = null;
      }
    }
    function Lt(e) {
      var t = d(e.target, "button, input[type='submit']");
      if (!t) {
        return;
      }
      var r = s("#" + Q(t, "form")) || d(t, "form");
      if (!r) {
        return;
      }
      return ie(r);
    }
    function At(e) {
      e.addEventListener("click", qt);
      e.addEventListener("focusin", qt);
      e.addEventListener("focusout", Ht);
    }
    function Nt(e) {
      var t = We(e);
      var r = 0;
      for (let e = 0; e < t.length; e++) {
        const n = t[e];
        if (n === "{") {
          r++;
        } else if (n === "}") {
          r--;
        }
      }
      return r;
    }
    function It(t, e, r) {
      var n = ie(t);
      if (!Array.isArray(n.onHandlers)) {
        n.onHandlers = [];
      }
      var i;
      var a = function (e) {
        return xr(t, function () {
          if (!i) {
            i = new Function("event", r);
          }
          i.call(t, e);
        });
      };
      t.addEventListener(e, a);
      n.onHandlers.push({ event: e, listener: a });
    }
    function kt(e) {
      var t = ee(e, "hx-on");
      if (t) {
        var r = {};
        var n = t.split("\n");
        var i = null;
        var a = 0;
        while (n.length > 0) {
          var o = n.shift();
          var s = o.match(/^\s*([a-zA-Z:\-\.]+:)(.*)/);
          if (a === 0 && s) {
            o.split(":");
            i = s[1].slice(0, -1);
            r[i] = s[2];
          } else {
            r[i] += o;
          }
          a += Nt(o);
        }
        for (var l in r) {
          It(e, l, r[l]);
        }
      }
    }
    function Pt(t) {
      Re(t);
      for (var e = 0; e < t.attributes.length; e++) {
        var r = t.attributes[e].name;
        var n = t.attributes[e].value;
        if (g(r, "hx-on:") || g(r, "data-hx-on:")) {
          let e = r.slice(r.indexOf(":") + 1);
          if (g(e, ":")) e = "htmx" + e;
          It(t, e, n);
        }
      }
    }
    function Mt(t) {
      if (d(t, Y.config.disableSelector)) {
        m(t);
        return;
      }
      var r = ie(t);
      if (r.initHash !== Oe(t)) {
        qe(t);
        r.initHash = Oe(t);
        kt(t);
        fe(t, "htmx:beforeProcessNode");
        if (t.value) {
          r.lastValue = t.value;
        }
        var e = Ze(t);
        var n = wt(t, r, e);
        if (!n) {
          if (re(t, "hx-boost") === "true") {
            et(t, r, e);
          } else if (o(t, "hx-trigger")) {
            e.forEach(function (e) {
              St(t, e, r, function () {});
            });
          }
        }
        if (
          t.tagName === "FORM" ||
          (Q(t, "type") === "submit" && o(t, "form"))
        ) {
          At(t);
        }
        var i = ee(t, "hx-sse");
        if (i) {
          vt(t, r, i);
        }
        var a = ee(t, "hx-ws");
        if (a) {
          ut(t, r, a);
        }
        fe(t, "htmx:afterProcessNode");
      }
    }
    function Dt(e) {
      e = s(e);
      if (d(e, Y.config.disableSelector)) {
        m(e);
        return;
      }
      Mt(e);
      ae(Rt(e), function (e) {
        Mt(e);
      });
      ae(Ot(e), Pt);
    }
    function Xt(e) {
      return e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
    }
    function Ut(e, t) {
      var r;
      if (window.CustomEvent && typeof window.CustomEvent === "function") {
        r = new CustomEvent(e, { bubbles: true, cancelable: true, detail: t });
      } else {
        r = te().createEvent("CustomEvent");
        r.initCustomEvent(e, true, true, t);
      }
      return r;
    }
    function ue(e, t, r) {
      fe(e, t, se({ error: t }, r));
    }
    function Bt(e) {
      return e === "htmx:afterProcessNode";
    }
    function C(e, t) {
      ae(Ir(e), function (e) {
        try {
          t(e);
        } catch (e) {
          y(e);
        }
      });
    }
    function y(e) {
      if (console.error) {
        console.error(e);
      } else if (console.log) {
        console.log("ERROR: ", e);
      }
    }
    function fe(e, t, r) {
      e = s(e);
      if (r == null) {
        r = {};
      }
      r["elt"] = e;
      var n = Ut(t, r);
      if (Y.logger && !Bt(t)) {
        Y.logger(e, t, r);
      }
      if (r.error) {
        y(r.error);
        fe(e, "htmx:error", { errorInfo: r });
      }
      var i = e.dispatchEvent(n);
      var a = Xt(t);
      if (i && a !== t) {
        var o = Ut(a, n.detail);
        i = i && e.dispatchEvent(o);
      }
      C(e, function (e) {
        i = i && e.onEvent(t, n) !== false && !n.defaultPrevented;
      });
      return i;
    }
    var Ft = location.pathname + location.search;
    function Vt() {
      var e = te().querySelector("[hx-history-elt],[data-hx-history-elt]");
      return e || te().body;
    }
    function jt(e, t, r, n) {
      if (!M()) {
        return;
      }
      if (Y.config.historyCacheSize <= 0) {
        localStorage.removeItem("htmx-history-cache");
        return;
      }
      e = D(e);
      var i = S(localStorage.getItem("htmx-history-cache")) || [];
      for (var a = 0; a < i.length; a++) {
        if (i[a].url === e) {
          i.splice(a, 1);
          break;
        }
      }
      var o = { url: e, content: t, title: r, scroll: n };
      fe(te().body, "htmx:historyItemCreated", { item: o, cache: i });
      i.push(o);
      while (i.length > Y.config.historyCacheSize) {
        i.shift();
      }
      while (i.length > 0) {
        try {
          localStorage.setItem("htmx-history-cache", JSON.stringify(i));
          break;
        } catch (e) {
          ue(te().body, "htmx:historyCacheError", { cause: e, cache: i });
          i.shift();
        }
      }
    }
    function _t(e) {
      if (!M()) {
        return null;
      }
      e = D(e);
      var t = S(localStorage.getItem("htmx-history-cache")) || [];
      for (var r = 0; r < t.length; r++) {
        if (t[r].url === e) {
          return t[r];
        }
      }
      return null;
    }
    function zt(e) {
      var t = Y.config.requestClass;
      var r = e.cloneNode(true);
      ae(f(r, "." + t), function (e) {
        n(e, t);
      });
      return r.innerHTML;
    }
    function Wt() {
      var e = Vt();
      var t = Ft || location.pathname + location.search;
      var r;
      try {
        r = te().querySelector(
          '[hx-history="false" i],[data-hx-history="false" i]'
        );
      } catch (e) {
        r = te().querySelector(
          '[hx-history="false"],[data-hx-history="false"]'
        );
      }
      if (!r) {
        fe(te().body, "htmx:beforeHistorySave", { path: t, historyElt: e });
        jt(t, zt(e), te().title, window.scrollY);
      }
      if (Y.config.historyEnabled)
        history.replaceState({ htmx: true }, te().title, window.location.href);
    }
    function $t(e) {
      if (Y.config.getCacheBusterParam) {
        e = e.replace(/org\.htmx\.cache-buster=[^&]*&?/, "");
        if (_(e, "&") || _(e, "?")) {
          e = e.slice(0, -1);
        }
      }
      if (Y.config.historyEnabled) {
        history.pushState({ htmx: true }, "", e);
      }
      Ft = e;
    }
    function Gt(e) {
      if (Y.config.historyEnabled) history.replaceState({ htmx: true }, "", e);
      Ft = e;
    }
    function Jt(e) {
      ae(e, function (e) {
        e.call();
      });
    }
    function Zt(a) {
      var e = new XMLHttpRequest();
      var o = { path: a, xhr: e };
      fe(te().body, "htmx:historyCacheMiss", o);
      e.open("GET", a, true);
      e.setRequestHeader("HX-History-Restore-Request", "true");
      e.onload = function () {
        if (this.status >= 200 && this.status < 400) {
          fe(te().body, "htmx:historyCacheMissLoad", o);
          var e = l(this.response);
          e = e.querySelector("[hx-history-elt],[data-hx-history-elt]") || e;
          var t = Vt();
          var r = T(t);
          var n = Xe(this.response);
          if (n) {
            var i = E("title");
            if (i) {
              i.innerHTML = n;
            } else {
              window.document.title = n;
            }
          }
          Pe(t, e, r);
          Jt(r.tasks);
          Ft = a;
          fe(te().body, "htmx:historyRestore", {
            path: a,
            cacheMiss: true,
            serverResponse: this.response,
          });
        } else {
          ue(te().body, "htmx:historyCacheMissLoadError", o);
        }
      };
      e.send();
    }
    function Kt(e) {
      Wt();
      e = e || location.pathname + location.search;
      var t = _t(e);
      if (t) {
        var r = l(t.content);
        var n = Vt();
        var i = T(n);
        Pe(n, r, i);
        Jt(i.tasks);
        document.title = t.title;
        setTimeout(function () {
          window.scrollTo(0, t.scroll);
        }, 0);
        Ft = e;
        fe(te().body, "htmx:historyRestore", { path: e, item: t });
      } else {
        if (Y.config.refreshOnHistoryMiss) {
          window.location.reload(true);
        } else {
          Zt(e);
        }
      }
    }
    function Yt(e) {
      var t = de(e, "hx-indicator");
      if (t == null) {
        t = [e];
      }
      ae(t, function (e) {
        var t = ie(e);
        t.requestCount = (t.requestCount || 0) + 1;
        e.classList["add"].call(e.classList, Y.config.requestClass);
      });
      return t;
    }
    function Qt(e) {
      var t = de(e, "hx-disabled-elt");
      if (t == null) {
        t = [];
      }
      ae(t, function (e) {
        var t = ie(e);
        t.requestCount = (t.requestCount || 0) + 1;
        e.setAttribute("disabled", "");
      });
      return t;
    }
    function er(e, t) {
      ae(e, function (e) {
        var t = ie(e);
        t.requestCount = (t.requestCount || 0) - 1;
        if (t.requestCount === 0) {
          e.classList["remove"].call(e.classList, Y.config.requestClass);
        }
      });
      ae(t, function (e) {
        var t = ie(e);
        t.requestCount = (t.requestCount || 0) - 1;
        if (t.requestCount === 0) {
          e.removeAttribute("disabled");
        }
      });
    }
    function tr(e, t) {
      for (var r = 0; r < e.length; r++) {
        var n = e[r];
        if (n.isSameNode(t)) {
          return true;
        }
      }
      return false;
    }
    function rr(e) {
      if (e.name === "" || e.name == null || e.disabled) {
        return false;
      }
      if (
        e.type === "button" ||
        e.type === "submit" ||
        e.tagName === "image" ||
        e.tagName === "reset" ||
        e.tagName === "file"
      ) {
        return false;
      }
      if (e.type === "checkbox" || e.type === "radio") {
        return e.checked;
      }
      return true;
    }
    function nr(e, t, r) {
      if (e != null && t != null) {
        var n = r[e];
        if (n === undefined) {
          r[e] = t;
        } else if (Array.isArray(n)) {
          if (Array.isArray(t)) {
            r[e] = n.concat(t);
          } else {
            n.push(t);
          }
        } else {
          if (Array.isArray(t)) {
            r[e] = [n].concat(t);
          } else {
            r[e] = [n, t];
          }
        }
      }
    }
    function ir(t, r, n, e, i) {
      if (e == null || tr(t, e)) {
        return;
      } else {
        t.push(e);
      }
      if (rr(e)) {
        var a = Q(e, "name");
        var o = e.value;
        if (e.multiple && e.tagName === "SELECT") {
          o = I(e.querySelectorAll("option:checked")).map(function (e) {
            return e.value;
          });
        }
        if (e.files) {
          o = I(e.files);
        }
        nr(a, o, r);
        if (i) {
          ar(e, n);
        }
      }
      if (h(e, "form")) {
        var s = e.elements;
        ae(s, function (e) {
          ir(t, r, n, e, i);
        });
      }
    }
    function ar(e, t) {
      if (e.willValidate) {
        fe(e, "htmx:validation:validate");
        if (!e.checkValidity()) {
          t.push({
            elt: e,
            message: e.validationMessage,
            validity: e.validity,
          });
          fe(e, "htmx:validation:failed", {
            message: e.validationMessage,
            validity: e.validity,
          });
        }
      }
    }
    function or(e, t) {
      var r = [];
      var n = {};
      var i = {};
      var a = [];
      var o = ie(e);
      if (o.lastButtonClicked && !oe(o.lastButtonClicked)) {
        o.lastButtonClicked = null;
      }
      var s =
        (h(e, "form") && e.noValidate !== true) ||
        ee(e, "hx-validate") === "true";
      if (o.lastButtonClicked) {
        s = s && o.lastButtonClicked.formNoValidate !== true;
      }
      if (t !== "get") {
        ir(r, i, a, d(e, "form"), s);
      }
      ir(r, n, a, e, s);
      if (
        o.lastButtonClicked ||
        e.tagName === "BUTTON" ||
        (e.tagName === "INPUT" && Q(e, "type") === "submit")
      ) {
        var l = o.lastButtonClicked || e;
        var u = Q(l, "name");
        nr(u, l.value, i);
      }
      var f = de(e, "hx-include");
      ae(f, function (e) {
        ir(r, n, a, e, s);
        if (!h(e, "form")) {
          ae(e.querySelectorAll(Je), function (e) {
            ir(r, n, a, e, s);
          });
        }
      });
      n = se(n, i);
      return { errors: a, values: n };
    }
    function sr(e, t, r) {
      if (e !== "") {
        e += "&";
      }
      if (String(r) === "[object Object]") {
        r = JSON.stringify(r);
      }
      var n = encodeURIComponent(r);
      e += encodeURIComponent(t) + "=" + n;
      return e;
    }
    function lr(e) {
      var t = "";
      for (var r in e) {
        if (e.hasOwnProperty(r)) {
          var n = e[r];
          if (Array.isArray(n)) {
            ae(n, function (e) {
              t = sr(t, r, e);
            });
          } else {
            t = sr(t, r, n);
          }
        }
      }
      return t;
    }
    function ur(e) {
      var t = new FormData();
      for (var r in e) {
        if (e.hasOwnProperty(r)) {
          var n = e[r];
          if (Array.isArray(n)) {
            ae(n, function (e) {
              t.append(r, e);
            });
          } else {
            t.append(r, n);
          }
        }
      }
      return t;
    }
    function fr(e, t, r) {
      var n = {
        "HX-Request": "true",
        "HX-Trigger": Q(e, "id"),
        "HX-Trigger-Name": Q(e, "name"),
        "HX-Target": ee(t, "id"),
        "HX-Current-URL": te().location.href,
      };
      pr(e, "hx-headers", false, n);
      if (r !== undefined) {
        n["HX-Prompt"] = r;
      }
      if (ie(e).boosted) {
        n["HX-Boosted"] = "true";
      }
      return n;
    }
    function cr(t, e) {
      var r = re(e, "hx-params");
      if (r) {
        if (r === "none") {
          return {};
        } else if (r === "*") {
          return t;
        } else if (r.indexOf("not ") === 0) {
          ae(r.substr(4).split(","), function (e) {
            e = e.trim();
            delete t[e];
          });
          return t;
        } else {
          var n = {};
          ae(r.split(","), function (e) {
            e = e.trim();
            n[e] = t[e];
          });
          return n;
        }
      } else {
        return t;
      }
    }
    function hr(e) {
      return Q(e, "href") && Q(e, "href").indexOf("#") >= 0;
    }
    function dr(e, t) {
      var r = t ? t : re(e, "hx-swap");
      var n = {
        swapStyle: ie(e).boosted ? "innerHTML" : Y.config.defaultSwapStyle,
        swapDelay: Y.config.defaultSwapDelay,
        settleDelay: Y.config.defaultSettleDelay,
      };
      if (Y.config.scrollIntoViewOnBoost && ie(e).boosted && !hr(e)) {
        n["show"] = "top";
      }
      if (r) {
        var i = P(r);
        if (i.length > 0) {
          for (var a = 0; a < i.length; a++) {
            var o = i[a];
            if (o.indexOf("swap:") === 0) {
              n["swapDelay"] = v(o.substr(5));
            } else if (o.indexOf("settle:") === 0) {
              n["settleDelay"] = v(o.substr(7));
            } else if (o.indexOf("transition:") === 0) {
              n["transition"] = o.substr(11) === "true";
            } else if (o.indexOf("ignoreTitle:") === 0) {
              n["ignoreTitle"] = o.substr(12) === "true";
            } else if (o.indexOf("scroll:") === 0) {
              var s = o.substr(7);
              var l = s.split(":");
              var u = l.pop();
              var f = l.length > 0 ? l.join(":") : null;
              n["scroll"] = u;
              n["scrollTarget"] = f;
            } else if (o.indexOf("show:") === 0) {
              var c = o.substr(5);
              var l = c.split(":");
              var h = l.pop();
              var f = l.length > 0 ? l.join(":") : null;
              n["show"] = h;
              n["showTarget"] = f;
            } else if (o.indexOf("focus-scroll:") === 0) {
              var d = o.substr("focus-scroll:".length);
              n["focusScroll"] = d == "true";
            } else if (a == 0) {
              n["swapStyle"] = o;
            } else {
              y("Unknown modifier in hx-swap: " + o);
            }
          }
        }
      }
      return n;
    }
    function vr(e) {
      return (
        re(e, "hx-encoding") === "multipart/form-data" ||
        (h(e, "form") && Q(e, "enctype") === "multipart/form-data")
      );
    }
    function gr(t, r, n) {
      var i = null;
      C(r, function (e) {
        if (i == null) {
          i = e.encodeParameters(t, n, r);
        }
      });
      if (i != null) {
        return i;
      } else {
        if (vr(r)) {
          return ur(n);
        } else {
          return lr(n);
        }
      }
    }
    function T(e) {
      return { tasks: [], elts: [e] };
    }
    function mr(e, t) {
      var r = e[0];
      var n = e[e.length - 1];
      if (t.scroll) {
        var i = null;
        if (t.scrollTarget) {
          i = le(r, t.scrollTarget);
        }
        if (t.scroll === "top" && (r || i)) {
          i = i || r;
          i.scrollTop = 0;
        }
        if (t.scroll === "bottom" && (n || i)) {
          i = i || n;
          i.scrollTop = i.scrollHeight;
        }
      }
      if (t.show) {
        var i = null;
        if (t.showTarget) {
          var a = t.showTarget;
          if (t.showTarget === "window") {
            a = "body";
          }
          i = le(r, a);
        }
        if (t.show === "top" && (r || i)) {
          i = i || r;
          i.scrollIntoView({
            block: "start",
            behavior: Y.config.scrollBehavior,
          });
        }
        if (t.show === "bottom" && (n || i)) {
          i = i || n;
          i.scrollIntoView({ block: "end", behavior: Y.config.scrollBehavior });
        }
      }
    }
    function pr(e, t, r, n) {
      if (n == null) {
        n = {};
      }
      if (e == null) {
        return n;
      }
      var i = ee(e, t);
      if (i) {
        var a = i.trim();
        var o = r;
        if (a === "unset") {
          return null;
        }
        if (a.indexOf("javascript:") === 0) {
          a = a.substr(11);
          o = true;
        } else if (a.indexOf("js:") === 0) {
          a = a.substr(3);
          o = true;
        }
        if (a.indexOf("{") !== 0) {
          a = "{" + a + "}";
        }
        var s;
        if (o) {
          s = xr(
            e,
            function () {
              return Function("return (" + a + ")")();
            },
            {}
          );
        } else {
          s = S(a);
        }
        for (var l in s) {
          if (s.hasOwnProperty(l)) {
            if (n[l] == null) {
              n[l] = s[l];
            }
          }
        }
      }
      return pr(u(e), t, r, n);
    }
    function xr(e, t, r) {
      if (Y.config.allowEval) {
        return t();
      } else {
        ue(e, "htmx:evalDisallowedError");
        return r;
      }
    }
    function yr(e, t) {
      return pr(e, "hx-vars", true, t);
    }
    function br(e, t) {
      return pr(e, "hx-vals", false, t);
    }
    function wr(e) {
      return se(yr(e), br(e));
    }
    function Sr(t, r, n) {
      if (n !== null) {
        try {
          t.setRequestHeader(r, n);
        } catch (e) {
          t.setRequestHeader(r, encodeURIComponent(n));
          t.setRequestHeader(r + "-URI-AutoEncoded", "true");
        }
      }
    }
    function Er(t) {
      if (t.responseURL && typeof URL !== "undefined") {
        try {
          var e = new URL(t.responseURL);
          return e.pathname + e.search;
        } catch (e) {
          ue(te().body, "htmx:badResponseUrl", { url: t.responseURL });
        }
      }
    }
    function O(e, t) {
      return e.getAllResponseHeaders().match(t);
    }
    function Cr(e, t, r) {
      e = e.toLowerCase();
      if (r) {
        if (r instanceof Element || L(r, "String")) {
          return ce(e, t, null, null, {
            targetOverride: s(r),
            returnPromise: true,
          });
        } else {
          return ce(e, t, s(r.source), r.event, {
            handler: r.handler,
            headers: r.headers,
            values: r.values,
            targetOverride: s(r.target),
            swapOverride: r.swap,
            returnPromise: true,
          });
        }
      } else {
        return ce(e, t, null, null, { returnPromise: true });
      }
    }
    function Tr(e) {
      var t = [];
      while (e) {
        t.push(e);
        e = e.parentElement;
      }
      return t;
    }
    function Or(e, t, r) {
      var n;
      var i;
      if (typeof URL === "function") {
        i = new URL(t, document.location.href);
        var a = document.location.origin;
        n = a === i.origin;
      } else {
        i = t;
        n = g(t, document.location.origin);
      }
      if (Y.config.selfRequestsOnly) {
        if (!n) {
          return false;
        }
      }
      return fe(e, "htmx:validateUrl", se({ url: i, sameHost: n }, r));
    }
    function ce(t, r, n, i, a, e) {
      var o = null;
      var s = null;
      a = a != null ? a : {};
      if (a.returnPromise && typeof Promise !== "undefined") {
        var l = new Promise(function (e, t) {
          o = e;
          s = t;
        });
      }
      if (n == null) {
        n = te().body;
      }
      var M = a.handler || qr;
      if (!oe(n)) {
        ne(o);
        return l;
      }
      var u = a.targetOverride || ge(n);
      if (u == null || u == he) {
        ue(n, "htmx:targetError", { target: ee(n, "hx-target") });
        ne(s);
        return l;
      }
      var f = ie(n);
      var c = f.lastButtonClicked;
      if (c) {
        var h = Q(c, "formaction");
        if (h != null) {
          r = h;
        }
        var d = Q(c, "formmethod");
        if (d != null) {
          if (d.toLowerCase() !== "dialog") {
            t = d;
          }
        }
      }
      var v = re(n, "hx-confirm");
      if (e === undefined) {
        var D = function (e) {
          return ce(t, r, n, i, a, !!e);
        };
        var X = {
          target: u,
          elt: n,
          path: r,
          verb: t,
          triggeringEvent: i,
          etc: a,
          issueRequest: D,
          question: v,
        };
        if (fe(n, "htmx:confirm", X) === false) {
          ne(o);
          return l;
        }
      }
      var g = n;
      var m = re(n, "hx-sync");
      var p = null;
      var x = false;
      if (m) {
        var U = m.split(":");
        var B = U[0].trim();
        if (B === "this") {
          g = ve(n, "hx-sync");
        } else {
          g = le(n, B);
        }
        m = (U[1] || "drop").trim();
        f = ie(g);
        if (m === "drop" && f.xhr && f.abortable !== true) {
          ne(o);
          return l;
        } else if (m === "abort") {
          if (f.xhr) {
            ne(o);
            return l;
          } else {
            x = true;
          }
        } else if (m === "replace") {
          fe(g, "htmx:abort");
        } else if (m.indexOf("queue") === 0) {
          var F = m.split(" ");
          p = (F[1] || "last").trim();
        }
      }
      if (f.xhr) {
        if (f.abortable) {
          fe(g, "htmx:abort");
        } else {
          if (p == null) {
            if (i) {
              var y = ie(i);
              if (y && y.triggerSpec && y.triggerSpec.queue) {
                p = y.triggerSpec.queue;
              }
            }
            if (p == null) {
              p = "last";
            }
          }
          if (f.queuedRequests == null) {
            f.queuedRequests = [];
          }
          if (p === "first" && f.queuedRequests.length === 0) {
            f.queuedRequests.push(function () {
              ce(t, r, n, i, a);
            });
          } else if (p === "all") {
            f.queuedRequests.push(function () {
              ce(t, r, n, i, a);
            });
          } else if (p === "last") {
            f.queuedRequests = [];
            f.queuedRequests.push(function () {
              ce(t, r, n, i, a);
            });
          }
          ne(o);
          return l;
        }
      }
      var b = new XMLHttpRequest();
      f.xhr = b;
      f.abortable = x;
      var w = function () {
        f.xhr = null;
        f.abortable = false;
        if (f.queuedRequests != null && f.queuedRequests.length > 0) {
          var e = f.queuedRequests.shift();
          e();
        }
      };
      var V = re(n, "hx-prompt");
      if (V) {
        var S = prompt(V);
        if (S === null || !fe(n, "htmx:prompt", { prompt: S, target: u })) {
          ne(o);
          w();
          return l;
        }
      }
      if (v && !e) {
        if (!confirm(v)) {
          ne(o);
          w();
          return l;
        }
      }
      var E = fr(n, u, S);
      if (a.headers) {
        E = se(E, a.headers);
      }
      var j = or(n, t);
      var C = j.errors;
      var T = j.values;
      if (a.values) {
        T = se(T, a.values);
      }
      var _ = wr(n);
      var z = se(T, _);
      var O = cr(z, n);
      if (t !== "get" && !vr(n)) {
        E["Content-Type"] = "application/x-www-form-urlencoded";
      }
      if (Y.config.getCacheBusterParam && t === "get") {
        O["org.htmx.cache-buster"] = Q(u, "id") || "true";
      }
      if (r == null || r === "") {
        r = te().location.href;
      }
      var R = pr(n, "hx-request");
      var W = ie(n).boosted;
      var q = Y.config.methodsThatUseUrlParams.indexOf(t) >= 0;
      var H = {
        boosted: W,
        useUrlParams: q,
        parameters: O,
        unfilteredParameters: z,
        headers: E,
        target: u,
        verb: t,
        errors: C,
        withCredentials:
          a.credentials || R.credentials || Y.config.withCredentials,
        timeout: a.timeout || R.timeout || Y.config.timeout,
        path: r,
        triggeringEvent: i,
      };
      if (!fe(n, "htmx:configRequest", H)) {
        ne(o);
        w();
        return l;
      }
      r = H.path;
      t = H.verb;
      E = H.headers;
      O = H.parameters;
      C = H.errors;
      q = H.useUrlParams;
      if (C && C.length > 0) {
        fe(n, "htmx:validation:halted", H);
        ne(o);
        w();
        return l;
      }
      var $ = r.split("#");
      var G = $[0];
      var L = $[1];
      var A = r;
      if (q) {
        A = G;
        var J = Object.keys(O).length !== 0;
        if (J) {
          if (A.indexOf("?") < 0) {
            A += "?";
          } else {
            A += "&";
          }
          A += lr(O);
          if (L) {
            A += "#" + L;
          }
        }
      }
      if (!Or(n, A, H)) {
        ue(n, "htmx:invalidPath", H);
        ne(s);
        return l;
      }
      b.open(t.toUpperCase(), A, true);
      b.overrideMimeType("text/html");
      b.withCredentials = H.withCredentials;
      b.timeout = H.timeout;
      if (R.noHeaders) {
      } else {
        for (var N in E) {
          if (E.hasOwnProperty(N)) {
            var Z = E[N];
            Sr(b, N, Z);
          }
        }
      }
      var I = {
        xhr: b,
        target: u,
        requestConfig: H,
        etc: a,
        boosted: W,
        pathInfo: { requestPath: r, finalRequestPath: A, anchor: L },
      };
      b.onload = function () {
        try {
          var e = Tr(n);
          I.pathInfo.responsePath = Er(b);
          M(n, I);
          er(k, P);
          fe(n, "htmx:afterRequest", I);
          fe(n, "htmx:afterOnLoad", I);
          if (!oe(n)) {
            var t = null;
            while (e.length > 0 && t == null) {
              var r = e.shift();
              if (oe(r)) {
                t = r;
              }
            }
            if (t) {
              fe(t, "htmx:afterRequest", I);
              fe(t, "htmx:afterOnLoad", I);
            }
          }
          ne(o);
          w();
        } catch (e) {
          ue(n, "htmx:onLoadError", se({ error: e }, I));
          throw e;
        }
      };
      b.onerror = function () {
        er(k, P);
        ue(n, "htmx:afterRequest", I);
        ue(n, "htmx:sendError", I);
        ne(s);
        w();
      };
      b.onabort = function () {
        er(k, P);
        ue(n, "htmx:afterRequest", I);
        ue(n, "htmx:sendAbort", I);
        ne(s);
        w();
      };
      b.ontimeout = function () {
        er(k, P);
        ue(n, "htmx:afterRequest", I);
        ue(n, "htmx:timeout", I);
        ne(s);
        w();
      };
      if (!fe(n, "htmx:beforeRequest", I)) {
        ne(o);
        w();
        return l;
      }
      var k = Yt(n);
      var P = Qt(n);
      ae(["loadstart", "loadend", "progress", "abort"], function (t) {
        ae([b, b.upload], function (e) {
          e.addEventListener(t, function (e) {
            fe(n, "htmx:xhr:" + t, {
              lengthComputable: e.lengthComputable,
              loaded: e.loaded,
              total: e.total,
            });
          });
        });
      });
      fe(n, "htmx:beforeSend", I);
      var K = q ? null : gr(b, n, O);
      b.send(K);
      return l;
    }
    function Rr(e, t) {
      var r = t.xhr;
      var n = null;
      var i = null;
      if (O(r, /HX-Push:/i)) {
        n = r.getResponseHeader("HX-Push");
        i = "push";
      } else if (O(r, /HX-Push-Url:/i)) {
        n = r.getResponseHeader("HX-Push-Url");
        i = "push";
      } else if (O(r, /HX-Replace-Url:/i)) {
        n = r.getResponseHeader("HX-Replace-Url");
        i = "replace";
      }
      if (n) {
        if (n === "false") {
          return {};
        } else {
          return { type: i, path: n };
        }
      }
      var a = t.pathInfo.finalRequestPath;
      var o = t.pathInfo.responsePath;
      var s = re(e, "hx-push-url");
      var l = re(e, "hx-replace-url");
      var u = ie(e).boosted;
      var f = null;
      var c = null;
      if (s) {
        f = "push";
        c = s;
      } else if (l) {
        f = "replace";
        c = l;
      } else if (u) {
        f = "push";
        c = o || a;
      }
      if (c) {
        if (c === "false") {
          return {};
        }
        if (c === "true") {
          c = o || a;
        }
        if (t.pathInfo.anchor && c.indexOf("#") === -1) {
          c = c + "#" + t.pathInfo.anchor;
        }
        return { type: f, path: c };
      } else {
        return {};
      }
    }
    function qr(l, u) {
      var f = u.xhr;
      var c = u.target;
      var e = u.etc;
      var t = u.requestConfig;
      if (!fe(l, "htmx:beforeOnLoad", u)) return;
      if (O(f, /HX-Trigger:/i)) {
        Be(f, "HX-Trigger", l);
      }
      if (O(f, /HX-Location:/i)) {
        Wt();
        var r = f.getResponseHeader("HX-Location");
        var h;
        if (r.indexOf("{") === 0) {
          h = S(r);
          r = h["path"];
          delete h["path"];
        }
        Cr("GET", r, h).then(function () {
          $t(r);
        });
        return;
      }
      var n =
        O(f, /HX-Refresh:/i) && "true" === f.getResponseHeader("HX-Refresh");
      if (O(f, /HX-Redirect:/i)) {
        location.href = f.getResponseHeader("HX-Redirect");
        n && location.reload();
        return;
      }
      if (n) {
        location.reload();
        return;
      }
      if (O(f, /HX-Retarget:/i)) {
        u.target = te().querySelector(f.getResponseHeader("HX-Retarget"));
      }
      var d = Rr(l, u);
      var i = f.status >= 200 && f.status < 400 && f.status !== 204;
      var v = f.response;
      var a = f.status >= 400;
      var g = Y.config.ignoreTitle;
      var o = se(
        { shouldSwap: i, serverResponse: v, isError: a, ignoreTitle: g },
        u
      );
      if (!fe(c, "htmx:beforeSwap", o)) return;
      c = o.target;
      v = o.serverResponse;
      a = o.isError;
      g = o.ignoreTitle;
      u.target = c;
      u.failed = a;
      u.successful = !a;
      if (o.shouldSwap) {
        if (f.status === 286) {
          Ke(l);
        }
        C(l, function (e) {
          v = e.transformResponse(v, f, l);
        });
        if (d.type) {
          Wt();
        }
        var s = e.swapOverride;
        if (O(f, /HX-Reswap:/i)) {
          s = f.getResponseHeader("HX-Reswap");
        }
        var h = dr(l, s);
        if (h.hasOwnProperty("ignoreTitle")) {
          g = h.ignoreTitle;
        }
        c.classList.add(Y.config.swappingClass);
        var m = null;
        var p = null;
        var x = function () {
          try {
            var e = document.activeElement;
            var t = {};
            try {
              t = {
                elt: e,
                start: e ? e.selectionStart : null,
                end: e ? e.selectionEnd : null,
              };
            } catch (e) {}
            var r;
            if (O(f, /HX-Reselect:/i)) {
              r = f.getResponseHeader("HX-Reselect");
            }
            var n = T(c);
            Ue(h.swapStyle, c, l, v, n, r);
            if (t.elt && !oe(t.elt) && Q(t.elt, "id")) {
              var i = document.getElementById(Q(t.elt, "id"));
              var a = {
                preventScroll:
                  h.focusScroll !== undefined
                    ? !h.focusScroll
                    : !Y.config.defaultFocusScroll,
              };
              if (i) {
                if (t.start && i.setSelectionRange) {
                  try {
                    i.setSelectionRange(t.start, t.end);
                  } catch (e) {}
                }
                i.focus(a);
              }
            }
            c.classList.remove(Y.config.swappingClass);
            ae(n.elts, function (e) {
              if (e.classList) {
                e.classList.add(Y.config.settlingClass);
              }
              fe(e, "htmx:afterSwap", u);
            });
            if (O(f, /HX-Trigger-After-Swap:/i)) {
              var o = l;
              if (!oe(l)) {
                o = te().body;
              }
              Be(f, "HX-Trigger-After-Swap", o);
            }
            var s = function () {
              ae(n.tasks, function (e) {
                e.call();
              });
              ae(n.elts, function (e) {
                if (e.classList) {
                  e.classList.remove(Y.config.settlingClass);
                }
                fe(e, "htmx:afterSettle", u);
              });
              if (d.type) {
                fe(
                  te().body,
                  "htmx:beforeHistoryUpdate",
                  se({ history: d }, u)
                );
                if (d.type === "push") {
                  $t(d.path);
                  fe(te().body, "htmx:pushedIntoHistory", { path: d.path });
                } else {
                  Gt(d.path);
                  fe(te().body, "htmx:replacedInHistory", { path: d.path });
                }
              }
              if (u.pathInfo.anchor) {
                var e = te().getElementById(u.pathInfo.anchor);
                if (e) {
                  e.scrollIntoView({ block: "start", behavior: "auto" });
                }
              }
              if (n.title && !g) {
                var t = E("title");
                if (t) {
                  t.innerHTML = n.title;
                } else {
                  window.document.title = n.title;
                }
              }
              mr(n.elts, h);
              if (O(f, /HX-Trigger-After-Settle:/i)) {
                var r = l;
                if (!oe(l)) {
                  r = te().body;
                }
                Be(f, "HX-Trigger-After-Settle", r);
              }
              ne(m);
            };
            if (h.settleDelay > 0) {
              setTimeout(s, h.settleDelay);
            } else {
              s();
            }
          } catch (e) {
            ue(l, "htmx:swapError", u);
            ne(p);
            throw e;
          }
        };
        var y = Y.config.globalViewTransitions;
        if (h.hasOwnProperty("transition")) {
          y = h.transition;
        }
        if (
          y &&
          fe(l, "htmx:beforeTransition", u) &&
          typeof Promise !== "undefined" &&
          document.startViewTransition
        ) {
          var b = new Promise(function (e, t) {
            m = e;
            p = t;
          });
          var w = x;
          x = function () {
            document.startViewTransition(function () {
              w();
              return b;
            });
          };
        }
        if (h.swapDelay > 0) {
          setTimeout(x, h.swapDelay);
        } else {
          x();
        }
      }
      if (a) {
        ue(
          l,
          "htmx:responseError",
          se(
            {
              error:
                "Response Status Error Code " +
                f.status +
                " from " +
                u.pathInfo.requestPath,
            },
            u
          )
        );
      }
    }
    var Hr = {};
    function Lr() {
      return {
        init: function (e) {
          return null;
        },
        onEvent: function (e, t) {
          return true;
        },
        transformResponse: function (e, t, r) {
          return e;
        },
        isInlineSwap: function (e) {
          return false;
        },
        handleSwap: function (e, t, r, n) {
          return false;
        },
        encodeParameters: function (e, t, r) {
          return null;
        },
      };
    }
    function Ar(e, t) {
      if (t.init) {
        t.init(r);
      }
      Hr[e] = se(Lr(), t);
    }
    function Nr(e) {
      delete Hr[e];
    }
    function Ir(e, r, n) {
      if (e == undefined) {
        return r;
      }
      if (r == undefined) {
        r = [];
      }
      if (n == undefined) {
        n = [];
      }
      var t = ee(e, "hx-ext");
      if (t) {
        ae(t.split(","), function (e) {
          e = e.replace(/ /g, "");
          if (e.slice(0, 7) == "ignore:") {
            n.push(e.slice(7));
            return;
          }
          if (n.indexOf(e) < 0) {
            var t = Hr[e];
            if (t && r.indexOf(t) < 0) {
              r.push(t);
            }
          }
        });
      }
      return Ir(u(e), r, n);
    }
    var kr = false;
    te().addEventListener("DOMContentLoaded", function () {
      kr = true;
    });
    function Pr(e) {
      if (kr || te().readyState === "complete") {
        e();
      } else {
        te().addEventListener("DOMContentLoaded", e);
      }
    }
    function Mr() {
      if (Y.config.includeIndicatorStyles !== false) {
        te().head.insertAdjacentHTML(
          "beforeend",
          "<style>                      ." +
            Y.config.indicatorClass +
            "{opacity:0;transition: opacity 200ms ease-in;}                      ." +
            Y.config.requestClass +
            " ." +
            Y.config.indicatorClass +
            "{opacity:1}                      ." +
            Y.config.requestClass +
            "." +
            Y.config.indicatorClass +
            "{opacity:1}                    </style>"
        );
      }
    }
    function Dr() {
      var e = te().querySelector('meta[name="htmx-config"]');
      if (e) {
        return S(e.content);
      } else {
        return null;
      }
    }
    function Xr() {
      var e = Dr();
      if (e) {
        Y.config = se(Y.config, e);
      }
    }
    Pr(function () {
      Xr();
      Mr();
      var e = te().body;
      Dt(e);
      var t = te().querySelectorAll(
        "[hx-trigger='restored'],[data-hx-trigger='restored']"
      );
      e.addEventListener("htmx:abort", function (e) {
        var t = e.target;
        var r = ie(t);
        if (r && r.xhr) {
          r.xhr.abort();
        }
      });
      var r = window.onpopstate;
      window.onpopstate = function (e) {
        if (e.state && e.state.htmx) {
          Kt();
          ae(t, function (e) {
            fe(e, "htmx:restored", { document: te(), triggerEvent: fe });
          });
        } else {
          if (r) {
            r(e);
          }
        }
      };
      setTimeout(function () {
        fe(e, "htmx:load", {});
        e = null;
      }, 0);
    });
    return Y;
  })();
});
