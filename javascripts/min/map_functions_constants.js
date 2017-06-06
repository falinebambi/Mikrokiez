function pinLocation(e, o) {
    function t(o, t) {
        var a = new InfoBubble({
            map: e,
            position: t
        });
        a.setContent(o ? "Error: The Geolocation service failed." : "Error: Your browser doesn't support geolocation.")
    }
    if ("undefined" == typeof e.data.cities) var a = !1;
    else var a = !0;
    if ("undefined" == typeof e.data.hoods) var n = !1;
    else var n = !0;
    var r = !1;
    navigator.geolocation ? navigator.geolocation.getCurrentPosition(function(o) {
        r = !0;
        var t = new google.maps.LatLng(o.coords.latitude, o.coords.longitude),
            s = document.createElement("div");
        s.id = "iamhere", s.innerHTML = '<svg version="1.1 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve"><rect fill="#3c3d3b" width="32" height="32"/><g><rect x="4.05" y="4.05" fill="#FFFFFF" width="5.378" height="5.378"/><rect x="4.05" y="22.572" fill="#FFFFFF" width="5.378" height="5.378"/><rect x="4.05" y="13.311" fill="#FFFFFF" width="5.378" height="5.377"/><rect x="22.572" y="4.05" fill="#FFFFFF" width="5.378" height="5.378"/><rect x="22.572" y="22.572" fill="#FFFFFF" width="5.378" height="5.378"/><rect x="22.572" y="13.311" fill="#FFFFFF" width="5.378" height="5.377"/><rect x="13.311" y="4.05" fill="#FFFFFF" width="5.377" height="5.378"/><rect x="13.311" y="22.572" fill="#FFFFFF" width="5.377" height="5.378"/><rect x="13.311" y="13.311" fill="#FFFFFF" width="5.377" height="5.377"/></g></svg>';
        var l = new InfoBubble({
            map: e,
            position: t,
            padding: 0,
            borderRadius: 0,
            borderWidth: 0,
            hideCloseButton: !0,
            arrowSize: 0,
            shadowStyle: 0,
            minWidth: 0,
            content: s,
            zIndex: 999998,
            disableAutoPan: !0
        });
        if (google.maps.event.addDomListener(l.bubble_, "click", function() {
                e.setCenter(l.position), "undefined" != typeof hoodsbreak && e.setZoom(hoodsbreak)
            }), l.open(), a || n) {
            var i;
            a ? (i = e.data.cities, i.listselector = "#cities ul") : n && (i = e.data.hoods, i.listselector = "#neighborhoods nav > ul"), detClosest(t, i), a && $("input[type=radio][name=sortby]").change(function() {
                "newest" == this.value ? sortBlocks(i, "age", !0) : "nearest" == this.value && sortBlocks(i, "loc", !0)
            }), a && 0 == mobile ? $("#sort_toggle").removeClass("is-hidden") : mobile && (a ? sortBlocks(i, "loc", !0) : n && sortBlocks(i, "loc", !1))
        }
    }, function(e) {
        console.warn(e.code + ": " + e.message)
    }) : console.warn("No Geolocation Support")
}

function detClosest(e, o) {
    for (var t = 0; t < o.length; t++) "" == o[t].coords || "undefined" == typeof o[t].coords || "" == o[t].coords.lat || "undefined" == typeof o[t].coords.lat || "" == o[t].coords.lng || "undefined" == typeof o[t].coords.lng ? o[t].distance = 1e19 : o[t].distance = dist(e, new google.maps.LatLng(o[t].coords.lat, o[t].coords.lng));
    o.byage = o.slice(), o.byage.reverse(), o.byloc = o.slice(), o.byloc.sort(compareDist)
}

function compareDist(e, o) {
    return o.distance - e.distance
}

