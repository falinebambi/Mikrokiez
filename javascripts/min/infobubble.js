function InfoBubble(t) {
    this.extend(InfoBubble, google.maps.OverlayView), this.tabs_ = [], this.activeTab_ = null, this.baseZIndex_ = 100, this.isOpen_ = !1;
    var e = t || {};
    void 0 == e.backgroundColor && (e.backgroundColor = this.BACKGROUND_COLOR_), void 0 == e.borderColor && (e.borderColor = this.BORDER_COLOR_), void 0 == e.borderRadius && (e.borderRadius = this.BORDER_RADIUS_), void 0 == e.borderWidth && (e.borderWidth = this.BORDER_WIDTH_), void 0 == e.padding && (e.padding = this.PADDING_), void 0 == e.arrowPosition && (e.arrowPosition = this.ARROW_POSITION_), void 0 == e.disableAutoPan && (e.disableAutoPan = !1), void 0 == e.disableAnimation && (e.disableAnimation = !1), void 0 == e.minWidth && (e.minWidth = this.MIN_WIDTH_), void 0 == e.shadowStyle && (e.shadowStyle = this.SHADOW_STYLE_), void 0 == e.arrowSize && (e.arrowSize = this.ARROW_SIZE_), void 0 == e.arrowStyle && (e.arrowStyle = this.ARROW_STYLE_), this.buildDom_(), this.setValues(e)
}
window.InfoBubble = InfoBubble, InfoBubble.prototype.ARROW_SIZE_ = 15, InfoBubble.prototype.ARROW_STYLE_ = 0, InfoBubble.prototype.SHADOW_STYLE_ = 1, InfoBubble.prototype.MIN_WIDTH_ = 50, InfoBubble.prototype.ARROW_POSITION_ = 50, InfoBubble.prototype.PADDING_ = 10, InfoBubble.prototype.BORDER_WIDTH_ = 1, InfoBubble.prototype.BORDER_COLOR_ = "#ccc", InfoBubble.prototype.BORDER_RADIUS_ = 10, InfoBubble.prototype.BACKGROUND_COLOR_ = "#fff", InfoBubble.prototype.extend = function(t, e) {
    return function(t) {
        for (var e in t.prototype) this.prototype[e] = t.prototype[e];
        return this
    }.apply(t, [e])
}, InfoBubble.prototype.buildDom_ = function() {
    var t = this.bubble_ = document.createElement("DIV");
    t.style.position = "absolute", t.style.zIndex = this.baseZIndex_;
    var e = this.tabsContainer_ = document.createElement("DIV");
    e.style.position = "relative";
    var o = this.close_ = document.createElement("IMG");
    o.style.position = "absolute", o.style.width = this.px(12), o.style.height = this.px(12), o.style.border = 0, o.style.zIndex = this.baseZIndex_ + 1, o.style.cursor = "pointer", o.src = "http://maps.gstatic.com/intl/en_us/mapfiles/iw_close.gif";
    var i = this;
    google.maps.event.addDomListener(o, "click", function() {
        i.close(), google.maps.event.trigger(i, "closeclick")
    });
    var n = this.contentContainer_ = document.createElement("DIV");
    n.style.cursor = "default", n.style.clear = "both", n.style.position = "relative";
    var s = this.content_ = document.createElement("DIV");
    n.appendChild(s);
    var r = this.arrow_ = document.createElement("DIV");
    r.style.position = "relative";
    var a = this.arrowOuter_ = document.createElement("DIV"),
        b = this.arrowInner_ = document.createElement("DIV"),
        h = this.getArrowSize_();
    a.style.position = b.style.position = "absolute", a.style.left = b.style.left = "50%", a.style.height = b.style.height = "0", a.style.width = b.style.width = "0", a.style.marginLeft = this.px(-h), a.style.borderWidth = this.px(h), a.style.borderBottomWidth = 0;
    var l = this.bubbleShadow_ = document.createElement("DIV");
    l.style.position = "absolute", t.style.display = l.style.display = "none", t.appendChild(this.tabsContainer_), t.appendChild(o), t.appendChild(n), r.appendChild(a), r.appendChild(b), t.appendChild(r);
    var p = document.createElement("style");
    p.setAttribute("type", "text/css"), this.animationName_ = "_ibani_" + Math.round(1e4 * Math.random());
    var d = "." + this.animationName_ + "{-webkit-animation-name:" + this.animationName_ + ";-webkit-animation-duration:0.5s;-webkit-animation-iteration-count:1;}@-webkit-keyframes " + this.animationName_ + " {from {-webkit-transform: scale(0)}50% {-webkit-transform: scale(1.2)}90% {-webkit-transform: scale(0.95)}to {-webkit-transform: scale(1)}}";
    p.textContent = d, document.getElementsByTagName("head")[0].appendChild(p)
}, InfoBubble.prototype.setBackgroundClassName = function(t) {
    this.set("backgroundClassName", t)
}, InfoBubble.prototype.setBackgroundClassName = InfoBubble.prototype.setBackgroundClassName, InfoBubble.prototype.backgroundClassName_changed = function() {
    this.content_.className = this.get("backgroundClassName")
}, InfoBubble.prototype.backgroundClassName_changed = InfoBubble.prototype.backgroundClassName_changed, InfoBubble.prototype.setTabClassName = function(t) {
    this.set("tabClassName", t)
}, InfoBubble.prototype.setTabClassName = InfoBubble.prototype.setTabClassName, InfoBubble.prototype.tabClassName_changed = function() {
    this.updateTabStyles_()
}, InfoBubble.prototype.tabClassName_changed = InfoBubble.prototype.tabClassName_changed, InfoBubble.prototype.getArrowStyle_ = function() {
    return parseInt(this.get("arrowStyle"), 10) || 0
}, InfoBubble.prototype.setArrowStyle = function(t) {
    this.set("arrowStyle", t)
}, InfoBubble.prototype.setArrowStyle = InfoBubble.prototype.setArrowStyle, InfoBubble.prototype.arrowStyle_changed = function() {
    this.arrowSize_changed()
}, InfoBubble.prototype.arrowStyle_changed = InfoBubble.prototype.arrowStyle_changed, InfoBubble.prototype.getArrowSize_ = function() {
    return parseInt(this.get("arrowSize"), 10) || 0
}, InfoBubble.prototype.setArrowSize = function(t) {
    this.set("arrowSize", t)
}, InfoBubble.prototype.setArrowSize = InfoBubble.prototype.setArrowSize, InfoBubble.prototype.arrowSize_changed = function() {
    this.borderWidth_changed()
}, InfoBubble.prototype.arrowSize_changed = InfoBubble.prototype.arrowSize_changed, InfoBubble.prototype.setArrowPosition = function(t) {
    this.set("arrowPosition", t)
}, InfoBubble.prototype.setArrowPosition = InfoBubble.prototype.setArrowPosition, InfoBubble.prototype.getArrowPosition_ = function() {
    return parseInt(this.get("arrowPosition"), 10) || 0
}, InfoBubble.prototype.arrowPosition_changed = function() {
    var t = this.getArrowPosition_();
    this.arrowOuter_.style.left = this.arrowInner_.style.left = t + "%", this.redraw_()
}, InfoBubble.prototype.arrowPosition_changed = InfoBubble.prototype.arrowPosition_changed, InfoBubble.prototype.setZIndex = function(t) {
    this.set("zIndex", t)
}, InfoBubble.prototype.setZIndex = InfoBubble.prototype.setZIndex, InfoBubble.prototype.getZIndex = function() {
    return parseInt(this.get("zIndex"), 10) || this.baseZIndex_
}, InfoBubble.prototype.zIndex_changed = function() {
    var t = this.getZIndex();
    this.bubble_.style.zIndex = this.baseZIndex_ = t, this.close_.style.zIndex = t + 1
}, InfoBubble.prototype.zIndex_changed = InfoBubble.prototype.zIndex_changed, InfoBubble.prototype.setShadowStyle = function(t) {
    this.set("shadowStyle", t)
}, InfoBubble.prototype.setShadowStyle = InfoBubble.prototype.setShadowStyle, InfoBubble.prototype.getShadowStyle_ = function() {
    return parseInt(this.get("shadowStyle"), 10) || 0
}, InfoBubble.prototype.shadowStyle_changed = function() {
    var t = this.getShadowStyle_(),
        e = "",
        o = "",
        i = "";
    switch (t) {
        case 0:
            e = "none";
            break;
        case 1:
            o = "40px 15px 10px rgba(33,33,33,0.3)", i = "transparent";
            break;
        case 2:
            o = "0 0 2px rgba(33,33,33,0.3)", i = "rgba(33,33,33,0.35)"
    }
    this.bubbleShadow_.style.boxShadow = this.bubbleShadow_.style.webkitBoxShadow = this.bubbleShadow_.style.MozBoxShadow = o, this.bubbleShadow_.style.backgroundColor = i, this.isOpen_ && (this.bubbleShadow_.style.display = e, this.draw())
}, InfoBubble.prototype.shadowStyle_changed = InfoBubble.prototype.shadowStyle_changed, InfoBubble.prototype.showCloseButton = function() {
    this.set("hideCloseButton", !1)
}, InfoBubble.prototype.showCloseButton = InfoBubble.prototype.showCloseButton, InfoBubble.prototype.hideCloseButton = function() {
    this.set("hideCloseButton", !0)
}, InfoBubble.prototype.hideCloseButton = InfoBubble.prototype.hideCloseButton, InfoBubble.prototype.hideCloseButton_changed = function() {
    this.close_.style.display = this.get("hideCloseButton") ? "none" : ""
}, InfoBubble.prototype.hideCloseButton_changed = InfoBubble.prototype.hideCloseButton_changed, InfoBubble.prototype.setBackgroundColor = function(t) {
    t && this.set("backgroundColor", t)
}, InfoBubble.prototype.setBackgroundColor = InfoBubble.prototype.setBackgroundColor, InfoBubble.prototype.backgroundColor_changed = function() {
    var t = this.get("backgroundColor");
    this.contentContainer_.style.backgroundColor = t, this.arrowInner_.style.borderColor = t + " transparent transparent", this.updateTabStyles_()
}, InfoBubble.prototype.backgroundColor_changed = InfoBubble.prototype.backgroundColor_changed, InfoBubble.prototype.setBorderColor = function(t) {
    t && this.set("borderColor", t)
}, InfoBubble.prototype.setBorderColor = InfoBubble.prototype.setBorderColor, InfoBubble.prototype.borderColor_changed = function() {
    var t = this.get("borderColor"),
        e = this.contentContainer_,
        o = this.arrowOuter_;
    e.style.borderColor = t, o.style.borderColor = t + " transparent transparent", e.style.borderStyle = o.style.borderStyle = this.arrowInner_.style.borderStyle = "solid", this.updateTabStyles_()
}, InfoBubble.prototype.borderColor_changed = InfoBubble.prototype.borderColor_changed, InfoBubble.prototype.setBorderRadius = function(t) {
    this.set("borderRadius", t)
}, InfoBubble.prototype.setBorderRadius = InfoBubble.prototype.setBorderRadius, InfoBubble.prototype.getBorderRadius_ = function() {
    return parseInt(this.get("borderRadius"), 10) || 0
}, InfoBubble.prototype.borderRadius_changed = function() {
    var t = this.getBorderRadius_(),
        e = this.getBorderWidth_();
    this.contentContainer_.style.borderRadius = this.contentContainer_.style.MozBorderRadius = this.contentContainer_.style.webkitBorderRadius = this.bubbleShadow_.style.borderRadius = this.bubbleShadow_.style.MozBorderRadius = this.bubbleShadow_.style.webkitBorderRadius = this.px(t), this.tabsContainer_.style.paddingLeft = this.tabsContainer_.style.paddingRight = this.px(t + e), this.redraw_()
}, InfoBubble.prototype.borderRadius_changed = InfoBubble.prototype.borderRadius_changed, InfoBubble.prototype.getBorderWidth_ = function() {
    return parseInt(this.get("borderWidth"), 10) || 0
}, InfoBubble.prototype.setBorderWidth = function(t) {
    this.set("borderWidth", t)
}, InfoBubble.prototype.setBorderWidth = InfoBubble.prototype.setBorderWidth, InfoBubble.prototype.borderWidth_changed = function() {
    var t = this.getBorderWidth_();
    this.contentContainer_.style.borderWidth = this.px(t), this.tabsContainer_.style.top = this.px(t), this.updateArrowStyle_(), this.updateTabStyles_(), this.borderRadius_changed(), this.redraw_()
}, InfoBubble.prototype.borderWidth_changed = InfoBubble.prototype.borderWidth_changed, InfoBubble.prototype.updateArrowStyle_ = function() {
    var t = this.getBorderWidth_(),
        e = this.getArrowSize_(),
        o = this.getArrowStyle_(),
        i = this.px(e),
        n = this.px(Math.max(0, e - t)),
        s = this.arrowOuter_,
        r = this.arrowInner_;
    this.arrow_.style.marginTop = this.px(-t), s.style.borderTopWidth = i, r.style.borderTopWidth = n, 0 == o || 1 == o ? (s.style.borderLeftWidth = i, r.style.borderLeftWidth = n) : s.style.borderLeftWidth = r.style.borderLeftWidth = 0, 0 == o || 2 == o ? (s.style.borderRightWidth = i, r.style.borderRightWidth = n) : s.style.borderRightWidth = r.style.borderRightWidth = 0, 2 > o ? (s.style.marginLeft = this.px(-e), r.style.marginLeft = this.px(-(e - t))) : s.style.marginLeft = r.style.marginLeft = 0, 0 == t ? s.style.display = "none" : s.style.display = ""
}, InfoBubble.prototype.setPadding = function(t) {
    this.set("padding", t)
}, InfoBubble.prototype.setPadding = InfoBubble.prototype.setPadding, InfoBubble.prototype.getPadding_ = function() {
    return parseInt(this.get("padding"), 10) || 0
}, InfoBubble.prototype.padding_changed = function() {
    var t = this.getPadding_();
    this.contentContainer_.style.padding = this.px(t), this.updateTabStyles_(), this.redraw_()
}, InfoBubble.prototype.padding_changed = InfoBubble.prototype.padding_changed, InfoBubble.prototype.px = function(t) {
    return t ? t + "px" : t
}, InfoBubble.prototype.addEvents_ = function() {
    var t = ["mousedown", "mousemove", "mouseover", "mouseout", "mouseup", "mousewheel", "DOMMouseScroll", "touchstart", "touchend", "touchmove", "dblclick", "contextmenu", "click"],
        e = this.bubble_;
    this.listeners_ = [];
    for (var o = 0, i; i = t[o]; o++) this.listeners_.push(google.maps.event.addDomListener(e, i, function(t) {
        t.cancelBubble = !0, t.stopPropagation && t.stopPropagation()
    }))
}, InfoBubble.prototype.onAdd = function() {
    this.bubble_ || this.buildDom_(), this.addEvents_();
    var t = this.getPanes();
    t && (t.floatPane.appendChild(this.bubble_), t.floatShadow.appendChild(this.bubbleShadow_))
}, InfoBubble.prototype.onAdd = InfoBubble.prototype.onAdd, InfoBubble.prototype.draw = function() {
    var t = this.getProjection();
    if (t) {
        var e = this.get("position");
        if (!e) return void this.close();
        var o = 0;
        this.activeTab_ && (o = this.activeTab_.offsetHeight);
        var i = this.getAnchorHeight_(),
            n = this.getArrowSize_(),
            s = this.getArrowPosition_();
        s /= 100;
        var r = t.fromLatLngToDivPixel(e),
            a = this.contentContainer_.offsetWidth,
            b = this.bubble_.offsetHeight;
        if (a) {
            var h = r.y - (b + n);
            i && (h -= i);
            var l = r.x - a * s;
            this.bubble_.style.top = this.px(h), this.bubble_.style.left = this.px(l);
            var p = parseInt(this.get("shadowStyle"), 10);
            switch (p) {
                case 1:
                    this.bubbleShadow_.style.top = this.px(h + o - 1), this.bubbleShadow_.style.left = this.px(l), this.bubbleShadow_.style.width = this.px(a), this.bubbleShadow_.style.height = this.px(this.contentContainer_.offsetHeight - n);
                    break;
                case 2:
                    a = .8 * a, i ? this.bubbleShadow_.style.top = this.px(r.y) : this.bubbleShadow_.style.top = this.px(r.y + n), this.bubbleShadow_.style.left = this.px(r.x - a * s), this.bubbleShadow_.style.width = this.px(a), this.bubbleShadow_.style.height = this.px(2)
            }
        }
    }
}, InfoBubble.prototype.draw = InfoBubble.prototype.draw, InfoBubble.prototype.onRemove = function() {
    this.bubble_ && this.bubble_.parentNode && this.bubble_.parentNode.removeChild(this.bubble_), this.bubbleShadow_ && this.bubbleShadow_.parentNode && this.bubbleShadow_.parentNode.removeChild(this.bubbleShadow_);
    for (var t = 0, e; e = this.listeners_[t]; t++) google.maps.event.removeListener(e)
}, InfoBubble.prototype.onRemove = InfoBubble.prototype.onRemove, InfoBubble.prototype.isOpen = function() {
    return this.isOpen_
}, InfoBubble.prototype.isOpen = InfoBubble.prototype.isOpen, InfoBubble.prototype.close = function() {
    this.bubble_ && (this.bubble_.style.display = "none", this.bubble_.className = this.bubble_.className.replace(this.animationName_, "")), this.bubbleShadow_ && (this.bubbleShadow_.style.display = "none", this.bubbleShadow_.className = this.bubbleShadow_.className.replace(this.animationName_, "")), this.isOpen_ = !1
}, InfoBubble.prototype.close = InfoBubble.prototype.close, InfoBubble.prototype.open = function(t, e) {
    var o = this;
    window.setTimeout(function() {
        o.open_(t, e)
    }, 0)
}, InfoBubble.prototype.open_ = function(t, e) {
    this.updateContent_(), t && this.setMap(t), e && (this.set("anchor", e), this.bindTo("anchorPoint", e), this.bindTo("position", e)), this.bubble_.style.display = this.bubbleShadow_.style.display = "";
    var o = !this.get("disableAnimation");
    o && (this.bubble_.className += " " + this.animationName_, this.bubbleShadow_.className += " " + this.animationName_), this.redraw_(), this.isOpen_ = !0;
    var i = !this.get("disableAutoPan");
    if (i) {
        var n = this;
        window.setTimeout(function() {
            n.panToView()
        }, 200)
    }
}, InfoBubble.prototype.open = InfoBubble.prototype.open, InfoBubble.prototype.setPosition = function(t) {
    t && this.set("position", t)
}, InfoBubble.prototype.setPosition = InfoBubble.prototype.setPosition, InfoBubble.prototype.getPosition = function() {
    return this.get("position")
}, InfoBubble.prototype.getPosition = InfoBubble.prototype.getPosition, InfoBubble.prototype.position_changed = function() {
    this.draw()
}, InfoBubble.prototype.position_changed = InfoBubble.prototype.position_changed, InfoBubble.prototype.panToView = function() {
    var t = this.getProjection();
    if (t && this.bubble_) {
        var e = this.getAnchorHeight_(),
            o = this.bubble_.offsetHeight + e,
            i = this.get("map"),
            n = i.getDiv(),
            s = n.offsetHeight,
            r = this.getPosition(),
            a = t.fromLatLngToContainerPixel(i.getCenter()),
            b = t.fromLatLngToContainerPixel(r),
            h = a.y - o,
            l = s - a.y,
            p = 0 > h,
            d = 0;
        p && (h *= -1, d = (h + l) / 2), b.y -= d, r = t.fromContainerPixelToLatLng(b), i.getCenter() != r && i.panTo(r)
    }
}, InfoBubble.prototype.panToView = InfoBubble.prototype.panToView, InfoBubble.prototype.htmlToDocumentFragment_ = function(t) {
    t = t.replace(/^\s*([\S\s]*)\b\s*$/, "$1");
    var e = document.createElement("DIV");
    if (e.innerHTML = t, 1 == e.childNodes.length) return e.removeChild(e.firstChild);
    for (var o = document.createDocumentFragment(); e.firstChild;) o.appendChild(e.firstChild);
    return o
}, InfoBubble.prototype.removeChildren_ = function(t) {
    if (t)
        for (var e; e = t.firstChild;) t.removeChild(e)
}, InfoBubble.prototype.setContent = function(t) {
    this.set("content", t)
}, InfoBubble.prototype.setContent = InfoBubble.prototype.setContent, InfoBubble.prototype.getContent = function() {
    return this.get("content")
}, InfoBubble.prototype.getContent = InfoBubble.prototype.getContent, InfoBubble.prototype.updateContent_ = function() {
    if (this.content_) {
        this.removeChildren_(this.content_);
        var t = this.getContent();
        if (t) {
            "string" == typeof t && (t = this.htmlToDocumentFragment_(t)), this.content_.appendChild(t);
            for (var e = this, o = this.content_.getElementsByTagName("IMG"), i = 0, n; n = o[i]; i++) google.maps.event.addDomListener(n, "load", function() {
                e.imageLoaded_()
            });
            google.maps.event.trigger(this, "domready")
        }
        this.redraw_()
    }
}, InfoBubble.prototype.imageLoaded_ = function() {
    var t = !this.get("disableAutoPan");
    this.redraw_(), !t || 0 != this.tabs_.length && 0 != this.activeTab_.index || this.panToView()
}, InfoBubble.prototype.updateTabStyles_ = function() {
    if (this.tabs_ && this.tabs_.length) {
        for (var t = 0, e; e = this.tabs_[t]; t++) this.setTabStyle_(e.tab);
        this.activeTab_.style.zIndex = this.baseZIndex_;
        var o = this.getBorderWidth_(),
            i = this.getPadding_() / 2;
        this.activeTab_.style.borderBottomWidth = 0, this.activeTab_.style.paddingBottom = this.px(i + o)
    }
}, InfoBubble.prototype.setTabStyle_ = function(t) {
    var e = this.get("backgroundColor"),
        o = this.get("borderColor"),
        i = this.getBorderRadius_(),
        n = this.getBorderWidth_(),
        s = this.getPadding_(),
        r = this.px(-Math.max(s, i)),
        a = this.px(i),
        b = this.baseZIndex_;
    t.index && (b -= t.index);
    var h = {
        cssFloat: "left",
        position: "relative",
        cursor: "pointer",
        backgroundColor: e,
        border: this.px(n) + " solid " + o,
        padding: this.px(s / 2) + " " + this.px(s),
        marginRight: r,
        whiteSpace: "nowrap",
        borderRadiusTopLeft: a,
        MozBorderRadiusTopleft: a,
        webkitBorderTopLeftRadius: a,
        borderRadiusTopRight: a,
        MozBorderRadiusTopright: a,
        webkitBorderTopRightRadius: a,
        zIndex: b,
        display: "inline"
    };
    for (var l in h) t.style[l] = h[l];
    var p = this.get("tabClassName");
    void 0 != p && (t.className += " " + p)
}, InfoBubble.prototype.addTabActions_ = function(t) {
    var e = this;
    t.listener_ = google.maps.event.addDomListener(t, "click", function() {
        e.setTabActive_(this)
    })
}, InfoBubble.prototype.setTabActive = function(t) {
    var e = this.tabs_[t - 1];
    e && this.setTabActive_(e.tab)
}, InfoBubble.prototype.setTabActive = InfoBubble.prototype.setTabActive, InfoBubble.prototype.setTabActive_ = function(t) {
    if (!t) return this.setContent(""), void this.updateContent_();
    var e = this.getPadding_() / 2,
        o = this.getBorderWidth_();
    if (this.activeTab_) {
        var i = this.activeTab_;
        i.style.zIndex = this.baseZIndex_ - i.index, i.style.paddingBottom = this.px(e), i.style.borderBottomWidth = this.px(o)
    }
    t.style.zIndex = this.baseZIndex_, t.style.borderBottomWidth = 0, t.style.marginBottomWidth = "-10px", t.style.paddingBottom = this.px(e + o), this.setContent(this.tabs_[t.index].content), this.updateContent_(), this.activeTab_ = t, this.redraw_()
}, InfoBubble.prototype.setMaxWidth = function(t) {
    this.set("maxWidth", t)
}, InfoBubble.prototype.setMaxWidth = InfoBubble.prototype.setMaxWidth, InfoBubble.prototype.maxWidth_changed = function() {
    this.redraw_()
}, InfoBubble.prototype.maxWidth_changed = InfoBubble.prototype.maxWidth_changed, InfoBubble.prototype.setMaxHeight = function(t) {
    this.set("maxHeight", t)
}, InfoBubble.prototype.setMaxHeight = InfoBubble.prototype.setMaxHeight, InfoBubble.prototype.maxHeight_changed = function() {
    this.redraw_()
}, InfoBubble.prototype.maxHeight_changed = InfoBubble.prototype.maxHeight_changed, InfoBubble.prototype.setMinWidth = function(t) {
    this.set("minWidth", t)
}, InfoBubble.prototype.setMinWidth = InfoBubble.prototype.setMinWidth, InfoBubble.prototype.minWidth_changed = function() {
    this.redraw_()
}, InfoBubble.prototype.minWidth_changed = InfoBubble.prototype.minWidth_changed, InfoBubble.prototype.setMinHeight = function(t) {
    this.set("minHeight", t)
}, InfoBubble.prototype.setMinHeight = InfoBubble.prototype.setMinHeight, InfoBubble.prototype.minHeight_changed = function() {
    this.redraw_()
}, InfoBubble.prototype.minHeight_changed = InfoBubble.prototype.minHeight_changed, InfoBubble.prototype.addTab = function(t, e) {
    var o = document.createElement("DIV");
    o.innerHTML = t, this.setTabStyle_(o), this.addTabActions_(o), this.tabsContainer_.appendChild(o), this.tabs_.push({
        label: t,
        content: e,
        tab: o
    }), o.index = this.tabs_.length - 1, o.style.zIndex = this.baseZIndex_ - o.index, this.activeTab_ || this.setTabActive_(o), o.className = o.className + " " + this.animationName_, this.redraw_()
}, InfoBubble.prototype.addTab = InfoBubble.prototype.addTab, InfoBubble.prototype.updateTab = function(t, e, o) {
    if (!(!this.tabs_.length || 0 > t || t >= this.tabs_.length)) {
        var i = this.tabs_[t];
        void 0 != e && (i.tab.innerHTML = i.label = e), void 0 != o && (i.content = o), this.activeTab_ == i.tab && (this.setContent(i.content), this.updateContent_()), this.redraw_()
    }
}, InfoBubble.prototype.updateTab = InfoBubble.prototype.updateTab, InfoBubble.prototype.removeTab = function(t) {
    if (!(!this.tabs_.length || 0 > t || t >= this.tabs_.length)) {
        var e = this.tabs_[t];
        e.tab.parentNode.removeChild(e.tab), google.maps.event.removeListener(e.tab.listener_), this.tabs_.splice(t, 1), delete e;
        for (var o = 0, i; i = this.tabs_[o]; o++) i.tab.index = o;
        e.tab == this.activeTab_ && (this.tabs_[t] ? this.activeTab_ = this.tabs_[t].tab : this.tabs_[t - 1] ? this.activeTab_ = this.tabs_[t - 1].tab : this.activeTab_ = void 0, this.setTabActive_(this.activeTab_)), this.redraw_()
    }
}, InfoBubble.prototype.removeTab = InfoBubble.prototype.removeTab, InfoBubble.prototype.getElementSize_ = function(t, e, o) {
    var i = document.createElement("DIV");
    i.style.display = "inline", i.style.position = "absolute", i.style.visibility = "hidden", "string" == typeof t ? i.innerHTML = t : i.appendChild(t.cloneNode(!0)), document.body.appendChild(i);
    var n = new google.maps.Size(i.offsetWidth, i.offsetHeight);
    return e && n.width > e && (i.style.width = this.px(e), n = new google.maps.Size(i.offsetWidth, i.offsetHeight)), o && n.height > o && (i.style.height = this.px(o), n = new google.maps.Size(i.offsetWidth, i.offsetHeight)), document.body.removeChild(i), delete i, n
}, InfoBubble.prototype.redraw_ = function() {
    this.figureOutSize_(), this.positionCloseButton_(), this.draw()
}, InfoBubble.prototype.figureOutSize_ = function() {
    var t = this.get("map");
    if (t) {
        var e = this.getPadding_(),
            o = this.getBorderWidth_(),
            i = this.getBorderRadius_(),
            n = this.getArrowSize_(),
            s = t.getDiv(),
            r = 2 * n,
            a = s.offsetWidth - r,
            b = s.offsetHeight - r - this.getAnchorHeight_(),
            h = 0,
            l = this.get("minWidth") || 0,
            p = this.get("minHeight") || 0,
            d = this.get("maxWidth") || 0,
            u = this.get("maxHeight") || 0;
        d = Math.min(a, d), u = Math.min(b, u);
        var f = 0;
        if (this.tabs_.length)
            for (var y = 0, _; _ = this.tabs_[y]; y++) {
                var c = this.getElementSize_(_.tab, d, u),
                    g = this.getElementSize_(_.content, d, u);
                l < c.width && (l = c.width), f += c.width, p < c.height && (p = c.height), c.height > h && (h = c.height), l < g.width && (l = g.width), p < g.height && (p = g.height)
            } else {
                var B = this.get("content");
                if ("string" == typeof B && (B = this.htmlToDocumentFragment_(B)), B) {
                    var g = this.getElementSize_(B, d, u);
                    l < g.width && (l = g.width), p < g.height && (p = g.height)
                }
            }
        d && (l = Math.min(l, d)), u && (p = Math.min(p, u)), l = Math.max(l, f), l == f && (l += 2 * e), n = 2 * n, l = Math.max(l, n), l > a && (l = a), p > b && (p = b - h), this.tabsContainer_ && (this.tabHeight_ = h, this.tabsContainer_.style.width = this.px(f)), this.contentContainer_.style.width = this.px(l), this.contentContainer_.style.height = this.px(0), this.contentContainer_.style.top = this.px(-11)
    }
}, InfoBubble.prototype.getAnchorHeight_ = function() {
    var t = this.get("anchor");
    if (t) {
        var e = this.get("anchorPoint");
        if (e) return -1 * e.y
    }
    return 0
}, InfoBubble.prototype.anchorPoint_changed = function() {
    this.draw()
}, InfoBubble.prototype.anchorPoint_changed = InfoBubble.prototype.anchorPoint_changed, InfoBubble.prototype.positionCloseButton_ = function() {
    var t = this.getBorderRadius_(),
        e = this.getBorderWidth_(),
        o = 2,
        i = 2;
    this.tabs_.length && this.tabHeight_ && (i += this.tabHeight_), i += e, o += e;
    var n = this.contentContainer_;
    n && n.clientHeight < n.scrollHeight && (o += 15), this.close_.style.right = this.px(o), this.close_.style.top = this.px(i)
};