function dist(e, o) {
    var t = 6371e3,
        a = e.lat().toRadians(),
        n = o.lat().toRadians(),
        r = (o.lat() - e.lat()).toRadians(),
        s = (o.lng() - e.lng()).toRadians(),
        l = Math.sin(r / 2) * Math.sin(r / 2) + Math.cos(a) * Math.cos(n) * Math.sin(s / 2) * Math.sin(s / 2),
        i = 2 * Math.atan2(Math.sqrt(l), Math.sqrt(1 - l)),
        c = t * i;
    return c
}

function sortBlocks(e, o, t) {
    var a;
    switch (o) {
        case "age":
            a = e.byage;
            break;
        case "loc":
            a = e.byloc
    }
    for (var n = 0; n < a.length; n++) {
        if (t) var r = a[n].id.replace("data_", "tile_");
        else var r = a[n].id;
        $(e.listselector).prepend($("#" + r))
    }
}

function initSearch(e, o) {
    var t = {
            keys: ["name"],
            threshold: .3
        },
        a = new Fuse(o, t);
    $(e).keyup(function() {
        if ($("#no_results").addClass("is-hidden"), "" == this.value)
            for (var e = 0; e < o.length; e++) $(o[e].tile).removeClass("is-hidden");
        else {
            for (var t = a.search(this.value), n = 0; n < o.length; n++) $(o[n].tile).addClass("is-hidden");
            if (0 == t.length) $("#no_results").removeClass("is-hidden");
            else
                for (var e = 0; e < t.length; e++) $(t[e].tile).removeClass("is-hidden")
        }
    })
}

function makedot(e) {
    var o = {
        path: "M-5,0a5,5 0 1,0 10,0a5,5 0 1,0 -10,0",
        fillOpacity: 1,
        fillColor: e,
        strokeWeight: 0,
        scale: dotscaler
    };
    return o
}

function comingDot() {
    var e = {
        url: "../images/pattern.svg",
        origin: new google.maps.Point(0, 0),
        scaledSize: new google.maps.Size(10 * dotscaler, 10 * dotscaler),
        anchor: new google.maps.Point(5 * dotscaler, 5 * dotscaler)
    };
    return e
}

function createMarkers(e, o, t, a) {
    for (var n = 0; n < e.length; n++) "undefined" == typeof e[n].coords || "undefined" == typeof e[n].coords.lat || "undefined" == typeof e[n].coords.lng ? geocount < 10 && geocount++ : createLocation(t, e[n], o);
    a && resizeMarkers(o, a)
}

function resizeMarkers(e, o) {
    for (var t = 0; t < e.length; t++) e[t].dot ? (e[t].dot.scale = dotscaler * o, e[t].setIcon(e[t].dot)) : e[t].comingdot ? (e[t].comingdot.anchor = new google.maps.Point(5 * dotscaler * o, 5 * dotscaler * o), e[t].place && "city" == e[t].place.type && (e[t].comingdot.anchor.y = dotscaler * o + 1), e[t].comingdot.scaledSize = new google.maps.Size(10 * dotscaler * o, 10 * dotscaler * o), e[t].setIcon(e[t].comingdot)) : e[t].tagpath
}

function addMarker(e, o) {
    e.push(o)
}

function setMapOnAll(e, o) {
    for (var t = 0; t < o.length; t++) o[t].setMap(e)
}

function hideMarkers(e) {
    setMapOnAll(null, e)
}

function showMarkers(e, o) {
    setMapOnAll(e, o)
}

function toggleIW(e) {
    0 == e.infowindow.isopen ? openIW(e) : closeIW(e)
}

function openIW(e) {
    if (openmarker && closeIW(openmarker), "place" == e.place.type && e.place.image) {
        var o = e.infowindow.labelcontent.image,
            t = e.place.image.replace("/assets/", "");
        o.src = "http://onthegrid.imgix.net/" + t + "?auto=format,redeye&dpr=2&fit=crop&h=135&w=200", e.infowindow.labelcontent.classList.add("image_loaded")
    }
    e.infowindow.open(e.map, e), e.infowindow.isopen = !0, openmarker = e
}

function closeIW(e) {
    e.infowindow.close(), e.infowindow.isopen = !1
}

function createZoomControl(e) {
    var o = document.createElement("div");
    o.id = "zoomcontainer";
    var t = new zoomControl(o, e);
    o.index = 1, e.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(o)
}

function zoomControl(e, o) {
    var t = document.createElement("div");
    t.style.width = "100%", t.style.height = "100%";
    var a = document.createElement("div");
    a.style.width = "100%", a.style.height = "50%", a.id = "zoomin", a.innerHTML = '<svg version="1.1" id="plus" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><line fill="none" stroke-width="10" stroke-miterlimit="10" x1="50" y1="9.761" x2="50" y2="90.239"/><line fill="none" stroke-width="10" stroke-miterlimit="10" x1="9.761" y1="50" x2="90.239" y2="50"/></svg>';
    var n = document.createElement("div");
    n.style.width = "100%", n.style.height = "50%", n.id = "zoomout", n.innerHTML = '<svg version="1.1" id="minus" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><line fill="none" stroke-width="10" stroke-miterlimit="10" x1="9.761" y1="50" x2="90.239" y2="50"/></svg>', a.addEventListener("click", function() {
        o.setZoom(o.getZoom() + 1)
    }), n.addEventListener("click", function() {
        o.getZoom() > o.minzoom && o.setZoom(o.getZoom() - 1)
    }), t.appendChild(a), t.appendChild(n), e.appendChild(t)
}

function createPlacesArray(e, o, t) {
    for (var a = [], n = document.querySelectorAll(e), r = 0; r < n.length; r++)
        if (!n[r].dataset.nodot) {
            var s = [];
            "undefined" != typeof n[r].dataset.coords && (s = n[r].dataset.coords.split(","));
            var l = {
                id: n[r].id,
                name: n[r].dataset.name,
                curator: n[r].dataset.curator,
                ambassador: n[r].dataset.ambassador,
                url: n[r].dataset.url,
                color: n[r].dataset.color,
                coords: {
                    lat: s[0],
                    lng: s[1]
                },
                comingsoon: n[r].dataset.comingsoon,
                type: o,
                parentname: t,
                tag: n[r].dataset.tag,
                image: n[r].dataset.src
            };
            a.push(l)
        }
    return a
}

function createLocation(e, o, t) {
    var a;
    a = "true" == o.comingsoon;
    var n = new google.maps.LatLng(o.coords.lat, o.coords.lng);
    if ("undefined" != typeof n) {
        var r;
        o.color ? r = o.color : (o.color = "#FFFFFF", r = "#FFFFFF");
        var s = document.createElement("div");
        if (s.id = "iw_" + o.id, s.setAttribute("class", "infowindow"), s.setAttribute("style", "background:" + r), "city" == o.type) {
            s.classList.add("city");
            var l = document.createElement("div");
            l.classList.add("svg_container");
            var i = document.createElement("div");
            i.classList.add("city_svg"), i.innerHTML = $("#" + o.id.replace("data", "tile")).find(".cityscape").html(), l.appendChild(i), s.appendChild(l)
        }
        var c = document.createElement("div");
        c.classList.add("content_wrap");
        var d = document.createElement("div");
        if (d.classList.add("inner_wrap"), "place" == o.type) {
            s.classList.add("place");
            var i = document.createElement("img");
            i.classList.add("place_img"), c.appendChild(i), s.image = i
        }
        if (a) {
            s.classList.add("coming");
            var p = document.createElement("p");
            p.classList.add("coming_soon"), p.textContent = "Coming Soon", d.appendChild(p)
        }
        if (null != o.parentname) {
            var m = document.createElement("p");
            m.classList.add("parent"), m.textContent = o.parentname, d.appendChild(m)
        }
        var g = document.createElement("p");
        if (g.classList.add("name"), g.textContent = o.name, d.appendChild(g), o.curator) {
            var h = document.createElement("p");
            h.classList.add("curated"), h.innerHTML = '<span class="curator">' + o.curator + "</span>", d.appendChild(h)
        } else if (o.ambassador) {
            var f = document.createElement("p");
            f.innerHTML = 'Ambassador: <span class="curator">' + o.ambassador + "</span>", d.appendChild(f)
        }
        c.appendChild(d), s.appendChild(c);
        var y = new google.maps.InfoWindow({
            content: s,
            map: e,
            zIndex: 999999999
        });
        y.labelcontent = s, y.close(), y.isopen = !1, google.maps.event.addListener(y, "domready", function() {
            var t = $(".gm-style-iw"),
                a = t.next();
            a.css({
                display: "none"
            });
            var n = t.prev();
            n.children(":nth-child(1)").css({
                display: "none"
            }), n.children(":nth-child(3)").css({
                display: "none"
            }), n.children(":nth-child(2)").css({
                display: "none"
            }), n.children(":nth-child(4)").css({
                display: "none"
            }), n.children().css({
                display: "none"
            });
            var r = document.getElementById("iw_" + o.id);
            r.addEventListener("click", function() {
                "true" != o.comingsoon && (o.hoods ? (0 == o.hoodmarkers.length && createMarkers(o.hoods, o.hoodmarkers, e, dot_largesize), zoomTo(e, o)) : o.places ? (0 == o.placemarkers.length && createMarkers(o.places, o.placemarkers, e, dot_largesize), zoomTo(e, o)) : window.location.href = o.url)
            })
        });
        var u = makedot(o.color);
        "city" == o.type && (u.anchor = new google.maps.Point(0, -6 * u.scale));
        var v;
        v = a ? 0 : 1e3;
        var w = new google.maps.Marker({
            map: e,
            position: n,
            icon: u,
            optimized: !1,
            zIndex: google.maps.Marker.MAX_ZINDEX + loccount + v
        });
        if ("place" == o.type && o.tag)
            if (iconPaths[o.tag]) {
                var k = {
                        path: iconPaths[o.tag],
                        fillOpacity: 1,
                        fillColor: "#3c3d3b",
                        strokeWeight: 0,
                        scale: 2 * dotscaler
                    },
                    b = new google.maps.Marker({
                        map: e,
                        position: n,
                        icon: k,
                        zIndex: google.maps.Marker.MAX_ZINDEX + loccount + v
                    });
                b.infowindow = y, b.tagpath = k, b.place = o, activateMarker(e, b), addMarker(t, b)
            } else console.log("Missing tag!", o.name, o.tag);
        if (loccount++, a) {
            var F = comingDot();
            "city" == o.type && (F.anchor.y = -2 * dotscaler);
            var x = new google.maps.Marker({
                map: e,
                position: n,
                icon: F,
                optimized: !1,
                zIndex: google.maps.Marker.MAX_ZINDEX + loccount
            });
            loccount++, x.infowindow = y, x.comingdot = F, x.place = o, activateMarker(e, x), addMarker(t, x)
        }
        w.infowindow = y, w.dot = u, o.marker = w, w.place = o, activateMarker(e, w), addMarker(t, w)
    }
}

function activateMarker(e, o) {
    mobile ? google.maps.event.addListener(o, "click", function() {
        toggleIW(this)
    }) : (google.maps.event.addListener(o, "mouseover", function() {
        openIW(this)
    }), google.maps.event.addListener(o, "mouseout", function() {
        closeIW(this)
    }), o.place && "undefined" != typeof o.place && google.maps.event.addListener(o, "click", function() {
        "true" != this.place.comingsoon && (this.place.hoods && "undefined" != typeof this.place.hoods ? (0 == this.place.hoodmarkers.length && createMarkers(this.place.hoods, this.place.hoodmarkers, e, dot_largesize), zoomTo(e, this.place)) : this.place.places && "undefined" != typeof this.place.places ? (0 == this.place.placemarkers.length && createMarkers(this.place.places, this.place.placemarkers, e, dot_largesize), zoomTo(e, this.place)) : window.location.href = this.place.url)
    }))
}

function zoomTo(e, o) {
    var t = 14,
        a;
    if (o.hoods && o.hoods.length > 0) a = o.hoods;
    else {
        if (!(o.places && o.places.length > 0)) return;
        a = o.places
    }
    if ("undefined" != typeof a) {
        for (var n = new google.maps.LatLngBounds, r = 0; r < a.length; r++) "undefined" != typeof a[r].marker && n.extend(a[r].marker.getPosition());
        e.fitBounds(n);
        var s = e.getZoom();
        o.hoods && "undefined" != typeof o.hoods ? (s > t && (e.setZoom(t), s = t), citiesbreak = s - 2, hoodsbreak = s + 2, s >= hoodsbreak && (hoodsbreak = s + 2), showHoods(e), hideCities(e), closeIW(openmarker), 1 == o.hoods.length && (createMarkers(o.hoods[0].places, o.hoods[0].placemarkers, e, dot_largesize), zoomTo(e, o.hoods[0]))) : o.places && "undefined" != typeof o.places && (hoodsbreak = s - 1, citiesbreak = s - 4, showPlaces(e), hideHoods(e), closeIW(openmarker))
    }
}
var mapopen;
mapopen = !1;
var mobile = screen.width <= 1024,
    landcolor = "#3c3d3b",
    watercolor = "#B3E6D3",
    strokeweight = "0.75";
mapstyles = {
    init: [{
        stylers: [{
            color: landcolor
        }]
    }, {
        featureType: "administrative",
        felementType: "geometry.stroke",
        stylers: [{
            color: watercolor
        }]
    }, {
        elementType: "labels",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "water",
        elementType: "geometry",
        stylers: [{
            color: watercolor
        }]
    }, {
        featureType: "road",
        stylers: [{
            visibility: "off"
        }]
    }],
    med: [{
        stylers: [{
            color: landcolor
        }]
    }, {
        elementType: "labels",
        stylers: [{
            visibility: "on"
        }]
    }, {
        featureType: "administrative",
        felementType: "geometry.stroke",
        stylers: [{
            color: watercolor
        }]
    }, {
        elementType: "labels.text.fill",
        stylers: [{
            color: watercolor
        }, {
            lightness: 25
        }]
    }, {
        elementType: "labels.text.stroke",
        stylers: [{
            color: landcolor
        }, {
            weight: strokeweight
        }]
    }, {
        elementType: "labels.icon",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "poi",
        elementType: "labels",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "water",
        elementType: "geometry",
        stylers: [{
            color: watercolor
        }]
    }, {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{
            color: landcolor
        }]
    }, {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{
            color: watercolor
        }]
    }, {
        featureType: "road",
        stylers: [{
            visibility: "off"
        }]
    }],
    zoom: [{
        stylers: [{
            color: landcolor
        }]
    }, {
        elementType: "labels",
        stylers: [{
            visibility: "on"
        }]
    }, {
        elementType: "labels.text.fill",
        stylers: [{
            color: watercolor
        }, {
            lightness: 25
        }]
    }, {
        elementType: "labels.text.stroke",
        stylers: [{
            color: landcolor
        }, {
            weight: strokeweight
        }]
    }, {
        elementType: "labels.icon",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "poi",
        elementType: "labels",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [{
            color: watercolor
        }]
    }, {
        featureType: "water",
        elementType: "geometry",
        stylers: [{
            color: watercolor
        }]
    }, {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{
            color: landcolor
        }]
    }, {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{
            color: watercolor
        }]
    }, {
        featureType: "road",
        elementType: "geometry",
        stylers: [{
            visibility: "on"
        }, {
            lightness: 5
        }]
    }]
}, Number.prototype.toRadians = function() {
    return this * Math.PI / 180
};
var dotscaler = .5,
    dot_smallsize = 3,
    dot_largesize = 5,
    geocount = 0,
    openmarker, loccount;
loccount = 1;
